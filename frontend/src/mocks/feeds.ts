// Mock feed data for frontend development
export interface ScrapingConfig {
  selector?: string;
  title_selector?: string;
  date_selector?: string;
  author_selector?: string;
  pagination_selector?: string;
  user_agent?: string;
  headers?: Record<string, string>;
  javascript_enabled: boolean;
}

export interface Feed {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  url: string;
  site_url: string;
  description?: string;
  favicon_url?: string;
  type: "rss" | "atom" | "scraped";
  status: "active" | "paused" | "error";
  last_fetched_at?: string;
  last_successful_fetch_at?: string;
  fetch_interval: number;
  etag?: string;
  last_modified?: string;
  error_count: number;
  last_error?: string;
  scraping_config?: ScrapingConfig;
  created_at: string;
  updated_at: string;
  entry_count: number;
  unread_count: number;
}

export const mockFeeds: Feed[] = [
  // Technology feeds
  {
    id: "feed-1",
    user_id: "user-123",
    category_id: "cat-1",
    title: "TechCrunch",
    url: "https://techcrunch.com/feed",
    site_url: "https://techcrunch.com",
    description: "The latest technology news and information on startups.",
    favicon_url:
      "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png",
    type: "rss",
    status: "active",
    last_fetched_at: "2025-01-26T09:45:00Z",
    last_successful_fetch_at: "2025-01-26T09:45:00Z",
    fetch_interval: 30,
    etag: '"abc123def456"',
    last_modified: "Mon, 26 Jan 2025 09:45:00 GMT",
    error_count: 0,
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2025-01-26T09:45:00Z",
    entry_count: 1247,
    unread_count: 23,
  },
  {
    id: "feed-2",
    user_id: "user-123",
    category_id: "cat-1",
    title: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
    site_url: "https://arstechnica.com",
    description: "Serving the technologist for more than a decade.",
    favicon_url: "https://cdn.arstechnica.net/favicon.ico",
    type: "rss",
    status: "active",
    last_fetched_at: "2025-01-26T09:30:00Z",
    last_successful_fetch_at: "2025-01-26T09:30:00Z",
    fetch_interval: 60,
    etag: '"xyz789abc123"',
    error_count: 0,
    created_at: "2024-12-01T10:15:00Z",
    updated_at: "2025-01-26T09:30:00Z",
    entry_count: 892,
    unread_count: 15,
  },
  // AI & ML feeds
  {
    id: "feed-3",
    user_id: "user-123",
    category_id: "cat-2",
    title: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    site_url: "https://openai.com/blog",
    description: "Research and announcements from OpenAI.",
    favicon_url: "https://openai.com/favicon.ico",
    type: "rss",
    status: "active",
    last_fetched_at: "2025-01-26T08:00:00Z",
    last_successful_fetch_at: "2025-01-26T08:00:00Z",
    fetch_interval: 120,
    error_count: 0,
    created_at: "2024-12-01T11:00:00Z",
    updated_at: "2025-01-26T08:00:00Z",
    entry_count: 156,
    unread_count: 3,
  },
  {
    id: "feed-4",
    user_id: "user-123",
    category_id: "cat-2",
    title: "Towards Data Science (Scraped)",
    url: "https://towardsdatascience.com/latest",
    site_url: "https://towardsdatascience.com",
    description: "A Medium publication sharing concepts, ideas, and codes.",
    type: "scraped",
    status: "active",
    last_fetched_at: "2025-01-26T09:15:00Z",
    last_successful_fetch_at: "2025-01-26T09:15:00Z",
    fetch_interval: 60,
    error_count: 0,
    scraping_config: {
      selector: "article",
      title_selector: 'h1[data-testid="storyTitle"]',
      date_selector: '[data-testid="storyPublishDate"]',
      author_selector: '[data-testid="authorName"]',
      javascript_enabled: true,
      user_agent: "PrismReader/1.0",
    },
    created_at: "2024-12-02T14:30:00Z",
    updated_at: "2025-01-26T09:15:00Z",
    entry_count: 342,
    unread_count: 28,
  },
  // Web Development feeds
  {
    id: "feed-5",
    user_id: "user-123",
    category_id: "cat-3",
    title: "CSS-Tricks",
    url: "https://css-tricks.com/feed",
    site_url: "https://css-tricks.com",
    description: "Tips, tricks, and techniques on using CSS.",
    favicon_url: "https://css-tricks.com/favicon.ico",
    type: "rss",
    status: "active",
    last_fetched_at: "2025-01-26T09:00:00Z",
    last_successful_fetch_at: "2025-01-26T09:00:00Z",
    fetch_interval: 120,
    error_count: 0,
    created_at: "2024-12-01T12:00:00Z",
    updated_at: "2025-01-26T09:00:00Z",
    entry_count: 567,
    unread_count: 12,
  },
  {
    id: "feed-6",
    user_id: "user-123",
    category_id: "cat-3",
    title: "Dev.to React Posts (Scraped)",
    url: "https://dev.to/t/react",
    site_url: "https://dev.to",
    description: "React articles from the dev.to community.",
    type: "scraped",
    status: "active",
    last_fetched_at: "2025-01-26T08:45:00Z",
    last_successful_fetch_at: "2025-01-26T08:45:00Z",
    fetch_interval: 90,
    error_count: 0,
    scraping_config: {
      selector: ".crayons-story",
      title_selector: ".crayons-story__title a",
      date_selector: ".crayons-story__tertiary time",
      author_selector:
        ".crayons-story__secondary .profile-preview-card__trigger",
      javascript_enabled: false,
    },
    created_at: "2024-12-05T16:20:00Z",
    updated_at: "2025-01-26T08:45:00Z",
    entry_count: 234,
    unread_count: 45,
  },
  // Design feeds
  {
    id: "feed-7",
    user_id: "user-123",
    category_id: "cat-4",
    title: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/feed",
    site_url: "https://www.smashingmagazine.com",
    description: "For professional web designers and developers.",
    favicon_url: "https://www.smashingmagazine.com/images/favicon/favicon.ico",
    type: "rss",
    status: "active",
    last_fetched_at: "2025-01-26T07:30:00Z",
    last_successful_fetch_at: "2025-01-26T07:30:00Z",
    fetch_interval: 180,
    error_count: 0,
    created_at: "2024-12-01T13:15:00Z",
    updated_at: "2025-01-26T07:30:00Z",
    entry_count: 423,
    unread_count: 8,
  },
  // Feed with errors
  {
    id: "feed-8",
    user_id: "user-123",
    category_id: "cat-5",
    title: "Broken Startup Blog",
    url: "https://brokenstartup.com/feed.xml",
    site_url: "https://brokenstartup.com",
    type: "rss",
    status: "error",
    last_fetched_at: "2025-01-26T06:00:00Z",
    last_successful_fetch_at: "2025-01-24T18:30:00Z",
    fetch_interval: 60,
    error_count: 12,
    last_error: "HTTP 404: Feed not found",
    created_at: "2024-12-10T09:00:00Z",
    updated_at: "2025-01-26T06:00:00Z",
    entry_count: 89,
    unread_count: 0,
  },
  // Paused feed
  {
    id: "feed-9",
    user_id: "user-123",
    category_id: "cat-6",
    title: "NASA Science News",
    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    site_url: "https://www.nasa.gov",
    description: "Latest NASA science news.",
    favicon_url: "https://www.nasa.gov/favicon.ico",
    type: "rss",
    status: "paused",
    last_fetched_at: "2025-01-20T14:00:00Z",
    last_successful_fetch_at: "2025-01-20T14:00:00Z",
    fetch_interval: 360,
    error_count: 0,
    created_at: "2024-12-01T15:45:00Z",
    updated_at: "2025-01-20T14:00:00Z",
    entry_count: 178,
    unread_count: 5,
  },
];

