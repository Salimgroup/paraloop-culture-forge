# Paraloop Backend

Simple Node.js/Express backend for the Paraloop Culture Intelligence Platform.

## Features

- ✅ SQLite database (no cloud dependencies)
- ✅ RESTful API endpoints
- ✅ Firecrawl integration for scraping 70 culture sites
- ✅ Claude AI integration for scoring & rewriting
- ✅ No Lovable/Supabase dependencies

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit `backend/.env` and add your API keys:

```env
PORT=3001
ANTHROPIC_API_KEY=your_claude_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

### 3. Start the Server

```bash
npm start
```

The API will run on **http://localhost:3001**

## API Endpoints

### Feed

- `GET /api/feed/culture?category=all` - Get culture feed (homepage)
- `GET /api/feed` - Get main curated feed

### Sources

- `POST /api/sources/import` - Import the 70 culture sources
- `GET /api/sources` - List all sources

### Scraping

- `POST /api/scrape` - Scrape articles from culture sites (requires FIRECRAWL_API_KEY)

### Analysis

- `POST /api/analyze` - Analyze articles with AI (requires ANTHROPIC_API_KEY)

## Getting Started

1. **Import Sources First:**
```bash
curl -X POST http://localhost:3001/api/sources/import
```

2. **Scrape Articles:**
```bash
curl -X POST http://localhost:3001/api/scrape
```

3. **Analyze with AI:**
```bash
curl -X POST http://localhost:3001/api/analyze
```

4. **View Feed:**
```bash
curl http://localhost:3001/api/feed/culture
```

## Database

SQLite database is created automatically at `backend/paraloop.db`

### Tables:
- `sources` - The 70 culture sites
- `culture_articles` - Scraped articles with AI analysis
- `curated_articles` - Published/curated content

## Development

Run in watch mode:
```bash
npm run dev
```

## Frontend Integration

The frontend is already configured to use this backend. Just make sure both servers are running:

- Backend: http://localhost:3001
- Frontend: http://localhost:8080

