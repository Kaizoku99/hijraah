import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { PeerReviewAgent } from './peer-review-agent.js'
import { ReputationScoringAgent } from './reputation-scoring-agent.js'
import { ContentModerationAgent } from './content-moderation-agent.js'
import { GamificationAgent } from './gamification-agent.js'
import { ConsensusBuildingAgent } from './consensus-building-agent.js'
import {
  CommunityValidationConfigSchema,
  ContentSubmissionSchema,
  ContributorProfileSchema,
  type CommunityValidationConfig,
  type ContentSubmission,
  type ContributorProfile,
  type PeerReview,
  type ReputationScore,
  type ModerationDecision,
  type GamificationProfile,
  type ConsensusSession
} from './types.js'

/**
 * Comprehensive community validation result
 */
export const CommunityValidationResultSchema = z.object({
  validationId: z.string(),
  contentId: z.string(),
  submitterId: z.string(),
  peerReviews: z.array(z.any()), // PeerReviewSchema
  consensusResult: z.any(), // ConsensusResultSchema
  moderationDecision: z.any(), // ModerationDecisionSchema
  reputationUpdates: z.array(z.any()), // ReputationScoreSchema
  gamificationUpdates: z.array(z.any()), // GamificationProfileSchema
  consensusSession: z.any().optional(), // ConsensusSessionSchema
  overallDecision: z.enum(['approved', 'approved_with_changes', 'rejected', 'flagged', 'requires_consensus']),
  communityMetrics: z.object({
    participationRate: z.number().min(0).max(1),
    consensusLevel: z.number().min(0).max(1),
    qualityScore: z.number().min(0).max(10),
    communityTrust: z.number().min(0).max(1),
    engagementLevel: z.number().min(0).max(1)
  }),
  agentCoordination: z.object({
    agentsUsed: z.array(z.string()),
    processingTime: z.number(),
    coordinationEfficiency: z.number().min(0).max(1),
    conflictResolution: z.boolean()
  }),
  recommendations: z.array(z.object({
    category: z.enum(['content', 'process', 'community', 'system']),
    recommendation: z.string(),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    implementation: z.string()
  })),
  timestamp: z.string()
})

export type CommunityValidationResult = z.infer<typeof CommunityValidationResultSchema>

/**
 * Community Validation Team using AI SDK v5
 * Coordinates collaborative agents for comprehensive community validation
 */
export class CommunityValidationTeam {
  private config: CommunityValidationConfig
  private peerReviewAgent: PeerReviewAgent
  private reputationAgent: ReputationScoringAgent
  private moderationAgent: ContentModerationAgent
  private gamificationAgent: GamificationAgent
  private consensusAgent: ConsensusBuildingAgent

  constructor(config: Partial<CommunityValidationConfig> = {}) {
    this.config = CommunityValidationConfigSchema.parse(config)
    
    // Initialize specialized agents
    this.peerReviewAgent = new PeerReviewAgent(this.config)
    this.reputationAgent = new ReputationScoringAgent(this.config)
    this.moderationAgent = new ContentModerationAgent(this.config)
    this.gamificationAgent = new GamificationAgent(this.config)
    this.consensusAgent = new ConsensusBuildingAgent(this.config)
  }

