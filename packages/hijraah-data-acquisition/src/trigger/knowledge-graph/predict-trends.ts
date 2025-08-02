/**
 * Trend Prediction Task
 * 
 * Trigger.dev v4 task for predicting immigration policy trends using AI SDK's streamText
 * with historical data analysis and long-running capabilities.
 */

import { task } from "@trigger.dev/sdk/v3";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { entities, relationships, policyChanges, communityExperiences } from "../../db/schema.js";
import { eq, gte, lte, and, desc, sql } from "drizzle-orm";

// Trend prediction result schema
const TrendPredictionSchema = z.object({
  predictionId: z.string(),
  predictionType: z.enum(["policy_trend", "requirement_evolution", "timeline_forecast", "cost_projection"]),
  timeframe: z.object({
    startDate: z.string(),
    endDate: z.string(),
    predictionHorizon: z.string(), // e.g., "6 months", "1 year"
  }),
  trends: z.array(z.object({
    category: z.string(),
    trend: z.string(),
    direction: z.enum(["increasing", "decreasing", "stable", "volatile"]),
    confidence: z.number().min(0).max(1),
    probability: z.number().min(0).max(1),
    impactLevel: z.enum(["critical", "major", "moderate", "minor"]),
    affectedEntities: z.array(z.string()),
    supportingEvidence: z.array(z.string()),
  })),
  predictions: z.array(z.object({
    type: z.enum(["policy_change", "requirement_update", "processing_time", "cost_change"]),
    description: z.string(),
    expectedTimeframe: z.string(),
    probability: z.number().min(0).max(1),
    confidence: z.number().min(0).max(1),
    potentialImpact: z.string(),
    preparationRecommendations: z.array(z.string()),
  })),
  riskFactors: z.array(z.object({
    factor: z.string(),
    riskLevel: z.enum(["high", "medium", "low"]),
    description: z.string(),
    mitigationStrategies: z.array(z.string()),
  })),
  opportunities: z.array(z.object({
    opportunity: z.string(),
    description: z.string(),
    timeframe: z.string(),
    actionItems: z.array(z.string()),
  })),
  metadata: z.object({
    dataPointsAnalyzed: z.number(),
    historicalDepth: z.string(),
    modelConfidence: z.number().min(0).max(1),
    processingTimeMs: z.number(),
    lastUpdated: z.string(),
  }),
});

type TrendPredictionResult = z.infer<typeof TrendPredictionSchema>;

