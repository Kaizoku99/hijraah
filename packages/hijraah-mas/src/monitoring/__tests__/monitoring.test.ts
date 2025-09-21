import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { AgentPerformanceDashboard } from '../agent-performance-dashboard'
import { TokenUsageAnalytics } from '../token-usage-analytics'
import { AgentSuccessMetrics } from '../agent-success-metrics'
import { AgentDebuggingTools } from '../agent-debugging-tools'
import { AgentABTesting } from '../agent-ab-testing'

// Mock Supabase client with proper method chaining
const createMockChain = () => {
  const chain = {
    select: vi.fn(() => chain),
    insert: vi.fn(() => chain),
    update: vi.fn(() => chain),
    upsert: vi.fn(() => chain),
    delete: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    gte: vi.fn(() => chain),
    lt: vi.fn(() => chain),
    order: vi.fn(() => chain),
    limit: vi.fn(() => chain),
    single: vi.fn(() => Promise.resolve({ data: null, error: null })),
    then: vi.fn(() => Promise.resolve({ data: [], error: null }))
  }
  return chain
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => createMockChain())
  }))
}))

// AI SDK is mocked globally in vitest.setup.ts

// Mock monitoring utils
vi.mock('../utils/monitoring', () => ({
  sendMetrics: vi.fn()
}))

describe('Agent Performance Dashboard', () => {
  let dashboard: AgentPerformanceDashboard

  beforeEach(() => {
    dashboard = new AgentPerformanceDashboard()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize dashboard', async () => {
    await expect(dashboard.initialize()).resolves.not.toThrow()
  })

  it('should create monitoring callback', () => {
    const callback = dashboard.createMonitoringCallback('test-agent', 'immigration')
    
    expect(callback).toHaveProperty('executionId')
    expect(callback).toHaveProperty('onStepFinish')
    expect(callback).toHaveProperty('onComplete')
    expect(callback).toHaveProperty('onError')
    expect(typeof callback.onStepFinish).toBe('function')
    expect(typeof callback.onComplete).toBe('function')
    expect(typeof callback.onError).toBe('function')
  })

  it('should handle step finish callback', () => {
    const callback = dashboard.createMonitoringCallback('test-agent', 'immigration')
    
    expect(() => {
      callback.onStepFinish({
        text: 'Test step',
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 }
      })
    }).not.toThrow()
  })

  it('should handle completion callback', () => {
    const callback = dashboard.createMonitoringCallback('test-agent', 'immigration')
    
    expect(() => {
      callback.onComplete(true, { result: 'success' })
    }).not.toThrow()
  })

  it('should handle error callback', () => {
    const callback = dashboard.createMonitoringCallback('test-agent', 'immigration')
    
    expect(() => {
      callback.onError(new Error('Test error'))
    }).not.toThrow()
  })

  it('should get real-time metrics', () => {
    const metrics = dashboard.getRealTimeMetrics()
    
    expect(metrics).toHaveProperty('activeExecutions')
    expect(metrics).toHaveProperty('executionsPerMinute')
    expect(metrics).toHaveProperty('averageResponseTime')
    expect(metrics).toHaveProperty('errorRate')
    expect(metrics).toHaveProperty('tokenUsageRate')
    expect(metrics).toHaveProperty('systemHealth')
  })

  it('should get dashboard data', async () => {
    const data = await dashboard.getDashboardData('24h')
    
    expect(data).toHaveProperty('overview')
    expect(data).toHaveProperty('agentMetrics')
    expect(data).toHaveProperty('recentExecutions')
    expect(data).toHaveProperty('tokenUsageTrends')
    expect(data).toHaveProperty('errorAnalysis')
    expect(data).toHaveProperty('performanceTrends')
  })
})

