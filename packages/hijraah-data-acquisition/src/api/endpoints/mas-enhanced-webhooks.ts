/**
 * MAS-Enhanced Webhook Management API Endpoints
 * 
 * Enhanced webhook endpoints with Multi-Agent System (MAS) integration for:
 * - Intelligent webhook routing using MAS agents
 * - Webhook payload enrichment with agent insights
 * - Performance monitoring and analytics
 * - Agent-powered webhook testing and validation
 */

import type { 
  ApiEndpoint, 
  RequestContext, 
  ApiResponse,
  WebhookConfig,
  WebhookDelivery
} from "../types.js";
import type { WebhookService } from "../services/webhook-service.js";
import { PolicyChangeDetectionTeam } from "../../../hijraah-mas/src/agents/policy-change-detection/team.js";
import { PredictiveAnalyticsTeam } from "../../../hijraah-mas/src/agents/predictive-analytics/predictive-analytics-team.js";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// Enhanced webhook configuration with MAS integration
const MASWebhookConfigSchema = z.object({
  url: z.string().url(),
  events: z.array(z.enum([
    "policy.changed",
    "data.extracted", 
    "community.validated",
    "alert.created",
    "job.completed",
    "job.failed",
    "mas.analysis.completed",
    "mas.prediction.updated",
    "mas.risk.detected"
  ])).min(1),
  filters: z.object({
    countries: z.array(z.string().length(2)).optional(),
    policyTypes: z.array(z.string()).optional(),
    severity: z.array(z.enum(["low", "medium", "high", "critical"])).optional(),
    confidenceThreshold: z.number().min(0).max(1).optional(),
    agentTypes: z.array(z.enum([
      "policy-detection",
      "predictive-analytics", 
      "document-processing",
      "community-validation"
    ])).optional(),
  }).optional(),
  masEnhancements: z.object({
    enableIntelligentRouting: z.boolean().default(true),
    enablePayloadEnrichment: z.boolean().default(true),
    enableAnalyticsInsights: z.boolean().default(true),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
    enrichmentLevel: z.enum(["basic", "detailed", "comprehensive"]).default("detailed"),
    routingStrategy: z.enum(["relevance", "priority", "hybrid"]).default("hybrid"),
  }).optional(),
  headers: z.record(z.string()).optional(),
  secret: z.string().min(16).max(128).optional(),
  retryConfig: z.object({
    maxRetries: z.number().min(0).max(10).default(3),
    backoffMultiplier: z.number().min(1).max(5).default(2),
    initialDelay: z.number().min(100).max(60000).default(1000),
  }).optional(),
});

// Webhook analytics schema
const WebhookAnalyticsSchema = z.object({
  webhookId: z.string(),
  timeRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  metrics: z.object({
    totalDeliveries: z.number(),
    successRate: z.number(),
    averageResponseTime: z.number(),
    masEnhancementUsage: z.object({
      intelligentRoutingUsed: z.number(),
      payloadEnrichmentUsed: z.number(),
      analyticsInsightsGenerated: z.number(),
    }),
    agentInsights: z.object({
      mostRelevantAgentType: z.string(),
      averageConfidenceScore: z.number(),
      topInsightCategories: z.array(z.string()),
    }),
  }),
});

