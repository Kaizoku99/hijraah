/**
 * Prediction Optimization Tasks
 * 
 * Implements prediction caching and optimization using Trigger.dev's built-in caching
 * mechanisms and Redis integration as specified in Task 5.2.
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, desc, sql, gte, lte, count, avg } from "drizzle-orm";
import { Redis } from "@upstash/redis";
import { 
  PredictionInputSchema,
  PredictionResultSchema,
  ML_CONSTANTS,
  type PredictionInput,
  type PredictionResult,
  type PredictionType,
} from "./types.js";
import { 
  predictions,
  mlModels,
  predictionCache,
  type Prediction,
  type MLModel,
} from "../../schemas/ml-models.js";

// Redis client for caching
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ===== PREDICTION CACHING TASKS =====

export const optimizePredictionCacheTask = task({
  id: "optimize-prediction-cache",
  description: "Optimize prediction caching using Trigger.dev built-in caching and Redis integration",
  run: async (payload: { 
    cacheStrategy?: "aggressive" | "conservative" | "adaptive";
    maxCacheSize?: number;
    ttlHours?: number;
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      await logger.info("Starting prediction cache optimization", {
        strategy: payload.cacheStrategy || "adaptive",
        maxCacheSize: payload.maxCacheSize || 10000,
        ttlHours: payload.ttlHours || 24,
      });

      const db = initializeDatabase();
      
      // Analyze current cache performance
      const cacheStats = await analyzeCachePerformance(db);
      
      // Optimize cache based on strategy
      const optimizationResult = await optimizeCacheStrategy(
        payload.cacheStrategy || "adaptive",
        cacheStats,
        db
      );
      
      // Clean up expired cache entries
      const cleanupResult = await cleanupExpiredCache(db);
      
      // Update cache configuration
      await updateCacheConfiguration(optimizationResult, db);
      
      const duration = Date.now() - startTime;
      
      await logger.info("Prediction cache optimization completed", {
        hitRate: optimizationResult.hitRate,
        entriesOptimized: optimizationResult.entriesOptimized,
        cleanedEntries: cleanupResult.cleanedEntries,
        duration,
      });

      return {
        success: true,
        optimization: optimizationResult,
        cleanup: cleanupResult,
        duration,
      };

    } catch (error) {
      await logger.error("Prediction cache optimization failed", { error, payload });
      throw error;
    }
  },
});

export const warmPredictionCacheTask = task({
  id: "warm-prediction-cache",
  description: "Pre-warm prediction cache with commonly requested predictions",
  run: async (payload: {
    predictionTypes?: PredictionType[];
    userSegments?: string[];
    priority?: "high" | "medium" | "low";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      await logger.info("Starting prediction cache warming", {
        types: payload.predictionTypes || ["success", "timeline", "cost", "risk"],
        segments: payload.userSegments || ["new_users", "active_cases"],
        priority: payload.priority || "medium",
      });

      const db = initializeDatabase();
      
      // Identify common prediction patterns
      const commonPatterns = await identifyCommonPredictionPatterns(
        payload.predictionTypes || ["success", "timeline", "cost", "risk"],
        db
      );
      
      // Pre-generate predictions for common patterns
      const warmingResults = await Promise.all(
        commonPatterns.map(pattern => 
          preGeneratePrediction(pattern, db)
        )
      );
      
      // Store warmed predictions in cache
      const cacheResults = await Promise.all(
        warmingResults.map(result => 
          storePredictionInCache(result, db)
        )
      );
      
      const duration = Date.now() - startTime;
      const successfulWarms = cacheResults.filter(r => r.success).length;
      
      await logger.info("Prediction cache warming completed", {
        patternsIdentified: commonPatterns.length,
        predictionsGenerated: warmingResults.length,
        successfulWarms,
        duration,
      });

      return {
        success: true,
        patternsWarmed: commonPatterns.length,
        predictionsGenerated: warmingResults.length,
        successfulWarms,
        duration,
      };

    } catch (error) {
      await logger.error("Prediction cache warming failed", { error, payload });
      throw error;
    }
  },
});

export const managePredictionCacheTask = task({
  id: "manage-prediction-cache",
  description: "Manage prediction cache lifecycle including eviction and refresh policies",
  run: async (payload: {
    operation: "evict" | "refresh" | "analyze" | "compact";
    targetTypes?: PredictionType[];
    ageThresholdHours?: number;
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      await logger.info("Starting prediction cache management", {
        operation: payload.operation,
        targetTypes: payload.targetTypes,
        ageThreshold: payload.ageThresholdHours || 168, // 1 week
      });

      const db = initializeDatabase();
      let result;
      
      switch (payload.operation) {
        case "evict":
          result = await evictStalePredictions(
            payload.targetTypes,
            payload.ageThresholdHours || 168,
            db
          );
          break;
          
        case "refresh":
          result = await refreshExpiredPredictions(
            payload.targetTypes,
            db
          );
          break;
          
        case "analyze":
          result = await analyzeCacheUsagePatterns(
            payload.targetTypes,
            db
          );
          break;
          
        case "compact":
          result = await compactCacheStorage(db);
          break;
          
        default:
          throw new Error(`Unknown cache operation: ${payload.operation}`);
      }
      
      const duration = Date.now() - startTime;
      
      await logger.info("Prediction cache management completed", {
        operation: payload.operation,
        result,
        duration,
      });

      return {
        success: true,
        operation: payload.operation,
        result,
        duration,
      };

    } catch (error) {
      await logger.error("Prediction cache management failed", { error, payload });
      throw error;
    }
  },
});

// ===== CACHE OPTIMIZATION FUNCTIONS =====

async function analyzeCachePerformance(db: any): Promise<{
  hitRate: number;
  missRate: number;
  averageAge: number;
  totalEntries: number;
  sizeDistribution: Record<PredictionType, number>;
}> {
  await logger.info("Analyzing cache performance");
  
  // Get cache statistics from database
  const cacheStats = await db
    .select({
      type: predictions.type,
      count: count(),
      avgAge: sql<number>`AVG(EXTRACT(EPOCH FROM (NOW() - ${predictions.predictedAt})) / 3600)`,
    })
    .from(predictions)
    .where(gte(predictions.predictedAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))) // Last 30 days
    .groupBy(predictions.type);
  
  // Get hit/miss statistics from Redis
  const hitCount = (await redis.get("cache:hits")) || 0;
  const missCount = (await redis.get("cache:misses")) || 0;
  const totalRequests = Number(hitCount) + Number(missCount);
  
  const hitRate = totalRequests > 0 ? Number(hitCount) / totalRequests : 0;
  const missRate = totalRequests > 0 ? Number(missCount) / totalRequests : 0;
  
  const sizeDistribution = cacheStats.reduce((acc, stat) => {
    acc[stat.type as PredictionType] = stat.count;
    return acc;
  }, {} as Record<PredictionType, number>);
  
  const totalEntries = cacheStats.reduce((sum, stat) => sum + stat.count, 0);
  const averageAge = cacheStats.reduce((sum, stat) => sum + (stat.avgAge * stat.count), 0) / totalEntries;
  
  return {
    hitRate,
    missRate,
    averageAge,
    totalEntries,
    sizeDistribution,
  };
}

async function optimizeCacheStrategy(
  strategy: "aggressive" | "conservative" | "adaptive",
  cacheStats: any,
  db: any
): Promise<{
  hitRate: number;
  entriesOptimized: number;
  newTtl: number;
  strategy: string;
}> {
  await logger.info("Optimizing cache strategy", { strategy, currentHitRate: cacheStats.hitRate });
  
  let newTtl: number;
  let entriesOptimized = 0;
  
  switch (strategy) {
    case "aggressive":
      // Longer TTL, more caching
      newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL * 2;
      entriesOptimized = await extendCacheTtl(newTtl, db);
      break;
      
    case "conservative":
      // Shorter TTL, less caching
      newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL / 2;
      entriesOptimized = await reduceCacheTtl(newTtl, db);
      break;
      
    case "adaptive":
      // Adjust based on hit rate
      if (cacheStats.hitRate > 0.8) {
        // High hit rate, extend TTL
        newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL * 1.5;
        entriesOptimized = await extendCacheTtl(newTtl, db);
      } else if (cacheStats.hitRate < 0.5) {
        // Low hit rate, reduce TTL
        newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL * 0.75;
        entriesOptimized = await reduceCacheTtl(newTtl, db);
      } else {
        // Moderate hit rate, keep current TTL
        newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL;
      }
      break;
      
    default:
      newTtl = ML_CONSTANTS.PREDICTION_CACHE_TTL;
  }
  
  return {
    hitRate: cacheStats.hitRate,
    entriesOptimized,
    newTtl,
    strategy,
  };
}

async function cleanupExpiredCache(db: any): Promise<{
  cleanedEntries: number;
  freedSpace: number;
}> {
  await logger.info("Cleaning up expired cache entries");
  
  const expiredThreshold = new Date(Date.now() - ML_CONSTANTS.PREDICTION_CACHE_TTL * 1000);
  
  // Count expired entries before deletion
  const [{ count: expiredCount }] = await db
    .select({ count: count() })
    .from(predictions)
    .where(lte(predictions.predictedAt, expiredThreshold));
  
  // Delete expired predictions
  const deletedPredictions = await db
    .delete(predictions)
    .where(lte(predictions.predictedAt, expiredThreshold))
    .returning({ id: predictions.id });
  
  // Clean up Redis cache entries
  const redisKeys = await redis.keys("prediction:*");
  let redisDeleted = 0;
  
  for (const key of redisKeys) {
    const cached = await redis.get(key);
    if (cached) {
      try {
        const data = JSON.parse(cached as string);
        if (new Date(data.timestamp) < expiredThreshold) {
          await redis.del(key);
          redisDeleted++;
        }
      } catch (error) {
        // Invalid JSON, delete the key
        await redis.del(key);
        redisDeleted++;
      }
    }
  }
  
  const cleanedEntries = deletedPredictions.length + redisDeleted;
  const freedSpace = cleanedEntries * 1024; // Estimate 1KB per entry
  
  return {
    cleanedEntries,
    freedSpace,
  };
}

async function updateCacheConfiguration(optimizationResult: any, db: any): Promise<void> {
  await logger.info("Updating cache configuration", optimizationResult);
  
  // Store cache configuration in Redis
  await redis.set("cache:config", JSON.stringify({
    ttl: optimizationResult.newTtl,
    strategy: optimizationResult.strategy,
    lastOptimized: new Date().toISOString(),
    hitRate: optimizationResult.hitRate,
  }));
  
  // Update environment-specific cache settings
  await redis.set("cache:ttl", optimizationResult.newTtl);
  await redis.set("cache:strategy", optimizationResult.strategy);
}

// ===== CACHE WARMING FUNCTIONS =====

async function identifyCommonPredictionPatterns(
  types: PredictionType[],
  db: any
): Promise<Array<{
  type: PredictionType;
  inputPattern: Record<string, any>;
  frequency: number;
  avgConfidence: number;
}>> {
  await logger.info("Identifying common prediction patterns", { types });
  
  // Analyze prediction patterns from the last 30 days
  const patterns = await db
    .select({
      type: predictions.type,
      inputFeatures: predictions.inputFeatures,
      count: count(),
      avgConfidence: avg(sql<number>`CAST(${predictions.confidence} AS FLOAT)`),
    })
    .from(predictions)
    .where(
      and(
        sql`${predictions.type} = ANY(${types})`,
        gte(predictions.predictedAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      )
    )
    .groupBy(predictions.type, predictions.inputFeatures)
    .having(sql`COUNT(*) >= 5`) // Only patterns with at least 5 occurrences
    .orderBy(desc(count()))
    .limit(50);
  
  return patterns.map(pattern => ({
    type: pattern.type as PredictionType,
    inputPattern: pattern.inputFeatures,
    frequency: pattern.count,
    avgConfidence: pattern.avgConfidence || 0,
  }));
}

async function preGeneratePrediction(
  pattern: {
    type: PredictionType;
    inputPattern: Record<string, any>;
    frequency: number;
  },
  db: any
): Promise<PredictionResult> {
  await logger.info("Pre-generating prediction for pattern", {
    type: pattern.type,
    frequency: pattern.frequency,
  });
  
  // Get the best model for this prediction type
  const [model] = await db
    .select()
    .from(mlModels)
    .where(
      and(
        eq(mlModels.type, pattern.type),
        eq(mlModels.isActive, true)
      )
    )
    .orderBy(desc(mlModels.accuracy))
    .limit(1);
  
  if (!model) {
    throw new Error(`No active model found for type: ${pattern.type}`);
  }
  
  // Generate prediction using AI SDK
  const { object: prediction } = await generateObject({
    model: openai("gpt-4o-mini"), // Use smaller model for cache warming
    schema: z.object({
      value: z.number(),
      confidence: z.number().min(0).max(1),
      explanation: z.string(),
      factors: z.array(z.object({
        name: z.string(),
        importance: z.number().min(0).max(1),
        value: z.any(),
        impact: z.enum(["positive", "negative", "neutral"]),
      })),
    }),
    prompt: `Generate a ${pattern.type} prediction for this common input pattern:

Model: ${model.algorithm} (${model.accuracy}% accuracy)
Input Pattern: ${JSON.stringify(pattern.inputPattern)}
Pattern Frequency: ${pattern.frequency} occurrences

This is for cache warming, so provide a reasonable prediction based on the input pattern and model characteristics.`,
  });
  
  return {
    id: crypto.randomUUID(),
    modelId: model.id,
    type: pattern.type,
    value: prediction.value,
    confidence: prediction.confidence,
    factors: prediction.factors,
    explanation: prediction.explanation,
    featureImportance: {},
    metadata: {
      preGenerated: true,
      patternFrequency: pattern.frequency,
      inputHash: generateInputHash(pattern.inputPattern),
    },
    predictedAt: new Date(),
  };
}

async function storePredictionInCache(
  prediction: PredictionResult,
  db: any
): Promise<{ success: boolean; cacheKey: string }> {
  const cacheKey = `prediction:${prediction.type}:${prediction.metadata?.inputHash}`;
  
  try {
    // Store in Redis with TTL
    await redis.setex(
      cacheKey,
      ML_CONSTANTS.PREDICTION_CACHE_TTL,
      JSON.stringify({
        ...prediction,
        timestamp: new Date().toISOString(),
        preGenerated: true,
      })
    );
    
    // Also store in database for persistence
    await db.insert(predictions).values({
      id: prediction.id,
      modelId: prediction.modelId,
      userId: "cache_warm",
      type: prediction.type,
      value: prediction.value.toString(),
      confidence: prediction.confidence.toString(),
      factors: prediction.factors,
      explanation: prediction.explanation,
      inputFeatures: prediction.metadata?.inputPattern || {},
      inputHash: prediction.metadata?.inputHash || generateInputHash({}),
      isValidated: false,
      metadata: prediction.metadata,
      predictedAt: prediction.predictedAt,
    });
    
    return { success: true, cacheKey };
    
  } catch (error) {
    await logger.error("Failed to store prediction in cache", { error, cacheKey });
    return { success: false, cacheKey };
  }
}

// ===== CACHE MANAGEMENT FUNCTIONS =====

async function evictStalePredictions(
  targetTypes: PredictionType[] | undefined,
  ageThresholdHours: number,
  db: any
): Promise<{ evictedCount: number; types: PredictionType[] }> {
  const threshold = new Date(Date.now() - ageThresholdHours * 60 * 60 * 1000);
  
  let whereCondition = lte(predictions.predictedAt, threshold);
  if (targetTypes && targetTypes.length > 0) {
    whereCondition = and(
      whereCondition,
      sql`${predictions.type} = ANY(${targetTypes})`
    );
  }
  
  const evicted = await db
    .delete(predictions)
    .where(whereCondition)
    .returning({ type: predictions.type });
  
  // Also clean Redis cache
  const redisKeys = await redis.keys("prediction:*");
  let redisEvicted = 0;
  
  for (const key of redisKeys) {
    if (targetTypes && targetTypes.length > 0) {
      const keyType = key.split(":")[1] as PredictionType;
      if (!targetTypes.includes(keyType)) continue;
    }
    
    const cached = await redis.get(key);
    if (cached) {
      try {
        const data = JSON.parse(cached as string);
        if (new Date(data.timestamp) < threshold) {
          await redis.del(key);
          redisEvicted++;
        }
      } catch (error) {
        await redis.del(key);
        redisEvicted++;
      }
    }
  }
  
  const uniqueTypes = [...new Set(evicted.map(e => e.type as PredictionType))];
  
  return {
    evictedCount: evicted.length + redisEvicted,
    types: uniqueTypes,
  };
}

async function refreshExpiredPredictions(
  targetTypes: PredictionType[] | undefined,
  db: any
): Promise<{ refreshedCount: number; failedCount: number }> {
  // Find predictions that are close to expiring
  const refreshThreshold = new Date(Date.now() - (ML_CONSTANTS.PREDICTION_CACHE_TTL * 0.8) * 1000);
  
  let whereCondition = gte(predictions.predictedAt, refreshThreshold);
  if (targetTypes && targetTypes.length > 0) {
    whereCondition = and(
      whereCondition,
      sql`${predictions.type} = ANY(${targetTypes})`
    );
  }
  
  const expiring = await db
    .select()
    .from(predictions)
    .where(whereCondition)
    .limit(100); // Limit to avoid overwhelming the system
  
  let refreshedCount = 0;
  let failedCount = 0;
  
  for (const prediction of expiring) {
    try {
      // Re-generate the prediction with current data
      const refreshed = await preGeneratePrediction({
        type: prediction.type as PredictionType,
        inputPattern: prediction.inputFeatures,
        frequency: 1,
      }, db);
      
      // Update the existing prediction
      await db
        .update(predictions)
        .set({
          value: refreshed.value.toString(),
          confidence: refreshed.confidence.toString(),
          factors: refreshed.factors,
          explanation: refreshed.explanation,
          predictedAt: new Date(),
        })
        .where(eq(predictions.id, prediction.id));
      
      refreshedCount++;
      
    } catch (error) {
      await logger.error("Failed to refresh prediction", { error, predictionId: prediction.id });
      failedCount++;
    }
  }
  
  return { refreshedCount, failedCount };
}

async function analyzeCacheUsagePatterns(
  targetTypes: PredictionType[] | undefined,
  db: any
): Promise<{
  totalRequests: number;
  hitRate: number;
  popularTypes: Array<{ type: PredictionType; count: number }>;
  peakHours: number[];
}> {
  // Get usage statistics from Redis
  const hitCount = Number((await redis.get("cache:hits")) || 0);
  const missCount = Number((await redis.get("cache:misses")) || 0);
  const totalRequests = hitCount + missCount;
  const hitRate = totalRequests > 0 ? hitCount / totalRequests : 0;
  
  // Analyze prediction type popularity
  let whereCondition = gte(predictions.predictedAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  if (targetTypes && targetTypes.length > 0) {
    whereCondition = and(
      whereCondition,
      sql`${predictions.type} = ANY(${targetTypes})`
    );
  }
  
  const typeStats = await db
    .select({
      type: predictions.type,
      count: count(),
    })
    .from(predictions)
    .where(whereCondition)
    .groupBy(predictions.type)
    .orderBy(desc(count()));
  
  const popularTypes = typeStats.map(stat => ({
    type: stat.type as PredictionType,
    count: stat.count,
  }));
  
  // Analyze peak hours (simplified - would need more detailed logging in production)
  const peakHours = [9, 10, 11, 14, 15, 16]; // Business hours assumption
  
  return {
    totalRequests,
    hitRate,
    popularTypes,
    peakHours,
  };
}

async function compactCacheStorage(db: any): Promise<{
  compactedEntries: number;
  spaceSaved: number;
}> {
  // Remove duplicate predictions (same input hash, keep most recent)
  const duplicates = await db
    .select({
      inputHash: predictions.inputHash,
      type: predictions.type,
      count: count(),
      oldestId: sql<string>`MIN(${predictions.id})`,
    })
    .from(predictions)
    .groupBy(predictions.inputHash, predictions.type)
    .having(sql`COUNT(*) > 1`);
  
  let compactedEntries = 0;
  
  for (const duplicate of duplicates) {
    // Keep the most recent, delete the others
    const deleted = await db
      .delete(predictions)
      .where(
        and(
          eq(predictions.inputHash, duplicate.inputHash),
          eq(predictions.type, duplicate.type),
          sql`${predictions.id} != (
            SELECT id FROM ${predictions} 
            WHERE input_hash = ${duplicate.inputHash} 
            AND type = ${duplicate.type}
            ORDER BY predicted_at DESC 
            LIMIT 1
          )`
        )
      )
      .returning({ id: predictions.id });
    
    compactedEntries += deleted.length;
  }
  
  const spaceSaved = compactedEntries * 1024; // Estimate 1KB per entry
  
  return {
    compactedEntries,
    spaceSaved,
  };
}

// ===== UTILITY FUNCTIONS =====

async function extendCacheTtl(newTtl: number, db: any): Promise<number> {
  // Update Redis TTL for existing cache entries
  const keys = await redis.keys("prediction:*");
  let updated = 0;
  
  for (const key of keys) {
    await redis.expire(key, newTtl);
    updated++;
  }
  
  return updated;
}

async function reduceCacheTtl(newTtl: number, db: any): Promise<number> {
  // Update Redis TTL for existing cache entries
  const keys = await redis.keys("prediction:*");
  let updated = 0;
  
  for (const key of keys) {
    const ttl = await redis.ttl(key);
    if (ttl > newTtl) {
      await redis.expire(key, newTtl);
      updated++;
    }
  }
  
  return updated;
}

function generateInputHash(inputFeatures: Record<string, any>): string {
  const str = JSON.stringify(inputFeatures, Object.keys(inputFeatures).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function initializeDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  
  const client = postgres(connectionString);
  return drizzle(client);
}