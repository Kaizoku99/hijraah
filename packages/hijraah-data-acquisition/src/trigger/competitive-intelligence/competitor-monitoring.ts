import { task, logger } from '@trigger.dev/sdk/v3';
import { z } from 'zod';
import FirecrawlApp from '@mendable/firecrawl-js';
import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/lib/supabase/server';
import { 
  CompetitorScrapingConfig, 
  CompetitiveAnalysisContext,
  MonitoringAlert,
  CompetitorMonitoringFrequency 
} from './types';
import { 
  competitorPlatformSchema, 
  monitoringResultSchema,
  featureAnalysisSchema,
  dataCoverageSchema 
} from '@/schemas/competitive-intelligence';

// Initialize Firecrawl
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

// Competitor Monitoring Task
export const monitorCompetitorTask = task({
  id: 'monitor-competitor',
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  queue: {
    concurrencyLimit: 5,
  },
})<{
  competitorId: string;
  monitoringType: 'scheduled' | 'on_demand' | 'alert_triggered';
  analysisDepth: 'basic' | 'detailed' | 'comprehensive';
}>(async (payload) => {
  const { competitorId, monitoringType, analysisDepth } = payload;
  
  await logger.info('Starting competitor monitoring', { 
    competitorId, 
    monitoringType, 
    analysisDepth 
  });

  try {
    // Get competitor configuration
    const supabase = await createClient();
    const { data: competitor, error } = await supabase
      .from('competitor_platforms')
      .select('*')
      .eq('id', competitorId)
      .single();

    if (error || !competitor) {
      throw new Error(`Competitor not found: ${competitorId}`);
    }

    // Configure scraping based on competitor type and analysis depth
    const scrapingConfig = await configureScrapingForCompetitor(competitor, analysisDepth);
    
    // Perform comprehensive data collection
    const scrapingResults = await performCompetitorScraping(scrapingConfig);
    
    // Analyze collected data
    const analysisResults = await analyzeCompetitorData({
      competitorId,
      analysisType: 'feature_analysis',
      scrapedContent: scrapingResults,
      benchmarkData: await getBenchmarkData(),
    });

    // Detect changes from previous monitoring
    const changeDetection = await detectCompetitorChanges(competitorId, analysisResults);
    
    // Generate monitoring alerts if significant changes detected
    const alerts = await generateMonitoringAlerts(competitor, changeDetection);
    
    // Store monitoring results
    const monitoringResult = {
      platform_id: competitorId,
      monitoring_type: 'feature_analysis',
      results: analysisResults,
      changes_detected: changeDetection.changes,
      alerts: alerts,
      monitored_at: new Date(),
      next_monitoring: calculateNextMonitoring(competitor.monitoring_frequency),
    };

    await storeMonitoringResults(monitoringResult);
    
    // Send alerts to stakeholders if critical changes detected
    if (alerts.some(alert => alert.level === 'critical')) {
      await sendCriticalAlerts(alerts);
    }

    await logger.info('Competitor monitoring completed successfully', {
      competitorId,
      changesDetected: changeDetection.changes.length,
      alertsGenerated: alerts.length,
    });

    return {
      success: true,
      competitorId,
      analysisResults,
      changesDetected: changeDetection.changes.length,
      alertsGenerated: alerts.length,
      nextMonitoring: monitoringResult.next_monitoring,
    };

  } catch (error) {
    await logger.error('Competitor monitoring failed', { 
      competitorId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
});

// Configure scraping strategy based on competitor type
async function configureScrapingForCompetitor(
  competitor: any, 
  analysisDepth: string
): Promise<CompetitorScrapingConfig> {
  const baseConfig = {
    platformId: competitor.id,
    urls: [competitor.url],
    crawlOptions: {
      maxDepth: analysisDepth === 'comprehensive' ? 3 : analysisDepth === 'detailed' ? 2 : 1,
      limit: analysisDepth === 'comprehensive' ? 50 : analysisDepth === 'detailed' ? 25 : 10,
      allowExternalLinks: false,
      excludePaths: ['/admin', '/api', '/login', '/register'],
    },
    extractionSchema: z.object({
      title: z.string(),
      content: z.string(),
      features: z.array(z.string()),
      navigation: z.array(z.string()),
      metadata: z.record(z.any()),
    }),
    analysisPrompts: {
      featureAnalysis: `Analyze this immigration platform content and identify key features, capabilities, and user experience elements. Focus on: document processing, case tracking, AI assistance, data visualization, and user experience.`,
      dataExtraction: `Extract structured information about immigration services, supported countries, visa types, and data coverage from this content.`,
      qualityAssessment: `Assess the quality, completeness, and user-friendliness of this immigration platform based on the content provided.`,
    },
  };

  // Customize based on competitor type
  switch (competitor.type) {
    case 'immigration_platform':
      baseConfig.crawlOptions.includePaths = ['/services', '/visa-types', '/countries', '/resources'];
      break;
    case 'legal_service':
      baseConfig.crawlOptions.includePaths = ['/practice-areas', '/immigration', '/services'];
      break;
    case 'government_portal':
      baseConfig.crawlOptions.includePaths = ['/immigration', '/visas', '/forms', '/requirements'];
      break;
    case 'consulting_firm':
      baseConfig.crawlOptions.includePaths = ['/services', '/immigration-consulting', '/expertise'];
      break;
  }

  return baseConfig;
}

// Perform comprehensive competitor scraping
async function performCompetitorScraping(config: CompetitorScrapingConfig) {
  const results = [];

  try {
    // Use Firecrawl's crawlUrl for comprehensive data collection
    const crawlResponse = await firecrawl.crawlUrl(config.urls[0], {
      crawlerOptions: {
        maxDepth: config.crawlOptions.maxDepth,
        limit: config.crawlOptions.limit,
        allowExternalLinks: config.crawlOptions.allowExternalLinks,
        excludePaths: config.crawlOptions.excludePaths,
        includePaths: config.crawlOptions.includePaths,
      },
      pageOptions: {
        onlyMainContent: true,
        includeHtml: false,
        screenshot: false,
      },
      extractorOptions: {
        mode: 'llm-extraction',
        extractionPrompt: config.analysisPrompts.dataExtraction,
        extractionSchema: config.extractionSchema,
      },
    });

    if (crawlResponse.success && crawlResponse.data) {
      results.push(...crawlResponse.data);
    }

    // Additional targeted scraping for specific pages if needed
    if (config.crawlOptions.limit > 10) {
      const targetUrls = generateTargetUrls(config.urls[0], config.crawlOptions.includePaths || []);
      
      const batchResults = await firecrawl.batchScrapeUrls(targetUrls.slice(0, 10), {
        pageOptions: {
          onlyMainContent: true,
          includeHtml: false,
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: config.analysisPrompts.featureAnalysis,
          extractionSchema: config.extractionSchema,
        },
      });

      if (batchResults.success && batchResults.data) {
        results.push(...batchResults.data);
      }
    }

    return results;

  } catch (error) {
    await logger.error('Competitor scraping failed', { 
      platformId: config.platformId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
}

// Analyze competitor data using AI
async function analyzeCompetitorData(context: CompetitiveAnalysisContext) {
  const { competitorId, scrapedContent, benchmarkData } = context;

  try {
    // Feature Analysis
    const featureAnalysis = await generateObject({
      model: openai('gpt-4o'),
      schema: featureAnalysisSchema,
      system: `You are an expert immigration platform analyst. Analyze the competitor's features and capabilities compared to industry standards and Hijraah's offerings.`,
      prompt: `
        Analyze this competitor platform data and provide a comprehensive feature analysis:
        
        Competitor Data: ${JSON.stringify(scrapedContent.slice(0, 5))}
        
        Hijraah Features: ${JSON.stringify(benchmarkData.hijraahFeatures)}
        
        Focus on:
        1. Document processing capabilities
        2. Case tracking and management
        3. AI assistance and automation
        4. Data visualization and reporting
        5. User experience and interface design
        
        Provide detailed scoring (0-10) for each feature category and overall assessment.
      `,
    });

    // Data Coverage Analysis
    const dataCoverage = await generateObject({
      model: openai('gpt-4o'),
      schema: dataCoverageSchema,
      system: `You are a data coverage specialist for immigration platforms. Assess the breadth and depth of immigration data coverage.`,
      prompt: `
        Analyze the data coverage of this competitor platform:
        
        Platform Content: ${JSON.stringify(scrapedContent)}
        
        Assess coverage in these areas:
        1. Visa types and categories
        2. Country-specific policies
        3. Processing times and timelines
        4. Success rates and statistics
        5. Document requirements and templates
        
        Compare against industry benchmarks: ${JSON.stringify(benchmarkData.hijraahDataCoverage)}
        
        Provide percentage coverage and quality scores for each area.
      `,
    });

    return {
      featureAnalysis: featureAnalysis.object,
      dataCoverage: dataCoverage.object,
      analysisMetadata: {
        analyzedAt: new Date(),
        contentPagesAnalyzed: scrapedContent.length,
        analysisDepth: 'comprehensive',
      },
    };

  } catch (error) {
    await logger.error('Competitor analysis failed', { 
      competitorId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
}

// Detect changes from previous monitoring
async function detectCompetitorChanges(competitorId: string, currentAnalysis: any) {
  const supabase = await createClient();
  
  // Get previous analysis
  const { data: previousResult } = await supabase
    .from('competitor_monitoring_results')
    .select('results')
    .eq('platform_id', competitorId)
    .order('monitored_at', { ascending: false })
    .limit(1)
    .single();

  const changes = [];

  if (previousResult?.results) {
    // Compare feature scores
    const previousFeatures = previousResult.results.featureAnalysis?.features || [];
    const currentFeatures = currentAnalysis.featureAnalysis?.features || [];

    for (const currentFeature of currentFeatures) {
      const previousFeature = previousFeatures.find((f: any) => f.name === currentFeature.name);
      
      if (!previousFeature) {
        changes.push({
          type: 'new_feature',
          description: `New feature detected: ${currentFeature.name}`,
          significance: 'major' as const,
          detected_at: new Date(),
        });
      } else if (Math.abs(currentFeature.quality_score - previousFeature.quality_score) > 1) {
        changes.push({
          type: 'feature_improvement',
          description: `Feature quality change: ${currentFeature.name} (${previousFeature.quality_score} → ${currentFeature.quality_score})`,
          significance: 'minor' as const,
          detected_at: new Date(),
        });
      }
    }

    // Compare data coverage
    const previousCoverage = previousResult.results.dataCoverage?.total_coverage_score || 0;
    const currentCoverage = currentAnalysis.dataCoverage?.total_coverage_score || 0;

    if (Math.abs(currentCoverage - previousCoverage) > 5) {
      changes.push({
        type: 'coverage_change',
        description: `Data coverage changed: ${previousCoverage}% → ${currentCoverage}%`,
        significance: 'major' as const,
        detected_at: new Date(),
      });
    }
  }

  return { changes, hasSignificantChanges: changes.length > 0 };
}

// Generate monitoring alerts
async function generateMonitoringAlerts(competitor: any, changeDetection: any): Promise<MonitoringAlert[]> {
  const alerts: MonitoringAlert[] = [];

  for (const change of changeDetection.changes) {
    let severity: 'critical' | 'high' | 'medium' | 'low' = 'low';
    let requiresAction = false;

    // Determine alert severity
    if (change.type === 'new_feature' && change.significance === 'major') {
      severity = 'high';
      requiresAction = true;
    } else if (change.type === 'coverage_change' && change.significance === 'major') {
      severity = 'medium';
      requiresAction = true;
    }

    alerts.push({
      id: `alert-${competitor.id}-${Date.now()}`,
      type: change.type.includes('feature') ? 'new_feature' : change.type.includes('threat') ? 'competitive_threat' : 'data_update',
      severity,
      title: `Competitor Change Detected: ${competitor.name}`,
      description: change.description,
      competitor: competitor.name,
      detected_changes: [change.description],
      recommended_actions: generateRecommendedActions(change),
      stakeholders: ['product-team', 'competitive-intelligence'],
      created_at: new Date(),
      requires_immediate_action: requiresAction,
    });
  }

  return alerts;
}

// Generate recommended actions based on detected changes
function generateRecommendedActions(change: any): string[] {
  const actions = [];

  switch (change.type) {
    case 'new_feature':
      actions.push('Evaluate feature for potential implementation');
      actions.push('Assess competitive impact and user demand');
      actions.push('Consider feature enhancement roadmap');
      break;
    case 'coverage_change':
      actions.push('Analyze data coverage gaps');
      actions.push('Identify new data sources');
      actions.push('Update data acquisition priorities');
      break;
    case 'feature_improvement':
      actions.push('Review our similar feature implementation');
      actions.push('Consider quality improvements and enhancement strategies');
      break;
  }

  return actions;
}

// Helper functions
function generateTargetUrls(baseUrl: string, includePaths: string[]): string[] {
  return includePaths.map(path => `${baseUrl}${path}`);
}

function calculateNextMonitoring(frequency: CompetitorMonitoringFrequency): Date {
  const now = new Date();
  switch (frequency) {
    case 'daily':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case 'weekly':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case 'monthly':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
}

async function getBenchmarkData() {
  // This would typically come from a configuration or database
  return {
    hijraahFeatures: [
      'AI-powered document processing',
      'Real-time case tracking',
      'Multi-language support',
      'Predictive analytics',
      'Community validation',
      'Knowledge graph navigation',
    ],
    hijraahDataCoverage: {
      visa_types: 95,
      country_policies: 90,
      processing_times: 85,
      success_rates: 80,
      document_requirements: 92,
    },
    industryStandards: {
      averageFeatureCount: 15,
      averageDataCoverage: 70,
      averageQualityScore: 7.5,
    },
  };
}

// Benchmark competitor data against industry standards and Hijraah capabilities
async function benchmarkAgainst(competitorData: any, benchmarkData: any) {
  const benchmark = {
    featureComparison: {
      competitorFeatureCount: competitorData.featureAnalysis?.features?.length || 0,
      hijraahFeatureCount: benchmarkData.hijraahFeatures.length,
      industryAverage: benchmarkData.industryStandards.averageFeatureCount,
    },
    qualityComparison: {
      competitorQuality: competitorData.featureAnalysis?.overall_score || 0,
      hijraahQuality: 8.5, // Assumed Hijraah quality score
      industryAverage: benchmarkData.industryStandards.averageQualityScore,
    },
    coverageComparison: {
      competitorCoverage: competitorData.dataCoverage?.total_coverage_score || 0,
      hijraahCoverage: Object.values(benchmarkData.hijraahDataCoverage).reduce((sum: number, score: any) => sum + score, 0) / Object.keys(benchmarkData.hijraahDataCoverage).length,
      industryAverage: benchmarkData.industryStandards.averageDataCoverage,
    },
  };

  return benchmark;
}

async function storeMonitoringResults(result: any) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('competitor_monitoring_results')
    .insert(result);

  if (error) {
    throw new Error(`Failed to store monitoring results: ${error.message}`);
  }
}

async function sendCriticalAlerts(alerts: MonitoringAlert[]) {
  // Implementation would integrate with notification system
  await logger.info('Critical alerts generated', { 
    alertCount: alerts.length,
    alerts: alerts.map(a => ({ id: a.id, title: a.title, severity: a.severity }))
  });
}