import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ExternalLink, 
  Sparkles, 
  Music2, 
  Shirt, 
  Globe,
  RefreshCw,
  TrendingUp
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

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

const categoryConfig: Record<string, { icon: any; color: string; label: string }> = {
  "music": { icon: Music2, color: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Music" },
  "streetwear": { icon: Shirt, color: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "Streetwear" },
  "culture": { icon: Globe, color: "bg-pink-500/10 text-pink-400 border-pink-500/20", label: "Culture" },
  "fine-arts": { icon: Sparkles, color: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Fine Arts" },
  "business": { icon: TrendingUp, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Business" },
  "design": { icon: Globe, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", label: "Design" },
};

const vibeColors: Record<string, string> = {
  "Fresh": "from-green-500 to-emerald-400",
  "Game-Changing": "from-purple-500 to-pink-400",
  "Iconic": "from-yellow-500 to-orange-400",
  "Culture Shift": "from-blue-500 to-cyan-400",
  "Legendary": "from-amber-500 to-red-400",
  "Revolutionary": "from-rose-500 to-purple-400",
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

function CultureArticleCard({ article }: { article: CultureArticle }) {
  const config = categoryConfig[article.category || 'culture'] || categoryConfig.culture;
  const Icon = config.icon;
  const vibeGradient = vibeColors[article.paraloop_vibe || ''] || 'from-primary to-purple-400';

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
      {/* Vibe Banner */}
      {article.paraloop_vibe && (
        <div className={`h-1.5 bg-gradient-to-r ${vibeGradient}`} />
      )}
      
      <div className="p-6 space-y-4">
        {/* Meta Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={config.color}>
              <Icon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {article.source_name}
            </span>
          </div>
          {article.relevance_score && article.relevance_score > 70 && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <TrendingUp className="w-3 h-3" />
              {article.relevance_score}
            </div>
          )}
        </div>

        {/* Paraloop Headline */}
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {article.paraloop_headline || article.title}
        </h3>

        {/* Paraloop Analysis */}
        {article.paraloop_analysis && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {article.paraloop_analysis}
          </p>
        )}

        {/* Vibe Tag */}
        {article.paraloop_vibe && (
          <Badge className={`bg-gradient-to-r ${vibeGradient} text-white border-0`}>
            <Sparkles className="w-3 h-3 mr-1" />
            {article.paraloop_vibe}
          </Badge>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
          </span>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <a href={article.article_url} target="_blank" rel="noopener noreferrer">
              Read Original
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
