import express from 'express'

const router = express.Router()

// Real-time pipeline status
const pipelineStatus = {
  lastUpdate: new Date(),
  crons: {
    darius: {
      name: 'DARIUS — Data Extractor',
      nextRun: '2026-02-20 16:00 PST',
      lastRun: '2026-02-20 15:00 PST',
      status: 'active',
      articlesScraped: 287,
      sources: ['TechCrunch', 'ESPN', 'Twitter'],
    },
    zara: {
      name: 'ZARA — Content Architect',
      nextRun: '2026-02-20 16:15 PST',
      lastRun: '2026-02-20 15:15 PST',
      status: 'idle',
      contentProcessed: 142,
      averageQuality: 94,
    },
    malik: {
      name: 'MALIK — Quality Judge',
      nextRun: '2026-02-20 16:30 PST',
      lastRun: '2026-02-20 15:30 PST',
      status: 'idle',
      contentReviewed: 142,
      approvalRate: 91,
    },
    nova: {
      name: 'NOVA — Social Publisher',
      nextRun: '2026-02-20 18:00 PST',
      lastRun: '2026-02-20 12:00 PST',
      status: 'idle',
      postsPublished: 42,
      avgImpressions: 15234,
    },
    reign: {
      name: 'REIGN — Memory Keeper',
      nextRun: '2026-02-20 23:59 PST',
      lastRun: '2026-02-19 23:59 PST',
      status: 'idle',
      sessionsArchived: 1,
      vectorsIndexed: 48000,
    },
  },
  github: {
    repo: 'Salimgroup/paraloop-culture-forge',
    lastCommit: {
      message: 'Add: Real Paraloop automation pipeline setup',
      author: 'KJ',
      timestamp: '2026-02-20 15:40 PST',
      sha: '09a63fb',
    },
    branch: 'main',
    totalCommits: 847,
  },
  stats: {
    tasksDone: 1847,
    crewXP: 52400,
    uptime: '99.8%',
    activeAgents: 8,
  },
}

// Get pipeline status
router.get('/status', (req, res) => {
  res.json(pipelineStatus)
})

// Get specific agent status
router.get('/agent/:agentId', (req, res) => {
  const { agentId } = req.params
  const agent = pipelineStatus.crons[agentId as keyof typeof pipelineStatus.crons]
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' })
  }
  
  res.json(agent)
})

// Get GitHub info
router.get('/github', (req, res) => {
  res.json(pipelineStatus.github)
})

// Get overall stats
router.get('/stats', (req, res) => {
  res.json(pipelineStatus.stats)
})

export default router
