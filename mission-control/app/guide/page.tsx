'use client'

import { useState } from 'react'
import { ChevronDown, Copy, Check } from 'lucide-react'

export default function GuidePage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { id: 'vision', label: 'Vision' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'agents', label: 'Agents' },
    { id: 'mission-control', label: 'Mission Control' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'scaling', label: 'Scaling' },
    { id: 'practices', label: 'Best Practices' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-lg">
        <h1 className="text-5xl font-black mb-4">SALIM CLAWBOT FEST</h1>
        <p className="text-xl mb-6">Your complete AI command center playbook</p>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded font-bold"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Share Link'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-gray-900 p-6 rounded h-fit sticky top-8">
          <h2 className="font-bold mb-4 uppercase text-sm tracking-wider">Contents</h2>
          <nav className="space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded transition"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="col-span-3 space-y-12 text-gray-200">
          {/* Vision */}
          <section id="vision" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🎯 Vision</h2>
            <div className="space-y-4">
              <p>
                <strong>Paraloop</strong> is an AI-driven culture media platform that intelligently
                curates, analyzes, and distributes global culture news with wellness-first principles.
              </p>
              <p>You're building a <strong>digital dynasty</strong> where:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>🤖 AI agents handle repetitive work (scraping, writing, analyzing)</li>
                <li>👤 You focus on strategy, editorial decisions, and growth</li>
                <li>📊 Mission Control gives you complete visibility into your AI team</li>
                <li>🌍 Culture content flows from 100+ sources to your audience</li>
              </ul>
              <p className="pt-4">
                <strong>The Goal:</strong> Build Salim Enterprises' media empire using AI as your workforce.
              </p>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🏗️ Architecture</h2>
            <div className="bg-gray-800 p-6 rounded mb-6 font-mono text-sm overflow-x-auto">
              <pre>{`┌──────────────────────────────────────────────────────────────┐
│                   PARALOOP FULL STACK                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Frontend      │  │  Mission Control│  │   Backend    │ │
│  │  (React + Vite) │  │ (Next.js + TS)  │  │ (Node/Expr)  │ │
│  │   Port 5173     │  │   Port 3001     │  │   Port 3000  │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘ │
│           │                    │                   │         │
│           └────────────────────┼───────────────────┘         │
│                                │                              │
│                         ┌──────▼──────┐                      │
│                         │  REST API   │                      │
│                         │  /api/feed  │                      │
│                         │  /api/...   │                      │
│                         └──────┬──────┘                      │
│                                │                              │
│                         ┌──────▼──────┐                      │
│                         │  Supabase   │                      │
│                         │  PostgreSQL │                      │
│                         └─────────────┘                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘`}</pre>
            </div>
            <p>
              Three independently scalable applications with REST API communication and shared Supabase database.
            </p>
          </section>

          {/* Ecosystem */}
          <section id="ecosystem" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🎭 The Paraloop Ecosystem</h2>
            <h3 className="text-2xl font-bold mb-4">What It Does</h3>
            <p className="mb-4">
              Paraloop is a <strong>content production factory</strong> that:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mb-6">
              <li>Scrapes culture content from 100+ global sources</li>
              <li>Analyzes relevance, sentiment, and categorization</li>
              <li>Rewrites headlines for clarity & engagement</li>
              <li>Generates social media summaries</li>
              <li>Publishes to your feed & social channels</li>
              <li>Tracks performance & audience engagement</li>
            </ol>
            <h3 className="text-2xl font-bold mb-4">Your Role</h3>
            <p>You don't execute tasks. You <strong>command the army</strong>:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>✅ Review what agents have scraped</li>
              <li>✅ Approve or reject articles</li>
              <li>✅ Set content strategy & filters</li>
              <li>✅ Monitor team productivity</li>
              <li>✅ Make editorial decisions</li>
              <li>✅ Scale operations as needed</li>
            </ul>
          </section>

          {/* Agents */}
          <section id="agents" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">👥 Agent Organization</h2>
            <p className="mb-6">Your team has <strong>10 members</strong> (1 human + 9 AI):</p>

            <div className="space-y-6">
              <div className="bg-blue-900 p-6 rounded">
                <h3 className="text-xl font-bold mb-2">👤 You - Content Director</h3>
                <p className="text-sm">Strategic decisions, editorial oversight, team management, growth & scaling</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">🔧 Scrapers Team (3)</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Scraper Alpha</p>
                    <p className="text-sm text-gray-400">TechCrunch, The Verge, Wired - 342 tasks</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Scraper Beta</p>
                    <p className="text-sm text-gray-400">Medium, Substack, AngelList - 298 tasks</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Scraper Gamma</p>
                    <p className="text-sm text-gray-400">Atlantic, NPR, FT - 256 tasks</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">✍️ Writers Team (2)</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Writer Prime</p>
                    <p className="text-sm text-gray-400">Headline optimization - 234 tasks</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Writer Guardian</p>
                    <p className="text-sm text-gray-400">Deep analysis & context - 189 tasks</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">🧠 Analyzers Team (2)</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Judge Relevance</p>
                    <p className="text-sm text-gray-400">Scores article relevance - 412 tasks</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Category Master</p>
                    <p className="text-sm text-gray-400">Auto-categorization - 389 tasks</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <p className="font-bold">🐦 Twitter Agent</p>
                <p className="text-sm text-gray-400">Social distribution - 567 tasks</p>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <p className="font-bold">⚙️ Orchestrator</p>
                <p className="text-sm text-gray-400">Workflow automation - 1,234 tasks</p>
              </div>
            </div>
          </section>

          {/* Mission Control */}
          <section id="mission-control" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🎛️ Mission Control</h2>
            <p className="mb-6">Five core components for complete command:</p>

            <div className="space-y-6">
              {[
                {
                  num: 1,
                  title: 'Tasks Board',
                  desc: 'Kanban view of everything happening. Assign tasks, track status in real-time.',
                },
                {
                  num: 2,
                  title: 'Content Pipeline',
                  desc: 'Track content through production stages: Idea → Script → Summary → Thumbnail → Published',
                },
                {
                  num: 3,
                  title: 'Calendar',
                  desc: 'All scheduled jobs in one place. Cron job visibility, next run times, agent assignments.',
                },
                {
                  num: 4,
                  title: 'Memory',
                  desc: 'Your collective knowledge. Full-text search across all conversations and decisions.',
                },
                {
                  num: 5,
                  title: 'Team',
                  desc: 'Your agent roster. See roles, current tasks, status, and productivity stats.',
                },
              ].map((component) => (
                <div key={component.num} className="bg-gray-800 p-6 rounded border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-2">
                    {component.num}. {component.title}
                  </h3>
                  <p className="text-gray-300">{component.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🛠️ Tech Stack</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Frontend</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ React 18</li>
                  <li>✓ Vite 5</li>
                  <li>✓ TypeScript</li>
                  <li>✓ Tailwind CSS</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Backend</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Node.js 18+</li>
                  <li>✓ Express 4</li>
                  <li>✓ TypeScript</li>
                  <li>✓ Zod validation</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Mission Control</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Next.js 14</li>
                  <li>✓ TypeScript</li>
                  <li>✓ Tailwind CSS</li>
                  <li>✓ Convex ready</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Database & Deployment</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Supabase</li>
                  <li>✓ Antigravity</li>
                  <li>✓ GitHub</li>
                  <li>✓ Docker ready</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🚀 Getting Started</h2>

            <div className="bg-gray-800 p-6 rounded mb-6">
              <h3 className="font-bold mb-3">Local Setup</h3>
              <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
{`# Clone repo
git clone https://github.com/Salimgroup/paraloop-culture-forge.git
cd paraloop-culture-forge

# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev

# Terminal 3: Mission Control
cd mission-control && npm run dev`}
              </pre>
            </div>

            <p className="mb-6">Visit:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Frontend:</strong> http://localhost:5173</li>
              <li><strong>Backend:</strong> http://localhost:3000</li>
              <li><strong>Mission Control:</strong> http://localhost:3001</li>
            </ul>
          </section>

          {/* Deployment */}
          <section id="deployment" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">📦 Deployment</h2>

            <div className="space-y-6">
              <div className="bg-blue-900 p-6 rounded">
                <h3 className="font-bold mb-3">Option 1: Antigravity (Recommended)</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                  <li>Push to GitHub</li>
                  <li>Connect repository in Antigravity</li>
                  <li>Set environment variables</li>
                  <li>Deploy - auto-builds on every push</li>
                </ol>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Option 2: Vercel (Each app separately)</h3>
                <p className="text-sm">Fast, serverless, global CDN</p>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-3">Option 3: Docker</h3>
                <p className="text-sm">Container-based deployment, run anywhere</p>
              </div>
            </div>
          </section>

          {/* Scaling */}
          <section id="scaling" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">📈 Scaling</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-2">Phase 1: Current ✅</h3>
                <p className="text-sm">3 scrapers, 2 writers, 2 analyzers, 1 social agent, 1 orchestrator</p>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-2">Phase 2: Growth (1-2 weeks)</h3>
                <p className="text-sm">Add 5 more specialized scrapers, video analyzer, podcast transcriber</p>
              </div>

              <div className="bg-gray-800 p-6 rounded">
                <h3 className="font-bold mb-2">Phase 3: Enterprise (1 month+)</h3>
                <p className="text-sm">50+ agents, advanced caching, CDN, multi-region deployment</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="practices" className="scroll-mt-8">
            <h2 className="text-4xl font-black mb-6 text-white">🔧 Best Practices</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">For You (Content Director)</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Daily Review</p>
                    <p className="text-sm text-gray-400">Check Mission Control, review new articles, approve content</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Weekly Planning</p>
                    <p className="text-sm text-gray-400">Review agent performance, adjust strategy, plan content themes</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="font-bold">Monthly Retrospective</p>
                    <p className="text-sm text-gray-400">Analyze what worked, update instructions, share insights</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center">
            <h2 className="text-3xl font-black mb-4">You're Ready to Build</h2>
            <p className="mb-6">You now have a complete AI-powered content platform with full documentation.</p>
            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="px-6 py-3 bg-white text-blue-600 rounded font-bold hover:bg-gray-100"
              >
                Dashboard
              </a>
              <a
                href="https://github.com/Salimgroup/paraloop-culture-forge"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-blue-800 text-white rounded font-bold hover:bg-blue-900"
              >
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
