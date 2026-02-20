// Paraloop Backend API Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Get culture feed (homepage)
  async getCultureFeed(category = 'all') {
    const response = await fetch(`${API_BASE_URL}/feed/culture?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch culture feed');
    return response.json();
  },

  // Get main feed
  async getFeed(tag?: string) {
    const url = tag ? `${API_BASE_URL}/feed?tag=${tag}` : `${API_BASE_URL}/feed`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch feed');
    return response.json();
  },

  // Scrape culture sites
  async scrapeSites() {
    const response = await fetch(`${API_BASE_URL}/scrape`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to scrape sites');
    return response.json();
  },

  // Analyze articles with AI
  async analyzeArticles() {
    const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to analyze articles');
    return response.json();
  },

  // Import sources
  async importSources() {
    const response = await fetch(`${API_BASE_URL}/sources/import`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to import sources');
    return response.json();
  },

  // Get sources
  async getSources() {
    const response = await fetch(`${API_BASE_URL}/sources`);
    if (!response.ok) throw new Error('Failed to fetch sources');
    return response.json();
  },
};
