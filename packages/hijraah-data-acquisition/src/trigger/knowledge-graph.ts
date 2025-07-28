/**
 * Knowledge Graph Construction Tasks
 * 
 * Trigger.dev v4 tasks for entity extraction, relationship mapping,
 * confidence scoring, and entity resolution using AI SDK and Drizzle ORM.
 */

import { task, triggerAndWait } from "@trigger.dev/sdk/v3";
import { generateText, generateObject } from "ai";
import { openai } from "ai/openai";
import { z } from "zod";
import { db } from "../db/connection";
import { entities, relationships } from "../db/schema";
import { eq, and, sql, inArray } from "drizzle-orm";
import { EntitySchema, RelationshipSchema } from "../types";

// Zod schemas for structured AI responses
const EntityExtractionSchema = z.object({
  entities: z.array(z.object({
    name: z.string(),
    type: z.enum([
      "country",
      "visa_type", 
      "requirement",
      "document",
      "process",
      "fee",
      "timeline",
      "policy",
      "regulation",
      "authority"
    ]),
    properties: z.record(z.any()),
    confidence: z.number().min(0).max(1),
    context: z.string(),
    aliases: z.array(z.string()).optional()
  }))
});

const RelationshipMappingSchema = z.object({
  relationships: z.array(z.object({
    sourceEntity: z.string(),
    targetEntity: z.string(),
    type: z.enum([
      "requires",
      "includes", 
      "excludes",
      "replaces",
      "depends_on",
      "part_of",
      "applies_to",
      "issued_by",
      "valid_for"
    ]),
    strength: z.number().min(0).max(1),
    confidence: z.number().min(0).max(1),
    properties: z.record(z.any()).optional(),
    reasoning: z.string()
  }))
});

const ConfidenceScoreSchema = z.object({
  entityId: z.string(),
  confidenceScore: z.number().min(0).max(1),
  factors: z.array(z.object({
    factor: z.string(),
    weight: z.number(),
    score: z.number()
  })),
  reasoning: z.string(),
  similarEntities: z.array(z.object({
    entityId: z.string(),
    similarity: z.number()
  })).optional()
});

// Task 3.1.1: Extract entities from immigration documents/content
export const extractEntities = task({
  id: "extract-entities",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: {
    content: string;
    sourceId: string;
    country?: string;
    documentType?: string;
    metadata?: Record<string, any>;
  }) => {
    console.log(`🔍 Extracting entities from content (${payload.content.length} chars)`);
    
    try {
      // Use AI SDK to extract structured entities
      const result = await generateObject({
        model: openai("gpt-4o"),
        schema: EntityExtractionSchema,
        prompt: `
          Extract immigration-related entities from the following content.
          Focus on identifying countries, visa types, requirements, documents, processes, fees, timelines, policies, and authorities.
          
          Content: ${payload.content}
          
          Source Country: ${payload.country || "Unknown"}
          Document Type: ${payload.documentType || "Unknown"}
          
          Instructions:
          - Extract only immigration-relevant entities
          - Assign confidence scores based on clarity and context
          - Include properties that capture important details
          - Use consistent naming conventions
          - Identify aliases and alternative names
          
          Return a structured list of entities with their properties and confidence scores.
        `,
        temperature: 0.1,
      });

      // Store entities in database
      const storedEntities = [];
      
      for (const entity of result.object.entities) {
        // Check if entity already exists
        const existingEntity = await db
          .select()
          .from(entities)
          .where(and(
            eq(entities.name, entity.name),
            eq(entities.type, entity.type)
          ))
          .limit(1);

        if (existingEntity.length > 0) {
          // Update existing entity with new information
          const updated = await db
            .update(entities)
            .set({
              properties: {
                ...existingEntity[0].properties,
                ...entity.properties
              },
              confidence: Math.max(existingEntity[0].confidence, entity.confidence),
              sources: [
                ...((existingEntity[0].sources as string[]) || []),
                payload.sourceId
              ],
              updatedAt: new Date()
            })
            .where(eq(entities.id, existingEntity[0].id))
            .returning();
          
          storedEntities.push(updated[0]);
        } else {
          // Create new entity
          const newEntity = await db
            .insert(entities)
            .values({
              name: entity.name,
              type: entity.type,
              properties: entity.properties,
              confidence: entity.confidence,
              sources: [payload.sourceId],
              createdAt: new Date(),
              updatedAt: new Date()
            })
            .returning();
          
          storedEntities.push(newEntity[0]);
        }
      }

      console.log(`✅ Extracted and stored ${storedEntities.length} entities`);
      
      return {
        success: true,
        entitiesExtracted: storedEntities.length,
        entities: storedEntities.map(e => ({
          id: e.id,
          name: e.name,
          type: e.type,
          confidence: e.confidence
        })),
        metadata: {
          sourceId: payload.sourceId,
          contentLength: payload.content.length,
          processingTime: Date.now()
        }
      };

    } catch (error) {
      console.error("❌ Entity extraction failed:", error);
      throw new Error(`Entity extraction failed: ${error.message}`);
    }
  },
});

