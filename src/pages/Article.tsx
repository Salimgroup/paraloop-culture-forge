import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  async function loadArticle() {
    setLoading(true);
    try {
      // Try edge function first
      try {
        const { data } = await supabase.functions.invoke('get-feed', {
          body: { slug }
        });
        if (data) {
          setArticle(data);
          return;
        }
      } catch (e) {
        console.warn('Edge function failed, trying direct query:', e);
      }

      // Fallback: query culture_articles directly
      const { data: articles } = await supabase
        .from('culture_articles')
        .select('*')
        .eq('seo_slug', slug)
        .single();

      if (articles) {
        setArticle({
          headline_paraloop: articles.paraloop_headline || articles.title,
          summary_paraloop: articles.summary_paraloop || articles.description || '',
          source_published_at: articles.created_at,
          canonical_url: articles.article_url,
          outlet: articles.source_name,
          image_url: articles.image_url
        });
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-3" />
        <Skeleton className="h-32 w-full mt-6" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
        Article not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-background to-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold">{article.headline_paraloop}</h1>
        <div className="text-muted-foreground mt-2 text-sm flex items-center gap-3">
          <span>{article.source_published_at ? new Date(article.source_published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
          {article.canonical_url && (
            <a href={article.canonical_url} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
              {new URL(article.canonical_url).hostname.replace(/^www\./, '')}
            </a>
          )}
        </div>
        
        <p className="mt-6 leading-7">{article.summary_paraloop}</p>

        {/* Source attribution */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {article.outlet && <span className="font-medium">{article.outlet}</span>}
            {article.author && <span>by {article.author}</span>}
            {article.source_region && <span>• {article.source_region}</span>}
          </div>
          {article.canonical_url && (
            <a 
              href={article.canonical_url} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              Read Full Article →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
