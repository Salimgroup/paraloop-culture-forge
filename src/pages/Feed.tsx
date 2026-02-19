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
      // Try edge function first
      try {
        const { data } = await supabase.functions.invoke('get-feed', {
          body: { tag: currentTag || undefined }
        });
        if (data?.items?.length > 0) {
          setArticles(data.items);
          return;
        }
      } catch (e) {
        console.warn('Edge function failed, trying direct query:', e);
      }

      // Fallback: query culture_articles directly
      let query = supabase
        .from('culture_articles')
        .select('id, title, paraloop_headline, article_url, category, relevance_score, source_name, image_url, created_at, summary_paraloop, seo_slug')
        .order('relevance_score', { ascending: false });

      if (currentTag) {
        query = query.eq('category', currentTag);
      }

      const { data: articles } = await query.limit(24);

      setArticles((articles || []).map((a: any) => ({
        id: a.id,
        title: a.paraloop_headline || a.title,
        headline_paraloop: a.paraloop_headline || a.title,
        article_url: a.article_url,
        canonical_url: a.article_url,
        category: a.category,
        outlet: a.source_name,
        image_url: a.image_url,
        relevance_score: a.relevance_score,
        source_published_at: a.created_at,
        published_at: a.created_at,
        summary_paraloop: a.summary_paraloop || '',
        seo_slug: a.seo_slug || a.id
      })));
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
    <div className="min-h-screen bg-background">
      {/* Hero Section - Bold Typography */}
      <div className="bg-gradient-hero py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="w-1/2">
            <h1 className="text-9xl font-black mb-6 leading-none">
              CULTURE<br/>
              <span className="text-primary">FEED</span>
            </h1>
            <p className="text-2xl font-medium uppercase tracking-wide">
              Daily wellness-first reporting.<br/>
              Globalization. Tech. Culture.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Tag Filters */}
        <div className="mb-16 flex flex-wrap gap-4">
          <button 
            className={`px-8 py-4 font-bold uppercase text-sm tracking-wider transition-all ${
              !currentTag 
                ? "bg-primary text-primary-foreground" 
                : "bg-card text-foreground hover:bg-muted"
            }`}
            onClick={() => setTag(undefined)}
          >
            All
          </button>
          {TAGS.map(t => (
            <button
              key={t}
              className={`px-8 py-4 font-bold uppercase text-sm tracking-wider transition-all ${
                currentTag === t 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-foreground hover:bg-muted"
              }`}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card p-12">
                <Skeleton className="h-8 w-3/4 mb-6 bg-muted" />
                <Skeleton className="h-4 w-full mb-3 bg-muted" />
                <Skeleton className="h-4 w-full mb-3 bg-muted" />
                <Skeleton className="h-10 w-40 mt-8 bg-muted" />
              </div>
            ))
          ) : articles.length === 0 ? (
            <div className="col-span-2 text-center py-32 bg-card">
              <div className="text-6xl font-black mb-4">NOTHING HERE YET</div>
              <div className="text-xl text-muted-foreground uppercase tracking-wider">Check back after the morning brief.</div>
            </div>
          ) : (
            articles.map((a) => (
              <div key={a.id} className="bg-card p-12 hover:bg-muted group transition-all duration-300 border-l-4 border-transparent hover:border-primary">
                <a href={`/article/${a.seo_slug}`}>
                  <h3 className="text-3xl font-black mb-6 group-hover:text-primary transition-colors uppercase leading-tight">
                    {a.headline_paraloop}
                  </h3>
                  <p className="text-base text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                    {a.summary_paraloop}
                  </p>
                  <div className="flex items-center gap-6 text-xs uppercase font-bold tracking-wider">
                    <span className="bg-primary text-primary-foreground px-4 py-2">
                      {a.outlet || "culture"}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(a.source_published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <a 
                      className="text-primary hover:text-foreground transition-colors" 
                      href={a.canonical_url} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {new URL(a.canonical_url).hostname.replace(/^www\./, '')}
                    </a>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
