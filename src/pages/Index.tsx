import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { ArticlesFeed } from "@/components/ArticlesFeed";
import { SourceManager } from "@/components/SourceManager";
import { LayoutDashboard, FileText, Rss } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header - Bold Split Design */}
      <div className="relative h-[400px] bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-8 h-full flex items-center">
          <div className="w-1/2 text-foreground">
            <h1 className="text-8xl font-black mb-4 leading-none">
              PARALOOP
            </h1>
            <p className="text-xl font-medium uppercase tracking-wide">
              Culture Engine. AI-Powered Curation.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-0 h-16 space-x-1">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-3 text-base font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 h-12"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="articles"
                className="flex items-center gap-3 text-base font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 h-12"
              >
                <FileText className="w-5 h-5" />
                Articles
              </TabsTrigger>
              <TabsTrigger 
                value="sources"
                className="flex items-center gap-3 text-base font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 h-12"
              >
                <Rss className="w-5 h-5" />
                Sources
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <ArticlesFeed />
          </TabsContent>

          <TabsContent value="sources" className="mt-0">
            <SourceManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
