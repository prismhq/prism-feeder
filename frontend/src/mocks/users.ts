// Mock user data for frontend development
export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    entries_per_page: number;
    reading_pane: 'bottom' | 'right' | 'hide';
    mark_read_on_scroll: boolean;
    auto_refresh_interval: number;
  };
}

export const mockCurrentUser: User = {
  id: 'user-123',
  email: 'alex@example.com',
  username: 'alexdev',
  created_at: '2024-12-01T10:00:00Z',
  preferences: {
    theme: 'dark',
    entries_per_page: 25,
    reading_pane: 'right',
    mark_read_on_scroll: true,
    auto_refresh_interval: 30
  }
};

export const mockLoginResponse = {
  success: true,
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-jwt-token',
    user: mockCurrentUser
  }
};

export const mockAuthError = {
  success: false,
  error: {
    code: 'AUTHENTICATION_REQUIRED',
    message: 'Invalid credentials provided',
    details: {
      field: 'password',
      reason: 'Password does not match'
    },
    request_id: 'req-auth-001',
    timestamp: '2025-01-26T10:30:00Z'
  }
};