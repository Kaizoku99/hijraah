/**
 * Gamification and Reputation Tasks
 * 
 * Implements:
 * - gamifyContributions task using Trigger.dev's scheduled execution
 * - updateUserReputation task for reputation scoring
 * - calculateReputationScores scheduled task
 * - Leaderboard updates and rewards
 */

import { task, schedules } from "@trigger.dev/sdk/v3";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { 
  ReputationUpdateSchema,
  GamificationRewardSchema,
  type ReputationUpdate,
  type GamificationReward,
} from "./types.js";
import { z } from "zod";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Task 4.1.3: Gamify Contributions
 * Uses Trigger.dev's scheduled execution for leaderboard updates and rewards
 */
export const gamifyContributionsTask = schedules.task({
  id: "gamify-contributions",
  cron: "0 */6 * * *", // Every 6 hours
  run: async (payload, { ctx }) => {
    console.log(`🎮 Running gamification update cycle`);
    
    try {
      // Get recent contributions (last 6 hours)
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      
      const { data: recentExperiences, error: experiencesError } = await supabase
        .from("community_experiences")
        .select("user_id, verification_status, quality_score, created_at")
        .gte("created_at", sixHoursAgo.toISOString())
        .eq("verification_status", "verified");

      if (experiencesError) {
        throw new Error(`Failed to fetch recent experiences: ${experiencesError.message}`);
      }

      const { data: recentValidations, error: validationsError } = await supabase
        .from("community_validations")
        .select("validator_user_id, score, validation_type, created_at")
        .gte("created_at", sixHoursAgo.toISOString())
        .neq("validator_user_id", "system");

      if (validationsError) {
        throw new Error(`Failed to fetch recent validations: ${validationsError.message}`);
      }

      // Process contributions and award points/badges
      const userContributions = new Map<string, {
        experiences: number;
        validations: number;
        qualitySum: number;
        totalPoints: number;
      }>();

      // Process experiences
      recentExperiences?.forEach(exp => {
        const current = userContributions.get(exp.user_id) || {
          experiences: 0,
          validations: 0,
          qualitySum: 0,
          totalPoints: 0,
        };
        
        current.experiences += 1;
        current.qualitySum += Number(exp.quality_score) || 0;
        current.totalPoints += Math.round((Number(exp.quality_score) || 0) * 100); // Quality-based points
        
        userContributions.set(exp.user_id, current);
      });

      // Process validations
      recentValidations?.forEach(val => {
        const current = userContributions.get(val.validator_user_id) || {
          experiences: 0,
          validations: 0,
          qualitySum: 0,
          totalPoints: 0,
        };
        
        current.validations += 1;
        current.totalPoints += 50; // Fixed points for validation
        
        userContributions.set(val.validator_user_id, current);
      });

      // Award rewards and update reputations
      const rewardResults = [];
      
      for (const [userId, contribution] of userContributions) {
        // Calculate rewards
        const rewards: GamificationReward[] = [];
        
        // Experience contribution rewards
        if (contribution.experiences > 0) {
          rewards.push({
            userId,
            rewardType: "points",
            rewardName: "Experience Contributor",
            description: `Shared ${contribution.experiences} immigration experience(s)`,
            points: Math.round(contribution.qualitySum * 100),
            metadata: {
              experienceCount: contribution.experiences,
              averageQuality: contribution.qualitySum / contribution.experiences,
            },
          });

          // Quality badges
          const avgQuality = contribution.qualitySum / contribution.experiences;
          if (avgQuality >= 0.9) {
            rewards.push({
              userId,
              rewardType: "badge",
              rewardName: "Quality Expert",
              description: "Consistently provides high-quality experiences",
              points: 200,
              metadata: { averageQuality: avgQuality },
            });
          } else if (avgQuality >= 0.8) {
            rewards.push({
              userId,
              rewardType: "badge",
              rewardName: "Reliable Contributor",
              description: "Provides reliable immigration experiences",
              points: 100,
              metadata: { averageQuality: avgQuality },
            });
          }
        }

        // Validation rewards
        if (contribution.validations > 0) {
          rewards.push({
            userId,
            rewardType: "points",
            rewardName: "Community Validator",
            description: `Validated ${contribution.validations} community experience(s)`,
            points: contribution.validations * 50,
            metadata: {
              validationCount: contribution.validations,
            },
          });

          // Validation milestone badges
          if (contribution.validations >= 10) {
            rewards.push({
              userId,
              rewardType: "badge",
              rewardName: "Validation Champion",
              description: "Validated 10+ community experiences",
              points: 500,
              metadata: { validationCount: contribution.validations },
            });
          } else if (contribution.validations >= 5) {
            rewards.push({
              userId,
              rewardType: "badge",
              rewardName: "Community Helper",
              description: "Validated 5+ community experiences",
              points: 250,
              metadata: { validationCount: contribution.validations },
            });
          }
        }

        // Award rewards
        for (const reward of rewards) {
          try {
            const { data: awardedReward, error: rewardError } = await supabase
              .from("gamification_rewards")
              .insert({
                user_id: reward.userId,
                reward_type: reward.rewardType,
                reward_name: reward.rewardName,
                description: reward.description,
                points: reward.points,
                metadata: {
                  ...reward.metadata,
                  taskId: ctx.task.id,
                  runId: ctx.run.id,
                  awardedAt: new Date().toISOString(),
                },
              })
              .select()
              .single();

            if (rewardError) {
              console.warn(`⚠️ Failed to award reward to ${reward.userId}:`, rewardError);
            } else {
              rewardResults.push(awardedReward);
              
              // Send notification about reward
              await sendNotificationTask.trigger({
                userId: reward.userId,
                type: "reward_earned",
                title: `🎉 You earned: ${reward.rewardName}`,
                message: reward.description || `You've been awarded ${reward.points} points!`,
                priority: "medium",
                metadata: {
                  rewardId: awardedReward.id,
                  rewardType: reward.rewardType,
                  points: reward.points,
                },
              });
            }
          } catch (error) {
            console.warn(`⚠️ Error awarding reward to ${reward.userId}:`, error);
          }
        }

        // Update user reputation
        await updateUserReputationTask.trigger({
          userId,
          action: "contribution",
          impact: contribution.qualitySum / Math.max(contribution.experiences, 1),
          details: {
            experiences: contribution.experiences,
            validations: contribution.validations,
            totalPoints: contribution.totalPoints,
            period: "6h",
          },
        });
      }

      // Update leaderboards
      await updateLeaderboardsTask.trigger({
        period: "recent",
        userContributions: Array.from(userContributions.entries()).map(([userId, contrib]) => ({
          userId,
          ...contrib,
        })),
      });

      console.log(`✅ Gamification cycle completed. Processed ${userContributions.size} users, awarded ${rewardResults.length} rewards`);
      
      return {
        success: true,
        usersProcessed: userContributions.size,
        rewardsAwarded: rewardResults.length,
        experiencesProcessed: recentExperiences?.length || 0,
        validationsProcessed: recentValidations?.length || 0,
        metadata: {
          period: "6h",
          processedAt: new Date().toISOString(),
        },
      };

    } catch (error) {
      console.error("❌ Failed to run gamification cycle:", error);
      throw error;
    }
  },
});

