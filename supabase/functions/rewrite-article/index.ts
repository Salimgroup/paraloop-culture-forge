import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { article, extractedText } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Rewriting article:', article.title);

    const systemPrompt = `You are the Paraloop Culture Desk. Voice: calm, optimistic, high-context, culturally fluent; never alarmist. Explain why this matters for culture, creators, and community wellness. Attribute facts; include canonical link. Follow length constraints. Output strictly valid JSON per provided schema.`;

    const writerInput = {
      title_source: article.title,
      text_extracted: extractedText,
      canonical_url: article.url,
      published_at: article.published_at,
      outlet: article.domain,
      author: 'Unknown',
      region: article.region_hint,
      reasons: article.reasons
    };

    // Call Lovable AI to rewrite
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
          { role: 'user', content: JSON.stringify(writerInput) }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'rewrite_article',
              description: 'Rewrite article in Paraloop voice',
              parameters: {
                type: 'object',
                properties: {
                  headline_paraloop: { type: 'string', maxLength: 120 },
                  summary_paraloop: { type: 'string', minLength: 80, maxLength: 220 },
                  tl_dr_bullets: { 
                    type: 'array', 
                    items: { type: 'string' },
                    minItems: 3,
                    maxItems: 5
                  },
                  pull_quote: {
                    type: 'object',
                    properties: {
                      text: { type: 'string', maxLength: 150 },
                      attribution: { type: 'string' },
                      link: { type: 'string', format: 'uri' }
                    },
                    required: ['text', 'attribution', 'link']
                  },
                  wellness_angle: { type: 'string', maxLength: 240 },
                  actions_next: {
                    type: 'array',
                    items: { type: 'string' },
                    minItems: 1,
                    maxItems: 3
                  },
                  social_caption: { type: 'string', maxLength: 140 },
                  seo_slug: { type: 'string' }
                },
                required: [
                  'headline_paraloop',
                  'summary_paraloop',
                  'tl_dr_bullets',
                  'pull_quote',
                  'wellness_angle',
                  'actions_next',
                  'social_caption',
                  'seo_slug'
                ]
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'rewrite_article' } }
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

    const rewrite = JSON.parse(toolCall.function.arguments);
    console.log('AI rewrite complete');

    // Create curated article
    const { data: curatedArticle, error: insertError } = await supabase
      .from('curated_articles')
      .insert({
        article_id: article.id,
        title_source: article.title,
        text_extracted: extractedText,
        canonical_url: article.url,
        outlet: article.domain,
        source_region: article.region_hint,
        source_published_at: article.published_at,
        ...rewrite
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // Update article status
    await supabase
      .from('articles')
      .update({ status: 'approved' })
      .eq('id', article.id);

    return new Response(
      JSON.stringify({ success: true, curatedArticle }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in rewrite-article:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
