import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentPerformanceMetrics,
  DashboardData,
  RealTimeMetrics,
  AgentSuccessMetrics,
  TokenUsageMetrics,
  AgentError,
  CostOptimizationRecommendation,
  BudgetAlert
} from './types'
import { AgentPerformanceDashboard } from './agent-performance-dashboard'
import { TokenUsageAnalytics } from './token-usage-analytics'
import { AgentSuccessMetricsAnalyzer } from './agent-success-metrics'
import { AgentDebuggingTools } from './agent-debugging-tools'
import { AgentABTesting } from './agent-ab-testing'
import { createClient } from '@/utils/supabase/server'
import { sendMetrics } from '../utils/monitoring'

/**
 * Comprehensive MAS Dashboard that integrates all monitoring components
 * Provides unified interface for agent performance monitoring and optimization
 */
export class ComprehensiveMASMonitoringDashboard {
  private performanceDashboard: AgentPerformanceDashboard
  private tokenAnalytics: TokenUsageAnalytics
  private successMetrics: AgentSuccessMetricsAnalyzer
  private debuggingTools: AgentDebuggingTools
  private abTesting: AgentABTesting

  constructor() {
    this.performanceDashboard = new AgentPerformanceDashboard()
    this.tokenAnalytics = new TokenUsageAnalytics()
    this.successMetrics = new AgentSuccessMetricsAnalyzer()
    this.debuggingTools = new AgentDebuggingTools()
    this.abTesting = new AgentABTesting()
  }

  /**
   * Initialize the comprehensive monitoring dashboard
   */
  async initialize(): Promise<void> {
    console.log('Initializing Comprehensive MAS Monitoring Dashboard...')
    
    // Initialize all components
    await Promise.all([
      this.performanceDashboard.initialize(),
      this.initializeDatabase(),
      this.startRealTimeMonitoring()
    ])

    console.log('Comprehensive MAS Monitoring Dashboard initialized successfully')
  }

