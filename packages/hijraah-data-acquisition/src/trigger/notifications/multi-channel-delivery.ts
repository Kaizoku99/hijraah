/**
 * Multi-Channel Delivery System (Task 11.1)
 *
 * Implements multi-channel notification delivery using:
 * - Supabase Edge Functions for serverless delivery
 * - Firecrawl source attribution and metadata
 * - AI SDK channel-optimized content generation
 * - Intelligent routing and retry mechanisms
 */

import { task } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import {
  MultiChannelDeliverySchema,
  NotificationChannelSchema,
  type MultiChannelDelivery,
} from "./types.js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Task 11.1.9: Orchestrate Multi-Channel Delivery
 *
 * Orchestrates notification delivery across multiple channels with
 * intelligent routing, content optimization, and delivery tracking.
 */
export const orchestrateMultiChannelDeliveryTask = task({
  id: "orchestrate-multi-channel-delivery",
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
      baseContent: {
        title: string;
        message: string;
        actionUrl?: string;
        metadata?: any;
      };
      channels: string[];
      priority: "low" | "medium" | "high" | "critical";
      scheduledDelivery?: string;
    },
    { ctx }
  ) => {
    ctx.logger.info(`🚀 Orchestrating multi-channel delivery for notification: ${payload.notificationId}`);

    try {
      const { notificationId, userId, baseContent, channels, priority, scheduledDelivery } = payload;

      // Get user profile and preferences for channel optimization
      const { data: userProfile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;

      // Get user's channel preferences and delivery history
      const { data: channelPreferences, error: prefsError } = await supabase
        .from("user_notification_preferences")
        .select("*")
        .eq("user_id", userId);

      if (prefsError) throw prefsError;

      // Get recent delivery analytics for channel performance
      const { data: recentDeliveries, error: analyticsError } = await supabase
        .from("notification_analytics")
        .select("*")
        .eq("user_id", userId)
        .order("sent_at", { ascending: false })
        .limit(50);

      if (analyticsError) throw analyticsError;

      // Optimize channel selection and ordering using AI
      const channelOptimization = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          optimizedChannels: z.array(z.object({
            channel: NotificationChannelSchema,
            priority: z.number().min(1).max(10),
            reasoning: z.string(),
            expectedDeliveryTime: z.number(), // seconds
            expectedEngagement: z.number().min(0).max(1),
            contentOptimizations: z.array(z.string()),
          })),
          deliveryStrategy: z.enum(["simultaneous", "sequential", "cascading", "adaptive"]),
          timing: z.object({
            immediate: z.array(NotificationChannelSchema),
            delayed: z.array(z.object({
              channel: NotificationChannelSchema,
              delaySeconds: z.number(),
            })),
          }),
        }),
        messages: [
          {
            role: "system",
            content: `You are a notification delivery optimizer. Analyze user preferences, channel performance, and notification priority to create an optimal multi-channel delivery strategy.`,
          },
          {
            role: "user",
            content: `Notification Details:
Priority: ${priority}
Channels: ${channels.join(", ")}
Scheduled: ${scheduledDelivery || "Immediate"}

User Profile:
${JSON.stringify(userProfile, null, 2)}

Channel Preferences:
${JSON.stringify(channelPreferences, null, 2)}

Recent Delivery Performance:
${JSON.stringify(recentDeliveries.slice(0, 10), null, 2)}

Optimize the delivery strategy for maximum effectiveness and user satisfaction.`,
          },
        ],
      });

      // Create delivery record
      const deliveryRecord: MultiChannelDelivery = {
        notificationId,
        userId,
        channels: channelOptimization.object.optimizedChannels.map(ch => ({
          channel: ch.channel,
          status: "pending",
          retryCount: 0,
          metadata: {
            priority: ch.priority,
            expectedDeliveryTime: ch.expectedDeliveryTime,
            expectedEngagement: ch.expectedEngagement,
            contentOptimizations: ch.contentOptimizations,
          },
        })),
        aggregatedStatus: "pending",
        totalChannels: channelOptimization.object.optimizedChannels.length,
        successfulChannels: 0,
        failedChannels: 0,
      };

      // Store delivery record
      const { data: storedDelivery, error: deliveryError } = await supabase
        .from("multi_channel_deliveries")
        .insert(deliveryRecord)
        .select()
        .single();

      if (deliveryError) throw deliveryError;

      // Execute delivery strategy
      switch (channelOptimization.object.deliveryStrategy) {
        case "simultaneous":
          await executeSimultaneousDelivery(storedDelivery.id, channelOptimization.object, baseContent, ctx);
          break;
        case "sequential":
          await executeSequentialDelivery(storedDelivery.id, channelOptimization.object, baseContent, ctx);
          break;
        case "cascading":
          await executeCascadingDelivery(storedDelivery.id, channelOptimization.object, baseContent, ctx);
          break;
        case "adaptive":
          await executeAdaptiveDelivery(storedDelivery.id, channelOptimization.object, baseContent, ctx);
          break;
      }

      ctx.logger.info(`✅ Multi-channel delivery orchestrated for ${channelOptimization.object.optimizedChannels.length} channels`);

      return {
        success: true,
        deliveryId: storedDelivery.id,
        strategy: channelOptimization.object.deliveryStrategy,
        channelsCount: channelOptimization.object.optimizedChannels.length,
        estimatedDeliveryTime: Math.max(...channelOptimization.object.optimizedChannels.map(ch => ch.expectedDeliveryTime)),
      };

    } catch (error) {
      ctx.logger.error("❌ Multi-channel delivery orchestration failed:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.10: Deliver Channel-Optimized Content
 *
 * Delivers notifications through specific channels with AI-optimized
 * content tailored for each channel's characteristics.
 */
export const deliverChannelOptimizedContentTask = task({
  id: "deliver-channel-optimized-content",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (
    payload: {
      deliveryId: string;
      channel: string;
      baseContent: any;
      optimizations: string[];
      userProfile: any;
      firecrawlMetadata?: any;
    },
    { ctx }
  ) => {
    ctx.logger.info(`📤 Delivering optimized content via ${payload.channel}`);

    try {
      const { deliveryId, channel, baseContent, optimizations, userProfile, firecrawlMetadata } = payload;

      // Generate channel-optimized content using AI
      const optimizedContent = await generateChannelOptimizedContent(
        channel,
        baseContent,
        optimizations,
        userProfile,
        firecrawlMetadata
      );

      // Deliver through the specific channel
      let deliveryResult;
      switch (channel) {
        case "email":
          deliveryResult = await deliverEmailNotification(optimizedContent, userProfile);
          break;
        case "sms":
          deliveryResult = await deliverSMSNotification(optimizedContent, userProfile);
          break;
        case "push":
          deliveryResult = await deliverPushNotification(optimizedContent, userProfile);
          break;
        case "webhook":
          deliveryResult = await deliverWebhookNotification(optimizedContent, userProfile);
          break;
        case "in_app":
          deliveryResult = await deliverInAppNotification(optimizedContent, userProfile);
          break;
        case "realtime":
          deliveryResult = await deliverRealtimeNotification(optimizedContent, userProfile);
          break;
        default:
          throw new Error(`Unsupported delivery channel: ${channel}`);
      }

      // Update delivery status
      await supabase
        .from("multi_channel_deliveries")
        .update({
          channels: supabase.rpc("update_channel_status", {
            delivery_id: deliveryId,
            channel_name: channel,
            new_status: deliveryResult.success ? "sent" : "failed",
            sent_at: new Date().toISOString(),
            failure_reason: deliveryResult.error,
            metadata: {
              ...deliveryResult.metadata,
              optimizedContent: optimizedContent.summary,
            },
          }),
        })
        .eq("id", deliveryId);

      // Store delivery analytics
      await supabase.from("notification_analytics").insert({
        notification_id: baseContent.notificationId,
        user_id: userProfile.id,
        type: baseContent.type || "policy_change",
        priority: baseContent.priority || "medium",
        channels: [channel],
        metrics: {
          sent_at: new Date().toISOString(),
          delivery_time: deliveryResult.deliveryTime,
          channel_optimization_used: true,
          content_length: optimizedContent.content.length,
        },
        metadata: {
          channel,
          optimizations,
          firecrawlMetadata,
          deliveryResult: deliveryResult.metadata,
        },
      });

      ctx.logger.info(`✅ Content delivered via ${channel}: ${deliveryResult.success ? "Success" : "Failed"}`);

      return {
        success: deliveryResult.success,
        channel,
        deliveryTime: deliveryResult.deliveryTime,
        contentLength: optimizedContent.content.length,
        optimizationsApplied: optimizations.length,
        error: deliveryResult.error,
      };

    } catch (error) {
      ctx.logger.error(`❌ Failed to deliver via ${payload.channel}:`, error);
      throw error;
    }
  },
});

/**
 * Task 11.1.11: Handle Delivery Failures and Retries
 *
 * Manages failed deliveries with intelligent retry logic and
 * fallback channel selection.
 */
export const handleDeliveryFailuresTask = task({
  id: "handle-delivery-failures",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 5000,
  },
  run: async (
    payload: {
      deliveryId: string;
      failedChannel: string;
      error: string;
      retryCount: number;
      maxRetries: number;
    },
    { ctx }
  ) => {
    ctx.logger.info(`🔄 Handling delivery failure for channel: ${payload.failedChannel}`);

    try {
      const { deliveryId, failedChannel, error, retryCount, maxRetries } = payload;

      // Get delivery record
      const { data: delivery, error: fetchError } = await supabase
        .from("multi_channel_deliveries")
        .select("*")
        .eq("id", deliveryId)
        .single();

      if (fetchError) throw fetchError;

      // Analyze failure and determine retry strategy
      const retryStrategy = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          shouldRetry: z.boolean(),
          retryDelay: z.number(), // seconds
          alternativeChannel: NotificationChannelSchema.optional(),
          failureCategory: z.enum(["temporary", "permanent", "configuration", "rate_limit"]),
          recommendation: z.string(),
        }),
        messages: [
          {
            role: "system",
            content: `You are a delivery failure analyst. Analyze the failure and recommend the best retry strategy.`,
          },
          {
            role: "user",
            content: `Delivery Failure:
Channel: ${failedChannel}
Error: ${error}
Retry Count: ${retryCount}/${maxRetries}
Delivery Record: ${JSON.stringify(delivery, null, 2)}

Analyze the failure and recommend the best course of action.`,
          },
        ],
      });

      if (retryStrategy.object.shouldRetry && retryCount < maxRetries) {
        // Schedule retry
        ctx.logger.info(`⏰ Scheduling retry for ${failedChannel} in ${retryStrategy.object.retryDelay} seconds`);
        
        // Update retry count and schedule retry
        await supabase
          .from("multi_channel_deliveries")
          .update({
            channels: supabase.rpc("update_channel_retry", {
              delivery_id: deliveryId,
              channel_name: failedChannel,
              retry_count: retryCount + 1,
              next_retry_at: new Date(Date.now() + retryStrategy.object.retryDelay * 1000).toISOString(),
            }),
          })
          .eq("id", deliveryId);

        // Schedule retry task
        setTimeout(async () => {
          await deliverChannelOptimizedContentTask.trigger({
            deliveryId,
            channel: failedChannel,
            baseContent: delivery.metadata?.baseContent,
            optimizations: delivery.metadata?.optimizations || [],
            userProfile: delivery.metadata?.userProfile,
            firecrawlMetadata: delivery.metadata?.firecrawlMetadata,
          });
        }, retryStrategy.object.retryDelay * 1000);

      } else if (retryStrategy.object.alternativeChannel) {
        // Try alternative channel
        ctx.logger.info(`🔀 Switching to alternative channel: ${retryStrategy.object.alternativeChannel}`);
        
        await deliverChannelOptimizedContentTask.trigger({
          deliveryId,
          channel: retryStrategy.object.alternativeChannel,
          baseContent: delivery.metadata?.baseContent,
          optimizations: delivery.metadata?.optimizations || [],
          userProfile: delivery.metadata?.userProfile,
          firecrawlMetadata: delivery.metadata?.firecrawlMetadata,
        });

      } else {
        // Mark as permanently failed
        ctx.logger.warn(`❌ Permanently failed delivery for channel: ${failedChannel}`);
        
        await supabase
          .from("multi_channel_deliveries")
          .update({
            channels: supabase.rpc("update_channel_status", {
              delivery_id: deliveryId,
              channel_name: failedChannel,
              new_status: "failed",
              failure_reason: `${error} (${retryStrategy.object.failureCategory})`,
            }),
            failed_channels: supabase.rpc("increment", { field: "failed_channels" }),
          })
          .eq("id", deliveryId);
      }

      return {
        success: true,
        action: retryStrategy.object.shouldRetry ? "retry_scheduled" : 
                retryStrategy.object.alternativeChannel ? "alternative_channel" : "permanently_failed",
        retryDelay: retryStrategy.object.retryDelay,
        alternativeChannel: retryStrategy.object.alternativeChannel,
        failureCategory: retryStrategy.object.failureCategory,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to handle delivery failure:", error);
      throw error;
    }
  },
});

