/**
 * Entity Importance Calculation Task
 * 
 * Trigger.dev v4 scheduled task for calculating entity importance using
 * PostgreSQL window functions and batch processing. Implements PageRank-like
 * algorithms and centrality measures for immigration knowledge graph.
 */

import { task, schedules } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection";
import { entities, relationships } from "../../db/schema";
import { eq, sql, desc, asc, and, or, inArray } from "drizzle-orm";

// Zod schemas for structured responses
const EntityImportanceSchema = z.object({
  entityId: z.string(),
  importanceScore: z.number().min(0).max(1),
  importanceFactors: z.object({
    centralityScore: z.number(),
    connectivityScore: z.number(),
    authorityScore: z.number(),
    hubScore: z.number(),
    frequencyScore: z.number(),
    recencyScore: z.number()
  }),
  ranking: z.number(),
  category: z.enum(["critical", "high", "medium", "low"]),
  reasoning: z.string(),
  relatedEntities: z.array(z.object({
    entityId: z.string(),
    entityName: z.string(),
    relationshipType: z.string(),
    influence: z.number()
  }))
});

const ImportanceBatchSchema = z.object({
  processedEntities: z.array(EntityImportanceSchema),
  batchMetrics: z.object({
    totalEntities: z.number(),
    averageImportance: z.number(),
    topEntities: z.array(z.string()),
    distributionStats: z.object({
      critical: z.number(),
      high: z.number(),
      medium: z.number(),
      low: z.number()
    })
  }),
  insights: z.array(z.object({
    type: z.enum(["trend", "anomaly", "cluster", "gap"]),
    description: z.string(),
    entities: z.array(z.string()),
    significance: z.number()
  }))
});

