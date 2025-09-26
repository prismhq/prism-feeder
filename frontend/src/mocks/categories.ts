// Mock category data for frontend development
export interface Category {
  id: string;
  user_id: string;
  title: string;
  color: string;
  sort_order: number;
  created_at: string;
  feed_count: number;
  unread_count: number;
}

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    user_id: 'user-123',
    title: 'Technology',
    color: '#3B82F6',
    sort_order: 1,
    created_at: '2024-12-01T10:00:00Z',
    feed_count: 8,
    unread_count: 127
  },
  {
    id: 'cat-2',
    user_id: 'user-123',
    title: 'AI & Machine Learning',
    color: '#8B5CF6',
    sort_order: 2,
    created_at: '2024-12-01T10:15:00Z',
    feed_count: 5,
    unread_count: 89
  },
  {
    id: 'cat-3',
    user_id: 'user-123',
    title: 'Web Development',
    color: '#10B981',
    sort_order: 3,
    created_at: '2024-12-01T10:30:00Z',
    feed_count: 12,
    unread_count: 203
  },
  {
    id: 'cat-4',
    user_id: 'user-123',
    title: 'Design & UX',
    color: '#F59E0B',
    sort_order: 4,
    created_at: '2024-12-01T10:45:00Z',
    feed_count: 6,
    unread_count: 45
  },
  {
    id: 'cat-5',
    user_id: 'user-123',
    title: 'Startup News',
    color: '#EF4444',
    sort_order: 5,
    created_at: '2024-12-01T11:00:00Z',
    feed_count: 4,
    unread_count: 67
  },
  {
    id: 'cat-6',
    user_id: 'user-123',
    title: 'Science',
    color: '#06B6D4',
    sort_order: 6,
    created_at: '2024-12-01T11:15:00Z',
    feed_count: 7,
    unread_count: 34
  },
  {
    id: 'cat-7',
    user_id: 'user-123',
    title: 'Personal Blogs',
    color: '#84CC16',
    sort_order: 7,
    created_at: '2024-12-01T11:30:00Z',
    feed_count: 15,
    unread_count: 178
  }
];

export const mockCategoriesResponse = {
  success: true,
  data: mockCategories
};

export const mockCreateCategoryRequest = {
  title: 'New Category',
  color: '#6366F1'
};

export const mockCreateCategoryResponse = {
  success: true,
  data: {
    id: 'cat-new',
    user_id: 'user-123',
    title: 'New Category',
    color: '#6366F1',
    sort_order: 8,
    created_at: '2025-01-26T10:30:00Z',
    feed_count: 0,
    unread_count: 0
  }
};