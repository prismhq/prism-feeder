# CLAUDE.md - AI Agent Guidelines for Prism RSS Reader

## Project Overview

AI-native RSS reader with web scraping capabilities for creating feeds from topics without existing RSS feeds. Built as a microservices architecture with Clojure backend and TypeScript frontend.

## Architecture

- **Backend**: Clojure (Ring/Compojure, PostgreSQL, async job queue)
- **Frontend**: TypeScript/React (Vite, TanStack Query, WebSocket)
- **Database**: PostgreSQL with Redis for caching
- **Queue**: Redis/Sidekiq for background scraping jobs

## Build Commands

### Backend (Clojure)

```bash
# Install dependencies
lein deps

# Run tests
lein test

# Run specific test
lein test prism.feeds.core-test/test-feed-creation

# Start development server
lein run

# Start REPL
lein repl

# Build uberjar
lein uberjar

# Database migrations
lein migrate

# Start background job worker
lein worker
```

### Frontend (TypeScript)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run specific test
npm test -- --testNamePattern="Feed component"

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Run backend tests in container
docker-compose exec backend lein test

# Reset database
docker-compose exec backend lein migrate reset
```

## Data Contract

### Core Data Models

#### User Entity

```json
{
  "User": {
    "id": "uuid",
    "email": "string",
    "username": "string",
    "created_at": "ISO8601",
    "preferences": {
      "theme": "light|dark|auto",
      "entries_per_page": "number",
      "reading_pane": "bottom|right|hide",
      "mark_read_on_scroll": "boolean",
      "auto_refresh_interval": "number"
    }
  }
}
```

#### Category Entity

```json
{
  "Category": {
    "id": "uuid",
    "user_id": "uuid",
    "title": "string",
    "color": "string",
    "sort_order": "number",
    "created_at": "ISO8601",
    "feed_count": "number",
    "unread_count": "number"
  }
}
```

#### Feed Entity

```json
{
  "Feed": {
    "id": "uuid",
    "user_id": "uuid",
    "category_id": "uuid",
    "title": "string",
    "url": "string",
    "site_url": "string",
    "description": "string?",
    "favicon_url": "string?",
    "type": "rss|atom|scraped",
    "status": "active|paused|error",
    "last_fetched_at": "ISO8601?",
    "last_successful_fetch_at": "ISO8601?",
    "fetch_interval": "number",
    "etag": "string?",
    "last_modified": "string?",
    "error_count": "number",
    "last_error": "string?",
    "scraping_config": {
      "selector": "string?",
      "title_selector": "string?",
      "date_selector": "string?",
      "author_selector": "string?",
      "pagination_selector": "string?",
      "user_agent": "string?",
      "headers": "object?",
      "javascript_enabled": "boolean"
    },
    "created_at": "ISO8601",
    "updated_at": "ISO8601",
    "entry_count": "number",
    "unread_count": "number"
  }
}
```

#### Entry Entity

```json
{
  "Entry": {
    "id": "uuid",
    "feed_id": "uuid",
    "title": "string",
    "url": "string",
    "content": "string",
    "summary": "string?",
    "author": "string?",
    "published_at": "ISO8601",
    "updated_at": "ISO8601?",
    "guid": "string",
    "status": "unread|read|starred|archived",
    "reading_time_minutes": "number?",
    "word_count": "number?",
    "tags": ["string"],
    "created_at": "ISO8601",
    "read_at": "ISO8601?",
    "starred_at": "ISO8601?",
    "enclosures": [
      {
        "url": "string",
        "type": "string",
        "length": "number?"
      }
    ],
    "scraped_metadata": {
      "original_selector": "string?",
      "extraction_quality": "high|medium|low"
    }
  }
}
```

## API Endpoints

### Authentication

```
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/register
GET  /api/v1/auth/me
```

#### Login Request/Response

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "username": "johndoe",
      "preferences": {...}
    }
  }
}
```

### Categories

```
GET    /api/v1/categories
POST   /api/v1/categories
GET    /api/v1/categories/{id}
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
```

#### List Categories

```http
GET /api/v1/categories?include=counts
Authorization: Bearer jwt-token
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "cat-123",
      "title": "Technology",
      "color": "#3B82F6",
      "sort_order": 1,
      "feed_count": 5,
      "unread_count": 23
    }
  ]
}
```

### Feeds

```
GET    /api/v1/feeds
POST   /api/v1/feeds
GET    /api/v1/feeds/{id}
PUT    /api/v1/feeds/{id}
DELETE /api/v1/feeds/{id}
POST   /api/v1/feeds/{id}/refresh
PUT    /api/v1/feeds/{id}/mark-all-read
```

#### Create RSS Feed

```http
POST /api/v1/feeds
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "url": "https://example.com/rss.xml",
  "category_id": "cat-123",
  "fetch_interval": 60
}
```

