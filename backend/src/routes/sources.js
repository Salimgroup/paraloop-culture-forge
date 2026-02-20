import express from 'express';
import db from '../database/db.js';

const router = express.Router();

const SOURCES = [
  // Music / Hip-Hop
  {name: "Hypebeast", url: "https://hypebeast.com", feed: "https://hypebeast.com/feed", category: "music"},
  {name: "Complex", url: "https://www.complex.com", feed: "https://www.complex.com/feed", category: "music"},
  {name: "Highsnobiety", url: "https://www.highsnobiety.com", feed: "https://www.highsnobiety.com/feed/", category: "streetwear"},
  {name: "REVOLT", url: "https://www.revolt.tv", feed: "https://www.revolt.tv/feed", category: "music"},
  {name: "VIBE", url: "https://www.vibe.com", feed: "https://www.vibe.com/feed/", category: "music"},
  {name: "Okayplayer", url: "https://www.okayplayer.com", feed: "https://www.okayplayer.com/feed", category: "music"},
  {name: "The FADER", url: "https://www.thefader.com", feed: "https://www.thefader.com/feed", category: "music"},
  {name: "HotNewHipHop", url: "https://www.hotnewhiphop.com", feed: "https://www.hotnewhiphop.com/rss.xml", category: "music"},
  {name: "HipHopDX", url: "https://hiphopdx.com", feed: "https://hiphopdx.com/feed", category: "music"},
  {name: "Afropunk", url: "https://afropunk.com", feed: "https://afropunk.com/feed/", category: "culture"},

  // Fine Arts
  {name: "Artsy", url: "https://www.artsy.net", feed: "https://www.artsy.net/rss/news", category: "fine-arts"},
  {name: "Artnet", url: "https://news.artnet.com", feed: "https://news.artnet.com/feed", category: "fine-arts"},
  {name: "The Art Newspaper", url: "https://www.theartnewspaper.com", feed: "https://www.theartnewspaper.com/rss", category: "fine-arts"},
  {name: "Hyperallergic", url: "https://hyperallergic.com", feed: "https://hyperallergic.com/feed/", category: "fine-arts"},
  {name: "ARTnews", url: "https://www.artnews.com", feed: "https://www.artnews.com/feed/", category: "fine-arts"},
  {name: "Culture Type", url: "https://www.culturetype.com", feed: "https://www.culturetype.com/feed/", category: "fine-arts"},

  // Business
  {name: "Black Enterprise", url: "https://www.blackenterprise.com", feed: "https://www.blackenterprise.com/feed/", category: "business"},
  {name: "AfroTech", url: "https://afrotech.com", feed: "https://afrotech.com/feed", category: "business"},
  {name: "TechCabal", url: "https://techcabal.com", feed: "https://techcabal.com/feed/", category: "business"},

  // Design
  {name: "Dezeen", url: "https://www.dezeen.com", feed: "https://www.dezeen.com/feed/", category: "design"},
  {name: "ArchDaily", url: "https://www.archdaily.com", feed: "https://www.archdaily.com/feed", category: "design"},
  {name: "Designboom", url: "https://www.designboom.com", feed: "https://www.designboom.com/feed/", category: "design"},
  {name: "It's Nice That", url: "https://www.itsnicethat.com", feed: "https://www.itsnicethat.com/rss", category: "design"},
  {name: "Core77", url: "https://www.core77.com", feed: "https://www.core77.com/feed", category: "design"},
  {name: "Design Indaba", url: "https://www.designindaba.com", feed: "https://www.designindaba.com/rss.xml", category: "design"},
];

router.post('/import', (req, res) => {
  const insert = db.prepare('INSERT OR IGNORE INTO sources (name, url, feed_url, category) VALUES (?, ?, ?, ?)');
  const insertMany = db.transaction((sources) => {
    for (const s of sources) insert.run(s.name, s.url, s.feed || null, s.category);
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
