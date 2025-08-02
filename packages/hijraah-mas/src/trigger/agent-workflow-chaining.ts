/**
 * Agent Workflow Chaining using Trigger.dev v4 and AI SDK v5
 * 
 * This module implements agent workflow chaining using Trigger.dev's triggerAndWait()
 * with AI SDK v5's tool calling and result passing for complex multi-step workflows.
 */

import { task } from '@trigger.dev/sdk/v3'
import { generateObject, generateText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  AgentWorkflowConfig, 
  AgentWorkflowConfigSchema,
  AgentTaskRequest,
  AgentTaskResult,
  AgentExecutionContext
} from './types'
import { agentTaskOrchestratorTask } from './agent-task-orchestrator'
import { withAgentErrorHandling } from './agent-error-handling'

/**
 * Agent Workflow Chaining Task
 * 
 * Orchestrates complex multi-agent workflows using Trigger.dev's triggerAndWait()
 */
export const agentWorkflowChainingTask = task({
  id: 'agent-workflow-chaining',
  machine: {
    preset: 'large-1x',
  },
  queue: {
    concurrencyLimit: 5,
  },
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: AgentWorkflowConfig, { ctx, logger }) => {
    const startTime = new Date()
    const workflowId = payload.workflowId
    
    logger.info('Starting agent workflow chaining', {
      workflowId,
      name: payload.name,
      steps: payload.steps.length
    })

    try {
      // Validate workflow configuration
      const validatedWorkflow = AgentWorkflowConfigSchema.parse(payload)
      
      // Initialize workflow context
      const workflowContext = {
        workflowId,
        startTime,
        sharedContext: {},
        stepResults: new Map<string, any>(),
        executionHistory: []
      }

      // Execute workflow steps
      const workflowResult = await executeWorkflowSteps(
        validatedWorkflow,
        workflowContext,
        logger
      )

      const endTime = new Date()
      const duration = endTime.getTime() - startTime.getTime()

      logger.info('Agent workflow chaining completed successfully', {
        workflowId,
        duration,
        stepsCompleted: workflowResult.completedSteps,
        totalSteps: validatedWorkflow.steps.length
      })

      return {
        workflowId,
        success: true,
        result: workflowResult,
        execution: {
          startTime,
          endTime,
          duration,
          completedSteps: workflowResult.completedSteps,
          totalSteps: validatedWorkflow.steps.length
        }
      }

    } catch (error) {
      const endTime = new Date()
      const duration = endTime.getTime() - startTime.getTime()

      logger.error('Agent workflow chaining failed', {
        workflowId,
        error: error instanceof Error ? error.message : String(error),
        duration
      })

      return {
        workflowId,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        execution: {
          startTime,
          endTime,
          duration,
          completedSteps: 0,
          totalSteps: payload.steps.length
        }
      }
    }
  }
})

/**
 * Execute workflow steps with dependency management and result passing
 */
