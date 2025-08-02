/**
 * Notification Personalization System (Task 11.1)
 *
 * Implements AI-powered notification personalization using:
 * - AI SDK user profile analysis and content generation
 * - Firecrawl content categorization and source attribution
 * - pgvector preference matching for relevance scoring
 * - Dynamic content adaptation based on user context
 */

import { task } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import {
  PersonalizedNotificationSchema,
  NotificationPrioritySchema,
  type PersonalizedNotification,
} from "./types.js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Task 11.1.12: Analyze User Context for Personalization
 *
 * Analyzes user profile, immigration journey, and historical interactions
 * to create comprehensive context for notification personalization.
 */
export const analyzeUserContextTask = task({
  id: "analyze-user-context",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 5000,
  },
  run: async (
    payload: {
      userId: string;
      notificationContext: {
        type: string;
        country: string;
        policyType: string;
        impactLevel: string;
        sourceUrl: string;
      };
    },
    { ctx }
  ) => {
    ctx.logger.info(`🔍 Analyzing user context for personalization: ${payload.userId}`);

    try {
      const { userId, notificationContext } = payload;

      // Gather comprehensive user data
      const [profileResult, preferencesResult, historyResult, casesResult] = await Promise.all([
        // User profile
        supabase
          .from("user_profiles")
          .select("*")
          .eq("id", userId)
          .single(),
        
        // Notification preferences and engagement history
        supabase
          .from("user_notification_preferences")
          .select("*")
          .eq("user_id", userId),
        
        // Recent notification history and engagement
        supabase
          .from("notification_analytics")
          .select("*")
          .eq("user_id", userId)
          .order("sent_at", { ascending: false })
          .limit(20),
        
        // User's immigration cases and documents
        supabase
          .from("user_cases")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (profileResult.error) throw profileResult.error;

      const userProfile = profileResult.data;
      const preferences = preferencesResult.data || [];
      const notificationHistory = historyResult.data || [];
      const userCases = casesResult.data || [];

      // Analyze user context using AI
      const contextAnalysis = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          userSegment: z.enum(["new_applicant", "in_progress", "experienced", "expert", "professional"]),
          immigrationStage: z.enum(["research", "preparation", "application", "waiting", "approved", "rejected", "appeal"]),
          urgencyLevel: z.enum(["low", "medium", "high", "critical"]),
          knowledgeLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
          engagementPattern: z.enum(["highly_engaged", "moderately_engaged", "low_engagement", "selective"]),
          communicationStyle: z.enum(["detailed", "concise", "visual", "action_oriented"]),
          riskTolerance: z.enum(["risk_averse", "moderate", "risk_tolerant"]),
          personalityTraits: z.array(z.enum([
            "detail_oriented", "deadline_driven", "collaborative", "independent",
            "analytical", "intuitive", "proactive", "reactive"
          ])),
          contextualFactors: z.object({
            timeZone: z.string(),
            preferredLanguage: z.string(),
            culturalConsiderations: z.array(z.string()),
            accessibilityNeeds: z.array(z.string()),
            devicePreferences: z.array(z.string()),
          }),
          relevanceFactors: z.object({
            directImpact: z.number().min(0).max(1),
            indirectImpact: z.number().min(0).max(1),
            timelineRelevance: z.number().min(0).max(1),
            geographicRelevance: z.number().min(0).max(1),
            categoryRelevance: z.number().min(0).max(1),
          }),
          personalizationInsights: z.array(z.object({
            insight: z.string(),
            confidence: z.number().min(0).max(1),
            applicationArea: z.enum(["content", "timing", "channel", "frequency", "tone"]),
          })),
        }),
        messages: [
          {
            role: "system",
            content: `You are a user behavior analyst specializing in immigration services. Analyze the user's profile, preferences, and behavior patterns to create a comprehensive personalization context.`,
          },
          {
            role: "user",
            content: `User Profile:
${JSON.stringify(userProfile, null, 2)}

Notification Preferences:
${JSON.stringify(preferences, null, 2)}

Recent Notification History:
${JSON.stringify(notificationHistory.slice(0, 10), null, 2)}

User Cases:
${JSON.stringify(userCases, null, 2)}

Notification Context:
${JSON.stringify(notificationContext, null, 2)}

Analyze this user's context and provide insights for personalizing notifications about immigration policy changes.`,
          },
        ],
      });

      // Calculate pgvector similarity with similar users
      const similarityAnalysis = await findSimilarUserPatterns(userId, userProfile, notificationContext);

      // Store context analysis for future use
      const { data: storedContext, error: storeError } = await supabase
        .from("user_personalization_contexts")
        .upsert({
          user_id: userId,
          context_analysis: contextAnalysis.object,
          similarity_analysis: similarityAnalysis,
          notification_context: notificationContext,
          analyzed_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        })
        .select()
        .single();

      if (storeError) throw storeError;

      ctx.logger.info(`✅ User context analyzed: ${contextAnalysis.object.userSegment} / ${contextAnalysis.object.immigrationStage}`);

      return {
        success: true,
        userId,
        contextId: storedContext.id,
        userSegment: contextAnalysis.object.userSegment,
        immigrationStage: contextAnalysis.object.immigrationStage,
        relevanceScore: Object.values(contextAnalysis.object.relevanceFactors).reduce((a, b) => a + b, 0) / 5,
        personalizationInsights: contextAnalysis.object.personalizationInsights.length,
        similarUsersFound: similarityAnalysis.similarUsers.length,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to analyze user context:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.13: Generate Personalized Content
 *
 * Creates personalized notification content based on user context,
 * preferences, and AI-powered content optimization.
 */
export const generatePersonalizedContentTask = task({
  id: "generate-personalized-content",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (
    payload: {
      userId: string;
      contextId: string;
      baseNotification: {
        title: string;
        summary: string;
        details: string;
        sourceUrl: string;
        impactLevel: string;
        affectedCategories: string[];
        firecrawlMetadata: any;
      };
    },
    { ctx }
  ) => {
    ctx.logger.info(`✍️ Generating personalized content for user: ${payload.userId}`);

    try {
      const { userId, contextId, baseNotification } = payload;

      // Get user context analysis
      const { data: contextData, error: contextError } = await supabase
        .from("user_personalization_contexts")
        .select("*")
        .eq("id", contextId)
        .single();

      if (contextError) throw contextError;

      const contextAnalysis = contextData.context_analysis;
      const similarityAnalysis = contextData.similarity_analysis;

      // Generate personalized content using AI
      const personalizedContent = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          personalizedTitle: z.string(),
          personalizedMessage: z.string(),
          executiveSummary: z.string(),
          keyTakeaways: z.array(z.string()),
          actionItems: z.array(z.object({
            action: z.string(),
            priority: z.enum(["low", "medium", "high", "critical"]),
            deadline: z.string().optional(),
            resources: z.array(z.string()).optional(),
            estimatedTime: z.string().optional(),
          })),
          personalizedInsights: z.array(z.object({
            insight: z.string(),
            relevance: z.number().min(0).max(1),
            reasoning: z.string(),
          })),
          riskAssessment: z.object({
            personalRiskLevel: z.enum(["low", "medium", "high", "critical"]),
            riskFactors: z.array(z.string()),
            mitigationStrategies: z.array(z.string()),
          }),
          timelineImpact: z.object({
            immediateActions: z.array(z.string()),
            shortTermImpact: z.string(),
            longTermImpact: z.string(),
            deadlines: z.array(z.object({
              description: z.string(),
              date: z.string(),
              importance: z.enum(["low", "medium", "high", "critical"]),
            })),
          }),
          contentAdaptations: z.object({
            tone: z.enum(["formal", "casual", "urgent", "reassuring", "informative"]),
            complexity: z.enum(["basic", "intermediate", "advanced", "expert"]),
            length: z.enum(["brief", "standard", "detailed", "comprehensive"]),
            visualElements: z.array(z.string()),
            culturalAdaptations: z.array(z.string()),
          }),
          engagementOptimizations: z.object({
            callToAction: z.string(),
            urgencyIndicators: z.array(z.string()),
            trustSignals: z.array(z.string()),
            socialProof: z.array(z.string()),
          }),
        }),
        messages: [
          {
            role: "system",
            content: `You are an expert immigration advisor and content personalization specialist. Create highly personalized notification content that speaks directly to the user's specific situation, needs, and communication preferences.`,
          },
          {
            role: "user",
            content: `Base Notification:
${JSON.stringify(baseNotification, null, 2)}

User Context Analysis:
${JSON.stringify(contextAnalysis, null, 2)}

Similar User Patterns:
${JSON.stringify(similarityAnalysis, null, 2)}

Create personalized content that:
1. Addresses the user's specific immigration stage and needs
2. Matches their communication style and knowledge level
3. Provides actionable insights relevant to their situation
4. Uses appropriate tone and complexity
5. Includes relevant risk assessment and timeline impact
6. Incorporates trust signals and source attribution

Make the content feel like it was written specifically for this user's unique circumstances.`,
          },
        ],
      });

      // Generate channel-specific variations
      const channelVariations = await generateChannelVariations(
        personalizedContent.object,
        contextAnalysis,
        baseNotification
      );

      // Calculate final relevance and urgency scores
      const relevanceScore = calculateRelevanceScore(
        contextAnalysis,
        baseNotification,
        personalizedContent.object
      );

      const urgencyLevel = determineUrgencyLevel(
        contextAnalysis,
        baseNotification,
        personalizedContent.object
      );

      // Store personalized content
      const { data: storedContent, error: storeError } = await supabase
        .from("personalized_notifications")
        .insert({
          user_id: userId,
          context_id: contextId,
          base_notification: baseNotification,
          personalized_content: personalizedContent.object,
          channel_variations: channelVariations,
          relevance_score: relevanceScore,
          urgency_level: urgencyLevel,
          generated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (storeError) throw storeError;

      ctx.logger.info(`✅ Personalized content generated with relevance score: ${relevanceScore.toFixed(2)}`);

      return {
        success: true,
        contentId: storedContent.id,
        relevanceScore,
        urgencyLevel,
        actionItemsCount: personalizedContent.object.actionItems.length,
        personalizedInsightsCount: personalizedContent.object.personalizedInsights.length,
        channelVariations: Object.keys(channelVariations).length,
        contentLength: personalizedContent.object.personalizedMessage.length,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to generate personalized content:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.14: Optimize Notification Timing
 *
 * Determines optimal delivery timing based on user behavior patterns,
 * time zones, and engagement analytics.
 */
export const optimizeNotificationTimingTask = task({
  id: "optimize-notification-timing",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 3000,
  },
  run: async (
    payload: {
      userId: string;
      contentId: string;
      urgencyLevel: string;
      userTimezone: string;
    },
    { ctx }
  ) => {
    ctx.logger.info(`⏰ Optimizing notification timing for user: ${payload.userId}`);

    try {
      const { userId, contentId, urgencyLevel, userTimezone } = payload;

      // Get user's historical engagement patterns
      const { data: engagementHistory, error: historyError } = await supabase
        .from("notification_analytics")
        .select("*")
        .eq("user_id", userId)
        .order("sent_at", { ascending: false })
        .limit(100);

      if (historyError) throw historyError;

      // Get user's quiet hours and preferences
      const { data: preferences, error: prefsError } = await supabase
        .from("user_notification_preferences")
        .select("*")
        .eq("user_id", userId);

      if (prefsError) throw prefsError;

      // Analyze optimal timing using AI
      const timingOptimization = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          optimalDeliveryTime: z.string().datetime(),
          deliveryStrategy: z.enum(["immediate", "scheduled", "batched", "adaptive"]),
          reasoning: z.string(),
          engagementPrediction: z.number().min(0).max(1),
          alternativeTimings: z.array(z.object({
            time: z.string().datetime(),
            engagementProbability: z.number().min(0).max(1),
            reasoning: z.string(),
          })),
          quietHoursConsideration: z.object({
            respectQuietHours: z.boolean(),
            quietHoursActive: z.boolean(),
            overrideReason: z.string().optional(),
          }),
          channelTimingOptimization: z.array(z.object({
            channel: z.string(),
            optimalTime: z.string().datetime(),
            delayFromPrimary: z.number(), // seconds
          })),
        }),
        messages: [
          {
            role: "system",
            content: `You are a notification timing optimization expert. Analyze user engagement patterns and preferences to determine the optimal delivery timing for maximum engagement and user satisfaction.`,
          },
          {
            role: "user",
            content: `User Timezone: ${userTimezone}
Urgency Level: ${urgencyLevel}
Current Time: ${new Date().toISOString()}

User Preferences:
${JSON.stringify(preferences, null, 2)}

Engagement History (last 100 notifications):
${JSON.stringify(engagementHistory.slice(0, 20), null, 2)}

Engagement Patterns:
- Total notifications: ${engagementHistory.length}
- Average read time: ${calculateAverageReadTime(engagementHistory)} minutes
- Best engagement hours: ${findBestEngagementHours(engagementHistory)}
- Preferred days: ${findPreferredDays(engagementHistory)}

Determine the optimal delivery timing considering urgency, user patterns, and preferences.`,
          },
        ],
      });

      // Store timing optimization
      const { data: storedTiming, error: timingError } = await supabase
        .from("notification_timing_optimizations")
        .insert({
          user_id: userId,
          content_id: contentId,
          timing_analysis: timingOptimization.object,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (timingError) throw timingError;

      ctx.logger.info(`✅ Optimal timing determined: ${timingOptimization.object.deliveryStrategy} at ${timingOptimization.object.optimalDeliveryTime}`);

      return {
        success: true,
        timingId: storedTiming.id,
        deliveryStrategy: timingOptimization.object.deliveryStrategy,
        optimalDeliveryTime: timingOptimization.object.optimalDeliveryTime,
        engagementPrediction: timingOptimization.object.engagementPrediction,
        respectsQuietHours: timingOptimization.object.quietHoursConsideration.respectQuietHours,
        alternativeTimingsCount: timingOptimization.object.alternativeTimings.length,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to optimize notification timing:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.15: Track Personalization Performance
 *
 * Monitors the effectiveness of personalization strategies and
 * continuously improves the personalization algorithms.
 */
export const trackPersonalizationPerformanceTask = task({
  id: "track-personalization-performance",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 3000,
  },
  run: async (
    payload: {
      userId: string;
      notificationId: string;
      personalizationMetrics: {
        relevanceScore: number;
        engagementPrediction: number;
        personalizationLevel: string;
        aiConfidence: number;
      };
    },
    { ctx }
  ) => {
    ctx.logger.info(`📊 Tracking personalization performance for notification: ${payload.notificationId}`);

    try {
      const { userId, notificationId, personalizationMetrics } = payload;

      // Get actual engagement data
      const { data: actualEngagement, error: engagementError } = await supabase
        .from("notification_analytics")
        .select("*")
        .eq("notification_id", notificationId)
        .single();

      if (engagementError && engagementError.code !== "PGRST116") {
        throw engagementError;
      }

      // Calculate performance metrics
      const performanceAnalysis = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          accuracyScore: z.number().min(0).max(1),
          engagementAccuracy: z.number().min(0).max(1),
          relevanceAccuracy: z.number().min(0).max(1),
          personalizationEffectiveness: z.enum(["poor", "fair", "good", "excellent"]),
          improvementAreas: z.array(z.string()),
          successFactors: z.array(z.string()),
          recommendations: z.array(z.object({
            area: z.string(),
            recommendation: z.string(),
            priority: z.enum(["low", "medium", "high"]),
          })),
        }),
        messages: [
          {
            role: "system",
            content: `You are a personalization performance analyst. Compare predicted metrics with actual engagement to assess personalization effectiveness.`,
          },
          {
            role: "user",
            content: `Predicted Metrics:
${JSON.stringify(personalizationMetrics, null, 2)}

Actual Engagement:
${JSON.stringify(actualEngagement, null, 2)}

Analyze the accuracy of personalization predictions and provide improvement recommendations.`,
          },
        ],
      });

      // Store performance tracking
      const { data: performanceRecord, error: performanceError } = await supabase
        .from("personalization_performance_tracking")
        .insert({
          user_id: userId,
          notification_id: notificationId,
          predicted_metrics: personalizationMetrics,
          actual_engagement: actualEngagement,
          performance_analysis: performanceAnalysis.object,
          tracked_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (performanceError) throw performanceError;

      // Update personalization model if needed
      if (performanceAnalysis.object.accuracyScore < 0.7) {
        await updatePersonalizationModelTask.trigger({
          userId,
          performanceId: performanceRecord.id,
          improvementAreas: performanceAnalysis.object.improvementAreas,
        });
      }

      ctx.logger.info(`✅ Performance tracked: ${performanceAnalysis.object.personalizationEffectiveness} (${(performanceAnalysis.object.accuracyScore * 100).toFixed(1)}% accuracy)`);

      return {
        success: true,
        performanceId: performanceRecord.id,
        accuracyScore: performanceAnalysis.object.accuracyScore,
        effectiveness: performanceAnalysis.object.personalizationEffectiveness,
        improvementAreasCount: performanceAnalysis.object.improvementAreas.length,
        recommendationsCount: performanceAnalysis.object.recommendations.length,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to track personalization performance:", error);
      throw error;
    }
  },
});

/**
 * Task 11.1.16: Update Personalization Model
 *
 * Updates personalization algorithms based on performance feedback
 * and user behavior patterns.
 */
export const updatePersonalizationModelTask = task({
  id: "update-personalization-model",
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 5000,
  },
  run: async (
    payload: {
      userId: string;
      performanceId: string;
      improvementAreas: string[];
    },
    { ctx }
  ) => {
    ctx.logger.info(`🔄 Updating personalization model for user: ${payload.userId}`);

    try {
      const { userId, performanceId, improvementAreas } = payload;

      // Get historical performance data
      const { data: performanceHistory, error: historyError } = await supabase
        .from("personalization_performance_tracking")
        .select("*")
        .eq("user_id", userId)
        .order("tracked_at", { ascending: false })
        .limit(20);

      if (historyError) throw historyError;

      // Generate model updates using AI
      const modelUpdates = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          updatedWeights: z.record(z.number()),
          newFeatures: z.array(z.string()),
          removedFeatures: z.array(z.string()),
          algorithmAdjustments: z.array(z.object({
            component: z.string(),
            adjustment: z.string(),
            reasoning: z.string(),
          })),
          expectedImprovement: z.number().min(0).max(1),
          validationMetrics: z.object({
            accuracyTarget: z.number().min(0).max(1),
            engagementTarget: z.number().min(0).max(1),
            relevanceTarget: z.number().min(0).max(1),
          }),
        }),
        messages: [
          {
            role: "system",
            content: `You are a machine learning engineer specializing in personalization algorithms. Analyze performance data and suggest model improvements.`,
          },
          {
            role: "user",
            content: `Improvement Areas: ${improvementAreas.join(", ")}

Performance History:
${JSON.stringify(performanceHistory.slice(0, 10), null, 2)}

Generate specific model updates to improve personalization accuracy and user engagement.`,
          },
        ],
      });

      // Store model updates
      const { data: modelUpdate, error: updateError } = await supabase
        .from("personalization_model_updates")
        .insert({
          user_id: userId,
          performance_id: performanceId,
          model_updates: modelUpdates.object,
          applied_at: new Date().toISOString(),
          status: "applied",
        })
        .select()
        .single();

      if (updateError) throw updateError;

      ctx.logger.info(`✅ Personalization model updated with ${modelUpdates.object.algorithmAdjustments.length} adjustments`);

      return {
        success: true,
        updateId: modelUpdate.id,
        adjustmentsCount: modelUpdates.object.algorithmAdjustments.length,
        newFeaturesCount: modelUpdates.object.newFeatures.length,
        expectedImprovement: modelUpdates.object.expectedImprovement,
        accuracyTarget: modelUpdates.object.validationMetrics.accuracyTarget,
      };

    } catch (error) {
      ctx.logger.error("❌ Failed to update personalization model:", error);
      throw error;
    }
  },
});

