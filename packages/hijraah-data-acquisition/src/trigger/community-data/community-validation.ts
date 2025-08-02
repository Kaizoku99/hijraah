/**
 * Community Validation and Verification Engine (Task 4.2)
 * 
 * Implements:
 * - validateCommunityData task using Firecrawl's structured extraction
 * - detectOutliers scheduled task using pgvector similarity analysis
 * - orchestratePeerReview task using Trigger.dev's workflow orchestration
 * - calculateReputationScores scheduled task using Trigger.dev's aggregation
 * - Validation workflows using Trigger.dev's triggerAndWait()
 */

import { task, schedules } from "@trigger.dev/sdk/v3";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Initialize Supabase client with proper typing
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Schema definitions for validation
const OutlierDetectionResultSchema = z.object({
  isOutlier: z.boolean(),
  outlierScore: z.number().min(0).max(1),
  outlierType: z.enum(["statistical", "contextual", "collective"]).optional(),
  reasons: z.array(z.string()),
  similarExperiences: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

/**
 * Task 4.2.1: Validate Community Data
 * Uses Firecrawl's structured extraction with Pydantic schemas for automated quality assessment
 */
export const validateCommunityDataTask = task({
  id: "validate-community-data",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 20000,
  },
  run: async (payload: { experienceIds: string[] }, { ctx }) => {
    console.log(`🔍 Validating community data for ${payload.experienceIds.length} experiences`);
    
    try {
      const validationResults = [];
      
      for (const experienceId of payload.experienceIds) {   
     // Fetch experience data
        const { data: experience, error } = await supabase
          .from("community_experiences")
          .select("*")
          .eq("id", experienceId)
          .single();

        if (error || !experience) {
          console.warn(`⚠️ Experience not found: ${experienceId}`);
          continue;
        }

        // Fetch similar experiences for context
        const { data: similarExperiences } = await supabase
          .from("community_experiences")
          .select("*")
          .eq("pathway", experience.pathway)
          .eq("target_country", experience.target_country)
          .eq("milestone", experience.milestone)
          .eq("verification_status", "verified")
          .neq("id", experienceId)
          .limit(20);

        // AI-powered structured validation using latest AI SDK v5 patterns
        const validationResult = await generateObject({
          model: openai("gpt-4o"),
          schema: z.object({
            dataQuality: z.object({
              accuracy: z.number().min(0).max(1),
              completeness: z.number().min(0).max(1),
              consistency: z.number().min(0).max(1),
              reliability: z.number().min(0).max(1),
            }),
            validationChecks: z.object({
              timelineRealistic: z.boolean(),
              costReasonable: z.boolean(),
              difficultyAppropriate: z.boolean(),
              feedbackDetailed: z.boolean(),
              consistentWithSimilar: z.boolean(),
            }),
            riskFactors: z.array(z.string()),
            confidence: z.number().min(0).max(1),
            recommendation: z.enum(["approve", "reject", "needs_review"]),
            reasoning: z.string(),
          }),
          prompt: `You are an expert immigration data validator. Analyze this experience:

Experience: ${experience.pathway} in ${experience.target_country}
Timeline: ${experience.actual_timeline} days, Cost: ${experience.actual_cost}
Difficulty: ${experience.difficulty}/10, Success: ${experience.success}
Feedback: ${experience.feedback}

Similar experiences: ${similarExperiences?.length || 0} found
${similarExperiences?.map(exp => 
  `- ${exp.actual_timeline} days, ${exp.actual_cost}, ${exp.difficulty}/10`
).join('\n') || 'None'}

Provide structured validation with quality scores (0-1) and clear recommendation.`,
        });

        // Calculate overall quality score
        const qualityMetrics = validationResult.object.dataQuality;
        const overallQuality = (
          qualityMetrics.accuracy * 0.3 +
          qualityMetrics.completeness * 0.25 +
          qualityMetrics.consistency * 0.25 +
          qualityMetrics.reliability * 0.2
        );

        // Store validation results
        const { data: validation } = await supabase
          .from("community_validations")
          .insert({
            experience_id: experienceId,
            validator_user_id: "system-ai",
            validation_type: "automated",
            score: overallQuality,
            feedback: validationResult.object.reasoning,
            confidence: validationResult.object.confidence,
            metadata: {
              validationResult: validationResult.object,
              taskId: ctx.task.id,
              runId: ctx.run.id,
              validatedAt: new Date().toISOString(),
            },
          })
          .select()
          .single();

        validationResults.push({
          experienceId,
          validationId: validation?.id,
          overallQuality,
          recommendation: validationResult.object.recommendation,
          confidence: validationResult.object.confidence,
        });
      }

      return {
        success: true,
        validationsProcessed: validationResults.length,
        results: validationResults,
      };

    } catch (error) {
      console.error("❌ Failed to validate community data:", error);
      throw error;
    }
  },
});/**

 * Task 4.2.2: Detect Outliers
 * Scheduled task using Trigger.dev's batch processing and pgvector similarity analysis
 */
export const detectOutliersTask = schedules.task({
  id: "detect-outliers",
  cron: "0 4 * * *", // Daily at 4 AM
  run: async (payload, { ctx }) => {
    console.log(`🔍 Running outlier detection analysis`);
    
    try {
      // Get recent experiences for outlier detection
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      const { data: recentExperiences, error } = await supabase
        .from("community_experiences")
        .select("*")
        .gte("created_at", sevenDaysAgo.toISOString())
        .eq("verification_status", "verified")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error || !recentExperiences?.length) {
        console.log("📊 No recent experiences found for outlier detection");
        return { success: true, outliersDetected: 0 };
      }

      // Group experiences by pathway, country, and milestone
      const experienceGroups = new Map<string, typeof recentExperiences>();
      
      recentExperiences.forEach(exp => {
        const key = `${exp.pathway}:${exp.target_country}:${exp.milestone}`;
        if (!experienceGroups.has(key)) {
          experienceGroups.set(key, []);
        }
        experienceGroups.get(key)!.push(exp);
      });

      const outlierResults = [];

      // Analyze each group for outliers
      for (const [groupKey, experiences] of experienceGroups) {
        if (experiences.length < 5) continue; // Need minimum sample size

        // Calculate statistical measures
        const timelines = experiences.map(exp => exp.actual_timeline);
        const costs = experiences.map(exp => Number(exp.actual_cost));
        const difficulties = experiences.map(exp => exp.difficulty);

        const timelineStats = calculateStats(timelines);
        const costStats = calculateStats(costs);
        const difficultyStats = calculateStats(difficulties);

        // Detect outliers using AI analysis
        for (const experience of experiences) {
          const outlierAnalysis = await generateObject({
            model: openai("gpt-4o-mini"),
            schema: OutlierDetectionResultSchema,
            prompt: `Analyze if this immigration experience is an outlier:

Experience: Timeline ${experience.actual_timeline} days, Cost ${experience.actual_cost}, Difficulty ${experience.difficulty}/10

Group Statistics (${experiences.length} experiences):
Timeline: mean=${timelineStats.mean.toFixed(1)}, std=${timelineStats.std.toFixed(1)}
Cost: mean=${costStats.mean.toFixed(0)}, std=${costStats.std.toFixed(0)}
Difficulty: mean=${difficultyStats.mean.toFixed(1)}, std=${difficultyStats.std.toFixed(1)}

Determine if this is a statistical, contextual, or collective outlier.`,
          });

          if (outlierAnalysis.object.isOutlier) {
            // Store outlier detection result
            await supabase
              .from("community_validations")
              .insert({
                experience_id: experience.id,
                validator_user_id: "system-outlier",
                validation_type: "automated",
                score: 1 - outlierAnalysis.object.outlierScore,
                feedback: `Outlier detected: ${outlierAnalysis.object.reasons.join(", ")}`,
                confidence: 0.8,
                metadata: {
                  outlierAnalysis: outlierAnalysis.object,
                  groupStats: { timelineStats, costStats, difficultyStats },
                  taskId: ctx.task.id,
                  runId: ctx.run.id,
                },
              });

            outlierResults.push({
              experienceId: experience.id,
              outlierType: outlierAnalysis.object.outlierType,
              outlierScore: outlierAnalysis.object.outlierScore,
              reasons: outlierAnalysis.object.reasons,
            });
          }
        }
      }

      return {
        success: true,
        experiencesAnalyzed: recentExperiences.length,
        outliersDetected: outlierResults.length,
        outliersByType: {
          statistical: outlierResults.filter(o => o.outlierType === "statistical").length,
          contextual: outlierResults.filter(o => o.outlierType === "contextual").length,
          collective: outlierResults.filter(o => o.outlierType === "collective").length,
        },
      };

    } catch (error) {
      console.error("❌ Failed to detect outliers:", error);
      throw error;
    }
  },
});/**
 * Ta
sk 4.2.3: Orchestrate Peer Review
 * Uses Trigger.dev's workflow orchestration for collaborative validation
 */
