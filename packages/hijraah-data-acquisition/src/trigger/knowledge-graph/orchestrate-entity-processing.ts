/**
 * Entity Processing Orchestration Task
 * 
 * Trigger.dev v4 orchestration task that chains entity extraction, relationship mapping,
 * confidence scoring, and entity resolution using triggerAndWait().
 */

import { task } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { extractEntitiesTask } from "./extract-entities.js";
import { mapRelationshipsTask } from "./map-relationships.js";
import { scoreConfidenceTask } from "./score-confidence.js";
import { resolveEntitiesTask } from "./resolve-entities.js";
import type { Entity, Relationship } from "../../types/index.js";

// Zod schema for orchestration input
const EntityProcessingOrchestrationSchema = z.object({
  content: z.string().describe("Content to process for entity extraction"),
  sourceId: z.string().describe("ID of the data source"),
  sourceUrl: z.string().url().optional().describe("URL of the source content"),
  contentType: z.string().optional().describe("Type of content (policy, form, guide, etc.)"),
  language: z.string().default("en").describe("Language of the content"),
  context: z.record(z.any()).optional().describe("Additional context for processing"),
  processingOptions: z.object({
    performSimilaritySearch: z.boolean().default(true).describe("Whether to perform similarity search for confidence scoring"),
    similarityThreshold: z.number().min(0).max(1).default(0.8).describe("Threshold for entity resolution"),
    batchSize: z.number().min(10).max(100).default(50).describe("Batch size for entity resolution"),
    skipEntityResolution: z.boolean().default(false).describe("Whether to skip entity resolution step"),
    skipRelationshipMapping: z.boolean().default(false).describe("Whether to skip relationship mapping"),
  }).optional().describe("Processing configuration options"),
});

type EntityProcessingOrchestrationInput = z.infer<typeof EntityProcessingOrchestrationSchema>;

type EntityProcessingOrchestrationOutput = {
  entities: Entity[];
  relationships: Relationship[];
  processingSteps: {
    entityExtraction: {
      success: boolean;
      entitiesExtracted: number;
      averageConfidence: number;
      processingTimeMs: number;
      errors?: string[];
    };
    relationshipMapping: {
      success: boolean;
      relationshipsMapped: number;
      averageConfidence: number;
      processingTimeMs: number;
      errors?: string[];
      skipped?: boolean;
    };
    confidenceScoring: {
      success: boolean;
      entitiesScored: number;
      relationshipsScored: number;
      confidenceImprovement: number;
      processingTimeMs: number;
      errors?: string[];
    };
    entityResolution: {
      success: boolean;
      entitiesResolved: number;
      duplicatesFound: number;
      entitiesMerged: number;
      processingTimeMs: number;
      errors?: string[];
      skipped?: boolean;
    };
  };
  overallMetrics: {
    totalProcessingTimeMs: number;
    finalEntityCount: number;
    finalRelationshipCount: number;
    averageEntityConfidence: number;
    averageRelationshipConfidence: number;
    success: boolean;
  };
  errors?: string[];
  warnings?: string[];
};

