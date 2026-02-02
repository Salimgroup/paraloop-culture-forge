import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  ExternalLink, 
  Sparkles, 
  Music2, 
  Shirt, 
  Globe,
  TrendingUp,
  Send,
  ImageOff
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SocialShareButtons } from "./SocialShareButtons";
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

type CultureArticleCardProps = {
  article: CultureArticle;
};

export function CultureArticleCard({ article }: CultureArticleCardProps) {
  const [isPosting, setIsPosting] = useState(false);
  const { canManageContent } = useUserRole();
  const config = categoryConfig[article.category || 'culture'] || categoryConfig.culture;
  const Icon = config.icon;
  const vibeGradient = vibeColors[article.paraloop_vibe || ''] || 'from-primary to-purple-400';

  const handlePostToTwitter = async () => {
    setIsPosting(true);
    try {
      const { data, error } = await supabase.functions.invoke('post-to-twitter', {
        body: { article_id: article.id }
      });
      
      if (error) throw error;
      
      toast.success('Posted to Twitter!', {
        description: `Tweet ID: ${data.tweet_id}`
      });
    } catch (err) {
      toast.error('Failed to post', {
        description: (err as Error).message
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
      {/* Article Image */}
      {article.image_url ? (
        <a href={article.article_url} target="_blank" rel="noopener noreferrer">
          <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
            <img
              src={article.image_url}
              alt={article.paraloop_headline || article.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Hide broken images
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </AspectRatio>
        </a>
      ) : (
        <AspectRatio ratio={16 / 9} className="bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-muted-foreground/30" />
        </AspectRatio>
      )}

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

        {/* Social Share + Post */}
        <div className="flex items-center justify-between">
          <SocialShareButtons 
            url={article.article_url} 
            title={article.paraloop_headline || article.title}
            summary={article.paraloop_analysis || article.excerpt || undefined}
          />
          {canManageContent && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePostToTwitter}
              disabled={isPosting}
              className="gap-1"
            >
              <Send className="w-3 h-3" />
              {isPosting ? 'Posting...' : 'Post'}
            </Button>
          )}
        </div>

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
