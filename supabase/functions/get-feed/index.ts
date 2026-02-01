import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validate query parameters
const querySchema = z.object({
  tag: z.string().max(50).optional(),
  slug: z.string().max(200).optional(),
});

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
    
    // Validate query parameters
    const queryValidation = querySchema.safeParse({
      tag: url.searchParams.get('tag') || undefined,
      slug: url.searchParams.get('slug') || undefined,
    });
    
    if (!queryValidation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid query parameters', details: queryValidation.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { tag, slug } = queryValidation.data;

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
