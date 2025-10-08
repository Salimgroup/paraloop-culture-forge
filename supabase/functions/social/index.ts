import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platforms = ['twitter'], limit = 5 } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get recently published articles
    const { data: articles, error: fetchError } = await supabase
      .from('curated_articles')
      .select('id')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (fetchError) throw fetchError;
    if (!articles || articles.length === 0) {
      return new Response(
        JSON.stringify({ ok: true, posted: 0, message: 'No published articles' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let posted = 0;

    for (const article of articles) {
      // Check if social post already exists
      const { data: existing } = await supabase
        .from('social_posts')
        .select('id')
        .eq('curated_article_id', article.id)
        .limit(1);

      if (existing && existing.length > 0) {
        console.log(`Social post already exists for article ${article.id}`);
        continue;
      }

      // Generate social posts for each platform
      for (const platform of platforms) {
        const { data: socialResult, error: socialError } = await supabase.functions.invoke(
          'generate-social',
          { body: { curatedArticleId: article.id, platform } }
        );

        if (socialError || !socialResult?.success) {
          console.error(`Failed to generate social for article ${article.id}:`, socialError);
          continue;
        }

        posted++;
        console.log(`Generated ${platform} post for article ${article.id}`);
      }
    }

    console.log(`Generated ${posted} social posts`);

    return new Response(
      JSON.stringify({ ok: true, posted }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in social:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