  /**
   * Perform comprehensive community validation
   */
  async performCommunityValidation(
    content: ContentSubmission,
    reviewers: ContributorProfile[],
    validationContext?: {
      urgency: 'low' | 'medium' | 'high' | 'critical'
      minimumReviews: number
      expertRequired: boolean
      communityReports?: Array<{
        reporterId: string
        reason: string
        severity: 'low' | 'medium' | 'high'
        date: string
      }>
      historicalData?: {
        userHistory: any[]
        similarContent: any[]
        communityTrends: any[]
      }
    }
  ): Promise<CommunityValidationResult> {
    const validationId = `validation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const startTime = Date.now()

    try {
      console.log('🔄 Starting comprehensive community validation...')

      // Step 1: Initial content moderation screening
      console.log('🔄 Performing initial content moderation...')
      const moderationDecision = await this.moderationAgent.moderateContent(
        content,
        validationContext?.historicalData
      )

      // If content is flagged for removal or user ban, stop here
      if (moderationDecision.decision === 'remove' || moderationDecision.decision === 'ban_user') {
        console.log('❌ Content flagged for removal or user ban')
        return this.createValidationResult(validationId, content, {
          moderationDecision,
          overallDecision: 'flagged',
          processingTime: Date.now() - startTime
        })
      }

      // Step 2: Parallel peer review process
      console.log('🔄 Conducting peer reviews...')
      const peerReviews = await Promise.all(
        reviewers.slice(0, validationContext?.minimumReviews || 3).map(reviewer =>
          this.peerReviewAgent.conductPeerReview(content, reviewer)
        )
      )

      console.log('✅ Peer reviews completed')

      // Step 3: Build consensus from reviews
      console.log('🔄 Building consensus from reviews...')
      const consensusResult = await this.peerReviewAgent.buildConsensus(
        content.contentId,
        peerReviews,
        {
          minimumReviews: validationContext?.minimumReviews || 3,
          consensusThreshold: this.config.consensusThreshold,
          expertWeighting: 1.5,
          conflictResolution: 'majority'
        }
      )

      console.log('✅ Consensus analysis completed')

      // Step 4: Handle conflicts if consensus is low
      let consensusSession: ConsensusSession | undefined
      if (consensusResult.consensusLevel < this.config.consensusThreshold && 
          consensusResult.conflictingReviews.length > 0) {
        
        console.log('🔄 Initiating consensus building session...')
        consensusSession = await this.consensusAgent.initiateConsensusSession(
          content,
          peerReviews.filter(review => 
            consensusResult.conflictingReviews.some(conflict => conflict.reviewId === review.reviewId)
          ),
          reviewers[0], // Use first reviewer as initiator
          {
            timeLimit: 60, // 1 hour
            requiredParticipants: Math.min(5, reviewers.length),
            expertRequired: validationContext?.expertRequired || false
          }
        )
        console.log('✅ Consensus session initiated')
      }

      // Step 5: Update reputation scores for all participants
      console.log('🔄 Updating reputation scores...')
      const reputationUpdates = await Promise.all(
        reviewers.map(async reviewer => {
          const reviewerActivity = {
            recentContributions: [],
            recentReviews: peerReviews.filter(review => review.reviewerId === reviewer.userId),
            communityInteractions: [],
            achievements: [],
            penalties: []
          }
          
          return this.reputationAgent.calculateReputationScore(reviewer, reviewerActivity)
        })
      )

      console.log('✅ Reputation updates completed')

      // Step 6: Update gamification profiles
      console.log('🔄 Updating gamification profiles...')
      const gamificationUpdates = await Promise.all(
        reviewers.map(async reviewer => {
          const currentProfile: GamificationProfile = {
            userId: reviewer.userId,
            level: Math.floor(reviewer.reputationScore / 10) + 1,
            totalPoints: reviewer.reputationScore * 10,
            currentLevelPoints: (reviewer.reputationScore * 10) % 100,
            nextLevelPoints: 100,
            achievements: [],
            streaks: {
              currentContributionStreak: 0,
              longestContributionStreak: 0,
              currentReviewStreak: 1,
              longestReviewStreak: 1
            },
            leaderboards: [],
            motivationFactors: {
              primaryMotivation: 'helping_others',
              engagementLevel: 0.8,
              preferredChallenges: ['review_quality'],
              rewardPreferences: ['recognition']
            },
            nextGoals: [],
            lastUpdated: new Date().toISOString()
          }

          const recentActivity = {
            contributions: [],
            reviews: peerReviews.filter(review => review.reviewerId === reviewer.userId).map(review => ({
              id: review.reviewId,
              quality: review.overallScore,
              helpfulness: review.confidence * 10,
              date: review.reviewDate
            })),
            communityActions: []
          }

          return this.gamificationAgent.updateGamificationProfile(
            reviewer,
            currentProfile,
            recentActivity
          )
        })
      )

      console.log('✅ Gamification updates completed')

      // Step 7: Generate overall insights and decision
      console.log('🔄 Generating overall validation insights...')
      const { object: overallInsights } = await generateObject({
        model: openai(this.config.model),
        temperature: this.config.temperature,
        schema: z.object({
          overallDecision: z.enum(['approved', 'approved_with_changes', 'rejected', 'flagged', 'requires_consensus']),
          communityMetrics: z.object({
            participationRate: z.number().min(0).max(1),
            consensusLevel: z.number().min(0).max(1),
            qualityScore: z.number().min(0).max(10),
            communityTrust: z.number().min(0).max(1),
            engagementLevel: z.number().min(0).max(1)
          }),
          recommendations: z.array(z.object({
            category: z.enum(['content', 'process', 'community', 'system']),
            recommendation: z.string(),
            priority: z.enum(['low', 'medium', 'high', 'critical']),
            implementation: z.string()
          }))
        }),
        system: `You are synthesizing comprehensive community validation results. Analyze all agent outputs to provide overall decision and insights.

Consider:
- Peer review consensus and quality
- Moderation flags and concerns
- Community participation and engagement
- Reputation and trust factors
- Gamification and motivation aspects

Provide clear, actionable insights that support community quality and engagement.`,
        prompt: `Synthesize community validation results:

**Content:** ${content.title}
**Peer Reviews:** ${peerReviews.length} reviews, average score: ${peerReviews.reduce((sum, r) => sum + r.overallScore, 0) / peerReviews.length}
**Consensus Level:** ${consensusResult.consensusLevel}
**Moderation Decision:** ${moderationDecision.decision}
**Conflicts:** ${consensusResult.conflictingReviews.length} conflicting reviews
**Consensus Session:** ${consensusSession ? 'Initiated' : 'Not required'}

Provide comprehensive validation decision with community metrics and recommendations.`
      })

      const processingTime = Date.now() - startTime
      console.log(`🎉 Community validation completed in ${processingTime}ms`)

      return this.createValidationResult(validationId, content, {
        peerReviews,
        consensusResult,
        moderationDecision,
        reputationUpdates,
        gamificationUpdates,
        consensusSession,
        overallDecision: overallInsights.overallDecision,
        communityMetrics: overallInsights.communityMetrics,
        recommendations: overallInsights.recommendations,
        processingTime
      })

    } catch (error) {
      console.error('❌ Error in community validation:', error)
      throw new Error(`Community validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Perform quick community validation for urgent content
   */
  async performQuickValidation(
    content: ContentSubmission,
    availableReviewers: ContributorProfile[]
  ): Promise<{
    decision: 'approved' | 'flagged' | 'needs_review'
    confidence: number
    flags: string[]
    quickReviews: Array<{
      reviewerId: string
      score: number
      recommendation: string
    }>
    processingTime: number
  }> {
    const startTime = Date.now()
    console.log('🔄 Starting quick community validation...')

    // Quick moderation check
    const moderationDecision = await this.moderationAgent.moderateContent(content)
    
    if (moderationDecision.decision === 'remove' || moderationDecision.decision === 'ban_user') {
      return {
        decision: 'flagged',
        confidence: 0.9,
        flags: moderationDecision.flags.map(f => f.reason),
        quickReviews: [],
        processingTime: Date.now() - startTime
      }
    }

    // Quick reviews from top 2 reviewers
    const topReviewers = availableReviewers
      .sort((a, b) => b.reputationScore - a.reputationScore)
      .slice(0, 2)

    const quickReviews = await Promise.all(
      topReviewers.map(async reviewer => {
        const review = await this.peerReviewAgent.conductPeerReview(content, reviewer)
        return {
          reviewerId: reviewer.userId,
          score: review.overallScore,
          recommendation: review.recommendation
        }
      })
    )

    const averageScore = quickReviews.reduce((sum, r) => sum + r.score, 0) / quickReviews.length
    const decision = averageScore >= 7 ? 'approved' : 
                    averageScore >= 5 ? 'needs_review' : 'flagged'

    console.log('✅ Quick validation completed')

    return {
      decision,
      confidence: quickReviews.length >= 2 ? 0.8 : 0.6,
      flags: moderationDecision.flags.map(f => f.reason),
      quickReviews,
      processingTime: Date.now() - startTime
    }
  }

  /**
   * Handle community appeals and disputes
   */
  async handleCommunityAppeal(
    originalValidation: CommunityValidationResult,
    appeal: {
      appealerId: string
      reason: string
      evidence?: string
      requestedReviewers?: string[]
    }
  ): Promise<{
    appealId: string
    decision: 'upheld' | 'overturned' | 'modified' | 'requires_consensus'
    newValidation?: CommunityValidationResult
    reasoning: string
    additionalReviews?: PeerReview[]
  }> {
    const appealId = `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log('🔄 Processing community appeal...')

    // Analyze the appeal using AI SDK v5
    const { object: appealAnalysis } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,
      schema: z.object({
        decision: z.enum(['upheld', 'overturned', 'modified', 'requires_consensus']),
        reasoning: z.string(),
        requiresAdditionalReviews: z.boolean(),
        suggestedActions: z.array(z.string())
      }),
      system: `You are analyzing a community validation appeal. Determine if the original decision should be upheld, overturned, modified, or requires additional consensus building.`,
      prompt: `Analyze community validation appeal:

**Original Validation:** ${JSON.stringify(originalValidation, null, 2)}
**Appeal:** ${JSON.stringify(appeal, null, 2)}

Provide fair assessment of the appeal with clear reasoning and recommended actions.`
    })

    console.log('✅ Appeal analysis completed')

    return {
      appealId,
      decision: appealAnalysis.decision,
      reasoning: appealAnalysis.reasoning,
      newValidation: undefined, // Would be generated if decision is overturned/modified
      additionalReviews: undefined // Would be conducted if required
    }
  }

  /**
   * Generate community validation insights and metrics
   */
  async generateValidationInsights(
    timeframe: number, // days
    validationData: {
      validations: CommunityValidationResult[]
      appeals: Array<{ decision: string; originalDecision: string }>
      communityMetrics: {
        activeReviewers: number
        averageParticipation: number
        consensusRate: number
      }
    }
  ): Promise<{
    performanceMetrics: {
      totalValidations: number
      decisionBreakdown: Record<string, number>
      averageProcessingTime: number
      consensusRate: number
      appealRate: number
    }
    qualityMetrics: {
      averageReviewQuality: number
      reviewerConsistency: number
      communityTrust: number
      engagementTrends: Record<string, number>
    }
    recommendations: Array<{
      category: string
      recommendation: string
      impact: string
      implementation: string
    }>
  }> {
    const { object: insights } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,
      maxSteps: 4,
      schema: z.object({
        performanceMetrics: z.object({
          totalValidations: z.number(),
          decisionBreakdown: z.record(z.number()),
          averageProcessingTime: z.number(),
          consensusRate: z.number(),
          appealRate: z.number()
        }),
        qualityMetrics: z.object({
          averageReviewQuality: z.number(),
          reviewerConsistency: z.number(),
          communityTrust: z.number(),
          engagementTrends: z.record(z.number())
        }),
        recommendations: z.array(z.object({
          category: z.string(),
          recommendation: z.string(),
          impact: z.string(),
          implementation: z.string()
        }))
      }),
      system: `You are analyzing community validation performance to generate insights and improvement recommendations.`,
      prompt: `Analyze community validation performance over ${timeframe} days:

**Validation Data:** ${JSON.stringify(validationData, null, 2)}

Provide comprehensive insights with performance metrics, quality assessment, and actionable recommendations.`
    })

    return insights
  }

  private createValidationResult(
    validationId: string,
    content: ContentSubmission,
    results: {
      peerReviews?: PeerReview[]
      consensusResult?: any
      moderationDecision: ModerationDecision
      reputationUpdates?: ReputationScore[]
      gamificationUpdates?: GamificationProfile[]
      consensusSession?: ConsensusSession
      overallDecision: 'approved' | 'approved_with_changes' | 'rejected' | 'flagged' | 'requires_consensus'
      communityMetrics?: any
      recommendations?: any[]
      processingTime: number
    }
  ): CommunityValidationResult {
    const agentsUsed = ['moderation']
    if (results.peerReviews) agentsUsed.push('peer_review')
    if (results.reputationUpdates) agentsUsed.push('reputation')
    if (results.gamificationUpdates) agentsUsed.push('gamification')
    if (results.consensusSession) agentsUsed.push('consensus')

    return {
      validationId,
      contentId: content.contentId,
      submitterId: content.submitterId,
      peerReviews: results.peerReviews || [],
      consensusResult: results.consensusResult,
      moderationDecision: results.moderationDecision,
      reputationUpdates: results.reputationUpdates || [],
      gamificationUpdates: results.gamificationUpdates || [],
      consensusSession: results.consensusSession,
      overallDecision: results.overallDecision,
      communityMetrics: results.communityMetrics || {
        participationRate: 0.8,
        consensusLevel: 0.7,
        qualityScore: 7.5,
        communityTrust: 0.8,
        engagementLevel: 0.75
      },
      agentCoordination: {
        agentsUsed,
        processingTime: results.processingTime,
        coordinationEfficiency: 0.85,
        conflictResolution: !!results.consensusSession
      },
      recommendations: results.recommendations || [],
      timestamp: new Date().toISOString()
    }
  }
}