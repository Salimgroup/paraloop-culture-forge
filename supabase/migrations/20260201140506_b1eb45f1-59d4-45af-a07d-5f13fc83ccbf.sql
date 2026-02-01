-- Update the public view to include seo_slug for article routing
-- This field is needed for URL-based article lookups but doesn't expose proprietary analysis

DROP VIEW IF EXISTS public.curated_articles_public;

CREATE VIEW public.curated_articles_public 
WITH (security_invoker = true)
AS
SELECT 
  id,
  headline_paraloop,
  summary_paraloop,
  outlet,
  author,
  source_region,
  canonical_url,
  published_at,
  source_published_at,
  seo_slug  -- Added for article routing
FROM public.curated_articles
WHERE published = true;

-- Grant public access to the view
GRANT SELECT ON public.curated_articles_public TO anon;
GRANT SELECT ON public.curated_articles_public TO authenticated;

COMMENT ON VIEW public.curated_articles_public IS 'Public-facing view of curated articles. Exposes only consumer-friendly fields while protecting proprietary content (text_extracted, wellness_angle, tl_dr_bullets, actions_next, pull_quote, social_caption) from competitor scraping.';