/**
 * Update User Reputation Task
 * Calculates and updates user reputation scores based on contributions
 */
export const updateUserReputationTask = task({
  id: "update-user-reputation",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: ReputationUpdate, { ctx }) => {
    console.log(`📊 Updating reputation for user: ${payload.userId}`);
    
    try {
      // Validate input
      const validatedPayload = ReputationUpdateSchema.parse(payload);
      
      // Get current reputation or create new one
      let { data: reputation, error: reputationError } = await supabase
        .from("user_reputations")
        .select("*")
        .eq("user_id", validatedPayload.userId)
        .single();

      if (reputationError && reputationError.code !== "PGRST116") {
        throw new Error(`Failed to fetch reputation: ${reputationError.message}`);
      }

      // Create new reputation if doesn't exist
      if (!reputation) {
        const { data: newReputation, error: createError } = await supabase
          .from("user_reputations")
          .insert({
            user_id: validatedPayload.userId,
            overall_score: 0,
            level: "novice",
            accuracy_score: 0,
            completeness_score: 0,
            consistency_score: 0,
            helpfulness_score: 0,
            contributions_count: 0,
            validations_count: 0,
          })
          .select()
          .single();

        if (createError) {
          throw new Error(`Failed to create reputation: ${createError.message}`);
        }
        
        reputation = newReputation;
      }

      // Get user's contribution statistics
      const { data: userExperiences } = await supabase
        .from("community_experiences")
        .select("quality_score, verification_status")
        .eq("user_id", validatedPayload.userId)
        .eq("verification_status", "verified");

      const { data: userValidations } = await supabase
        .from("community_validations")
        .select("score, confidence")
        .eq("validator_user_id", validatedPayload.userId);

      // Calculate new scores
      const experienceCount = userExperiences?.length || 0;
      const validationCount = userValidations?.length || 0;
      
      const avgQuality = experienceCount > 0 
        ? userExperiences!.reduce((sum, exp) => sum + (Number(exp.quality_score) || 0), 0) / experienceCount
        : 0;
      
      const avgValidationScore = validationCount > 0
        ? userValidations!.reduce((sum, val) => sum + Number(val.score), 0) / validationCount
        : 0;

      // Calculate component scores
      const accuracyScore = Math.min(1, avgQuality * 1.2); // Boost quality slightly
      const completenessScore = Math.min(1, (experienceCount * 0.1) + (avgQuality * 0.5));
      const consistencyScore = experienceCount > 1 
        ? Math.min(1, 1 - (Math.abs(avgQuality - 0.8) * 2)) // Consistency around 0.8 quality
        : avgQuality;
      const helpfulnessScore = Math.min(1, (validationCount * 0.05) + (avgValidationScore * 0.7));

      // Calculate overall score (0-100)
      const overallScore = Math.round(
        (accuracyScore * 30 + completenessScore * 25 + consistencyScore * 25 + helpfulnessScore * 20)
      );

      // Determine level
      let level = "novice";
      if (overallScore >= 80 && experienceCount >= 10 && validationCount >= 20) {
        level = "authority";
      } else if (overallScore >= 60 && experienceCount >= 5 && validationCount >= 10) {
        level = "expert";
      } else if (overallScore >= 40 && (experienceCount >= 3 || validationCount >= 5)) {
        level = "contributor";
      }

      // Update reputation
      const { data: updatedReputation, error: updateError } = await supabase
        .from("user_reputations")
        .update({
          overall_score: overallScore,
          level,
          accuracy_score: accuracyScore,
          completeness_score: completenessScore,
          consistency_score: consistencyScore,
          helpfulness_score: helpfulnessScore,
          contributions_count: experienceCount,
          validations_count: validationCount,
          last_calculated_at: new Date().toISOString(),
          metadata: {
            lastUpdate: {
              action: validatedPayload.action,
              impact: validatedPayload.impact,
              details: validatedPayload.details,
              taskId: ctx.task.id,
              runId: ctx.run.id,
            },
            statistics: {
              avgQuality,
              avgValidationScore,
              experienceCount,
              validationCount,
            },
          },
        })
        .eq("user_id", validatedPayload.userId)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Failed to update reputation: ${updateError.message}`);
      }

      // Check for level up and award achievement
      if (updatedReputation.level !== reputation.level) {
        await supabase
          .from("gamification_rewards")
          .insert({
            user_id: validatedPayload.userId,
            reward_type: "level_up",
            reward_name: `Level Up: ${updatedReputation.level}`,
            description: `Congratulations! You've reached ${updatedReputation.level} level`,
            points: level === "authority" ? 1000 : level === "expert" ? 500 : level === "contributor" ? 200 : 0,
            metadata: {
              previousLevel: reputation.level,
              newLevel: updatedReputation.level,
              overallScore,
            },
          });

        // Send level up notification
        await sendNotificationTask.trigger({
          userId: validatedPayload.userId,
          type: "reward_earned",
          title: `🎉 Level Up! You're now a ${updatedReputation.level}`,
          message: `Your reputation has grown to ${overallScore}/100. Keep up the great work!`,
          priority: "high",
          metadata: {
            levelUp: true,
            previousLevel: reputation.level,
            newLevel: updatedReputation.level,
            overallScore,
          },
        });
      }

      console.log(`✅ Reputation updated for user ${validatedPayload.userId}: ${overallScore}/100 (${updatedReputation.level})`);
      
      return {
        success: true,
        userId: validatedPayload.userId,
        previousScore: Number(reputation.overall_score),
        newScore: overallScore,
        previousLevel: reputation.level,
        newLevel: updatedReputation.level,
        levelUp: updatedReputation.level !== reputation.level,
        scores: {
          accuracy: accuracyScore,
          completeness: completenessScore,
          consistency: consistencyScore,
          helpfulness: helpfulnessScore,
        },
        statistics: {
          experienceCount,
          validationCount,
          avgQuality,
          avgValidationScore,
        },
      };

    } catch (error) {
      console.error("❌ Failed to update user reputation:", error);
      throw error;
    }
  },
});

