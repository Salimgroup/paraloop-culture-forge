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
      const { data } = await supabase.functions.invoke('get-feed', {
        body: { slug }
      });
      setArticle(data);
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
          <span>{new Date(article.source_published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <a href={article.canonical_url} target="_blank" className="underline hover:text-foreground">
            {new URL(article.canonical_url).hostname.replace(/^www\./, '')}
          </a>
        </div>
        
        <p className="mt-6 leading-7">{article.summary_paraloop}</p>

        <Card className="mt-6 p-4">
          <div className="font-medium">TL;DR</div>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            {article.tl_dr_bullets?.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </Card>

        {article.pull_quote?.text && (
          <figure className="mt-6 border-l-4 border-primary pl-4 italic">
            "{article.pull_quote.text}"
            <figcaption className="text-xs text-muted-foreground mt-2">
              — {article.pull_quote.attribution}
            </figcaption>
          </figure>
        )}

        {article.wellness_angle && (
          <Card className="mt-6 p-4 bg-accent">
            <div className="font-medium">Wellness Angle</div>
            <p className="mt-2 text-muted-foreground">{article.wellness_angle}</p>
          </Card>
        )}

        {article.actions_next?.length > 0 && (
          <div className="mt-6">
            <div className="font-medium">Do Next</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
              {article.actions_next.map((action: string, i: number) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        )}

        {article.social_caption && (
          <Card className="mt-6 p-4">
            <div className="font-medium mb-2">Share</div>
            <p className="text-sm text-muted-foreground">{article.social_caption} #ParaloopCulture</p>
          </Card>
        )}
      </div>
    </div>
  );
}
