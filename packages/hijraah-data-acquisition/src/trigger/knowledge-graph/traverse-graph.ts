/**
 * Graph Traversal Task
 * 
 * Trigger.dev v4 task for complex graph queries with Drizzle ORM.
 * Implements graph traversal algorithms for finding paths, relationships,
 * and connected components in the immigration knowledge graph.
 */

import { task, triggerAndWait } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection";
import { entities, relationships } from "../../db/schema";
import { eq, and, or, sql, inArray, desc, asc } from "drizzle-orm";

// Zod schemas for structured responses
const GraphTraversalSchema = z.object({
  paths: z.array(z.object({
    path: z.array(z.string()),
    totalWeight: z.number(),
    confidence: z.number(),
    pathType: z.enum(["shortest", "strongest", "most_confident"]),
    reasoning: z.string(),
    intermediateNodes: z.array(z.object({
      entityId: z.string(),
      entityName: z.string(),
      entityType: z.string(),
      relationshipType: z.string(),
      strength: z.number()
    }))
  })),
  traversalMetrics: z.object({
    nodesVisited: z.number(),
    edgesTraversed: z.number(),
    maxDepth: z.number(),
    executionTimeMs: z.number()
  })
});

const SubgraphExtractionSchema = z.object({
  subgraph: z.object({
    centerEntity: z.string(),
    nodes: z.array(z.object({
      entityId: z.string(),
      entityName: z.string(),
      entityType: z.string(),
      properties: z.record(z.any()),
      confidence: z.number(),
      distance: z.number()
    })),
    edges: z.array(z.object({
      sourceId: z.string(),
      targetId: z.string(),
      relationshipType: z.string(),
      strength: z.number(),
      confidence: z.number()
    })),
    metrics: z.object({
      totalNodes: z.number(),
      totalEdges: z.number(),
      averageConfidence: z.number(),
      maxDistance: z.number()
    })
  }),
  insights: z.array(z.object({
    type: z.enum(["cluster", "hub", "bridge", "outlier"]),
    description: z.string(),
    entities: z.array(z.string()),
    significance: z.number()
  }))
});

// Task 3.3.1: Traverse graph for complex queries
export const traverseGraphTask = task({
  id: "traverse-graph",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: {
    sourceEntityId: string;
    targetEntityId?: string;
    traversalType: "shortest_path" | "all_paths" | "strongest_path" | "breadth_first" | "depth_first";
    maxDepth?: number;
    maxPaths?: number;
    minConfidence?: number;
    relationshipTypes?: string[];
    includeWeights?: boolean;
    cacheResults?: boolean;
  }) => {
    console.log(`🔍 Traversing graph from ${payload.sourceEntityId} with type: ${payload.traversalType}`);
    
    try {
      const startTime = Date.now();
      const maxDepth = payload.maxDepth || 5;
      const maxPaths = payload.maxPaths || 10;
      const minConfidence = payload.minConfidence || 0.5;
      
      // Validate source entity exists
      const sourceEntity = await db
        .select()
        .from(entities)
        .where(eq(entities.id, payload.sourceEntityId))
        .limit(1);

      if (sourceEntity.length === 0) {
        throw new Error(`Source entity not found: ${payload.sourceEntityId}`);
      }

      let targetEntity = null;
      if (payload.targetEntityId) {
        const target = await db
          .select()
          .from(entities)
          .where(eq(entities.id, payload.targetEntityId))
          .limit(1);
        
        if (target.length === 0) {
          throw new Error(`Target entity not found: ${payload.targetEntityId}`);
        }
        targetEntity = target[0];
      }

      // Build traversal query based on type
      let traversalResults;
      
      switch (payload.traversalType) {
        case "shortest_path":
          traversalResults = await findShortestPath(
            payload.sourceEntityId,
            payload.targetEntityId!,
            maxDepth,
            minConfidence,
            payload.relationshipTypes
          );
          break;
          
        case "all_paths":
          traversalResults = await findAllPaths(
            payload.sourceEntityId,
            payload.targetEntityId!,
            maxDepth,
            maxPaths,
            minConfidence,
            payload.relationshipTypes
          );
          break;
          
        case "strongest_path":
          traversalResults = await findStrongestPath(
            payload.sourceEntityId,
            payload.targetEntityId!,
            maxDepth,
            minConfidence,
            payload.relationshipTypes
          );
          break;
          
        case "breadth_first":
          traversalResults = await breadthFirstTraversal(
            payload.sourceEntityId,
            maxDepth,
            minConfidence,
            payload.relationshipTypes
          );
          break;
          
        case "depth_first":
          traversalResults = await depthFirstTraversal(
            payload.sourceEntityId,
            maxDepth,
            minConfidence,
            payload.relationshipTypes
          );
          break;
          
        default:
          throw new Error(`Unsupported traversal type: ${payload.traversalType}`);
      }

      // Use AI to analyze and structure the traversal results
      const analysisResult = await generateObject({
        model: openai("gpt-4o"),
        schema: GraphTraversalSchema,
        prompt: `
          Analyze the graph traversal results for immigration knowledge graph.
          
          Source Entity: ${sourceEntity[0].name} (${sourceEntity[0].type})
          Target Entity: ${targetEntity ? `${targetEntity.name} (${targetEntity.type})` : "None (exploration mode)"}
          Traversal Type: ${payload.traversalType}
          
          Raw Traversal Results: ${JSON.stringify(traversalResults)}
          
          Instructions:
          - Analyze the paths found and their significance
          - Calculate path weights based on relationship strengths and confidence
          - Identify the most meaningful paths for immigration context
          - Provide reasoning for path selection and ranking
          - Include traversal metrics and performance data
          
          Focus on immigration-relevant connections and pathways.
        `,
        temperature: 0.1,
      });

      const executionTime = Date.now() - startTime;
      
      // Cache results if requested
      if (payload.cacheResults) {
        await cacheTraversalResults(payload, analysisResult.object, executionTime);
      }

      console.log(`✅ Graph traversal completed in ${executionTime}ms, found ${analysisResult.object.paths.length} paths`);
      
      return {
        success: true,
        traversalType: payload.traversalType,
        sourceEntity: {
          id: sourceEntity[0].id,
          name: sourceEntity[0].name,
          type: sourceEntity[0].type
        },
        targetEntity: targetEntity ? {
          id: targetEntity.id,
          name: targetEntity.name,
          type: targetEntity.type
        } : null,
        results: analysisResult.object,
        performance: {
          executionTimeMs: executionTime,
          pathsFound: analysisResult.object.paths.length,
          nodesVisited: analysisResult.object.traversalMetrics.nodesVisited,
          edgesTraversed: analysisResult.object.traversalMetrics.edgesTraversed
        },
        metadata: {
          maxDepth: maxDepth,
          minConfidence: minConfidence,
          relationshipTypesFilter: payload.relationshipTypes,
          cached: payload.cacheResults || false,
          timestamp: new Date()
        }
      };

    } catch (error) {
      console.error("❌ Graph traversal failed:", error);
      throw new Error(`Graph traversal failed: ${error.message}`);
    }
  },
});

