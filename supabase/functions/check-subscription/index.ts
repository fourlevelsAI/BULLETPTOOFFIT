import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: any) => {
  console.log(`[CHECK-SUBSCRIPTION] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

// Stripe product → tier mapping
const PRODUCT_TIERS: Record<string, string> = {
  "prod_U3v0cNqCxD8QJI": "pro",
  "prod_U3v1XKcfshfjup": "pro",
  "prod_U3v1T1e3fTHTvM": "elite",
  "prod_U3v1ZUAfkUfJQY": "elite",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");
    logStep("User authenticated", { email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });

    if (customers.data.length === 0) {
      logStep("No Stripe customer found");
      // Update profile to free
      await supabaseClient.from("profiles").update({ 
        subscription_tier: "free", subscription_end: null, is_pro: false 
      }).eq("user_id", user.id);

      return new Response(JSON.stringify({ subscribed: false, tier: "free" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active or trialing subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });

    // Also check trialing
    const trialingSubs = await stripe.subscriptions.list({
      customer: customerId,
      status: "trialing",
      limit: 10,
    });

    const allSubs = [...subscriptions.data, ...trialingSubs.data];

    if (allSubs.length === 0) {
      // Check for lifetime purchase via payment intents
      const payments = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 100,
      });
      
      const lifetimePayment = payments.data.find(p => 
        p.status === "succeeded" && p.metadata?.product_id === "prod_U3v2wPX3IYWwqv"
      );

      if (lifetimePayment) {
        await supabaseClient.from("profiles").update({
          subscription_tier: "lifetime", is_pro: true, is_lifetime: true
        }).eq("user_id", user.id);

        return new Response(JSON.stringify({ 
          subscribed: true, tier: "lifetime", subscription_end: null 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      logStep("No active subscription");
      await supabaseClient.from("profiles").update({ 
        subscription_tier: "free", subscription_end: null, is_pro: false 
      }).eq("user_id", user.id);

      return new Response(JSON.stringify({ subscribed: false, tier: "free" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sub = allSubs[0];
    const productId = sub.items.data[0].price.product as string;
    const tier = PRODUCT_TIERS[productId] || "pro";
    const subscriptionEnd = new Date(sub.current_period_end * 1000).toISOString();
    logStep("Active subscription found", { tier, subscriptionEnd });

    // Update profile
    await supabaseClient.from("profiles").update({
      subscription_tier: tier,
      subscription_end: subscriptionEnd,
      is_pro: true,
      stripe_customer_id: customerId,
    }).eq("user_id", user.id);

    return new Response(JSON.stringify({
      subscribed: true,
      tier,
      subscription_end: subscriptionEnd,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CHECK-SUBSCRIPTION] ERROR", msg);
    return new Response(JSON.stringify({ error: "An internal error occurred" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
