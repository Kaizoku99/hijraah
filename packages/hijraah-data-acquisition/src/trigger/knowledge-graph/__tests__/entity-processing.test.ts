/**
 * Entity Processing Tests
 * 
 * Tests for knowledge graph entity processing tasks.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { extractEntitiesTask, mapRelationshipsTask, scoreConfidenceTask, resolveEntitiesTask } from "../index.js";

// Mock dependencies
vi.mock("@trigger.dev/sdk/v3", () => ({
  task: vi.fn((config) => ({
    id: config.id,
    run: config.run,
    triggerAndWait: vi.fn(),
  })),
}));

vi.mock("ai", () => ({
  generateObject: vi.fn(),
  embed: vi.fn(),
}));

vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

vi.mock("drizzle-orm/postgres-js", () => ({
  drizzle: vi.fn(),
}));

vi.mock("postgres", () => ({
  default: vi.fn(),
}));

describe("Knowledge Graph Entity Processing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("extractEntitiesTask", () => {
    it("should have correct task configuration", () => {
      expect(extractEntitiesTask.id).toBe("extract-entities");
      expect(typeof extractEntitiesTask.run).toBe("function");
    });

    it("should handle empty content gracefully", async () => {
      const mockPayload = {
        content: "",
        sourceId: "test-source",
      };

      // Mock the AI response
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          entities: [],
          metadata: {
            contentType: "unknown",
            language: "en",
            sourceReliability: 0.5,
            processingComplexity: "low",
            extractionMethod: "ai",
          },
        },
      });

      // Mock database operations
      const mockClient = {
        end: vi.fn(),
      };
      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockResolvedValue([]),
        }),
      };

      const postgres = await import("postgres");
      vi.mocked(postgres.default).mockReturnValue(mockClient as any);

      const { drizzle } = await import("drizzle-orm/postgres-js");
      vi.mocked(drizzle).mockReturnValue(mockDb as any);

      const result = await extractEntitiesTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.entities).toEqual([]);
      expect(result.extractionMetadata.totalEntities).toBe(0);
    });
  });

  describe("mapRelationshipsTask", () => {
    it("should have correct task configuration", () => {
      expect(mapRelationshipsTask.id).toBe("map-relationships");
      expect(typeof mapRelationshipsTask.run).toBe("function");
    });

    it("should handle insufficient entities", async () => {
      const mockPayload = {
        entities: [
          {
            id: "entity-1",
            name: "Test Entity",
            type: "country" as const,
            properties: {},
            confidence: 0.8,
            sources: ["test-source"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        sourceId: "test-source",
      };

      const result = await mapRelationshipsTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.relationships).toEqual([]);
      expect(result.warnings).toContain("Not enough entities for relationship mapping");
    });
  });

  describe("scoreConfidenceTask", () => {
    it("should have correct task configuration", () => {
      expect(scoreConfidenceTask.id).toBe("score-confidence");
      expect(typeof scoreConfidenceTask.run).toBe("function");
    });

    it("should handle empty input", async () => {
      const mockPayload = {
        entities: [],
        relationships: [],
        sourceId: "test-source",
      };

      const result = await scoreConfidenceTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.updatedEntities).toEqual([]);
      expect(result.updatedRelationships).toEqual([]);
      expect(result.warnings).toContain("No entities or relationships to score");
    });
  });

  describe("resolveEntitiesTask", () => {
    it("should have correct task configuration", () => {
      expect(resolveEntitiesTask.id).toBe("resolve-entities");
      expect(typeof resolveEntitiesTask.run).toBe("function");
    });

    it("should handle empty entities", async () => {
      const mockPayload = {
        entities: [],
        sourceId: "test-source",
      };

      const result = await resolveEntitiesTask.run(mockPayload);

      expect(result.success).toBe(true);
      expect(result.resolvedEntities).toEqual([]);
      expect(result.resolutionMetadata.totalEntitiesProcessed).toBe(0);
      expect(result.warnings).toContain("No entities to resolve");
    });
  });

  describe("Task Integration", () => {
    it("should export all required tasks", () => {
      expect(extractEntitiesTask).toBeDefined();
      expect(mapRelationshipsTask).toBeDefined();
      expect(scoreConfidenceTask).toBeDefined();
      expect(resolveEntitiesTask).toBeDefined();
    });

    it("should have consistent task IDs", () => {
      const taskIds = [
        extractEntitiesTask.id,
        mapRelationshipsTask.id,
        scoreConfidenceTask.id,
        resolveEntitiesTask.id,
      ];

      expect(taskIds).toEqual([
        "extract-entities",
        "map-relationships",
        "score-confidence",
        "resolve-entities",
      ]);
    });
  });
});