/**
 * Update Leaderboards Task
 * Updates various leaderboards based on user contributions
 */
export const updateLeaderboardsTask = task({
  id: "update-leaderboards",
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 5000,
  },
  run: async (payload: { 
    period: string; 
    userContributions: Array<{
      userId: string;
      experiences: number;
      validations: number;
      qualitySum: number;
      totalPoints: number;
    }>;
  }, { ctx }) => {
    console.log(`🏆 Updating leaderboards for period: ${payload.period}`);
    
    try {
      // This would typically update a leaderboard cache or table
      // For now, we'll just log the top contributors
      
      const topContributors = payload.userContributions
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 10);

      console.log(`🏆 Top contributors for ${payload.period}:`, 
        topContributors.map((user, index) => 
          `${index + 1}. User ${user.userId}: ${user.totalPoints} points`
        ).join('\n')
      );

      // In a real implementation, you would:
      // 1. Update leaderboard cache in Redis
      // 2. Store leaderboard snapshots in database
      // 3. Send notifications to top performers
      // 4. Update leaderboard UI components

      return {
        success: true,
        period: payload.period,
        topContributors: topContributors.slice(0, 5), // Return top 5
        totalUsers: payload.userContributions.length,
        updatedAt: new Date().toISOString(),
      };

    } catch (error) {
      console.error("❌ Failed to update leaderboards:", error);
      throw error;
    }
  },
});

// Import the notification task
import { sendNotificationTask } from "./user-experience-collection.js";

