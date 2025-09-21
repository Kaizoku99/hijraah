import { AgentExecution, AgentStep, TokenUsage } from '../types'

// Re-export integration utilities
export * from './supabase-integration'
export * from './redis-integration'
export * from './trigger-integration'
export * from './monitoring'

// Agent execution logging
export const logAgentStep = (step: Omit<AgentStep, 'timestamp'>) => {
  const logEntry = {
    ...step,
    timestamp: new Date()
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Agent Step:', logEntry)
  }
  
  // In production, send to monitoring service
  // await sendMetrics('agent.step', logEntry)
}

// Tool execution logging
export const logToolExecution = async (
  name: string, 
  params: Record<string, any>, 
  result: any
) => {
  const logEntry = {
    tool: name,
    params,
    result,
    timestamp: new Date()
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Tool Execution:', logEntry)
  }
  
  // Store in database for audit trail
  // await storeToolExecution(logEntry)
}

// Tool error logging
export const logToolError = async (
  name: string, 
  params: Record<string, any>, 
  error: Error
) => {
  const logEntry = {
    tool: name,
    params,
    error: error.message,
    stack: error.stack,
    timestamp: new Date()
  }
  
  console.error('Tool Error:', logEntry)
  
  // Send to error tracking service
  // Sentry.captureException(error, { extra: logEntry })
}

// Agent performance monitoring
export const monitorAgentPerformance = (agentName: string) => {
  return async (execution: AgentExecution) => {
    const metrics = {
      agent_name: agentName,
      duration_ms: execution.duration,
      token_usage: execution.tokenUsage,
      step_count: execution.steps.length,
      success: execution.success,
      timestamp: execution.timestamp
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Agent Performance:', metrics)
    }
    
    // Send to monitoring service
    // await sendMetrics('agent.execution', metrics)
  }
}

// Error handling wrapper
export const withAgentErrorHandling = <T extends (...args: any[]) => any>(
  agentFn: T,
  fallbackFn?: T
): T => {
  return (async (...args: Parameters<T>) => {
    try {
      return await agentFn(...args)
    } catch (error) {
      console.error('Agent execution error:', error)
      
      // Log to error tracking service
      // Sentry.captureException(error, {
      //   tags: { component: 'multi-agent-system' },
      //   extra: { args }
      // })
      
      // Try fallback if provided
      if (fallbackFn) {
        try {
          return await fallbackFn(...args)
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError)
          throw error // Throw original error
        }
      }
      
      throw error
    }
  }) as T
}

// Model selection helper
export const getModelForTask = (taskType: string): string => {
  const modelMap: Record<string, string> = {
    'document_analysis': 'gpt-4o',
    'policy_compliance': 'gpt-4o',
    'case_decision': 'gpt-4o',
    'simple_classification': 'gpt-4o-mini',
    'text_extraction': 'gpt-4o-mini',
    'data_validation': 'gpt-4o-mini'
  }
  
  return modelMap[taskType] || 'gpt-4o-mini'
}

// Schema selection helper
export const getSchemaForTask = (taskType: string) => {
  // This would return appropriate Zod schemas based on task type
  // Implementation depends on specific schemas defined elsewhere
  return {}
}

// System prompt selection helper
export const getSystemPromptForTask = (taskType: string): string => {
  const promptMap: Record<string, string> = {
    'document_analysis': 'You are an expert immigration document analyst. Analyze documents for completeness, authenticity, and compliance with immigration requirements.',
    'policy_compliance': 'You are an immigration policy compliance expert. Check applications against current immigration policies and requirements.',
    'case_decision': 'You are a senior immigration officer making case decisions. Consider all evidence and provide reasoned decisions with clear justification.',
    'text_extraction': 'You are a document processing specialist. Extract structured information from immigration documents accurately.',
    'data_validation': 'You are a data quality specialist. Validate and verify immigration data for accuracy and completeness.'
  }
  
  return promptMap[taskType] || 'You are an immigration processing specialist. Help with immigration-related tasks.'
}

// Cache key generation
export const generateCacheKey = (prefix: string, ...parts: string[]): string => {
  return `${prefix}:${parts.join(':')}`
}

// Token usage calculation
export const calculateTokenUsage = (steps: AgentStep[]): TokenUsage => {
  return steps.reduce(
    (total, step) => ({
      promptTokens: (total.promptTokens || 0) + (step.usage.promptTokens || 0),
      completionTokens: (total.completionTokens || 0) + (step.usage.completionTokens || 0),
      totalTokens: (total.totalTokens || 0) + (step.usage.totalTokens || 0),
      // Support AI SDK v5 properties
      inputTokens: (total.inputTokens || 0) + (step.usage.inputTokens || 0),
      outputTokens: (total.outputTokens || 0) + (step.usage.outputTokens || 0)
    }),
    { 
      promptTokens: 0, 
      completionTokens: 0, 
      totalTokens: 0,
      inputTokens: 0,
      outputTokens: 0
    }
  )
}