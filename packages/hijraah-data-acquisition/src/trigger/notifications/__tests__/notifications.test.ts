/**
 * Notification System Tests (Task 11.1)
 *
 * Comprehensive tests for the real-time notification and alert system.
 */

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import {
  monitorPolicyChangesTask,
  processPolicyChangeNotificationsTask,
  personalizeAndDeliverNotificationTask,
  deliverMultiChannelNotificationTask,
} from "../policy-change-notifications.js";
import {
  initializeUserPreferencesTask,
  updateUserPreferencesTask,
  optimizeUserPreferencesTask,
  implementOptimizationRecommendationsTask,
} from "../user-preference-management.js";
import {
  orchestrateMultiChannelDeliveryTask,
  deliverChannelOptimizedContentTask,
  handleDeliveryFailuresTask,
} from "../multi-channel-delivery.js";
import {
  analyzeUserContextTask,
  generatePersonalizedContentTask,
  optimizeNotificationTimingTask,
  trackPersonalizationPerformanceTask,
  updatePersonalizationModelTask,
} from "../notification-personalization.js";

// Mock external dependencies
vi.mock("@supabase/supabase-js");
vi.mock("@mendable/firecrawl-js");
vi.mock("ai");

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(() => ({ data: mockUserProfile, error: null })),
        limit: vi.fn(() => ({ data: [mockUserProfile], error: null })),
        order: vi.fn(() => ({
          limit: vi.fn(() => ({ data: [mockNotificationHistory], error: null })),
        })),
      })),
      or: vi.fn(() => ({ data: [mockUserProfile], error: null })),
      order: vi.fn(() => ({
        limit: vi.fn(() => ({ data: [mockDataSource], error: null })),
        single: vi.fn(() => ({ data: mockDataSource, error: null })),
      })),
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({ data: { id: "test-id" }, error: null })),
      })),
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({ error: null })),
    })),
    upsert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({ data: { id: "test-id" }, error: null })),
      })),
    })),
  })),
  channel: vi.fn(() => ({
    send: vi.fn(() => ({ error: null })),
  })),
  rpc: vi.fn(() => ({})),
};

vi.mocked(createClient).mockReturnValue(mockSupabase as any);

// Mock data
const mockUserProfile = {
  id: "user-123",
  target_country: "CA",
  visa_type: "skilled_worker",
  immigration_type: "express_entry",
  current_stage: "preparation",
  notification_preferences: {
    policy_change: { enabled: true, channels: ["in_app", "email"] },
  },
};

const mockDataSource = {
  id: "source-123",
  name: "IRCC Official Website",
  url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  type: "government",
  credibilityScore: 0.95,
  metadata: {
    country: "CA",
    agency: "IRCC",
    policyType: "immigration",
  },
};

const mockNotificationHistory = {
  id: "notification-123",
  user_id: "user-123",
  type: "policy_change",
  metrics: {
    sent_at: new Date().toISOString(),
    read_at: new Date().toISOString(),
    read_time: 30000,
  },
};

const mockPolicyChange = {
  id: "policy-123",
  policyChangeId: "policy-change-123",
  country: "CA",
  policyType: "express_entry",
  changeType: "updated" as const,
  impactLevel: "high" as const,
  title: "Express Entry CRS Score Update",
  summary: "Minimum CRS score updated for latest draw",
  details: "The minimum Comprehensive Ranking System score has been updated...",
  sourceUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  sourceAttribution: {
    agency: "IRCC",
    lastUpdated: new Date().toISOString(),
    credibilityScore: 0.95,
  },
  affectedCategories: ["express_entry", "skilled_worker"],
  aiAnalysis: {
    impactAssessment: "High impact for Express Entry candidates",
    actionItems: ["Check current CRS score", "Consider improving qualifications"],
    riskLevel: "medium" as const,
    confidence: 0.9,
  },
  firecrawlMetadata: {
    sourceReliability: 0.95,
    lastCrawled: new Date().toISOString(),
    changeDetectionMethod: "ai_analysis" as const,
  },
};

// Mock AI responses
const mockAIResponse = {
  object: {
    changeType: "policy_update",
    impactLevel: "high",
    summary: "Test policy change summary",
    details: "Test policy change details",
    affectedCategories: ["express_entry"],
    confidence: 0.9,
    relevanceScore: 0.8,
    personalizedTitle: "Important Update for Your Express Entry Application",
    personalizedMessage: "This policy change affects your current application...",
    urgencyLevel: "high",
    actionItems: ["Review requirements", "Update application"],
    estimatedImpact: "significant",
  },
};

