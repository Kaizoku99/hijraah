/**
 * Policy Change Detection Tasks
 *
 * Trigger.dev tasks for real-time policy change detection, analysis, and notification.
 * Uses AI-powered analysis to detect, categorize, and respond to immigration policy changes.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, batch, logger, metadata } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import {
  PolicyChangeDetectionEngine,
  ChangeDetectionConfig,
  PolicyChange,
} from "../engines/PolicyChangeDetectionEngine";

// Task payload schemas
export const PolicyChangeDetectionPayloadSchema = z.object({
  country: z.string(),
  policyType: z.string(),
  currentContent: z.string(),
  previousContent: z.string().optional(),
  sourceUrl: z.string().url(),
  language: z.string().default("en"),
  enableSemanticAnalysis: z.boolean().default(true),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
});

export const PolicyChangeNotificationPayloadSchema = z.object({
  changes: z.array(z.any()),
  country: z.string(),
  policyType: z.string(),
  sourceUrl: z.string().url(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  userIds: z.array(z.string()).optional(),
});

export const BatchPolicyAnalysisPayloadSchema = z.object({
  policies: z.array(
    z.object({
      url: z.string().url(),
      country: z.string(),
      policyType: z.string(),
      content: z.string(),
      previousContent: z.string().optional(),
    }),
  ),
  analysisConfig: z.object({
    enableSemanticAnalysis: z.boolean().default(true),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
    batchSize: z.number().int().min(1).max(10).default(5),
  }),
});

// Initialize clients
const initializeClients = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing required Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const changeDetectionEngine = new PolicyChangeDetectionEngine(
    supabaseUrl,
    supabaseKey,
  );

  return { supabase, changeDetectionEngine };
};

/**
 * Task: Policy Change Detector
 *
 * Real-time policy change detection using AI-powered analysis.
 * Triggered when new policy content is available for comparison.
 */
export const policyChangeDetector = task({
  id: "policy-change-detector",
  name: "Policy Change Detector",
  version: "1.0.0",
  machine: "medium-2x", // More resources for AI processing
  maxDuration: 600, // 10 minutes
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
  run: async (
    payload: z.infer<typeof PolicyChangeDetectionPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("🔍 Starting policy change detection", {
      country: payload.country,
      policyType: payload.policyType,
      sourceUrl: payload.sourceUrl,
    });

    const { changeDetectionEngine } = initializeClients();

    const config: ChangeDetectionConfig = {
      country: payload.country,
      policyType: payload.policyType,
      currentContent: payload.currentContent,
      previousContent: payload.previousContent,
      sourceUrl: payload.sourceUrl,
      language: payload.language,
      enableSemanticAnalysis: payload.enableSemanticAnalysis,
      confidenceThreshold: payload.confidenceThreshold,
    };

    const startTime = Date.now();
    const analysis = await changeDetectionEngine.detectChanges(config);
    const duration = Date.now() - startTime;

    ctx.logger.info("✅ Policy change detection completed", {
      duration: `${duration}ms`,
      totalChanges: analysis.summary.totalChanges,
      criticalChanges: analysis.summary.criticalChanges,
      overallImpact: analysis.summary.overallImpactLevel,
    });

    // Trigger notifications if significant changes detected
    if (
      analysis.summary.criticalChanges > 0 ||
      analysis.summary.highPriorityChanges > 0
    ) {
      await ctx.waitFor("notify-policy-changes", {
        changes: analysis.changes,
        country: payload.country,
        policyType: payload.policyType,
        sourceUrl: payload.sourceUrl,
        severity: analysis.summary.overallImpactLevel,
      });
    }

    return {
      success: true,
      analysis,
      processingTime: duration,
      timestamp: new Date().toISOString(),
    };
  },
});

/**
 * Task: Notify Policy Changes
 *
 * Multi-channel notification system for policy changes.
 * Uses Supabase real-time subscriptions and batch processing.
 */
