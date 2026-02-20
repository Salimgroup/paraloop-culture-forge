import express from 'express';
import Parser from 'rss-parser';
import db from '../database/db.js';

const router = express.Router();
const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'Paraloop Culture Bot/1.0' },
});

router.post('/', async (req, res) => {
  const sources = db.prepare('SELECT * FROM sources WHERE active = 1').all();

  if (sources.length === 0) {
    return res.status(400).json({
      error: 'No sources found. Run POST /api/sources/import first'
    });
  }

  const results = [];
  let totalScraped = 0;

  const insert = db.prepare(`
    INSERT OR IGNORE INTO culture_articles (
      source_id, source_name, title, excerpt, content,
      article_url, image_url, category, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const source of sources) {
    const feedUrl = source.feed_url || `${source.url}/feed`;
    console.log(`Scraping ${source.name} (${feedUrl})...`);

    try {
      const feed = await parser.parseURL(feedUrl);
      const items = (feed.items || []).slice(0, 5);

      for (const item of items) {
        if (!item.title || !item.link) continue;

        const title = item.title.trim();
        const excerpt = (item.contentSnippet || item.summary || '').substring(0, 500).trim();
        const content = (item['content:encoded'] || item.content || excerpt).substring(0, 3000);
        const imageUrl = extractImage(item);

        const info = insert.run(
          source.id,
          source.name,
          title,
          excerpt || null,
          content || null,
          item.link,
          imageUrl,
          source.category,
          JSON.stringify([source.category, 'culture'])
        );

        if (info.changes > 0) {
          totalScraped++;
          results.push({ source: source.name, title, url: item.link });
        }
      }

      console.log(`   Got ${items.length} items from ${source.name}`);
    } catch (err) {
      console.error(`   Failed ${source.name}: ${err.message}`);
    }
  }

  console.log(`\nDone! Scraped ${totalScraped} new articles from ${sources.length} sources.\n`);

  res.json({
    success: true,
    count: totalScraped,
    sources: sources.length,
    articles: results
  });
});

function extractImage(item) {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item['media:content']?.$.url) return item['media:content'].$.url;
  const match = (item['content:encoded'] || item.content || '').match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

export default router;
