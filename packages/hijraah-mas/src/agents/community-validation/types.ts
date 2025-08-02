import { z } from 'zod'

// Base community validation types
export const ContributorProfileSchema = z.object({
  userId: z.string(),
  username: z.string(),
  joinDate: z.string(),
  totalContributions: z.number().min(0),
  verifiedContributions: z.number().min(0),
  flaggedContributions: z.number().min(0),
  expertise: z.array(z.string()),
  languages: z.array(z.string()),
  countries: z.array(z.string()),
  reputationScore: z.number().min(0).max(100),
  trustLevel: z.enum(['new', 'bronze', 'silver', 'gold', 'platinum', 'expert']),
  badges: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    earnedDate: z.string()
  })),
  lastActive: z.string()
})

export type ContributorProfile = z.infer<typeof ContributorProfileSchema>

// Peer Review Types
export const ReviewCriteriaSchema = z.object({
  accuracy: z.object({
    weight: z.number().min(0).max(1),
    description: z.string(),
    guidelines: z.array(z.string())
  }),
  completeness: z.object({
    weight: z.number().min(0).max(1),
    description: z.string(),
    guidelines: z.array(z.string())
  }),
  relevance: z.object({
    weight: z.number().min(0).max(1),
    description: z.string(),
    guidelines: z.array(z.string())
  }),
  clarity: z.object({
    weight: z.number().min(0).max(1),
    description: z.string(),
    guidelines: z.array(z.string())
  }),
  timeliness: z.object({
    weight: z.number().min(0).max(1),
    description: z.string(),
    guidelines: z.array(z.string())
  })
})

export type ReviewCriteria = z.infer<typeof ReviewCriteriaSchema>

export const PeerReviewSchema = z.object({
  reviewId: z.string(),
  contentId: z.string(),
  contentType: z.enum(['experience', 'document', 'policy_update', 'timeline', 'cost_info', 'advice']),
  reviewerId: z.string(),
  reviewerProfile: ContributorProfileSchema,
  scores: z.object({
    accuracy: z.number().min(0).max(10),
    completeness: z.number().min(0).max(10),
    relevance: z.number().min(0).max(10),
    clarity: z.number().min(0).max(10),
    timeliness: z.number().min(0).max(10)
  }),
  overallScore: z.number().min(0).max(10),
  feedback: z.object({
    strengths: z.array(z.string()),
    improvements: z.array(z.string()),
    suggestions: z.array(z.string()),
    concerns: z.array(z.string())
  }),
  recommendation: z.enum(['approve', 'approve_with_changes', 'request_revision', 'reject']),
  confidence: z.number().min(0).max(1),
  timeSpent: z.number().min(0), // minutes
  reviewDate: z.string(),
  isVerified: z.boolean().default(false)
})

export type PeerReview = z.infer<typeof PeerReviewSchema>

export const ConsensusResultSchema = z.object({
  contentId: z.string(),
  totalReviews: z.number().min(0),
  averageScore: z.number().min(0).max(10),
  scoreDistribution: z.object({
    excellent: z.number().min(0), // 8-10
    good: z.number().min(0), // 6-7.9
    fair: z.number().min(0), // 4-5.9
    poor: z.number().min(0) // 0-3.9
  }),
  consensusLevel: z.number().min(0).max(1),
  finalRecommendation: z.enum(['approve', 'approve_with_changes', 'request_revision', 'reject']),
  conflictingReviews: z.array(z.object({
    reviewId: z.string(),
    deviation: z.number(),
    reason: z.string()
  })),
  expertOverride: z.object({
    required: z.boolean(),
    reason: z.string().optional(),
    expertId: z.string().optional()
  }).optional(),
  qualityMetrics: z.object({
    reviewerDiversity: z.number().min(0).max(1),
    expertiseAlignment: z.number().min(0).max(1),
    reviewDepth: z.number().min(0).max(1),
    timeConsistency: z.number().min(0).max(1)
  }),
  timestamp: z.string()
})

export type ConsensusResult = z.infer<typeof ConsensusResultSchema>

// Reputation Scoring Types
export const ReputationFactorSchema = z.object({
  factor: z.string(),
  category: z.enum(['contribution_quality', 'review_accuracy', 'community_engagement', 'expertise_demonstration', 'consistency', 'helpfulness']),
  weight: z.number().min(0).max(1),
  currentValue: z.number(),
  historicalTrend: z.enum(['improving', 'stable', 'declining']),
  impact: z.number().min(-10).max(10),
  description: z.string()
})