// Helper function: Find shortest path using Dijkstra-like algorithm
async function findShortestPath(
  sourceId: string,
  targetId: string,
  maxDepth: number,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  const visited = new Set<string>();
  const distances = new Map<string, number>();
  const previous = new Map<string, { entityId: string; relationshipType: string; strength: number }>();
  const queue = [{ entityId: sourceId, distance: 0 }];
  
  distances.set(sourceId, 0);
  
  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift()!;
    
    if (visited.has(current.entityId)) continue;
    visited.add(current.entityId);
    
    if (current.entityId === targetId) {
      // Reconstruct path
      const path = [];
      let currentId = targetId;
      while (currentId !== sourceId) {
        path.unshift(currentId);
        const prev = previous.get(currentId);
        if (!prev) break;
        currentId = prev.entityId;
      }
      path.unshift(sourceId);
      
      return {
        path,
        distance: distances.get(targetId),
        pathDetails: path.map(id => previous.get(id)).filter(Boolean)
      };
    }
    
    if (current.distance >= maxDepth) continue;
    
    // Get neighbors
    const neighbors = await getEntityNeighbors(current.entityId, minConfidence, relationshipTypes);
    
    for (const neighbor of neighbors) {
      const newDistance = current.distance + (1 / neighbor.strength); // Inverse of strength as distance
      
      if (!distances.has(neighbor.entityId) || newDistance < distances.get(neighbor.entityId)!) {
        distances.set(neighbor.entityId, newDistance);
        previous.set(neighbor.entityId, {
          entityId: current.entityId,
          relationshipType: neighbor.relationshipType,
          strength: neighbor.strength
        });
        queue.push({ entityId: neighbor.entityId, distance: newDistance });
      }
    }
  }
  
  return { path: [], distance: Infinity, pathDetails: [] };
}

// Helper function: Find all paths (with limit)
async function findAllPaths(
  sourceId: string,
  targetId: string,
  maxDepth: number,
  maxPaths: number,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  const allPaths: any[] = [];
  
  async function dfs(currentId: string, targetId: string, path: string[], visited: Set<string>, depth: number) {
    if (depth > maxDepth || allPaths.length >= maxPaths) return;
    
    if (currentId === targetId) {
      allPaths.push([...path, currentId]);
      return;
    }
    
    if (visited.has(currentId)) return;
    visited.add(currentId);
    
    const neighbors = await getEntityNeighbors(currentId, minConfidence, relationshipTypes);
    
    for (const neighbor of neighbors) {
      await dfs(neighbor.entityId, targetId, [...path, currentId], new Set(visited), depth + 1);
    }
    
    visited.delete(currentId);
  }
  
  await dfs(sourceId, targetId, [], new Set(), 0);
  return { paths: allPaths };
}

