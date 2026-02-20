import express from 'express';
import Firecrawl from '@mendable/firecrawl-js';
import db from '../database/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
  
  if (!FIRECRAWL_API_KEY) {
    return res.status(500).json({ error: 'FIRECRAWL_API_KEY not set in .env file' });
  }
  
  const app = new Firecrawl({ apiKey: FIRECRAWL_API_KEY });
  
  // Get active sources (limit to 1 site for testing)
  const sources = db.prepare('SELECT * FROM sources WHERE active = 1 LIMIT 1').all();
  
  if (sources.length === 0) {
    return res.status(400).json({ 
      error: 'No sources found. Run POST /api/sources/import first' 
    });
  }
  
  const results = [];
  let totalScraped = 0;
  
  try {
    for (const source of sources) {
      console.log(`\nScraping ${source.name} (${source.url})...`);
      
      try {
        // Scrape the source homepage
        const scrapeResult = await app.scrape(source.url);
        
        console.log('   Full response type:', typeof scrapeResult);
        console.log('   Response keys:', scrapeResult ? Object.keys(scrapeResult) : 'null');
        console.log('   Response:', JSON.stringify(scrapeResult, null, 2).substring(0, 500));
        
        // Check if response has markdown/content directly
        if (scrapeResult && (scrapeResult.markdown || scrapeResult.content)) {
          console.log('   Got content directly from response');
          
          // Extract links from markdown/content using regex
          const content = scrapeResult.markdown || scrapeResult.content || '';
          const linkRegex = /https?:\/\/[^\s\)\"\']+/g;
          const allLinks = content.match(linkRegex) || [];
          
          // Filter for article links
          const articleLinks = allLinks
            .filter(link => {
              return (
                link.includes(source.url.replace('https://', '').replace('www.', '')) && // Same domain
                (link.includes('/20') || link.includes('/article/') || link.includes('/news/')) &&
                !link.includes('/tag/') &&
                !link.includes('/category/')
              );
            })
            .slice(0, 3); // Top 3 for testing
          
          console.log(`   Found ${articleLinks.length} article links`);
          console.log(`   Links:`, articleLinks);
          
          // For now, just create a test article to confirm the flow works
          const testTitle = `Test Article from ${source.name}`;
          const testUrl = `${source.url}/test-${Date.now()}`;
          
          db.prepare(`
            INSERT INTO culture_articles (
              source_id, source_name, title, excerpt, content,
              article_url, image_url, category, tags
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            source.id,
            source.name,
            testTitle,
            'Test article to verify scraping pipeline',
            content.substring(0, 1000),
            testUrl,
            null,
            source.category,
            JSON.stringify([source.category, 'culture', 'test'])
          );
          
          totalScraped++;
          results.push({
            source: source.name,
            title: testTitle,
            url: testUrl
          });
          
          console.log(`   Created test article`);
        } else {
          console.log('   No content in response');
        }
      } catch (sourceError) {
        console.error(`   Error scraping ${source.name}:`, sourceError.message);
        console.error('   Error details:', sourceError);
      }
    }
    
    console.log(`\nScraping complete! Scraped ${totalScraped} articles from ${sources.length} sources.\n`);
    
    res.json({
      success: true,
      count: totalScraped,
      sources: sources.length,
      articles: results
    });
    
  } catch (error) {
    console.error('Error in scrape:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
