import { CheckSquare, Zap, Calendar, Brain, Users } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-2">MISSION CONTROL</h1>
        <p className="text-gray-400 text-lg uppercase tracking-wider">
          Your AI Command Center
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <CheckSquare className="text-blue-500 mb-4" size={24} />
          <div className="text-3xl font-black mb-2">12</div>
          <div className="text-sm uppercase tracking-wider text-gray-400">Active Tasks</div>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <Zap className="text-yellow-500 mb-4" size={24} />
          <div className="text-3xl font-black mb-2">8</div>
          <div className="text-sm uppercase tracking-wider text-gray-400">Pipeline Items</div>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <Calendar className="text-purple-500 mb-4" size={24} />
          <div className="text-3xl font-black mb-2">24</div>
          <div className="text-sm uppercase tracking-wider text-gray-400">Scheduled Jobs</div>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <Brain className="text-pink-500 mb-4" size={24} />
          <div className="text-3xl font-black mb-2">156</div>
          <div className="text-sm uppercase tracking-wider text-gray-400">Memories</div>
        </div>
        <div className="bg-gray-900 p-6 rounded border border-gray-800">
          <Users className="text-green-500 mb-4" size={24} />
          <div className="text-3xl font-black mb-2">10</div>
          <div className="text-sm uppercase tracking-wider text-gray-400">Team Members</div>
        </div>
      </div>
    </div>
  )
}
