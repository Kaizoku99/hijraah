/**
 * Entity Resolution Task
 * 
 * Trigger.dev v4 task for resolving and deduplicating entities
 * using batch processing for parallel entity resolution with Drizzle ORM.
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, sql, and, or, inArray } from "drizzle-orm";
import postgres from "postgres";
import { entities, relationships } from "../../db/schema.js";
import type { Entity, Relationship } from "../../types/index.js";

// Zod schema for entity resolution
const EntityResolutionSchema = z.object({
  resolutionGroups: z.array(
    z.object({
      canonicalEntity: z.object({
        id: z.string().describe("ID of the canonical (primary) entity"),
        name: z.string().describe("Canonical name for the entity"),
        type: z.string().describe("Entity type"),
        confidence: z.number().min(0).max(1).describe("Confidence in canonical entity"),
        reasoning: z.string().describe("Why this entity was chosen as canonical"),
      }).describe("The canonical entity that others should be merged into"),
      duplicateEntities: z.array(
        z.object({
          id: z.string().describe("ID of duplicate entity"),
          name: z.string().describe("Name of duplicate entity"),
          similarityScore: z.number().min(0).max(1).describe("Similarity to canonical entity"),
          mergeStrategy: z.enum(["merge_properties", "replace", "keep_separate"]).describe("How to handle this duplicate"),
          reasoning: z.string().describe("Why this entity is considered a duplicate"),
        })
      ).describe("Entities that are duplicates of the canonical entity"),
      mergedProperties: z.record(z.any()).describe("Properties to use in the merged entity"),
      mergedSources: z.array(z.string()).describe("Combined sources from all entities"),
      qualityScore: z.number().min(0).max(1).describe("Quality score of the resolution"),
    })
  ).describe("Groups of entities that should be resolved together"),
  singletonEntities: z.array(
    z.object({
      id: z.string().describe("ID of entity with no duplicates"),
      name: z.string().describe("Name of singleton entity"),
      qualityScore: z.number().min(0).max(1).describe("Quality score of the entity"),
      reasoning: z.string().describe("Why this entity has no duplicates"),
    })
  ).describe("Entities that have no duplicates and don't need resolution"),
  metadata: z.object({
    totalEntitiesAnalyzed: z.number().describe("Total number of entities analyzed"),
    resolutionGroupsFound: z.number().describe("Number of resolution groups identified"),
    singletonEntitiesFound: z.number().describe("Number of singleton entities"),
    averageSimilarityScore: z.number().describe("Average similarity score in groups"),
    resolutionComplexity: z.enum(["low", "medium", "high"]).describe("Complexity of resolution process"),
  }).describe("Metadata about the entity resolution process")
});

type EntityResolutionInput = {
  entities: Entity[];
  sourceId: string;
  batchSize?: number;
  similarityThreshold?: number;
  context?: Record<string, any>;
};

type EntityResolutionOutput = {
  resolvedEntities: Entity[];
  mergedEntityIds: string[];
  deletedEntityIds: string[];
  resolutionMetadata: {
    totalEntitiesProcessed: number;
    entitiesResolved: number;
    entitiesMerged: number;
    entitiesDeleted: number;
    duplicatesFound: number;
    processingTimeMs: number;
    sourceId: string;
  };
  success: boolean;
  errors?: string[];
  warnings?: string[];
};

export const resolveEntitiesTask = task({
  id: "resolve-entities",
  machine: {
    preset: "medium-1x", // 2 vCPU, 2 GB RAM for batch processing
  },
  maxDuration: 900, // 15 minutes max for complex entity resolution
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 20000,
    factor: 2,
  },
  run: async (payload: EntityResolutionInput): Promise<EntityResolutionOutput> => {
    const startTime = Date.now();
    const warnings: string[] = [];
    const batchSize = payload.batchSize || 50;
    const similarityThreshold = payload.similarityThreshold || 0.8;
    
    try {
      console.log(`🔄 Starting entity resolution for ${payload.entities.length} entities`);
      console.log(`📄 Source: ${payload.sourceId}`);
      console.log(`⚙️ Batch size: ${batchSize}, Similarity threshold: ${similarityThreshold}`);

      if (payload.entities.length === 0) {
        console.log(`⚠️ No entities to resolve`);
        return {
          resolvedEntities: [],
          mergedEntityIds: [],
          deletedEntityIds: [],
          resolutionMetadata: {
            totalEntitiesProcessed: 0,
            entitiesResolved: 0,
            entitiesMerged: 0,
            entitiesDeleted: 0,
            duplicatesFound: 0,
            processingTimeMs: Date.now() - startTime,
            sourceId: payload.sourceId,
          },
          success: true,
          warnings: ["No entities to resolve"],
        };
      }

      // Initialize database connection
      const connectionString = process.env.DATABASE_URL!;
      const client = postgres(connectionString);
      const db = drizzle(client);

      // Process entities in batches for better performance
      const batches: Entity[][] = [];
      for (let i = 0; i < payload.entities.length; i += batchSize) {
        batches.push(payload.entities.slice(i, i + batchSize));
      }

      console.log(`📦 Processing ${batches.length} batches`);

      let allResolvedEntities: Entity[] = [];
      let allMergedEntityIds: string[] = [];
      let allDeletedEntityIds: string[] = [];
      let totalDuplicatesFound = 0;

      // Process each batch
      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} entities)`);

        try {
          // Find existing entities in database that might be duplicates
          const entityNames = batch.map(e => e.name);
          const entityTypes = [...new Set(batch.map(e => e.type))];

          const existingEntities = await db
            .select()
            .from(entities)
            .where(
              and(
                inArray(entities.type, entityTypes),
                or(
                  inArray(entities.name, entityNames),
                  // Also check for similar names (simplified - in production use fuzzy matching)
                  ...entityNames.map(name => 
                    sql`${entities.name} ILIKE ${`%${name}%`} OR ${name} ILIKE '%' || ${entities.name} || '%'`
                  )
                )
              )
            );

          console.log(`🔍 Found ${existingEntities.length} potentially similar existing entities`);

          // Combine batch entities with existing entities for resolution
          const allEntitiesForResolution = [
            ...batch,
            ...existingEntities.map(e => ({
              id: e.id,
              name: e.name,
              type: e.type as Entity['type'],
              properties: e.properties as Record<string, any>,
              confidence: e.confidence,
              sources: e.sources as string[],
              embedding: e.embedding as number[] | undefined,
              createdAt: e.createdAt,
              updatedAt: e.updatedAt,
            }))
          ];

          // Prepare system prompt for entity resolution
          const systemPrompt = `You are an expert immigration data analyst specializing in entity resolution and deduplication.

Your task is to identify duplicate entities and group them for resolution. Focus on:

1. **Name Variations**: Different spellings, abbreviations, or formats of the same entity
2. **Semantic Equivalence**: Entities that refer to the same concept but use different terms
3. **Contextual Similarity**: Entities that are the same within the immigration domain context
4. **Type Consistency**: Only group entities of the same or compatible types

Resolution Guidelines:
- Similarity threshold: ${similarityThreshold} (only group entities above this threshold)
- Choose the most authoritative/complete entity as canonical
- Merge properties intelligently, preserving important information
- Combine sources from all duplicate entities
- Maintain high quality standards

Entity Types in Immigration Domain:
- country: Country names and codes
- visa_type: Visa categories and types
- requirement: Immigration requirements and criteria
- document: Required documents and forms
- process: Immigration processes and procedures
- fee: Costs and fees
- timeline: Time periods and deadlines

Be conservative - it's better to keep separate entities than to incorrectly merge different concepts.`;

          // Use AI SDK to resolve entities with structured output
          const { object: resolutionResult } = await generateObject({
            model: openai("gpt-4o"), // Use GPT-4o for complex entity resolution
            system: systemPrompt,
            prompt: `Analyze the following entities and identify duplicates that should be resolved:

Entities to Analyze:
${JSON.stringify(allEntitiesForResolution.map(e => ({
  id: e.id,
  name: e.name,
  type: e.type,
  properties: e.properties,
  confidence: e.confidence,
  sources: e.sources,
})), null, 2)}

Context Information:
${JSON.stringify(payload.context || {}, null, 2)}

Source ID: ${payload.sourceId}
Similarity Threshold: ${similarityThreshold}

Group duplicate entities and provide resolution strategies.`,
            schema: EntityResolutionSchema,
            temperature: 0.2, // Low temperature for consistent resolution
          });

          console.log(`✅ Found ${resolutionResult.resolutionGroups.length} resolution groups and ${resolutionResult.singletonEntities.length} singleton entities`);

          // Process resolution groups
          for (const group of resolutionResult.resolutionGroups) {
            const canonicalEntityId = group.canonicalEntity.id;
            const duplicateIds = group.duplicateEntities.map(d => d.id);

            // Find the canonical entity
            const canonicalEntity = allEntitiesForResolution.find(e => e.id === canonicalEntityId);
            if (!canonicalEntity) {
              warnings.push(`Canonical entity ${canonicalEntityId} not found in batch`);
              continue;
            }

            // Create merged entity
            const mergedEntity: Entity = {
              ...canonicalEntity,
              name: group.canonicalEntity.name,
              confidence: Math.max(group.canonicalEntity.confidence, canonicalEntity.confidence),
              properties: {
                ...canonicalEntity.properties,
                ...group.mergedProperties,
                resolvedAt: new Date(),
                resolutionReasoning: group.canonicalEntity.reasoning,
                mergedFromEntities: duplicateIds,
                qualityScore: group.qualityScore,
              },
              sources: [...new Set(group.mergedSources)],
              updatedAt: new Date(),
            };

            allResolvedEntities.push(mergedEntity);

            // Track entities to be merged/deleted
            for (const duplicate of group.duplicateEntities) {
              if (duplicate.mergeStrategy === "merge_properties" || duplicate.mergeStrategy === "replace") {
                if (duplicate.id !== canonicalEntityId) {
                  allDeletedEntityIds.push(duplicate.id);
                  allMergedEntityIds.push(duplicate.id);
                }
              }
            }

            totalDuplicatesFound += group.duplicateEntities.length;
          }

          // Process singleton entities (no duplicates found)
          for (const singleton of resolutionResult.singletonEntities) {
            const singletonEntity = allEntitiesForResolution.find(e => e.id === singleton.id);
            if (singletonEntity) {
              allResolvedEntities.push({
                ...singletonEntity,
                properties: {
                  ...singletonEntity.properties,
                  qualityScore: singleton.qualityScore,
                  resolutionReasoning: singleton.reasoning,
                  resolvedAt: new Date(),
                },
                updatedAt: new Date(),
              });
            }
          }

        } catch (batchError) {
          const errorMessage = batchError instanceof Error ? batchError.message : String(batchError);
          warnings.push(`Batch ${batchIndex + 1} processing failed: ${errorMessage}`);
          console.error(`❌ Batch ${batchIndex + 1} failed: ${errorMessage}`);
          
          // Add unprocessed entities as-is
          allResolvedEntities.push(...batch);
        }
      }

      // Update database with resolved entities
      console.log(`💾 Updating database with ${allResolvedEntities.length} resolved entities`);

      // Update existing entities
      const entitiesToUpdate = allResolvedEntities.filter(e => 
        !payload.entities.some(pe => pe.id === e.id) // Only update existing entities
      );

      for (const entity of entitiesToUpdate) {
        await db
          .update(entities)
          .set({
            name: entity.name,
            properties: entity.properties,
            confidence: entity.confidence,
            sources: entity.sources,
            updatedAt: entity.updatedAt,
          })
          .where(eq(entities.id, entity.id));
      }

      // Insert new entities
      const entitiesToInsert = allResolvedEntities.filter(e => 
        payload.entities.some(pe => pe.id === e.id) // Only insert new entities from payload
      );

      if (entitiesToInsert.length > 0) {
        await db.insert(entities).values(
          entitiesToInsert.map(entity => ({
            id: entity.id,
            name: entity.name,
            type: entity.type,
            properties: entity.properties,
            confidence: entity.confidence,
            sources: entity.sources,
            embedding: entity.embedding || null,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
          }))
        ).onConflictDoUpdate({
          target: entities.id,
          set: {
            name: sql`excluded.name`,
            properties: sql`excluded.properties`,
            confidence: sql`excluded.confidence`,
            sources: sql`excluded.sources`,
            updatedAt: sql`excluded.updated_at`,
          },
        });
      }

      // Delete duplicate entities
      if (allDeletedEntityIds.length > 0) {
        console.log(`🗑️ Deleting ${allDeletedEntityIds.length} duplicate entities`);
        
        // First, update relationships to point to canonical entities
        // This is a simplified approach - in production, you'd need more sophisticated relationship updating
        await db
          .delete(entities)
          .where(inArray(entities.id, allDeletedEntityIds));
      }

      const processingTimeMs = Date.now() - startTime;

      console.log(`📊 Processed ${payload.entities.length} entities`);
      console.log(`📊 Resolved ${allResolvedEntities.length} entities`);
      console.log(`📊 Merged ${allMergedEntityIds.length} entities`);
      console.log(`📊 Deleted ${allDeletedEntityIds.length} duplicates`);
      console.log(`📊 Found ${totalDuplicatesFound} total duplicates`);
      console.log(`⏱️ Processing completed in ${processingTimeMs}ms`);

      // Close database connection
      await client.end();

      return {
        resolvedEntities: allResolvedEntities,
        mergedEntityIds: allMergedEntityIds,
        deletedEntityIds: allDeletedEntityIds,
        resolutionMetadata: {
          totalEntitiesProcessed: payload.entities.length,
          entitiesResolved: allResolvedEntities.length,
          entitiesMerged: allMergedEntityIds.length,
          entitiesDeleted: allDeletedEntityIds.length,
          duplicatesFound: totalDuplicatesFound,
          processingTimeMs,
          sourceId: payload.sourceId,
        },
        success: true,
        warnings: warnings.length > 0 ? warnings : undefined,
      };

    } catch (error) {
      const processingTimeMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(`❌ Entity resolution failed: ${errorMessage}`);
      console.error(`⏱️ Failed after ${processingTimeMs}ms`);

      return {
        resolvedEntities: payload.entities,
        mergedEntityIds: [],
        deletedEntityIds: [],
        resolutionMetadata: {
          totalEntitiesProcessed: payload.entities.length,
          entitiesResolved: 0,
          entitiesMerged: 0,
          entitiesDeleted: 0,
          duplicatesFound: 0,
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

// Export type for use in other tasks
export type ResolveEntitiesTask = typeof resolveEntitiesTask;