import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Validate user token
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAdmin.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Check if user already used a trial
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("trial_started, subscription_status, subscription_tier, is_lifetime")
      .eq("user_id", userId)
      .single();

    if (profileError) throw profileError;

    if (profile?.trial_started) {
      return new Response(JSON.stringify({ error: "Trial already used" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (profile?.is_lifetime || profile?.subscription_status === "active") {
      return new Response(JSON.stringify({ error: "Already subscribed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Activate 14-day trial using service role (bypasses RLS)
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);

    const { error: updateError } = await supabaseAdmin.from("profiles").update({
      subscription_tier: "pro",
      trial_started: true,
      trial_end: trialEnd.toISOString(),
      subscription_status: "trialing",
      is_pro: true,
    }).eq("user_id", userId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true, trial_end: trialEnd.toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("start-trial error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
