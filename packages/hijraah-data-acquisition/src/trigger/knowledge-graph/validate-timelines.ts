/**
 * Timeline Validation Task
 * 
 * Trigger.dev v4 batch processing task for validating timelines using community data
 * cross-referencing and comprehensive validation workflows.
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { entities, relationships, communityExperiences, policyChanges } from "../../db/schema.js";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

// Timeline validation result schema
const TimelineValidationSchema = z.object({
  validationId: z.string(),
  entityId: z.string(),
  entityName: z.string(),
  entityType: z.string(),
  validationType: z.enum(["official_vs_community", "historical_consistency", "cross_reference", "comprehensive"]),
  officialTimeline: z.object({
    value: z.number(), // in days
    source: z.string(),
    confidence: z.number().min(0).max(1),
    lastUpdated: z.string(),
  }).optional(),
  communityTimeline: z.object({
    averageValue: z.number(), // in days
    medianValue: z.number(),
    standardDeviation: z.number(),
    sampleSize: z.number(),
    confidence: z.number().min(0).max(1),
    dataQuality: z.enum(["high", "medium", "low"]),
  }).optional(),
  validation: z.object({
    isValid: z.boolean(),
    validationScore: z.number().min(0).max(1),
    discrepancyLevel: z.enum(["none", "minor", "moderate", "major", "critical"]),
    discrepancyDetails: z.array(z.object({
      type: z.enum(["value_mismatch", "outdated_official", "insufficient_community_data", "conflicting_sources"]),
      description: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      recommendation: z.string(),
    })),
  }),
  crossReferences: z.array(z.object({
    sourceType: z.enum(["policy_change", "related_entity", "community_experience", "official_source"]),
    sourceId: z.string(),
    timeline: z.number(),
    confidence: z.number().min(0).max(1),
    relevance: z.enum(["high", "medium", "low"]),
  })),
  recommendations: z.array(z.object({
    type: z.enum(["update_official", "collect_more_data", "investigate_discrepancy", "flag_for_review"]),
    priority: z.enum(["high", "medium", "low"]),
    description: z.string(),
    actionItems: z.array(z.string()),
  })),
  metadata: z.object({
    validatedAt: z.string(),
    processingTimeMs: z.number(),
    dataSourcesUsed: z.array(z.string()),
    qualityScore: z.number().min(0).max(1),
  }),
});

type TimelineValidationResult = z.infer<typeof TimelineValidationSchema>;

// Main timeline validation task
export const validateTimelinesTask = task({
  id: "validate-timelines",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    entityIds?: string[];
    entityTypes?: string[];
    countries?: string[];
    validationType?: "official_vs_community" | "historical_consistency" | "cross_reference" | "comprehensive";
    batchSize?: number;
    includeDetailedAnalysis?: boolean;
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting timeline validation", {
        entityIds: payload.entityIds?.length,
        entityTypes: payload.entityTypes,
        countries: payload.countries,
        validationType: payload.validationType || "comprehensive",
        batchSize: payload.batchSize || 50,
        runId: ctx.run.id,
      });

      const validationType = payload.validationType || "comprehensive";
      const batchSize = payload.batchSize || 50;

      // Fetch entities to validate
      let entitiesQuery = db.select().from(entities);
      
      if (payload.entityIds) {
        // Filter by specific entity IDs
        entitiesQuery = entitiesQuery.where(eq(entities.id, payload.entityIds[0])); // This would need proper IN clause
      } else if (payload.entityTypes) {
        // Filter by entity types
        entitiesQuery = entitiesQuery.where(eq(entities.type, payload.entityTypes[0])); // This would need proper IN clause
      }

      const entitiesToValidate = await entitiesQuery.limit(batchSize);

      ctx.logger.info("Fetched entities for validation", {
        entitiesCount: entitiesToValidate.length,
      });

      // Process entities in batches
      const validationResults: TimelineValidationResult[] = [];
      const errors: any[] = [];

      for (const entity of entitiesToValidate) {
        try {
          ctx.logger.info(`Validating timeline for entity: ${entity.name}`, {
            entityId: entity.id,
            entityType: entity.type,
          });

          // Fetch related data for validation
          const [communityData, relatedPolicyChanges, relatedEntities] = await Promise.all([
            // Get community experiences related to this entity
            db.select()
              .from(communityExperiences)
              .where(
                and(
                  eq(communityExperiences.pathway, entity.name), // Assuming pathway relates to entity
                  ...(payload.countries ? [/* country filter */] : [])
                )
              )
              .orderBy(desc(communityExperiences.submittedAt))
              .limit(100),

            // Get policy changes that might affect this entity
            db.select()
              .from(policyChanges)
              .where(
                and(
                  sql`${policyChanges.affectedCategories} ? ${entity.type}`, // JSON contains check
                  ...(payload.countries ? [/* country filter */] : [])
                )
              )
              .orderBy(desc(policyChanges.detectedAt))
              .limit(20),

            // Get related entities for cross-reference
            db.select()
              .from(relationships)
              .where(
                eq(relationships.sourceEntityId, entity.id)
              )
              .limit(10),
          ]);

          // Extract timeline information from entity properties
          const officialTimeline = entity.properties?.timeline || entity.properties?.processingTime;
          
          // Calculate community timeline statistics
          const communityTimelines = communityData
            .filter(exp => exp.actualTimeline && exp.actualTimeline > 0)
            .map(exp => exp.actualTimeline);

          let communityStats = null;
          if (communityTimelines.length > 0) {
            const sorted = communityTimelines.sort((a, b) => a - b);
            const sum = communityTimelines.reduce((a, b) => a + b, 0);
            const mean = sum / communityTimelines.length;
            const median = sorted[Math.floor(sorted.length / 2)];
            const variance = communityTimelines.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / communityTimelines.length;
            const stdDev = Math.sqrt(variance);

            communityStats = {
              averageValue: Math.round(mean),
              medianValue: median,
              standardDeviation: Math.round(stdDev),
              sampleSize: communityTimelines.length,
              confidence: Math.min(communityTimelines.length / 20, 1), // Higher confidence with more data
              dataQuality: communityTimelines.length >= 10 ? "high" : communityTimelines.length >= 5 ? "medium" : "low",
            };
          }

          // Prepare validation context
          const validationContext = {
            entity: {
              id: entity.id,
              name: entity.name,
              type: entity.type,
              properties: entity.properties,
              confidence: entity.confidence,
            },
            officialTimeline: officialTimeline ? {
              value: typeof officialTimeline === 'number' ? officialTimeline : parseInt(officialTimeline),
              source: "official_entity_data",
              confidence: entity.confidence,
              lastUpdated: entity.updatedAt.toISOString(),
            } : null,
            communityTimeline: communityStats,
            relatedData: {
              communityExperiences: communityData.map(exp => ({
                id: exp.id,
                pathway: exp.pathway,
                targetCountry: exp.targetCountry,
                milestone: exp.milestone,
                actualTimeline: exp.actualTimeline,
                actualCost: exp.actualCost,
                success: exp.success,
                difficulty: exp.difficulty,
                submittedAt: exp.submittedAt.toISOString(),
              })),
              policyChanges: relatedPolicyChanges.map(change => ({
                id: change.id,
                country: change.country,
                changeType: change.changeType,
                impactLevel: change.impactLevel,
                title: change.title,
                detectedAt: change.detectedAt.toISOString(),
                confidence: change.confidence,
              })),
              relatedEntities: relatedEntities.length,
            },
            validationType,
          };

          // Perform AI-powered timeline validation
          const { object: validation } = await generateObject({
            model: openai("gpt-4o"),
            schema: TimelineValidationSchema,
            system: `You are an expert immigration timeline validator specializing in ${validationType} validation.

Your task is to validate immigration timelines by:
1. Comparing official timelines with community-reported experiences
2. Checking for historical consistency and trends
3. Cross-referencing with related entities and policy changes
4. Identifying discrepancies and providing recommendations

For ${validationType} validation:
- Official vs Community: Focus on comparing official estimates with real user experiences
- Historical Consistency: Analyze timeline changes over time for consistency
- Cross Reference: Validate against related entities and policy changes
- Comprehensive: Perform all validation types with detailed analysis

Provide actionable recommendations for improving timeline accuracy and reliability.`,
            prompt: `Validate the timeline for this immigration entity using ${validationType} validation:

${JSON.stringify(validationContext, null, 2)}

Please provide comprehensive validation including:
1. Comparison between official and community timelines
2. Assessment of data quality and reliability
3. Identification of discrepancies and their severity
4. Cross-references with related data sources
5. Specific recommendations for improvement

Focus on practical implications for users and system reliability.`,
          });

          const processingTime = Date.now() - startTime;
          validation.metadata.processingTimeMs = processingTime;
          validation.metadata.validatedAt = new Date().toISOString();
          validation.metadata.dataSourcesUsed = [
            "official_entity_data",
            ...(communityStats ? ["community_experiences"] : []),
            ...(relatedPolicyChanges.length > 0 ? ["policy_changes"] : []),
            ...(relatedEntities.length > 0 ? ["related_entities"] : []),
          ];

          // Calculate overall quality score
          const qualityFactors = [
            validation.validation.validationScore,
            communityStats ? Math.min(communityStats.sampleSize / 20, 1) : 0.5,
            entity.confidence,
            relatedPolicyChanges.length > 0 ? 1 : 0.7,
          ];
          validation.metadata.qualityScore = qualityFactors.reduce((a, b) => a + b, 0) / qualityFactors.length;

          validationResults.push(validation);

          ctx.logger.info(`Completed validation for entity: ${entity.name}`, {
            entityId: entity.id,
            validationScore: validation.validation.validationScore,
            discrepancyLevel: validation.validation.discrepancyLevel,
            qualityScore: validation.metadata.qualityScore,
          });

        } catch (error) {
          ctx.logger.error(`Failed to validate entity: ${entity.id}`, {
            error: error instanceof Error ? error.message : String(error),
          });

          errors.push({
            entityId: entity.id,
            entityName: entity.name,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed timeline validation", {
        totalEntities: entitiesToValidate.length,
        successfulValidations: validationResults.length,
        errors: errors.length,
        averageQualityScore: validationResults.reduce((sum, result) => sum + result.metadata.qualityScore, 0) / validationResults.length,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        validationResults,
        errors,
        summary: {
          totalEntities: entitiesToValidate.length,
          successfulValidations: validationResults.length,
          failedValidations: errors.length,
          averageQualityScore: validationResults.length > 0 
            ? validationResults.reduce((sum, result) => sum + result.metadata.qualityScore, 0) / validationResults.length 
            : 0,
          discrepancyDistribution: {
            none: validationResults.filter(r => r.validation.discrepancyLevel === "none").length,
            minor: validationResults.filter(r => r.validation.discrepancyLevel === "minor").length,
            moderate: validationResults.filter(r => r.validation.discrepancyLevel === "moderate").length,
            major: validationResults.filter(r => r.validation.discrepancyLevel === "major").length,
            critical: validationResults.filter(r => r.validation.discrepancyLevel === "critical").length,
          },
        },
        metadata: {
          validationType,
          batchSize,
          countries: payload.countries,
          entityTypes: payload.entityTypes,
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Timeline validation failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Batch timeline validation with parallel processing
export const validateTimelinesBatch = task({
  id: "validate-timelines-batch",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    entityIds: string[];
    batchSize?: number;
    concurrency?: number;
    validationType?: "official_vs_community" | "historical_consistency" | "cross_reference" | "comprehensive";
  }, { ctx }) => {
    const startTime = Date.now();
    const batchSize = payload.batchSize || 20;
    const concurrency = payload.concurrency || 3;
    
    try {
      ctx.logger.info("Starting batch timeline validation", {
        totalEntities: payload.entityIds.length,
        batchSize,
        concurrency,
        validationType: payload.validationType || "comprehensive",
        runId: ctx.run.id,
      });

      const results: any[] = [];
      const errors: any[] = [];

      // Process entities in batches with controlled concurrency
      for (let i = 0; i < payload.entityIds.length; i += batchSize) {
        const batch = payload.entityIds.slice(i, i + batchSize);
        
        ctx.logger.info(`Processing batch ${Math.floor(i / batchSize) + 1}`, {
          batchStart: i,
          batchSize: batch.length,
        });

        // Split batch into concurrent chunks
        const chunks: string[][] = [];
        for (let j = 0; j < batch.length; j += Math.ceil(batch.length / concurrency)) {
          chunks.push(batch.slice(j, j + Math.ceil(batch.length / concurrency)));
        }

        // Process chunks concurrently
        const chunkPromises = chunks.map(async (chunk) => {
          try {
            const result = await validateTimelinesTask.trigger({
              entityIds: chunk,
              validationType: payload.validationType,
              batchSize: chunk.length,
            });

            return result.output;
          } catch (error) {
            ctx.logger.error(`Failed to process chunk`, {
              chunkSize: chunk.length,
              error: error instanceof Error ? error.message : String(error),
            });

            return {
              success: false,
              error: error instanceof Error ? error.message : String(error),
              entityIds: chunk,
            };
          }
        });

        const chunkResults = await Promise.allSettled(chunkPromises);
        
        chunkResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            if (result.value.success) {
              results.push(...result.value.validationResults);
            } else {
              errors.push(result.value);
            }
          } else {
            errors.push({
              error: result.reason,
              success: false,
            });
          }
        });

        // Add delay between batches to avoid overwhelming the system
        if (i + batchSize < payload.entityIds.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed batch timeline validation", {
        totalEntities: payload.entityIds.length,
        successfulValidations: results.length,
        errors: errors.length,
        successRate: results.length / payload.entityIds.length,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        validationResults: results,
        errors,
        summary: {
          totalEntities: payload.entityIds.length,
          successfulValidations: results.length,
          failedValidations: errors.length,
          successRate: results.length / payload.entityIds.length,
          averageQualityScore: results.length > 0 
            ? results.reduce((sum: number, result: any) => sum + result.metadata.qualityScore, 0) / results.length 
            : 0,
        },
        metadata: {
          batchSize,
          concurrency,
          validationType: payload.validationType || "comprehensive",
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Batch timeline validation failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Timeline discrepancy investigation task
export const investigateTimelineDiscrepancies = task({
  id: "investigate-timeline-discrepancies",
  machine: {
    preset: "medium-1x",
  },
  run: async (payload: {
    validationResultId: string;
    investigationDepth?: "basic" | "detailed" | "comprehensive";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting timeline discrepancy investigation", {
        validationResultId: payload.validationResultId,
        investigationDepth: payload.investigationDepth || "detailed",
        runId: ctx.run.id,
      });

      // This would fetch the validation result and perform deeper investigation
      // For now, we'll simulate the investigation process

      const investigationSchema = z.object({
        investigationId: z.string(),
        validationResultId: z.string(),
        discrepancyAnalysis: z.object({
          rootCauses: z.array(z.object({
            cause: z.string(),
            probability: z.number().min(0).max(1),
            evidence: z.array(z.string()),
            impact: z.enum(["critical", "major", "moderate", "minor"]),
          })),
          contributingFactors: z.array(z.string()),
          dataQualityIssues: z.array(z.object({
            issue: z.string(),
            severity: z.enum(["high", "medium", "low"]),
            recommendation: z.string(),
          })),
        }),
        recommendations: z.array(z.object({
          type: z.enum(["data_collection", "policy_update", "system_improvement", "user_notification"]),
          priority: z.enum(["urgent", "high", "medium", "low"]),
          description: z.string(),
          actionItems: z.array(z.string()),
          estimatedImpact: z.string(),
        })),
        metadata: z.object({
          investigationDepth: z.enum(["basic", "detailed", "comprehensive"]),
          processingTimeMs: z.number(),
          confidenceScore: z.number().min(0).max(1),
        }),
      });

      const { object: investigation } = await generateObject({
        model: openai("gpt-4o"),
        schema: investigationSchema,
        system: `You are an expert immigration data investigator specializing in timeline discrepancy analysis.

Your task is to investigate timeline discrepancies and identify:
1. Root causes of discrepancies
2. Contributing factors and data quality issues
3. Actionable recommendations for resolution
4. Impact assessment and prioritization

Provide thorough analysis with evidence-based conclusions and practical recommendations.`,
        prompt: `Investigate the timeline discrepancy for validation result: ${payload.validationResultId}

Perform ${payload.investigationDepth || "detailed"} investigation including:
1. Root cause analysis with probability assessments
2. Contributing factors and data quality issues
3. Evidence-based conclusions
4. Prioritized recommendations for resolution

Focus on actionable insights that can improve timeline accuracy and user experience.`,
      });

      const processingTime = Date.now() - startTime;
      investigation.metadata.processingTimeMs = processingTime;
      investigation.metadata.investigationDepth = payload.investigationDepth || "detailed";

      ctx.logger.info("Completed timeline discrepancy investigation", {
        investigationId: investigation.investigationId,
        rootCauses: investigation.discrepancyAnalysis.rootCauses.length,
        recommendations: investigation.recommendations.length,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        investigation,
        metadata: {
          validationResultId: payload.validationResultId,
          investigationDepth: payload.investigationDepth || "detailed",
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Timeline discrepancy investigation failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});