#### Create Scraped Feed

```http
POST /api/v1/feeds
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "url": "https://news-site.com/tech",
  "category_id": "cat-123",
  "type": "scraped",
  "scraping_config": {
    "selector": ".article-content",
    "title_selector": "h1.title",
    "date_selector": ".publish-date",
    "pagination_selector": ".next-page"
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "feed-456",
    "title": "Example Blog",
    "url": "https://example.com/rss.xml",
    "site_url": "https://example.com",
    "type": "rss",
    "status": "active",
    "category_id": "cat-123",
    "created_at": "2025-01-26T10:30:00Z",
    "entry_count": 0,
    "unread_count": 0
  }
}
```

### Scraping Endpoints

```
POST   /api/v1/scraper/discover
POST   /api/v1/scraper/preview
```

#### Discover Scraping Rules

```http
POST /api/v1/scraper/discover
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "url": "https://techcrunch.com",
  "options": {
    "analyze_pagination": true,
    "find_article_patterns": true,
    "suggest_selectors": true
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "detected_patterns": {
      "article_selector": ".post-block",
      "title_selector": ".post-block__title",
      "content_selector": ".post-block__content",
      "date_selector": ".post-block__date",
      "author_selector": ".post-block__author"
    },
    "confidence_scores": {
      "article_detection": 0.95,
      "title_detection": 0.92,
      "content_detection": 0.88,
      "date_detection": 0.85
    },
    "pagination": {
      "next_page_selector": ".pagination .next",
      "type": "infinite_scroll",
      "max_pages": 10
    },
    "sample_articles": [
      {
        "title": "Sample Article",
        "url": "https://techcrunch.com/article/123",
        "preview": "Article content preview..."
      }
    ]
  }
}
```

#### Preview Scraped Content

```http
POST /api/v1/scraper/preview
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "url": "https://techcrunch.com",
  "scraping_config": {
    "selector": ".post-block",
    "title_selector": ".post-block__title",
    "limit": 5
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "title": "AI Breakthrough in 2025",
        "content": "Full article content...",
        "url": "https://techcrunch.com/ai-breakthrough",
        "published_at": "2025-01-26T09:00:00Z",
        "author": "Jane Smith"
      }
    ],
    "extraction_quality": "high",
    "processing_time_ms": 1250
  }
}
```

### Entries

```
GET    /api/v1/entries
GET    /api/v1/entries/{id}
PUT    /api/v1/entries/{id}
PUT    /api/v1/entries/batch
GET    /api/v1/feeds/{id}/entries
```

#### List Entries with Filters

```http
GET /api/v1/entries?status=unread&limit=20&offset=0&category_id=cat-123&search=AI
Authorization: Bearer jwt-token
```

Query Parameters:

- `status`: unread|read|starred|archived (can repeat)
- `limit`: number (default 20, max 100)
- `offset`: number (default 0)
- `category_id`: uuid
- `feed_id`: uuid
- `search`: string
- `published_after`: ISO8601
- `published_before`: ISO8601
- `order`: published_at|created_at|title
- `direction`: asc|desc

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "entry-789",
      "feed_id": "feed-456",
      "title": "Latest Tech News",
      "url": "https://example.com/article/123",
      "content": "HTML content here...",
      "author": "John Doe",
      "published_at": "2025-01-26T09:00:00Z",
      "status": "unread",
      "reading_time_minutes": 3,
      "tags": [],
      "feed": {
        "id": "feed-456",
        "title": "Example Blog",
        "favicon_url": "https://example.com/favicon.ico"
      }
    }
  ],
  "pagination": {
    "total": 1250,
    "limit": 20,
    "offset": 0,
    "has_next": true,
    "next_offset": 20
  }
}
```

#### Update Entry Status

```http
PUT /api/v1/entries/entry-789
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "status": "read",
  "tags": ["important", "ai"]
}
```

#### Batch Update Entries

```http
PUT /api/v1/entries/batch
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "entry_ids": ["entry-1", "entry-2", "entry-3"],
  "status": "read"
}
```

### Statistics

```
GET    /api/v1/stats/overview
GET    /api/v1/stats/reading-time
```

#### Dashboard Overview

```http
GET /api/v1/stats/overview
Authorization: Bearer jwt-token
```

Response:

```json
{
  "success": true,
  "data": {
    "total_feeds": 15,
    "total_entries": 3420,
    "unread_entries": 142,
    "starred_entries": 28,
    "reading_time_today": 45,
    "articles_read_today": 12,
    "top_categories": [
      {
        "category_id": "cat-123",
        "title": "Technology",
        "unread_count": 89
      }
    ]
  }
}
```

## WebSocket Events

### Connection

```
WSS /api/v1/ws?token=jwt-token
```

### Event Types

```json
{
  "feed_updated": {
    "feed_id": "uuid",
    "new_entries": "number",
    "last_fetched_at": "ISO8601"
  },
  "entry_status_changed": {
    "entry_id": "uuid",
    "feed_id": "uuid",
    "old_status": "string",
    "new_status": "string"
  },
  "scraping_job_completed": {
    "feed_id": "uuid",
    "job_id": "uuid",
    "articles_found": "number",
    "status": "completed|failed"
  },
  "unread_count_changed": {
    "feed_id": "uuid?",
    "category_id": "uuid?",
    "total_unread": "number"
  }
}
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": {
      "field": "url",
      "reason": "Invalid URL format"
    },
    "request_id": "req-123",
    "timestamp": "2025-01-26T10:30:00Z"
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `FEED_NOT_FOUND`: Feed does not exist
- `FEED_FETCH_ERROR`: Unable to fetch feed content
- `SCRAPING_ERROR`: Web scraping failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `AUTHENTICATION_REQUIRED`: Valid auth token required
- `PERMISSION_DENIED`: Insufficient permissions
- `INTERNAL_ERROR`: Server error occurred