// Helper functions for delivery strategy execution
async function executeSimultaneousDelivery(deliveryId: string, optimization: any, baseContent: any, ctx: any) {
  const deliveryPromises = optimization.optimizedChannels.map(async (channelOpt: any) => {
    return deliverChannelOptimizedContentTask.trigger({
      deliveryId,
      channel: channelOpt.channel,
      baseContent,
      optimizations: channelOpt.contentOptimizations,
      userProfile: baseContent.userProfile,
      firecrawlMetadata: baseContent.firecrawlMetadata,
    });
  });

  await Promise.allSettled(deliveryPromises);
}

async function executeSequentialDelivery(deliveryId: string, optimization: any, baseContent: any, ctx: any) {
  for (const channelOpt of optimization.optimizedChannels) {
    await deliverChannelOptimizedContentTask.trigger({
      deliveryId,
      channel: channelOpt.channel,
      baseContent,
      optimizations: channelOpt.contentOptimizations,
      userProfile: baseContent.userProfile,
      firecrawlMetadata: baseContent.firecrawlMetadata,
    });
  }
}

async function executeCascadingDelivery(deliveryId: string, optimization: any, baseContent: any, ctx: any) {
  // Immediate channels first
  for (const channel of optimization.timing.immediate) {
    const channelOpt = optimization.optimizedChannels.find((ch: any) => ch.channel === channel);
    if (channelOpt) {
      await deliverChannelOptimizedContentTask.trigger({
        deliveryId,
        channel: channelOpt.channel,
        baseContent,
        optimizations: channelOpt.contentOptimizations,
        userProfile: baseContent.userProfile,
        firecrawlMetadata: baseContent.firecrawlMetadata,
      });
    }
  }

  // Delayed channels with timing
  for (const delayedChannel of optimization.timing.delayed) {
    setTimeout(async () => {
      const channelOpt = optimization.optimizedChannels.find((ch: any) => ch.channel === delayedChannel.channel);
      if (channelOpt) {
        await deliverChannelOptimizedContentTask.trigger({
          deliveryId,
          channel: channelOpt.channel,
          baseContent,
          optimizations: channelOpt.contentOptimizations,
          userProfile: baseContent.userProfile,
          firecrawlMetadata: baseContent.firecrawlMetadata,
        });
      }
    }, delayedChannel.delaySeconds * 1000);
  }
}