// Task 3.1.2: Map relationships between extracted entities
export const mapRelationships = task({
  id: "map-relationships", 
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: {
    entityIds: string[];
    content: string;
    sourceId: string;
    context?: Record<string, any>;
  }) => {
    console.log(`🔗 Mapping relationships between ${payload.entityIds.length} entities`);
    
    try {
      // Fetch entity details from database
      const entityDetails = await db
        .select()
        .from(entities)
        .where(inArray(entities.id, payload.entityIds));

      if (entityDetails.length === 0) {
        throw new Error("No entities found for relationship mapping");
      }

      // Use AI SDK with tool calling for consistent relationship extraction
      const result = await generateObject({
        model: openai("gpt-4o"),
        schema: RelationshipMappingSchema,
        prompt: `
          Analyze the relationships between these immigration entities based on the provided content.
          
          Entities:
          ${entityDetails.map(e => `- ${e.name} (${e.type}): ${JSON.stringify(e.properties)}`).join('\n')}
          
          Content Context: ${payload.content}
          
          Instructions:
          - Identify meaningful relationships between entities
          - Use appropriate relationship types (requires, includes, excludes, etc.)
          - Assign strength scores based on relationship importance
          - Provide confidence scores based on evidence clarity
          - Include reasoning for each relationship
          - Focus on immigration-specific relationships
          
          Return structured relationships with confidence scores and reasoning.
        `,
        temperature: 0.1,
      });

      // Store relationships in database
      const storedRelationships = [];
      
      for (const rel of result.object.relationships) {
        // Find source and target entity IDs
        const sourceEntity = entityDetails.find(e => e.name === rel.sourceEntity);
        const targetEntity = entityDetails.find(e => e.name === rel.targetEntity);
        
        if (!sourceEntity || !targetEntity) {
          console.warn(`⚠️ Skipping relationship: entities not found (${rel.sourceEntity} -> ${rel.targetEntity})`);
          continue;
        }

        // Check if relationship already exists
        const existingRel = await db
          .select()
          .from(relationships)
          .where(and(
            eq(relationships.sourceEntityId, sourceEntity.id),
            eq(relationships.targetEntityId, targetEntity.id),
            eq(relationships.type, rel.type)
          ))
          .limit(1);

        if (existingRel.length > 0) {
          // Update existing relationship
          const updated = await db
            .update(relationships)
            .set({
              strength: Math.max(existingRel[0].strength, rel.strength),
              confidence: Math.max(existingRel[0].confidence, rel.confidence),
              properties: {
                ...existingRel[0].properties,
                ...rel.properties,
                reasoning: rel.reasoning
              }
            })
            .where(eq(relationships.id, existingRel[0].id))
            .returning();
          
          storedRelationships.push(updated[0]);
        } else {
          // Create new relationship
          const newRel = await db
            .insert(relationships)
            .values({
              sourceEntityId: sourceEntity.id,
              targetEntityId: targetEntity.id,
              type: rel.type,
              strength: rel.strength,
              confidence: rel.confidence,
              temporalValidity: {
                validFrom: new Date(),
                validTo: null
              },
              properties: {
                ...rel.properties,
                reasoning: rel.reasoning,
                sourceId: payload.sourceId
              },
              createdAt: new Date()
            })
            .returning();
          
          storedRelationships.push(newRel[0]);
        }
      }

      console.log(`✅ Mapped and stored ${storedRelationships.length} relationships`);
      
      return {
        success: true,
        relationshipsMapped: storedRelationships.length,
        relationships: storedRelationships.map(r => ({
          id: r.id,
          type: r.type,
          strength: r.strength,
          confidence: r.confidence
        })),
        metadata: {
          sourceId: payload.sourceId,
          entitiesProcessed: payload.entityIds.length,
          processingTime: Date.now()
        }
      };

    } catch (error) {
      console.error("❌ Relationship mapping failed:", error);
      throw new Error(`Relationship mapping failed: ${error.message}`);
    }
  },
});