export const mockFeedsResponse = {
  success: true,
  data: mockFeeds,
};

// Mock scraper discovery response
export const mockScraperDiscoveryResponse = {
  success: true,
  data: {
    detected_patterns: {
      article_selector: ".post-content",
      title_selector: "h1.entry-title",
      content_selector: ".entry-content",
      date_selector: ".published-date",
      author_selector: ".author-name",
    },
    confidence_scores: {
      article_detection: 0.94,
      title_detection: 0.97,
      content_detection: 0.89,
      date_detection: 0.82,
    },
    pagination: {
      next_page_selector: ".pagination .next",
      type: "numbered",
      max_pages: 5,
    },
    sample_articles: [
      {
        title: "Understanding Modern JavaScript Frameworks",
        url: "https://example-blog.com/js-frameworks",
        preview:
          "In this comprehensive guide, we explore the landscape of modern JavaScript frameworks...",
      },
      {
        title: "The Future of Web Development",
        url: "https://example-blog.com/future-web-dev",
        preview:
          "As we look ahead to the next decade, several trends are shaping the future...",
      },
    ],
  },
};

// Mock scraper preview response
export const mockScraperPreviewResponse = {
  success: true,
  data: {
    articles: [
      {
        title: "Advanced React Patterns in 2025",
        content:
          "<p>React continues to evolve, and with it, new patterns emerge...</p>",
        url: "https://example-blog.com/react-patterns-2025",
        published_at: "2025-01-25T14:30:00Z",
        author: "Sarah Chen",
      },
      {
        title: "Building Scalable Node.js Applications",
        content:
          "<p>When building large-scale applications with Node.js...</p>",
        url: "https://example-blog.com/scalable-nodejs",
        published_at: "2025-01-24T16:45:00Z",
        author: "Mike Rodriguez",
      },
    ],
    extraction_quality: "high",
    processing_time_ms: 1450,
  },
};
