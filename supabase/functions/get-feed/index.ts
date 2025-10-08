import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const tag = url.searchParams.get('tag');
    const slug = url.searchParams.get('slug');

    // Get single article by slug
    if (slug) {
      const { data, error } = await supabaseClient
        .from('curated_articles')
        .select('*')
        .eq('seo_slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // List published articles
    let query = supabaseClient
      .from('curated_articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(24);

    if (tag) {
      // Filter by tag if provided (assuming you add tags to curated_articles)
      query = query.contains('tags', [tag]);
    }

    const { data, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify({ items: data || [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
