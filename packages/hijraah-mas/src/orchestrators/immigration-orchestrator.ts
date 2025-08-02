import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  CaseData, 
  ProcessedCaseData, 
  CaseDataSchema,
  AgentExecution 
} from '../types'
import { 
  logAgentExecution, 
  getCaseProcessingHistory,
  cacheAgentResult,
  getCachedAgentResult,
  withAgentErrorHandling,
  monitorAgentPerformance,
  getModelForTask,
  generateCacheKey
} from '../utils'

// Processing plan schema
const ProcessingPlanSchema = z.object({
  tasks: z.array(z.object({
    type: z.enum([
      'document_analysis',
      'policy_compliance', 
      'risk_assessment',
      'eligibility_check',
      'timeline_estimation'
    ]),
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    estimatedDuration: z.number(), // in minutes
    dependencies: z.array(z.string()).optional()
  })),
  estimatedComplexity: z.enum(['low', 'medium', 'high']),
  recommendedApproach: z.string()
})

type ProcessingPlan = z.infer<typeof ProcessingPlanSchema>

export class ImmigrationOrchestrator {
  private performanceMonitor = monitorAgentPerformance('ImmigrationOrchestrator')

  /**
   * Main entry point for processing immigration cases
   */
  async processCase(caseData: CaseData): Promise<ProcessedCaseData> {
    const startTime = Date.now()
    const execution: Partial<AgentExecution> = {
      type: 'immigration_case_processing',
      caseId: caseData.id,
      steps: [],
      timestamp: new Date()
    }

    try {
      // Validate input data
      const validatedCaseData = CaseDataSchema.parse(caseData)

      // Check cache first
      const cacheKey = generateCacheKey('case_processing', caseData.id)
      const cachedResult = await getCachedAgentResult(cacheKey)
      if (cachedResult) {
        return cachedResult
      }

      // Step 1: Create processing plan
      const plan = await this.createProcessingPlan(validatedCaseData)
      
      // Step 2: Execute tasks based on plan
      const results = await this.executeTasks(plan, validatedCaseData)
      
      // Step 3: Synthesize final result
      const finalResult = await this.synthesizeResults(validatedCaseData, results)

      // Cache the result
      await cacheAgentResult(cacheKey, finalResult, 3600) // 1 hour cache

      // Log execution
      const duration = Date.now() - startTime
      const completeExecution: AgentExecution = {
        ...execution as AgentExecution,
        result: finalResult,
        duration,
        success: true
      }

      await logAgentExecution(completeExecution)
      await this.performanceMonitor(completeExecution)

      return finalResult

    } catch (error) {
      const duration = Date.now() - startTime
      const failedExecution: AgentExecution = {
        ...execution as AgentExecution,
        result: null,
        duration,
        success: false
      }

      await logAgentExecution(failedExecution)
      throw error
    }
  }

  /**
   * Create a processing plan for the case
   */
  private async createProcessingPlan(caseData: CaseData): Promise<ProcessingPlan> {
    const { object: plan } = await generateObject({
      model: openai(getModelForTask('case_planning')),
      schema: ProcessingPlanSchema,
      system: `You are an immigration case processing planner. Analyze the case and create an optimal processing plan.
      
      Consider:
      - Case type and complexity
      - Number and types of documents
      - Country-specific requirements
      - Timeline constraints
      - Risk factors`,
      prompt: `Analyze this immigration case and create a processing plan:
      
      Case Type: ${caseData.caseType}
      Country: ${caseData.country}
      Documents: ${caseData.documents.length} documents
      Timeline: Submitted ${caseData.timeline.submitted}, Deadline: ${caseData.timeline.deadline || 'Not specified'}
      
      Create a comprehensive processing plan with prioritized tasks.`,
    })

    return plan
  }

  /**
   * Execute tasks based on the processing plan
   */
  private async executeTasks(
    plan: ProcessingPlan, 
    caseData: CaseData
  ): Promise<Record<string, any>> {
    const results: Record<string, any> = {}

    // Sort tasks by priority and dependencies
    const sortedTasks = this.sortTasksByPriority(plan.tasks)

    // Execute tasks in parallel where possible
    const taskPromises = sortedTasks.map(async (task) => {
      const taskResult = await this.executeTask(task, caseData, results)
      return { [task.type]: taskResult }
    })

    const taskResults = await Promise.all(taskPromises)
    
    // Merge results
    taskResults.forEach(result => {
      Object.assign(results, result)
    })

    return results
  }

  /**
   * Execute a single task
   */
  private async executeTask(
    task: ProcessingPlan['tasks'][0],
    caseData: CaseData,
    previousResults: Record<string, any>
  ): Promise<any> {
    const taskExecutor = withAgentErrorHandling(async () => {
      switch (task.type) {
        case 'document_analysis':
          return this.analyzeDocuments(caseData.documents)
        
        case 'policy_compliance':
          return this.checkPolicyCompliance(caseData, previousResults)
        
        case 'risk_assessment':
          return this.assessRisk(caseData, previousResults)
        
        case 'eligibility_check':
          return this.checkEligibility(caseData, previousResults)
        
        case 'timeline_estimation':
          return this.estimateTimeline(caseData, previousResults)
        
        default:
          throw new Error(`Unknown task type: ${task.type}`)
      }
    })

    return await taskExecutor()
  }

