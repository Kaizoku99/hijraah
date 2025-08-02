import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  agentPerformanceMonitor,
  tokenUsageAnalytics,
  agentSuccessMetrics,
  agentDebuggingInterface,
  abTestingFramework,
  monitoringDashboard
} from '../monitoring'

/**
 * Example showing how to integrate the comprehensive monitoring system with AI SDK v5 agents
 */

// Example 1: Agent with comprehensive monitoring
export async function exampleAgentWithMonitoring() {
  const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const agentName = 'document_processing'
  const caseId = 'case_123'

  // 1. Start monitoring
  agentPerformanceMonitor.startMonitoring(executionId, agentName, caseId, 'gpt-4o')
  agentDebuggingInterface.startDebuggingSession(sessionId, agentName, executionId)

  try {
    // 2. Execute agent with monitoring callbacks
    const result = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        analysis: z.string(),
        confidence: z.number(),
        recommendations: z.array(z.string())
      }),
      system: 'You are an immigration document processing specialist.',
      prompt: 'Analyze the uploaded immigration documents for completeness and accuracy.',
      
      // AI SDK v5 monitoring integration
      onStepFinish: (stepData) => {
        // Performance monitoring
        const performanceCallback = agentPerformanceMonitor.createStepFinishCallback(executionId)
        if (performanceCallback) performanceCallback(stepData)

        // Token usage tracking
        tokenUsageAnalytics.trackUsage(
          agentName,
          executionId,
          'gpt-4o',
          stepData.usage,
          new Date()
        )

        // Debugging interface
        const debugCallback = agentDebuggingInterface.createStepInspectionCallback(sessionId)
        if (debugCallback) debugCallback(stepData)
      }
    })

    // 3. Complete monitoring
    const performanceMetrics = await agentPerformanceMonitor.completeMonitoring(
      executionId,
      true,
      result
    )

    const debuggingSession = await agentDebuggingInterface.completeDebuggingSession(
      sessionId,
      result
    )

    // 4. Assess quality
    const qualityAssessment = await agentSuccessMetrics.assessExecutionQuality(
      executionId,
      agentName,
      result,
      debuggingSession.steps
    )

    console.log('Agent execution completed with monitoring:', {
      performanceMetrics,
      qualityAssessment,
      result
    })

    return result

  } catch (error) {
    // Handle errors with monitoring
    await agentPerformanceMonitor.completeMonitoring(
      executionId,
      false,
      undefined,
      error instanceof Error ? error.message : 'Unknown error'
    )

    await agentDebuggingInterface.completeDebuggingSession(
      sessionId,
      undefined,
      error instanceof Error ? error : new Error('Unknown error')
    )

    throw error
  }
}

