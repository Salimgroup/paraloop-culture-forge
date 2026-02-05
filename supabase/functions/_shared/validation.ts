// Shared validation utilities using Zod
import { z } from "npm:zod@3.22.4";

// UUID validation schema
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Post to Twitter input validation
export const postToTwitterSchema = z.object({
  article_id: uuidSchema,
  custom_text: z.string().max(280, 'Custom text must be 280 characters or less').optional(),
});

// Judge relevance article validation
export const judgeRelevanceSchema = z.object({
  article: z.object({
    id: uuidSchema,
    title: z.string().max(1000, 'Title must be 1000 characters or less'),
    url: z.string().url('Invalid URL format').optional(),
    excerpt: z.string().max(5000, 'Excerpt must be 5000 characters or less').optional(),
    domain: z.string().max(255, 'Domain must be 255 characters or less').optional(),
    published_at: z.string().optional(),
    region_hint: z.string().max(100, 'Region hint must be 100 characters or less').optional(),
  }),
});

// Rewrite article input validation
export const rewriteArticleSchema = z.object({
  article: z.object({
    id: uuidSchema,
    title: z.string().max(1000, 'Title must be 1000 characters or less'),
    url: z.string().url('Invalid URL format'),
    domain: z.string().max(255, 'Domain must be 255 characters or less'),
    published_at: z.string().optional(),
    region_hint: z.string().max(100, 'Region hint must be 100 characters or less').optional(),
    reasons: z.array(z.string().max(500)).max(10).optional(),
  }),
  extractedText: z.string().max(50000, 'Extracted text must be 50KB or less'),
});

// Generate social input validation
export const generateSocialSchema = z.object({
  curatedArticleId: uuidSchema,
  platform: z.enum(['twitter', 'facebook', 'instagram', 'linkedin'], {
    errorMap: () => ({ message: 'Platform must be twitter, facebook, instagram, or linkedin' }),
  }).optional().default('twitter'),
});

// Culture feed query validation
export const cultureFeedQuerySchema = z.object({
  category: z.string().max(50).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(24),
});

// Feed query validation
export const feedQuerySchema = z.object({
  tag: z.string().max(50).optional(),
  slug: z.string().max(200).optional(),
});

// Helper function to safely parse JSON body with size limit
export async function parseJsonBody(req: Request, maxSizeKB = 100): Promise<unknown> {
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > maxSizeKB * 1024) {
    throw new Error(`Request body too large (max ${maxSizeKB}KB)`);
  }
  
  const text = await req.text();
  if (text.length > maxSizeKB * 1024) {
    throw new Error(`Request body too large (max ${maxSizeKB}KB)`);
  }
  
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON body');
  }
}

export { z };
