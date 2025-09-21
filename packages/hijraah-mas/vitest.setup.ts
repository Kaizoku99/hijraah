import { vi } from 'vitest'

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_SERVICE_KEY = 'test-service-key'
process.env.OPENAI_API_KEY = 'test-openai-key'

// Mock AI SDK globally
vi.mock('ai', () => ({
  generateObject: vi.fn(() => Promise.resolve({
    object: {
      recommendations: ['Test recommendation'],
      insights: ['Test insight'],
      score: 0.8,
      reasoning: 'Test reasoning',
      activeSources: 5,
      recentChanges: 2,
      pendingReviews: 1,
      systemHealth: 'healthy',
      details: {
        lastSuccessfulCheck: new Date().toISOString(),
        failedSources: [],
        averageResponseTime: 150
      }
    }
  })),
  generateText: vi.fn(() => Promise.resolve({
    text: 'Test generated text'
  })),
  tool: vi.fn((config) => ({
    description: config.description,
    inputSchema: config.inputSchema,
    execute: config.execute || vi.fn()
  }))
}))

// Mock OpenAI SDK
vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => 'mocked-model')
}))