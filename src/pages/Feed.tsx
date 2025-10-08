import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TAGS = ["globalization", "creator-economy", "tech-culture", "policy", "wellness", "africa", "caribbean", "asia", "latam", "us", "eu"];

export default function Feed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentTag = searchParams.get("tag") || "";

  useEffect(() => {
    loadFeed();
  }, [currentTag]);

  async function loadFeed() {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('get-feed', {
        body: { tag: currentTag || undefined }
      });
      setArticles(data?.items || []);
    } finally {
      setLoading(false);
    }
  }

  function setTag(tag?: string) {
    if (!tag) {
      searchParams.delete("tag");
    } else {
      searchParams.set("tag", tag);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-background to-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold">Paraloop Culture Feed</h1>
        <p className="text-muted-foreground mt-2">Daily wellness-first reporting on globalization, tech, and culture.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge 
            variant={!currentTag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTag(undefined)}
          >
            All
          </Badge>
          {TAGS.map(t => (
            <Badge
              key={t}
              variant={currentTag === t ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTag(t)}
            >
              {t}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-8 w-32 mt-4" />
              </Card>
            ))
          ) : articles.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-muted-foreground">
              <div className="text-2xl font-semibold">Nothing here yet</div>
              <div className="mt-2">Check back after the morning brief.</div>
            </div>
          ) : (
            articles.map((a) => (
              <Card key={a.id} className="p-5 hover:bg-accent/50 transition cursor-pointer">
                <a href={`/article/${a.seo_slug}`}>
                  <h3 className="text-lg font-semibold">{a.headline_paraloop}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{a.summary_paraloop}</p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                    <Badge variant="secondary">{a.outlet || "culture"}</Badge>
                    <span>{new Date(a.source_published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <a 
                      className="underline hover:text-foreground" 
                      href={a.canonical_url} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {new URL(a.canonical_url).hostname.replace(/^www\./, '')}
                    </a>
                  </div>
                </a>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
