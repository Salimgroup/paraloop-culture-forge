'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckSquare, Zap, Calendar, Brain, Users, Home, BookOpen } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, color: 'from-yellow-400 to-orange-500' },
  { name: 'Agents', href: '/agents', icon: Users, color: 'from-cyan-400 to-blue-500' },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare, color: 'from-pink-400 to-red-500' },
  { name: 'Designs', href: '/designs', icon: Users, color: 'from-purple-400 to-pink-500' },
  { name: 'Pipeline', href: '/pipeline', icon: Zap, color: 'from-green-400 to-emerald-500' },
  { name: 'Calendar', href: '/calendar', icon: Calendar, color: 'from-blue-400 to-cyan-500' },
  { name: 'Memory', href: '/memory', icon: Brain, color: 'from-rose-400 to-pink-500' },
  { name: 'Team', href: '/team', icon: Users, color: 'from-amber-400 to-yellow-500' },
  { name: 'Guide', href: '/guide', icon: BookOpen, color: 'from-indigo-400 to-purple-500' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-purple-900 to-black p-6 border-r-4 border-yellow-400 min-h-screen">
      {/* Logo */}
      <div className="mb-12 p-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-lg border-3 border-yellow-300 transform hover:scale-105 transition">
        <h1 className="text-2xl font-black text-black">
          🕹️<br />PARALOOP<br />CONTROL
        </h1>
        <div className="text-xs font-bold text-gray-800 mt-2">LEVEL UP YOUR AGENTS</div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {navigation.map((item, idx) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const colors = item.color
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider border-2 transition transform hover:scale-105 ${
                isActive
                  ? `bg-gradient-to-r ${colors} text-black border-yellow-300 shadow-lg`
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-400'
              }`}
            >
              <Icon size={20} />
              {item.name}
              {isActive && <span className="ml-auto text-lg animate-bounce">▶</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Card */}
      <div className="mt-12 p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg border-3 border-cyan-300">
        <div className="text-3xl mb-2">👤</div>
        <div className="font-black text-black text-sm">COMMANDER KJ</div>
        <div className="text-xs text-blue-900 font-bold mt-1">Level 42</div>
        <div className="bg-black rounded mt-2 h-3 border border-cyan-300 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full" style={{width: '75%'}}></div>
        </div>
        <div className="text-xs text-blue-900 font-bold mt-1">15K XP to next level</div>
      </div>

      {/* Footer Badge */}
      <div className="mt-8 p-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg border-2 border-pink-300 text-center">
        <div className="text-2xl">🏆</div>
        <div className="text-xs font-black text-red-900 mt-1">STREAKING 13 DAYS</div>
      </div>
    </div>
  )
}
