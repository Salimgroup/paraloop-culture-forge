import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RSSItem {
  url: string;
  domain: string;
  title: string;
  excerpt?: string;
  publishedAt?: Date;
  text?: string;
}

async function fetchRSS(url: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(url);
    const xml = await response.text();
    
    // Simple regex-based XML parsing (works for most RSS/Atom feeds)
    const results: RSSItem[] = [];
    
    // Match both RSS <item> and Atom <entry> tags
    const itemRegex = /<(?:item|entry)[^>]*>([\s\S]*?)<\/(?:item|entry)>/gi;
    const items = [...xml.matchAll(itemRegex)];
    
    for (const [, itemContent] of items) {
      // Extract fields using regex
      const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemContent.match(/<link[^>]*>([^<]*)<\/link>|<link[^>]*href=["']([^"']*)["']/i);
      const descMatch = itemContent.match(/<(?:description|summary)[^>]*>([\s\S]*?)<\/(?:description|summary)>/i);
      const dateMatch = itemContent.match(/<(?:pubDate|published|updated)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated)>/i);
      
      const link = linkMatch?.[1]?.trim() || linkMatch?.[2]?.trim() || '';
      const title = titleMatch?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() || '';
      const description = descMatch?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() || '';
      const pubDate = dateMatch?.[1]?.trim() || '';
      
      if (link && title) {
        try {
          const domain = new URL(link).hostname;
          results.push({
            url: link,
            domain,
            title,
            excerpt: description.substring(0, 500),
            publishedAt: pubDate ? new Date(pubDate) : new Date(),
            text: description
          });
        } catch {
          // Skip invalid URLs
        }
      }
    }
    
    return results;
  } catch (error) {
    console.error(`Failed to fetch RSS from ${url}:`, error);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { limitPerSource = 30 } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get active RSS sources
    const { data: sources, error: sourcesError } = await supabase
      .from('sources')
      .select('*')
      .eq('active', true)
      .eq('type', 'rss');

    if (sourcesError) throw sourcesError;
    if (!sources || sources.length === 0) {
      return new Response(
        JSON.stringify({ ok: true, inserted: 0, message: 'No active sources' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching from ${sources.length} sources`);

    // Fetch all RSS feeds
    const allItems: RSSItem[] = [];
    for (const source of sources) {
      const items = await fetchRSS(source.url);
      allItems.push(...items.slice(0, limitPerSource));
    }

    // Deduplicate by URL
    const uniqueItems = Array.from(
      new Map(allItems.map(item => [item.url, item])).values()
    );

    console.log(`Found ${uniqueItems.length} unique articles`);

    // Insert as candidates
    let inserted = 0;
    for (const item of uniqueItems) {
      const { error: insertError } = await supabase
        .from('articles')
        .insert({
          url: item.url,
          domain: item.domain,
          title: item.title,
          excerpt: item.excerpt,
          published_at: item.publishedAt?.toISOString(),
          status: 'pending'
        })
        .select()
        .single();

      if (!insertError) inserted++;
    }

    console.log(`Inserted ${inserted} new articles`);

    return new Response(
      JSON.stringify({ ok: true, inserted }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ingest:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