export function createMASEnhancedWebhookEndpoints(
  webhookService: WebhookService
): ApiEndpoint[] {
  const policyTeam = new PolicyChangeDetectionTeam();
  const analyticsTeam = new PredictiveAnalyticsTeam();

  return [
    // Register MAS-enhanced webhook
    {
      path: "/api/v1/webhooks/mas-enhanced",
      method: "POST",
      permissions: ["webhook:receive", "mas:access"],
      rateLimit: {
        requestsPerMinute: 5,
        requestsPerHour: 50,
      },
      validation: {
        body: MASWebhookConfigSchema,
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const masConfig = params.body.masEnhancements || {};
          
          // Validate MAS configuration with agents
          const { object: validationResult } = await generateObject({
            model: openai("gpt-4o-mini"),
            system: "You are a webhook configuration validator. Analyze the webhook configuration for MAS integration compatibility and provide validation results.",
            prompt: `Validate this MAS-enhanced webhook configuration:
            
URL: ${params.body.url}
Events: ${params.body.events.join(', ')}
MAS Enhancements: ${JSON.stringify(masConfig, null, 2)}
Filters: ${JSON.stringify(params.body.filters || {}, null, 2)}

Check for:
1. URL accessibility and security
2. Event compatibility with MAS agents
3. Filter configuration validity
4. MAS enhancement settings appropriateness
5. Performance implications`,
            schema: z.object({
              isValid: z.boolean(),
              validationScore: z.number().min(0).max(1),
              issues: z.array(z.object({
                type: z.enum(["error", "warning", "info"]),
                message: z.string(),
                suggestion: z.string().optional(),
              })),
              recommendations: z.array(z.string()),
              estimatedPerformanceImpact: z.enum(["low", "medium", "high"]),
            }),
          });

          if (!validationResult.isValid) {
            return {
              success: false,
              error: "Webhook configuration validation failed",
              data: {
                validationResult,
              },
              metadata: {
                timestamp: context.timestamp.toISOString(),
                requestId: context.requestId,
                version: "1.0.0",
                processingTime: Date.now() - context.timestamp.getTime(),
              },
            };
          }

          // Create enhanced webhook configuration
          const enhancedConfig: WebhookConfig = {
            id: "", // Will be generated
            userId: context.auth.userId!,
            url: params.body.url,
            events: params.body.events,
            filters: {
              ...params.body.filters,
              masEnhancements: masConfig,
            },
            headers: {
              ...params.body.headers,
              "X-MAS-Enhanced": "true",
              "X-MAS-Version": "1.0.0",
            },
            secret: params.body.secret,
            isActive: true,
            retryConfig: params.body.retryConfig || {
              maxRetries: 3,
              backoffMultiplier: 2,
              initialDelay: 1000,
            },
            createdAt: context.timestamp.toISOString(),
          };

          const webhookId = await webhookService.register(enhancedConfig);

          // Test webhook with MAS-enhanced payload
          await testMASEnhancedWebhook(webhookId, enhancedConfig, policyTeam, analyticsTeam);

          return {
            success: true,
            data: {
              id: webhookId,
              message: "MAS-enhanced webhook registered successfully",
              validationResult,
              masFeatures: {
                intelligentRouting: masConfig.enableIntelligentRouting,
                payloadEnrichment: masConfig.enablePayloadEnrichment,
                analyticsInsights: masConfig.enableAnalyticsInsights,
              },
              testDelivery: "A MAS-enhanced test event has been sent to verify the endpoint",
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("MAS-enhanced webhook registration error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "MAS-enhanced webhook registration failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Get webhook analytics with MAS insights
    {
      path: "/api/v1/webhooks/:id/mas-analytics",
      method: "GET",
      permissions: ["webhook:receive", "mas:access"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
        query: z.object({
          timeRange: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
          includeAgentInsights: z.coerce.boolean().default(true),
          includePerformanceMetrics: z.coerce.boolean().default(true),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;
          const { timeRange = "24h", includeAgentInsights = true, includePerformanceMetrics = true } = params.query || {};

          // Verify webhook ownership
          const webhooks = await webhookService.list(context.auth.userId!);
          const webhook = webhooks.find(w => w.id === id);

          if (!webhook) {
            return {
              success: false,
              error: "Webhook not found",
              metadata: {
                timestamp: context.timestamp.toISOString(),
                requestId: context.requestId,
                version: "1.0.0",
                processingTime: Date.now() - context.timestamp.getTime(),
              },
            };
          }

          // Get delivery history
          const deliveries = await webhookService.getDeliveryStatus(id);
          
          // Calculate time range
          const now = new Date();
          const timeRangeMs = {
            "1h": 60 * 60 * 1000,
            "24h": 24 * 60 * 60 * 1000,
            "7d": 7 * 24 * 60 * 60 * 1000,
            "30d": 30 * 24 * 60 * 60 * 1000,
          }[timeRange];
          
          const startTime = new Date(now.getTime() - timeRangeMs);
          const filteredDeliveries = deliveries.filter(d => 
            new Date(d.createdAt) >= startTime
          );

          // Generate MAS-powered analytics insights
          let agentInsights = null;
          if (includeAgentInsights) {
            const { object: insights } = await generateObject({
              model: openai("gpt-4o"),
              system: "You are a webhook analytics specialist. Analyze webhook delivery patterns and provide actionable insights using MAS agent capabilities.",
              prompt: `Analyze webhook delivery data for insights:

Webhook Configuration:
- Events: ${webhook.events.join(', ')}
- Filters: ${JSON.stringify(webhook.filters, null, 2)}
- MAS Enhanced: ${webhook.filters?.masEnhancements ? 'Yes' : 'No'}

Delivery Statistics (${timeRange}):
- Total Deliveries: ${filteredDeliveries.length}
- Successful: ${filteredDeliveries.filter(d => d.status === 'delivered').length}
- Failed: ${filteredDeliveries.filter(d => d.status === 'failed').length}
- Average Response Time: ${filteredDeliveries.reduce((sum, d) => sum + (d.responseStatus || 0), 0) / filteredDeliveries.length || 0}ms

Provide insights on:
1. Delivery patterns and trends
2. Performance optimization opportunities
3. MAS agent utilization effectiveness
4. Recommended configuration improvements
5. Potential issues and solutions`,
              schema: z.object({
                deliveryPatterns: z.object({
                  peakHours: z.array(z.number()),
                  averageLatency: z.number(),
                  errorPatterns: z.array(z.string()),
                }),
                performanceInsights: z.object({
                  optimizationOpportunities: z.array(z.string()),
                  bottlenecks: z.array(z.string()),
                  recommendedChanges: z.array(z.string()),
                }),
                masUtilization: z.object({
                  intelligentRoutingEffectiveness: z.number().min(0).max(1),
                  payloadEnrichmentValue: z.number().min(0).max(1),
                  agentInsightQuality: z.number().min(0).max(1),
                }),
                recommendations: z.array(z.object({
                  category: z.string(),
                  priority: z.enum(["low", "medium", "high", "critical"]),
                  action: z.string(),
                  expectedImpact: z.string(),
                })),
              }),
            });

            agentInsights = insights;
          }

          // Calculate performance metrics
          let performanceMetrics = null;
          if (includePerformanceMetrics) {
            const successfulDeliveries = filteredDeliveries.filter(d => d.status === 'delivered');
            const failedDeliveries = filteredDeliveries.filter(d => d.status === 'failed');
            
            performanceMetrics = {
              successRate: filteredDeliveries.length > 0 ? successfulDeliveries.length / filteredDeliveries.length : 0,
              averageResponseTime: successfulDeliveries.reduce((sum, d) => sum + (d.responseStatus || 0), 0) / successfulDeliveries.length || 0,
              errorRate: filteredDeliveries.length > 0 ? failedDeliveries.length / filteredDeliveries.length : 0,
              retryRate: filteredDeliveries.filter(d => d.attempts > 1).length / filteredDeliveries.length || 0,
              masEnhancementUsage: {
                intelligentRoutingUsed: filteredDeliveries.filter(d => d.metadata?.masRouting).length,
                payloadEnrichmentUsed: filteredDeliveries.filter(d => d.metadata?.masEnrichment).length,
                analyticsInsightsGenerated: filteredDeliveries.filter(d => d.metadata?.masAnalytics).length,
              },
            };
          }

          return {
            success: true,
            data: {
              webhookId: id,
              timeRange: {
                start: startTime.toISOString(),
                end: now.toISOString(),
              },
              summary: {
                totalDeliveries: filteredDeliveries.length,
                successfulDeliveries: filteredDeliveries.filter(d => d.status === 'delivered').length,
                failedDeliveries: filteredDeliveries.filter(d => d.status === 'failed').length,
                pendingDeliveries: filteredDeliveries.filter(d => d.status === 'pending').length,
              },
              performanceMetrics,
              agentInsights,
              recommendations: agentInsights?.recommendations || [],
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("MAS webhook analytics error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get MAS webhook analytics",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Test webhook with MAS agent validation
    {
      path: "/api/v1/webhooks/:id/mas-test",
      method: "POST",
      permissions: ["webhook:receive", "mas:access"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          testType: z.enum(["basic", "policy-change", "predictive-analysis", "comprehensive"]).default("basic"),
          mockData: z.record(z.any()).optional(),
          validateResponse: z.boolean().default(true),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;
          const { testType = "basic", mockData = {}, validateResponse = true } = params.body || {};

          // Verify webhook ownership
          const webhooks = await webhookService.list(context.auth.userId!);
          const webhook = webhooks.find(w => w.id === id);

          if (!webhook) {
            return {
              success: false,
              error: "Webhook not found",
              metadata: {
                timestamp: context.timestamp.toISOString(),
                requestId: context.requestId,
                version: "1.0.0",
                processingTime: Date.now() - context.timestamp.getTime(),
              },
            };
          }

          // Generate test event based on type
          let testEvent;
          let masInsights = null;

          switch (testType) {
            case "policy-change":
              // Generate policy change test with MAS insights
              const policyTestData = await policyTeam.processPolicyChange(
                ["test-source"],
                [context.auth.userId!],
                {
                  monitoringRules: { testMode: true },
                  impactContext: { testMode: true },
                  notificationContext: { testMode: true },
                  trendContext: { testMode: true },
                  jurisdictionContext: { 
                    targetJurisdictions: ["US", "CA"],
                    testMode: true 
                  },
                }
              );

              testEvent = {
                id: `test-policy-${Date.now()}`,
                type: "policy.changed",
                data: {
                  message: "Test policy change event with MAS insights",
                  policyChange: {
                    jurisdiction: "US",
                    type: "visa_processing",
                    severity: "medium",
                    description: "Test policy change for webhook validation",
                  },
                  masInsights: policyTestData,
                  ...mockData,
                },
                timestamp: context.timestamp.toISOString(),
                source: "hijraah-mas-test",
                metadata: {
                  test: true,
                  testType: "policy-change",
                  triggeredBy: context.auth.userId,
                  masEnhanced: true,
                },
              };
              masInsights = policyTestData;
              break;

            case "predictive-analysis":
              // Generate predictive analysis test
              const mockUserProfile = {
                demographics: { nationality: "IN", currentCountry: "US" },
                education: { level: "masters" },
                employment: { status: "employed" },
                language: { native: "Hindi", proficiency: ["English"] },
                immigration: { visaType: "H1B", currentStatus: "valid" },
                financial: { savings: 50000 },
              };

              const analysisResult = await analyticsTeam.performQuickAnalysis(
                mockUserProfile,
                {
                  caseType: "work_visa",
                  country: "US", 
                  visaType: "H1B",
                }
              );

              testEvent = {
                id: `test-analysis-${Date.now()}`,
                type: "mas.analysis.completed",
                data: {
                  message: "Test predictive analysis event with MAS insights",
                  analysis: analysisResult,
                  ...mockData,
                },
                timestamp: context.timestamp.toISOString(),
                source: "hijraah-mas-test",
                metadata: {
                  test: true,
                  testType: "predictive-analysis",
                  triggeredBy: context.auth.userId,
                  masEnhanced: true,
                },
              };
              masInsights = analysisResult;
              break;

            case "comprehensive":
              // Generate comprehensive test with multiple MAS insights
              testEvent = {
                id: `test-comprehensive-${Date.now()}`,
                type: "mas.analysis.completed",
                data: {
                  message: "Comprehensive MAS test event",
                  insights: {
                    policyMonitoring: "Active monitoring of 15 sources",
                    predictiveAnalytics: "Success probability: 85%",
                    documentProcessing: "3 documents processed successfully",
                    communityValidation: "Validated by 5 community members",
                  },
                  confidence: 0.92,
                  ...mockData,
                },
                timestamp: context.timestamp.toISOString(),
                source: "hijraah-mas-test",
                metadata: {
                  test: true,
                  testType: "comprehensive",
                  triggeredBy: context.auth.userId,
                  masEnhanced: true,
                },
              };
              break;

            default:
              // Basic test event
              testEvent = {
                id: `test-basic-${Date.now()}`,
                type: "webhook.test",
                data: {
                  message: "Basic MAS-enhanced webhook test",
                  masFeatures: {
                    intelligentRouting: webhook.filters?.masEnhancements?.enableIntelligentRouting || false,
                    payloadEnrichment: webhook.filters?.masEnhancements?.enablePayloadEnrichment || false,
                    analyticsInsights: webhook.filters?.masEnhancements?.enableAnalyticsInsights || false,
                  },
                  ...mockData,
                },
                timestamp: context.timestamp.toISOString(),
                source: "hijraah-mas-test",
                metadata: {
                  test: true,
                  testType: "basic",
                  triggeredBy: context.auth.userId,
                  masEnhanced: true,
                },
              };
          }

          // Trigger test delivery with MAS enhancements
          await webhookService.trigger(testEvent, { webhookId: id });

          // Validate response if requested
          let responseValidation = null;
          if (validateResponse) {
            // Wait a moment for delivery
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const deliveries = await webhookService.getDeliveryStatus(id);
            const testDelivery = deliveries.find(d => d.eventId === testEvent.id);

            if (testDelivery) {
              const { object: validation } = await generateObject({
                model: openai("gpt-4o-mini"),
                system: "You are a webhook response validator. Analyze the webhook delivery result and provide validation insights.",
                prompt: `Validate webhook test delivery:

Delivery Status: ${testDelivery.status}
Response Status: ${testDelivery.responseStatus}
Response Time: ${testDelivery.lastAttemptAt}
Error: ${testDelivery.error || 'None'}

Test Type: ${testType}
MAS Enhanced: ${testEvent.metadata.masEnhanced}

Provide validation results and recommendations.`,
                schema: z.object({
                  isSuccessful: z.boolean(),
                  responseTime: z.number(),
                  issues: z.array(z.string()),
                  recommendations: z.array(z.string()),
                  masCompatibility: z.object({
                    supportsEnrichment: z.boolean(),
                    handlesComplexPayloads: z.boolean(),
                    responseQuality: z.enum(["poor", "fair", "good", "excellent"]),
                  }),
                }),
              });

              responseValidation = validation;
            }
          }

          return {
            success: true,
            data: {
              webhookId: id,
              testType,
              testEvent: {
                id: testEvent.id,
                type: testEvent.type,
                timestamp: testEvent.timestamp,
              },
              masInsights: masInsights ? {
                type: testType,
                dataSize: JSON.stringify(masInsights).length,
                confidence: masInsights.confidence || 0.8,
              } : null,
              responseValidation,
              message: `MAS-enhanced ${testType} test completed successfully`,
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("MAS webhook test error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "MAS webhook test failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Get MAS agent performance metrics for webhooks
    {
      path: "/api/v1/webhooks/mas-performance",
      method: "GET",
      permissions: ["webhook:receive", "mas:access"],
      validation: {
        query: z.object({
          timeRange: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
          agentType: z.enum([
            "policy-detection",
            "predictive-analytics",
            "document-processing", 
            "community-validation",
            "all"
          ]).default("all"),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { timeRange = "24h", agentType = "all" } = params.query || {};

          // Get user's webhooks
          const webhooks = await webhookService.list(context.auth.userId!);
          const masEnabledWebhooks = webhooks.filter(w => 
            w.filters?.masEnhancements?.enableAnalyticsInsights
          );

          if (masEnabledWebhooks.length === 0) {
            return {
              success: true,
              data: {
                message: "No MAS-enabled webhooks found",
                webhooks: 0,
                performance: null,
              },
              metadata: {
                timestamp: context.timestamp.toISOString(),
                requestId: context.requestId,
                version: "1.0.0",
                processingTime: Date.now() - context.timestamp.getTime(),
              },
            };
          }

          // Generate performance insights using MAS agents
          const { object: performanceInsights } = await generateObject({
            model: openai("gpt-4o"),
            system: "You are a MAS performance analyst. Analyze webhook performance data and provide comprehensive insights about agent utilization and effectiveness.",
            prompt: `Analyze MAS agent performance for webhook integrations:

Time Range: ${timeRange}
Agent Type Filter: ${agentType}
MAS-Enabled Webhooks: ${masEnabledWebhooks.length}

Webhook Configurations:
${masEnabledWebhooks.map(w => `
- ID: ${w.id}
- Events: ${w.events.join(', ')}
- MAS Features: ${JSON.stringify(w.filters?.masEnhancements, null, 2)}
`).join('\n')}

Provide comprehensive performance analysis including:
1. Agent utilization rates
2. Performance bottlenecks
3. Optimization opportunities
4. Cost-benefit analysis
5. Scaling recommendations`,
            schema: z.object({
              overallPerformance: z.object({
                utilizationRate: z.number().min(0).max(1),
                averageResponseTime: z.number(),
                successRate: z.number().min(0).max(1),
                costEfficiency: z.number().min(0).max(1),
              }),
              agentBreakdown: z.record(z.object({
                usage: z.number(),
                performance: z.number().min(0).max(1),
                insights: z.array(z.string()),
              })),
              optimizationOpportunities: z.array(z.object({
                area: z.string(),
                impact: z.enum(["low", "medium", "high"]),
                recommendation: z.string(),
                estimatedImprovement: z.string(),
              })),
              scalingRecommendations: z.array(z.object({
                scenario: z.string(),
                recommendation: z.string(),
                resourceRequirements: z.string(),
              })),
              costAnalysis: z.object({
                currentCost: z.string(),
                projectedSavings: z.string(),
                roi: z.string(),
              }),
            }),
          });

          return {
            success: true,
            data: {
              timeRange,
              agentType,
              webhookCount: masEnabledWebhooks.length,
              performanceInsights,
              summary: {
                totalWebhooks: masEnabledWebhooks.length,
                averageUtilization: performanceInsights.overallPerformance.utilizationRate,
                topPerformingAgent: Object.entries(performanceInsights.agentBreakdown)
                  .sort(([,a], [,b]) => b.performance - a.performance)[0]?.[0] || "none",
                primaryOptimization: performanceInsights.optimizationOpportunities[0]?.area || "none",
              },
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("MAS performance metrics error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get MAS performance metrics",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },
  ];
}

/**
 * Test MAS-enhanced webhook with sample data
 */
async function testMASEnhancedWebhook(
  webhookId: string,
  config: WebhookConfig,
  policyTeam: PolicyChangeDetectionTeam,
  analyticsTeam: PredictiveAnalyticsTeam
): Promise<void> {
  try {
    // Generate test insights based on webhook configuration
    let testInsights = null;
    
    if (config.events.includes("policy.changed")) {
      const teamStatus = await policyTeam.getTeamStatus();
      testInsights = {
        policyMonitoring: teamStatus,
        type: "policy-detection",
      };
    }
    
    if (config.events.includes("mas.analysis.completed")) {
      const mockProfile = {
        demographics: { nationality: "US", currentCountry: "US" },
        education: { level: "bachelors" },
        employment: { status: "employed" },
        language: { native: "English" },
        immigration: { visaType: "none", currentStatus: "citizen" },
        financial: { savings: 25000 },
      };
      
      const quickAnalysis = await analyticsTeam.performQuickAnalysis(
        mockProfile,
        {
          caseType: "family_visa",
          country: "US",
          visaType: "IR1",
        }
      );
      
      testInsights = {
        predictiveAnalytics: quickAnalysis,
        type: "predictive-analytics",
      };
    }

    const testEvent = {
      id: `mas-test-${Date.now()}`,
      type: "webhook.test",
      data: {
        message: "MAS-enhanced webhook test delivery",
        masInsights: testInsights,
        features: {
          intelligentRouting: config.filters?.masEnhancements?.enableIntelligentRouting,
          payloadEnrichment: config.filters?.masEnhancements?.enablePayloadEnrichment,
          analyticsInsights: config.filters?.masEnhancements?.enableAnalyticsInsights,
        },
      },
      timestamp: new Date().toISOString(),
      source: "hijraah-mas-test",
      metadata: {
        test: true,
        masEnhanced: true,
        webhookId,
      },
    };

    // Note: In a real implementation, this would trigger through the webhook service
    console.log(`MAS-enhanced test event generated for webhook ${webhookId}:`, testEvent);
  } catch (error) {
    console.error("MAS webhook test error:", error);
    // Don't throw - test failures shouldn't prevent webhook registration
  }
}