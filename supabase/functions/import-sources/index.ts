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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Importing starter sources from CSV...');

    // Hardcoded starter sources from the CSV
    const sources = [
      {
        name: "IMF Blog",
        url: "https://www.imf.org/external/pubs/ft/fandd/rss/fd.xml",
        type: "rss",
        weight: 1.6,
        bias_label: "center",
        regions: ["Global"],
        notes: "Macro trends, globalization"
      },
      {
        name: "World Bank Blogs",
        url: "https://blogs.worldbank.org/feed",
        type: "rss",
        weight: 1.5,
        bias_label: "center",
        regions: ["Global"],
        notes: "Development + policy"
      },
      {
        name: "Rest of World",
        url: "https://restofworld.org/rss",
        type: "rss",
        weight: 1.6,
        bias_label: "center",
        regions: ["Global", "Asia", "LatAm", "Africa"],
        notes: "Tech + culture outside the West"
      },
      {
        name: "MIT Technology Review",
        url: "https://www.technologyreview.com/feed",
        type: "rss",
        weight: 1.5,
        bias_label: "center",
        regions: ["Global"],
        notes: "Emerging tech impacts"
      },
      {
        name: "TechCrunch (Policy/Creator)",
        url: "https://techcrunch.com/feed/",
        type: "rss",
        weight: 1.3,
        bias_label: "center",
        regions: ["US", "Global"],
        notes: "Startups, creator economy"
      },
      {
        name: "AfroTech",
        url: "https://afrotech.com/feed",
        type: "rss",
        weight: 1.5,
        bias_label: "niche",
        regions: ["US", "Global"],
        notes: "Black tech + business culture"
      },
      {
        name: "UNESCO Culture",
        url: "https://www.unesco.org/feeds/culture",
        type: "rss",
        weight: 1.4,
        bias_label: "center",
        regions: ["Global"],
        notes: "Cultural policy and heritage"
      },
      {
        name: "Brookings Global Economy",
        url: "https://www.brookings.edu/topic/global-economy/feed/",
        type: "rss",
        weight: 1.3,
        bias_label: "center",
        regions: ["Global"],
        notes: "Policy analysis"
      },
      {
        name: "TechCabal",
        url: "https://techcabal.com/feed/",
        type: "rss",
        weight: 1.5,
        bias_label: "niche",
        regions: ["Africa"],
        notes: "African tech + venture"
      },
      {
        name: "Techpoint Africa",
        url: "https://techpoint.africa/feed/",
        type: "rss",
        weight: 1.4,
        bias_label: "niche",
        regions: ["Africa"],
        notes: "Startups + policy"
      }
    ];

    const { data, error } = await supabase
      .from('sources')
      .insert(sources)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Imported ${data.length} sources successfully`);

    return new Response(
      JSON.stringify({ success: true, count: data.length, sources: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error importing sources:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
