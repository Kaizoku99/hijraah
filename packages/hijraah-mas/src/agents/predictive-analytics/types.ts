import { z } from 'zod'

// Base prediction types
export const PredictionFactorSchema = z.object({
  factor: z.string(),
  impact: z.number().min(-1).max(1), // -1 (negative) to 1 (positive)
  confidence: z.number().min(0).max(1),
  description: z.string()
})

export type PredictionFactor = z.infer<typeof PredictionFactorSchema>

export const ConfidenceIntervalSchema = z.object({
  lower: z.number(),
  upper: z.number(),
  confidence: z.number().min(0).max(1) // e.g., 0.95 for 95% confidence
})

export type ConfidenceInterval = z.infer<typeof ConfidenceIntervalSchema>

// Timeline Prediction Types
export const TimelinePredictionSchema = z.object({
  predictionId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  estimatedDays: z.number().min(0),
  confidenceInterval: ConfidenceIntervalSchema,
  factors: z.array(PredictionFactorSchema),
  historicalComparison: z.object({
    averageDays: z.number(),
    medianDays: z.number(),
    percentile25: z.number(),
    percentile75: z.number(),
    sampleSize: z.number()
  }),
  milestones: z.array(z.object({
    stage: z.string(),
    estimatedDays: z.number(),
    confidence: z.number().min(0).max(1),
    description: z.string()
  })),
  riskFactors: z.array(z.string()),
  acceleratingFactors: z.array(z.string()),
  modelVersion: z.string(),
  timestamp: z.string()
})

export type TimelinePrediction = z.infer<typeof TimelinePredictionSchema>

// Success Probability Types
export const SuccessProbabilitySchema = z.object({
  predictionId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  successProbability: z.number().min(0).max(1),
  confidenceInterval: ConfidenceIntervalSchema,
  factors: z.array(PredictionFactorSchema),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
  statisticalAnalysis: z.object({
    sampleSize: z.number(),
    historicalSuccessRate: z.number(),
    similarCasesCount: z.number(),
    modelAccuracy: z.number().min(0).max(1)
  }),
  outcomeBreakdown: z.object({
    approved: z.number().min(0).max(1),
    denied: z.number().min(0).max(1),
    additionalInfoRequired: z.number().min(0).max(1),
    withdrawn: z.number().min(0).max(1)
  }),
  improvementSuggestions: z.array(z.object({
    suggestion: z.string(),
    impact: z.number().min(0).max(1),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    timeRequired: z.string()
  })),
  modelVersion: z.string(),
  timestamp: z.string()
})

export type SuccessProbability = z.infer<typeof SuccessProbabilitySchema>

// Risk Assessment Types
export const RiskFactorSchema = z.object({
  category: z.enum(['documentation', 'eligibility', 'timing', 'policy', 'personal', 'financial', 'legal']),
  factor: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  probability: z.number().min(0).max(1),
  impact: z.number().min(0).max(1),
  description: z.string(),
  mitigation: z.object({
    strategy: z.string(),
    effectiveness: z.number().min(0).max(1),
    timeRequired: z.string(),
    cost: z.enum(['none', 'low', 'medium', 'high']),
    difficulty: z.enum(['easy', 'medium', 'hard'])
  })
})

export type RiskFactor = z.infer<typeof RiskFactorSchema>

export const RiskAssessmentSchema = z.object({
  assessmentId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  overallRiskScore: z.number().min(0).max(100),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
  riskFactors: z.array(RiskFactorSchema),
  riskCategories: z.record(z.object({
    score: z.number().min(0).max(100),
    level: z.enum(['low', 'medium', 'high', 'critical']),
    factors: z.array(z.string())
  })),
  mitigationPlan: z.object({
    priority: z.enum(['immediate', 'high', 'medium', 'low']),
    strategies: z.array(z.object({
      strategy: z.string(),
      targetRisks: z.array(z.string()),
      expectedReduction: z.number().min(0).max(1),
      timeline: z.string(),
      resources: z.array(z.string())
    })),
    estimatedRiskReduction: z.number().min(0).max(1)
  }),
  monitoringPlan: z.array(z.object({
    metric: z.string(),
    frequency: z.string(),
    threshold: z.number(),
    action: z.string()
  })),
  modelVersion: z.string(),
  timestamp: z.string()
})

export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>

// Cost Estimation Types
export const CostItemSchema = z.object({
  category: z.enum(['government_fees', 'legal_fees', 'document_fees', 'translation', 'medical_exams', 'travel', 'miscellaneous']),
  item: z.string(),
  estimatedCost: z.number().min(0),
  currency: z.string(),
  confidence: z.number().min(0).max(1),
  required: z.boolean(),
  timing: z.string(),
  notes: z.string().optional()
})

export type CostItem = z.infer<typeof CostItemSchema>

