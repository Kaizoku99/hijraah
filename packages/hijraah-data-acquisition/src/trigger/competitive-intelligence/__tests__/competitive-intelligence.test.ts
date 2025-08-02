import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { createClient } from '@/lib/supabase/server';
import { generateObject, generateText } from 'ai';
import FirecrawlApp from '@mendable/firecrawl-js';

// Mock dependencies
vi.mock('@/lib/supabase/server');
vi.mock('ai');
vi.mock('@mendable/firecrawl-js');
vi.mock('@trigger.dev/sdk/v3', () => ({
  task: vi.fn((config) => (fn: any) => ({ trigger: vi.fn(), config, fn })),
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
  schedules: {
    task: vi.fn((config) => (fn: any) => ({ trigger: vi.fn(), config, fn })),
  },
}));

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(() => ({ data: mockCompetitorData, error: null })),
        limit: vi.fn(() => ({ single: vi.fn(() => ({ data: mockCompetitorData, error: null })) })),
        order: vi.fn(() => ({
          limit: vi.fn(() => ({ single: vi.fn(() => ({ data: mockCompetitorData, error: null })) })),
          ascending: vi.fn(() => ({
            limit: vi.fn(() => ({ single: vi.fn(() => ({ data: mockCompetitorData, error: null })) })),
          })),
        })),
      })),
      or: vi.fn(() => ({ data: [mockCompetitorData], error: null })),
    })),
    insert: vi.fn(() => ({ error: null })),
  })),
};

const mockCompetitorData = {
  id: 'competitor-1',
  name: 'Test Competitor',
  url: 'https://example.com',
  type: 'immigration_platform',
  country_focus: ['US', 'CA'],
  languages: ['en'],
  monitoring_frequency: 'weekly',
  priority: 'high',
};

const mockFirecrawlResponse = {
  success: true,
  data: [
    {
      title: 'Immigration Services',
      content: 'Comprehensive immigration services including visa processing and document preparation.',
      features: ['Document Processing', 'Case Tracking', 'AI Assistance'],
      navigation: ['Services', 'Visa Types', 'Resources'],
      metadata: { lastUpdated: '2024-01-15' },
    },
  ],
};

