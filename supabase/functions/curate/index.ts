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
    const { maxItems = 12, minScore = 0.55 } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get pending articles
    const { data: articles, error: fetchError } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'pending')
      .order('published_at', { ascending: false })
      .limit(maxItems * 3); // Overfetch to account for rejections

    if (fetchError) throw fetchError;
    if (!articles || articles.length === 0) {
      return new Response(
        JSON.stringify({ ok: true, staged: 0, message: 'No pending articles' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${articles.length} candidate articles`);

    let staged = 0;
    let rejected = 0;

    for (const article of articles) {
      // Step 1: Judge relevance
      const { data: judgeResult, error: judgeError } = await supabase.functions.invoke(
        'judge-relevance',
        { body: { article } }
      );

      if (judgeError || !judgeResult?.success) {
        console.error(`Failed to judge article ${article.id}:`, judgeError);
        continue;
      }

      const judgment = judgeResult.judgment;
      
      // Check if meets minimum score
      if (judgment.score < minScore) {
        rejected++;
        continue;
      }

      // Step 2: Extract full text (simplified - in production, use a scraper)
      let extractedText = article.excerpt || '';
      
      // Step 3: Rewrite article
      const { data: rewriteResult, error: rewriteError } = await supabase.functions.invoke(
        'rewrite-article',
        { body: { article, extractedText } }
      );

      if (rewriteError || !rewriteResult?.success) {
        console.error(`Failed to rewrite article ${article.id}:`, rewriteError);
        continue;
      }

      staged++;
      console.log(`Staged article: ${rewriteResult.curatedArticle.headline_paraloop}`);

      if (staged >= maxItems) break;
    }

    console.log(`Pipeline complete: ${staged} staged, ${rejected} rejected`);

    return new Response(
      JSON.stringify({ ok: true, staged, rejected }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in curate:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
