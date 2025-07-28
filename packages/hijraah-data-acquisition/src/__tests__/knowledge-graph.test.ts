/**
 * Knowledge Graph Tasks Tests
 * 
 * Unit and integration tests for entity extraction, relationship mapping,
 * confidence scoring, and entity resolution tasks.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { db, checkDatabaseConnection } from "../db/connection";
import { entities, relationships } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  extractEntities,
  mapRelationships,
  scoreConfidence,
  resolveEntities,
  orchestrateEntityProcessing,
} from "../trigger/knowledge-graph";

// Mock AI SDK
vi.mock("ai", () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  openai: vi.fn(() => "gpt-4o"),
}));

// Mock Trigger.dev SDK
vi.mock("@trigger.dev/sdk/v3", () => ({
  task: vi.fn((config) => ({
    id: config.id,
    run: config.run,
  })),
  triggerAndWait: vi.fn(),
}));

describe("Knowledge Graph Tasks", () => {
  beforeEach(async () => {
    // Ensure database connection
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error("Database connection required for tests");
    }

    // Clean up test data
    await db.delete(relationships);
    await db.delete(entities);
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete(relationships);
    await db.delete(entities);
  });

  describe("extractEntities", () => {
    it("should extract entities from immigration content", async () => {
      // Mock AI response
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          entities: [
            {
              name: "Express Entry",
              type: "process",
              properties: { country: "CA", category: "skilled_worker" },
              confidence: 0.95,
              context: "Canadian immigration process",
              aliases: ["EE"]
            },
            {
              name: "IELTS",
              type: "requirement",
              properties: { type: "language_test", required_score: "6.0" },
              confidence: 0.9,
              context: "English language requirement",
              aliases: ["International English Language Testing System"]
            }
          ]
        }
      });

      const result = await extractEntities.run({
        content: "Express Entry is Canada's main immigration system for skilled workers. Applicants need IELTS scores of at least 6.0.",
        sourceId: "test-source-1",
        country: "CA",
        documentType: "policy"
      });

      expect(result.success).toBe(true);
      expect(result.entitiesExtracted).toBe(2);
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].name).toBe("Express Entry");
      expect(result.entities[1].name).toBe("IELTS");

      // Verify entities were stored in database
      const storedEntities = await db.select().from(entities);
      expect(storedEntities).toHaveLength(2);
    });

    it("should update existing entities with new information", async () => {
      // Create existing entity
      const existingEntity = await db.insert(entities).values({
        name: "Express Entry",
        type: "process",
        properties: { country: "CA" },
        confidence: 0.8,
        sources: ["old-source"],
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      // Mock AI response with updated information
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          entities: [
            {
              name: "Express Entry",
              type: "process",
              properties: { country: "CA", category: "skilled_worker", updated: true },
              confidence: 0.95,
              context: "Updated information",
              aliases: []
            }
          ]
        }
      });

      const result = await extractEntities.run({
        content: "Express Entry updated information",
        sourceId: "new-source",
        country: "CA"
      });

      expect(result.success).toBe(true);
      expect(result.entitiesExtracted).toBe(1);

      // Verify entity was updated
      const updatedEntity = await db.select().from(entities).where(eq(entities.id, existingEntity[0].id));
      expect(updatedEntity[0].confidence).toBe(0.95);
      expect(updatedEntity[0].properties).toMatchObject({
        country: "CA",
        category: "skilled_worker",
        updated: true
      });
      expect(updatedEntity[0].sources).toContain("new-source");
    });

    it("should handle extraction errors gracefully", async () => {
      // Mock AI failure
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockRejectedValue(new Error("AI service unavailable"));

      await expect(extractEntities.run({
        content: "Test content",
        sourceId: "test-source"
      })).rejects.toThrow("Entity extraction failed: AI service unavailable");
    });
  });

  describe("mapRelationships", () => {
    it("should map relationships between entities", async () => {
      // Create test entities
      const testEntities = await db.insert(entities).values([
        {
          name: "Express Entry",
          type: "process",
          properties: { country: "CA" },
          confidence: 0.9,
          sources: ["test"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IELTS",
          type: "requirement",
          properties: { type: "language_test" },
          confidence: 0.9,
          sources: ["test"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]).returning();

      // Mock AI response
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          relationships: [
            {
              sourceEntity: "Express Entry",
              targetEntity: "IELTS",
              type: "requires",
              strength: 0.9,
              confidence: 0.85,
              properties: { minimum_score: "6.0" },
              reasoning: "Express Entry requires IELTS scores for language proficiency"
            }
          ]
        }
      });

      const result = await mapRelationships.run({
        entityIds: testEntities.map(e => e.id),
        content: "Express Entry requires IELTS scores",
        sourceId: "test-source"
      });

      expect(result.success).toBe(true);
      expect(result.relationshipsMapped).toBe(1);
      expect(result.relationships).toHaveLength(1);
      expect(result.relationships[0].type).toBe("requires");

      // Verify relationship was stored
      const storedRelationships = await db.select().from(relationships);
      expect(storedRelationships).toHaveLength(1);
      expect(storedRelationships[0].type).toBe("requires");
    });

    it("should skip relationships for non-existent entities", async () => {
      // Mock AI response with non-existent entity
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          relationships: [
            {
              sourceEntity: "Non-existent Entity",
              targetEntity: "Another Non-existent",
              type: "requires",
              strength: 0.9,
              confidence: 0.85,
              reasoning: "Test relationship"
            }
          ]
        }
      });

      const result = await mapRelationships.run({
        entityIds: ["fake-id-1", "fake-id-2"],
        content: "Test content",
        sourceId: "test-source"
      });

      expect(result.success).toBe(true);
      expect(result.relationshipsMapped).toBe(0);

      // Verify no relationships were stored
      const storedRelationships = await db.select().from(relationships);
      expect(storedRelationships).toHaveLength(0);
    });
  });

  describe("scoreConfidence", () => {
    it("should score entity confidence with detailed analysis", async () => {
      // Create test entity
      const testEntity = await db.insert(entities).values({
        name: "Express Entry",
        type: "process",
        properties: { country: "CA" },
        confidence: 0.8,
        sources: ["source1", "source2"],
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      // Mock AI response
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          entityId: testEntity[0].id,
          confidenceScore: 0.92,
          factors: [
            { factor: "source_reliability", weight: 0.3, score: 0.9 },
            { factor: "data_completeness", weight: 0.25, score: 0.95 },
            { factor: "consistency", weight: 0.25, score: 0.9 },
            { factor: "freshness", weight: 0.2, score: 0.9 }
          ],
          reasoning: "High confidence due to multiple reliable sources and complete data",
          similarEntities: [
            { entityId: "similar-1", similarity: 0.85 }
          ]
        }
      });

      const result = await scoreConfidence.run({
        entityId: testEntity[0].id,
        validationContext: "Additional context for validation"
      });

      expect(result.success).toBe(true);
      expect(result.entityId).toBe(testEntity[0].id);
      expect(result.previousConfidence).toBe(0.8);
      expect(result.newConfidence).toBe(0.92);
      expect(result.confidenceChange).toBe(0.12);
      expect(result.factors).toHaveLength(4);

      // Verify entity was updated
      const updatedEntity = await db.select().from(entities).where(eq(entities.id, testEntity[0].id));
      expect(updatedEntity[0].confidence).toBe(0.92);
      expect(updatedEntity[0].properties.confidenceAnalysis).toBeDefined();
    });

    it("should handle non-existent entity", async () => {
      await expect(scoreConfidence.run({
        entityId: "non-existent-id"
      })).rejects.toThrow("Entity not found: non-existent-id");
    });
  });

  describe("resolveEntities", () => {
    it("should merge duplicate entities", async () => {
      // Create duplicate entities
      const duplicateEntities = await db.insert(entities).values([
        {
          name: "express entry",
          type: "process",
          properties: { country: "CA", version: 1 },
          confidence: 0.8,
          sources: ["source1"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "express entry",
          type: "process",
          properties: { country: "CA", version: 2, additional: "info" },
          confidence: 0.9,
          sources: ["source2"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]).returning();

      const result = await resolveEntities.run({
        entityIds: duplicateEntities.map(e => e.id),
        resolutionStrategy: "merge",
        batchSize: 10
      });

      expect(result.success).toBe(true);
      expect(result.strategy).toBe("merge");
      expect(result.entitiesMerged).toBe(1);
      expect(result.duplicatesRemoved).toBe(1);

      // Verify only one entity remains
      const remainingEntities = await db.select().from(entities);
      expect(remainingEntities).toHaveLength(1);
      expect(remainingEntities[0].confidence).toBe(0.9); // Higher confidence kept
      expect(remainingEntities[0].sources).toContain("source1");
      expect(remainingEntities[0].sources).toContain("source2");
    });

    it("should deduplicate entities keeping highest confidence", async () => {
      // Create duplicate entities
      const duplicateEntities = await db.insert(entities).values([
        {
          name: "ielts",
          type: "requirement",
          properties: { type: "language" },
          confidence: 0.7,
          sources: ["source1"],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "ielts",
          type: "requirement",
          properties: { type: "language" },
          confidence: 0.95,
          sources: ["source2"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]).returning();

      const result = await resolveEntities.run({
        entityIds: duplicateEntities.map(e => e.id),
        resolutionStrategy: "deduplicate"
      });

      expect(result.success).toBe(true);
      expect(result.duplicatesRemoved).toBe(1);

      // Verify only highest confidence entity remains
      const remainingEntities = await db.select().from(entities);
      expect(remainingEntities).toHaveLength(1);
      expect(remainingEntities[0].confidence).toBe(0.95);
    });
  });

  describe("orchestrateEntityProcessing", () => {
    it("should orchestrate complete entity processing pipeline", async () => {
      // Mock triggerAndWait calls
      const { triggerAndWait } = await import("@trigger.dev/sdk/v3");
      
      vi.mocked(triggerAndWait)
        .mockResolvedValueOnce({
          success: true,
          entitiesExtracted: 2,
          entities: [
            { id: "entity-1", name: "Express Entry", type: "process", confidence: 0.9 },
            { id: "entity-2", name: "IELTS", type: "requirement", confidence: 0.85 }
          ]
        })
        .mockResolvedValueOnce({
          success: true,
          relationshipsMapped: 1,
          relationships: [
            { id: "rel-1", type: "requires", strength: 0.9, confidence: 0.85 }
          ]
        })
        .mockResolvedValueOnce({
          success: true,
          newConfidence: 0.92,
          confidenceChange: 0.02
        })
        .mockResolvedValueOnce({
          success: true,
          newConfidence: 0.87,
          confidenceChange: 0.02
        })
        .mockResolvedValueOnce({
          success: true,
          entitiesResolved: 2,
          duplicatesRemoved: 0
        });

      const result = await orchestrateEntityProcessing.run({
        content: "Express Entry requires IELTS scores for Canadian immigration",
        sourceId: "test-source",
        country: "CA",
        documentType: "policy",
        enableRelationshipMapping: true,
        enableConfidenceScoring: true,
        enableEntityResolution: true
      });

      expect(result.success).toBe(true);
      expect(result.pipelineSteps.extraction).toBe(true);
      expect(result.pipelineSteps.relationshipMapping).toBe(true);
      expect(result.pipelineSteps.confidenceScoring).toBe(true);
      expect(result.pipelineSteps.entityResolution).toBe(true);
      expect(result.summary.entitiesExtracted).toBe(2);
      expect(result.summary.relationshipsMapped).toBe(1);
      expect(result.summary.confidenceScored).toBe(2);
      expect(result.summary.entitiesResolved).toBe(2);

      // Verify triggerAndWait was called for each step
      expect(vi.mocked(triggerAndWait)).toHaveBeenCalledTimes(5);
    });

    it("should handle pipeline failures gracefully", async () => {
      // Mock extraction failure
      const { triggerAndWait } = await import("@trigger.dev/sdk/v3");
      vi.mocked(triggerAndWait).mockResolvedValueOnce({
        success: false,
        error: "Extraction failed"
      });

      await expect(orchestrateEntityProcessing.run({
        content: "Test content",
        sourceId: "test-source"
      })).rejects.toThrow("Entity extraction failed");
    });

    it("should skip optional steps when disabled", async () => {
      // Mock only extraction
      const { triggerAndWait } = await import("@trigger.dev/sdk/v3");
      vi.mocked(triggerAndWait).mockResolvedValueOnce({
        success: true,
        entitiesExtracted: 1,
        entities: [{ id: "entity-1", name: "Test", type: "process", confidence: 0.9 }]
      });

      const result = await orchestrateEntityProcessing.run({
        content: "Test content",
        sourceId: "test-source",
        enableRelationshipMapping: false,
        enableConfidenceScoring: false,
        enableEntityResolution: false
      });

      expect(result.success).toBe(true);
      expect(result.pipelineSteps.extraction).toBe(true);
      expect(result.pipelineSteps.relationshipMapping).toBe(false);
      expect(result.pipelineSteps.confidenceScoring).toBe(false);
      expect(result.pipelineSteps.entityResolution).toBe(false);

      // Verify only extraction was called
      expect(vi.mocked(triggerAndWait)).toHaveBeenCalledTimes(1);
    });
  });
});