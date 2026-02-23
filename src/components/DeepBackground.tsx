export function DeepBackground() {
    return (
        <div
            className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#03060a]"
            style={{ perspective: '1500px' }}
        >
            {/* 3D Scene Root */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 1. Deepest Layer: The Giant Glowing Ball */}
                <div
                    className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
                    style={{ transform: 'translate(-50%, -50%) translateZ(-800px)' }}
                >
                    <div
                        className="w-full h-full rounded-full animate-float-soft mix-blend-screen"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--secondary)), transparent 70%)',
                            filter: 'blur(40px)',
                            opacity: 0.85
                        }}
                    />
                </div>

                {/* 2. Secondary Deeper Ball for Parallax */}
                <div
                    className="absolute top-[30%] left-[70%] w-[400px] h-[400px]"
                    style={{ transform: 'translate(-50%, -50%) translateZ(-1200px)' }}
                >
                    <div
                        className="w-full h-full rounded-full animate-float-soft-delayed mix-blend-screen"
                        style={{
                            background: 'radial-gradient(circle at 70% 30%, hsl(var(--secondary)), transparent 60%)',
                            filter: 'blur(60px)',
                            opacity: 0.5
                        }}
                    />
                </div>

                {/* 3. Frosted Glass Layer over the deep balls */}
                <div
                    className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh]"
                    style={{
                        transform: 'translate(-50%, -50%) translateZ(-400px)',
                        background: 'rgba(3, 6, 10, 0.3)',
                        backdropFilter: 'blur(80px)',
                        WebkitBackdropFilter: 'blur(80px)'
                    }}
                />

                {/* 4. Floating Glass Shards (Mid-ground) */}
                {/* Left Shard */}
                <div
                    className="absolute top-[10%] left-[5%] w-[40vw] h-[60vh] max-w-[600px] rounded-[40px] shadow-[0_0_50px_rgba(0,243,255,0.05)] border border-primary/20"
                    style={{
                        transform: 'translateZ(-100px) rotateX(10deg) rotateY(25deg) rotateZ(-5deg)',
                        background: 'linear-gradient(135deg, rgba(0,243,255,0.05) 0%, rgba(255,255,255,0.0) 100%)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)'
                    }}
                >
                    <div className="w-full h-full animate-float-shard" />
                </div>

                {/* Right Shard */}
                <div
                    className="absolute bottom-[0%] right-[5%] w-[50vw] h-[40vh] max-w-[800px] rounded-[60px] shadow-[0_0_80px_rgba(0,243,255,0.1)] border border-primary/30"
                    style={{
                        transform: 'translateZ(200px) rotateX(-15deg) rotateY(-15deg) rotateZ(10deg)',
                        background: 'linear-gradient(135deg, rgba(0,243,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                        backdropFilter: 'blur(50px)',
                        WebkitBackdropFilter: 'blur(50px)'
                    }}
                >
                    <div className="w-full h-full animate-float-shard-delayed" />
                </div>

                {/* Center Fore-ground Window */}
                <div
                    className="absolute top-[25%] left-[25%] w-[50vw] h-[50vh] rounded-[50px] shadow-[0_4px_60px_rgba(0,0,0,0.5)] border border-secondary/10"
                    style={{
                        transform: 'translateZ(50px) rotateX(5deg) rotateY(-5deg)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)'
                    }}
                >
                    <div className="w-full h-full animate-float-soft" />
                </div>

                {/* 5. Foreground Floating Orbs (Bokeh effect) */}
                <div
                    className="absolute top-[20%] right-[20%] w-[100px] h-[100px]"
                    style={{ transform: 'translateZ(300px)' }}
                >
                    <div
                        className="w-full h-full rounded-full bg-primary/40 animate-float-soft-delayed mix-blend-screen"
                        style={{ filter: 'blur(15px)' }}
                    />
                </div>

                <div
                    className="absolute bottom-[30%] left-[20%] w-[150px] h-[150px]"
                    style={{ transform: 'translateZ(400px)' }}
                >
                    <div
                        className="w-full h-full rounded-full bg-secondary/30 animate-float-soft mix-blend-screen"
                        style={{ filter: 'blur(25px)' }}
                    />
                </div>
            </div>

            {/* 6. Screen Space Overlays (Vignette & Texture) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-40 opacity-70 pointer-events-none" />
            <div className="absolute inset-0 bg-grain z-50 opacity-15 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 pointer-events-none opacity-30" />
        </div>
    );
}
