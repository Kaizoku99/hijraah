/**
 * Webhook Management Service
 * 
 * Handles webhook registration, event routing, delivery tracking, and retry logic
 * with Supabase real-time integration and AI-powered intelligent notification routing.
 */

import { createHash, createHmac } from "crypto";
import type { 
  WebhookManager,
  WebhookConfig,
  WebhookEvent,
  WebhookDelivery,
  RequestContext
} from "../types.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export class WebhookService implements WebhookManager {
  constructor(
    private supabase: SupabaseClient,
    private maxRetries: number = 3,
    private baseRetryDelay: number = 1000
  ) {}

  async register(config: WebhookConfig): Promise<string> {
    try {
      const { data, error } = await this.supabase
        .from("webhooks")
        .insert({
          user_id: config.userId,
          url: config.url,
          events: config.events,
          filters: config.filters,
          headers: config.headers,
          secret: config.secret,
          is_active: config.isActive,
          retry_config: config.retryConfig,
          created_at: config.createdAt,
        })
        .select("id")
        .single();

      if (error) {
        throw new Error(`Failed to register webhook: ${error.message}`);
      }

      // Test webhook endpoint
      await this.testWebhook(data.id, config.url, config.secret);

      return data.id;
    } catch (error) {
      console.error("Webhook registration error:", error);
      throw error;
    }
  }

  async update(id: string, config: Partial<WebhookConfig>): Promise<void> {
    try {
      const { error } = await this.supabase
        .from("webhooks")
        .update({
          url: config.url,
          events: config.events,
          filters: config.filters,
          headers: config.headers,
          secret: config.secret,
          is_active: config.isActive,
          retry_config: config.retryConfig,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        throw new Error(`Failed to update webhook: ${error.message}`);
      }

      // Test webhook endpoint if URL changed
      if (config.url) {
        await this.testWebhook(id, config.url, config.secret);
      }
    } catch (error) {
      console.error("Webhook update error:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from("webhooks")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(`Failed to delete webhook: ${error.message}`);
      }
    } catch (error) {
      console.error("Webhook deletion error:", error);
      throw error;
    }
  }

  async list(userId: string): Promise<WebhookConfig[]> {
    try {
      const { data, error } = await this.supabase
        .from("webhooks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to list webhooks: ${error.message}`);
      }

      return data.map(this.mapWebhookFromDb);
    } catch (error) {
      console.error("Webhook list error:", error);
      throw error;
    }
  }

  async trigger(event: WebhookEvent, filters?: Record<string, any>): Promise<void> {
    try {
      // Get matching webhooks
      const webhooks = await this.getMatchingWebhooks(event, filters);

      // Use AI to intelligently route notifications
      const routingDecisions = await this.intelligentRouting(event, webhooks);

      // Deliver to selected webhooks with MAS insights
      const deliveryPromises = routingDecisions.map(decision => 
        this.deliverWebhook(decision.webhook, event, decision.priority, decision.masInsights)
      );

      await Promise.allSettled(deliveryPromises);
    } catch (error) {
      console.error("Webhook trigger error:", error);
      throw error;
    }
  }

  async getDeliveryStatus(webhookId: string): Promise<WebhookDelivery[]> {
    try {
      const { data, error } = await this.supabase
        .from("webhook_deliveries")
        .select("*")
        .eq("webhook_id", webhookId)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        throw new Error(`Failed to get delivery status: ${error.message}`);
      }

      return data.map(this.mapDeliveryFromDb);
    } catch (error) {
      console.error("Webhook delivery status error:", error);
      throw error;
    }
  }

  async retry(deliveryId: string): Promise<void> {
    try {
      // Get delivery record
      const { data: delivery, error } = await this.supabase
        .from("webhook_deliveries")
        .select("*, webhooks(*)")
        .eq("id", deliveryId)
        .single();

      if (error || !delivery) {
        throw new Error("Delivery record not found");
      }

      // Get original event
      const { data: event, error: eventError } = await this.supabase
        .from("webhook_events")
        .select("*")
        .eq("id", delivery.event_id)
        .single();

      if (eventError || !event) {
        throw new Error("Event record not found");
      }

      // Retry delivery
      await this.deliverWebhook(
        this.mapWebhookFromDb(delivery.webhooks),
        this.mapEventFromDb(event),
        "manual_retry"
      );
    } catch (error) {
      console.error("Webhook retry error:", error);
      throw error;
    }
  }

  private async getMatchingWebhooks(
    event: WebhookEvent, 
    filters?: Record<string, any>
  ): Promise<WebhookConfig[]> {
    try {
      let query = this.supabase
        .from("webhooks")
        .select("*")
        .eq("is_active", true)
        .contains("events", [event.type]);

      // Apply filters if provided
      if (filters) {
        // This is a simplified filter implementation
        // In practice, you'd want more sophisticated filtering
        if (filters.countries) {
          query = query.contains("filters->countries", filters.countries);
        }
        if (filters.severity) {
          query = query.contains("filters->severity", [filters.severity]);
        }
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to get matching webhooks: ${error.message}`);
      }

      return data.map(this.mapWebhookFromDb);
    } catch (error) {
      console.error("Error getting matching webhooks:", error);
      return [];
    }
  }

  private async intelligentRouting(
    event: WebhookEvent,
    webhooks: WebhookConfig[]
  ): Promise<Array<{ webhook: WebhookConfig; priority: string; reason: string; masInsights?: any }>> {
    try {
      if (webhooks.length === 0) {
        return [];
      }

      // Enhanced routing with MAS agent insights
      const { object } = await generateObject({
        model: openai("gpt-4o-mini"),
        system: "You are an intelligent webhook routing system enhanced with Multi-Agent System (MAS) capabilities. Analyze the event and webhook configurations to determine optimal routing priorities, considering MAS agent insights and content relevance.",
        prompt: `
Event: ${JSON.stringify(event, null, 2)}

Webhooks: ${JSON.stringify(webhooks.map(w => ({
  id: w.id,
  url: w.url,
  events: w.events,
  filters: w.filters,
  masEnhancements: w.filters?.masEnhancements,
})), null, 2)}

Determine routing priorities for each webhook based on:
1. Event relevance to webhook filters and MAS capabilities
2. Event severity/urgency and confidence scores
3. Webhook MAS enhancement configuration
4. Content relevance assessment using agent insights
5. Historical delivery success rates and agent performance
6. Payload enrichment requirements and agent availability

For MAS-enhanced webhooks, consider:
- Agent type compatibility with event content
- Confidence thresholds and enrichment levels
- Routing strategy preferences (relevance/priority/hybrid)
- Performance impact of agent processing
        `,
        schema: z.object({
          routingDecisions: z.array(z.object({
            webhookId: z.string(),
            priority: z.enum(["high", "medium", "low", "skip"]),
            reason: z.string(),
            confidence: z.number().min(0).max(1),
            masRelevance: z.object({
              contentRelevance: z.number().min(0).max(1),
              agentCompatibility: z.array(z.string()),
              enrichmentValue: z.number().min(0).max(1),
              processingComplexity: z.enum(["low", "medium", "high"]),
            }).optional(),
            recommendedEnrichment: z.array(z.string()).optional(),
          })),
          overallInsights: z.object({
            totalWebhooks: z.number(),
            masEnabledWebhooks: z.number(),
            averageRelevance: z.number().min(0).max(1),
            recommendedStrategy: z.enum(["parallel", "sequential", "selective"]),
          }),
        }),
      });

      return object.routingDecisions
        .filter(decision => decision.priority !== "skip")
        .map(decision => {
          const webhook = webhooks.find(w => w.id === decision.webhookId);
          return webhook ? {
            webhook,
            priority: decision.priority,
            reason: decision.reason,
            masInsights: decision.masRelevance ? {
              contentRelevance: decision.masRelevance.contentRelevance,
              agentCompatibility: decision.masRelevance.agentCompatibility,
              enrichmentValue: decision.masRelevance.enrichmentValue,
              processingComplexity: decision.masRelevance.processingComplexity,
              recommendedEnrichment: decision.recommendedEnrichment || [],
            } : null,
          } : null;
        })
        .filter(Boolean) as Array<{ webhook: WebhookConfig; priority: string; reason: string; masInsights?: any }>;
    } catch (error) {
      console.error("Intelligent routing error:", error);
      // Fallback to simple routing
      return webhooks.map(webhook => ({
        webhook,
        priority: "medium",
        reason: "Fallback routing due to AI error",
      }));
    }
  }

  private async deliverWebhook(
    webhook: WebhookConfig,
    event: WebhookEvent,
    priority: string,
    masInsights?: any
  ): Promise<void> {
    const deliveryId = await this.createDeliveryRecord(webhook.id, event.id);

    try {
      // Prepare base payload
      let payload = {
        id: event.id,
        type: event.type,
        data: event.data,
        timestamp: event.timestamp,
        source: event.source,
        metadata: event.metadata,
      };

      // Enhance payload with MAS agent insights if enabled
      if (webhook.filters?.masEnhancements?.enablePayloadEnrichment && masInsights) {
        payload = await this.enrichPayloadWithMASInsights(payload, webhook, masInsights);
      }

      // Prepare headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Hijraah-Webhook/1.0",
        "X-Webhook-Event": event.type,
        "X-Webhook-ID": webhook.id,
        "X-Webhook-Delivery": deliveryId,
        "X-Webhook-Priority": priority,
        ...webhook.headers,
      };

      // Add MAS-specific headers
      if (webhook.filters?.masEnhancements) {
        headers["X-MAS-Enhanced"] = "true";
        headers["X-MAS-Version"] = "1.0.0";
        headers["X-MAS-Enrichment-Level"] = webhook.filters.masEnhancements.enrichmentLevel || "detailed";
        
        if (masInsights) {
          headers["X-MAS-Content-Relevance"] = masInsights.contentRelevance?.toString() || "0.8";
          headers["X-MAS-Agent-Types"] = masInsights.agentCompatibility?.join(",") || "";
          headers["X-MAS-Processing-Complexity"] = masInsights.processingComplexity || "medium";
        }
      }

      // Add signature if secret is provided
      if (webhook.secret) {
        const signature = this.generateSignature(JSON.stringify(payload), webhook.secret);
        headers["X-Webhook-Signature"] = signature;
      }

      // Make delivery request with extended timeout for MAS-enhanced webhooks
      const timeout = webhook.filters?.masEnhancements?.enablePayloadEnrichment ? 45000 : 30000;
      
      const response = await fetch(webhook.url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        timeout,
      });

      const responseBody = await response.text();

      // Analyze response with MAS insights if enabled
      let responseAnalysis = null;
      if (webhook.filters?.masEnhancements?.enableAnalyticsInsights && response.ok) {
        responseAnalysis = await this.analyzeMASWebhookResponse(responseBody, webhook, masInsights);
      }

      // Update delivery record
      await this.updateDeliveryRecord(deliveryId, {
        status: response.ok ? "delivered" : "failed",
        responseStatus: response.status,
        responseBody: responseBody.substring(0, 1000), // Limit response body size
        lastAttemptAt: new Date().toISOString(),
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
        metadata: {
          masEnhanced: !!webhook.filters?.masEnhancements,
          masInsights: masInsights ? {
            contentRelevance: masInsights.contentRelevance,
            enrichmentValue: masInsights.enrichmentValue,
            processingComplexity: masInsights.processingComplexity,
          } : null,
          responseAnalysis,
        },
      });

      // Schedule retry if failed and retries are configured
      if (!response.ok && webhook.retryConfig && webhook.retryConfig.maxRetries > 0) {
        await this.scheduleRetry(deliveryId, webhook, event, 1);
      }
    } catch (error) {
      console.error("Webhook delivery error:", error);
      
      // Update delivery record with error
      await this.updateDeliveryRecord(deliveryId, {
        status: "failed",
        lastAttemptAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        metadata: {
          masEnhanced: !!webhook.filters?.masEnhancements,
          errorContext: masInsights ? "MAS-enhanced delivery failed" : "Standard delivery failed",
        },
      });

      // Schedule retry if configured
      if (webhook.retryConfig && webhook.retryConfig.maxRetries > 0) {
        await this.scheduleRetry(deliveryId, webhook, event, 1);
      }
    }
  }

  private async scheduleRetry(
    deliveryId: string,
    webhook: WebhookConfig,
    event: WebhookEvent,
    attempt: number
  ): Promise<void> {
    if (!webhook.retryConfig || attempt > webhook.retryConfig.maxRetries) {
      return;
    }

    const delay = webhook.retryConfig.initialDelay * 
      Math.pow(webhook.retryConfig.backoffMultiplier, attempt - 1);
    
    const nextRetryAt = new Date(Date.now() + delay);

    // Update delivery record with retry info
    await this.updateDeliveryRecord(deliveryId, {
      status: "retrying",
      nextRetryAt: nextRetryAt.toISOString(),
      attempts: attempt,
    });

    // In a real implementation, you'd use a job queue like Trigger.dev
    // For now, we'll use setTimeout (not recommended for production)
    setTimeout(async () => {
      try {
        await this.retryDelivery(deliveryId, webhook, event, attempt + 1);
      } catch (error) {
        console.error("Retry delivery error:", error);
      }
    }, delay);
  }

  private async retryDelivery(
    deliveryId: string,
    webhook: WebhookConfig,
    event: WebhookEvent,
    attempt: number
  ): Promise<void> {
    // Similar to deliverWebhook but with retry logic
    await this.deliverWebhook(webhook, event, "retry");
  }

  private async testWebhook(id: string, url: string, secret?: string): Promise<void> {
    try {
      const testEvent = {
        id: `test-${Date.now()}`,
        type: "webhook.test",
        data: { message: "This is a test webhook delivery" },
        timestamp: new Date().toISOString(),
        source: "hijraah-api",
        metadata: { test: true },
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Hijraah-Webhook/1.0",
        "X-Webhook-Event": "webhook.test",
        "X-Webhook-ID": id,
        "X-Webhook-Test": "true",
      };

      if (secret) {
        const signature = this.generateSignature(JSON.stringify(testEvent), secret);
        headers["X-Webhook-Signature"] = signature;
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(testEvent),
        timeout: 10000, // 10 second timeout for test
      });

      if (!response.ok) {
        console.warn(`Webhook test failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.warn("Webhook test error:", error);
      // Don't throw - test failures shouldn't prevent webhook registration
    }
  }

  private generateSignature(payload: string, secret: string): string {
    return `sha256=${createHmac("sha256", secret).update(payload).digest("hex")}`;
  }

  private async createDeliveryRecord(webhookId: string, eventId: string): Promise<string> {
    const { data, error } = await this.supabase
      .from("webhook_deliveries")
      .insert({
        webhook_id: webhookId,
        event_id: eventId,
        status: "pending",
        attempts: 0,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(`Failed to create delivery record: ${error.message}`);
    }

    return data.id;
  }

  private async updateDeliveryRecord(
    deliveryId: string,
    updates: Partial<{
      status: string;
      responseStatus: number;
      responseBody: string;
      lastAttemptAt: string;
      nextRetryAt: string;
      attempts: number;
      error: string;
      metadata: any;
    }>
  ): Promise<void> {
    const { error } = await this.supabase
      .from("webhook_deliveries")
      .update(updates)
      .eq("id", deliveryId);

    if (error) {
      console.error("Failed to update delivery record:", error);
    }
  }

  /**
   * Enrich webhook payload with MAS agent insights
   */
  private async enrichPayloadWithMASInsights(
    payload: any,
    webhook: WebhookConfig,
    masInsights: any
  ): Promise<any> {
    try {
      const enrichmentLevel = webhook.filters?.masEnhancements?.enrichmentLevel || "detailed";
      
      // Generate enrichment based on level
      const { object: enrichment } = await generateObject({
        model: openai("gpt-4o-mini"),
        system: "You are a webhook payload enrichment specialist. Enhance webhook payloads with relevant MAS agent insights based on the specified enrichment level.",
        prompt: `Enrich this webhook payload with MAS insights:

Original Payload: ${JSON.stringify(payload, null, 2)}

MAS Insights: ${JSON.stringify(masInsights, null, 2)}

Enrichment Level: ${enrichmentLevel}
Webhook Configuration: ${JSON.stringify(webhook.filters, null, 2)}

Enrichment Guidelines:
- Basic: Add confidence scores and agent types
- Detailed: Include analysis summaries and recommendations  
- Comprehensive: Full agent insights and contextual data

Maintain payload structure while adding valuable MAS insights.`,
        schema: z.object({
          enrichedPayload: z.record(z.any()),
          enrichmentSummary: z.object({
            addedFields: z.array(z.string()),
            confidenceScore: z.number().min(0).max(1),
            agentTypes: z.array(z.string()),
            enrichmentValue: z.number().min(0).max(1),
          }),
        }),
      });

      return {
        ...enrichment.enrichedPayload,
        masEnrichment: {
          version: "1.0.0",
          timestamp: new Date().toISOString(),
          level: enrichmentLevel,
          summary: enrichment.enrichmentSummary,
        },
      };
    } catch (error) {
      console.error("Payload enrichment error:", error);
      // Return original payload with basic MAS metadata
      return {
        ...payload,
        masEnrichment: {
          version: "1.0.0",
          timestamp: new Date().toISOString(),
          level: "basic",
          error: "Enrichment failed, returning original payload",
          insights: masInsights ? {
            contentRelevance: masInsights.contentRelevance || 0.5,
            agentTypes: masInsights.agentCompatibility || [],
          } : null,
        },
      };
    }
  }

  /**
   * Analyze webhook response using MAS insights
   */
  private async analyzeMASWebhookResponse(
    responseBody: string,
    webhook: WebhookConfig,
    masInsights: any
  ): Promise<any> {
    try {
      const { object: analysis } = await generateObject({
        model: openai("gpt-4o-mini"),
        system: "You are a webhook response analyzer. Analyze webhook responses to provide insights about delivery effectiveness and recipient handling of MAS-enhanced payloads.",
        prompt: `Analyze this webhook response:

Response Body: ${responseBody.substring(0, 500)}...
Webhook Config: ${JSON.stringify(webhook.filters?.masEnhancements, null, 2)}
MAS Insights: ${JSON.stringify(masInsights, null, 2)}

Analyze:
1. Response quality and completeness
2. MAS payload handling effectiveness
3. Recipient system compatibility
4. Performance implications
5. Optimization recommendations`,
        schema: z.object({
          responseQuality: z.enum(["poor", "fair", "good", "excellent"]),
          masCompatibility: z.object({
            handlesEnrichment: z.boolean(),
            supportsComplexPayloads: z.boolean(),
            utilizesInsights: z.boolean(),
          }),
          performance: z.object({
            responseTime: z.number(),
            payloadSize: z.number(),
            processingEfficiency: z.number().min(0).max(1),
          }),
          recommendations: z.array(z.string()),
          insights: z.array(z.string()),
        }),
      });

      return analysis;
    } catch (error) {
      console.error("Response analysis error:", error);
      return {
        responseQuality: "unknown",
        masCompatibility: {
          handlesEnrichment: false,
          supportsComplexPayloads: false,
          utilizesInsights: false,
        },
        performance: {
          responseTime: 0,
          payloadSize: responseBody.length,
          processingEfficiency: 0.5,
        },
        recommendations: ["Unable to analyze response due to error"],
        insights: ["Response analysis failed"],
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private mapWebhookFromDb(data: any): WebhookConfig {
    return {
      id: data.id,
      userId: data.user_id,
      url: data.url,
      events: data.events,
      filters: data.filters,
      headers: data.headers,
      secret: data.secret,
      isActive: data.is_active,
      retryConfig: data.retry_config,
      createdAt: data.created_at,
    };
  }

  private mapDeliveryFromDb(data: any): WebhookDelivery {
    return {
      id: data.id,
      webhookId: data.webhook_id,
      eventId: data.event_id,
      status: data.status,
      attempts: data.attempts,
      lastAttemptAt: data.last_attempt_at,
      nextRetryAt: data.next_retry_at,
      responseStatus: data.response_status,
      responseBody: data.response_body,
      error: data.error,
      createdAt: data.created_at,
    };
  }

  private mapEventFromDb(data: any): WebhookEvent {
    return {
      id: data.id,
      type: data.type,
      data: data.data,
      timestamp: data.timestamp,
      source: data.source,
      metadata: data.metadata,
    };
  }
}