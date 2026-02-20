import { CheckSquare, Zap, Calendar, Brain, Users, Trophy, Zap as Lightning, Star } from 'lucide-react'

export default function Dashboard() {
  const agents = [
    { name: 'Scraper Alpha', icon: '🟡', level: 12, xp: 8500, status: 'active' },
    { name: 'Writer Prime', icon: '🔵', level: 11, xp: 7200, status: 'active' },
    { name: 'Judge Relevance', icon: '🟣', level: 13, xp: 9100, status: 'active' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-purple-900 to-pink-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
            🕹️ MISSION CONTROL
          </h1>
          <p className="text-xl text-yellow-200 font-bold uppercase tracking-widest">
            ► Your AI Command Center • Game On!
          </p>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition border-4 border-yellow-200">
            <div className="text-sm text-yellow-900 font-bold uppercase">LEVEL</div>
            <div className="text-5xl font-black text-yellow-900">42</div>
            <div className="text-xs text-yellow-800 mt-2">Commander</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition border-4 border-cyan-200">
            <div className="text-sm text-blue-900 font-bold uppercase">XP</div>
            <div className="text-5xl font-black text-blue-900">45.2K</div>
            <div className="text-xs text-blue-800 mt-2">→ 15K to Level 43</div>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-red-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition border-4 border-pink-200">
            <div className="text-sm text-red-900 font-bold uppercase">ACHIEVEMENTS</div>
            <div className="text-5xl font-black text-red-900">28</div>
            <div className="text-xs text-red-800 mt-2">🏆 Culture Master</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition border-4 border-purple-200">
            <div className="text-sm text-indigo-900 font-bold uppercase">STREAK</div>
            <div className="text-5xl font-black text-indigo-900">13</div>
            <div className="text-xs text-indigo-800 mt-2">days active 🔥</div>
          </div>
        </div>

        {/* Active Agents Arcade */}
        <div className="bg-black border-4 border-yellow-400 p-8 rounded-lg mb-12 shadow-2xl">
          <h2 className="text-4xl font-black text-yellow-300 mb-6 flex items-center gap-3">
            👾 ACTIVE AGENTS ARCADE
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div key={i} className="bg-gradient-to-b from-purple-600 to-blue-600 p-6 rounded border-4 border-cyan-300 transform hover:scale-110 hover:rotate-2 transition duration-300">
                <div className="text-5xl mb-2">{agent.icon}</div>
                <div className="font-black text-white text-lg">{agent.name}</div>
                <div className="text-cyan-200 text-sm font-bold mt-2">LEVEL {agent.level}</div>
                <div className="bg-black rounded mt-3 h-4 border-2 border-cyan-400 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-pink-400 h-full"
                    style={{width: `${(agent.xp % 10000) / 100}%`}}
                  ></div>
                </div>
                <div className="text-yellow-300 text-xs font-bold mt-2">{agent.xp} XP</div>
                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-black uppercase ${
                  agent.status === 'active' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {agent.status === 'active' ? '🟢 ACTIVE' : '⚪ IDLE'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded border-3 border-yellow-200 shadow-lg">
            <CheckSquare className="text-yellow-900 mb-2" size={32} />
            <div className="text-3xl font-black text-yellow-900">12</div>
            <div className="text-xs font-bold text-yellow-800 uppercase">Active Tasks</div>
            <div className="text-xs text-yellow-700 mt-1">+3 this hour</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-6 rounded border-3 border-cyan-200 shadow-lg">
            <Zap className="text-cyan-900 mb-2" size={32} />
            <div className="text-3xl font-black text-cyan-900">8</div>
            <div className="text-xs font-bold text-cyan-800 uppercase">Pipeline Items</div>
            <div className="text-xs text-cyan-700 mt-1">2 ready</div>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-6 rounded border-3 border-pink-200 shadow-lg">
            <Calendar className="text-pink-900 mb-2" size={32} />
            <div className="text-3xl font-black text-pink-900">24</div>
            <div className="text-xs font-bold text-pink-800 uppercase">Scheduled Jobs</div>
            <div className="text-xs text-pink-700 mt-1">next: 2h</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded border-3 border-purple-200 shadow-lg">
            <Brain className="text-purple-900 mb-2" size={32} />
            <div className="text-3xl font-black text-purple-900">156</div>
            <div className="text-xs font-bold text-purple-800 uppercase">Memories</div>
            <div className="text-xs text-purple-700 mt-1">searchable KB</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 p-6 rounded border-3 border-indigo-200 shadow-lg">
            <Users className="text-indigo-900 mb-2" size={32} />
            <div className="text-3xl font-black text-indigo-900">10</div>
            <div className="text-xs font-bold text-indigo-800 uppercase">Team Members</div>
            <div className="text-xs text-indigo-700 mt-1">all active</div>
          </div>
        </div>

        {/* Power-ups */}
        <div className="bg-black border-4 border-pink-400 p-6 rounded-lg shadow-2xl">
          <h3 className="text-2xl font-black text-pink-300 mb-4">⚡ POWER-UPS AVAILABLE</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded border-2 border-yellow-200 font-black text-black hover:scale-110 transition transform">
              ⭐ BONUS XP
            </button>
            <button className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-3 rounded border-2 border-cyan-200 font-black text-black hover:scale-110 transition transform">
              🚀 SPEED UP
            </button>
            <button className="bg-gradient-to-br from-pink-400 to-pink-600 p-3 rounded border-2 border-pink-200 font-black text-black hover:scale-110 transition transform">
              💎 UNLOCK
            </button>
            <button className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded border-2 border-purple-200 font-black text-black hover:scale-110 transition transform">
              🎯 COMBO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
