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
      label: "PENDING",
      value: stats?.pending || 0,
      icon: Clock,
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground"
    },
    {
      label: "AI SCORED",
      value: stats?.scored || 0,
      icon: Sparkles,
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    },
    {
      label: "APPROVED",
      value: stats?.approved || 0,
      icon: CheckCircle,
      bgColor: "bg-card",
      textColor: "text-foreground"
    }
  ];

  const largeStats = [
    {
      number: stats?.published || 0,
      label: "PUBLISHED ARTICLES",
      icon: TrendingUp
    },
    {
      number: stats?.totalSources || 0,
      label: "ACTIVE SOURCES",
      icon: Globe
    },
    {
      number: (stats?.pending || 0) + (stats?.scored || 0) + (stats?.approved || 0),
      label: "TOTAL IN PIPELINE",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-16">
      {/* Small Stats - Split Design */}
      <div className="grid grid-cols-3 gap-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className={`${stat.bgColor} ${stat.textColor} p-12 aspect-square flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-glow transition-all duration-300`}
            >
              <Icon className="w-12 h-12 mb-6 opacity-50" />
              <div className="text-7xl font-black mb-4">
                {stat.value}
              </div>
              <div className="text-sm font-bold tracking-widest">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Large Stats - Bold Typography */}
      <div className="space-y-8">
        {largeStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="bg-card border-l-8 border-primary p-12 flex items-center justify-between group hover:bg-muted/50 transition-all duration-300"
            >
              <div>
                <div className="text-8xl font-black text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-muted-foreground tracking-widest">
                  {stat.label}
                </div>
              </div>
              <Icon className="w-24 h-24 text-primary/20 group-hover:text-primary/40 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-hero p-16">
        <h2 className="text-4xl font-black mb-8 text-foreground">
          QUICK ACTIONS
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <button 
            className="bg-background text-foreground p-8 font-bold text-xl uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2 border-foreground"
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
          </button>
          <button className="bg-primary text-primary-foreground p-8 font-bold text-xl uppercase hover:shadow-glow transition-all duration-300">
            Fetch New Articles
          </button>
          <button className="bg-secondary text-secondary-foreground p-8 font-bold text-xl uppercase hover:bg-foreground hover:text-background transition-all duration-300">
            Run AI Scoring
          </button>
          <button className="bg-card text-foreground p-8 font-bold text-xl uppercase border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            Generate Social Copy
          </button>
        </div>
      </div>
    </div>
  );
}
