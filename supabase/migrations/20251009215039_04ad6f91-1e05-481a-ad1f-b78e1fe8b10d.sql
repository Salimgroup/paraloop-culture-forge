-- Drop the overly permissive public read policy on the articles table
-- This table contains internal editorial workflow (pending articles, relevance scores, 
-- review timestamps, duplicate detection) and should NOT be publicly accessible.
-- The public feed uses curated_articles table with published=true filter instead.
DROP POLICY IF EXISTS "Public read access for articles" ON public.articles;

-- Note: The 'articles' table is for internal editorial workflow only.
-- Public access to published content is correctly served via the 'curated_articles' 
-- table which is already publicly readable and filtered by published=true in the get-feed function.