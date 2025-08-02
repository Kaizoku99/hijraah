/**
 * Graph Maintenance Tasks
 * 
 * Trigger.dev v4 scheduled tasks for periodic graph optimization,
 * cleanup, and maintenance operations for the immigration knowledge graph.
 */

import { task, schedules, triggerAndWait } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection";
import { entities, relationships } from "../../db/schema";
import { eq, and, or, sql, inArray, desc, asc, lt, isNull } from "drizzle-orm";

// Zod schemas for structured responses
const MaintenanceReportSchema = z.object({
  maintenanceType: z.enum(["cleanup", "optimization", "validation", "consolidation"]),
  operationsPerformed: z.array(z.object({
    operation: z.string(),
    itemsProcessed: z.number(),
    itemsModified: z.number(),
    itemsRemoved: z.number(),
    executionTimeMs: z.number(),
    success: z.boolean(),
    details: z.string()
  })),
  summary: z.object({
    totalItemsProcessed: z.number(),
    totalItemsModified: z.number(),
    totalItemsRemoved: z.number(),
    totalExecutionTimeMs: z.number(),
    overallSuccess: z.boolean(),
    improvementMetrics: z.object({
      graphDensityImprovement: z.number(),
      confidenceScoreImprovement: z.number(),
      duplicatesRemoved: z.number(),
      orphanedNodesRemoved: z.number()
    })
  }),
  recommendations: z.array(z.object({
    type: z.enum(["data_quality", "performance", "structure", "content"]),
    priority: z.enum(["high", "medium", "low"]),
    description: z.string(),
    estimatedImpact: z.string()
  }))
});

// Task 3.3.5: Scheduled graph maintenance and optimization
export const graphMaintenanceTask = schedules.task({
  id: "graph-maintenance",
  cron: "0 3 * * 0", // Weekly on Sunday at 3 AM
  run: async () => {
    console.log("🔧 Starting scheduled graph maintenance");
    
    try {
      const startTime = Date.now();
      const operations = [];
      
      // 1. Clean up orphaned entities
      console.log("🧹 Cleaning up orphaned entities...");
      const orphanCleanup = await cleanupOrphanedEntities();
      operations.push(orphanCleanup);
      
      // 2. Remove duplicate relationships
      console.log("🔗 Removing duplicate relationships...");
      const duplicateCleanup = await removeDuplicateRelationships();
      operations.push(duplicateCleanup);
      
      // 3. Update entity importance scores
      console.log("📊 Updating entity importance scores...");
      const importanceUpdate = await updateEntityImportanceScores();
      operations.push(importanceUpdate);
      
      // 4. Validate relationship consistency
      console.log("✅ Validating relationship consistency...");
      const consistencyValidation = await validateRelationshipConsistency();
      operations.push(consistencyValidation);
      
      // 5. Optimize graph structure
      console.log("⚡ Optimizing graph structure...");
      const structureOptimization = await optimizeGraphStructure();
      operations.push(structureOptimization);
      
      // 6. Clean up stale data
      console.log("🗑️ Cleaning up stale data...");
      const staleDataCleanup = await cleanupStaleData();
      operations.push(staleDataCleanup);
      
      // Generate maintenance report using AI
      const reportResult = await generateObject({
        model: openai("gpt-4o"),
        schema: MaintenanceReportSchema,
        prompt: `
          Generate a comprehensive maintenance report for the immigration knowledge graph.
          
          Operations Performed: ${JSON.stringify(operations)}
          Total Execution Time: ${Date.now() - startTime}ms
          
          Instructions:
          - Analyze the effectiveness of each maintenance operation
          - Calculate improvement metrics and overall impact
          - Provide recommendations for future maintenance
          - Focus on graph quality, performance, and data integrity
          - Suggest optimizations for immigration-specific use cases
          
          Return a detailed maintenance report with insights and recommendations.
        `,
        temperature: 0.1,
      });

      const totalExecutionTime = Date.now() - startTime;
      
      console.log(`✅ Graph maintenance completed in ${totalExecutionTime}ms`);
      console.log(`📈 Total items processed: ${reportResult.object.summary.totalItemsProcessed}`);
      console.log(`🔧 Total items modified: ${reportResult.object.summary.totalItemsModified}`);
      
      return {
        success: true,
        maintenanceType: "scheduled_full_maintenance",
        report: reportResult.object,
        performance: {
          totalExecutionTimeMs: totalExecutionTime,
          operationsCompleted: operations.length,
          overallSuccess: reportResult.object.summary.overallSuccess
        },
        metadata: {
          scheduledRun: true,
          timestamp: new Date()
        }
      };

    } catch (error) {
      console.error("❌ Graph maintenance failed:", error);
      throw new Error(`Graph maintenance failed: ${error.message}`);
    }
  },
});