// Main trend prediction task with streaming capabilities
export const predictTrendsTask = task({
  id: "predict-trends",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    predictionType: "policy_trend" | "requirement_evolution" | "timeline_forecast" | "cost_projection";
    countries?: string[];
    entityTypes?: string[];
    predictionHorizon?: string; // e.g., "6 months", "1 year", "2 years"
    historicalDepth?: string; // e.g., "1 year", "2 years", "5 years"
    includeStreamingUpdates?: boolean;
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting trend prediction analysis", {
        predictionType: payload.predictionType,
        countries: payload.countries,
        entityTypes: payload.entityTypes,
        predictionHorizon: payload.predictionHorizon || "1 year",
        historicalDepth: payload.historicalDepth || "2 years",
        runId: ctx.run.id,
      });

      const predictionHorizon = payload.predictionHorizon || "1 year";
      const historicalDepth = payload.historicalDepth || "2 years";

      // Calculate date ranges for historical analysis
      const endDate = new Date();
      const startDate = new Date();
      
      // Parse historical depth and set start date
      if (historicalDepth.includes("year")) {
        const years = parseInt(historicalDepth);
        startDate.setFullYear(endDate.getFullYear() - years);
      } else if (historicalDepth.includes("month")) {
        const months = parseInt(historicalDepth);
        startDate.setMonth(endDate.getMonth() - months);
      }

      // Fetch comprehensive historical data
      const [
        historicalPolicyChanges,
        historicalEntities,
        historicalRelationships,
        communityData
      ] = await Promise.all([
        // Policy changes over the historical period
        db.select()
          .from(policyChanges)
          .where(
            and(
              gte(policyChanges.detectedAt, startDate),
              lte(policyChanges.detectedAt, endDate),
              ...(payload.countries ? [/* country filter */] : [])
            )
          )
          .orderBy(desc(policyChanges.detectedAt))
          .limit(500),

        // Entity evolution over time
        db.select()
          .from(entities)
          .where(
            and(
              gte(entities.createdAt, startDate),
              ...(payload.entityTypes ? [/* entity type filter */] : [])
            )
          )
          .orderBy(desc(entities.createdAt))
          .limit(1000),

        // Relationship changes
        db.select()
          .from(relationships)
          .where(
            gte(relationships.createdAt, startDate)
          )
          .orderBy(desc(relationships.createdAt))
          .limit(500),

        // Community experience data for real-world insights
        db.select()
          .from(communityExperiences)
          .where(
            and(
              gte(communityExperiences.submittedAt, startDate),
              ...(payload.countries ? [/* country filter */] : [])
            )
          )
          .orderBy(desc(communityExperiences.submittedAt))
          .limit(300),
      ]);

      ctx.logger.info("Fetched historical data", {
        policyChanges: historicalPolicyChanges.length,
        entities: historicalEntities.length,
        relationships: historicalRelationships.length,
        communityData: communityData.length,
      });

      // Prepare comprehensive context for AI analysis
      const trendAnalysisContext = {
        predictionType: payload.predictionType,
        timeframe: {
          historicalStart: startDate.toISOString(),
          historicalEnd: endDate.toISOString(),
          predictionHorizon,
        },
        filters: {
          countries: payload.countries,
          entityTypes: payload.entityTypes,
        },
        historicalData: {
          policyChanges: historicalPolicyChanges.map(change => ({
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
          entities: historicalEntities.map(entity => ({
            id: entity.id,
            name: entity.name,
            type: entity.type,
            properties: entity.properties,
            confidence: entity.confidence,
            createdAt: entity.createdAt.toISOString(),
            updatedAt: entity.updatedAt.toISOString(),
          })),
          relationships: historicalRelationships.map(rel => ({
            id: rel.id,
            sourceEntityId: rel.sourceEntityId,
            targetEntityId: rel.targetEntityId,
            type: rel.type,
            strength: rel.strength,
            confidence: rel.confidence,
            temporalValidity: rel.temporalValidity,
            createdAt: rel.createdAt.toISOString(),
          })),
          communityExperiences: communityData.map(exp => ({
            id: exp.id,
            pathway: exp.pathway,
            targetCountry: exp.targetCountry,
            milestone: exp.milestone,
            actualTimeline: exp.actualTimeline,
            actualCost: exp.actualCost,
            difficulty: exp.difficulty,
            success: exp.success,
            submittedAt: exp.submittedAt.toISOString(),
          })),
        },
      };

      // Use streaming for long-running trend analysis
      if (payload.includeStreamingUpdates) {
        ctx.logger.info("Starting streaming trend analysis");
        
        let streamingResult = "";
        const { textStream } = await streamText({
          model: openai("gpt-4o"),
          system: `You are an expert immigration trend analyst with deep expertise in predictive modeling and policy evolution.

Your task is to analyze historical immigration data and predict future trends for ${payload.predictionType}.

Provide streaming updates as you analyze different aspects:
1. Historical pattern analysis
2. Trend identification and classification
3. Predictive modeling and forecasting
4. Risk assessment and opportunity identification
5. Actionable recommendations

Focus on ${predictionHorizon} predictions based on ${historicalDepth} of historical data.

Stream your analysis progressively, providing insights as you process different data segments.`,
          prompt: `Analyze the following historical immigration data and predict trends for ${payload.predictionType}:

${JSON.stringify(trendAnalysisContext, null, 2)}

Provide comprehensive trend predictions including:
1. Identified trends and their directions
2. Specific predictions with probabilities
3. Risk factors and mitigation strategies
4. Opportunities and action items
5. Supporting evidence and confidence levels

Stream your analysis progressively, showing your reasoning process.`,
        });

        // Process streaming results
        for await (const delta of textStream) {
          streamingResult += delta;
          
          // Log progress updates
          if (streamingResult.length % 1000 === 0) {
            ctx.logger.info("Streaming analysis progress", {
              charactersProcessed: streamingResult.length,
            });
          }
        }

        // Parse the final streaming result into structured format
        // This would typically involve additional processing to extract structured data
        ctx.logger.info("Completed streaming analysis", {
          totalCharacters: streamingResult.length,
        });
      }

      // Perform structured trend prediction analysis
      const { object: trendPrediction } = await streamText({
        model: openai("gpt-4o"),
        system: `You are an expert immigration trend analyst specializing in ${payload.predictionType} predictions.

Analyze historical patterns and predict future trends with high accuracy and confidence.

For ${payload.predictionType}:
- Policy Trend: Focus on policy direction, regulatory changes, and government priorities
- Requirement Evolution: Analyze how immigration requirements are changing over time
- Timeline Forecast: Predict processing times and timeline changes
- Cost Projection: Forecast fee changes and cost evolution

Provide structured predictions with:
- Clear trend identification and direction
- Probability assessments and confidence levels
- Risk factors and mitigation strategies
- Actionable opportunities and recommendations
- Supporting evidence from historical data`,
        prompt: `Analyze this historical immigration data and provide ${payload.predictionType} predictions for the next ${predictionHorizon}:

${JSON.stringify(trendAnalysisContext, null, 2)}

Focus on:
1. Clear trend identification with supporting evidence
2. Specific predictions with probability and confidence scores
3. Risk assessment and mitigation strategies
4. Opportunity identification and action items
5. Practical recommendations for stakeholders

Base your analysis on the ${historicalDepth} of historical data provided.`,
      }).then(async (result) => {
        // Parse the streaming result into structured format
        // This is a simplified approach - in practice, you'd want more sophisticated parsing
        const structuredResult: TrendPredictionResult = {
          predictionId: `pred_${Date.now()}`,
          predictionType: payload.predictionType,
          timeframe: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            predictionHorizon,
          },
          trends: [], // Would be populated from parsed streaming result
          predictions: [], // Would be populated from parsed streaming result
          riskFactors: [], // Would be populated from parsed streaming result
          opportunities: [], // Would be populated from parsed streaming result
          metadata: {
            dataPointsAnalyzed: historicalPolicyChanges.length + historicalEntities.length + historicalRelationships.length + communityData.length,
            historicalDepth,
            modelConfidence: 0.85, // Would be calculated based on data quality
            processingTimeMs: Date.now() - startTime,
            lastUpdated: new Date().toISOString(),
          },
        };

        return structuredResult;
      });

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed trend prediction analysis", {
        predictionType: payload.predictionType,
        dataPointsAnalyzed: trendPrediction.metadata.dataPointsAnalyzed,
        modelConfidence: trendPrediction.metadata.modelConfidence,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        trendPrediction,
        metadata: {
          predictionType: payload.predictionType,
          countries: payload.countries,
          entityTypes: payload.entityTypes,
          predictionHorizon,
          historicalDepth,
          dataPointsAnalyzed: trendPrediction.metadata.dataPointsAnalyzed,
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Trend prediction analysis failed", {
        predictionType: payload.predictionType,
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Comparative trend analysis task
export const compareTrendsTask = task({
  id: "compare-trends",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    countries: string[];
    predictionType: "policy_trend" | "requirement_evolution" | "timeline_forecast" | "cost_projection";
    predictionHorizon?: string;
    comparisonMetrics?: string[];
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting comparative trend analysis", {
        countries: payload.countries,
        predictionType: payload.predictionType,
        predictionHorizon: payload.predictionHorizon || "1 year",
        runId: ctx.run.id,
      });

      // Generate predictions for each country
      const countryPredictions = await Promise.all(
        payload.countries.map(async (country) => {
          const prediction = await predictTrendsTask.trigger({
            predictionType: payload.predictionType,
            countries: [country],
            predictionHorizon: payload.predictionHorizon,
            includeStreamingUpdates: false,
          });

          return {
            country,
            prediction: prediction.output,
          };
        })
      );

      // Perform comparative analysis
      const comparisonSchema = z.object({
        comparisonId: z.string(),
        countries: z.array(z.string()),
        predictionType: z.string(),
        comparisons: z.array(z.object({
          metric: z.string(),
          countryRankings: z.array(z.object({
            country: z.string(),
            value: z.number(),
            trend: z.enum(["improving", "declining", "stable"]),
            confidence: z.number().min(0).max(1),
          })),
          insights: z.array(z.string()),
        })),
        summary: z.object({
          bestPerforming: z.string(),
          mostVolatile: z.string(),
          keyDifferences: z.array(z.string()),
          recommendations: z.array(z.string()),
        }),
        metadata: z.object({
          processingTimeMs: z.number(),
          confidenceScore: z.number().min(0).max(1),
        }),
      });

      const { object: comparison } = await streamText({
        model: openai("gpt-4o"),
        system: `You are an expert comparative analyst specializing in immigration trends across different countries.

Analyze and compare immigration trends between countries, identifying:
1. Key differences and similarities
2. Performance rankings and metrics
3. Trend directions and volatility
4. Best practices and recommendations
5. Risk factors and opportunities

Provide actionable insights for stakeholders making decisions across multiple countries.`,
        prompt: `Compare immigration trends for ${payload.predictionType} across these countries:

${JSON.stringify(countryPredictions, null, 2)}

Provide comprehensive comparative analysis including:
1. Country rankings for key metrics
2. Trend comparisons and insights
3. Best performing countries and practices
4. Risk assessment across countries
5. Strategic recommendations

Focus on practical differences that matter for immigration planning and decision-making.`,
      }).then(async (result) => {
        // Parse streaming result into structured comparison
        // This would be implemented with proper parsing logic
        return {
          comparisonId: `comp_${Date.now()}`,
          countries: payload.countries,
          predictionType: payload.predictionType,
          comparisons: [], // Would be populated from parsed result
          summary: {
            bestPerforming: payload.countries[0], // Placeholder
            mostVolatile: payload.countries[1], // Placeholder
            keyDifferences: [], // Would be populated
            recommendations: [], // Would be populated
          },
          metadata: {
            processingTimeMs: Date.now() - startTime,
            confidenceScore: 0.8, // Would be calculated
          },
        };
      });

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed comparative trend analysis", {
        countries: payload.countries,
        predictionType: payload.predictionType,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        comparison,
        countryPredictions,
        metadata: {
          countries: payload.countries,
          predictionType: payload.predictionType,
          predictionHorizon: payload.predictionHorizon || "1 year",
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Comparative trend analysis failed", {
        countries: payload.countries,
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Real-time trend monitoring task
export const monitorTrendsRealTime = task({
  id: "monitor-trends-realtime",
  machine: {
    preset: "medium-1x",
  },
  run: async (payload: {
    monitoringDuration: number; // minutes
    updateInterval: number; // minutes
    alertThresholds: {
      significantChange: number; // percentage
      confidenceThreshold: number;
    };
  }, { ctx }) => {
    const startTime = Date.now();
    const endTime = startTime + (payload.monitoringDuration * 60 * 1000);
    
    try {
      ctx.logger.info("Starting real-time trend monitoring", {
        monitoringDuration: payload.monitoringDuration,
        updateInterval: payload.updateInterval,
        alertThresholds: payload.alertThresholds,
        runId: ctx.run.id,
      });

      const updates: any[] = [];
      let lastUpdate = startTime;

      while (Date.now() < endTime) {
        const currentTime = Date.now();
        
        if (currentTime - lastUpdate >= (payload.updateInterval * 60 * 1000)) {
          // Perform trend update check
          const trendUpdate = await predictTrendsTask.trigger({
            predictionType: "policy_trend",
            predictionHorizon: "3 months",
            includeStreamingUpdates: false,
          });

          updates.push({
            timestamp: new Date().toISOString(),
            update: trendUpdate.output,
          });

          ctx.logger.info("Trend monitoring update", {
            updateNumber: updates.length,
            timestamp: new Date().toISOString(),
          });

          lastUpdate = currentTime;
        }

        // Wait before next check
        await new Promise(resolve => setTimeout(resolve, 30000)); // Check every 30 seconds
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed real-time trend monitoring", {
        totalUpdates: updates.length,
        monitoringDuration: payload.monitoringDuration,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        updates,
        metadata: {
          monitoringDuration: payload.monitoringDuration,
          updateInterval: payload.updateInterval,
          totalUpdates: updates.length,
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Real-time trend monitoring failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});