export const notifyPolicyChanges = task({
  id: "notify-policy-changes",
  name: "Notify Policy Changes",
  version: "1.0.0",
  machine: "small-2x",
  maxDuration: 300, // 5 minutes
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (
    payload: z.infer<typeof PolicyChangeNotificationPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("📢 Starting policy change notifications", {
      country: payload.country,
      policyType: payload.policyType,
      changesCount: payload.changes.length,
      severity: payload.severity,
    });

    const { supabase, changeDetectionEngine } = initializeClients();

    try {
      // Step 1: Get affected users
      let affectedUsers: any[] = [];

      if (payload.userIds && payload.userIds.length > 0) {
        // Use specific user IDs if provided
        const { data: users, error } = await supabase
          .from("user_profiles")
          .select("*")
          .in("id", payload.userIds);

        if (error) throw error;
        affectedUsers = users || [];
      } else {
        // Find users affected by this policy change
        const { data: users, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("target_country", payload.country)
          .contains("immigration_types", [payload.policyType]);

        if (error) throw error;
        affectedUsers = users || [];
      }

      ctx.logger.info(`👥 Found ${affectedUsers.length} affected users`);

      // Step 2: Categorize changes by user relevance
      const userImpactMap =
        await changeDetectionEngine.categorizeImpactForUsers(
          payload.changes,
          affectedUsers,
        );

      // Step 3: Generate personalized notifications
      const notifications = [];
      for (const [userId, relevantChanges] of userImpactMap.entries()) {
        const user = affectedUsers.find((u) => u.id === userId);
        if (!user) continue;

        for (const change of relevantChanges) {
          const explanation =
            await changeDetectionEngine.generateUserExplanation(change, user);

          notifications.push({
            user_id: userId,
            type: "policy_change",
            title: `Policy Update: ${change.title}`,
            message: explanation,
            severity: change.severity,
            metadata: {
              changeId: change.id,
              country: payload.country,
              policyType: payload.policyType,
              sourceUrl: payload.sourceUrl,
              effectiveDate: change.effectiveDate,
            },
            created_at: new Date().toISOString(),
          });
        }
      }

      // Step 4: Batch insert notifications
      if (notifications.length > 0) {
        const { error: insertError } = await supabase
          .from("notifications")
          .insert(notifications);

        if (insertError) throw insertError;

        ctx.logger.info(
          `✅ Created ${notifications.length} personalized notifications`,
        );
      }

      // Step 5: Send real-time notifications via Supabase channels
      for (const notification of notifications) {
        await supabase.channel(`user_${notification.user_id}`).send({
          type: "broadcast",
          event: "policy_change_notification",
          payload: notification,
        });
      }

      // Step 6: Create system-wide alert for critical changes
      if (payload.severity === "critical") {
        await supabase.from("system_alerts").insert({
          type: "critical_policy_change",
          title: `Critical Policy Change: ${payload.country} ${payload.policyType}`,
          description: `${payload.changes.length} critical changes detected`,
          severity: "critical",
          metadata: {
            country: payload.country,
            policyType: payload.policyType,
            sourceUrl: payload.sourceUrl,
            changesCount: payload.changes.length,
          },
          created_at: new Date().toISOString(),
        });
      }

      return {
        success: true,
        notificationsSent: notifications.length,
        usersNotified: userImpactMap.size,
        severity: payload.severity,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Policy change notification failed", {
        error: error.message,
        country: payload.country,
        policyType: payload.policyType,
      });

      throw error;
    }
  },
});

/**
 * Task: Batch Policy Analysis
 *
 * Analyze multiple policies in parallel using batch processing.
 * Optimized for processing large numbers of policy documents.
 */