async function executeAdaptiveDelivery(deliveryId: string, optimization: any, baseContent: any, ctx: any) {
  // Start with highest priority channel
  const sortedChannels = optimization.optimizedChannels.sort((a: any, b: any) => b.priority - a.priority);
  
  for (const channelOpt of sortedChannels) {
    const result = await deliverChannelOptimizedContentTask.trigger({
      deliveryId,
      channel: channelOpt.channel,
      baseContent,
      optimizations: channelOpt.contentOptimizations,
      userProfile: baseContent.userProfile,
      firecrawlMetadata: baseContent.firecrawlMetadata,
    });

    // If high-priority channel succeeds, consider stopping
    if (result && channelOpt.priority >= 8) {
      break;
    }
  }
}

// Helper function to generate channel-optimized content
async function generateChannelOptimizedContent(
  channel: string,
  baseContent: any,
  optimizations: string[],
  userProfile: any,
  firecrawlMetadata?: any
) {
  const optimizedContent = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      title: z.string(),
      content: z.string(),
      summary: z.string(),
      callToAction: z.string().optional(),
      formatting: z.object({
        length: z.enum(["short", "medium", "long"]),
        tone: z.enum(["formal", "casual", "urgent", "friendly"]),
        structure: z.array(z.string()),
      }),
      channelSpecific: z.record(z.any()),
    }),
    messages: [
      {
        role: "system",
        content: `You are a content optimization expert. Adapt the notification content for optimal delivery through ${channel}. Consider channel limitations, user preferences, and engagement patterns.`,
      },
      {
        role: "user",
        content: `Base Content:
${JSON.stringify(baseContent, null, 2)}

Channel: ${channel}
Optimizations to apply: ${optimizations.join(", ")}
User Profile: ${JSON.stringify(userProfile, null, 2)}
Source Attribution: ${JSON.stringify(firecrawlMetadata, null, 2)}

Optimize this content for ${channel} delivery while maintaining accuracy and relevance.`,
      },
    ],
  });

  return optimizedContent.object;
}

