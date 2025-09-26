// Mock WebSocket events for frontend development

export interface WebSocketEvent {
  type: string;
  data: any;
  timestamp: string;
}

// WebSocket event types
export const mockWebSocketEvents = {
  feed_updated: {
    type: 'feed_updated',
    data: {
      feed_id: 'feed-1',
      new_entries: 5,
      last_fetched_at: '2025-01-26T10:30:00Z'
    },
    timestamp: '2025-01-26T10:30:05Z'
  },

  entry_status_changed: {
    type: 'entry_status_changed',
    data: {
      entry_id: 'entry-1',
      feed_id: 'feed-1',
      old_status: 'unread',
      new_status: 'read'
    },
    timestamp: '2025-01-26T10:31:00Z'
  },

  scraping_job_completed: {
    type: 'scraping_job_completed',
    data: {
      feed_id: 'feed-4',
      job_id: 'job-scraped-123',
      articles_found: 12,
      articles_new: 8,
      status: 'completed',
      processing_time_ms: 2450
    },
    timestamp: '2025-01-26T10:32:00Z'
  },

  scraping_job_failed: {
    type: 'scraping_job_completed',
    data: {
      feed_id: 'feed-8',
      job_id: 'job-scraped-124',
      articles_found: 0,
      articles_new: 0,
      status: 'failed',
      error_message: 'Site returned 403 Forbidden',
      processing_time_ms: 1200
    },
    timestamp: '2025-01-26T10:33:00Z'
  },

  unread_count_changed: {
    type: 'unread_count_changed',
    data: {
      feed_id: 'feed-1',
      category_id: 'cat-1',
      total_unread: 342
    },
    timestamp: '2025-01-26T10:34:00Z'
  },

  category_unread_changed: {
    type: 'unread_count_changed',
    data: {
      category_id: 'cat-1',
      total_unread: 127
    },
    timestamp: '2025-01-26T10:35:00Z'
  },

  feed_refresh_started: {
    type: 'feed_refresh_started',
    data: {
      feed_id: 'feed-2',
      started_at: '2025-01-26T10:36:00Z'
    },
    timestamp: '2025-01-26T10:36:00Z'
  },

  feed_refresh_completed: {
    type: 'feed_refresh_completed',
    data: {
      feed_id: 'feed-2',
      new_entries: 3,
      updated_entries: 1,
      completed_at: '2025-01-26T10:37:30Z',
      processing_time_ms: 1500
    },
    timestamp: '2025-01-26T10:37:30Z'
  },

  feed_error: {
    type: 'feed_error',
    data: {
      feed_id: 'feed-8',
      error_type: 'FETCH_ERROR',
      error_message: 'Connection timeout after 10 seconds',
      error_count: 3,
      next_retry_at: '2025-01-26T11:00:00Z'
    },
    timestamp: '2025-01-26T10:38:00Z'
  },

  user_activity: {
    type: 'user_activity',
    data: {
      activity_type: 'entries_marked_read',
      count: 15,
      category_id: 'cat-1'
    },
    timestamp: '2025-01-26T10:39:00Z'
  }
};

// Mock WebSocket connection simulator
export class MockWebSocket {
  private handlers: { [key: string]: ((event: WebSocketEvent) => void)[] } = {};
  private isConnected = false;
  private eventQueue: WebSocketEvent[] = [];

  constructor(private url: string) {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.onopen?.();
      this.startEventSimulation();
    }, 1000);
  }

  onopen?: () => void;
  onclose?: () => void;
  onerror?: (error: any) => void;
  onmessage?: (event: { data: string }) => void;

  addEventListener(type: string, handler: (event: WebSocketEvent) => void) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  removeEventListener(type: string, handler: (event: WebSocketEvent) => void) {
    if (this.handlers[type]) {
      this.handlers[type] = this.handlers[type].filter(h => h !== handler);
    }
  }

  close() {
    this.isConnected = false;
    this.onclose?.();
  }

  private startEventSimulation() {
    // Simulate periodic events
    const eventTypes = Object.keys(mockWebSocketEvents);
    
    setInterval(() => {
      if (!this.isConnected) return;

      // Randomly select an event type
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const event = mockWebSocketEvents[randomType as keyof typeof mockWebSocketEvents];
      
      // Update timestamp to current time
      const updatedEvent = {
        ...event,
        timestamp: new Date().toISOString()
      };

      // Trigger handlers
      if (this.handlers[event.type]) {
        this.handlers[event.type].forEach(handler => handler(updatedEvent));
      }

      // Trigger onmessage if set
      this.onmessage?.({
        data: JSON.stringify(updatedEvent)
      });
    }, 5000 + Math.random() * 10000); // Every 5-15 seconds
  }

  // Manually trigger specific events (useful for testing)
  static triggerEvent(eventType: keyof typeof mockWebSocketEvents) {
    const event = {
      ...mockWebSocketEvents[eventType],
      timestamp: new Date().toISOString()
    };
    
    // In a real implementation, this would be sent through the actual WebSocket
    console.log('Mock WebSocket Event:', event);
    return event;
  }
}

// Helper function to create mock WebSocket for testing
export const createMockWebSocket = (url: string) => {
  return new MockWebSocket(url);
};

// Event simulation scenarios for different UI states
export const mockEventScenarios = {
  // Scenario: User reading articles
  reading_session: [
    mockWebSocketEvents.entry_status_changed,
    { ...mockWebSocketEvents.unread_count_changed, data: { ...mockWebSocketEvents.unread_count_changed.data, total_unread: 341 } },
    { ...mockWebSocketEvents.entry_status_changed, data: { entry_id: 'entry-2', feed_id: 'feed-1', old_status: 'unread', new_status: 'read' } },
    { ...mockWebSocketEvents.unread_count_changed, data: { ...mockWebSocketEvents.unread_count_changed.data, total_unread: 340 } }
  ],

  // Scenario: Feed refresh cycle
  feed_refresh_cycle: [
    mockWebSocketEvents.feed_refresh_started,
    mockWebSocketEvents.feed_refresh_completed,
    mockWebSocketEvents.feed_updated,
    mockWebSocketEvents.unread_count_changed
  ],

  // Scenario: Scraping job processing
  scraping_workflow: [
    {
      type: 'scraping_job_started',
      data: { feed_id: 'feed-4', job_id: 'job-scraped-123', started_at: '2025-01-26T10:30:00Z' },
      timestamp: '2025-01-26T10:30:00Z'
    },
    mockWebSocketEvents.scraping_job_completed,
    mockWebSocketEvents.feed_updated,
    mockWebSocketEvents.unread_count_changed
  ],

  // Scenario: Error handling
  error_scenario: [
    mockWebSocketEvents.feed_error,
    {
      type: 'feed_status_changed',
      data: { feed_id: 'feed-8', old_status: 'active', new_status: 'error' },
      timestamp: '2025-01-26T10:38:30Z'
    }
  ]
};