  /**
   * Analyze documents in the case
   */
  private async analyzeDocuments(documents: CaseData['documents']) {
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        completeness: z.object({
          score: z.number().min(0).max(100),
          missingDocuments: z.array(z.string()),
          recommendations: z.array(z.string())
        }),
        authenticity: z.object({
          score: z.number().min(0).max(100),
          concerns: z.array(z.string()),
          verificationNeeded: z.array(z.string())
        }),
        quality: z.object({
          score: z.number().min(0).max(100),
          issues: z.array(z.string()),
          improvements: z.array(z.string())
        })
      }),
      system: 'You are an expert immigration document analyst. Analyze documents for completeness, authenticity, and quality.',
      prompt: `Analyze these immigration documents:
      
      ${documents.map(doc => `- ${doc.type}: ${doc.id}`).join('\n')}
      
      Provide detailed analysis of completeness, authenticity, and quality.`
    })

    return analysis
  }

  /**
   * Check policy compliance
   */
  private async checkPolicyCompliance(caseData: CaseData, context: Record<string, any>) {
    const { object: compliance } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        overallCompliance: z.enum(['compliant', 'non_compliant', 'requires_review']),
        score: z.number().min(0).max(100),
        violations: z.array(z.object({
          policy: z.string(),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          description: z.string(),
          remedy: z.string()
        })),
        recommendations: z.array(z.string())
      }),
      system: 'You are an immigration policy compliance expert. Check applications against current immigration policies.',
      prompt: `Check policy compliance for this case:
      
      Case Type: ${caseData.caseType}
      Country: ${caseData.country}
      Document Analysis: ${JSON.stringify(context.document_analysis || {})}
      
      Identify any policy violations and provide recommendations.`
    })

    return compliance
  }

  /**
   * Assess risk factors
   */
  private async assessRisk(caseData: CaseData, context: Record<string, any>) {
    const { object: riskAssessment } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        overallRisk: z.enum(['low', 'medium', 'high', 'critical']),
        score: z.number().min(0).max(100),
        factors: z.array(z.object({
          factor: z.string(),
          risk: z.enum(['low', 'medium', 'high']),
          impact: z.string(),
          mitigation: z.string()
        })),
        recommendations: z.array(z.string())
      }),
      system: 'You are a risk assessment specialist for immigration cases. Identify and evaluate risk factors.',
      prompt: `Assess risk factors for this immigration case:
      
      Case: ${JSON.stringify(caseData)}
      Context: ${JSON.stringify(context)}
      
      Identify potential risks and provide mitigation strategies.`
    })

    return riskAssessment
  }

  /**
   * Check eligibility
   */
  private async checkEligibility(caseData: CaseData, context: Record<string, any>) {
    const { object: eligibility } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        eligible: z.boolean(),
        confidence: z.number().min(0).max(100),
        criteria: z.array(z.object({
          criterion: z.string(),
          met: z.boolean(),
          evidence: z.string(),
          notes: z.string().optional()
        })),
        recommendations: z.array(z.string())
      }),
      system: 'You are an immigration eligibility specialist. Determine if applicants meet requirements.',
      prompt: `Check eligibility for this immigration case:
      
      Case Type: ${caseData.caseType}
      Country: ${caseData.country}
      Analysis Context: ${JSON.stringify(context)}
      
      Determine eligibility based on current requirements.`
    })

    return eligibility
  }

  /**
   * Estimate processing timeline
   */
  private async estimateTimeline(caseData: CaseData, context: Record<string, any>) {
    const { object: timeline } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        estimatedDays: z.number(),
        confidence: z.enum(['low', 'medium', 'high']),
        factors: z.array(z.string()),
        milestones: z.array(z.object({
          milestone: z.string(),
          estimatedDate: z.string(),
          dependencies: z.array(z.string())
        }))
      }),
      system: 'You are a timeline estimation specialist for immigration cases.',
      prompt: `Estimate processing timeline for this case:
      
      Case Type: ${caseData.caseType}
      Country: ${caseData.country}
      Complexity: ${context.complexity || 'unknown'}
      
      Provide realistic timeline estimates with key milestones.`
    })

    return timeline
  }

  /**
   * Synthesize all results into final output
   */
  private async synthesizeResults(
    caseData: CaseData, 
    results: Record<string, any>
  ): Promise<ProcessedCaseData> {
    const { text: summary } = await generateText({
      model: openai('gpt-4o'),
      system: 'You are an immigration case manager. Synthesize analysis results into actionable recommendations.',
      prompt: `Synthesize the following analysis results for immigration case ${caseData.id}:
      
      ${JSON.stringify(results, null, 2)}
      
      Provide a comprehensive summary with clear next steps and recommendations.`
    })

    return {
      caseData,
      documentAnalysis: results.document_analysis || {},
      policyCompliance: results.policy_compliance || {},
      riskAssessment: results.risk_assessment || {},
      recommendations: [summary]
    }
  }

  /**
   * Sort tasks by priority and handle dependencies
   */
  private sortTasksByPriority(tasks: ProcessingPlan['tasks']): ProcessingPlan['tasks'] {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    
    return tasks.sort((a, b) => {
      // First sort by priority
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      // Then by estimated duration (shorter first)
      return a.estimatedDuration - b.estimatedDuration
    })
  }

  /**
   * Get case processing history
   */
  async getCaseHistory(caseId: string) {
    return await getCaseProcessingHistory(caseId)
  }
}