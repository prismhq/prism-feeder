# Prism Feeder

## Project Overview

AI-powered entity tracking RSS service that creates personalized feeds by monitoring any entity (people, companies, products, topics, events) across multiple platforms. Built as a microservices architecture with Clojure backend and TypeScript frontend.

**Core Concept**: Users provide an entity's name and optional identifiers, select what types of updates they want to track, and receive a personalized RSS feed containing news-like events about that entity from across the web.

## Architecture

- **Backend**: Clojure (Ring/Compojure, PostgreSQL, async job queue)
- **Frontend**: TypeScript/React (Vite, TanStack Query, WebSocket)
- **Database**: PostgreSQL with Redis for caching
- **Queue**: Redis/Sidekiq for background scraping and monitoring jobs
- **AI Components**: LLM-powered content analysis and event classification

## Build Commands

### Backend (Clojure)

```bash
# Install dependencies
lein deps

# Run tests
lein test

# Run specific test
lein test prism.entities.core-test/test-entity-tracking

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
npm test -- --testNamePattern="EntityForm component"

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

### Entity Types & Event Classifications

The system supports different entity types, each with their own relevant event types:

#### Person
- **Event Types**: `career`, `content`, `open_source`, `press`, `education`, `hobbies`, `life`, `relationship`
- **Event Subtypes**: `job_change`, `promotion`, `speaking`, `blog_post`, `video`, `repo_release`, `interview`, `mention`

#### Company  
- **Event Types**: `funding`, `product_launch`, `hiring`, `partnerships`, `press`, `financial`, `legal`
- **Event Subtypes**: `series_a`, `series_b`, `ipo`, `acquisition`, `product_release`, `executive_hire`, `partnership`

#### Product
- **Event Types**: `release`, `update`, `review`, `integration`, `security`, `pricing`, `deprecation`
- **Event Subtypes**: `major_release`, `minor_update`, `security_patch`, `price_change`, `feature_launch`

#### Topic
- **Event Types**: `research`, `news`, `discussion`, `breakthrough`, `regulation`, `trend`, `analysis`
- **Event Subtypes**: `research_paper`, `news_article`, `regulatory_change`, `market_analysis`

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
      "events_per_page": "number",
      "reading_pane": "bottom|right|hide",
      "mark_read_on_scroll": "boolean",
      "auto_refresh_interval": "number",
      "default_privacy_level": "public_only|include_mentions|all"
    }
  }
}
```

#### Entity

```json
{
  "Entity": {
    "id": "uuid",
    "user_id": "uuid",
    "entity_type": "person|company|product|topic|event|project",
    "name": "string",
    "aliases": ["string"],
    "description": "string?",
    "known_identifiers": [
      {
        "type": "profile|domain|handle|ticker|keyword|username",
        "platform": "linkedin|github|youtube|substack|twitter|news|crunchbase|producthunt|reddit|official_site",
        "value": "string",
        "url": "string?",
        "verified": "boolean",
        "last_checked": "ISO8601"
      }
    ],
    "tracking_config": {
      "event_types": [], // Dynamic based on entity_type
      "sources": ["github|youtube|blog|news|product_hunt|scholar|podcasts|crunchbase|reddit|official"],
      "time_window_days": "number",
      "mention_filter": "direct_only|include_mentions|all",
      "region_filter": ["string"],
      "sensitivity_settings": {
        // Dynamic based on entity_type
        "hide_sensitive_events": "boolean",
        "public_only": "boolean",
        "min_confidence_threshold": "number"
      }
    },
    "status": "active|paused|error",
    "last_monitored_at": "ISO8601?",
    "last_successful_check_at": "ISO8601?",
    "error_count": "number",
    "last_error": "string?",
    "created_at": "ISO8601",
    "updated_at": "ISO8601",
    "event_count": "number",
    "unread_count": "number"
  }
}
```

#### Event Entity