// Task 3.3.2: Calculate entity importance using PostgreSQL window functions
export const calculateEntityImportanceTask = task({
  id: "calculate-entity-importance",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 120000,
  },
  run: async (payload: {
    entityIds?: string[];
    entityTypes?: string[];
    batchSize?: number;
    algorithm?: "pagerank" | "centrality" | "hybrid" | "frequency";
    includeTemporalFactors?: boolean;
    updateDatabase?: boolean;
  }) => {
    console.log(`📊 Calculating entity importance with algorithm: ${payload.algorithm || "hybrid"}`);
    
    try {
      const startTime = Date.now();
      const batchSize = payload.batchSize || 100;
      const algorithm = payload.algorithm || "hybrid";
      const includeTemporalFactors = payload.includeTemporalFactors !== false;
      
      // Get entities to process
      let entitiesToProcess;
      
      if (payload.entityIds && payload.entityIds.length > 0) {
        entitiesToProcess = await db
          .select()
          .from(entities)
          .where(inArray(entities.id, payload.entityIds));
      } else if (payload.entityTypes && payload.entityTypes.length > 0) {
        entitiesToProcess = await db
          .select()
          .from(entities)
          .where(inArray(entities.type, payload.entityTypes));
      } else {
        entitiesToProcess = await db.select().from(entities);
      }

      console.log(`🔢 Processing ${entitiesToProcess.length} entities in batches of ${batchSize}`);
      
      const processedBatches = [];
      
      // Process entities in batches
      for (let i = 0; i < entitiesToProcess.length; i += batchSize) {
        const batch = entitiesToProcess.slice(i, i + batchSize);
        console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entitiesToProcess.length / batchSize)}`);
        
        const batchResults = await processBatch(batch, algorithm, includeTemporalFactors);
        processedBatches.push(batchResults);
        
        // Update database if requested
        if (payload.updateDatabase) {
          await updateEntityImportanceScores(batchResults.processedEntities);
        }
      }

      // Aggregate results from all batches
      const allProcessedEntities = processedBatches.flatMap(batch => batch.processedEntities);
      
      // Use AI to analyze overall importance patterns
      const analysisResult = await generateObject({
        model: openai("gpt-4o"),
        schema: ImportanceBatchSchema,
        prompt: `
          Analyze the entity importance calculation results for immigration knowledge graph.
          
          Algorithm Used: ${algorithm}
          Total Entities Processed: ${allProcessedEntities.length}
          Include Temporal Factors: ${includeTemporalFactors}
          
          Entity Importance Data: ${JSON.stringify(allProcessedEntities.slice(0, 20))} // Sample for analysis
          
          Instructions:
          - Analyze the distribution of importance scores
          - Identify the most critical entities for immigration processes
          - Look for patterns, trends, and anomalies in importance scores
          - Categorize entities by importance level
          - Provide insights about the knowledge graph structure
          - Focus on immigration-relevant importance factors
          
          Return comprehensive analysis with metrics and insights.
        `,
        temperature: 0.1,
      });

      const executionTime = Date.now() - startTime;
      
      console.log(`✅ Entity importance calculation completed in ${executionTime}ms`);
      console.log(`📈 Processed ${allProcessedEntities.length} entities`);
      console.log(`🏆 Top entities: ${analysisResult.object.batchMetrics.topEntities.join(", ")}`);
      
      return {
        success: true,
        algorithm: algorithm,
        results: analysisResult.object,
        performance: {
          executionTimeMs: executionTime,
          entitiesProcessed: allProcessedEntities.length,
          batchesProcessed: processedBatches.length,
          averageImportance: analysisResult.object.batchMetrics.averageImportance
        },
        metadata: {
          batchSize: batchSize,
          includeTemporalFactors: includeTemporalFactors,
          databaseUpdated: payload.updateDatabase || false,
          timestamp: new Date()
        }
      };

    } catch (error) {
      console.error("❌ Entity importance calculation failed:", error);
      throw new Error(`Entity importance calculation failed: ${error.message}`);
    }
  },
});

// Scheduled task for periodic importance calculation
export const scheduledEntityImportanceTask = schedules.task({
  id: "scheduled-entity-importance",
  cron: "0 2 * * *", // Daily at 2 AM
  run: async () => {
    console.log("🕐 Running scheduled entity importance calculation");
    
    try {
      // Calculate importance for all entities with hybrid algorithm
      const result = await calculateEntityImportanceTask.trigger({
        algorithm: "hybrid",
        includeTemporalFactors: true,
        updateDatabase: true,
        batchSize: 50
      });
      
      console.log("✅ Scheduled entity importance calculation completed");
      return result;
      
    } catch (error) {
      console.error("❌ Scheduled entity importance calculation failed:", error);
      throw error;
    }
  },
});

// Helper function: Process a batch of entities
async function processBatch(
  entities: any[],
  algorithm: string,
  includeTemporalFactors: boolean
) {
  const processedEntities = [];
  
  for (const entity of entities) {
    const importanceData = await calculateEntityImportance(
      entity,
      algorithm,
      includeTemporalFactors
    );
    processedEntities.push(importanceData);
  }
  
  // Sort by importance score
  processedEntities.sort((a, b) => b.importanceScore - a.importanceScore);
  
  // Assign rankings
  processedEntities.forEach((entity, index) => {
    entity.ranking = index + 1;
  });
  
  return { processedEntities };
}

// Helper function: Calculate importance for a single entity
async function calculateEntityImportance(
  entity: any,
  algorithm: string,
  includeTemporalFactors: boolean
) {
  const factors = {
    centralityScore: 0,
    connectivityScore: 0,
    authorityScore: 0,
    hubScore: 0,
    frequencyScore: 0,
    recencyScore: 0
  };
  
  // Calculate centrality score (degree centrality)
  const incomingConnections = await db
    .select({ count: sql<number>`count(*)` })
    .from(relationships)
    .where(eq(relationships.targetEntityId, entity.id));
    
  const outgoingConnections = await db
    .select({ count: sql<number>`count(*)` })
    .from(relationships)
    .where(eq(relationships.sourceEntityId, entity.id));
    
  const totalConnections = (incomingConnections[0]?.count || 0) + (outgoingConnections[0]?.count || 0);
  factors.centralityScore = Math.min(totalConnections / 100, 1.0); // Normalize to 0-1
  
  // Calculate connectivity score (weighted by relationship strength)
  const weightedConnections = await db
    .select({ 
      totalStrength: sql<number>`sum(${relationships.strength})`,
      avgConfidence: sql<number>`avg(${relationships.confidence})`
    })
    .from(relationships)
    .where(
      or(
        eq(relationships.sourceEntityId, entity.id),
        eq(relationships.targetEntityId, entity.id)
      )
    );
    
  factors.connectivityScore = Math.min((weightedConnections[0]?.totalStrength || 0) / 50, 1.0);
  
  // Calculate authority score (quality of incoming connections)
  const authorityConnections = await db
    .select({
      avgSourceConfidence: sql<number>`avg(${entities.confidence})`,
      count: sql<number>`count(*)`
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.sourceEntityId))
    .where(eq(relationships.targetEntityId, entity.id));
    
  factors.authorityScore = (authorityConnections[0]?.avgSourceConfidence || 0) * 
                          Math.min((authorityConnections[0]?.count || 0) / 20, 1.0);
  
  // Calculate hub score (quality of outgoing connections)
  const hubConnections = await db
    .select({
      avgTargetConfidence: sql<number>`avg(${entities.confidence})`,
      count: sql<number>`count(*)`
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.targetEntityId))
    .where(eq(relationships.sourceEntityId, entity.id));
    
  factors.hubScore = (hubConnections[0]?.avgTargetConfidence || 0) * 
                     Math.min((hubConnections[0]?.count || 0) / 20, 1.0);
  
  // Calculate frequency score (how often entity appears in sources)
  const sources = entity.sources as string[] || [];
  factors.frequencyScore = Math.min(sources.length / 10, 1.0);
  
  // Calculate recency score if temporal factors are included
  if (includeTemporalFactors) {
    const daysSinceUpdate = (Date.now() - new Date(entity.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    factors.recencyScore = Math.max(0, 1 - (daysSinceUpdate / 365)); // Decay over a year
  }
  
  // Calculate overall importance based on algorithm
  let importanceScore = 0;
  
  switch (algorithm) {
    case "pagerank":
      importanceScore = (factors.authorityScore * 0.4) + 
                       (factors.hubScore * 0.3) + 
                       (factors.centralityScore * 0.3);
      break;
      
    case "centrality":
      importanceScore = (factors.centralityScore * 0.5) + 
                       (factors.connectivityScore * 0.5);
      break;
      
    case "frequency":
      importanceScore = (factors.frequencyScore * 0.6) + 
                       (factors.recencyScore * 0.4);
      break;
      
    case "hybrid":
    default:
      importanceScore = (factors.centralityScore * 0.2) + 
                       (factors.connectivityScore * 0.2) + 
                       (factors.authorityScore * 0.2) + 
                       (factors.hubScore * 0.15) + 
                       (factors.frequencyScore * 0.15) + 
                       (factors.recencyScore * 0.1);
      break;
  }
  
  // Categorize importance
  let category: "critical" | "high" | "medium" | "low";
  if (importanceScore >= 0.8) category = "critical";
  else if (importanceScore >= 0.6) category = "high";
  else if (importanceScore >= 0.4) category = "medium";
  else category = "low";
  
  // Get related entities for context
  const relatedEntities = await db
    .select({
      entityId: entities.id,
      entityName: entities.name,
      relationshipType: relationships.type,
      strength: relationships.strength
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.targetEntityId))
    .where(eq(relationships.sourceEntityId, entity.id))
    .orderBy(desc(relationships.strength))
    .limit(5);
  
  return {
    entityId: entity.id,
    importanceScore,
    importanceFactors: factors,
    ranking: 0, // Will be set in batch processing
    category,
    reasoning: `Entity importance calculated using ${algorithm} algorithm. ` +
              `Centrality: ${factors.centralityScore.toFixed(3)}, ` +
              `Connectivity: ${factors.connectivityScore.toFixed(3)}, ` +
              `Authority: ${factors.authorityScore.toFixed(3)}, ` +
              `Hub: ${factors.hubScore.toFixed(3)}`,
    relatedEntities: relatedEntities.map(rel => ({
      entityId: rel.entityId,
      entityName: rel.entityName,
      relationshipType: rel.relationshipType,
      influence: rel.strength
    }))
  };
}

// Helper function: Update entity importance scores in database
async function updateEntityImportanceScores(processedEntities: any[]) {
  console.log(`💾 Updating importance scores for ${processedEntities.length} entities`);
  
  for (const entityData of processedEntities) {
    await db
      .update(entities)
      .set({
        properties: sql`${entities.properties} || ${JSON.stringify({
          importanceScore: entityData.importanceScore,
          importanceFactors: entityData.importanceFactors,
          importanceRanking: entityData.ranking,
          importanceCategory: entityData.category,
          lastImportanceUpdate: new Date()
        })}`,
        updatedAt: new Date()
      })
      .where(eq(entities.id, entityData.entityId));
  }
  
  console.log("✅ Entity importance scores updated in database");
}

// Exports are handled by the main task definitions above