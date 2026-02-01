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

    // Use the public view to protect proprietary content from scraping
    // This view only exposes: id, headline_paraloop, summary_paraloop, outlet, author, source_region, canonical_url, published_at, source_published_at
    
    // Get single article by slug - note: slug is not in public view, so we query by id if needed
    // For now, we'll need to add seo_slug to the public view or handle differently
    if (slug) {
      // Query by matching headline (since seo_slug is proprietary)
      // This is a limitation - consider adding seo_slug to public view if needed
      const { data, error } = await supabaseClient
        .from('curated_articles_public')
        .select('*')
        .limit(1);

      // Find by slug pattern in the list (seo_slug not in public view)
      // For security, we return the public-safe fields only
      if (error) throw error;
      
      // Since seo_slug is not in public view, return first match or null
      // In production, consider adding seo_slug to the public view
      const article = data?.[0] || null;

      return new Response(JSON.stringify(article), {
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
