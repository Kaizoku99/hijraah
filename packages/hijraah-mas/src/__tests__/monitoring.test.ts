import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  agentPerformanceMonitor,
  tokenUsageAnalytics,
  agentSuccessMetrics,
  agentDebuggingInterface,
  abTestingFramework,
  monitoringDashboard
} from '../monitoring'

// Mock AI SDK functions
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn()
}))

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn()
}))

describe('MAS Monitoring System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AgentPerformanceMonitor', () => {
    it('should start and complete monitoring for an execution', async () => {
      const executionId = 'test_exec_1'
      const agentName = 'test_agent'
      const caseId = 'test_case_1'
      const modelUsed = 'gpt-4o'

      // Start monitoring
      agentPerformanceMonitor.startMonitoring(executionId, agentName, caseId, modelUsed)

      // Create step finish callback
      const callback = agentPerformanceMonitor.createStepFinishCallback(executionId)
      expect(callback).toBeDefined()

      // Simulate step completion
      if (callback) {
        callback({
          text: 'Test response',
          toolCalls: [],
          toolResults: [],
          finishReason: 'stop',
          usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 }
        })
      }

      // Complete monitoring
      const metrics = await agentPerformanceMonitor.completeMonitoring(
        executionId,
        true,
        { result: 'success' }
      )

      expect(metrics).toBeDefined()
      expect(metrics.agentName).toBe(agentName)
      expect(metrics.success).toBe(true)
      expect(metrics.tokenUsage.totalTokens).toBe(150)
    })

    it('should get real-time metrics', async () => {
      const metrics = await agentPerformanceMonitor.getRealTimeMetrics()
      
      expect(metrics).toBeDefined()
      expect(typeof metrics.activeExecutions).toBe('number')
      expect(typeof metrics.averageResponseTime).toBe('number')
      expect(typeof metrics.successRate).toBe('number')
    })
  })

  describe('TokenUsageAnalytics', () => {
    it('should track token usage and calculate costs', () => {
      const agentName = 'test_agent'
      const executionId = 'test_exec_1'
      const model = 'gpt-4o'
      const usage = { promptTokens: 100, completionTokens: 50, totalTokens: 150 }

      tokenUsageAnalytics.trackUsage(agentName, executionId, model, usage)

      const stats = tokenUsageAnalytics.getAgentUsageStats(agentName)
      expect(stats.totalTokens).toBe(150)
      expect(stats.executionCount).toBe(1)
      expect(stats.totalCost).toBeGreaterThan(0)
    })

    it('should get real-time usage metrics', () => {
      const metrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
      
      expect(metrics).toBeDefined()
      expect(typeof metrics.tokensPerMinute).toBe('number')
      expect(typeof metrics.costPerHour).toBe('number')
      expect(Array.isArray(metrics.topConsumers)).toBe(true)
      expect(Array.isArray(metrics.alerts)).toBe(true)
    })

    it('should set and check cost thresholds', () => {
      const agentName = 'test_agent'
      const threshold = 10.0

      tokenUsageAnalytics.setCostThreshold(agentName, threshold)
      
      // This would trigger threshold checking in real usage
      expect(() => {
        tokenUsageAnalytics.trackUsage(
          agentName,
          'test_exec',
          'gpt-4o',
          { promptTokens: 1000, completionTokens: 500, totalTokens: 1500 }
        )
      }).not.toThrow()
    })
  })

  describe('AgentSuccessMetrics', () => {
    it('should assess execution quality', async () => {
      const executionId = 'test_exec_1'
      const agentName = 'test_agent'
      const result = { analysis: 'Test analysis', confidence: 0.9 }
      const steps = []

      // Mock generateObject for quality assessment
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          scores: [
            { criterion: 'accuracy', score: 85, reasoning: 'Good accuracy', evidence: [] },
            { criterion: 'completeness', score: 90, reasoning: 'Complete analysis', evidence: [] }
          ]
        }
      })

      const assessment = await agentSuccessMetrics.assessExecutionQuality(
        executionId,
        agentName,
        result,
        steps
      )

      expect(assessment).toBeDefined()
      expect(assessment.executionId).toBe(executionId)
      expect(assessment.agentName).toBe(agentName)
      expect(assessment.overallScore).toBeGreaterThan(0)
    })

    it('should get real-time success metrics', () => {
      const metrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
      
      expect(metrics).toBeDefined()
      expect(typeof metrics.currentSuccessRate).toBe('number')
      expect(Array.isArray(metrics.activeIssues)).toBe(true)
      expect(Array.isArray(metrics.topPerformers)).toBe(true)
      expect(Array.isArray(metrics.underperformers)).toBe(true)
    })
  })

  describe('AgentDebuggingInterface', () => {
    it('should start and complete debugging session', async () => {
      const sessionId = 'test_session_1'
      const agentName = 'test_agent'
      const executionId = 'test_exec_1'

      // Start debugging session
      agentDebuggingInterface.startDebuggingSession(sessionId, agentName, executionId)

      // Create step inspection callback
      const callback = agentDebuggingInterface.createStepInspectionCallback(sessionId)
      expect(callback).toBeDefined()

      // Simulate step inspection
      if (callback) {
        callback({
          text: 'Test step',
          toolCalls: [],
          toolResults: [],
          finishReason: 'stop',
          usage: { promptTokens: 50, completionTokens: 25, totalTokens: 75 }
        })
      }

      // Complete debugging session
      const session = await agentDebuggingInterface.completeDebuggingSession(
        sessionId,
        { result: 'success' }
      )

      expect(session).toBeDefined()
      expect(session.sessionId).toBe(sessionId)
      expect(session.agentName).toBe(agentName)
      expect(session.steps.length).toBeGreaterThan(0)
    })

    it('should get real-time debugging data', () => {
      const sessionId = 'test_session_1'
      agentDebuggingInterface.startDebuggingSession(sessionId, 'test_agent', 'test_exec')

      const data = agentDebuggingInterface.getRealTimeDebuggingData(sessionId)
      
      expect(data).toBeDefined()
      if (data) {
        expect(typeof data.currentStep).toBe('number')
        expect(typeof data.executionTime).toBe('number')
        expect(Array.isArray(data.activeTools)).toBe(true)
      }
    })
  })

  describe('ABTestingFramework', () => {
    it('should create and manage A/B tests', async () => {
      const testConfig = await abTestingFramework.createABTest({
        testId: 'test_ab_1',
        name: 'Test A/B Test',
        description: 'Testing different models',
        agentType: 'test_agent',
        variants: [
          {
            id: 'variant_a',
            name: 'Variant A',
            model: 'gpt-4o',
            weight: 0.5
          },
          {
            id: 'variant_b',
            name: 'Variant B',
            model: 'gpt-4o-mini',
            weight: 0.5
          }
        ],
        metrics: ['duration', 'token_usage'],
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sampleSize: 100,
        confidenceLevel: 0.95
      })

      expect(testConfig).toBeDefined()
      expect(testConfig.testId).toBe('test_ab_1')
      expect(testConfig.status).toBe('draft')

      // Start the test
      await abTestingFramework.startABTest(testConfig.testId)

      // Create prepare step function
      const prepareStep = abTestingFramework.createPrepareStepForTesting(
        testConfig.testId,
        'test_exec_1'
      )
      expect(prepareStep).toBeDefined()

      // Record test result
      await abTestingFramework.recordTestResult(
        testConfig.testId,
        'variant_a',
        'test_exec_1',
        { duration: 1000, token_usage: 150 }
      )

      // Get test analysis
      const analysis = await abTestingFramework.getTestAnalysis(testConfig.testId)
      expect(analysis).toBeDefined()
      expect(analysis.sampleSize).toBe(1)
    })
  })

  describe('MonitoringDashboard', () => {
    it('should create dashboard configuration', async () => {
      const dashboard = await monitoringDashboard.createDashboard(
        'test_user',
        'Test Dashboard',
        [
          {
            id: 'test_widget',
            type: 'agent_performance_chart',
            position: { x: 0, y: 0, width: 6, height: 4 },
            config: {}
          }
        ]
      )

      expect(dashboard).toBeDefined()
      expect(dashboard.name).toBe('Test Dashboard')
      expect(dashboard.widgets.length).toBe(1)
    })

    it('should get real-time metrics', async () => {
      const metrics = await monitoringDashboard.getRealTimeMetrics()
      
      expect(metrics).toBeDefined()
      expect(typeof metrics.activeAgents).toBe('number')
      expect(typeof metrics.averageResponseTime).toBe('number')
      expect(typeof metrics.successRate).toBe('number')
      expect(metrics.systemHealth).toBeDefined()
    })

    it('should get system health status', async () => {
      const health = await monitoringDashboard.getSystemHealthStatus()
      
      expect(health).toBeDefined()
      expect(['healthy', 'warning', 'critical']).toContain(health.overall)
      expect(Array.isArray(health.components)).toBe(true)
      expect(Array.isArray(health.recommendations)).toBe(true)
    })
  })

  describe('Integration Tests', () => {
    it('should work together in a complete monitoring workflow', async () => {
      const executionId = 'integration_test_exec'
      const sessionId = 'integration_test_session'
      const agentName = 'integration_test_agent'
      const caseId = 'integration_test_case'

      // Start all monitoring
      agentPerformanceMonitor.startMonitoring(executionId, agentName, caseId, 'gpt-4o')
      agentDebuggingInterface.startDebuggingSession(sessionId, agentName, executionId)

      // Simulate step execution
      const performanceCallback = agentPerformanceMonitor.createStepFinishCallback(executionId)
      const debugCallback = agentDebuggingInterface.createStepInspectionCallback(sessionId)

      const stepData = {
        text: 'Integration test step',
        toolCalls: [],
        toolResults: [],
        finishReason: 'stop',
        usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 }
      }

      if (performanceCallback) performanceCallback(stepData)
      if (debugCallback) debugCallback(stepData)

      // Track token usage
      tokenUsageAnalytics.trackUsage(agentName, executionId, 'gpt-4o', stepData.usage)

      // Complete monitoring
      const performanceMetrics = await agentPerformanceMonitor.completeMonitoring(
        executionId,
        true,
        { result: 'integration test success' }
      )

      const debugSession = await agentDebuggingInterface.completeDebuggingSession(
        sessionId,
        { result: 'integration test success' }
      )

      // Assess quality
      const qualityAssessment = await agentSuccessMetrics.assessExecutionQuality(
        executionId,
        agentName,
        { result: 'integration test success' },
        debugSession.steps
      )

      // Verify all components worked
      expect(performanceMetrics).toBeDefined()
      expect(debugSession).toBeDefined()
      expect(qualityAssessment).toBeDefined()

      // Get dashboard data
      const dashboard = await monitoringDashboard.createDashboard(
        'integration_test_user',
        'Integration Test Dashboard',
        [
          {
            id: 'test_widget',
            type: 'real_time_metrics',
            position: { x: 0, y: 0, width: 12, height: 4 },
            config: {}
          }
        ]
      )

      const dashboardData = await monitoringDashboard.getDashboardData(dashboard.dashboardId)
      expect(dashboardData).toBeDefined()
      expect(dashboardData.widgets.length).toBe(1)
    })
  })
})