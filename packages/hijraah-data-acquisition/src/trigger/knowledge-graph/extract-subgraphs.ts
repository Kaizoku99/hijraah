/**
 * Subgraph Extraction Task
 *
 * Trigger.dev v4 task for extracting subgraphs using parallel processing.
 * Implements community detection, ego networks, and thematic subgraph
 * extraction for immigration knowledge graph analysis.
 */

import { task, triggerAndWait } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection";
import { entities, relationships } from "../../db/schema";
import { eq, and, or, sql, inArray, desc, asc } from "drizzle-orm";

// Zod schemas for structured responses
const SubgraphExtractionSchema = z.object({
  subgraph: z.object({
    id: z.string(),
    type: z.enum(["ego", "community", "thematic", "temporal", "pathway"]),
    centerEntity: z.string().optional(),
    theme: z.string().optional(),
    nodes: z.array(
      z.object({
        entityId: z.string(),
        entityName: z.string(),
        entityType: z.string(),
        properties: z.record(z.any()),
        confidence: z.number(),
        distance: z.number(),
        importance: z.number(),
        role: z.enum(["center", "hub", "bridge", "leaf", "connector"]),
      })
    ),
    edges: z.array(
      z.object({
        sourceId: z.string(),
        targetId: z.string(),
        relationshipType: z.string(),
        strength: z.number(),
        confidence: z.number(),
        properties: z.record(z.any()).optional(),
      })
    ),
    metrics: z.object({
      totalNodes: z.number(),
      totalEdges: z.number(),
      density: z.number(),
      averageConfidence: z.number(),
      maxDistance: z.number(),
      clusteringCoefficient: z.number(),
    }),
  }),
  insights: z.array(
    z.object({
      type: z.enum(["cluster", "hub", "bridge", "outlier", "pattern", "gap"]),
      description: z.string(),
      entities: z.array(z.string()),
      significance: z.number(),
      actionable: z.boolean(),
    })
  ),
  recommendations: z.array(
    z.object({
      type: z.enum([
        "data_collection",
        "relationship_validation",
        "entity_merge",
        "gap_filling",
      ]),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      entities: z.array(z.string()),
    })
  ),
});

const ParallelSubgraphSchema = z.object({
  subgraphs: z.array(SubgraphExtractionSchema),
  aggregateMetrics: z.object({
    totalSubgraphs: z.number(),
    totalUniqueNodes: z.number(),
    totalUniqueEdges: z.number(),
    averageSubgraphSize: z.number(),
    overlapAnalysis: z.object({
      highOverlap: z.number(),
      mediumOverlap: z.number(),
      lowOverlap: z.number(),
      isolated: z.number(),
    }),
  }),
  globalInsights: z.array(
    z.object({
      type: z.enum(["structural", "thematic", "temporal", "quality"]),
      description: z.string(),
      affectedSubgraphs: z.array(z.string()),
      significance: z.number(),
    })
  ),
});

