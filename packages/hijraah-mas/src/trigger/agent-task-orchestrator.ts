/**
 * Agent Task Orchestrator using Trigger.dev v4 and AI SDK v5
 * 
 * This module creates an Agent Task Orchestrator using Trigger.dev's task() 
 * with AI SDK v5's generateText and multi-step processing capabilities.
 */

import { task } from '@trigger.dev/sdk/v3'
import { generateText, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentTaskRequest, 
  AgentTaskResult, 
  AgentTaskRequestSchema,
  AgentExecutionContext,
  AgentExecutionContextSchema
} from './types'
import { ImmigrationOrchestrator } from '../orchestrators/immigration-orchestrator'
import { DocumentProcessingTeam } from '../teams/document-processing-team'
import { PolicyComplianceTeam } from '../teams/policy-compliance-team'
import { CaseDecisionTeam } from '../teams/case-decision-team'
import { withAgentErrorHandling } from './agent-error-handling'

/**
 * Agent Task Orchestrator Task
 * 
 * Orchestrates agent execution using Trigger.dev's task system with AI SDK v5
 */
export const agentTaskOrchestratorTask = task({
  id: 'agent-task-orchestrator',
  machine: {
    preset: 'large-1x',
  },
  queue: {
    concurrencyLimit: 10,
  },
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: AgentTaskRequest, { ctx, logger }) => {
    const startTime = new Date()
    const executionId = ctx.run.id
    
    logger.info('Starting agent task orchestration', {
      taskId: payload.taskId,
      agentType: payload.agentType,
      executionId
    })

    try {
      // Validate input
      const validatedPayload = AgentTaskRequestSchema.parse(payload)
      
      // Create execution context
      const executionContext: AgentExecutionContext = {
        executionId,
        workflowId: payload.workflow?.chainId,
        stepId: payload.workflow?.stepNumber?.toString(),
        userId: payload.userId,
        caseId: payload.caseId,
        environment: process.env.NODE_ENV as 'development' | 'staging' | 'production' || 'development',
        startTime,
        timeout: payload.context?.timeout || 300000,
        metadata: payload.context?.metadata,
        sharedContext: {}
      }

      // Execute agent with error handling
      const agentResult = await withAgentErrorHandling(
        () => executeAgent(validatedPayload, executionContext, logger),
        {
          taskId: payload.taskId,
          agentType: payload.agentType,
          maxRetries: payload.context?.maxRetries || 3,
          logger
        }
      )

      const endTime = new Date()
      const duration = endTime.getTime() - startTime.getTime()

      // Create result
      const result: AgentTaskResult = {
        taskId: payload.taskId,
        agentType: payload.agentType,
        success: true,
        result: agentResult.result,
        execution: {
          startTime,
          endTime,
          duration,
          steps: agentResult.steps || [],
          totalTokenUsage: agentResult.tokenUsage
        },
        metadata: {
          executionId,
          environment: executionContext.environment
        }
      }

      logger.info('Agent task orchestration completed successfully', {
        taskId: payload.taskId,
        duration,
        steps: result.execution.steps.length
      })

      return result

    } catch (error) {
      const endTime = new Date()
      const duration = endTime.getTime() - startTime.getTime()

      logger.error('Agent task orchestration failed', {
        taskId: payload.taskId,
        error: error instanceof Error ? error.message : String(error),
        duration
      })

      const errorResult: AgentTaskResult = {
        taskId: payload.taskId,
        agentType: payload.agentType,
        success: false,
        result: null,
        error: error instanceof Error ? error.message : String(error),
        execution: {
          startTime,
          endTime,
          duration,
          steps: []
        }
      }

      return errorResult
    }
  }
})

/**
 * Execute specific agent based on type
 */
