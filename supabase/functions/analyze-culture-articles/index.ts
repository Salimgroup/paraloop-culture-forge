import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, verifyServiceRoleKey, verifyUserAuth, unauthorizedResponse } from "../_shared/auth.ts";

const PARALOOP_SYSTEM_PROMPT = `You are Paraloop's culture analyst - a warm, insightful voice celebrating hip-hop, streetwear, and urban culture.

Your role is to provide POSITIVE, UPLIFTING analysis of culture articles. You celebrate creativity, innovation, and cultural impact.

For each article, provide:
1. headline: A catchy, positive headline (max 80 chars) that captures the cultural significance
2. analysis: 2-3 sentences of thoughtful, positive commentary on why this matters for culture (100-200 words)
3. vibe: A single word or phrase capturing the energy (e.g., "Fresh", "Game-Changing", "Iconic", "Culture Shift")
4. relevance_score: 1-100 rating based on cultural impact and relevance to hip-hop/fashion/music

TONE GUIDELINES:
- Always positive and celebratory
- Highlight creativity and innovation
- Connect to broader cultural movements
- Use authentic hip-hop/streetwear vocabulary naturally
- Never cynical or negative
- Celebrate diversity and global perspectives`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Dual authentication: service role key for cron/automation, JWT for user-triggered calls
    const isServiceRole = verifyServiceRoleKey(req);
    let authenticated = isServiceRole;
    
    if (!authenticated) {
      // Fall back to JWT authentication for user-triggered calls
      const user = await verifyUserAuth(req);
      if (user) {
        const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );
        
        // Check if user has admin or editor role
        const { data: isAdmin } = await supabaseAdmin.rpc('has_role', {
          _user_id: user.userId,
          _role: 'admin'
        });
        const { data: isEditor } = await supabaseAdmin.rpc('has_role', {
          _user_id: user.userId,
          _role: 'editor'
        });
        
        authenticated = isAdmin || isEditor;
        if (!authenticated) {
          console.error('User lacks required role for analyze-culture-articles');
          return unauthorizedResponse('Admin or editor role required');
        }
      }
    }
    
    if (!authenticated) {
      console.error('No valid authentication for analyze-culture-articles');
      return unauthorizedResponse('Authentication required');
    }
    
    console.log('Authentication verified - Starting culture article analysis...');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get unanalyzed articles
    const { data: articles, error } = await supabase
      .from('culture_articles')
      .select('*')
      .is('paraloop_analysis', null)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    if (!articles?.length) {
      return new Response(
        JSON.stringify({ success: true, message: 'No articles to analyze' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing ${articles.length} articles...`);
    const analyzed: { id: string; headline: string }[] = [];

    for (const article of articles) {
      try {
        const prompt = `Analyze this culture article and provide a Paraloop-style positive commentary:

TITLE: ${article.title}
SOURCE: ${article.source_name}
CATEGORY: ${article.category}
EXCERPT: ${article.excerpt || 'No excerpt available'}

Respond in JSON format:
{
  "headline": "catchy positive headline",
  "analysis": "your thoughtful positive analysis",
  "vibe": "single word/phrase energy",
  "relevance_score": 75
}`;

        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: PARALOOP_SYSTEM_PROMPT },
              { role: 'user', content: prompt }
            ],
          }),
        });

        if (!response.ok) {
          console.error(`AI error for article ${article.id}: ${response.status}`);
          continue;
        }

        const aiData = await response.json();
        const content = aiData.choices?.[0]?.message?.content || '';
        
        // Parse JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          
          await supabase
            .from('culture_articles')
            .update({
              paraloop_headline: parsed.headline,
              paraloop_analysis: parsed.analysis,
              paraloop_vibe: parsed.vibe,
              relevance_score: parsed.relevance_score || 50,
              analyzed_at: new Date().toISOString(),
            })
            .eq('id', article.id);

          analyzed.push({ id: article.id, headline: parsed.headline });
        }
      } catch (articleError) {
        console.error(`Error analyzing article ${article.id}:`, articleError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, analyzed: analyzed.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-culture-articles:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