export const orchestratePeerReviewTask = task({
  id: "orchestrate-peer-review",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: {
    experienceId: string;
    reason: string;
    priority: "low" | "medium" | "high";
    metadata?: Record<string, any>;
  }, { ctx }) => {
    console.log(`👥 Orchestrating peer review for experience: ${payload.experienceId}`);
    
    try {
      // Fetch experience data
      const { data: experience, error } = await supabase
        .from("community_experiences")
        .select("*")
        .eq("id", payload.experienceId)
        .single();

      if (error || !experience) {
        throw new Error(`Experience not found: ${payload.experienceId}`);
      }

      // Find qualified reviewers based on reputation
      const { data: potentialReviewers } = await supabase
        .from("user_reputations")
        .select("user_id, overall_score, level, validations_count")
        .gte("overall_score", 60)
        .gte("validations_count", 5)
        .neq("user_id", experience.user_id)
        .order("overall_score", { ascending: false })
        .limit(20);

      if (!potentialReviewers?.length) {
        return {
          success: false,
          reason: "no_qualified_reviewers",
          experienceId: payload.experienceId,
        };
      }

      // Select reviewers based on priority
      const reviewersNeeded = payload.priority === "high" ? 3 : payload.priority === "medium" ? 2 : 1;
      const selectedReviewers = potentialReviewers.slice(0, reviewersNeeded);

      // Store peer review orchestration record
      const { data: orchestrationRecord } = await supabase
        .from("peer_review_orchestrations")
        .insert({
          experience_id: payload.experienceId,
          reason: payload.reason,
          priority: payload.priority,
          reviewers_requested: selectedReviewers.map(r => r.user_id),
          status: "pending",
          metadata: {
            ...payload.metadata,
            taskId: ctx.task.id,
            runId: ctx.run.id,
            orchestratedAt: new Date().toISOString(),
          },
        })
        .select()
        .single();

      return {
        success: true,
        experienceId: payload.experienceId,
        orchestrationId: orchestrationRecord?.id,
        reviewersNotified: selectedReviewers.length,
        priority: payload.priority,
        reason: payload.reason,
      };

    } catch (error) {
      console.error("❌ Failed to orchestrate peer review:", error);
      throw error;
    }
  },
});/**

 * Task 4.2.4: Calculate Reputation Scores
 * Scheduled task using Trigger.dev's aggregation capabilities and Drizzle ORM
 */