async function executeAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
): Promise<{
  result: any
  steps?: Array<{
    stepNumber: number
    action: string
    result: any
    timestamp: Date
    tokenUsage?: {
      promptTokens: number
      completionTokens: number
      totalTokens: number
    }
  }>
  tokenUsage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
    cost?: number
  }
}> {
  const steps: any[] = []
  let totalTokenUsage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  }

  logger.info(`Executing agent: ${payload.agentType}`, {
    input: payload.input,
    context: context
  })

  switch (payload.agentType) {
    case 'immigration_orchestrator':
      return await executeImmigrationOrchestrator(payload, context, logger)
    
    case 'document_processing_team':
      return await executeDocumentProcessingTeam(payload, context, logger)
    
    case 'policy_compliance_team':
      return await executePolicyComplianceTeam(payload, context, logger)
    
    case 'case_decision_team':
      return await executeCaseDecisionTeam(payload, context, logger)
    
    case 'policy_monitoring_agent':
      return await executePolicyMonitoringAgent(payload, context, logger)
    
    case 'impact_assessment_agent':
      return await executeImpactAssessmentAgent(payload, context, logger)
    
    case 'notification_generation_agent':
      return await executeNotificationGenerationAgent(payload, context, logger)
    
    case 'trend_analysis_agent':
      return await executeTrendAnalysisAgent(payload, context, logger)
    
    case 'cross_jurisdiction_agent':
      return await executeCrossJurisdictionAgent(payload, context, logger)
    
    default:
      throw new Error(`Unknown agent type: ${payload.agentType}`)
  }
}

/**
 * Execute Immigration Orchestrator
 */
async function executeImmigrationOrchestrator(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const orchestrator = new ImmigrationOrchestrator()
  
  logger.info('Executing Immigration Orchestrator', {
    caseId: payload.caseId,
    input: payload.input
  })

  const result = await orchestrator.processCase(payload.input)
  
  return {
    result,
    steps: [{
      stepNumber: 1,
      action: 'process_immigration_case',
      result,
      timestamp: new Date()
    }]
  }
}

/**
 * Execute Document Processing Team
 */
async function executeDocumentProcessingTeam(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const team = new DocumentProcessingTeam()
  
  logger.info('Executing Document Processing Team', {
    documents: payload.input.documents?.length || 0
  })

  const result = await team.processDocuments(
    payload.input.documents || [],
    payload.input.caseContext || {}
  )
  
  return {
    result,
    steps: [{
      stepNumber: 1,
      action: 'process_documents',
      result,
      timestamp: new Date()
    }]
  }
}

/**
 * Execute Policy Compliance Team
 */
async function executePolicyComplianceTeam(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const team = new PolicyComplianceTeam()
  
  logger.info('Executing Policy Compliance Team', {
    application: payload.input.application
  })

  const result = await team.checkCompliance(
    payload.input.application,
    payload.input.currentPolicies || []
  )
  
  return {
    result,
    steps: [{
      stepNumber: 1,
      action: 'check_policy_compliance',
      result,
      timestamp: new Date()
    }]
  }
}

/**
 * Execute Case Decision Team
 */
async function executeCaseDecisionTeam(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const team = new CaseDecisionTeam()
  
  logger.info('Executing Case Decision Team', {
    caseData: payload.input.caseData
  })

  const result = await team.makeDecision(payload.input.caseData)
  
  return {
    result,
    steps: [{
      stepNumber: 1,
      action: 'make_case_decision',
      result,
      timestamp: new Date()
    }]
  }
}

/**
 * Execute Policy Monitoring Agent using AI SDK v5 multi-step processing
 */
async function executePolicyMonitoringAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const steps: any[] = []
  let stepNumber = 0

  logger.info('Executing Policy Monitoring Agent', {
    sources: payload.input.sources?.length || 0
  })

  // Multi-step policy monitoring with AI SDK v5
  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      monitoringResults: z.array(z.object({
        source: z.string(),
        changes: z.array(z.object({
          type: z.enum(['new_policy', 'policy_update', 'policy_removal']),
          title: z.string(),
          description: z.string(),
          impact: z.enum(['low', 'medium', 'high', 'critical']),
          effectiveDate: z.string(),
          affectedCategories: z.array(z.string())
        })),
        lastChecked: z.string(),
        nextCheck: z.string()
      })),
      summary: z.object({
        totalChanges: z.number(),
        criticalChanges: z.number(),
        affectedJurisdictions: z.array(z.string()),
        recommendedActions: z.array(z.string())
      })
    }),
    maxSteps: 5,
    onStepFinish: ({ stepNumber: currentStep, text, toolCalls, usage }) => {
      stepNumber = currentStep
      steps.push({
        stepNumber: currentStep,
        action: 'monitor_policy_changes',
        result: { text, toolCalls },
        timestamp: new Date(),
        tokenUsage: usage
      })
      
      logger.info(`Policy monitoring step ${currentStep} completed`, {
        text: text?.substring(0, 100) + '...',
        toolCalls: toolCalls?.length || 0
      })
    },
    system: `You are a specialized policy monitoring agent. Monitor immigration policy changes across multiple jurisdictions and assess their impact.`,
    prompt: `Monitor policy changes for the following sources:
    
    Sources: ${JSON.stringify(payload.input.sources || [])}
    Last Check: ${payload.input.lastCheck || 'Never'}
    
    Identify any new policies, updates, or removals. Assess the impact and provide recommendations.`
  })

  return {
    result: result.object,
    steps,
    tokenUsage: {
      promptTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.promptTokens || 0), 0),
      completionTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.completionTokens || 0), 0),
      totalTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.totalTokens || 0), 0)
    }
  }
}