  /**
   * Get unified dashboard data with all metrics
   */
  async getUnifiedDashboard(
    timeRange: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<{
    overview: {
      totalAgents: number
      activeExecutions: number
      totalExecutions: number
      overallSuccessRate: number
      totalCost: number
      systemHealth: 'healthy' | 'warning' | 'critical'
    }
    performance: DashboardData
    tokenUsage: {
      totalTokens: number
      totalCost: number
      usageByModel: Record<string, { tokens: number; cost: number }>
      trends: Array<{ date: string; tokens: number; cost: number }>
      costOptimizationRecommendations: CostOptimizationRecommendation[]
    }
    agentMetrics: AgentSuccessMetrics[]
    realTimeMetrics: RealTimeMetrics
    budgetStatus: {
      currentUsage: { hourly: number; daily: number; monthly: number }
      utilizationPercentage: { hourly: number; daily: number; monthly: number }
      alerts: BudgetAlert[]
      projectedMonthlySpend: number
    }
    topIssues: Array<{
      type: 'performance' | 'cost' | 'quality' | 'error'
      severity: 'low' | 'medium' | 'high' | 'critical'
      description: string
      affectedAgents: string[]
      recommendation: string
    }>
    insights: string[]
    recommendations: string[]
  }> {
    try {
      // Get data from all components in parallel
      const [
        performanceData,
        tokenUsageData,
        agentMetrics,
        realTimeMetrics,
        budgetStatus,
        overviewData
      ] = await Promise.all([
        this.performanceDashboard.getDashboardData(timeRange),
        this.tokenAnalytics.getTokenUsageAnalytics(timeRange),
        this.successMetrics.getAllAgentSuccessMetrics(timeRange),
        this.performanceDashboard.getRealTimeMetrics(),
        this.tokenAnalytics.getBudgetStatus(),
        this.getOverviewData(timeRange)
      ])

      // Identify top issues across all systems
      const topIssues = await this.identifyTopIssues(
        performanceData,
        tokenUsageData,
        agentMetrics,
        budgetStatus
      )

      // Generate unified insights and recommendations
      const { insights, recommendations } = await this.generateUnifiedInsights(
        performanceData,
        tokenUsageData,
        agentMetrics,
        topIssues
      )

      return {
        overview: {
          totalAgents: agentMetrics.length,
          activeExecutions: realTimeMetrics.activeExecutions,
          totalExecutions: overviewData.totalExecutions,
          overallSuccessRate: overviewData.overallSuccessRate,
          totalCost: tokenUsageData.totalCost,
          systemHealth: this.calculateSystemHealth(realTimeMetrics, topIssues)
        },
        performance: performanceData,
        tokenUsage: tokenUsageData,
        agentMetrics,
        realTimeMetrics,
        budgetStatus,
        topIssues,
        insights,
        recommendations
      }
    } catch (error) {
      console.error('Failed to get unified dashboard data:', error)
      throw error
    }
  }

  /**
   * Get agent-specific comprehensive report
   */
  async getAgentReport(
    agentId: string,
    timeRange: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<{
    agentInfo: {
      agentId: string
      agentType: string
      status: 'active' | 'inactive' | 'error'
      lastExecution: Date | null
    }
    performance: AgentSuccessMetrics
    tokenUsage: {
      totalTokens: number
      totalCost: number
      trends: Array<{ date: string; tokens: number; cost: number }>
    }
    qualityTrends: {
      trends: Array<{
        date: string
        successRate: number
        averageQuality: number
        averageDuration: number
        tokenUsage: number
      }>
      trendAnalysis: {
        successRateTrend: 'improving' | 'stable' | 'declining'
        qualityTrend: 'improving' | 'stable' | 'declining'
        performanceTrend: 'improving' | 'stable' | 'declining'
        insights: string[]
      }
    }
    recentExecutions: Array<{
      executionId: string
      timestamp: Date
      duration: number
      success: boolean
      qualityScore: number
      tokenUsage: number
      issues: string[]
    }>
    benchmarking: {
      responseTime: 'excellent' | 'good' | 'acceptable' | 'poor'
      tokenEfficiency: 'excellent' | 'good' | 'acceptable' | 'poor'
      stepEfficiency: 'excellent' | 'good' | 'acceptable' | 'poor'
      overallRating: 'excellent' | 'good' | 'acceptable' | 'poor'
      recommendations: string[]
    }
    debuggingInsights: {
      commonIssues: string[]
      optimizationOpportunities: string[]
      errorPatterns: string[]
    }
  }> {
    try {
      // Get comprehensive data for the specific agent
      const [
        agentInfo,
        performance,
        tokenUsage,
        qualityTrends,
        recentExecutions,
        benchmarking,
        debuggingInsights
      ] = await Promise.all([
        this.getAgentInfo(agentId),
        this.successMetrics.calculateAgentSuccessMetrics(agentId, timeRange),
        this.tokenAnalytics.getTokenUsageAnalytics(timeRange, agentId),
        this.successMetrics.getQualityTrends(agentId, timeRange === '1h' ? '7d' : '30d'),
        this.getRecentExecutions(agentId, 10),
        this.successMetrics.generateBenchmarkingReport(agentId),
        this.getDebuggingInsights(agentId, timeRange)
      ])

      return {
        agentInfo,
        performance,
        tokenUsage: {
          totalTokens: tokenUsage.totalTokens,
          totalCost: tokenUsage.totalCost,
          trends: tokenUsage.trends
        },
        qualityTrends,
        recentExecutions,
        benchmarking,
        debuggingInsights
      }
    } catch (error) {
      console.error(`Failed to get agent report for ${agentId}:`, error)
      throw error
    }
  }

  /**
   * Create monitoring callback for AI SDK v5 agents
   */
  createMonitoringCallback(agentId: string, agentType: string) {
    const performanceCallback = this.performanceDashboard.createMonitoringCallback(agentId, agentType)
    const debugCallback = this.debuggingTools.createDebugWrapper(agentId, performanceCallback.executionId)

    return {
      executionId: performanceCallback.executionId,
      onStepFinish: (stepData: any) => {
        // Call both performance and debug callbacks
        performanceCallback.onStepFinish(stepData)
        debugCallback.onStepFinish(stepData)

        // Track token usage
        if (stepData.usage) {
          this.tokenAnalytics.trackTokenUsage(
            agentId,
            performanceCallback.executionId,
            stepData.model || 'gpt-4o',
            stepData.usage,
            stepData.operation || 'generation',
            stepData.metadata || {}
          )
        }
      },
      onComplete: (success: boolean, result?: any) => {
        performanceCallback.onComplete(success, result)
        debugCallback.finalize()
      },
      onError: (error: Error) => {
        performanceCallback.onError(error)
        debugCallback.onError(error)
      },
      // Additional debugging methods
      onToolCall: debugCallback.onToolCall,
      onToolResult: debugCallback.onToolResult,
      onWarning: debugCallback.onWarning,
      getTrace: debugCallback.getTrace
    }
  }

  /**
   * Run A/B test for agent optimization
   */
  async runAgentABTest(config: {
    name: string
    description: string
    agentId: string
    variants: Array<{
      name: string
      description: string
      model?: string
      temperature?: number
      maxTokens?: number
      systemPrompt?: string
      tools?: string[]
    }>
    testCases: Array<{
      input: any
      expectedOutput?: any
      evaluationCriteria: string[]
    }>
    duration?: number // days
  }): Promise<{
    testId: string
    configuration: any
    estimatedCompletion: Date
  }> {
    try {
      // Create A/B test configuration
      const testConfig = await this.abTesting.createABTest({
        name: config.name,
        description: config.description,
        variants: config.variants,
        duration: config.duration || 7
      })

      // Store test metadata
      await this.storeABTestMetadata(testConfig.testId, {
        agentId: config.agentId,
        testCases: config.testCases,
        createdAt: new Date()
      })

      const estimatedCompletion = new Date(Date.now() + (config.duration || 7) * 24 * 60 * 60 * 1000)

      return {
        testId: testConfig.testId,
        configuration: testConfig,
        estimatedCompletion
      }
    } catch (error) {
      console.error('Failed to run agent A/B test:', error)
      throw error
    }
  }

  /**
   * Get A/B test results with recommendations
   */
  async getABTestResults(testId: string): Promise<{
    results: any
    recommendations: {
      winningVariant?: string
      implementationSteps: string[]
      expectedImprovements: Record<string, number>
      rolloutStrategy: string
    }
  }> {
    try {
      const results = await this.abTesting.getTestResults(testId)
      
      // Generate implementation recommendations
      const recommendations = await this.generateABTestRecommendations(results)

      return {
        results,
        recommendations
      }
    } catch (error) {
      console.error('Failed to get A/B test results:', error)
      throw error
    }
  }

  /**
   * Generate comprehensive optimization report
   */
  async generateOptimizationReport(): Promise<{
    executiveSummary: {
      totalCostSavingsPotential: number
      performanceImprovementOpportunities: number
      criticalIssuesCount: number
      overallHealthScore: number
    }
    costOptimization: {
      currentSpend: number
      potentialSavings: number
      recommendations: CostOptimizationRecommendation[]
      quickWins: string[]
    }
    performanceOptimization: {
      slowestAgents: Array<{ agentId: string; averageDuration: number; improvement: string }>
      tokenInefficiencies: Array<{ agentId: string; wastedTokens: number; optimization: string }>
      qualityIssues: Array<{ agentId: string; qualityScore: number; improvement: string }>
    }
    systemHealth: {
      overallStatus: 'healthy' | 'warning' | 'critical'
      criticalIssues: string[]
      warningIssues: string[]
      recommendations: string[]
    }
    actionPlan: {
      immediate: Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }>
      shortTerm: Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }>
      longTerm: Array<{ action: string; impact: string; effort: 'low' | 'medium' | 'high' }>
    }
  }> {
    try {
      // Gather comprehensive data
      const [
        dashboardData,
        tokenAnalytics,
        agentMetrics,
        budgetStatus
      ] = await Promise.all([
        this.getUnifiedDashboard('30d'),
        this.tokenAnalytics.getTokenUsageAnalytics('30d'),
        this.successMetrics.getAllAgentSuccessMetrics('30d'),
        this.tokenAnalytics.getBudgetStatus()
      ])

      // Analyze cost optimization opportunities
      const costOptimization = await this.analyzeCostOptimization(tokenAnalytics, budgetStatus)

      // Analyze performance optimization opportunities
      const performanceOptimization = await this.analyzePerformanceOptimization(agentMetrics)

      // Assess system health
      const systemHealth = await this.assessSystemHealth(dashboardData)

      // Generate action plan
      const actionPlan = await this.generateActionPlan(
        costOptimization,
        performanceOptimization,
        systemHealth
      )

      // Calculate executive summary
      const executiveSummary = {
        totalCostSavingsPotential: costOptimization.potentialSavings,
        performanceImprovementOpportunities: performanceOptimization.slowestAgents.length,
        criticalIssuesCount: systemHealth.criticalIssues.length,
        overallHealthScore: this.calculateHealthScore(systemHealth, dashboardData.overview)
      }

      return {
        executiveSummary,
        costOptimization,
        performanceOptimization,
        systemHealth,
        actionPlan
      }
    } catch (error) {
      console.error('Failed to generate optimization report:', error)
      throw error
    }
  }

