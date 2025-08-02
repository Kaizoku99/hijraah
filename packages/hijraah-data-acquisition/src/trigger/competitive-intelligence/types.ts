import { z } from 'zod';

// Firecrawl Scraping Configuration
export interface CompetitorScrapingConfig {
  platformId: string;
  urls: string[];
  crawlOptions: {
    maxDepth: number;
    limit: number;
    allowExternalLinks: boolean;
    excludePaths?: string[];
    includePaths?: string[];
  };
  extractionSchema: z.ZodSchema;
  analysisPrompts: {
    featureAnalysis: string;
    dataExtraction: string;
    qualityAssessment: string;
  };
}

// Competitive Analysis Context
export interface CompetitiveAnalysisContext {
  competitorId: string;
  analysisType: 'feature_analysis' | 'data_coverage' | 'gap_analysis' | 'opportunity_identification';
  scrapedContent: any[];
  previousAnalysis?: any;
  benchmarkData: {
    hijraahFeatures: string[];
    hijraahDataCoverage: Record<string, number>;
    industryStandards: Record<string, any>;
  };
}

// Feature Detection Configuration
export interface FeatureDetectionConfig {
  featureCategories: {
    document_processing: string[];
    case_tracking: string[];
    ai_assistance: string[];
    data_visualization: string[];
    user_experience: string[];
  };
  detectionPrompts: Record<string, string>;
  qualityMetrics: string[];
}

// Data Coverage Assessment
export interface DataCoverageAssessment {
  coverageAreas: {
    visa_types: {
      detected: string[];
      coverage_percentage: number;
      quality_indicators: string[];
    };
    country_policies: {
      countries: string[];
      policy_depth: 'basic' | 'detailed' | 'comprehensive';
      freshness_indicators: string[];
    };
    processing_times: {
      available: boolean;
      granularity: 'country' | 'visa_type' | 'detailed';
      data_source: 'official' | 'community' | 'estimated';
    };
    success_rates: {
      available: boolean;
      breakdown_level: 'general' | 'detailed' | 'personalized';
      confidence_indicators: string[];
    };
    document_requirements: {
      completeness: number;
      detail_level: 'basic' | 'detailed' | 'comprehensive';
      format_support: string[];
    };
  };
}

// Opportunity Scoring Criteria
export interface OpportunityScoring {
  impact_factors: {
    user_value: number;
    competitive_advantage: number;
    market_demand: number;
    differentiation_potential: number;
  };
  feasibility_factors: {
    technical_complexity: number;
    resource_requirements: number;
    time_to_market: number;
    risk_level: number;
  };
  strategic_factors: {
    alignment_with_goals: number;
    scalability_potential: number;
    monetization_opportunity: number;
    brand_impact: number;
  };
}

// Monitoring Alert Configuration
export interface MonitoringAlert {
  id: string;
  type: 'new_feature' | 'data_update' | 'policy_change' | 'competitive_threat';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  competitor: string;
  detected_changes: string[];
  recommended_actions: string[];
  stakeholders: string[];
  created_at: Date;
  requires_immediate_action: boolean;
}

// Analysis Pipeline Configuration
export interface AnalysisPipelineConfig {
  stages: {
    data_collection: {
      firecrawl_config: any;
      retry_attempts: number;
      timeout_ms: number;
    };
    content_analysis: {
      ai_model: string;
      analysis_prompts: Record<string, string>;
      confidence_threshold: number;
    };
    gap_identification: {
      comparison_criteria: string[];
      scoring_weights: Record<string, number>;
      threshold_scores: Record<string, number>;
    };
    opportunity_generation: {
      opportunity_types: string[];
      prioritization_criteria: string[];
      validation_requirements: string[];
    };
  };
}

// Workflow Orchestration Types
export interface CompetitiveIntelligenceWorkflow {
  workflowId: string;
  competitorId: string;
  scheduledAt: Date;
  stages: {
    monitoring: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: Date;
      completedAt?: Date;
      results?: any;
    };
    analysis: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: Date;
      completedAt?: Date;
      results?: any;
    };
    gap_identification: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: Date;
      completedAt?: Date;
      results?: any;
    };
    opportunity_generation: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: Date;
      completedAt?: Date;
      results?: any;
    };
    reporting: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: Date;
      completedAt?: Date;
      results?: any;
    };
  };
}

export type CompetitorMonitoringFrequency = 'daily' | 'weekly' | 'monthly';
export type AnalysisType = 'feature_analysis' | 'data_coverage' | 'gap_analysis' | 'opportunity_identification';
export type CompetitorType = 'immigration_platform' | 'legal_service' | 'government_portal' | 'consulting_firm';
export type OpportunityType = 'data_source' | 'feature_enhancement' | 'market_gap' | 'technology_advantage';
export type GapType = 'feature_gap' | 'data_gap' | 'coverage_gap' | 'quality_gap';