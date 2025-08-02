import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  QualityAssessment, 
  PerformanceBenchmark,
  QualityAssessmentSchema,
  PerformanceBenchmarkSchema
} from './types'
import { AgentExecutionMetrics } from './types'
import { sendMetrics } from '../utils/monitoring'

/**
 * Agent success metrics dashboard using AI SDK v5's step analysis with quality benchmarking
 */
export class AgentSuccessMetrics {
  private qualityAssessments: Map<string, QualityAssessment[]> = new Map()
  private benchmarks: Map<string, PerformanceBenchmark> = new Map()
  private successCriteria: Map<string, SuccessCriteria> = new Map()

  constructor() {
    this.initializeDefaultSuccessCriteria()
  }

  /**
   * Assess the quality of an agent execution
   */
  async assessExecutionQuality(
    executionId: string,
    agentName: string,
    result: any,
    steps: any[],
    userFeedback?: number
  ): Promise<QualityAssessment> {
    const criteria = this.getSuccessCriteria(agentName)
    
    // Automated quality assessment
    const automatedScores = await this.performAutomatedAssessment(
      agentName,
      result,
      steps,
      criteria
    )

    // Combine with user feedback if available
    const finalScores = this.combineAssessmentScores(automatedScores, userFeedback)

    const assessment: QualityAssessment = {
      executionId,
      agentName,
      assessmentType: userFeedback ? 'hybrid' : 'automated',
      criteria: finalScores,
      overallScore: this.calculateOverallScore(finalScores),
      timestamp: new Date(),
      recommendations: await this.generateQualityRecommendations(finalScores, steps)
    }

    const validatedAssessment = QualityAssessmentSchema.parse(assessment)

    // Store assessment
    this.storeQualityAssessment(validatedAssessment)

    // Send metrics
    await sendMetrics('quality.assessment', validatedAssessment)

    return validatedAssessment
  }