describe('Token Usage Analytics', () => {
  let analytics: TokenUsageAnalytics

  beforeEach(() => {
    analytics = new TokenUsageAnalytics()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should track token usage', async () => {
    const metrics = await analytics.trackTokenUsage(
      'test-agent',
      'test-execution',
      'gpt-4o',
      { promptTokens: 100, completionTokens: 50, totalTokens: 150 },
      'test-operation'
    )

    expect(metrics).toHaveProperty('agentId', 'test-agent')
    expect(metrics).toHaveProperty('executionId', 'test-execution')
    expect(metrics).toHaveProperty('model', 'gpt-4o')
    expect(metrics).toHaveProperty('totalTokens', 150)
    expect(metrics).toHaveProperty('cost')
    expect(typeof metrics.cost).toBe('number')
  })

  it('should get token usage analytics', async () => {
    const analytics_result = await analytics.getTokenUsageAnalytics('24h')
    
    expect(analytics_result).toHaveProperty('totalTokens')
    expect(analytics_result).toHaveProperty('totalCost')
    expect(analytics_result).toHaveProperty('usageByModel')
    expect(analytics_result).toHaveProperty('usageByAgent')
    expect(analytics_result).toHaveProperty('usageByOperation')
    expect(analytics_result).toHaveProperty('trends')
    expect(analytics_result).toHaveProperty('costOptimizationRecommendations')
  })

  it('should get budget status', async () => {
    const status = await analytics.getBudgetStatus()
    
    expect(status).toHaveProperty('currentUsage')
    expect(status).toHaveProperty('budgetLimits')
    expect(status).toHaveProperty('utilizationPercentage')
    expect(status).toHaveProperty('alerts')
    expect(status).toHaveProperty('projectedMonthlySpend')
  })

  it('should set budget limits', async () => {
    await expect(analytics.setBudgetLimits({
      daily: 200,
      monthly: 5000
    })).resolves.not.toThrow()
  })
})

describe('Agent Success Metrics Analyzer', () => {
  let analyzer: AgentSuccessMetrics

  beforeEach(() => {
    analyzer = new AgentSuccessMetrics()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should calculate agent success metrics', async () => {
    const metrics = await analyzer.calculateAgentSuccessMetrics('test-agent', '24h')
    
    expect(metrics).toHaveProperty('agentId', 'test-agent')
    expect(metrics).toHaveProperty('agentType')
    expect(metrics).toHaveProperty('totalExecutions')
    expect(metrics).toHaveProperty('successfulExecutions')
    expect(metrics).toHaveProperty('failedExecutions')
    expect(metrics).toHaveProperty('averageDuration')
    expect(metrics).toHaveProperty('averageTokenUsage')
    expect(metrics).toHaveProperty('averageQualityScore')
    expect(metrics).toHaveProperty('successRate')
    expect(metrics).toHaveProperty('errorRate')
    expect(metrics).toHaveProperty('lastUpdated')
  })

  it('should get all agent success metrics', async () => {
    const allMetrics = await analyzer.getAllAgentSuccessMetrics('24h')
    
    expect(Array.isArray(allMetrics)).toBe(true)
  })

  it('should analyze step performance', async () => {
    const analysis = await analyzer.analyzeStepPerformance('test-execution')
    
    expect(analysis).toHaveProperty('stepAnalysis')
    expect(analysis).toHaveProperty('overallQuality')
    expect(analysis).toHaveProperty('bottlenecks')
    expect(analysis).toHaveProperty('optimizationOpportunities')
    expect(Array.isArray(analysis.stepAnalysis)).toBe(true)
    expect(Array.isArray(analysis.bottlenecks)).toBe(true)
    expect(Array.isArray(analysis.optimizationOpportunities)).toBe(true)
  })

  it('should generate benchmarking report', async () => {
    const report = await analyzer.generateBenchmarkingReport('test-agent')
    
    expect(report).toHaveProperty('agentMetrics')
    expect(report).toHaveProperty('benchmarkComparison')
    expect(report).toHaveProperty('recommendations')
    expect(Array.isArray(report.recommendations)).toBe(true)
  })

  it('should get quality trends', async () => {
    const trends = await analyzer.getQualityTrends('test-agent', '30d')
    
    expect(trends).toHaveProperty('trends')
    expect(trends).toHaveProperty('trendAnalysis')
    expect(Array.isArray(trends.trends)).toBe(true)
    expect(trends.trendAnalysis).toHaveProperty('successRateTrend')
    expect(trends.trendAnalysis).toHaveProperty('qualityTrend')
    expect(trends.trendAnalysis).toHaveProperty('performanceTrend')
    expect(trends.trendAnalysis).toHaveProperty('insights')
  })
})

