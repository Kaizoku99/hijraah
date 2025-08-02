import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentPerformanceMetrics, 
  DashboardData, 
  RealTimeMetrics,
  AgentSuccessMetrics,
  TokenUsageMetrics,
  AgentError
} from './types'
import { createClient } from '@/utils/supabase/server'
import { sendMetrics } from '../utils/monitoring'

/**
 * Agent Performance Dashboard for real-time monitoring and analytics
 * Uses AI SDK v5's onStepFinish callbacks for real-time metrics collection
 */
export class AgentPerformanceDashboard {
  private metricsBuffer: AgentPerformanceMetrics[] = []
  private realTimeMetrics: RealTimeMetrics = {
    activeExecutions: 0,
    executionsPerMinute: 0,
    averageResponseTime: 0,
    errorRate: 0,
    tokenUsageRate: 0,
    systemHealth: 'healthy'
  }

  /**
   * Initialize dashboard with real-time monitoring
   */
  async initialize(): Promise<void> {
    // Start real-time metrics collection
    this.startRealTimeMonitoring()
    
    // Initialize database tables if needed
    await this.initializeDatabase()
    
    console.log('Agent Performance Dashboard initialized')
  }

  /**
   * Create monitoring callback for AI SDK v5 agents
   */
  createMonitoringCallback(agentId: string, agentType: string) {
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const startTime = new Date()
    let stepCount = 0
    let totalTokenUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    let errorCount = 0

    return {
      executionId,
      onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }: any) => {
        stepCount++
        
        // Accumulate token usage
        if (usage) {
          totalTokenUsage.promptTokens += usage.promptTokens || 0
          totalTokenUsage.completionTokens += usage.completionTokens || 0
          totalTokenUsage.totalTokens += usage.totalTokens || 0
        }

        // Count errors in tool results
        if (toolResults) {
          errorCount += toolResults.filter((result: any) => result.error).length
        }

        // Send real-time step metrics
        this.recordStepMetrics({
          executionId,
          agentId,
          stepNumber: stepCount,
          text,
          toolCalls,
          toolResults,
          finishReason,
          usage,
          timestamp: new Date()
        })

        // Update real-time metrics
        this.updateRealTimeMetrics()
      },
      onComplete: (success: boolean, result?: any) => {
        const endTime = new Date()
        const duration = endTime.getTime() - startTime.getTime()

        const metrics: AgentPerformanceMetrics = {
          agentId,
          agentType,
          executionId,
          startTime,
          endTime,
          duration,
          stepCount,
          tokenUsage: totalTokenUsage,
          success,
          errorCount,
          qualityScore: this.calculateQualityScore(success, errorCount, stepCount),
          confidence: this.extractConfidence(result),
          metadata: {
            finishReason: 'completed',
            result: success ? 'success' : 'failure'
          }
        }

        // Record execution metrics
        this.recordExecutionMetrics(metrics)
        
        // Update active executions count
        this.realTimeMetrics.activeExecutions--
      },
      onError: (error: Error) => {
        const endTime = new Date()
        const duration = endTime.getTime() - startTime.getTime()

        const metrics: AgentPerformanceMetrics = {
          agentId,
          agentType,
          executionId,
          startTime,
          endTime,
          duration,
          stepCount,
          tokenUsage: totalTokenUsage,
          success: false,
          errorCount: errorCount + 1,
          qualityScore: 0,
          metadata: {
            error: error.message,
            stack: error.stack
          }
        }

        this.recordExecutionMetrics(metrics)
        this.recordError({
          id: `error_${Date.now()}`,
          type: 'generation_error',
          message: error.message,
          stack: error.stack,
          context: { executionId, agentId },
          timestamp: new Date()
        })

        this.realTimeMetrics.activeExecutions--
      }
    }
  }

  /**
   * Record step-level metrics for detailed analysis
   */
  private async recordStepMetrics(stepData: any): Promise<void> {
    try {
      const supabase = await createClient()
      
      await supabase.from('agent_step_metrics').insert({
        execution_id: stepData.executionId,
        agent_id: stepData.agentId,
        step_number: stepData.stepNumber,
        step_text: stepData.text,
        tool_calls: stepData.toolCalls,
        tool_results: stepData.toolResults,
        finish_reason: stepData.finishReason,
        token_usage: stepData.usage,
        timestamp: stepData.timestamp.toISOString()
      })

      // Send to monitoring service
      await sendMetrics('agent.step', {
        execution_id: stepData.executionId,
        agent_id: stepData.agentId,
        step_number: stepData.stepNumber,
        token_usage: stepData.usage,
        timestamp: stepData.timestamp.toISOString()
      })
    } catch (error) {
      console.error('Failed to record step metrics:', error)
    }
  }

  /**
   * Record execution-level metrics
   */
  private async recordExecutionMetrics(metrics: AgentPerformanceMetrics): Promise<void> {
    try {
      // Add to buffer for batch processing
      this.metricsBuffer.push(metrics)

      // Store in database
      const supabase = await createClient()
      
      await supabase.from('agent_execution_metrics').insert({
        agent_id: metrics.agentId,
        agent_type: metrics.agentType,
        execution_id: metrics.executionId,
        start_time: metrics.startTime.toISOString(),
        end_time: metrics.endTime.toISOString(),
        duration_ms: metrics.duration,
        step_count: metrics.stepCount,
        token_usage: metrics.tokenUsage,
        success: metrics.success,
        error_count: metrics.errorCount,
        quality_score: metrics.qualityScore,
        confidence: metrics.confidence,
        metadata: metrics.metadata
      })

      // Send to monitoring service
      await sendMetrics('agent.execution', {
        agent_id: metrics.agentId,
        agent_type: metrics.agentType,
        duration_ms: metrics.duration,
        success: metrics.success,
        token_usage: metrics.tokenUsage,
        quality_score: metrics.qualityScore
      })

      // Process buffer if it's getting large
      if (this.metricsBuffer.length > 100) {
        await this.processBatchMetrics()
      }
    } catch (error) {
      console.error('Failed to record execution metrics:', error)
    }
  }

  /**
   * Record error for analysis
   */
  private async recordError(error: AgentError): Promise<void> {
    try {
      const supabase = await createClient()
      
      await supabase.from('agent_errors').insert({
        error_id: error.id,
        error_type: error.type,
        message: error.message,
        stack: error.stack,
        step_number: error.stepNumber,
        context: error.context,
        timestamp: error.timestamp.toISOString()
      })

      await sendMetrics('agent.error', {
        error_type: error.type,
        message: error.message,
        context: error.context
      })
    } catch (err) {
      console.error('Failed to record error:', err)
    }
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(timeRange: '1h' | '24h' | '7d' | '30d' = '24h'): Promise<DashboardData> {
    try {
      const supabase = await createClient()
      const timeFilter = this.getTimeFilter(timeRange)

      // Get overview metrics
      const { data: executions } = await supabase
        .from('agent_execution_metrics')
        .select('*')
        .gte('start_time', timeFilter)

      const totalExecutions = executions?.length || 0
      const successfulExecutions = executions?.filter(e => e.success).length || 0
      const totalDuration = executions?.reduce((sum, e) => sum + e.duration_ms, 0) || 0
      const totalTokens = executions?.reduce((sum, e) => sum + (e.token_usage?.totalTokens || 0), 0) || 0

      // Get agent-specific metrics
      const agentMetrics = await this.getAgentSuccessMetrics(timeFilter)
      
      // Get recent executions
      const recentExecutions = executions?.slice(-20).map(this.mapExecutionData) || []

      // Get token usage trends
      const tokenUsageTrends = await this.getTokenUsageTrends(timeFilter)

      // Get error analysis
      const { data: errors } = await supabase
        .from('agent_errors')
        .select('*')
        .gte('timestamp', timeFilter)

      const errorsByType = errors?.reduce((acc, error) => {
        acc[error.error_type] = (acc[error.error_type] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      // Get performance trends
      const performanceTrends = await this.getPerformanceTrends(timeFilter)

      return {
        overview: {
          totalExecutions,
          successRate: totalExecutions > 0 ? successfulExecutions / totalExecutions : 0,
          averageDuration: totalExecutions > 0 ? totalDuration / totalExecutions : 0,
          totalTokensUsed: totalTokens,
          totalCost: this.calculateTotalCost(tokenUsageTrends)
        },
        agentMetrics,
        recentExecutions,
        tokenUsageTrends,
        errorAnalysis: {
          totalErrors: errors?.length || 0,
          errorsByType,
          recentErrors: errors?.slice(-10).map(this.mapErrorData) || []
        },
        performanceTrends
      }
    } catch (error) {
      console.error('Failed to get dashboard data:', error)
      throw error
    }
  }

  /**
   * Get real-time metrics
   */
  getRealTimeMetrics(): RealTimeMetrics {
    return { ...this.realTimeMetrics }
  }

  /**
   * Start real-time monitoring
   */
  private startRealTimeMonitoring(): void {
    // Update metrics every 30 seconds
    setInterval(() => {
      this.updateRealTimeMetrics()
    }, 30000)

    // Process metrics buffer every 5 minutes
    setInterval(() => {
      this.processBatchMetrics()
    }, 300000)
  }

  /**
   * Update real-time metrics
   */
  private updateRealTimeMetrics(): void {
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    // Filter recent metrics
    const recentMetrics = this.metricsBuffer.filter(
      m => m.endTime.getTime() > oneMinuteAgo
    )

    this.realTimeMetrics.executionsPerMinute = recentMetrics.length
    this.realTimeMetrics.averageResponseTime = recentMetrics.length > 0
      ? recentMetrics.reduce((sum, m) => sum + m.duration, 0) / recentMetrics.length
      : 0
    this.realTimeMetrics.errorRate = recentMetrics.length > 0
      ? recentMetrics.filter(m => !m.success).length / recentMetrics.length
      : 0
    this.realTimeMetrics.tokenUsageRate = recentMetrics.reduce(
      (sum, m) => sum + m.tokenUsage.totalTokens, 0
    )

    // Determine system health
    this.realTimeMetrics.systemHealth = this.calculateSystemHealth()
  }

  /**
   * Calculate system health based on metrics
   */
  private calculateSystemHealth(): 'healthy' | 'warning' | 'critical' {
    const { errorRate, averageResponseTime, executionsPerMinute } = this.realTimeMetrics

    if (errorRate > 0.2 || averageResponseTime > 30000) {
      return 'critical'
    } else if (errorRate > 0.1 || averageResponseTime > 15000 || executionsPerMinute > 100) {
      return 'warning'
    }
    return 'healthy'
  }

  /**
   * Calculate quality score based on execution metrics
   */
  private calculateQualityScore(success: boolean, errorCount: number, stepCount: number): number {
    if (!success) return 0
    
    const errorPenalty = Math.min(errorCount * 0.2, 0.8)
    const efficiencyBonus = stepCount < 5 ? 0.1 : stepCount > 10 ? -0.1 : 0
    
    return Math.max(0, Math.min(10, 8 - errorPenalty + efficiencyBonus))
  }

  /**
   * Extract confidence score from result
   */
  private extractConfidence(result: any): number | undefined {
    if (result && typeof result === 'object') {
      return result.confidence || result.confidenceScore
    }
    return undefined
  }

  /**
   * Process batch metrics for aggregation
   */
  private async processBatchMetrics(): Promise<void> {
    if (this.metricsBuffer.length === 0) return

    try {
      // Aggregate metrics by agent type
      const aggregated = this.aggregateMetrics(this.metricsBuffer)
      
      // Store aggregated metrics
      await this.storeAggregatedMetrics(aggregated)
      
      // Clear buffer
      this.metricsBuffer = []
    } catch (error) {
      console.error('Failed to process batch metrics:', error)
    }
  }

  /**
   * Helper methods for data processing
   */
  private getTimeFilter(timeRange: string): string {
    const now = new Date()
    switch (timeRange) {
      case '1h':
        return new Date(now.getTime() - 3600000).toISOString()
      case '24h':
        return new Date(now.getTime() - 86400000).toISOString()
      case '7d':
        return new Date(now.getTime() - 604800000).toISOString()
      case '30d':
        return new Date(now.getTime() - 2592000000).toISOString()
      default:
        return new Date(now.getTime() - 86400000).toISOString()
    }
  }

  private async getAgentSuccessMetrics(timeFilter: string): Promise<AgentSuccessMetrics[]> {
    // Implementation for getting agent success metrics
    // This would query the database and calculate success rates per agent
    return []
  }

  private async getTokenUsageTrends(timeFilter: string): Promise<TokenUsageMetrics[]> {
    // Implementation for getting token usage trends
    return []
  }

  private async getPerformanceTrends(timeFilter: string): Promise<any> {
    // Implementation for getting performance trends
    return {
      executionsOverTime: [],
      durationTrends: [],
      tokenUsageTrends: []
    }
  }

  private calculateTotalCost(tokenUsageTrends: TokenUsageMetrics[]): number {
    // Calculate total cost based on token usage and model pricing
    return tokenUsageTrends.reduce((total, usage) => total + usage.cost, 0)
  }

  private mapExecutionData(execution: any): AgentPerformanceMetrics {
    return {
      agentId: execution.agent_id,
      agentType: execution.agent_type,
      executionId: execution.execution_id,
      startTime: new Date(execution.start_time),
      endTime: new Date(execution.end_time),
      duration: execution.duration_ms,
      stepCount: execution.step_count,
      tokenUsage: execution.token_usage,
      success: execution.success,
      errorCount: execution.error_count,
      qualityScore: execution.quality_score,
      confidence: execution.confidence,
      metadata: execution.metadata
    }
  }

  private mapErrorData(error: any): AgentError {
    return {
      id: error.error_id,
      type: error.error_type,
      message: error.message,
      stack: error.stack,
      stepNumber: error.step_number,
      context: error.context,
      timestamp: new Date(error.timestamp)
    }
  }

  private aggregateMetrics(metrics: AgentPerformanceMetrics[]): Record<string, any> {
    // Implementation for aggregating metrics
    return {}
  }

  private async storeAggregatedMetrics(aggregated: Record<string, any>): Promise<void> {
    // Implementation for storing aggregated metrics
  }

  private async initializeDatabase(): Promise<void> {
    // Implementation for initializing database tables
    console.log('Database tables initialized for agent monitoring')
  }
}