// Channel-specific delivery functions
async function deliverEmailNotification(content: any, userProfile: any) {
  // Mock email delivery - would integrate with Resend, SendGrid, etc.
  return {
    success: true,
    deliveryTime: 2000,
    metadata: { provider: "resend", messageId: crypto.randomUUID() },
  };
}

async function deliverSMSNotification(content: any, userProfile: any) {
  // Mock SMS delivery - would integrate with Twilio, etc.
  return {
    success: true,
    deliveryTime: 1000,
    metadata: { provider: "twilio", messageId: crypto.randomUUID() },
  };
}

async function deliverPushNotification(content: any, userProfile: any) {
  // Mock push notification - would integrate with FCM, APNS, etc.
  return {
    success: true,
    deliveryTime: 500,
    metadata: { provider: "fcm", messageId: crypto.randomUUID() },
  };
}

async function deliverWebhookNotification(content: any, userProfile: any) {
  // Mock webhook delivery - would call user's configured webhooks
  return {
    success: true,
    deliveryTime: 1500,
    metadata: { webhooksDelivered: 1 },
  };
}

async function deliverInAppNotification(content: any, userProfile: any) {
  // Store in-app notification in database
  const { error } = await supabase.from("notifications").insert({
    user_id: userProfile.id,
    type: content.type || "policy_change",
    title: content.title,
    message: content.content,
    metadata: content.channelSpecific,
  });

  return {
    success: !error,
    deliveryTime: 100,
    metadata: { stored: !error },
    error: error?.message,
  };
}

async function deliverRealtimeNotification(content: any, userProfile: any) {
  // Send via Supabase realtime
  const { error } = await supabase
    .channel(`user:${userProfile.id}`)
    .send({
      type: "broadcast",
      event: "notification",
      payload: content,
    });

  return {
    success: !error,
    deliveryTime: 50,
    metadata: { realtime: true },
    error: error?.message,
  };
}