```json
{
  "Event": {
    "id": "uuid",
    "entity_id": "uuid",
    "entity_type": "person|company|product|topic|event|project",
    "title": "string",
    "url": "string",
    "content": "string",
    "summary": "string?",
    "event_type": "string", // Dynamic based on entity_type
    "event_subtype": "string", // Specific classification (job_change, funding_round, product_release, etc.)
    "source_platform": "linkedin|github|youtube|substack|twitter|news|blog|podcast|crunchbase|producthunt|reddit|official",
    "source_type": "direct|mention|press|analysis",
    "published_at": "ISO8601",
    "discovered_at": "ISO8601",
    "confidence_score": "number",
    "status": "unread|read|starred|archived",
    "reading_time_minutes": "number?",
    "tags": ["string"],
    "created_at": "ISO8601",
    "read_at": "ISO8601?",
    "starred_at": "ISO8601?",
    "evidence": {
      "original_url": "string",
      "extraction_method": "rss|scraping|api|search",
      "extraction_quality": "high|medium|low",
      "ai_analysis": {
        "relevance_score": "number",
        "event_classification": "string",
        "key_entities": ["string"],
        "sentiment": "positive|neutral|negative",
        "impact_score": "number"
      }
    },
    "regional_mentions": ["string"],
    "related_entities": [
      {
        "entity_id": "uuid?",
        "name": "string",
        "relationship": "string"
      }
    ]
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
    "entity_count": "number",
    "unread_count": "number"
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

### Entity Tracking

```
GET    /api/v1/entities
POST   /api/v1/entities
GET    /api/v1/entities/{id}
PUT    /api/v1/entities/{id}
DELETE /api/v1/entities/{id}
POST   /api/v1/entities/{id}/refresh
PUT    /api/v1/entities/{id}/mark-all-read
```

#### Create Entity Tracking (Person - Minimal)

```http
POST /api/v1/entities
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "entity_type": "person",
  "name": "Jane Doe",
  "known_identifiers": [
    {
      "type": "profile",
      "platform": "linkedin",
      "value": "janedoe",
      "url": "https://www.linkedin.com/in/janedoe"
    }
  ]
}
```

#### Create Entity Tracking (Company - Full Configuration)

```http
POST /api/v1/entities
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "entity_type": "company",
  "name": "OpenAI",
  "aliases": ["OpenAI Inc", "OpenAI LP"],
  "description": "AI research and deployment company",
  "category_id": "cat-123",
  "known_identifiers": [
    {
      "type": "domain",
      "value": "openai.com",
      "url": "https://openai.com"
    },
    {
      "type": "handle",
      "platform": "twitter",
      "value": "@openai"
    },
    {
      "type": "profile",
      "platform": "crunchbase",
      "value": "openai",
      "url": "https://crunchbase.com/organization/openai"
    }
  ],
  "tracking_config": {
    "event_types": ["funding", "product_launch", "hiring", "partnerships", "press"],
    "sources": ["news", "crunchbase", "twitter", "blog", "official"],
    "time_window_days": 90,
    "mention_filter": "include_mentions",
    "sensitivity_settings": {
      "hide_sensitive_events": false,
      "public_only": true,
      "min_confidence_threshold": 0.8
    }
  }
}
```

#### Create Entity Tracking (Product)

```http
POST /api/v1/entities
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "entity_type": "product",
  "name": "ChatGPT",
  "aliases": ["GPT-4", "OpenAI ChatGPT"],
  "known_identifiers": [
    {
      "type": "domain",
      "value": "chat.openai.com",
      "url": "https://chat.openai.com"
    },
    {
      "type": "keyword",
      "value": "ChatGPT"
    }
  ],
  "tracking_config": {
    "event_types": ["release", "update", "review", "integration", "pricing"],
    "sources": ["news", "reddit", "producthunt", "github", "official"]
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "entity-456",
    "entity_type": "company",
    "name": "OpenAI",
    "aliases": ["OpenAI Inc", "OpenAI LP"],
    "status": "active",
    "category_id": "cat-123",
    "created_at": "2025-01-26T10:30:00Z",
    "event_count": 0,
    "unread_count": 0,
    "rss_feed_url": "https://api.prismfeeder.com/api/v1/entities/entity-456/feed.rss?token=abc123"
  }
}
```

### Entity Discovery

```
POST   /api/v1/discovery/entities
POST   /api/v1/discovery/preview
```

#### Discover Entity Identifiers

```http
POST /api/v1/discovery/entities
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "entity_type": "company",
  "name": "Anthropic",
  "known_identifier": {
    "type": "domain",
    "value": "anthropic.com"
  },
  "options": {
    "search_social_media": true,
    "search_business_databases": true,
    "search_news_sources": true,
    "confidence_threshold": 0.7
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "discovered_profiles": [
      {
        "platform": "github",
        "url": "https://github.com/janed",
        "username": "janed",
        "confidence": 0.85,
        "evidence": ["Same name", "LinkedIn shows GitHub link", "Location match"]
      },
      {
        "platform": "youtube",
        "url": "https://youtube.com/@janedoetech",
        "confidence": 0.78,
        "evidence": ["Name match", "Professional content overlap"]
      }
    ],
    "suggested_tracking": {
      "event_types": ["career", "content", "open_source"],
      "sources": ["github", "linkedin", "youtube"],
      "reasoning": "High activity on GitHub and YouTube, professional LinkedIn presence"
    }
  }
}
```

#### Preview Person Events

```http
POST /api/v1/discovery/preview
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "name": "Jane Doe",
  "profiles": [
    {"platform": "github", "username": "janed"},
    {"platform": "substack", "url": "https://janedoe.substack.com"}
  ],
  "event_types": ["content", "open_source"],
  "time_window_days": 30,
  "limit": 10
}
```

Response:

```json
{
  "success": true,
  "data": {
    "preview_events": [
      {
        "title": "Jane Doe joins Acme as VP of Product",
        "url": "https://techcrunch.com/jane-doe-acme",
        "event_type": "career.job_change",
        "source_platform": "news",
        "published_at": "2025-01-20T09:00:00Z",
        "confidence": 0.92,
        "summary": "TechCrunch reports Jane Doe's move to Acme Corp."
      },
      {
        "title": "How I think about product strategy",
        "url": "https://janedoe.substack.com/product-strategy",
        "event_type": "content.blog",
        "source_platform": "substack",
        "published_at": "2025-01-18T14:30:00Z",
        "confidence": 0.98,
        "summary": "New blog post on product strategy and AI tools."
      }
    ],
    "total_events_found": 23,
    "quality_assessment": "high",
    "processing_time_ms": 2100
  }
}
```

### Events

```
GET    /api/v1/events
GET    /api/v1/events/{id}
PUT    /api/v1/events/{id}
PUT    /api/v1/events/batch
GET    /api/v1/entities/{id}/events
GET    /api/v1/entities/{id}/feed.rss
```

#### List Events with Filters

```http
GET /api/v1/events?status=unread&limit=20&offset=0&entity_id=entity-456&event_type=funding&search=series
Authorization: Bearer jwt-token
```

Query Parameters:

- `status`: unread|read|starred|archived (can repeat)
- `event_type`: career|content|open_source|press|projects|education|hobbies|life|relationship (can repeat)
- `source_platform`: linkedin|github|youtube|substack|twitter|news|blog|podcast (can repeat)
- `author_type`: self|press|mention
- `entity_id`: uuid
- `category_id`: uuid
- `search`: string
- `published_after`: ISO8601
- `published_before`: ISO8601
- `min_confidence`: number (0.0-1.0)
- `limit`: number (default 20, max 100)
- `offset`: number (default 0)
- `order`: published_at|discovered_at|confidence|title
- `direction`: asc|desc

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "event-789",
      "person_id": "person-456",
      "title": "Jane Doe promoted to Senior VP at Acme",
      "url": "https://linkedin.com/posts/janedoe-promotion",
      "content": "Excited to announce my promotion to Senior VP of Product at Acme Corp...",
      "event_type": "career.promotion",
      "source_platform": "linkedin",
      "author_type": "self",
      "published_at": "2025-01-26T09:00:00Z",
      "confidence_score": 0.95,
      "status": "unread",
      "reading_time_minutes": 2,
      "tags": ["promotion", "acme"],
      "person": {
        "id": "person-456",
        "name": "Jane Doe",
        "category": {
          "title": "Tech Leaders",
          "color": "#3B82F6"
        }
      },
      "evidence": {
        "original_url": "https://linkedin.com/posts/janedoe-promotion",
        "extraction_method": "api",
        "ai_analysis": {
          "relevance_score": 0.95,
          "event_classification": "career.promotion",
          "key_entities": ["Jane Doe", "Acme Corp", "Senior VP", "Product"],
          "sentiment": "positive"
        }
      }
    }
  ],
  "pagination": {
    "total": 342,
    "limit": 20,
    "offset": 0,
    "has_next": true,
    "next_offset": 20
  }
}
```

