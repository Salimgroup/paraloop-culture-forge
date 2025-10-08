-- Create sources table for RSS/web feeds
CREATE TABLE public.sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('rss', 'site')),
  weight NUMERIC NOT NULL DEFAULT 1.0,
  bias_label TEXT,
  regions TEXT[] DEFAULT '{}',
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  last_fetched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create articles table for raw candidate articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES public.sources(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  url TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  region_hint TEXT,
  
  -- AI relevance scoring
  relevance_score NUMERIC,
  impact_level TEXT CHECK (impact_level IN ('low', 'medium', 'high')),
  category TEXT CHECK (category IN ('globalization', 'creator_economy', 'policy', 'tech_culture', 'wellness', 'other')),
  topics TEXT[] DEFAULT '{}',
  regions TEXT[] DEFAULT '{}',
  reasons TEXT[] DEFAULT '{}',
  flags TEXT[] DEFAULT '{}',
  duplicate_of TEXT,
  
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scored', 'approved', 'rejected', 'published')),
  scored_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create curated_articles table for AI-rewritten content
CREATE TABLE public.curated_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  
  -- Source attribution
  title_source TEXT NOT NULL,
  text_extracted TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  outlet TEXT NOT NULL,
  author TEXT,
  source_region TEXT,
  source_published_at TIMESTAMP WITH TIME ZONE,
  
  -- Paraloop rewrite
  headline_paraloop TEXT NOT NULL,
  summary_paraloop TEXT NOT NULL,
  tl_dr_bullets TEXT[] NOT NULL,
  pull_quote JSONB NOT NULL,
  wellness_angle TEXT NOT NULL,
  actions_next TEXT[] NOT NULL,
  social_caption TEXT NOT NULL,
  seo_slug TEXT NOT NULL UNIQUE,
  
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_posts table
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  curated_article_id UUID NOT NULL REFERENCES public.curated_articles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'threads', 'bluesky')),
  caption TEXT NOT NULL,
  hashtag TEXT NOT NULL DEFAULT '#ParaloopCulture',
  posted BOOLEAN NOT NULL DEFAULT false,
  posted_at TIMESTAMP WITH TIME ZONE,
  external_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curated_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (this is a content curation platform)
CREATE POLICY "Public read access for sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Public read access for articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public read access for curated_articles" ON public.curated_articles FOR SELECT USING (true);
CREATE POLICY "Public read access for social_posts" ON public.social_posts FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_relevance_score ON public.articles(relevance_score DESC) WHERE status = 'scored';
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_curated_articles_published ON public.curated_articles(published, published_at DESC);
CREATE INDEX idx_sources_active ON public.sources(active);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_sources_updated_at
  BEFORE UPDATE ON public.sources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_curated_articles_updated_at
  BEFORE UPDATE ON public.curated_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();