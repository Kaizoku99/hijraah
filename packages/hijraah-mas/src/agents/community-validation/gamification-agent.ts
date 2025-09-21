import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  GamificationProfileSchema,
  AchievementSchema,
  ContributorProfileSchema,
  CommunityValidationConfigSchema,
  type GamificationProfile,
  type Achievement,
  type ContributorProfile,
  type CommunityValidationConfig,
} from "./types.js";

/**
 * Gamification Agent using AI SDK v5
 * Manages achievement tracking, motivation enhancement, and reward systems
 */
export class GamificationAgent {
  private config: CommunityValidationConfig;

  constructor(config: Partial<CommunityValidationConfig> = {}) {
    this.config = CommunityValidationConfigSchema.parse(config);
  }

  /**
   * Update gamification profile based on user activity
   */
  async updateGamificationProfile(
    contributor: ContributorProfile,
    currentProfile: GamificationProfile,
    recentActivity: {
      contributions: Array<{
        id: string;
        type: string;
        quality: number;
        impact: number;
        date: string;
      }>;
      reviews: Array<{
        id: string;
        quality: number;
        helpfulness: number;
        date: string;
      }>;
      communityActions: Array<{
        type: "help" | "mentoring" | "discussion" | "feedback";
        impact: number;
        date: string;
      }>;
    }
  ): Promise<GamificationProfile> {
    // Define tools for gamification analysis
    const pointsCalculationTool = tool({
      description: "Calculate points earned from recent activities",
      parameters: z.object({
        contributions: z.array(z.any()),
        reviews: z.array(z.any()),
        communityActions: z.array(z.any()),
        currentLevel: z.number(),
      }),
      execute: async ({
        contributions,
        reviews,
        communityActions,
        currentLevel,
      }: {
        contributions: any[];
        reviews: any[];
        communityActions: any[];
        currentLevel: number;
      }) => {
        let totalPoints = 0;

        // Points from contributions
        contributions.forEach((contrib: any) => {
          const basePoints =
            {
              experience: 10,
              document: 15,
              policy_update: 20,
              advice: 8,
              translation: 12,
            }[contrib.type] || 5;

          const qualityMultiplier = contrib.quality / 10; // 0-1 scale
          const impactMultiplier = contrib.impact / 10; // 0-1 scale
          const levelBonus = Math.floor(currentLevel / 10) * 0.1; // 10% bonus per 10 levels

          const points = Math.round(
            basePoints * qualityMultiplier * impactMultiplier * (1 + levelBonus)
          );
          totalPoints += points;
        });

        // Points from reviews
        reviews.forEach((review: any) => {
          const basePoints = 5;
          const qualityMultiplier = review.quality / 10;
          const helpfulnessMultiplier = review.helpfulness / 10;

          const points = Math.round(
            basePoints * qualityMultiplier * helpfulnessMultiplier
          );
          totalPoints += points;
        });

        // Points from community actions
        communityActions.forEach((action: any) => {
          const basePoints =
            {
              help: 3,
              mentoring: 8,
              discussion: 2,
              feedback: 4,
            }[action.type] || 1;

          const impactMultiplier = action.impact / 10;
          const points = Math.round(basePoints * impactMultiplier);
          totalPoints += points;
        });

        return {
          pointsEarned: totalPoints,
          contributionPoints: contributions.length * 10,
          reviewPoints: reviews.length * 5,
          communityPoints: communityActions.length * 3,
        };
      },
    });

    const achievementCheckTool = tool({
      description: "Check for newly earned achievements",
      parameters: z.object({
        contributor: z.any(),
        currentProfile: z.any(),
        recentActivity: z.any(),
        availableAchievements: z.array(z.any()).optional(),
      }),
      execute: async ({ contributor, currentProfile, recentActivity }) => {
        const newAchievements: any[] = [];

        // Check contribution-based achievements
        const totalContributions = contributor.totalContributions;
        if (
          totalContributions >= 100 &&
          !currentProfile.achievements.some(
            (a: any) => a.achievementId === "contributor_100"
          )
        ) {
          newAchievements.push({
            achievementId: "contributor_100",
            earnedDate: new Date().toISOString(),
            progress: 1.0,
          });
        }

        // Check review-based achievements
        const totalReviews = recentActivity.reviews.length;
        if (
          totalReviews >= 50 &&
          !currentProfile.achievements.some(
            (a: any) => a.achievementId === "reviewer_50"
          )
        ) {
          newAchievements.push({
            achievementId: "reviewer_50",
            earnedDate: new Date().toISOString(),
            progress: 1.0,
          });
        }

        // Check streak achievements
        if (
          currentProfile.streaks.currentContributionStreak >= 30 &&
          !currentProfile.achievements.some(
            (a: any) => a.achievementId === "streak_30"
          )
        ) {
          newAchievements.push({
            achievementId: "streak_30",
            earnedDate: new Date().toISOString(),
            progress: 1.0,
          });
        }

        // Check quality achievements
        const highQualityContributions = recentActivity.contributions.filter(
          (c: any) => c.quality >= 8
        ).length;
        if (
          highQualityContributions >= 10 &&
          !currentProfile.achievements.some(
            (a: any) => a.achievementId === "quality_expert"
          )
        ) {
          newAchievements.push({
            achievementId: "quality_expert",
            earnedDate: new Date().toISOString(),
            progress: 1.0,
          });
        }

        // Check community helper achievements
        const helpActions = recentActivity.communityActions.filter(
          (a: any) => a.type === "help"
        ).length;
        if (
          helpActions >= 25 &&
          !currentProfile.achievements.some(
            (a: any) => a.achievementId === "community_helper"
          )
        ) {
          newAchievements.push({
            achievementId: "community_helper",
            earnedDate: new Date().toISOString(),
            progress: 1.0,
          });
        }

        return newAchievements;
      },
    });

    const streakCalculationTool = tool({
      description: "Calculate current streaks and update streak records",
      parameters: z.object({
        recentActivity: z.any(),
        currentStreaks: z.any(),
      }),
      execute: async ({ recentActivity, currentStreaks }) => {
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

        // Check contribution streak
        const hasContributionToday = recentActivity.contributions.some(
          (c: any) => new Date(c.date).toDateString() === today.toDateString()
        );
        const hasContributionYesterday = recentActivity.contributions.some(
          (c: any) =>
            new Date(c.date).toDateString() === yesterday.toDateString()
        );

        let newContributionStreak = currentStreaks.currentContributionStreak;
        if (hasContributionToday) {
          if (
            hasContributionYesterday ||
            currentStreaks.currentContributionStreak === 0
          ) {
            newContributionStreak =
              currentStreaks.currentContributionStreak + 1;
          }
        } else if (!hasContributionYesterday) {
          newContributionStreak = 0;
        }

        // Check review streak
        const hasReviewToday = recentActivity.reviews.some(
          (r: any) => new Date(r.date).toDateString() === today.toDateString()
        );
        const hasReviewYesterday = recentActivity.reviews.some(
          (r: any) =>
            new Date(r.date).toDateString() === yesterday.toDateString()
        );

        let newReviewStreak = currentStreaks.currentReviewStreak;
        if (hasReviewToday) {
          if (hasReviewYesterday || currentStreaks.currentReviewStreak === 0) {
            newReviewStreak = currentStreaks.currentReviewStreak + 1;
          }
        } else if (!hasReviewYesterday) {
          newReviewStreak = 0;
        }

        return {
          currentContributionStreak: newContributionStreak,
          longestContributionStreak: Math.max(
            currentStreaks.longestContributionStreak,
            newContributionStreak
          ),
          currentReviewStreak: newReviewStreak,
          longestReviewStreak: Math.max(
            currentStreaks.longestReviewStreak,
            newReviewStreak
          ),
        };
      },
    });

    const leaderboardUpdateTool = tool({
      description: "Update leaderboard positions and rankings",
      parameters: z.object({
        userId: z.string(),
        totalPoints: z.number(),
        level: z.number(),
        recentActivity: z.any(),
      }),
      execute: async ({ userId, totalPoints, level, recentActivity }) => {
        // In a real implementation, this would query the database for rankings
        // For now, we'll simulate leaderboard positions
        const leaderboards = [
          {
            category: "Overall Points",
            rank: Math.floor(Math.random() * 100) + 1,
            totalParticipants: 1000,
            percentile: Math.floor(Math.random() * 100),
          },
          {
            category: "Monthly Contributions",
            rank: Math.floor(Math.random() * 50) + 1,
            totalParticipants: 500,
            percentile: Math.floor(Math.random() * 100),
          },
          {
            category: "Review Quality",
            rank: Math.floor(Math.random() * 200) + 1,
            totalParticipants: 800,
            percentile: Math.floor(Math.random() * 100),
          },
        ];

        return leaderboards;
      },
    });

    // Generate updated gamification profile using AI SDK v5
    const { object: updatedProfile } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      tools: {
        calculatePoints: pointsCalculationTool,
        checkAchievements: achievementCheckTool,
        calculateStreaks: streakCalculationTool,
        updateLeaderboards: leaderboardUpdateTool,
      },
      schema: GamificationProfileSchema,
      system: `You are an expert gamification specialist with deep knowledge of motivation psychology, achievement systems, and community engagement strategies.

Your role is to:
1. Calculate points and rewards based on user activities and contributions
2. Track and award achievements that recognize valuable community participation
3. Maintain streak tracking to encourage consistent engagement
4. Update leaderboard positions and competitive rankings
5. Analyze motivation factors and personalize engagement strategies
6. Set appropriate goals and challenges for continued growth

Use the available tools to conduct comprehensive gamification analysis. Consider:
- Point calculation based on activity quality and impact
- Achievement unlocking based on milestones and accomplishments
- Streak maintenance and record tracking
- Leaderboard positioning and competitive elements
- Motivation factors and engagement preferences
- Goal setting and progress tracking

Provide engaging, motivating gamification updates that encourage continued valuable participation in the community.`,
      prompt: `Update gamification profile for contributor:

**Contributor Profile:**
${JSON.stringify(contributor, null, 2)}

**Current Gamification Profile:**
${JSON.stringify(currentProfile, null, 2)}

**Recent Activity:**
${JSON.stringify(recentActivity, null, 2)}

**Requirements:**
1. Use the calculation tools to update points, achievements, streaks, and leaderboards
2. Provide a comprehensive gamification profile update with:
   - Updated level and point totals based on recent activity
   - New achievements earned and progress toward future achievements
   - Current streaks and streak records
   - Updated leaderboard positions across different categories
   - Motivation factor analysis and engagement recommendations
   - Next goals and challenges to maintain engagement

Focus on creating engaging, motivating experiences that recognize valuable contributions and encourage continued community participation.`,
    });

    return {
      ...updatedProfile,
      userId: contributor.userId,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Create personalized challenges and goals
   */
  async createPersonalizedChallenges(
    contributor: ContributorProfile,
    gamificationProfile: GamificationProfile,
    preferences?: {
      challengeTypes: string[];
      difficulty: "easy" | "medium" | "hard";
      timeframe: number; // days
      focusAreas: string[];
    }
  ): Promise<{
    challenges: Array<{
      id: string;
      title: string;
      description: string;
      type: "contribution" | "review" | "streak" | "quality" | "community";
      difficulty: "easy" | "medium" | "hard";
      requirements: Array<{
        metric: string;
        target: number;
        current: number;
        progress: number;
      }>;
      rewards: {
        points: number;
        badges: string[];
        recognition: string;
      };
      timeframe: string;
      status: "available" | "active" | "completed" | "expired";
    }>;
    recommendedFocus: string[];
    motivationalMessage: string;
  }> {
    const { object: challenges } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        challenges: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            type: z.enum([
              "contribution",
              "review",
              "streak",
              "quality",
              "community",
            ]),
            difficulty: z.enum(["easy", "medium", "hard"]),
            requirements: z.array(
              z.object({
                metric: z.string(),
                target: z.number(),
                current: z.number(),
                progress: z.number(),
              })
            ),
            rewards: z.object({
              points: z.number(),
              badges: z.array(z.string()),
              recognition: z.string(),
            }),
            timeframe: z.string(),
            status: z.enum(["available", "active", "completed", "expired"]),
          })
        ),
        recommendedFocus: z.array(z.string()),
        motivationalMessage: z.string(),
      }),
      system: `You are creating personalized challenges and goals to motivate community participation. 
      Design engaging, achievable challenges that align with user preferences and current skill level.`,
      prompt: `Create personalized challenges for contributor:

**Contributor:** ${JSON.stringify(contributor, null, 2)}
**Gamification Profile:** ${JSON.stringify(gamificationProfile, null, 2)}
**Preferences:** ${JSON.stringify(preferences, null, 2)}

Design engaging challenges that motivate continued participation and skill development.`,
    });

    return challenges;
  }

  /**
   * Generate achievement system and badge definitions
   */
  async generateAchievementSystem(communityMetrics: {
    totalUsers: number;
    averageContributions: number;
    topPerformers: Array<{ userId: string; score: number }>;
    communityGoals: string[];
  }): Promise<{
    achievements: Achievement[];
    badgeCategories: Array<{
      category: string;
      description: string;
      badges: Array<{
        id: string;
        name: string;
        description: string;
        rarity: number;
        requirements: string[];
      }>;
    }>;
    seasonalEvents: Array<{
      id: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      specialAchievements: string[];
      bonusMultipliers: Record<string, number>;
    }>;
  }> {
    const { object: achievementSystem } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        achievements: z.array(AchievementSchema),
        badgeCategories: z.array(
          z.object({
            category: z.string(),
            description: z.string(),
            badges: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                rarity: z.number(),
                requirements: z.array(z.string()),
              })
            ),
          })
        ),
        seasonalEvents: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            specialAchievements: z.array(z.string()),
            bonusMultipliers: z.record(z.number()),
          })
        ),
      }),
      system: `You are designing a comprehensive achievement system for an immigration community platform. 
      Create engaging, meaningful achievements that recognize valuable contributions and encourage positive behavior.`,
      prompt: `Design achievement system based on community metrics:

**Community Metrics:** ${JSON.stringify(communityMetrics, null, 2)}

Create a comprehensive achievement system with diverse recognition opportunities and seasonal engagement events.`,
    });

    return achievementSystem;
  }

  /**
   * Analyze engagement patterns and provide recommendations
   */
  async analyzeEngagementPatterns(
    users: Array<{
      userId: string;
      profile: ContributorProfile;
      gamificationProfile: GamificationProfile;
      recentActivity: any[];
    }>,
    timeframe: number // days
  ): Promise<{
    engagementInsights: {
      overallEngagement: number;
      engagementTrends: Record<string, number>;
      dropoffPoints: string[];
      successFactors: string[];
    };
    userSegments: Array<{
      segment: string;
      description: string;
      userCount: number;
      characteristics: string[];
      recommendations: string[];
    }>;
    systemRecommendations: Array<{
      category: string;
      recommendation: string;
      expectedImpact: string;
      implementation: string;
    }>;
  }> {
    const { object: analysis } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        engagementInsights: z.object({
          overallEngagement: z.number(),
          engagementTrends: z.record(z.number()),
          dropoffPoints: z.array(z.string()),
          successFactors: z.array(z.string()),
        }),
        userSegments: z.array(
          z.object({
            segment: z.string(),
            description: z.string(),
            userCount: z.number(),
            characteristics: z.array(z.string()),
            recommendations: z.array(z.string()),
          })
        ),
        systemRecommendations: z.array(
          z.object({
            category: z.string(),
            recommendation: z.string(),
            expectedImpact: z.string(),
            implementation: z.string(),
          })
        ),
      }),
      system: `You are analyzing user engagement patterns to improve gamification effectiveness. 
      Provide insights and recommendations to increase community participation and retention.`,
      prompt: `Analyze engagement patterns for ${users.length} users over ${timeframe} days:

**User Data:** ${JSON.stringify(users.slice(0, 10), null, 2)} // Sample for analysis

Provide comprehensive engagement analysis with actionable recommendations for system improvement.`,
    });

    return analysis;
  }

  /**
   * Generate motivational content and notifications
   */
  async generateMotivationalContent(
    contributor: ContributorProfile,
    gamificationProfile: GamificationProfile,
    context: {
      recentAchievements: string[];
      upcomingGoals: string[];
      communityEvents: string[];
      personalMilestones: string[];
    }
  ): Promise<{
    welcomeMessage: string;
    achievementCelebrations: string[];
    progressEncouragement: string;
    goalReminders: string[];
    communityHighlights: string[];
    personalizedTips: string[];
  }> {
    const { object: content } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        welcomeMessage: z.string(),
        achievementCelebrations: z.array(z.string()),
        progressEncouragement: z.string(),
        goalReminders: z.array(z.string()),
        communityHighlights: z.array(z.string()),
        personalizedTips: z.array(z.string()),
      }),
      system: `You are generating motivational content to encourage community participation. 
      Create positive, personalized messages that celebrate achievements and encourage continued engagement.`,
      prompt: `Generate motivational content for contributor:

**Contributor:** ${JSON.stringify(contributor, null, 2)}
**Gamification Profile:** ${JSON.stringify(gamificationProfile, null, 2)}
**Context:** ${JSON.stringify(context, null, 2)}

Create engaging, personalized motivational content that encourages continued participation.`,
    });

    return content;
  }
}