async function executeWorkflowSteps(
  workflow: AgentWorkflowConfig,
  context: any,
  logger: any
): Promise<{
  completedSteps: number
  results: Record<string, any>
  finalResult: any
}> {
  const { steps } = workflow
  const stepResults = new Map<string, any>()
  const executedSteps = new Set<string>()
  let completedSteps = 0

  logger.info('Executing workflow steps', {
    totalSteps: steps.length,
    workflowId: context.workflowId
  })

  // Create dependency graph
  const dependencyGraph = buildDependencyGraph(steps)
  
  // Execute steps in dependency order
  const executionQueue = getExecutionOrder(dependencyGraph)
  
  for (const stepBatch of executionQueue) {
    logger.info('Executing step batch', {
      batchSize: stepBatch.length,
      steps: stepBatch.map(s => s.stepId)
    })

    // Execute steps in parallel within each batch
    const batchPromises = stepBatch.map(async (step) => {
      try {
        // Check step condition if specified
        if (step.condition && !evaluateCondition(step.condition, stepResults, context)) {
          logger.info('Step condition not met, skipping', {
            stepId: step.stepId,
            condition: step.condition
          })
          return { stepId: step.stepId, skipped: true }
        }

        // Prepare step input with dependency results
        const stepInput = prepareStepInput(step, stepResults, context)
        
        // Execute step using agent task orchestrator
        const stepResult = await executeWorkflowStep(
          step,
          stepInput,
          context,
          logger
        )

        stepResults.set(step.stepId, stepResult)
        executedSteps.add(step.stepId)
        completedSteps++

        logger.info('Step completed successfully', {
          stepId: step.stepId,
          agentType: step.agentType,
          duration: stepResult.execution?.duration || 0
        })

        return { stepId: step.stepId, result: stepResult, success: true }

      } catch (error) {
        logger.error('Step execution failed', {
          stepId: step.stepId,
          error: error instanceof Error ? error.message : String(error)
        })

        // Handle error based on workflow error handling strategy
        if (workflow.errorHandling?.strategy === 'fail_fast') {
          throw error
        } else if (workflow.errorHandling?.strategy === 'continue_on_error') {
          stepResults.set(step.stepId, { error: error instanceof Error ? error.message : String(error) })
          return { stepId: step.stepId, error: error instanceof Error ? error.message : String(error), success: false }
        } else if (workflow.errorHandling?.strategy === 'retry_failed') {
          // Retry logic would be implemented here
          throw error
        }
      }
    })

    // Wait for batch completion
    const batchResults = await Promise.all(batchPromises)
    
    // Update context with batch results
    context.executionHistory.push({
      batch: stepBatch.map(s => s.stepId),
      results: batchResults,
      timestamp: new Date()
    })
  }

  // Generate final workflow result using AI SDK v5
  const finalResult = await generateWorkflowSummary(
    workflow,
    stepResults,
    context,
    logger
  )

  return {
    completedSteps,
    results: Object.fromEntries(stepResults),
    finalResult
  }
}

/**
 * Execute individual workflow step
 */
async function executeWorkflowStep(
  step: AgentWorkflowConfig['steps'][0],
  input: any,
  context: any,
  logger: any
): Promise<AgentTaskResult> {
  const agentRequest: AgentTaskRequest = {
    agentType: step.agentType as any,
    taskId: `${context.workflowId}-${step.stepId}`,
    input,
    context: {
      priority: 'medium',
      timeout: step.timeout || 300000,
      maxRetries: step.retryStrategy?.maxRetries || 2
    },
    workflow: {
      chainId: context.workflowId,
      stepNumber: parseInt(step.stepId.split('-').pop() || '0'),
      dependencies: step.dependencies
    }
  }

  logger.info('Executing workflow step', {
    stepId: step.stepId,
    agentType: step.agentType,
    dependencies: step.dependencies?.length || 0
  })

  // Use triggerAndWait for step execution
  const result = await agentTaskOrchestratorTask.triggerAndWait(agentRequest)
  
  return result
}

/**
 * Build dependency graph from workflow steps
 */
function buildDependencyGraph(steps: AgentWorkflowConfig['steps']): Map<string, string[]> {
  const graph = new Map<string, string[]>()
  
  for (const step of steps) {
    graph.set(step.stepId, step.dependencies || [])
  }
  
  return graph
}

/**
 * Get execution order based on dependencies (topological sort)
 */
function getExecutionOrder(dependencyGraph: Map<string, string[]>): Array<Array<AgentWorkflowConfig['steps'][0]>> {
  const steps = Array.from(dependencyGraph.keys())
  const visited = new Set<string>()
  const batches: string[][] = []
  
  while (visited.size < steps.length) {
    const currentBatch: string[] = []
    
    for (const step of steps) {
      if (visited.has(step)) continue
      
      const dependencies = dependencyGraph.get(step) || []
      const dependenciesMet = dependencies.every(dep => visited.has(dep))
      
      if (dependenciesMet) {
        currentBatch.push(step)
      }
    }
    
    if (currentBatch.length === 0) {
      throw new Error('Circular dependency detected in workflow')
    }
    
    currentBatch.forEach(step => visited.add(step))
    batches.push(currentBatch)
  }
  
  // Convert step IDs back to step objects (simplified for this example)
  return batches.map(batch => 
    batch.map(stepId => ({ stepId, agentType: 'placeholder', input: {} }))
  )
}