  /**
   * Get success metrics for an agent type
   */
  async getSuccessMetrics(
    agentType: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<{
    overallSuccessRate: number
    qualityScore: number
    reliabilityScore: number
    userSatisfactionScore: number
    performanceGrade: 'A' | 'B' | 'C' | 'D' | 'F'
    trends: {
      qualityTrend: 'improving' | 'declining' | 'stable'
      reliabilityTrend: 'improving' | 'declining' | 'stable'
      satisfactionTrend: 'improving' | 'declining' | 'stable'
    }
    benchmarkComparison: {
      meetsQualityBenchmark: boolean
      meetsReliabilityBenchmark: boolean
      meetsPerformanceBenchmark: boolean
    }
    recommendations: string[]
  }> {
    const assessments = this.getAssessmentsForAgent(agentType, timeRange)
    const benchmark = this.benchmarks.get(agentType)

    if (assessments.length === 0) {
      return this.getDefaultSuccessMetrics()
    }

    // Calculate metrics
    const overallSuccessRate = this.calculateSuccessRate(assessments)
    const qualityScore = this.calculateAverageQualityScore(assessments)
    const reliabilityScore = this.calculateReliabilityScore(assessments)
    const userSatisfactionScore = this.calculateUserSatisfactionScore(assessments)
    const performanceGrade = this.calculatePerformanceGrade(qualityScore, reliabilityScore, userSatisfactionScore)

    // Analyze trends
    const trends = this.analyzeTrends(assessments)

    // Benchmark comparison
    const benchmarkComparison = this.compareToBenchmarks(
      { qualityScore, reliabilityScore, overallSuccessRate },
      benchmark
    )

    // Generate recommendations
    const recommendations = await this.generateSuccessRecommendations(
      agentType,
      { overallSuccessRate, qualityScore, reliabilityScore, userSatisfactionScore },
      trends,
      benchmarkComparison
    )

    return {
      overallSuccessRate,
      qualityScore,
      reliabilityScore,
      userSatisfactionScore,
      performanceGrade,
      trends,
      benchmarkComparison,
      recommendations
    }
  }

  /**
   * Set success criteria for an agent type
   */
  setSuccessCriteria(agentType: string, criteria: SuccessCriteria): void {
    this.successCriteria.set(agentType, criteria)
  }

  /**
   * Generate comprehensive success report
   */
  async generateSuccessReport(
    agentType: string,
    timeRange: { start: Date; end: Date }
  ): Promise<{
    summary: string
    metrics: any
    detailedAnalysis: string
    actionPlan: string[]
    charts: any[]
  }> {
    const metrics = await this.getSuccessMetrics(agentType, timeRange)
    const assessments = this.getAssessmentsForAgent(agentType, timeRange)

    const { text: summary } = await generateText({
      model: openai('gpt-4o'),
      system: `You are an AI success analyst. Generate comprehensive success reports for multi-agent systems.
      
      Focus on:
      - Success rate analysis and trends
      - Quality assessment insights
      - User satisfaction patterns
      - Performance benchmarking
      - Actionable improvement recommendations`,
      prompt: `Generate a success report for ${agentType} agent:
      
      Metrics: ${JSON.stringify(metrics, null, 2)}
      Assessment Count: ${assessments.length}
      Time Range: ${timeRange.start.toISOString()} to ${timeRange.end.toISOString()}
      
      Provide detailed analysis with specific insights and recommendations.`
    })

    const { text: detailedAnalysis } = await generateText({
      model: openai('gpt-4o'),
      system: 'You are a performance analyst. Provide detailed technical analysis of agent performance patterns.',
      prompt: `Provide detailed analysis of performance patterns:
      
      Recent Assessments: ${JSON.stringify(assessments.slice(-10), null, 2)}
      
      Focus on patterns, anomalies, and root causes of performance variations.`
    })

    const { object: actionPlan } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        actions: z.array(z.object({
          priority: z.enum(['high', 'medium', 'low']),
          category: z.enum(['quality', 'reliability', 'performance', 'user_experience']),
          action: z.string(),
          expectedImpact: z.string(),
          timeline: z.string()
        }))
      }),
      system: 'You are an improvement strategist. Create actionable improvement plans.',
      prompt: `Create an action plan based on these metrics:
      
      ${JSON.stringify(metrics, null, 2)}
      
      Prioritize actions by impact and feasibility.`
    })

    return {
      summary,
      metrics,
      detailedAnalysis,
      actionPlan: actionPlan.actions.map(a => `[${a.priority.toUpperCase()}] ${a.action} (${a.timeline})`),
      charts: this.generateSuccessCharts(metrics, assessments)
    }
  }

  /**
   * Get real-time success metrics
   */
  getRealTimeSuccessMetrics(): {
    currentSuccessRate: number
    qualityTrend: 'up' | 'down' | 'stable'
    activeIssues: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      description: string
      affectedAgents: string[]
    }>
    topPerformers: Array<{
      agentName: string
      successRate: number
      qualityScore: number
    }>
    underperformers: Array<{
      agentName: string
      successRate: number
      qualityScore: number
      issues: string[]
    }>
  } {
    const recentAssessments = this.getRecentAssessments(24) // Last 24 hours
    
    return {
      currentSuccessRate: this.calculateSuccessRate(recentAssessments),
      qualityTrend: this.calculateQualityTrend(recentAssessments),
      activeIssues: this.identifyActiveIssues(recentAssessments),
      topPerformers: this.identifyTopPerformers(recentAssessments),
      underperformers: this.identifyUnderperformers(recentAssessments)
    }
  }

  /**
   * Compare agent performance against benchmarks
   */
  async benchmarkComparison(
    agentType: string,
    timeRange: { start: Date; end: Date }
  ): Promise<{
    currentPerformance: {
      successRate: number
      qualityScore: number
      reliabilityScore: number
    }
    benchmarkTargets: {
      successRate: number
      qualityScore: number
      reliabilityScore: number
    }
    gaps: {
      successRateGap: number
      qualityGap: number
      reliabilityGap: number
    }
    recommendations: string[]
  }> {
    const metrics = await this.getSuccessMetrics(agentType, timeRange)
    const benchmark = this.benchmarks.get(agentType)

    if (!benchmark) {
      throw new Error(`No benchmark found for agent type: ${agentType}`)
    }

    const currentPerformance = {
      successRate: metrics.overallSuccessRate,
      qualityScore: metrics.qualityScore,
      reliabilityScore: metrics.reliabilityScore
    }

    const benchmarkTargets = {
      successRate: benchmark.expectedSuccessRate,
      qualityScore: benchmark.qualityThreshold,
      reliabilityScore: 95 // Default reliability target
    }

    const gaps = {
      successRateGap: benchmarkTargets.successRate - currentPerformance.successRate,
      qualityGap: benchmarkTargets.qualityScore - currentPerformance.qualityScore,
      reliabilityGap: benchmarkTargets.reliabilityScore - currentPerformance.reliabilityScore
    }

    const recommendations = await this.generateBenchmarkRecommendations(gaps, agentType)

    return {
      currentPerformance,
      benchmarkTargets,
      gaps,
      recommendations
    }
  }

  // Private helper methods

  private initializeDefaultSuccessCriteria(): void {
    const defaultCriteria: SuccessCriteria = {
      accuracy: { weight: 0.3, threshold: 85 },
      completeness: { weight: 0.25, threshold: 90 },
      relevance: { weight: 0.2, threshold: 80 },
      timeliness: { weight: 0.15, threshold: 75 },
      usability: { weight: 0.1, threshold: 70 }
    }

    this.successCriteria.set('default', defaultCriteria)
    this.successCriteria.set('document_processing', {
      ...defaultCriteria,
      accuracy: { weight: 0.4, threshold: 95 },
      completeness: { weight: 0.3, threshold: 95 }
    })
    this.successCriteria.set('policy_analysis', {
      ...defaultCriteria,
      accuracy: { weight: 0.35, threshold: 90 },
      relevance: { weight: 0.3, threshold: 85 }
    })
  }

  private getSuccessCriteria(agentName: string): SuccessCriteria {
    return this.successCriteria.get(agentName) || this.successCriteria.get('default')!
  }

  private async performAutomatedAssessment(
    agentName: string,
    result: any,
    steps: any[],
    criteria: SuccessCriteria
  ): Promise<Array<{ name: string; weight: number; score: number; feedback?: string }>> {
    const { object: assessment } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        scores: z.array(z.object({
          criterion: z.string(),
          score: z.number().min(0).max(100),
          reasoning: z.string(),
          evidence: z.array(z.string())
        }))
      }),
      system: `You are a quality assessment specialist for AI agents. Evaluate agent performance against specific criteria.
      
      Assessment Criteria:
      - Accuracy: Correctness of the output
      - Completeness: How thoroughly the task was completed
      - Relevance: How well the output addresses the request
      - Timeliness: Efficiency of execution
      - Usability: How useful the output is to the user`,
      prompt: `Assess the quality of this ${agentName} execution:
      
      Result: ${JSON.stringify(result, null, 2)}
      Steps: ${steps.length} steps taken
      
      Evaluate each criterion and provide scores (0-100) with reasoning.`
    })

    return assessment.scores.map(score => ({
      name: score.criterion.toLowerCase(),
      weight: criteria[score.criterion.toLowerCase() as keyof SuccessCriteria]?.weight || 0.2,
      score: score.score,
      feedback: score.reasoning
    }))
  }

  private combineAssessmentScores(
    automatedScores: Array<{ name: string; weight: number; score: number; feedback?: string }>,
    userFeedback?: number
  ): Array<{ name: string; weight: number; score: number; feedback?: string }> {
    if (!userFeedback) return automatedScores

    // Adjust automated scores based on user feedback
    const userScore = (userFeedback / 5) * 100 // Convert 1-5 scale to 0-100
    const adjustmentFactor = userScore / 100

    return automatedScores.map(score => ({
      ...score,
      score: Math.round(score.score * (0.7 + 0.3 * adjustmentFactor)) // Blend automated and user scores
    }))
  }

  private calculateOverallScore(
    scores: Array<{ name: string; weight: number; score: number }>
  ): number {
    const weightedSum = scores.reduce((sum, score) => sum + (score.score * score.weight), 0)
    const totalWeight = scores.reduce((sum, score) => sum + score.weight, 0)
    return Math.round(weightedSum / totalWeight)
  }

  private async generateQualityRecommendations(
    scores: Array<{ name: string; weight: number; score: number; feedback?: string }>,
    steps: any[]
  ): Promise<string[]> {
    const lowScores = scores.filter(s => s.score < 70)
    
    if (lowScores.length === 0) {
      return ['Performance meets quality standards']
    }

    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        recommendations: z.array(z.string())
      }),
      system: 'You are a quality improvement specialist. Provide specific recommendations for improving agent performance.',
      prompt: `Provide improvement recommendations for these low-scoring areas:
      
      ${lowScores.map(s => `${s.name}: ${s.score}/100 - ${s.feedback}`).join('\n')}
      
      Focus on actionable improvements.`
    })

    return recommendations.recommendations
  }

  private storeQualityAssessment(assessment: QualityAssessment): void {
    if (!this.qualityAssessments.has(assessment.agentName)) {
      this.qualityAssessments.set(assessment.agentName, [])
    }
    this.qualityAssessments.get(assessment.agentName)!.push(assessment)

    // Keep only last 1000 assessments per agent
    const assessments = this.qualityAssessments.get(assessment.agentName)!
    if (assessments.length > 1000) {
      assessments.splice(0, assessments.length - 1000)
    }
  }

  private getAssessmentsForAgent(
    agentType: string,
    timeRange?: { start: Date; end: Date }
  ): QualityAssessment[] {
    const assessments = this.qualityAssessments.get(agentType) || []
    
    if (!timeRange) return assessments
    
    return assessments.filter(a => 
      a.timestamp >= timeRange.start && a.timestamp <= timeRange.end
    )
  }

  private calculateSuccessRate(assessments: QualityAssessment[]): number {
    if (assessments.length === 0) return 0
    
    const successfulAssessments = assessments.filter(a => a.overallScore >= 70)
    return (successfulAssessments.length / assessments.length) * 100
  }

  private calculateAverageQualityScore(assessments: QualityAssessment[]): number {
    if (assessments.length === 0) return 0
    
    const totalScore = assessments.reduce((sum, a) => sum + a.overallScore, 0)
    return totalScore / assessments.length
  }

  private calculateReliabilityScore(assessments: QualityAssessment[]): number {
    if (assessments.length === 0) return 0
    
    // Reliability based on consistency of performance
    const scores = assessments.map(a => a.overallScore)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)
    
    // Lower standard deviation = higher reliability
    return Math.max(0, 100 - standardDeviation)
  }

  private calculateUserSatisfactionScore(assessments: QualityAssessment[]): number {
    const userAssessments = assessments.filter(a => a.assessmentType === 'human' || a.assessmentType === 'hybrid')
    
    if (userAssessments.length === 0) return 0
    
    const totalScore = userAssessments.reduce((sum, a) => sum + a.overallScore, 0)
    return totalScore / userAssessments.length
  }

  private calculatePerformanceGrade(
    qualityScore: number,
    reliabilityScore: number,
    userSatisfactionScore: number
  ): 'A' | 'B' | 'C' | 'D' | 'F' {
    const overallScore = (qualityScore * 0.5) + (reliabilityScore * 0.3) + (userSatisfactionScore * 0.2)
    
    if (overallScore >= 90) return 'A'
    if (overallScore >= 80) return 'B'
    if (overallScore >= 70) return 'C'
    if (overallScore >= 60) return 'D'
    return 'F'
  }

  private analyzeTrends(assessments: QualityAssessment[]): {
    qualityTrend: 'improving' | 'declining' | 'stable'
    reliabilityTrend: 'improving' | 'declining' | 'stable'
    satisfactionTrend: 'improving' | 'declining' | 'stable'
  } {
    if (assessments.length < 10) {
      return {
        qualityTrend: 'stable',
        reliabilityTrend: 'stable',
        satisfactionTrend: 'stable'
      }
    }

    const sortedAssessments = assessments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    const recent = sortedAssessments.slice(-5)
    const older = sortedAssessments.slice(-10, -5)

    const recentQuality = recent.reduce((sum, a) => sum + a.overallScore, 0) / recent.length
    const olderQuality = older.reduce((sum, a) => sum + a.overallScore, 0) / older.length

    let qualityTrend: 'improving' | 'declining' | 'stable' = 'stable'
    if (recentQuality > olderQuality * 1.05) qualityTrend = 'improving'
    else if (recentQuality < olderQuality * 0.95) qualityTrend = 'declining'

    return {
      qualityTrend,
      reliabilityTrend: 'stable', // Would calculate based on reliability metrics
      satisfactionTrend: 'stable' // Would calculate based on user satisfaction trends
    }
  }

  private compareToBenchmarks(
    metrics: { qualityScore: number; reliabilityScore: number; overallSuccessRate: number },
    benchmark?: PerformanceBenchmark
  ): {
    meetsQualityBenchmark: boolean
    meetsReliabilityBenchmark: boolean
    meetsPerformanceBenchmark: boolean
  } {
    if (!benchmark) {
      return {
        meetsQualityBenchmark: false,
        meetsReliabilityBenchmark: false,
        meetsPerformanceBenchmark: false
      }
    }

    return {
      meetsQualityBenchmark: metrics.qualityScore >= benchmark.qualityThreshold,
      meetsReliabilityBenchmark: metrics.reliabilityScore >= 90, // Default reliability benchmark
      meetsPerformanceBenchmark: metrics.overallSuccessRate >= benchmark.expectedSuccessRate
    }
  }

  private async generateSuccessRecommendations(
    agentType: string,
    metrics: { overallSuccessRate: number; qualityScore: number; reliabilityScore: number; userSatisfactionScore: number },
    trends: any,
    benchmarkComparison: any
  ): Promise<string[]> {
    const recommendations: string[] = []

    if (metrics.overallSuccessRate < 80) {
      recommendations.push('Success rate below 80% - review failure patterns and implement improvements')
    }

    if (metrics.qualityScore < 75) {
      recommendations.push('Quality score needs improvement - focus on accuracy and completeness')
    }

    if (metrics.reliabilityScore < 85) {
      recommendations.push('Reliability issues detected - investigate performance consistency')
    }

    if (trends.qualityTrend === 'declining') {
      recommendations.push('Quality trend is declining - immediate attention required')
    }

    return recommendations
  }

  private getDefaultSuccessMetrics() {
    return {
      overallSuccessRate: 0,
      qualityScore: 0,
      reliabilityScore: 0,
      userSatisfactionScore: 0,
      performanceGrade: 'F' as const,
      trends: {
        qualityTrend: 'stable' as const,
        reliabilityTrend: 'stable' as const,
        satisfactionTrend: 'stable' as const
      },
      benchmarkComparison: {
        meetsQualityBenchmark: false,
        meetsReliabilityBenchmark: false,
        meetsPerformanceBenchmark: false
      },
      recommendations: ['No data available for analysis']
    }
  }

  private getRecentAssessments(hours: number): QualityAssessment[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000)
    const allAssessments: QualityAssessment[] = []
    
    for (const assessments of this.qualityAssessments.values()) {
      allAssessments.push(...assessments.filter(a => a.timestamp >= cutoff))
    }
    
    return allAssessments
  }

  private calculateQualityTrend(assessments: QualityAssessment[]): 'up' | 'down' | 'stable' {
    if (assessments.length < 5) return 'stable'
    
    const sortedAssessments = assessments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    const recent = sortedAssessments.slice(-3)
    const older = sortedAssessments.slice(-6, -3)
    
    const recentAvg = recent.reduce((sum, a) => sum + a.overallScore, 0) / recent.length
    const olderAvg = older.reduce((sum, a) => sum + a.overallScore, 0) / older.length
    
    if (recentAvg > olderAvg * 1.05) return 'up'
    if (recentAvg < olderAvg * 0.95) return 'down'
    return 'stable'
  }

  private identifyActiveIssues(assessments: QualityAssessment[]): Array<{
    type: string
    severity: 'low' | 'medium' | 'high'
    description: string
    affectedAgents: string[]
  }> {
    const issues: Array<{
      type: string
      severity: 'low' | 'medium' | 'high'
      description: string
      affectedAgents: string[]
    }> = []

    // Identify low-performing agents
    const agentPerformance = new Map<string, number[]>()
    assessments.forEach(a => {
      if (!agentPerformance.has(a.agentName)) {
        agentPerformance.set(a.agentName, [])
      }
      agentPerformance.get(a.agentName)!.push(a.overallScore)
    })

    for (const [agentName, scores] of agentPerformance.entries()) {
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
      if (avgScore < 60) {
        issues.push({
          type: 'low_performance',
          severity: 'high',
          description: `${agentName} has low average performance (${avgScore.toFixed(1)})`,
          affectedAgents: [agentName]
        })
      }
    }

    return issues
  }

  private identifyTopPerformers(assessments: QualityAssessment[]): Array<{
    agentName: string
    successRate: number
    qualityScore: number
  }> {
    const agentStats = new Map<string, { scores: number[]; successes: number }>()
    
    assessments.forEach(a => {
      if (!agentStats.has(a.agentName)) {
        agentStats.set(a.agentName, { scores: [], successes: 0 })
      }
      const stats = agentStats.get(a.agentName)!
      stats.scores.push(a.overallScore)
      if (a.overallScore >= 70) stats.successes++
    })

    return Array.from(agentStats.entries())
      .map(([agentName, stats]) => ({
        agentName,
        successRate: (stats.successes / stats.scores.length) * 100,
        qualityScore: stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length
      }))
      .filter(agent => agent.qualityScore >= 80)
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 5)
  }

  private identifyUnderperformers(assessments: QualityAssessment[]): Array<{
    agentName: string
    successRate: number
    qualityScore: number
    issues: string[]
  }> {
    const agentStats = new Map<string, { scores: number[]; successes: number; issues: string[] }>()
    
    assessments.forEach(a => {
      if (!agentStats.has(a.agentName)) {
        agentStats.set(a.agentName, { scores: [], successes: 0, issues: [] })
      }
      const stats = agentStats.get(a.agentName)!
      stats.scores.push(a.overallScore)
      if (a.overallScore >= 70) stats.successes++
      if (a.overallScore < 60) {
        stats.issues.push(`Low score: ${a.overallScore}`)
      }
    })

    return Array.from(agentStats.entries())
      .map(([agentName, stats]) => ({
        agentName,
        successRate: (stats.successes / stats.scores.length) * 100,
        qualityScore: stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length,
        issues: [...new Set(stats.issues)]
      }))
      .filter(agent => agent.qualityScore < 70)
      .sort((a, b) => a.qualityScore - b.qualityScore)
      .slice(0, 5)
  }

  private generateSuccessCharts(metrics: any, assessments: QualityAssessment[]): any[] {
    return [
      {
        type: 'gauge',
        title: 'Overall Success Rate',
        data: metrics.overallSuccessRate
      },
      {
        type: 'line',
        title: 'Quality Score Trend',
        data: 'quality_timeline'
      },
      {
        type: 'bar',
        title: 'Performance by Criteria',
        data: 'criteria_scores'
      }
    ]
  }

  private async generateBenchmarkRecommendations(
    gaps: { successRateGap: number; qualityGap: number; reliabilityGap: number },
    agentType: string
  ): Promise<string[]> {
    const recommendations: string[] = []

    if (gaps.successRateGap > 5) {
      recommendations.push(`Improve success rate by ${gaps.successRateGap.toFixed(1)}% to meet benchmark`)
    }

    if (gaps.qualityGap > 5) {
      recommendations.push(`Enhance quality score by ${gaps.qualityGap.toFixed(1)} points to meet benchmark`)
    }

    if (gaps.reliabilityGap > 5) {
      recommendations.push(`Improve reliability by ${gaps.reliabilityGap.toFixed(1)}% to meet benchmark`)
    }

    return recommendations
  }
}

// Types for success criteria
interface SuccessCriteria {
  accuracy: { weight: number; threshold: number }
  completeness: { weight: number; threshold: number }
  relevance: { weight: number; threshold: number }
  timeliness: { weight: number; threshold: number }
  usability: { weight: number; threshold: number }
}

// Export singleton instance
export const agentSuccessMetrics = new AgentSuccessMetrics()