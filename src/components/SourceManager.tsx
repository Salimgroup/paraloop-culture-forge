import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Rss, ExternalLink, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export function SourceManager() {
  const queryClient = useQueryClient();

  const { data: sources, isLoading } = useQuery({
    queryKey: ['sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sources')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string, active: boolean }) => {
      const { error } = await supabase
        .from('sources')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] });
      toast.success('Source updated successfully');
    },
    onError: () => {
      toast.error('Failed to update source');
    }
  });

  const handleToggle = (id: string, currentActive: boolean) => {
    toggleActiveMutation.mutate({ id, active: !currentActive });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Source Manager</h2>
          <p className="text-muted-foreground mt-1">
            Manage your RSS feeds and web sources
          </p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90">
          Add Source
        </Button>
      </div>

      {/* Sources Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4" />
              <div className="h-3 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources?.map((source) => (
            <Card 
              key={source.id}
              className={`p-6 transition-all duration-300 border-0 bg-gradient-card ${
                source.active 
                  ? 'hover:shadow-lg' 
                  : 'opacity-60'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      source.type === 'rss' 
                        ? 'bg-secondary/10 text-secondary' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {source.type === 'rss' ? (
                        <Rss className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{source.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new URL(source.url).hostname}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={source.active}
                    onCheckedChange={() => handleToggle(source.id, source.active)}
                    disabled={toggleActiveMutation.isPending}
                  />
                </div>

                {/* Meta Info */}
                <div className="space-y-2">
                  {source.regions && source.regions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {source.regions.map((region, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Weight: {source.weight}
                    </span>
                    {source.bias_label && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {source.bias_label}
                      </Badge>
                    )}
                  </div>

                  {source.last_fetched_at && (
                    <p className="text-xs text-muted-foreground">
                      Last fetched {formatDistanceToNow(new Date(source.last_fetched_at), { addSuffix: true })}
                    </p>
                  )}
                </div>

                {/* Notes */}
                {source.notes && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {source.notes}
                  </p>
                )}

                {/* Actions */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-2"
                  asChild
                >
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                    Visit Source
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
