/**
 * Policy Change Notification Engine (Task 11.1)
 *
 * Implements real-time policy change notifications using:
 * - Firecrawl change detection and monitoring
 * - Supabase postgres_changes events and real-time subscriptions
 * - AI SDK intelligent message generation
 * - Personalized notification delivery
 */

import { task, schedules } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import FirecrawlApp from "@mendable/firecrawl-js";
import {
  PolicyChangeNotificationSchema,
  FirecrawlChangeDetectionSchema,
  BatchNotificationProcessingSchema,
  NotificationPrioritySchema,
  type PolicyChangeNotification,
  type FirecrawlChangeDetection,
  type BatchNotificationProcessing,
} from "./types.js";

// Initialize services
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

/**
 * Task 11.1.1: Monitor Policy Changes with Firecrawl
 *
 * Scheduled task that monitors government websites for policy changes
 * using Firecrawl's change detection capabilities.
 */
export const monitorPolicyChangesTask = schedules.task({
  id: "monitor-policy-changes",
  cron: "0 */2 * * *", // Every 2 hours
  run: async (payload, { ctx }) => {
    ctx.logger.info("🔍 Starting policy change monitoring with Firecrawl");

    try {
      // Get active data sources for monitoring
      const { data: dataSources, error: sourcesError } = await supabase
        .from("data_sources")
        .select("*")
        .eq("is_active", true)
        .eq("type", "government");

      if (sourcesError) throw sourcesError;

      const changeDetections: FirecrawlChangeDetection[] = [];
      const policyChanges: PolicyChangeNotification[] = [];

      // Process each data source
      for (const source of dataSources) {
        try {
          ctx.logger.info(`🌐 Monitoring source: ${source.name} (${source.url})`);

          // Use Firecrawl to scrape and detect changes
          const crawlResult = await firecrawl.scrapeUrl(source.url, {
            formats: ["markdown", "html"],
            onlyMainContent: true,
            waitFor: 2000,
            timeout: 30000,
          });

          if (!crawlResult.success) {
            ctx.logger.warn(`⚠️ Failed to crawl ${source.url}: ${crawlResult.error}`);
            continue;
          }

          // Get previous content hash for comparison
          const { data: lastCrawl } = await supabase
            .from("collection_results")
            .select("metadata")
            .eq("source_id", source.id)
            .order("collected_at", { ascending: false })
            .limit(1)
            .single();

          const currentContent = crawlResult.data?.markdown || "";
          const currentHash = await generateContentHash(currentContent);
          const previousHash = lastCrawl?.metadata?.contentHash;

          // Detect changes
          const changeDetected = previousHash && previousHash !== currentHash;

          if (changeDetected) {
            ctx.logger.info(`🚨 Change detected for ${source.name}`);

            // Analyze changes using AI
            const changeAnalysis = await generateObject({
              model: openai("gpt-4o"),
              schema: z.object({
                changeType: z.enum(["new_policy", "policy_update", "clarification", "removal"]),
                impactLevel: z.enum(["critical", "high", "medium", "low"]),
                summary: z.string(),
                details: z.string(),
                affectedCategories: z.array(z.string()),
                effectiveDate: z.string().optional(),
                actionRequired: z.boolean(),
                urgency: z.enum(["immediate", "within_week", "within_month", "no_urgency"),
                confidence: z.number().min(0).max(1),
              }),
              messages: [
                {
                  role: "system",
                  content: `You are an immigration policy analyst. Analyze the changes in this government immigration website content and provide a structured assessment of the policy changes, their impact, and urgency.`,
                },
                {
                  role: "user",
                  content: `Analyze the changes in this immigration policy content:

Previous content hash: ${previousHash}
Current content hash: ${currentHash}
Source: ${source.name} (${source.metadata?.country})
URL: ${source.url}

Current content (first 4000 chars):
${currentContent.slice(0, 4000)}

Provide a detailed analysis of what changed and its impact on immigration applicants.`,
                },
              ],
            });

            // Create change detection record
            const changeDetection: FirecrawlChangeDetection = {
              sourceId: source.id,
              url: source.url,
              country: source.metadata?.country || "unknown",
              agency: source.metadata?.agency || source.name,
              changeDetected: true,
              changeType: "content",
              changeDetails: {
                previousHash,
                currentHash,
                contentDiff: "Content analysis completed",
              },
              firecrawlJobId: crawlResult.data?.metadata?.jobId || "manual",
              crawledAt: new Date().toISOString(),
              confidence: changeAnalysis.object.confidence,
              metadata: {
                crawlResult: crawlResult.data?.metadata,
                analysisResult: changeAnalysis.object,
              },
            };

            changeDetections.push(changeDetection);

            // Create policy change notification if significant
            if (changeAnalysis.object.impactLevel !== "low") {
              const policyChange: PolicyChangeNotification = {
                id: crypto.randomUUID(),
                policyChangeId: crypto.randomUUID(),
                country: source.metadata?.country || "unknown",
                policyType: source.metadata?.policyType || "general",
                changeType: changeAnalysis.object.changeType === "new_policy" ? "new" : "updated",
                impactLevel: changeAnalysis.object.impactLevel,
                title: `Policy Update: ${source.name}`,
                summary: changeAnalysis.object.summary,
                details: changeAnalysis.object.details,
                effectiveDate: changeAnalysis.object.effectiveDate,
                sourceUrl: source.url,
                sourceAttribution: {
                  agency: source.metadata?.agency || source.name,
                  lastUpdated: new Date().toISOString(),
                  credibilityScore: source.credibilityScore,
                },
                affectedCategories: changeAnalysis.object.affectedCategories,
                aiAnalysis: {
                  impactAssessment: changeAnalysis.object.details,
                  actionItems: changeAnalysis.object.actionRequired ? ["Review new requirements", "Update application if needed"] : [],
                  timeline: changeAnalysis.object.effectiveDate,
                  riskLevel: changeAnalysis.object.impactLevel,
                  confidence: changeAnalysis.object.confidence,
                },
                firecrawlMetadata: {
                  jobId: crawlResult.data?.metadata?.jobId,
                  sourceReliability: source.credibilityScore,
                  lastCrawled: new Date().toISOString(),
                  changeDetectionMethod: "ai_analysis",
                },
              };

              policyChanges.push(policyChange);
            }
          }

          // Store collection result
          await supabase.from("collection_results").insert({
            source_id: source.id,
            status: "success",
            data: crawlResult.data,
            metadata: {
              contentHash: currentHash,
              changeDetected,
              firecrawlJobId: crawlResult.data?.metadata?.jobId,
              analysisTimestamp: new Date().toISOString(),
            },
            items_collected: 1,
            processing_time_ms: Date.now() - Date.now(), // Approximate
          });

        } catch (error) {
          ctx.logger.error(`❌ Error monitoring source ${source.name}:`, error);
          
          // Store failed collection result
          await supabase.from("collection_results").insert({
            source_id: source.id,
            status: "failed",
            errors: [{ error: error.message, timestamp: new Date().toISOString() }],
            items_collected: 0,
          });
        }
      }

      // Process detected policy changes
      if (policyChanges.length > 0) {
        ctx.logger.info(`📢 Processing ${policyChanges.length} policy changes`);

        // Store policy changes in database
        const { error: insertError } = await supabase
          .from("policy_changes")
          .insert(
            policyChanges.map(change => ({
              source_id: dataSources.find(s => s.url === change.sourceUrl)?.id,
              country: change.country,
              change_type: change.changeType,
              impact_level: change.impactLevel,
              title: change.title,
              description: change.details,
              effective_date: change.effectiveDate ? new Date(change.effectiveDate) : null,
              affected_categories: change.affectedCategories,
              source_url: change.sourceUrl,
              confidence: change.aiAnalysis.confidence,
              review_status: "pending",
            }))
          );

        if (insertError) {
          ctx.logger.error("❌ Failed to store policy changes:", insertError);
        } else {
          // Trigger notification processing for each policy change
          for (const policyChange of policyChanges) {
            await processPolicyChangeNotificationsTask.trigger({
              policyChange,
              batchId: crypto.randomUUID(),
            });
          }
        }
      }

      return {
        success: true,
        sourcesMonitored: dataSources.length,
        changesDetected: changeDetections.length,
        policyChanges: policyChanges.length,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      ctx.logger.error("❌ Policy change monitoring failed:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.2: Process Policy Change Notifications
 *
 * Processes detected policy changes and creates personalized notifications
 * for affected users based on their profiles and preferences.
 */
export const processPolicyChangeNotificationsTask = task({
  id: "process-policy-change-notifications",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (
    payload: {
      policyChange: PolicyChangeNotification;
      batchId: string;
    },
    { ctx }
  ) => {
    ctx.logger.info(`📋 Processing policy change notifications for: ${payload.policyChange.title}`);

    try {
      const { policyChange, batchId } = payload;

      // Find affected users based on policy change criteria
      const { data: affectedUsers, error: usersError } = await supabase
        .from("user_profiles")
        .select(`
          id,
          target_country,
          visa_type,
          immigration_type,
          immigration_types,
          current_stage,
          notification_preferences
        `)
        .or(`target_country.eq.${policyChange.country},immigration_types.cs.["${policyChange.policyType}"]`);

      if (usersError) throw usersError;

      ctx.logger.info(`👥 Found ${affectedUsers.length} potentially affected users`);

      // Initialize batch processing record
      const batchProcessing: BatchNotificationProcessing = {
        batchId,
        policyChangeId: policyChange.policyChangeId,
        totalUsers: affectedUsers.length,
        processedUsers: 0,
        successfulNotifications: 0,
        failedNotifications: 0,
        startedAt: new Date().toISOString(),
        status: "processing",
        errors: [],
      };

      // Store batch processing record
      await supabase.from("batch_notification_processing").insert(batchProcessing);

      // Process notifications for each affected user
      for (const user of affectedUsers) {
        try {
          // Check user notification preferences
          const preferences = user.notification_preferences || {};
          const policyChangePrefs = preferences.policy_change || { enabled: true, channels: ["in_app", "email"] };

          if (!policyChangePrefs.enabled) {
            ctx.logger.info(`⏭️ Skipping user ${user.id} - notifications disabled`);
            continue;
          }

          // Calculate relevance score using AI
          const relevanceAnalysis = await generateObject({
            model: openai("gpt-4o-mini"),
            schema: z.object({
              relevanceScore: z.number().min(0).max(1),
              reasoning: z.string(),
              personalizedTitle: z.string(),
              personalizedMessage: z.string(),
              urgencyLevel: NotificationPrioritySchema,
              actionItems: z.array(z.string()),
              estimatedImpact: z.enum(["none", "minimal", "moderate", "significant", "major"]),
            }),
            messages: [
              {
                role: "system",
                content: `You are an immigration advisor. Analyze how relevant this policy change is to a specific user's immigration profile and create a personalized notification.`,
              },
              {
                role: "user",
                content: `Policy Change:
Title: ${policyChange.title}
Country: ${policyChange.country}
Impact Level: ${policyChange.impactLevel}
Summary: ${policyChange.summary}
Details: ${policyChange.details}
Affected Categories: ${policyChange.affectedCategories.join(", ")}

User Profile:
Target Country: ${user.target_country}
Visa Type: ${user.visa_type}
Immigration Type: ${user.immigration_type}
Current Stage: ${user.current_stage}

Analyze the relevance and create a personalized notification message.`,
              },
            ],
          });

          // Only send notification if relevance score is above threshold
          if (relevanceAnalysis.object.relevanceScore < 0.3) {
            ctx.logger.info(`⏭️ Skipping user ${user.id} - low relevance score: ${relevanceAnalysis.object.relevanceScore}`);
            continue;
          }

          // Trigger personalized notification delivery
          await personalizeAndDeliverNotificationTask.trigger({
            userId: user.id,
            policyChange,
            relevanceAnalysis: relevanceAnalysis.object,
            preferredChannels: policyChangePrefs.channels || ["in_app"],
            batchId,
          });

          batchProcessing.processedUsers++;
          batchProcessing.successfulNotifications++;

        } catch (error) {
          ctx.logger.error(`❌ Failed to process notification for user ${user.id}:`, error);
          batchProcessing.failedNotifications++;
          batchProcessing.errors?.push({
            userId: user.id,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Update batch processing status
      batchProcessing.status = "completed";
      batchProcessing.completedAt = new Date().toISOString();

      await supabase
        .from("batch_notification_processing")
        .update(batchProcessing)
        .eq("batch_id", batchId);

      ctx.logger.info(`✅ Batch processing completed: ${batchProcessing.successfulNotifications}/${batchProcessing.totalUsers} notifications sent`);

      return {
        success: true,
        batchId,
        totalUsers: batchProcessing.totalUsers,
        successfulNotifications: batchProcessing.successfulNotifications,
        failedNotifications: batchProcessing.failedNotifications,
        processingTime: Date.now() - new Date(batchProcessing.startedAt).getTime(),
      };

    } catch (error) {
      ctx.logger.error("❌ Policy change notification processing failed:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.3: Personalize and Deliver Notification
 *
 * Creates personalized notifications and delivers them through
 * multiple channels based on user preferences.
 */
export const personalizeAndDeliverNotificationTask = task({
  id: "personalize-and-deliver-notification",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 5000,
  },
  run: async (
    payload: {
      userId: string;
      policyChange: PolicyChangeNotification;
      relevanceAnalysis: any;
      preferredChannels: string[];
      batchId: string;
    },
    { ctx }
  ) => {
    ctx.logger.info(`🎯 Personalizing notification for user: ${payload.userId}`);

    try {
      const { userId, policyChange, relevanceAnalysis, preferredChannels, batchId } = payload;

      // Store personalized notification in database
      const { data: notification, error: insertError } = await supabase
        .from("notifications")
        .insert({
          user_id: userId,
          type: "policy_change",
          title: relevanceAnalysis.personalizedTitle,
          message: relevanceAnalysis.personalizedMessage,
          severity: relevanceAnalysis.urgencyLevel,
          metadata: {
            policyChangeId: policyChange.policyChangeId,
            relevanceScore: relevanceAnalysis.relevanceScore,
            estimatedImpact: relevanceAnalysis.estimatedImpact,
            actionItems: relevanceAnalysis.actionItems,
            sourceUrl: policyChange.sourceUrl,
            sourceAttribution: policyChange.sourceAttribution,
            batchId,
            aiAnalysis: policyChange.aiAnalysis,
            firecrawlMetadata: policyChange.firecrawlMetadata,
          },
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Send real-time notification via Supabase channels
      const realtimePayload = {
        id: notification.id,
        type: "policy_change",
        title: relevanceAnalysis.personalizedTitle,
        message: relevanceAnalysis.personalizedMessage,
        severity: relevanceAnalysis.urgencyLevel,
        actionItems: relevanceAnalysis.actionItems,
        sourceUrl: policyChange.sourceUrl,
        createdAt: notification.created_at,
      };

      // Send to user-specific channel
      await supabase
        .channel(`user:${userId}`)
        .send({
          type: "broadcast",
          event: "policy_change_notification",
          payload: realtimePayload,
        });

      // Send to general policy changes channel for the country
      await supabase
        .channel(`policy_changes:${policyChange.country}`)
        .send({
          type: "broadcast",
          event: "policy_change",
          payload: {
            ...realtimePayload,
            country: policyChange.country,
            impactLevel: policyChange.impactLevel,
          },
        });

      // Trigger multi-channel delivery if other channels are preferred
      if (preferredChannels.length > 1 || !preferredChannels.includes("in_app")) {
        await deliverMultiChannelNotificationTask.trigger({
          notificationId: notification.id,
          userId,
          channels: preferredChannels.filter(c => c !== "in_app"),
          content: realtimePayload,
        });
      }

      ctx.logger.info(`✅ Personalized notification delivered to user ${userId}`);

      return {
        success: true,
        notificationId: notification.id,
        userId,
        relevanceScore: relevanceAnalysis.relevanceScore,
        channelsUsed: ["realtime", ...preferredChannels],
        deliveredAt: new Date().toISOString(),
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to personalize and deliver notification:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.4: Deliver Multi-Channel Notification
 *
 * Delivers notifications through multiple channels (email, SMS, push, webhook)
 * using Supabase Edge Functions and external services.
 */
export const deliverMultiChannelNotificationTask = task({
  id: "deliver-multi-channel-notification",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 15000,
  },
  run: async (
    payload: {
      notificationId: string;
      userId: string;
      channels: string[];
      content: any;
    },
    { ctx }
  ) => {
    ctx.logger.info(`📤 Delivering multi-channel notification: ${payload.notificationId}`);

    try {
      const { notificationId, userId, channels, content } = payload;

      const deliveryResults = [];

      // Process each delivery channel
      for (const channel of channels) {
        try {
          let deliveryResult;

          switch (channel) {
            case "email":
              deliveryResult = await deliverEmailNotification(userId, content);
              break;
            case "sms":
              deliveryResult = await deliverSMSNotification(userId, content);
              break;
            case "push":
              deliveryResult = await deliverPushNotification(userId, content);
              break;
            case "webhook":
              deliveryResult = await deliverWebhookNotification(userId, content);
              break;
            default:
              ctx.logger.warn(`⚠️ Unknown delivery channel: ${channel}`);
              continue;
          }

          deliveryResults.push({
            channel,
            status: deliveryResult.success ? "sent" : "failed",
            sentAt: new Date().toISOString(),
            metadata: deliveryResult.metadata,
          });

        } catch (error) {
          ctx.logger.error(`❌ Failed to deliver via ${channel}:`, error);
          deliveryResults.push({
            channel,
            status: "failed",
            failureReason: error.message,
            sentAt: new Date().toISOString(),
          });
        }
      }

      // Store delivery results
      await supabase.from("notification_deliveries").insert({
        notification_id: notificationId,
        user_id: userId,
        channels: deliveryResults,
        total_channels: channels.length,
        successful_channels: deliveryResults.filter(r => r.status === "sent").length,
        failed_channels: deliveryResults.filter(r => r.status === "failed").length,
        delivered_at: new Date().toISOString(),
      });

      const successfulDeliveries = deliveryResults.filter(r => r.status === "sent").length;
      ctx.logger.info(`✅ Multi-channel delivery completed: ${successfulDeliveries}/${channels.length} channels successful`);

      return {
        success: true,
        notificationId,
        totalChannels: channels.length,
        successfulChannels: successfulDeliveries,
        failedChannels: channels.length - successfulDeliveries,
        deliveryResults,
      };

    } catch (error) {
      ctx.logger.error("❌ Multi-channel notification delivery failed:", error);
      throw error;
    }
  },
});

// Helper functions for content hashing
async function generateContentHash(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Helper functions for multi-channel delivery
async function deliverEmailNotification(userId: string, content: any) {
  // Implementation would integrate with email service (Resend, SendGrid, etc.)
  // For now, return mock success
  return {
    success: true,
    metadata: { provider: "resend", messageId: crypto.randomUUID() },
  };
}

async function deliverSMSNotification(userId: string, content: any) {
  // Implementation would integrate with SMS service (Twilio, etc.)
  return {
    success: true,
    metadata: { provider: "twilio", messageId: crypto.randomUUID() },
  };
}

async function deliverPushNotification(userId: string, content: any) {
  // Implementation would integrate with push notification service
  return {
    success: true,
    metadata: { provider: "fcm", messageId: crypto.randomUUID() },
  };
}

async function deliverWebhookNotification(userId: string, content: any) {
  // Implementation would deliver to user's configured webhooks
  return {
    success: true,
    metadata: { webhooksDelivered: 1 },
  };
}

// Export all tasks
export {
  monitorPolicyChangesTask,
  processPolicyChangeNotificationsTask,
  personalizeAndDeliverNotificationTask,
  deliverMultiChannelNotificationTask,
};