/**
 * Execute Impact Assessment Agent using AI SDK v5 multi-step processing
 */
async function executeImpactAssessmentAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const steps: any[] = []
  let stepNumber = 0

  logger.info('Executing Impact Assessment Agent', {
    policyChanges: payload.input.policyChanges?.length || 0
  })

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      impactAssessment: z.object({
        overallImpact: z.enum(['minimal', 'moderate', 'significant', 'major']),
        affectedPopulations: z.array(z.object({
          group: z.string(),
          impact: z.enum(['positive', 'negative', 'neutral']),
          severity: z.enum(['low', 'medium', 'high']),
          estimatedAffected: z.number(),
          specificImpacts: z.array(z.string())
        })),
        timelineAnalysis: z.object({
          immediateEffects: z.array(z.string()),
          shortTermEffects: z.array(z.string()),
          longTermEffects: z.array(z.string())
        }),
        riskFactors: z.array(z.object({
          risk: z.string(),
          probability: z.enum(['low', 'medium', 'high']),
          impact: z.enum(['low', 'medium', 'high']),
          mitigation: z.string()
        })),
        recommendations: z.array(z.string())
      })
    }),
    maxSteps: 7,
    onStepFinish: ({ stepNumber: currentStep, text, toolCalls, usage }) => {
      stepNumber = currentStep
      steps.push({
        stepNumber: currentStep,
        action: 'assess_policy_impact',
        result: { text, toolCalls },
        timestamp: new Date(),
        tokenUsage: usage
      })
      
      logger.info(`Impact assessment step ${currentStep} completed`)
    },
    system: `You are an expert policy impact assessment agent. Analyze the potential impacts of immigration policy changes on different populations and provide comprehensive risk assessments.`,
    prompt: `Assess the impact of these policy changes:
    
    Policy Changes: ${JSON.stringify(payload.input.policyChanges || [])}
    Context: ${JSON.stringify(payload.input.context || {})}
    
    Provide a comprehensive impact assessment including affected populations, timeline analysis, risk factors, and recommendations.`
  })

  return {
    result: result.object,
    steps,
    tokenUsage: {
      promptTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.promptTokens || 0), 0),
      completionTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.completionTokens || 0), 0),
      totalTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.totalTokens || 0), 0)
    }
  }
}

/**
 * Execute Notification Generation Agent using AI SDK v5 multi-step processing
 */
async function executeNotificationGenerationAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const steps: any[] = []
  let stepNumber = 0

  logger.info('Executing Notification Generation Agent', {
    recipients: payload.input.recipients?.length || 0
  })

  const result = await generateText({
    model: openai('gpt-4o'),
    maxSteps: 4,
    onStepFinish: ({ stepNumber: currentStep, text, toolCalls, usage }) => {
      stepNumber = currentStep
      steps.push({
        stepNumber: currentStep,
        action: 'generate_notifications',
        result: { text, toolCalls },
        timestamp: new Date(),
        tokenUsage: usage
      })
      
      logger.info(`Notification generation step ${currentStep} completed`)
    },
    system: `You are a notification generation agent. Create personalized, clear, and actionable notifications for immigration policy changes.`,
    prompt: `Generate notifications for the following:
    
    Policy Changes: ${JSON.stringify(payload.input.policyChanges || [])}
    Recipients: ${JSON.stringify(payload.input.recipients || [])}
    Impact Assessment: ${JSON.stringify(payload.input.impactAssessment || {})}
    
    Create personalized notifications that are clear, actionable, and appropriate for each recipient's situation.`
  })

  return {
    result: { notifications: result.text },
    steps,
    tokenUsage: {
      promptTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.promptTokens || 0), 0),
      completionTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.completionTokens || 0), 0),
      totalTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.totalTokens || 0), 0)
    }
  }
}

/**
 * Execute Trend Analysis Agent using AI SDK v5 multi-step processing
 */
