/**
 * Test Setup Configuration
 * 
 * Global test setup for vitest including environment variables
 * and mock configurations.
 */

import { vi } from 'vitest';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.FIRECRAWL_API_KEY = 'test-firecrawl-key';

// Mock external dependencies that aren't available in test environment
vi.mock('postgres', () => {
  const mockClient = {
    query: vi.fn(),
    end: vi.fn(),
  };
  
  const postgres = vi.fn(() => mockClient);
  postgres.prototype = mockClient;
  
  // Add template literal support
  Object.assign(postgres, mockClient);
  
  return {
    default: postgres,
  };
});

// Mock Trigger.dev SDK
vi.mock('@trigger.dev/sdk/v3', () => ({
  task: vi.fn((config) => ({
    id: config.id,
    run: config.run,
  })),
  triggerAndWait: vi.fn(),
}));

// Mock AI SDK
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
}));

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => 'gpt-4o'),
}));

// Mock Drizzle ORM for tests
vi.mock('../db/connection', () => {
  const mockDb = {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([])),
        })),
        limit: vi.fn(() => Promise.resolve([])),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(() => Promise.resolve([{
          id: 'test-id',
          name: 'test-entity',
          type: 'test-type',
          confidence: 0.9,
          properties: {},
          sources: ['test'],
          createdAt: new Date(),
          updatedAt: new Date(),
        }])),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn(() => Promise.resolve([{
            id: 'test-id',
            name: 'test-entity',
            type: 'test-type',
            confidence: 0.95,
            properties: {},
            sources: ['test'],
            createdAt: new Date(),
            updatedAt: new Date(),
          }])),
        })),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn(() => Promise.resolve()),
    })),
  };

  return {
    db: mockDb,
    checkDatabaseConnection: vi.fn(() => Promise.resolve(true)),
    closeDatabaseConnection: vi.fn(() => Promise.resolve()),
  };
});