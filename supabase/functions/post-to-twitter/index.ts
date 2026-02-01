import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { verifyUserAuth, unauthorizedResponse, badRequestResponse } from "../_shared/auth.ts";
import { getRestrictedCorsHeaders } from "../_shared/cors.ts";
import { postToTwitterSchema, parseJsonBody } from "../_shared/validation.ts";

// Generate HMAC-SHA1 signature using Web Crypto API
async function hmacSha1(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// OAuth 1.0a signature generation for Twitter API
async function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): Promise<string> {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");

  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams),
  ].join("&");

  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  
  return await hmacSha1(signingKey, signatureBaseString);
}

async function generateOAuthHeader(
  method: string,
  url: string,
  consumerKey: string,
  consumerSecret: string,
  accessToken: string,
  accessTokenSecret: string
): Promise<string> {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomUUID().replace(/-/g, ""),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: "1.0",
  };

  const signature = await generateOAuthSignature(
    method,
    url,
    oauthParams,
    consumerSecret,
    accessTokenSecret
  );

  oauthParams.oauth_signature = signature;

  const headerString = Object.keys(oauthParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(", ");

  return `OAuth ${headerString}`;
}

Deno.serve(async (req) => {
  // Use restricted CORS for this authenticated write endpoint
  const corsHeaders = getRestrictedCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify user authentication
    const user = await verifyUserAuth(req);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required to post to Twitter' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`User ${user.userId} requesting Twitter post`);

    // Check if user has admin or editor role
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: isAdmin } = await supabaseAuth.rpc('has_role', {
      _user_id: user.userId,
      _role: 'admin'
    });

    if (!isAdmin) {
      const { data: isEditor } = await supabaseAuth.rpc('has_role', {
        _user_id: user.userId,
        _role: 'editor'
      });
      
      if (!isEditor) {
        console.warn(`User ${user.userId} attempted Twitter post without permission`);
        return unauthorizedResponse('Admin or Editor role required to post to Twitter');
      }
    }

    console.log(`User ${user.userId} authorized for Twitter post (admin: ${isAdmin})`);

    // Rate limiting: Check daily post count
    const { data: todayPosts, error: countError } = await supabaseAuth
      .from('social_posts')
      .select('id', { count: 'exact', head: true })
      .eq('platform', 'twitter')
      .gte('posted_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

    if (!countError && todayPosts !== null) {
      const postCount = (todayPosts as unknown as { count: number }).count || 0;
      if (postCount >= 20) {
        console.warn(`User ${user.userId} hit daily Twitter posting limit`);
        return new Response(
          JSON.stringify({ error: 'Daily Twitter posting limit reached (20 posts)' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check for rapid posting (more than 3 posts in last 5 minutes)
    const { data: recentPosts } = await supabaseAuth
      .from('social_posts')
      .select('posted_at')
      .eq('platform', 'twitter')
      .gte('posted_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())
      .limit(3);

    if (recentPosts && recentPosts.length >= 3) {
      console.warn(`⚠️ Rapid Twitter posting detected for user ${user.userId} - possible automation or compromise`);
    }

    // Parse and validate input
    let body: unknown;
    try {
      body = await parseJsonBody(req);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const validation = postToTwitterSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { article_id, custom_text } = validation.data;

    const TWITTER_CONSUMER_KEY = Deno.env.get('TWITTER_CONSUMER_KEY');
    const TWITTER_CONSUMER_SECRET = Deno.env.get('TWITTER_CONSUMER_SECRET');
    const TWITTER_ACCESS_TOKEN = Deno.env.get('TWITTER_ACCESS_TOKEN');
    const TWITTER_ACCESS_TOKEN_SECRET = Deno.env.get('TWITTER_ACCESS_TOKEN_SECRET');

    if (!TWITTER_CONSUMER_KEY) throw new Error('Twitter API configuration missing');
    if (!TWITTER_CONSUMER_SECRET) throw new Error('Twitter API configuration missing');
    if (!TWITTER_ACCESS_TOKEN) throw new Error('Twitter API configuration missing');
    if (!TWITTER_ACCESS_TOKEN_SECRET) throw new Error('Twitter API configuration missing');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the article
    const { data: article, error: articleError } = await supabase
      .from('culture_articles')
      .select('*')
      .eq('id', article_id)
      .single();

    if (articleError || !article) {
      return badRequestResponse('Article not found');
    }

    // Generate tweet text
    const tweetText = custom_text || 
      `${article.paraloop_headline || article.title}\n\n${article.paraloop_vibe ? `✨ ${article.paraloop_vibe}` : ''}\n\n${article.article_url}\n\n#ParaloopCulture #${article.category?.replace('-', '') || 'Culture'}`;

    // Truncate to 280 chars if needed
    const finalText = tweetText.length > 280 
      ? tweetText.substring(0, 277) + '...' 
      : tweetText;

    // Post to Twitter using API v2
    const twitterUrl = 'https://api.x.com/2/tweets';
    
    const oauthHeader = await generateOAuthHeader(
      'POST',
      twitterUrl,
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_TOKEN_SECRET
    );

    const response = await fetch(twitterUrl, {
      method: 'POST',
      headers: {
        'Authorization': oauthHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: finalText }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Twitter API error:', responseData);
      throw new Error(`Twitter API error: ${JSON.stringify(responseData)}`);
    }

    // Log the post to social_posts table
    await supabase
      .from('social_posts')
      .insert({
        curated_article_id: article_id,
        platform: 'twitter',
        caption: finalText,
        external_id: responseData.data?.id,
        posted: true,
        posted_at: new Date().toISOString(),
      });

    console.log(`User ${user.userId} successfully posted to Twitter:`, responseData.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        tweet_id: responseData.data?.id,
        text: finalText 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error posting to Twitter:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
