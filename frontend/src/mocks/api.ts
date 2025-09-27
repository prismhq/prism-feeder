// Mock API responses and error states for frontend development

// Generic API error types
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: {
      field?: string;
      reason?: string;
      [key: string]: unknown;
    };
    request_id: string;
    timestamp: string;
  };
}

// Common error responses
export const mockValidationError: ApiError = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input provided",
    details: {
      field: "url",
      reason: "Invalid URL format. Must start with http:// or https://",
    },
    request_id: "req-val-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

export const mockRateLimitError: ApiError = {
  success: false,
  error: {
    code: "RATE_LIMIT_EXCEEDED",
    message: "Too many requests. Please wait before retrying.",
    details: {
      retry_after_seconds: 60,
      requests_remaining: 0,
      window_reset_at: "2025-01-26T11:00:00Z",
    },
    request_id: "req-rate-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

export const mockFeedNotFoundError: ApiError = {
  success: false,
  error: {
    code: "FEED_NOT_FOUND",
    message: "The requested feed does not exist or has been deleted.",
    request_id: "req-feed-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

export const mockScrapingError: ApiError = {
  success: false,
  error: {
    code: "SCRAPING_ERROR",
    message: "Failed to scrape content from the provided URL.",
    details: {
      reason: "JavaScript required but disabled",
      status_code: 403,
      response_time_ms: 5000,
    },
    request_id: "req-scrape-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

export const mockInternalError: ApiError = {
  success: false,
  error: {
    code: "INTERNAL_ERROR",
    message: "An unexpected error occurred. Please try again later.",
    request_id: "req-internal-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

export const mockPermissionError: ApiError = {
  success: false,
  error: {
    code: "PERMISSION_DENIED",
    message: "You do not have permission to perform this action.",
    details: {
      required_permission: "feed:delete",
      user_permissions: ["feed:read", "feed:create"],
    },
    request_id: "req-perm-001",
    timestamp: "2025-01-26T10:30:00Z",
  },
};

// Dashboard overview mock
export const mockDashboardOverview = {
  success: true,
  data: {
    total_feeds: 47,
    total_entries: 8934,
    unread_entries: 347,
    starred_entries: 89,
    reading_time_today: 67,
    articles_read_today: 15,
    articles_read_this_week: 89,
    articles_read_this_month: 342,
    top_categories: [
      {
        category_id: "cat-3",
        title: "Web Development",
        unread_count: 124,
        feed_count: 12,
      },
      {
        category_id: "cat-1",
        title: "Technology",
        unread_count: 98,
        feed_count: 8,
      },
      {
        category_id: "cat-2",
        title: "AI & Machine Learning",
        unread_count: 67,
        feed_count: 5,
      },
    ],
    recent_activity: [
      {
        type: "feed_created",
        feed_title: "React Blog",
        timestamp: "2025-01-26T09:30:00Z",
      },
      {
        type: "entries_marked_read",
        count: 25,
        timestamp: "2025-01-26T08:45:00Z",
      },
      {
        type: "feed_refreshed",
        feed_title: "TechCrunch",
        new_entries: 12,
        timestamp: "2025-01-26T08:15:00Z",
      },
    ],
  },
};

// Mock batch update response
export const mockBatchUpdateResponse = {
  success: true,
  data: {
    updated_count: 15,
    failed_count: 0,
    updated_entries: [
      "entry-1",
      "entry-2",
      "entry-3",
      "entry-4",
      "entry-5",
      "entry-6",
      "entry-7",
      "entry-8",
      "entry-9",
      "entry-10",
      "entry-11",
      "entry-12",
      "entry-13",
      "entry-14",
      "entry-15",
    ],
    failed_entries: [],
  },
};

// Mock feed refresh response
export const mockFeedRefreshResponse = {
  success: true,
  data: {
    feed_id: "feed-1",
    new_entries: 8,
    updated_entries: 2,
    last_fetched_at: "2025-01-26T10:30:00Z",
    processing_time_ms: 1240,
  },
};

// Mock search results
export const mockSearchResults = {
  success: true,
  data: [
    {
      id: "entry-search-1",
      feed_id: "feed-1",
      title: "Understanding Machine Learning Algorithms",
      url: "https://example.com/ml-algorithms",
      summary:
        "A comprehensive guide to machine learning algorithms and their applications...",
      author: "Dr. Sarah Johnson",
      published_at: "2025-01-25T14:30:00Z",
      status: "unread",
      reading_time_minutes: 12,
      tags: ["machine-learning", "algorithms"],
      feed: {
        id: "feed-1",
        title: "Tech Blog",
        favicon_url: "https://example.com/favicon.ico",
      },
      match_score: 0.95,
      highlighted_excerpt:
        "Understanding <mark>machine learning</mark> algorithms is crucial...",
    },
    {
      id: "entry-search-2",
      feed_id: "feed-3",
      title: "Deep Learning with PyTorch: Advanced Techniques",
      url: "https://example.com/pytorch-advanced",
      summary:
        "Explore advanced deep learning techniques using PyTorch framework...",
      author: "Alex Chen",
      published_at: "2025-01-24T16:45:00Z",
      status: "read",
      reading_time_minutes: 18,
      tags: ["deep-learning", "pytorch"],
      feed: {
        id: "feed-3",
        title: "AI Research Blog",
        favicon_url: "https://ai-blog.com/favicon.ico",
      },
      match_score: 0.87,
      highlighted_excerpt:
        "PyTorch provides excellent tools for <mark>machine learning</mark> research...",
    },
  ],
  pagination: {
    total: 47,
    limit: 20,
    offset: 0,
    has_next: true,
    next_offset: 20,
  },
  search_metadata: {
    query: "machine learning",
    search_time_ms: 45,
    total_matches: 47,
    filters_applied: ["status:unread", "category:technology"],
  },
};

// Mock OPML export
export const mockOpmlExport = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>Prism RSS Reader Feeds</title>
    <dateCreated>Sun, 26 Jan 2025 10:30:00 GMT</dateCreated>
    <ownerName>Alex Developer</ownerName>
  </head>
  <body>
    <outline text="Technology">
      <outline text="TechCrunch" type="rss" xmlUrl="https://techcrunch.com/feed" htmlUrl="https://techcrunch.com"/>
      <outline text="Ars Technica" type="rss" xmlUrl="https://feeds.arstechnica.com/arstechnica/index" htmlUrl="https://arstechnica.com"/>
    </outline>
    <outline text="AI &amp; Machine Learning">
      <outline text="OpenAI Blog" type="rss" xmlUrl="https://openai.com/blog/rss.xml" htmlUrl="https://openai.com/blog"/>
      <outline text="Towards Data Science (Scraped)" type="scraped" xmlUrl="https://towardsdatascience.com/latest" htmlUrl="https://towardsdatascience.com"/>
    </outline>
  </body>
</opml>`;

// Loading states for various operations
export const mockLoadingStates = {
  fetchingFeeds: { loading: true, data: null, error: null },
  creatingFeed: { loading: true, data: null, error: null },
  refreshingFeed: { loading: true, data: null, error: null },
  updatingEntry: { loading: true, data: null, error: null },
  discoveringSelectors: { loading: true, data: null, error: null },
  previewingContent: { loading: true, data: null, error: null },
};