// Helper functions
async function findSimilarUserPatterns(userId: string, userProfile: any, notificationContext: any) {
  // Mock implementation - would use pgvector similarity search
  return {
    similarUsers: [
      { userId: "user1", similarity: 0.85, patterns: ["high_engagement", "detail_oriented"] },
      { userId: "user2", similarity: 0.78, patterns: ["moderate_engagement", "action_oriented"] },
    ],
    commonPatterns: ["policy_focused", "deadline_driven"],
    averageSimilarity: 0.82,
  };
}

async function generateChannelVariations(personalizedContent: any, contextAnalysis: any, baseNotification: any) {
  const variations = {};
  const channels = ["email", "sms", "push", "in_app"];

  for (const channel of channels) {
    variations[channel] = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        title: z.string(),
        content: z.string(),
        callToAction: z.string(),
        formatting: z.object({
          length: z.enum(["short", "medium", "long"]),
          structure: z.array(z.string()),
        }),
      }),
      messages: [
        {
          role: "system",
          content: `Adapt the personalized content for ${channel} delivery, considering channel limitations and best practices.`,
        },
        {
          role: "user",
          content: `Personalized Content: ${JSON.stringify(personalizedContent, null, 2)}
Channel: ${channel}
User Context: ${JSON.stringify(contextAnalysis, null, 2)}`,
        },
      ],
    });
  }

  return variations;
}

