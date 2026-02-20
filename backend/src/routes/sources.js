import express from 'express';
import db from '../database/db.js';

const router = express.Router();

const SOURCES = [
  {name: "Hypebeast", url: "https://hypebeast.com", category: "music"},
  {name: "Complex", url: "https://www.complex.com/music", category: "music"},
  {name: "Highsnobiety", url: "https://www.highsnobiety.com", category: "streetwear"},
  {name: "REVOLT", url: "https://www.revolt.tv", category: "music"},
  {name: "VIBE", url: "https://www.vibe.com", category: "music"},
  {name: "Okayplayer", url: "https://www.okayplayer.com", category: "music"},
  {name: "The FADER", url: "https://www.thefader.com", category: "music"},
  {name: "HotNewHipHop", url: "https://www.hotnewhiphop.com", category: "music"},
  {name: "HipHopDX", url: "https://hiphopdx.com", category: "music"},
  {name: "Afropunk", url: "https://afropunk.com", category: "culture"},
  // Add all 70 sources here...
];

router.post('/import', (req, res) => {
  const insert = db.prepare('INSERT OR IGNORE INTO sources (name, url, category) VALUES (?, ?, ?)');
  const insertMany = db.transaction((sources) => {
    for (const s of sources) insert.run(s.name, s.url, s.category);
  });
  insertMany(SOURCES);
  const count = db.prepare('SELECT COUNT(*) as count FROM sources').get();
  res.json({ success: true, total: count.count });
});

router.get('/', (req, res) => {
  const sources = db.prepare('SELECT * FROM sources ORDER BY category, name').all();
  res.json({ sources });
});

export default router;
