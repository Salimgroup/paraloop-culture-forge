// Shared authentication utilities for edge functions
import { createClient } from "npm:@supabase/supabase-js@2";

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hmac-signature, x-hmac-timestamp',
};

/**
 * Verify service role key for cron/automation calls
 * Accepts bearer token matching SUPABASE_SERVICE_ROLE_KEY
 */
export function verifyServiceRoleKey(req: Request): boolean {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.replace('Bearer ', '');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not configured');
    return false;
  }
  
  return token === serviceRoleKey;
}

/**
 * Verify CRON_SECRET header for external automation (cron-job.org, n8n, Make, etc.)
 * Simple shared secret check - easier than HMAC for external tools
 */
export function verifyCronSecret(req: Request): boolean {
  const cronSecret = req.headers.get('x-cron-secret');
  const expectedSecret = Deno.env.get('CRON_SECRET');
  
  console.log('CRON debug - received header:', cronSecret ? `"${cronSecret}" (len: ${cronSecret.length})` : 'null');
  console.log('CRON debug - expected secret:', expectedSecret ? `"${expectedSecret.substring(0, 5)}..." (len: ${expectedSecret.length})` : 'null');
  
  if (!expectedSecret) {
    console.error('CRON_SECRET not configured');
    return false;
  }
  
  if (!cronSecret) {
    console.error('Missing x-cron-secret header');
    return false;
  }
  
  const match = cronSecret.trim() === expectedSecret.trim();
  console.log('CRON debug - match:', match);
  return match;
}

/**
 * Verify HMAC signature for server-to-server calls (cron jobs, internal automation)
 * Uses SUPABASE_SERVICE_ROLE_KEY as the shared secret
 */
export async function verifyHmacSignature(req: Request): Promise<boolean> {
  const signature = req.headers.get('x-hmac-signature');
  const timestamp = req.headers.get('x-hmac-timestamp');
  
  if (!signature || !timestamp) {
    console.log('HMAC: Missing signature or timestamp headers');
    return false;
  }
  
  // Reject requests older than 5 minutes to prevent replay attacks
  const requestTime = parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - requestTime) > 300) {
    console.error('HMAC timestamp expired');
    return false;
  }
  
  const secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!secret) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not configured');
    return false;
  }
  
  // Create HMAC signature from timestamp + method + path
  // Edge functions receive the full path including /functions/v1/
  const url = new URL(req.url);
  console.log('HMAC debug - URL:', req.url, 'pathname:', url.pathname);
  const message = `${timestamp}:${req.method}:${url.pathname}`;
  console.log('HMAC debug - message:', message);
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return signature === expectedSignature;
}

/**
 * Verify JWT authentication for user-triggered operations
 * Returns user ID if authenticated, null otherwise
 */
export async function verifyUserAuth(req: Request): Promise<{ userId: string; email?: string } | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  );
  
  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabase.auth.getClaims(token);
  
  if (error || !data?.claims) {
    console.error('JWT verification failed:', error?.message);
    return null;
  }
  
  return {
    userId: data.claims.sub as string,
    email: data.claims.email as string | undefined,
  };
}

/**
 * Create unauthorized response with proper CORS headers
 */
export function unauthorizedResponse(message = 'Unauthorized'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    { 
      status: 401, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

/**
 * Create bad request response for validation errors
 */
export function badRequestResponse(message: string, details?: unknown): Response {
  return new Response(
    JSON.stringify({ error: message, details }),
    { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}
