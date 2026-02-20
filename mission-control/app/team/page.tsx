'use client'

import { Trophy, Zap, Star, TrendingUp } from 'lucide-react'

export default function TeamPage() {
  const agents = [
    {
      name: 'Scraper Alpha',
      emoji: '🟡',
      role: 'Content Acquisition',
      level: 15,
      xp: 12500,
      tasks: 342,
      accuracy: 98,
      color: 'from-yellow-500 to-orange-500',
      bio: 'Master of data extraction',
      specialties: ['Web scraping', 'Article fetching', 'Data parsing'],
    },
    {
      name: 'Writer Prime',
      emoji: '🔵',
      role: 'Content Creation',
      level: 14,
      xp: 11200,
      tasks: 287,
      accuracy: 96,
      color: 'from-blue-500 to-cyan-500',
      bio: 'Wordsmith extraordinaire',
      specialties: ['Summaries', 'Headlines', 'Copy writing'],
    },
    {
      name: 'Judge Relevance',
      emoji: '🟣',
      role: 'Quality Control',
      level: 16,
      xp: 13900,
      tasks: 398,
      accuracy: 99,
      color: 'from-purple-500 to-pink-500',
      bio: 'The ultimate critic',
      specialties: ['Scoring', 'Reviewing', 'Quality assurance'],
    },
    {
      name: 'Social Agent',
      emoji: '🔴',
      role: 'Distribution',
      level: 12,
      xp: 8900,
      tasks: 215,
      accuracy: 94,
      color: 'from-red-500 to-pink-500',
      bio: 'Social media maestro',
      specialties: ['Posting', 'Engagement', 'Scheduling'],
    },
    {
      name: 'Analyzer Pro',
      emoji: '🟢',
      role: 'Analytics',
      level: 13,
      xp: 9700,
      tasks: 267,
      accuracy: 97,
      color: 'from-green-500 to-emerald-500',
      bio: 'Data insights wizard',
      specialties: ['Tracking', 'Analytics', 'Reporting'],
    },
    {
      name: 'Orchestrator',
      emoji: '⭐',
      role: 'Workflow Control',
      level: 18,
      xp: 15300,
      tasks: 512,
      accuracy: 100,
      color: 'from-indigo-500 to-purple-500',
      bio: 'The maestro conductor',
      specialties: ['Coordination', 'Scheduling', 'Optimization'],
    },
  ]

  const teamStats = {
    totalTasks: 2021,
    avgQuality: 96,
    uptime: 99.8,
    collaborationBonus: 24,
  }

  const achievements = [
    { emoji: '🏆', name: '1K Tasks', unlock: 'Completed 1000 tasks' },
    { emoji: '⭐', name: 'Quality Master', unlock: '95%+ accuracy streak' },
    { emoji: '🎯', name: 'Perfect Sync', unlock: 'Zero collaboration errors' },
    { emoji: '🚀', name: 'Speed Demon', unlock: '100+ tasks/day' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-2">
            👥 TEAM ROSTER
          </h1>
          <p className="text-xl text-cyan-200 font-bold">
            ► {agents.length} AI Agents • Total {teamStats.totalTasks} Tasks Completed
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-lg border-4 border-yellow-200 shadow-lg transform hover:scale-105 transition">
            <Trophy className="text-yellow-900 mb-2" size={32} />
            <div className="text-sm text-yellow-900 font-bold uppercase">Total Tasks</div>
            <div className="text-4xl font-black text-yellow-900">{teamStats.totalTasks}</div>
            <div className="text-xs text-yellow-800 mt-2">completed by team</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-lg border-4 border-cyan-200 shadow-lg transform hover:scale-105 transition">
            <Star className="text-cyan-900 mb-2" size={32} />
            <div className="text-sm text-cyan-900 font-bold uppercase">Avg Quality</div>
            <div className="text-4xl font-black text-cyan-900">{teamStats.avgQuality}%</div>
            <div className="text-xs text-cyan-800 mt-2">quality score</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-lg border-4 border-pink-200 shadow-lg transform hover:scale-105 transition">
            <Zap className="text-pink-900 mb-2" size={32} />
            <div className="text-sm text-pink-900 font-bold uppercase">Uptime</div>
            <div className="text-4xl font-black text-pink-900">{teamStats.uptime}%</div>
            <div className="text-xs text-pink-800 mt-2">system availability</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-lg border-4 border-purple-200 shadow-lg transform hover:scale-105 transition">
            <TrendingUp className="text-purple-900 mb-2" size={32} />
            <div className="text-sm text-purple-900 font-bold uppercase">Collab Bonus</div>
            <div className="text-4xl font-black text-purple-900">+{teamStats.collaborationBonus}%</div>
            <div className="text-xs text-purple-800 mt-2">for teamwork</div>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {agents.map((agent, idx) => (
            <div
              key={agent.name}
              className={`bg-gradient-to-br ${agent.color} p-8 rounded-lg border-4 border-white shadow-2xl transform hover:scale-105 hover:rotate-2 transition duration-300 overflow-hidden relative`}
              style={{
                animation: `slideUp 0.6s ease-out ${idx * 0.1}s backwards`,
              }}
            >
              {/* Animated background circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Agent Emoji */}
                <div className="text-7xl mb-4">{agent.emoji}</div>

                {/* Name & Role */}
                <h2 className="text-2xl font-black text-white mb-1">{agent.name}</h2>
                <p className="text-sm font-bold text-white text-opacity-90 mb-4">{agent.role}</p>

                {/* Bio */}
                <p className="text-xs text-white text-opacity-80 mb-4 italic">"{agent.bio}"</p>

                {/* Level & XP */}
                <div className="bg-black bg-opacity-40 p-3 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-white">LEVEL {agent.level}</span>
                    <span className="text-xs font-bold text-yellow-300">{agent.xp} XP</span>
                  </div>
                  <div className="bg-black rounded-full h-3 border-2 border-white overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-300 to-white h-full"
                      style={{ width: `${(agent.xp % 10000) / 100}%` }}
                    />
                  </div>
                </div>

                {/* Tasks & Accuracy */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white bg-opacity-20 p-2 rounded text-center">
                    <div className="text-2xl font-black text-white">{agent.tasks}</div>
                    <div className="text-xs font-bold text-white text-opacity-90">Tasks</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded text-center">
                    <div className="text-2xl font-black text-white">{agent.accuracy}%</div>
                    <div className="text-xs font-bold text-white text-opacity-90">Accuracy</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-1">
                  <p className="text-xs font-black text-white text-opacity-90 uppercase">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs font-bold bg-white bg-opacity-30 text-white px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 p-2 bg-green-500 text-black rounded-lg text-center font-black text-sm animate-pulse">
                  🟢 ACTIVE
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Achievements */}
        <div className="bg-black border-4 border-pink-400 p-8 rounded-lg shadow-2xl mb-8">
          <h2 className="text-3xl font-black text-pink-300 mb-6">🏆 TEAM ACHIEVEMENTS</h2>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-lg border-3 border-pink-300 text-center transform hover:scale-110 transition"
              >
                <div className="text-5xl mb-3">{achievement.emoji}</div>
                <div className="font-black text-white mb-2">{achievement.name}</div>
                <div className="text-xs text-cyan-200">{achievement.unlock}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Message */}
        <div className="bg-gradient-to-r from-yellow-500 to-pink-500 p-8 rounded-lg border-4 border-yellow-200 shadow-2xl text-center">
          <h3 className="text-3xl font-black text-black mb-2">🎮 LEVEL UP TOGETHER</h3>
          <p className="text-black text-lg font-bold">
            This elite team of AI agents works in harmony. Each brings unique skills. Combined power is unstoppable.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