export const CostEstimationSchema = z.object({
  estimationId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  totalEstimatedCost: z.number().min(0),
  currency: z.string(),
  confidenceInterval: ConfidenceIntervalSchema,
  costBreakdown: z.array(CostItemSchema),
  costCategories: z.record(z.object({
    total: z.number().min(0),
    percentage: z.number().min(0).max(1),
    items: z.array(z.string())
  })),
  budgetPlanning: z.object({
    upfrontCosts: z.number().min(0),
    ongoingCosts: z.number().min(0),
    contingencyFund: z.number().min(0),
    paymentSchedule: z.array(z.object({
      phase: z.string(),
      amount: z.number().min(0),
      timing: z.string(),
      description: z.string()
    }))
  }),
  costOptimization: z.array(z.object({
    suggestion: z.string(),
    potentialSavings: z.number().min(0),
    tradeoffs: z.string(),
    feasibility: z.enum(['easy', 'medium', 'hard'])
  })),
  historicalComparison: z.object({
    averageCost: z.number(),
    medianCost: z.number(),
    percentile25: z.number(),
    percentile75: z.number(),
    sampleSize: z.number()
  }),
  modelVersion: z.string(),
  timestamp: z.string()
})

export type CostEstimation = z.infer<typeof CostEstimationSchema>

// Recommendation Types
export const ActionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['documentation', 'preparation', 'submission', 'follow_up', 'improvement']),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  urgency: z.enum(['immediate', 'within_week', 'within_month', 'flexible']),
  estimatedTime: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  dependencies: z.array(z.string()),
  resources: z.array(z.string()),
  expectedImpact: z.object({
    successProbability: z.number().min(-1).max(1),
    timelineReduction: z.number().min(0),
    costImpact: z.number(),
    riskReduction: z.number().min(0).max(1)
  }),
  status: z.enum(['not_started', 'in_progress', 'completed', 'blocked']).default('not_started')
})

export type ActionItem = z.infer<typeof ActionItemSchema>

export const RecommendationSchema = z.object({
  recommendationId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  overallStrategy: z.string(),
  strategicPriorities: z.array(z.string()),
  actionPlan: z.array(ActionItemSchema),
  timeline: z.object({
    phases: z.array(z.object({
      phase: z.string(),
      duration: z.string(),
      objectives: z.array(z.string()),
      actions: z.array(z.string()),
      milestones: z.array(z.string())
    })),
    criticalPath: z.array(z.string()),
    bufferTime: z.string()
  }),
  riskMitigation: z.array(z.object({
    risk: z.string(),
    mitigation: z.string(),
    monitoring: z.string()
  })),
  successFactors: z.array(z.string()),
  warningSignals: z.array(z.string()),
  alternativeStrategies: z.array(z.object({
    strategy: z.string(),
    conditions: z.string(),
    tradeoffs: z.string()
  })),
  personalization: z.object({
    userProfile: z.record(z.any()),
    customizations: z.array(z.string()),
    preferences: z.record(z.any())
  }),
  confidence: z.number().min(0).max(1),
  modelVersion: z.string(),
  timestamp: z.string()
})

export type Recommendation = z.infer<typeof RecommendationSchema>

// User profile for predictions
export const UserProfileSchema = z.object({
  demographics: z.object({
    age: z.number().optional(),
    nationality: z.string(),
    currentCountry: z.string(),
    targetCountry: z.string(),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']).optional(),
    dependents: z.number().min(0).optional()
  }),
  education: z.object({
    level: z.enum(['high_school', 'bachelor', 'master', 'phd', 'professional']).optional(),
    field: z.string().optional(),
    institution: z.string().optional(),
    year: z.number().optional()
  }),
  employment: z.object({
    status: z.enum(['employed', 'unemployed', 'self_employed', 'student', 'retired']).optional(),
    industry: z.string().optional(),
    experience: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
    jobOffer: z.boolean().optional()
  }),
  language: z.object({
    native: z.string(),
    proficiency: z.record(z.enum(['basic', 'intermediate', 'advanced', 'native'])),
    testScores: z.record(z.number()).optional()
  }),
  immigration: z.object({
    visaType: z.string(),
    previousApplications: z.array(z.object({
      country: z.string(),
      visaType: z.string(),
      outcome: z.enum(['approved', 'denied', 'withdrawn']),
      year: z.number()
    })).optional(),
    currentStatus: z.string().optional(),
    urgency: z.enum(['low', 'medium', 'high', 'critical']).optional()
  }),
  financial: z.object({
    savings: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
    debts: z.number().min(0).optional(),
    sponsorship: z.boolean().optional()
  }),
  documents: z.object({
    passportValid: z.boolean().optional(),
    documentsReady: z.number().min(0).max(1).optional(),
    translationsNeeded: z.boolean().optional(),
    authenticationsNeeded: z.boolean().optional()
  })
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// Agent configuration
export const PredictiveAnalyticsConfigSchema = z.object({
  model: z.string().default('gpt-4o'),
  maxSteps: z.number().default(10),
  temperature: z.number().min(0).max(2).default(0.1),
  enableLogging: z.boolean().default(true),
  timeout: z.number().default(60000), // 60 seconds for complex analysis
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
  historicalDataWindow: z.number().default(365), // days
  enableCaching: z.boolean().default(true),
  cacheExpiry: z.number().default(3600) // 1 hour
})

export type PredictiveAnalyticsConfig = z.infer<typeof PredictiveAnalyticsConfigSchema>