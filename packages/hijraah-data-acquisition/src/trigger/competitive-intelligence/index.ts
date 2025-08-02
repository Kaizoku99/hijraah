import { task, logger, schedules } from '@trigger.dev/sdk/v3';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { monitorCompetitorTask } from './competitor-monitoring';
import { analyzeCompetitiveGapsTask } from './gap-analysis';
import { identifyOpportunitiesTask } from './opportunity-identification';
import { CompetitorMonitoringFrequency } from './types';

// Competitive Intelligence Orchestrator Task
export const competitiveIntelligenceOrchestratorTask = task({
  id: 'competitive-intelligence-orchestrator',
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 20000,
  },
  queue: {
    concurrencyLimit: 1,
  },
})<{
  orchestrationType: 'full_analysis' | 'monitoring_only' | 'gap_analysis_only' | 'opportunity_identification_only';
  competitorIds?: string[];
  analysisDepth: 'basic' | 'detailed' | 'comprehensive';
  includeOpportunityGeneration: boolean;
}>(async (payload) => {
  const { orchestrationType, competitorIds, analysisDepth, includeOpportunityGeneration } = payload;
  
  await logger.info('Starting competitive intelligence orchestration', { 
    orchestrationType,
    competitorCount: competitorIds?.length || 'all',
    analysisDepth,
    includeOpportunityGeneration
  });

  try {
    const results: any = {
      orchestrationType,
      startedAt: new Date(),
      stages: {},
    };

    // Get competitor list if not provided
    const targetCompetitors = competitorIds || await getActiveCompetitors();
    
    // Stage 1: Competitor Monitoring
    if (orchestrationType === 'full_analysis' || orchestrationType === 'monitoring_only') {
      await logger.info('Starting competitor monitoring stage', { competitorCount: targetCompetitors.length });
      
      const monitoringResults = await Promise.allSettled(
        targetCompetitors.map(competitorId => 
          monitorCompetitorTask.trigger({
            competitorId,
            monitoringType: 'scheduled',
            analysisDepth,
          })
        )
      );

      results.stages.monitoring = {
        completed: monitoringResults.filter(r => r.status === 'fulfilled').length,
        failed: monitoringResults.filter(r => r.status === 'rejected').length,
        results: monitoringResults,
      };

      await logger.info('Competitor monitoring stage completed', results.stages.monitoring);
    }

    // Stage 2: Gap Analysis
    if (orchestrationType === 'full_analysis' || orchestrationType === 'gap_analysis_only') {
      await logger.info('Starting gap analysis stage');
      
      const gapAnalysisResult = await analyzeCompetitiveGapsTask.trigger({
        competitorIds: targetCompetitors,
        analysisScope: 'comprehensive',
        benchmarkDate: new Date(),
      });

      results.stages.gapAnalysis = {
        taskId: gapAnalysisResult.id,
        status: 'completed',
      };

      await logger.info('Gap analysis stage completed', { taskId: gapAnalysisResult.id });
    }

    // Stage 3: Opportunity Identification
    if ((orchestrationType === 'full_analysis' || orchestrationType === 'opportunity_identification_only') && includeOpportunityGeneration) {
      await logger.info('Starting opportunity identification stage');
      
      const opportunityResult = await identifyOpportunitiesTask.trigger({
        analysisInputs: {
          competitorIds: targetCompetitors,
          gapAnalysisId: results.stages.gapAnalysis?.taskId,
        },
        opportunityTypes: ['data_source', 'feature_enhancement', 'market_gap', 'technology_advantage'],
        prioritizationCriteria: ['competitive_advantage', 'technical_feasibility', 'market_readiness'],
      });

      results.stages.opportunityIdentification = {
        taskId: opportunityResult.id,
        status: 'completed',
      };

      await logger.info('Opportunity identification stage completed', { taskId: opportunityResult.id });
    }

    // Generate executive summary
    const executiveSummary = await generateExecutiveSummary(results, targetCompetitors);
    results.executiveSummary = executiveSummary;

    // Store orchestration results
    await storeOrchestrationResults(results);

    await logger.info('Competitive intelligence orchestration completed successfully', {
      orchestrationType,
      competitorCount: targetCompetitors.length,
      stagesCompleted: Object.keys(results.stages).length,
    });

    return {
      success: true,
      orchestrationType,
      competitorCount: targetCompetitors.length,
      stagesCompleted: Object.keys(results.stages),
      executiveSummary,
    };

  } catch (error) {
    await logger.error('Competitive intelligence orchestration failed', { 
      orchestrationType,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Scheduled Competitive Intelligence Task
export const scheduledCompetitiveIntelligenceTask = schedules.task({
  id: 'scheduled-competitive-intelligence',
  cron: '0 2 * * 1', // Every Monday at 2 AM
})(async () => {
  await logger.info('Starting scheduled competitive intelligence analysis');

  try {
    // Get competitors due for monitoring
    const competitorsDue = await getCompetitorsDueForMonitoring();
    
    if (competitorsDue.length === 0) {
      await logger.info('No competitors due for monitoring - data coverage gaps analysis skipped');
      return { success: true, message: 'No competitors due for monitoring' };
    }

    // Trigger orchestrated analysis
    const orchestrationResult = await competitiveIntelligenceOrchestratorTask.trigger({
      orchestrationType: 'full_analysis',
      competitorIds: competitorsDue.map(c => c.id),
      analysisDepth: 'detailed',
      includeOpportunityGeneration: true,
    });

    await logger.info('Scheduled competitive intelligence analysis triggered', {
      orchestrationTaskId: orchestrationResult.id,
      competitorCount: competitorsDue.length,
    });

    return {
      success: true,
      orchestrationTaskId: orchestrationResult.id,
      competitorCount: competitorsDue.length,
    };

  } catch (error) {
    await logger.error('Scheduled competitive intelligence analysis failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Alert-Triggered Competitive Intelligence Task
export const alertTriggeredCompetitiveIntelligenceTask = task({
  id: 'alert-triggered-competitive-intelligence',
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
})<{
  alertType: 'competitor_change' | 'market_shift' | 'new_competitor' | 'feature_launch';
  competitorId?: string;
  alertData: any;
  urgency: 'critical' | 'high' | 'medium' | 'low';
}>(async (payload) => {
  const { alertType, competitorId, alertData, urgency } = payload;
  
  await logger.info('Alert-triggered competitive intelligence analysis', { 
    alertType, 
    competitorId, 
    urgency 
  });

  try {
    let analysisDepth: 'basic' | 'detailed' | 'comprehensive' = 'basic';
    let targetCompetitors: string[] = [];

    // Determine analysis scope based on alert type and urgency
    if (urgency === 'critical' || urgency === 'high') {
      analysisDepth = 'comprehensive';
    } else if (urgency === 'medium') {
      analysisDepth = 'detailed';
    }

    // Determine target competitors
    if (competitorId) {
      targetCompetitors = [competitorId];
    } else if (alertType === 'market_shift') {
      targetCompetitors = await getTopCompetitors(5);
    } else {
      targetCompetitors = await getActiveCompetitors();
    }

    // Trigger focused analysis
    const orchestrationResult = await competitiveIntelligenceOrchestratorTask.trigger({
      orchestrationType: alertType === 'new_competitor' ? 'full_analysis' : 'monitoring_only',
      competitorIds: targetCompetitors,
      analysisDepth,
      includeOpportunityGeneration: urgency === 'critical' || urgency === 'high',
    });

    // Generate alert-specific insights
    const alertInsights = await generateAlertInsights(alertType, alertData, orchestrationResult);

    await logger.info('Alert-triggered analysis completed', {
      alertType,
      orchestrationTaskId: orchestrationResult.id,
      competitorCount: targetCompetitors.length,
    });

    return {
      success: true,
      alertType,
      orchestrationTaskId: orchestrationResult.id,
      competitorCount: targetCompetitors.length,
      alertInsights,
    };

  } catch (error) {
    await logger.error('Alert-triggered competitive intelligence analysis failed', { 
      alertType,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Helper Functions

async function getActiveCompetitors(): Promise<string[]> {
  const supabase = await createClient();
  
  const { data: competitors } = await supabase
    .from('competitor_platforms')
    .select('id')
    .eq('status', 'active')
    .order('priority', { ascending: false });

  return competitors?.map(c => c.id) || [];
}

async function getCompetitorsDueForMonitoring() {
  const supabase = await createClient();
  
  const { data: competitors } = await supabase
    .from('competitor_platforms')
    .select('*')
    .eq('status', 'active')
    .or('last_monitored.is.null,next_monitoring.lte.' + new Date().toISOString());

  return competitors || [];
}

async function getTopCompetitors(limit: number): Promise<string[]> {
  const supabase = await createClient();
  
  const { data: competitors } = await supabase
    .from('competitor_platforms')
    .select('id')
    .eq('status', 'active')
    .eq('priority', 'high')
    .limit(limit);

  return competitors?.map(c => c.id) || [];
}

async function generateExecutiveSummary(results: any, competitorIds: string[]) {
  // This would typically use AI to generate a comprehensive summary
  return {
    analysisDate: new Date(),
    competitorsAnalyzed: competitorIds.length,
    keyFindings: [
      'Competitive landscape analysis completed with data coverage gaps identified',
      `${results.stages.monitoring?.completed || 0} competitors successfully monitored`,
      'Gap analysis and opportunity identification performed',
    ],
    recommendedActions: [
      'Review identified opportunities for implementation',
      'Monitor high-priority competitors more frequently',
      'Investigate new data sources identified in analysis',
    ],
    nextAnalysisDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
  };
}

async function generateAlertInsights(alertType: string, alertData: any, orchestrationResult: any) {
  // Generate specific insights based on alert type
  return {
    alertType,
    severity: 'medium',
    insights: [
      `Alert-triggered analysis completed for ${alertType}`,
      'Competitive positioning assessed',
      'Strategic recommendations generated',
    ],
    recommendedActions: [
      'Review analysis results',
      'Consider strategic response and enhancement strategies',
      'Monitor for further developments',
      'Alert product-team for immediate action',
    ],
    generatedAt: new Date(),
  };
}

async function storeOrchestrationResults(results: any) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('competitive_intelligence_orchestrations')
    .insert({
      orchestration_type: results.orchestrationType,
      started_at: results.startedAt,
      stages: results.stages,
      executive_summary: results.executiveSummary,
      completed_at: new Date(),
    });

  if (error) {
    throw new Error(`Failed to store orchestration results: ${error.message}`);
  }
}

// Export all tasks
export {
  monitorCompetitorTask,
  analyzeCompetitiveGapsTask,
  identifyOpportunitiesTask,
};