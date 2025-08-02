import { createClient } from '@supabase/supabase-js'
import { AgentExecution } from '../types'

// Initialize Supabase client (this would use your actual config)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
)

/**
 * Store agent execution logs in Supabase
 */
export const logAgentExecution = async (execution: AgentExecution): Promise<void> => {
  try {
    const { error } = await supabase
      .from('agent_executions')
      .insert({
        agent_type: execution.type,
        case_id: execution.caseId,
        steps: execution.steps,
        result: execution.result,
        duration_ms: execution.duration,
        token_usage: execution.tokenUsage,
        success: execution.success,
        created_at: execution.timestamp.toISOString(),
      })

    if (error) {
      console.error('Failed to log agent execution:', error)
      throw error
    }
  } catch (error) {
    console.error('Error logging agent execution:', error)
    // Don't throw - logging failures shouldn't break agent execution
  }
}

/**
 * Retrieve case processing history from Supabase
 */
export const getCaseProcessingHistory = async (caseId: string): Promise<AgentExecution[]> => {
  try {
    const { data, error } = await supabase
      .from('agent_executions')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to get case processing history:', error)
      throw error
    }

    // Transform database records back to AgentExecution objects
    return (data || []).map(record => ({
      type: record.agent_type,
      caseId: record.case_id,
      steps: record.steps || [],
      result: record.result,
      duration: record.duration_ms,
      tokenUsage: record.token_usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      success: record.success,
      timestamp: new Date(record.created_at)
    }))
  } catch (error) {
    console.error('Error getting case processing history:', error)
    return []
  }
}

/**
 * Store tool execution for audit trail
 */
export const storeToolExecution = async (toolExecution: {
  tool: string
  params: Record<string, any>
  result: any
  timestamp: Date
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tool_executions')
      .insert({
        tool_name: toolExecution.tool,
        parameters: toolExecution.params,
        result: toolExecution.result,
        executed_at: toolExecution.timestamp.toISOString(),
      })

    if (error) {
      console.error('Failed to store tool execution:', error)
    }
  } catch (error) {
    console.error('Error storing tool execution:', error)
  }
}

/**
 * Get agent performance metrics
 */
export const getAgentMetrics = async (
  agentType?: string,
  timeframe?: { start: Date; end: Date }
): Promise<{
  totalExecutions: number
  successRate: number
  averageDuration: number
  averageTokenUsage: number
}> => {
  try {
    let query = supabase
      .from('agent_executions')
      .select('duration_ms, token_usage, success')

    if (agentType) {
      query = query.eq('agent_type', agentType)
    }

    if (timeframe) {
      query = query
        .gte('created_at', timeframe.start.toISOString())
        .lte('created_at', timeframe.end.toISOString())
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to get agent metrics:', error)
      throw error
    }

    const executions = data || []
    const totalExecutions = executions.length
    const successfulExecutions = executions.filter(e => e.success).length
    const successRate = totalExecutions > 0 ? successfulExecutions / totalExecutions : 0
    const averageDuration = totalExecutions > 0 
      ? executions.reduce((sum, e) => sum + (e.duration_ms || 0), 0) / totalExecutions 
      : 0
    const averageTokenUsage = totalExecutions > 0
      ? executions.reduce((sum, e) => sum + ((e.token_usage?.totalTokens) || 0), 0) / totalExecutions
      : 0

    return {
      totalExecutions,
      successRate,
      averageDuration,
      averageTokenUsage
    }
  } catch (error) {
    console.error('Error getting agent metrics:', error)
    return {
      totalExecutions: 0,
      successRate: 0,
      averageDuration: 0,
      averageTokenUsage: 0
    }
  }
}