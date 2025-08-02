/**
 * Entity Extraction Task
 * 
 * Trigger.dev v4 task for extracting entities from immigration content
 * using AI SDK's generateObject with structured Zod schemas.
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { entities } from "../../db/schema.js";
import type { Entity } from "../../types/index.js";

// Zod schema for entity extraction
const EntityExtractionSchema = z.object({
  entities: z.array(
    z.object({
      name: z.string().describe("The name or title of the entity"),
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
        "agency",
        "location",
        "qualification",
        "condition"
      ]).describe("The category/type of the entity"),
      properties: z.record(z.any()).describe("Additional properties and metadata for the entity"),
      confidence: z.number().min(0).max(1).describe("Confidence score for entity extraction (0-1)"),
      context: z.string().describe("The surrounding context where this entity was found"),
      aliases: z.array(z.string()).optional().describe("Alternative names or references for this entity"),
      temporalInfo: z.object({
        validFrom: z.string().optional().describe("When this entity becomes valid (ISO date)"),
        validTo: z.string().optional().describe("When this entity expires (ISO date)"),
        isTemporary: z.boolean().default(false).describe("Whether this is a temporary entity")
      }).optional().describe("Temporal validity information")
    })
  ).describe("List of extracted entities from the content"),
  metadata: z.object({
    contentType: z.string().describe("Type of content processed (policy, form, guide, etc.)"),
    language: z.string().describe("Language of the content"),
    sourceReliability: z.number().min(0).max(1).describe("Reliability score of the source"),
    processingComplexity: z.enum(["low", "medium", "high"]).describe("Complexity of the content processed"),
    extractionMethod: z.string().describe("Method used for extraction")
  }).describe("Metadata about the extraction process")
});

type EntityExtractionInput = {
  content: string;
  sourceId: string;
  sourceUrl?: string;
  contentType?: string;
  language?: string;
  context?: Record<string, any>;
};

type EntityExtractionOutput = {
  entities: Entity[];
  extractionMetadata: {
    totalEntities: number;
    averageConfidence: number;
    processingTimeMs: number;
    contentLength: number;
    sourceId: string;
  };
  success: boolean;
  errors?: string[];
};

export const extractEntitiesTask = task({
  id: "extract-entities",
  machine: {
    preset: "small-2x", // 1 vCPU, 1 GB RAM for AI processing
  },
  maxDuration: 300, // 5 minutes max
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 10000,
    factor: 2,
  },
  run: async (payload: EntityExtractionInput): Promise<EntityExtractionOutput> => {
    const startTime = Date.now();
    
    try {
      console.log(`🔍 Starting entity extraction for source: ${payload.sourceId}`);
      console.log(`📄 Content length: ${payload.content.length} characters`);

      // Initialize database connection
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const connectionString = process.env.DATABASE_URL!;
      const client = postgres(connectionString);
      const db = drizzle(client);

      // Prepare system prompt for immigration-specific entity extraction
      const systemPrompt = `You are an expert immigration policy analyst specializing in extracting structured entities from immigration-related content.

Your task is to identify and extract all relevant entities from immigration documents, policies, forms, and guides.

Focus on extracting:
- Countries and jurisdictions
- Visa types and categories
- Requirements and eligibility criteria
- Required documents and forms
- Processes and procedures
- Fees and costs
- Timelines and deadlines
- Policies and regulations
- Government agencies and departments
- Locations and addresses
- Qualifications and credentials
- Conditions and restrictions

For each entity:
1. Provide a clear, standardized name
2. Classify it into the most appropriate type
3. Extract relevant properties and metadata
4. Assess your confidence in the extraction
5. Note the context where it was found
6. Include temporal information if applicable

Be thorough but precise. Avoid duplicates and ensure high-quality extractions.`;

      // Use AI SDK to extract entities with structured output
      const { object: extractionResult } = await generateObject({
        model: openai("gpt-4o"), // Use GPT-4o for high-quality extraction
        system: systemPrompt,
        prompt: `Extract all immigration-related entities from the following content:

Source: ${payload.sourceUrl || 'Unknown'}
Content Type: ${payload.contentType || 'Unknown'}
Language: ${payload.language || 'Unknown'}

Content:
${payload.content}

Additional Context: ${JSON.stringify(payload.context || {})}`,
        schema: EntityExtractionSchema,
        temperature: 0.1, // Low temperature for consistent extraction
      });

      console.log(`✅ Extracted ${extractionResult.entities.length} entities`);

      // Transform extracted entities to our Entity type
      const processedEntities: Entity[] = extractionResult.entities.map((entity, index) => ({
        id: `${payload.sourceId}-entity-${index}-${Date.now()}`,
        name: entity.name,
        type: entity.type as Entity['type'],
        properties: {
          ...entity.properties,
          aliases: entity.aliases || [],
          temporalInfo: entity.temporalInfo,
          extractionContext: entity.context,
          sourceUrl: payload.sourceUrl,
          contentType: payload.contentType,
        },
        confidence: entity.confidence,
        sources: [payload.sourceId],
        embedding: undefined, // Will be generated in a separate task
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Store entities in database
      if (processedEntities.length > 0) {
        await db.insert(entities).values(
          processedEntities.map(entity => ({
            id: entity.id,
            name: entity.name,
            type: entity.type,
            properties: entity.properties,
            confidence: entity.confidence,
            sources: entity.sources,
            embedding: null, // Will be populated by embedding task
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
          }))
        );

        console.log(`💾 Stored ${processedEntities.length} entities in database`);
      }

      const processingTimeMs = Date.now() - startTime;
      const averageConfidence = processedEntities.length > 0 
        ? processedEntities.reduce((sum, e) => sum + e.confidence, 0) / processedEntities.length 
        : 0;

      console.log(`📊 Average confidence: ${averageConfidence.toFixed(3)}`);
      console.log(`⏱️ Processing completed in ${processingTimeMs}ms`);

      // Close database connection
      await client.end();

      return {
        entities: processedEntities,
        extractionMetadata: {
          totalEntities: processedEntities.length,
          averageConfidence,
          processingTimeMs,
          contentLength: payload.content.length,
          sourceId: payload.sourceId,
        },
        success: true,
      };

    } catch (error) {
      const processingTimeMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(`❌ Entity extraction failed: ${errorMessage}`);
      console.error(`⏱️ Failed after ${processingTimeMs}ms`);

      return {
        entities: [],
        extractionMetadata: {
          totalEntities: 0,
          averageConfidence: 0,
          processingTimeMs,
          contentLength: payload.content.length,
          sourceId: payload.sourceId,
        },
        success: false,
        errors: [errorMessage],
      };
    }
  },
});

// Export type for use in other tasks
export type ExtractEntitiesTask = typeof extractEntitiesTask;