// Task 3.1.3: Score confidence using AI validation and pgvector similarity
export const scoreConfidence = task({
  id: "score-confidence",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: {
    entityId: string;
    validationContext?: string;
    similarityThreshold?: number;
  }) => {
    console.log(`📊 Scoring confidence for entity ${payload.entityId}`);
    
    try {
      // Fetch entity details
      const entity = await db
        .select()
        .from(entities)
        .where(eq(entities.id, payload.entityId))
        .limit(1);

      if (entity.length === 0) {
        throw new Error(`Entity not found: ${payload.entityId}`);
      }

      const entityData = entity[0];

      // Find similar entities using pgvector (simulated with SQL similarity)
      const similarEntities = await db
        .select()
        .from(entities)
        .where(and(
          eq(entities.type, entityData.type),
          sql`${entities.id} != ${payload.entityId}`
        ))
        .limit(10);

      // Use AI SDK to analyze confidence factors
      const result = await generateObject({
        model: openai("gpt-4o"),
        schema: ConfidenceScoreSchema,
        prompt: `
          Analyze the confidence score for this immigration entity based on multiple factors.
          
          Entity: ${entityData.name} (${entityData.type})
          Properties: ${JSON.stringify(entityData.properties)}
          Current Confidence: ${entityData.confidence}
          Sources: ${JSON.stringify(entityData.sources)}
          
          Similar Entities: ${similarEntities.map(e => `${e.name} (confidence: ${e.confidence})`).join(', ')}
          
          Validation Context: ${payload.validationContext || "None provided"}
          
          Instructions:
          - Evaluate confidence based on source reliability, data completeness, consistency with similar entities
          - Consider factors: source authority, data freshness, cross-validation, specificity
          - Assign weights to different confidence factors
          - Provide detailed reasoning for the confidence score
          - Identify similar entities that support or contradict this entity
          
          Return a comprehensive confidence analysis.
        `,
        temperature: 0.1,
      });

      // Update entity confidence score
      const updatedEntity = await db
        .update(entities)
        .set({
          confidence: result.object.confidenceScore,
          properties: {
            ...entityData.properties,
            confidenceAnalysis: {
              factors: result.object.factors,
              reasoning: result.object.reasoning,
              lastScored: new Date(),
              similarEntities: result.object.similarEntities
            }
          },
          updatedAt: new Date()
        })
        .where(eq(entities.id, payload.entityId))
        .returning();

      console.log(`✅ Updated confidence score for ${entityData.name}: ${result.object.confidenceScore}`);
      
      return {
        success: true,
        entityId: payload.entityId,
        previousConfidence: entityData.confidence,
        newConfidence: result.object.confidenceScore,
        confidenceChange: result.object.confidenceScore - entityData.confidence,
        factors: result.object.factors,
        reasoning: result.object.reasoning,
        similarEntities: result.object.similarEntities,
        metadata: {
          processingTime: Date.now(),
          similarEntitiesFound: similarEntities.length
        }
      };

    } catch (error) {
      console.error("❌ Confidence scoring failed:", error);
      throw new Error(`Confidence scoring failed: ${error.message}`);
    }
  },
});

