import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  DebuggingSession, 
  DebuggingSessionSchema,
  StepMetrics 
} from './types'
import { AgentStep, TokenUsage } from '../types'
import { sendMetrics } from '../utils/monitoring'

/**
 * Agent debugging interface using AI SDK v5's step inspection with execution traces
 */
export class AgentDebuggingInterface {
  private activeSessions: Map<string, DebuggingSession> = new Map()
  private debuggingEnabled: boolean = process.env.NODE_ENV === 'development'

  /**
   * Start a debugging session for an agent execution
   */
  startDebuggingSession(
    sessionId: string,
    agentName: string,
    executionId: string
  ): void {
    if (!this.debuggingEnabled) return

    const session: DebuggingSession = {
      sessionId,
      agentName,
      executionId,
      steps: [],
      summary: {
        totalDuration: 0,
        totalTokenUsage: 0,
        successRate: 0,
        issueCount: 0,
        recommendations: []
      },
      createdAt: new Date()
    }

    this.activeSessions.set(sessionId, session)
  }

  /**
   * Create step inspection callback for AI SDK v5 integration
   */
  createStepInspectionCallback(sessionId: string) {
    if (!this.debuggingEnabled) return undefined

    return ({ 
      text, 
      toolCalls, 
      toolResults, 
      finishReason, 
      usage, 
      stepNumber 
    }: {
      text: string
      toolCalls: any[]
      toolResults: any[]
      finishReason: string
      usage: TokenUsage
      stepNumber?: number
    }) => {
      const session = this.activeSessions.get(sessionId)
      if (!session) return

      const stepStartTime = Date.now()
      
      // Create detailed step record
      const stepRecord = {
        stepNumber: stepNumber || session.steps.length + 1,
        timestamp: new Date(),
        input: this.extractStepInput(text, toolCalls),
        output: this.extractStepOutput(text, toolResults),
        reasoning: this.extractReasoning(text),
        toolCalls: toolCalls.map(call => ({
          toolName: call.toolName || 'unknown',
          parameters: call.parameters || {},
          result: toolResults.find(r => r.toolCallId === call.toolCallId)?.result || null,
          duration: 0, // Would be measured in production
          success: !toolResults.find(r => r.toolCallId === call.toolCallId)?.isError
        })),
        modelResponse: {
          model: 'gpt-4o', // Would be extracted from actual model info
          temperature: undefined,
          maxTokens: undefined,
          finishReason,
          usage
        },
        performance: {
          duration: Date.now() - stepStartTime,
          memoryUsage: this.getMemoryUsage(),
          cpuUsage: this.getCpuUsage()
        },
        issues: this.identifyStepIssues(text, toolCalls, toolResults, usage)
      }

      session.steps.push(stepRecord)
      
      // Update session summary
      this.updateSessionSummary(session)

      // Send real-time debugging data
      this.sendRealTimeDebuggingData(sessionId, stepRecord)
    }
  }

