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
    const { minScore = 0.72, backfillIfNone = true } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get scored articles that haven't been published
    const { data: scoredArticles, error: scoredError } = await supabase
      .from('articles')
      .select('id, relevance_score')
      .eq('status', 'scored')
      .gte('relevance_score', minScore)
      .order('relevance_score', { ascending: false })
      .limit(10);

    let queue = scoredArticles || [];

    // Backfill with top-scored if none meet threshold
    if (queue.length === 0 && backfillIfNone) {
      const { data: backfill } = await supabase
        .from('articles')
        .select('id, relevance_score')
        .eq('status', 'scored')
        .order('relevance_score', { ascending: false })
        .limit(3);
      
      queue = backfill || [];
    }

    if (queue.length === 0) {
      return new Response(
        JSON.stringify({ ok: true, published: 0, message: 'No articles to publish' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get corresponding curated articles and publish them
    let published = 0;
    for (const article of queue) {
      const { data: curatedArticle, error: findError } = await supabase
        .from('curated_articles')
        .select('id')
        .eq('article_id', article.id)
        .eq('published', false)
        .single();

      if (findError || !curatedArticle) continue;

      const { error: publishError } = await supabase
        .from('curated_articles')
        .update({ 
          published: true, 
          published_at: new Date().toISOString() 
        })
        .eq('id', curatedArticle.id);

      if (!publishError) {
        published++;
        console.log(`Published curated article ${curatedArticle.id}`);
      }
    }

    console.log(`Published ${published} articles`);

    return new Response(
      JSON.stringify({ ok: true, published }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in publish:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
