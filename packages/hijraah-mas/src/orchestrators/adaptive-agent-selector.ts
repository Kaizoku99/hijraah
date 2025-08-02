import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { AgentExecution, CaseData } from '../types'
import { getAgentMetrics } from '../utils/supabase-integration'
import { getCachedAgentResult, cacheAgentResult } from '../utils/redis-integration'

// Agent performance metrics schema
const AgentPerformanceMetricsSchema = z.object({
  agentId: z.string(),
  agentType: z.string(),
  specializations: z.array(z.string()),
  performanceMetrics: z.object({
    successRate: z.number().min(0).max(1),
    averageResponseTime: z.number(),
    averageQualityScore: z.number().min(0).max(100),
    totalExecutions: z.number(),
    tokenEfficiency: z.number(), // tokens per successful outcome
    lastUpdated: z.date()
  }),
  capabilities: z.array(z.object({
    capability: z.string(),
    proficiency: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    lastAssessed: z.date()
  })),
  workloadMetrics: z.object({
    currentLoad: z.number().min(0).max(100),
    queueLength: z.number(),
    estimatedAvailability: z.date()
  })
})

type AgentPerformanceMetrics = z.infer<typeof AgentPerformanceMetricsSchema>

// Agent selection criteria schema
const AgentSelectionCriteriaSchema = z.object({
  taskType: z.string(),
  complexity: z.enum(['low', 'medium', 'high', 'critical']),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  requiredCapabilities: z.array(z.string()),
  qualityThreshold: z.number().min(0).max(100),
  timeConstraint: z.number().optional(), // max duration in minutes
  costConstraint: z.number().optional(), // max token budget
  specialRequirements: z.array(z.string()).optional()
})

type AgentSelectionCriteria = z.infer<typeof AgentSelectionCriteriaSchema>

// Agent selection result schema
const AgentSelectionResultSchema = z.object({
  selectedAgent: z.object({
    agentId: z.string(),
    agentType: z.string(),
    selectionScore: z.number().min(0).max(100),
    expectedPerformance: z.object({
      successProbability: z.number().min(0).max(1),
      estimatedDuration: z.number(),
      estimatedTokenUsage: z.number(),
      qualityScore: z.number().min(0).max(100)
    }),
    selectionReason: z.string()
  }),
  alternatives: z.array(z.object({
    agentId: z.string(),
    agentType: z.string(),
    selectionScore: z.number().min(0).max(100),
    reason: z.string()
  })),
  confidence: z.number().min(0).max(100),
  selectionMetadata: z.object({
    selectionTime: z.date(),
    criteriaUsed: AgentSelectionCriteriaSchema,
    performanceDataAge: z.number() // hours since last update
  })
})

type AgentSelectionResult = z.infer<typeof AgentSelectionResultSchema>

// Specialization matching schema
const SpecializationMatchSchema = z.object({
  agentId: z.string(),
  matchScore: z.number().min(0).max(100),
  matchingCapabilities: z.array(z.object({
    capability: z.string(),
    required: z.boolean(),
    agentProficiency: z.number(),
    matchStrength: z.number().min(0).max(100)
  })),
  missingCapabilities: z.array(z.string()),
  overqualifiedCapabilities: z.array(z.string())
})

type SpecializationMatch = z.infer<typeof SpecializationMatchSchema>

export class AdaptiveAgentSelector {
  private agentRegistry: Map<string, AgentPerformanceMetrics> = new Map()
  private selectionHistory: AgentSelectionResult[] = []
  private performanceUpdateInterval = 3600000 // 1 hour in milliseconds

