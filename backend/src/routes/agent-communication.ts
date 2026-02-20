import express from 'express'

const router = express.Router()

// In-memory agent communication log (in production, use database)
const agentMessages: any[] = []
const workQueue: any[] = []

// Agent communication endpoint
router.post('/message', (req, res) => {
  const { from, to, message, taskId, type } = req.body

  const msg = {
    id: Date.now(),
    from,
    to,
    message,
    taskId,
    type, // 'request', 'feedback', 'approval', 'revision'
    timestamp: new Date(),
    read: false,
  }

  agentMessages.push(msg)

  // Keep only last 100 messages
  if (agentMessages.length > 100) {
    agentMessages.shift()
  }

  res.json({ success: true, message: msg })
})

// Get agent conversation
router.get('/messages/:agentId', (req, res) => {
  const { agentId } = req.params
  const messages = agentMessages.filter(
    (msg) => msg.from === agentId || msg.to === agentId
  )
  res.json(messages.slice(-20)) // Last 20 messages
})

// Submit work for review
router.post('/submit-work', (req, res) => {
  const { agent, taskId, content, type } = req.body

  const work = {
    id: taskId,
    agent,
    content,
    type, // 'article', 'summary', 'rating', 'post'
    status: 'pending_review',
    qualityScore: 0,
    reviews: [],
    timestamp: new Date(),
  }

  workQueue.push(work)

  // Agent automatically sends to reviewer
  agentMessages.push({
    id: Date.now(),
    from: agent,
    to: 'Judge Relevance', // or appropriate reviewer
    message: `I've completed "${type}" for task ${taskId}. Please review and provide feedback.`,
    taskId,
    type: 'submission',
    timestamp: new Date(),
  })

  res.json({ success: true, work })
})

// Review work
router.post('/review-work', (req, res) => {
  const { workId, reviewer, score, feedback, status } = req.body

  const work = workQueue.find((w) => w.id === workId)
  if (!work) return res.status(404).json({ error: 'Work not found' })

  work.reviews.push({
    reviewer,
    score,
    feedback,
    timestamp: new Date(),
  })

  work.qualityScore = Math.round(
    work.reviews.reduce((sum, r) => sum + r.score, 0) / work.reviews.length
  )

  work.status = status || (score >= 80 ? 'approved' : 'needs_revision')

  // Send feedback message
  agentMessages.push({
    id: Date.now(),
    from: reviewer,
    to: work.agent,
    message:
      score >= 80
        ? `✅ Great work! Score: ${score}. ${feedback}`
        : `📝 Needs revision. Score: ${score}. Feedback: ${feedback}`,
    taskId: workId,
    type: 'review',
    timestamp: new Date(),
  })

  res.json({ success: true, work })
})

// Get work queue with quality scores
router.get('/work-queue', (req, res) => {
  res.json(workQueue)
})

// Get agent collaboration stats
router.get('/stats', (req, res) => {
  const totalMessages = agentMessages.length
  const totalWork = workQueue.length
  const approvedWork = workQueue.filter((w) => w.status === 'approved').length
  const avgQuality =
    workQueue.length > 0
      ? Math.round(
          workQueue.reduce((sum, w) => sum + w.qualityScore, 0) / workQueue.length
        )
      : 0

  res.json({
    totalMessages,
    totalWork,
    approvedWork,
    avgQuality,
    collaborationScore: Math.round(avgQuality * 1.2), // Bonus for collaboration
  })
})

// Simulate agent conversation
router.post('/simulate-collaboration', (req, res) => {
  const { taskId } = req.body

  const conversations = [
    {
      agent: 'Scraper Alpha',
      message: 'Found 3 trending tech articles. Sending to Writer Prime.',
    },
    {
      agent: 'Writer Prime',
      message: 'Got the articles. Creating summaries now...',
    },
    {
      agent: 'Writer Prime',
      message: 'Done! Sent to Judge Relevance for review.',
    },
    {
      agent: 'Judge Relevance',
      message: 'Reviewing content... Quality looks good!',
    },
    {
      agent: 'Judge Relevance',
      message: '✅ Approved! Score: 92/100. Ready for posting.',
    },
    {
      agent: 'Social Agent',
      message: 'Scheduling for social media...',
    },
    {
      agent: 'Social Agent',
      message: '🎉 Posted to Twitter, LinkedIn, and Instagram!',
    },
  ]

  conversations.forEach((conv, idx) => {
    setTimeout(() => {
      agentMessages.push({
        id: Date.now() + idx,
        from: conv.agent,
        to: 'broadcast',
        message: conv.message,
        taskId,
        type: 'collaboration',
        timestamp: new Date(),
      })
    }, idx * 500)
  })

  res.json({ success: true, messages: conversations })
})

export default router
