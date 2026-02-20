import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sparkles,
  RefreshCw,
  LogIn,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { CultureArticleCard } from "./culture/CultureArticleCard";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";

type CultureArticle = {
  id: string;
  source_name: string;
  title: string;
  excerpt: string | null;
  article_url: string;
  image_url: string | null;
  category: string | null;
  relevance_score: number | null;
  paraloop_headline: string | null;
  paraloop_analysis: string | null;
  paraloop_vibe: string | null;
  tags: string[] | null;
  created_at: string;
};

export function CultureFeed() {
  const [filter, setFilter] = useState<string>("all");
  const queryClient = useQueryClient();
  const { isAuthenticated, signOut, user } = useAuth();
  const { canManageContent } = useUserRole();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['culture-feed', filter],
    queryFn: async () => {
      // Try edge function first
      try {
        const { data, error } = await supabase.functions.invoke('get-culture-feed', {
          body: { category: filter !== 'all' ? filter : undefined }
        });
        if (!error && data?.items?.length > 0) {
          return data.items as CultureArticle[];
        }
      } catch (e) {
        console.warn('Edge function failed, falling back to direct query:', e);
      }

      // Fallback: query culture_articles directly
      let query = supabase
        .from('culture_articles')
        .select('id, source_name, title, excerpt, article_url, image_url, category, relevance_score, paraloop_headline, paraloop_analysis, paraloop_vibe, tags, created_at')
        .order('created_at', { ascending: false })
        .limit(24);

      if (filter && filter !== 'all') {
        query = query.eq('category', filter);
      }

      const { data: rows, error } = await query;
      if (error) throw error;
      return (rows || []) as CultureArticle[];
    }
  });

  const scrapeMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('scrape-culture-sites');
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Scraped ${data?.count || 0} new articles!`);
      analyzeMutation.mutate();
    },
    onError: (error) => {
      toast.error('Failed to scrape sites: ' + (error as Error).message);
    }
  });

  const analyzeMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('analyze-culture-articles');
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Analyzed ${data?.analyzed || 0} articles with Paraloop!`);
      queryClient.invalidateQueries({ queryKey: ['culture-feed'] });
    },
    onError: (error) => {
      toast.error('Failed to analyze: ' + (error as Error).message);
    }
  });

  const categories = [
    { value: 'all', label: 'All Culture' },
    { value: 'music', label: 'Music' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'culture', label: 'Culture' },
    { value: 'fine-arts', label: 'Fine Arts' },
    { value: 'business', label: '💼 Business' },
    { value: 'design', label: '🏛️ Design' },
  ];

  const isRefreshing = scrapeMutation.isPending || analyzeMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Auth Header */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Hero - Calm & Welcoming with 3D Background */}
        <div className="relative text-center mb-12 py-16 bg-gradient-hero rounded-2xl overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass-dark rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Culture Intelligence</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Paraloop Culture
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed glass-dark inline-block px-6 py-3 rounded-2xl shadow-lg">
              Your daily dose of hip-hop, streetwear, and urban culture —
              curated and analyzed with positive vibes only
            </p>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                variant={filter === cat.value ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer transition-all hover:scale-105"
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
          {canManageContent && (
            <Button
              onClick={() => scrapeMutation.mutate()}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
            </Button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                <Skeleton className="h-5 w-3/4 mb-4 bg-muted/30 rounded-lg" />
                <Skeleton className="h-20 w-full mb-4 bg-muted/30 rounded-lg" />
                <Skeleton className="h-4 w-1/2 bg-muted/30 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!articles || articles.length === 0) && (
          <div className="glass-card p-16 text-center rounded-3xl">
            <Sparkles className="w-14 h-14 mx-auto text-primary/60 mb-6" />
            <h3 className="text-2xl font-bold mb-3">No articles yet</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
              {canManageContent
                ? 'Click "Refresh Feed" to scrape the latest culture articles and generate Paraloop analysis'
                : 'Check back soon for fresh culture content!'
              }
            </p>
            {canManageContent && (
              <Button onClick={() => scrapeMutation.mutate()} disabled={isRefreshing} className="rounded-full shadow-md">
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Start Scraping
              </Button>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && articles && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <CultureArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