  /**
   * Select the best agent for a given task based on performance metrics and specialization
   */
  async selectBestAgent(
    criteria: AgentSelectionCriteria,
    caseContext?: CaseData
  ): Promise<AgentSelectionResult> {
    // Check cache first
    const cacheKey = this.generateSelectionCacheKey(criteria, caseContext)
    const cachedResult = await getCachedAgentResult(cacheKey)
    if (cachedResult && this.isCacheValid(cachedResult)) {
      return cachedResult
    }

    // Update agent performance metrics if needed
    await this.updateAgentMetrics()

    // Get available agents
    const availableAgents = await this.getAvailableAgents(criteria)

    // Perform specialization matching
    const specializationMatches = await this.matchSpecializations(criteria, availableAgents)

    // Calculate selection scores
    const scoredAgents = await this.calculateSelectionScores(
      criteria,
      specializationMatches,
      caseContext
    )

    // Select best agent with alternatives
    const selectionResult = await this.makeSelection(criteria, scoredAgents)

    // Cache result
    await cacheAgentResult(cacheKey, selectionResult, 1800) // 30 minutes

    // Update selection history
    this.selectionHistory.push(selectionResult)

    return selectionResult
  }

  /**
   * Update agent performance metrics from historical data
   */
  private async updateAgentMetrics(): Promise<void> {
    const agentTypes = Array.from(this.agentRegistry.keys())
    
    for (const agentType of agentTypes) {
      const currentMetrics = this.agentRegistry.get(agentType)
      if (!currentMetrics) continue

      // Check if update is needed
      const timeSinceUpdate = Date.now() - currentMetrics.performanceMetrics.lastUpdated.getTime()
      if (timeSinceUpdate < this.performanceUpdateInterval) continue

      // Get fresh metrics from database
      const dbMetrics = await getAgentMetrics(agentType, {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        end: new Date()
      })

      // Update performance metrics
      const updatedMetrics: AgentPerformanceMetrics = {
        ...currentMetrics,
        performanceMetrics: {
          ...currentMetrics.performanceMetrics,
          successRate: dbMetrics.successRate,
          averageResponseTime: dbMetrics.averageDuration,
          totalExecutions: dbMetrics.totalExecutions,
          tokenEfficiency: dbMetrics.averageTokenUsage > 0 
            ? dbMetrics.successRate / dbMetrics.averageTokenUsage * 1000 
            : 0,
          lastUpdated: new Date(),
          averageQualityScore: currentMetrics.performanceMetrics.averageQualityScore // Keep existing
        }
      }

      this.agentRegistry.set(agentType, updatedMetrics)
    }
  }

  /**
   * Get available agents that meet basic criteria
   */
  private async getAvailableAgents(criteria: AgentSelectionCriteria): Promise<AgentPerformanceMetrics[]> {
    const allAgents = Array.from(this.agentRegistry.values())
    
    return allAgents.filter(agent => {
      // Filter by workload
      if (agent.workloadMetrics.currentLoad > 90) return false
      
      // Filter by minimum success rate for critical tasks
      if (criteria.complexity === 'critical' && agent.performanceMetrics.successRate < 0.8) {
        return false
      }
      
      // Filter by time constraint
      if (criteria.timeConstraint) {
        const estimatedTime = agent.performanceMetrics.averageResponseTime / 60000 // convert to minutes
        if (estimatedTime > criteria.timeConstraint) return false
      }
      
      return true
    })
  }

  /**
   * Match agent specializations with task requirements
   */
  private async matchSpecializations(
    criteria: AgentSelectionCriteria,
    agents: AgentPerformanceMetrics[]
  ): Promise<SpecializationMatch[]> {
    const matches: SpecializationMatch[] = []

    for (const agent of agents) {
      const { object: match } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: SpecializationMatchSchema,
        system: `You are a specialization matching expert. 
        Analyze how well an agent's capabilities match task requirements.
        
        Consider:
        - Required vs optional capabilities
        - Proficiency levels
        - Specialization depth
        - Capability gaps`,
        prompt: `Match agent specializations with task requirements:
        
        Task Requirements:
        - Type: ${criteria.taskType}
        - Complexity: ${criteria.complexity}
        - Required Capabilities: ${criteria.requiredCapabilities.join(', ')}
        - Quality Threshold: ${criteria.qualityThreshold}
        
        Agent Capabilities:
        ${agent.capabilities.map(cap => 
          `- ${cap.capability}: ${cap.proficiency}% proficiency (${cap.confidence}% confidence)`
        ).join('\n')}
        
        Agent Specializations: ${agent.specializations.join(', ')}
        
        Calculate match score and identify gaps.`
      })

