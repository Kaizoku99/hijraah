import { AgentExecution, TokenUsage } from '../types'

/**
 * Send metrics to monitoring service (Sentry, DataDog, etc.)
 */
export const sendMetrics = async (
  metricName: string,
  data: Record<string, any>
): Promise<void> => {
  try {
    // This would integrate with your monitoring service
    // For now, just logging to console
    console.log(`Metric: ${metricName}`, data)
    
    // In production, this might be:
    // await monitoringService.track(metricName, data)
  } catch (error) {
    console.error('Failed to send metrics:', error)
  }
}

/**
 * Track agent execution metrics
 */
export const trackAgentExecution = async (
  agentName: string,
  execution: AgentExecution
): Promise<void> => {
  const metrics = {
    agent_name: agentName,
    case_id: execution.caseId,
    duration_ms: execution.duration,
    token_usage: execution.tokenUsage,
    step_count: execution.steps.length,
    success: execution.success,
    timestamp: execution.timestamp.toISOString()
  }

  await sendMetrics('agent.execution', metrics)
}

/**
 * Track tool usage metrics
 */
export const trackToolUsage = async (
  toolName: string,
  duration: number,
  success: boolean,
  tokenUsage?: TokenUsage
): Promise<void> => {
  const metrics = {
    tool_name: toolName,
    duration_ms: duration,
    success,
    token_usage: tokenUsage,
    timestamp: new Date().toISOString()
  }

  await sendMetrics('tool.usage', metrics)
}

/**
 * Track error occurrences
 */
export const trackError = async (
  component: string,
  error: Error,
  context?: Record<string, any>
): Promise<void> => {
  const errorMetrics = {
    component,
    error_message: error.message,
    error_stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  }

  await sendMetrics('error.occurred', errorMetrics)
  
  // Also send to error tracking service (Sentry)
  // Sentry.captureException(error, { tags: { component }, extra: context })
}

/**
 * Track performance metrics
 */
export const trackPerformance = async (
  operation: string,
  duration: number,
  metadata?: Record<string, any>
): Promise<void> => {
  const performanceMetrics = {
    operation,
    duration_ms: duration,
    metadata,
    timestamp: new Date().toISOString()
  }

  await sendMetrics('performance.timing', performanceMetrics)
}

/**
 * Create a performance timer
 */
export const createTimer = () => {
  const startTime = Date.now()
  
  return {
    end: (operation: string, metadata?: Record<string, any>) => {
      const duration = Date.now() - startTime
      trackPerformance(operation, duration, metadata)
      return duration
    }
  }
}

/**
 * Monitor function execution with automatic metrics
 */
export const withMonitoring = <T extends (...args: any[]) => any>(
  fn: T,
  operationName: string
): T => {
  return (async (...args: Parameters<T>) => {
    const timer = createTimer()
    
    try {
      const result = await fn(...args)
      timer.end(operationName, { success: true })
      return result
    } catch (error) {
      timer.end(operationName, { success: false })
      await trackError(operationName, error as Error, { args })
      throw error
    }
  }) as T
}