import { createClient } from "npm:@supabase/supabase-js@2";
import { verifyUserAuth, verifyServiceRoleKey, unauthorizedResponse, badRequestResponse } from "../_shared/auth.ts";
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

async function postTweet(
  text: string,
  consumerKey: string,
  consumerSecret: string,
  accessToken: string,
  accessTokenSecret: string
): Promise<{ id: string } | null> {
  const twitterUrl = 'https://api.x.com/2/tweets';
  
  const oauthHeader = await generateOAuthHeader(
    'POST',
    twitterUrl,
    consumerKey,
    consumerSecret,
    accessToken,
    accessTokenSecret
  );

  const response = await fetch(twitterUrl, {
    method: 'POST',
    headers: {
      'Authorization': oauthHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Twitter API error:', responseData);
    throw new Error(`Twitter API error: ${JSON.stringify(responseData)}`);
  }

  return responseData.data;
}

Deno.serve(async (req) => {
  // Use restricted CORS for this authenticated write endpoint
  const corsHeaders = getRestrictedCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse body first to check for auto mode
    let body: Record<string, unknown> = {};
    try {
      body = await parseJsonBody(req) as Record<string, unknown>;
    } catch {
      // Empty body is okay for auto mode via cron
    }

    const isAutoMode = body.auto === true;
    
    // Dual authentication: service role key for cron/automation, JWT for user-triggered calls
    const isServiceRole = verifyServiceRoleKey(req);
    let authenticated = isServiceRole && isAutoMode;
    let userId = 'cron-automation';
    
    if (!authenticated) {
      // Fall back to JWT authentication for user-triggered calls
      const user = await verifyUserAuth(req);
      if (user) {
        userId = user.userId;
        const supabaseAuth = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );
        
        // Check if user has admin or editor role
        const { data: isAdmin } = await supabaseAuth.rpc('has_role', {
          _user_id: user.userId,
          _role: 'admin'
        });
        const { data: isEditor } = await supabaseAuth.rpc('has_role', {
          _user_id: user.userId,
          _role: 'editor'
        });
        
        authenticated = isAdmin || isEditor;
        if (!authenticated) {
          console.error('User lacks required role for post-to-twitter');
          return unauthorizedResponse('Admin or editor role required');
        }
      }
    }
    
    if (!authenticated) {
      console.error('No valid authentication for post-to-twitter');
      return unauthorizedResponse('Authentication required');
    }

    console.log(`Post to Twitter requested by: ${userId}, auto mode: ${isAutoMode}`);

    const TWITTER_CONSUMER_KEY = Deno.env.get('TWITTER_CONSUMER_KEY');
    const TWITTER_CONSUMER_SECRET = Deno.env.get('TWITTER_CONSUMER_SECRET');
    const TWITTER_ACCESS_TOKEN = Deno.env.get('TWITTER_ACCESS_TOKEN');
    const TWITTER_ACCESS_TOKEN_SECRET = Deno.env.get('TWITTER_ACCESS_TOKEN_SECRET');

    if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
      throw new Error('Twitter API configuration missing');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // AUTO MODE: Find and post top unposted articles
    if (isAutoMode) {
      const limit = typeof body.limit === 'number' ? body.limit : 3;
      const minScore = typeof body.minScore === 'number' ? body.minScore : 75;

      // Get top-scoring articles that haven't been posted to Twitter yet
      const { data: articles, error: fetchError } = await supabase
        .from('culture_articles')
        .select(`
          id,
          title,
          paraloop_headline,
          paraloop_vibe,
          article_url,
          category,
          relevance_score
        `)
        .gte('relevance_score', minScore)
        .not('paraloop_headline', 'is', null)
        .order('relevance_score', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit * 2); // Fetch extra to filter out already posted

      if (fetchError) {
        throw new Error(`Failed to fetch articles: ${fetchError.message}`);
      }

      if (!articles || articles.length === 0) {
        console.log('No high-scoring articles to post');
        return new Response(
          JSON.stringify({ success: true, posted: 0, message: 'No articles to post' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Filter out already posted articles
      const { data: postedArticles } = await supabase
        .from('social_posts')
        .select('curated_article_id')
        .eq('platform', 'twitter')
        .in('curated_article_id', articles.map(a => a.id));

      const postedIds = new Set(postedArticles?.map(p => p.curated_article_id) || []);
      const unpostedArticles = articles.filter(a => !postedIds.has(a.id)).slice(0, limit);

      if (unpostedArticles.length === 0) {
        console.log('All high-scoring articles already posted');
        return new Response(
          JSON.stringify({ success: true, posted: 0, message: 'All articles already posted' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const results: { article_id: string; tweet_id: string; text: string }[] = [];

      for (const article of unpostedArticles) {
        try {
          // Generate tweet text
          const tweetText = `${article.paraloop_headline || article.title}\n\n${article.paraloop_vibe ? `✨ ${article.paraloop_vibe}` : ''}\n\n${article.article_url}\n\n#ParaloopCulture #${article.category?.replace('-', '') || 'Culture'}`;
          const finalText = tweetText.length > 280 ? tweetText.substring(0, 277) + '...' : tweetText;

          const tweetData = await postTweet(
            finalText,
            TWITTER_CONSUMER_KEY,
            TWITTER_CONSUMER_SECRET,
            TWITTER_ACCESS_TOKEN,
            TWITTER_ACCESS_TOKEN_SECRET
          );

          if (tweetData?.id) {
            // Log the post
            await supabase
              .from('social_posts')
              .insert({
                curated_article_id: article.id,
                platform: 'twitter',
                caption: finalText,
                external_id: tweetData.id,
                posted: true,
                posted_at: new Date().toISOString(),
              });

            results.push({
              article_id: article.id,
              tweet_id: tweetData.id,
              text: finalText
            });

            console.log(`Auto-posted article ${article.id} to Twitter: ${tweetData.id}`);
          }

          // Small delay between posts to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (postError) {
          console.error(`Failed to post article ${article.id}:`, postError);
        }
      }

      return new Response(
        JSON.stringify({ success: true, posted: results.length, tweets: results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // MANUAL MODE: Post specific article
    const validation = postToTwitterSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { article_id, custom_text } = validation.data;

    // Rate limiting for manual posts
    const { data: recentPosts } = await supabase
      .from('social_posts')
      .select('posted_at')
      .eq('platform', 'twitter')
      .gte('posted_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())
      .limit(3);

    if (recentPosts && recentPosts.length >= 3) {
      console.warn(`⚠️ Rapid Twitter posting detected for user ${userId}`);
    }

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

    const finalText = tweetText.length > 280 ? tweetText.substring(0, 277) + '...' : tweetText;

    const tweetData = await postTweet(
      finalText,
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_TOKEN_SECRET
    );

    // Log the post to social_posts table
    await supabase
      .from('social_posts')
      .insert({
        curated_article_id: article_id,
        platform: 'twitter',
        caption: finalText,
        external_id: tweetData?.id,
        posted: true,
        posted_at: new Date().toISOString(),
      });

    console.log(`User ${userId} successfully posted to Twitter:`, tweetData?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        tweet_id: tweetData?.id,
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
