// Mock data exports for Prism RSS Reader frontend development

// Core data exports
export * from './users';
export * from './categories';
export * from './feeds';
export * from './entries';
export * from './api';
export * from './websocket';

// Convenience exports for common usage patterns
import { mockCurrentUser, mockLoginResponse } from './users';
import { mockCategories, mockCategoriesResponse } from './categories';
import { mockFeeds, mockFeedsResponse, mockScraperDiscoveryResponse, mockScraperPreviewResponse } from './feeds';
import { mockEntries, mockEntriesResponse, mockUnreadEntries, mockStarredEntries } from './entries';
import { mockDashboardOverview, mockValidationError, mockRateLimitError } from './api';
import { mockWebSocketEvents, MockWebSocket } from './websocket';

// Complete mock data set
export const mockData = {
  user: mockCurrentUser,
  categories: mockCategories,
  feeds: mockFeeds,
  entries: mockEntries,
  unreadEntries: mockUnreadEntries,
  starredEntries: mockStarredEntries
};

// Complete API responses
export const mockApiResponses = {
  auth: {
    login: mockLoginResponse,
    me: { success: true, data: mockCurrentUser }
  },
  categories: {
    list: mockCategoriesResponse,
    create: { success: true, data: mockCategories[0] }
  },
  feeds: {
    list: mockFeedsResponse,
    create: { success: true, data: mockFeeds[0] },
    scraper: {
      discover: mockScraperDiscoveryResponse,
      preview: mockScraperPreviewResponse
    }
  },
  entries: {
    list: mockEntriesResponse,
    update: { success: true, data: mockEntries[0] }
  },
  dashboard: mockDashboardOverview
};

// Error responses for testing error states
export const mockErrors = {
  validation: mockValidationError,
  rateLimit: mockRateLimitError,
  server: { success: false, error: { code: 'INTERNAL_ERROR', message: 'Server error' } }
};

// WebSocket mock
export const createWebSocketMock = (url: string) => new MockWebSocket(url);

// Helper functions for frontend development
export const getMockFeedsByCategory = (categoryId: string) => {
  return mockFeeds.filter(feed => feed.category_id === categoryId);
};

export const getMockEntriesByFeed = (feedId: string) => {
  return mockEntries.filter(entry => entry.feed_id === feedId);
};

export const getMockEntriesByStatus = (status: 'unread' | 'read' | 'starred' | 'archived') => {
  return mockEntries.filter(entry => entry.status === status);
};

export const getMockCategoryStats = (categoryId: string) => {
  const categoryFeeds = getMockFeedsByCategory(categoryId);
  const categoryEntries = mockEntries.filter(entry => 
    categoryFeeds.some(feed => feed.id === entry.feed_id)
  );
  
  return {
    feed_count: categoryFeeds.length,
    entry_count: categoryEntries.length,
    unread_count: categoryEntries.filter(entry => entry.status === 'unread').length,
    starred_count: categoryEntries.filter(entry => entry.status === 'starred').length
  };
};

// Pagination helpers
export const getMockEntriesPaginated = (page = 0, limit = 20) => {
  const start = page * limit;
  const end = start + limit;
  const paginatedEntries = mockEntries.slice(start, end);
  
  return {
    success: true,
    data: paginatedEntries,
    pagination: {
      total: mockEntries.length,
      limit,
      offset: start,
      has_next: end < mockEntries.length,
      next_offset: end < mockEntries.length ? end : null
    }
  };
};

// Search simulation
export const searchMockEntries = (query: string, filters: any = {}) => {
  let results = mockEntries.filter(entry => 
    entry.title.toLowerCase().includes(query.toLowerCase()) ||
    entry.content.toLowerCase().includes(query.toLowerCase()) ||
    entry.summary?.toLowerCase().includes(query.toLowerCase())
  );

  if (filters.status) {
    results = results.filter(entry => entry.status === filters.status);
  }

  if (filters.feed_id) {
    results = results.filter(entry => entry.feed_id === filters.feed_id);
  }

  if (filters.category_id) {
    const categoryFeeds = getMockFeedsByCategory(filters.category_id);
    results = results.filter(entry => 
      categoryFeeds.some(feed => feed.id === entry.feed_id)
    );
  }

  return {
    success: true,
    data: results,
    search_metadata: {
      query,
      total_matches: results.length,
      search_time_ms: Math.floor(Math.random() * 100) + 10,
      filters_applied: Object.keys(filters)
    }
  };
};