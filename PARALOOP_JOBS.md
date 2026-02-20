# Paraloop Automation Jobs

## Active Pipeline

### Job 1: DARIUS — Content Ingest (Hourly)
- **Schedule:** Every hour
- **Task:** Scrape TechCrunch, ESPN, trending sources for NIL/culture signals
- **Output:** Articles to Supabase `articles` table
- **Status:** {{ status_darius }}

### Job 2: ZARA — Content Processing (Hourly)
- **Schedule:** Every hour + 15min
- **Task:** Analyze articles, extract signals, write summaries
- **Output:** Processed content to Supabase `content_processed` table
- **Status:** {{ status_zara }}

### Job 3: MALIK — Quality Review (Hourly + 30min)
- **Schedule:** Every hour + 30min
- **Task:** Rate quality (90+ threshold), flag rejections
- **Output:** Quality scores to Supabase `quality_ratings` table
- **Status:** {{ status_malik }}

### Job 4: NOVA — Social Publishing (Daily)
- **Schedule:** 09:00 AM, 12:00 PM, 06:00 PM PST
- **Task:** Post approved content to X, Instagram, TikTok
- **Output:** Social posts to all platforms
- **Status:** {{ status_nova }}

### Job 5: REIGN — Archive & Memory (Daily)
- **Schedule:** 11:59 PM PST
- **Task:** Archive session data, update knowledge vectors
- **Output:** Backup to Supabase, vector index updated
- **Status:** {{ status_reign }}

---

## Status Page
Visit `/api/agents/status` for live dashboard data

## GitHub Integration
Repo: https://github.com/Salimgroup/paraloop-culture-forge
Latest updates automatically pull into dashboard
