// Shared CORS utilities for edge functions

// Allowed origins for restricted endpoints (like post-to-twitter)
const ALLOWED_ORIGINS = [
  'https://id-preview--a0aa4d50-3c9c-4c1a-a0c6-c40d17d28347.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
];

// Check if an origin matches any allowed pattern
function isAllowedOrigin(origin: string): boolean {
  // Exact match
  if (ALLOWED_ORIGINS.includes(origin)) {
    return true;
  }
  
  // Allow all lovable.app subdomains (preview URLs)
  if (origin.endsWith('.lovable.app')) {
    return true;
  }
  
  return false;
}

/**
 * Get CORS headers for restricted endpoints (authenticated write operations)
 * Only allows specific origins to prevent CSRF attacks
 */
export function getRestrictedCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  
  if (isAllowedOrigin(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hmac-signature, x-hmac-timestamp',
      'Access-Control-Allow-Credentials': 'true',
    };
  }
  
  // Default to first allowed origin for non-matching requests
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hmac-signature, x-hmac-timestamp',
  };
}

/**
 * Get CORS headers for public endpoints (read-only operations)
 * Uses wildcard CORS - suitable for public APIs
 */
export function getPublicCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}
