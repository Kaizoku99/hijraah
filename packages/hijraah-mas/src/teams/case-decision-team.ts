import { generateObject, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  ProcessedCaseData,
  ProcessedCaseDataSchema
} from '../types'
import { 
  withAgentErrorHandling,
  logAgentStep,
  getModelForTask
} from '../utils'
import {
  precedentTool,
  riskAssessmentTool,
  recommendationTool
} from '../tools'

// Decision schema
const DecisionSchema = z.object({
  decision: z.enum(['approve', 'deny', 'request_additional_info', 'defer']),
  confidence: z.number().min(0).max(1),
  reasoning: z.array(z.string()),
  supportingEvidence: z.array(z.string()),
  riskFactors: z.array(z.object({
    factor: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
    mitigation: z.string()
  })),
  conditions: z.array(z.string()).optional(),
  requiredActions: z.array(z.string()).optional(),
  timeline: z.object({
    estimatedProcessingDays: z.number(),
    keyMilestones: z.array(z.object({
      milestone: z.string(),
      estimatedDate: z.string()
    }))
  }),
  appealRights: z.object({
    canAppeal: z.boolean(),
    appealDeadline: z.string().optional(),
    appealProcess: z.string().optional()
  })
})

// Precedent analysis schema
const PrecedentAnalysisSchema = z.object({
  similarCases: z.array(z.object({
    caseId: z.string(),
    similarity: z.number().min(0).max(100),
    outcome: z.string(),
    keyFactors: z.array(z.string()),
    relevance: z.string()
  })),
  patterns: z.array(z.string()),
  recommendations: z.array(z.string())
})

// Risk assessment schema
const RiskAssessmentSchema = z.object({
  overallRisk: z.enum(['low', 'medium', 'high', 'critical']),
  riskScore: z.number().min(0).max(100),
  riskFactors: z.array(z.object({
    category: z.string(),
    factor: z.string(),
    probability: z.number().min(0).max(100),
    impact: z.enum(['low', 'medium', 'high']),
    mitigation: z.string()
  })),
  recommendations: z.array(z.string())
})

export class CaseDecisionTeam {
  /**
   * Main decision-making method
   */
  async makeDecision(caseData: ProcessedCaseData) {
    const makeDecision = withAgentErrorHandling(async () => {
      // Step 1: Analyze precedents
      const precedentAnalysis = await this.analyzePrecedents(caseData)
      
      logAgentStep({
        stepNumber: 1,
        text: `Analyzed precedents: found ${precedentAnalysis.similarCases.length} similar cases`,
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      })

      // Step 2: Assess risks
      const riskAssessment = await this.assessRisks(caseData, precedentAnalysis)
      
      logAgentStep({
        stepNumber: 2,
        text: `Risk assessment completed: ${riskAssessment.overallRisk} risk (Score: ${riskAssessment.riskScore})`,
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      })

      // Step 3: Make final decision
      const decision = await this.makeFinalDecision(caseData, precedentAnalysis, riskAssessment)
      
      logAgentStep({
        stepNumber: 3,
        text: `Final decision: ${decision.decision} (Confidence: ${Math.round(decision.confidence * 100)}%)`,
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      })

      return {
        precedentAnalysis,
        riskAssessment,
        decision
      }
    })

    return await makeDecision()
  }

  /**
   * Analyze similar cases and precedents
   */
  private async analyzePrecedents(caseData: ProcessedCaseData) {
    const { object: precedentAnalysis } = await generateObject({
      model: openai(getModelForTask('case_decision')),
      schema: PrecedentAnalysisSchema,
      tools: {
        consultPrecedents: precedentTool
      },
      maxSteps: 3,
      system: `You are a legal precedent analyst specializing in immigration cases.
      
      Your role:
      - Find similar cases and their outcomes
      - Identify patterns in decision-making
      - Assess relevance of precedents
      - Provide guidance based on historical data`,
      prompt: `Analyze precedents for this immigration case:
      
      Case Data: ${JSON.stringify(caseData)}
      
      Find similar cases and analyze patterns to inform decision-making.`
    })

    return precedentAnalysis
  }

  /**
   * Assess risks associated with the case
   */
  private async assessRisks(
    caseData: ProcessedCaseData,
    precedentAnalysis: any
  ) {
    const { object: riskAssessment } = await generateObject({
      model: openai(getModelForTask('case_decision')),
      schema: RiskAssessmentSchema,
      tools: {
        calculateRiskScore: riskAssessmentTool
      },
      maxSteps: 3,
      system: `You are a risk assessment specialist for immigration cases.
      
      Evaluate risks including:
      - Security and background concerns
      - Document authenticity issues
      - Policy compliance violations
      - Precedent-based risks
      - Administrative and processing risks`,
      prompt: `Assess risks for this immigration case:
      
      Case Data: ${JSON.stringify(caseData)}
      Precedent Analysis: ${JSON.stringify(precedentAnalysis)}
      
      Provide comprehensive risk assessment with mitigation strategies.`
    })

    return riskAssessment
  }

