import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Clock,
  Sparkles,
  Globe
} from "lucide-react";

export function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [articlesData, curatedData, sourcesData] = await Promise.all([
        supabase.from('articles').select('status', { count: 'exact' }),
        supabase.from('curated_articles').select('published', { count: 'exact' }),
        supabase.from('sources').select('active', { count: 'exact' })
      ]);

      const statusCounts = articlesData.data?.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const publishedCount = curatedData.data?.filter(a => a.published).length || 0;
      const activeSources = sourcesData.data?.filter(s => s.active).length || 0;

      return {
        pending: statusCounts.pending || 0,
        scored: statusCounts.scored || 0,
        approved: statusCounts.approved || 0,
        published: publishedCount,
        totalSources: activeSources
      };
    }
  });

  const statCards = [
    {
      label: "Pending Review",
      value: stats?.pending || 0,
      icon: Clock,
      color: "text-warning",
      bgGradient: "from-warning/10 to-warning/5"
    },
    {
      label: "AI Scored",
      value: stats?.scored || 0,
      icon: Sparkles,
      color: "text-info",
      bgGradient: "from-info/10 to-info/5"
    },
    {
      label: "Approved",
      value: stats?.approved || 0,
      icon: CheckCircle,
      color: "text-success",
      bgGradient: "from-success/10 to-success/5"
    },
    {
      label: "Published",
      value: stats?.published || 0,
      icon: TrendingUp,
      color: "text-secondary",
      bgGradient: "from-secondary/10 to-secondary/5"
    },
    {
      label: "Active Sources",
      value: stats?.totalSources || 0,
      icon: Globe,
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary/5"
    },
    {
      label: "Total Articles",
      value: (stats?.pending || 0) + (stats?.scored || 0) + (stats?.approved || 0),
      icon: FileText,
      color: "text-accent",
      bgGradient: "from-accent/10 to-accent/5"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 shadow-glow">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Paraloop Culture Engine
          </h1>
          <p className="text-white/90 text-lg">
            AI-powered content curation for global culture news
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.label}
              className={`p-6 border-0 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-card ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-card border-0">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Badge 
            variant="secondary" 
            className="px-4 py-2 cursor-pointer hover:shadow-md transition-shadow"
            onClick={async () => {
              try {
                const { error } = await supabase.functions.invoke('import-sources');
                if (error) throw error;
                window.location.reload();
              } catch (err) {
                console.error('Error importing sources:', err);
              }
            }}
          >
            Import Starter Sources
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary/5 transition-colors">
            Fetch New Articles
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary/5 transition-colors">
            Run AI Scoring
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary/5 transition-colors">
            Generate Social Copy
          </Badge>
        </div>
      </Card>
    </div>
  );
}