vi.mock("ai", () => ({
  generateObject: vi.fn(() => Promise.resolve(mockAIResponse)),
  generateText: vi.fn(() => Promise.resolve({ text: "Generated text response" })),
}));

// Mock Firecrawl
const mockFirecrawl = {
  scrapeUrl: vi.fn(() => Promise.resolve({
    success: true,
    data: {
      markdown: "Test content",
      metadata: { jobId: "job-123" },
    },
  })),
};

vi.mock("@mendable/firecrawl-js", () => ({
  default: vi.fn(() => mockFirecrawl),
}));

describe("Notification System (Task 11.1)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Policy Change Notifications", () => {
    test("should monitor policy changes with Firecrawl", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // Mock the task run function
      const result = await monitorPolicyChangesTask.run({}, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(mockSupabase.from).toHaveBeenCalledWith("data_sources");
      expect(mockFirecrawl.scrapeUrl).toHaveBeenCalled();
      expect(mockCtx.logger.info).toHaveBeenCalledWith(
        expect.stringContaining("Starting policy change monitoring")
      );
    });

    test("should process policy change notifications for affected users", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        policyChange: mockPolicyChange,
        batchId: "batch-123",
      };

      const result = await processPolicyChangeNotificationsTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.batchId).toBe("batch-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("user_profiles");
      expect(mockCtx.logger.info).toHaveBeenCalledWith(
        expect.stringContaining("Processing policy change notifications")
      );
    });

    test("should personalize and deliver notifications", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        policyChange: mockPolicyChange,
        relevanceAnalysis: mockAIResponse.object,
        preferredChannels: ["in_app", "email"],
        batchId: "batch-123",
      };

      const result = await personalizeAndDeliverNotificationTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("notifications");
      expect(mockSupabase.channel).toHaveBeenCalledWith("user:user-123");
    });

    test("should handle multi-channel delivery", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        notificationId: "notification-123",
        userId: "user-123",
        channels: ["email", "sms"],
        content: {
          title: "Test Notification",
          message: "Test message",
        },
      };

      const result = await deliverMultiChannelNotificationTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.notificationId).toBe("notification-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("notification_deliveries");
    });
  });

  describe("User Preference Management", () => {
    test("should initialize user notification preferences", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        userProfile: {
          targetCountry: "CA",
          visaType: "skilled_worker",
          immigrationType: "express_entry",
          currentStage: "preparation",
        },
      };

      const result = await initializeUserPreferencesTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("user_notification_preferences");
      expect(mockCtx.logger.info).toHaveBeenCalledWith(
        expect.stringContaining("Initializing notification preferences")
      );
    });

    test("should update user notification preferences", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        preferences: [
          {
            notificationType: "policy_change" as const,
            channels: ["in_app", "email"],
            enabled: true,
            frequency: "immediate" as const,
          },
        ],
        source: "user_action" as const,
      };

      const result = await updateUserPreferencesTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(result.source).toBe("user_action");
    });

    test("should optimize user preferences with AI", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        analysisType: "engagement_based" as const,
      };

      const result = await optimizeUserPreferencesTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(result.analysisType).toBe("engagement_based");
      expect(mockSupabase.from).toHaveBeenCalledWith("user_notification_preferences");
    });

    test("should implement optimization recommendations", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        optimizationId: "optimization-123",
        recommendations: [
          {
            category: "channels",
            action: "Add SMS channel",
            suggestedSetting: '["in_app", "email", "sms"]',
          },
        ],
        autoImplement: true,
      };

      const result = await implementOptimizationRecommendationsTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(result.autoImplemented).toBe(true);
    });
  });

  describe("Multi-Channel Delivery", () => {
    test("should orchestrate multi-channel delivery", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        notificationId: "notification-123",
        userId: "user-123",
        baseContent: {
          title: "Test Notification",
          message: "Test message",
        },
        channels: ["email", "sms", "push"],
        priority: "high" as const,
      };

      const result = await orchestrateMultiChannelDeliveryTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.channelsCount).toBe(3);
      expect(mockSupabase.from).toHaveBeenCalledWith("user_profiles");
    });

    test("should deliver channel-optimized content", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        deliveryId: "delivery-123",
        channel: "email",
        baseContent: {
          title: "Test Notification",
          message: "Test message",
        },
        optimizations: ["personalized", "urgent"],
        userProfile: mockUserProfile,
      };

      const result = await deliverChannelOptimizedContentTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.channel).toBe("email");
      expect(mockSupabase.from).toHaveBeenCalledWith("notification_analytics");
    });

    test("should handle delivery failures with retry logic", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        deliveryId: "delivery-123",
        failedChannel: "sms",
        error: "Rate limit exceeded",
        retryCount: 1,
        maxRetries: 3,
      };

      const result = await handleDeliveryFailuresTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(mockSupabase.from).toHaveBeenCalledWith("multi_channel_deliveries");
    });
  });

  describe("Notification Personalization", () => {
    test("should analyze user context for personalization", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        notificationContext: {
          type: "policy_change",
          country: "CA",
          policyType: "express_entry",
          impactLevel: "high",
          sourceUrl: "https://example.com",
        },
      };

      const result = await analyzeUserContextTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("user_profiles");
    });

    test("should generate personalized content", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        contextId: "context-123",
        baseNotification: {
          title: "Policy Update",
          summary: "Important policy change",
          details: "Detailed policy information",
          sourceUrl: "https://example.com",
          impactLevel: "high",
          affectedCategories: ["express_entry"],
          firecrawlMetadata: {},
        },
      };

      const result = await generatePersonalizedContentTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("user_personalization_contexts");
    });

    test("should optimize notification timing", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        contentId: "content-123",
        urgencyLevel: "high",
        userTimezone: "America/Toronto",
      };

      const result = await optimizeNotificationTimingTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("notification_analytics");
    });

    test("should track personalization performance", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        notificationId: "notification-123",
        personalizationMetrics: {
          relevanceScore: 0.8,
          engagementPrediction: 0.7,
          personalizationLevel: "high",
          aiConfidence: 0.9,
        },
      };

      const result = await trackPersonalizationPerformanceTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("notification_analytics");
    });

    test("should update personalization model based on performance", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      const payload = {
        userId: "user-123",
        performanceId: "performance-123",
        improvementAreas: ["relevance_scoring", "timing_optimization"],
      };

      const result = await updatePersonalizationModelTask.run(payload, { ctx: mockCtx });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(mockSupabase.from).toHaveBeenCalledWith("personalization_performance_tracking");
    });
  });

  describe("Integration Tests", () => {
    test("should handle complete notification workflow", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // 1. Monitor policy changes
      const monitorResult = await monitorPolicyChangesTask.run({}, { ctx: mockCtx });
      expect(monitorResult.success).toBe(true);

      // 2. Process notifications for affected users
      const processResult = await processPolicyChangeNotificationsTask.run(
        {
          policyChange: mockPolicyChange,
          batchId: "batch-123",
        },
        { ctx: mockCtx }
      );
      expect(processResult.success).toBe(true);

      // 3. Personalize and deliver
      const deliverResult = await personalizeAndDeliverNotificationTask.run(
        {
          userId: "user-123",
          policyChange: mockPolicyChange,
          relevanceAnalysis: mockAIResponse.object,
          preferredChannels: ["in_app", "email"],
          batchId: "batch-123",
        },
        { ctx: mockCtx }
      );
      expect(deliverResult.success).toBe(true);

      // Verify all steps completed successfully
      expect(monitorResult.success).toBe(true);
      expect(processResult.success).toBe(true);
      expect(deliverResult.success).toBe(true);
    });

    test("should handle user preference optimization workflow", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // 1. Initialize preferences
      const initResult = await initializeUserPreferencesTask.run(
        {
          userId: "user-123",
          userProfile: {
            targetCountry: "CA",
            visaType: "skilled_worker",
            immigrationType: "express_entry",
            currentStage: "preparation",
          },
        },
        { ctx: mockCtx }
      );
      expect(initResult.success).toBe(true);

      // 2. Optimize preferences
      const optimizeResult = await optimizeUserPreferencesTask.run(
        {
          userId: "user-123",
          analysisType: "comprehensive",
        },
        { ctx: mockCtx }
      );
      expect(optimizeResult.success).toBe(true);

      // 3. Implement recommendations
      const implementResult = await implementOptimizationRecommendationsTask.run(
        {
          userId: "user-123",
          optimizationId: "optimization-123",
          recommendations: [
            {
              category: "frequency",
              action: "Reduce frequency",
              suggestedSetting: "daily",
            },
          ],
          autoImplement: true,
        },
        { ctx: mockCtx }
      );
      expect(implementResult.success).toBe(true);

      // Verify workflow completion
      expect(initResult.success).toBe(true);
      expect(optimizeResult.success).toBe(true);
      expect(implementResult.success).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should handle Supabase errors gracefully", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // Mock Supabase error
      mockSupabase.from.mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({ data: null, error: { message: "Database error" } })),
          })),
        })),
      });

      await expect(
        analyzeUserContextTask.run(
          {
            userId: "user-123",
            notificationContext: {
              type: "policy_change",
              country: "CA",
              policyType: "express_entry",
              impactLevel: "high",
              sourceUrl: "https://example.com",
            },
          },
          { ctx: mockCtx }
        )
      ).rejects.toThrow("Database error");

      expect(mockCtx.logger.error).toHaveBeenCalled();
    });

    test("should handle AI service errors gracefully", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // Mock AI error
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockRejectedValueOnce(new Error("AI service unavailable"));

      await expect(
        generatePersonalizedContentTask.run(
          {
            userId: "user-123",
            contextId: "context-123",
            baseNotification: {
              title: "Test",
              summary: "Test",
              details: "Test",
              sourceUrl: "https://example.com",
              impactLevel: "high",
              affectedCategories: [],
              firecrawlMetadata: {},
            },
          },
          { ctx: mockCtx }
        )
      ).rejects.toThrow("AI service unavailable");

      expect(mockCtx.logger.error).toHaveBeenCalled();
    });

    test("should handle Firecrawl errors gracefully", async () => {
      const mockCtx = {
        logger: {
          info: vi.fn(),
          warn: vi.fn(),
          error: vi.fn(),
        },
      };

      // Mock Firecrawl error
      mockFirecrawl.scrapeUrl.mockResolvedValueOnce({
        success: false,
        error: "Rate limit exceeded",
      });

      const result = await monitorPolicyChangesTask.run({}, { ctx: mockCtx });

      expect(result.success).toBe(true);
      expect(result.changesDetected).toBe(0);
      expect(mockCtx.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining("Failed to crawl")
      );
    });
  });
});

