/**
 * Webhook Management API Endpoints
 * 
 * RESTful endpoints for webhook registration, management, and delivery tracking
 * with intelligent notification routing and retry mechanisms.
 */

import type { 
  ApiEndpoint, 
  RequestContext, 
  ApiResponse,
  WebhookConfig,
  WebhookDelivery
} from "../types.js";
import type { WebhookService } from "../services/webhook-service.js";
import { z } from "zod";

export function createWebhookEndpoints(
  webhookService: WebhookService
): ApiEndpoint[] {
  return [
    // Register webhook
    {
      path: "/api/v1/webhooks",
      method: "POST",
      permissions: ["webhook:receive"],
      rateLimit: {
        requestsPerMinute: 5,
        requestsPerHour: 50,
      },
      validation: {
        body: z.object({
          url: z.string().url(),
          events: z.array(z.enum([
            "policy.changed",
            "data.extracted",
            "community.validated",
            "alert.created",
            "job.completed",
            "job.failed"
          ])).min(1),
          filters: z.object({
            countries: z.array(z.string().length(2)).optional(),
            policyTypes: z.array(z.string()).optional(),
            severity: z.array(z.enum(["low", "medium", "high", "critical"])).optional(),
          }).optional(),
          headers: z.record(z.string()).optional(),
          secret: z.string().min(16).max(128).optional(),
          retryConfig: z.object({
            maxRetries: z.number().min(0).max(10).default(3),
            backoffMultiplier: z.number().min(1).max(5).default(2),
            initialDelay: z.number().min(100).max(60000).default(1000),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const webhookConfig: WebhookConfig = {
            id: "", // Will be generated
            userId: context.auth.userId!,
            url: params.body.url,
            events: params.body.events,
            filters: params.body.filters,
            headers: params.body.headers,
            secret: params.body.secret,
            isActive: true,
            retryConfig: params.body.retryConfig || {
              maxRetries: 3,
              backoffMultiplier: 2,
              initialDelay: 1000,
            },
            createdAt: context.timestamp.toISOString(),
          };

          const webhookId = await webhookService.register(webhookConfig);

          return {
            success: true,
            data: {
              id: webhookId,
              message: "Webhook registered successfully",
              testDelivery: "A test event has been sent to verify the endpoint",
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook registration error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Webhook registration failed",
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

    // List webhooks
    {
      path: "/api/v1/webhooks",
      method: "GET",
      permissions: ["webhook:receive"],
      validation: {
        query: z.object({
          active: z.coerce.boolean().optional(),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const webhooks = await webhookService.list(context.auth.userId!);
          
          // Filter by active status if requested
          const filteredWebhooks = params.query?.active !== undefined
            ? webhooks.filter(w => w.isActive === params.query.active)
            : webhooks;

          return {
            success: true,
            data: {
              webhooks: filteredWebhooks.map(webhook => ({
                id: webhook.id,
                url: webhook.url,
                events: webhook.events,
                filters: webhook.filters,
                isActive: webhook.isActive,
                createdAt: webhook.createdAt,
                // Don't expose secret or headers for security
              })),
              total: filteredWebhooks.length,
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook list error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to list webhooks",
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

    // Get webhook by ID
    {
      path: "/api/v1/webhooks/:id",
      method: "GET",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const webhooks = await webhookService.list(context.auth.userId!);
          const webhook = webhooks.find(w => w.id === params.params.id);

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

          return {
            success: true,
            data: {
              id: webhook.id,
              url: webhook.url,
              events: webhook.events,
              filters: webhook.filters,
              isActive: webhook.isActive,
              retryConfig: webhook.retryConfig,
              createdAt: webhook.createdAt,
              // Don't expose secret or headers for security
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook get error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get webhook",
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

    // Update webhook
    {
      path: "/api/v1/webhooks/:id",
      method: "PUT",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          url: z.string().url().optional(),
          events: z.array(z.enum([
            "policy.changed",
            "data.extracted",
            "community.validated",
            "alert.created",
            "job.completed",
            "job.failed"
          ])).min(1).optional(),
          filters: z.object({
            countries: z.array(z.string().length(2)).optional(),
            policyTypes: z.array(z.string()).optional(),
            severity: z.array(z.enum(["low", "medium", "high", "critical"])).optional(),
          }).optional(),
          headers: z.record(z.string()).optional(),
          secret: z.string().min(16).max(128).optional(),
          isActive: z.boolean().optional(),
          retryConfig: z.object({
            maxRetries: z.number().min(0).max(10),
            backoffMultiplier: z.number().min(1).max(5),
            initialDelay: z.number().min(100).max(60000),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;
          const updates = params.body;

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

          await webhookService.update(id, updates);

          return {
            success: true,
            data: {
              id,
              message: "Webhook updated successfully",
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook update error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Webhook update failed",
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

    // Delete webhook
    {
      path: "/api/v1/webhooks/:id",
      method: "DELETE",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;

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

          await webhookService.delete(id);

          return {
            success: true,
            data: {
              id,
              message: "Webhook deleted successfully",
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook delete error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Webhook deletion failed",
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

    // Get webhook delivery status
    {
      path: "/api/v1/webhooks/:id/deliveries",
      method: "GET",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
        query: z.object({
          limit: z.coerce.number().min(1).max(100).default(20),
          status: z.enum(["pending", "delivered", "failed", "retrying"]).optional(),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;
          const { limit = 20, status } = params.query || {};

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

          const deliveries = await webhookService.getDeliveryStatus(id);
          
          // Filter by status if requested
          const filteredDeliveries = status
            ? deliveries.filter(d => d.status === status)
            : deliveries;

          // Limit results
          const limitedDeliveries = filteredDeliveries.slice(0, limit);

          return {
            success: true,
            data: {
              webhookId: id,
              deliveries: limitedDeliveries.map(delivery => ({
                id: delivery.id,
                status: delivery.status,
                attempts: delivery.attempts,
                lastAttemptAt: delivery.lastAttemptAt,
                nextRetryAt: delivery.nextRetryAt,
                responseStatus: delivery.responseStatus,
                error: delivery.error,
                createdAt: delivery.createdAt,
                // Don't expose response body for security/privacy
              })),
              total: filteredDeliveries.length,
              summary: {
                pending: deliveries.filter(d => d.status === "pending").length,
                delivered: deliveries.filter(d => d.status === "delivered").length,
                failed: deliveries.filter(d => d.status === "failed").length,
                retrying: deliveries.filter(d => d.status === "retrying").length,
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
          console.error("Webhook deliveries error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get webhook deliveries",
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

    // Retry webhook delivery
    {
      path: "/api/v1/webhooks/deliveries/:deliveryId/retry",
      method: "POST",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          deliveryId: z.string().uuid(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { deliveryId } = params.params;

          await webhookService.retry(deliveryId);

          return {
            success: true,
            data: {
              deliveryId,
              message: "Webhook delivery retry initiated",
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook retry error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Webhook retry failed",
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

    // Test webhook
    {
      path: "/api/v1/webhooks/:id/test",
      method: "POST",
      permissions: ["webhook:receive"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;

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

          // Create test event
          const testEvent = {
            id: `test-${Date.now()}`,
            type: "webhook.test",
            data: {
              message: "This is a test webhook delivery",
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
            },
            timestamp: context.timestamp.toISOString(),
            source: "hijraah-api",
            metadata: {
              test: true,
              triggeredBy: context.auth.userId,
            },
          };

          // Trigger test delivery
          await webhookService.trigger(testEvent, { webhookId: id });

          return {
            success: true,
            data: {
              webhookId: id,
              message: "Test webhook sent successfully",
              testEvent,
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Webhook test error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Webhook test failed",
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