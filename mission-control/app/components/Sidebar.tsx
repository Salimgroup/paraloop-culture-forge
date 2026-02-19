'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckSquare, Zap, Calendar, Brain, Users, Home, BookOpen } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Pipeline', href: '/pipeline', icon: Zap },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Memory', href: '/memory', icon: Brain },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Guide', href: '/guide', icon: BookOpen },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">
      <div className="mb-12">
        <h1 className="text-2xl font-black">
          <span className="text-white">PARALOOP</span>
          <br />
          <span className="text-blue-500">CONTROL</span>
        </h1>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded font-medium text-sm uppercase tracking-wider transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
