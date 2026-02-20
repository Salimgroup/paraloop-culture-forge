'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function DesignsPage() {
  const [activeDesign, setActiveDesign] = useState(0)

  const designs = [
    {
      name: 'CYBERPUNK NEON',
      tagline: 'Neural Interface Command Center',
      bg: 'bg-gradient-to-br from-[#0a0e27] via-[#1a0033] to-[#0a0e27]',
      component: (
        <div className="min-h-screen p-8 relative overflow-hidden">
          {/* CRT Scanlines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,247,255,0.1) 0px, rgba(0,247,255,0.1) 1px, transparent 1px, transparent 2px)'
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] via-[#ff006e] to-[#b700ff]"
              style={{textShadow: '0 0 20px rgba(0,247,255,0.8), 0 0 40px rgba(255,0,110,0.6)'}}>
              ▲ NEURAL INTERFACE
            </h1>
            <p className="text-[#00f7ff] font-mono text-lg mb-8" style={{textShadow: '0 0 10px rgba(0,247,255,0.6)'}}>
              &gt; PARALOOP COMMAND CENTER v2.0
            </p>

            {/* Neon Cards */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { label: 'AGENTS', value: '10', color: 'from-[#00f7ff] to-[#39ff14]' },
                { label: 'XP', value: '45.2K', color: 'from-[#ff006e] to-[#b700ff]' },
                { label: 'TASKS', value: '156', color: 'from-[#b700ff] to-[#00f7ff]' },
              ].map((card, i) => (
                <div key={i} className={`bg-gradient-to-br ${card.color} p-px rounded-lg`}
                  style={{boxShadow: `0 0 20px rgba(0,247,255,0.5), inset 0 0 20px rgba(0,247,255,0.1)`}}>
                  <div className="bg-[#0a0e27] p-6 rounded-lg text-center">
                    <div className="text-[#00f7ff] font-mono text-sm mb-2">{card.label}</div>
                    <div className="text-3xl font-black text-[#ffff00]">{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Holographic Progress */}
            <div className="bg-[#1a0033] border-2 border-[#00f7ff] rounded-lg p-6 mb-8"
              style={{boxShadow: '0 0 20px rgba(0,247,255,0.5)'}}>
              <div className="text-[#00f7ff] font-mono mb-4">ACTIVE AGENTS</div>
              <div className="space-y-3">
                {['Scraper Alpha', 'Writer Prime', 'Judge Relevance'].map((agent, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-[#0a0e27] rounded-full border border-[#ff006e] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00f7ff] to-[#39ff14] animate-pulse"
                        style={{width: `${60 + i * 15}%`}}></div>
                    </div>
                    <span className="text-[#39ff14] font-mono w-12">{60 + i * 15}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#00f7ff] font-mono text-sm opacity-75">&gt; system ready for neural link</p>
              <p className="text-[#ff006e] font-mono text-sm opacity-75">&gt; all systems nominal</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'MINIMALIST PRO',
      tagline: 'Executive Dashboard',
      bg: 'bg-white',
      component: (
        <div className="min-h-screen p-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-black text-gray-900 mb-2">Mission Control</h1>
            <p className="text-lg text-gray-600 mb-12">Your AI Command Center</p>

            {/* Clean Stats */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Agents Active', value: '10', unit: 'running' },
                { label: 'XP Earned', value: '45,200', unit: 'total' },
                { label: 'Tasks Done', value: '156', unit: 'completed' },
                { label: 'Uptime', value: '99.8%', unit: 'available' },
              ].map((stat, i) => (
                <div key={i} className="p-8 border border-gray-200 rounded-lg">
                  <div className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.unit}</div>
                </div>
              ))}
            </div>

            {/* Clean Cards */}
            <div className="space-y-6">
              <div className="p-8 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-black text-gray-900 mb-6">Active Tasks</h3>
                <div className="space-y-4">
                  {['Fetch Articles', 'Generate Summaries', 'Rate Content'].map((task, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                      <span className="text-gray-700">{task}</span>
                      <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{width: `${60 + i * 15}%`}}></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{60 + i * 15}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'DARK MODERN',
      tagline: 'Sleek Control Hub',
      bg: 'bg-gradient-to-br from-[#111827] to-[#1f2937]',
      component: (
        <div className="min-h-screen p-8 bg-gradient-to-br from-[#111827] to-[#1f2937]">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-black text-[#f3f4f6] mb-2">Control Hub</h1>
            <p className="text-lg text-[#d1d5db] mb-12">Manage your AI agents with precision</p>

            {/* Modern Cards */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Agents', value: '10', gradient: 'from-[#06b6d4] to-[#14b8a6]', icon: '🤖' },
                { label: 'XP', value: '45K', gradient: 'from-[#f59e0b] to-[#d97706]', icon: '⭐' },
                { label: 'Tasks', value: '156', gradient: 'from-[#6366f1] to-[#a78bfa]', icon: '✅' },
                { label: 'Quality', value: '96%', gradient: 'from-[#ec4899] to-[#f472b6]', icon: '🎯' },
              ].map((card, i) => (
                <div key={i} className={`bg-gradient-to-br ${card.gradient} p-px rounded-xl`}>
                  <div className="bg-[#1f2937] p-6 rounded-xl">
                    <div className="text-3xl mb-2">{card.icon}</div>
                    <div className="text-[#9ca3af] text-sm font-semibold mb-1">{card.label}</div>
                    <div className="text-3xl font-black text-[#f3f4f6]">{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Cards with Elevation */}
            <div className="bg-[#1f2937] rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-black text-[#f3f4f6] mb-6">Agent Status</h3>
              <div className="space-y-4">
                {['Scraper Alpha', 'Writer Prime', 'Judge Relevance'].map((agent, i) => (
                  <div key={i} className="bg-[#111827] rounded-lg p-4 flex items-center justify-between">
                    <span className="text-[#d1d5db]">{agent}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#374151] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#06b6d4] to-[#14b8a6]"
                          style={{width: `${60 + i * 15}%`}}></div>
                      </div>
                      <span className="text-[#06b6d4] font-semibold">{60 + i * 15}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: '3D INTERACTIVE',
      tagline: 'Immersive Command Center',
      bg: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]',
      component: (
        <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] perspective">
          <style>{`
            .card-3d {
              transform-style: preserve-3d;
              transition: transform 0.6s;
            }
            .card-3d:hover {
              transform: rotateX(5deg) rotateY(-5deg);
            }
          `}</style>

          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-black text-[#e0e7ff] mb-2" style={{
              textShadow: '0 0 20px rgba(168, 123, 250, 0.5)'
            }}>
              3D Interface
            </h1>
            <p className="text-lg text-[#a78bfa] mb-12">Experience depth and dimension</p>

            {/* 3D Cards Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12" style={{perspective: '1200px'}}>
              {[
                { label: 'Agents', value: '10', color: '#06b6d4', delay: '0s' },
                { label: 'XP', value: '45K', color: '#a78bfa', delay: '0.1s' },
                { label: 'Tasks', value: '156', color: '#ec4899', delay: '0.2s' },
              ].map((card, i) => (
                <div key={i} 
                  className="card-3d bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-xl p-8 border border-[#475569]"
                  style={{
                    boxShadow: `0 20px 50px rgba(${card.color === '#06b6d4' ? '6,182,212' : card.color === '#a78bfa' ? '167,123,250' : '236,72,153'},0.3)`,
                  }}>
                  <div className="text-4xl font-black text-transparent bg-clip-text" style={{
                    backgroundImage: `linear-gradient(135deg, ${card.color}, #fff)`
                  }}>
                    {card.value}
                  </div>
                  <div className="text-[#cbd5e1] mt-2">{card.label}</div>
                </div>
              ))}
            </div>

            {/* 3D Progress Visualization */}
            <div className="bg-[#1e293b] rounded-2xl p-8 border border-[#475569]" style={{
              boxShadow: '0 0 30px rgba(168, 123, 250, 0.2), inset 0 0 30px rgba(168, 123, 250, 0.05)'
            }}>
              <h3 className="text-xl font-black text-[#e0e7ff] mb-8">Layered Progress</h3>
              <div className="space-y-6">
                {['Task 1', 'Task 2', 'Task 3'].map((task, i) => (
                  <div key={i} style={{perspective: '1000px'}}>
                    <div className="text-[#cbd5e1] mb-2">{task}</div>
                    <div className="h-3 bg-[#0f172a] rounded-full overflow-hidden border border-[#475569]" style={{
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.5)`
                    }}>
                      <div 
                        className="h-full bg-gradient-to-r from-[#06b6d4] via-[#a78bfa] to-[#ec4899]"
                        style={{
                          width: `${60 + i * 15}%`,
                          boxShadow: `0 0 10px rgba(168, 123, 250, 0.8)`,
                          filter: 'brightness(1.2)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const currentDesign = designs[activeDesign]

  return (
    <div className="min-h-screen bg-black">
      {/* Design Preview */}
      <div className={`${currentDesign.bg} min-h-screen transition-colors duration-500`}>
        {currentDesign.component}
      </div>

      {/* Design Selector */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black border-4 border-white rounded-full px-8 py-4 flex items-center gap-8">
        <button
          onClick={() => setActiveDesign((prev) => (prev - 1 + designs.length) % designs.length)}
          className="p-2 hover:bg-white hover:text-black rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center">
          <div className="text-xl font-black text-white mb-1">{currentDesign.name}</div>
          <div className="text-sm text-gray-400">{currentDesign.tagline}</div>
          <div className="text-xs text-gray-600 mt-2">{activeDesign + 1} of {designs.length}</div>
        </div>

        <button
          onClick={() => setActiveDesign((prev) => (prev + 1) % designs.length)}
          className="p-2 hover:bg-white hover:text-black rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Design Dots */}
      <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
        {designs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveDesign(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === activeDesign ? 'bg-white w-8' : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
