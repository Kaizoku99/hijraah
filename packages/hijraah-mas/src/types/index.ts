import { z } from 'zod'

// Core agent execution types
export interface AgentExecution {
  type: string
  caseId: string
  steps: AgentStep[]
  result: any
  duration: number
  tokenUsage: TokenUsage
  success: boolean
  timestamp: Date
}

export interface AgentStep {
  stepNumber: number
  text: string
  toolCalls: ToolCall[]
  toolResults: ToolResult[]
  finishReason: string
  usage: TokenUsage
  timestamp: Date
}

export interface ToolCall {
  id: string
  name: string
  parameters: Record<string, any>
}

export interface ToolResult {
  id: string
  result: any
  error?: string
}

export interface TokenUsage {
  // AI SDK v5 standard properties
  inputTokens?: number
  outputTokens?: number
  totalTokens?: number
  reasoningTokens?: number
  cachedInputTokens?: number
  
  // Legacy compatibility
  promptTokens?: number
  completionTokens?: number
  
  // Enhanced tracking properties
  timestamp?: Date
  cost?: number
  model?: string
  executionId?: string
  agentName?: string
}

// Immigration-specific types
export const CaseDataSchema = z.object({
  id: z.string(),
  applicantId: z.string(),
  caseType: z.enum(['visa', 'citizenship', 'work_permit', 'family_reunification']),
  country: z.string(),
  documents: z.array(z.object({
    id: z.string(),
    type: z.string(),
    url: z.string(),
    metadata: z.record(z.string(), z.any()).optional()
  })),
  timeline: z.object({
    submitted: z.date(),
    deadline: z.date().optional()
  }),
  metadata: z.record(z.string(), z.any()).optional()
})

export type CaseData = z.infer<typeof CaseDataSchema>

export const ProcessedCaseDataSchema = z.object({
  caseData: CaseDataSchema,
  documentAnalysis: z.record(z.string(), z.any()),
  policyCompliance: z.record(z.string(), z.any()),
  riskAssessment: z.record(z.string(), z.any()),
  recommendations: z.array(z.string())
})

export type ProcessedCaseData = z.infer<typeof ProcessedCaseDataSchema>

// Document types
export const DocumentSchema = z.object({
  id: z.string(),
  type: z.enum(['passport', 'visa', 'certificate', 'form', 'supporting_document']),
  url: z.string(),
  extractedText: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional()
})

export type Document = z.infer<typeof DocumentSchema>

export const DocumentGroupSchema = z.object({
  type: z.string(),
  documents: z.array(DocumentSchema),
  priority: z.enum(['high', 'medium', 'low']).default('medium')
})

export type DocumentGroup = z.infer<typeof DocumentGroupSchema>

// Application types
export const ApplicationSchema = z.object({
  id: z.string(),
  applicantId: z.string(),
  type: z.string(),
  country: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'denied']),
  documents: z.array(DocumentSchema),
  requirements: z.array(z.string()),
  metadata: z.record(z.string(), z.any()).optional()
})

export type Application = z.infer<typeof ApplicationSchema>

// Policy types
export const PolicySchema = z.object({
  id: z.string(),
  country: z.string(),
  category: z.string(),
  title: z.string(),
  content: z.string(),
  requirements: z.array(z.string()),
  lastUpdated: z.date(),
  version: z.string()
})

export type Policy = z.infer<typeof PolicySchema>

// Case context for processing
export const CaseContextSchema = z.object({
  applicantProfile: z.record(z.string(), z.any()),
  historicalData: z.array(z.record(z.string(), z.any())).optional(),
  policyContext: z.array(PolicySchema).optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium')
})

export type CaseContext = z.infer<typeof CaseContextSchema>