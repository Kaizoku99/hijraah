/**
 * Enhanced MAS Endpoints Tests
 * 
 * Comprehensive tests for the enhanced Multi-Agent System (MAS) API endpoints
 * including document processing, predictive analytics, policy analysis,
 * community validation, and performance monitoring.
 */

import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import type { RequestContext, ApiResponse } from '../types.js';
import { createEnhancedMasEndpoints } from '../endpoints/mas-enhanced-endpoints.js';
import { FirecrawlService } from '../services/firecrawl-service.js';

// Mock the MAS agent teams
vi.mock('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js', () => ({
  MultiModalDocumentTeam: vi.fn().mockImplementation(() => ({
    processDocument: vi.fn(),
    batchProcessDocuments: vi.fn(),
    processDocumentWithSpecializedWorkflow: vi.fn(),
    getProcessingStatistics: vi.fn(),
  })),
}));

vi.mock('../../../../hijraah-mas/src/agents/predictive-analytics/predictive-analytics-team.js', () => ({
  PredictiveAnalyticsTeam: vi.fn().mockImplementation(() => ({
    performComprehensiveAnalysis: vi.fn(),
    performQuickAnalysis: vi.fn(),
    updateAnalysis: vi.fn(),
  })),
}));

vi.mock('../../../../hijraah-mas/src/agents/policy-change-detection/team.js', () => ({
  PolicyChangeDetectionTeam: vi.fn().mockImplementation(() => ({
    processPolicyChange: vi.fn(),
    handleEmergencyPolicyChange: vi.fn(),
    getTeamStatus: vi.fn(),
  })),
}));

vi.mock('../../../../hijraah-mas/src/agents/community-validation/community-validation-team.js', () => ({
  CommunityValidationTeam: vi.fn().mockImplementation(() => ({
    performCommunityValidation: vi.fn(),
    performQuickValidation: vi.fn(),
    handleCommunityAppeal: vi.fn(),
    generateValidationInsights: vi.fn(),
  })),
}));

