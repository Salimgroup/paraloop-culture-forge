import type { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paraloop Mission Control',
  description: 'AI Agent Management Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