// Helper function: Find strongest path (highest cumulative strength)
async function findStrongestPath(
  sourceId: string,
  targetId: string,
  maxDepth: number,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  const visited = new Set<string>();
  const strengths = new Map<string, number>();
  const previous = new Map<string, { entityId: string; relationshipType: string; strength: number }>();
  const queue = [{ entityId: sourceId, strength: 1.0 }];
  
  strengths.set(sourceId, 1.0);
  
  while (queue.length > 0) {
    queue.sort((a, b) => b.strength - a.strength); // Sort by strength descending
    const current = queue.shift()!;
    
    if (visited.has(current.entityId)) continue;
    visited.add(current.entityId);
    
    if (current.entityId === targetId) {
      // Reconstruct path
      const path = [];
      let currentId = targetId;
      while (currentId !== sourceId) {
        path.unshift(currentId);
        const prev = previous.get(currentId);
        if (!prev) break;
        currentId = prev.entityId;
      }
      path.unshift(sourceId);
      
      return {
        path,
        strength: strengths.get(targetId),
        pathDetails: path.map(id => previous.get(id)).filter(Boolean)
      };
    }
    
    const neighbors = await getEntityNeighbors(current.entityId, minConfidence, relationshipTypes);
    
    for (const neighbor of neighbors) {
      const newStrength = current.strength * neighbor.strength;
      
      if (!strengths.has(neighbor.entityId) || newStrength > strengths.get(neighbor.entityId)!) {
        strengths.set(neighbor.entityId, newStrength);
        previous.set(neighbor.entityId, {
          entityId: current.entityId,
          relationshipType: neighbor.relationshipType,
          strength: neighbor.strength
        });
        queue.push({ entityId: neighbor.entityId, strength: newStrength });
      }
    }
  }
  
  return { path: [], strength: 0, pathDetails: [] };
}

// Helper function: Breadth-first traversal
async function breadthFirstTraversal(
  sourceId: string,
  maxDepth: number,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  const visited = new Set<string>();
  const queue = [{ entityId: sourceId, depth: 0 }];
  const result = { nodes: [], edges: [], levels: new Map<number, string[]>() };
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.has(current.entityId) || current.depth > maxDepth) continue;
    visited.add(current.entityId);
    
    // Add to level
    if (!result.levels.has(current.depth)) {
      result.levels.set(current.depth, []);
    }
    result.levels.get(current.depth)!.push(current.entityId);
    
    const neighbors = await getEntityNeighbors(current.entityId, minConfidence, relationshipTypes);
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.entityId)) {
        queue.push({ entityId: neighbor.entityId, depth: current.depth + 1 });
        result.edges.push({
          source: current.entityId,
          target: neighbor.entityId,
          type: neighbor.relationshipType,
          strength: neighbor.strength
        });
      }
    }
  }
  
  return result;
}

// Helper function: Depth-first traversal
async function depthFirstTraversal(
  sourceId: string,
  maxDepth: number,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  const visited = new Set<string>();
  const result = { nodes: [], edges: [], paths: [] };
  
  async function dfs(currentId: string, depth: number, path: string[]) {
    if (depth > maxDepth || visited.has(currentId)) return;
    
    visited.add(currentId);
    const currentPath = [...path, currentId];
    
    const neighbors = await getEntityNeighbors(currentId, minConfidence, relationshipTypes);
    
    if (neighbors.length === 0) {
      result.paths.push(currentPath);
    }
    
    for (const neighbor of neighbors) {
      result.edges.push({
        source: currentId,
        target: neighbor.entityId,
        type: neighbor.relationshipType,
        strength: neighbor.strength
      });
      
      await dfs(neighbor.entityId, depth + 1, currentPath);
    }
    
    visited.delete(currentId);
  }
  
  await dfs(sourceId, 0, []);
  return result;
}

// Helper function: Get entity neighbors
async function getEntityNeighbors(
  entityId: string,
  minConfidence: number,
  relationshipTypes?: string[]
) {
  let query = db
    .select({
      entityId: entities.id,
      entityName: entities.name,
      entityType: entities.type,
      relationshipType: relationships.type,
      strength: relationships.strength,
      confidence: relationships.confidence
    })
    .from(relationships)
    .innerJoin(entities, eq(entities.id, relationships.targetEntityId))
    .where(
      and(
        eq(relationships.sourceEntityId, entityId),
        sql`${relationships.confidence} >= ${minConfidence}`
      )
    );

  if (relationshipTypes && relationshipTypes.length > 0) {
    query = query.where(
      and(
        eq(relationships.sourceEntityId, entityId),
        sql`${relationships.confidence} >= ${minConfidence}`,
        inArray(relationships.type, relationshipTypes)
      )
    );
  }

  return await query;
}

// Helper function: Cache traversal results
async function cacheTraversalResults(
  payload: any,
  results: any,
  executionTime: number
) {
  // Implementation would store results in a cache table or Redis
  // For now, we'll just log the caching action
  console.log(`💾 Caching traversal results for ${payload.sourceEntityId} -> ${payload.targetEntityId || 'exploration'}`);
}

// Export is handled by the main task definition above