// Task: On-demand graph optimization
export const optimizeGraphTask = task({
  id: "optimize-graph",
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 300000,
  },
  run: async (payload: {
    optimizationType: "full" | "incremental" | "targeted";
    targetEntityTypes?: string[];
    includeRelationshipOptimization?: boolean;
    includeImportanceRecalculation?: boolean;
    includeStructuralOptimization?: boolean;
  }) => {
    console.log(`⚡ Starting graph optimization: ${payload.optimizationType}`);
    
    try {
      const startTime = Date.now();
      const operations = [];
      
      if (payload.optimizationType === "full" || payload.optimizationType === "incremental") {
        // Comprehensive optimization
        operations.push(await optimizeEntityStorage());
        operations.push(await optimizeRelationshipStorage());
        operations.push(await rebuildIndexes());
      }
      
      if (payload.includeRelationshipOptimization !== false) {
        operations.push(await optimizeRelationshipWeights());
      }
      
      if (payload.includeImportanceRecalculation !== false) {
        operations.push(await recalculateEntityImportance(payload.targetEntityTypes));
      }
      
      if (payload.includeStructuralOptimization !== false) {
        operations.push(await optimizeGraphTopology());
      }
      
      const totalExecutionTime = Date.now() - startTime;
      
      console.log(`✅ Graph optimization completed in ${totalExecutionTime}ms`);
      
      return {
        success: true,
        optimizationType: payload.optimizationType,
        operationsCompleted: operations.length,
        totalExecutionTimeMs: totalExecutionTime,
        operations: operations,
        metadata: {
          targetEntityTypes: payload.targetEntityTypes,
          timestamp: new Date()
        }
      };

    } catch (error) {
      console.error("❌ Graph optimization failed:", error);
      throw new Error(`Graph optimization failed: ${error.message}`);
    }
  },
});

// Helper function: Clean up orphaned entities
async function cleanupOrphanedEntities() {
  const startTime = Date.now();
  
  // Find entities with no relationships
  const orphanedEntities = await db
    .select({ id: entities.id, name: entities.name })
    .from(entities)
    .leftJoin(relationships, or(
      eq(relationships.sourceEntityId, entities.id),
      eq(relationships.targetEntityId, entities.id)
    ))
    .where(isNull(relationships.id))
    .having(sql`count(${relationships.id}) = 0`);
  
  let removedCount = 0;
  
  // Remove orphaned entities with low confidence
  for (const entity of orphanedEntities) {
    const entityData = await db
      .select()
      .from(entities)
      .where(eq(entities.id, entity.id))
      .limit(1);
    
    if (entityData.length > 0 && entityData[0].confidence < 0.3) {
      await db.delete(entities).where(eq(entities.id, entity.id));
      removedCount++;
    }
  }
  
  return {
    operation: "cleanup_orphaned_entities",
    itemsProcessed: orphanedEntities.length,
    itemsModified: 0,
    itemsRemoved: removedCount,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Removed ${removedCount} orphaned entities with low confidence`
  };
}

// Helper function: Remove duplicate relationships
async function removeDuplicateRelationships() {
  const startTime = Date.now();
  
  // Find duplicate relationships
  const duplicates = await db
    .select({
      sourceEntityId: relationships.sourceEntityId,
      targetEntityId: relationships.targetEntityId,
      type: relationships.type,
      count: sql<number>`count(*)`
    })
    .from(relationships)
    .groupBy(
      relationships.sourceEntityId,
      relationships.targetEntityId,
      relationships.type
    )
    .having(sql`count(*) > 1`);
  
  let removedCount = 0;
  
  // Keep the relationship with highest confidence, remove others
  for (const duplicate of duplicates) {
    const duplicateRelationships = await db
      .select()
      .from(relationships)
      .where(
        and(
          eq(relationships.sourceEntityId, duplicate.sourceEntityId),
          eq(relationships.targetEntityId, duplicate.targetEntityId),
          eq(relationships.type, duplicate.type)
        )
      )
      .orderBy(desc(relationships.confidence));
    
    // Remove all but the first (highest confidence)
    const toRemove = duplicateRelationships.slice(1);
    for (const rel of toRemove) {
      await db.delete(relationships).where(eq(relationships.id, rel.id));
      removedCount++;
    }
  }
  
  return {
    operation: "remove_duplicate_relationships",
    itemsProcessed: duplicates.length,
    itemsModified: 0,
    itemsRemoved: removedCount,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Removed ${removedCount} duplicate relationships`
  };
}

