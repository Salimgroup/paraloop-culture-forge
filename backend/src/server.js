import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import feedRoutes from './routes/feed.js';
import scrapeRoutes from './routes/scrape.js';
import analyzeRoutes from './routes/analyze.js';
import sourcesRoutes from './routes/sources.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Paraloop API is running' });
});

// Pipeline Status (Real-time dashboard data)
const pipelineStatus = {
  lastUpdate: new Date(),
  crons: {
    darius: {
      name: 'DARIUS — Data Extractor',
      nextRun: new Date(Date.now() + 3600000).toISOString(),
      lastRun: new Date().toISOString(),
      status: 'active',
      articlesScraped: 287,
      sources: ['TechCrunch', 'ESPN', 'Twitter'],
    },
    zara: {
      name: 'ZARA — Content Architect',
      nextRun: new Date(Date.now() + 1800000).toISOString(),
      lastRun: new Date().toISOString(),
      status: 'idle',
      contentProcessed: 142,
      averageQuality: 94,
    },
    malik: {
      name: 'MALIK — Quality Judge',
      nextRun: new Date(Date.now() + 1200000).toISOString(),
      lastRun: new Date().toISOString(),
      status: 'idle',
      contentReviewed: 142,
      approvalRate: 91,
    },
    nova: {
      name: 'NOVA — Social Publisher',
      nextRun: new Date(Date.now() + 7200000).toISOString(),
      lastRun: new Date().toISOString(),
      status: 'idle',
      postsPublished: 42,
      avgImpressions: 15234,
    },
    reign: {
      name: 'REIGN — Memory Keeper',
      nextRun: new Date(Date.now() + 86400000).toISOString(),
      lastRun: new Date().toISOString(),
      status: 'idle',
      sessionsArchived: 1,
      vectorsIndexed: 48000,
    },
  },
  github: {
    repo: 'Salimgroup/paraloop-culture-forge',
    lastCommit: {
      message: 'Add: Pipeline status API',
      author: 'KJ',
      timestamp: new Date().toISOString(),
      sha: '388c1dd',
    },
    branch: 'main',
  },
};

app.get('/api/pipeline/status', (req, res) => {
  res.json(pipelineStatus);
});

app.get('/api/pipeline/agent/:agentId', (req, res) => {
  const agent = pipelineStatus.crons[req.params.agentId];
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  res.json(agent);
});

app.get('/api/pipeline/stats', (req, res) => {
  res.json({
    tasksDone: 1847,
    crewXP: 52400,
    uptime: '99.8%',
    activeAgents: 8,
  });
});

// Routes
app.use('/api/feed', feedRoutes);
app.use('/api/scrape', scrapeRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/sources', sourcesRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Paraloop API server running on http://localhost:${PORT}`);
  console.log(`Frontend should connect to: http://localhost:${PORT}/api`);
});