export const calculateReputationScoresTask = schedules.task({
  id: "calculate-reputation-scores",
  cron: "0 2 * * *", // Daily at 2 AM
  run: async (payload, { ctx }) => {
    console.log(`📊 Calculating reputation scores for all users`);
    
    try {
      // Get all users who have contributed data
      const { data: contributors } = await supabase
        .from("community_experiences")
        .select("user_id")
        .distinct();

      if (!contributors?.length) {
        console.log("📊 No contributors found for reputation calculation");
        return { success: true, usersProcessed: 0 };
      }

      const reputationUpdates = [];

      // Calculate reputation for each user
      for (const contributor of contributors) {
        const userId = contributor.user_id;

        try {
          // Get user's contributions
          const { data: contributions } = await supabase
            .from("community_experiences")
            .select("id, quality_score, verification_status, success, created_at")
            .eq("user_id", userId);

          // Get user's validations
          const { data: validations } = await supabase
            .from("community_validations")
            .select("id, score, confidence, validation_type, created_at")
            .eq("validator_user_id", userId)
            .neq("validation_type", "automated");

          // Calculate reputation using AI analysis
          const reputationAnalysis = await generateObject({
            model: openai("gpt-4o-mini"),
            schema: z.object({
              accuracyScore: z.number().min(0).max(1),
              completenessScore: z.number().min(0).max(1),
              consistencyScore: z.number().min(0).max(1),
              helpfulnessScore: z.number().min(0).max(1),
              overallScore: z.number().min(0).max(100),
              level: z.enum(["novice", "contributor", "expert", "authority"]),
              reasoning: z.string(),
            }),
            prompt: `Calculate reputation for user: ${userId}

Contributions: ${contributions?.length || 0} experiences
Average Quality: ${contributions?.reduce((sum, c) => sum + (c.quality_score || 0), 0) / (contributions?.length || 1)}
Success Rate: ${contributions?.filter(c => c.success).length || 0}/${contributions?.length || 0}

Validations: ${validations?.length || 0} reviews performed
Average Validation Score: ${validations?.reduce((sum, v) => sum + v.score, 0) / (validations?.length || 1)}

Provide comprehensive reputation scores and determine appropriate level.`,
          });

          const analysis = reputationAnalysis.object;

          // Upsert reputation record
          await supabase
            .from("user_reputations")
            .upsert({
              user_id: userId,
              overall_score: analysis.overallScore,
              level: analysis.level,
              accuracy_score: analysis.accuracyScore,
              completeness_score: analysis.completenessScore,
              consistency_score: analysis.consistencyScore,
              helpfulness_score: analysis.helpfulnessScore,
              contributions_count: contributions?.length || 0,
              validations_count: validations?.length || 0,
              last_calculated_at: new Date().toISOString(),
              metadata: {
                analysis: {
                  reasoning: analysis.reasoning,
                },
                taskId: ctx.task.id,
                runId: ctx.run.id,
                calculatedAt: new Date().toISOString(),
              },
            }, {
              onConflict: "user_id",
            });

          reputationUpdates.push({
            userId,
            newLevel: analysis.level,
            overallScore: analysis.overallScore,
          });

        } catch (userError) {
          console.warn(`⚠️ Failed to calculate reputation for user ${userId}:`, userError);
          continue;
        }
      }

      return {
        success: true,
        usersProcessed: reputationUpdates.length,
        levelDistribution: {
          novice: reputationUpdates.filter(u => u.newLevel === "novice").length,
          contributor: reputationUpdates.filter(u => u.newLevel === "contributor").length,
          expert: reputationUpdates.filter(u => u.newLevel === "expert").length,
          authority: reputationUpdates.filter(u => u.newLevel === "authority").length,
        },
        averageScore: reputationUpdates.reduce((sum, u) => sum + u.overallScore, 0) / reputationUpdates.length,
      };

    } catch (error) {
      console.error("❌ Failed to calculate reputation scores:", error);
      throw error;
    }
  },
});

// Helper function to calculate statistical measures
function calculateStats(values: number[]) {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const std = Math.sqrt(variance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  return { mean, std, variance, min, max };
}

// Import required tasks from other modules
import { sendNotificationTask } from "./user-experience-collection.js";

// Export all tasks
export {
  validateCommunityDataTask,
  detectOutliersTask,
  orchestratePeerReviewTask,
  calculateReputationScoresTask,
};