import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sparkles, 
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { CultureArticleCard } from "./culture/CultureArticleCard";

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

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['culture-feed', filter],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-culture-feed', {
        body: { category: filter }
      });
      if (error) throw error;
      return data?.items as CultureArticle[];
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
      // Now analyze them
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
    { value: 'music', label: '🎤 Music' },
    { value: 'streetwear', label: '👟 Streetwear' },
    { value: 'culture', label: '🌍 Culture' },
    { value: 'fine-arts', label: '🎨 Fine Arts' },
    { value: 'business', label: '💼 Business' },
    { value: 'design', label: '🏛️ Design' },
  ];

  const isRefreshing = scrapeMutation.isPending || analyzeMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Paraloop Culture
          </h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
            Your daily dose of hip-hop, streetwear, and urban culture — 
            curated and analyzed with positive vibes only ✨
          </p>
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
          <Button
            onClick={() => scrapeMutation.mutate()}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!articles || articles.length === 0) && (
          <Card className="p-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
            <p className="text-muted-foreground mb-6">
              Click "Refresh Feed" to scrape the latest culture articles and generate Paraloop analysis
            </p>
            <Button onClick={() => scrapeMutation.mutate()} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Start Scraping
            </Button>
          </Card>
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