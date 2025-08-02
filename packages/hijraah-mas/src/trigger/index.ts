/**
 * Trigger.dev v4 Integration for Multi-Agent System (MAS)
 * 
 * This module integrates the AI SDK v5 Multi-Agent System with Trigger.dev v4
 * for orchestration, scheduling, and workflow management.
 */

export * from './agent-task-orchestrator'
export * from './scheduled-agent-execution'
export * from './agent-workflow-chaining'
export * from './agent-error-handling'
export * from './types'

// Main orchestrator tasks
export { agentTaskOrchestratorTask } from './agent-task-orchestrator'
export { scheduledAgentExecutionTask } from './scheduled-agent-execution'
export { agentWorkflowChainingTask } from './agent-workflow-chaining'

// Error handling utilities
export { withAgentErrorHandling, createAgentRetryStrategy } from './agent-error-handling'

// Types
export type {
  AgentTaskRequest,
  AgentTaskResult,
  AgentWorkflowConfig,
  AgentExecutionContext,
  AgentErrorContext
} from './types'