describe('Enhanced MAS Endpoints', () => {
  let mockFirecrawlService: FirecrawlService;
  let mockContext: RequestContext;
  let endpoints: ReturnType<typeof createEnhancedMasEndpoints>;

  beforeEach(() => {
    // Mock FirecrawlService
    mockFirecrawlService = {
      scrapeUrl: vi.fn(),
      batchScrape: vi.fn(),
      crawlUrl: vi.fn(),
      getJobStatus: vi.fn(),
      enhanceWithAI: vi.fn(),
    } as any;

    // Mock request context
    mockContext = {
      requestId: 'test-request-123',
      timestamp: new Date('2024-01-01T00:00:00Z'),
      userAgent: 'test-agent',
      ipAddress: '127.0.0.1',
      auth: {
        apiKey: { id: 'test-key', userId: 'test-user' },
        userId: 'test-user',
        permissions: ['read:data', 'write:data', 'use:mas'],
        subscriptionTier: 'premium',
        rateLimits: {
          requestsPerMinute: 100,
          requestsPerHour: 1000,
          requestsPerDay: 10000,
          firecrawlCreditsPerMonth: 10000,
          aiTokensPerMonth: 100000,
        },
        usage: {
          currentMinute: 5,
          currentHour: 50,
          currentDay: 500,
          currentMonth: {
            firecrawlCredits: 1000,
            aiTokens: 10000,
          },
        },
      },
      metadata: {
        endpoint: 'test-endpoint',
      },
    };

    // Create endpoints
    endpoints = createEnhancedMasEndpoints(mockFirecrawlService);
  });

  describe('Document Processing Endpoint', () => {
    it('should process single document successfully', async () => {
      const documentEndpoint = endpoints.find(e => e.path === '/api/v1/mas/document-processing');
      expect(documentEndpoint).toBeDefined();

      const mockProcessingResult = {
        documentId: 'doc-123',
        classification: {
          classification: {
            category: 'passport',
            confidence: 0.95,
          },
        },
        ocr: {
          extractedText: {
            fullText: 'Sample passport text',
            confidence: 0.92,
          },
        },
        extraction: {
          extractedFields: {
            passport_number: 'A12345678',
            given_names: 'John',
            surname: 'Doe',
          },
        },
        quality: {
          qualityScore: 85,
          passed: true,
        },
        overallScore: 87,
        processingTime: 2500,
        recommendations: ['Document quality is good'],
        timestamp: '2024-01-01T00:00:00Z',
      };

      // Mock the document team methods
      const { MultiModalDocumentTeam } = await import('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js');
      const mockTeam = new MultiModalDocumentTeam();
      (mockTeam.processDocument as Mock).mockResolvedValue(mockProcessingResult);
      (mockTeam.getProcessingStatistics as Mock).mockReturnValue({
        totalDocuments: 1,
        averageScore: 87,
        averageProcessingTime: 2500,
        successRate: 1.0,
        documentTypeDistribution: { passport: 1 },
        qualityDistribution: { high: 1 },
      });

      const params = {
        body: {
          documents: [
            {
              id: 'doc-123',
              type: 'image',
              source: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
              metadata: {
                filename: 'passport.jpg',
                mimeType: 'image/jpeg',
                size: 1024000,
              },
            },
          ],
          processingOptions: {
            documentType: 'passport',
            extractionFields: ['passport_number', 'given_names', 'surname'],
            qualityThresholds: {
              minOverallScore: 80,
            },
          },
        },
      };

      const response = await documentEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('processingId');
      expect(response.data).toHaveProperty('results');
      expect(response.data).toHaveProperty('statistics');
      expect(response.data.results).toHaveLength(1);
      expect(response.data.results[0].overallScore).toBe(87);
      expect(response.data.statistics.totalDocuments).toBe(1);
    });

    it('should handle batch document processing', async () => {
      const documentEndpoint = endpoints.find(e => e.path === '/api/v1/mas/document-processing');
      
      const mockBatchResults = [
        {
          documentId: 'doc-1',
          overallScore: 85,
          processingTime: 2000,
          classification: { classification: { category: 'passport' } },
          quality: { passed: true },
        },
        {
          documentId: 'doc-2',
          overallScore: 78,
          processingTime: 2200,
          classification: { classification: { category: 'visa' } },
          quality: { passed: true },
        },
      ];

      const { MultiModalDocumentTeam } = await import('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js');
      const mockTeam = new MultiModalDocumentTeam();
      (mockTeam.batchProcessDocuments as Mock).mockResolvedValue(mockBatchResults);
      (mockTeam.getProcessingStatistics as Mock).mockReturnValue({
        totalDocuments: 2,
        averageScore: 81.5,
        averageProcessingTime: 2100,
        successRate: 1.0,
        documentTypeDistribution: { passport: 1, visa: 1 },
        qualityDistribution: { high: 2 },
      });

      const params = {
        body: {
          documents: [
            { id: 'doc-1', type: 'image', source: 'base64-data-1' },
            { id: 'doc-2', type: 'image', source: 'base64-data-2' },
          ],
          processingOptions: {
            batchProcessing: true,
          },
        },
      };

      const response = await documentEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.results).toHaveLength(2);
      expect(response.data.statistics.totalDocuments).toBe(2);
      expect(response.data.metadata.batchProcessing).toBe(true);
    });

    it('should handle document processing errors gracefully', async () => {
      const documentEndpoint = endpoints.find(e => e.path === '/api/v1/mas/document-processing');
      
      const { MultiModalDocumentTeam } = await import('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js');
      const mockTeam = new MultiModalDocumentTeam();
      (mockTeam.processDocument as Mock).mockRejectedValue(new Error('OCR processing failed'));

      const params = {
        body: {
          documents: [
            { id: 'doc-123', type: 'image', source: 'invalid-data' },
          ],
        },
      };

      const response = await documentEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toContain('OCR processing failed');
    });
  });

  describe('Predictive Analytics Endpoint', () => {
    it('should perform comprehensive predictive analysis', async () => {
      const analyticsEndpoint = endpoints.find(e => e.path === '/api/v1/mas/predictive-analytics');
      expect(analyticsEndpoint).toBeDefined();

      const mockAnalysisResult = {
        analysisId: 'analysis-123',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'Express Entry',
        timelinePrediction: {
          estimatedDays: 180,
          confidenceInterval: { confidence: 0.85 },
          milestones: [
            { stage: 'Application Submission', estimatedDays: 0 },
            { stage: 'Initial Review', estimatedDays: 30 },
            { stage: 'Final Decision', estimatedDays: 180 },
          ],
          riskFactors: ['Processing backlog', 'Document verification'],
          acceleratingFactors: ['Complete documentation', 'High CRS score'],
        },
        successProbability: {
          successProbability: 0.78,
          riskLevel: 'medium',
          factors: [
            { factor: 'Education level', impact: 0.3, confidence: 0.9 },
            { factor: 'Language proficiency', impact: 0.25, confidence: 0.85 },
          ],
          outcomeBreakdown: {
            approved: 0.78,
            denied: 0.15,
            additionalInfoRequired: 0.07,
          },
          improvementSuggestions: [
            { suggestion: 'Improve IELTS score', impact: 0.15, difficulty: 'medium' },
          ],
        },
        riskAssessment: {
          overallRiskScore: 35,
          riskLevel: 'medium',
          riskFactors: [
            { factor: 'Document authenticity', severity: 'low', probability: 0.1 },
          ],
          mitigationPlan: {
            priority: 'medium',
            strategies: [
              { strategy: 'Document verification', expectedReduction: 0.5 },
            ],
          },
        },
        costEstimation: {
          totalEstimatedCost: 3500,
          currency: 'CAD',
          costCategories: {
            government_fees: { total: 1500, percentage: 0.43 },
            legal_fees: { total: 2000, percentage: 0.57 },
          },
          budgetPlanning: {
            upfrontCosts: 2000,
            ongoingCosts: 1500,
            contingencyFund: 500,
          },
          costOptimization: [
            { suggestion: 'Self-representation', potentialSavings: 1500 },
          ],
        },
        recommendations: {
          overallStrategy: 'Focus on improving language scores and gathering complete documentation',
          strategicPriorities: ['Language improvement', 'Document preparation'],
          actionPlan: [
            {
              id: 'action-1',
              title: 'Retake IELTS exam',
              priority: 'high',
              estimatedTime: '2 months',
            },
          ],
          timeline: {
            phases: [
              { phase: 'Preparation', duration: '3 months' },
              { phase: 'Application', duration: '6 months' },
            ],
          },
          alternativeStrategies: [
            { strategy: 'Provincial Nominee Program', conditions: 'If Express Entry fails' },
          ],
        },
        overallInsights: {
          keyFindings: ['Strong educational background', 'Language scores need improvement'],
          criticalActions: ['Improve IELTS score', 'Gather employment references'],
          successFactors: ['Complete documentation', 'High education level'],
          majorRisks: ['Language proficiency', 'Processing delays'],
          budgetSummary: 'Total estimated cost: CAD 3,500',
          timelineSummary: 'Expected processing time: 6 months',
          confidenceLevel: 0.82,
        },
        agentCoordination: {
          agentsUsed: ['timeline', 'success', 'risk', 'cost', 'recommendation'],
          processingTime: 5200,
          dataQuality: 0.85,
          consensusLevel: 0.88,
        },
        timestamp: '2024-01-01T00:00:00Z',
      };

      const { PredictiveAnalyticsTeam } = await import('../../../../hijraah-mas/src/agents/predictive-analytics/predictive-analytics-team.js');
      const mockTeam = new PredictiveAnalyticsTeam();
      (mockTeam.performComprehensiveAnalysis as Mock).mockResolvedValue(mockAnalysisResult);

      const params = {
        body: {
          userProfile: {
            demographics: {
              nationality: 'Indian',
              currentCountry: 'India',
              targetCountry: 'Canada',
              age: 28,
              maritalStatus: 'single',
            },
            education: {
              level: 'master',
              field: 'Computer Science',
              institution: 'IIT Delhi',
              year: 2020,
            },
            employment: {
              status: 'employed',
              industry: 'Technology',
              occupation: 'Software Engineer',
              experience: 5,
              income: 80000,
            },
            language: {
              native: 'Hindi',
              proficiency: [
                { language: 'English', level: 'advanced', testScore: 7.5 },
              ],
            },
            immigration: {
              visaType: 'Express Entry',
              previousApplications: [],
            },
            financial: {
              savings: 50000,
              income: 80000,
              currency: 'USD',
            },
            documents: {
              passportValid: true,
              documentsReady: 0.8,
            },
          },
          caseData: {
            caseType: 'skilled_worker',
            country: 'Canada',
            visaType: 'Express Entry',
            urgency: 'medium',
          },
          analysisOptions: {
            analysisType: 'comprehensive',
            riskTolerance: 'moderate',
            includeHistoricalComparison: true,
          },
        },
      };

      const response = await analyticsEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.analysisType).toBe('comprehensive');
      expect(response.data.analysisId).toBe('analysis-123');
      expect(response.data.predictions).toHaveProperty('timeline');
      expect(response.data.predictions).toHaveProperty('success');
      expect(response.data.predictions).toHaveProperty('risks');
      expect(response.data.predictions).toHaveProperty('costs');
      expect(response.data.insights).toHaveProperty('keyFindings');
      expect(response.data.recommendations).toHaveProperty('strategy');
      expect(response.data.agentMetrics).toHaveProperty('agentsUsed');
    });

    it('should perform quick analysis when requested', async () => {
      const analyticsEndpoint = endpoints.find(e => e.path === '/api/v1/mas/predictive-analytics');
      
      const mockQuickResult = {
        successProbability: 0.75,
        estimatedTimeline: 180,
        majorRisks: ['Language proficiency', 'Document verification'],
        estimatedCost: 3500,
        topRecommendations: [
          'Improve IELTS score to 8.0+',
          'Gather employment references',
          'Prepare financial documentation',
        ],
      };

      const { PredictiveAnalyticsTeam } = await import('../../../../hijraah-mas/src/agents/predictive-analytics/predictive-analytics-team.js');
      const mockTeam = new PredictiveAnalyticsTeam();
      (mockTeam.performQuickAnalysis as Mock).mockResolvedValue(mockQuickResult);

      const params = {
        body: {
          userProfile: {
            demographics: { nationality: 'Indian', currentCountry: 'India', targetCountry: 'Canada' },
            education: { level: 'master' },
            employment: { status: 'employed' },
            language: { native: 'Hindi', proficiency: [] },
            immigration: { visaType: 'Express Entry' },
            financial: { currency: 'USD' },
            documents: {},
          },
          caseData: {
            caseType: 'skilled_worker',
            country: 'Canada',
            visaType: 'Express Entry',
          },
          analysisOptions: {
            analysisType: 'quick',
          },
        },
      };

      const response = await analyticsEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.analysisType).toBe('quick');
      expect(response.data.results.successProbability).toBe(0.75);
      expect(response.data.results.estimatedTimeline).toBe(180);
      expect(response.data.results.majorRisks).toHaveLength(3);
      expect(response.data.results.topRecommendations).toHaveLength(3);
    });
  });

  describe('Policy Analysis Endpoint', () => {
    it('should perform policy change detection analysis', async () => {
      const policyEndpoint = endpoints.find(e => e.path === '/api/v1/mas/policy-analysis');
      expect(policyEndpoint).toBeDefined();

      const mockPolicyResult = {
        status: 'processing_complete',
        timestamp: '2024-01-01T00:00:00Z',
        results: {
          detectedChanges: 2,
          impactAssessments: 2,
          notificationsGenerated: 15,
          trendAnalysisPerformed: true,
          jurisdictionAnalysisPerformed: false,
        },
        data: {
          changes: [
            {
              id: 'change-1',
              title: 'Express Entry CRS Score Update',
              severity: 'medium',
              jurisdiction: 'Canada',
              effectiveDate: '2024-02-01',
            },
            {
              id: 'change-2',
              title: 'Processing Time Extension',
              severity: 'low',
              jurisdiction: 'Canada',
              effectiveDate: '2024-01-15',
            },
          ],
          impacts: [
            {
              changeId: 'change-1',
              overallImpact: 'significant',
              affectedUsers: 1500,
              riskLevel: 'medium',
            },
            {
              changeId: 'change-2',
              overallImpact: 'minor',
              affectedUsers: 300,
              riskLevel: 'low',
            },
          ],
          notifications: 15,
          trends: {
            jurisdiction: 'Canada',
            trendDirection: 'increasing_requirements',
            confidence: 0.82,
          },
        },
      };

      const { PolicyChangeDetectionTeam } = await import('../../../../hijraah-mas/src/agents/policy-change-detection/team.js');
      const mockTeam = new PolicyChangeDetectionTeam();
      (mockTeam.processPolicyChange as Mock).mockResolvedValue(mockPolicyResult);

      const params = {
        body: {
          analysisRequest: {
            analysisType: 'change_detection',
            sources: [
              'https://www.canada.ca/en/immigration-refugees-citizenship.html',
              'https://www.cic.gc.ca/english/immigrate/express/express-entry.asp',
            ],
            targetJurisdictions: ['Canada'],
            timeframe: {
              monitoringPeriod: '24h',
            },
          },
          contextData: {
            affectedUserProfiles: ['user-1', 'user-2', 'user-3'],
            monitoringRules: {
              keywords: ['Express Entry', 'CRS score', 'processing time'],
              categories: ['immigration_policy', 'visa_requirements'],
              severityThreshold: 'medium',
            },
          },
        },
      };

      const response = await policyEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.analysisType).toBe('change_detection');
      expect(response.data.targetJurisdictions).toEqual(['Canada']);
      expect(response.data.results.status).toBe('processing_complete');
      expect(response.data.results.data.changes).toHaveLength(2);
      expect(response.data.contextData.sourcesAnalyzed).toBe(2);
      expect(response.data.contextData.affectedUsers).toBe(3);
    });

    it('should handle emergency policy change response', async () => {
      const policyEndpoint = endpoints.find(e => e.path === '/api/v1/mas/policy-analysis');
      
      const mockEmergencyResult = {
        status: 'emergency_response_complete',
        timestamp: '2024-01-01T00:00:00Z',
        results: {
          impactAssessed: true,
          emergencyNotificationsSent: 25,
          jurisdictionAlertIssued: true,
        },
        data: {
          impact: {
            overallImpact: 'critical',
            affectedUsers: 5000,
            riskLevel: 'high',
            urgentActions: ['immediate_application_review', 'document_update'],
          },
          notifications: 25,
          jurisdictionAlert: {
            alertLevel: 'critical',
            coordinationRequired: true,
          },
        },
      };

      const { PolicyChangeDetectionTeam } = await import('../../../../hijraah-mas/src/agents/policy-change-detection/team.js');
      const mockTeam = new PolicyChangeDetectionTeam();
      (mockTeam.handleEmergencyPolicyChange as Mock).mockResolvedValue(mockEmergencyResult);

      const params = {
        body: {
          analysisRequest: {
            analysisType: 'emergency_response',
            sources: ['https://emergency-policy-update.gov'],
            targetJurisdictions: ['Canada'],
          },
          contextData: {
            affectedUserProfiles: Array.from({ length: 100 }, (_, i) => `user-${i}`),
          },
        },
      };

      const response = await policyEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.results.status).toBe('emergency_response_complete');
      expect(response.data.results.results.emergencyNotificationsSent).toBe(25);
      expect(response.data.results.results.jurisdictionAlertIssued).toBe(true);
    });
  });

  describe('Community Validation Endpoint', () => {
    it('should perform comprehensive community validation', async () => {
      const validationEndpoint = endpoints.find(e => e.path === '/api/v1/mas/community-validation');
      expect(validationEndpoint).toBeDefined();

      const mockValidationResult = {
        validationId: 'validation-123',
        contentId: 'content-456',
        submitterId: 'user-789',
        peerReviews: [
          {
            reviewId: 'review-1',
            reviewerId: 'reviewer-1',
            overallScore: 8.5,
            recommendation: 'approve',
            confidence: 0.9,
          },
          {
            reviewId: 'review-2',
            reviewerId: 'reviewer-2',
            overallScore: 7.8,
            recommendation: 'approve_with_changes',
            confidence: 0.85,
          },
        ],
        consensusResult: {
          consensusLevel: 0.82,
          finalRecommendation: 'approve',
          conflictingReviews: [],
        },
        moderationDecision: {
          decision: 'approve',
          flags: [],
          automatedDecision: true,
          appealable: false,
        },
        reputationUpdates: [
          { userId: 'reviewer-1', scoreChange: 2 },
          { userId: 'reviewer-2', scoreChange: 1.5 },
        ],
        gamificationUpdates: [
          { userId: 'reviewer-1', achievements: ['quality_reviewer'] },
          { userId: 'reviewer-2', achievements: [] },
        ],
        overallDecision: 'approved',
        communityMetrics: {
          participationRate: 0.85,
          consensusLevel: 0.82,
          qualityScore: 8.2,
          communityTrust: 0.88,
          engagementLevel: 0.79,
        },
        agentCoordination: {
          agentsUsed: ['peer_review', 'moderation', 'reputation', 'gamification'],
          processingTime: 6800,
          coordinationEfficiency: 0.91,
          conflictResolution: false,
        },
        recommendations: [
          {
            category: 'content',
            recommendation: 'Content approved with high community confidence',
            priority: 'low',
            implementation: 'Automatic publication',
          },
        ],
        timestamp: '2024-01-01T00:00:00Z',
      };

      const { CommunityValidationTeam } = await import('../../../../hijraah-mas/src/agents/community-validation/community-validation-team.js');
      const mockTeam = new CommunityValidationTeam();
      (mockTeam.performCommunityValidation as Mock).mockResolvedValue(mockValidationResult);

      const params = {
        body: {
          validationRequest: {
            content: {
              contentId: 'content-456',
              submitterId: 'user-789',
              title: 'Express Entry Experience - 2024',
              content: 'My detailed experience with Express Entry application process...',
              contentType: 'experience',
              metadata: {
                country: 'Canada',
                visaType: 'Express Entry',
                language: 'en',
                tags: ['express-entry', 'canada', 'skilled-worker'],
              },
              sources: [
                {
                  type: 'personal',
                  description: 'Personal experience',
                  reliability: 0.8,
                },
              ],
            },
            reviewers: [
              {
                userId: 'reviewer-1',
                username: 'expert_reviewer',
                reputationScore: 85,
                trustLevel: 'gold',
                expertise: ['canada_immigration', 'express_entry'],
                languages: ['en'],
                countries: ['Canada'],
                availabilityStatus: 'available',
              },
              {
                userId: 'reviewer-2',
                username: 'community_helper',
                reputationScore: 72,
                trustLevel: 'silver',
                expertise: ['immigration_experience'],
                languages: ['en'],
                countries: ['Canada'],
                availabilityStatus: 'available',
              },
            ],
            validationContext: {
              urgency: 'medium',
              minimumReviews: 2,
              expertRequired: false,
              consensusThreshold: 0.7,
            },
          },
        },
      };

      const response = await validationEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.validationType).toBe('comprehensive');
      expect(response.data.validationId).toBe('validation-123');
      expect(response.data.decision).toBe('approved');
      expect(response.data.reviewSummary.totalReviews).toBe(2);
      expect(response.data.reviewSummary.consensusLevel).toBe(0.82);
      expect(response.data.moderationSummary.decision).toBe('approve');
      expect(response.data.reputationUpdates.reviewersAffected).toBe(2);
      expect(response.data.gamificationUpdates.profilesUpdated).toBe(2);
    });

    it('should perform quick validation for urgent content', async () => {
      const validationEndpoint = endpoints.find(e => e.path === '/api/v1/mas/community-validation');
      
      const mockQuickResult = {
        decision: 'approved',
        confidence: 0.85,
        flags: [],
        quickReviews: [
          {
            reviewerId: 'reviewer-1',
            score: 8.2,
            recommendation: 'approve',
          },
        ],
        processingTime: 2500,
      };

      const { CommunityValidationTeam } = await import('../../../../hijraah-mas/src/agents/community-validation/community-validation-team.js');
      const mockTeam = new CommunityValidationTeam();
      (mockTeam.performQuickValidation as Mock).mockResolvedValue(mockQuickResult);

      const params = {
        body: {
          validationRequest: {
            content: {
              contentId: 'urgent-content',
              submitterId: 'user-urgent',
              title: 'Urgent Policy Update',
              content: 'Critical policy change affecting applications...',
              contentType: 'policy_update',
            },
            reviewers: [
              {
                userId: 'reviewer-1',
                username: 'expert_reviewer',
                reputationScore: 95,
                trustLevel: 'expert',
                expertise: ['policy_analysis'],
                languages: ['en'],
                countries: ['Canada'],
                availabilityStatus: 'available',
              },
            ],
            validationContext: {
              urgency: 'critical',
              minimumReviews: 1,
            },
          },
        },
      };

      const response = await validationEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.validationType).toBe('quick');
      expect(response.data.decision).toBe('approved');
      expect(response.data.confidence).toBe(0.85);
      expect(response.data.quickReviews).toHaveLength(1);
      expect(response.data.processingTime).toBe(2500);
    });
  });

  describe('Agent Performance Monitoring Endpoint', () => {
    it('should retrieve comprehensive agent performance metrics', async () => {
      const performanceEndpoint = endpoints.find(e => e.path === '/api/v1/mas/agent-performance');
      expect(performanceEndpoint).toBeDefined();

      const { PolicyChangeDetectionTeam } = await import('../../../../hijraah-mas/src/agents/policy-change-detection/team.js');
      const mockTeam = new PolicyChangeDetectionTeam();
      (mockTeam.getTeamStatus as Mock).mockResolvedValue({
        status: 'operational',
        agents: {
          policyMonitor: {
            systemHealth: 'healthy',
            activeSources: 15,
            recentChanges: 3,
          },
        },
        capabilities: [
          'Real-time policy monitoring',
          'Impact assessment',
          'Trend analysis',
        ],
      });

      const params = {
        query: {
          timeframe: '24h',
          agents: ['all'],
          metrics: ['all'],
          includeDetails: true,
        },
      };

      const response = await performanceEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('systemOverview');
      expect(response.data).toHaveProperty('agentPerformance');
      expect(response.data).toHaveProperty('resourceUtilization');
      expect(response.data).toHaveProperty('trends');
      expect(response.data).toHaveProperty('alerts');

      expect(response.data.systemOverview.overallHealth).toBeGreaterThan(0.9);
      expect(response.data.agentPerformance).toHaveProperty('document');
      expect(response.data.agentPerformance).toHaveProperty('predictive');
      expect(response.data.agentPerformance).toHaveProperty('policy');
      expect(response.data.agentPerformance).toHaveProperty('community');

      expect(response.data.resourceUtilization).toHaveProperty('tokens');
      expect(response.data.trends).toHaveProperty('requestVolume');
      expect(response.data.requestParameters.timeframe).toBe('24h');
    });

    it('should filter performance data by specific agents', async () => {
      const performanceEndpoint = endpoints.find(e => e.path === '/api/v1/mas/agent-performance');
      
      const params = {
        query: {
          timeframe: '1h',
          agents: ['document', 'predictive'],
          metrics: ['processing_time', 'success_rate'],
          includeDetails: false,
        },
      };

      const response = await performanceEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(Object.keys(response.data.agentPerformance)).toEqual(['document', 'predictive']);
      expect(response.data.requestParameters.agents).toEqual(['document', 'predictive']);
      expect(response.data.requestParameters.metrics).toEqual(['processing_time', 'success_rate']);
    });
  });

  describe('Error Handling', () => {
    it('should handle MAS agent initialization errors', async () => {
      // Mock agent constructor to throw error
      const { MultiModalDocumentTeam } = await import('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js');
      vi.mocked(MultiModalDocumentTeam).mockImplementation(() => {
        throw new Error('Agent initialization failed');
      });

      // This should be handled gracefully by the endpoint
      expect(() => createEnhancedMasEndpoints(mockFirecrawlService)).not.toThrow();
    });

    it('should handle agent processing timeouts', async () => {
      const documentEndpoint = endpoints.find(e => e.path === '/api/v1/mas/document-processing');
      
      const { MultiModalDocumentTeam } = await import('../../../../hijraah-mas/src/agents/document-processing/multi-modal-document-team.js');
      const mockTeam = new MultiModalDocumentTeam();
      (mockTeam.processDocument as Mock).mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Processing timeout')), 100)
        )
      );

      const params = {
        body: {
          documents: [{ id: 'doc-1', type: 'image', source: 'data' }],
        },
      };

      const response = await documentEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toContain('timeout');
    });

    it('should handle invalid request parameters', async () => {
      const analyticsEndpoint = endpoints.find(e => e.path === '/api/v1/mas/predictive-analytics');
      
      const params = {
        body: {
          // Missing required userProfile
          caseData: {
            caseType: 'skilled_worker',
            country: 'Canada',
            visaType: 'Express Entry',
          },
        },
      };

      // This would be caught by validation middleware in real implementation
      // For now, we test that the endpoint handles missing data gracefully
      const response = await analyticsEndpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });
  });
});