async function executeTrendAnalysisAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const steps: any[] = []
  let stepNumber = 0

  logger.info('Executing Trend Analysis Agent', {
    historicalData: payload.input.historicalData ? 'provided' : 'not provided'
  })

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      trendAnalysis: z.object({
        identifiedTrends: z.array(z.object({
          trend: z.string(),
          direction: z.enum(['increasing', 'decreasing', 'stable', 'cyclical']),
          confidence: z.number().min(0).max(100),
          timeframe: z.string(),
          factors: z.array(z.string())
        })),
        predictions: z.array(z.object({
          prediction: z.string(),
          timeframe: z.string(),
          confidence: z.number().min(0).max(100),
          assumptions: z.array(z.string())
        })),
        recommendations: z.array(z.string()),
        riskFactors: z.array(z.string())
      })
    }),
    maxSteps: 6,
    onStepFinish: ({ stepNumber: currentStep, text, toolCalls, usage }) => {
      stepNumber = currentStep
      steps.push({
        stepNumber: currentStep,
        action: 'analyze_trends',
        result: { text, toolCalls },
        timestamp: new Date(),
        tokenUsage: usage
      })
      
      logger.info(`Trend analysis step ${currentStep} completed`)
    },
    system: `You are a trend analysis agent specializing in immigration policy and demographic trends. Analyze historical data to identify patterns and make predictions.`,
    prompt: `Analyze trends in the following data:
    
    Historical Data: ${JSON.stringify(payload.input.historicalData || {})}
    Recent Changes: ${JSON.stringify(payload.input.recentChanges || [])}
    Context: ${JSON.stringify(payload.input.context || {})}
    
    Identify trends, make predictions, and provide recommendations based on the analysis.`
  })

  return {
    result: result.object,
    steps,
    tokenUsage: {
      promptTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.promptTokens || 0), 0),
      completionTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.completionTokens || 0), 0),
      totalTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.totalTokens || 0), 0)
    }
  }
}

/**
 * Execute Cross Jurisdiction Agent using AI SDK v5 multi-step processing
 */
async function executeCrossJurisdictionAgent(
  payload: AgentTaskRequest,
  context: AgentExecutionContext,
  logger: any
) {
  const steps: any[] = []
  let stepNumber = 0

  logger.info('Executing Cross Jurisdiction Agent', {
    jurisdictions: payload.input.jurisdictions?.length || 0
  })

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      crossJurisdictionAnalysis: z.object({
        jurisdictionComparison: z.array(z.object({
          jurisdiction: z.string(),
          policies: z.array(z.string()),
          requirements: z.array(z.string()),
          processingTimes: z.string(),
          successRates: z.string(),
          uniqueFeatures: z.array(z.string())
        })),
        harmonizationOpportunities: z.array(z.object({
          area: z.string(),
          description: z.string(),
          benefits: z.array(z.string()),
          challenges: z.array(z.string()),
          feasibility: z.enum(['low', 'medium', 'high'])
        })),
        bestPractices: z.array(z.object({
          practice: z.string(),
          jurisdiction: z.string(),
          description: z.string(),
          applicability: z.array(z.string())
        })),
        recommendations: z.array(z.string())
      })
    }),
    maxSteps: 8,
    onStepFinish: ({ stepNumber: currentStep, text, toolCalls, usage }) => {
      stepNumber = currentStep
      steps.push({
        stepNumber: currentStep,
        action: 'analyze_cross_jurisdiction',
        result: { text, toolCalls },
        timestamp: new Date(),
        tokenUsage: usage
      })
      
      logger.info(`Cross jurisdiction analysis step ${currentStep} completed`)
    },
    system: `You are a cross-jurisdiction analysis agent. Compare immigration policies across different jurisdictions and identify harmonization opportunities and best practices.`,
    prompt: `Analyze policies across these jurisdictions:
    
    Jurisdictions: ${JSON.stringify(payload.input.jurisdictions || [])}
    Focus Areas: ${JSON.stringify(payload.input.focusAreas || [])}
    Context: ${JSON.stringify(payload.input.context || {})}
    
    Compare policies, identify harmonization opportunities, extract best practices, and provide recommendations.`
  })

  return {
    result: result.object,
    steps,
    tokenUsage: {
      promptTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.promptTokens || 0), 0),
      completionTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.completionTokens || 0), 0),
      totalTokens: steps.reduce((sum, step) => sum + (step.tokenUsage?.totalTokens || 0), 0)
    }
  }
}