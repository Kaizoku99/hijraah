/**
 * Temporal Data Analysis Task
 *
 * Trigger.dev v4 scheduled task for analyzing temporal patterns in immigration data
 * using AI SDK's generateObject with historical data analysis.
 */

import { schedules, task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { entities, relationships, policyChanges } from "../../db/schema.js";
import { eq, gte, lte, and, desc } from "drizzle-orm";

// Temporal analysis result schema
const TemporalAnalysisSchema = z.object({
  analysisId: z.string(),
  timeRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
  patterns: z.array(
    z.object({
      type: z.enum(["trend", "cycle", "anomaly", "correlation"]),
      description: z.string(),
      confidence: z.number().min(0).max(1),
      entities: z.array(z.string()),
      timeframe: z.string(),
      significance: z.enum(["high", "medium", "low"]),
    })
  ),
  insights: z.array(
    z.object({
      category: z.enum([
        "policy_evolution",
        "requirement_changes",
        "timeline_shifts",
        "relationship_dynamics",
      ]),
      insight: z.string(),
      impact: z.enum(["critical", "major", "moderate", "minor"]),
      affectedEntities: z.array(z.string()),
      recommendations: z.array(z.string()),
    })
  ),
  predictions: z.array(
    z.object({
      type: z.enum([
        "policy_change",
        "requirement_update",
        "timeline_adjustment",
      ]),
      prediction: z.string(),
      probability: z.number().min(0).max(1),
      timeframe: z.string(),
      confidence: z.number().min(0).max(1),
    })
  ),
  metadata: z.object({
    entitiesAnalyzed: z.number(),
    relationshipsAnalyzed: z.number(),
    policyChangesAnalyzed: z.number(),
    analysisDepth: z.enum(["shallow", "medium", "deep"]),
    processingTimeMs: z.number(),
  }),
});

type TemporalAnalysisResult = z.infer<typeof TemporalAnalysisSchema>;

// Scheduled task for periodic temporal analysis
export const analyzeTemporalDataTask = schedules.task({
  id: "analyze-temporal-data",
  // Run every 6 hours for comprehensive temporal analysis
  cron: "0 */6 * * *",
  machine: {
    preset: "large-1x",
  },
  run: async (payload, { ctx }) => {
    const startTime = Date.now();

    try {
      ctx.logger.info("Starting temporal data analysis", {
        scheduledAt: payload.timestamp,
        runId: ctx.run.id,
      });

      // Define analysis time range (last 30 days)
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Fetch temporal data from database
      const [entitiesData, relationshipsData, policyChangesData] =
        await Promise.all([
          // Get entities with temporal properties
          db
            .select()
            .from(entities)
            .where(
              and(
                gte(entities.updatedAt, startDate),
                lte(entities.updatedAt, endDate)
              )
            )
            .orderBy(desc(entities.updatedAt))
            .limit(1000),

          // Get relationships with temporal validity
          db
            .select()
            .from(relationships)
            .where(gte(relationships.createdAt, startDate))
            .orderBy(desc(relationships.createdAt))
            .limit(500),

          // Get policy changes in the time range
          db
            .select()
            .from(policyChanges)
            .where(
              and(
                gte(policyChanges.detectedAt, startDate),
                lte(policyChanges.detectedAt, endDate)
              )
            )
            .orderBy(desc(policyChanges.detectedAt))
            .limit(200),
        ]);

      ctx.logger.info("Fetched temporal data", {
        entities: entitiesData.length,
        relationships: relationshipsData.length,
        policyChanges: policyChangesData.length,
      });

      // Prepare data for AI analysis
      const temporalDataContext = {
        timeRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        entities: entitiesData.map((entity) => ({
          id: entity.id,
          name: entity.name,
          type: entity.type,
          properties: entity.properties,
          confidence: entity.confidence,
          createdAt: entity.createdAt.toISOString(),
          updatedAt: entity.updatedAt.toISOString(),
        })),
        relationships: relationshipsData.map((rel) => ({
          id: rel.id,
          sourceEntityId: rel.sourceEntityId,
          targetEntityId: rel.targetEntityId,
          type: rel.type,
          strength: rel.strength,
          confidence: rel.confidence,
          temporalValidity: rel.temporalValidity,
          createdAt: rel.createdAt.toISOString(),
        })),
        policyChanges: policyChangesData.map((change) => ({
          id: change.id,
          country: change.country,
          changeType: change.changeType,
          impactLevel: change.impactLevel,
          title: change.title,
          description: change.description,
          effectiveDate: change.effectiveDate?.toISOString(),
          detectedAt: change.detectedAt.toISOString(),
          affectedCategories: change.affectedCategories,
          confidence: change.confidence,
        })),
      };

      // Perform AI-powered temporal analysis
      const { object: analysis } = await generateObject({
        model: openai("gpt-4o"),
        schema: TemporalAnalysisSchema,
        system: `You are an expert immigration data analyst specializing in temporal pattern recognition and policy evolution analysis.

Your task is to analyze immigration data over time to identify:
1. Temporal patterns and trends in policy changes
2. Evolution of immigration requirements and processes
3. Correlations between different policy changes
4. Anomalies or unexpected changes in the data
5. Predictive insights for future policy directions

Focus on:
- Policy evolution patterns across countries
- Requirement changes and their temporal relationships
- Timeline shifts in immigration processes
- Relationship dynamics between different immigration entities
- Seasonal or cyclical patterns in policy updates

Provide actionable insights and recommendations based on the temporal analysis.`,
        prompt: `Analyze the following temporal immigration data and identify patterns, trends, and insights:

${JSON.stringify(temporalDataContext, null, 2)}

Please provide a comprehensive temporal analysis including:
1. Identified patterns and trends
2. Key insights about policy evolution
3. Predictions for future changes
4. Recommendations for stakeholders

Focus on temporal relationships and how immigration policies and requirements have evolved over the specified time period.`,
      });

      const processingTime = Date.now() - startTime;

      // Update analysis metadata
      analysis.metadata.processingTimeMs = processingTime;

      ctx.logger.info("Completed temporal analysis", {
        patterns: analysis.patterns.length,
        insights: analysis.insights.length,
        predictions: analysis.predictions.length,
        processingTimeMs: processingTime,
      });

      // Store analysis results (could be stored in a dedicated table)
      // For now, we'll return the results for further processing
      return {
        success: true,
        analysis,
        metadata: {
          entitiesAnalyzed: entitiesData.length,
          relationshipsAnalyzed: relationshipsData.length,
          policyChangesAnalyzed: policyChangesData.length,
          timeRange: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          processingTimeMs: processingTime,
        },
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;

      ctx.logger.error("Temporal analysis failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// On-demand temporal analysis task
export const analyzeTemporalDataOnDemand = task({
  id: "analyze-temporal-data-on-demand",
  machine: {
    preset: "large-1x",
  },
  run: async (
    payload: {
      startDate: string;
      endDate: string;
      analysisDepth?: "shallow" | "medium" | "deep";
      entityTypes?: string[];
      countries?: string[];
    },
    { ctx }
  ) => {
    const startTime = Date.now();

    try {
      ctx.logger.info("Starting on-demand temporal analysis", {
        startDate: payload.startDate,
        endDate: payload.endDate,
        analysisDepth: payload.analysisDepth || "medium",
        runId: ctx.run.id,
      });

      const startDate = new Date(payload.startDate);
      const endDate = new Date(payload.endDate);
      const analysisDepth = payload.analysisDepth || "medium";

      // Build dynamic queries based on filters
      let entitiesQuery = db
        .select()
        .from(entities)
        .where(
          and(
            gte(entities.updatedAt, startDate),
            lte(entities.updatedAt, endDate)
          )
        );

      if (payload.entityTypes && payload.entityTypes.length > 0) {
        // Add entity type filter if provided
        // Note: This would need proper SQL IN clause implementation
      }

      // Determine limits based on analysis depth
      const limits = {
        shallow: { entities: 500, relationships: 250, policyChanges: 100 },
        medium: { entities: 1000, relationships: 500, policyChanges: 200 },
        deep: { entities: 2000, relationships: 1000, policyChanges: 500 },
      };

      const limit = limits[analysisDepth];

      // Fetch data with appropriate limits
      const [entitiesData, relationshipsData, policyChangesData] =
        await Promise.all([
          entitiesQuery.orderBy(desc(entities.updatedAt)).limit(limit.entities),

          db
            .select()
            .from(relationships)
            .where(
              and(
                gte(relationships.createdAt, startDate),
                lte(relationships.createdAt, endDate)
              )
            )
            .orderBy(desc(relationships.createdAt))
            .limit(limit.relationships),

          db
            .select()
            .from(policyChanges)
            .where(
              and(
                gte(policyChanges.detectedAt, startDate),
                lte(policyChanges.detectedAt, endDate),
                ...(payload.countries
                  ? [
                      /* country filter */
                    ]
                  : [])
              )
            )
            .orderBy(desc(policyChanges.detectedAt))
            .limit(limit.policyChanges),
        ]);

      // Prepare context for AI analysis
      const temporalDataContext = {
        timeRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        analysisDepth,
        filters: {
          entityTypes: payload.entityTypes,
          countries: payload.countries,
        },
        entities: entitiesData.map((entity) => ({
          id: entity.id,
          name: entity.name,
          type: entity.type,
          properties: entity.properties,
          confidence: entity.confidence,
          createdAt: entity.createdAt.toISOString(),
          updatedAt: entity.updatedAt.toISOString(),
        })),
        relationships: relationshipsData.map((rel) => ({
          id: rel.id,
          sourceEntityId: rel.sourceEntityId,
          targetEntityId: rel.targetEntityId,
          type: rel.type,
          strength: rel.strength,
          confidence: rel.confidence,
          temporalValidity: rel.temporalValidity,
          createdAt: rel.createdAt.toISOString(),
        })),
        policyChanges: policyChangesData.map((change) => ({
          id: change.id,
          country: change.country,
          changeType: change.changeType,
          impactLevel: change.impactLevel,
          title: change.title,
          description: change.description,
          effectiveDate: change.effectiveDate?.toISOString(),
          detectedAt: change.detectedAt.toISOString(),
          affectedCategories: change.affectedCategories,
          confidence: change.confidence,
        })),
      };

      // Perform targeted temporal analysis
      const { object: analysis } = await generateObject({
        model: openai("gpt-4o"),
        schema: TemporalAnalysisSchema,
        system: `You are an expert immigration data analyst performing ${analysisDepth} temporal analysis.

For ${analysisDepth} analysis:
- Shallow: Focus on major trends and obvious patterns
- Medium: Include detailed pattern analysis and correlations
- Deep: Comprehensive analysis with complex relationships and subtle patterns

Analyze the temporal data to identify patterns, evolution, and insights specific to the requested time range and filters.`,
        prompt: `Perform a ${analysisDepth} temporal analysis of the following immigration data:

${JSON.stringify(temporalDataContext, null, 2)}

Provide insights appropriate for the ${analysisDepth} analysis level, focusing on the specified time range and any applied filters.`,
      });

      const processingTime = Date.now() - startTime;
      analysis.metadata.processingTimeMs = processingTime;
      analysis.metadata.analysisDepth = analysisDepth;

      ctx.logger.info("Completed on-demand temporal analysis", {
        patterns: analysis.patterns.length,
        insights: analysis.insights.length,
        predictions: analysis.predictions.length,
        analysisDepth,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        analysis,
        metadata: {
          entitiesAnalyzed: entitiesData.length,
          relationshipsAnalyzed: relationshipsData.length,
          policyChangesAnalyzed: policyChangesData.length,
          timeRange: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          analysisDepth,
          processingTimeMs: processingTime,
        },
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;

      ctx.logger.error("On-demand temporal analysis failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});