  /**
   * Export dashboard data for external analysis
   */
  async exportDashboardData(
    format: 'json' | 'csv' | 'excel',
    timeRange: '1h' | '24h' | '7d' | '30d' = '30d',
    includeDebugTraces: boolean = false
  ): Promise<{
    data: any
    downloadUrl?: string
    expiresAt: Date
  }> {
    try {
      // Get comprehensive data
      const dashboardData = await this.getUnifiedDashboard(timeRange)
      
      let exportData: any = {
        metadata: {
          exportedAt: new Date().toISOString(),
          timeRange,
          format,
          includeDebugTraces
        },
        dashboard: dashboardData
      }

      // Include debug traces if requested
      if (includeDebugTraces) {
        const recentExecutions = await this.getRecentExecutionIds(100)
        const debugTraces = await Promise.all(
          recentExecutions.map(id => this.debuggingTools.getDebugTrace(id))
        )
        exportData.debugTraces = debugTraces.filter(trace => trace !== null)
      }

      // Format data based on requested format
      switch (format) {
        case 'json':
          break // Already in JSON format
        case 'csv':
          exportData = this.convertToCSV(exportData)
          break
        case 'excel':
          exportData = await this.convertToExcel(exportData)
          break
      }

      // Store export data temporarily (implementation would depend on storage solution)
      const downloadUrl = await this.storeExportData(exportData, format)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      return {
        data: exportData,
        downloadUrl,
        expiresAt
      }
    } catch (error) {
      console.error('Failed to export dashboard data:', error)
      throw error
    }
  }

