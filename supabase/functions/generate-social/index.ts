import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, verifyHmacSignature, unauthorizedResponse, badRequestResponse } from "../_shared/auth.ts";
import { generateSocialSchema, parseJsonBody } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify HMAC signature for automated/cron calls
    const isValidHmac = await verifyHmacSignature(req);
    if (!isValidHmac) {
      console.error('Invalid HMAC signature for generate-social');
      return unauthorizedResponse('Invalid or missing HMAC signature');
    }
    
    // Parse and validate input
    let body: unknown;
    try {
      body = await parseJsonBody(req);
    } catch (error) {
      return badRequestResponse(error instanceof Error ? error.message : 'Invalid request body');
    }
    
    const validation = generateSocialSchema.safeParse(body);
    if (!validation.success) {
      return badRequestResponse('Validation failed', validation.error.flatten());
    }
    
    const { curatedArticleId, platform } = validation.data;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get curated article
    const { data: article, error: fetchError } = await supabase
      .from('curated_articles')
      .select('*')
      .eq('id', curatedArticleId)
      .single();

    if (fetchError || !article) {
      return badRequestResponse('Article not found');
    }

    console.log('Generating social copy for:', article.headline_paraloop);

    const systemPrompt = `Generate a 120–140 character caption with max 1 emoji and include #ParaloopCulture. No links.`;

    const socialInput = {
      headline_paraloop: article.headline_paraloop,
      key_takeaway: article.summary_paraloop
    };

    // Call Lovable AI to generate social copy
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
          { role: 'user', content: JSON.stringify(socialInput) }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'generate_social_copy',
              description: 'Generate social media caption',
              parameters: {
                type: 'object',
                properties: {
                  caption: { type: 'string', maxLength: 140 },
                  hashtag: { 
                    type: 'string', 
                    enum: ['#ParaloopCulture'] 
                  }
                },
                required: ['caption', 'hashtag']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'generate_social_copy' } }
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

    const socialCopy = JSON.parse(toolCall.function.arguments);
    console.log('AI social copy generated');

    // Create social post
    const { data: socialPost, error: insertError } = await supabase
      .from('social_posts')
      .insert({
        curated_article_id: curatedArticleId,
        platform: platform,
        caption: socialCopy.caption,
        hashtag: socialCopy.hashtag
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, socialPost }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-social:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
