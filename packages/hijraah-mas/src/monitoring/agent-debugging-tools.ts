import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentDebugTrace, 
  AgentDebugStep, 
  AgentError, 
  AgentWarning, 
  PerformanceTrace 
} from './types'
import { createClient } from '@/utils/supabase/server'
import { sendMetrics } from '../utils/monitoring'

/**
 * Agent Debugging Tools for detailed execution traces and error analysis
 * Uses AI SDK v5's step inspection for comprehensive debugging capabilities
 */
export class AgentDebuggingTools {
  private debugTraces: Map<string, AgentDebugTrace> = new Map()
  private isDebugMode: boolean = process.env.NODE_ENV === 'development'

  /**
   * Create debugging wrapper for AI SDK v5 agent execution
   */
  createDebugWrapper(agentId: string, executionId: string) {
    const debugTrace: AgentDebugTrace = {
      executionId,
      agentId,
      steps: [],
      errors: [],
      warnings: [],
      performance: {
        totalDuration: 0,
        stepDurations: [],
        tokenUsageByStep: [],
        memoryUsage: [],
        cpuUsage: [],
        networkLatency: []
      },
      metadata: {
        startTime: new Date().toISOString(),
        debugMode: this.isDebugMode
      }
    }

    this.debugTraces.set(executionId, debugTrace)

    return {
      onStepStart: (stepNumber: number, input: any) => {
        this.recordStepStart(executionId, stepNumber, input)
      },
      onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }: any) => {
        this.recordStepFinish(executionId, {
          text,
          toolCalls,
          toolResults,
          finishReason,
          usage
        })
      },
      onToolCall: (toolName: string, parameters: any) => {
        this.recordToolCall(executionId, toolName, parameters)
      },
      onToolResult: (toolName: string, result: any, error?: string) => {
        this.recordToolResult(executionId, toolName, result, error)
      },
      onError: (error: Error, context?: any) => {
        this.recordError(executionId, error, context)
      },
      onWarning: (message: string, context?: any) => {
        this.recordWarning(executionId, message, context)
      },
      getTrace: () => this.getDebugTrace(executionId),
      finalize: () => this.finalizeTrace(executionId)
    }
  }

  /**
   * Get detailed debug trace for an execution
   */
  async getDebugTrace(executionId: string): Promise<AgentDebugTrace | null> {
    // First check in-memory cache
    const cachedTrace = this.debugTraces.get(executionId)
    if (cachedTrace) {
      return cachedTrace
    }

    // Otherwise load from database
    try {
      const supabase = await createClient()
      
      const { data: traceData } = await supabase
        .from('agent_debug_traces')
        .select('*')
        .eq('execution_id', executionId)
        .single()

      if (!traceData) return null

      const { data: steps } = await supabase
        .from('agent_debug_steps')
        .select('*')
        .eq('execution_id', executionId)
        .order('step_number')

      const { data: errors } = await supabase
        .from('agent_debug_errors')
        .select('*')
        .eq('execution_id', executionId)
        .order('timestamp')

      const { data: warnings } = await supabase
        .from('agent_debug_warnings')
        .select('*')
        .eq('execution_id', executionId)
        .order('timestamp')

      return {
        executionId: traceData.execution_id,
        agentId: traceData.agent_id,
        steps: steps?.map(this.mapDebugStep) || [],
        errors: errors?.map(this.mapDebugError) || [],
        warnings: warnings?.map(this.mapDebugWarning) || [],
        performance: traceData.performance_trace,
        metadata: traceData.metadata
      }
    } catch (error) {
      console.error('Failed to get debug trace:', error)
      return null
    }
  }

  /**
   * Analyze execution trace for issues and insights
   */
  async analyzeTrace(executionId: string): Promise<{
    summary: {
      totalSteps: number
      totalDuration: number
      errorCount: number
      warningCount: number
      overallHealth: 'healthy' | 'warning' | 'critical'
    }
    issues: Array<{
      type: 'performance' | 'error' | 'quality' | 'efficiency'
      severity: 'low' | 'medium' | 'high' | 'critical'
      description: string
      stepNumber?: number
      recommendation: string
    }>
    insights: string[]
    optimizationOpportunities: string[]
  }> {
    const trace = await this.getDebugTrace(executionId)
    if (!trace) {
      throw new Error(`Debug trace not found for execution ${executionId}`)
    }

    // Calculate summary
    const summary = {
      totalSteps: trace.steps.length,
      totalDuration: trace.performance.totalDuration,
      errorCount: trace.errors.length,
      warningCount: trace.warnings.length,
      overallHealth: this.calculateOverallHealth(trace)
    }

    // Identify issues
    const issues = await this.identifyIssues(trace)

    // Generate insights using AI
    const { insights, optimizationOpportunities } = await this.generateTraceInsights(trace)

    return {
      summary,
      issues,
      insights,
      optimizationOpportunities
    }
  }

  /**
   * Compare execution traces to identify patterns
   */
  async compareTraces(
    executionIds: string[]
  ): Promise<{
    commonPatterns: string[]
    differences: Array<{
      executionId: string
      uniqueCharacteristics: string[]
    }>
    performanceComparison: Array<{
      executionId: string
      duration: number
      stepCount: number
      errorCount: number
      efficiency: number
    }>
    recommendations: string[]
  }> {
    const traces = await Promise.all(
      executionIds.map(id => this.getDebugTrace(id))
    )

    const validTraces = traces.filter(trace => trace !== null) as AgentDebugTrace[]

    if (validTraces.length < 2) {
      throw new Error('At least 2 valid traces are required for comparison')
    }

    // Identify common patterns
    const commonPatterns = this.identifyCommonPatterns(validTraces)

    // Find differences
    const differences = validTraces.map(trace => ({
      executionId: trace.executionId,
      uniqueCharacteristics: this.identifyUniqueCharacteristics(trace, validTraces)
    }))

    // Performance comparison
    const performanceComparison = validTraces.map(trace => ({
      executionId: trace.executionId,
      duration: trace.performance.totalDuration,
      stepCount: trace.steps.length,
      errorCount: trace.errors.length,
      efficiency: this.calculateEfficiencyScore(trace)
    }))

    // Generate recommendations
    const recommendations = await this.generateComparisonRecommendations(validTraces)

    return {
      commonPatterns,
      differences,
      performanceComparison,
      recommendations
    }
  }

  /**
   * Generate debugging report with visualizations
   */
  async generateDebuggingReport(executionId: string): Promise<{
    executionSummary: {
      agentId: string
      executionId: string
      startTime: string
      endTime: string
      duration: number
      success: boolean
    }
    stepBreakdown: Array<{
      stepNumber: number
      stepType: string
      duration: number
      tokenUsage: number
      success: boolean
      issues: string[]
    }>
    errorAnalysis: {
      totalErrors: number
      errorsByType: Record<string, number>
      criticalErrors: AgentError[]
      errorTimeline: Array<{ time: string; error: string }>
    }
    performanceMetrics: {
      averageStepDuration: number
      tokenEfficiency: number
      memoryUsage: number[]
      bottlenecks: string[]
    }
    recommendations: {
      immediate: string[]
      longTerm: string[]
      preventive: string[]
    }
    visualizationData: {
      stepDurationChart: Array<{ step: number; duration: number }>
      tokenUsageChart: Array<{ step: number; tokens: number }>
      errorTimelineChart: Array<{ time: string; count: number }>
    }
  }> {
    const trace = await this.getDebugTrace(executionId)
    if (!trace) {
      throw new Error(`Debug trace not found for execution ${executionId}`)
    }

    // Execution summary
    const executionSummary = {
      agentId: trace.agentId,
      executionId: trace.executionId,
      startTime: trace.metadata.startTime || '',
      endTime: trace.metadata.endTime || '',
      duration: trace.performance.totalDuration,
      success: trace.errors.length === 0
    }

    // Step breakdown
    const stepBreakdown = trace.steps.map((step, index) => ({
      stepNumber: step.stepNumber,
      stepType: step.stepType,
      duration: step.duration,
      tokenUsage: step.tokenUsage.totalTokens,
      success: !step.output?.error,
      issues: this.identifyStepIssues(step)
    }))

    // Error analysis
    const errorsByType = trace.errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const criticalErrors = trace.errors.filter(error => 
      error.type === 'generation_error' || error.type === 'timeout_error'
    )

    const errorTimeline = trace.errors.map(error => ({
      time: error.timestamp.toISOString(),
      error: error.message
    }))

    const errorAnalysis = {
      totalErrors: trace.errors.length,
      errorsByType,
      criticalErrors,
      errorTimeline
    }

    // Performance metrics
    const averageStepDuration = trace.performance.stepDurations.length > 0
      ? trace.performance.stepDurations.reduce((sum, d) => sum + d, 0) / trace.performance.stepDurations.length
      : 0

    const totalTokens = trace.performance.tokenUsageByStep.reduce(
      (sum, usage) => sum + usage.totalTokens, 0
    )
    const tokenEfficiency = trace.steps.length > 0 ? totalTokens / trace.steps.length : 0

    const bottlenecks = this.identifyBottlenecks(trace)

    const performanceMetrics = {
      averageStepDuration,
      tokenEfficiency,
      memoryUsage: trace.performance.memoryUsage || [],
      bottlenecks
    }

    // Generate recommendations
    const recommendations = await this.generateDebuggingRecommendations(trace)

    // Visualization data
    const visualizationData = {
      stepDurationChart: trace.performance.stepDurations.map((duration, index) => ({
        step: index + 1,
        duration
      })),
      tokenUsageChart: trace.performance.tokenUsageByStep.map((usage, index) => ({
        step: index + 1,
        tokens: usage.totalTokens
      })),
      errorTimelineChart: this.generateErrorTimelineChart(trace.errors)
    }

    return {
      executionSummary,
      stepBreakdown,
      errorAnalysis,
      performanceMetrics,
      recommendations,
      visualizationData
    }
  }

  /**
   * Enable/disable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.isDebugMode = enabled
    console.log(`Agent debugging ${enabled ? 'enabled' : 'disabled'}`)
  }

  /**
   * Clear debug traces older than specified time
   */
  async clearOldTraces(olderThanHours: number = 24): Promise<void> {
    const cutoffTime = new Date(Date.now() - olderThanHours * 3600000)

    // Clear from memory
    for (const [executionId, trace] of this.debugTraces.entries()) {
      const traceTime = new Date(trace.metadata.startTime || 0)
      if (traceTime < cutoffTime) {
        this.debugTraces.delete(executionId)
      }
    }

    // Clear from database
    try {
      const supabase = await createClient()
      
      await supabase
        .from('agent_debug_traces')
        .delete()
        .lt('created_at', cutoffTime.toISOString())

      console.log(`Cleared debug traces older than ${olderThanHours} hours`)
    } catch (error) {
      console.error('Failed to clear old debug traces:', error)
    }
  }

  /**
   * Private helper methods
   */
  private recordStepStart(executionId: string, stepNumber: number, input: any): void {
    const trace = this.debugTraces.get(executionId)
    if (!trace) return

    const debugStep: Partial<AgentDebugStep> = {
      stepNumber,
      stepType: this.inferStepType(input),
      input,
      timestamp: new Date()
    }

    // Initialize step in trace
    trace.steps[stepNumber - 1] = debugStep as AgentDebugStep
  }

  private recordStepFinish(executionId: string, stepData: any): void {
    const trace = this.debugTraces.get(executionId)
    if (!trace) return

    const stepIndex = trace.steps.length - 1
    if (stepIndex >= 0) {
      const step = trace.steps[stepIndex]
      const endTime = new Date()
      const duration = endTime.getTime() - step.timestamp.getTime()

      // Update step with completion data
      step.output = {
        text: stepData.text,
        toolCalls: stepData.toolCalls,
        toolResults: stepData.toolResults,
        finishReason: stepData.finishReason
      }
      step.duration = duration
      step.tokenUsage = stepData.usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }

      // Update performance trace
      trace.performance.stepDurations.push(duration)
      trace.performance.tokenUsageByStep.push(step.tokenUsage)

      // Check for warnings
      this.checkStepWarnings(executionId, step)
    }
  }

  private recordToolCall(executionId: string, toolName: string, parameters: any): void {
    if (this.isDebugMode) {
      console.log(`[DEBUG] Tool call: ${toolName}`, parameters)
    }

    // Record in trace metadata
    const trace = this.debugTraces.get(executionId)
    if (trace) {
      if (!trace.metadata.toolCalls) {
        trace.metadata.toolCalls = []
      }
      trace.metadata.toolCalls.push({
        tool: toolName,
        parameters,
        timestamp: new Date().toISOString()
      })
    }
  }

  private recordToolResult(executionId: string, toolName: string, result: any, error?: string): void {
    if (this.isDebugMode) {
      if (error) {
        console.error(`[DEBUG] Tool error: ${toolName}`, error)
      } else {
        console.log(`[DEBUG] Tool result: ${toolName}`, result)
      }
    }

    if (error) {
      this.recordError(executionId, new Error(`Tool ${toolName} failed: ${error}`), {
        toolName,
        parameters: result
      })
    }
  }

  private recordError(executionId: string, error: Error, context?: any): void {
    const trace = this.debugTraces.get(executionId)
    if (!trace) return

    const agentError: AgentError = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: this.classifyError(error),
      message: error.message,
      stack: error.stack,
      stepNumber: trace.steps.length,
      context: context || {},
      timestamp: new Date()
    }

    trace.errors.push(agentError)

    if (this.isDebugMode) {
      console.error(`[DEBUG] Agent error:`, agentError)
    }
  }

  private recordWarning(executionId: string, message: string, context?: any): void {
    const trace = this.debugTraces.get(executionId)
    if (!trace) return

    const warning: AgentWarning = {
      id: `warning_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: this.classifyWarning(message),
      message,
      stepNumber: trace.steps.length,
      context: context || {},
      timestamp: new Date()
    }

    trace.warnings.push(warning)

    if (this.isDebugMode) {
      console.warn(`[DEBUG] Agent warning:`, warning)
    }
  }

  private async finalizeTrace(executionId: string): Promise<void> {
    const trace = this.debugTraces.get(executionId)
    if (!trace) return

    // Calculate total duration
    trace.performance.totalDuration = trace.performance.stepDurations.reduce((sum, d) => sum + d, 0)
    trace.metadata.endTime = new Date().toISOString()

    // Store in database
    await this.storeDebugTrace(trace)

    // Remove from memory if not in debug mode
    if (!this.isDebugMode) {
      this.debugTraces.delete(executionId)
    }
  }

  private async storeDebugTrace(trace: AgentDebugTrace): Promise<void> {
    try {
      const supabase = await createClient()

      // Store main trace
      await supabase.from('agent_debug_traces').insert({
        execution_id: trace.executionId,
        agent_id: trace.agentId,
        performance_trace: trace.performance,
        metadata: trace.metadata,
        created_at: new Date().toISOString()
      })

      // Store steps
      if (trace.steps.length > 0) {
        await supabase.from('agent_debug_steps').insert(
          trace.steps.map(step => ({
            execution_id: trace.executionId,
            step_number: step.stepNumber,
            step_type: step.stepType,
            input: step.input,
            output: step.output,
            duration: step.duration,
            token_usage: step.tokenUsage,
            confidence: step.confidence,
            reasoning: step.reasoning,
            timestamp: step.timestamp.toISOString()
          }))
        )
      }

      // Store errors
      if (trace.errors.length > 0) {
        await supabase.from('agent_debug_errors').insert(
          trace.errors.map(error => ({
            execution_id: trace.executionId,
            error_id: error.id,
            error_type: error.type,
            message: error.message,
            stack: error.stack,
            step_number: error.stepNumber,
            context: error.context,
            timestamp: error.timestamp.toISOString()
          }))
        )
      }

      // Store warnings
      if (trace.warnings.length > 0) {
        await supabase.from('agent_debug_warnings').insert(
          trace.warnings.map(warning => ({
            execution_id: trace.executionId,
            warning_id: warning.id,
            warning_type: warning.type,
            message: warning.message,
            step_number: warning.stepNumber,
            context: warning.context,
            timestamp: warning.timestamp.toISOString()
          }))
        )
      }
    } catch (error) {
      console.error('Failed to store debug trace:', error)
    }
  }

  private inferStepType(input: any): AgentDebugStep['stepType'] {
    if (input?.tools || input?.toolCalls) return 'tool_call'
    if (input?.schema || input?.format) return 'generation'
    if (input?.validate || input?.check) return 'validation'
    return 'decision'
  }

  private classifyError(error: Error): AgentError['type'] {
    if (error.message.includes('timeout')) return 'timeout_error'
    if (error.message.includes('tool')) return 'tool_error'
    if (error.message.includes('validation')) return 'validation_error'
    return 'generation_error'
  }

  private classifyWarning(message: string): AgentWarning['type'] {
    if (message.includes('confidence')) return 'low_confidence'
    if (message.includes('token')) return 'high_token_usage'
    if (message.includes('slow')) return 'slow_execution'
    return 'quality_concern'
  }

  private checkStepWarnings(executionId: string, step: AgentDebugStep): void {
    // Check for high token usage
    if (step.tokenUsage.totalTokens > 2000) {
      this.recordWarning(executionId, `High token usage: ${step.tokenUsage.totalTokens} tokens`, {
        stepNumber: step.stepNumber,
        tokenUsage: step.tokenUsage
      })
    }

    // Check for slow execution
    if (step.duration > 15000) { // 15 seconds
      this.recordWarning(executionId, `Slow step execution: ${step.duration}ms`, {
        stepNumber: step.stepNumber,
        duration: step.duration
      })
    }

    // Check for low confidence
    if (step.confidence && step.confidence < 0.7) {
      this.recordWarning(executionId, `Low confidence score: ${step.confidence}`, {
        stepNumber: step.stepNumber,
        confidence: step.confidence
      })
    }
  }

  private calculateOverallHealth(trace: AgentDebugTrace): 'healthy' | 'warning' | 'critical' {
    const errorCount = trace.errors.length
    const warningCount = trace.warnings.length
    const avgStepDuration = trace.performance.stepDurations.length > 0
      ? trace.performance.stepDurations.reduce((sum, d) => sum + d, 0) / trace.performance.stepDurations.length
      : 0

    if (errorCount > 0 || avgStepDuration > 20000) return 'critical'
    if (warningCount > 2 || avgStepDuration > 10000) return 'warning'
    return 'healthy'
  }

  private async identifyIssues(trace: AgentDebugTrace): Promise<Array<{
    type: 'performance' | 'error' | 'quality' | 'efficiency'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    stepNumber?: number
    recommendation: string
  }>> {
    const issues: any[] = []

    // Performance issues
    const slowSteps = trace.steps.filter(step => step.duration > 10000)
    slowSteps.forEach(step => {
      issues.push({
        type: 'performance',
        severity: step.duration > 20000 ? 'critical' : 'high',
        description: `Step ${step.stepNumber} took ${step.duration}ms to complete`,
        stepNumber: step.stepNumber,
        recommendation: 'Optimize tool performance or consider caching'
      })
    })

    // Error issues
    trace.errors.forEach(error => {
      issues.push({
        type: 'error',
        severity: error.type === 'timeout_error' ? 'critical' : 'high',
        description: error.message,
        stepNumber: error.stepNumber,
        recommendation: 'Review error handling and implement proper fallbacks'
      })
    })

    // Quality issues
    const lowQualitySteps = trace.steps.filter(step => step.confidence && step.confidence < 0.7)
    lowQualitySteps.forEach(step => {
      issues.push({
        type: 'quality',
        severity: step.confidence! < 0.5 ? 'high' : 'medium',
        description: `Step ${step.stepNumber} has low confidence: ${step.confidence}`,
        stepNumber: step.stepNumber,
        recommendation: 'Review prompts and consider additional validation'
      })
    })

    // Efficiency issues
    const highTokenSteps = trace.steps.filter(step => step.tokenUsage.totalTokens > 2000)
    highTokenSteps.forEach(step => {
      issues.push({
        type: 'efficiency',
        severity: step.tokenUsage.totalTokens > 4000 ? 'high' : 'medium',
        description: `Step ${step.stepNumber} used ${step.tokenUsage.totalTokens} tokens`,
        stepNumber: step.stepNumber,
        recommendation: 'Optimize prompts or consider using a smaller model'
      })
    })

    return issues
  }

  private async generateTraceInsights(trace: AgentDebugTrace): Promise<{
    insights: string[]
    optimizationOpportunities: string[]
  }> {
    try {
      const { object: analysis } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          insights: z.array(z.string()),
          optimizationOpportunities: z.array(z.string())
        }),
        system: 'You are an AI agent debugging expert. Analyze execution traces and provide insights.',
        prompt: `
Analyze this agent execution trace:

Steps: ${trace.steps.length}
Errors: ${trace.errors.length}
Warnings: ${trace.warnings.length}
Total Duration: ${trace.performance.totalDuration}ms
Average Step Duration: ${trace.performance.stepDurations.reduce((sum, d) => sum + d, 0) / trace.performance.stepDurations.length}ms

Step Details:
${JSON.stringify(trace.steps.map(step => ({
  stepNumber: step.stepNumber,
  type: step.stepType,
  duration: step.duration,
  tokens: step.tokenUsage.totalTokens,
  confidence: step.confidence
})), null, 2)}

Errors:
${JSON.stringify(trace.errors.map(error => ({
  type: error.type,
  message: error.message,
  step: error.stepNumber
})), null, 2)}

Provide insights and optimization opportunities.
        `
      })

      return analysis
    } catch (error) {
      console.error('Failed to generate trace insights:', error)
      return {
        insights: ['Unable to generate insights due to analysis error'],
        optimizationOpportunities: ['Review trace manually for optimization opportunities']
      }
    }
  }

  // Additional helper methods would continue here...
  private identifyCommonPatterns(traces: AgentDebugTrace[]): string[] {
    // Implementation for identifying common patterns across traces
    return []
  }

  private identifyUniqueCharacteristics(trace: AgentDebugTrace, allTraces: AgentDebugTrace[]): string[] {
    // Implementation for identifying unique characteristics
    return []
  }

  private calculateEfficiencyScore(trace: AgentDebugTrace): number {
    // Implementation for calculating efficiency score
    return 0
  }

  private async generateComparisonRecommendations(traces: AgentDebugTrace[]): Promise<string[]> {
    // Implementation for generating comparison recommendations
    return []
  }

  private identifyStepIssues(step: AgentDebugStep): string[] {
    const issues: string[] = []
    
    if (step.duration > 10000) issues.push('Slow execution')
    if (step.tokenUsage.totalTokens > 2000) issues.push('High token usage')
    if (step.confidence && step.confidence < 0.7) issues.push('Low confidence')
    
    return issues
  }

  private identifyBottlenecks(trace: AgentDebugTrace): string[] {
    const bottlenecks: string[] = []
    
    // Find slowest steps
    const slowestSteps = trace.steps
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 3)
      .filter(step => step.duration > 5000)
    
    slowestSteps.forEach(step => {
      bottlenecks.push(`Step ${step.stepNumber}: ${step.duration}ms`)
    })
    
    return bottlenecks
  }

  private async generateDebuggingRecommendations(trace: AgentDebugTrace): Promise<{
    immediate: string[]
    longTerm: string[]
    preventive: string[]
  }> {
    // Implementation for generating debugging recommendations
    return {
      immediate: [],
      longTerm: [],
      preventive: []
    }
  }

  private generateErrorTimelineChart(errors: AgentError[]): Array<{ time: string; count: number }> {
    // Group errors by time intervals
    const timeGroups: Record<string, number> = {}
    
    errors.forEach(error => {
      const timeKey = error.timestamp.toISOString().split(':')[0] + ':00' // Group by hour
      timeGroups[timeKey] = (timeGroups[timeKey] || 0) + 1
    })
    
    return Object.entries(timeGroups).map(([time, count]) => ({ time, count }))
  }

  private mapDebugStep(stepData: any): AgentDebugStep {
    return {
      stepNumber: stepData.step_number,
      stepType: stepData.step_type,
      input: stepData.input,
      output: stepData.output,
      duration: stepData.duration,
      tokenUsage: stepData.token_usage,
      confidence: stepData.confidence,
      reasoning: stepData.reasoning,
      timestamp: new Date(stepData.timestamp)
    }
  }

  private mapDebugError(errorData: any): AgentError {
    return {
      id: errorData.error_id,
      type: errorData.error_type,
      message: errorData.message,
      stack: errorData.stack,
      stepNumber: errorData.step_number,
      context: errorData.context,
      timestamp: new Date(errorData.timestamp)
    }
  }

  private mapDebugWarning(warningData: any): AgentWarning {
    return {
      id: warningData.warning_id,
      type: warningData.warning_type,
      message: warningData.message,
      stepNumber: warningData.step_number,
      context: warningData.context,
      timestamp: new Date(warningData.timestamp)
    }
  }
}