import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Get culture feed
router.get('/culture', (req, res) => {
  const { category = 'all', limit = 24 } = req.query;
  let query = 'SELECT * FROM culture_articles WHERE published = 1';
  const params = [];
  
  if (category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(parseInt(limit));
  
  const articles = db.prepare(query).all(...params);
  res.json({ items: articles.map(a => ({...a, tags: a.tags ? JSON.parse(a.tags) : []})) });
});

// Get main feed
router.get('/', (req, res) => {
  const articles = db.prepare('SELECT * FROM culture_articles WHERE published = 1 ORDER BY created_at DESC LIMIT 24').all();
  res.json({ items: articles.map(a => ({...a, tags: a.tags ? JSON.parse(a.tags) : []})) });
});

export default router;
