import { corsHeaders, verifyCronSecret, unauthorizedResponse } from "../_shared/auth.ts";

/**
 * Secure automation endpoint for external cron services
 * 
 * Usage:
 * POST /functions/v1/automation-trigger
 * Headers:
 *   x-cron-secret: YOUR_CRON_SECRET_VALUE
 *   Content-Type: application/json
 * Body:
 *   { "action": "scrape" | "analyze" | "post" }
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify CRON_SECRET
    if (!verifyCronSecret(req)) {
      console.error('Invalid or missing CRON_SECRET');
      return unauthorizedResponse('Invalid or missing x-cron-secret header');
    }

    // Parse request body
    let body: { action?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is OK for simple triggers
    }

    const action = body.action || 'default';
    console.log(`Automation triggered with action: ${action}`);

    // Route to appropriate handler based on action
    const baseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!baseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase configuration');
    }

    let targetFunction: string | null = null;
    let targetBody: Record<string, unknown> = {};

    switch (action) {
      case 'scrape':
        targetFunction = 'scrape-culture-sites';
        break;
      case 'analyze':
        targetFunction = 'analyze-culture-articles';
        break;
      case 'post':
        // For social posting, you'd need to specify which article
        targetFunction = 'post-to-twitter';
        break;
      default:
        // Just log and return success for default/ping action
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Automation endpoint ready',
            timestamp: new Date().toISOString()
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Generate HMAC signature for internal function call
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const message = `${timestamp}:POST:/functions/v1/${targetFunction}`;
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(serviceRoleKey);
    const messageData = encoder.encode(message);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Call internal function with HMAC auth
    const response = await fetch(`${baseUrl}/functions/v1/${targetFunction}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hmac-signature': signature,
        'x-hmac-timestamp': timestamp,
      },
      body: JSON.stringify(targetBody),
    });

    const result = await response.json();

    return new Response(
      JSON.stringify({ 
        success: response.ok,
        action,
        result,
        timestamp: new Date().toISOString()
      }),
      { 
        status: response.ok ? 200 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in automation-trigger:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
