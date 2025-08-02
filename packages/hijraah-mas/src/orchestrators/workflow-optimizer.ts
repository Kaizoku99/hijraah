import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { CaseData, AgentExecution, CaseDataSchema } from '../types'
import { getCachedAgentResult, cacheAgentResult } from '../utils/redis-integration'
import { getCaseProcessingHistory } from '../utils/supabase-integration'
import { agentPerformanceMonitor } from '../monitoring/agent-performance-monitor'

// Workflow step schema
const WorkflowStepSchema = z.object({
  stepId: z.string(),
  agentType: z.string(),
  taskDescription: z.string(),
  estimatedDuration: z.number(),
  dependencies: z.array(z.string()),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  resources: z.object({
    modelRequired: z.string(),
    toolsRequired: z.array(z.string()),
    memoryEstimate: z.number().optional()
  }),
  successCriteria: z.array(z.string()),
  fallbackOptions: z.array(z.string()).optiona