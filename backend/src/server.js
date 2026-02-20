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
