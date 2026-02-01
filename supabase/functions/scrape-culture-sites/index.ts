import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Culture sites to scrape
const CULTURE_SITES = [
  // Hip-Hop & Music
  { name: "Hypebeast", url: "https://hypebeast.com", category: "streetwear" },
  { name: "Complex", url: "https://www.complex.com/music", category: "hip-hop" },
  { name: "Highsnobiety", url: "https://www.highsnobiety.com", category: "streetwear" },
  { name: "REVOLT", url: "https://www.revolt.tv", category: "hip-hop" },
  { name: "VIBE", url: "https://www.vibe.com", category: "hip-hop" },
  { name: "Okayplayer", url: "https://www.okayplayer.com", category: "hip-hop" },
  { name: "The FADER", url: "https://www.thefader.com", category: "music" },
  { name: "HotNewHipHop", url: "https://www.hotnewhiphop.com", category: "hip-hop" },
  { name: "HipHopDX", url: "https://hiphopdx.com", category: "hip-hop" },
  { name: "Afropunk", url: "https://afropunk.com", category: "culture" },
  
  // Fine Arts - Market & Institutional
  { name: "Artsy", url: "https://www.artsy.net/articles", category: "fine-arts" },
  { name: "Artnet", url: "https://news.artnet.com", category: "fine-arts" },
  { name: "The Art Newspaper", url: "https://www.theartnewspaper.com", category: "fine-arts" },
  { name: "Hyperallergic", url: "https://hyperallergic.com", category: "fine-arts" },
  { name: "Artforum", url: "https://www.artforum.com", category: "fine-arts" },
  { name: "ARTnews", url: "https://www.artnews.com", category: "fine-arts" },
  { name: "Frieze", url: "https://www.frieze.com", category: "fine-arts" },
  { name: "Galerie Magazine", url: "https://www.galeriemagazine.com", category: "fine-arts" },
  
  // Black-Focused Fine Art
  { name: "Culture Type", url: "https://www.culturetype.com", category: "fine-arts" },
  { name: "Black Art In America", url: "https://blackartinamerica.com", category: "fine-arts" },
  { name: "Sugarcane Magazine", url: "https://sugarcanemagazine.com", category: "fine-arts" },
  { name: "NKA Journal", url: "https://nkajournal.org", category: "fine-arts" },
  { name: "African Digital Art", url: "https://africandigitalart.com", category: "fine-arts" },
  { name: "1-54 Art Fair", url: "https://1-54.com/news", category: "fine-arts" },
  { name: "The Whitney", url: "https://whitney.org/exhibitions", category: "fine-arts" },
  
  // Black-Owned Business - Tier 1
  { name: "Black Enterprise", url: "https://www.blackenterprise.com", category: "business" },
  { name: "Blavity", url: "https://blavity.com", category: "business" },
  { name: "ForbesBLK", url: "https://www.forbes.com/blk", category: "business" },
  { name: "AfroTech", url: "https://afrotech.com", category: "business" },
  { name: "The Plug", url: "https://tpinsights.com", category: "business" },
  { name: "Essence Business", url: "https://www.essence.com/lifestyle/money-career", category: "business" },
  
  // Global Black Economy
  { name: "TechCabal", url: "https://techcabal.com", category: "business" },
  { name: "Semafor Africa", url: "https://www.semafor.com/africa", category: "business" },
  { name: "African Business", url: "https://african.business", category: "business" },
  { name: "Quartz Africa", url: "https://qz.com/africa", category: "business" },
  { name: "Caribbean Business Report", url: "https://caribbeanbusinessreport.com", category: "business" },
  { name: "How We Made It In Africa", url: "https://www.howwemadeitinafrica.com", category: "business" },
  { name: "Disrupt Africa", url: "https://disrupt-africa.com", category: "business" },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY is not configured');
    }

    console.log('Starting culture sites scrape...');
    const results: any[] = [];

    // Scrape each site
    for (const site of CULTURE_SITES.slice(0, 5)) { // Limit to 5 sites per run
      try {
        console.log(`Scraping ${site.name}...`);
        
        const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: site.url,
            formats: ['markdown', 'links'],
            onlyMainContent: true,
          }),
        });

        const data = await response.json();
        
        if (data.success && data.data) {
          const links = data.data.links || [];
          const articleLinks = links
            .filter((link: string) => 
              link.includes('/20') && // Date in URL indicates article
              !link.includes('/tag/') &&
              !link.includes('/category/')
            )
            .slice(0, 5); // Get top 5 article links per site

          for (const articleUrl of articleLinks) {
            // Check if article already exists
            const { data: existing } = await supabase
              .from('culture_articles')
              .select('id')
              .eq('article_url', articleUrl)
              .single();

            if (!existing) {
              // Scrape individual article
              const articleResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  url: articleUrl,
                  formats: ['markdown'],
                  onlyMainContent: true,
                }),
              });

              const articleData = await articleResponse.json();
              
              if (articleData.success && articleData.data) {
                const metadata = articleData.data.metadata || {};
                const markdown = articleData.data.markdown || '';
                
                // Extract title and excerpt from markdown
                const lines = markdown.split('\n').filter((l: string) => l.trim());
                const title = metadata.title || lines[0]?.replace(/^#+\s*/, '') || 'Untitled';
                const excerpt = lines.slice(1, 3).join(' ').substring(0, 300);

                const { error: insertError } = await supabase
                  .from('culture_articles')
                  .insert({
                    source_name: site.name,
                    source_url: site.url,
                    title: title.substring(0, 500),
                    excerpt,
                    article_url: articleUrl,
                    image_url: metadata.ogImage || metadata.image,
                    category: site.category,
                    tags: [site.category, 'culture'],
                  });

                if (!insertError) {
                  results.push({ source: site.name, title, url: articleUrl });
                }
              }
            }
          }
        }
      } catch (siteError) {
        console.error(`Error scraping ${site.name}:`, siteError);
      }
    }

    console.log(`Scraped ${results.length} new articles`);

    return new Response(
      JSON.stringify({ success: true, count: results.length, articles: results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in scrape-culture-sites:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
