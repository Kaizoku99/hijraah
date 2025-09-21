import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { TokenUsage } from '../types'
import { CostAnalysis, CostAnalysisSchema } from './types'
import { sendMetrics } from '../utils/monitoring'

/**
 * Token usage analytics using AI SDK v5's usage tracking for cost optimization
 */
export class TokenUsageAnalytics {
  private usageHistory: Map<string, TokenUsage[]> = new Map()
  private costThresholds: Map<string, number> = new Map()
  private modelPricing: Map<string, { prompt: number; completion: number }> = new Map()

  constructor() {
    this.initializeModelPricing()
    this.initializeCostThresholds()
  }

  /**
   * Track token usage for an agent execution
   */
  trackUsage(
    agentName: string,
    executionId: string,
    model: string,
    usage: TokenUsage,
    timestamp: Date = new Date()
  ): void {
    const cost = this.calculateCost(model, usage)
    const enhancedUsage: TokenUsage = { 
      ...usage, 
      cost, 
      model, 
      executionId, 
      timestamp 
    }

    // Store in history
    if (!this.usageHistory.has(agentName)) {
      this.usageHistory.set(agentName, [])
    }
    this.usageHistory.get(agentName)!.push(enhancedUsage)

    // Check cost thresholds
    this.checkCostThresholds(agentName, cost)

    // Send real-time metrics
    sendMetrics('token.usage', {
      agentName,
      ...enhancedUsage
    })
  }

  /**
   * Get comprehensive cost analysis for a time period
   */
  async getCostAnalysis(
    period: { start: Date; end: Date },
    agentType?: string
  ): Promise<CostAnalysis> {
    const relevantUsage = this.getUsageInPeriod(period, agentType)
    
    const breakdown = this.calculateCostBreakdown(relevantUsage)
    const usage = this.calculateUsageStats(relevantUsage)
    const trends = await this.analyzeCostTrends(relevantUsage)
    const recommendations = await this.generateCostOptimizationRecommendations(
      breakdown,
      usage,
      trends
    )

    const analysis: CostAnalysis = {
      period,
      agentType,
      breakdown,
      usage,
      trends,
      recommendations
    }

    return CostAnalysisSchema.parse(analysis)
  }

