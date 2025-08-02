/**
 * Tests for MAS-Enhanced Webhook Endpoints
 * 
 * Comprehensive test suite for webhook enhancements with Multi-Agent System integration
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createMASEnhancedWebhookEndpoints } from '../endpoints/mas-enhanced-webhooks.js';
import type { WebhookService } from '../services/webhook-service.js';
import type { RequestContext, WebhookConfig } from '../types.js';

// Mock dependencies
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
}));

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => 'mocked-model'),
}));

vi.mock('../../../hijraah-mas/src/agents/policy-change-detection/team.js', () => ({
  PolicyChangeDetectionTeam: vi.fn(() => ({
    processPolicyChange: vi.fn(),
    getTeamStatus: vi.fn(),
    handleEmergencyPolicyChange: vi.fn(),
  })),
}));

vi.mock('../../../hijraah-mas/src/agents/predictive-analytics/predictive-analytics-team.js', () => ({
  PredictiveAnalyticsTeam: vi.fn(() => ({
    performComprehensiveAnalysis: vi.fn(),
    performQuickAnalysis: vi.fn(),
    updateAnalysis: vi.fn(),
  })),
}));

describe('MAS-Enhanced Webhook Endpoints', () => {
  let mockWebhookService: WebhookService;
  let mockContext: RequestContext;
  let endpoints: ReturnType<typeof createMASEnhancedWebhookEndpoints>;

  beforeEach(() => {
    // Mock webhook service
    mockWebhookService = {
      register: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      trigger: vi.fn(),
      getDeliveryStatus: vi.fn(),
      retry: vi.fn(),
    } as any;

    // Mock request context
    mockContext = {
      auth: { userId: 'test-user-123' },
      timestamp: new Date('2024-01-01T00:00:00Z'),
      requestId: 'test-request-123',
    } as RequestContext;

    // Create endpoints
    endpoints = createMASEnhancedWebhookEndpoints(mockWebhookService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/webhooks/mas-enhanced', () => {
    it('should register MAS-enhanced webhook successfully', async () => {
      // Mock AI validation
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          isValid: true,
          validationScore: 0.95,
          issues: [],
          recommendations: ['Consider enabling comprehensive enrichment'],
          estimatedPerformanceImpact: 'low',
        },
      });

      // Mock webhook service
      (mockWebhookService.register as any).mockResolvedValue('webhook-123');

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-enhanced' && e.method === 'POST'
      );

      const params = {
        body: {
          url: 'https://example.com/webhook',
          events: ['policy.changed', 'mas.analysis.completed'],
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: true,
            enableAnalyticsInsights: true,
            confidenceThreshold: 0.8,
            enrichmentLevel: 'detailed',
            routingStrategy: 'hybrid',
          },
          filters: {
            countries: ['US', 'CA'],
            agentTypes: ['policy-detection', 'predictive-analytics'],
          },
          secret: 'test-secret-12345678',
        },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.id).toBe('webhook-123');
      expect(response.data.masFeatures).toEqual({
        intelligentRouting: true,
        payloadEnrichment: true,
        analyticsInsights: true,
      });
      expect(mockWebhookService.register).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://example.com/webhook',
          events: ['policy.changed', 'mas.analysis.completed'],
          filters: expect.objectContaining({
            countries: ['US', 'CA'],
            agentTypes: ['policy-detection', 'predictive-analytics'],
            masEnhancements: params.body.masEnhancements,
          }),
          headers: expect.objectContaining({
            'X-MAS-Enhanced': 'true',
            'X-MAS-Version': '1.0.0',
          }),
        })
      );
    });

    it('should reject invalid webhook configuration', async () => {
      // Mock AI validation failure
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          isValid: false,
          validationScore: 0.3,
          issues: [
            {
              type: 'error',
              message: 'URL is not accessible',
              suggestion: 'Check URL accessibility and SSL certificate',
            },
          ],
          recommendations: ['Fix URL accessibility issues'],
          estimatedPerformanceImpact: 'high',
        },
      });

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-enhanced' && e.method === 'POST'
      );

      const params = {
        body: {
          url: 'https://invalid-url.example.com/webhook',
          events: ['policy.changed'],
          masEnhancements: {
            enableIntelligentRouting: true,
          },
        },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toBe('Webhook configuration validation failed');
      expect(response.data.validationResult.isValid).toBe(false);
      expect(mockWebhookService.register).not.toHaveBeenCalled();
    });

    it('should handle MAS enhancement configuration validation', async () => {
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          isValid: true,
          validationScore: 0.85,
          issues: [
            {
              type: 'warning',
              message: 'High enrichment level may impact performance',
              suggestion: 'Consider using detailed level for better performance',
            },
          ],
          recommendations: ['Monitor performance with comprehensive enrichment'],
          estimatedPerformanceImpact: 'medium',
        },
      });

      (mockWebhookService.register as any).mockResolvedValue('webhook-456');

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-enhanced' && e.method === 'POST'
      );

      const params = {
        body: {
          url: 'https://example.com/webhook',
          events: ['mas.analysis.completed'],
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: true,
            enableAnalyticsInsights: true,
            confidenceThreshold: 0.9,
            enrichmentLevel: 'comprehensive',
            routingStrategy: 'relevance',
          },
        },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.validationResult.issues).toHaveLength(1);
      expect(response.data.validationResult.issues[0].type).toBe('warning');
    });
  });

  describe('GET /api/v1/webhooks/:id/mas-analytics', () => {
    it('should return comprehensive MAS analytics', async () => {
      const mockWebhook: WebhookConfig = {
        id: 'webhook-123',
        userId: 'test-user-123',
        url: 'https://example.com/webhook',
        events: ['policy.changed', 'mas.analysis.completed'],
        filters: {
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: true,
            enableAnalyticsInsights: true,
          },
        },
        headers: {},
        isActive: true,
        retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
        createdAt: '2024-01-01T00:00:00Z',
      };

      const mockDeliveries = [
        {
          id: 'delivery-1',
          webhookId: 'webhook-123',
          eventId: 'event-1',
          status: 'delivered',
          attempts: 1,
          responseStatus: 200,
          createdAt: '2024-01-01T01:00:00Z',
          metadata: { masRouting: true, masEnrichment: true },
        },
        {
          id: 'delivery-2',
          webhookId: 'webhook-123',
          eventId: 'event-2',
          status: 'failed',
          attempts: 2,
          responseStatus: 500,
          createdAt: '2024-01-01T02:00:00Z',
          metadata: { masRouting: true },
        },
      ];

      (mockWebhookService.list as any).mockResolvedValue([mockWebhook]);
      (mockWebhookService.getDeliveryStatus as any).mockResolvedValue(mockDeliveries);

      // Mock AI analytics
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          deliveryPatterns: {
            peakHours: [9, 14, 18],
            averageLatency: 250,
            errorPatterns: ['HTTP 500 errors during peak hours'],
          },
          performanceInsights: {
            optimizationOpportunities: ['Implement request batching', 'Add response caching'],
            bottlenecks: ['High payload enrichment processing time'],
            recommendedChanges: ['Reduce enrichment level during peak hours'],
          },
          masUtilization: {
            intelligentRoutingEffectiveness: 0.85,
            payloadEnrichmentValue: 0.78,
            agentInsightQuality: 0.92,
          },
          recommendations: [
            {
              category: 'Performance',
              priority: 'medium',
              action: 'Optimize payload enrichment',
              expectedImpact: '15% faster delivery times',
            },
          ],
        },
      });

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-analytics' && e.method === 'GET'
      );

      const params = {
        params: { id: 'webhook-123' },
        query: { timeRange: '24h', includeAgentInsights: true },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.webhookId).toBe('webhook-123');
      expect(response.data.summary.totalDeliveries).toBe(2);
      expect(response.data.agentInsights).toBeDefined();
      expect(response.data.agentInsights.masUtilization.intelligentRoutingEffectiveness).toBe(0.85);
      expect(response.data.recommendations).toHaveLength(1);
    });

    it('should handle webhook not found', async () => {
      (mockWebhookService.list as any).mockResolvedValue([]);

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-analytics' && e.method === 'GET'
      );

      const params = {
        params: { id: 'nonexistent-webhook' },
        query: {},
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toBe('Webhook not found');
    });
  });

  describe('POST /api/v1/webhooks/:id/mas-test', () => {
    it('should perform basic MAS test successfully', async () => {
      const mockWebhook: WebhookConfig = {
        id: 'webhook-123',
        userId: 'test-user-123',
        url: 'https://example.com/webhook',
        events: ['webhook.test'],
        filters: {
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: false,
            enableAnalyticsInsights: true,
          },
        },
        headers: {},
        isActive: true,
        retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
        createdAt: '2024-01-01T00:00:00Z',
      };

      (mockWebhookService.list as any).mockResolvedValue([mockWebhook]);
      (mockWebhookService.trigger as any).mockResolvedValue(undefined);

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-test' && e.method === 'POST'
      );

      const params = {
        params: { id: 'webhook-123' },
        body: { testType: 'basic', validateResponse: false },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.webhookId).toBe('webhook-123');
      expect(response.data.testType).toBe('basic');
      expect(response.data.testEvent).toBeDefined();
      expect(mockWebhookService.trigger).toHaveBeenCalled();
    });

    it('should perform policy-change test with MAS insights', async () => {
      const mockWebhook: WebhookConfig = {
        id: 'webhook-123',
        userId: 'test-user-123',
        url: 'https://example.com/webhook',
        events: ['policy.changed'],
        filters: {
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: true,
            enableAnalyticsInsights: true,
          },
        },
        headers: {},
        isActive: true,
        retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
        createdAt: '2024-01-01T00:00:00Z',
      };

      (mockWebhookService.list as any).mockResolvedValue([mockWebhook]);
      (mockWebhookService.trigger as any).mockResolvedValue(undefined);

      // Mock policy team response
      const mockPolicyTeam = {
        processPolicyChange: vi.fn().mockResolvedValue({
          status: 'processing_complete',
          results: {
            detectedChanges: 1,
            impactAssessments: 1,
            notificationsGenerated: 1,
          },
          confidence: 0.89,
        }),
      };

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-test' && e.method === 'POST'
      );

      const params = {
        params: { id: 'webhook-123' },
        body: { testType: 'policy-change', validateResponse: false },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.testType).toBe('policy-change');
      expect(response.data.masInsights).toBeDefined();
      expect(response.data.masInsights.type).toBe('policy-detection');
    });

    it('should perform predictive-analysis test with MAS insights', async () => {
      const mockWebhook: WebhookConfig = {
        id: 'webhook-123',
        userId: 'test-user-123',
        url: 'https://example.com/webhook',
        events: ['mas.analysis.completed'],
        filters: {
          masEnhancements: {
            enableIntelligentRouting: true,
            enablePayloadEnrichment: true,
            enableAnalyticsInsights: true,
          },
        },
        headers: {},
        isActive: true,
        retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
        createdAt: '2024-01-01T00:00:00Z',
      };

      (mockWebhookService.list as any).mockResolvedValue([mockWebhook]);
      (mockWebhookService.trigger as any).mockResolvedValue(undefined);

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-test' && e.method === 'POST'
      );

      const params = {
        params: { id: 'webhook-123' },
        body: { testType: 'predictive-analysis', validateResponse: false },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.testType).toBe('predictive-analysis');
      expect(response.data.masInsights).toBeDefined();
      expect(response.data.masInsights.type).toBe('predictive-analytics');
    });

    it('should validate webhook response when requested', async () => {
      const mockWebhook: WebhookConfig = {
        id: 'webhook-123',
        userId: 'test-user-123',
        url: 'https://example.com/webhook',
        events: ['webhook.test'],
        filters: {},
        headers: {},
        isActive: true,
        retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
        createdAt: '2024-01-01T00:00:00Z',
      };

      const mockDelivery = {
        id: 'delivery-123',
        eventId: 'test-event-123',
        status: 'delivered',
        responseStatus: 200,
        lastAttemptAt: '2024-01-01T00:01:00Z',
        error: null,
      };

      (mockWebhookService.list as any).mockResolvedValue([mockWebhook]);
      (mockWebhookService.trigger as any).mockResolvedValue(undefined);
      (mockWebhookService.getDeliveryStatus as any).mockResolvedValue([mockDelivery]);

      // Mock response validation
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          isSuccessful: true,
          responseTime: 150,
          issues: [],
          recommendations: ['Consider implementing webhook signature validation'],
          masCompatibility: {
            supportsEnrichment: true,
            handlesComplexPayloads: true,
            responseQuality: 'good',
          },
        },
      });

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/:id/mas-test' && e.method === 'POST'
      );

      const params = {
        params: { id: 'webhook-123' },
        body: { testType: 'basic', validateResponse: true },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.responseValidation).toBeDefined();
      expect(response.data.responseValidation.isSuccessful).toBe(true);
      expect(response.data.responseValidation.masCompatibility.responseQuality).toBe('good');
    });
  });

  describe('GET /api/v1/webhooks/mas-performance', () => {
    it('should return MAS performance metrics', async () => {
      const mockWebhooks: WebhookConfig[] = [
        {
          id: 'webhook-1',
          userId: 'test-user-123',
          url: 'https://example.com/webhook1',
          events: ['policy.changed'],
          filters: {
            masEnhancements: {
              enableAnalyticsInsights: true,
              enableIntelligentRouting: true,
            },
          },
          headers: {},
          isActive: true,
          retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 'webhook-2',
          userId: 'test-user-123',
          url: 'https://example.com/webhook2',
          events: ['mas.analysis.completed'],
          filters: {
            masEnhancements: {
              enableAnalyticsInsights: true,
              enablePayloadEnrichment: true,
            },
          },
          headers: {},
          isActive: true,
          retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
          createdAt: '2024-01-01T00:00:00Z',
        },
      ];

      (mockWebhookService.list as any).mockResolvedValue(mockWebhooks);

      // Mock performance analysis
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          overallPerformance: {
            utilizationRate: 0.78,
            averageResponseTime: 320,
            successRate: 0.94,
            costEfficiency: 0.85,
          },
          agentBreakdown: {
            'policy-detection': {
              usage: 45,
              performance: 0.92,
              insights: ['High accuracy in policy change detection', 'Efficient routing decisions'],
            },
            'predictive-analytics': {
              usage: 32,
              performance: 0.88,
              insights: ['Good prediction accuracy', 'Moderate processing time'],
            },
          },
          optimizationOpportunities: [
            {
              area: 'Payload Enrichment',
              impact: 'medium',
              recommendation: 'Optimize enrichment algorithms for faster processing',
              estimatedImprovement: '20% faster enrichment',
            },
          ],
          scalingRecommendations: [
            {
              scenario: 'High traffic periods',
              recommendation: 'Implement agent load balancing',
              resourceRequirements: 'Additional compute resources for agent processing',
            },
          ],
          costAnalysis: {
            currentCost: '$150/month',
            projectedSavings: '$30/month with optimizations',
            roi: '20% improvement in cost efficiency',
          },
        },
      });

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-performance' && e.method === 'GET'
      );

      const params = {
        query: { timeRange: '24h', agentType: 'all' },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.webhookCount).toBe(2);
      expect(response.data.performanceInsights.overallPerformance.utilizationRate).toBe(0.78);
      expect(response.data.performanceInsights.agentBreakdown['policy-detection']).toBeDefined();
      expect(response.data.summary.totalWebhooks).toBe(2);
      expect(response.data.summary.topPerformingAgent).toBe('policy-detection');
    });

    it('should handle no MAS-enabled webhooks', async () => {
      const mockWebhooks: WebhookConfig[] = [
        {
          id: 'webhook-1',
          userId: 'test-user-123',
          url: 'https://example.com/webhook1',
          events: ['policy.changed'],
          filters: {}, // No MAS enhancements
          headers: {},
          isActive: true,
          retryConfig: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
          createdAt: '2024-01-01T00:00:00Z',
        },
      ];

      (mockWebhookService.list as any).mockResolvedValue(mockWebhooks);

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-performance' && e.method === 'GET'
      );

      const params = {
        query: { timeRange: '24h' },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(true);
      expect(response.data.webhooks).toBe(0);
      expect(response.data.performance).toBeNull();
      expect(response.data.message).toBe('No MAS-enabled webhooks found');
    });
  });

  describe('Error Handling', () => {
    it('should handle AI service errors gracefully', async () => {
      const { generateObject } = await import('ai');
      (generateObject as any).mockRejectedValue(new Error('AI service unavailable'));

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-enhanced' && e.method === 'POST'
      );

      const params = {
        body: {
          url: 'https://example.com/webhook',
          events: ['policy.changed'],
          masEnhancements: {
            enableIntelligentRouting: true,
          },
        },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toContain('AI service unavailable');
    });

    it('should handle webhook service errors', async () => {
      const { generateObject } = await import('ai');
      (generateObject as any).mockResolvedValue({
        object: {
          isValid: true,
          validationScore: 0.9,
          issues: [],
          recommendations: [],
          estimatedPerformanceImpact: 'low',
        },
      });

      (mockWebhookService.register as any).mockRejectedValue(new Error('Database connection failed'));

      const endpoint = endpoints.find(e => 
        e.path === '/api/v1/webhooks/mas-enhanced' && e.method === 'POST'
      );

      const params = {
        body: {
          url: 'https://example.com/webhook',
          events: ['policy.changed'],
          masEnhancements: {
            enableIntelligentRouting: true,
          },
        },
      };

      const response = await endpoint!.handler(mockContext, params);

      expect(response.success).toBe(false);
      expect(response.error).toContain('Database connection failed');
    });
  });
});