## Code Style Guidelines

### Clojure (Backend)

- Use kebab-case for functions and variables
- Use PascalCase for records and protocols
- Prefer threading macros (->, ->>)
- Use clojure.spec for API validation
- Handle errors with ex-info and structured data

```clojure
;; Good
(defn create-feed! [user-id feed-data]
  (-> feed-data
      (assoc :user-id user-id :created-at (time/now))
      (validate-feed-data)
      (db/insert-feed!)))

;; Validation with spec
(s/def ::url (s/and string? #(re-matches #"https?://.*" %)))
(s/def ::feed-create (s/keys :req-un [::url ::category-id]))
```

### TypeScript (Frontend)

- Use PascalCase for components and interfaces
- Use camelCase for functions and variables
- Prefer functional components with hooks
- Use strict TypeScript settings
- Handle async operations with async/await

```typescript
// Good
interface CreateFeedRequest {
  url: string;
  categoryId: string;
  scrapingConfig?: ScrapingConfig;
}

const FeedList: React.FC = () => {
  const { data: feeds } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds
  });

  return (
    <div className="feed-list">
      {feeds?.map(feed => <FeedItem key={feed.id} feed={feed} />)}
    </div>
  );
};
```

### Import Organization

```typescript
// External libraries first
import React from "react";
import { useQuery } from "@tanstack/react-query";

// Internal utilities
import { fetchFeeds } from "../api/feeds";
import { cn } from "../utils/classnames";

// Components last
import { FeedItem } from "./FeedItem";
```

### Error Handling Patterns

#### Backend (Clojure)

```clojure
(defn fetch-feed [url]
  (try
    {:success true :data (http/get url)}
    (catch Exception e
      {:success false
       :error {:code "FEED_FETCH_ERROR"
               :message (.getMessage e)}})))
```

#### Frontend (TypeScript)

```typescript
const useFeedMutation = () => {
  return useMutation({
    mutationFn: createFeed,
    onError: (error: ApiError) => {
      toast.error(error.message);
      // Handle specific error codes
      if (error.code === "VALIDATION_ERROR") {
        // Show field-specific errors
      }
    },
  });
};
```

## Testing Guidelines

### Backend Testing

```clojure
(deftest test-feed-creation
  (testing "creates RSS feed successfully"
    (let [feed-data {:url "https://example.com/rss.xml"
                     :category-id "cat-123"}
          result (create-feed! "user-123" feed-data)]
      (is (:success result))
      (is (= "rss" (get-in result [:data :type]))))))
```

### Frontend Testing

```typescript
describe('FeedList', () => {
  it('renders feeds correctly', async () => {
    const mockFeeds = [
      { id: 'feed-1', title: 'Test Feed', unread_count: 5 }
    ];

    render(<FeedList />, {
      wrapper: createQueryWrapper(mockFeeds)
    });

    await waitFor(() => {
      expect(screen.getByText('Test Feed')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
```

## Development Workflow

1. **Start with the data contract** - Both teams implement against the agreed JSON schemas
2. **Mock early** - Frontend uses mock API responses matching the contract
3. **Test the contract** - Validate API responses match TypeScript interfaces
4. **Parallel development** - Backend implements endpoints while frontend builds UI
5. **Integration testing** - Test real API calls against the running backend
6. **WebSocket integration** - Add real-time features last

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://user:pass@localhost:5432/prism_db
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-jwt-secret
PORT=3000
LOG_LEVEL=info
SCRAPER_USER_AGENT=PrismReader/1.0
RATE_LIMIT_REQUESTS_PER_MINUTE=100
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/api/v1/ws
VITE_APP_NAME=Prism RSS Reader
```

This data contract enables true parallel development while ensuring type safety and API consistency across both services.