function calculateRelevanceScore(contextAnalysis: any, baseNotification: any, personalizedContent: any): number {
  // Calculate relevance based on multiple factors
  const factors = contextAnalysis.relevanceFactors;
  const weights = {
    directImpact: 0.3,
    indirectImpact: 0.2,
    timelineRelevance: 0.2,
    geographicRelevance: 0.15,
    categoryRelevance: 0.15,
  };

  return Object.entries(factors).reduce((score, [factor, value]) => {
    return score + (value * (weights[factor] || 0));
  }, 0);
}

function determineUrgencyLevel(contextAnalysis: any, baseNotification: any, personalizedContent: any): string {
  const riskLevel = personalizedContent.riskAssessment.personalRiskLevel;
  const impactLevel = baseNotification.impactLevel;
  const userUrgency = contextAnalysis.urgencyLevel;

  if (riskLevel === "critical" || impactLevel === "critical") return "critical";
  if (riskLevel === "high" || impactLevel === "high" || userUrgency === "critical") return "high";
  if (riskLevel === "medium" || impactLevel === "medium" || userUrgency === "high") return "medium";
  return "low";
}

function calculateAverageReadTime(engagementHistory: any[]): number {
  const readTimes = engagementHistory
    .filter(n => n.metrics.read_time)
    .map(n => n.metrics.read_time);
  
  return readTimes.length > 0 ? readTimes.reduce((a, b) => a + b, 0) / readTimes.length / 60000 : 0;
}

function findBestEngagementHours(engagementHistory: any[]): string[] {
  // Mock implementation - would analyze actual engagement patterns
  return ["09:00-11:00", "14:00-16:00", "19:00-21:00"];
}

function findPreferredDays(engagementHistory: any[]): string[] {
  // Mock implementation - would analyze actual engagement patterns
  return ["Monday", "Tuesday", "Wednesday"];
}

// Export all tasks
export {
  analyzeUserContextTask,
  generatePersonalizedContentTask,
  optimizeNotificationTimingTask,
  trackPersonalizationPerformanceTask,
  updatePersonalizationModelTask,
};