  /**
   * Complete debugging session and generate analysis
   */
  async completeDebuggingSession(
    sessionId: string,
    finalResult?: any,
    error?: Error
  ): Promise<DebuggingSession> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error(`No debugging session found: ${sessionId}`)
    }

    // Final summary update
    this.updateSessionSummary(session)

    // Generate comprehensive analysis
    session.summary.recommendations = await this.generateDebuggingRecommendations(session)

    // Validate and store session
    const validatedSession = DebuggingSessionSchema.parse(session)
    await this.storeDebuggingSession(validatedSession)

    // Clean up
    this.activeSessions.delete(sessionId)

    return validatedSession
  }

  /**
   * Get debugging insights for an execution
   */
  async getDebuggingInsights(
    sessionId: string
  ): Promise<{
    performanceBottlenecks: Array<{
      stepNumber: number
      issue: string
      impact: 'high' | 'medium' | 'low'
      suggestion: string
    }>
    tokenUsageAnalysis: {
      totalTokens: number
      costlySteps: Array<{ stepNumber: number; tokens: number; cost: number }>
      optimizationOpportunities: string[]
    }
    errorAnalysis: {
      errors: Array<{ stepNumber: number; error: string; cause: string }>
      patterns: string[]
      preventionStrategies: string[]
    }
    qualityIssues: Array<{
      stepNumber: number
      issue: string
      severity: 'critical' | 'major' | 'minor'
      recommendation: string
    }>
  }> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error(`No debugging session found: ${sessionId}`)
    }

    const performanceBottlenecks = await this.analyzePerformanceBottlenecks(session.steps)
    const tokenUsageAnalysis = await this.analyzeTokenUsage(session.steps)
    const errorAnalysis = await this.analyzeErrors(session.steps)
    const qualityIssues = await this.analyzeQualityIssues(session.steps)

    return {
      performanceBottlenecks,
      tokenUsageAnalysis,
      errorAnalysis,
      qualityIssues
    }
  }

  /**
   * Generate debugging report
   */
  async generateDebuggingReport(
    sessionId: string
  ): Promise<{
    executionSummary: string
    detailedAnalysis: string
    recommendations: string[]
    codeSnippets: Array<{
      issue: string
      currentCode: string
      improvedCode: string
      explanation: string
    }>
    performanceMetrics: any
  }> {
    const session = this.activeSessions.get(sessionId) || (await this.loadDebuggingSession(sessionId))
    if (!session) {
      throw new Error(`No debugging session found: ${sessionId}`)
    }

    const insights = await this.getDebuggingInsights(sessionId)

    const { text: executionSummary } = await generateText({
      model: openai('gpt-4o'),
      system: `You are an AI debugging specialist. Generate comprehensive execution summaries for agent debugging sessions.
      
      Focus on:
      - Execution flow and decision points
      - Performance characteristics
      - Error patterns and issues
      - Success factors and failures`,
      prompt: `Generate an execution summary for this debugging session:
      
      Agent: ${session.agentName}
      Steps: ${session.steps.length}
      Duration: ${session.summary.totalDuration}ms
      Token Usage: ${session.summary.totalTokenUsage}
      Issues: ${session.summary.issueCount}
      
      Steps Overview: ${JSON.stringify(session.steps.map(s => ({
        step: s.stepNumber,
        reasoning: s.reasoning,
        tools: s.toolCalls.map(t => t.toolName),
        duration: s.performance.duration
      })), null, 2)}
      
      Provide a clear, technical summary of the execution.`
    })

    const { text: detailedAnalysis } = await generateText({
      model: openai('gpt-4o'),
      system: 'You are a performance analyst. Provide detailed technical analysis of agent execution patterns.',
      prompt: `Provide detailed analysis of this agent execution:
      
      Performance Bottlenecks: ${JSON.stringify(insights.performanceBottlenecks, null, 2)}
      Token Usage: ${JSON.stringify(insights.tokenUsageAnalysis, null, 2)}
      Errors: ${JSON.stringify(insights.errorAnalysis, null, 2)}
      Quality Issues: ${JSON.stringify(insights.qualityIssues, null, 2)}
      
      Focus on root causes, patterns, and technical details.`
    })

    const { object: codeImprovements } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        improvements: z.array(z.object({
          issue: z.string(),
          currentApproach: z.string(),
          improvedApproach: z.string(),
          explanation: z.string(),
          expectedImpact: z.string()
        }))
      }),
      system: 'You are a code optimization specialist. Provide specific code improvements for agent implementations.',
      prompt: `Based on the debugging analysis, suggest code improvements:
      
      Issues Found: ${JSON.stringify([...insights.performanceBottlenecks, ...insights.qualityIssues], null, 2)}
      
      Provide specific, implementable code improvements.`
    })

    return {
      executionSummary,
      detailedAnalysis,
      recommendations: session.summary.recommendations,
      codeSnippets: codeImprovements.improvements.map(imp => ({
        issue: imp.issue,
        currentCode: imp.currentApproach,
        improvedCode: imp.improvedApproach,
        explanation: imp.explanation
      })),
      performanceMetrics: this.extractPerformanceMetrics(session)
    }
  }

  /**
   * Get real-time debugging data
   */
  getRealTimeDebuggingData(sessionId: string): {
    currentStep: number
    executionTime: number
    tokenUsage: number
    activeTools: string[]
    recentIssues: Array<{
      stepNumber: number
      type: string
      message: string
      timestamp: Date
    }>
    performanceIndicators: {
      averageStepTime: number
      tokenEfficiency: number
      errorRate: number
    }
  } | null {
    const session = this.activeSessions.get(sessionId)
    if (!session) return null

    const recentSteps = session.steps.slice(-5)
    const totalDuration = session.steps.reduce((sum, step) => sum + step.performance.duration, 0)
    const totalTokens = session.steps.reduce((sum, step) => sum + (step.modelResponse.usage.totalTokens || 0), 0)

    return {
      currentStep: session.steps.length,
      executionTime: totalDuration,
      tokenUsage: totalTokens,
      activeTools: [...new Set(session.steps.flatMap(s => s.toolCalls.map(t => t.toolName)))],
      recentIssues: recentSteps.flatMap(step => 
        (step.issues || []).map(issue => ({
          stepNumber: step.stepNumber,
          type: issue.type,
          message: issue.message,
          timestamp: step.timestamp
        }))
      ),
      performanceIndicators: {
        averageStepTime: session.steps.length > 0 ? totalDuration / session.steps.length : 0,
        tokenEfficiency: totalDuration > 0 ? totalTokens / totalDuration : 0,
        errorRate: this.calculateErrorRate(session.steps)
      }
    }
  }

  /**
   * Enable/disable debugging
   */
  setDebuggingEnabled(enabled: boolean): void {
    this.debuggingEnabled = enabled
  }

  /**
   * Get debugging session history
   */
  async getDebuggingHistory(
    agentName?: string,
    limit: number = 50
  ): Promise<Array<{
    sessionId: string
    agentName: string
    executionId: string
    createdAt: Date
    duration: number
    stepCount: number
    issueCount: number
    successRate: number
  }>> {
    // This would query the database for stored debugging sessions
    // For now, returning mock data
    return []
  }

  // Private helper methods

  private extractStepInput(text: string, toolCalls: any[]): Record<string, any> {
    return {
      text: text.substring(0, 200), // Truncate for storage
      toolCallCount: toolCalls.length,
      toolNames: toolCalls.map(call => call.toolName || 'unknown')
    }
  }

  private extractStepOutput(text: string, toolResults: any[]): Record<string, any> {
    return {
      text: text.substring(0, 200), // Truncate for storage
      toolResultCount: toolResults.length,
      hasErrors: toolResults.some(result => result.isError)
    }
  }

  private extractReasoning(text: string): string | undefined {
    // Simple reasoning extraction - would be more sophisticated in production
    const reasoningKeywords = ['because', 'therefore', 'since', 'analysis', 'reasoning']
    const hasReasoning = reasoningKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    )
    
    return hasReasoning ? text.substring(0, 300) : undefined
  }

  private identifyStepIssues(
    text: string,
    toolCalls: any[],
    toolResults: any[],
    usage: TokenUsage
  ): Array<{
    type: 'warning' | 'error' | 'performance' | 'quality'
    message: string
    suggestion?: string
  }> {
    const issues: Array<{
      type: 'warning' | 'error' | 'performance' | 'quality'
      message: string
      suggestion?: string
    }> = []

    // Check for errors in tool results
    const errorResults = toolResults.filter(result => result.isError)
    if (errorResults.length > 0) {
      issues.push({
        type: 'error',
        message: `${errorResults.length} tool call(s) failed`,
        suggestion: 'Review tool parameters and error handling'
      })
    }

    // Check for high token usage
    const totalTokens = usage.totalTokens || 0
    if (totalTokens > 2000) {
      issues.push({
        type: 'performance',
        message: `High token usage: ${totalTokens} tokens`,
        suggestion: 'Consider prompt optimization or model selection'
      })
    }

    // Check for empty or very short responses
    if (text.length < 50) {
      issues.push({
        type: 'quality',
        message: 'Very short response generated',
        suggestion: 'Review prompt clarity and model parameters'
      })
    }

    // Check for tool call mismatches
    if (toolCalls.length !== toolResults.length) {
      issues.push({
        type: 'warning',
        message: 'Tool call/result count mismatch',
        suggestion: 'Check tool execution flow'
      })
    }

    return issues
  }

  private updateSessionSummary(session: DebuggingSession): void {
    session.summary.totalDuration = session.steps.reduce((sum, step) => sum + step.performance.duration, 0)
    session.summary.totalTokenUsage = session.steps.reduce((sum, step) => sum + (step.modelResponse.usage.totalTokens || 0), 0)
    session.summary.issueCount = session.steps.reduce((sum, step) => sum + (step.issues?.length || 0), 0)
    session.summary.successRate = this.calculateSuccessRate(session.steps)
  }

  private calculateSuccessRate(steps: DebuggingSession['steps']): number {
    if (steps.length === 0) return 0
    
    const successfulSteps = steps.filter(step => 
      !step.issues?.some(issue => issue.type === 'error')
    )
    
    return (successfulSteps.length / steps.length) * 100
  }

  private calculateErrorRate(steps: DebuggingSession['steps']): number {
    if (steps.length === 0) return 0
    
    const stepsWithErrors = steps.filter(step => 
      step.issues?.some(issue => issue.type === 'error')
    )
    
    return (stepsWithErrors.length / steps.length) * 100
  }

  private async generateDebuggingRecommendations(session: DebuggingSession): Promise<string[]> {
    const { object: recommendations } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        recommendations: z.array(z.string())
      }),
      system: 'You are a debugging specialist. Provide specific recommendations for improving agent performance.',
      prompt: `Based on this debugging session, provide improvement recommendations:
      
      Agent: ${session.agentName}
      Steps: ${session.steps.length}
      Issues: ${session.summary.issueCount}
      Success Rate: ${session.summary.successRate}%
      
      Common Issues: ${JSON.stringify(
        session.steps.flatMap(s => s.issues || []).slice(0, 10),
        null,
        2
      )}
      
      Provide actionable recommendations for improvement.`
    })

    return recommendations.recommendations
  }

  private sendRealTimeDebuggingData(
    sessionId: string,
    stepRecord: DebuggingSession['steps'][0]
  ): void {
    if (!this.debuggingEnabled) return

    sendMetrics('debugging.step', {
      sessionId,
      stepNumber: stepRecord.stepNumber,
      duration: stepRecord.performance.duration,
      tokenUsage: stepRecord.modelResponse.usage.totalTokens,
      toolCount: stepRecord.toolCalls.length,
      issueCount: stepRecord.issues?.length || 0,
      hasErrors: stepRecord.issues?.some(i => i.type === 'error') || false
    })
  }

  private async storeDebuggingSession(session: DebuggingSession): Promise<void> {
    // Store in database for later analysis
    await sendMetrics('debugging.session.complete', {
      sessionId: session.sessionId,
      agentName: session.agentName,
      executionId: session.executionId,
      summary: session.summary,
      createdAt: session.createdAt
    })
  }

  private async loadDebuggingSession(sessionId: string): Promise<DebuggingSession | null> {
    // Load from database - would implement actual database query
    return null
  }

  private async analyzePerformanceBottlenecks(
    steps: DebuggingSession['steps']
  ): Promise<Array<{
    stepNumber: number
    issue: string
    impact: 'high' | 'medium' | 'low'
    suggestion: string
  }>> {
    const bottlenecks: Array<{
      stepNumber: number
      issue: string
      impact: 'high' | 'medium' | 'low'
      suggestion: string
    }> = []

    // Find slow steps
    const avgDuration = steps.reduce((sum, step) => sum + step.performance.duration, 0) / steps.length
    const slowSteps = steps.filter(step => step.performance.duration > avgDuration * 2)

    slowSteps.forEach(step => {
      bottlenecks.push({
        stepNumber: step.stepNumber,
        issue: `Slow execution: ${step.performance.duration}ms (avg: ${avgDuration.toFixed(0)}ms)`,
        impact: step.performance.duration > avgDuration * 3 ? 'high' : 'medium',
        suggestion: 'Optimize tool calls or consider caching'
      })
    })

    return bottlenecks
  }

  private async analyzeTokenUsage(
    steps: DebuggingSession['steps']
  ): Promise<{
    totalTokens: number
    costlySteps: Array<{ stepNumber: number; tokens: number; cost: number }>
    optimizationOpportunities: string[]
  }> {
    const totalTokens = steps.reduce((sum, step) => sum + (step.modelResponse.usage.totalTokens || 0), 0)
    
    // Find high token usage steps
    const avgTokens = totalTokens / steps.length
    const costlySteps = steps
      .filter(step => (step.modelResponse.usage.totalTokens || 0) > avgTokens * 2)
      .map(step => {
        const tokens = step.modelResponse.usage.totalTokens || 0
        return {
          stepNumber: step.stepNumber,
          tokens,
          cost: tokens * 0.00003 // Estimated cost
        }
      })

    const optimizationOpportunities = [
      'Consider using smaller models for simple tasks',
      'Implement response caching for repeated queries',
      'Optimize prompt length and structure'
    ]

    return {
      totalTokens,
      costlySteps,
      optimizationOpportunities
    }
  }

  private async analyzeErrors(
    steps: DebuggingSession['steps']
  ): Promise<{
    errors: Array<{ stepNumber: number; error: string; cause: string }>
    patterns: string[]
    preventionStrategies: string[]
  }> {
    const errors = steps
      .filter(step => step.issues?.some(issue => issue.type === 'error'))
      .map(step => ({
        stepNumber: step.stepNumber,
        error: step.issues?.find(issue => issue.type === 'error')?.message || 'Unknown error',
        cause: 'Tool execution failure' // Would analyze actual causes
      }))

    return {
      errors,
      patterns: ['Tool parameter validation failures', 'Network timeouts'],
      preventionStrategies: ['Add input validation', 'Implement retry logic', 'Add error handling']
    }
  }

  private async analyzeQualityIssues(
    steps: DebuggingSession['steps']
  ): Promise<Array<{
    stepNumber: number
    issue: string
    severity: 'critical' | 'major' | 'minor'
    recommendation: string
  }>> {
    const qualityIssues: Array<{
      stepNumber: number
      issue: string
      severity: 'critical' | 'major' | 'minor'
      recommendation: string
    }> = []

    steps.forEach(step => {
      const qualityProblems = step.issues?.filter(issue => issue.type === 'quality') || []
      
      qualityProblems.forEach(problem => {
        qualityIssues.push({
          stepNumber: step.stepNumber,
          issue: problem.message,
          severity: 'minor', // Would determine based on impact
          recommendation: problem.suggestion || 'Review step implementation'
        })
      })
    })

    return qualityIssues
  }

  private extractPerformanceMetrics(session: DebuggingSession): any {
    return {
      totalDuration: session.summary.totalDuration,
      averageStepTime: session.summary.totalDuration / session.steps.length,
      tokenUsage: session.summary.totalTokenUsage,
      successRate: session.summary.successRate,
      errorRate: this.calculateErrorRate(session.steps),
      toolUsageStats: this.calculateToolUsageStats(session.steps)
    }
  }

  private calculateToolUsageStats(steps: DebuggingSession['steps']): Record<string, number> {
    const toolUsage: Record<string, number> = {}
    
    steps.forEach(step => {
      step.toolCalls.forEach(toolCall => {
        toolUsage[toolCall.toolName] = (toolUsage[toolCall.toolName] || 0) + 1
      })
    })
    
    return toolUsage
  }

  private getMemoryUsage(): number {
    // Would implement actual memory monitoring
    return Math.random() * 100
  }

  private getCpuUsage(): number {
    // Would implement actual CPU monitoring
    return Math.random() * 100
  }
}

// Export singleton instance
export const agentDebuggingInterface = new AgentDebuggingInterface()