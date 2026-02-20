import express from 'express'
import cors from 'cors'
import agentCommunicationRoutes from './routes/agent-communication'
import pipelineStatusRoutes from './routes/pipeline-status'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Agent Communication API
app.use('/api/agents', agentCommunicationRoutes)

// Pipeline Status API
app.use('/api/pipeline', pipelineStatusRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.listen(PORT, () => {
  console.log(`🚀 Agent Communication Server running on port ${PORT}`)
})
