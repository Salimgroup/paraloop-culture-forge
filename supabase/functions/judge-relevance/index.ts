import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, verifyHmacSignature, unauthorizedResponse, badRequestResponse } from "../_shared/auth.ts";
import { judgeRelevanceSchema, parseJsonBody } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify HMAC signature for automated/cron calls
    const isValidHmac = await verifyHmacSignature(req);
    if (!isValidHmac) {
      console.error('Invalid HMAC signature for judge-relevance');
      return unauthorizedResponse('Invalid or missing HMAC signature');
    }
    
    // Parse and validate input
    let body: unknown;
    try {
      body = await parseJsonBody(req, 50); // 50KB max
    } catch (error) {
      return badRequestResponse(error instanceof Error ? error.message : 'Invalid request body');
    }
    
    const validation = judgeRelevanceSchema.safeParse(body);
    if (!validation.success) {
      return badRequestResponse('Validation failed', validation.error.flatten());
    }
    
    const { article } = validation.data;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Judging relevance for article:', article.title);

    const systemPrompt = `Classify and score article candidates for Paraloop Culture Feed. Consider globalization, creator economy, tech–culture crossovers, and policy with cultural impact. Prefer last 48 hours. Reward community impact and credible sources. Output strictly valid JSON per provided schema. Do not invent facts.`;

    // Call Lovable AI to judge relevance
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(article) }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'judge_relevance',
              description: 'Score article relevance for Paraloop Culture Feed',
              parameters: {
                type: 'object',
                properties: {
                  score: { type: 'number', minimum: 0, maximum: 1 },
                  impact_level: { type: 'string', enum: ['low', 'medium', 'high'] },
                  category: { 
                    type: 'string', 
                    enum: ['globalization', 'creator_economy', 'policy', 'tech_culture', 'wellness', 'other'] 
                  },
                  topics: { type: 'array', items: { type: 'string' } },
                  regions: { type: 'array', items: { type: 'string' } },
                  reasons: { type: 'array', items: { type: 'string' } },
                  flags: { type: 'array', items: { type: 'string' } },
                  duplicate_of: { type: 'string' }
                },
                required: ['score', 'impact_level', 'category', 'reasons', 'flags']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'judge_relevance' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const judgment = JSON.parse(toolCall.function.arguments);
    console.log('AI judgment:', judgment);

    // Update article with scoring
    const { error: updateError } = await supabase
      .from('articles')
      .update({
        relevance_score: judgment.score,
        impact_level: judgment.impact_level,
        category: judgment.category,
        topics: judgment.topics || [],
        regions: judgment.regions || [],
        reasons: judgment.reasons || [],
        flags: judgment.flags || [],
        duplicate_of: judgment.duplicate_of || null,
        status: judgment.score >= 0.55 ? 'scored' : 'rejected',
        scored_at: new Date().toISOString()
      })
      .eq('id', article.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, judgment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in judge-relevance:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