// Task 3.3.3: Extract subgraphs using parallel processing
export const extractSubgraphsTask = task({
  id: "extract-subgraphs",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 180000,
  },
  run: async (payload: {
    extractionType:
      | "ego"
      | "community"
      | "thematic"
      | "temporal"
      | "pathway"
      | "mixed";
    centerEntityIds?: string[];
    themes?: string[];
    maxDistance?: number;
    minSubgraphSize?: number;
    maxSubgraphSize?: number;
    parallelism?: number;
    includeMetrics?: boolean;
    includeInsights?: boolean;
  }) => {
    console.log(`🔍 Extracting subgraphs with type: ${payload.extractionType}`);

    try {
      const startTime = Date.now();
      const maxDistance = payload.maxDistance || 3;
      const minSubgraphSize = payload.minSubgraphSize || 3;
      const maxSubgraphSize = payload.maxSubgraphSize || 50;
      const parallelism = payload.parallelism || 5;

      let subgraphTasks = [];

      // Determine extraction strategy based on type
      switch (payload.extractionType) {
        case "ego":
          subgraphTasks = await createEgoNetworkTasks(
            payload.centerEntityIds || [],
            maxDistance,
            minSubgraphSize,
            maxSubgraphSize
          );
          break;

        case "community":
          subgraphTasks = await createCommunityDetectionTasks(
            minSubgraphSize,
            maxSubgraphSize
          );
          break;

        case "thematic":
          subgraphTasks = await createThematicSubgraphTasks(
            payload.themes || [],
            minSubgraphSize,
            maxSubgraphSize
          );
          break;

        case "temporal":
          subgraphTasks = await createTemporalSubgraphTasks(
            minSubgraphSize,
            maxSubgraphSize
          );
          break;

        case "pathway":
          subgraphTasks = await createPathwaySubgraphTasks(
            minSubgraphSize,
            maxSubgraphSize
          );
          break;

        case "mixed":
          // Combine multiple extraction types
          const egoTasks = await createEgoNetworkTasks(
            payload.centerEntityIds?.slice(0, 3) || [],
            maxDistance,
            minSubgraphSize,
            maxSubgraphSize
          );
          const communityTasks = await createCommunityDetectionTasks(
            minSubgraphSize,
            maxSubgraphSize
          );
          const thematicTasks = await createThematicSubgraphTasks(
            payload.themes?.slice(0, 2) || [],
            minSubgraphSize,
            maxSubgraphSize
          );
          subgraphTasks = [...egoTasks, ...communityTasks, ...thematicTasks];
          break;

        default:
          throw new Error(
            `Unsupported extraction type: ${payload.extractionType}`
          );
      }

      console.log(
        `🚀 Processing ${subgraphTasks.length} subgraph extraction tasks with parallelism: ${parallelism}`
      );

      // Process tasks in parallel batches
      const results = [];
      for (let i = 0; i < subgraphTasks.length; i += parallelism) {
        const batch = subgraphTasks.slice(i, i + parallelism);
        console.log(
          `📦 Processing batch ${Math.floor(i / parallelism) + 1}/${Math.ceil(subgraphTasks.length / parallelism)}`
        );

        const batchResults = await Promise.all(
          batch.map((task) => processSubgraphExtractionTask(task))
        );

        results.push(...batchResults.filter((result) => result !== null));
      }

      // Use AI to analyze and aggregate results
      const analysisResult = await generateObject({
        model: openai("gpt-4o"),
        schema: ParallelSubgraphSchema,
        prompt: `
          Analyze the subgraph extraction results for immigration knowledge graph.
          
          Extraction Type: ${payload.extractionType}
          Total Subgraphs Extracted: ${results.length}
          Parallelism Used: ${parallelism}
          
          Subgraph Data: ${JSON.stringify(results.slice(0, 5))} // Sample for analysis
          
          Instructions:
          - Analyze the structure and quality of extracted subgraphs
          - Identify patterns, clusters, and important nodes across subgraphs
          - Calculate overlap between subgraphs and identify unique components
          - Provide insights about the immigration knowledge graph structure
          - Suggest improvements for data collection and relationship validation
          - Focus on immigration-relevant patterns and pathways
          
          Return comprehensive analysis with metrics and global insights.
        `,
        temperature: 0.1,
      });

      const executionTime = Date.now() - startTime;

      console.log(`✅ Subgraph extraction completed in ${executionTime}ms`);
      console.log(`📊 Extracted ${results.length} subgraphs`);
      console.log(
        `🔗 Total unique nodes: ${analysisResult.object.aggregateMetrics.totalUniqueNodes}`
      );

      return {
        success: true,
        extractionType: payload.extractionType,
        results: analysisResult.object,
        performance: {
          executionTimeMs: executionTime,
          subgraphsExtracted: results.length,
          parallelTasksUsed: parallelism,
          averageSubgraphSize:
            analysisResult.object.aggregateMetrics.averageSubgraphSize,
        },
        metadata: {
          maxDistance: maxDistance,
          minSubgraphSize: minSubgraphSize,
          maxSubgraphSize: maxSubgraphSize,
          includeMetrics: payload.includeMetrics !== false,
          includeInsights: payload.includeInsights !== false,
          timestamp: new Date(),
        },
      };
    } catch (error) {
      console.error("❌ Subgraph extraction failed:", error);
      throw new Error(`Subgraph extraction failed: ${error.message}`);
    }
  },
});

// Helper function: Create ego network extraction tasks
async function createEgoNetworkTasks(
  centerEntityIds: string[],
  maxDistance: number,
  minSize: number,
  maxSize: number
) {
  const tasks = [];

  // If no center entities provided, find high-importance entities
  if (centerEntityIds.length === 0) {
    const importantEntities = await db
      .select()
      .from(entities)
      .where(sql`${entities.properties}->>'importanceScore' IS NOT NULL`)
      .orderBy(desc(sql`(${entities.properties}->>'importanceScore')::float`))
      .limit(10);

    centerEntityIds = importantEntities.map((e) => e.id);
  }

  for (const centerId of centerEntityIds) {
    tasks.push({
      type: "ego",
      centerId,
      maxDistance,
      minSize,
      maxSize,
    });
  }

  return tasks;
}

