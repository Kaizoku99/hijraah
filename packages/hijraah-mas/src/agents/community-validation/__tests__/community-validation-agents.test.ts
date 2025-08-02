import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PeerReviewAgent } from '../peer-review-agent.js'
import { ReputationScoringAgent } from '../reputation-scoring-agent.js'
import { ContentModerationAgent } from '../content-moderation-agent.js'
import { GamificationAgent } from '../gamification-agent.js'
import { ConsensusBuildingAgent } from '../consensus-building-agent.js'
import { CommunityValidationTeam } from '../community-validation-team.js'
import type { ContributorProfile, ContentSubmission } from '../types.js'

// Mock AI SDK functions
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  tool: vi.fn()
}))

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn()
}))

describe('Community Validation Agents', () => {
  let mockContributor: ContributorProfile
  let mockContent: ContentSubmission

  beforeEach(() => {
    mockContributor = {
      userId: 'user123',
      username: 'testuser',
      joinDate: '2023-01-01',
      totalContributions: 25,
      verifiedContributions: 20,
      flaggedContributions: 1,
      expertise: ['visa_applications', 'canada_immigration'],
      languages: ['English', 'French'],
      countries: ['Canada', 'USA'],
      reputationScore: 75,
      trustLevel: 'silver',
      badges: [
        {
          id: 'helpful_reviewer',
          name: 'Helpful Reviewer',
          description: 'Provided helpful reviews',
          earnedDate: '2023-06-01'
        }
      ],
      lastActive: '2024-01-01'
    }

    mockContent = {
      contentId: 'content123',
      submitterId: 'user456',
      contentType: 'experience',
      title: 'My Canada PR Experience',
      content: 'I recently got my Canada PR through Express Entry. Here is my detailed experience...',
      metadata: {
        country: 'Canada',
        visaType: 'permanent_residence',
        language: 'English',
        tags: ['express_entry', 'canada_pr', 'experience'],
        difficulty: 'intermediate',
        estimatedReadTime: 5
      },
      sources: [
        {
          type: 'personal',
          description: 'Personal experience',
          reliability: 0.8
        }
      ],
      submissionDate: '2024-01-01',
      lastModified: '2024-01-01',
      status: 'submitted'
    }

    // Reset mocks
    vi.clearAllMocks()
  })

  describe('PeerReviewAgent', () => {
    let agent: PeerReviewAgent

    beforeEach(() => {
      agent = new PeerReviewAgent()
    })

    it('should create peer review agent with default config', () => {
      expect(agent).toBeInstanceOf(PeerReviewAgent)
    })

    it('should create peer review agent with custom config', () => {
      const customAgent = new PeerReviewAgent({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        reviewThreshold: 0.8
      })
      expect(customAgent).toBeInstanceOf(PeerReviewAgent)
    })

    it('should conduct peer review with valid inputs', async () => {
      const mockReview = {
        reviewId: 'review123',
        contentId: 'content123',
        contentType: 'experience',
        reviewerId: 'user123',
        reviewerProfile: mockContributor,
        scores: {
          accuracy: 8.5,
          completeness: 7.0,
          relevance: 9.0,
          clarity: 8.0,
          timeliness: 8.5
        },
        overallScore: 8.2,
        feedback: {
          strengths: ['Clear writing', 'Detailed timeline'],
          improvements: ['Add more specific details'],
          suggestions: ['Include document checklist'],
          concerns: []
        },
        recommendation: 'approve_with_changes',
        confidence: 0.85,
        timeSpent: 15,
        reviewDate: new Date().toISOString(),
        isVerified: false
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockReview
      } as any)

      const result = await agent.conductPeerReview(mockContent, mockContributor)

      expect(result).toBeDefined()
      expect(result.contentId).toBe('content123')
      expect(result.reviewerId).toBe('user123')
      expect(result.overallScore).toBeGreaterThan(0)
      expect(result.recommendation).toBeDefined()
      expect(generateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: expect.any(Number),
          maxSteps: expect.any(Number),
          schema: expect.any(Object),
          system: expect.stringContaining('expert peer reviewer'),
          prompt: expect.stringContaining('Conduct a comprehensive peer review')
        })
      )
    })

    it('should build consensus from multiple reviews', async () => {
      const mockReviews = [
        { ...mockContent, reviewId: 'review1', overallScore: 8.0, reviewerId: 'user1' },
        { ...mockContent, reviewId: 'review2', overallScore: 7.5, reviewerId: 'user2' },
        { ...mockContent, reviewId: 'review3', overallScore: 8.5, reviewerId: 'user3' }
      ]

      const mockConsensus = {
        contentId: 'content123',
        totalReviews: 3,
        averageScore: 8.0,
        scoreDistribution: {
          excellent: 1,
          good: 2,
          fair: 0,
          poor: 0
        },
        consensusLevel: 0.85,
        finalRecommendation: 'approve',
        conflictingReviews: [],
        qualityMetrics: {
          reviewerDiversity: 0.8,
          expertiseAlignment: 0.7,
          reviewDepth: 0.9,
          timeConsistency: 0.8
        },
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockConsensus
      } as any)

      const result = await agent.buildConsensus('content123', mockReviews as any)

      expect(result).toBeDefined()
      expect(result.totalReviews).toBe(3)
      expect(result.consensusLevel).toBeGreaterThan(0)
      expect(result.finalRecommendation).toBeDefined()
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('ReputationScoringAgent', () => {
    let agent: ReputationScoringAgent

    beforeEach(() => {
      agent = new ReputationScoringAgent()
    })

    it('should create reputation scoring agent', () => {
      expect(agent).toBeInstanceOf(ReputationScoringAgent)
    })

    it('should calculate reputation score', async () => {
      const mockActivityData = {
        recentContributions: [
          { id: 'contrib1', type: 'experience', quality: 8, impact: 7, date: '2024-01-01' }
        ],
        recentReviews: [],
        communityInteractions: [
          { type: 'help', impact: 8, date: '2024-01-01' }
        ],
        achievements: [],
        penalties: []
      }

      const mockReputationScore = {
        userId: 'user123',
        currentScore: 78,
        previousScore: 75,
        scoreChange: 3,
        trustLevel: 'silver',
        factors: [
          {
            factor: 'Contribution Quality',
            category: 'contribution_quality',
            weight: 0.3,
            currentValue: 8.0,
            historicalTrend: 'improving',
            impact: 2.4,
            description: 'High quality contributions with good community impact'
          }
        ],
        achievements: [],
        penalties: [],
        projectedScore: {
          nextWeek: 79,
          nextMonth: 82,
          confidence: 0.8
        },
        recommendations: [
          {
            action: 'Increase review participation',
            expectedImpact: 5,
            difficulty: 'easy',
            timeframe: '2 weeks'
          }
        ],
        calculationDate: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockReputationScore
      } as any)

      const result = await agent.calculateReputationScore(mockContributor, mockActivityData as any)

      expect(result).toBeDefined()
      expect(result.currentScore).toBeGreaterThan(0)
      expect(result.currentScore).toBeLessThanOrEqual(100)
      expect(result.trustLevel).toBeDefined()
      expect(result.factors).toBeInstanceOf(Array)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('ContentModerationAgent', () => {
    let agent: ContentModerationAgent

    beforeEach(() => {
      agent = new ContentModerationAgent()
    })

    it('should create content moderation agent', () => {
      expect(agent).toBeInstanceOf(ContentModerationAgent)
    })

    it('should moderate content and make decisions', async () => {
      const mockModerationDecision = {
        decisionId: 'mod123',
        contentId: 'content123',
        flags: [
          {
            flagId: 'flag1',
            contentId: 'content123',
            contentType: 'text',
            flagType: 'low_quality',
            severity: 'low',
            confidence: 0.6,
            flaggedBy: 'automated',
            reason: 'Content length below threshold',
            evidence: [{
              type: 'text_analysis',
              description: 'Short content detected',
              confidence: 0.6,
              data: { contentLength: 45 }
            }],
            suggestedAction: 'review',
            flagDate: new Date().toISOString()
          }
        ],
        decision: 'approve',
        reasoning: 'Content meets community standards with minor quality concerns',
        confidence: 0.8,
        automatedDecision: true,
        appealable: true,
        actions: [],
        reviewRequired: false,
        decisionDate: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockModerationDecision
      } as any)

      const result = await agent.moderateContent(mockContent)

      expect(result).toBeDefined()
      expect(result.contentId).toBe('content123')
      expect(result.decision).toBeDefined()
      expect(result.flags).toBeInstanceOf(Array)
      expect(result.automatedDecision).toBe(true)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('GamificationAgent', () => {
    let agent: GamificationAgent

    beforeEach(() => {
      agent = new GamificationAgent()
    })

    it('should create gamification agent', () => {
      expect(agent).toBeInstanceOf(GamificationAgent)
    })

    it('should update gamification profile', async () => {
      const mockCurrentProfile = {
        userId: 'user123',
        level: 5,
        totalPoints: 500,
        currentLevelPoints: 50,
        nextLevelPoints: 100,
        achievements: [],
        streaks: {
          currentContributionStreak: 3,
          longestContributionStreak: 7,
          currentReviewStreak: 1,
          longestReviewStreak: 5
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

      const mockRecentActivity = {
        contributions: [],
        reviews: [
          { id: 'review1', quality: 8, helpfulness: 9, date: '2024-01-01' }
        ],
        communityActions: [
          { type: 'help', impact: 7, date: '2024-01-01' }
        ]
      }

      const mockUpdatedProfile = {
        ...mockCurrentProfile,
        totalPoints: 520,
        currentLevelPoints: 70,
        achievements: [
          {
            achievementId: 'helpful_reviewer',
            earnedDate: new Date().toISOString(),
            progress: 1.0
          }
        ],
        lastUpdated: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockUpdatedProfile
      } as any)

      const result = await agent.updateGamificationProfile(
        mockContributor,
        mockCurrentProfile as any,
        mockRecentActivity as any
      )

      expect(result).toBeDefined()
      expect(result.userId).toBe('user123')
      expect(result.totalPoints).toBeGreaterThanOrEqual(mockCurrentProfile.totalPoints)
      expect(result.level).toBeGreaterThan(0)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('ConsensusBuildingAgent', () => {
    let agent: ConsensusBuildingAgent

    beforeEach(() => {
      agent = new ConsensusBuildingAgent()
    })

    it('should create consensus building agent', () => {
      expect(agent).toBeInstanceOf(ConsensusBuildingAgent)
    })

    it('should initiate consensus session', async () => {
      const mockConflictingReviews = [
        { reviewId: 'review1', overallScore: 9, recommendation: 'approve' },
        { reviewId: 'review2', overallScore: 4, recommendation: 'reject' }
      ]

      const mockConsensusSession = {
        sessionId: 'consensus123',
        topic: 'Content Quality Disagreement',
        description: 'Resolve conflicting reviews on content quality',
        contentId: 'content123',
        initiatorId: 'user123',
        participants: [
          { userId: 'user1', role: 'reviewer', joinedAt: new Date().toISOString(), isActive: true },
          { userId: 'user2', role: 'reviewer', joinedAt: new Date().toISOString(), isActive: true }
        ],
        phases: [
          {
            phase: 'discussion',
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 24 * 60 * 1000).toISOString(),
            status: 'pending',
            outcomes: []
          }
        ],
        proposals: [],
        consensusMetrics: {
          participationRate: 0,
          agreementLevel: 0,
          expertAlignment: 0,
          timeToConsensus: 0,
          iterationsRequired: 0
        },
        status: 'planning',
        createdAt: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockConsensusSession
      } as any)

      const result = await agent.initiateConsensusSession(
        mockContent,
        mockConflictingReviews as any,
        mockContributor
      )

      expect(result).toBeDefined()
      expect(result.contentId).toBe('content123')
      expect(result.initiatorId).toBe('user123')
      expect(result.participants).toBeInstanceOf(Array)
      expect(result.phases).toBeInstanceOf(Array)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('CommunityValidationTeam', () => {
    let team: CommunityValidationTeam

    beforeEach(() => {
      team = new CommunityValidationTeam()
    })

    it('should create community validation team', () => {
      expect(team).toBeInstanceOf(CommunityValidationTeam)
    })

    it('should perform comprehensive community validation', async () => {
      const mockReviewers = [mockContributor]

      // Mock all agent responses
      const { generateObject } = await import('ai')
      
      // Mock moderation decision
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          decisionId: 'mod123',
          contentId: 'content123',
          flags: [],
          decision: 'approve',
          reasoning: 'Content meets standards',
          confidence: 0.8,
          automatedDecision: true,
          appealable: true,
          actions: [],
          reviewRequired: false,
          decisionDate: new Date().toISOString()
        }
      } as any)

      // Mock peer review
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          reviewId: 'review123',
          contentId: 'content123',
          contentType: 'experience',
          reviewerId: 'user123',
          reviewerProfile: mockContributor,
          scores: { accuracy: 8, completeness: 7, relevance: 9, clarity: 8, timeliness: 8 },
          overallScore: 8.0,
          feedback: { strengths: [], improvements: [], suggestions: [], concerns: [] },
          recommendation: 'approve',
          confidence: 0.8,
          timeSpent: 15,
          reviewDate: new Date().toISOString(),
          isVerified: false
        }
      } as any)

      // Mock consensus building
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          contentId: 'content123',
          totalReviews: 1,
          averageScore: 8.0,
          scoreDistribution: { excellent: 1, good: 0, fair: 0, poor: 0 },
          consensusLevel: 0.9,
          finalRecommendation: 'approve',
          conflictingReviews: [],
          qualityMetrics: {
            reviewerDiversity: 0.8,
            expertiseAlignment: 0.7,
            reviewDepth: 0.9,
            timeConsistency: 0.8
          },
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock reputation score
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          userId: 'user123',
          currentScore: 78,
          previousScore: 75,
          scoreChange: 3,
          trustLevel: 'silver',
          factors: [],
          achievements: [],
          penalties: [],
          projectedScore: { nextWeek: 79, nextMonth: 82, confidence: 0.8 },
          recommendations: [],
          calculationDate: new Date().toISOString()
        }
      } as any)

      // Mock gamification profile
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          userId: 'user123',
          level: 5,
          totalPoints: 520,
          currentLevelPoints: 70,
          nextLevelPoints: 100,
          achievements: [],
          streaks: {
            currentContributionStreak: 3,
            longestContributionStreak: 7,
            currentReviewStreak: 2,
            longestReviewStreak: 5
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
      } as any)

      // Mock overall insights
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          overallDecision: 'approved',
          communityMetrics: {
            participationRate: 0.8,
            consensusLevel: 0.9,
            qualityScore: 8.0,
            communityTrust: 0.8,
            engagementLevel: 0.75
          },
          recommendations: [
            {
              category: 'content',
              recommendation: 'Content approved with high community consensus',
              priority: 'low',
              implementation: 'Publish content to community'
            }
          ]
        }
      } as any)

      const result = await team.performCommunityValidation(mockContent, mockReviewers)

      expect(result).toBeDefined()
      expect(result.contentId).toBe('content123')
      expect(result.overallDecision).toBeDefined()
      expect(result.peerReviews).toBeInstanceOf(Array)
      expect(result.moderationDecision).toBeDefined()
      expect(result.communityMetrics).toBeDefined()
      expect(result.agentCoordination.agentsUsed).toContain('moderation')
      expect(result.agentCoordination.agentsUsed).toContain('peer_review')
    })

    it('should perform quick validation', async () => {
      const mockReviewers = [mockContributor]

      // Mock moderation decision
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          decisionId: 'mod123',
          flags: [],
          decision: 'approve'
        }
      } as any)

      // Mock quick reviews
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          reviewId: 'review123',
          overallScore: 8.0,
          recommendation: 'approve'
        }
      } as any)

      const result = await team.performQuickValidation(mockContent, mockReviewers)

      expect(result).toBeDefined()
      expect(result.decision).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.quickReviews).toBeInstanceOf(Array)
      expect(result.processingTime).toBeGreaterThan(0)
    })

    it('should handle errors gracefully', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockRejectedValue(new Error('API Error'))

      await expect(
        team.performCommunityValidation(mockContent, [mockContributor])
      ).rejects.toThrow('Community validation failed')
    })
  })

  describe('Agent Configuration', () => {
    it('should accept custom configuration for all agents', () => {
      const config = {
        model: 'gpt-4o-mini',
        temperature: 0.3,
        maxSteps: 6,
        timeout: 30000,
        reviewThreshold: 0.8,
        consensusThreshold: 0.9,
        moderationSensitivity: 'high' as const,
        gamificationEnabled: true,
        expertOverrideEnabled: true
      }

      const peerReviewAgent = new PeerReviewAgent(config)
      const reputationAgent = new ReputationScoringAgent(config)
      const moderationAgent = new ContentModerationAgent(config)
      const gamificationAgent = new GamificationAgent(config)
      const consensusAgent = new ConsensusBuildingAgent(config)
      const team = new CommunityValidationTeam(config)

      expect(peerReviewAgent).toBeInstanceOf(PeerReviewAgent)
      expect(reputationAgent).toBeInstanceOf(ReputationScoringAgent)
      expect(moderationAgent).toBeInstanceOf(ContentModerationAgent)
      expect(gamificationAgent).toBeInstanceOf(GamificationAgent)
      expect(consensusAgent).toBeInstanceOf(ConsensusBuildingAgent)
      expect(team).toBeInstanceOf(CommunityValidationTeam)
    })
  })

  describe('Type Safety', () => {
    it('should validate contributor profile structure', () => {
      expect(mockContributor.userId).toBe('user123')
      expect(mockContributor.trustLevel).toBe('silver')
      expect(mockContributor.reputationScore).toBe(75)
      expect(mockContributor.expertise).toBeInstanceOf(Array)
    })

    it('should validate content submission structure', () => {
      expect(mockContent.contentId).toBe('content123')
      expect(mockContent.contentType).toBe('experience')
      expect(mockContent.status).toBe('submitted')
      expect(mockContent.metadata).toBeDefined()
      expect(mockContent.sources).toBeInstanceOf(Array)
    })
  })

  describe('Integration Scenarios', () => {
    it('should handle high-conflict scenarios requiring consensus', async () => {
      const team = new CommunityValidationTeam({
        consensusThreshold: 0.9 // High threshold to trigger consensus building
      })

      const conflictingReviewers = [
        { ...mockContributor, userId: 'reviewer1', reputationScore: 90 },
        { ...mockContributor, userId: 'reviewer2', reputationScore: 85 }
      ]

      // Mock responses that would trigger consensus building
      const { generateObject } = await import('ai')
      
      // Mock moderation (approve)
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { decision: 'approve', flags: [] }
      } as any)

      // Mock conflicting reviews
      vi.mocked(generateObject)
        .mockResolvedValueOnce({ object: { overallScore: 9, recommendation: 'approve' } } as any)
        .mockResolvedValueOnce({ object: { overallScore: 3, recommendation: 'reject' } } as any)

      // Mock low consensus
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          consensusLevel: 0.3, // Low consensus
          conflictingReviews: [{ reviewId: 'review1' }, { reviewId: 'review2' }]
        }
      } as any)

      // Mock consensus session initiation
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { sessionId: 'consensus123', status: 'planning' }
      } as any)

      // Mock reputation and gamification updates
      vi.mocked(generateObject)
        .mockResolvedValueOnce({ object: { currentScore: 85 } } as any)
        .mockResolvedValueOnce({ object: { currentScore: 88 } } as any)
        .mockResolvedValueOnce({ object: { level: 5 } } as any)
        .mockResolvedValueOnce({ object: { level: 6 } } as any)

      // Mock final insights
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          overallDecision: 'requires_consensus',
          communityMetrics: { consensusLevel: 0.3 }
        }
      } as any)

      const result = await team.performCommunityValidation(mockContent, conflictingReviewers)

      expect(result.overallDecision).toBe('requires_consensus')
      expect(result.consensusSession).toBeDefined()
      expect(result.agentCoordination.conflictResolution).toBe(true)
    })

    it('should handle flagged content appropriately', async () => {
      const team = new CommunityValidationTeam()

      // Mock moderation that flags content for removal
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          decision: 'remove',
          flags: [{ flagType: 'spam', severity: 'high' }],
          reasoning: 'Content identified as spam'
        }
      } as any)

      const result = await team.performCommunityValidation(mockContent, [mockContributor])

      expect(result.overallDecision).toBe('flagged')
      expect(result.moderationDecision.decision).toBe('remove')
      expect(result.peerReviews).toHaveLength(0) // No peer reviews for flagged content
    })
  })
})