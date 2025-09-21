import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentExecutionMetrics, 
  StepMetrics, 
  PerformanceBenchmark,
  QualityAssessment,
  AgentExecutionMetricsSchema,
  StepMetricsSchema,
  PerformanceBenchmarkSchema,
  QualityAssessmentSchema
} from './types'
import { AgentExecution, AgentStep, TokenUsage } from '../types'
import { sendMetrics, trackAgentExecution } from '../utils/monitoring'
import { logAgentExecution } from '../utils/supabase-integration'

/**
 * Comprehensive agent performance monitoring using AI SDK v5's onStepFinish callbacks
 */
export class AgentPerformanceMonitor {
  private benchmarks: Map<string, PerformanceBenchmark> = new Map()
  private activeExecutions: Map<string, {
    startTime: Date
    metrics: Partial<AgentExecutionMetrics>
    steps: StepMetrics[]
  }> = new Map()

  /**
   * Initialize monitoring for an agent execution
   */
  startMonitoring(
    executionId: string,
    agentName: string,
    caseId: string,
    modelUsed: string
  ): void {
    this.activeExecutions.set(executionId, {
      startTime: new Date(),
      metrics: {
        agentName,
        executionId,
        caseId,
        modelUsed,
        startTime: new Date(),
        stepCount: 0,
        tokenUsage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
          cost: 0
        },
        toolsUsed: []
      },
      steps: []
    })
  }

  /**
   * Create onStepFinish callback for AI SDK v5 integration
   */
  createStepFinishCallback(executionId: string) {
    return ({ text, toolCalls, toolResults, finishReason, usage, stepNumber }: {
      text: string
      toolCalls: any[]
      toolResults: any[]
      finishReason: string
      usage: TokenUsage
      stepNumber?: number
    }) => {
      const execution = this.activeExecutions.get(executionId)
      if (!execution) return

      // Update step metrics
      const stepMetrics: StepMetrics = {
        stepNumber: stepNumber || execution.steps.length + 1,
        stepType: this.determineStepType(text, toolCalls),
        duration: 0, // Will be calculated
        tokenUsage: usage,
        toolCalls: toolCalls.map(call => ({
          toolName: call.toolName || 'unknown',
          duration: 0, // Would be measured in production
          success: true, // Would be determined from results
          errorMessage: undefined
        })),
        confidence: this.calculateStepConfidence(text, toolCalls, toolResults),
        qualityIndicators: this.assessStepQuality(text, toolCalls, toolResults)
      }

      execution.steps.push(stepMetrics)

      // Update execution metrics
      execution.metrics.stepCount = execution.steps.length
      execution.metrics.tokenUsage!.promptTokens = (execution.metrics.tokenUsage!.promptTokens || 0) + (usage.promptTokens || 0)
      execution.metrics.tokenUsage!.completionTokens = (execution.metrics.tokenUsage!.completionTokens || 0) + (usage.completionTokens || 0)
      execution.metrics.tokenUsage!.totalTokens = (execution.metrics.tokenUsage!.totalTokens || 0) + (usage.totalTokens || 0)

      // Track unique tools used
      const toolsInStep = toolCalls.map(call => call.toolName || 'unknown')
      const currentTools = execution.metrics.toolsUsed || []
      execution.metrics.toolsUsed = [...new Set([...currentTools, ...toolsInStep])]

      // Send real-time metrics
      this.sendRealTimeStepMetrics(executionId, stepMetrics)
    }
  }

  /**
   * Complete monitoring for an execution
   */
  async completeMonitoring(
    executionId: string,
    success: boolean,
    result?: any,
    errorMessage?: string
  ): Promise<AgentExecutionMetrics> {
    const execution = this.activeExecutions.get(executionId)
    if (!execution) {
      throw new Error(`No active monitoring found for execution ${executionId}`)
    }

    const endTime = new Date()
    const duration = endTime.getTime() - execution.startTime.getTime()

    // Complete the metrics
    const completeMetrics: AgentExecutionMetrics = {
      ...execution.metrics,
      endTime,
      duration,
      success,
      errorMessage,
      qualityScore: await this.calculateQualityScore(execution.steps, result),
      tokenUsage: {
        ...execution.metrics.tokenUsage!,
        cost: this.calculateCost(execution.metrics.tokenUsage!, execution.metrics.modelUsed!)
      }
    } as AgentExecutionMetrics

    // Validate metrics
    const validatedMetrics = AgentExecutionMetricsSchema.parse(completeMetrics)

    // Store metrics
    await this.storeMetrics(validatedMetrics)

    // Check against benchmarks
    await this.checkBenchmarks(validatedMetrics)

    // Generate performance insights
    await this.generatePerformanceInsights(validatedMetrics, execution.steps)

    // Clean up
    this.activeExecutions.delete(executionId)

    return validatedMetrics
  }

  /**
   * Set performance benchmarks for agent types
   */
  async setBenchmark(
    agentType: string,
    taskType: string,
    benchmark: Omit<PerformanceBenchmark, 'agentType' | 'taskType' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const fullBenchmark: PerformanceBenchmark = {
      agentType,
      taskType,
      ...benchmark,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const validatedBenchmark = PerformanceBenchmarkSchema.parse(fullBenchmark)
    const key = `${agentType}:${taskType}`
    this.benchmarks.set(key, validatedBenchmark)

    // Store in database
    await this.storeBenchmark(validatedBenchmark)
  }

  /**
   * Get performance metrics for an agent type
   */
  async getAgentMetrics(
    agentType: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<{
    totalExecutions: number
    successRate: number
    averageDuration: number
    averageTokenUsage: number
    averageQualityScore: number
    costEfficiency: number
    trendAnalysis: {
      performanceTrend: 'improving' | 'declining' | 'stable'
      recommendations: string[]
    }
  }> {
    // This would query the database for stored metrics
    // For now, returning mock data structure
    const metrics = await this.queryMetricsFromDatabase(agentType, timeRange)
    
    return {
      totalExecutions: metrics.length,
      successRate: metrics.filter(m => m.success).length / metrics.length,
      averageDuration: metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length,
      averageTokenUsage: metrics.reduce((sum, m) => sum + (m.tokenUsage.totalTokens || 0), 0) / metrics.length,
      averageQualityScore: metrics.reduce((sum, m) => sum + (m.qualityScore || 0), 0) / metrics.length,
      costEfficiency: this.calculateCostEfficiency(metrics),
      trendAnalysis: await this.analyzeTrends(metrics)
    }
  }

  /**
   * Generate comprehensive performance report
   */
  async generatePerformanceReport(
    agentType: string,
    timeRange: { start: Date; end: Date }
  ): Promise<{
    summary: string
    metrics: any
    recommendations: string[]
    charts: any[]
  }> {
    const metrics = await this.getAgentMetrics(agentType, timeRange)
    
    const { text: summary } = await generateText({
      model: openai('gpt-4o'),
      system: `You are an AI performance analyst. Generate comprehensive performance reports for multi-agent systems.
      
      Focus on:
      - Performance trends and patterns
      - Cost efficiency analysis
      - Quality assessment
      - Actionable recommendations
      - Comparative analysis against benchmarks`,
      prompt: `Generate a performance report for ${agentType} agent:
      
      Metrics: ${JSON.stringify(metrics, null, 2)}
      Time Range: ${timeRange.start.toISOString()} to ${timeRange.end.toISOString()}
      
      Provide detailed analysis with specific recommendations for improvement.`
    })

    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        recommendations: z.array(z.object({
          category: z.enum(['performance', 'cost', 'quality', 'reliability']),
          priority: z.enum(['high', 'medium', 'low']),
          recommendation: z.string(),
          expectedImpact: z.string(),
          implementationEffort: z.enum(['low', 'medium', 'high'])
        }))
      }),
      system: 'You are an optimization specialist. Provide specific, actionable recommendations.',
      prompt: `Based on these metrics, provide optimization recommendations:
      
      ${JSON.stringify(metrics, null, 2)}`
    })

    return {
      summary,
      metrics,
      recommendations: recommendations.recommendations.map(r => r.recommendation),
      charts: this.generateChartConfigurations(metrics)
    }
  }

  /**
   * Real-time performance monitoring
   */
  async getRealTimeMetrics(): Promise<{
    activeExecutions: number
    averageResponseTime: number
    tokensPerMinute: number
    successRate: number
    systemHealth: {
      cpu: number
      memory: number
      queueDepth: number
    }
  }> {
    return {
      activeExecutions: this.activeExecutions.size,
      averageResponseTime: await this.calculateAverageResponseTime(),
      tokensPerMinute: await this.calculateTokensPerMinute(),
      successRate: await this.calculateRecentSuccessRate(),
      systemHealth: await this.getSystemHealth()
    }
  }

  // Private helper methods

  private determineStepType(
    text: string, 
    toolCalls: any[]
  ): 'reasoning' | 'tool_call' | 'generation' | 'validation' {
    if (toolCalls.length > 0) return 'tool_call'
    if (text.includes('reasoning') || text.includes('analysis')) return 'reasoning'
    if (text.includes('validation') || text.includes('verify')) return 'validation'
    return 'generation'
  }

  private calculateStepConfidence(
    text: string,
    toolCalls: any[],
    toolResults: any[]
  ): number {
    // Simple confidence calculation based on text length and tool success
    let confidence = 0.5
    
    if (text.length > 100) confidence += 0.2
    if (toolCalls.length > 0 && toolResults.length === toolCalls.length) confidence += 0.3
    
    return Math.min(confidence, 1.0)
  }

  private assessStepQuality(
    text: string,
    toolCalls: any[],
    toolResults: any[]
  ): Record<string, number> {
    return {
      completeness: text.length > 50 ? 0.8 : 0.4,
      accuracy: toolResults.length === toolCalls.length ? 0.9 : 0.5,
      relevance: 0.7, // Would be calculated based on context
      clarity: text.split('.').length > 2 ? 0.8 : 0.6
    }
  }

  private async calculateQualityScore(
    steps: StepMetrics[],
    result?: any
  ): Promise<number> {
    if (steps.length === 0) return 0

    const avgQuality = steps.reduce((sum, step) => {
      const indicators = step.qualityIndicators || {}
      const stepQuality = Object.values(indicators).reduce((s, v) => s + v, 0) / Object.keys(indicators).length
      return sum + (stepQuality || 0)
    }, 0) / steps.length

    return Math.round(avgQuality * 100)
  }

  private calculateCost(tokenUsage: TokenUsage, model: string): number {
    // Cost calculation based on model and token usage
    const costPerToken = this.getModelCostPerToken(model)
    const promptTokens = tokenUsage.promptTokens || tokenUsage.inputTokens || 0
    const completionTokens = tokenUsage.completionTokens || tokenUsage.outputTokens || 0
    return (promptTokens * costPerToken.prompt) + (completionTokens * costPerToken.completion)
  }

  private getModelCostPerToken(model: string): { prompt: number; completion: number } {
    const costs: Record<string, { prompt: number; completion: number }> = {
      'gpt-4o': { prompt: 0.00003, completion: 0.00006 },
      'gpt-4o-mini': { prompt: 0.00015, completion: 0.0006 },
      'claude-3-sonnet': { prompt: 0.000003, completion: 0.000015 }
    }
    return costs[model] || { prompt: 0.00001, completion: 0.00002 }
  }

  private async storeMetrics(metrics: AgentExecutionMetrics): Promise<void> {
    // Store in database and send to monitoring service
    await sendMetrics('agent.execution.complete', metrics)
    
    // Convert to AgentExecution format for existing storage
    const execution: AgentExecution = {
      type: metrics.agentName,
      caseId: metrics.caseId,
      steps: [], // Would convert StepMetrics to AgentStep
      result: null,
      duration: metrics.duration,
      tokenUsage: metrics.tokenUsage,
      success: metrics.success,
      timestamp: metrics.startTime
    }
    
    await logAgentExecution(execution)
  }

  private async storeBenchmark(benchmark: PerformanceBenchmark): Promise<void> {
    // Store benchmark in database
    await sendMetrics('benchmark.set', benchmark)
  }

  private async checkBenchmarks(metrics: AgentExecutionMetrics): Promise<void> {
    const key = `${metrics.agentName}:immigration_case`
    const benchmark = this.benchmarks.get(key)
    
    if (benchmark) {
      const alerts: string[] = []
      
      if (metrics.duration > benchmark.expectedDuration * 1.5) {
        alerts.push(`Duration exceeded benchmark by ${((metrics.duration / benchmark.expectedDuration - 1) * 100).toFixed(1)}%`)
      }
      
      const totalTokens = metrics.tokenUsage.totalTokens || 0
      if (totalTokens > benchmark.expectedTokenUsage * 1.5) {
        alerts.push(`Token usage exceeded benchmark by ${((totalTokens / benchmark.expectedTokenUsage - 1) * 100).toFixed(1)}%`)
      }
      
      if ((metrics.qualityScore || 0) < benchmark.qualityThreshold) {
        alerts.push(`Quality score ${metrics.qualityScore} below threshold ${benchmark.qualityThreshold}`)
      }
      
      if (alerts.length > 0) {
        await sendMetrics('benchmark.violation', {
          executionId: metrics.executionId,
          agentName: metrics.agentName,
          alerts
        })
      }
    }
  }

  private async generatePerformanceInsights(
    metrics: AgentExecutionMetrics,
    steps: StepMetrics[]
  ): Promise<void> {
    const { object: insights } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        insights: z.array(z.string()),
        optimizations: z.array(z.string()),
        concerns: z.array(z.string())
      }),
      system: 'You are a performance analysis AI. Analyze agent execution metrics and provide insights.',
      prompt: `Analyze this agent execution:
      
      Duration: ${metrics.duration}ms
      Token Usage: ${metrics.tokenUsage.totalTokens}
      Steps: ${steps.length}
      Success: ${metrics.success}
      Quality Score: ${metrics.qualityScore}
      
      Provide insights and optimization suggestions.`
    })

    await sendMetrics('performance.insights', {
      executionId: metrics.executionId,
      insights: insights.insights,
      optimizations: insights.optimizations,
      concerns: insights.concerns
    })
  }

  private sendRealTimeStepMetrics(executionId: string, stepMetrics: StepMetrics): void {
    // Send real-time step metrics for live monitoring
    sendMetrics('agent.step.complete', {
      executionId,
      stepNumber: stepMetrics.stepNumber,
      stepType: stepMetrics.stepType,
      tokenUsage: stepMetrics.tokenUsage,
      toolCount: stepMetrics.toolCalls.length,
      confidence: stepMetrics.confidence
    })
  }

  private async queryMetricsFromDatabase(
    agentType: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<AgentExecutionMetrics[]> {
    // This would query the actual database
    // For now, returning empty array
    return []
  }

  private calculateCostEfficiency(metrics: AgentExecutionMetrics[]): number {
    if (metrics.length === 0) return 0
    
    const totalCost = metrics.reduce((sum, m) => sum + (m.tokenUsage.cost || 0), 0)
    const successfulExecutions = metrics.filter(m => m.success).length
    
    return successfulExecutions > 0 ? totalCost / successfulExecutions : 0
  }

  private async analyzeTrends(metrics: AgentExecutionMetrics[]): Promise<{
    performanceTrend: 'improving' | 'declining' | 'stable'
    recommendations: string[]
  }> {
    // Simple trend analysis - would be more sophisticated in production
    if (metrics.length < 2) {
      return { performanceTrend: 'stable', recommendations: ['Need more data for trend analysis'] }
    }

    const recent = metrics.slice(-10)
    const older = metrics.slice(-20, -10)
    
    const recentAvgDuration = recent.reduce((sum, m) => sum + m.duration, 0) / recent.length
    const olderAvgDuration = older.reduce((sum, m) => sum + m.duration, 0) / older.length
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable'
    if (recentAvgDuration < olderAvgDuration * 0.9) trend = 'improving'
    else if (recentAvgDuration > olderAvgDuration * 1.1) trend = 'declining'
    
    return {
      performanceTrend: trend,
      recommendations: this.generateTrendRecommendations(trend, metrics)
    }
  }

  private generateTrendRecommendations(
    trend: 'improving' | 'declining' | 'stable',
    metrics: AgentExecutionMetrics[]
  ): string[] {
    switch (trend) {
      case 'improving':
        return ['Performance is improving', 'Continue current optimization strategies']
      case 'declining':
        return ['Performance is declining', 'Review recent changes', 'Consider model optimization']
      default:
        return ['Performance is stable', 'Look for optimization opportunities']
    }
  }

  private generateChartConfigurations(metrics: any): any[] {
    return [
      {
        type: 'line',
        title: 'Performance Over Time',
        data: 'duration_timeline'
      },
      {
        type: 'bar',
        title: 'Token Usage by Agent',
        data: 'token_usage_by_agent'
      },
      {
        type: 'pie',
        title: 'Success Rate Distribution',
        data: 'success_rate_distribution'
      }
    ]
  }

  private async calculateAverageResponseTime(): Promise<number> {
    // Calculate from active executions
    return 1500 // Mock value
  }

  private async calculateTokensPerMinute(): Promise<number> {
    // Calculate from recent metrics
    return 1200 // Mock value
  }

  private async calculateRecentSuccessRate(): Promise<number> {
    // Calculate from recent executions
    return 0.95 // Mock value
  }

  private async getSystemHealth(): Promise<{
    cpu: number
    memory: number
    queueDepth: number
  }> {
    return {
      cpu: 45,
      memory: 60,
      queueDepth: this.activeExecutions.size
    }
  }
}

// Export singleton instance
export const agentPerformanceMonitor = new AgentPerformanceMonitor()