  /**
   * Get token usage optimization recommendations
   */
  async getOptimizationRecommendations(
    agentName: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<{
    currentEfficiency: number
    potentialSavings: number
    recommendations: Array<{
      type: 'model_optimization' | 'prompt_optimization' | 'caching' | 'batching'
      description: string
      expectedSavings: number
      implementationEffort: 'low' | 'medium' | 'high'
      priority: 'high' | 'medium' | 'low'
    }>
  }> {
    const usage = this.getAgentUsage(agentName, timeRange)
    
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        currentEfficiency: z.number().min(0).max(100),
        potentialSavings: z.number(),
        recommendations: z.array(z.object({
          type: z.enum(['model_optimization', 'prompt_optimization', 'caching', 'batching']),
          description: z.string(),
          expectedSavings: z.number(),
          implementationEffort: z.enum(['low', 'medium', 'high']),
          priority: z.enum(['high', 'medium', 'low'])
        }))
      }),
      system: `You are a cost optimization specialist for AI systems. Analyze token usage patterns and provide specific optimization recommendations.
      
      Consider:
      - Model selection efficiency
      - Prompt engineering opportunities
      - Caching strategies
      - Batch processing opportunities
      - Token usage patterns and waste`,
      prompt: `Analyze token usage for ${agentName} and provide optimization recommendations:
      
      Usage Data: ${JSON.stringify(usage, null, 2)}
      
      Focus on practical, implementable optimizations with clear ROI.`
    })

    return analysis
  }

  /**
   * Monitor real-time token usage and costs
   */
  getRealTimeUsageMetrics(): {
    tokensPerMinute: number
    costPerHour: number
    topConsumers: Array<{ agentName: string; tokensUsed: number; cost: number }>
    alerts: Array<{ type: string; message: string; severity: 'low' | 'medium' | 'high' }>
  } {
    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60000)
    const oneHourAgo = new Date(now.getTime() - 3600000)

    // Calculate tokens per minute
    const recentUsage = this.getAllUsageInPeriod({ start: oneMinuteAgo, end: now })
    const tokensPerMinute = recentUsage.reduce((sum, usage) => sum + (usage.totalTokens || 0), 0)

    // Calculate cost per hour
    const hourlyUsage = this.getAllUsageInPeriod({ start: oneHourAgo, end: now })
    const costPerHour = hourlyUsage.reduce((sum, usage) => sum + (usage.cost || 0), 0)

    // Find top consumers
    const agentUsage = new Map<string, { tokens: number; cost: number }>()
    hourlyUsage.forEach(usage => {
      const agentName = usage.agentName || 'unknown'
      const current = agentUsage.get(agentName) || { tokens: 0, cost: 0 }
      agentUsage.set(agentName, {
        tokens: current.tokens + (usage.totalTokens || 0),
        cost: current.cost + (usage.cost || 0)
      })
    })

    const topConsumers = Array.from(agentUsage.entries())
      .map(([agentName, stats]) => ({ agentName, tokensUsed: stats.tokens, cost: stats.cost }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5)

    // Generate alerts
    const alerts = this.generateUsageAlerts(tokensPerMinute, costPerHour, topConsumers)

    return {
      tokensPerMinute,
      costPerHour,
      topConsumers,
      alerts
    }
  }

  /**
   * Set cost thresholds for monitoring
   */
  setCostThreshold(agentName: string, threshold: number): void {
    this.costThresholds.set(agentName, threshold)
  }

  /**
   * Get usage statistics for an agent
   */
  getAgentUsageStats(
    agentName: string,
    timeRange?: { start: Date; end: Date }
  ): {
    totalTokens: number
    totalCost: number
    averageTokensPerExecution: number
    averageCostPerExecution: number
    executionCount: number
    modelDistribution: Record<string, number>
    costTrend: 'increasing' | 'decreasing' | 'stable'
  } {
    const usage = this.getAgentUsage(agentName, timeRange)
    
    if (usage.length === 0) {
      return {
        totalTokens: 0,
        totalCost: 0,
        averageTokensPerExecution: 0,
        averageCostPerExecution: 0,
        executionCount: 0,
        modelDistribution: {},
        costTrend: 'stable'
      }
    }

    const totalTokens = usage.reduce((sum, u) => sum + (u.totalTokens || 0), 0)
    const totalCost = usage.reduce((sum, u) => sum + (u.cost || 0), 0)
    const executionCount = usage.length

    // Model distribution
    const modelDistribution: Record<string, number> = {}
    usage.forEach(u => {
      const model = u.model || 'unknown'
      modelDistribution[model] = (modelDistribution[model] || 0) + (u.totalTokens || 0)
    })

    // Cost trend analysis
    const costTrend = this.analyzeCostTrendForAgent(usage)

    return {
      totalTokens,
      totalCost,
      averageTokensPerExecution: totalTokens / executionCount,
      averageCostPerExecution: totalCost / executionCount,
      executionCount,
      modelDistribution,
      costTrend
    }
  }

  /**
   * Generate cost optimization report
   */
  async generateCostOptimizationReport(
    timeRange: { start: Date; end: Date }
  ): Promise<{
    summary: string
    totalCost: number
    potentialSavings: number
    recommendations: string[]
    charts: any[]
  }> {
    const analysis = await this.getCostAnalysis(timeRange)
    
    const { text: summary } = await generateText({
      model: openai('gpt-4o'),
      system: `You are a cost optimization analyst for AI systems. Generate comprehensive cost analysis reports.
      
      Focus on:
      - Cost breakdown and trends
      - Efficiency opportunities
      - Model optimization suggestions
      - ROI calculations for optimizations`,
      prompt: `Generate a cost optimization report:
      
      Analysis: ${JSON.stringify(analysis, null, 2)}
      
      Provide detailed insights and actionable recommendations.`
    })

    return {
      summary,
      totalCost: analysis.breakdown.totalCost,
      potentialSavings: this.calculatePotentialSavings(analysis),
      recommendations: analysis.recommendations,
      charts: this.generateCostCharts(analysis)
    }
  }

  // Private helper methods

  private initializeModelPricing(): void {
    this.modelPricing.set('gpt-4o', { prompt: 0.00003, completion: 0.00006 })
    this.modelPricing.set('gpt-4o-mini', { prompt: 0.000015, completion: 0.00006 })
    this.modelPricing.set('claude-3-sonnet', { prompt: 0.000003, completion: 0.000015 })
    this.modelPricing.set('claude-3-haiku', { prompt: 0.00000025, completion: 0.00000125 })
  }

  private initializeCostThresholds(): void {
    this.costThresholds.set('default', 10.0) // $10 per hour default
    this.costThresholds.set('document_processing', 5.0)
    this.costThresholds.set('policy_analysis', 15.0)
  }

  private calculateCost(model: string, usage: TokenUsage): number {
    const pricing = this.modelPricing.get(model) || { prompt: 0.00001, completion: 0.00002 }
    // Support both AI SDK v5 and legacy token property names for compatibility
    const inputTokens = usage.inputTokens || usage.promptTokens || 0
    const outputTokens = usage.outputTokens || usage.completionTokens || 0
    return (inputTokens * pricing.prompt) + (outputTokens * pricing.completion)
  }

  private checkCostThresholds(agentName: string, cost: number): void {
    const threshold = this.costThresholds.get(agentName) || this.costThresholds.get('default')!
    
    // Check hourly cost rate
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 3600000)
    const hourlyUsage = this.getAgentUsage(agentName, { start: oneHourAgo, end: now })
    const hourlyCost = hourlyUsage.reduce((sum, u) => sum + (u.cost || 0), 0)
    
    if (hourlyCost > threshold) {
      sendMetrics('cost.threshold.exceeded', {
        agentName,
        hourlyCost,
        threshold,
        severity: hourlyCost > threshold * 2 ? 'high' : 'medium'
      })
    }
  }

  private getUsageInPeriod(
    period: { start: Date; end: Date },
    agentType?: string
  ): Array<TokenUsage & { cost?: number; model?: string; executionId?: string; timestamp?: Date; agentName?: string }> {
    const allUsage: Array<TokenUsage & { cost?: number; model?: string; executionId?: string; timestamp?: Date; agentName?: string }> = []
    
    for (const [agentName, usage] of this.usageHistory.entries()) {
      if (agentType && agentName !== agentType) continue
      
      const filteredUsage = usage
        .filter(u => u.timestamp && u.timestamp >= period.start && u.timestamp <= period.end)
        .map(u => ({ ...u, agentName }))
      
      allUsage.push(...filteredUsage)
    }
    
    return allUsage
  }

  private getAllUsageInPeriod(
    period: { start: Date; end: Date }
  ): Array<TokenUsage & { cost?: number; model?: string; executionId?: string; timestamp?: Date; agentName?: string }> {
    return this.getUsageInPeriod(period)
  }

  private getAgentUsage(
    agentName: string,
    timeRange?: { start: Date; end: Date }
  ): Array<TokenUsage & { cost?: number; model?: string; executionId?: string; timestamp?: Date }> {
    const usage = this.usageHistory.get(agentName) || []
    
    if (!timeRange) return usage
    
    return usage.filter(u => 
      u.timestamp && u.timestamp >= timeRange.start && u.timestamp <= timeRange.end
    )
  }

  private calculateCostBreakdown(
    usage: Array<TokenUsage & { cost?: number; model?: string; agentName?: string }>
  ): CostAnalysis['breakdown'] {
    const modelCosts: Record<string, number> = {}
    const toolCosts: Record<string, number> = {} // Would be calculated from tool usage
    let totalCost = 0

    usage.forEach(u => {
      const model = u.model || 'unknown'
      const cost = u.cost || 0
      modelCosts[model] = (modelCosts[model] || 0) + cost
      totalCost += cost
    })

    return {
      modelCosts,
      toolCosts,
      infrastructureCosts: totalCost * 0.1, // Estimated infrastructure overhead
      totalCost
    }
  }

  private calculateUsageStats(
    usage: Array<TokenUsage & { cost?: number; model?: string; agentName?: string }>
  ): CostAnalysis['usage'] {
    if (usage.length === 0) {
      return {
        totalExecutions: 0,
        totalTokens: 0,
        averageCostPerExecution: 0,
        averageCostPerToken: 0
      }
    }

    const totalExecutions = usage.length
    const totalTokens = usage.reduce((sum, u) => sum + (u.totalTokens || 0), 0)
    const totalCost = usage.reduce((sum, u) => sum + (u.cost || 0), 0)

    return {
      totalExecutions,
      totalTokens,
      averageCostPerExecution: totalCost / totalExecutions,
      averageCostPerToken: totalTokens > 0 ? totalCost / totalTokens : 0
    }
  }

  private async analyzeCostTrends(
    usage: Array<TokenUsage & { cost?: number; model?: string; timestamp?: Date }>
  ): Promise<CostAnalysis['trends']> {
    // Simple trend analysis - would be more sophisticated in production
    if (usage.length < 10) {
      return {
        costTrend: 'stable',
        usageTrend: 'stable',
        efficiencyTrend: 'stable'
      }
    }

    const sortedUsage = usage.sort((a, b) => 
      (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0)
    )

    const firstHalf = sortedUsage.slice(0, Math.floor(sortedUsage.length / 2))
    const secondHalf = sortedUsage.slice(Math.floor(sortedUsage.length / 2))

    const firstHalfAvgCost = firstHalf.reduce((sum, u) => sum + (u.cost || 0), 0) / firstHalf.length
    const secondHalfAvgCost = secondHalf.reduce((sum, u) => sum + (u.cost || 0), 0) / secondHalf.length

    let costTrend: 'increasing' | 'decreasing' | 'stable' = 'stable'
    if (secondHalfAvgCost > firstHalfAvgCost * 1.1) costTrend = 'increasing'
    else if (secondHalfAvgCost < firstHalfAvgCost * 0.9) costTrend = 'decreasing'

    return {
      costTrend,
      usageTrend: 'stable', // Would calculate based on token usage trends
      efficiencyTrend: 'stable' // Would calculate based on cost per successful execution
    }
  }

  private async generateCostOptimizationRecommendations(
    breakdown: CostAnalysis['breakdown'],
    usage: CostAnalysis['usage'],
    trends: CostAnalysis['trends']
  ): Promise<string[]> {
    const recommendations: string[] = []

    // Model optimization recommendations
    const mostExpensiveModel = Object.entries(breakdown.modelCosts)
      .sort(([,a], [,b]) => b - a)[0]
    
    if (mostExpensiveModel && mostExpensiveModel[1] > breakdown.totalCost * 0.5) {
      recommendations.push(`Consider optimizing usage of ${mostExpensiveModel[0]} which accounts for ${((mostExpensiveModel[1] / breakdown.totalCost) * 100).toFixed(1)}% of costs`)
    }

    // Trend-based recommendations
    if (trends.costTrend === 'increasing') {
      recommendations.push('Cost trend is increasing - review recent changes and implement cost controls')
    }

    // Usage efficiency recommendations
    if (usage.averageCostPerToken > 0.00005) {
      recommendations.push('High cost per token detected - consider using more efficient models for simple tasks')
    }

    return recommendations
  }

  private generateUsageAlerts(
    tokensPerMinute: number,
    costPerHour: number,
    topConsumers: Array<{ agentName: string; tokensUsed: number; cost: number }>
  ): Array<{ type: string; message: string; severity: 'low' | 'medium' | 'high' }> {
    const alerts: Array<{ type: string; message: string; severity: 'low' | 'medium' | 'high' }> = []

    // High usage alerts
    if (tokensPerMinute > 2000) {
      alerts.push({
        type: 'high_usage',
        message: `High token usage: ${tokensPerMinute} tokens/minute`,
        severity: tokensPerMinute > 5000 ? 'high' : 'medium'
      })
    }

    // High cost alerts
    if (costPerHour > 20) {
      alerts.push({
        type: 'high_cost',
        message: `High cost rate: $${costPerHour.toFixed(2)}/hour`,
        severity: costPerHour > 50 ? 'high' : 'medium'
      })
    }

    // Top consumer alerts
    const topConsumer = topConsumers[0]
    if (topConsumer && topConsumer.cost > 10) {
      alerts.push({
        type: 'top_consumer',
        message: `${topConsumer.agentName} is consuming $${topConsumer.cost.toFixed(2)}/hour`,
        severity: topConsumer.cost > 25 ? 'high' : 'medium'
      })
    }

    return alerts
  }

  private analyzeCostTrendForAgent(
    usage: Array<TokenUsage & { cost?: number; timestamp?: Date }>
  ): 'increasing' | 'decreasing' | 'stable' {
    if (usage.length < 5) return 'stable'

    const sortedUsage = usage.sort((a, b) => 
      (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0)
    )

    const recent = sortedUsage.slice(-5)
    const older = sortedUsage.slice(-10, -5)

    if (older.length === 0) return 'stable'

    const recentAvgCost = recent.reduce((sum, u) => sum + (u.cost || 0), 0) / recent.length
    const olderAvgCost = older.reduce((sum, u) => sum + (u.cost || 0), 0) / older.length

    if (recentAvgCost > olderAvgCost * 1.1) return 'increasing'
    if (recentAvgCost < olderAvgCost * 0.9) return 'decreasing'
    return 'stable'
  }

  private calculatePotentialSavings(analysis: CostAnalysis): number {
    // Estimate potential savings based on optimization opportunities
    let potentialSavings = 0

    // Model optimization savings (10-30% typical)
    potentialSavings += analysis.breakdown.totalCost * 0.15

    // Caching savings (5-15% typical)
    potentialSavings += analysis.breakdown.totalCost * 0.08

    // Prompt optimization savings (5-20% typical)
    potentialSavings += analysis.breakdown.totalCost * 0.10

    return potentialSavings
  }

  private generateCostCharts(analysis: CostAnalysis): any[] {
    return [
      {
        type: 'pie',
        title: 'Cost Breakdown by Model',
        data: analysis.breakdown.modelCosts
      },
      {
        type: 'line',
        title: 'Cost Trend Over Time',
        data: 'cost_timeline'
      },
      {
        type: 'bar',
        title: 'Token Usage by Agent',
        data: 'token_usage_by_agent'
      }
    ]
  }
}

// Export singleton instance
export const tokenUsageAnalytics = new TokenUsageAnalytics()