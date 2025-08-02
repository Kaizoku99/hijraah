import { z } from 'zod';

// Competitor Platform Schema
export const competitorPlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.enum(['immigration_platform', 'legal_service', 'government_portal', 'consulting_firm']),
  country_focus: z.array(z.string()),
  languages: z.array(z.string()),
  last_monitored: z.date().optional(),
  monitoring_frequency: z.enum(['daily', 'weekly', 'monthly']),
  priority: z.enum(['high', 'medium', 'low']),
  metadata: z.record(z.any()).optional(),
});

// Feature Analysis Schema
export const featureAnalysisSchema = z.object({
  platform_id: z.string(),
  features: z.array(z.object({
    name: z.string(),
    category: z.enum(['document_processing', 'case_tracking', 'ai_assistance', 'data_visualization', 'user_experience']),
    description: z.string(),
    quality_score: z.number().min(0).max(10),
    uniqueness_score: z.number().min(0).max(10),
    implementation_complexity: z.enum(['low', 'medium', 'high']),
  })),
  overall_score: z.number().min(0).max(10),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  analyzed_at: z.date(),
});

// Data Coverage Analysis Schema
export const dataCoverageSchema = z.object({
  platform_id: z.string(),
  coverage_areas: z.array(z.object({
    area: z.enum(['visa_types', 'country_policies', 'processing_times', 'success_rates', 'document_requirements']),
    coverage_percentage: z.number().min(0).max(100),
    data_freshness: z.enum(['current', 'outdated', 'unknown']),
    source_quality: z.enum(['official', 'community', 'mixed', 'unknown']),
  })),
  total_coverage_score: z.number().min(0).max(100),
  data_quality_score: z.number().min(0).max(10),
  analyzed_at: z.date(),
});

// Gap Analysis Schema
export const gapAnalysisSchema = z.object({
  competitor_id: z.string(),
  gaps: z.array(z.object({
    type: z.enum(['feature_gap', 'data_gap', 'coverage_gap', 'quality_gap']),
    description: z.string(),
    impact_level: z.enum(['critical', 'high', 'medium', 'low']),
    opportunity_score: z.number().min(0).max(10),
    implementation_effort: z.enum(['low', 'medium', 'high']),
    recommended_action: z.string(),
  })),
  overall_opportunity_score: z.number().min(0).max(10),
  priority_gaps: z.array(z.string()),
  analyzed_at: z.date(),
});

// Opportunity Identification Schema
export const opportunitySchema = z.object({
  id: z.string(),
  type: z.enum(['data_source', 'feature_enhancement', 'market_gap', 'technology_advantage']),
  title: z.string(),
  description: z.string(),
  potential_impact: z.enum(['critical', 'high', 'medium', 'low']),
  implementation_complexity: z.enum(['low', 'medium', 'high']),
  estimated_effort_weeks: z.number().min(1),
  roi_score: z.number().min(0).max(10),
  competitive_advantage: z.string(),
  requirements: z.array(z.string()),
  risks: z.array(z.string()),
  identified_at: z.date(),
  status: z.enum(['identified', 'evaluated', 'approved', 'in_progress', 'completed', 'rejected']),
});

// Monitoring Result Schema
export const monitoringResultSchema = z.object({
  platform_id: z.string(),
  monitoring_type: z.enum(['feature_analysis', 'data_coverage', 'content_changes', 'performance_metrics']),
  results: z.record(z.any()),
  changes_detected: z.array(z.object({
    type: z.string(),
    description: z.string(),
    significance: z.enum(['major', 'minor', 'cosmetic']),
    detected_at: z.date(),
  })),
  alerts: z.array(z.object({
    level: z.enum(['critical', 'warning', 'info']),
    message: z.string(),
    action_required: z.boolean(),
  })),
  monitored_at: z.date(),
  next_monitoring: z.date(),
});

// Export types
export type CompetitorPlatform = z.infer<typeof competitorPlatformSchema>;
export type FeatureAnalysis = z.infer<typeof featureAnalysisSchema>;
export type DataCoverage = z.infer<typeof dataCoverageSchema>;
export type GapAnalysis = z.infer<typeof gapAnalysisSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
export type MonitoringResult = z.infer<typeof monitoringResultSchema>;