// Helper function: Create community detection tasks
async function createCommunityDetectionTasks(minSize: number, maxSize: number) {
  // Use entity types as community seeds
  const entityTypes = await db
    .select({ type: entities.type, count: sql<number>`count(*)` })
    .from(entities)
    .groupBy(entities.type)
    .having(sql`count(*) >= ${minSize}`)
    .orderBy(desc(sql`count(*)`));

  return entityTypes.map((typeInfo) => ({
    type: "community",
    entityType: typeInfo.type,
    minSize,
    maxSize,
  }));
}

// Helper function: Create thematic subgraph tasks
async function createThematicSubgraphTasks(
  themes: string[],
  minSize: number,
  maxSize: number
) {
  const defaultThemes = [
    "visa_requirements",
    "document_processing",
    "immigration_pathways",
    "policy_changes",
    "application_procedures",
  ];

  const themesToProcess = themes.length > 0 ? themes : defaultThemes;

  return themesToProcess.map((theme) => ({
    type: "thematic",
    theme,
    minSize,
    maxSize,
  }));
}

// Helper function: Create temporal subgraph tasks
async function createTemporalSubgraphTasks(minSize: number, maxSize: number) {
  // Create subgraphs based on temporal patterns
  const timeRanges = [
    { name: "recent", days: 30 },
    { name: "quarterly", days: 90 },
    { name: "yearly", days: 365 },
  ];

  return timeRanges.map((range) => ({
    type: "temporal",
    timeRange: range.name,
    days: range.days,
    minSize,
    maxSize,
  }));
}

// Helper function: Create pathway subgraph tasks
async function createPathwaySubgraphTasks(minSize: number, maxSize: number) {
  // Create subgraphs for common immigration pathways
  const pathways = [
    "work_visa_pathway",
    "family_reunification_pathway",
    "student_visa_pathway",
    "investment_visa_pathway",
    "refugee_pathway",
  ];

  return pathways.map((pathway) => ({
    type: "pathway",
    pathway,
    minSize,
    maxSize,
  }));
}

// Helper function: Process individual subgraph extraction task
async function processSubgraphExtractionTask(task: any) {
  try {
    switch (task.type) {
      case "ego":
        return await extractEgoNetwork(task);
      case "community":
        return await extractCommunitySubgraph(task);
      case "thematic":
        return await extractThematicSubgraph(task);
      case "temporal":
        return await extractTemporalSubgraph(task);
      case "pathway":
        return await extractPathwaySubgraph(task);
      default:
        console.warn(`⚠️ Unknown subgraph task type: ${task.type}`);
        return null;
    }
  } catch (error) {
    console.error(`❌ Subgraph extraction task failed:`, error);
    return null;
  }
}

// Helper function: Extract ego network
async function extractEgoNetwork(task: any) {
  const { centerId, maxDistance, minSize, maxSize } = task;

  // Get center entity
  const centerEntity = await db
    .select()
    .from(entities)
    .where(eq(entities.id, centerId))
    .limit(1);

  if (centerEntity.length === 0) {
    throw new Error(`Center entity not found: ${centerId}`);
  }

  const nodes = new Map();
  const edges = [];
  const visited = new Set();
  const queue = [{ entityId: centerId, distance: 0 }];

  // Add center entity
  nodes.set(centerId, {
    entityId: centerId,
    entityName: centerEntity[0].name,
    entityType: centerEntity[0].type,
    properties: centerEntity[0].properties,
    confidence: centerEntity[0].confidence,
    distance: 0,
    importance: 1.0,
    role: "center",
  });

  // BFS to build ego network
  while (queue.length > 0 && nodes.size < maxSize) {
    const current = queue.shift()!;

    if (visited.has(current.entityId) || current.distance >= maxDistance) {
      continue;
    }

    visited.add(current.entityId);

    // Get neighbors
    const neighbors = await db
      .select({
        entityId: entities.id,
        entityName: entities.name,
        entityType: entities.type,
        properties: entities.properties,
        confidence: entities.confidence,
        relationshipType: relationships.type,
        strength: relationships.strength,
        relConfidence: relationships.confidence,
      })
      .from(relationships)
      .innerJoin(entities, eq(entities.id, relationships.targetEntityId))
      .where(eq(relationships.sourceEntityId, current.entityId))
      .limit(20);

    for (const neighbor of neighbors) {
      if (!nodes.has(neighbor.entityId) && nodes.size < maxSize) {
        // Determine node role
        let role: "hub" | "bridge" | "leaf" | "connector" = "leaf";
        const neighborConnections = await getEntityConnectionCount(
          neighbor.entityId
        );

        if (neighborConnections > 10) role = "hub";
        else if (neighborConnections > 5) role = "connector";
        else if (current.distance === maxDistance - 1) role = "bridge";

        nodes.set(neighbor.entityId, {
          entityId: neighbor.entityId,
          entityName: neighbor.entityName,
          entityType: neighbor.entityType,
          properties: neighbor.properties,
          confidence: neighbor.confidence,
          distance: current.distance + 1,
          importance: neighbor.strength,
          role,
        });

        queue.push({
          entityId: neighbor.entityId,
          distance: current.distance + 1,
        });
      }

      // Add edge
      edges.push({
        sourceId: current.entityId,
        targetId: neighbor.entityId,
        relationshipType: neighbor.relationshipType,
        strength: neighbor.strength,
        confidence: neighbor.relConfidence,
      });
    }
  }

  if (nodes.size < minSize) {
    return null; // Subgraph too small
  }

  // Calculate metrics
  const metrics = calculateSubgraphMetrics(Array.from(nodes.values()), edges);

  return {
    subgraph: {
      id: `ego_${centerId}`,
      type: "ego" as const,
      centerEntity: centerId,
      nodes: Array.from(nodes.values()),
      edges,
      metrics,
    },
    insights: [],
    recommendations: [],
  };
}