#### RSS Feed for Entity

```http
GET /api/v1/entities/entity-456/feed.rss?token=feed-token-123
```

Response (RSS XML):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jane Doe - Prism Feed</title>
    <description>Updates and events for Jane Doe</description>
    <link>https://prismfeeder.com/persons/person-456</link>
    <lastBuildDate>Mon, 26 Jan 2025 10:30:00 GMT</lastBuildDate>
    
    <item>
      <title>Jane Doe promoted to Senior VP at Acme</title>
      <link>https://linkedin.com/posts/janedoe-promotion</link>
      <description><![CDATA[
        Excited to announce my promotion to Senior VP of Product at Acme Corp...
        <br><br>
        <small>
        <strong>Type:</strong> career.promotion •
        <strong>Source:</strong> LinkedIn •
        <strong>Authorship:</strong> self-authored •
        <strong>Confidence:</strong> 95%
        </small>
      ]]></description>
      <pubDate>Mon, 26 Jan 2025 09:00:00 GMT</pubDate>
      <guid>event-789</guid>
      <category>career</category>
    </item>
    
    <item>
      <title>How I think about product strategy</title>
      <link>https://janedoe.substack.com/product-strategy</link>
      <description><![CDATA[
        New blog post discussing product strategy in the age of AI tools...
        <br><br>
        <small>
        <strong>Type:</strong> content.blog •
        <strong>Source:</strong> Substack •
        <strong>Authorship:</strong> self-authored •
        <strong>Confidence:</strong> 98%
        </small>
      ]]></description>
      <pubDate>Thu, 23 Jan 2025 14:30:00 GMT</pubDate>
      <guid>event-788</guid>
      <category>content</category>
    </item>
  </channel>