  /**
   * Make the final decision
   */
  private async makeFinalDecision(
    caseData: ProcessedCaseData,
    precedentAnalysis: any,
    riskAssessment: any
  ) {
    // Create final decision tool
    const finalDecisionTool = tool({
      description: 'Provide final immigration case decision with detailed reasoning',
      parameters: DecisionSchema,
      // No execute function - terminates agent
    })

    const { toolCalls } = await generateObject({
      model: openai(getModelForTask('case_decision')),
      schema: z.object({
        toolCalls: z.array(z.any())
      }),
      tools: {
        consultPrecedents: precedentTool,
        calculateRiskScore: riskAssessmentTool,
        generateRecommendation: recommendationTool,
        finalDecision: finalDecisionTool,
      },
      toolChoice: 'required',
      maxSteps: 10,
      system: `You are a senior immigration officer making case decisions.
      
      Your decision-making process:
      1. Review all case evidence and analysis
      2. Consider precedents and patterns
      3. Evaluate risks and mitigation strategies
      4. Apply current policies and regulations
      5. Make reasoned decision with clear justification
      
      Ensure decisions are:
      - Fair and consistent
      - Well-reasoned and documented
      - Compliant with current policies
      - Considerate of individual circumstances`,
      prompt: `Make a final decision for this immigration case:
      
      Case Data: ${JSON.stringify(caseData)}
      Precedent Analysis: ${JSON.stringify(precedentAnalysis)}
      Risk Assessment: ${JSON.stringify(riskAssessment)}
      
      Consider all evidence and provide a well-reasoned decision with clear justification.`
    })

    // Extract the final decision from tool calls
    const finalDecisionCall = toolCalls.find(call => call.name === 'finalDecision')
    if (!finalDecisionCall) {
      throw new Error('No final decision was made')
    }

    return DecisionSchema.parse(finalDecisionCall.parameters)
  }

  /**
   * Review and validate a decision
   */
  async reviewDecision(
    caseData: ProcessedCaseData,
    decision: any,
    reviewer: string
  ) {
    const reviewDecision = withAgentErrorHandling(async () => {
      const { object: review } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          reviewOutcome: z.enum(['approved', 'rejected', 'requires_revision']),
          confidence: z.number().min(0).max(100),
          findings: z.array(z.string()),
          concerns: z.array(z.object({
            concern: z.string(),
            severity: z.enum(['low', 'medium', 'high']),
            recommendation: z.string()
          })),
          recommendations: z.array(z.string()),
          revisedDecision: z.any().optional()
        }),
        system: `You are a senior immigration case reviewer. Review decisions for accuracy, fairness, and compliance.
        
        Review criteria:
        - Decision reasoning and evidence
        - Policy compliance
        - Consistency with precedents
        - Fairness and due process
        - Documentation quality`,
        prompt: `Review this immigration case decision:
        
        Case Data: ${JSON.stringify(caseData)}
        Decision: ${JSON.stringify(decision)}
        Reviewer: ${reviewer}
        
        Provide thorough review with findings and recommendations.`
      })

      return review
    })

    return await reviewDecision()
  }

  /**
   * Generate decision documentation
   */
  async generateDecisionDocument(
    caseData: ProcessedCaseData,
    decision: any,
    analysis: any
  ) {
    const generateDocument = withAgentErrorHandling(async () => {
      const { object: document } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          documentType: z.string(),
          caseReference: z.string(),
          applicantName: z.string(),
          decisionDate: z.string(),
          decision: z.string(),
          executiveSummary: z.string(),
          factualBackground: z.string(),
          legalAnalysis: z.string(),
          reasoning: z.array(z.string()),
          conditions: z.array(z.string()).optional(),
          appealRights: z.string(),
          nextSteps: z.array(z.string()),
          officerSignature: z.string(),
          reviewerSignature: z.string().optional()
        }),
        system: 'You are a legal document specialist. Generate formal immigration decision documents.',
        prompt: `Generate a formal decision document for this immigration case:
        
        Case Data: ${JSON.stringify(caseData)}
        Decision: ${JSON.stringify(decision)}
        Analysis: ${JSON.stringify(analysis)}
        
        Create a comprehensive, legally sound decision document.`
      })

      return document
    })

    return await generateDocument()
  }

  /**
   * Calculate processing statistics
   */
  async getProcessingStatistics(
    timeframe: string,
    caseType?: string,
    country?: string
  ) {
    const getStats = withAgentErrorHandling(async () => {
      const { object: stats } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          totalCases: z.number(),
          approvalRate: z.number(),
          averageProcessingDays: z.number(),
          decisionBreakdown: z.object({
            approved: z.number(),
            denied: z.number(),
            additionalInfoRequested: z.number(),
            deferred: z.number()
          }),
          commonReasons: z.array(z.object({
            reason: z.string(),
            frequency: z.number(),
            category: z.string()
          })),
          trends: z.array(z.string())
        }),
        system: 'You are a case processing statistics analyst. Analyze decision patterns and trends.',
        prompt: `Generate processing statistics for:
        
        Timeframe: ${timeframe}
        Case Type: ${caseType || 'All'}
        Country: ${country || 'All'}
        
        Provide comprehensive statistics and trend analysis.`
      })

      return stats
    })

    return await getStats()
  }
}