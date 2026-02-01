-- Fix the SECURITY DEFINER view issue by explicitly setting SECURITY INVOKER
-- This ensures the view respects the querying user's permissions

ALTER VIEW public.curated_articles_public SET (security_invoker = true);