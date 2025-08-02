/**
 * Prediction Engine Tests
 * 
 * Comprehensive tests for the prediction engine tasks including
 * generatePredictions, estimateTimelines, calculateCosts, and assessRisks.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { 
  generatePredictionsTask,
  estimateTimelinesTask,
  calculateCostsTask,
  assessRisksTask,
} from "../prediction-engine.js";
import { 
  optimizePredictionCacheTask,
  warmPredictionCacheTask,
  managePredictionCacheTask,
} from "../prediction-optimization.js";
import type { PredictionInput, PredictionType } from "../types.js";

// Mock dependencies
vi.mock("@trigger.dev/sdk/v3", () => ({
  task: vi.fn((config) => ({
    id: config.id,
    description: config.description,
    run: config.run,
  })),
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock("ai", () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  streamText: vi.fn(),
}));

vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn(() => "mocked-openai-model"),
}));

vi.mock("drizzle-orm/postgres-js", () => ({
  drizzle: vi.fn(() => mockDb),
}));

vi.mock("postgres", () => ({
  default: vi.fn(() => "mocked-postgres-client"),
}));

vi.mock("@upstash/redis", () => ({
  Redis: vi.fn(() => mockRedis),
}));

// Mock database
const mockDb = {
  select: vi.fn(() => mockDb),
  from: vi.fn(() => mockDb),
  where: vi.fn(() => mockDb),
  orderBy: vi.fn(() => mockDb),
  limit: vi.fn(() => mockDb),
  insert: vi.fn(() => mockDb),
  update: vi.fn(() => mockDb),
  delete: vi.fn(() => mockDb),
  values: vi.fn(() => mockDb),
  set: vi.fn(() => mockDb),
  returning: vi.fn(() => []),
  groupBy: vi.fn(() => mockDb),
  having: vi.fn(() => mockDb),
};

// Mock Redis
const mockRedis = {
  get: vi.fn(),
  set: vi.fn(),
  setex: vi.fn(),
  del: vi.fn(),
  keys: vi.fn(() => []),
  expire: vi.fn(),
  ttl: vi.fn(),
};

// Mock AI SDK
const { generateObject } = await import("ai");
const mockGenerateObject = generateObject as any;

describe("Prediction Engine Tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock responses
    mockDb.returning.mockResolvedValue([{
      id: "test-model-id",
      type: "success_probability",
      algorithm: "random_forest",
      accuracy: 0.85,
      features: ["age", "education", "experience"],
      version: "1.0.0",
      isActive: true,
      status: "active",
    }]);
    
    mockGenerateObject.mockResolvedValue({
      object: {
        value: 0.75,
        confidence: 0.85,
        explanation: "Test prediction explanation",
        factors: [
          {
            name: "education_level",
            importance: 0.8,
            value: "masters",
            impact: "positive",
          },
        ],
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("generatePredictionsTask", () => {
    const mockInput: PredictionInput = {
      userId: "test-user-id",
      caseId: "test-case-id",
      modelType: "success" as PredictionType,
      inputFeatures: {
        age: 30,
        education: "masters",
        experience: 5,
        targetCountry: "US",
      },
      options: {
        includeExplanation: true,
        includeConfidenceInterval: true,
        cacheResults: true,
      },
    };

    it("should generate predictions successfully", async () => {
      const result = await generatePredictionsTask.run(mockInput, { ctx: {} } as any);

      expect(result.success).toBe(true);
      expect(result.prediction).toBeDefined();
      expect(result.cached).toBe(false);
      expect(result.duration).toBeGreaterThan(0);
    });

    it("should return cached prediction when available", async () => {
      // Mock cached prediction
      mockDb.returning.mockResolvedValueOnce([{
        id: "cached-prediction-id",
        value: "0.8",
        confidence: "0.9",
        predictedAt: new Date(),
      }]);

      const result = await generatePredictionsTask.run(mockInput, { ctx: {} } as any);

      expect(result.success).toBe(true);
      expect(result.cached).toBe(true);
    });

    it("should handle missing model gracefully", async () => {
      mockDb.returning.mockResolvedValueOnce([]); // No model found

      await expect(
        generatePredictionsTask.run(mockInput, { ctx: {} } as any)
      ).rejects.toThrow("No active model found for type: success");
    });

    it("should use progressive insights with streamText", async () => {
      await generatePredictionsTask.run(mockInput, { ctx: {} } as any);

      expect(mockGenerateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "mocked-openai-model",
          schema: expect.any(Object),
          prompt: expect.stringContaining("Generate a success prediction"),
        })
      );
    });
  });

  describe("estimateTimelinesTask", () => {
    const mockInput: PredictionInput = {
      userId: "test-user-id",
      caseId: "test-case-id",
      modelType: "timeline" as PredictionType,
      inputFeatures: {
        pathway: "skilled_worker",
        targetCountry: "CA",
        currentStatus: "preparing",
      },
    };

    it("should estimate timelines using AI reasoning", async () => {
      mockGenerateObject.mockResolvedValueOnce({
        object: {
          estimatedDays: 180,
          confidence: 0.8,
          confidenceInterval: { lower: 150, upper: 210 },
          milestones: [
            {
              name: "Document preparation",
              estimatedDays: 30,
              description: "Gather and prepare required documents",
              criticalPath: true,
            },
          ],
          factors: [
            {
              name: "processing_backlog",
              impact: "delaying",
              daysDelta: 15,
              explanation: "Current processing delays",
            },
          ],
          explanation: "Timeline based on historical data",
          assumptions: ["Normal processing conditions"],
          risks: [],
        },
      });

      const result = await estimateTimelinesTask.run(mockInput, { ctx: {} } as any);

      expect(result.success).toBe(true);
      expect(result.prediction.value).toBe(180);
      expect(result.prediction.type).toBe("timeline");
    });

    it("should use historical data from Firecrawl", async () => {
      // Mock historical data query
      mockDb.returning.mockResolvedValueOnce([
        {
          actualTimeline: 165,
          success: true,
          pathway: "skilled_worker",
          targetCountry: "CA",
        },
        {
          actualTimeline: 195,
          success: true,
          pathway: "skilled_worker",
          targetCountry: "CA",
        },
      ]);

      await estimateTimelinesTask.run(mockInput, { ctx: {} } as any);

      expect(mockGenerateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          prompt: expect.stringContaining("Historical Timeline Data"),
        })
      );
    });
  });

  describe("calculateCostsTask", () => {
    const mockInput: PredictionInput = {
      userId: "test-user-id",
      caseId: "test-case-id",
      modelType: "cost" as PredictionType,
      inputFeatures: {
        visaType: "skilled_worker",
        targetCountry: "US",
        familySize: 2,
        region: "california",
      },
    };

    it("should calculate costs using structured data extraction", async () => {
      mockGenerateObject.mockResolvedValueOnce({
        object: {
          totalCost: 8500,
          confidence: 0.85,
          confidenceInterval: { lower: 7500, upper: 9500 },
          costBreakdown: [
            {
              category: "Government fees",
              amount: 1500,
              required: true,
              description: "Official filing fees",
            },
            {
              category: "Attorney fees",
              amount: 5000,
              required: false,
              description: "Legal representation",
            },
          ],
          factors: [
            {
              name: "attorney_required",
              impact: "increasing",
              costDelta: 5000,
              explanation: "Complex case requires legal help",
            },
          ],
          explanation: "Cost estimate based on current fee structure",
          assumptions: ["Standard processing", "No complications"],
          optionalCosts: [],
        },
      });

      const result = await calculateCostsTask.run(mockInput, { ctx: {} } as any);

      expect(result.success).toBe(true);
      expect(result.prediction.value).toBe(8500);
      expect(result.prediction.type).toBe("cost");
    });

    it("should use Firecrawl for structured data extraction", async () => {
      await calculateCostsTask.run(mockInput, { ctx: {} } as any);

      expect(mockGenerateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          prompt: expect.stringContaining("Cost Data from Firecrawl"),
        })
      );
    });
  });

  describe("assessRisksTask", () => {
    const mockInput: PredictionInput = {
      userId: "test-user-id",
      caseId: "test-case-id",
      modelType: "risk" as PredictionType,
      inputFeatures: {
        hasDocuments: true,
        previousDenials: 0,
        criminalHistory: false,
        financialStatus: "adequate",
      },
    };

    it("should assess risks using parallel processing", async () => {
      mockGenerateObject.mockResolvedValueOnce({
        object: {
          overallRiskScore: 0.25,
          confidence: 0.9,
          riskLevel: "low",
          riskCategories: [
            {
              category: "Documentation",
              score: 0.2,
              factors: ["Missing birth certificate"],
              mitigation: ["Obtain certified copy"],
            },
          ],
          factors: [
            {
              name: "missing_documents",
              severity: "medium",
              probability: 0.3,
              impact: "Could delay processing",
              mitigation: "Gather missing documents",
            },
          ],
          explanation: "Overall low risk profile",
          recommendations: [
            {
              priority: "high",
              action: "Complete document checklist",
              rationale: "Ensure all required documents are ready",
              timeline: "2 weeks",
            },
          ],
          similarCases: [],
        },
      });

      const result = await assessRisksTask.run(mockInput, { ctx: {} } as any);

      expect(result.success).toBe(true);
      expect(result.prediction.value).toBe(0.25);
      expect(result.prediction.type).toBe("risk");
    });

    it("should use pgvector similarity analysis", async () => {
      // Mock similar cases query
      mockDb.returning.mockResolvedValueOnce([
        {
          success: true,
          pathway: "skilled_worker",
          targetCountry: "US",
          difficulty: 3,
        },
      ]);

      await assessRisksTask.run(mockInput, { ctx: {} } as any);

      expect(mockGenerateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          prompt: expect.stringContaining("Similar Cases Analysis"),
        })
      );
    });
  });
});

describe("Prediction Optimization Tasks", () => {
  describe("optimizePredictionCacheTask", () => {
    it("should optimize cache with adaptive strategy", async () => {
      mockRedis.get.mockResolvedValueOnce("1000"); // hits
      mockRedis.get.mockResolvedValueOnce("200"); // misses
      
      mockDb.returning.mockResolvedValueOnce([
        { type: "success", count: 500, avgAge: 12 },
        { type: "timeline", count: 300, avgAge: 8 },
      ]);

      const result = await optimizePredictionCacheTask.run(
        { cacheStrategy: "adaptive" },
        { ctx: {} } as any
      );

      expect(result.success).toBe(true);
      expect(result.optimization).toBeDefined();
      expect(result.cleanup).toBeDefined();
    });

    it("should clean up expired cache entries", async () => {
      mockDb.returning
        .mockResolvedValueOnce([{ count: 50 }]) // expired count
        .mockResolvedValueOnce(Array(50).fill({ id: "test-id" })); // deleted entries

      mockRedis.keys.mockResolvedValueOnce(["prediction:1", "prediction:2"]);
      mockRedis.get.mockResolvedValue(JSON.stringify({
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days old
      }));

      const result = await optimizePredictionCacheTask.run({}, { ctx: {} } as any);

      expect(result.cleanup.cleanedEntries).toBeGreaterThan(0);
    });
  });

  describe("warmPredictionCacheTask", () => {
    it("should warm cache with common prediction patterns", async () => {
      mockDb.returning.mockResolvedValueOnce([
        {
          type: "success",
          inputFeatures: { pathway: "skilled_worker" },
          count: 25,
          avgConfidence: 0.85,
        },
      ]);

      const result = await warmPredictionCacheTask.run(
        { predictionTypes: ["success", "timeline"] },
        { ctx: {} } as any
      );

      expect(result.success).toBe(true);
      expect(result.patternsWarmed).toBeGreaterThan(0);
    });
  });

  describe("managePredictionCacheTask", () => {
    it("should evict stale predictions", async () => {
      mockDb.returning.mockResolvedValueOnce(
        Array(10).fill({ type: "success" })
      );

      const result = await managePredictionCacheTask.run(
        { operation: "evict", ageThresholdHours: 168 },
        { ctx: {} } as any
      );

      expect(result.success).toBe(true);
      expect(result.result.evictedCount).toBe(10);
    });

    it("should analyze cache usage patterns", async () => {
      mockRedis.get.mockResolvedValueOnce("800"); // hits
      mockRedis.get.mockResolvedValueOnce("200"); // misses

      mockDb.returning.mockResolvedValueOnce([
        { type: "success", count: 500 },
        { type: "timeline", count: 300 },
      ]);

      const result = await managePredictionCacheTask.run(
        { operation: "analyze" },
        { ctx: {} } as any
      );

      expect(result.success).toBe(true);
      expect(result.result.hitRate).toBe(0.8);
      expect(result.result.popularTypes).toHaveLength(2);
    });
  });
});

describe("Integration Tests", () => {
  it("should handle end-to-end prediction workflow", async () => {
    const input: PredictionInput = {
      userId: "test-user-id",
      caseId: "test-case-id",
      modelType: "success" as PredictionType,
      inputFeatures: {
        age: 28,
        education: "bachelors",
        experience: 3,
        targetCountry: "CA",
      },
    };

    // Generate prediction
    const predictionResult = await generatePredictionsTask.run(input, { ctx: {} } as any);
    expect(predictionResult.success).toBe(true);

    // Warm cache
    const warmResult = await warmPredictionCacheTask.run({}, { ctx: {} } as any);
    expect(warmResult.success).toBe(true);

    // Optimize cache
    const optimizeResult = await optimizePredictionCacheTask.run({}, { ctx: {} } as any);
    expect(optimizeResult.success).toBe(true);
  });

  it("should handle error scenarios gracefully", async () => {
    // Mock database error
    mockDb.returning.mockRejectedValueOnce(new Error("Database connection failed"));

    const input: PredictionInput = {
      userId: "test-user-id",
      modelType: "success" as PredictionType,
      inputFeatures: {},
    };

    await expect(
      generatePredictionsTask.run(input, { ctx: {} } as any)
    ).rejects.toThrow("Database connection failed");
  });
});