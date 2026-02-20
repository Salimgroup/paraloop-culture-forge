'use client'

import { useEffect, useState } from 'react'

export default function AgentsMonitorPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const agents = [
    {
      name: '🟡 Scraper Alpha',
      emoji: '🟡',
      status: 'ACTIVE',
      progress: 70,
      tasksCurrent: 342,
      tasksDaily: 11,
      metrics: [
        { label: 'Articles', value: 23, max: 50 },
        { label: 'Sources', value: 8, max: 12 }
      ]
    },
    {
      name: '🔵 Writer Prime',
      emoji: '🔵',
      status: 'ACTIVE',
      progress: 32,
      tasksCurrent: 287,
      tasksDaily: 19,
      metrics: [
        { label: 'Summaries', value: 15, max: 30 },
        { label: 'Headlines', value: 19, max: 40 }
      ]
    },
    {
      name: '🟣 Judge Relevance',
      emoji: '🟣',
      status: 'ACTIVE',
      progress: 88,
      tasksCurrent: 398,
      tasksDaily: 34,
      metrics: [
        { label: 'Reviewed', value: 28, max: 32 },
        { label: 'Approved', value: 24, max: 28 }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0d1b3d] to-[#050a1f] p-8 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-amber-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400"
            style={{textShadow: '0 0 30px rgba(34,211,238,0.6)'}}>
            🤖 AGENTS AT WORK
          </h1>
          <p className="text-cyan-400 font-mono text-lg" style={{textShadow: '0 0 15px rgba(34,211,238,0.5)'}}>
            &gt; Real-time agent activity monitoring
          </p>
        </div>

        {/* Main Monitoring Grid */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {agents.map((agent, idx) => (
            <div key={idx} className="group relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-3xl opacity-15 blur-2xl group-hover:opacity-25 transition"></div>

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-8 rounded-3xl border-2 border-cyan-500 border-opacity-30 backdrop-blur-md overflow-hidden"
                style={{boxShadow: '0 0 40px rgba(34,211,238,0.3), inset 0 0 40px rgba(34,211,238,0.1)'}}>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-5xl mb-2">{agent.emoji}</div>
                    <h2 className="text-cyan-300 font-mono text-sm" style={{textShadow: '0 0 8px rgba(34,211,238,0.6)'}}>
                      {agent.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-4 py-2 rounded-full bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50">
                      <span className="text-green-400 font-mono text-xs font-bold">{agent.status}</span>
                    </div>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <svg className="w-full h-full -rotate-90" style={{filter: 'drop-shadow(0 0 15px rgba(34,211,238,0.6))'}}>
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="6" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="70" 
                      fill="none" 
                      stroke="url(#progressGradient)" 
                      strokeWidth="6"
                      strokeDasharray={`${4.398 * agent.progress} 439.8`}
                      style={{transition: 'stroke-dasharray 0.5s ease'}}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black text-amber-400" style={{textShadow: '0 0 15px rgba(251,146,60,0.8)'}}>
                      {agent.progress}%
                    </div>
                    <div className="text-cyan-300 font-mono text-xs mt-1">ACTIVE</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0a0f2c] rounded-lg p-4 border border-cyan-500 border-opacity-20">
                    <div className="text-cyan-400 font-mono text-xs mb-2">TASKS</div>
                    <div className="text-2xl font-black text-amber-400">{agent.tasksCurrent}</div>
                    <div className="text-cyan-300 text-xs font-mono mt-1">+{agent.tasksDaily} today</div>
                  </div>
                  <div className="bg-[#0a0f2c] rounded-lg p-4 border border-cyan-500 border-opacity-20">
                    <div className="text-cyan-400 font-mono text-xs mb-2">METRIC</div>
                    <div className="text-2xl font-black text-amber-400">{Math.floor(agent.progress * 1.2)}%</div>
                    <div className="text-cyan-300 text-xs font-mono mt-1">Efficiency</div>
                  </div>
                </div>

                {/* Mini gauges */}
                <div className="space-y-3">
                  {agent.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyan-300 text-xs font-mono">{metric.label}</span>
                        <span className="text-amber-400 text-xs font-mono">{metric.value}/{metric.max}</span>
                      </div>
                      <div className="h-2 bg-[#0a0f2c] rounded-full border border-cyan-500 border-opacity-20 overflow-hidden"
                        style={{boxShadow: 'inset 0 0 5px rgba(34,211,238,0.1)'}}>
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-amber-400"
                          style={{
                            width: `${(metric.value / metric.max) * 100}%`,
                            boxShadow: '0 0 10px rgba(34,211,238,0.8)',
                            transition: 'width 0.5s ease'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Panel */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-3xl opacity-15 blur-2xl group-hover:opacity-25 transition"></div>

          <div className="relative bg-gradient-to-br from-[#1a2f4a] to-[#0f1f35] p-8 rounded-3xl border-2 border-cyan-500 border-opacity-30 backdrop-blur-md"
            style={{boxShadow: '0 0 40px rgba(34,211,238,0.3)'}}>

            <h3 className="text-cyan-400 font-mono text-lg mb-6" style={{textShadow: '0 0 10px rgba(34,211,238,0.5)'}}>
              ▶ LIVE ACTIVITY STREAM
            </h3>

            <div className="grid grid-cols-3 gap-6">
              {[
                { agent: '🟡 Scraper', task: 'Fetching TechCrunch articles', time: '11:46:12' },
                { agent: '🔵 Writer', task: 'Generating 3 summaries', time: '11:46:08' },
                { agent: '🟣 Judge', task: 'Rating content quality (28/32)', time: '11:46:04' },
                { agent: '🔴 Social', task: 'Scheduling posts', time: '11:45:58' },
                { agent: '🟢 Analyzer', task: 'Tracking engagement', time: '11:45:52' },
                { agent: '⭐ Orchestrator', task: 'Coordinating workflow', time: '11:45:46' },
              ].map((log, i) => (
                <div key={i} className="p-4 bg-[#0a0f2c] rounded-lg border border-cyan-500 border-opacity-20">
                  <div className="text-cyan-300 font-mono text-sm mb-2">{log.agent}</div>
                  <div className="text-amber-300 text-xs font-mono mb-2">{log.task}</div>
                  <div className="text-cyan-400 text-xs font-mono">{log.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(34,211,238,0.6)); }
          50% { filter: drop-shadow(0 0 25px rgba(34,211,238,0.9)); }
        }
      `}</style>
    </div>
  )
}