export const orchestrateEntityProcessingTask = task({
  id: "orchestrate-entity-processing",
  machine: {
    preset: "small-1x", // 0.5 vCPU, 0.5 GB RAM for orchestration
  },
  maxDuration: 1800, // 30 minutes max for complete pipeline
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 30000,
    factor: 2,
  },
  run: async (payload: EntityProcessingOrchestrationInput): Promise<EntityProcessingOrchestrationOutput> => {
    const overallStartTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
      console.log(`🎯 Starting entity processing orchestration for source: ${payload.sourceId}`);
      console.log(`📄 Content length: ${payload.content.length} characters`);
      console.log(`⚙️ Processing options:`, payload.processingOptions);

      // Validate input
      const validatedPayload = EntityProcessingOrchestrationSchema.parse(payload);
      const options = validatedPayload.processingOptions || {};

      // Step 1: Entity Extraction
      console.log(`\n🔍 Step 1: Extracting entities...`);
      const entityExtractionResult = await extractEntitiesTask.triggerAndWait({
        content: validatedPayload.content,
        sourceId: validatedPayload.sourceId,
        sourceUrl: validatedPayload.sourceUrl,
        contentType: validatedPayload.contentType,
        language: validatedPayload.language,
        context: validatedPayload.context,
      });

      if (!entityExtractionResult.success) {
        const error = `Entity extraction failed: ${entityExtractionResult.errors?.join(", ") || "Unknown error"}`;
        errors.push(error);
        console.error(`❌ ${error}`);
        
        return {
          entities: [],
          relationships: [],
          processingSteps: {
            entityExtraction: {
              success: false,
              entitiesExtracted: 0,
              averageConfidence: 0,
              processingTimeMs: entityExtractionResult.extractionMetadata.processingTimeMs,
              errors: entityExtractionResult.errors,
            },
            relationshipMapping: { success: false, relationshipsMapped: 0, averageConfidence: 0, processingTimeMs: 0, skipped: true },
            confidenceScoring: { success: false, entitiesScored: 0, relationshipsScored: 0, confidenceImprovement: 0, processingTimeMs: 0 },
            entityResolution: { success: false, entitiesResolved: 0, duplicatesFound: 0, entitiesMerged: 0, processingTimeMs: 0, skipped: true },
          },
          overallMetrics: {
            totalProcessingTimeMs: Date.now() - overallStartTime,
            finalEntityCount: 0,
            finalRelationshipCount: 0,
            averageEntityConfidence: 0,
            averageRelationshipConfidence: 0,
            success: false,
          },
          errors,
        };
      }

      console.log(`✅ Entity extraction completed: ${entityExtractionResult.entities.length} entities extracted`);
      let currentEntities = entityExtractionResult.entities;
      let currentRelationships: Relationship[] = [];

      // Step 2: Relationship Mapping (optional)
      let relationshipMappingResult: any = {
        success: true,
        relationships: [],
        mappingMetadata: {
          totalRelationships: 0,
          averageConfidence: 0,
          processingTimeMs: 0,
        },
        skipped: options.skipRelationshipMapping,
      };

      if (!options.skipRelationshipMapping && currentEntities.length >= 2) {
        console.log(`\n🔗 Step 2: Mapping relationships...`);
        relationshipMappingResult = await mapRelationshipsTask.triggerAndWait({
          entities: currentEntities,
          sourceId: validatedPayload.sourceId,
          context: validatedPayload.context,
          contentText: validatedPayload.content,
        });

        if (!relationshipMappingResult.success) {
          const error = `Relationship mapping failed: ${relationshipMappingResult.errors?.join(", ") || "Unknown error"}`;
          warnings.push(error);
          console.warn(`⚠️ ${error}`);
        } else {
          console.log(`✅ Relationship mapping completed: ${relationshipMappingResult.relationships.length} relationships mapped`);
          currentRelationships = relationshipMappingResult.relationships;
        }
      } else {
        console.log(`⏭️ Step 2: Skipping relationship mapping (${options.skipRelationshipMapping ? 'disabled' : 'insufficient entities'})`);
      }

      // Step 3: Confidence Scoring
      console.log(`\n📊 Step 3: Scoring confidence...`);
      const confidenceScoringResult = await scoreConfidenceTask.triggerAndWait({
        entities: currentEntities,
        relationships: currentRelationships,
        sourceId: validatedPayload.sourceId,
        context: validatedPayload.context,
        performSimilaritySearch: options.performSimilaritySearch,
      });

      if (!confidenceScoringResult.success) {
        const error = `Confidence scoring failed: ${confidenceScoringResult.errors?.join(", ") || "Unknown error"}`;
        warnings.push(error);
        console.warn(`⚠️ ${error}`);
      } else {
        console.log(`✅ Confidence scoring completed: ${confidenceScoringResult.updatedEntities.length} entities and ${confidenceScoringResult.updatedRelationships.length} relationships scored`);
        currentEntities = confidenceScoringResult.updatedEntities;
        currentRelationships = confidenceScoringResult.updatedRelationships;
      }

      // Step 4: Entity Resolution (optional)
      let entityResolutionResult: any = {
        success: true,
        resolvedEntities: currentEntities,
        resolutionMetadata: {
          totalEntitiesProcessed: currentEntities.length,
          entitiesResolved: currentEntities.length,
          entitiesMerged: 0,
          duplicatesFound: 0,
          processingTimeMs: 0,
        },
        mergedEntityIds: [],
        deletedEntityIds: [],
        skipped: options.skipEntityResolution,
      };

      if (!options.skipEntityResolution && currentEntities.length > 1) {
        console.log(`\n🔄 Step 4: Resolving entities...`);
        entityResolutionResult = await resolveEntitiesTask.triggerAndWait({
          entities: currentEntities,
          sourceId: validatedPayload.sourceId,
          batchSize: options.batchSize,
          similarityThreshold: options.similarityThreshold,
          context: validatedPayload.context,
        });

        if (!entityResolutionResult.success) {
          const error = `Entity resolution failed: ${entityResolutionResult.errors?.join(", ") || "Unknown error"}`;
          warnings.push(error);
          console.warn(`⚠️ ${error}`);
        } else {
          console.log(`✅ Entity resolution completed: ${entityResolutionResult.resolvedEntities.length} entities resolved, ${entityResolutionResult.resolutionMetadata.entitiesMerged} merged`);
          currentEntities = entityResolutionResult.resolvedEntities;
        }
      } else {
        console.log(`⏭️ Step 4: Skipping entity resolution (${options.skipEntityResolution ? 'disabled' : 'insufficient entities'})`);
      }

      // Calculate final metrics
      const totalProcessingTimeMs = Date.now() - overallStartTime;
      const finalEntityCount = currentEntities.length;
      const finalRelationshipCount = currentRelationships.length;
      
      const averageEntityConfidence = finalEntityCount > 0 
        ? currentEntities.reduce((sum, e) => sum + e.confidence, 0) / finalEntityCount 
        : 0;
      
      const averageRelationshipConfidence = finalRelationshipCount > 0 
        ? currentRelationships.reduce((sum, r) => sum + r.confidence, 0) / finalRelationshipCount 
        : 0;

      const overallSuccess = entityExtractionResult.success && 
                           (relationshipMappingResult.success || relationshipMappingResult.skipped) &&
                           (confidenceScoringResult.success) &&
                           (entityResolutionResult.success || entityResolutionResult.skipped);

      console.log(`\n🎯 Entity processing orchestration completed!`);
      console.log(`📊 Final results:`);
      console.log(`   - Entities: ${finalEntityCount} (avg confidence: ${averageEntityConfidence.toFixed(3)})`);
      console.log(`   - Relationships: ${finalRelationshipCount} (avg confidence: ${averageRelationshipConfidence.toFixed(3)})`);
      console.log(`   - Total time: ${totalProcessingTimeMs}ms`);
      console.log(`   - Success: ${overallSuccess}`);

      if (warnings.length > 0) {
        console.log(`⚠️ Warnings: ${warnings.length}`);
        warnings.forEach(warning => console.log(`   - ${warning}`));
      }

      return {
        entities: currentEntities,
        relationships: currentRelationships,
        processingSteps: {
          entityExtraction: {
            success: entityExtractionResult.success,
            entitiesExtracted: entityExtractionResult.entities.length,
            averageConfidence: entityExtractionResult.extractionMetadata.averageConfidence,
            processingTimeMs: entityExtractionResult.extractionMetadata.processingTimeMs,
            errors: entityExtractionResult.errors,
          },
          relationshipMapping: {
            success: relationshipMappingResult.success,
            relationshipsMapped: relationshipMappingResult.relationships?.length || 0,
            averageConfidence: relationshipMappingResult.mappingMetadata?.averageConfidence || 0,
            processingTimeMs: relationshipMappingResult.mappingMetadata?.processingTimeMs || 0,
            errors: relationshipMappingResult.errors,
            skipped: relationshipMappingResult.skipped,
          },
          confidenceScoring: {
            success: confidenceScoringResult.success,
            entitiesScored: confidenceScoringResult.scoringMetadata?.totalEntitiesProcessed || 0,
            relationshipsScored: confidenceScoringResult.scoringMetadata?.totalRelationshipsProcessed || 0,
            confidenceImprovement: confidenceScoringResult.scoringMetadata?.confidenceImprovement || 0,
            processingTimeMs: confidenceScoringResult.scoringMetadata?.processingTimeMs || 0,
            errors: confidenceScoringResult.errors,
          },
          entityResolution: {
            success: entityResolutionResult.success,
            entitiesResolved: entityResolutionResult.resolutionMetadata?.entitiesResolved || 0,
            duplicatesFound: entityResolutionResult.resolutionMetadata?.duplicatesFound || 0,
            entitiesMerged: entityResolutionResult.resolutionMetadata?.entitiesMerged || 0,
            processingTimeMs: entityResolutionResult.resolutionMetadata?.processingTimeMs || 0,
            errors: entityResolutionResult.errors,
            skipped: entityResolutionResult.skipped,
          },
        },
        overallMetrics: {
          totalProcessingTimeMs,
          finalEntityCount,
          finalRelationshipCount,
          averageEntityConfidence,
          averageRelationshipConfidence,
          success: overallSuccess,
        },
        errors: errors.length > 0 ? errors : undefined,
        warnings: warnings.length > 0 ? warnings : undefined,
      };

    } catch (error) {
      const totalProcessingTimeMs = Date.now() - overallStartTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(`❌ Entity processing orchestration failed: ${errorMessage}`);
      console.error(`⏱️ Failed after ${totalProcessingTimeMs}ms`);

      return {
        entities: [],
        relationships: [],
        processingSteps: {
          entityExtraction: { success: false, entitiesExtracted: 0, averageConfidence: 0, processingTimeMs: 0 },
          relationshipMapping: { success: false, relationshipsMapped: 0, averageConfidence: 0, processingTimeMs: 0 },
          confidenceScoring: { success: false, entitiesScored: 0, relationshipsScored: 0, confidenceImprovement: 0, processingTimeMs: 0 },
          entityResolution: { success: false, entitiesResolved: 0, duplicatesFound: 0, entitiesMerged: 0, processingTimeMs: 0 },
        },
        overallMetrics: {
          totalProcessingTimeMs,
          finalEntityCount: 0,
          finalRelationshipCount: 0,
          averageEntityConfidence: 0,
          averageRelationshipConfidence: 0,
          success: false,
        },
        errors: [errorMessage],
      };
    }
  },
});

// Export type for use in other tasks
export type OrchestratEntityProcessingTask = typeof orchestrateEntityProcessingTask;