// Example 2: A/B testing with different models
export async function exampleABTestingWithModels() {
  // Create A/B test configuration
  const testConfig = await abTestingFramework.createABTest({
    testId: 'model_comparison_test_1',
    name: 'GPT-4o vs GPT-4o-mini Performance Test',
    description: 'Compare performance and cost efficiency between GPT-4o and GPT-4o-mini for document analysis',
    agentType: 'document_processing',
    variants: [
      {
        id: 'variant_a',
        name: 'GPT-4o High Performance',
        model: 'gpt-4o',
        systemPrompt: 'You are an expert immigration document analyst. Provide detailed, accurate analysis.',
        temperature: 0.1,
        maxTokens: 2000,
        tools: ['document_analysis', 'text_extraction'],
        weight: 0.5
      },
      {
        id: 'variant_b',
        name: 'GPT-4o-mini Cost Efficient',
        model: 'gpt-4o-mini',
        systemPrompt: 'You are an immigration document analyst. Provide concise, accurate analysis.',
        temperature: 0.2,
        maxTokens: 1000,
        tools: ['document_analysis', 'text_extraction'],
        weight: 0.5
      }
    ],
    metrics: ['duration', 'token_usage', 'quality_score', 'cost_efficiency'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    sampleSize: 100,
    confidenceLevel: 0.95
  })

  // Start the test
  await abTestingFramework.startABTest(testConfig.testId)

  // Example execution with A/B testing
  const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const result = await generateText({
    model: openai('gpt-4o'), // This will be overridden by A/B test
    system: 'Default system prompt', // This will be overridden by A/B test
    prompt: 'Analyze this immigration document for completeness.',
    
    // A/B testing integration
    experimental_prepareStep: abTestingFramework.createPrepareStepForTesting(
      testConfig.testId,
      executionId
    ),
    
    onStepFinish: async (stepData) => {
      // Record metrics for A/B test
      const metrics = {
        duration: 1500, // Would be measured
        token_usage: stepData.usage.totalTokens,
        quality_score: 85, // Would be calculated
        cost_efficiency: stepData.usage.totalTokens * 0.00003 // Cost calculation
      }

      // This would be determined by the variant selection
      const variantId = 'variant_a' // Would be tracked from prepareStep
      
      await abTestingFramework.recordTestResult(
        testConfig.testId,
        variantId,
        executionId,
        metrics
      )
    }
  })

  return result
}

// Example 3: Comprehensive dashboard setup
export async function exampleDashboardSetup() {
  // Create a comprehensive monitoring dashboard
  const dashboard = await monitoringDashboard.createDashboard(
    'user_123',
    'Immigration MAS Monitoring Dashboard',
    [
      {
        id: 'performance_chart',
        type: 'agent_performance_chart',
        position: { x: 0, y: 0, width: 6, height: 4 },
        config: {
          agentTypes: ['document_processing', 'policy_analysis', 'case_decision'],
          timeRange: '24h'
        },
        refreshInterval: 30
      },
      {
        id: 'token_usage',
        type: 'token_usage_chart',
        position: { x: 6, y: 0, width: 6, height: 4 },
        config: {
          showCostBreakdown: true,
          showTrends: true
        },
        refreshInterval: 60
      },
      {
        id: 'success_rate',
        type: 'success_rate_gauge',
        position: { x: 0, y: 4, width: 3, height: 3 },
        config: {
          thresholds: { good: 90, warning: 75, critical: 60 }
        },
        refreshInterval: 30
      },
      {
        id: 'cost_analysis',
        type: 'cost_analysis_chart',
        position: { x: 3, y: 4, width: 3, height: 3 },
        config: {
          showModelBreakdown: true,
          showOptimizationSuggestions: true
        },
        refreshInterval: 300
      },
      {
        id: 'quality_metrics',
        type: 'quality_metrics_chart',
        position: { x: 6, y: 4, width: 6, height: 3 },
        config: {
          showTrends: true,
          showBenchmarks: true
        },
        refreshInterval: 60
      },
      {
        id: 'ab_tests',
        type: 'ab_test_results',
        position: { x: 0, y: 7, width: 6, height: 3 },
        config: {
          showActiveOnly: true,
          maxResults: 5
        },
        refreshInterval: 120
      },
      {
        id: 'error_logs',
        type: 'error_log_table',
        position: { x: 6, y: 7, width: 6, height: 3 },
        config: {
          maxRows: 10,
          severityFilter: ['medium', 'high']
        },
        refreshInterval: 30
      },
      {
        id: 'realtime_metrics',
        type: 'real_time_metrics',
        position: { x: 0, y: 10, width: 12, height: 2 },
        config: {
          showSystemHealth: true,
          showActiveAgents: true
        },
        refreshInterval: 10
      }
    ],
    {
      agentTypes: ['document_processing', 'policy_analysis', 'case_decision'],
      timeRange: {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date()
      },
      successOnly: false
    }
  )

  // Start real-time metrics collection
  monitoringDashboard.startRealTimeMetrics(30000) // Update every 30 seconds

  // Get dashboard data
  const dashboardData = await monitoringDashboard.getDashboardData(dashboard.dashboardId)

  console.log('Dashboard created:', {
    config: dashboard,
    data: dashboardData
  })

  return dashboard
}

// Example 4: Performance optimization workflow
export async function examplePerformanceOptimization() {
  const agentType = 'document_processing'
  const timeRange = {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    end: new Date()
  }

  // 1. Get performance metrics
  const performanceMetrics = await agentPerformanceMonitor.getAgentMetrics(agentType, timeRange)
  console.log('Performance Metrics:', performanceMetrics)

  // 2. Get cost optimization recommendations
  const costOptimization = await tokenUsageAnalytics.getOptimizationRecommendations(
    agentType,
    timeRange
  )
  console.log('Cost Optimization:', costOptimization)

  // 3. Get success metrics and quality analysis
  const successMetrics = await agentSuccessMetrics.getSuccessMetrics(agentType, timeRange)
  console.log('Success Metrics:', successMetrics)

  // 4. Generate comprehensive monitoring report
  const monitoringReport = await monitoringDashboard.generateMonitoringReport(
    timeRange,
    [agentType]
  )
  console.log('Monitoring Report:', monitoringReport)

  // 5. Get system health status
  const healthStatus = await monitoringDashboard.getSystemHealthStatus()
  console.log('System Health:', healthStatus)

  return {
    performanceMetrics,
    costOptimization,
    successMetrics,
    monitoringReport,
    healthStatus
  }
}

// Example 5: Real-time monitoring alerts
export async function exampleRealTimeMonitoring() {
  // Set up cost thresholds
  tokenUsageAnalytics.setCostThreshold('document_processing', 15.0) // $15/hour
  tokenUsageAnalytics.setCostThreshold('policy_analysis', 20.0) // $20/hour

  // Set up performance benchmarks
  await agentPerformanceMonitor.setBenchmark(
    'document_processing',
    'immigration_case',
    {
      benchmarkName: 'Document Processing Benchmark',
      expectedDuration: 5000, // 5 seconds
      expectedTokenUsage: 1500,
      expectedSuccessRate: 0.95,
      qualityThreshold: 85
    }
  )

  // Get real-time metrics
  const realTimeMetrics = await monitoringDashboard.getRealTimeMetrics()
  console.log('Real-time Metrics:', realTimeMetrics)

  // Get real-time success metrics
  const realTimeSuccess = agentSuccessMetrics.getRealTimeSuccessMetrics()
  console.log('Real-time Success Metrics:', realTimeSuccess)

  // Get real-time usage metrics
  const realTimeUsage = tokenUsageAnalytics.getRealTimeUsageMetrics()
  console.log('Real-time Usage Metrics:', realTimeUsage)

  return {
    realTimeMetrics,
    realTimeSuccess,
    realTimeUsage
  }
}

// Example usage
export async function runMonitoringExamples() {
  console.log('Running MAS Monitoring Examples...')

  try {
    // Example 1: Basic agent with monitoring
    console.log('\n1. Agent with Comprehensive Monitoring:')
    await exampleAgentWithMonitoring()

    // Example 2: A/B testing
    console.log('\n2. A/B Testing with Different Models:')
    await exampleABTestingWithModels()

    // Example 3: Dashboard setup
    console.log('\n3. Comprehensive Dashboard Setup:')
    await exampleDashboardSetup()

    // Example 4: Performance optimization
    console.log('\n4. Performance Optimization Workflow:')
    await examplePerformanceOptimization()

    // Example 5: Real-time monitoring
    console.log('\n5. Real-time Monitoring and Alerts:')
    await exampleRealTimeMonitoring()

    console.log('\nAll monitoring examples completed successfully!')

  } catch (error) {
    console.error('Error running monitoring examples:', error)
  }
}

// Export for testing
export {
  exampleAgentWithMonitoring,
  exampleABTestingWithModels,
  exampleDashboardSetup,
  examplePerformanceOptimization,
  exampleRealTimeMonitoring
}