// Helper function: Extract community subgraph
async function extractCommunitySubgraph(task: any) {
  const { entityType, minSize, maxSize } = task;

  // Get entities of the specified type
  const typeEntities = await db
    .select()
    .from(entities)
    .where(eq(entities.type, entityType))
    .limit(maxSize);

  if (typeEntities.length < minSize) {
    return null;
  }

  const entityIds = typeEntities.map((e) => e.id);

  // Get relationships within this community
  const communityEdges = await db
    .select({
      sourceId: relationships.sourceEntityId,
      targetId: relationships.targetEntityId,
      relationshipType: relationships.type,
      strength: relationships.strength,
      confidence: relationships.confidence,
    })
    .from(relationships)
    .where(
      and(
        inArray(relationships.sourceEntityId, entityIds),
        inArray(relationships.targetEntityId, entityIds)
      )
    );

  const nodes = typeEntities.map((entity, index) => ({
    entityId: entity.id,
    entityName: entity.name,
    entityType: entity.type,
    properties: entity.properties,
    confidence: entity.confidence,
    distance: 0,
    importance: entity.confidence,
    role: index === 0 ? ("center" as const) : ("leaf" as const),
  }));

  const metrics = calculateSubgraphMetrics(nodes, communityEdges);

  return {
    subgraph: {
      id: `community_${entityType}`,
      type: "community" as const,
      theme: entityType,
      nodes,
      edges: communityEdges,
      metrics,
    },
    insights: [],
    recommendations: [],
  };
}

// Helper function: Extract thematic subgraph
async function extractThematicSubgraph(task: any) {
  const { theme, minSize, maxSize } = task;

  // Search for entities related to the theme
  const themeEntities = await db
    .select()
    .from(entities)
    .where(
      or(
        sql`${entities.name} ILIKE ${`%${theme}%`}`,
        sql`${entities.properties}::text ILIKE ${`%${theme}%`}`
      )
    )
    .limit(maxSize);

  if (themeEntities.length < minSize) {
    return null;
  }

  const entityIds = themeEntities.map((e) => e.id);

  // Get relationships within this thematic group
  const thematicEdges = await db
    .select({
      sourceId: relationships.sourceEntityId,
      targetId: relationships.targetEntityId,
      relationshipType: relationships.type,
      strength: relationships.strength,
      confidence: relationships.confidence,
    })
    .from(relationships)
    .where(
      and(
        inArray(relationships.sourceEntityId, entityIds),
        inArray(relationships.targetEntityId, entityIds)
      )
    );

  const nodes = themeEntities.map((entity) => ({
    entityId: entity.id,
    entityName: entity.name,
    entityType: entity.type,
    properties: entity.properties,
    confidence: entity.confidence,
    distance: 0,
    importance: entity.confidence,
    role: "leaf" as const,
  }));

  const metrics = calculateSubgraphMetrics(nodes, thematicEdges);

  return {
    subgraph: {
      id: `thematic_${theme}`,
      type: "thematic" as const,
      theme,
      nodes,
      edges: thematicEdges,
      metrics,
    },
    insights: [],
    recommendations: [],
  };
}

