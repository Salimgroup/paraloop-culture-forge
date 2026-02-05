import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.22.4";

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

    // Use the public view to protect proprietary content from scraping
    // This view only exposes: id, headline_paraloop, summary_paraloop, outlet, author, 
    // source_region, canonical_url, published_at, source_published_at, seo_slug
    
    // Get single article by slug
    if (slug) {
      const { data, error } = await supabaseClient
        .from('curated_articles_public')
        .select('*')
        .eq('seo_slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return new Response(JSON.stringify(null), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        throw error;
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // List published articles using the secure public view
    const { data, error } = await supabaseClient
      .from('curated_articles_public')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(24);

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
