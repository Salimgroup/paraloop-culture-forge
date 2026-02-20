import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, '../../paraloop.db'));
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    feed_url TEXT,
    category TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS culture_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER,
    source_name TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    article_url TEXT UNIQUE NOT NULL,
    image_url TEXT,
    category TEXT,
    tags TEXT,
    relevance_score REAL,
    paraloop_headline TEXT,
    paraloop_summary TEXT,
    paraloop_analysis TEXT,
    paraloop_vibe TEXT,
    analyzed INTEGER DEFAULT 0,
    published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_articles_published ON culture_articles(published);
  CREATE INDEX IF NOT EXISTS idx_articles_category ON culture_articles(category);
`);

// Migrate: add feed_url column if missing
try {
  db.exec('ALTER TABLE sources ADD COLUMN feed_url TEXT');
} catch (e) {
  // Column already exists
}

console.log('Database initialized');

export default db;
