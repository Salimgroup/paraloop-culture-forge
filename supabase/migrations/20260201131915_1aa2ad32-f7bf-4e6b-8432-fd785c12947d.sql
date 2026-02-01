-- Fix 1: Add RLS policies for articles table (admins/editors can manage)
CREATE POLICY "Admins can manage articles" ON articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can manage articles" ON articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

-- Fix 2: Remove duplicate SELECT policy for sources (the ALL policy already covers SELECT)
DROP POLICY IF EXISTS "Admins can view sources" ON sources;

-- Fix 3: Add published column to culture_articles and update RLS
ALTER TABLE culture_articles ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT false;

-- Update the RLS policy to require both analysis and published flag
DROP POLICY IF EXISTS "Public read access for culture_articles" ON culture_articles;
CREATE POLICY "Public read published analyzed articles" ON culture_articles
  FOR SELECT USING (paraloop_analysis IS NOT NULL AND published = true);

-- Admin/editor policies for culture_articles
CREATE POLICY "Admins can manage culture_articles" ON culture_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can manage culture_articles" ON culture_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'editor'));