// Helper function: Extract temporal subgraph
async function extractTemporalSubgraph(task: any) {
  const { timeRange, days, minSize, maxSize } = task;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Get recently updated entities
  const recentEntities = await db
    .select()
    .from(entities)
    .where(sql`${entities.updatedAt} >= ${cutoffDate}`)
    .limit(maxSize);

  if (recentEntities.length < minSize) {
    return null;
  }

  const entityIds = recentEntities.map((e) => e.id);

  // Get relationships between recent entities
  const temporalEdges = await db
    .select({
      sourceId: relationships.sourceEntityId,
      targetId: relationships.targetEntityId,
      relationshipType: relationships.type,
      strength: relationships.strength,
      confidence: relationships.confidence,
    })
    .from(relationships)
    .where(
      and(
        inArray(relationships.sourceEntityId, entityIds),
        inArray(relationships.targetEntityId, entityIds)
      )
    );

  const nodes = recentEntities.map((entity) => ({
    entityId: entity.id,
    entityName: entity.name,
    entityType: entity.type,
    properties: entity.properties,
    confidence: entity.confidence,
    distance: 0,
    importance: entity.confidence,
    role: "leaf" as const,
  }));

  const metrics = calculateSubgraphMetrics(nodes, temporalEdges);

  return {
    subgraph: {
      id: `temporal_${timeRange}`,
      type: "temporal" as const,
      theme: `${timeRange}_updates`,
      nodes,
      edges: temporalEdges,
      metrics,
    },
    insights: [],
    recommendations: [],
  };
}

// Helper function: Extract pathway subgraph
async function extractPathwaySubgraph(task: any) {
  const { pathway, minSize, maxSize } = task;

  // Search for entities related to the pathway
  const pathwayEntities = await db
    .select()
    .from(entities)
    .where(
      or(
        sql`${entities.properties}::text ILIKE ${`%${pathway}%`}`,
        sql`${entities.name} ILIKE ${`%${pathway.replace("_", " ")}%`}`
      )
    )
    .limit(maxSize);

  if (pathwayEntities.length < minSize) {
    return null;
  }

  const entityIds = pathwayEntities.map((e) => e.id);

  // Get relationships within this pathway
  const pathwayEdges = await db
    .select({
      sourceId: relationships.sourceEntityId,
      targetId: relationships.targetEntityId,
      relationshipType: relationships.type,
      strength: relationships.strength,
      confidence: relationships.confidence,
    })
    .from(relationships)
    .where(
      and(
        inArray(relationships.sourceEntityId, entityIds),
        inArray(relationships.targetEntityId, entityIds)
      )
    );

  const nodes = pathwayEntities.map((entity) => ({
    entityId: entity.id,
    entityName: entity.name,
    entityType: entity.type,
    properties: entity.properties,
    confidence: entity.confidence,
    distance: 0,
    importance: entity.confidence,
    role: "leaf" as const,
  }));

  const metrics = calculateSubgraphMetrics(nodes, pathwayEdges);

  return {
    subgraph: {
      id: `pathway_${pathway}`,
      type: "pathway" as const,
      theme: pathway,
      nodes,
      edges: pathwayEdges,
      metrics,
    },
    insights: [],
    recommendations: [],
  };
}

// Helper function: Get entity connection count
async function getEntityConnectionCount(entityId: string): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(relationships)
    .where(
      or(
        eq(relationships.sourceEntityId, entityId),
        eq(relationships.targetEntityId, entityId)
      )
    );

  return result[0]?.count || 0;
}

// Helper function: Calculate subgraph metrics
function calculateSubgraphMetrics(nodes: any[], edges: any[]) {
  const totalNodes = nodes.length;
  const totalEdges = edges.length;

  // Calculate density
  const maxPossibleEdges = (totalNodes * (totalNodes - 1)) / 2;
  const density = maxPossibleEdges > 0 ? totalEdges / maxPossibleEdges : 0;

  // Calculate average confidence
  const averageConfidence =
    nodes.length > 0
      ? nodes.reduce((sum, node) => sum + node.confidence, 0) / nodes.length
      : 0;

  // Calculate max distance
  const maxDistance =
    nodes.length > 0 ? Math.max(...nodes.map((node) => node.distance)) : 0;

  // Calculate clustering coefficient (simplified)
  const clusteringCoefficient = density; // Simplified approximation

  return {
    totalNodes,
    totalEdges,
    density,
    averageConfidence,
    maxDistance,
    clusteringCoefficient,
  };
}

// Export is handled by the main task definition above
