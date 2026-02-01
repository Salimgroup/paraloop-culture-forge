-- Create table for scraped culture articles with AI analysis
CREATE TABLE public.culture_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  article_url TEXT NOT NULL UNIQUE,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  relevance_score NUMERIC DEFAULT 0,
  paraloop_headline TEXT,
  paraloop_analysis TEXT,
  paraloop_vibe TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.culture_articles ENABLE ROW LEVEL SECURITY;

-- Public read access for published culture articles
CREATE POLICY "Public read access for culture_articles" 
ON public.culture_articles 
FOR SELECT 
USING (paraloop_analysis IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_culture_articles_updated_at
BEFORE UPDATE ON public.culture_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();