</rss>
```

### Statistics

```
GET    /api/v1/stats/overview
GET    /api/v1/stats/tracking-insights
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
    "total_persons": 12,
    "total_events": 2840,
    "unread_events": 156,
    "starred_events": 34,
    "active_trackings": 11,
    "events_discovered_today": 23,
    "events_discovered_this_week": 167,
    "top_event_types": [
      {
        "type": "content",
        "count": 89,
        "unread_count": 34
      },
      {
        "type": "career",
        "count": 45,
        "unread_count": 12
      }
    ],
    "most_active_persons": [
      {
        "person_id": "person-456",
        "name": "Jane Doe",
        "recent_events": 15
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
  "person_updated": {
    "person_id": "uuid",
    "new_events": "number",
    "last_checked_at": "ISO8601"
  },
  "event_status_changed": {
    "event_id": "uuid",
    "person_id": "uuid",
    "old_status": "string",
    "new_status": "string"
  },
  "monitoring_job_completed": {
    "person_id": "uuid",
    "job_id": "uuid",
    "events_found": "number",
    "status": "completed|failed"
  },
  "unread_count_changed": {
    "person_id": "uuid?",
    "category_id": "uuid?",
    "total_unread": "number"
  }
}
```

## RSS Feed Features

### Feed URL Structure

```
https://api.prismfeeder.com/api/v1/entities/{entity-id}/feed.rss?token={feed-token}
```

### Feed Filtering Parameters

Users can customize their RSS feed with URL parameters:

```
# By event type
?types=career,content

# By source platform  
?sources=github,substack

# By timeframe
?from=2025-07-01&to=2025-09-26

# By authorship
?authorship=self_only

# By sensitivity
?life=hide&relationship=hide

# By confidence
?min_confidence=0.8

# By volume
?max_items=50
```

### Example Feed Items

#### Person - Career Event
```
Title: Jane Doe joins Acme as VP of Product
Link: https://techcrunch.com/jane-doe-acme
Date: Tue, Sep 23, 2025
Summary: TechCrunch reports Jane Doe's move to Acme Corp as VP of Product.
Footer: Type: career.job_change • Source: News • Confidence: 92%
```

#### Company - Funding Event
```
Title: Anthropic raises $4B Series C led by Google
Link: https://techcrunch.com/anthropic-series-c-funding
Date: Mon, Sep 22, 2025
Summary: AI safety company Anthropic secures major funding round for Claude development.
Footer: Type: funding.series_c • Source: News • Confidence: 95%
```

#### Product - Release Event
```
Title: iPhone 16 Pro announced with A18 Pro chip
Link: https://apple.com/newsroom/iphone-16-pro
Date: Sun, Sep 21, 2025
Summary: Apple unveils next-generation iPhone with enhanced AI capabilities.
Footer: Type: release.major_release • Source: Official • Confidence: 100%
```

#### Topic - Research Event
```
Title: Breakthrough in quantum error correction published in Nature
Link: https://nature.com/quantum-error-correction-2025
Date: Fri, Sep 20, 2025
Summary: New research shows 1000x improvement in quantum computing stability.
Footer: Type: research.breakthrough • Source: Scholar • Confidence: 94%
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "PERSON_NOT_FOUND",
    "message": "Person tracking not found",
    "details": {
      "person_id": "person-456",
      "reason": "Person may have been deleted or access denied"
    },
    "request_id": "req-123",
    "timestamp": "2025-01-26T10:30:00Z"
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `PERSON_NOT_FOUND`: Person tracking does not exist
- `PROFILE_DISCOVERY_ERROR`: Unable to discover person profiles
- `MONITORING_ERROR`: Person monitoring job failed
- `INSUFFICIENT_CONFIDENCE`: Events below confidence threshold
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `AUTHENTICATION_REQUIRED`: Valid auth token required
- `PERMISSION_DENIED`: Insufficient permissions
- `PRIVACY_VIOLATION`: Request violates privacy settings
- `INTERNAL_ERROR`: Server error occurred

## Privacy & Ethics

### Privacy Safeguards

1. **Public Data Only**: Only scrapes publicly available information
2. **Self-Disclosure Priority**: Life/relationship events only if person posts them
3. **Confidence Thresholds**: Events require high confidence scores to appear
4. **User Consent**: Clear opt-in for sensitive categories
5. **Data Retention**: Automatic cleanup of old tracking data
6. **Right to Forget**: Support for removing person tracking

### Ethical Guidelines

- **Respect Privacy**: Default to hiding personal life events
- **Transparency**: Clear attribution and evidence for all events
- **Accuracy**: High confidence requirements and human review options
- **Consent**: Users must justify legitimate interest in tracking
- **Limits**: Rate limiting and reasonable use policies

### Safety Toggles

All person tracking includes these safety options:

```json
{
  "privacy_settings": {
    "hide_life_events": true,
    "hide_relationship_items": true, 
    "public_only": true,
    "require_self_disclosure": true,
    "min_confidence_threshold": 0.8
  }
}
```

## Code Style Guidelines

### Clojure (Backend)

- Use kebab-case for functions and variables
- Use PascalCase for records and protocols
- Prefer threading macros (->, ->>)
- Use clojure.spec for API validation
- Handle errors with ex-info and structured data

```clojure
;; Good
(defn create-person-tracking! [user-id person-data]
  (-> person-data
      (assoc :user-id user-id :created-at (time/now))
      (validate-person-data)
      (db/insert-person!)))

;; Validation with spec
(s/def ::name (s/and string? #(> (count %) 2)))
(s/def ::person-create (s/keys :req-un [::name] :opt-un [::aliases ::known-profiles]))
```

### TypeScript (Frontend)

- Use PascalCase for components and interfaces
- Use camelCase for functions and variables
- Prefer functional components with hooks
- Use strict TypeScript settings
- Handle async operations with async/await

```typescript
// Good
interface CreatePersonRequest {
  name: string;
  aliases?: string[];
  knownProfiles?: Profile[];
  trackingConfig?: TrackingConfig;
}

const PersonList: React.FC = () => {
  const { data: persons } = useQuery({
    queryKey: ['persons'],
    queryFn: fetchPersons
  });

  return (
    <div className="person-list">
      {persons?.map(person => <PersonCard key={person.id} person={person} />)}
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
import { fetchPersons } from "../api/persons";
import { cn } from "../utils/classnames";

// Components last
import { PersonCard } from "./PersonCard";
```

### Error Handling Patterns

#### Backend (Clojure)

```clojure
(defn discover-person-profiles [name known-profile]
  (try
    {:success true :data (profile-discovery/search name known-profile)}
    (catch Exception e
      {:success false
       :error {:code "PROFILE_DISCOVERY_ERROR"
               :message (.getMessage e)}})))
```

#### Frontend (TypeScript)

```typescript
const usePersonMutation = () => {
  return useMutation({
    mutationFn: createPerson,
    onError: (error: ApiError) => {
      toast.error(error.message);
      // Handle specific error codes
      if (error.code === "PRIVACY_VIOLATION") {
        // Show privacy settings dialog
      }
    },
  });
};
```

## Testing Guidelines

### Backend Testing

```clojure
(deftest test-person-tracking-creation
  (testing "creates person tracking successfully"
    (let [person-data {:name "Jane Doe"
                       :known-profiles [{:platform "linkedin" 
                                        :url "https://linkedin.com/in/janedoe"}]}
          result (create-person-tracking! "user-123" person-data)]
      (is (:success result))
      (is (= "active" (get-in result [:data :status]))))))
```

### Frontend Testing

```typescript
describe('PersonForm', () => {
  it('creates person tracking with minimal data', async () => {
    const mockPerson = {
      name: 'Jane Doe',
      knownProfiles: [{ platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' }]
    };

    render(<PersonForm />, {
      wrapper: createQueryWrapper()
    });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('LinkedIn URL'), { 
      target: { value: 'https://linkedin.com/in/janedoe' } 
    });
    
    fireEvent.click(screen.getByText('Start Tracking'));

    await waitFor(() => {
      expect(screen.getByText('Person tracking created')).toBeInTheDocument();
    });
  });
});
```

## Development Workflow

1. **Start with person discovery** - Implement profile discovery and validation
2. **Mock event data** - Frontend uses mock person events matching the contract
3. **Test the monitoring** - Validate event detection and classification
4. **Parallel development** - Backend implements monitoring while frontend builds UI
5. **Integration testing** - Test real monitoring against live data sources
6. **RSS feed generation** - Add RSS output with proper formatting
7. **Privacy validation** - Ensure all privacy safeguards work correctly

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://user:pass@localhost:5432/prism_db
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-jwt-secret
PORT=3000
LOG_LEVEL=info

# AI/LLM Configuration
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
LLM_PROVIDER=openai|anthropic

# Platform API Keys
LINKEDIN_API_KEY=your-linkedin-key
GITHUB_API_TOKEN=your-github-token
YOUTUBE_API_KEY=your-youtube-key
TWITTER_BEARER_TOKEN=your-twitter-token

# Monitoring Settings
MONITORING_INTERVAL_MINUTES=60
MAX_EVENTS_PER_PERSON_PER_DAY=50
MIN_CONFIDENCE_THRESHOLD=0.7
RATE_LIMIT_REQUESTS_PER_MINUTE=100

# Privacy Settings
REQUIRE_PRIVACY_CONSENT=true
DEFAULT_HIDE_LIFE_EVENTS=true
DEFAULT_HIDE_RELATIONSHIP_ITEMS=true
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/api/v1/ws
VITE_APP_NAME=Prism Feeder
VITE_RSS_BASE_URL=http://localhost:3000/api/v1/persons
VITE_PRIVACY_POLICY_URL=https://prismfeeder.com/privacy
VITE_ENABLE_ANALYTICS=false
```

This person-tracking RSS service enables users to stay updated on specific individuals across multiple platforms while maintaining strong privacy safeguards and ethical guidelines.