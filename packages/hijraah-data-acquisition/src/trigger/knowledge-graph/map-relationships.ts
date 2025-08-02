/**
 * Relationship Mapping Task
 * 
 * Trigger.dev v4 task for mapping relationships between entities
 * using AI SDK's tool calling with toolChoice: 'required' for consistent extraction.
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, inArray } from "drizzle-orm";
import postgres from "postgres";
import { entities, relationships } from "../../db/schema.js";
import type { Entity, Relationship } from "../../types/index.js";

// Zod schema for relationship mapping
const RelationshipMappingSchema = z.object({
  relationships: z.array(
    z.object({
      sourceEntityName: z.string().describe("Name of the source entity"),
      targetEntityName: z.string().describe("Name of the target entity"),
      relationshipType: z.enum([
        "requires",
        "includes", 
        "excludes",
        "replaces",
        "depends_on",
        "part_of",
        "applies_to",
        "issued_by",
        "valid_for",
        "costs",
        "takes_time",
        "prerequisite_for",
        "alternative_to",
        "supersedes"
      ]).describe("Type of relationship between entities"),
      strength: z.number().min(0).max(1).describe("Strength of the relationship (0-1)"),
      confidence: z.number().min(0).max(1).describe("Confidence in this relationship mapping (0-1)"),
      evidence: z.string().describe("Text evidence supporting this relationship"),
      temporalValidity: z.object({
        validFrom: z.string().optional().describe("When this relationship becomes valid (ISO date)"),
        validTo: z.string().optional().describe("When this relationship expires (ISO date)"),
        isConditional: z.boolean().default(false).describe("Whether this relationship is conditional")
      }).optional().describe("Temporal validity of the relationship"),
      properties: z.record(z.any()).optional().describe("Additional properties for this relationship"),
      bidirectional: z.boolean().default(false).describe("Whether this relationship works both ways")
    })
  ).describe("List of relationships identified between entities"),
  metadata: z.object({
    totalEntitiesAnalyzed: z.number().describe("Number of entities analyzed for relationships"),
    relationshipDensity: z.number().describe("Ratio of relationships to entities"),
    averageConfidence: z.number().describe("Average confidence across all relationships"),
    complexityScore: z.enum(["low", "medium", "high"]).describe("Complexity of relationship mapping")
  }).describe("Metadata about the relationship mapping process")
});

// Tool for validating entity existence
const validateEntityTool = tool({
  description: "Validate that entities exist in the knowledge base before creating relationships",
  parameters: z.object({
    entityNames: z.array(z.string()).describe("List of entity names to validate"),
  }),
  execute: async ({ entityNames }) => {
    const connectionString = process.env.DATABASE_URL!;
    const client = postgres(connectionString);
    const db = drizzle(client);

    try {
      const existingEntities = await db
        .select({ name: entities.name, id: entities.id, type: entities.type })
        .from(entities)
        .where(inArray(entities.name, entityNames));

      await client.end();

      return {
        validEntities: existingEntities,
        invalidEntities: entityNames.filter(
          name => !existingEntities.some(e => e.name === name)
        )
      };
    } catch (error) {
      await client.end();
      throw error;
    }
  },
});

// Tool for checking existing relationships
const checkExistingRelationshipsTool = tool({
  description: "Check if relationships already exist to avoid duplicates",
  parameters: z.object({
    sourceEntityId: z.string().describe("ID of the source entity"),
    targetEntityId: z.string().describe("ID of the target entity"),
    relationshipType: z.string().describe("Type of relationship to check"),
  }),
  execute: async ({ sourceEntityId, targetEntityId, relationshipType }) => {
    const connectionString = process.env.DATABASE_URL!;
    const client = postgres(connectionString);
    const db = drizzle(client);

    try {
      const existingRelationship = await db
        .select()
        .from(relationships)
        .where(
          eq(relationships.sourceEntityId, sourceEntityId) &&
          eq(relationships.targetEntityId, targetEntityId) &&
          eq(relationships.type, relationshipType)
        )
        .limit(1);

      await client.end();

      return {
        exists: existingRelationship.length > 0,
        relationship: existingRelationship[0] || null
      };
    } catch (error) {
      await client.end();
      throw error;
    }
  },
});

type RelationshipMappingInput = {
  entities: Entity[];
  sourceId: string;
  context?: Record<string, any>;
  contentText?: string;
};

type RelationshipMappingOutput = {
  relationships: Relationship[];
  mappingMetadata: {
    totalRelationships: number;
    averageConfidence: number;
    averageStrength: number;
    processingTimeMs: number;
    entitiesAnalyzed: number;
    sourceId: string;
  };
  success: boolean;
  errors?: string[];
  warnings?: string[];
};

export const mapRelationshipsTask = task({
  id: "map-relationships",
  machine: {
    preset: "small-2x", // 1 vCPU, 1 GB RAM for AI processing
  },
  maxDuration: 600, // 10 minutes max for complex relationship mapping
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 3000,
    maxTimeoutInMs: 15000,
    factor: 2,
  },
  run: async (payload: RelationshipMappingInput): Promise<RelationshipMappingOutput> => {
    const startTime = Date.now();
    const warnings: string[] = [];
    
    try {
      console.log(`🔗 Starting relationship mapping for ${payload.entities.length} entities`);
      console.log(`📄 Source: ${payload.sourceId}`);

      if (payload.entities.length < 2) {
        console.log(`⚠️ Not enough entities for relationship mapping (need at least 2)`);
        return {
          relationships: [],
          mappingMetadata: {
            totalRelationships: 0,
            averageConfidence: 0,
            averageStrength: 0,
            processingTimeMs: Date.now() - startTime,
            entitiesAnalyzed: payload.entities.length,
            sourceId: payload.sourceId,
          },
          success: true,
          warnings: ["Not enough entities for relationship mapping"],
        };
      }

      // Initialize database connection
      const connectionString = process.env.DATABASE_URL!;
      const client = postgres(connectionString);
      const db = drizzle(client);

      // Prepare entity information for AI analysis
      const entityInfo = payload.entities.map(entity => ({
        name: entity.name,
        type: entity.type,
        properties: entity.properties,
        confidence: entity.confidence,
      }));

      // Prepare system prompt for relationship mapping
      const systemPrompt = `You are an expert immigration policy analyst specializing in mapping relationships between immigration-related entities.

Your task is to identify and map meaningful relationships between the provided entities based on immigration domain knowledge and the content context.

Key relationship types in immigration:
- "requires": Entity A requires Entity B (e.g., visa requires passport)
- "includes": Entity A includes Entity B (e.g., application includes documents)
- "excludes": Entity A excludes Entity B (e.g., certain visas exclude work)
- "replaces": Entity A replaces Entity B (e.g., new policy replaces old)
- "depends_on": Entity A depends on Entity B (e.g., approval depends on eligibility)
- "part_of": Entity A is part of Entity B (e.g., step is part of process)
- "applies_to": Entity A applies to Entity B (e.g., rule applies to category)
- "issued_by": Entity A is issued by Entity B (e.g., visa issued by embassy)
- "valid_for": Entity A is valid for Entity B (e.g., permit valid for duration)
- "costs": Entity A costs Entity B (e.g., application costs fee)
- "takes_time": Entity A takes time B (e.g., process takes timeline)
- "prerequisite_for": Entity A is prerequisite for Entity B
- "alternative_to": Entity A is alternative to Entity B
- "supersedes": Entity A supersedes Entity B

Guidelines:
1. Only map relationships that are clearly supported by evidence
2. Assess relationship strength based on how critical the connection is
3. Provide high confidence only for explicit relationships
4. Consider temporal aspects - some relationships may be time-bound
5. Avoid creating redundant or overly obvious relationships
6. Focus on actionable and meaningful connections

Use the validation tools to ensure entities exist before creating relationships.`;

      // Use AI SDK with tool calling to map relationships
      const { object: mappingResult } = await generateObject({
        model: openai("gpt-4o"), // Use GPT-4o for complex relationship reasoning
        system: systemPrompt,
        prompt: `Analyze the following entities and map meaningful relationships between them:

Entities:
${JSON.stringify(entityInfo, null, 2)}

Content Context:
${payload.contentText || 'No additional content context provided'}

Additional Context:
${JSON.stringify(payload.context || {}, null, 2)}

Use the validation tools to check entity existence and avoid duplicate relationships.`,
        schema: RelationshipMappingSchema,
        tools: {
          validateEntity: validateEntityTool,
          checkExistingRelationships: checkExistingRelationshipsTool,
        },
        toolChoice: "auto", // Allow AI to use tools as needed
        temperature: 0.2, // Low temperature for consistent relationship mapping
      });

      console.log(`✅ Mapped ${mappingResult.relationships.length} relationships`);

      // Create entity name to ID mapping
      const entityNameToId = new Map<string, string>();
      payload.entities.forEach(entity => {
        entityNameToId.set(entity.name, entity.id);
      });

      // Transform mapped relationships to our Relationship type
      const processedRelationships: Relationship[] = [];
      
      for (const rel of mappingResult.relationships) {
        const sourceEntityId = entityNameToId.get(rel.sourceEntityName);
        const targetEntityId = entityNameToId.get(rel.targetEntityName);

        if (!sourceEntityId || !targetEntityId) {
          warnings.push(`Skipping relationship: Entity not found - ${rel.sourceEntityName} -> ${rel.targetEntityName}`);
          continue;
        }

        if (sourceEntityId === targetEntityId) {
          warnings.push(`Skipping self-referential relationship for entity: ${rel.sourceEntityName}`);
          continue;
        }

        const relationship: Relationship = {
          id: `${payload.sourceId}-rel-${processedRelationships.length}-${Date.now()}`,
          sourceEntityId,
          targetEntityId,
          type: rel.relationshipType as Relationship['type'],
          strength: rel.strength,
          confidence: rel.confidence,
          temporalValidity: rel.temporalValidity ? {
            validFrom: rel.temporalValidity.validFrom ? new Date(rel.temporalValidity.validFrom) : new Date(),
            validTo: rel.temporalValidity.validTo ? new Date(rel.temporalValidity.validTo) : undefined,
          } : {
            validFrom: new Date(),
          },
          properties: {
            ...rel.properties,
            evidence: rel.evidence,
            bidirectional: rel.bidirectional,
            sourceId: payload.sourceId,
          },
          createdAt: new Date(),
        };

        processedRelationships.push(relationship);

        // If bidirectional, create reverse relationship
        if (rel.bidirectional) {
          const reverseRelationship: Relationship = {
            ...relationship,
            id: `${payload.sourceId}-rel-reverse-${processedRelationships.length}-${Date.now()}`,
            sourceEntityId: targetEntityId,
            targetEntityId: sourceEntityId,
            properties: {
              ...relationship.properties,
              isReverse: true,
              originalRelationshipId: relationship.id,
            },
          };
          processedRelationships.push(reverseRelationship);
        }
      }

      // Store relationships in database
      if (processedRelationships.length > 0) {
        await db.insert(relationships).values(
          processedRelationships.map(rel => ({
            id: rel.id,
            sourceEntityId: rel.sourceEntityId,
            targetEntityId: rel.targetEntityId,
            type: rel.type,
            strength: rel.strength,
            confidence: rel.confidence,
            temporalValidity: rel.temporalValidity,
            properties: rel.properties,
            createdAt: rel.createdAt,
          }))
        );

        console.log(`💾 Stored ${processedRelationships.length} relationships in database`);
      }

      const processingTimeMs = Date.now() - startTime;
      const averageConfidence = processedRelationships.length > 0 
        ? processedRelationships.reduce((sum, r) => sum + r.confidence, 0) / processedRelationships.length 
        : 0;
      const averageStrength = processedRelationships.length > 0 
        ? processedRelationships.reduce((sum, r) => sum + r.strength, 0) / processedRelationships.length 
        : 0;

      console.log(`📊 Average confidence: ${averageConfidence.toFixed(3)}`);
      console.log(`📊 Average strength: ${averageStrength.toFixed(3)}`);
      console.log(`⏱️ Processing completed in ${processingTimeMs}ms`);

      // Close database connection
      await client.end();

      return {
        relationships: processedRelationships,
        mappingMetadata: {
          totalRelationships: processedRelationships.length,
          averageConfidence,
          averageStrength,
          processingTimeMs,
          entitiesAnalyzed: payload.entities.length,
          sourceId: payload.sourceId,
        },
        success: true,
        warnings: warnings.length > 0 ? warnings : undefined,
      };

    } catch (error) {
      const processingTimeMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(`❌ Relationship mapping failed: ${errorMessage}`);
      console.error(`⏱️ Failed after ${processingTimeMs}ms`);

      return {
        relationships: [],
        mappingMetadata: {
          totalRelationships: 0,
          averageConfidence: 0,
          averageStrength: 0,
          processingTimeMs,
          entitiesAnalyzed: payload.entities.length,
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
export type MapRelationshipsTask = typeof mapRelationshipsTask;