  /**
   * Private helper methods
   */
  private async initializeDatabase(): Promise<void> {
    try {
      const supabase = await createClient()
      
      // Create monitoring tables if they don't exist
      // This would typically be handled by migrations
      console.log('Database tables initialized for comprehensive monitoring')
    } catch (error) {
      console.error('Failed to initialize database:', error)
    }
  }

  private async startRealTimeMonitoring(): Promise<void> {
    // Start real-time monitoring processes
    setInterval(async () => {
      try {
        await this.updateRealTimeMetrics()
      } catch (error) {
        console.error('Failed to update real-time metrics:', error)
      }
    }, 30000) // Update every 30 seconds

    console.log('Real-time monitoring started')
  }

  private async updateRealTimeMetrics(): Promise<void> {
    // Update real-time metrics across all components
    // This would aggregate data from all monitoring components
  }

  private async getOverviewData(timeRange: string): Promise<{
    totalExecutions: number
    overallSuccessRate: number
  }> {
    try {
      const supabase = await createClient()
      const timeFilter = this.getTimeFilter(timeRange)

      const { data: executions } = await supabase
        .from('agent_execution_metrics')
        .select('success')
        .gte('start_time', timeFilter)

      const totalExecutions = executions?.length || 0
      const successfulExecutions = executions?.filter(e => e.success).length || 0
      const overallSuccessRate = totalExecutions > 0 ? successfulExecutions / totalExecutions : 0

      return { totalExecutions, overallSuccessRate }
    } catch (error) {
      console.error('Failed to get overview data:', error)
      return { totalExecutions: 0, overallSuccessRate: 0 }
    }
  }

