# Paraloop Culture Engine - Automation Guide

## Overview

The automation pipeline consists of four edge functions that work together to crawl, curate, publish, and promote content.

## Edge Functions

### 1. `/ingest` - Crawl RSS Feeds
Fetches articles from active RSS sources and stores them as pending candidates.

**Usage:**
```bash
curl -X POST "${SUPABASE_URL}/functions/v1/ingest" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"limitPerSource": 30}'
```

**Schedule:** Hourly (`0 * * * *`)

### 2. `/curate` - Score & Rewrite
Runs the AI pipeline to score articles for relevance and rewrite approved ones.

**Usage:**
```bash
curl -X POST "${SUPABASE_URL}/functions/v1/curate" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"maxItems": 12, "minScore": 0.55}'
```

**Schedule:** Daily at 7:00 AM PT (`0 7 * * *`)

### 3. `/publish` - Auto-Publish
Publishes high-scoring curated articles.

**Usage:**
```bash
curl -X POST "${SUPABASE_URL}/functions/v1/publish" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"minScore": 0.72, "backfillIfNone": true}'
```

**Schedule:** Daily at 7:30 AM PT (`30 7 * * *`)

### 4. `/social` - Generate Social Posts
Creates social media content for published articles.

**Usage:**
```bash
curl -X POST "${SUPABASE_URL}/functions/v1/social" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"platforms": ["twitter", "linkedin"], "limit": 5}'
```

**Schedule:** Daily at 7:35 AM PT (`35 7 * * *`)

## Setting Up Cron Jobs

To automate these functions, use Supabase's `pg_cron` extension:

### 1. Enable Extensions

```sql
-- Enable pg_cron and pg_net for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
```

### 2. Create Cron Jobs

```sql
-- Ingest: Every hour
SELECT cron.schedule(
  'ingest-rss-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/ingest',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body := '{"limitPerSource": 30}'::jsonb
  ) AS request_id;
  $$
);

-- Curate: Daily at 7:00 AM PT (15:00 UTC)
SELECT cron.schedule(
  'curate-daily',
  '0 15 * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/curate',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body := '{"maxItems": 12, "minScore": 0.55}'::jsonb
  ) AS request_id;
  $$
);

-- Publish: Daily at 7:30 AM PT (15:30 UTC)
SELECT cron.schedule(
  'publish-daily',
  '30 15 * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/publish',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body := '{"minScore": 0.72, "backfillIfNone": true}'::jsonb
  ) AS request_id;
  $$
);

-- Social: Daily at 7:35 AM PT (15:35 UTC)
SELECT cron.schedule(
  'social-daily',
  '35 15 * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/social',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body := '{"platforms": ["twitter", "linkedin"], "limit": 5}'::jsonb
  ) AS request_id;
  $$
);
```

### 3. View Scheduled Jobs

```sql
SELECT * FROM cron.job;
```

### 4. Remove a Job

```sql
SELECT cron.unschedule('job-name-here');
```

## Configuration

Set these environment variables in your edge function configuration:

- `ARTICLE_SCORE_MIN`: Minimum score for curation (default: 0.55)
- `AUTO_PUBLISH_SCORE`: Minimum score for auto-publish (default: 0.72)
- `DAILY_LIMIT`: Max articles to curate per day (default: 12)

## Pipeline Flow

```
┌─────────────┐
│   Ingest    │ ← Hourly: Fetch RSS feeds
└──────┬──────┘
       ↓
┌─────────────┐
│   Curate    │ ← Daily 7:00 AM: Score & rewrite
└──────┬──────┘
       ↓
┌─────────────┐
│   Publish   │ ← Daily 7:30 AM: Auto-publish
└──────┬──────┘
       ↓
┌─────────────┐
│   Social    │ ← Daily 7:35 AM: Generate posts
└─────────────┘
```

## Manual Testing

You can test each function individually using the Dashboard or curl commands above.

## Monitoring

Check edge function logs in the Lovable backend to monitor:
- Articles ingested
- Relevance scores
- Publication status
- Social post generation

## Notes

- Times are in America/Los_Angeles timezone
- Functions are idempotent (safe to retry)
- Rate limits apply to AI model calls
- Social posts are generated but not automatically posted (requires API integration)
