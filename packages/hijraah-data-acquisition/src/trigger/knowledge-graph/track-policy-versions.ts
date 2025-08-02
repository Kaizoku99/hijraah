/**
 * Policy Version Tracking Task
 * 
 * Trigger.dev v4 event-driven task for tracking policy versions and changes
 * using AI SDK's generateObject with policy change analysis.
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "../../db/connection.js";
import { policyChanges, entities, relationships } from "../../db/schema.js";
import { eq, and, desc } from "drizzle-orm";

// Policy version tracking schema
const PolicyVersionTrackingSchema = z.object({
  versionId: z.string(),
  sourceId: z.string(),
  country: z.string(),
  policyType: z.string(),
  versionNumber: z.string(),
  changes: z.array(z.object({
    type: z.enum(["addition", "modification", "removal", "clarification"]),
    section: z.string(),
    description: z.string(),
    impact: z.enum(["critical", "major", "moderate", "minor"]),
    affectedEntities: z.array(z.string()),
    previousValue: z.string().optional(),
    newValue: z.string().optional(),
    confidence: z.number().min(0).max(1),
  })),
  relationships: z.array(z.object({
    type: z.enum(["supersedes", "amends", "clarifies", "extends"]),
    targetVersionId: z.string(),
    description: z.string(),
    confidence: z.number().min(0).max(1),
  })),
  timeline: z.object({
    detectedAt: z.string(),
    effectiveDate: z.string().optional(),
    publishedDate: z.string().optional(),
    lastModified: z.string().optional(),
  }),
  metadata: z.object({
    sourceUrl: z.string(),
    documentHash: z.string().optional(),
    processingTimeMs: z.number(),
    analysisDepth: z.enum(["basic", "detailed", "comprehensive"]),
    qualityScore: z.number().min(0).max(1),
  }),
});

type PolicyVersionTrackingResult = z.infer<typeof PolicyVersionTrackingSchema>;

// Event-driven task for policy change tracking
export const trackPolicyVersionsTask = task({
  id: "track-policy-versions",
  machine: {
    preset: "medium-1x",
  },
  run: async (payload: {
    policyChangeId: string;
    sourceId: string;
    country: string;
    changeType: string;
    analysisDepth?: "basic" | "detailed" | "comprehensive";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting policy version tracking", {
        policyChangeId: payload.policyChangeId,
        sourceId: payload.sourceId,
        country: payload.country,
        changeType: payload.changeType,
        runId: ctx.run.id,
      });

      const analysisDepth = payload.analysisDepth || "detailed";

      // Fetch the current policy change
      const [currentChange] = await db.select()
        .from(policyChanges)
        .where(eq(policyChanges.id, payload.policyChangeId))
        .limit(1);

      if (!currentChange) {
        throw new Error(`Policy change not found: ${payload.policyChangeId}`);
      }

      // Fetch related policy changes for version tracking
      const relatedChanges = await db.select()
        .from(policyChanges)
        .where(
          and(
            eq(policyChanges.sourceId, payload.sourceId),
            eq(policyChanges.country, payload.country)
          )
        )
        .orderBy(desc(policyChanges.detectedAt))
        .limit(10); // Get last 10 changes for context

      // Fetch related entities that might be affected
      const relatedEntities = await db.select()
        .from(entities)
        .where(eq(entities.type, "requirement")) // Focus on requirements
        .limit(50);

      ctx.logger.info("Fetched policy context", {
        currentChange: currentChange.id,
        relatedChanges: relatedChanges.length,
        relatedEntities: relatedEntities.length,
      });

      // Prepare context for AI analysis
      const policyContext = {
        currentChange: {
          id: currentChange.id,
          title: currentChange.title,
          description: currentChange.description,
          changeType: currentChange.changeType,
          impactLevel: currentChange.impactLevel,
          effectiveDate: currentChange.effectiveDate?.toISOString(),
          detectedAt: currentChange.detectedAt.toISOString(),
          affectedCategories: currentChange.affectedCategories,
          sourceUrl: currentChange.sourceUrl,
          confidence: currentChange.confidence,
        },
        relatedChanges: relatedChanges.map(change => ({
          id: change.id,
          title: change.title,
          description: change.description,
          changeType: change.changeType,
          impactLevel: change.impactLevel,
          effectiveDate: change.effectiveDate?.toISOString(),
          detectedAt: change.detectedAt.toISOString(),
          confidence: change.confidence,
        })),
        relatedEntities: relatedEntities.map(entity => ({
          id: entity.id,
          name: entity.name,
          type: entity.type,
          properties: entity.properties,
          confidence: entity.confidence,
        })),
        analysisDepth,
        country: payload.country,
        sourceId: payload.sourceId,
      };

      // Perform AI-powered policy version analysis
      const { object: versionTracking } = await generateObject({
        model: openai("gpt-4o"),
        schema: PolicyVersionTrackingSchema,
        system: `You are an expert immigration policy analyst specializing in policy version tracking and change management.

Your task is to analyze policy changes and track their versions, relationships, and impacts:

1. Identify the specific changes made in this policy version
2. Determine relationships to previous policy versions
3. Analyze the impact on immigration requirements and processes
4. Track the evolution of policy over time
5. Identify affected entities and their relationships

For ${analysisDepth} analysis:
- Basic: Focus on major changes and direct impacts
- Detailed: Include comprehensive change analysis and entity relationships
- Comprehensive: Deep analysis with complex relationships and indirect impacts

Provide structured version tracking information that can be used for:
- Policy evolution monitoring
- Impact assessment
- Compliance tracking
- User notification systems`,
        prompt: `Analyze the following policy change and track its version information:

${JSON.stringify(policyContext, null, 2)}

Please provide comprehensive version tracking including:
1. Detailed change analysis with specific modifications
2. Relationships to previous policy versions
3. Impact assessment on immigration entities
4. Timeline information and effective dates
5. Quality assessment of the analysis

Focus on creating a clear version history and understanding how this change fits into the broader policy evolution.`,
      });

      const processingTime = Date.now() - startTime;

      // Update metadata
      versionTracking.metadata.processingTimeMs = processingTime;
      versionTracking.metadata.analysisDepth = analysisDepth;

      // Calculate quality score based on confidence and completeness
      const avgConfidence = versionTracking.changes.reduce((sum, change) => sum + change.confidence, 0) / versionTracking.changes.length;
      const completenessScore = Math.min(versionTracking.changes.length / 5, 1); // Normalize based on expected changes
      versionTracking.metadata.qualityScore = (avgConfidence + completenessScore) / 2;

      ctx.logger.info("Completed policy version tracking", {
        versionId: versionTracking.versionId,
        changesTracked: versionTracking.changes.length,
        relationshipsIdentified: versionTracking.relationships.length,
        qualityScore: versionTracking.metadata.qualityScore,
        processingTimeMs: processingTime,
      });

      // Store version tracking results
      // This could be stored in a dedicated policy_versions table
      // For now, we'll return the results for further processing

      return {
        success: true,
        versionTracking,
        metadata: {
          policyChangeId: payload.policyChangeId,
          sourceId: payload.sourceId,
          country: payload.country,
          analysisDepth,
          processingTimeMs: processingTime,
          qualityScore: versionTracking.metadata.qualityScore,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Policy version tracking failed", {
        policyChangeId: payload.policyChangeId,
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Batch policy version tracking task
export const trackPolicyVersionsBatch = task({
  id: "track-policy-versions-batch",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    policyChangeIds: string[];
    batchSize?: number;
    analysisDepth?: "basic" | "detailed" | "comprehensive";
  }, { ctx }) => {
    const startTime = Date.now();
    const batchSize = payload.batchSize || 10;
    const analysisDepth = payload.analysisDepth || "detailed";
    
    try {
      ctx.logger.info("Starting batch policy version tracking", {
        totalPolicies: payload.policyChangeIds.length,
        batchSize,
        analysisDepth,
        runId: ctx.run.id,
      });

      const results: any[] = [];
      const errors: any[] = [];

      // Process in batches to avoid overwhelming the system
      for (let i = 0; i < payload.policyChangeIds.length; i += batchSize) {
        const batch = payload.policyChangeIds.slice(i, i + batchSize);
        
        ctx.logger.info(`Processing batch ${Math.floor(i / batchSize) + 1}`, {
          batchStart: i,
          batchSize: batch.length,
        });

        // Fetch policy changes for this batch
        const batchChanges = await db.select()
          .from(policyChanges)
          .where(eq(policyChanges.id, batch[0])) // This would need proper IN clause
          .limit(batchSize);

        // Process each policy change in the batch
        const batchPromises = batchChanges.map(async (change) => {
          try {
            // Call the individual tracking task
            const result = await trackPolicyVersionsTask.trigger({
              policyChangeId: change.id,
              sourceId: change.sourceId,
              country: change.country,
              changeType: change.changeType,
              analysisDepth,
            });

            return {
              policyChangeId: change.id,
              success: true,
              result,
            };
          } catch (error) {
            ctx.logger.error(`Failed to track policy version: ${change.id}`, {
              error: error instanceof Error ? error.message : String(error),
            });

            return {
              policyChangeId: change.id,
              success: false,
              error: error instanceof Error ? error.message : String(error),
            };
          }
        });

        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            if (result.value.success) {
              results.push(result.value);
            } else {
              errors.push(result.value);
            }
          } else {
            errors.push({
              policyChangeId: batch[index],
              success: false,
              error: result.reason,
            });
          }
        });

        // Add delay between batches to avoid rate limiting
        if (i + batchSize < payload.policyChangeIds.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed batch policy version tracking", {
        totalProcessed: results.length,
        totalErrors: errors.length,
        successRate: results.length / payload.policyChangeIds.length,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        results,
        errors,
        metadata: {
          totalPolicies: payload.policyChangeIds.length,
          successfullyProcessed: results.length,
          failed: errors.length,
          successRate: results.length / payload.policyChangeIds.length,
          batchSize,
          analysisDepth,
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Batch policy version tracking failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Policy version comparison task
export const comparePolicyVersions = task({
  id: "compare-policy-versions",
  machine: {
    preset: "medium-1x",
  },
  run: async (payload: {
    sourceVersionId: string;
    targetVersionId: string;
    comparisonType?: "detailed" | "summary";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting policy version comparison", {
        sourceVersionId: payload.sourceVersionId,
        targetVersionId: payload.targetVersionId,
        comparisonType: payload.comparisonType || "detailed",
        runId: ctx.run.id,
      });

      // Fetch both policy versions
      const [sourcePolicy, targetPolicy] = await Promise.all([
        db.select()
          .from(policyChanges)
          .where(eq(policyChanges.id, payload.sourceVersionId))
          .limit(1),
        db.select()
          .from(policyChanges)
          .where(eq(policyChanges.id, payload.targetVersionId))
          .limit(1),
      ]);

      if (!sourcePolicy[0] || !targetPolicy[0]) {
        throw new Error("One or both policy versions not found");
      }

      // Perform AI-powered comparison
      const comparisonSchema = z.object({
        comparisonId: z.string(),
        sourceVersion: z.string(),
        targetVersion: z.string(),
        differences: z.array(z.object({
          type: z.enum(["addition", "removal", "modification", "restructure"]),
          section: z.string(),
          description: z.string(),
          impact: z.enum(["critical", "major", "moderate", "minor"]),
          details: z.string(),
        })),
        similarities: z.array(z.object({
          section: z.string(),
          description: z.string(),
        })),
        summary: z.object({
          overallChange: z.enum(["major", "moderate", "minor", "cosmetic"]),
          keyChanges: z.array(z.string()),
          recommendations: z.array(z.string()),
        }),
        metadata: z.object({
          comparisonType: z.enum(["detailed", "summary"]),
          processingTimeMs: z.number(),
          confidenceScore: z.number().min(0).max(1),
        }),
      });

      const { object: comparison } = await generateObject({
        model: openai("gpt-4o"),
        schema: comparisonSchema,
        system: `You are an expert policy analyst specializing in comparing different versions of immigration policies.

Analyze the differences and similarities between two policy versions and provide:
1. Detailed breakdown of all changes
2. Impact assessment for each change
3. Summary of overall changes
4. Recommendations for stakeholders

Focus on practical implications for immigration applicants and practitioners.`,
        prompt: `Compare these two policy versions:

Source Policy (${payload.sourceVersionId}):
${JSON.stringify(sourcePolicy[0], null, 2)}

Target Policy (${payload.targetVersionId}):
${JSON.stringify(targetPolicy[0], null, 2)}

Provide a ${payload.comparisonType || "detailed"} comparison focusing on practical differences and their implications.`,
      });

      const processingTime = Date.now() - startTime;
      comparison.metadata.processingTimeMs = processingTime;
      comparison.metadata.comparisonType = payload.comparisonType || "detailed";

      ctx.logger.info("Completed policy version comparison", {
        differences: comparison.differences.length,
        similarities: comparison.similarities.length,
        overallChange: comparison.summary.overallChange,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        comparison,
        metadata: {
          sourceVersionId: payload.sourceVersionId,
          targetVersionId: payload.targetVersionId,
          comparisonType: payload.comparisonType || "detailed",
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Policy version comparison failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});