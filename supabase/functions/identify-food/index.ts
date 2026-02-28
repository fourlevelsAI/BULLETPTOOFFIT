import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, image_base64, transcript } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let messages: any[];

    if (type === "image") {
      messages = [
        {
          role: "system",
          content: "You are a food identification expert. When given an image, identify all food items visible. Return ONLY a valid JSON array with objects containing: name (string), serving_size (string like '1 cup' or '100g'), calories (number), protein_g (number), carbs_g (number), fat_g (number). Use standard USDA nutritional values. No markdown, no explanation, just the JSON array.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identify all food items in this image and return their nutritional information as a JSON array." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image_base64}` } },
          ],
        },
      ];
    } else if (type === "voice") {
      messages = [
        {
          role: "system",
          content: "You are a food logging assistant. Extract food items from voice transcriptions. Return ONLY a valid JSON array with objects containing: name (string), serving_size (string like '1 cup' or '100g'), calories (number), protein_g (number), carbs_g (number), fat_g (number). Use standard USDA nutritional values. If quantities are mentioned, use those. Otherwise use standard serving sizes. No markdown, no explanation, just the JSON array.",
        },
        {
          role: "user",
          content: `Extract food items from this voice log: "${transcript}"`,
        },
      ];
    } else {
      return new Response(JSON.stringify({ error: "Invalid type. Use 'image' or 'voice'." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        temperature: 0.1,
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
    const content = data.choices?.[0]?.message?.content || "[]";

    // Extract JSON from response
    let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const jsonStart = cleaned.search(/[\[{]/);
    const jsonEnd = cleaned.lastIndexOf(cleaned[jsonStart] === "[" ? "]" : "}");
    if (jsonStart === -1 || jsonEnd === -1) {
      return new Response(JSON.stringify({ error: "Could not parse food data" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    const foods = JSON.parse(cleaned);

    return new Response(JSON.stringify({ foods: Array.isArray(foods) ? foods : [foods] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("identify-food error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
