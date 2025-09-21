import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  DashboardConfig, 
  RealTimeMetrics,
  DashboardConfigSchema,
  RealTimeMetricsSchema
} from './types'
import { agentPerformanceMonitor } from './agent-performance-monitor'
import { tokenUsageAnalytics } from './token-usage-analytics'
import { agentSuccessMetrics } from './agent-success-metrics'
import { agentDebuggingInterface } from './agent-debugging-interface'
import { abTestingFramework } from './ab-testing-framework'
import { sendMetrics } from '../utils/monitoring'

/**
 * Comprehensive monitoring dashboard that aggregates all MAS monitoring components
 */
export class MonitoringDashboard {
  private dashboardConfigs: Map<string, DashboardConfig> = new Map()
  private realTimeMetrics: RealTimeMetrics | null = null
  private metricsUpdateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeRealTimeMetrics()
  }

  /**
   * Create a new dashboard configuration
   */
  async createDashboard(
    userId: string,
    dashboardName: string,
    widgets: DashboardConfig['widgets'],
    filters?: DashboardConfig['filters']
  ): Promise<DashboardConfig> {
    const dashboardId = `dashboard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const config: DashboardConfig = {
      userId,
      dashboardId,
      name: dashboardName,
      widgets,
      filters,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const validatedConfig = DashboardConfigSchema.parse(config)
    this.dashboardConfigs.set(dashboardId, validatedConfig)

    await sendMetrics('dashboard.created', {
      dashboardId,
      userId,
      widgetCount: widgets.length
    })

    return validatedConfig
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(
    dashboardId: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<{
    config: DashboardConfig
    widgets: Array<{
      id: string
      type: string
      data: any
      lastUpdated: Date
    }>
    realTimeMetrics: RealTimeMetrics
    alerts: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      message: string
      timestamp: Date
    }>
  }> {
    const config = this.dashboardConfigs.get(dashboardId)
    if (!config) {
      throw new Error(`Dashboard not found: ${dashboardId}`)
    }

    // Generate data for each widget
    const widgets = await Promise.all(
      config.widgets.map(async widget => ({
        id: widget.id,
        type: widget.type,
        data: await this.generateWidgetData(widget, timeRange, config.filters),
        lastUpdated: new Date()
      }))
    )

    // Get real-time metrics
    const realTimeMetrics = await this.getRealTimeMetrics()

    // Generate alerts
    const alerts = await this.generateAlerts(config.filters)

    return {
      config,
      widgets,
      realTimeMetrics,
      alerts
    }
  }

  /**
   * Get real-time metrics across all monitoring components
   */
  async getRealTimeMetrics(): Promise<RealTimeMetrics> {
    const performanceMetrics = await agentPerformanceMonitor.getRealTimeMetrics()
    const usageMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    const successMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()

    const metrics: RealTimeMetrics = {
      timestamp: new Date(),
      activeAgents: performanceMetrics.activeExecutions,
      queuedTasks: 0, // Would be calculated from task queue
      averageResponseTime: performanceMetrics.averageResponseTime,
      tokensPerMinute: usageMetrics.tokensPerMinute,
      successRate: successMetrics.currentSuccessRate,
      errorRate: 100 - successMetrics.currentSuccessRate,
      costPerHour: usageMetrics.costPerHour,
      systemHealth: {
        cpu: performanceMetrics.systemHealth.cpu,
        memory: performanceMetrics.systemHealth.memory,
        disk: 75, // Mock value
        network: 85 // Mock value
      }
    }

    this.realTimeMetrics = RealTimeMetricsSchema.parse(metrics)
    return this.realTimeMetrics
  }

  /**
   * Generate comprehensive monitoring report
   */
  async generateMonitoringReport(
    timeRange: { start: Date; end: Date },
    agentTypes?: string[]
  ): Promise<{
    executiveSummary: string
    performanceAnalysis: any
    costAnalysis: any
    qualityAnalysis: any
    recommendations: string[]
    charts: any[]
    kpis: {
      overallSuccessRate: number
      averageResponseTime: number
      totalCost: number
      qualityScore: number
      reliabilityScore: number
    }
  }> {
    // Gather data from all monitoring components
    const performanceData = await Promise.all(
      (agentTypes || ['document_processing', 'policy_analysis', 'case_decision']).map(
        agentType => agentPerformanceMonitor.getAgentMetrics(agentType, timeRange)
      )
    )

    const costData = await tokenUsageAnalytics.getCostAnalysis(timeRange)
    
    const qualityData = await Promise.all(
      (agentTypes || ['document_processing', 'policy_analysis', 'case_decision']).map(
        agentType => agentSuccessMetrics.getSuccessMetrics(agentType, timeRange)
      )
    )

    // Calculate KPIs
    const kpis = this.calculateKPIs(performanceData, costData, qualityData)

    // Generate executive summary
    const { text: executiveSummary } = await generateText({
      model: openai('gpt-4o'),
      system: `You are an executive reporting specialist for AI systems. Generate comprehensive executive summaries.
      
      Focus on:
      - Key performance indicators and trends
      - Business impact and ROI
      - Critical issues and opportunities
      - Strategic recommendations
      - Clear, non-technical language for executives`,
      prompt: `Generate an executive summary for MAS monitoring report:
      
      Time Period: ${timeRange.start.toISOString()} to ${timeRange.end.toISOString()}
      
      KPIs:
      - Success Rate: ${kpis.overallSuccessRate.toFixed(1)}%
      - Average Response Time: ${kpis.averageResponseTime.toFixed(0)}ms
      - Total Cost: $${kpis.totalCost.toFixed(2)}
      - Quality Score: ${kpis.qualityScore.toFixed(1)}/100
      - Reliability Score: ${kpis.reliabilityScore.toFixed(1)}%
      
      Performance Data: ${JSON.stringify(performanceData.slice(0, 2), null, 2)}
      Cost Analysis: ${JSON.stringify(costData.breakdown, null, 2)}
      
      Provide a clear, executive-level summary with key insights and recommendations.`
    })

    // Generate detailed recommendations
    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        recommendations: z.array(z.object({
          category: z.enum(['performance', 'cost', 'quality', 'reliability', 'strategic']),
          priority: z.enum(['high', 'medium', 'low']),
          recommendation: z.string(),
          expectedImpact: z.string(),
          implementationEffort: z.enum(['low', 'medium', 'high']),
          timeline: z.string()
        }))
      }),
      system: 'You are a strategic advisor for AI systems. Provide specific, actionable recommendations.',
      prompt: `Based on the monitoring data, provide strategic recommendations:
      
      Performance Issues: ${JSON.stringify(performanceData.map(p => p.trendAnalysis), null, 2)}
      Cost Trends: ${JSON.stringify(costData.trends, null, 2)}
      Quality Metrics: ${JSON.stringify(qualityData.map(q => q.trends), null, 2)}
      
      Focus on high-impact, implementable recommendations.`
    })

    return {
      executiveSummary,
      performanceAnalysis: performanceData,
      costAnalysis: costData,
      qualityAnalysis: qualityData,
      recommendations: recommendations.recommendations.map(r => 
        `[${r.priority.toUpperCase()}] ${r.recommendation} (${r.timeline})`
      ),
      charts: this.generateReportCharts(performanceData, costData, qualityData),
      kpis
    }
  }

  /**
   * Get system health status
   */
  async getSystemHealthStatus(): Promise<{
    overall: 'healthy' | 'warning' | 'critical'
    components: Array<{
      name: string
      status: 'healthy' | 'warning' | 'critical'
      metrics: Record<string, number>
      issues: string[]
    }>
    recommendations: string[]
  }> {
    const components = [
      {
        name: 'Agent Performance',
        status: await this.assessAgentPerformanceHealth(),
        metrics: await this.getAgentPerformanceHealthMetrics(),
        issues: await this.getAgentPerformanceIssues()
      },
      {
        name: 'Token Usage & Costs',
        status: await this.assessTokenUsageHealth(),
        metrics: await this.getTokenUsageHealthMetrics(),
        issues: await this.getTokenUsageIssues()
      },
      {
        name: 'Quality & Success Rates',
        status: await this.assessQualityHealth(),
        metrics: await this.getQualityHealthMetrics(),
        issues: await this.getQualityIssues()
      },
      {
        name: 'System Resources',
        status: await this.assessSystemResourceHealth(),
        metrics: await this.getSystemResourceMetrics(),
        issues: await this.getSystemResourceIssues()
      }
    ]

    // Determine overall health
    const criticalComponents = components.filter(c => c.status === 'critical')
    const warningComponents = components.filter(c => c.status === 'warning')
    
    let overall: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (criticalComponents.length > 0) overall = 'critical'
    else if (warningComponents.length > 0) overall = 'warning'

    // Generate health recommendations
    const recommendations = await this.generateHealthRecommendations(components, overall)

    return {
      overall,
      components,
      recommendations
    }
  }

  /**
   * Start real-time metrics collection
   */
  startRealTimeMetrics(intervalMs: number = 30000): void {
    if (this.metricsUpdateInterval) {
      clearInterval(this.metricsUpdateInterval)
    }

    this.metricsUpdateInterval = setInterval(async () => {
      try {
        await this.getRealTimeMetrics()
        if (this.realTimeMetrics) {
          await sendMetrics('dashboard.realtime_update', this.realTimeMetrics)
        }
      } catch (error) {
        console.error('Error updating real-time metrics:', error)
      }
    }, intervalMs)
  }

  /**
   * Stop real-time metrics collection
   */
  stopRealTimeMetrics(): void {
    if (this.metricsUpdateInterval) {
      clearInterval(this.metricsUpdateInterval)
      this.metricsUpdateInterval = null
    }
  }

  /**
   * Export dashboard configuration
   */
  exportDashboardConfig(dashboardId: string): DashboardConfig | null {
    return this.dashboardConfigs.get(dashboardId) || null
  }

  /**
   * Import dashboard configuration
   */
  async importDashboardConfig(config: DashboardConfig): Promise<void> {
    const validatedConfig = DashboardConfigSchema.parse(config)
    this.dashboardConfigs.set(config.dashboardId, validatedConfig)

    await sendMetrics('dashboard.imported', {
      dashboardId: config.dashboardId,
      userId: config.userId
    })
  }

  // Private helper methods

  private initializeRealTimeMetrics(): void {
    // Initialize with default values
    this.realTimeMetrics = {
      timestamp: new Date(),
      activeAgents: 0,
      queuedTasks: 0,
      averageResponseTime: 0,
      tokensPerMinute: 0,
      successRate: 0,
      errorRate: 0,
      costPerHour: 0,
      systemHealth: {
        cpu: 0,
        memory: 0,
        disk: 0,
        network: 0
      }
    }
  }

  private async generateWidgetData(
    widget: DashboardConfig['widgets'][0],
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    switch (widget.type) {
      case 'agent_performance_chart':
        return this.generateAgentPerformanceChartData(timeRange, filters)
      
      case 'token_usage_chart':
        return this.generateTokenUsageChartData(timeRange, filters)
      
      case 'success_rate_gauge':
        return this.generateSuccessRateGaugeData(timeRange, filters)
      
      case 'cost_analysis_chart':
        return this.generateCostAnalysisChartData(timeRange, filters)
      
      case 'quality_metrics_chart':
        return this.generateQualityMetricsChartData(timeRange, filters)
      
      case 'ab_test_results':
        return this.generateABTestResultsData(filters)
      
      case 'error_log_table':
        return this.generateErrorLogTableData(timeRange, filters)
      
      case 'real_time_metrics':
        return this.realTimeMetrics
      
      default:
        return { error: `Unknown widget type: ${widget.type}` }
    }
  }

  private async generateAgentPerformanceChartData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const agentTypes = filters?.agentTypes || ['document_processing', 'policy_analysis', 'case_decision']
    
    const data = await Promise.all(
      agentTypes.map(async agentType => {
        const metrics = await agentPerformanceMonitor.getAgentMetrics(agentType, timeRange)
        return {
          agentType,
          averageDuration: metrics.averageDuration,
          successRate: metrics.successRate,
          totalExecutions: metrics.totalExecutions
        }
      })
    )

    return {
      type: 'bar',
      data,
      xAxis: 'agentType',
      yAxis: 'averageDuration',
      title: 'Agent Performance Comparison'
    }
  }

  private async generateTokenUsageChartData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const realTimeMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    
    return {
      type: 'line',
      data: {
        tokensPerMinute: realTimeMetrics.tokensPerMinute,
        costPerHour: realTimeMetrics.costPerHour,
        topConsumers: realTimeMetrics.topConsumers
      },
      title: 'Token Usage Trends'
    }
  }

  private async generateSuccessRateGaugeData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const realTimeMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
    
    return {
      type: 'gauge',
      value: realTimeMetrics.currentSuccessRate,
      min: 0,
      max: 100,
      title: 'Overall Success Rate',
      thresholds: {
        good: 90,
        warning: 75,
        critical: 60
      }
    }
  }

  private async generateCostAnalysisChartData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const costAnalysis = await tokenUsageAnalytics.getCostAnalysis(
      timeRange || { start: new Date(Date.now() - 24 * 60 * 60 * 1000), end: new Date() }
    )
    
    return {
      type: 'pie',
      data: costAnalysis.breakdown.modelCosts,
      title: 'Cost Breakdown by Model'
    }
  }

  private async generateQualityMetricsChartData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const agentTypes = filters?.agentTypes || ['document_processing', 'policy_analysis']
    
    const data = await Promise.all(
      agentTypes.map(async agentType => {
        const metrics = await agentSuccessMetrics.getSuccessMetrics(agentType, timeRange)
        return {
          agentType,
          qualityScore: metrics.qualityScore,
          reliabilityScore: metrics.reliabilityScore,
          userSatisfactionScore: metrics.userSatisfactionScore
        }
      })
    )

    return {
      type: 'radar',
      data,
      title: 'Quality Metrics by Agent Type'
    }
  }

  private async generateABTestResultsData(
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    const activeTests = abTestingFramework.getActiveTests()
    
    const testResults = await Promise.all(
      activeTests.slice(0, 5).map(async test => {
        const analysis = await abTestingFramework.getTestAnalysis(test.testId)
        return {
          testId: test.testId,
          name: test.name,
          status: test.status,
          sampleSize: analysis.sampleSize,
          variants: analysis.variants.length
        }
      })
    )

    return {
      type: 'table',
      data: testResults,
      title: 'Active A/B Tests'
    }
  }

  private async generateErrorLogTableData(
    timeRange?: { start: Date; end: Date },
    filters?: DashboardConfig['filters']
  ): Promise<any> {
    // This would query error logs from the database
    // For now, returning mock data
    return {
      type: 'table',
      data: [
        {
          timestamp: new Date(),
          agentType: 'document_processing',
          error: 'Tool execution timeout',
          severity: 'medium'
        }
      ],
      title: 'Recent Errors'
    }
  }

  private async generateAlerts(
    filters?: DashboardConfig['filters']
  ): Promise<Array<{
    type: string
    severity: 'low' | 'medium' | 'high'
    message: string
    timestamp: Date
  }>> {
    const alerts: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      message: string
      timestamp: Date
    }> = []

    // Get alerts from various monitoring components
    const usageMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    alerts.push(...usageMetrics.alerts.map(alert => ({
      type: alert.type,
      severity: alert.severity,
      message: alert.message,
      timestamp: new Date()
    })))

    const successMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
    alerts.push(...successMetrics.activeIssues.map(issue => ({
      type: issue.type,
      severity: issue.severity,
      message: issue.description,
      timestamp: new Date()
    })))

    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)
  }

  private calculateKPIs(
    performanceData: any[],
    costData: any,
    qualityData: any[]
  ): {
    overallSuccessRate: number
    averageResponseTime: number
    totalCost: number
    qualityScore: number
    reliabilityScore: number
  } {
    const overallSuccessRate = performanceData.length > 0 
      ? performanceData.reduce((sum, p) => sum + p.successRate, 0) / performanceData.length 
      : 0

    const averageResponseTime = performanceData.length > 0
      ? performanceData.reduce((sum, p) => sum + p.averageDuration, 0) / performanceData.length
      : 0

    const qualityScore = qualityData.length > 0
      ? qualityData.reduce((sum, q) => sum + q.qualityScore, 0) / qualityData.length
      : 0

    const reliabilityScore = qualityData.length > 0
      ? qualityData.reduce((sum, q) => sum + q.reliabilityScore, 0) / qualityData.length
      : 0

    return {
      overallSuccessRate,
      averageResponseTime,
      totalCost: costData.breakdown.totalCost,
      qualityScore,
      reliabilityScore
    }
  }

  private generateReportCharts(
    performanceData: any[],
    costData: any,
    qualityData: any[]
  ): any[] {
    return [
      {
        type: 'line',
        title: 'Performance Trends',
        data: 'performance_timeline'
      },
      {
        type: 'pie',
        title: 'Cost Distribution',
        data: costData.breakdown.modelCosts
      },
      {
        type: 'bar',
        title: 'Quality Scores by Agent',
        data: qualityData.map(q => ({ agent: 'agent', score: q.qualityScore }))
      }
    ]
  }

  // Health assessment methods
  private async assessAgentPerformanceHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    const realTimeMetrics = await agentPerformanceMonitor.getRealTimeMetrics()
    
    if (realTimeMetrics.successRate < 0.7) return 'critical'
    if (realTimeMetrics.successRate < 0.85) return 'warning'
    return 'healthy'
  }

  private async getAgentPerformanceHealthMetrics(): Promise<Record<string, number>> {
    const realTimeMetrics = await agentPerformanceMonitor.getRealTimeMetrics()
    return {
      activeExecutions: realTimeMetrics.activeExecutions,
      averageResponseTime: realTimeMetrics.averageResponseTime,
      successRate: realTimeMetrics.successRate
    }
  }

  private async getAgentPerformanceIssues(): Promise<string[]> {
    const realTimeMetrics = await agentPerformanceMonitor.getRealTimeMetrics()
    const issues: string[] = []
    
    if (realTimeMetrics.successRate < 0.85) {
      issues.push(`Low success rate: ${(realTimeMetrics.successRate * 100).toFixed(1)}%`)
    }
    
    if (realTimeMetrics.averageResponseTime > 5000) {
      issues.push(`High response time: ${realTimeMetrics.averageResponseTime}ms`)
    }
    
    return issues
  }

  private async assessTokenUsageHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    const usageMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    
    if (usageMetrics.costPerHour > 50) return 'critical'
    if (usageMetrics.costPerHour > 25) return 'warning'
    return 'healthy'
  }

  private async getTokenUsageHealthMetrics(): Promise<Record<string, number>> {
    const usageMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    return {
      tokensPerMinute: usageMetrics.tokensPerMinute,
      costPerHour: usageMetrics.costPerHour
    }
  }

  private async getTokenUsageIssues(): Promise<string[]> {
    const usageMetrics = tokenUsageAnalytics.getRealTimeUsageMetrics()
    return usageMetrics.alerts.map(alert => alert.message)
  }

  private async assessQualityHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    const successMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
    
    if (successMetrics.currentSuccessRate < 70) return 'critical'
    if (successMetrics.currentSuccessRate < 85) return 'warning'
    return 'healthy'
  }

  private async getQualityHealthMetrics(): Promise<Record<string, number>> {
    const successMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
    return {
      currentSuccessRate: successMetrics.currentSuccessRate
    }
  }

  private async getQualityIssues(): Promise<string[]> {
    const successMetrics = agentSuccessMetrics.getRealTimeSuccessMetrics()
    return successMetrics.activeIssues.map(issue => issue.description)
  }

  private async assessSystemResourceHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    const realTimeMetrics = await this.getRealTimeMetrics()
    const { cpu, memory } = realTimeMetrics.systemHealth
    
    if (cpu > 90 || memory > 90) return 'critical'
    if (cpu > 75 || memory > 75) return 'warning'
    return 'healthy'
  }

  private async getSystemResourceMetrics(): Promise<Record<string, number>> {
    const realTimeMetrics = await this.getRealTimeMetrics()
    return realTimeMetrics.systemHealth
  }

  private async getSystemResourceIssues(): Promise<string[]> {
    const realTimeMetrics = await this.getRealTimeMetrics()
    const issues: string[] = []
    const { cpu, memory, disk } = realTimeMetrics.systemHealth
    
    if (cpu > 85) issues.push(`High CPU usage: ${cpu}%`)
    if (memory > 85) issues.push(`High memory usage: ${memory}%`)
    if (disk > 85) issues.push(`High disk usage: ${disk}%`)
    
    return issues
  }

  private async generateHealthRecommendations(
    components: any[],
    overall: 'healthy' | 'warning' | 'critical'
  ): Promise<string[]> {
    const recommendations: string[] = []
    
    if (overall === 'critical') {
      recommendations.push('Immediate attention required - critical system issues detected')
    }
    
    components.forEach(component => {
      if (component.status === 'critical') {
        recommendations.push(`Address critical issues in ${component.name}`)
      }
      component.issues.forEach((issue: string) => {
        recommendations.push(`${component.name}: ${issue}`)
      })
    })
    
    return recommendations
  }
}

// Export singleton instance
export const monitoringDashboard = new MonitoringDashboard()