'use client'

import { useEffect, useState } from 'react'
import { Zap, Trophy, Flame, Heart, Shield, Sword, Clock, Target } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  agent: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary'
  status: 'pending' | 'in_progress' | 'completed'
  reward: number
  progress: number
  dueDate: string
  tags: string[]
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Fetch TechCrunch Articles',
      description: 'Scrape 10 trending tech articles from TechCrunch',
      agent: '🟡 Scraper Alpha',
      difficulty: 'Medium',
      status: 'in_progress',
      reward: 250,
      progress: 75,
      dueDate: '2h remaining',
      tags: ['Scraping', 'Tech', 'Trending'],
    },
    {
      id: '2',
      title: 'Generate AI Summaries',
      description: 'Create 10 high-quality summaries of tech articles',
      agent: '🔵 Writer Prime',
      difficulty: 'Hard',
      status: 'in_progress',
      reward: 500,
      progress: 42,
      dueDate: '4h remaining',
      tags: ['Writing', 'AI', 'Summary'],
    },
    {
      id: '3',
      title: 'Rate Content Relevance',
      description: 'Rate all articles for culture relevance (1-10)',
      agent: '🟣 Judge Relevance',
      difficulty: 'Medium',
      status: 'pending',
      reward: 300,
      progress: 0,
      dueDate: '6h remaining',
      tags: ['Scoring', 'Quality', 'Review'],
    },
    {
      id: '4',
      title: 'Social Media Blitz',
      description: 'Post to Twitter, LinkedIn, and Instagram',
      agent: '🔴 Social Agent',
      difficulty: 'Easy',
      status: 'pending',
      reward: 150,
      progress: 0,
      dueDate: '8h remaining',
      tags: ['Social', 'Marketing', 'Posting'],
    },
    {
      id: '5',
      title: 'LEGENDARY: Culture Wave Analysis',
      description: 'Deep dive analysis of cultural trends across all sources',
      agent: '⭐ Orchestrator',
      difficulty: 'Legendary',
      status: 'pending',
      reward: 1000,
      progress: 0,
      dueDate: '12h remaining',
      tags: ['Analysis', 'Trends', 'Epic'],
    },
    {
      id: '6',
      title: 'Engagement Tracking',
      description: 'Track and report metrics for all posted content',
      agent: '🟢 Analyzer Pro',
      difficulty: 'Easy',
      status: 'completed',
      reward: 200,
      progress: 100,
      dueDate: 'Completed',
      tags: ['Analytics', 'Reporting', 'Done'],
    },
  ])

  const totalReward = tasks.reduce((sum, t) => sum + (t.status === 'completed' ? t.reward : 0), 0)
  const tasksCompleted = tasks.filter((t) => t.status === 'completed').length
  const tasksInProgress = tasks.filter((t) => t.status === 'in_progress').length

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Easy: 'from-green-500 to-emerald-500 border-green-300',
      Medium: 'from-blue-500 to-cyan-500 border-cyan-300',
      Hard: 'from-orange-500 to-red-500 border-orange-300',
      Legendary: 'from-purple-600 via-pink-500 to-purple-600 border-pink-400 animate-pulse',
    }
    return colors[difficulty] || 'from-gray-500 to-gray-600'
  }

  const getDifficultyIcon = (difficulty: string) => {
    const icons: Record<string, string> = {
      Easy: '⚔️',
      Medium: '🗡️',
      Hard: '⚡',
      Legendary: '👑',
    }
    return icons[difficulty] || '⚔️'
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; emoji: string; text: string }> = {
      pending: { color: 'bg-yellow-500', emoji: '⏳', text: 'PENDING' },
      in_progress: { color: 'bg-blue-500 animate-pulse', emoji: '⚡', text: 'ACTIVE' },
      completed: { color: 'bg-green-500', emoji: '✅', text: 'COMPLETE' },
    }
    return badges[status] || badges.pending
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-2">
            ⚔️ QUEST BOARD
          </h1>
          <p className="text-xl text-cyan-200 font-bold">► Daily Missions & Epic Challenges</p>
        </div>

        {/* Quest Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-lg border-4 border-purple-300 shadow-lg transform hover:scale-105 transition">
            <Trophy className="text-purple-200 mb-2" size={32} />
            <div className="text-sm text-purple-100 font-bold uppercase">Total Rewards</div>
            <div className="text-4xl font-black text-yellow-300">{totalReward}</div>
            <div className="text-xs text-purple-200 mt-2">Gold earned</div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-lg border-4 border-green-300 shadow-lg transform hover:scale-105 transition">
            <Shield className="text-green-200 mb-2" size={32} />
            <div className="text-sm text-green-100 font-bold uppercase">Completed</div>
            <div className="text-4xl font-black text-white">{tasksCompleted}</div>
            <div className="text-xs text-green-200 mt-2">of {tasks.length} quests</div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-lg border-4 border-cyan-300 shadow-lg transform hover:scale-105 transition">
            <Flame className="text-blue-200 mb-2" size={32} />
            <div className="text-sm text-blue-100 font-bold uppercase">In Progress</div>
            <div className="text-4xl font-black text-white">{tasksInProgress}</div>
            <div className="text-xs text-blue-200 mt-2">active missions</div>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-red-600 p-6 rounded-lg border-4 border-pink-300 shadow-lg transform hover:scale-105 transition">
            <Sword className="text-pink-200 mb-2" size={32} />
            <div className="text-sm text-pink-100 font-bold uppercase">Win Streak</div>
            <div className="text-4xl font-black text-white">13</div>
            <div className="text-xs text-pink-200 mt-2">days consecutive 🔥</div>
          </div>
        </div>

        {/* Quest Filter/Tabs */}
        <div className="flex gap-3 mb-8">
          {['All', 'Active', 'Pending', 'Completed'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-3 rounded-lg font-black text-sm border-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-200 hover:scale-105 transition transform"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Quest Cards Grid */}
        <div className="space-y-4">
          {tasks.map((task, idx) => {
            const badge = getStatusBadge(task.status)
            const diffColor = getDifficultyColor(task.difficulty)

            return (
              <div
                key={task.id}
                className={`bg-gradient-to-r ${diffColor} p-6 rounded-lg border-4 shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 overflow-hidden relative`}
                style={{
                  animation: `slideIn 0.6s ease-out ${idx * 0.1}s backwards`,
                }}
              >
                {/* Animated background */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex items-start justify-between">
                  {/* Left: Quest Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{getDifficultyIcon(task.difficulty)}</span>
                      <h2 className="text-2xl font-black text-white">{task.title}</h2>
                    </div>

                    <p className="text-white text-opacity-90 mb-3">{task.description}</p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold bg-black bg-opacity-40 text-white px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Agent & Details */}
                    <div className="flex items-center gap-4 text-white text-opacity-90 text-sm font-bold">
                      <span>{task.agent}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} /> {task.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Right: Status & Rewards */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Status Badge */}
                    <div
                      className={`${badge.color} text-black font-black px-4 py-2 rounded-lg text-xs uppercase flex items-center gap-1`}
                    >
                      <span>{badge.emoji}</span>
                      {badge.text}
                    </div>

                    {/* Reward */}
                    <div className="bg-black bg-opacity-40 px-4 py-2 rounded-lg text-center">
                      <div className="text-2xl font-black text-yellow-400">{task.reward}</div>
                      <div className="text-xs text-yellow-300 font-bold">GOLD</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-32">
                      <div className="text-xs font-black text-white mb-1 text-right">{task.progress}%</div>
                      <div className="bg-black bg-opacity-50 rounded-full h-4 border-2 border-white overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-300 to-white h-full rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated status pulse for active tasks */}
                {task.status === 'in_progress' && (
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Daily Challenge */}
        <div className="mt-12 bg-black border-4 border-yellow-400 p-8 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black text-yellow-300 mb-2">⭐ DAILY CHALLENGE</h2>
            <p className="text-yellow-200 font-bold mb-4">Complete 3 quests to unlock bonus rewards!</p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { num: 1, reward: 100, completed: true },
                { num: 2, reward: 200, completed: true },
                { num: 3, reward: 500, completed: false },
              ].map((challenge) => (
                <div
                  key={challenge.num}
                  className={`p-4 rounded-lg border-3 text-center ${
                    challenge.completed
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 border-green-300'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-500'
                  }`}
                >
                  <div className="text-3xl font-black mb-2">{challenge.completed ? '✅' : `#${challenge.num}`}</div>
                  <div className="text-sm font-bold text-white mb-2">Quest {challenge.num}</div>
                  <div className="text-xl font-black text-yellow-300">+{challenge.reward} Gold</div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-center">
              <div className="text-2xl font-black text-black">🎁 Complete to Unlock: Mystery Reward! 🎁</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
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
