import { supabase } from "@/lib/supabase";
import { RefreshCw, Play, CheckCircle, Globe2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function Index() {
    const triggerIngest = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.functions.invoke('ingest', {
                body: { limitPerSource: 10 }
            });
            if (error) throw error;
            return data;
        }
    });

    const triggerCurate = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.functions.invoke('curate', {
                body: { maxItems: 5, minScore: 0.55 }
            });
            if (error) throw error;
            return data;
        }
    });


    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gradient mt-8 mb-4 tracking-tight">Mission Control</h1>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        The command center for Paraloop Media. Monitor ingestion, curate content, and orchestrate the cultural dialogue.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-white/50 mb-1">Status</p>
                    <p className="text-sm text-primary font-mono">Open Access</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ingest Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <RefreshCw className="w-24 h-24" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Ingestion Engine</h2>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                        Manually trigger the RSS crawler to scrape new culture articles from sources.
                    </p>

                    {triggerIngest.isError && <p className="text-xs text-destructive mb-2">Error: {triggerIngest.error.message}</p>}
                    {triggerIngest.isSuccess && <p className="text-xs text-green-400 mb-2">Ingestion triggered successfully.</p>}

                    <button
                        onClick={() => triggerIngest.mutate()}
                        disabled={triggerIngest.isPending}
                        className="w-full py-3 bg-primary/20 hover:bg-primary/30 text-primary-foreground font-semibold rounded-lg transition-colors border border-primary/50 flex items-center justify-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${triggerIngest.isPending ? 'animate-spin' : ''}`} />
                        {triggerIngest.isPending ? 'Ingesting...' : 'Run Manual Ingestion'}
                    </button>
                </div>

                {/* Curate Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle className="w-24 h-24" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Curation Queue</h2>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                        Trigger the AI evaluation to score and rewrite the freshly ingested articles.
                    </p>

                    {triggerCurate.isError && <p className="text-xs text-destructive mb-2">Error: {triggerCurate.error.message}</p>}
                    {triggerCurate.isSuccess && <p className="text-xs text-green-400 mb-2">Curation triggered successfully.</p>}

                    <button
                        onClick={() => triggerCurate.mutate()}
                        disabled={triggerCurate.isPending}
                        className="w-full py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground font-semibold rounded-lg transition-colors border border-secondary/50 flex items-center justify-center gap-2"
                    >
                        <CheckCircle className={`w-4 h-4 ${triggerCurate.isPending ? 'animate-pulse' : ''}`} />
                        {triggerCurate.isPending ? 'Curating...' : 'Run AI Evaluation'}
                    </button>
                </div>

                {/* Publish Card */}
                <div className="glass-card p-6 rounded-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Play className="w-24 h-24" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Publishing</h2>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                        Push approved AI rewrites directly to the Culture Feed and social queues.
                    </p>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-foreground font-semibold rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Force Publish
                    </button>
                </div>
            </div>

            {/* Global Distribution Network */}
            <div className="mt-12 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Globe2 className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-bold tracking-tight">Global Ingestion Nodes</h2>
                </div>
                <p className="text-muted-foreground mb-8 max-w-3xl">
                    Paraloop Clawbots are actively targeting trending cultural signals across these metropolitan hubs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* US */}
                    <div className="glass-card p-5 rounded-2xl border-white/5">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">United States</h3>
                        <ul className="text-xs text-white/70 space-y-2 column-count-2 columns-2 gap-4">
                            <li>New York City</li><li>Atlanta</li><li>Washington, D.C.</li>
                            <li>Miami</li><li>Los Angeles</li><li>Chicago</li>
                            <li>Houston</li><li>Dallas-Fort Worth</li><li>Philadelphia</li>
                            <li>Baltimore</li><li>Boston</li><li>Detroit</li>
                            <li>Charlotte</li><li>Orlando</li><li>New Orleans</li>
                            <li>Memphis</li><li>Nashville</li><li>St. Louis</li>
                            <li>Minneapolis-St. Paul</li><li>Phoenix</li><li>Las Vegas</li>
                            <li>San Francisco Bay</li><li>Seattle</li><li>Denver</li><li>Cleveland</li>
                        </ul>
                    </div>

                    {/* Europe & Canada */}
                    <div className="space-y-6">
                        <div className="glass-card p-5 rounded-2xl border-white/5">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Europe</h3>
                            <ul className="text-xs text-white/70 space-y-2 columns-2 gap-4">
                                <li>London</li><li>Birmingham</li><li>Manchester</li><li>Bristol</li>
                                <li>Liverpool</li><li>Leeds</li><li>Glasgow</li><li>Paris</li>
                                <li>Marseille</li><li>Lyon</li><li>Brussels</li><li>Amsterdam</li>
                                <li>Rotterdam</li><li>Berlin</li><li>Frankfurt</li><li>Hamburg</li>
                                <li>Stockholm</li><li>Copenhagen</li><li>Oslo</li><li>Madrid</li>
                                <li>Barcelona</li><li>Lisbon</li><li>Milan</li><li>Rome</li><li>Zurich</li>
                            </ul>
                        </div>
                        <div className="glass-card p-5 rounded-2xl border-white/5">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Canada</h3>
                            <ul className="text-xs text-white/70 space-y-2 columns-2">
                                <li>Toronto</li><li>Montreal</li><li>Ottawa</li><li>Vancouver</li><li>Calgary</li>
                            </ul>
                        </div>
                    </div>

                    {/* LatAm & Caribbean */}
                    <div className="glass-card p-5 rounded-2xl border-white/5">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">LatAm & Caribbean</h3>
                        <ul className="text-xs text-white/70 space-y-2 columns-2 gap-4">
                            <li>Salvador (Bahia)</li><li>Rio de Janeiro</li><li>São Paulo</li>
                            <li>Recife</li><li>Fortaleza</li><li>Brasília</li><li>Belo Horizonte</li>
                            <li>Porto Alegre</li><li>Havana</li><li>Santo Domingo</li>
                            <li>Port-au-Prince</li><li>Kingston</li><li>Montego Bay</li>
                            <li>Port of Spain</li><li>Bridgetown</li><li>Nassau</li>
                            <li>San Juan</li><li>Panama City</li><li>Cartagena</li>
                            <li>Cali</li><li>Medellín</li><li>Bogotá</li><li>Barranquilla</li>
                            <li>Caracas</li><li>Georgetown</li><li>Paramaribo</li>
                            <li>Buenos Aires</li><li>Montevideo</li><li>Lima</li><li>Quito</li>
                        </ul>
                    </div>

                    {/* Rest of World */}
                    <div className="space-y-6">
                        <div className="glass-card p-5 rounded-2xl border-white/5">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Africa</h3>
                            <ul className="text-xs text-white/70 space-y-2 columns-2">
                                <li>Accra</li><li>Lagos</li><li>Johannesburg</li>
                                <li>Cape Town</li><li>Nairobi</li>
                            </ul>
                        </div>
                        <div className="glass-card p-5 rounded-2xl border-white/5">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Middle East</h3>
                            <ul className="text-xs text-white/70 space-y-2 columns-2">
                                <li>Dubai</li><li>Abu Dhabi</li><li>Doha</li>
                                <li>Riyadh</li><li>Jeddah</li>
                            </ul>
                        </div>
                        <div className="glass-card p-5 rounded-2xl border-white/5">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Asia-Pacific</h3>
                            <ul className="text-xs text-white/70 space-y-2 columns-2">
                                <li>Sydney</li><li>Melbourne</li><li>Auckland</li>
                                <li>Singapore</li><li>Hong Kong</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
