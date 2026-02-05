import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.22.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validate query parameters
const querySchema = z.object({
  category: z.string().max(50).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(24),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    
    // Validate query parameters
    const queryValidation = querySchema.safeParse({
      category: url.searchParams.get('category') || undefined,
      limit: url.searchParams.get('limit') || undefined,
    });
    
    if (!queryValidation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid query parameters', details: queryValidation.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { category, limit } = queryValidation.data;

    let query = supabase
      .from('culture_articles')
      .select('*')
      .not('paraloop_analysis', 'is', null)
      .order('relevance_score', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return new Response(
      JSON.stringify({ items: data || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-culture-feed:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