/**
 * Prepare step input with dependency results
 */
function prepareStepInput(
  step: AgentWorkflowConfig['steps'][0],
  stepResults: Map<string, any>,
  context: any
): any {
  let input = { ...step.input }
  
  // Add dependency results to input
  if (step.dependencies) {
    const dependencyResults: Record<string, any> = {}
    
    for (const depId of step.dependencies) {
      const depResult = stepResults.get(depId)
      if (depResult) {
        dependencyResults[depId] = depResult.result || depResult
      }
    }
    
    input = {
      ...input,
      dependencies: dependencyResults,
      sharedContext: context.sharedContext
    }
  }
  
  return input
}

/**
 * Evaluate step condition
 */
function evaluateCondition(
  condition: string,
  stepResults: Map<string, any>,
  context: any
): boolean {
  try {
    // Create evaluation context
    const evalContext = {
      results: Object.fromEntries(stepResults),
      context: context.sharedContext,
      stepCount: stepResults.size
    }
    
    // Create function to evaluate condition
    const conditionFn = new Function('results', 'context', 'stepCount', `return ${condition}`)
    
    return conditionFn(evalContext.results, evalContext.context, evalContext.stepCount)
  } catch (error) {
    console.warn('Error evaluating condition:', condition, error)
    return true // Default to true if condition evaluation fails
  }
}

/**
 * Generate workflow summary using AI SDK v5
 */
async function generateWorkflowSummary(
  workflow: AgentWorkflowConfig,
  stepResults: Map<string, any>,
  context: any,
  logger: any
): Promise<any> {
  logger.info('Generating workflow summary', {
    workflowId: context.workflowId,
    completedSteps: stepResults.size
  })

  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      workflowSummary: z.object({
        workflowId: z.string(),
        name: z.string(),
        status: z.enum(['completed', 'partial', 'failed']),
        completedSteps: z.number(),
        totalSteps: z.number(),
        duration: z.number(),
        keyResults: z.array(z.object({
          stepId: z.string(),
          agentType: z.string(),
          result: z.string(),
          impact: z.enum(['low', 'medium', 'high'])
        })),
        insights: z.array(z.string()),
        recommendations: z.array(z.string()),
        nextActions: z.array(z.string())
      })
    }),
    system: `You are a workflow analysis agent. Analyze the completed workflow and provide comprehensive insights and recommendations.`,
    prompt: `Analyze this completed workflow:
    
    Workflow: ${workflow.name}
    Description: ${workflow.description}
    Steps Completed: ${stepResults.size}/${workflow.steps.length}
    
    Step Results:
    ${Array.from(stepResults.entries()).map(([stepId, result]) => 
      `- ${stepId}: ${JSON.stringify(result.result || result).substring(0, 200)}...`
    ).join('\n')}
    
    Provide a comprehensive summary with insights, recommendations, and next actions.`
  })

  return result.object
}

/**
 * Immigration Case Processing Workflow
 * 
 * Pre-defined workflow for comprehensive immigration case processing
 */
