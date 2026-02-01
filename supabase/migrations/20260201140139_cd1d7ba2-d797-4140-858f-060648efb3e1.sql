-- Create a public view for curated_articles that only exposes consumer-friendly fields
-- This protects proprietary content analysis from being scraped by competitors

CREATE VIEW public.curated_articles_public AS
SELECT 
  id,
  headline_paraloop,
  summary_paraloop,
  outlet,
  author,
  source_region,
  canonical_url,
  published_at,
  source_published_at
FROM public.curated_articles
WHERE published = true;

-- Grant public access to the view
GRANT SELECT ON public.curated_articles_public TO anon;
GRANT SELECT ON public.curated_articles_public TO authenticated;

-- Drop the existing public read policy on curated_articles
DROP POLICY IF EXISTS "Public read published only" ON public.curated_articles;

-- Add a comment to document the security design
COMMENT ON VIEW public.curated_articles_public IS 'Public-facing view of curated articles. Exposes only consumer-friendly fields (headline, summary, source info) while protecting proprietary content (text_extracted, wellness_angle, tl_dr_bullets, actions_next, pull_quote, seo_slug, social_caption) from competitor scraping.';