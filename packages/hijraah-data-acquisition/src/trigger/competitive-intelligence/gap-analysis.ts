import { task, logger } from '@trigger.dev/sdk/v3';
import { z } from 'zod';
import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import { gapAnalysisSchema } from '@/schemas/competitive-intelligence';
import { GapType, OpportunityScoring } from './types';

// Gap Analysis Task
export const analyzeCompetitiveGapsTask = task({
  id: 'analyze-competitive-gaps',
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  queue: {
    concurrencyLimit: 3,
  },
})<{
  competitorIds: string[];
  analysisScope: 'features' | 'data_coverage' | 'comprehensive';
  benchmarkDate?: Date;
}>(async (payload) => {
  const { competitorIds, analysisScope, benchmarkDate } = payload;
  
  await logger.info('Starting competitive gap analysis', { 
    competitorCount: competitorIds.length,
    analysisScope,
    benchmarkDate 
  });

  try {
    // Collect competitor data
    const competitorData = await collectCompetitorData(competitorIds, benchmarkDate);
    
    // Get Hijraah baseline data
    const hijraahBaseline = await getHijraahBaseline();
    
    // Perform comprehensive gap analysis
    const gapAnalysisResults = await performGapAnalysis(
      competitorData, 
      hijraahBaseline, 
      analysisScope
    );
    
    // Prioritize gaps based on impact and feasibility
    const prioritizedGaps = await prioritizeGaps(gapAnalysisResults);
    
    // Generate strategic recommendations
    const strategicRecommendations = await generateStrategicRecommendations(prioritizedGaps);
    
    // Store analysis results
    await storeGapAnalysisResults({
      competitorIds,
      analysisScope,
      gapAnalysisResults,
      prioritizedGaps,
      strategicRecommendations,
      analyzedAt: new Date(),
    });

    await logger.info('Competitive gap analysis completed', {
      competitorCount: competitorIds.length,
      gapsIdentified: gapAnalysisResults.reduce((sum, result) => sum + result.gaps.length, 0),
      highPriorityGaps: prioritizedGaps.filter(gap => gap.priority === 'high').length,
    });

    return {
      success: true,
      competitorCount: competitorIds.length,
      gapsIdentified: gapAnalysisResults.reduce((sum, result) => sum + result.gaps.length, 0),
      prioritizedGaps,
      strategicRecommendations,
    };

  } catch (error) {
    await logger.error('Competitive gap analysis failed', { 
      competitorIds, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Collect competitor data for analysis
async function collectCompetitorData(competitorIds: string[], benchmarkDate?: Date) {
  const supabase = await createClient();
  
  const competitorData = [];

  for (const competitorId of competitorIds) {
    // Get competitor profile
    const { data: competitor } = await supabase
      .from('competitor_platforms')
      .select('*')
      .eq('id', competitorId)
      .single();

    if (!competitor) continue;

    // Get latest monitoring results
    let query = supabase
      .from('competitor_monitoring_results')
      .select('*')
      .eq('platform_id', competitorId)
      .order('monitored_at', { ascending: false });

    if (benchmarkDate) {
      query = query.lte('monitored_at', benchmarkDate.toISOString());
    }

    const { data: monitoringResults } = await query.limit(1).single();

    if (monitoringResults) {
      competitorData.push({
        competitor,
        latestAnalysis: monitoringResults.results,
        monitoredAt: monitoringResults.monitored_at,
      });
    }
  }

  return competitorData;
}

// Get Hijraah baseline capabilities
async function getHijraahBaseline() {
  // This would typically come from a configuration system or database
  return {
    features: {
      document_processing: {
        ocr_accuracy: 95,
        supported_formats: ['PDF', 'JPG', 'PNG', 'DOCX'],
        ai_extraction: true,
        batch_processing: true,
        quality_validation: true,
      },
      case_tracking: {
        real_time_updates: true,
        milestone_tracking: true,
        automated_notifications: true,
        progress_visualization: true,
        historical_tracking: true,
      },
      ai_assistance: {
        chatbot_support: true,
        predictive_analytics: true,
        personalized_recommendations: true,
        multi_language_support: true,
        knowledge_graph_integration: true,
      },
      data_visualization: {
        interactive_dashboards: true,
        custom_reports: true,
        data_export: true,
        real_time_charts: true,
        mobile_responsive: true,
      },
      user_experience: {
        mobile_app: false,
        multi_language_ui: true,
        accessibility_compliance: true,
        user_onboarding: true,
        help_documentation: true,
      },
    },
    data_coverage: {
      countries: 45,
      visa_types: 150,
      policy_documents: 2500,
      processing_time_data: 85, // percentage coverage
      success_rate_data: 70, // percentage coverage
      community_experiences: 1200,
    },
    quality_metrics: {
      data_freshness_score: 8.5,
      accuracy_score: 9.2,
      completeness_score: 8.8,
      user_satisfaction: 4.3, // out of 5
      response_time_ms: 250,
    },
  };
}

// Perform comprehensive gap analysis
async function performGapAnalysis(
  competitorData: any[], 
  hijraahBaseline: any, 
  analysisScope: string
) {
  const gapAnalysisResults = [];

  for (const { competitor, latestAnalysis } of competitorData) {
    const gapAnalysis = await generateObject({
      model: openai('gpt-4o'),
      schema: gapAnalysisSchema,
      system: `You are a competitive intelligence analyst specializing in immigration technology platforms. Analyze gaps between Hijraah and competitors to identify opportunities for improvement and differentiation.`,
      prompt: `
        Perform a comprehensive gap analysis between Hijraah and ${competitor.name}:

        HIJRAAH BASELINE:
        ${JSON.stringify(hijraahBaseline, null, 2)}

        COMPETITOR ANALYSIS:
        ${JSON.stringify(latestAnalysis, null, 2)}

        ANALYSIS SCOPE: ${analysisScope}

        Identify gaps in these categories:
        1. FEATURE GAPS (feature_gap): Features the competitor has that Hijraah lacks
        2. DATA GAPS (data_gap): Data coverage or quality advantages the competitor has
        3. COVERAGE GAPS (coverage_gap): Geographic, visa type, or service coverage gaps
        4. QUALITY GAPS (quality_gap): Areas where competitor quality exceeds Hijraah

        For each gap, assess:
        - Impact level (critical/high/medium/low)
        - Opportunity score (0-10)
        - Implementation effort (low/medium/high)
        - Recommended action

        Focus on actionable insights that can drive product development and data acquisition priorities.
      `,
    });

    gapAnalysisResults.push(gapAnalysis.object);
  }

  return gapAnalysisResults;
}

// Prioritize gaps based on strategic criteria
async function prioritizeGaps(gapAnalysisResults: any[]) {
  const allGaps = gapAnalysisResults.flatMap(result => 
    result.gaps.map((gap: any) => ({
      ...gap,
      competitorId: result.competitor_id,
    }))
  );

  // Score and prioritize gaps
  const scoredGaps = await Promise.all(
    allGaps.map(async (gap) => {
      const scoring = await calculateGapScore(gap);
      return {
        ...gap,
        scoring,
        priority: determinePriority(scoring),
      };
    })
  );

  // Sort by priority and opportunity score
  return scoredGaps.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const aPriorityScore = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriorityScore = priorityOrder[b.priority as keyof typeof priorityOrder];
    
    if (aPriorityScore !== bPriorityScore) {
      return bPriorityScore - aPriorityScore;
    }
    
    return b.scoring.totalScore - a.scoring.totalScore;
  });
}

// Calculate comprehensive gap score
async function calculateGapScore(gap: any): Promise<OpportunityScoring & { totalScore: number }> {
  const scoring = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      impact_factors: z.object({
        user_value: z.number().min(0).max(10),
        competitive_advantage: z.number().min(0).max(10),
        market_demand: z.number().min(0).max(10),
        differentiation_potential: z.number().min(0).max(10),
      }),
      feasibility_factors: z.object({
        technical_complexity: z.number().min(0).max(10),
        resource_requirements: z.number().min(0).max(10),
        time_to_market: z.number().min(0).max(10),
        risk_level: z.number().min(0).max(10),
      }),
      strategic_factors: z.object({
        alignment_with_goals: z.number().min(0).max(10),
        scalability_potential: z.number().min(0).max(10),
        monetization_opportunity: z.number().min(0).max(10),
        brand_impact: z.number().min(0).max(10),
      }),
    }),
    system: `You are a strategic analyst scoring competitive gaps for prioritization.`,
    prompt: `
      Score this competitive gap across multiple dimensions (0-10 scale):

      Gap Details:
      Type: ${gap.type}
      Description: ${gap.description}
      Impact Level: ${gap.impact_level}
      Implementation Effort: ${gap.implementation_effort}

      Provide scores for:
      1. Impact Factors (higher = more valuable)
      2. Feasibility Factors (higher = more challenging)
      3. Strategic Factors (higher = more strategic value)

      Consider immigration platform context and user needs.
    `,
  });

  const result = scoring.object;
  
  // Calculate weighted total score
  const impactWeight = 0.4;
  const feasibilityWeight = 0.3; // Note: lower feasibility scores are better
  const strategicWeight = 0.3;

  const impactScore = Object.values(result.impact_factors).reduce((sum, score) => sum + score, 0) / 4;
  const feasibilityScore = 10 - (Object.values(result.feasibility_factors).reduce((sum, score) => sum + score, 0) / 4); // Invert for scoring
  const strategicScore = Object.values(result.strategic_factors).reduce((sum, score) => sum + score, 0) / 4;

  const totalScore = (impactScore * impactWeight) + (feasibilityScore * feasibilityWeight) + (strategicScore * strategicWeight);

  return {
    ...result,
    totalScore,
    opportunity_score: totalScore,
  };
}