export const batchPolicyAnalysis = task({
  id: "batch-policy-analysis",
  name: "Batch Policy Analysis",
  version: "1.0.0",
  machine: "large-2x", // More resources for batch processing
  maxDuration: 1800, // 30 minutes
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
  },
  run: async (
    payload: z.infer<typeof BatchPolicyAnalysisPayloadSchema>,
    { ctx },
  ) => {
    ctx.logger.info("🔄 Starting batch policy analysis", {
      policiesCount: payload.policies.length,
      batchSize: payload.analysisConfig.batchSize,
    });

    const { changeDetectionEngine } = initializeClients();
    const results = [];
    const errors = [];

    // Process policies in batches
    const batchSize = payload.analysisConfig.batchSize;
    for (let i = 0; i < payload.policies.length; i += batchSize) {
      const batch = payload.policies.slice(i, i + batchSize);

      ctx.logger.info(
        `📊 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(payload.policies.length / batchSize)}`,
      );

      // Process batch in parallel
      const batchPromises = batch.map(async (policy) => {
        try {
          const config: ChangeDetectionConfig = {
            country: policy.country,
            policyType: policy.policyType,
            currentContent: policy.content,
            previousContent: policy.previousContent,
            sourceUrl: policy.url,
            enableSemanticAnalysis:
              payload.analysisConfig.enableSemanticAnalysis,
            confidenceThreshold: payload.analysisConfig.confidenceThreshold,
          };

          const analysis = await changeDetectionEngine.detectChanges(config);

          return {
            success: true,
            policy: {
              url: policy.url,
              country: policy.country,
              policyType: policy.policyType,
            },
            analysis,
          };
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to analyze policy: ${policy.url}`, {
            error: error.message,
          });

          return {
            success: false,
            policy: {
              url: policy.url,
              country: policy.country,
              policyType: policy.policyType,
            },
            error: error.message,
          };
        }
      });

      const batchResults = await Promise.allSettled(batchPromises);

      // Collect results and errors
      for (const result of batchResults) {
        if (result.status === "fulfilled") {
          if (result.value.success) {
            results.push(result.value);

            // Trigger notifications for significant changes
            const analysis = result.value.analysis;
            if (
              analysis.summary.criticalChanges > 0 ||
              analysis.summary.highPriorityChanges > 0
            ) {
              await ctx.waitFor("notify-policy-changes", {
                changes: analysis.changes,
                country: result.value.policy.country,
                policyType: result.value.policy.policyType,
                sourceUrl: result.value.policy.url,
                severity: analysis.summary.overallImpactLevel,
              });
            }
          } else {
            errors.push(result.value);
          }
        } else {
          errors.push({
            success: false,
            policy: { url: "unknown" },
            error: result.reason.message || "Unknown error",
          });
        }
      }

      // Add delay between batches to avoid overwhelming the system
      if (i + batchSize < payload.policies.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Generate summary statistics
    const totalChanges = results.reduce(
      (sum, r) => sum + r.analysis.summary.totalChanges,
      0,
    );
    const criticalChanges = results.reduce(
      (sum, r) => sum + r.analysis.summary.criticalChanges,
      0,
    );
    const highPriorityChanges = results.reduce(
      (sum, r) => sum + r.analysis.summary.highPriorityChanges,
      0,
    );

    ctx.logger.info("✅ Batch policy analysis completed", {
      successful: results.length,
      failed: errors.length,
      totalChanges,
      criticalChanges,
      highPriorityChanges,
    });

    return {
      success: true,
      summary: {
        policiesAnalyzed: results.length,
        policiesFailed: errors.length,
        totalChanges,
        criticalChanges,
        highPriorityChanges,
      },
      results,
      errors,
      timestamp: new Date().toISOString(),
    };
  },
});

/**
 * Scheduled Task: Monitor Policy Changes
 *
 * Regularly monitors known policy sources for changes.
 * Runs daily to check for updates across all tracked policies.
 */
export const monitorPolicyChanges = schedules.task({
  id: "monitor-policy-changes",
  name: "Monitor Policy Changes",
  version: "1.0.0",
  cron: "0 2 * * *", // Daily at 2 AM
  timezone: "UTC",
  machine: "medium-2x",
  maxDuration: 3600, // 1 hour
  run: async (payload, { ctx }) => {
    ctx.logger.info("🔄 Starting scheduled policy change monitoring");

    const { supabase } = initializeClients();

    try {
      // Get all active policy sources
      const { data: policySources, error } = await supabase
        .from("data_sources")
        .select("*")
        .eq("type", "policy")
        .eq("is_active", true)
        .order("last_checked", { ascending: true });

      if (error) throw error;

      ctx.logger.info(
        `📊 Found ${policySources.length} policy sources to monitor`,
      );

      // Prepare batch analysis payload
      const policies = policySources.map((source) => ({
        url: source.url,
        country: source.metadata.country,
        policyType: source.metadata.policyType,
        content: "", // Will be scraped
        previousContent: source.last_content,
      }));

      // Trigger batch analysis
      const batchResult = await ctx.waitFor("batch-policy-analysis", {
        policies,
        analysisConfig: {
          enableSemanticAnalysis: true,
          confidenceThreshold: 0.7,
          batchSize: 5,
        },
      });

      // Update last_checked timestamps
      const updatePromises = policySources.map((source) =>
        supabase
          .from("data_sources")
          .update({ last_checked: new Date().toISOString() })
          .eq("id", source.id),
      );

      await Promise.all(updatePromises);

      ctx.logger.info("✅ Scheduled policy monitoring completed", {
        sourcesMonitored: policySources.length,
        changesDetected: batchResult.summary.totalChanges,
        criticalChanges: batchResult.summary.criticalChanges,
      });

      return {
        success: true,
        sourcesMonitored: policySources.length,
        changesDetected: batchResult.summary.totalChanges,
        criticalChanges: batchResult.summary.criticalChanges,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Scheduled policy monitoring failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const policyChangeDetectionTasks = {
  policyChangeDetector,
  notifyPolicyChanges,
  batchPolicyAnalysis,
  monitorPolicyChanges,
};