export const immigrationCaseProcessingWorkflow: AgentWorkflowConfig = {
  workflowId: 'immigration-case-processing',
  name: 'Immigration Case Processing Workflow',
  description: 'Comprehensive workflow for processing immigration cases from document analysis to final decision',
  steps: [
    {
      stepId: 'document-analysis',
      agentType: 'document_processing_team',
      input: {
        documents: '${input.documents}',
        caseContext: '${input.caseContext}'
      },
      dependencies: [],
      timeout: 600000 // 10 minutes
    },
    {
      stepId: 'policy-compliance',
      agentType: 'policy_compliance_team',
      input: {
        application: '${input.application}',
        documentAnalysis: '${dependencies.document-analysis.result}'
      },
      dependencies: ['document-analysis'],
      timeout: 900000 // 15 minutes
    },
    {
      stepId: 'impact-assessment',
      agentType: 'impact_assessment_agent',
      input: {
        policyChanges: '${input.recentPolicyChanges}',
        context: {
          documentAnalysis: '${dependencies.document-analysis.result}',
          complianceCheck: '${dependencies.policy-compliance.result}'
        }
      },
      dependencies: ['document-analysis', 'policy-compliance'],
      timeout: 600000
    },
    {
      stepId: 'case-decision',
      agentType: 'case_decision_team',
      input: {
        caseData: {
          documents: '${dependencies.document-analysis.result}',
          compliance: '${dependencies.policy-compliance.result}',
          impact: '${dependencies.impact-assessment.result}'
        }
      },
      dependencies: ['document-analysis', 'policy-compliance', 'impact-assessment'],
      condition: 'results["policy-compliance"].result.overallCompliance !== "non_compliant"',
      timeout: 1200000 // 20 minutes
    },
    {
      stepId: 'notification-generation',
      agentType: 'notification_generation_agent',
      input: {
        decision: '${dependencies.case-decision.result}',
        recipients: '${input.applicants}',
        impactAssessment: '${dependencies.impact-assessment.result}'
      },
      dependencies: ['case-decision', 'impact-assessment'],
      timeout: 300000 // 5 minutes
    }
  ],
  triggers: [
    {
      type: 'event',
      config: {
        eventName: 'immigration.case.submitted'
      }
    }
  ],
  errorHandling: {
    strategy: 'continue_on_error',
    fallbackAgent: 'immigration_orchestrator',
    notificationChannels: ['admin-alerts', 'case-managers']
  }
}

/**
 * Policy Change Impact Analysis Workflow
 * 
 * Pre-defined workflow for analyzing policy changes and their impacts
 */
export const policyChangeImpactWorkflow: AgentWorkflowConfig = {
  workflowId: 'policy-change-impact-analysis',
  name: 'Policy Change Impact Analysis Workflow',
  description: 'Analyze policy changes and assess their impact across jurisdictions',
  steps: [
    {
      stepId: 'policy-monitoring',
      agentType: 'policy_monitoring_agent',
      input: {
        sources: '${input.sources}',
        lastCheck: '${input.lastCheck}'
      },
      dependencies: [],
      timeout: 600000
    },
    {
      stepId: 'impact-assessment',
      agentType: 'impact_assessment_agent',
      input: {
        policyChanges: '${dependencies.policy-monitoring.result.monitoringResults}',
        context: '${input.context}'
      },
      dependencies: ['policy-monitoring'],
      condition: 'results["policy-monitoring"].result.summary.totalChanges > 0',
      timeout: 900000
    },
    {
      stepId: 'cross-jurisdiction-analysis',
      agentType: 'cross_jurisdiction_agent',
      input: {
        jurisdictions: '${input.jurisdictions}',
        policyChanges: '${dependencies.policy-monitoring.result.monitoringResults}',
        context: '${dependencies.impact-assessment.result}'
      },
      dependencies: ['policy-monitoring', 'impact-assessment'],
      timeout: 1200000
    },
    {
      stepId: 'trend-analysis',
      agentType: 'trend_analysis_agent',
      input: {
        historicalData: '${input.historicalData}',
        recentChanges: '${dependencies.policy-monitoring.result.monitoringResults}',
        context: {
          impact: '${dependencies.impact-assessment.result}',
          crossJurisdiction: '${dependencies.cross-jurisdiction-analysis.result}'
        }
      },
      dependencies: ['policy-monitoring', 'impact-assessment', 'cross-jurisdiction-analysis'],
      timeout: 900000
    },
    {
      stepId: 'notification-generation',
      agentType: 'notification_generation_agent',
      input: {
        policyChanges: '${dependencies.policy-monitoring.result.monitoringResults}',
        impactAssessment: '${dependencies.impact-assessment.result}',
        recipients: '${input.stakeholders}'
      },
      dependencies: ['policy-monitoring', 'impact-assessment', 'trend-analysis'],
      timeout: 300000
    }
  ],
  triggers: [
    {
      type: 'schedule',
      config: {
        cron: '0 */6 * * *' // Every 6 hours
      }
    },
    {
      type: 'event',
      config: {
        eventName: 'policy.change.detected'
      }
    }
  ],
  errorHandling: {
    strategy: 'retry_failed',
    fallbackAgent: 'policy_monitoring_agent',
    notificationChannels: ['policy-team', 'admin-alerts']
  }
}