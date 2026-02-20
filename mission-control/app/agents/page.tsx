'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, ThumbsUp, AlertCircle, CheckCircle, Zap } from 'lucide-react'

interface Message {
  id: number
  from: string
  to: string
  message: string
  type: string
  timestamp: Date
}

interface Work {
  id: string
  agent: string
  content: string
  type: string
  status: string
  qualityScore: number
  reviews: any[]
}

const agentColors: Record<string, string> = {
  'Scraper Alpha': 'from-yellow-500 to-orange-500',
  'Writer Prime': 'from-blue-500 to-cyan-500',
  'Judge Relevance': 'from-purple-500 to-pink-500',
  'Social Agent': 'from-red-500 to-pink-500',
  'Analyzer Pro': 'from-green-500 to-emerald-500',
}

const agentEmoji: Record<string, string> = {
  'Scraper Alpha': '🟡',
  'Writer Prime': '🔵',
  'Judge Relevance': '🟣',
  'Social Agent': '🔴',
  'Analyzer Pro': '🟢',
}

export default function AgentsCommunication() {
  const [messages, setMessages] = useState<Message[]>([])
  const [workItems, setWorkItems] = useState<Work[]>([])
  const [stats, setStats] = useState({ totalMessages: 0, avgQuality: 0, approvedWork: 0 })
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  useEffect(() => {
    // Simulate agent communication
    const simulateConversation = () => {
      const newMessages: Message[] = [
        {
          id: 1,
          from: 'Scraper Alpha',
          to: 'Writer Prime',
          message: '🔗 Found 3 trending tech articles from TechCrunch',
          type: 'collaboration',
          timestamp: new Date(Date.now() - 5000),
        },
        {
          id: 2,
          from: 'Writer Prime',
          to: 'Judge Relevance',
          message: '✍️ Created summaries for all 3 articles. Quality looks solid.',
          type: 'submission',
          timestamp: new Date(Date.now() - 3000),
        },
        {
          id: 3,
          from: 'Judge Relevance',
          to: 'Writer Prime',
          message: '✅ Reviewed! Score: 92/100. Grammar perfect, context great. Ready to publish!',
          type: 'approval',
          timestamp: new Date(Date.now() - 1000),
        },
        {
          id: 4,
          from: 'Social Agent',
          to: 'broadcast',
          message: '📱 Posting to Twitter, LinkedIn, and Instagram...',
          type: 'collaboration',
          timestamp: new Date(Date.now()),
        },
        {
          id: 5,
          from: 'Analyzer Pro',
          to: 'broadcast',
          message: '📊 Engagement tracking: 2.3K impressions in first minute!',
          type: 'collaboration',
          timestamp: new Date(Date.now() + 1000),
        },
      ]

      setMessages(newMessages)

      const workItems: Work[] = [
        {
          id: 'task-001',
          agent: 'Scraper Alpha',
          content: 'TechCrunch: "AI Revolution 2026"',
          type: 'article',
          status: 'approved',
          qualityScore: 95,
          reviews: [
            {
              reviewer: 'Judge Relevance',
              score: 95,
              feedback: 'Excellent extraction and formatting',
            },
          ],
        },
        {
          id: 'task-002',
          agent: 'Writer Prime',
          content: 'Summary: New AI models show 40% improvement in inference speed',
          type: 'summary',
          status: 'approved',
          qualityScore: 92,
          reviews: [
            {
              reviewer: 'Judge Relevance',
              score: 92,
              feedback: 'Clear, concise, perfect length',
            },
          ],
        },
        {
          id: 'task-003',
          agent: 'Judge Relevance',
          content: 'Relevance Score: 9.2/10 - High impact for tech community',
          type: 'rating',
          status: 'approved',
          qualityScore: 88,
          reviews: [],
        },
        {
          id: 'task-004',
          agent: 'Social Agent',
          content: 'Tweet: "🤖 2026 AI Breakthrough: New models 40% faster..."',
          type: 'post',
          status: 'pending_review',
          qualityScore: 0,
          reviews: [],
        },
      ]

      setWorkItems(workItems)

      setStats({
        totalMessages: newMessages.length,
        avgQuality: 92,
        approvedWork: workItems.filter((w) => w.status === 'approved').length,
      })
    }

    simulateConversation()

    // Simulate new messages every 5 seconds
    const interval = setInterval(simulateConversation, 8000)
    return () => clearInterval(interval)
  }, [])

  const getAgentMessages = (agent: string) => {
    return messages.filter((m) => m.from === agent || m.to === agent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-2">
          🤖 AGENT COLLABORATION
        </h1>
        <p className="text-cyan-200 font-bold mb-8">
          Watch agents communicate and review each other's work in real-time
        </p>

        {/* Collaboration Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-6 rounded-lg border-3 border-cyan-300 shadow-lg">
            <MessageCircle className="text-cyan-200 mb-3" size={28} />
            <div className="text-4xl font-black text-white">{stats.totalMessages}</div>
            <div className="text-sm font-bold text-cyan-200">Messages Exchanged</div>
            <div className="text-xs text-cyan-100 mt-2">Real-time collaboration</div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-lg border-3 border-green-300 shadow-lg">
            <CheckCircle className="text-green-200 mb-3" size={28} />
            <div className="text-4xl font-black text-white">{stats.approvedWork}</div>
            <div className="text-sm font-bold text-green-200">Work Approved</div>
            <div className="text-xs text-green-100 mt-2">Quality reviewed & passed</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-lg border-3 border-yellow-300 shadow-lg">
            <Zap className="text-yellow-200 mb-3" size={28} />
            <div className="text-4xl font-black text-white">{stats.avgQuality}%</div>
            <div className="text-sm font-bold text-yellow-200">Avg Quality Score</div>
            <div className="text-xs text-yellow-100 mt-2">Collaboration bonus applied</div>
          </div>
        </div>

        {/* Agent Communication Feed */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Live Conversation */}
          <div className="bg-black border-4 border-cyan-400 rounded-lg p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-cyan-300 mb-6 flex items-center gap-2">
              💬 LIVE CONVERSATION
            </h2>

            <div className="space-y-4 h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`animate-fadeIn p-4 rounded-lg border-2 ${
                    msg.from === 'broadcast'
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400'
                      : `bg-gradient-to-r ${agentColors[msg.from] || 'from-gray-600 to-gray-700'} border-opacity-50`
                  }`}
                  style={{
                    animation: `slideIn 0.5s ease-out`,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-black text-white flex items-center gap-2">
                      <span className="text-2xl">{agentEmoji[msg.from] || '🤖'}</span>
                      {msg.from}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        msg.type === 'approval'
                          ? 'bg-green-500 text-black'
                          : msg.type === 'submission'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-white'
                      }`}
                    >
                      {msg.type}
                    </span>
                  </div>
                  <p className="text-white text-sm font-semibold">{msg.message}</p>
                  <div className="text-xs text-gray-200 mt-2 opacity-75">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Quality Reviews */}
          <div className="bg-black border-4 border-pink-400 rounded-lg p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-pink-300 mb-6 flex items-center gap-2">
              ✅ QUALITY REVIEWS
            </h2>

            <div className="space-y-4 h-96 overflow-y-auto">
              {workItems.map((work) => (
                <div
                  key={work.id}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg border-3 border-pink-300 transform hover:scale-105 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-black text-white flex items-center gap-2">
                      <span>{agentEmoji[work.agent] || '🤖'}</span>
                      {work.agent}
                    </div>
                    <div
                      className={`text-xs font-black px-2 py-1 rounded-full ${
                        work.status === 'approved'
                          ? 'bg-green-500 text-black'
                          : 'bg-yellow-500 text-black'
                      }`}
                    >
                      {work.status === 'approved' ? '✅ APPROVED' : '⏳ REVIEWING'}
                    </div>
                  </div>

                  <p className="text-white text-sm mb-2 line-clamp-2">{work.content}</p>

                  {work.qualityScore > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-black rounded-full h-3 border border-pink-400 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pink-400 to-yellow-400 h-full"
                          style={{ width: `${work.qualityScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-black text-yellow-300">
                        {work.qualityScore}/100
                      </span>
                    </div>
                  )}

                  {work.reviews.length > 0 && (
                    <div className="text-xs text-cyan-200 bg-black bg-opacity-50 p-2 rounded">
                      <strong>Feedback:</strong> {work.reviews[0].feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Profiles */}
        <div className="bg-black border-4 border-yellow-400 rounded-lg p-8 shadow-2xl">
          <h2 className="text-3xl font-black text-yellow-300 mb-6">👥 AGENT TEAM</h2>

          <div className="grid grid-cols-5 gap-4">
            {Object.keys(agentEmoji).map((agent) => (
              <button
                key={agent}
                onClick={() => setSelectedAgent(agent)}
                className={`p-6 rounded-lg border-4 transform hover:scale-110 transition ${
                  selectedAgent === agent
                    ? `bg-gradient-to-br ${agentColors[agent]} border-white shadow-lg`
                    : `bg-gradient-to-br ${agentColors[agent]} border-opacity-50`
                }`}
              >
                <div className="text-4xl mb-2">{agentEmoji[agent]}</div>
                <div className="font-black text-white text-sm">{agent}</div>
                <div className="text-xs text-gray-100 mt-2">
                  {getAgentMessages(agent).length} messages
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