export type ReputationFactor = z.infer<typeof ReputationFactorSchema>

export const ReputationScoreSchema = z.object({
  userId: z.string(),
  currentScore: z.number().min(0).max(100),
  previousScore: z.number().min(0).max(100),
  scoreChange: z.number(),
  trustLevel: z.enum(['new', 'bronze', 'silver', 'gold', 'platinum', 'expert']),
  factors: z.array(ReputationFactorSchema),
  achievements: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    pointsAwarded: z.number(),
    earnedDate: z.string()
  })),
  penalties: z.array(z.object({
    id: z.string(),
    reason: z.string(),
    pointsDeducted: z.number(),
    date: z.string(),
    severity: z.enum(['minor', 'moderate', 'major', 'severe'])
  })),
  projectedScore: z.object({
    nextWeek: z.number().min(0).max(100),
    nextMonth: z.number().min(0).max(100),
    confidence: z.number().min(0).max(1)
  }),
  recommendations: z.array(z.object({
    action: z.string(),
    expectedImpact: z.number(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    timeframe: z.string()
  })),
  calculationDate: z.string()
})

export type ReputationScore = z.infer<typeof ReputationScoreSchema>

// Content Moderation Types
export const ModerationFlagSchema = z.object({
  flagId: z.string(),
  contentId: z.string(),
  contentType: z.enum(['text', 'document', 'image', 'video', 'link']),
  flagType: z.enum(['spam', 'inappropriate', 'misinformation', 'duplicate', 'off_topic', 'low_quality', 'harassment', 'copyright']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  confidence: z.number().min(0).max(1),
  flaggedBy: z.enum(['automated', 'community', 'moderator']),
  flaggerId: z.string().optional(),
  reason: z.string(),
  evidence: z.array(z.object({
    type: z.enum(['text_analysis', 'similarity_match', 'user_report', 'pattern_detection']),
    description: z.string(),
    confidence: z.number().min(0).max(1),
    data: z.any()
  })),
  suggestedAction: z.enum(['review', 'warn', 'hide', 'remove', 'ban_user']),
  flagDate: z.string()
})

export type ModerationFlag = z.infer<typeof ModerationFlagSchema>

export const ModerationDecisionSchema = z.object({
  decisionId: z.string(),
  contentId: z.string(),
  flags: z.array(ModerationFlagSchema),
  decision: z.enum(['approve', 'warn', 'hide', 'remove', 'ban_user', 'escalate']),
  reasoning: z.string(),
  confidence: z.number().min(0).max(1),
  moderatorId: z.string().optional(),
  automatedDecision: z.boolean(),
  appealable: z.boolean(),
  actions: z.array(z.object({
    action: z.string(),
    target: z.string(), // user_id or content_id
    duration: z.string().optional(),
    reason: z.string()
  })),
  reviewRequired: z.boolean(),
  escalationReason: z.string().optional(),
  decisionDate: z.string()
})

export type ModerationDecision = z.infer<typeof ModerationDecisionSchema>

// Gamification Types
export const AchievementSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['contribution', 'review', 'community', 'expertise', 'milestone', 'special']),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']),
  points: z.number().min(0),
  requirements: z.object({
    type: z.enum(['count', 'score', 'streak', 'combination']),
    criteria: z.array(z.object({
      metric: z.string(),
      threshold: z.number(),
      timeframe: z.string().optional()
    }))
  }),
  rewards: z.object({
    points: z.number().min(0),
    badges: z.array(z.string()),
    privileges: z.array(z.string()),
    recognition: z.string().optional()
  }),
  rarity: z.number().min(0).max(1), // 0 = common, 1 = legendary
  isActive: z.boolean().default(true),
  createdDate: z.string()
})

export type Achievement = z.infer<typeof AchievementSchema>

export const GamificationProfileSchema = z.object({
  userId: z.string(),
  level: z.number().min(1),
  totalPoints: z.number().min(0),
  currentLevelPoints: z.number().min(0),
  nextLevelPoints: z.number().min(0),
  achievements: z.array(z.object({
    achievementId: z.string(),
    earnedDate: z.string(),
    progress: z.number().min(0).max(1)
  })),
  streaks: z.object({
    currentContributionStreak: z.number().min(0),
    longestContributionStreak: z.number().min(0),
    currentReviewStreak: z.number().min(0),
    longestReviewStreak: z.number().min(0)
  }),
  leaderboards: z.array(z.object({
    category: z.string(),
    rank: z.number().min(1),
    totalParticipants: z.number().min(1),
    percentile: z.number().min(0).max(100)
  })),
  motivationFactors: z.object({
    primaryMotivation: z.enum(['points', 'recognition', 'helping_others', 'learning', 'competition']),
    engagementLevel: z.number().min(0).max(1),
    preferredChallenges: z.array(z.string()),
    rewardPreferences: z.array(z.string())
  }),
  nextGoals: z.array(z.object({
    type: z.enum(['achievement', 'level', 'streak', 'rank']),
    target: z.string(),
    progress: z.number().min(0).max(1),
    estimatedCompletion: z.string()
  })),
  lastUpdated: z.string()
})

