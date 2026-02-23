import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Compass, Sparkles } from "lucide-react";

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
    created_at: string;
};

// Fallback high-fashion/cinematic media (images & video loops) if an article is missing one
const fallbackMedia = [
    "https://cdn.coverr.co/videos/coverr-driving-through-a-neon-tunnel-5282/1080p.mp4",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    "https://cdn.coverr.co/videos/coverr-neon-light-reflections-6950/1080p.mp4",
    "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=2070&auto=format&fit=crop",
    "https://cdn.coverr.co/videos/coverr-sci-fi-corridor-4876/1080p.mp4",
    "https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618331835717-81414bd7467e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?q=80&w=2070&auto=format&fit=crop"
];

function HeroSection() {
    return (
        <div className="w-full h-[70vh] min-h-[600px] mb-16 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 px-4 overflow-hidden font-mono">
            {/* Primary Hero - Large Video */}
            <div className="md:col-span-2 md:row-span-2 relative border border-primary/30 overflow-hidden group shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-20" />

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter group-hover:brightness-110"
                    src="https://cdn.coverr.co/videos/coverr-walking-in-a-cyberpunk-city-1191/1080p.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-primary/10 flex flex-col justify-end p-8 border-t border-primary/20 backdrop-blur-[2px]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-primary animate-pulse" />
                        <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">Paraloop.Sys_Online</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter drop-shadow-[0_0_10px_rgba(0,243,255,0.3)] uppercase">
                        The New Era of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Digital Culture.</span>
                    </h1>
                    <p className="text-primary/80 max-w-md font-medium text-sm md:text-md leading-relaxed drop-shadow-md">
                        Optimistic, high-context curation across streetwear, fine arts, and the global creator economy.
                        [DATA STREAM ACTIVE]
                    </p>
                </div>
            </div>

            {/* Secondary Top Right - Image */}
            <div className="hidden md:block md:col-span-2 md:row-span-1 border border-primary/20 hover:border-primary/50 relative overflow-hidden group transition-all duration-500 shadow-[0_0_15px_rgba(0,243,255,0.05)]">
                <img
                    src="https://images.unsplash.com/photo-1627483292120-efec862fe508?q=80&w=2070&auto=format&fit=crop"
                    alt="Streetwear Culture"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter contrast-125"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent mix-blend-overlay transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]" />
                    <span className="text-white font-bold text-xs uppercase tracking-[0.2em] shadow-sm">Trending Now</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg leading-snug uppercase tracking-wide">The Architecture of Modern Hype</h2>
                </div>
                {/* HUD Corner Accents */}
                <div className="absolute bottom-0 right-0 p-2 text-[10px] text-primary/50 tracking-widest">SEC.02</div>
            </div>

            {/* Tertiary Bottom Right - Looping Video */}
            <div className="hidden md:block md:col-span-2 md:row-span-1 border border-primary/20 hover:border-primary/50 relative overflow-hidden group transition-all duration-500">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000"
                    src="https://cdn.coverr.co/videos/coverr-dj-mixing-music-in-a-club-2775/1080p.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-color-burn" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-black/60 group-hover:bg-black/20 transition-all duration-500 backdrop-blur-sm group-hover:backdrop-blur-none">
                    <div>
                        <Sparkles className="w-8 h-8 mx-auto text-primary mb-3 opacity-80 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                        <h3 className="text-xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(0,0,0,1)]">Sonic Landscapes</h3>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-2 text-[10px] text-primary/50 tracking-widest bg-black/50 border-b border-l border-primary/20">DATA.STREAM</div>
            </div>
        </div>
    );
}

