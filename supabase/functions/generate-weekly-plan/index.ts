import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate user
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

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { goal, calories, protein, carbs, fat, workouts_per_week, activity_level, dietary_preferences, current_weight, target_weight } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Create a complete 7-day fitness and nutrition plan for:
- Goal: ${goal || "lose_fat"}
- Daily calories: ${calories || 2000}
- Protein target: ${protein || 150}g
- Carbs target: ${carbs || 200}g
- Fat target: ${fat || 65}g
- Workout frequency: ${workouts_per_week || 4}/week
- Activity level: ${activity_level || "moderate"}
- Dietary restrictions: ${dietary_preferences?.join(", ") || "none"}
- Current weight: ${current_weight || 80}kg
- Target weight: ${target_weight || 75}kg

Return ONLY valid JSON (no markdown, no code blocks) in this exact structure:
{
  "week_summary": "one sentence overview",
  "days": [
    {
      "day": "Monday",
      "type": "Training" or "Rest" or "Active Recovery",
      "workout": {
        "name": "workout name",
        "duration": 60,
        "exercises": [
          { "name": "exercise name", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "tip" }
        ]
      },
      "meals": {
        "breakfast": { "name": "meal name", "calories": 400, "protein": 35, "carbs": 40, "fat": 10, "ingredients": ["item 1"] },
        "lunch": { "name": "meal name", "calories": 500, "protein": 45, "carbs": 50, "fat": 15, "ingredients": ["item 1"] },
        "dinner": { "name": "meal name", "calories": 500, "protein": 45, "carbs": 40, "fat": 20, "ingredients": ["item 1"] },
        "snack": { "name": "meal name", "calories": 200, "protein": 25, "carbs": 10, "fat": 5, "ingredients": ["item 1"] }
      },
      "daily_totals": { "calories": 1600, "protein": 150, "carbs": 140, "fat": 50 },
      "tip": "one actionable tip for this day"
    }
  ]
}

Include exactly 7 days (Monday through Sunday). For rest days, set workout to null. Make exercises realistic and varied. Ensure daily_totals match the target closely.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a professional fitness coach and nutritionist. Return ONLY valid JSON, no markdown formatting, no code blocks, no explanatory text." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";

    // Clean markdown code blocks if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const plan = JSON.parse(content);

    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-weekly-plan error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