  private async identifyTopIssues(
    performanceData: DashboardData,
    tokenUsageData: any,
    agentMetrics: AgentSuccessMetrics[],
    budgetStatus: any
  ): Promise<Array<{
    type: 'performance' | 'cost' | 'quality' | 'error'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    affectedAgents: string[]
    recommendation: string
  }>> {
    const issues: any[] = []

    // Performance issues
    const slowAgents = agentMetrics.filter(agent => agent.averageDuration > 15000)
    if (slowAgents.length > 0) {
      issues.push({
        type: 'performance',
        severity: slowAgents.some(a => a.averageDuration > 30000) ? 'critical' : 'high',
        description: `${slowAgents.length} agents have slow response times`,
        affectedAgents: slowAgents.map(a => a.agentId),
        recommendation: 'Optimize agent prompts and tool usage'
      })
    }

    // Cost issues
    if (budgetStatus.utilizationPercentage.daily > 80) {
      issues.push({
        type: 'cost',
        severity: budgetStatus.utilizationPercentage.daily > 95 ? 'critical' : 'high',
        description: `Daily budget utilization at ${budgetStatus.utilizationPercentage.daily.toFixed(1)}%`,
        affectedAgents: [],
        recommendation: 'Implement cost optimization strategies'
      })
    }

    // Quality issues
    const lowQualityAgents = agentMetrics.filter(agent => agent.averageQualityScore < 7)
    if (lowQualityAgents.length > 0) {
      issues.push({
        type: 'quality',
        severity: lowQualityAgents.some(a => a.averageQualityScore < 5) ? 'critical' : 'medium',
        description: `${lowQualityAgents.length} agents have low quality scores`,
        affectedAgents: lowQualityAgents.map(a => a.agentId),
        recommendation: 'Review and improve agent prompts and validation'
      })
    }

    // Error issues
    if (performanceData.errorAnalysis.totalErrors > 0) {
      const errorRate = performanceData.errorAnalysis.totalErrors / performanceData.overview.totalExecutions
      issues.push({
        type: 'error',
        severity: errorRate > 0.1 ? 'critical' : errorRate > 0.05 ? 'high' : 'medium',
        description: `${performanceData.errorAnalysis.totalErrors} errors in recent executions`,
        affectedAgents: [],
        recommendation: 'Investigate and fix error patterns'
      })
    }

    return issues.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return severityOrder[b.severity] - severityOrder[a.severity]
    })
  }

  private async generateUnifiedInsights(
    performanceData: DashboardData,
    tokenUsageData: any,
    agentMetrics: AgentSuccessMetrics[],
    topIssues: any[]
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    try {
      const { object: analysis } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          insights: z.array(z.string()),
          recommendations: z.array(z.string())
        }),
        system: 'You are a comprehensive AI system analyst. Provide unified insights and recommendations.',
        prompt: `
Analyze the following comprehensive MAS monitoring data:

Performance Overview:
- Total Executions: ${performanceData.overview.totalExecutions}
- Success Rate: ${(performanceData.overview.successRate * 100).toFixed(1)}%
- Average Duration: ${performanceData.overview.averageDuration}ms
- Total Cost: $${tokenUsageData.totalCost.toFixed(2)}

Agent Metrics Summary:
- Total Agents: ${agentMetrics.length}
- Average Success Rate: ${(agentMetrics.reduce((sum, a) => sum + a.successRate, 0) / agentMetrics.length * 100).toFixed(1)}%
- Average Quality Score: ${(agentMetrics.reduce((sum, a) => sum + a.averageQualityScore, 0) / agentMetrics.length).toFixed(1)}/10

Top Issues:
${topIssues.map(issue => `- ${issue.type.toUpperCase()}: ${issue.description}`).join('\n')}

Token Usage:
- Total Tokens: ${tokenUsageData.totalTokens.toLocaleString()}
- Cost by Model: ${JSON.stringify(tokenUsageData.usageByModel)}

Provide comprehensive insights and actionable recommendations for system optimization.
        `
      })

      return analysis
    } catch (error) {
      console.error('Failed to generate unified insights:', error)
      return {
        insights: ['System analysis unavailable due to processing error'],
        recommendations: ['Review system metrics manually and address critical issues']
      }
    }
  }

  private calculateSystemHealth(
    realTimeMetrics: RealTimeMetrics,
    topIssues: any[]
  ): 'healthy' | 'warning' | 'critical' {
    const criticalIssues = topIssues.filter(issue => issue.severity === 'critical')
    const highIssues = topIssues.filter(issue => issue.severity === 'high')

    if (criticalIssues.length > 0 || realTimeMetrics.systemHealth === 'critical') {
      return 'critical'
    } else if (highIssues.length > 0 || realTimeMetrics.systemHealth === 'warning') {
      return 'warning'
    }
    return 'healthy'
  }

  // Additional helper methods would continue here...
  private async getAgentInfo(agentId: string): Promise<any> {
    // Implementation for getting agent info
    return {
      agentId,
      agentType: 'unknown',
      status: 'active',
      lastExecution: new Date()
    }
  }

  private async getRecentExecutions(agentId: string, limit: number): Promise<any[]> {
    // Implementation for getting recent executions
    return []
  }

  private async getDebuggingInsights(agentId: string, timeRange: string): Promise<any> {
    // Implementation for getting debugging insights
    return {
      commonIssues: [],
      optimizationOpportunities: [],
      errorPatterns: []
    }
  }

  private async storeABTestMetadata(testId: string, metadata: any): Promise<void> {
    // Implementation for storing A/B test metadata
  }

  private async generateABTestRecommendations(results: any): Promise<any> {
    // Implementation for generating A/B test recommendations
    return {
      implementationSteps: [],
      expectedImprovements: {},
      rolloutStrategy: 'gradual'
    }
  }

  private async analyzeCostOptimization(tokenAnalytics: any, budgetStatus: any): Promise<any> {
    return {
      currentSpend: budgetStatus.currentUsage.monthly,
      potentialSavings: tokenAnalytics.costOptimizationRecommendations.reduce(
        (sum: number, rec: any) => sum + rec.potentialSavings, 0
      ),
      recommendations: tokenAnalytics.costOptimizationRecommendations,
      quickWins: ['Switch to smaller models for simple tasks', 'Implement response caching']
    }
  }

  private async analyzePerformanceOptimization(agentMetrics: AgentSuccessMetrics[]): Promise<any> {
    const slowestAgents = agentMetrics
      .filter(agent => agent.averageDuration > 10000)
      .sort((a, b) => b.averageDuration - a.averageDuration)
      .slice(0, 5)
      .map(agent => ({
        agentId: agent.agentId,
        averageDuration: agent.averageDuration,
        improvement: 'Optimize prompts and tool usage'
      }))

    return {
      slowestAgents,
      tokenInefficiencies: [],
      qualityIssues: []
    }
  }

  private async assessSystemHealth(dashboardData: any): Promise<any> {
    const criticalIssues: string[] = []
    const warningIssues: string[] = []

    if (dashboardData.overview.overallSuccessRate < 0.8) {
      criticalIssues.push('Overall success rate below 80%')
    }

    if (dashboardData.realTimeMetrics.errorRate > 0.1) {
      criticalIssues.push('High error rate detected')
    }

    return {
      overallStatus: criticalIssues.length > 0 ? 'critical' : 
                    warningIssues.length > 0 ? 'warning' : 'healthy',
      criticalIssues,
      warningIssues,
      recommendations: ['Address critical issues immediately', 'Monitor system health continuously']
    }
  }

  private async generateActionPlan(
    costOptimization: any,
    performanceOptimization: any,
    systemHealth: any
  ): Promise<any> {
    return {
      immediate: [
        { action: 'Address critical system issues', impact: 'High', effort: 'medium' },
        { action: 'Implement quick cost optimizations', impact: 'Medium', effort: 'low' }
      ],
      shortTerm: [
        { action: 'Optimize slow-performing agents', impact: 'High', effort: 'medium' },
        { action: 'Implement comprehensive monitoring', impact: 'Medium', effort: 'high' }
      ],
      longTerm: [
        { action: 'Develop automated optimization system', impact: 'High', effort: 'high' },
        { action: 'Implement predictive scaling', impact: 'Medium', effort: 'high' }
      ]
    }
  }

  private calculateHealthScore(systemHealth: any, overview: any): number {
    let score = 100

    // Deduct points for issues
    score -= systemHealth.criticalIssues.length * 20
    score -= systemHealth.warningIssues.length * 10

    // Adjust based on success rate
    if (overview.overallSuccessRate < 0.9) {
      score -= (0.9 - overview.overallSuccessRate) * 100
    }

    return Math.max(0, Math.min(100, score))
  }

  private async getRecentExecutionIds(limit: number): Promise<string[]> {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('agent_execution_metrics')
        .select('execution_id')
        .order('start_time', { ascending: false })
        .limit(limit)

      return data?.map(row => row.execution_id) || []
    } catch (error) {
      console.error('Failed to get recent execution IDs:', error)
      return []
    }
  }

  private convertToCSV(data: any): string {
    // Implementation for CSV conversion
    return JSON.stringify(data) // Placeholder
  }

  private async convertToExcel(data: any): Promise<any> {
    // Implementation for Excel conversion
    return data // Placeholder
  }

  private async storeExportData(data: any, format: string): Promise<string> {
    // Implementation for storing export data and returning download URL
    return `https://example.com/exports/dashboard-${Date.now()}.${format}`
  }

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
}