describe('Agent Debugging Tools', () => {
  let debugTools: AgentDebuggingTools

  beforeEach(() => {
    debugTools = new AgentDebuggingTools()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create debug wrapper', () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    
    expect(wrapper).toHaveProperty('onStepStart')
    expect(wrapper).toHaveProperty('onStepFinish')
    expect(wrapper).toHaveProperty('onToolCall')
    expect(wrapper).toHaveProperty('onToolResult')
    expect(wrapper).toHaveProperty('onError')
    expect(wrapper).toHaveProperty('onWarning')
    expect(wrapper).toHaveProperty('getTrace')
    expect(wrapper).toHaveProperty('finalize')
    expect(typeof wrapper.onStepStart).toBe('function')
    expect(typeof wrapper.onStepFinish).toBe('function')
    expect(typeof wrapper.getTrace).toBe('function')
  })

  it('should record step start', () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    
    expect(() => {
      wrapper.onStepStart(1, { input: 'test' })
    }).not.toThrow()
  })

  it('should record step finish', () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    
    expect(() => {
      wrapper.onStepFinish({
        text: 'Test step',
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 }
      })
    }).not.toThrow()
  })

  it('should record tool call', () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    
    expect(() => {
      wrapper.onToolCall('test-tool', { param: 'value' })
    }).not.toThrow()
  })

  it('should record error', () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    
    expect(() => {
      wrapper.onError(new Error('Test error'), { context: 'test' })
    }).not.toThrow()
  })

  it('should get debug trace', async () => {
    const wrapper = debugTools.createDebugWrapper('test-agent', 'test-execution')
    const trace = await wrapper.getTrace()
    
    expect(trace).toHaveProperty('executionId', 'test-execution')
    expect(trace).toHaveProperty('agentId', 'test-agent')
    expect(trace).toHaveProperty('steps')
    expect(trace).toHaveProperty('errors')
    expect(trace).toHaveProperty('warnings')
    expect(trace).toHaveProperty('performance')
    expect(trace).toHaveProperty('metadata')
  })

  it('should set debug mode', () => {
    expect(() => {
      debugTools.setDebugMode(true)
    }).not.toThrow()
    
    expect(() => {
      debugTools.setDebugMode(false)
    }).not.toThrow()
  })

  it('should clear old traces', async () => {
    await expect(debugTools.clearOldTraces(24)).resolves.not.toThrow()
  })
})

