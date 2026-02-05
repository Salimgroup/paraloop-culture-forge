-- Add public read policy for published curated articles
-- This allows the curated_articles_public view to work correctly
-- since it uses security_invoker=true and inherits RLS from the base table

CREATE POLICY "Public read published curated_articles"
ON public.curated_articles
FOR SELECT
USING (published = true);