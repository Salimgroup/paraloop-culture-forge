
-- Fix 1: Remove public read from curated_articles base table
-- The curated_articles_public view already handles safe public access
DROP POLICY IF EXISTS "Public read published curated_articles" ON public.curated_articles;

-- Fix 2: Remove public read from culture_articles base table  
DROP POLICY IF EXISTS "Public read published analyzed articles" ON public.culture_articles;

-- Create a safe public view for culture_articles (excludes proprietary fields)
CREATE OR REPLACE VIEW public.culture_articles_public
WITH (security_invoker = true) AS
SELECT 
  id,
  source_name,
  title,
  excerpt,
  article_url,
  image_url,
  category,
  tags,
  published_at,
  created_at
FROM public.culture_articles
WHERE published = true AND paraloop_analysis IS NOT NULL;

-- Grant access to the view
GRANT SELECT ON public.culture_articles_public TO anon;
GRANT SELECT ON public.culture_articles_public TO authenticated;
