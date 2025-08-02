import { z } from 'zod';

// Core policy change detection types
export const PolicyChangeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  country: z.string(),
  jurisdiction: z.string(),
  effectiveDate: z.string().datetime(),
  detectedAt: z.string().datetime(),
  changeType: z.enum(['new_policy', 'amendment', 'repeal', 'clarification']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  affectedCategories: z.array(z.string()),
  sourceUrl: z.string().url(),
  confidence: z.number().min(0).max(1),
  rawContent: z.string(),
  structuredData: z.record(z.any()).optional(),
});

export const PolicyImpactAssessmentSchema = z.object({
  changeId: z.string(),
  overallImpact: z.enum(['minimal', 'moderate', 'significant', 'major']),
  affectedUserGroups: z.array(z.object({
    group: z.string(),
    impactLevel: z.enum(['low', 'medium', 'high']),
    description: z.string(),
    estimatedAffectedCount: z.number().optional(),
  })),
  riskFactors: z.array(z.object({
    factor: z.string(),
    riskLevel: z.enum(['low', 'medium', 'high']),
    mitigation: z.string(),
  })),
  timelineImplications: z.object({
    immediateActions: z.array(z.string()),
    shortTermEffects: z.array(z.string()),
    longTermEffects: z.array(z.string()),
  }),
  complianceRequirements: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export const NotificationContentSchema = z.object({
  changeId: z.string(),
  userId: z.string(),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  channels: z.array(z.enum(['email', 'sms', 'push', 'in_app'])),
  subject: z.string(),
  content: z.object({
    summary: z.string(),
    details: z.string(),
    actionItems: z.array(z.string()),
    deadline: z.string().datetime().optional(),
    resources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      type: z.enum(['guide', 'form', 'contact', 'faq']),
    })).optional(),
  }),
  personalization: z.object({
    userProfile: z.record(z.any()),
    relevanceScore: z.number().min(0).max(1),
    customizations: z.array(z.string()),
  }),
});

export const TrendAnalysisSchema = z.object({
  analysisId: z.string(),
  timeframe: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
  jurisdiction: z.string(),
  patterns: z.array(z.object({
    pattern: z.string(),
    frequency: z.number(),
    trend: z.enum(['increasing', 'decreasing', 'stable', 'cyclical']),
    confidence: z.number().min(0).max(1),
    description: z.string(),
  })),
  predictions: z.array(z.object({
    prediction: z.string(),
    probability: z.number().min(0).max(1),
    timeframe: z.string(),
    factors: z.array(z.string()),
  })),
  recommendations: z.array(z.object({
    recommendation: z.string(),
    priority: z.enum(['low', 'medium', 'high']),
    rationale: z.string(),
  })),
});

export const CrossJurisdictionAnalysisSchema = z.object({
  analysisId: z.string(),
  jurisdictions: z.array(z.string()),
  comparisonType: z.enum(['policy_alignment', 'requirement_differences', 'timeline_variations']),
  findings: z.array(z.object({
    jurisdiction: z.string(),
    policy: z.string(),
    status: z.enum(['aligned', 'divergent', 'unique', 'conflicting']),
    details: z.string(),
    implications: z.array(z.string()),
  })),
  harmonizationOpportunities: z.array(z.object({
    opportunity: z.string(),
    jurisdictions: z.array(z.string()),
    benefits: z.array(z.string()),
    challenges: z.array(z.string()),
    feasibility: z.enum(['low', 'medium', 'high']),
  })),
  recommendations: z.array(z.object({
    recommendation: z.string(),
    targetJurisdictions: z.array(z.string()),
    priority: z.enum(['low', 'medium', 'high']),
    timeline: z.string(),
  })),
});

// Agent execution context types
export interface PolicyMonitoringContext {
  sources: string[];
  lastCheck: Date;
  monitoringRules: {
    keywords: string[];
    categories: string[];
    jurisdictions: string[];
  };
}

export interface ImpactAssessmentContext {
  userProfiles: any[];
  historicalData: any[];
  riskThresholds: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface NotificationContext {
  userPreferences: {
    channels: string[];
    frequency: string;
    urgency: string[];
  };
  deliverySettings: {
    timezone: string;
    language: string;
    format: string;
  };
}

export interface TrendAnalysisContext {
  historicalPeriod: number; // months
  analysisDepth: 'basic' | 'detailed' | 'comprehensive';
  includePredictions: boolean;
}

export interface CrossJurisdictionContext {
  targetJurisdictions: string[];
  comparisonCriteria: string[];
  harmonizationGoals: string[];
}

// Tool result types
export type PolicyChangeResult = z.infer<typeof PolicyChangeSchema>;
export type PolicyImpactAssessment = z.infer<typeof PolicyImpactAssessmentSchema>;
export type NotificationContent = z.infer<typeof NotificationContentSchema>;
export type TrendAnalysis = z.infer<typeof TrendAnalysisSchema>;
export type CrossJurisdictionAnalysis = z.infer<typeof CrossJurisdictionAnalysisSchema>;