      matches.push({
        ...match,
        agentId: agent.agentId
      })
    }

    return matches
  }

  /**
   * Calculate selection scores for agents
   */
  private async calculateSelectionScores(
    criteria: AgentSelectionCriteria,
    matches: SpecializationMatch[],
    caseContext?: CaseData
  ): Promise<Array<SpecializationMatch & { selectionScore: number; reasoning: string }>> {
    const scoredAgents = []

    for (const match of matches) {
      const agent = this.agentRegistry.get(match.agentId)
      if (!agent) continue

      const { object: scoring } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          selectionScore: z.number().min(0).max(100),
          reasoning: z.string(),
          performanceFactors: z.object({
            specializationScore: z.number().min(0).max(100),
            performanceScore: z.number().min(0).max(100),
            availabilityScore: z.number().min(0).max(100),
            costEfficiencyScore: z.number().min(0).max(100),
            contextFitScore: z.number().min(0).max(100)
          })
        }),
        system: `You are an agent selection scoring specialist.
        Calculate comprehensive selection scores based on multiple factors.
        
        Scoring Factors:
        - Specialization match (30%)
        - Historical performance (25%)
        - Current availability (20%)
        - Cost efficiency (15%)
        - Context fit (10%)`,
        prompt: `Calculate selection score for agent:
        
        Task Criteria:
        ${JSON.stringify(criteria, null, 2)}
        
        Agent Performance:
        - Success Rate: ${agent.performanceMetrics.successRate * 100}%
        - Avg Response Time: ${agent.performanceMetrics.averageResponseTime}ms
        - Token Efficiency: ${agent.performanceMetrics.tokenEfficiency}
        - Current Load: ${agent.workloadMetrics.currentLoad}%
        
        Specialization Match:
        - Match Score: ${match.matchScore}%
        - Missing Capabilities: ${match.missingCapabilities.join(', ') || 'None'}
        
        Case Context: ${caseContext ? JSON.stringify(caseContext) : 'None'}
        
        Provide detailed scoring with reasoning.`
      })

      scoredAgents.push({
        ...match,
        selectionScore: scoring.selectionScore,
        reasoning: scoring.reasoning
      })
    }

    return scoredAgents.sort((a, b) => b.selectionScore - a.selectionScore)
  }

  /**
   * Make final agent selection with alternatives
   */
  private async makeSelection(
    criteria: AgentSelectionCriteria,
    scoredAgents: Array<SpecializationMatch & { selectionScore: number; reasoning: string }>
  ): Promise<AgentSelectionResult> {
    if (scoredAgents.length === 0) {
      throw new Error('No suitable agents found for the given criteria')
    }

    const bestAgent = scoredAgents[0]
    const agentMetrics = this.agentRegistry.get(bestAgent.agentId)!

    const selectionResult: AgentSelectionResult = {
      selectedAgent: {
        agentId: bestAgent.agentId,
        agentType: agentMetrics.agentType,
        selectionScore: bestAgent.selectionScore,
        expectedPerformance: {
          successProbability: agentMetrics.performanceMetrics.successRate,
          estimatedDuration: agentMetrics.performanceMetrics.averageResponseTime,
          estimatedTokenUsage: 1000 / agentMetrics.performanceMetrics.tokenEfficiency,
          qualityScore: agentMetrics.performanceMetrics.averageQualityScore
        },
        selectionReason: bestAgent.reasoning
      },
      alternatives: scoredAgents.slice(1, 4).map(agent => ({
        agentId: agent.agentId,
        agentType: this.agentRegistry.get(agent.agentId)!.agentType,
        selectionScore: agent.selectionScore,
        reason: agent.reasoning
      })),
      confidence: this.calculateSelectionConfidence(bestAgent, scoredAgents),
      selectionMetadata: {
        selectionTime: new Date(),
        criteriaUsed: criteria,
        performanceDataAge: this.getPerformanceDataAge(agentMetrics)
      }
    }

    return selectionResult
  }

  /**
   * Register a new agent with initial metrics
   */
  async registerAgent(agentMetrics: AgentPerformanceMetrics): Promise<void> {
    this.agentRegistry.set(agentMetrics.agentId, agentMetrics)
  }

  /**
   * Update agent capabilities based on learning
   */
  async updateAgentCapabilities(
    agentId: string,
    capabilityUpdates: Array<{
      capability: string
      newProficiency: number
      confidence: number
    }>
  ): Promise<void> {
    const agent = this.agentRegistry.get(agentId)
    if (!agent) return

    capabilityUpdates.forEach(update => {
      const existingCapability = agent.capabilities.find(
        cap => cap.capability === update.capability
      )

      if (existingCapability) {
        existingCapability.proficiency = update.newProficiency
        existingCapability.confidence = update.confidence
        existingCapability.lastAssessed = new Date()
      } else {
        agent.capabilities.push({
          capability: update.capability,
          proficiency: update.newProficiency,
          confidence: update.confidence,
          lastAssessed: new Date()
        })
      }
    })

    this.agentRegistry.set(agentId, agent)
  }

  /**
   * Get selection analytics
   */
  getSelectionAnalytics(): {
    totalSelections: number
    averageConfidence: number
    mostSelectedAgents: Array<{ agentId: string; count: number }>
    selectionTrends: Array<{ date: string; selections: number }>
  } {
    const totalSelections = this.selectionHistory.length
    const averageConfidence = totalSelections > 0
      ? this.selectionHistory.reduce((sum, sel) => sum + sel.confidence, 0) / totalSelections
      : 0

    // Count agent selections
    const agentCounts = new Map<string, number>()
    this.selectionHistory.forEach(selection => {
      const agentId = selection.selectedAgent.agentId
      agentCounts.set(agentId, (agentCounts.get(agentId) || 0) + 1)
    })

    const mostSelectedAgents = Array.from(agentCounts.entries())
      .map(([agentId, count]) => ({ agentId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate daily trends (last 7 days)
    const selectionTrends = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const daySelections = this.selectionHistory.filter(sel => 
        sel.selectionMetadata.selectionTime.toISOString().split('T')[0] === dateStr
      ).length

      selectionTrends.push({ date: dateStr, selections: daySelections })
    }

    return {
      totalSelections,
      averageConfidence,
      mostSelectedAgents,
      selectionTrends
    }
  }

  // Helper methods
  private generateSelectionCacheKey(criteria: AgentSelectionCriteria, caseContext?: CaseData): string {
    const contextKey = caseContext ? `${caseContext.caseType}-${caseContext.country}` : 'no-context'
    return `agent-selection:${criteria.taskType}:${criteria.complexity}:${contextKey}`
  }

  private isCacheValid(cachedResult: AgentSelectionResult): boolean {
    const cacheAge = Date.now() - cachedResult.selectionMetadata.selectionTime.getTime()
    return cacheAge < 1800000 // 30 minutes
  }

  private calculateSelectionConfidence(
    bestAgent: SpecializationMatch & { selectionScore: number },
    allAgents: Array<SpecializationMatch & { selectionScore: number }>
  ): number {
    if (allAgents.length === 1) return 100

    const secondBest = allAgents[1]
    const scoreDifference = bestAgent.selectionScore - secondBest.selectionScore
    
    // Higher confidence when there's a clear winner
    return Math.min(100, 50 + scoreDifference)
  }

  private getPerformanceDataAge(agent: AgentPerformanceMetrics): number {
    const ageMs = Date.now() - agent.performanceMetrics.lastUpdated.getTime()
    return ageMs / (1000 * 60 * 60) // Convert to hours
  }
}