export type GamificationProfile = z.infer<typeof GamificationProfileSchema>

// Consensus Building Types
export const ConsensusSessionSchema = z.object({
  sessionId: z.string(),
  topic: z.string(),
  description: z.string(),
  contentId: z.string(),
  initiatorId: z.string(),
  participants: z.array(z.object({
    userId: z.string(),
    role: z.enum(['contributor', 'reviewer', 'expert', 'moderator']),
    joinedAt: z.string(),
    isActive: z.boolean()
  })),
  phases: z.array(z.object({
    phase: z.enum(['discussion', 'proposal', 'voting', 'refinement', 'final_vote']),
    startTime: z.string(),
    endTime: z.string().optional(),
    status: z.enum(['pending', 'active', 'completed', 'skipped']),
    outcomes: z.array(z.string())
  })),
  proposals: z.array(z.object({
    proposalId: z.string(),
    proposerId: z.string(),
    title: z.string(),
    description: z.string(),
    changes: z.array(z.object({
      field: z.string(),
      currentValue: z.any(),
      proposedValue: z.any(),
      reasoning: z.string()
    })),
    votes: z.array(z.object({
      voterId: z.string(),
      vote: z.enum(['support', 'oppose', 'abstain']),
      reasoning: z.string().optional(),
      timestamp: z.string()
    })),
    score: z.number(),
    status: z.enum(['draft', 'active', 'accepted', 'rejected', 'withdrawn'])
  })),
  consensusMetrics: z.object({
    participationRate: z.number().min(0).max(1),
    agreementLevel: z.number().min(0).max(1),
    expertAlignment: z.number().min(0).max(1),
    timeToConsensus: z.number().min(0), // minutes
    iterationsRequired: z.number().min(0)
  }),
  finalOutcome: z.object({
    decision: z.enum(['consensus_reached', 'majority_decision', 'expert_override', 'no_consensus']),
    acceptedProposal: z.string().optional(),
    implementationPlan: z.array(z.string()),
    dissenting: z.array(z.object({
      userId: z.string(),
      concerns: z.array(z.string())
    }))
  }).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled']),
  createdAt: z.string(),
  completedAt: z.string().optional()
})

export type ConsensusSession = z.infer<typeof ConsensusSessionSchema>

// Agent configuration
export const CommunityValidationConfigSchema = z.object({
  model: z.string().default('gpt-4o'),
  maxSteps: z.number().default(8),
  temperature: z.number().min(0).max(2).default(0.2),
  enableLogging: z.boolean().default(true),
  timeout: z.number().default(45000), // 45 seconds
  reviewThreshold: z.number().min(0).max(1).default(0.7),
  consensusThreshold: z.number().min(0).max(1).default(0.8),
  moderationSensitivity: z.enum(['low', 'medium', 'high']).default('medium'),
  gamificationEnabled: z.boolean().default(true),
  expertOverrideEnabled: z.boolean().default(true)
})

export type CommunityValidationConfig = z.infer<typeof CommunityValidationConfigSchema>

// Content types for validation
export const ContentSubmissionSchema = z.object({
  contentId: z.string(),
  submitterId: z.string(),
  contentType: z.enum(['experience', 'document', 'policy_update', 'timeline', 'cost_info', 'advice', 'translation']),
  title: z.string(),
  content: z.any(), // Can be text, structured data, or file references
  metadata: z.object({
    country: z.string().optional(),
    visaType: z.string().optional(),
    language: z.string().optional(),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedReadTime: z.number().min(0).optional()
  }),
  sources: z.array(z.object({
    type: z.enum(['official', 'personal', 'community', 'news', 'legal']),
    url: z.string().optional(),
    description: z.string(),
    reliability: z.number().min(0).max(1)
  })),
  submissionDate: z.string(),
  lastModified: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'flagged']).default('submitted')
})

export type ContentSubmission = z.infer<typeof ContentSubmissionSchema>