describe("Notification System Types and Schemas", () => {
  test("should validate notification type schema", () => {
    const { NotificationTypeSchema } = require("../types.js");
    
    expect(() => NotificationTypeSchema.parse("policy_change")).not.toThrow();
    expect(() => NotificationTypeSchema.parse("critical_update")).not.toThrow();
    expect(() => NotificationTypeSchema.parse("invalid_type")).toThrow();
  });

  test("should validate user notification preference schema", () => {
    const { UserNotificationPreferenceSchema } = require("../types.js");
    
    const validPreference = {
      userId: "user-123",
      notificationType: "policy_change",
      channels: ["in_app", "email"],
      enabled: true,
      frequency: "immediate",
    };

    expect(() => UserNotificationPreferenceSchema.parse(validPreference)).not.toThrow();
  });

  test("should validate policy change notification schema", () => {
    const { PolicyChangeNotificationSchema } = require("../types.js");
    
    const validNotification = {
      id: "notification-123",
      policyChangeId: "policy-123",
      country: "CA",
      policyType: "immigration",
      changeType: "updated",
      impactLevel: "high",
      title: "Test Policy Change",
      summary: "Test summary",
      details: "Test details",
      sourceUrl: "https://example.com",
      sourceAttribution: {
        agency: "IRCC",
        lastUpdated: new Date().toISOString(),
        credibilityScore: 0.95,
      },
      affectedCategories: ["express_entry"],
      aiAnalysis: {
        impactAssessment: "High impact",
        actionItems: ["Review requirements"],
        riskLevel: "medium",
        confidence: 0.9,
      },
      firecrawlMetadata: {
        sourceReliability: 0.95,
        lastCrawled: new Date().toISOString(),
        changeDetectionMethod: "ai_analysis",
      },
    };

    expect(() => PolicyChangeNotificationSchema.parse(validNotification)).not.toThrow();
  });
});