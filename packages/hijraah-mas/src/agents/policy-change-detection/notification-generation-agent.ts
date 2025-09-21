import { generateText, generateObject, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import {
  NotificationContentSchema,
  NotificationContext,
  NotificationContent,
  PolicyChangeResult,
  PolicyImpactAssessment,
} from "./types";

/**
 * Notification Generation Agent - Specialized agent for creating personalized alerts and communications
 * Uses AI SDK v5's text generation with personalized alerts and communication
 */
export class NotificationGenerationAgent {
  private supabaseClient: any;

  constructor() {
    this.initializeSupabaseClient();
  }

  private async initializeSupabaseClient() {
    this.supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

  /**
   * Generate personalized notifications for policy changes
   */
  async generateNotification(
    policyChange: PolicyChangeResult,
    impactAssessment: PolicyImpactAssessment,
    userId: string,
    context: NotificationContext
  ): Promise<NotificationContent> {
    const { object: notification } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        notification: NotificationContentSchema,
        generationMetadata: z.object({
          personalizationFactors: z.array(z.string()),
          contentStrategy: z.string(),
          urgencyRationale: z.string(),
          channelRecommendations: z.array(
            z.object({
              channel: z.enum(["email", "sms", "push", "in_app"]),
              suitability: z.number().min(0).max(1),
              rationale: z.string(),
            })
          ),
        }),
      }),
      tools: {
        getUserProfile: this.createUserProfileTool(),
        calculateRelevance: this.createRelevanceCalculationTool(),
        generateContent: this.createContentGenerationTool(),
        selectChannels: this.createChannelSelectionTool(),
        personalizeMessage: this.createPersonalizationTool(),
        validateNotification: this.createValidationTool(),
      },

      system: `You are a specialized Notification Generation Agent with expertise in personalized communication and user engagement.

Your responsibilities:
- Generate personalized notifications for policy changes based on user profiles and impact assessments
- Select appropriate communication channels based on urgency and user preferences
- Create clear, actionable content that helps users understand and respond to changes
- Ensure notifications are timely, relevant, and appropriately urgent
- Provide comprehensive information while maintaining readability

Key capabilities:
- Multi-channel notification generation (email, SMS, push, in-app)
- Personalization based on user profiles, preferences, and case status
- Urgency assessment and appropriate tone adjustment
- Action item generation with clear deadlines and next steps
- Resource linking and guidance provision
- Accessibility and multi-language support

Content guidelines:
- Use clear, jargon-free language appropriate for the target audience
- Structure information hierarchically (summary → details → actions)
- Include specific deadlines and consequences when applicable
- Provide relevant resources and contact information
- Maintain professional yet empathetic tone
- Ensure cultural sensitivity and appropriate localization

Personalization factors:
- User's current immigration status and case type
- Historical interaction patterns and preferences
- Language and cultural background
- Urgency tolerance and communication frequency preferences
- Device and channel usage patterns`,
      prompt: `Generate a personalized notification for the following policy change:

Policy Change:
- Title: ${policyChange.title}
- Description: ${policyChange.description}
- Severity: ${policyChange.severity}
- Effective Date: ${policyChange.effectiveDate}
- Affected Categories: ${policyChange.affectedCategories.join(", ")}

Impact Assessment:
- Overall Impact: ${impactAssessment.overallImpact}
- Affected User Groups: ${impactAssessment.affectedUserGroups.length} groups
- Risk Factors: ${impactAssessment.riskFactors.length} identified
- Compliance Requirements: ${impactAssessment.complianceRequirements.length} requirements

User Context:
- User ID: ${userId}
- Preferred Channels: ${context.userPreferences.channels.join(", ")}
- Communication Frequency: ${context.userPreferences.frequency}
- Urgency Preferences: ${context.userPreferences.urgency.join(", ")}
- Timezone: ${context.deliverySettings.timezone}
- Language: ${context.deliverySettings.language}
- Format Preference: ${context.deliverySettings.format}

Please generate a comprehensive, personalized notification that:
1. Assesses the relevance and impact for this specific user
2. Selects the most appropriate communication channels
3. Creates clear, actionable content with appropriate urgency
4. Includes specific next steps and deadlines
5. Provides relevant resources and support information
6. Ensures the message is culturally appropriate and accessible`,
    });

    // Store the notification for tracking and analytics
    await this.storeNotification(notification.notification);

    return notification.notification;
  }

  /**
   * Generate batch notifications for multiple users
   */
  async generateBatchNotifications(
    policyChange: PolicyChangeResult,
    impactAssessment: PolicyImpactAssessment,
    userIds: string[],
    contexts: Record<string, NotificationContext>
  ): Promise<NotificationContent[]> {
    const { object: batchResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        notifications: z.array(NotificationContentSchema),
        batchMetadata: z.object({
          totalGenerated: z.number(),
          channelDistribution: z.record(z.number()),
          urgencyDistribution: z.record(z.number()),
          personalizationStats: z.object({
            highlyPersonalized: z.number(),
            moderatelyPersonalized: z.number(),
            standardized: z.number(),
          }),
          estimatedDeliveryTime: z.string(),
        }),
        optimizations: z.array(
          z.object({
            optimization: z.string(),
            description: z.string(),
            estimatedSavings: z.string(),
          })
        ),
      }),
      tools: {
        getUserProfiles: this.createBatchUserProfileTool(),
        segmentUsers: this.createUserSegmentationTool(),
        generateTemplates: this.createTemplateGenerationTool(),
        personalizeContent: this.createBatchPersonalizationTool(),
        optimizeDelivery: this.createDeliveryOptimizationTool(),
      },

      system: `You are generating batch notifications for multiple users. Focus on:
- Efficient personalization while maintaining quality
- User segmentation for targeted messaging
- Channel optimization for cost and effectiveness
- Template generation with variable personalization
- Delivery timing optimization`,
      prompt: `Generate personalized notifications for ${userIds.length} users regarding:

Policy Change: ${policyChange.title}
Impact Level: ${impactAssessment.overallImpact}
User IDs: ${userIds.slice(0, 10).join(", ")}${userIds.length > 10 ? ` and ${userIds.length - 10} more` : ""}

Create efficient batch processing with appropriate personalization for each user segment.`,
    });

    // Store all notifications
    await Promise.all(
      batchResult.notifications.map((notification) =>
        this.storeNotification(notification)
      )
    );

    return batchResult.notifications;
  }

  /**
   * Generate follow-up notifications based on user actions
   */
  async generateFollowUpNotification(
    originalNotification: NotificationContent,
    userAction: "viewed" | "ignored" | "acted" | "requested_more_info",
    daysSinceOriginal: number
  ): Promise<NotificationContent | null> {
    const { object: followUp } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        shouldSendFollowUp: z.boolean(),
        notification: NotificationContentSchema.optional(),
        reasoning: z.string(),
        alternativeActions: z.array(
          z.object({
            action: z.string(),
            description: z.string(),
            timeline: z.string(),
          })
        ),
      }),
      tools: {
        analyzeUserBehavior: this.createBehaviorAnalysisTool(),
        assessUrgency: this.createUrgencyAssessmentTool(),
        generateFollowUpContent: this.createFollowUpContentTool(),
      },

      system: `You are determining whether and how to follow up on a previous notification based on user behavior. Consider:
- User engagement patterns and preferences
- Urgency of the original message
- Time elapsed since original notification
- Appropriate follow-up strategies
- Risk of notification fatigue`,
      prompt: `Analyze follow-up need for notification:

Original Notification:
- Subject: ${originalNotification.subject}
- Urgency: ${originalNotification.urgency}
- Channels: ${originalNotification.channels.join(", ")}
- Sent to: ${originalNotification.userId}

User Response:
- Action: ${userAction}
- Days since original: ${daysSinceOriginal}

Determine if a follow-up is appropriate and generate content if needed.`,
    });

    if (followUp.shouldSendFollowUp && followUp.notification) {
      await this.storeNotification(followUp.notification);
      return followUp.notification;
    }

    return null;
  }

  /**
   * Generate emergency notifications for critical policy changes
   */
  async generateEmergencyNotification(
    policyChange: PolicyChangeResult,
    affectedUserIds: string[],
    emergencyContext: {
      timeToDeadline: number; // hours
      criticalActions: string[];
      escalationLevel: "high" | "critical";
    }
  ): Promise<NotificationContent[]> {
    const { object: emergency } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        notifications: z.array(NotificationContentSchema),
        emergencyProtocol: z.object({
          deliveryMethod: z.enum(["immediate", "staggered", "priority_based"]),
          channelStrategy: z.string(),
          escalationPlan: z.array(z.string()),
          monitoringRequirements: z.array(z.string()),
        }),
        communicationPlan: z.object({
          initialNotification: z.string(),
          followUpSchedule: z.array(
            z.object({
              timing: z.string(),
              content: z.string(),
              channels: z.array(z.string()),
            })
          ),
          supportResources: z.array(
            z.object({
              resource: z.string(),
              availability: z.string(),
              contact: z.string(),
            })
          ),
        }),
      }),
      tools: {
        prioritizeUsers: this.createUserPrioritizationTool(),
        generateUrgentContent: this.createUrgentContentTool(),
        selectEmergencyChannels: this.createEmergencyChannelTool(),
        createEscalationPlan: this.createEscalationPlanTool(),
      },

      system: `You are generating emergency notifications for critical policy changes. Focus on:
- Maximum urgency and clarity
- Multi-channel delivery for reliability
- Clear action items with specific deadlines
- Escalation procedures for non-response
- Support resource availability`,
      prompt: `Generate emergency notifications for critical policy change:

Policy: ${policyChange.title}
Severity: ${policyChange.severity}
Time to Deadline: ${emergencyContext.timeToDeadline} hours
Affected Users: ${affectedUserIds.length}
Escalation Level: ${emergencyContext.escalationLevel}
Critical Actions: ${emergencyContext.criticalActions.join(", ")}

Create immediate, high-impact notifications with comprehensive emergency protocols.`,
    });

    // Store emergency notifications with high priority
    await Promise.all(
      emergency.notifications.map((notification) =>
        this.storeNotification(notification, true)
      )
    );

    return emergency.notifications;
  }

  // Tool implementations
  private createUserProfileTool() {
    return tool({
      description: "Retrieve user profile information for personalization",
      parameters: z.object({
        userId: z.string(),
      }),
      execute: async ({ userId }) => {
        try {
          const { data: user, error } = await this.supabaseClient
            .from("users")
            .select(
              `
              *,
              user_preferences (*),
              immigration_cases (*),
              notification_history (*)
            `
            )
            .eq("id", userId)
            .single();

          if (error) throw error;

          return {
            success: true,
            profile: {
              id: user.id,
              name: user.name,
              email: user.email,
              language: user.language || "en",
              timezone: user.timezone || "UTC",
              immigrationStatus:
                user.immigration_cases?.[0]?.status || "unknown",
              caseType: user.immigration_cases?.[0]?.type || "general",
              preferences: user.user_preferences || {},
              notificationHistory: user.notification_history || [],
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to retrieve user profile",
            profile: null,
          };
        }
      },
    });
  }

  private createRelevanceCalculationTool() {
    return tool({
      description: "Calculate relevance of policy change to specific user",
      parameters: z.object({
        userProfile: z.any(),
        policyChange: z.object({
          affectedCategories: z.array(z.string()),
          severity: z.string(),
          changeType: z.string(),
        }),
        impactAssessment: z.any(),
      }),
      execute: async ({ userProfile, policyChange, impactAssessment }) => {
        try {
          // Calculate relevance based on multiple factors
          const categoryRelevance = this.calculateCategoryRelevance(
            userProfile.caseType,
            policyChange.affectedCategories
          );

          const statusRelevance = this.calculateStatusRelevance(
            userProfile.immigrationStatus,
            policyChange.changeType
          );

          const impactRelevance = this.calculateImpactRelevance(
            userProfile,
            impactAssessment.affectedUserGroups
          );

          const overallRelevance =
            (categoryRelevance + statusRelevance + impactRelevance) / 3;

          return {
            success: true,
            relevance: {
              overall: overallRelevance,
              breakdown: {
                category: categoryRelevance,
                status: statusRelevance,
                impact: impactRelevance,
              },
              isHighlyRelevant: overallRelevance > 0.7,
              relevanceFactors: this.identifyRelevanceFactors(
                userProfile,
                policyChange
              ),
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Relevance calculation failed",
            relevance: {
              overall: 0.5,
              breakdown: {},
              isHighlyRelevant: false,
              relevanceFactors: [],
            },
          };
        }
      },
    });
  }

  private createContentGenerationTool() {
    return tool({
      description:
        "Generate notification content based on context and personalization",
      parameters: z.object({
        template: z.enum([
          "standard",
          "urgent",
          "informational",
          "action_required",
        ]),
        personalizationData: z.any(),
        contentRequirements: z.object({
          maxLength: z.number().optional(),
          includeDeadlines: z.boolean(),
          includeResources: z.boolean(),
          tone: z.enum(["formal", "friendly", "urgent", "supportive"]),
        }),
      }),
      execute: async ({
        template,
        personalizationData,
        contentRequirements,
      }) => {
        try {
          const content = await generateText({
            model: openai("gpt-4o"),
            system: `Generate notification content with the following requirements:
- Template type: ${template}
- Tone: ${contentRequirements.tone}
- Include deadlines: ${contentRequirements.includeDeadlines}
- Include resources: ${contentRequirements.includeResources}
- Max length: ${contentRequirements.maxLength || "no limit"}`,
            prompt: `Create notification content for:
${JSON.stringify(personalizationData, null, 2)}

Ensure the content is clear, actionable, and appropriately personalized.`,
          });

          return {
            success: true,
            content: {
              subject: this.extractSubject(content.text),
              summary: this.extractSummary(content.text),
              details: this.extractDetails(content.text),
              actionItems: this.extractActionItems(content.text),
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Content generation failed",
            content: null,
          };
        }
      },
    });
  }

  private createChannelSelectionTool() {
    return tool({
      description:
        "Select optimal communication channels based on urgency and preferences",
      parameters: z.object({
        urgency: z.enum(["low", "medium", "high", "critical"]),
        userPreferences: z.object({
          channels: z.array(z.string()),
          frequency: z.string(),
          urgencyThresholds: z.array(z.string()),
        }),
        contentType: z.enum([
          "informational",
          "action_required",
          "deadline_reminder",
          "emergency",
        ]),
      }),
      execute: async ({ urgency, userPreferences, contentType }) => {
        try {
          const channelScores = this.calculateChannelScores(
            urgency,
            userPreferences,
            contentType
          );

          const selectedChannels = Object.entries(channelScores)
            .filter(([_, score]) => score > 0.5)
            .sort(([_, a], [__, b]) => b - a)
            .map(([channel, score]) => ({
              channel: channel as "email" | "sms" | "push" | "in_app",
              score,
              rationale: this.getChannelRationale(
                channel,
                urgency,
                contentType
              ),
            }));

          return {
            success: true,
            selectedChannels,
            primaryChannel: selectedChannels[0]?.channel || "email",
            deliveryStrategy: this.determineDeliveryStrategy(
              urgency,
              selectedChannels
            ),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Channel selection failed",
            selectedChannels: [],
          };
        }
      },
    });
  }

  private createPersonalizationTool() {
    return tool({
      description:
        "Personalize message content based on user profile and context",
      parameters: z.object({
        baseContent: z.object({
          subject: z.string(),
          summary: z.string(),
          details: z.string(),
          actionItems: z.array(z.string()),
        }),
        userProfile: z.any(),
        personalizationLevel: z.enum(["basic", "moderate", "high"]),
      }),
      execute: async ({ baseContent, userProfile, personalizationLevel }) => {
        try {
          const personalizedContent = {
            subject: this.personalizeSubject(
              baseContent.subject,
              userProfile,
              personalizationLevel
            ),
            summary: this.personalizeSummary(
              baseContent.summary,
              userProfile,
              personalizationLevel
            ),
            details: this.personalizeDetails(
              baseContent.details,
              userProfile,
              personalizationLevel
            ),
            actionItems: this.personalizeActionItems(
              baseContent.actionItems,
              userProfile,
              personalizationLevel
            ),
          };

          const personalizationFactors = this.identifyPersonalizationFactors(
            userProfile,
            personalizationLevel
          );

          return {
            success: true,
            personalizedContent,
            personalizationFactors,
            personalizationScore: this.calculatePersonalizationScore(
              personalizationFactors
            ),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error ? error.message : "Personalization failed",
            personalizedContent: baseContent,
          };
        }
      },
    });
  }

  private createValidationTool() {
    return tool({
      description: "Validate notification content for quality and compliance",
      parameters: z.object({
        notification: z.any(),
        validationCriteria: z.object({
          checkAccessibility: z.boolean(),
          checkLanguage: z.boolean(),
          checkCompliance: z.boolean(),
          checkClarity: z.boolean(),
        }),
      }),
      execute: async ({ notification, validationCriteria }) => {
        try {
          const validationResults = {
            isValid: true,
            issues: [] as string[],
            warnings: [] as string[],
            suggestions: [] as string[],
            scores: {
              accessibility: 0,
              language: 0,
              compliance: 0,
              clarity: 0,
            },
          };

          if (validationCriteria.checkAccessibility) {
            const accessibilityScore = this.validateAccessibility(notification);
            validationResults.scores.accessibility = accessibilityScore;
            if (accessibilityScore < 0.8) {
              validationResults.warnings.push(
                "Accessibility could be improved"
              );
            }
          }

          if (validationCriteria.checkLanguage) {
            const languageScore = this.validateLanguage(notification);
            validationResults.scores.language = languageScore;
            if (languageScore < 0.7) {
              validationResults.issues.push(
                "Language clarity needs improvement"
              );
              validationResults.isValid = false;
            }
          }

          if (validationCriteria.checkCompliance) {
            const complianceScore = this.validateCompliance(notification);
            validationResults.scores.compliance = complianceScore;
            if (complianceScore < 0.9) {
              validationResults.issues.push(
                "Compliance requirements not fully met"
              );
              validationResults.isValid = false;
            }
          }

          if (validationCriteria.checkClarity) {
            const clarityScore = this.validateClarity(notification);
            validationResults.scores.clarity = clarityScore;
            if (clarityScore < 0.8) {
              validationResults.suggestions.push(
                "Consider simplifying language for better clarity"
              );
            }
          }

          return {
            success: true,
            validation: validationResults,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : "Validation failed",
            validation: {
              isValid: false,
              issues: ["Validation error"],
              warnings: [],
              suggestions: [],
              scores: {},
            },
          };
        }
      },
    });
  }

  private createBatchUserProfileTool() {
    return tool({
      description: "Retrieve multiple user profiles for batch processing",
      parameters: z.object({
        userIds: z.array(z.string()),
      }),
      execute: async ({ userIds }) => {
        try {
          const { data: users, error } = await this.supabaseClient
            .from("users")
            .select(
              `
              *,
              user_preferences (*),
              immigration_cases (*)
            `
            )
            .in("id", userIds);

          if (error) throw error;

          const profiles =
            users?.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              language: user.language || "en",
              timezone: user.timezone || "UTC",
              immigrationStatus:
                user.immigration_cases?.[0]?.status || "unknown",
              caseType: user.immigration_cases?.[0]?.type || "general",
              preferences: user.user_preferences || {},
            })) || [];

          return {
            success: true,
            profiles,
            count: profiles.length,
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to retrieve user profiles",
            profiles: [],
            count: 0,
          };
        }
      },
    });
  }

  private createUserSegmentationTool() {
    return tool({
      description: "Segment users for targeted messaging",
      parameters: z.object({
        profiles: z.array(z.any()),
        segmentationCriteria: z.array(
          z.enum(["case_type", "status", "language", "urgency_preference"])
        ),
      }),
      execute: async ({ profiles, segmentationCriteria }) => {
        try {
          const segments = this.segmentUsers(profiles, segmentationCriteria);

          return {
            success: true,
            segments: segments.map((segment) => ({
              name: segment.name,
              criteria: segment.criteria,
              userCount: segment.users.length,
              characteristics: segment.characteristics,
              recommendedPersonalization: segment.recommendedPersonalization,
            })),
            totalSegments: segments.length,
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "User segmentation failed",
            segments: [],
          };
        }
      },
    });
  }

  private createTemplateGenerationTool() {
    return tool({
      description:
        "Generate notification templates for different user segments",
      parameters: z.object({
        segments: z.array(z.any()),
        policyChange: z.any(),
        baseTemplate: z.string(),
      }),
      execute: async ({ segments, policyChange, baseTemplate }) => {
        try {
          const templates = await Promise.all(
            segments.map(async (segment) => {
              const template = await generateText({
                model: openai("gpt-4o-mini"),
                system: `Generate a notification template for user segment: ${segment.name}
Characteristics: ${segment.characteristics.join(", ")}
Personalization level: ${segment.recommendedPersonalization}`,
                prompt: `Create template for policy change: ${policyChange.title}
Base template: ${baseTemplate}
Segment-specific considerations: ${segment.criteria.join(", ")}`,
              });

              return {
                segmentName: segment.name,
                template: template.text,
                personalizationPoints: this.identifyPersonalizationPoints(
                  template.text
                ),
                estimatedReach: segment.userCount,
              };
            })
          );

          return {
            success: true,
            templates,
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Template generation failed",
            templates: [],
          };
        }
      },
    });
  }

  private createBatchPersonalizationTool() {
    return tool({
      description: "Apply personalization to batch notifications efficiently",
      parameters: z.object({
        templates: z.array(z.any()),
        userProfiles: z.array(z.any()),
      }),
      execute: async ({ templates, userProfiles }) => {
        try {
          const personalizedNotifications = userProfiles.map((profile) => {
            const matchingTemplate = this.findBestTemplate(profile, templates);
            const personalizedContent = this.applyPersonalization(
              matchingTemplate,
              profile
            );

            return {
              userId: profile.id,
              content: personalizedContent,
              templateUsed: matchingTemplate.segmentName,
              personalizationLevel: this.assessPersonalizationLevel(
                personalizedContent,
                profile
              ),
            };
          });

          return {
            success: true,
            personalizedNotifications,
            stats: {
              totalPersonalized: personalizedNotifications.length,
              templatesUsed: new Set(
                personalizedNotifications.map((n) => n.templateUsed)
              ).size,
              averagePersonalizationLevel:
                personalizedNotifications.reduce(
                  (sum, n) => sum + n.personalizationLevel,
                  0
                ) / personalizedNotifications.length,
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Batch personalization failed",
            personalizedNotifications: [],
          };
        }
      },
    });
  }

  private createDeliveryOptimizationTool() {
    return tool({
      description: "Optimize notification delivery timing and channels",
      parameters: z.object({
        notifications: z.array(z.any()),
        deliveryConstraints: z.object({
          maxConcurrent: z.number(),
          timeWindow: z.object({
            start: z.string(),
            end: z.string(),
          }),
          channelLimits: z.record(z.number()),
        }),
      }),
      execute: async ({ notifications, deliveryConstraints }) => {
        try {
          const optimizedSchedule = this.optimizeDeliverySchedule(
            notifications,
            deliveryConstraints
          );

          return {
            success: true,
            schedule: optimizedSchedule,
            estimatedDeliveryTime:
              this.calculateEstimatedDeliveryTime(optimizedSchedule),
            channelUtilization:
              this.calculateChannelUtilization(optimizedSchedule),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Delivery optimization failed",
            schedule: [],
          };
        }
      },
    });
  }

  private createBehaviorAnalysisTool() {
    return tool({
      description: "Analyze user behavior patterns for follow-up decisions",
      parameters: z.object({
        userId: z.string(),
        notificationHistory: z.array(z.any()),
        recentActions: z.array(z.string()),
      }),
      execute: async ({ userId, notificationHistory, recentActions }) => {
        try {
          const behaviorPattern = this.analyzeBehaviorPattern(
            notificationHistory,
            recentActions
          );

          return {
            success: true,
            analysis: {
              engagementLevel: behaviorPattern.engagementLevel,
              responseTime: behaviorPattern.averageResponseTime,
              preferredChannels: behaviorPattern.preferredChannels,
              followUpReceptivity: behaviorPattern.followUpReceptivity,
              riskOfFatigue: behaviorPattern.riskOfFatigue,
            },
            recommendations:
              this.generateBehaviorRecommendations(behaviorPattern),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Behavior analysis failed",
            analysis: null,
          };
        }
      },
    });
  }

  private createUrgencyAssessmentTool() {
    return tool({
      description: "Assess urgency for follow-up notifications",
      parameters: z.object({
        originalUrgency: z.enum(["low", "medium", "high", "critical"]),
        daysSinceOriginal: z.number(),
        userAction: z.string(),
        deadlineProximity: z.number().optional(),
      }),
      execute: async ({
        originalUrgency,
        daysSinceOriginal,
        userAction,
        deadlineProximity,
      }) => {
        try {
          const urgencyScore = this.calculateFollowUpUrgency(
            originalUrgency,
            daysSinceOriginal,
            userAction,
            deadlineProximity
          );

          return {
            success: true,
            urgencyAssessment: {
              score: urgencyScore,
              level: this.scoreToUrgencyLevel(urgencyScore),
              factors: this.identifyUrgencyFactors(
                originalUrgency,
                daysSinceOriginal,
                userAction
              ),
              recommendation: this.getUrgencyRecommendation(urgencyScore),
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Urgency assessment failed",
            urgencyAssessment: null,
          };
        }
      },
    });
  }

  private createFollowUpContentTool() {
    return tool({
      description: "Generate follow-up notification content",
      parameters: z.object({
        originalContent: z.any(),
        userAction: z.string(),
        urgencyLevel: z.string(),
        daysSinceOriginal: z.number(),
      }),
      execute: async ({
        originalContent,
        userAction,
        urgencyLevel,
        daysSinceOriginal,
      }) => {
        try {
          const followUpContent = await generateText({
            model: openai("gpt-4o"),
            system: `Generate follow-up notification content based on:
- Original message: ${originalContent.subject}
- User action: ${userAction}
- Urgency: ${urgencyLevel}
- Days elapsed: ${daysSinceOriginal}

Create appropriate follow-up that acknowledges the user's previous interaction.`,
            prompt: `Create follow-up notification content that is appropriate for the user's ${userAction} response to the original message about "${originalContent.subject}".`,
          });

          return {
            success: true,
            content: {
              subject: this.generateFollowUpSubject(
                originalContent.subject,
                userAction
              ),
              body: followUpContent.text,
              actionItems: this.generateFollowUpActions(
                userAction,
                urgencyLevel
              ),
              tone: this.determineFollowUpTone(userAction, urgencyLevel),
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Follow-up content generation failed",
            content: null,
          };
        }
      },
    });
  }

  private createUserPrioritizationTool() {
    return tool({
      description: "Prioritize users for emergency notifications",
      parameters: z.object({
        userIds: z.array(z.string()),
        emergencyContext: z.any(),
      }),
      execute: async ({ userIds, emergencyContext }) => {
        try {
          // Get user profiles for prioritization
          const { data: users } = await this.supabaseClient
            .from("users")
            .select("*, immigration_cases(*)")
            .in("id", userIds);

          const prioritizedUsers = (users || [])
            .map((user) => {
              const priorityScore = this.calculateEmergencyPriority(
                user,
                emergencyContext
              );
              return {
                userId: user.id,
                priorityScore,
                priorityLevel: this.scoreToPriorityLevel(priorityScore),
                rationale: this.generatePriorityRationale(
                  user,
                  emergencyContext
                ),
              };
            })
            .sort((a, b) => b.priorityScore - a.priorityScore);

          return {
            success: true,
            prioritizedUsers,
            criticalUsers: prioritizedUsers.filter(
              (u) => u.priorityLevel === "critical"
            ),
            highPriorityUsers: prioritizedUsers.filter(
              (u) => u.priorityLevel === "high"
            ),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "User prioritization failed",
            prioritizedUsers: [],
          };
        }
      },
    });
  }

  private createUrgentContentTool() {
    return tool({
      description: "Generate urgent notification content for emergencies",
      parameters: z.object({
        policyChange: z.any(),
        emergencyContext: z.any(),
        userProfile: z.any(),
      }),
      execute: async ({ policyChange, emergencyContext, userProfile }) => {
        try {
          const urgentContent = await generateText({
            model: openai("gpt-4o"),
            system: `Generate URGENT notification content for emergency policy change.
Requirements:
- Maximum clarity and brevity
- Immediate action items
- Clear consequences
- Emergency contact information
- Deadline emphasis`,
            prompt: `URGENT: Generate emergency notification for:
Policy: ${policyChange.title}
Time to deadline: ${emergencyContext.timeToDeadline} hours
Critical actions: ${emergencyContext.criticalActions.join(", ")}
User: ${userProfile.name} (${userProfile.caseType})

Create maximum impact, minimum confusion content.`,
          });

          return {
            success: true,
            content: {
              subject: `URGENT ACTION REQUIRED: ${policyChange.title}`,
              body: urgentContent.text,
              actionItems: emergencyContext.criticalActions,
              deadline: this.calculateEmergencyDeadline(
                emergencyContext.timeToDeadline
              ),
              emergencyContacts: this.getEmergencyContacts(),
            },
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Urgent content generation failed",
            content: null,
          };
        }
      },
    });
  }

  private createEmergencyChannelTool() {
    return tool({
      description: "Select emergency communication channels",
      parameters: z.object({
        urgencyLevel: z.string(),
        userPreferences: z.any(),
        availableChannels: z.array(z.string()),
      }),
      execute: async ({ urgencyLevel, userPreferences, availableChannels }) => {
        try {
          const emergencyChannels = this.selectEmergencyChannels(
            urgencyLevel,
            userPreferences,
            availableChannels
          );

          return {
            success: true,
            selectedChannels: emergencyChannels,
            deliveryStrategy: "simultaneous_multi_channel",
            fallbackPlan: this.createChannelFallbackPlan(emergencyChannels),
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Emergency channel selection failed",
            selectedChannels: [],
          };
        }
      },
    });
  }

  private createEscalationPlanTool() {
    return tool({
      description: "Create escalation plan for emergency notifications",
      parameters: z.object({
        emergencyLevel: z.string(),
        timeToDeadline: z.number(),
        affectedUserCount: z.number(),
      }),
      execute: async ({
        emergencyLevel,
        timeToDeadline,
        affectedUserCount,
      }) => {
        try {
          const escalationPlan = this.createEscalationPlan(
            emergencyLevel,
            timeToDeadline,
            affectedUserCount
          );

          return {
            success: true,
            escalationPlan,
          };
        } catch (error) {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Escalation plan creation failed",
            escalationPlan: null,
          };
        }
      },
    });
  }

  // Helper methods
  private async storeNotification(
    notification: NotificationContent,
    isEmergency = false
  ): Promise<void> {
    try {
      const { error } = await this.supabaseClient.from("notifications").insert({
        id: crypto.randomUUID(),
        user_id: notification.userId,
        change_id: notification.changeId,
        urgency: notification.urgency,
        channels: notification.channels,
        subject: notification.subject,
        content: notification.content,
        personalization: notification.personalization,
        is_emergency: isEmergency,
        created_at: new Date().toISOString(),
        status: "pending",
      });

      if (error) {
        console.error("Failed to store notification:", error);
      }
    } catch (error) {
      console.error("Error storing notification:", error);
    }
  }

  // Content extraction helpers
  private extractSubject(text: string): string {
    const lines = text.split("\n");
    return (lines[0]?.replace(/^(Subject:|SUBJECT:)\s*/i, "") || "Policy Update Notification");
  }

  private extractSummary(text: string): string {
    const summaryMatch = text.match(/Summary:(.*?)(?:\n\n|\nDetails:|$)/s);
    return (
      summaryMatch?.[1]?.trim() ||
      text.split("\n")[1] ||
      "Policy change notification"
    );
  }

  private extractDetails(text: string): string {
    const detailsMatch = text.match(/Details:(.*?)(?:\n\nAction|$)/s);
    return detailsMatch?.[1]?.trim() || text;
  }

  private extractActionItems(text: string): string[] {
    const actionMatch = text.match(/Action Items?:(.*?)(?:\n\n|$)/s);
    if (!actionMatch) return [];

    return actionMatch[1]
      .split("\n")
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .filter((line) => line.length > 0);
  }

  // Calculation helpers
  private calculateCategoryRelevance(
    caseType: string,
    affectedCategories: string[]
  ): number {
    const relevantCategories = affectedCategories.filter(
      (category) =>
        category.toLowerCase().includes(caseType.toLowerCase()) ||
        caseType.toLowerCase().includes(category.toLowerCase())
    );
    return relevantCategories.length / Math.max(affectedCategories.length, 1);
  }

  private calculateStatusRelevance(status: string, changeType: string): number {
    const statusRelevanceMap: Record<string, Record<string, number>> = {
      new_policy: { new: 0.9, pending: 0.7, approved: 0.3 },
      amendment: { pending: 0.9, new: 0.6, approved: 0.8 },
      repeal: { approved: 0.9, pending: 0.7, new: 0.4 },
    };

    return statusRelevanceMap[changeType]?.[status] || 0.5;
  }

  private calculateImpactRelevance(
    userProfile: any,
    affectedGroups: any[]
  ): number {
    const userGroup = affectedGroups.find(
      (group) =>
        group.group
          .toLowerCase()
          .includes(userProfile.caseType.toLowerCase()) ||
        group.group
          .toLowerCase()
          .includes(userProfile.immigrationStatus.toLowerCase())
    );

    if (!userGroup) return 0.3;

    const impactScores: Record<string, number> = {
      low: 0.4,
      medium: 0.7,
      high: 1.0,
    };

    return impactScores[userGroup.impactLevel] || 0.5;
  }

  private identifyRelevanceFactors(
    userProfile: any,
    policyChange: any
  ): string[] {
    const factors: any[] = [];

    if (
      policyChange.affectedCategories.some((cat: string) =>
        cat.toLowerCase().includes(userProfile.caseType.toLowerCase())
      )
    ) {
      factors.push(`Affects ${userProfile.caseType} cases`);
    }

    if (
      policyChange.severity === "high" ||
      policyChange.severity === "critical"
    ) {
      factors.push("High severity change");
    }

    return factors;
  }

  private calculateChannelScores(
    urgency: string,
    preferences: any,
    contentType: string
  ): Record<string, number> {
    const baseScores: Record<string, number> = {
      email: 0.8,
      sms: 0.6,
      push: 0.7,
      in_app: 0.5,
    };

    const urgencyMultipliers: Record<string, Record<string, number>> = {
      critical: { email: 1.0, sms: 1.2, push: 1.1, in_app: 0.8 },
      high: { email: 1.0, sms: 1.1, push: 1.0, in_app: 0.9 },
      medium: { email: 1.0, sms: 0.8, push: 1.0, in_app: 1.0 },
      low: { email: 1.0, sms: 0.6, push: 0.9, in_app: 1.1 },
    };

    const preferenceMultipliers = preferences.channels.reduce(
      (acc: any, channel: string) => {
        acc[channel] = 1.2;
        return acc;
      },
      {}
    );

    const scores: Record<string, number> = {};
    Object.keys(baseScores).forEach((channel) => {
      scores[channel] =
        baseScores[channel] *
        (urgencyMultipliers[urgency]?.[channel] || 1.0) *
        (preferenceMultipliers[channel] || 1.0);
    });

    return scores;
  }

  private getChannelRationale(
    channel: string,
    urgency: string,
    contentType: string
  ): string {
    const rationales: Record<string, string> = {
      email: "Detailed content delivery with rich formatting",
      sms: "Immediate delivery for urgent notifications",
      push: "Real-time alerts with quick access",
      in_app: "Contextual notifications within the platform",
    };

    return rationales[channel] || "Standard communication channel";
  }

  private determineDeliveryStrategy(urgency: string, channels: any[]): string {
    if (urgency === "critical") return "immediate_multi_channel";
    if (urgency === "high") return "priority_delivery";
    if (channels.length > 1) return "sequential_delivery";
    return "standard_delivery";
  }

  // Personalization helpers
  private personalizeSubject(
    subject: string,
    profile: any,
    level: string
  ): string {
    if (level === "high") {
      return `${profile.name}, ${subject}`;
    }
    return subject;
  }

  private personalizeSummary(
    summary: string,
    profile: any,
    level: string
  ): string {
    if (level === "high" || level === "moderate") {
      return summary.replace(/your case/g, `your ${profile.caseType} case`);
    }
    return summary;
  }

  private personalizeDetails(
    details: string,
    profile: any,
    level: string
  ): string {
    if (level === "high") {
      return details
        .replace(/applicants/g, `${profile.caseType} applicants`)
        .replace(/your status/g, `your ${profile.immigrationStatus} status`);
    }
    return details;
  }

  private personalizeActionItems(
    items: string[],
    profile: any,
    level: string
  ): string[] {
    if (level === "high") {
      return items.map((item) =>
        item.replace(
          /your application/g,
          `your ${profile.caseType} application`
        )
      );
    }
    return items;
  }

  private identifyPersonalizationFactors(
    profile: any,
    level: string
  ): string[] {
    const factors: any[] = [];

    if (level === "high") {
      factors.push("Name personalization");
      factors.push("Case type specific language");
      factors.push("Status-aware messaging");
    }

    if (level === "moderate" || level === "high") {
      factors.push("Preference-based channel selection");
      factors.push("Language localization");
    }

    return factors;
  }

  private calculatePersonalizationScore(factors: string[]): number {
    return Math.min(1.0, factors.length * 0.2);
  }

  // Validation helpers
  private validateAccessibility(notification: any): number {
    // Simplified accessibility validation
    let score = 0.8;

    if (notification.content.summary.length < 200) score += 0.1;
    if (notification.content.actionItems.length <= 5) score += 0.1;

    return Math.min(1.0, score);
  }

  private validateLanguage(notification: any): number {
    // Simplified language validation
    const text =
      notification.content.summary + " " + notification.content.details;
    const sentences = text.split(/[.!?]+/);
    const avgSentenceLength =
      sentences.reduce((sum, s) => sum + s.split(" ").length, 0) /
      sentences.length;

    return avgSentenceLength < 20 ? 0.9 : 0.7;
  }

  private validateCompliance(notification: any): number {
    // Simplified compliance validation
    let score = 0.9;

    if (!notification.content.actionItems.length) score -= 0.2;
    if (!notification.subject.includes("Policy")) score -= 0.1;

    return Math.max(0.0, score);
  }

  private validateClarity(notification: any): number {
    // Simplified clarity validation
    const hasDeadline = notification.content.actionItems.some(
      (item: string) =>
        item.includes("by") ||
        item.includes("before") ||
        item.includes("deadline")
    );

    return hasDeadline ? 0.9 : 0.7;
  }

  // Batch processing helpers
  private segmentUsers(profiles: any[], criteria: string[]): any[] {
    const segments: any[] = [];

    if (criteria.includes("case_type")) {
      const caseTypes = [...new Set(profiles.map((p) => p.caseType))];
      caseTypes.forEach((type) => {
        segments.push({
          name: `${type} Cases`,
          criteria: ["case_type"],
          users: profiles.filter((p) => p.caseType === type),
          characteristics: [type],
          recommendedPersonalization: "moderate",
        });
      });
    }

    return segments;
  }

  private identifyPersonalizationPoints(template: string): string[] {
    const points: any[] = [];

    if (template.includes("{name}")) points.push("Name insertion");
    if (template.includes("{case_type}")) points.push("Case type specific");
    if (template.includes("{status}")) points.push("Status aware");

    return points;
  }

  private findBestTemplate(profile: any, templates: any[]): any {
    return (
      templates.find((t) =>
        t.segmentName.toLowerCase().includes(profile.caseType.toLowerCase())
      ) || templates[0]
    );
  }

  private applyPersonalization(template: any, profile: any): any {
    return {
      subject: template.template.replace("{name}", profile.name),
      summary: template.template.replace("{case_type}", profile.caseType),
      details: template.template,
      actionItems: ["Review your case", "Contact support if needed"],
    };
  }

  private assessPersonalizationLevel(content: any, profile: any): number {
    let level = 0;

    if (content.subject.includes(profile.name)) level += 0.3;
    if (content.summary.includes(profile.caseType)) level += 0.3;
    if (content.details.includes(profile.immigrationStatus)) level += 0.4;

    return level;
  }

  private optimizeDeliverySchedule(
    notifications: any[],
    constraints: any
  ): any[] {
    // Simplified delivery optimization
    return notifications.map((notification, index) => ({
      notificationId: notification.userId,
      scheduledTime: new Date(Date.now() + index * 1000).toISOString(),
      channel: notification.channels?.[0] || "email",
      priority: notification.urgency === "critical" ? 1 : 2,
    }));
  }

  private calculateEstimatedDeliveryTime(schedule: any[]): string {
    const lastDelivery = schedule[schedule.length - 1];
    return lastDelivery?.scheduledTime || new Date().toISOString();
  }

  private calculateChannelUtilization(schedule: any[]): Record<string, number> {
    const utilization: Record<string, number> = {};

    schedule.forEach((item) => {
      utilization[item.channel] = (utilization[item.channel] || 0) + 1;
    });

    return utilization;
  }

  // Behavior analysis helpers
  private analyzeBehaviorPattern(history: any[], actions: string[]): any {
    return {
      engagementLevel: history.length > 5 ? "high" : "medium",
      averageResponseTime: 24, // hours
      preferredChannels: ["email", "push"],
      followUpReceptivity: 0.7,
      riskOfFatigue: history.length > 10 ? 0.8 : 0.3,
    };
  }

  private generateBehaviorRecommendations(pattern: any): string[] {
    const recommendations: any[] = [];

    if (pattern.riskOfFatigue > 0.7) {
      recommendations.push("Reduce notification frequency");
    }

    if (pattern.engagementLevel === "low") {
      recommendations.push("Try different communication channels");
    }

    return recommendations;
  }

  private calculateFollowUpUrgency(
    originalUrgency: string,
    daysSince: number,
    userAction: string,
    deadlineProximity?: number
  ): number {
    let score = 0.5;

    // Original urgency factor
    const urgencyScores: Record<string, number> = {
      critical: 0.9,
      high: 0.7,
      medium: 0.5,
      low: 0.3,
    };
    score += urgencyScores[originalUrgency] || 0.5;

    // Time decay factor
    score += Math.max(0, 0.3 - daysSince * 0.05);

    // User action factor
    const actionScores: Record<string, number> = {
      ignored: 0.3,
      viewed: 0.1,
      acted: -0.5,
      requested_more_info: 0.2,
    };
    score += actionScores[userAction] || 0;

    // Deadline proximity factor
    if (deadlineProximity !== undefined) {
      score += Math.max(0, 0.4 - deadlineProximity * 0.1);
    }

    return Math.max(0, Math.min(1, score));
  }

  private scoreToUrgencyLevel(score: number): string {
    if (score >= 0.8) return "critical";
    if (score >= 0.6) return "high";
    if (score >= 0.4) return "medium";
    return "low";
  }

  private identifyUrgencyFactors(
    originalUrgency: string,
    daysSince: number,
    userAction: string
  ): string[] {
    const factors: any[] = [];

    factors.push(`Original urgency: ${originalUrgency}`);
    factors.push(`Days since original: ${daysSince}`);
    factors.push(`User action: ${userAction}`);

    return factors;
  }

  private getUrgencyRecommendation(score: number): string {
    if (score >= 0.8) return "Send immediate follow-up";
    if (score >= 0.6) return "Send follow-up within 24 hours";
    if (score >= 0.4) return "Consider follow-up in 2-3 days";
    return "No immediate follow-up needed";
  }

  private generateFollowUpSubject(
    originalSubject: string,
    userAction: string
  ): string {
    const prefixes: Record<string, string> = {
      ignored: "Reminder: ",
      viewed: "Follow-up: ",
      acted: "Update: ",
      requested_more_info: "Additional Information: ",
    };

    return (prefixes[userAction] || "Follow-up: ") + originalSubject;
  }

  private generateFollowUpActions(
    userAction: string,
    urgencyLevel: string
  ): string[] {
    const actions: Record<string, string[]> = {
      ignored: [
        "Please review the original notification",
        "Contact support if you need assistance",
      ],
      viewed: ["Complete the required actions", "Let us know if you need help"],
      acted: ["Confirm completion of all steps", "Monitor for updates"],
      requested_more_info: [
        "Review the additional information provided",
        "Contact us for further clarification",
      ],
    };

    return (
      actions[userAction] || [
        "Review the notification",
        "Take appropriate action",
      ]
    );
  }

  private determineFollowUpTone(
    userAction: string,
    urgencyLevel: string
  ): string {
    if (urgencyLevel === "critical") return "urgent";
    if (userAction === "ignored") return "firm";
    if (userAction === "requested_more_info") return "helpful";
    return "friendly";
  }

  // Emergency notification helpers
  private calculateEmergencyPriority(user: any, context: any): number {
    let score = 0.5;

    // Case urgency
    if (user.immigration_cases?.[0]?.status === "pending") score += 0.3;
    if (user.immigration_cases?.[0]?.deadline) {
      const daysToDeadline = Math.ceil(
        (new Date(user.immigration_cases[0].deadline).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysToDeadline <= 7) score += 0.4;
      else if (daysToDeadline <= 30) score += 0.2;
    }

    // User vulnerability factors
    if (user.language !== "en") score += 0.1;
    if (user.first_time_applicant) score += 0.1;

    return Math.min(1.0, score);
  }

  private scoreToPriorityLevel(score: number): string {
    if (score >= 0.8) return "critical";
    if (score >= 0.6) return "high";
    if (score >= 0.4) return "medium";
    return "low";
  }

  private generatePriorityRationale(user: any, context: any): string {
    const factors: any[] = [];

    if (user.immigration_cases?.[0]?.status === "pending") {
      factors.push("pending case");
    }

    if (user.language !== "en") {
      factors.push("non-English speaker");
    }

    return `Priority based on: ${factors.join(", ")}`;
  }

  private calculateEmergencyDeadline(hoursRemaining: number): string {
    return new Date(Date.now() + hoursRemaining * 60 * 60 * 1000).toISOString();
  }

  private getEmergencyContacts(): any[] {
    return [
      {
        type: "Emergency Hotline",
        contact: "1-800-IMMIGRATION",
        availability: "24/7",
      },
      {
        type: "Email Support",
        contact: "emergency@hijraah.com",
        availability: "Immediate response",
      },
    ];
  }

  private selectEmergencyChannels(
    urgency: string,
    preferences: any,
    available: string[]
  ): any[] {
    // For emergencies, use all available channels
    return available.map((channel) => ({
      channel,
      priority: channel === "sms" ? 1 : 2,
      rationale: "Emergency multi-channel delivery",
    }));
  }

  private createChannelFallbackPlan(channels: any[]): any[] {
    return channels.map((channel, index) => ({
      channel: channel.channel,
      delay: index * 5, // minutes
      condition: index === 0 ? "immediate" : "if_previous_failed",
    }));
  }

  private createEscalationPlan(
    level: string,
    timeToDeadline: number,
    userCount: number
  ): any {
    return {
      phases: [
        {
          phase: "Initial Notification",
          timing: "immediate",
          actions: ["Send emergency notifications", "Activate monitoring"],
        },
        {
          phase: "Follow-up",
          timing: "30 minutes",
          actions: ["Check delivery status", "Resend to non-responders"],
        },
        {
          phase: "Escalation",
          timing: "2 hours",
          actions: [
            "Contact non-responders directly",
            "Activate emergency support",
          ],
        },
      ],
      triggers: [
        "Low response rate after 1 hour",
        "System delivery failures",
        "Support request volume spike",
      ],
      contacts: this.getEmergencyContacts(),
    };
  }
}
