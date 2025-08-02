/**
 * Graph Traversal Tasks Tests
 * 
 * Unit tests for graph traversal, entity importance calculation,
 * subgraph extraction, graph search, and maintenance tasks.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { traverseGraphTask } from "../traverse-graph";
import { calculateEntityImportanceTask } from "../calculate-entity-importance";
import { extractSubgraphsTask } from "../extract-subgraphs";
import { searchGraphTask } from "../search-graph";
import { graphMaintenanceTask, optimizeGraphTask } from "../graph-maintenance";

// Mock database connection
vi.mock("../../db/connection", () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([]),
    execute: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock AI SDK
vi.mock("ai", () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      paths: [],
      traversalMetrics: {
        nodesVisited: 0,
        edgesTraversed: 0,
        maxDepth: 0,
        executionTimeMs: 100
      }
    }
  }),
  generateText: vi.fn().mockResolvedValue({
    text: "Mock AI response"
  }),
}));

// Mock OpenAI
vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn().mockReturnValue("mock-model"),
}));

// Mock Trigger.dev SDK
vi.mock("@trigger.dev/sdk/v3", () => ({
  task: vi.fn().mockImplementation((config) => ({
    id: config.id,
    run: config.run,
    trigger: vi.fn().mockResolvedValue({ id: "mock-run-id" }),
    triggerAndWait: vi.fn().mockResolvedValue({ success: true })
  })),
  schedules: {
    task: vi.fn().mockImplementation((config) => ({
      id: config.id,
      run: config.run,
      trigger: vi.fn().mockResolvedValue({ id: "mock-scheduled-run-id" })
    }))
  },
  triggerAndWait: vi.fn().mockResolvedValue({ success: true }),
}));

describe("Graph Traversal Tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("traverseGraphTask", () => {
    it("should traverse graph successfully", async () => {
      const mockPayload = {
        sourceEntityId: "entity-1",
        targetEntityId: "entity-2",
        traversalType: "shortest_path" as const,
        maxDepth: 3,
        maxPaths: 5,
        minConfidence: 0.5
      };

      // Mock database responses
      const mockDb = await import("../../db/connection");
      vi.mocked(mockDb.db.select).mockReturnValue({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([
          {
            id: "entity-1",
            name: "Test Entity",
            type: "visa_type",
            confidence: 0.8
          }
        ])
      } as any);

      const result = await traverseGraphTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.traversalType).toBe("shortest_path");
      expect(result.sourceEntity).toBeDefined();
    });

    it("should handle different traversal types", async () => {
      const traversalTypes = ["breadth_first", "depth_first", "strongest_path", "all_paths"] as const;

      for (const traversalType of traversalTypes) {
        const mockPayload = {
          sourceEntityId: "entity-1",
          traversalType,
          maxDepth: 2
        };

        const result = await traverseGraphTask.run(mockPayload);
        expect(result.success).toBe(true);
        expect(result.traversalType).toBe(traversalType);
      }
    });
  });

  describe("calculateEntityImportanceTask", () => {
    it("should calculate entity importance successfully", async () => {
      const mockPayload = {
        entityIds: ["entity-1", "entity-2"],
        algorithm: "hybrid" as const,
        batchSize: 10,
        updateDatabase: true
      };

      const result = await calculateEntityImportanceTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.algorithm).toBe("hybrid");
      expect(result.performance).toBeDefined();
      expect(result.performance.entitiesProcessed).toBeGreaterThanOrEqual(0);
    });

    it("should handle different algorithms", async () => {
      const algorithms = ["pagerank", "centrality", "frequency", "hybrid"] as const;

      for (const algorithm of algorithms) {
        const mockPayload = {
          algorithm,
          batchSize: 5
        };

        const result = await calculateEntityImportanceTask.run(mockPayload);
        expect(result.success).toBe(true);
        expect(result.algorithm).toBe(algorithm);
      }
    });
  });

  describe("extractSubgraphsTask", () => {
    it("should extract subgraphs successfully", async () => {
      const mockPayload = {
        extractionType: "ego" as const,
        centerEntityIds: ["entity-1"],
        maxDistance: 2,
        minSubgraphSize: 3,
        maxSubgraphSize: 20,
        parallelism: 3
      };

      const result = await extractSubgraphsTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.extractionType).toBe("ego");
      expect(result.performance).toBeDefined();
    });

    it("should handle different extraction types", async () => {
      const extractionTypes = ["community", "thematic", "temporal", "pathway", "mixed"] as const;

      for (const extractionType of extractionTypes) {
        const mockPayload = {
          extractionType,
          minSubgraphSize: 2,
          maxSubgraphSize: 10
        };

        const result = await extractSubgraphsTask.run(mockPayload);
        expect(result.success).toBe(true);
        expect(result.extractionType).toBe(extractionType);
      }
    });
  });

  describe("searchGraphTask", () => {
    it("should search graph successfully", async () => {
      const mockPayload = {
        query: "visa requirements",
        searchType: "hybrid" as const,
        maxResults: 10,
        minRelevanceScore: 0.3,
        includeRelated: true,
        useCache: false
      };

      const result = await searchGraphTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.query).toBe("visa requirements");
      expect(result.searchType).toBe("hybrid");
      expect(result.performance).toBeDefined();
    });

    it("should handle different search types", async () => {
      const searchTypes = ["exact", "semantic", "fuzzy", "related", "hybrid"] as const;

      for (const searchType of searchTypes) {
        const mockPayload = {
          query: "test query",
          searchType,
          maxResults: 5
        };

        const result = await searchGraphTask.run(mockPayload);
        expect(result.success).toBe(true);
        expect(result.searchType).toBe(searchType);
      }
    });
  });

  describe("optimizeGraphTask", () => {
    it("should optimize graph successfully", async () => {
      const mockPayload = {
        optimizationType: "full" as const,
        includeRelationshipOptimization: true,
        includeImportanceRecalculation: true,
        includeStructuralOptimization: true
      };

      const result = await optimizeGraphTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.optimizationType).toBe("full");
      expect(result.operationsCompleted).toBeGreaterThanOrEqual(0);
    });

    it("should handle different optimization types", async () => {
      const optimizationTypes = ["incremental", "targeted"] as const;

      for (const optimizationType of optimizationTypes) {
        const mockPayload = {
          optimizationType
        };

        const result = await optimizeGraphTask.run(mockPayload);
        expect(result.success).toBe(true);
        expect(result.optimizationType).toBe(optimizationType);
      }
    });
  });
});

describe("Graph Maintenance Integration", () => {
  it("should handle task orchestration", async () => {
    // Test that tasks can be chained together
    const traversalResult = await traverseGraphTask.run({
      sourceEntityId: "entity-1",
      traversalType: "breadth_first",
      maxDepth: 2
    });

    expect(traversalResult.success).toBe(true);

    const importanceResult = await calculateEntityImportanceTask.run({
      algorithm: "centrality",
      batchSize: 5
    });

    expect(importanceResult.success).toBe(true);

    const searchResult = await searchGraphTask.run({
      query: "immigration",
      searchType: "semantic",
      maxResults: 5
    });

    expect(searchResult.success).toBe(true);
  });

  it("should validate task parameters", async () => {
    // Test parameter validation
    await expect(
      traverseGraphTask.run({
        sourceEntityId: "",
        traversalType: "shortest_path"
      })
    ).rejects.toThrow();

    await expect(
      searchGraphTask.run({
        query: "",
        searchType: "exact"
      })
    ).rejects.toThrow();
  });
});