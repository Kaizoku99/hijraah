import { task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { Entity, Relationship } from "../../types/index.js";

const ConfidenceScoringSchema = z.object({
  entityScores: z.array(z.object({
    entityId: z.string(),
    confidenceScore: z.number().min(0).max(1),
    reasoning: z.string(),
  })),
  relationshipScores: z.array(z.object({
    relationshipId: z.string(),
    confidenceScore: z.number().min(0).max(1),
    reasoning: z.string(),
  })),
});

type ConfidenceScoringInput = {
  entities: Entity[];
  relationships: Relationship[];
  sourceId: string;
  context?: Record<string, any>;
  performSimilaritySearch?: boolean;
};

type ConfidenceScoringOutput = {
  updatedEntities: Entity[];
  updatedRelationships: Relationship[];
  scoringMetadata: {
    totalEntitiesProcessed: number;
    totalRelationshipsProcessed: number;
    averageEntityConfidence: number;
    averageRelationshipConfidence: number;
    confidenceImprovement: number;
    processingTimeMs: number;
    sourceId: string;
  };
  success: boolean;
  errors?: string[];
  warnings?: string[];
};

export const scoreConfidenceTask = task({
  id: "score-confidence",
  machine: {
    preset: "small-2x",
  },
  maxDuration: 600,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 3000,
    maxTimeoutInMs: 15000,
    factor: 2,
  },
  run: async (payload: ConfidenceScoringInput): Promise<ConfidenceScoringOutput> => {
    const startTime = Date.now();
    const warnings: string[] = [];
    
    try {
      console.log(`📊 Starting confidence scoring for ${payload.entities.length} entities and ${payload.relationships.length} relationships`);

      if (payload.entities.length === 0 && payload.relationships.length === 0) {
        return {
          updatedEntities: [],
          updatedRelationships: [],
          scoringMetadata: {
            totalEntitiesProcessed: 0,
            totalRelationshipsProcessed: 0,
            averageEntityConfidence: 0,
            averageRelationshipConfidence: 0,
            confidenceImprovement: 0,
            processingTimeMs: Date.now() - startTime,
            sourceId: payload.sourceId,
          },
          success: true,
          warnings: ["No entities or relationships to score"],
        };
      }

      // Use AI SDK to score confidence
      const { object: scoringResult } = await generateObject({
        model: openai("gpt-4o"),
        system: "You are an expert immigration data quality analyst. Score the confidence of entities and relationships.",
        prompt: `Score confidence for entities: ${JSON.stringify(payload.entities.map(e => ({ id: e.id, name: e.name, type: e.type })))} and relationships: ${JSON.stringify(payload.relationships.map(r => ({ id: r.id, type: r.type })))}`,
        schema: ConfidenceScoringSchema,
        temperature: 0.1,
      });

      // Update entities with new confidence scores
      const updatedEntities: Entity[] = payload.entities.map(entity => {
        const score = scoringResult.entityScores.find(s => s.entityId === entity.id);
        if (score) {
          return {
            ...entity,
            confidence: score.confidenceScore,
            properties: {
              ...entity.properties,
              confidenceReasoning: score.reasoning,
              lastConfidenceUpdate: new Date(),
            },
            updatedAt: new Date(),
          };
        }
        return entity;
      });

      // Update relationships with new confidence scores
      const updatedRelationships: Relationship[] = payload.relationships.map(rel => {
        const score = scoringResult.relationshipScores.find(s => s.relationshipId === rel.id);
        if (score) {
          return {
            ...rel,
            confidence: score.confidenceScore,
            properties: {
              ...rel.properties,
              confidenceReasoning: score.reasoning,
              lastConfidenceUpdate: new Date(),
            },
          };
        }
        return rel;
      });

      const processingTimeMs = Date.now() - startTime;
      const newEntityConfidence = updatedEntities.length > 0 
        ? updatedEntities.reduce((sum, e) => sum + e.confidence, 0) / updatedEntities.length 
        : 0;
      const newRelationshipConfidence = updatedRelationships.length > 0 
        ? updatedRelationships.reduce((sum, r) => sum + r.confidence, 0) / updatedRelationships.length 
        : 0;

      return {
        updatedEntities,
        updatedRelationships,
        scoringMetadata: {
          totalEntitiesProcessed: updatedEntities.length,
          totalRelationshipsProcessed: updatedRelationships.length,
          averageEntityConfidence: newEntityConfidence,
          averageRelationshipConfidence: newRelationshipConfidence,
          confidenceImprovement: 0,
          processingTimeMs,
          sourceId: payload.sourceId,
        },
        success: true,
        warnings: warnings.length > 0 ? warnings : undefined,
      };

    } catch (error) {
      const processingTimeMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      return {
        updatedEntities: payload.entities,
        updatedRelationships: payload.relationships,
        scoringMetadata: {
          totalEntitiesProcessed: 0,
          totalRelationshipsProcessed: 0,
          averageEntityConfidence: 0,
          averageRelationshipConfidence: 0,
          confidenceImprovement: 0,
          processingTimeMs,
          sourceId: payload.sourceId,
        },
        success: false,
        errors: [errorMessage],
        warnings: warnings.length > 0 ? warnings : undefined,
      };
    }
  },
});

export type ScoreConfidenceTask = typeof scoreConfidenceTask;