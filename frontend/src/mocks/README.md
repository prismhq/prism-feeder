# Mock Data for Prism RSS Reader Frontend

This directory contains comprehensive mock data for frontend development, enabling you to build and test UI components independently of the backend.

## Structure

```
mocks/
├── users.ts          # User authentication and preferences
├── categories.ts     # Feed categories with counts
├── feeds.ts         # RSS, Atom, and scraped feeds
├── entries.ts       # Articles with rich content
├── api.ts           # API responses and error states
├── websocket.ts     # Real-time WebSocket events
├── index.ts         # Exports and helper functions
└── README.md        # This file
```

## Usage Examples

### Basic Data Access

```typescript
import { mockData, mockApiResponses } from "../mocks";

// Get all mock categories
const categories = mockData.categories;

// Get feeds for a specific category
const techFeeds = mockData.feeds.filter((f) => f.category_id === "cat-1");

// Get unread entries
const unreadEntries = mockData.unreadEntries;
```

### API Response Mocking

```typescript
import { mockApiResponses, mockErrors } from "../mocks";

// Mock successful API calls
const loginResponse = mockApiResponses.auth.login;
const feedsResponse = mockApiResponses.feeds.list;

// Mock error responses
const validationError = mockErrors.validation;
const rateLimitError = mockErrors.rateLimit;
```

### React Query Integration

```typescript
import { useQuery } from "@tanstack/react-query";
import { mockApiResponses } from "../mocks";

const useMockFeeds = () => {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockApiResponses.feeds.list;
    },
  });
};
```

### WebSocket Event Testing

```typescript
import { createWebSocketMock, mockWebSocketEvents } from "../mocks/websocket";

const wsConnection = createWebSocketMock("ws://localhost:3000/api/v1/ws");

wsConnection.addEventListener("feed_updated", (event) => {
  console.log("Feed updated:", event.data);
  // Update UI with new entries
});

// Manually trigger events for testing
MockWebSocket.triggerEvent("scraping_job_completed");
```

### Component Testing with Mock Data

```typescript
// FeedList.test.tsx
import { render, screen } from "@testing-library/react";
import { mockFeeds } from "../mocks";
import { FeedList } from "./FeedList";

test("renders feed list correctly", () => {
  render(<FeedList feeds={mockFeeds} />);

  expect(screen.getByText("TechCrunch")).toBeInTheDocument();
  expect(screen.getByText("23")).toBeInTheDocument(); // unread count
});
```

### Error State Testing

```typescript
import { mockErrors } from "../mocks";

const FeedCreateForm = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (feedData) => {
    try {
      // In development, simulate validation error
      if (
        process.env.NODE_ENV === "development" &&
        !feedData.url.startsWith("http")
      ) {
        throw mockErrors.validation;
      }
      // ... actual API call
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      {/* form fields */}
    </form>
  );
};
```

### Search Functionality

```typescript
import { searchMockEntries } from "../mocks";

const useSearch = (query: string, filters: any) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = searchMockEntries(query, filters);
      setResults(searchResults.data);
    }
  }, [query, filters]);

  return results;
};
```

### Pagination Testing

```typescript
import { getMockEntriesPaginated } from "../mocks";

const useInfiniteEntries = () => {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(0);

  const loadMoreEntries = () => {
    const response = getMockEntriesPaginated(page + 1, 20);
    setEntries((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);
  };

  return { entries, loadMoreEntries };
};
```

### Category Statistics

```typescript
import { getMockCategoryStats } from "../mocks";

const CategoryCard = ({ category }) => {
  const stats = getMockCategoryStats(category.id);

  return (
    <div>
      <h3>{category.title}</h3>
      <p>{stats.feed_count} feeds</p>
      <p>{stats.unread_count} unread</p>
    </div>
  );
};
```

## Development Workflow

1. **Component Development**: Use mock data to build components without backend dependency
2. **State Management**: Test Redux/Zustand stores with realistic data
3. **Error Handling**: Verify error states with comprehensive error mocks
4. **Performance Testing**: Use large datasets to test virtualization and pagination
5. **WebSocket Integration**: Test real-time updates with event simulation

## Data Characteristics

### Feeds (47 total)

- **RSS/Atom feeds**: TechCrunch, Ars Technica, OpenAI Blog, etc.
- **Scraped feeds**: Towards Data Science, Dev.to posts
- **Error states**: Feeds with fetch errors, paused feeds
- **Various intervals**: 30min to 6hr refresh rates

### Entries (1000+ total)

- **Rich content**: HTML with code blocks, lists, images
- **Media attachments**: Videos, PDFs, images
- **Reading metadata**: Time estimates, word counts
- **Status variety**: Unread (347), read, starred (89), archived
- **Tags and categorization**: User-defined tags

### Categories (7 total)

- Technology, AI/ML, Web Development, Design, etc.
- Realistic feed counts and unread numbers
- Color coding for UI theming

## Mock API Behavior

- **Realistic delays**: 100-2000ms response times
- **Error simulation**: Validation, rate limiting, server errors
- **Pagination**: Proper next/previous link handling
- **Search**: Full-text search with highlighting
- **WebSocket events**: Periodic updates every 5-15 seconds

This mock data enables complete frontend development and testing without requiring a running backend service.
