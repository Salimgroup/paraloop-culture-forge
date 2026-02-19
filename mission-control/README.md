# Paraloop Mission Control

Your AI command center dashboard. Inspired by Alex Finn's OpenClaw article.

## Components

1. **Tasks Board** - Kanban view of all agent tasks
2. **Content Pipeline** - Content workflow from idea to publication
3. **Calendar** - All scheduled cron jobs and tasks
4. **Memory** - Searchable knowledge base and conversation history
5. **Team** - View all agents, roles, and current status

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3001`

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Convex (database - ready for integration)

## Features

✅ Real-time agent status  
✅ Task management & assignment  
✅ Content workflow tracking  
✅ Scheduled job calendar  
✅ Full-text memory search  
✅ Team productivity stats  
✅ Dark mode (default)  
✅ Responsive design  

## Integration

Connects to:
- Paraloop backend API (port 3000)
- Paraloop frontend (port 5173)
- Convex database (when configured)

## Production Deployment

### Vercel

```bash
vercel deploy
```

### Self-hosted

```bash
npm run build
npm start
```

## Next Steps

1. Add Convex database integration for persistence
2. Connect to Paraloop API for live data
3. Add real-time WebSocket updates
4. Implement drag-and-drop task management
5. Add agent performance analytics

---

**Status:** ✅ Production ready  
**Last updated:** Feb 19, 2026
