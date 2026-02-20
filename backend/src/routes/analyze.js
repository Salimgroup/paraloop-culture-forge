import express from 'express';
import OpenAI from 'openai';
import db from '../database/db.js';

const router = express.Router();

const PARALOOP_VOICE = `You are writing for Paraloop Culture - an AI-powered culture intelligence platform.

VOICE & TONE:
- Calm, optimistic, wellness-forward, culturally fluent
- Never clickbait, never alarmist
- Knowledgeable friend celebrating creativity and innovation
- Explain cultural significance and community wellness connections

TARGET: Culture-engaged readers seeking curated, positive content on music, fashion, art, business without doom-scrolling.`;

router.post('/', async (req, res) => {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  
  if (!DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY not set in .env file' });
  }
  
  const openai = new OpenAI({
    apiKey: DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
  });
  
  // Get unanalyzed articles
  const articles = db.prepare('SELECT * FROM culture_articles WHERE analyzed = 0 LIMIT 5').all();
  
  if (articles.length === 0) {
    return res.json({ success: true, analyzed: 0, message: 'No articles to analyze' });
  }
  
  const results = [];
  
  try {
    for (const article of articles) {
      console.log(`\nAnalyzing: ${article.title.substring(0, 60)}...`);
      
      try {
        // Step 1: Score relevance (0-1 scale)
        const scorePrompt = `${PARALOOP_VOICE}

Score this article for cultural relevance on a 0-1 scale based on:
- Cultural impact and significance
- Freshness and timeliness  
- Community value and wellness connection

Article:
Title: ${article.title}
Source: ${article.source_name}
Content: ${(article.content || article.excerpt || '').substring(0, 1000)}

Respond with ONLY a number between 0 and 1 (e.g., 0.75)`;

        const scoreResponse = await openai.chat.completions.create({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: scorePrompt }],
          max_tokens: 10,
          temperature: 0.3
        });
        
        const scoreText = scoreResponse.choices[0].message.content.trim();
        const relevanceScore = parseFloat(scoreText) || 0;
        
        console.log(`   Score: ${relevanceScore}`);
        
        // Only rewrite if score is high enough (>0.55)
        if (relevanceScore < 0.55) {
          db.prepare('UPDATE culture_articles SET analyzed = 1, relevance_score = ? WHERE id = ?')
            .run(relevanceScore, article.id);
          console.log(`   Skipped (score too low)`);
          continue;
        }
        
        // Step 2: Rewrite in Paraloop voice
        const rewritePrompt = `${PARALOOP_VOICE}

Rewrite this article in Paraloop's voice. Provide:
1. Headline (concise, culturally fluent, no clickbait)
2. Summary (2-3 sentences explaining cultural significance)
3. Analysis (1 paragraph on why this matters for culture, creators, community)
4. Vibe (1-2 word mood: e.g., "Optimistic", "Inspiring", "Groundbreaking")

Original:
Title: ${article.title}
Source: ${article.source_name}  
Content: ${(article.content || article.excerpt || '').substring(0, 2000)}

Format as JSON:
{
  "headline": "...",
  "summary": "...",
  "analysis": "...",
  "vibe": "..."
}`;

        const rewriteResponse = await openai.chat.completions.create({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: rewritePrompt }],
          max_tokens: 1000,
          temperature: 0.7
        });
        
        const rewriteText = rewriteResponse.choices[0].message.content.trim();
        let rewrite;
        
        try {
          const jsonMatch = rewriteText.match(/\{[\s\S]*\}/);
          rewrite = JSON.parse(jsonMatch ? jsonMatch[0] : rewriteText);
        } catch (parseError) {
          console.error('   Failed to parse AI response');
          continue;
        }
        
        // Update article with analysis
        db.prepare(`
          UPDATE culture_articles
          SET analyzed = 1,
              relevance_score = ?,
              paraloop_headline = ?,
              paraloop_summary = ?,
              paraloop_analysis = ?,
              paraloop_vibe = ?,
              published = ?
          WHERE id = ?
        `).run(
          relevanceScore,
          rewrite.headline,
          rewrite.summary,
          rewrite.analysis,
          rewrite.vibe,
          relevanceScore >= 0.72 ? 1 : 0,
          article.id
        );
        
        results.push({
          id: article.id,
          title: article.title.substring(0, 60),
          score: relevanceScore,
          headline: rewrite.headline,
          published: relevanceScore >= 0.72
        });
        
        console.log(`   ${rewrite.headline.substring(0, 60)}...`);
        console.log(`   ${relevanceScore >= 0.72 ? 'Auto-published!' : 'Saved (not published)'}`);
        
      } catch (error) {
        console.error(`   Error analyzing article ${article.id}:`, error.message);
      }
    }
    
    const publishedCount = results.filter(r => r.published).length;
    console.log(`\nAnalyzed ${results.length} articles, ${publishedCount} auto-published!\n`);
    
    res.json({
      success: true,
      analyzed: results.length,
      published: publishedCount,
      articles: results
    });
    
  } catch (error) {
    console.error('Error in analyze:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
