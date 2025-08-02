import { task, logger } from '@trigger.dev/sdk/v3';
import { z } from 'zod';
import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import { opportunitySchema } from '@/schemas/competitive-intelligence';
import { OpportunityType, OpportunityScoring } from './types';

// Opportunity Identification Task
export const identifyOpportunitiesTask = task({
  id: 'identify-opportunities',
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  queue: {
    concurrencyLimit: 2,
  },
})<{
  analysisInputs: {
    gapAnalysisId?: string;
    competitorIds?: string[];
    marketTrends?: any[];
    userFeedback?: any[];
  };
  opportunityTypes: OpportunityType[];
  prioritizationCriteria: string[];
}>(async (payload) => {
  const { analysisInputs, opportunityTypes, prioritizationCriteria } = payload;
  
  await logger.info('Starting opportunity identification', { 
    analysisInputs: Object.keys(analysisInputs),
    opportunityTypes,
    prioritizationCriteria 
  });

  try {
    // Collect analysis data
    const analysisData = await collectAnalysisData(analysisInputs);
    
    // Identify opportunities by type
    const identifiedOpportunities = await identifyOpportunitiesByType(
      analysisData, 
      opportunityTypes
    );
    
    // Validate and score opportunities
    const validatedOpportunities = await validateOpportunities(identifiedOpportunities);
    
    // Evaluate opportunities for data acquisition priorities
    const evaluatedOpportunities = await evaluateOpportunities(validatedOpportunities);
    
    // Prioritize opportunities
    const prioritizedOpportunities = await prioritizeOpportunities(
      evaluatedOpportunities, 
      prioritizationCriteria
    );
    
    // Generate implementation roadmap
    const implementationRoadmap = await generateImplementationRoadmap(
      prioritizedOpportunities.slice(0, 10)
    );
    
    // Store opportunities
    await storeIdentifiedOpportunities(prioritizedOpportunities);

    await logger.info('Opportunity identification completed', {
      opportunitiesIdentified: identifiedOpportunities.length,
      highPriorityOpportunities: prioritizedOpportunities.filter(op => op.potential_impact === 'critical' || op.potential_impact === 'high').length,
    });

    return {
      success: true,
      opportunitiesIdentified: identifiedOpportunities.length,
      prioritizedOpportunities: prioritizedOpportunities.slice(0, 20),
      implementationRoadmap,
    };

  } catch (error) {
    await logger.error('Opportunity identification failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Collect analysis data from various sources
async function collectAnalysisData(analysisInputs: any) {
  const supabase = await createClient();
  const analysisData: any = {
    gapAnalysis: null,
    competitorData: [],
    marketTrends: analysisInputs.marketTrends || [],
    userFeedback: analysisInputs.userFeedback || [],
  };

  // Get gap analysis if provided
  if (analysisInputs.gapAnalysisId) {
    const { data: gapAnalysis } = await supabase
      .from('competitive_gap_analysis')
      .select('*')
      .eq('id', analysisInputs.gapAnalysisId)
      .single();
    
    analysisData.gapAnalysis = gapAnalysis;
  }

  // Get competitor data if provided
  if (analysisInputs.competitorIds?.length) {
    for (const competitorId of analysisInputs.competitorIds) {
      const { data: competitorData } = await supabase
        .from('competitor_monitoring_results')
        .select('*')
        .eq('platform_id', competitorId)
        .order('monitored_at', { ascending: false })
        .limit(1)
        .single();
      
      if (competitorData) {
        analysisData.competitorData.push(competitorData);
      }
    }
  }

  return analysisData;
}

// Identify opportunities by type
async function identifyOpportunitiesByType(analysisData: any, opportunityTypes: OpportunityType[]) {
  const opportunities = [];

  for (const opportunityType of opportunityTypes) {
    const typeOpportunities = await identifyOpportunitiesForType(analysisData, opportunityType);
    opportunities.push(...typeOpportunities);
  }

  return opportunities;
}

// Identify opportunities for a specific type
async function identifyOpportunitiesForType(analysisData: any, opportunityType: OpportunityType) {
  const opportunityPrompts = {
    data_source: `
      Identify new data source opportunities based on competitor analysis and market gaps.
      Focus on:
      - Untapped government data sources
      - Community-driven data collection opportunities
      - Third-party API integrations
      - Real-time data feeds
    `,
    feature_enhancement: `
      Identify feature enhancement opportunities based on competitive gaps and user needs.
      Focus on:
      - Missing core features compared to competitors
      - User experience improvements
      - AI/ML capability enhancements
      - Integration and automation opportunities
    `,
    market_gap: `
      Identify market gap opportunities where competitors are underserving users.
      Focus on:
      - Underserved user segments
      - Geographic market gaps
      - Service delivery gaps
      - Pricing model opportunities
    `,
    technology_advantage: `
      Identify technology advantage opportunities where we can differentiate.
      Focus on:
      - Advanced AI/ML applications
      - Performance and scalability improvements
      - Novel user interface approaches
      - Integration and ecosystem advantages
    `,
  };

  const opportunities = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      opportunities: z.array(z.object({
        title: z.string(),
        description: z.string(),
        potential_impact: z.enum(['critical', 'high', 'medium', 'low']),
        implementation_complexity: z.enum(['low', 'medium', 'high']),
        estimated_effort_weeks: z.number().min(1).max(52),
        competitive_advantage: z.string(),
        requirements: z.array(z.string()),
        risks: z.array(z.string()),
        success_metrics: z.array(z.string()),
      })),
    }),
    system: `You are a strategic opportunity analyst for an immigration technology platform. Identify specific, actionable opportunities based on competitive intelligence and market analysis.`,
    prompt: `
      ${opportunityPrompts[opportunityType]}

      ANALYSIS DATA:
      Gap Analysis: ${JSON.stringify(analysisData.gapAnalysis?.prioritized_gaps?.slice(0, 5) || [])}
      Competitor Data: ${JSON.stringify(analysisData.competitorData.map((c: any) => ({
        platform: c.platform_id,
        features: c.results?.featureAnalysis?.features?.slice(0, 3) || [],
        coverage: c.results?.dataCoverage?.total_coverage_score || 0,
      })))}
      Market Trends: ${JSON.stringify(analysisData.marketTrends)}
      User Feedback: ${JSON.stringify(analysisData.userFeedback)}

      Identify 3-5 specific opportunities for ${opportunityType.replace('_', ' ')} that:
      1. Address real competitive gaps or market needs
      2. Align with Hijraah's immigration platform focus
      3. Are technically feasible and commercially viable
      4. Provide clear competitive differentiation

      For each opportunity, provide detailed requirements, risks, and success metrics.
    `,
  });

  return opportunities.object.opportunities.map(op => ({
    ...op,
    type: opportunityType,
    id: `${opportunityType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    identified_at: new Date(),
    status: 'identified' as const,
  }));
}

// Validate opportunities for feasibility and impact
async function validateOpportunities(opportunities: any[]) {
  const validatedOpportunities = [];

  for (const opportunity of opportunities) {
    const validation = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        feasibility_score: z.number().min(0).max(10),
        impact_score: z.number().min(0).max(10),
        risk_score: z.number().min(0).max(10),
        market_readiness: z.enum(['ready', 'emerging', 'early', 'uncertain']),
        technical_feasibility: z.enum(['high', 'medium', 'low']),
        resource_requirements: z.object({
          engineering_weeks: z.number(),
          design_weeks: z.number(),
          data_acquisition_weeks: z.number(),
          testing_weeks: z.number(),
        }),
        validation_notes: z.string(),
        recommended_next_steps: z.array(z.string()),
      }),
      system: `You are a technical and business validation expert for immigration technology opportunities.`,
      prompt: `
        Validate this opportunity for feasibility and impact:

        OPPORTUNITY:
        Title: ${opportunity.title}
        Description: ${opportunity.description}
        Type: ${opportunity.type}
        Estimated Effort: ${opportunity.estimated_effort_weeks} weeks
        Requirements: ${JSON.stringify(opportunity.requirements)}
        Risks: ${JSON.stringify(opportunity.risks)}

        Assess:
        1. Technical feasibility given current immigration platform architecture
        2. Market impact and user value potential
        3. Implementation risks and mitigation strategies
        4. Resource requirements breakdown
        5. Market readiness and timing

        Provide detailed validation notes and recommended next steps.
      `,
    });

    validatedOpportunities.push({
      ...opportunity,
      validation: validation.object,
      roi_score: calculateROIScore(opportunity, validation.object),
    });
  }

  return validatedOpportunities;
}

// Calculate ROI score based on impact, effort, and risk
function calculateROIScore(opportunity: any, validation: any): number {
  const impactWeight = 0.4;
  const feasibilityWeight = 0.3;
  const riskWeight = 0.3;

  const impactScore = validation.impact_score;
  const feasibilityScore = validation.feasibility_score;
  const riskScore = 10 - validation.risk_score; // Invert risk score

  return (impactScore * impactWeight) + (feasibilityScore * feasibilityWeight) + (riskScore * riskWeight);
}

// Evaluate opportunities for data acquisition priorities
async function evaluateOpportunities(opportunities: any[]) {
  return opportunities.map(opportunity => ({
    ...opportunity,
    opportunity_score: opportunity.roi_score,
    data_acquisition_priority: opportunity.type === 'data_source' ? 'high' : 
                              opportunity.potential_impact === 'critical' ? 'high' :
                              opportunity.potential_impact === 'high' ? 'medium' : 'low',
  }));
}

// Prioritize opportunities based on criteria
async function prioritizeOpportunities(opportunities: any[], prioritizationCriteria: string[]) {
  // Score opportunities based on multiple criteria
  const scoredOpportunities = opportunities.map(opportunity => {
    let priorityScore = opportunity.roi_score;

    // Apply prioritization criteria weights
    if (prioritizationCriteria.includes('competitive_advantage')) {
      priorityScore += opportunity.validation.impact_score * 0.2;
    }
    if (prioritizationCriteria.includes('technical_feasibility')) {
      priorityScore += opportunity.validation.feasibility_score * 0.15;
    }
    if (prioritizationCriteria.includes('market_readiness')) {
      const readinessBonus = {
        ready: 2,
        emerging: 1,
        early: 0.5,
        uncertain: 0,
      };
      priorityScore += readinessBonus[opportunity.validation.market_readiness];
    }
    if (prioritizationCriteria.includes('resource_efficiency')) {
      // Bonus for lower resource requirements
      const totalWeeks = Object.values(opportunity.validation.resource_requirements).reduce((sum: number, weeks: any) => sum + weeks, 0);
      priorityScore += Math.max(0, (20 - totalWeeks) * 0.1);
    }

    return {
      ...opportunity,
      priority_score: priorityScore,
    };
  });

  // Sort by priority score
  return scoredOpportunities.sort((a, b) => b.priority_score - a.priority_score);
}

// Generate implementation roadmap
async function generateImplementationRoadmap(topOpportunities: any[]) {
  const roadmap = await generateText({
    model: openai('gpt-4o'),
    system: `You are a strategic implementation consultant creating roadmaps for immigration technology opportunities.`,
    prompt: `
      Create a comprehensive implementation roadmap for these top opportunities:

      OPPORTUNITIES:
      ${JSON.stringify(topOpportunities.map(op => ({
        title: op.title,
        type: op.type,
        impact: op.potential_impact,
        complexity: op.implementation_complexity,
        effort_weeks: op.estimated_effort_weeks,
        requirements: op.requirements,
        validation: {
          feasibility_score: op.validation.feasibility_score,
          impact_score: op.validation.impact_score,
          resource_requirements: op.validation.resource_requirements,
        },
      })), null, 2)}

      Create a roadmap with:
      1. PHASE 1 (Immediate - 0-3 months): Quick wins and foundational work
      2. PHASE 2 (Short-term - 3-6 months): Core implementations
      3. PHASE 3 (Medium-term - 6-12 months): Advanced features and scaling
      4. DEPENDENCIES: Critical dependencies between opportunities
      5. RESOURCE ALLOCATION: Team and resource requirements per phase
      6. RISK MITIGATION: Key risks and mitigation strategies
      7. SUCCESS METRICS: KPIs and measurement criteria

      Focus on practical, executable plans with clear milestones and deliverables.
    `,
  });

  return {
    roadmap: roadmap.text,
    phases: extractRoadmapPhases(topOpportunities),
    totalEstimatedWeeks: topOpportunities.reduce((sum, op) => sum + op.estimated_effort_weeks, 0),
    resourceRequirements: calculateTotalResourceRequirements(topOpportunities),
    generatedAt: new Date(),
  };
}

// Extract roadmap phases from opportunities
function extractRoadmapPhases(opportunities: any[]) {
  const phases = {
    immediate: [],
    short_term: [],
    medium_term: [],
  };

  for (const opportunity of opportunities) {
    if (opportunity.estimated_effort_weeks <= 12 && opportunity.validation.feasibility_score >= 8) {
      phases.immediate.push(opportunity);
    } else if (opportunity.estimated_effort_weeks <= 24) {
      phases.short_term.push(opportunity);
    } else {
      phases.medium_term.push(opportunity);
    }
  }

  return phases;
}

// Calculate total resource requirements
function calculateTotalResourceRequirements(opportunities: any[]) {
  const totalRequirements = {
    engineering_weeks: 0,
    design_weeks: 0,
    data_acquisition_weeks: 0,
    testing_weeks: 0,
  };

  for (const opportunity of opportunities) {
    const reqs = opportunity.validation.resource_requirements;
    totalRequirements.engineering_weeks += reqs.engineering_weeks;
    totalRequirements.design_weeks += reqs.design_weeks;
    totalRequirements.data_acquisition_weeks += reqs.data_acquisition_weeks;
    totalRequirements.testing_weeks += reqs.testing_weeks;
  }

  return totalRequirements;
}

// Store identified opportunities
async function storeIdentifiedOpportunities(opportunities: any[]) {
  const supabase = await createClient();
  
  for (const opportunity of opportunities) {
    const { error } = await supabase
      .from('competitive_opportunities')
      .insert({
        title: opportunity.title,
        description: opportunity.description,
        type: opportunity.type,
        potential_impact: opportunity.potential_impact,
        implementation_complexity: opportunity.implementation_complexity,
        estimated_effort_weeks: opportunity.estimated_effort_weeks,
        roi_score: opportunity.roi_score,
        competitive_advantage: opportunity.competitive_advantage,
        requirements: opportunity.requirements,
        risks: opportunity.risks,
        validation_data: opportunity.validation,
        priority_score: opportunity.priority_score,
        identified_at: opportunity.identified_at,
        status: opportunity.status,
      });

    if (error) {
      await logger.error('Failed to store opportunity', { 
        opportunityTitle: opportunity.title,
        error: error.message 
      });
    }
  }
}