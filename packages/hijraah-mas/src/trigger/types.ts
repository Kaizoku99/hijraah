import { z } from 'zod'

/**
 * Agent Task Request Schema
 */
export const AgentTaskRequestSchema = z.object({
  agentType: z.enum([
    'immigration_orchestrator',
    'document_processing_team',
    'policy_compliance_team',
    'case_decision_team',
    'policy_monitoring_agent',
    'impact_assessment_agent',
    'notification_generation_agent',
    'trend_analysis_agent',
    'cross_jurisdiction_agent'
  ]),
  taskId: z.string(),
  caseId: z.string().optional(),
  userId: z.string().optional(),
  input: z.record(z.any()),
  context: z.object({
    priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
    timeout: z.number().default(300000), // 5 minutes default
    maxRetries: z.number().default(3),
    requiresHumanReview: z.boolean().default(false),
    metadata: z.record(z.any()).optional()
  }).optional(),
  workflow: z.object({
    chainId: z.string().optional(),
    stepNumber: z.number().optional(),
    dependencies: z.array(z.string()).optional(),
    nextSteps: z.array(z.string()).optional()
  }).optional()
})

export type AgentTaskRequest = z.infer<typeof AgentTaskRequestSchema>

/**
 * Agent Task Result Schema
 */
export const AgentTaskResultSchema = z.object({
  taskId: z.string(),
  agentType: z.string(),
  success: z.boolean(),
  result: z.any(),
  error: z.string().optional(),
  execution: z.object({
    startTime: z.date(),
    endTime: z.date(),
    duration: z.number(),
    steps: z.array(z.object({
      stepNumber: z.number(),
      action: z.string(),
      result: z.any(),
      timestamp: z.date(),
      tokenUsage: z.object({
        promptTokens: z.number(),
        completionTokens: z.number(),
        totalTokens: z.number()
      }).optional()
    })),
    totalTokenUsage: z.object({
      promptTokens: z.number(),
      completionTokens: z.number(),
      totalTokens: z.number(),
      cost: z.number().optional()
    }).optional()
  }),
  metadata: z.record(z.any()).optional()
})

export type AgentTaskResult = z.infer<typeof AgentTaskResultSchema>

/**
 * Agent Workflow Configuration Schema
 */
export const AgentWorkflowConfigSchema = z.object({
  workflowId: z.string(),
  name: z.string(),
  description: z.string(),
  steps: z.array(z.object({
    stepId: z.string(),
    agentType: z.string(),
    input: z.record(z.any()),
    dependencies: z.array(z.string()).optional(),
    condition: z.string().optional(), // JavaScript expression
    timeout: z.number().optional(),
    retryStrategy: z.object({
      maxRetries: z.number(),
      backoffMultiplier: z.number(),
      maxBackoffMs: z.number()
    }).optional()
  })),
  triggers: z.array(z.object({
    type: z.enum(['event', 'schedule', 'webhook', 'manual']),
    config: z.record(z.any())
  })),
  errorHandling: z.object({
    strategy: z.enum(['fail_fast', 'continue_on_error', 'retry_failed']),
    fallbackAgent: z.string().optional(),
    notificationChannels: z.array(z.string()).optional()
  }).optional()
})

export type AgentWorkflowConfig = z.infer<typeof AgentWorkflowConfigSchema>

/**
 * Agent Execution Context Schema
 */
export const AgentExecutionContextSchema = z.object({
  executionId: z.string(),
  workflowId: z.string().optional(),
  stepId: z.string().optional(),
  userId: z.string().optional(),
  caseId: z.string().optional(),
  environment: z.enum(['development', 'staging', 'production']),
  startTime: z.date(),
  timeout: z.number(),
  metadata: z.record(z.any()).optional(),
  sharedContext: z.record(z.any()).optional() // Shared between workflow steps
})

export type AgentExecutionContext = z.infer<typeof AgentExecutionContextSchema>

/**
 * Agent Error Context Schema
 */
export const AgentErrorContextSchema = z.object({
  taskId: z.string(),
  agentType: z.string(),
  error: z.object({
    type: z.string(),
    message: z.string(),
    stack: z.string().optional(),
    code: z.string().optional()
  }),
  context: z.object({
    input: z.record(z.any()),
    step: z.number().optional(),
    retryCount: z.number(),
    maxRetries: z.number(),
    lastAttemptTime: z.date(),
    totalDuration: z.number()
  }),
  recovery: z.object({
    strategy: z.enum(['retry', 'fallback', 'manual_intervention', 'skip']),
    fallbackAgent: z.string().optional(),
    retryDelay: z.number().optional(),
    maxRetryDelay: z.number().optional()
  }).optional()
})

export type AgentErrorContext = z.infer<typeof AgentErrorContextSchema>

/**
 * Scheduled Agent Execution Schema
 */
export const ScheduledAgentExecutionSchema = z.object({
  scheduleId: z.string(),
  agentType: z.string(),
  schedule: z.object({
    cron: z.string(),
    timezone: z.string().default('UTC'),
    enabled: z.boolean().default(true)
  }),
  input: z.record(z.any()),
  constraints: z.object({
    maxSteps: z.number().optional(),
    stopWhen: z.string().optional(), // JavaScript expression
    timeout: z.number().optional()
  }).optional(),
  notifications: z.object({
    onSuccess: z.array(z.string()).optional(),
    onFailure: z.array(z.string()).optional(),
    onTimeout: z.array(z.string()).optional()
  }).optional()
})

export type ScheduledAgentExecution = z.infer<typeof ScheduledAgentExecutionSchema>

/**
 * Agent Performance Metrics Schema
 */
export const AgentPerformanceMetricsSchema = z.object({
  agentType: z.string(),
  period: z.object({
    start: z.date(),
    end: z.date()
  }),
  metrics: z.object({
    totalExecutions: z.number(),
    successfulExecutions: z.number(),
    failedExecutions: z.number(),
    averageDuration: z.number(),
    averageTokenUsage: z.number(),
    totalCost: z.number().optional(),
    errorRate: z.number(),
    averageSteps: z.number()
  }),
  trends: z.object({
    executionTrend: z.enum(['increasing', 'decreasing', 'stable']),
    performanceTrend: z.enum(['improving', 'degrading', 'stable']),
    costTrend: z.enum(['increasing', 'decreasing', 'stable'])
  }).optional()
})

export type AgentPerformanceMetrics = z.infer<typeof AgentPerformanceMetricsSchema>