// Task 3.1.4: Resolve entities using batch processing
export const resolveEntities = task({
  id: "resolve-entities",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: {
    entityIds: string[];
    resolutionStrategy?: "merge" | "deduplicate" | "validate";
    batchSize?: number;
  }) => {
    console.log(`🔄 Resolving ${payload.entityIds.length} entities with strategy: ${payload.resolutionStrategy || "merge"}`);
    
    try {
      const batchSize = payload.batchSize || 10;
      const strategy = payload.resolutionStrategy || "merge";
      const resolvedEntities = [];
      const mergedEntities = [];
      const duplicatesRemoved = [];

      // Process entities in batches
      for (let i = 0; i < payload.entityIds.length; i += batchSize) {
        const batch = payload.entityIds.slice(i, i + batchSize);
        
        // Fetch batch entities
        const batchEntities = await db
          .select()
          .from(entities)
          .where(inArray(entities.id, batch));

        // Group similar entities for resolution
        const entityGroups = new Map<string, typeof batchEntities>();
        
        for (const entity of batchEntities) {
          const key = `${entity.type}:${entity.name.toLowerCase()}`;
          if (!entityGroups.has(key)) {
            entityGroups.set(key, []);
          }
          entityGroups.get(key)!.push(entity);
        }

        // Process each group
        for (const [key, group] of entityGroups) {
          if (group.length === 1) {
            resolvedEntities.push(group[0]);
            continue;
          }

          // Multiple entities with same name/type - resolve based on strategy
          if (strategy === "merge") {
            // Merge entities into the one with highest confidence
            const primary = group.reduce((best, current) => 
              current.confidence > best.confidence ? current : best
            );
            
            const mergedProperties = group.reduce((acc, entity) => ({
              ...acc,
              ...entity.properties
            }), {});

            const allSources = [...new Set(group.flatMap(e => e.sources as string[]))];

            // Update primary entity with merged data
            const merged = await db
              .update(entities)
              .set({
                properties: mergedProperties,
                sources: allSources,
                confidence: Math.max(...group.map(e => e.confidence)),
                updatedAt: new Date()
              })
              .where(eq(entities.id, primary.id))
              .returning();

            // Remove duplicate entities
            const duplicateIds = group.filter(e => e.id !== primary.id).map(e => e.id);
            if (duplicateIds.length > 0) {
              await db.delete(entities).where(inArray(entities.id, duplicateIds));
              duplicatesRemoved.push(...duplicateIds);
            }

            mergedEntities.push(merged[0]);
            resolvedEntities.push(merged[0]);
          } else if (strategy === "deduplicate") {
            // Keep only the highest confidence entity
            const best = group.reduce((best, current) => 
              current.confidence > best.confidence ? current : best
            );
            
            const duplicateIds = group.filter(e => e.id !== best.id).map(e => e.id);
            if (duplicateIds.length > 0) {
              await db.delete(entities).where(inArray(entities.id, duplicateIds));
              duplicatesRemoved.push(...duplicateIds);
            }

            resolvedEntities.push(best);
          } else if (strategy === "validate") {
            // Validate each entity and mark low-confidence ones
            for (const entity of group) {
              if (entity.confidence < 0.7) {
                await db
                  .update(entities)
                  .set({
                    properties: {
                      ...entity.properties,
                      validationStatus: "needs_review",
                      validationReason: "Low confidence during resolution"
                    },
                    updatedAt: new Date()
                  })
                  .where(eq(entities.id, entity.id));
              }
              resolvedEntities.push(entity);
            }
          }
        }
      }

      console.log(`✅ Resolved ${resolvedEntities.length} entities, merged ${mergedEntities.length}, removed ${duplicatesRemoved.length} duplicates`);
      
      return {
        success: true,
        strategy: strategy,
        entitiesProcessed: payload.entityIds.length,
        entitiesResolved: resolvedEntities.length,
        entitiesMerged: mergedEntities.length,
        duplicatesRemoved: duplicatesRemoved.length,
        resolvedEntityIds: resolvedEntities.map(e => e.id),
        metadata: {
          batchSize: batchSize,
          processingTime: Date.now()
        }
      };

    } catch (error) {
      console.error("❌ Entity resolution failed:", error);
      throw new Error(`Entity resolution failed: ${error.message}`);
    }
  },
});

