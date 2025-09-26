// Mock entry data for frontend development
export interface Enclosure {
  url: string;
  type: string;
  length?: number;
}

export interface ScrapedMetadata {
  original_selector?: string;
  extraction_quality: 'high' | 'medium' | 'low';
}

export interface Entry {
  id: string;
  feed_id: string;
  title: string;
  url: string;
  content: string;
  summary?: string;
  author?: string;
  published_at: string;
  updated_at?: string;
  guid: string;
  status: 'unread' | 'read' | 'starred' | 'archived';
  reading_time_minutes?: number;
  word_count?: number;
  tags: string[];
  created_at: string;
  read_at?: string;
  starred_at?: string;
  enclosures: Enclosure[];
  scraped_metadata?: ScrapedMetadata;
  feed?: {
    id: string;
    title: string;
    favicon_url?: string;
  };
}

export const mockEntries: Entry[] = [
  {
    id: 'entry-1',
    feed_id: 'feed-1',
    title: 'AI Breakthrough: New Language Model Achieves Human-Level Performance',
    url: 'https://techcrunch.com/2025/01/26/ai-breakthrough-language-model',
    content: `<div>
      <p>In a groundbreaking development, researchers have announced a new language model that demonstrates human-level performance across multiple benchmarks.</p>
      <p>The model, dubbed "NextGen-LLM", showcases remarkable improvements in reasoning, creativity, and contextual understanding. Key highlights include:</p>
      <ul>
        <li>99.2% accuracy on complex reasoning tasks</li>
        <li>Significant reduction in hallucination rates</li>
        <li>Enhanced multilingual capabilities</li>
        <li>Improved ethical decision-making frameworks</li>
      </ul>
      <p>This advancement could revolutionize how we interact with AI systems across industries...</p>
    </div>`,
    summary: 'Researchers announce NextGen-LLM, a new language model achieving human-level performance with 99.2% accuracy on complex reasoning tasks.',
    author: 'Sarah Mitchell',
    published_at: '2025-01-26T09:30:00Z',
    guid: 'techcrunch-ai-breakthrough-2025-01-26',
    status: 'unread',
    reading_time_minutes: 4,
    word_count: 850,
    tags: [],
    created_at: '2025-01-26T09:35:00Z',
    enclosures: [],
    feed: {
      id: 'feed-1',
      title: 'TechCrunch',
      favicon_url: 'https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png'
    }
  },
  {
    id: 'entry-2',
    feed_id: 'feed-2',
    title: 'Quantum Computing Makes Major Leap with New Error Correction Method',
    url: 'https://arstechnica.com/science/2025/01/quantum-computing-error-correction',
    content: `<div>
      <p>IBM researchers have developed a revolutionary error correction technique that could bring practical quantum computing closer to reality.</p>
      <p>The new method, called "Adaptive Quantum Error Correction" (AQEC), reduces error rates by up to 1000x compared to previous approaches.</p>
      <blockquote>
        "This breakthrough addresses one of the fundamental challenges in quantum computing," said Dr. Elena Rodriguez, lead researcher on the project.
      </blockquote>
      <p>The implications for cryptography, drug discovery, and financial modeling are immense...</p>
    </div>`,
    summary: 'IBM develops Adaptive Quantum Error Correction technique, reducing quantum computing error rates by up to 1000x.',
    author: 'David Chen',
    published_at: '2025-01-26T08:15:00Z',
    guid: 'arstechnica-quantum-error-correction-2025',
    status: 'read',
    reading_time_minutes: 6,
    word_count: 1200,
    tags: ['quantum', 'important'],
    created_at: '2025-01-26T08:20:00Z',
    read_at: '2025-01-26T09:45:00Z',
    enclosures: [],
    feed: {
      id: 'feed-2',
      title: 'Ars Technica',
      favicon_url: 'https://cdn.arstechnica.net/favicon.ico'
    }
  },
  {
    id: 'entry-3',
    feed_id: 'feed-3',
    title: 'Introducing GPT-5: Multimodal AI with Advanced Reasoning',
    url: 'https://openai.com/blog/gpt-5-announcement',
    content: `<div>
      <p>Today, we're excited to announce GPT-5, our most capable model yet, featuring unprecedented multimodal capabilities and advanced reasoning.</p>
      <p>GPT-5 represents a significant leap forward in AI development:</p>
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Multimodal Understanding:</strong> Process text, images, audio, and video simultaneously</li>
        <li><strong>Enhanced Reasoning:</strong> Solve complex mathematical and logical problems</li>
        <li><strong>Scientific Discovery:</strong> Generate novel hypotheses and research directions</li>
        <li><strong>Code Generation:</strong> Write complete applications from natural language descriptions</li>
      </ul>
      <p>We've also made significant improvements to safety and alignment...</p>
    </div>`,
    summary: 'OpenAI announces GPT-5 with multimodal capabilities, advanced reasoning, and improved safety features.',
    author: 'OpenAI Team',
    published_at: '2025-01-25T16:00:00Z',
    guid: 'openai-gpt5-announcement',
    status: 'starred',
    reading_time_minutes: 8,
    word_count: 1450,
    tags: ['gpt', 'openai', 'breakthrough'],
    created_at: '2025-01-25T16:05:00Z',
    starred_at: '2025-01-25T17:30:00Z',
    enclosures: [
      {
        url: 'https://openai.com/content/gpt5-demo-video.mp4',
        type: 'video/mp4',
        length: 45000000
      }
    ],
    feed: {
      id: 'feed-3',
      title: 'OpenAI Blog',
      favicon_url: 'https://openai.com/favicon.ico'
    }
  },
  {
    id: 'entry-4',
    feed_id: 'feed-4',
    title: 'Understanding Transformer Architecture: A Deep Dive',
    url: 'https://towardsdatascience.com/transformer-architecture-deep-dive',
    content: `<div>
      <p>The Transformer architecture has revolutionized natural language processing and machine learning. In this comprehensive guide, we'll explore its inner workings.</p>
      <h2>What Makes Transformers Special?</h2>
      <p>Unlike traditional RNNs, Transformers process sequences in parallel, leading to:</p>
      <ul>
        <li>Faster training times</li>
        <li>Better handling of long-range dependencies</li>
        <li>Improved parallelization</li>
      </ul>
      <h2>Self-Attention Mechanism</h2>
      <p>The core innovation of Transformers is the self-attention mechanism...</p>
      <code>
        attention_weights = softmax(Q @ K.T / sqrt(d_k))
        output = attention_weights @ V
      </code>
    </div>`,
    summary: 'Comprehensive guide exploring the Transformer architecture, self-attention mechanisms, and their revolutionary impact on ML.',
    author: 'Alex Thompson',
    published_at: '2025-01-25T14:20:00Z',
    guid: 'tds-transformer-architecture-guide',
    status: 'unread',
    reading_time_minutes: 12,
    word_count: 2800,
    tags: ['ml', 'transformers', 'tutorial'],
    created_at: '2025-01-25T14:25:00Z',
    enclosures: [],
    scraped_metadata: {
      original_selector: 'article',
      extraction_quality: 'high'
    },
    feed: {
      id: 'feed-4',
      title: 'Towards Data Science (Scraped)',
      favicon_url: undefined
    }
  },
  {
    id: 'entry-5',
    feed_id: 'feed-5',
    title: 'CSS Container Queries: The Future of Responsive Design',
    url: 'https://css-tricks.com/css-container-queries-future',
    content: `<div>
      <p>Container queries are finally here! After years of waiting, we can now write CSS that responds to the size of containers, not just the viewport.</p>
      <h2>What Are Container Queries?</h2>
      <p>Container queries allow you to apply styles based on the size of an element's container, enabling truly modular responsive design.</p>
      <pre><code>
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
      </code></pre>
      <h2>Browser Support</h2>
      <p>Container queries are now supported in all modern browsers...</p>
    </div>`,
    summary: 'Explore CSS container queries and how they enable truly modular responsive design patterns.',
    author: 'Chris Coyier',
    published_at: '2025-01-25T11:30:00Z',
    guid: 'css-tricks-container-queries-2025',
    status: 'read',
    reading_time_minutes: 7,
    word_count: 1350,
    tags: ['css', 'responsive', 'web-dev'],
    created_at: '2025-01-25T11:35:00Z',
    read_at: '2025-01-25T15:20:00Z',
    enclosures: [],
    feed: {
      id: 'feed-5',
      title: 'CSS-Tricks',
      favicon_url: 'https://css-tricks.com/favicon.ico'
    }
  },
  {
    id: 'entry-6',
    feed_id: 'feed-6',
    title: 'React Server Components: A Practical Guide',
    url: 'https://dev.to/react-server-components-guide',
    content: `<div>
      <p>React Server Components (RSC) are changing how we think about React applications. Let's dive into practical examples and best practices.</p>
      <h2>What Are Server Components?</h2>
      <p>Server Components render on the server and send the result to the client, reducing bundle size and improving performance.</p>
      <h2>Key Benefits:</h2>
      <ul>
        <li>Zero client-side JavaScript for server components</li>
        <li>Direct database access</li>
        <li>Better SEO and initial page load</li>
        <li>Automatic code splitting</li>
      </ul>
      <h2>Example Implementation:</h2>
      <pre><code>
// UserProfile.server.js
async function UserProfile({ userId }) {
  const user = await db.users.findById(userId);
  return <div>{user.name}</div>;
}
      </code></pre>
    </div>`,
    summary: 'Practical guide to React Server Components, covering benefits, implementation patterns, and best practices.',
    author: 'Maria Garcia',
    published_at: '2025-01-24T16:45:00Z',
    guid: 'dev-to-react-server-components',
    status: 'unread',
    reading_time_minutes: 9,
    word_count: 1800,
    tags: ['react', 'server-components'],
    created_at: '2025-01-24T16:50:00Z',
    enclosures: [],
    scraped_metadata: {
      original_selector: '.crayons-story',
      extraction_quality: 'high'
    },
    feed: {
      id: 'feed-6',
      title: 'Dev.to React Posts (Scraped)',
      favicon_url: undefined
    }
  },
  {
    id: 'entry-7',
    feed_id: 'feed-7',
    title: 'Design Systems at Scale: Lessons from Shopify',
    url: 'https://smashingmagazine.com/design-systems-scale-shopify',
    content: `<div>
      <p>Building and maintaining a design system for a company with thousands of developers is no small feat. Here's what we learned at Shopify.</p>
      <h2>The Challenge</h2>
      <p>With over 10,000 employees and hundreds of product teams, keeping design consistent across all touchpoints required a systematic approach.</p>
      <h2>Our Solution: Polaris Design System</h2>
      <p>Polaris provides:</p>
      <ul>
        <li>React components with built-in accessibility</li>
        <li>Design tokens for consistent styling</li>
        <li>Comprehensive documentation</li>
        <li>Automated testing and validation</li>
      </ul>
      <h2>Key Metrics</h2>
      <p>Since implementing Polaris:</p>
      <ul>
        <li>90% reduction in design inconsistencies</li>
        <li>50% faster feature development</li>
        <li>100% WCAG AA compliance</li>
      </ul>
    </div>`,
    summary: 'How Shopify built and scaled their Polaris design system across 10,000+ employees and hundreds of product teams.',
    author: 'Jennifer Lee',
    published_at: '2025-01-24T13:15:00Z',
    guid: 'smashing-magazine-design-systems-shopify',
    status: 'starred',
    reading_time_minutes: 11,
    word_count: 2200,
    tags: ['design-systems', 'shopify', 'scale'],
    created_at: '2025-01-24T13:20:00Z',
    starred_at: '2025-01-24T14:30:00Z',
    enclosures: [
      {
        url: 'https://smashingmagazine.com/polaris-design-system.pdf',
        type: 'application/pdf',
        length: 2500000
      }
    ],
    feed: {
      id: 'feed-7',
      title: 'Smashing Magazine',
      favicon_url: 'https://www.smashingmagazine.com/images/favicon/favicon.ico'
    }
  },
  // More entries for pagination testing
  {
    id: 'entry-8',
    feed_id: 'feed-1',
    title: 'Web3 Gaming: The Next Frontier or Overhyped Trend?',
    url: 'https://techcrunch.com/2025/01/24/web3-gaming-analysis',
    content: '<div><p>An in-depth analysis of the Web3 gaming market, examining real adoption metrics versus hype...</p></div>',
    summary: 'Critical analysis of Web3 gaming market trends, adoption metrics, and future prospects.',
    author: 'Mike Torres',
    published_at: '2025-01-24T10:30:00Z',
    guid: 'techcrunch-web3-gaming-2025',
    status: 'read',
    reading_time_minutes: 8,
    word_count: 1600,
    tags: ['web3', 'gaming'],
    created_at: '2025-01-24T10:35:00Z',
    read_at: '2025-01-24T11:15:00Z',
    enclosures: [],
    feed: {
      id: 'feed-1',
      title: 'TechCrunch',
      favicon_url: 'https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png'
    }
  },
  {
    id: 'entry-9',
    feed_id: 'feed-9',
    title: 'NASA Discovers Water Ice on Jupiter\'s Moon Europa',
    url: 'https://nasa.gov/news/europa-water-ice-discovery',
    content: '<div><p>New data from the Europa Clipper mission reveals extensive water ice deposits beneath the moon\'s surface...</p></div>',
    summary: 'Europa Clipper mission discovers extensive water ice deposits, raising possibilities for extraterrestrial life.',
    author: 'NASA Science Team',
    published_at: '2025-01-20T14:00:00Z',
    guid: 'nasa-europa-water-ice-discovery',
    status: 'unread',
    reading_time_minutes: 5,
    word_count: 950,
    tags: ['space', 'europa', 'astrobiology'],
    created_at: '2025-01-20T14:05:00Z',
    enclosures: [
      {
        url: 'https://nasa.gov/europa-images/europa-surface.jpg',
        type: 'image/jpeg',
        length: 5200000
      }
    ],
    feed: {
      id: 'feed-9',
      title: 'NASA Science News',
      favicon_url: 'https://www.nasa.gov/favicon.ico'
    }
  },
  {
    id: 'entry-10',
    feed_id: 'feed-5',
    title: 'Modern CSS Layout: Grid vs Flexbox in 2025',
    url: 'https://css-tricks.com/grid-vs-flexbox-2025',
    content: '<div><p>A comprehensive comparison of CSS Grid and Flexbox, when to use each, and how they complement each other...</p></div>',
    summary: 'Updated guide comparing CSS Grid and Flexbox, with practical examples for modern layout challenges.',
    author: 'Rachel Andrew',
    published_at: '2025-01-23T09:20:00Z',
    guid: 'css-tricks-grid-flexbox-comparison',
    status: 'archived',
    reading_time_minutes: 10,
    word_count: 2100,
    tags: ['css', 'layout', 'grid', 'flexbox'],
    created_at: '2025-01-23T09:25:00Z',
    enclosures: [],
    feed: {
      id: 'feed-5',
      title: 'CSS-Tricks',
      favicon_url: 'https://css-tricks.com/favicon.ico'
    }
  }
];

// Mock paginated entries response
export const mockEntriesResponse = {
  success: true,
  data: mockEntries.slice(0, 5), // First 5 entries
  pagination: {
    total: 1250,
    limit: 20,
    offset: 0,
    has_next: true,
    next_offset: 20
  }
};

// Mock unread entries
export const mockUnreadEntries = mockEntries.filter(entry => entry.status === 'unread');

// Mock starred entries
export const mockStarredEntries = mockEntries.filter(entry => entry.status === 'starred');

// Mock reading time stats
export const mockReadingTimeStats = {
  success: true,
  data: {
    total_reading_time_minutes: 2340,
    articles_read_today: 12,
    articles_read_this_week: 89,
    articles_read_this_month: 347,
    average_reading_time_minutes: 6.7,
    reading_streak_days: 23,
    most_read_categories: [
      { category_id: 'cat-3', title: 'Web Development', minutes: 680 },
      { category_id: 'cat-1', title: 'Technology', minutes: 520 },
      { category_id: 'cat-2', title: 'AI & Machine Learning', minutes: 430 }
    ]
  }
};