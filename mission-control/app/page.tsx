'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0d1b3d] to-[#050a1f] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-amber-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-400 opacity-3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400"
              style={{textShadow: '0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.3)'}}>
              ▲ PARALOOP COMMAND
            </h1>
            <p className="text-cyan-400 font-mono text-lg" style={{textShadow: '0 0 15px rgba(34,211,238,0.5)'}}>
              &gt; Neural Command Center // System Online
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Large Circular Stat - Top Left */}
            <div className="col-span-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition"></div>
              <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-8 rounded-2xl border border-cyan-500 border-opacity-30 backdrop-blur-sm overflow-hidden"
                style={{boxShadow: '0 0 30px rgba(34,211,238,0.3), inset 0 0 30px rgba(34,211,238,0.1)'}}>
                
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style={{stopColor: 'rgba(34,211,238,0.1)', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'rgba(34,211,238,0.01)', stopOpacity: 1}} />
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-64">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Circular Progress */}
                    <svg className="absolute w-full h-full -rotate-90" style={{filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.6))'}}>
                      <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="8" />
                      <circle cx="96" cy="96" r="80" fill="none" stroke="url(#grad1)" strokeWidth="8" 
                        strokeDasharray="502.4" strokeDashoffset="125.6"
                        style={{transition: 'stroke-dashoffset 0.5s ease'}} />
                    </svg>
                    
                    <div className="text-center">
                      <div className="text-5xl font-black text-amber-400" style={{textShadow: '0 0 20px rgba(251,146,60,0.8)'}}>75%</div>
                      <div className="text-cyan-400 font-mono text-xs mt-2" style={{textShadow: '0 0 10px rgba(34,211,238,0.6)'}}>ACTIVE</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-cyan-300 font-mono text-xs mt-4" style={{textShadow: '0 0 8px rgba(34,211,238,0.4)'}}>
                  NEURAL SYNC STATUS
                </div>
              </div>
            </div>

            {/* Stats Grid - Top Right */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {[
                { label: 'AGENTS', value: '10', color: 'from-cyan-500 to-blue-500' },
                { label: 'XP EARNED', value: '45.2K', color: 'from-amber-500 to-orange-500' },
                { label: 'TASKS', value: '156', color: 'from-cyan-400 to-cyan-500' },
                { label: 'QUALITY', value: '96%', color: 'from-green-500 to-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-xl opacity-10 blur-lg group-hover:opacity-20 transition"></div>
                  <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-6 rounded-xl border border-cyan-500 border-opacity-20 backdrop-blur-sm"
                    style={{boxShadow: '0 0 20px rgba(34,211,238,0.2), inset 0 0 20px rgba(34,211,238,0.05)'}}>
                    
                    <div className="text-cyan-400 font-mono text-xs mb-2" style={{textShadow: '0 0 8px rgba(34,211,238,0.4)'}}>
                      {stat.label}
                    </div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400"
                      style={{textShadow: '0 0 15px rgba(251,146,60,0.5)'}}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Metrics */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Agents Panel */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition"></div>
              <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-8 rounded-2xl border border-cyan-500 border-opacity-20 backdrop-blur-sm"
                style={{boxShadow: '0 0 25px rgba(34,211,238,0.2)'}}>
                
                <h2 className="text-cyan-400 font-mono text-sm mb-6" style={{textShadow: '0 0 10px rgba(34,211,238,0.5)'}}>
                  ▶ ACTIVE AGENTS
                </h2>

                <div className="space-y-4">
                  {[
                    { name: '🟡 Scraper Alpha', progress: 75 },
                    { name: '🔵 Writer Prime', progress: 42 },
                    { name: '🟣 Judge Relevance', progress: 88 },
                  ].map((agent, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-cyan-300 font-mono text-sm">{agent.name}</span>
                        <span className="text-amber-400 font-mono text-sm" style={{textShadow: '0 0 8px rgba(251,146,60,0.6)'}}>{agent.progress}%</span>
                      </div>
                      <div className="h-3 bg-[#0a0f2c] rounded-full border border-cyan-500 border-opacity-30 overflow-hidden"
                        style={{boxShadow: 'inset 0 0 10px rgba(34,211,238,0.1)'}}>
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-amber-400"
                          style={{
                            width: `${agent.progress}%`,
                            boxShadow: '0 0 15px rgba(34,211,238,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
                            transition: 'width 0.5s ease'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Activity */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition"></div>
              <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-8 rounded-2xl border border-cyan-500 border-opacity-20 backdrop-blur-sm"
                style={{boxShadow: '0 0 25px rgba(34,211,238,0.2)'}}>
                
                <h2 className="text-cyan-400 font-mono text-sm mb-6" style={{textShadow: '0 0 10px rgba(34,211,238,0.5)'}}>
                  ▶ LIVE ACTIVITY STREAM
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="text-cyan-300 font-mono">[11:44:20] ✓ Articles fetched from TechCrunch</div>
                  <div className="text-cyan-300 font-mono">[11:44:15] ⚡ Generating summaries...</div>
                  <div className="text-cyan-300 font-mono">[11:44:10] 👀 Rating content quality...</div>
                  <div className="text-cyan-300 font-mono opacity-60">[11:44:05] 📱 Scheduled for social posting</div>
                </div>

                <div className="mt-6 p-3 bg-[#0a0f2c] rounded border border-amber-500 border-opacity-30">
                  <div className="text-amber-400 font-mono text-xs flex items-center gap-2" style={{textShadow: '0 0 8px rgba(251,146,60,0.6)'}}>
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    SYSTEM: All systems nominal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: 'COLLABORATION', value: '+24%', desc: 'Teamwork bonus' },
              { title: 'UPTIME', value: '99.8%', desc: 'System availability' },
              { title: 'STREAK', value: '13 🔥', desc: 'Days active' },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-xl opacity-10 blur-lg group-hover:opacity-20 transition"></div>
                <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-6 rounded-xl border border-cyan-500 border-opacity-20 backdrop-blur-sm text-center"
                  style={{boxShadow: '0 0 20px rgba(34,211,238,0.2)'}}>
                  
                  <div className="text-cyan-400 font-mono text-xs mb-2" style={{textShadow: '0 0 8px rgba(34,211,238,0.4)'}}>
                    {item.title}
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400 mb-1"
                    style={{textShadow: '0 0 15px rgba(251,146,60,0.5)'}}>
                    {item.value}
                  </div>
                  <div className="text-cyan-300 text-xs font-mono">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34,211,238,0.6); }
          50% { text-shadow: 0 0 30px rgba(34,211,238,0.9); }
        }
        
        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