export default function Feed() {
    const [filter, setFilter] = useState<string>("all");
    const [email, setEmail] = useState("");
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
    const [subscribeError, setSubscribeError] = useState<string | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeLoading(true);
        setSubscribeMessage(null);
        setSubscribeError(null);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            }
        });

        if (error) {
            setSubscribeError(error.message);
        } else {
            setSubscribeMessage("Welcome to Paraloop. Check your email to confirm your membership and newsletter subscription.");
            setEmail("");
        }
        setSubscribeLoading(false);
    };

    const { data: articles, isLoading } = useQuery({
        queryKey: ['culture-feed', filter],
        queryFn: async () => {
            let query = supabase
                .from('culture_articles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(30);

            if (filter !== 'all') {
                query = query.eq('category', filter);
            }

            const { data, error } = await query;
            if (error) throw error;
            return (data || []) as CultureArticle[];
        }
    });

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'streetwear', label: 'Streetwear' },
        { value: 'music', label: 'Music' },
        { value: 'fine-arts', label: 'Fine Arts' },
        { value: 'business', label: 'Business' },
        { value: 'culture', label: 'Culture' },
    ];

    return (
        <div className="w-full pb-20">

            {/* Immersive Video/Image Hero Grid */}
            <HeroSection />

            <div className="container mx-auto px-4 max-w-7xl">

                {/* Mission Control Filtering HUD */}
                <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-y border-primary/20 py-3 flex flex-wrap items-center justify-center gap-6 mb-12 shadow-[0_4px_20px_rgba(0,243,255,0.05)]">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setFilter(cat.value)}
                            className={`text-xs md:text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ${filter === cat.value
                                ? "text-primary border-b-2 border-primary drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] pb-1"
                                : "text-primary/40 hover:text-primary hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.5)] border-b-2 border-transparent pb-1"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Loading Skeleton Masonry */}
                {isLoading && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`hud-border bg-black/40 animate-pulse ${i % 3 === 0 ? 'h-96' : 'h-64'}`} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && (!articles || articles.length === 0) && (
                    <div className="glass-panel p-20 text-center w-full max-w-2xl mx-auto border-primary/20 mt-12 flex flex-col items-center">
                        <Compass className="w-16 h-16 text-primary/40 mb-6 animate-spin-slow drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                        <h3 className="text-3xl font-mono font-black mb-4 tracking-widest text-primary uppercase">Transmission Silence</h3>
                        <p className="text-primary/60 text-sm font-mono tracking-widest uppercase text-center max-w-md">
                            No cultural intel matches this frequency right now. The AI crawler is actively searching.
                        </p>
                    </div>
                )}

                {/* Floating Holographic Grid */}
                {!isLoading && articles && articles.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {articles.map((article, index) => {
                            // Derive media from DB or fallback array
                            const mediaUrl = article.image_url || fallbackMedia[index % fallbackMedia.length];
                            const isVideo = mediaUrl.endsWith('.mp4');

                            return (
                                <a
                                    href={article.article_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={article.id}
                                    className="group block relative break-inside-avoid glass-card p-4 md:p-5"
                                >
                                    <div className="relative overflow-hidden border border-primary/30">
                                        {/* Media Frame */}
                                        <div className="relative w-full overflow-hidden bg-black flex items-center justify-center aspect-[4/5] object-cover">
                                            {isVideo ? (
                                                <video
                                                    src={mediaUrl}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-40 filter contrast-125 saturate-150"
                                                />
                                            ) : (
                                                <img
                                                    src={mediaUrl}
                                                    alt={article.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-40 filter contrast-125 saturate-150"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-primary/10 mix-blend-color transition-opacity group-hover:opacity-50" />

                                            {/* Hover Overlay Matrix */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 backdrop-blur-[4px] z-10">

                                                {/* Score Indicator */}
                                                {article.relevance_score !== null && (
                                                    <div className="absolute top-4 right-4 bg-primary/10 backdrop-blur-md px-3 py-1.5 border border-primary/50 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                                                        <span className="text-[10px] font-mono font-bold text-primary tracking-widest">REL:</span>
                                                        <span className="text-sm font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">{article.relevance_score}</span>
                                                    </div>
                                                )}

                                                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                                                    {article.category || 'Culture Intel'}
                                                </span>

                                                <p className="text-white/80 text-xs font-mono leading-relaxed line-clamp-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                    {article.paraloop_analysis || article.excerpt || "Paraloop AI analysis pending."}
                                                </p>

                                                <div className="w-full h-[1px] bg-gradient-to-r from-primary/80 via-primary/30 to-transparent my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300 origin-left" />

                                                <span className="text-[9px] text-primary/60 uppercase tracking-widest font-mono transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                                                    SRC: {article.source_name} // {new Date(article.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Persistent Title HUD Bar */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black via-black/90 to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none border-t border-primary/20 z-20">
                                            <h2 className="text-sm font-bold font-mono text-white leading-tight line-clamp-2 uppercase tracking-wide drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
                                                {article.paraloop_headline || article.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* HUD Corner Decor on the Outer Frame */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* HUD Newsletter / Membership CTA */}
                <div className="mt-24 mb-12 glass-panel p-10 md:p-16 text-center max-w-4xl mx-auto hud-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-secondary/10 opacity-80" />

                    {/* Animated Grid Background element */}
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-30" />

                    <div className="relative z-10">
                        <Sparkles className="w-10 h-10 mx-auto text-primary mb-6 animate-pulse drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                        <h2 className="text-2xl md:text-3xl font-mono font-black mb-4 tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] uppercase">Initialize Member Sync</h2>
                        <p className="text-sm md:text-md text-primary/80 mb-10 max-w-2xl mx-auto font-mono tracking-widest leading-relaxed uppercase">
                            Establish uplink to receive our elite weekly intelligence briefing. Curated by AI clawbots.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter.Email_Address"
                                required
                                className="flex-1 bg-black/80 border border-primary/30 px-6 py-4 text-primary font-mono placeholder:text-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] backdrop-blur-md transition-all shadow-inner uppercase"
                            />
                            <button
                                type="submit"
                                disabled={subscribeLoading}
                                className="bg-primary/20 hover:bg-primary border border-primary text-primary hover:text-black font-mono font-bold tracking-widest uppercase px-8 py-4 transition-all whitespace-nowrap disabled:opacity-50 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                            >
                                {subscribeLoading ? "Syncing..." : "Transmit"}
                            </button>
                        </form>
                        {subscribeMessage && <p className="mt-8 text-xs font-mono tracking-widest text-primary uppercase animate-pulse">{subscribeMessage}</p>}
                        {subscribeError && <p className="mt-8 text-xs font-mono tracking-widest text-destructive uppercase">{subscribeError}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}