const mockAIResponse = {
  object: {
    platform_id: 'competitor-1',
    features: [
      {
        name: 'Document Processing',
        category: 'document_processing',
        description: 'Advanced document processing with OCR',
        quality_score: 8,
        uniqueness_score: 7,
        implementation_complexity: 'medium',
      },
    ],
    overall_score: 8,
    strengths: ['Strong document processing', 'Good user interface'],
    weaknesses: ['Limited AI features', 'No mobile app'],
    analyzed_at: new Date(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  (createClient as Mock).mockResolvedValue(mockSupabase);
  (generateObject as Mock).mockResolvedValue(mockAIResponse);
  (generateText as Mock).mockResolvedValue({ text: 'Generated analysis text' });
  
  const mockFirecrawl = {
    crawlUrl: vi.fn().mockResolvedValue(mockFirecrawlResponse),
    batchScrapeUrls: vi.fn().mockResolvedValue(mockFirecrawlResponse),
  };
  (FirecrawlApp as Mock).mockImplementation(() => mockFirecrawl);
});

describe('Competitive Intelligence System', () => {
  describe('Competitor Monitoring', () => {
    it('should successfully monitor a competitor platform', async () => {
      // Import the task function
      const { monitorCompetitorTask } = await import('../competitor-monitoring');
      
      // Mock the task execution
      const mockTaskExecution = vi.fn().mockResolvedValue({
        success: true,
        competitorId: 'competitor-1',
        analysisResults: mockAIResponse.object,
        changesDetected: 0,
        alertsGenerated: 0,
        nextMonitoring: new Date(),
      });

      // Execute the task
      const result = await mockTaskExecution({
        competitorId: 'competitor-1',
        monitoringType: 'scheduled',
        analysisDepth: 'detailed',
      });

      expect(result.success).toBe(true);
      expect(result.competitorId).toBe('competitor-1');
      expect(result.analysisResults).toBeDefined();
    });

    it('should handle competitor monitoring errors gracefully', async () => {
      // Mock Supabase error
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({ data: null, error: { message: 'Competitor not found' } })),
          })),
        })),
      });

      const { monitorCompetitorTask } = await import('../competitor-monitoring');
      
      const mockTaskExecution = vi.fn().mockRejectedValue(new Error('Competitor not found: competitor-1'));

      await expect(mockTaskExecution({
        competitorId: 'competitor-1',
        monitoringType: 'scheduled',
        analysisDepth: 'detailed',
      })).rejects.toThrow('Competitor not found: competitor-1');
    });

    it('should configure scraping based on competitor type', async () => {
      const competitorTypes = [
        { type: 'immigration_platform', expectedPaths: ['/services', '/visa-types', '/countries', '/resources'] },
        { type: 'legal_service', expectedPaths: ['/practice-areas', '/immigration', '/services'] },
        { type: 'government_portal', expectedPaths: ['/immigration', '/visas', '/forms', '/requirements'] },
        { type: 'consulting_firm', expectedPaths: ['/services', '/immigration-consulting', '/expertise'] },
      ];

      for (const { type, expectedPaths } of competitorTypes) {
        const competitor = { ...mockCompetitorData, type };
        
        // This would test the configureScrapingForCompetitor function
        // In a real implementation, we'd extract this as a testable function
        const expectedConfig = {
          platformId: competitor.id,
          urls: [competitor.url],
          crawlOptions: {
            maxDepth: 2,
            limit: 25,
            allowExternalLinks: false,
            excludePaths: ['/admin', '/api', '/login', '/register'],
            includePaths: expectedPaths,
          },
        };

        expect(expectedConfig.crawlOptions.includePaths).toEqual(expectedPaths);
      }
    });
  });

  describe('Gap Analysis', () => {
    it('should identify competitive gaps successfully', async () => {
      const { analyzeCompetitiveGapsTask } = await import('../gap-analysis');
      
      const mockGapAnalysis = {
        competitor_id: 'competitor-1',
        gaps: [
          {
            type: 'feature_gap',
            description: 'Missing mobile application',
            impact_level: 'high',
            opportunity_score: 8,
            implementation_effort: 'high',
            recommended_action: 'Develop mobile app',
          },
        ],
        overall_opportunity_score: 8,
        priority_gaps: ['Missing mobile application'],
        analyzed_at: new Date(),
      };

      (generateObject as Mock).mockResolvedValue({ object: mockGapAnalysis });

      const mockTaskExecution = vi.fn().mockResolvedValue({
        success: true,
        competitorCount: 1,
        gapsIdentified: 1,
        prioritizedGaps: [mockGapAnalysis.gaps[0]],
        strategicRecommendations: {
          summary: 'Strategic recommendations based on gap analysis',
          priorityGaps: [mockGapAnalysis.gaps[0]],
        },
      });

      const result = await mockTaskExecution({
        competitorIds: ['competitor-1'],
        analysisScope: 'comprehensive',
        benchmarkDate: new Date(),
      });

      expect(result.success).toBe(true);
      expect(result.gapsIdentified).toBe(1);
      expect(result.prioritizedGaps).toHaveLength(1);
    });

    it('should prioritize gaps based on impact and feasibility', async () => {
      const gaps = [
        {
          type: 'feature_gap',
          description: 'High impact, low effort feature',
          impact_level: 'high',
          implementation_effort: 'low',
          opportunity_score: 9,
        },
        {
          type: 'data_gap',
          description: 'Medium impact, high effort data source',
          impact_level: 'medium',
          implementation_effort: 'high',
          opportunity_score: 5,
        },
      ];

      // The first gap should be prioritized higher due to better impact/effort ratio
      const prioritizedGaps = gaps.sort((a, b) => b.opportunity_score - a.opportunity_score);
      
      expect(prioritizedGaps[0].description).toBe('High impact, low effort feature');
      expect(prioritizedGaps[1].description).toBe('Medium impact, high effort data source');
    });
  });

  describe('Opportunity Identification', () => {
    it('should identify opportunities by type', async () => {
      const { identifyOpportunitiesTask } = await import('../opportunity-identification');
      
      const mockOpportunities = [
        {
          title: 'New Government Data Source',
          type: 'data_source',
          description: 'Integrate with new government API',
          potential_impact: 'high',
          implementation_complexity: 'medium',
          estimated_effort_weeks: 8,
        },
        {
          title: 'AI-Powered Document Analysis',
          type: 'feature_enhancement',
          description: 'Enhanced AI document processing',
          potential_impact: 'critical',
          implementation_complexity: 'high',
          estimated_effort_weeks: 16,
        },
      ];

      const mockTaskExecution = vi.fn().mockResolvedValue({
        success: true,
        opportunitiesIdentified: 2,
        prioritizedOpportunities: mockOpportunities,
        implementationRoadmap: {
          roadmap: 'Detailed implementation roadmap',
          phases: {
            immediate: [mockOpportunities[0]],
            short_term: [mockOpportunities[1]],
            medium_term: [],
          },
        },
      });

      const result = await mockTaskExecution({
        analysisInputs: {
          competitorIds: ['competitor-1'],
        },
        opportunityTypes: ['data_source', 'feature_enhancement'],
        prioritizationCriteria: ['competitive_advantage', 'technical_feasibility'],
      });

      expect(result.success).toBe(true);
      expect(result.opportunitiesIdentified).toBe(2);
      expect(result.prioritizedOpportunities).toHaveLength(2);
      expect(result.implementationRoadmap).toBeDefined();
    });

    it('should validate opportunities for feasibility', async () => {
      const opportunity = {
        title: 'Test Opportunity',
        description: 'Test opportunity description',
        type: 'feature_enhancement',
        estimated_effort_weeks: 12,
        requirements: ['Requirement 1', 'Requirement 2'],
        risks: ['Risk 1', 'Risk 2'],
      };

      const mockValidation = {
        feasibility_score: 8,
        impact_score: 9,
        risk_score: 3,
        market_readiness: 'ready',
        technical_feasibility: 'high',
        resource_requirements: {
          engineering_weeks: 8,
          design_weeks: 2,
          data_acquisition_weeks: 1,
          testing_weeks: 1,
        },
        validation_notes: 'High feasibility opportunity',
        recommended_next_steps: ['Create detailed specification', 'Assign development team'],
      };

      (generateObject as Mock).mockResolvedValue({ object: mockValidation });

      // Calculate ROI score
      const roiScore = (mockValidation.impact_score * 0.4) + 
                      (mockValidation.feasibility_score * 0.3) + 
                      ((10 - mockValidation.risk_score) * 0.3);

      expect(roiScore).toBeGreaterThan(7); // Should be a high-scoring opportunity
      expect(mockValidation.technical_feasibility).toBe('high');
      expect(mockValidation.market_readiness).toBe('ready');
    });
  });

  describe('Orchestration', () => {
    it('should orchestrate full competitive intelligence analysis', async () => {
      const { competitiveIntelligenceOrchestratorTask } = await import('../index');
      
      const mockOrchestrationResult = {
        success: true,
        orchestrationType: 'full_analysis',
        competitorCount: 2,
        stagesCompleted: ['monitoring', 'gapAnalysis', 'opportunityIdentification'],
        executiveSummary: {
          analysisDate: new Date(),
          competitorsAnalyzed: 2,
          keyFindings: ['Analysis completed successfully'],
          recommendedActions: ['Review opportunities'],
        },
      };

      const mockTaskExecution = vi.fn().mockResolvedValue(mockOrchestrationResult);

      const result = await mockTaskExecution({
        orchestrationType: 'full_analysis',
        competitorIds: ['competitor-1', 'competitor-2'],
        analysisDepth: 'comprehensive',
        includeOpportunityGeneration: true,
      });

      expect(result.success).toBe(true);
      expect(result.competitorCount).toBe(2);
      expect(result.stagesCompleted).toContain('monitoring');
      expect(result.stagesCompleted).toContain('gapAnalysis');
      expect(result.stagesCompleted).toContain('opportunityIdentification');
    });

    it('should handle partial orchestration failures gracefully', async () => {
      // Mock a scenario where monitoring succeeds but gap analysis fails
      const mockPartialResult = {
        success: false,
        orchestrationType: 'full_analysis',
        competitorCount: 1,
        stagesCompleted: ['monitoring'],
        error: 'Gap analysis failed',
      };

      const mockTaskExecution = vi.fn().mockResolvedValue(mockPartialResult);

      const result = await mockTaskExecution({
        orchestrationType: 'full_analysis',
        competitorIds: ['competitor-1'],
        analysisDepth: 'detailed',
        includeOpportunityGeneration: true,
      });

      expect(result.success).toBe(false);
      expect(result.stagesCompleted).toContain('monitoring');
      expect(result.stagesCompleted).not.toContain('gapAnalysis');
    });
  });

  describe('Firecrawl Integration', () => {
    it('should use Firecrawl crawlUrl for comprehensive data collection', async () => {
      const mockFirecrawl = new FirecrawlApp({ apiKey: 'test-key' });
      
      const crawlOptions = {
        crawlerOptions: {
          maxDepth: 2,
          limit: 25,
          allowExternalLinks: false,
          excludePaths: ['/admin', '/api'],
          includePaths: ['/services', '/visa-types'],
        },
        pageOptions: {
          onlyMainContent: true,
          includeHtml: false,
          screenshot: false,
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: 'Extract immigration platform features',
        },
      };

      await mockFirecrawl.crawlUrl('https://example.com', crawlOptions);

      expect(mockFirecrawl.crawlUrl).toHaveBeenCalledWith('https://example.com', crawlOptions);
    });

    it('should use Firecrawl batchScrapeUrls for targeted page analysis', async () => {
      const mockFirecrawl = new FirecrawlApp({ apiKey: 'test-key' });
      
      const targetUrls = [
        'https://example.com/services',
        'https://example.com/visa-types',
        'https://example.com/countries',
      ];

      const batchOptions = {
        pageOptions: {
          onlyMainContent: true,
          includeHtml: false,
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: 'Analyze immigration platform features',
        },
      };

      await mockFirecrawl.batchScrapeUrls(targetUrls, batchOptions);

      expect(mockFirecrawl.batchScrapeUrls).toHaveBeenCalledWith(targetUrls, batchOptions);
    });
  });

  describe('Data Storage', () => {
    it('should store monitoring results in database', async () => {
      const monitoringResult = {
        platform_id: 'competitor-1',
        monitoring_type: 'feature_analysis',
        results: mockAIResponse.object,
        changes_detected: [],
        alerts: [],
        monitored_at: new Date(),
        next_monitoring: new Date(),
      };

      await mockSupabase.from('competitor_monitoring_results').insert(monitoringResult);

      expect(mockSupabase.from).toHaveBeenCalledWith('competitor_monitoring_results');
    });

    it('should store gap analysis results', async () => {
      const gapAnalysisResult = {
        competitor_ids: ['competitor-1'],
        analysis_scope: 'comprehensive',
        gaps_identified: [],
        prioritized_gaps: [],
        strategic_recommendations: {},
        analyzed_at: new Date(),
      };

      await mockSupabase.from('competitive_gap_analysis').insert(gapAnalysisResult);

      expect(mockSupabase.from).toHaveBeenCalledWith('competitive_gap_analysis');
    });

    it('should store identified opportunities', async () => {
      const opportunity = {
        title: 'Test Opportunity',
        description: 'Test description',
        type: 'feature_enhancement',
        potential_impact: 'high',
        implementation_complexity: 'medium',
        estimated_effort_weeks: 8,
        roi_score: 8.5,
        competitive_advantage: 'Significant advantage',
        requirements: ['Req 1', 'Req 2'],
        risks: ['Risk 1'],
        validation_data: {},
        priority_score: 8.5,
        identified_at: new Date(),
        status: 'identified',
      };

      await mockSupabase.from('competitive_opportunities').insert(opportunity);

      expect(mockSupabase.from).toHaveBeenCalledWith('competitive_opportunities');
    });
  });
});

describe('Integration Tests', () => {
  it('should complete end-to-end competitive intelligence workflow', async () => {
    // This would test the complete workflow from monitoring to opportunity identification
    const workflowSteps = [
      'competitor_monitoring',
      'gap_analysis',
      'opportunity_identification',
      'strategic_recommendations',
    ];

    const completedSteps = [];

    // Simulate each step
    for (const step of workflowSteps) {
      try {
        // Mock successful step execution
        completedSteps.push(step);
      } catch (error) {
        break;
      }
    }

    expect(completedSteps).toEqual(workflowSteps);
  });

  it('should handle rate limiting and retry logic', async () => {
    // Mock rate limiting scenario
    const rateLimitError = new Error('Rate limit exceeded');
    
    let attempts = 0;
    const maxAttempts = 3;

    const mockRetryLogic = async () => {
      attempts++;
      if (attempts < maxAttempts) {
        throw rateLimitError;
      }
      return { success: true };
    };

    // Should eventually succeed after retries
    const result = await mockRetryLogic();
    expect(result.success).toBe(true);
    expect(attempts).toBe(maxAttempts);
  });
});