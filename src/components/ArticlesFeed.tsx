import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Filter, 
  TrendingUp, 
  ExternalLink,
  Sparkles,
  Globe,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const categoryColors: Record<string, string> = {
  globalization: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  creator_economy: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  policy: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  tech_culture: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  wellness: "bg-green-500/10 text-green-500 border-green-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20"
};

const impactIcons: Record<string, string> = {
  high: "🔥",
  medium: "⚡",
  low: "💡"
};

export function ArticlesFeed() {
  const [filter, setFilter] = useState<string>("all");

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', filter],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const filters = [
    { value: 'all', label: 'All Articles' },
    { value: 'pending', label: 'Pending' },
    { value: 'scored', label: 'AI Scored' },
    { value: 'approved', label: 'Approved' },
    { value: 'published', label: 'Published' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Article Feed</h2>
          <p className="text-muted-foreground mt-1">
            AI-curated culture stories from around the world
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Badge
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            className="px-4 py-2 cursor-pointer transition-all hover:shadow-md"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Badge>
        ))}
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4" />
              <div className="h-3 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles?.map((article) => (
            <Card 
              key={article.id}
              className="group p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card overflow-hidden relative"
            >
              {/* Relevance Score Badge */}
              {article.relevance_score && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {(article.relevance_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{article.domain}</span>
                  {article.published_at && (
                    <>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.category && (
                    <Badge 
                      variant="outline" 
                      className={categoryColors[article.category] || categoryColors.other}
                    >
                      {article.category.replace('_', ' ')}
                    </Badge>
                  )}
                  {article.impact_level && (
                    <Badge variant="outline" className="border-muted">
                      {impactIcons[article.impact_level]} {article.impact_level}
                    </Badge>
                  )}
                  {article.region_hint && (
                    <Badge variant="secondary" className="text-xs">
                      {article.region_hint}
                    </Badge>
                  )}
                </div>

                {/* Reasons */}
                {article.reasons && article.reasons.length > 0 && (
                  <div className="space-y-1">
                    {article.reasons.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <TrendingUp className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      View Source
                    </a>
                  </Button>
                  <Badge variant="outline" className="capitalize">
                    {article.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
