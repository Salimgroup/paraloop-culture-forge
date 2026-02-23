import { Outlet, Link } from "react-router-dom";
import { Compass, LayoutDashboard } from "lucide-react";
import { DeepBackground } from "./DeepBackground";

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col w-full relative font-mono text-white selection:bg-primary/30">
            {/* Deep 3D Background */}
            <DeepBackground />

            {/* Top HUD Frame */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-[60]" />
            <nav className="sticky top-0 z-50 glass-panel border-b border-primary/20 shadow-[0_4px_30px_rgba(0,243,255,0.05)]">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 border border-primary/50 relative flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                            <span className="text-primary font-bold text-xs relative z-10">P-L</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] uppercase">
                                Paraloop
                            </span>
                            <span className="text-[8px] text-primary tracking-[0.3em] uppercase opacity-70">
                                SYS.CORE.ONLINE
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/feed"
                            className="text-xs font-bold font-mono tracking-widest text-primary/70 hover:text-primary transition-colors flex items-center gap-2 drop-shadow-md uppercase"
                        >
                            <Compass className="w-3 h-3" />
                            Feed.Stream
                        </Link>
                        <Link
                            to="/"
                            className="text-xs font-bold font-mono tracking-widest text-primary/70 hover:text-primary transition-colors flex items-center gap-2 drop-shadow-md uppercase"
                        >
                            <LayoutDashboard className="w-3 h-3" />
                            Mission.Ctrl
                        </Link>
                        <Link
                            to="/login"
                            className="hud-border px-4 py-1.5 text-xs font-bold font-mono tracking-widest bg-primary/10 text-primary hover:bg-primary/20 hover:text-white transition-all uppercase"
                        >
                            Log.In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 w-full relative z-10">
                <Outlet />
            </main>

            {/* HUD Footer */}
            <footer className="border-t border-primary/20 py-8 relative z-10 bg-black/40 backdrop-blur-md">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-primary/50">
                    <div>
                        SYS.V.1.0 // {new Date().getFullYear()} PARALOOP DIGITAL
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0 opacity-70">
                        <span>STATUS: ACTIVE</span>
                        <span>UPLINK: SECURE</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