// Task 3.1.5: Orchestrate complete entity processing pipeline
export const orchestrateEntityProcessing = task({
  id: "orchestrate-entity-processing",
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 60000,
  },
  run: async (payload: {
    content: string;
    sourceId: string;
    country?: string;
    documentType?: string;
    enableRelationshipMapping?: boolean;
    enableConfidenceScoring?: boolean;
    enableEntityResolution?: boolean;
    metadata?: Record<string, any>;
  }) => {
    console.log(`🚀 Orchestrating complete entity processing pipeline for source: ${payload.sourceId}`);
    
    try {
      const startTime = Date.now();
      const results = {
        extractionResult: null as any,
        relationshipResult: null as any,
        confidenceResults: [] as any[],
        resolutionResult: null as any
      };

      // Step 1: Extract entities
      console.log("📝 Step 1: Extracting entities...");
      results.extractionResult = await triggerAndWait(extractEntities, {
        content: payload.content,
        sourceId: payload.sourceId,
        country: payload.country,
        documentType: payload.documentType,
        metadata: payload.metadata
      });

      if (!results.extractionResult.success) {
        throw new Error("Entity extraction failed");
      }

      const entityIds = results.extractionResult.entities.map((e: any) => e.id);
      console.log(`✅ Extracted ${entityIds.length} entities`);

      // Step 2: Map relationships (if enabled)
      if (payload.enableRelationshipMapping !== false && entityIds.length > 1) {
        console.log("🔗 Step 2: Mapping relationships...");
        results.relationshipResult = await triggerAndWait(mapRelationships, {
          entityIds: entityIds,
          content: payload.content,
          sourceId: payload.sourceId,
          context: payload.metadata
        });
        console.log(`✅ Mapped ${results.relationshipResult.relationshipsMapped} relationships`);
      }

      // Step 3: Score confidence (if enabled)
      if (payload.enableConfidenceScoring !== false) {
        console.log("📊 Step 3: Scoring confidence...");
        for (const entityId of entityIds.slice(0, 5)) { // Limit to first 5 for performance
          const confidenceResult = await triggerAndWait(scoreConfidence, {
            entityId: entityId,
            validationContext: payload.content.substring(0, 500)
          });
          results.confidenceResults.push(confidenceResult);
        }
        console.log(`✅ Scored confidence for ${results.confidenceResults.length} entities`);
      }

      // Step 4: Resolve entities (if enabled)
      if (payload.enableEntityResolution !== false && entityIds.length > 1) {
        console.log("🔄 Step 4: Resolving entities...");
        results.resolutionResult = await triggerAndWait(resolveEntities, {
          entityIds: entityIds,
          resolutionStrategy: "merge",
          batchSize: 10
        });
        console.log(`✅ Resolved ${results.resolutionResult.entitiesResolved} entities`);
      }

      const totalTime = Date.now() - startTime;
      console.log(`🎉 Entity processing pipeline completed in ${totalTime}ms`);

      return {
        success: true,
        pipelineSteps: {
          extraction: !!results.extractionResult,
          relationshipMapping: !!results.relationshipResult,
          confidenceScoring: results.confidenceResults.length > 0,
          entityResolution: !!results.resolutionResult
        },
        results: results,
        summary: {
          entitiesExtracted: results.extractionResult?.entitiesExtracted || 0,
          relationshipsMapped: results.relationshipResult?.relationshipsMapped || 0,
          confidenceScored: results.confidenceResults.length,
          entitiesResolved: results.resolutionResult?.entitiesResolved || 0,
          duplicatesRemoved: results.resolutionResult?.duplicatesRemoved || 0
        },
        metadata: {
          sourceId: payload.sourceId,
          processingTime: totalTime,
          contentLength: payload.content.length,
          completedAt: new Date()
        }
      };

    } catch (error) {
      console.error("❌ Entity processing pipeline failed:", error);
      throw new Error(`Entity processing pipeline failed: ${error.message}`);
    }
  },
});

// Export all knowledge graph tasks
export const knowledgeGraphTasks = {
  extractEntities,
  mapRelationships,
  scoreConfidence,
  resolveEntities,
  orchestrateEntityProcessing,
};