// Helper function: Update entity importance scores
async function updateEntityImportanceScores() {
  const startTime = Date.now();
  
  // Get all entities
  const allEntities = await db.select().from(entities);
  let updatedCount = 0;
  
  // Update importance scores for entities that don't have them or are outdated
  for (const entity of allEntities) {
    const properties = entity.properties as any;
    const lastUpdate = properties?.lastImportanceUpdate;
    const daysSinceUpdate = lastUpdate 
      ? (Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;
    
    if (!properties?.importanceScore || daysSinceUpdate > 7) {
      // Calculate new importance score
      const connectionCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(relationships)
        .where(
          or(
            eq(relationships.sourceEntityId, entity.id),
            eq(relationships.targetEntityId, entity.id)
          )
        );
      
      const importanceScore = Math.min(connectionCount[0]?.count / 20, 1.0);
      
      await db
        .update(entities)
        .set({
          properties: {
            ...properties,
            importanceScore,
            lastImportanceUpdate: new Date()
          },
          updatedAt: new Date()
        })
        .where(eq(entities.id, entity.id));
      
      updatedCount++;
    }
  }
  
  return {
    operation: "update_entity_importance",
    itemsProcessed: allEntities.length,
    itemsModified: updatedCount,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Updated importance scores for ${updatedCount} entities`
  };
}

// Helper function: Validate relationship consistency
async function validateRelationshipConsistency() {
  const startTime = Date.now();
  
  // Find relationships with missing entities
  const invalidRelationships = await db
    .select({ id: relationships.id })
    .from(relationships)
    .leftJoin(entities, eq(entities.id, relationships.sourceEntityId))
    .where(isNull(entities.id));
  
  let removedCount = 0;
  
  // Remove relationships with missing source entities
  for (const rel of invalidRelationships) {
    await db.delete(relationships).where(eq(relationships.id, rel.id));
    removedCount++;
  }
  
  // Find relationships with missing target entities
  const invalidTargetRelationships = await db
    .select({ id: relationships.id })
    .from(relationships)
    .leftJoin(entities, eq(entities.id, relationships.targetEntityId))
    .where(isNull(entities.id));
  
  // Remove relationships with missing target entities
  for (const rel of invalidTargetRelationships) {
    await db.delete(relationships).where(eq(relationships.id, rel.id));
    removedCount++;
  }
  
  return {
    operation: "validate_relationship_consistency",
    itemsProcessed: invalidRelationships.length + invalidTargetRelationships.length,
    itemsModified: 0,
    itemsRemoved: removedCount,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Removed ${removedCount} relationships with missing entities`
  };
}

// Helper function: Optimize graph structure
async function optimizeGraphStructure() {
  const startTime = Date.now();
  
  // Identify and merge very similar entities
  const similarEntities = await db
    .select({
      id1: sql`e1.id`,
      id2: sql`e2.id`,
      name1: sql`e1.name`,
      name2: sql`e2.name`,
      similarity: sql`similarity(e1.name, e2.name)`
    })
    .from(sql`${entities} e1`)
    .crossJoin(sql`${entities} e2`)
    .where(
      and(
        sql`e1.id != e2.id`,
        sql`e1.type = e2.type`,
        sql`similarity(e1.name, e2.name) > 0.9`
      )
    )
    .limit(50);
  
  let mergedCount = 0;
  
  // Merge highly similar entities
  for (const similar of similarEntities) {
    // Merge entities by updating relationships to point to the first entity
    await db
      .update(relationships)
      .set({ sourceEntityId: similar.id1 as string })
      .where(eq(relationships.sourceEntityId, similar.id2 as string));
    
    await db
      .update(relationships)
      .set({ targetEntityId: similar.id1 as string })
      .where(eq(relationships.targetEntityId, similar.id2 as string));
    
    // Remove the duplicate entity
    await db.delete(entities).where(eq(entities.id, similar.id2 as string));
    mergedCount++;
  }
  
  return {
    operation: "optimize_graph_structure",
    itemsProcessed: similarEntities.length,
    itemsModified: mergedCount * 2, // Relationships updated
    itemsRemoved: mergedCount,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Merged ${mergedCount} similar entities and updated relationships`
  };
}

// Helper function: Clean up stale data
async function cleanupStaleData() {
  const startTime = Date.now();
  
  // Remove entities that haven't been updated in over a year and have low confidence
  const staleDate = new Date();
  staleDate.setFullYear(staleDate.getFullYear() - 1);
  
  const staleEntities = await db
    .select()
    .from(entities)
    .where(
      and(
        lt(entities.updatedAt, staleDate),
        sql`${entities.confidence} < 0.3`
      )
    );
  
  let removedCount = 0;
  
  for (const entity of staleEntities) {
    // Remove relationships first
    await db.delete(relationships).where(
      or(
        eq(relationships.sourceEntityId, entity.id),
        eq(relationships.targetEntityId, entity.id)
      )
    );
    
    // Remove entity
    await db.delete(entities).where(eq(entities.id, entity.id));
    removedCount++;
  }
  
  return {
    operation: "cleanup_stale_data",
    itemsProcessed: staleEntities.length,
    itemsModified: 0,
    itemsRemoved: removedCount,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Removed ${removedCount} stale entities and their relationships`
  };
}

// Helper function: Optimize entity storage
async function optimizeEntityStorage() {
  const startTime = Date.now();
  
  // Vacuum and analyze tables (PostgreSQL specific)
  await db.execute(sql`VACUUM ANALYZE ${entities}`);
  await db.execute(sql`VACUUM ANALYZE ${relationships}`);
  
  return {
    operation: "optimize_entity_storage",
    itemsProcessed: 0,
    itemsModified: 0,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: "Vacuumed and analyzed entity and relationship tables"
  };
}

// Helper function: Optimize relationship storage
async function optimizeRelationshipStorage() {
  const startTime = Date.now();
  
  // Update relationship statistics
  await db.execute(sql`ANALYZE ${relationships}`);
  
  return {
    operation: "optimize_relationship_storage",
    itemsProcessed: 0,
    itemsModified: 0,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: "Analyzed relationship table statistics"
  };
}

// Helper function: Rebuild indexes
async function rebuildIndexes() {
  const startTime = Date.now();
  
  // Reindex tables for optimal performance
  await db.execute(sql`REINDEX TABLE ${entities}`);
  await db.execute(sql`REINDEX TABLE ${relationships}`);
  
  return {
    operation: "rebuild_indexes",
    itemsProcessed: 0,
    itemsModified: 0,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: "Rebuilt indexes for entities and relationships tables"
  };
}

// Helper function: Optimize relationship weights
async function optimizeRelationshipWeights() {
  const startTime = Date.now();
  
  // Normalize relationship strengths based on entity importance
  const relationshipsToUpdate = await db
    .select({
      id: relationships.id,
      strength: relationships.strength,
      sourceImportance: sql`(${entities}.properties->>'importanceScore')::float`,
      targetImportance: sql`(target_entities.properties->>'importanceScore')::float`
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.sourceEntityId))
    .innerJoin(sql`${entities} target_entities`, sql`target_entities.id = ${relationships.targetEntityId}`)
    .where(sql`${entities}.properties->>'importanceScore' IS NOT NULL`)
    .limit(1000);
  
  let updatedCount = 0;
  
  for (const rel of relationshipsToUpdate) {
    const sourceImportance = rel.sourceImportance || 0.5;
    const targetImportance = rel.targetImportance || 0.5;
    const importanceBonus = (sourceImportance + targetImportance) / 2 * 0.1;
    const newStrength = Math.min(rel.strength + importanceBonus, 1.0);
    
    if (Math.abs(newStrength - rel.strength) > 0.01) {
      await db
        .update(relationships)
        .set({ strength: newStrength })
        .where(eq(relationships.id, rel.id));
      updatedCount++;
    }
  }
  
  return {
    operation: "optimize_relationship_weights",
    itemsProcessed: relationshipsToUpdate.length,
    itemsModified: updatedCount,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Updated weights for ${updatedCount} relationships based on entity importance`
  };
}

// Helper function: Recalculate entity importance
async function recalculateEntityImportance(targetEntityTypes?: string[]) {
  const startTime = Date.now();
  
  let query = db.select().from(entities);
  
  if (targetEntityTypes && targetEntityTypes.length > 0) {
    query = query.where(inArray(entities.type, targetEntityTypes));
  }
  
  const entitiesToUpdate = await query.limit(500);
  let updatedCount = 0;
  
  for (const entity of entitiesToUpdate) {
    // Calculate new importance based on connections and confidence
    const connectionStats = await db
      .select({
        incomingCount: sql<number>`count(CASE WHEN ${relationships.targetEntityId} = ${entity.id} THEN 1 END)`,
        outgoingCount: sql<number>`count(CASE WHEN ${relationships.sourceEntityId} = ${entity.id} THEN 1 END)`,
        avgStrength: sql<number>`avg(${relationships.strength})`
      })
      .from(relationships)
      .where(
        or(
          eq(relationships.sourceEntityId, entity.id),
          eq(relationships.targetEntityId, entity.id)
        )
      );
    
    const stats = connectionStats[0];
    const totalConnections = (stats.incomingCount || 0) + (stats.outgoingCount || 0);
    const avgStrength = stats.avgStrength || 0;
    
    const newImportance = Math.min(
      (totalConnections / 50) * 0.6 + 
      avgStrength * 0.3 + 
      entity.confidence * 0.1,
      1.0
    );
    
    await db
      .update(entities)
      .set({
        properties: {
          ...(entity.properties as any),
          importanceScore: newImportance,
          lastImportanceUpdate: new Date()
        },
        updatedAt: new Date()
      })
      .where(eq(entities.id, entity.id));
    
    updatedCount++;
  }
  
  return {
    operation: "recalculate_entity_importance",
    itemsProcessed: entitiesToUpdate.length,
    itemsModified: updatedCount,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Recalculated importance scores for ${updatedCount} entities`
  };
}

// Helper function: Optimize graph topology
async function optimizeGraphTopology() {
  const startTime = Date.now();
  
  // Identify and strengthen important pathways
  const importantPaths = await db
    .select({
      sourceId: relationships.sourceEntityId,
      targetId: relationships.targetEntityId,
      pathStrength: sql<number>`${relationships.strength} * ${entities}.confidence * target_entities.confidence`
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.sourceEntityId))
    .innerJoin(sql`${entities} target_entities`, sql`target_entities.id = ${relationships.targetEntityId}`)
    .where(sql`${relationships.strength} * ${entities}.confidence * target_entities.confidence > 0.7`)
    .orderBy(desc(sql`${relationships.strength} * ${entities}.confidence * target_entities.confidence`))
    .limit(100);
  
  let optimizedCount = 0;
  
  // Strengthen high-value pathways
  for (const path of importantPaths) {
    await db
      .update(relationships)
      .set({
        strength: sql`LEAST(${relationships.strength} * 1.1, 1.0)`,
        properties: sql`${relationships.properties} || '{"optimized": true, "optimizedAt": "' || NOW() || '"}'`
      })
      .where(
        and(
          eq(relationships.sourceEntityId, path.sourceId),
          eq(relationships.targetEntityId, path.targetId)
        )
      );
    
    optimizedCount++;
  }
  
  return {
    operation: "optimize_graph_topology",
    itemsProcessed: importantPaths.length,
    itemsModified: optimizedCount,
    itemsRemoved: 0,
    executionTimeMs: Date.now() - startTime,
    success: true,
    details: `Optimized ${optimizedCount} high-value relationship pathways`
  };
}

// Exports are handled by the main task definitions above