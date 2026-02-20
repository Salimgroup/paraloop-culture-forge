import { CheckSquare, Zap, Calendar, Brain, Users, Trophy, Zap as Lightning, Star } from 'lucide-react'

export default function Dashboard() {
  const agents = [
    { name: 'Scraper Alpha', icon: '🟡', level: 12, xp: 8500, status: 'active', task: 'Fetching TechCrunch articles...', progress: 65 },
    { name: 'Writer Prime', icon: '🔵', level: 11, xp: 7200, status: 'active', task: 'Writing summaries...', progress: 42 },
    { name: 'Judge Relevance', icon: '🟣', level: 13, xp: 9100, status: 'active', task: 'Rating content...', progress: 88 },
  ]

  const workItems = [
    { id: 1, title: 'Article: AI Revolution', status: 'processing', agent: 'Scraper Alpha' },
    { id: 2, title: 'Summary: Tech Trends', status: 'processing', agent: 'Writer Prime' },
    { id: 3, title: 'Rating: Culture Impact', status: 'processing', agent: 'Judge Relevance' },
    { id: 4, title: 'Post: Social Media', status: 'queued', agent: 'Social Agent' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-purple-900 to-pink-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400 rounded-full animate-bounce blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-400 rounded-full animate-pulse blur-2xl" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Animated particles showing data flow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 animate-pulse">
            🕹️ MISSION CONTROL
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-xl text-yellow-200 font-bold uppercase tracking-widest">
              ► All Systems Active • 10 Agents Working
            </p>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="mb-8 bg-black border-4 border-cyan-400 p-6 rounded-lg shadow-2xl overflow-hidden">
          <h3 className="text-2xl font-black text-cyan-300 mb-4 flex items-center gap-2">
            ⚡ LIVE ACTIVITY STREAM
          </h3>
          <div className="space-y-2 h-24 overflow-hidden relative">
            {/* Scrolling activity text */}
            <style>{`
              @keyframes scrollUp {
                0% { transform: translateY(100%); opacity: 1; }
                100% { transform: translateY(-100%); opacity: 0; }
              }
              .activity-line {
                animation: scrollUp 4s linear infinite;
                position: absolute;
                width: 100%;
              }
            `}</style>
            
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="activity-line text-sm font-mono text-green-400"
                style={{animationDelay: `${i * 0.8}s`}}
              >
                <span className="text-cyan-400">▶</span> {['Fetching article from TechCrunch', 'Parsing content structure', 'Generating summary', 'Analyzing sentiment', 'Rating relevance score', 'Publishing to timeline'][i % 6]} <span className="text-yellow-400 animate-pulse">...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player Stats with animated borders */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'LEVEL', value: '42', color: 'from-yellow-400 to-orange-500', border: 'border-yellow-200' },
            { label: 'XP', value: '45.2K', color: 'from-cyan-400 to-blue-500', border: 'border-cyan-200' },
            { label: 'ACHIEVEMENTS', value: '28', color: 'from-pink-400 to-red-500', border: 'border-pink-200' },
            { label: 'STREAK', value: '13🔥', color: 'from-purple-400 to-indigo-500', border: 'border-purple-200' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-lg shadow-lg transform hover:scale-105 transition border-4 ${stat.border} animate-bounce`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-sm text-gray-900 font-bold uppercase">{stat.label}</div>
              <div className="text-5xl font-black text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Active Work Queue - Showing Real Processing */}
        <div className="bg-black border-4 border-yellow-400 p-8 rounded-lg mb-12 shadow-2xl overflow-hidden">
          <h2 className="text-4xl font-black text-yellow-300 mb-6 flex items-center gap-3">
            👾 WORK IN PROGRESS
          </h2>
          <div className="space-y-4">
            {workItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded border-3 border-cyan-300 relative overflow-hidden"
                style={{
                  animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                }}
              >
                {/* Animated progress bar background */}
                <style>{`
                  @keyframes slideIn {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                  }
                  @keyframes workProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                  }
                `}</style>

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-black text-white text-lg">{item.title}</div>
                    <div className="text-cyan-200 text-sm font-bold">Agent: {item.agent}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    item.status === 'processing'
                      ? 'bg-green-500 text-black animate-pulse'
                      : 'bg-yellow-500 text-black'
                  }`}>
                    {item.status === 'processing' ? '🔄 WORKING' : '⏳ QUEUED'}
                  </div>
                </div>

                {/* Animated progress bar */}
                {item.status === 'processing' && (
                  <div className="bg-black rounded h-3 border-2 border-cyan-400 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 h-full rounded animate-pulse"
                      style={{
                        width: `${30 + (idx * 20)}%`,
                        animation: `workProgress ${2 + idx}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Agents Arcade with movement */}
        <div className="bg-black border-4 border-yellow-400 p-8 rounded-lg mb-12 shadow-2xl">
          <h2 className="text-4xl font-black text-yellow-300 mb-6 flex items-center gap-3">
            👾 ACTIVE AGENTS ARCADE
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-purple-600 to-blue-600 p-6 rounded border-4 border-cyan-300 transform hover:scale-110 hover:rotate-2 transition duration-300 animate-bounce relative overflow-hidden"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Working indicator particles */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(3)].map((_, p) => (
                    <div
                      key={p}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `pulse ${1 + p}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-5xl mb-2 animate-pulse">{agent.icon}</div>
                <div className="font-black text-white text-lg">{agent.name}</div>
                <div className="text-cyan-200 text-xs font-bold mt-1">TASK: {agent.task}</div>
                <div className="text-cyan-200 text-sm font-bold mt-2">LEVEL {agent.level}</div>

                {/* Animated task progress bar */}
                <div className="bg-black rounded mt-3 h-4 border-2 border-cyan-400 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-pink-400 h-full animate-pulse"
                    style={{
                      width: `${agent.progress}%`,
                      animation: `workProgress ${1.5 + i}s ease-in-out infinite`,
                    }}
                  />
                </div>
                <div className="text-yellow-300 text-xs font-bold mt-2">{agent.progress}% Complete</div>

                {/* XP Bar */}
                <div className="bg-black rounded mt-2 h-3 border border-yellow-400 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full"
                    style={{width: `${(agent.xp % 10000) / 100}%`}}
                  />
                </div>
                <div className="text-yellow-300 text-xs font-bold mt-1">{agent.xp} XP</div>

                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-black uppercase animate-pulse ${
                  agent.status === 'active'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-500 text-white'
                }`}>
                  {agent.status === 'active' ? '🟢 WORKING' : '⚪ IDLE'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid with animated updates */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { icon: CheckSquare, label: 'Active Tasks', value: '12', color: 'from-yellow-400 to-yellow-600', extra: '+3 this hour' },
            { icon: Zap, label: 'Pipeline Items', value: '8', color: 'from-cyan-400 to-cyan-600', extra: '2 ready' },
            { icon: Calendar, label: 'Scheduled', value: '24', color: 'from-pink-400 to-pink-600', extra: 'next: 2h' },
            { icon: Brain, label: 'Memories', value: '156', color: 'from-purple-400 to-purple-600', extra: 'KB' },
            { icon: Users, label: 'Team', value: '10', color: 'from-indigo-400 to-indigo-600', extra: 'active' },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded border-3 border-opacity-50 shadow-lg transform hover:scale-110 transition animate-bounce`}
                style={{ animationDelay: `${(idx * 0.15) % 2}s` }}
              >
                <Icon className="text-gray-900 mb-2 animate-spin" size={24} style={{ animationDuration: '3s' }} />
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs font-bold text-gray-800 uppercase">{stat.label}</div>
                <div className="text-xs text-gray-700 mt-1">{stat.extra}</div>
              </div>
            )
          })}
        </div>

        {/* Power-ups with pulsing effects */}
        <div className="bg-black border-4 border-pink-400 p-6 rounded-lg shadow-2xl">
          <h3 className="text-2xl font-black text-pink-300 mb-4">⚡ POWER-UPS AVAILABLE</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '⭐', label: 'BONUS XP', delay: '0s' },
              { emoji: '🚀', label: 'SPEED UP', delay: '0.2s' },
              { emoji: '💎', label: 'UNLOCK', delay: '0.4s' },
              { emoji: '🎯', label: 'COMBO', delay: '0.6s' },
            ].map((power, idx) => (
              <button
                key={idx}
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded border-2 border-yellow-200 font-black text-black hover:scale-110 transition transform active:scale-95"
                style={{
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: power.delay,
                }}
              >
                <div className="text-2xl mb-1">{power.emoji}</div>
                <div className="text-xs">{power.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes workProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