describe('Agent A/B Testing', () => {
  let abTesting: AgentABTesting

  beforeEach(() => {
    abTesting = new AgentABTesting()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create A/B test', async () => {
    const config = await abTesting.createABTest({
      name: 'Test A/B',
      description: 'Testing different models',
      variants: [
        {
          name: 'GPT-4o',
          description: 'Using GPT-4o model',
          model: 'gpt-4o'
        },
        {
          name: 'GPT-4o-mini',
          description: 'Using GPT-4o-mini model',
          model: 'gpt-4o-mini'
        }
      ]
    })

    expect(config).toHaveProperty('testId')
    expect(config).toHaveProperty('name', 'Test A/B')
    expect(config).toHaveProperty('description', 'Testing different models')
    expect(config).toHaveProperty('variants')
    expect(config).toHaveProperty('trafficSplit')
    expect(config).toHaveProperty('status', 'running')
    expect(config.variants).toHaveLength(2)
  })

  it('should execute with A/B test', async () => {
    const config = await abTesting.createABTest({
      name: 'Test A/B',
      description: 'Testing different models',
      variants: [
        {
          name: 'GPT-4o',
          description: 'Using GPT-4o model',
          model: 'gpt-4o'
        }
      ]
    })

    const mockAgentFunction = vi.fn().mockResolvedValue({ result: 'success' })
    
    const result = await abTesting.executeWithABTest(
      config.testId,
      mockAgentFunction,
      { input: 'test' }
    )

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('variantId')
    expect(result).toHaveProperty('metrics')
    expect(result).toHaveProperty('executionId')
    expect(mockAgentFunction).toHaveBeenCalled()
  })

  it('should get test results', async () => {
    const config = await abTesting.createABTest({
      name: 'Test A/B',
      description: 'Testing different models',
      variants: [
        {
          name: 'GPT-4o',
          description: 'Using GPT-4o model',
          model: 'gpt-4o'
        }
      ]
    })

    const results = await abTesting.getTestResults(config.testId)
    
    expect(results).toHaveProperty('configuration')
    expect(results).toHaveProperty('results')
    expect(results).toHaveProperty('insights')
    expect(results).toHaveProperty('recommendations')
    expect(results.results).toHaveProperty('totalExecutions')
    expect(results.results).toHaveProperty('variantPerformance')
    expect(Array.isArray(results.insights)).toBe(true)
    expect(Array.isArray(results.recommendations)).toBe(true)
  })

  it('should compare models', async () => {
    const comparison = await abTesting.compareModels(
      ['gpt-4o', 'gpt-4o-mini'],
      {
        name: 'Test Task',
        systemPrompt: 'You are a helpful assistant',
        testCases: [
          {
            input: { question: 'What is 2+2?' },
            expectedOutput: { answer: '4' },
            evaluationCriteria: ['accuracy', 'clarity']
          }
        ]
      }
    )

    expect(comparison).toHaveProperty('modelComparison')
    expect(comparison).toHaveProperty('bestModel')
    expect(comparison).toHaveProperty('detailedResults')
    expect(Array.isArray(comparison.modelComparison)).toBe(true)
    expect(comparison.bestModel).toHaveProperty('model')
    expect(comparison.bestModel).toHaveProperty('score')
    expect(comparison.bestModel).toHaveProperty('reasoning')
  })

  it('should stop test', async () => {
    const config = await abTesting.createABTest({
      name: 'Test A/B',
      description: 'Testing different models',
      variants: [
        {
          name: 'GPT-4o',
          description: 'Using GPT-4o model',
          model: 'gpt-4o'
        }
      ]
    })

    await expect(abTesting.stopTest(config.testId, 'Test completed')).resolves.not.toThrow()
  })

  it('should get active tests', () => {
    const activeTests = abTesting.getActiveTests()
    expect(Array.isArray(activeTests)).toBe(true)
  })
})

describe('Integration Tests', () => {
  it('should work together for comprehensive monitoring', async () => {
    const dashboard = new AgentPerformanceDashboard()
    const analytics = new TokenUsageAnalytics()
    const successMetrics = new AgentSuccessMetrics()
    const debugTools = new AgentDebuggingTools()

    // Initialize dashboard
    await dashboard.initialize()

    // Create monitoring callbacks
    const performanceCallback = dashboard.createMonitoringCallback('test-agent', 'immigration')
    const debugWrapper = debugTools.createDebugWrapper('test-agent', performanceCallback.executionId)

    // Simulate agent execution
    debugWrapper.onStepStart(1, { input: 'test immigration case' })
    
    performanceCallback.onStepFinish({
      text: 'Processing immigration case...',
      toolCalls: [{ id: '1', name: 'analyzeDocument', parameters: {} }],
      toolResults: [{ id: '1', result: { analysis: 'complete' } }],
      finishReason: 'completed',
      usage: { promptTokens: 200, completionTokens: 100, totalTokens: 300 }
    })

    // Track token usage
    await analytics.trackTokenUsage(
      'test-agent',
      performanceCallback.executionId,
      'gpt-4o',
      { promptTokens: 200, completionTokens: 100, totalTokens: 300 },
      'immigration_analysis'
    )

    // Complete execution
    performanceCallback.onComplete(true, { decision: 'approved' })
    await debugWrapper.finalize()

    // Get comprehensive metrics
    const dashboardData = await dashboard.getDashboardData('1h')
    const tokenAnalytics = await analytics.getTokenUsageAnalytics('1h')
    const agentMetrics = await successMetrics.calculateAgentSuccessMetrics('test-agent', '1h')
    const debugTrace = await debugWrapper.getTrace()

    // Verify all components are working
    expect(dashboardData.overview.totalExecutions).toBeGreaterThanOrEqual(0)
    expect(tokenAnalytics.totalTokens).toBeGreaterThanOrEqual(0)
    expect(agentMetrics.agentId).toBe('test-agent')
    expect(debugTrace).toHaveProperty('executionId')
  })
})