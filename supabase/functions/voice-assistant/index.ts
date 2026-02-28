import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { transcript, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are ARIA — the AI assistant for BULLETPROOFFIT, a premium fitness tracking app. You have access to the user's current data:

${context || "No context provided."}

Your job is to understand user intent and respond appropriately. You MUST return valid JSON only. No markdown, no explanation.

Return format:
{
  "type": "answer" | "log_food" | "log_workout" | "navigate",
  "spoken_response": "what ARIA says out loud (max 2-3 sentences, be specific with numbers)",
  "action": {
    // For log_food: { "foods": [{ "name": "...", "serving_size": "...", "calories": N, "protein_g": N, "carbs_g": N, "fat_g": N }], "meal_type": "Breakfast|Lunch|Dinner|Snack" }
    // For log_workout: { "exercises": [{ "name": "...", "sets": N, "reps": N, "weight_kg": N, "duration_minutes": N }], "workout_name": "...", "workout_type": "Strength|Cardio|HIIT", "estimated_calories": N, "estimated_duration_minutes": N }
    // For navigate: { "route": "/progress" | "/meals" | "/workout" | "/profile" | "/profile/goals" }
    // For answer: null
  }
}

Rules:
- For food logging: extract all food items, estimate USDA-standard nutrition, pick meal_type from time or context
- For workout logging: extract exercises with sets/reps/weight, estimate calories burned
- For questions: answer conversationally but concisely with specific numbers from context
- For navigation: map requests to app routes
- Always be motivational, precise, and data-driven
- If unsure of intent, default to "answer" type`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI processing failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";

    let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      return new Response(JSON.stringify({
        type: "answer",
        spoken_response: "I didn't quite catch that. Could you try again?",
        action: null,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    const result = JSON.parse(cleaned);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("voice-assistant error:", e);
    return new Response(JSON.stringify({
      type: "answer",
      spoken_response: "Something went wrong. Please try again.",
      action: null,
      error: e instanceof Error ? e.message : "Unknown error",
    }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