// Determine priority level based on scoring
function determinePriority(scoring: any): 'critical' | 'high' | 'medium' | 'low' {
  const { totalScore } = scoring;
  
  if (totalScore >= 8.5) return 'critical';
  if (totalScore >= 7.0) return 'high';
  if (totalScore >= 5.5) return 'medium';
  return 'low';
}

// Generate strategic recommendations
async function generateStrategicRecommendations(prioritizedGaps: any[]) {
  const topGaps = prioritizedGaps.slice(0, 10); // Focus on top 10 gaps

  const recommendations = await generateText({
    model: openai('gpt-4o'),
    system: `You are a strategic product consultant for an immigration technology platform. Generate actionable strategic recommendations based on competitive gap analysis.`,
    prompt: `
      Based on this competitive gap analysis, provide strategic recommendations for Hijraah:

      TOP PRIORITY GAPS:
      ${JSON.stringify(topGaps.map(gap => ({
        type: gap.type,
        description: gap.description,
        priority: gap.priority,
        totalScore: gap.scoring.totalScore,
        recommendedAction: gap.recommended_action,
      })), null, 2)}

      Provide:
      1. IMMEDIATE ACTIONS (next 3 months)
      2. SHORT-TERM INITIATIVES (3-6 months)
      3. LONG-TERM STRATEGIC MOVES (6-12 months)
      4. RESOURCE ALLOCATION RECOMMENDATIONS
      5. RISK MITIGATION STRATEGIES

      Focus on actionable, specific recommendations that can be implemented by the product and engineering teams.
    `,
  });

  return {
    summary: recommendations.text,
    priorityGaps: topGaps.slice(0, 5),
    recommendedActions: topGaps.map(gap => ({
      gapType: gap.type,
      action: gap.recommended_action,
      priority: gap.priority,
      estimatedEffort: gap.implementation_effort,
    })),
    generatedAt: new Date(),
  };
}

// Store gap analysis results
async function storeGapAnalysisResults(analysisData: any) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('competitive_gap_analysis')
    .insert({
      competitor_ids: analysisData.competitorIds,
      analysis_scope: analysisData.analysisScope,
      gaps_identified: analysisData.gapAnalysisResults,
      prioritized_gaps: analysisData.prioritizedGaps,
      strategic_recommendations: analysisData.strategicRecommendations,
      analyzed_at: analysisData.analyzedAt,
    });

  if (error) {
    throw new Error(`Failed to store gap analysis results: ${error.message}`);
  }
}