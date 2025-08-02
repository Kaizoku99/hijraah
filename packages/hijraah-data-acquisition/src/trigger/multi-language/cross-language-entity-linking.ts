/**
 * Cross-Language Entity Linking Tasks
 *
 * Trigger.dev v4 tasks for linking entities across languages using semantic similarity,
 * lexical matching, and translation-based approaches.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, logger } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import {
  CrossLanguageEntityLinkingPayloadSchema,
  CrossLanguageEntityLinkingResultSchema,
  type CrossLanguageEntityLinkingPayload,
  type CrossLanguageEntityLinkingResult,
} from "./types";
import { CrossLanguageEntityLinkingService } from "../../services/CrossLanguageEntityLinkingService";

// Initialize services
const initializeServices = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing required environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const entityLinking = new CrossLanguageEntityLinkingService();

  return { supabase, entityLinking };
};

/**
 * Task: Cross-Language Entity Linking
 *
 * Links entities across different languages using multiple matching approaches.
 */
export const linkEntitiesAcrossLanguages = task({
  id: "link-entities-across-languages",
  name: "Link Entities Across Languages",
  version: "1.0.0",
  machine: "large-2x",
  maxDuration: 3600, // 1 hour
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
    randomize: true,
  },
  run: async (payload: CrossLanguageEntityLinkingPayload, { ctx }) => {
    ctx.logger.info("🔗 Starting cross-language entity linking", {
      entityCount: payload.entities.length,
      linkingOptions: payload.linkingOptions,
    });

    const { supabase, entityLinking } = initializeServices();
    const startTime = Date.now();
    const errors = [];

    try {
      // Perform entity linking
      const linkingResults = await entityLinking.linkEntitiesAcrossLanguages(payload);

      // Validate results
      const validation = entityLinking.validateLinkingResults(
        linkingResults,
        payload.linkingOptions.confidenceThreshold
      );

      if (!validation.isValid) {
        ctx.logger.warn("⚠️ Entity linking validation issues", {
          issues: validation.issues,
          statistics: validation.statistics,
        });
      }

      // Create multilingual knowledge graph nodes
      const knowledgeGraphNodes = [];
      for (const result of linkingResults) {
        try {
          const node = await entityLinking.createMultilingualKnowledgeGraphNode(result);
          knowledgeGraphNodes.push(node);

          // Store in database
          await supabase.from("multilingual_knowledge_graph_nodes").insert({
            entity_id: null, // Will be linked to entity if available
            type: node.type,
            primary_language: node.primaryLanguage,
            labels: node.labels,
            descriptions: node.descriptions,
            properties: {},
            embeddings: {}, // Will be populated with actual embeddings
            confidence: node.confidence,
            sources: [],
          });

          // Store cross-language links
          for (const linkedEntity of result.linkedEntities) {
            await supabase.from("cross_language_entity_links").insert({
              source_entity_id: null, // Will be linked to actual entity IDs
              target_entity_id: null, // Will be linked to actual entity IDs
              source_language: result.sourceEntity.language,
              target_language: linkedEntity.language,
              linking_method: linkedEntity.linkingMethod,
              confidence: linkedEntity.confidence,
              similarity: linkedEntity.similarity,
              translations: linkedEntity.translations,
              metadata: {
                sourceText: result.sourceEntity.text,
                targetText: linkedEntity.text,
                sourceType: result.sourceEntity.type,
                targetType: linkedEntity.type,
              },
            });
          }
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to create knowledge graph node`, {
            sourceEntity: result.sourceEntity,
            error: error.message,
          });

          errors.push({
            entityId: result.sourceEntity.text,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("✅ Cross-language entity linking completed", {
        totalEntities: payload.entities.length,
        linkedEntities: linkingResults.length,
        knowledgeGraphNodes: knowledgeGraphNodes.length,
        statistics: validation.statistics,
        processingTime: `${processingTime}ms`,
      });

      const result: CrossLanguageEntityLinkingResult = {
        success: true,
        results: linkingResults,
        statistics: {
          totalEntities: payload.entities.length,
          linkedEntities: linkingResults.length,
          averageConfidence: validation.statistics.averageConfidence,
          languageCoverage: validation.statistics.languageCoverage,
          linkingMethods: Array.from(
            new Set(
              linkingResults.flatMap(r => 
                r.linkedEntities.map(e => e.linkingMethod)
              )
            )
          ),
        },
        knowledgeGraphNodes,
        errors,
        processingTime,
        timestamp: new Date().toISOString(),
      };

      return result;
    } catch (error: any) {
      ctx.logger.error("❌ Cross-language entity linking failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Task: Build Multilingual Knowledge Graph
 *
 * Builds a comprehensive multilingual knowledge graph from existing entities.
 */
export const buildMultilingualKnowledgeGraph = task({
  id: "build-multilingual-knowledge-graph",
  name: "Build Multilingual Knowledge Graph",
  version: "1.0.0",
  machine: "large-2x",
  maxDuration: 7200, // 2 hours
  run: async (
    payload: {
      languages?: string[];
      entityTypes?: string[];
      confidenceThreshold?: number;
      batchSize?: number;
    },
    { ctx }
  ) => {
    ctx.logger.info("🏗️ Starting multilingual knowledge graph construction", {
      languages: payload.languages,
      entityTypes: payload.entityTypes,
      confidenceThreshold: payload.confidenceThreshold || 0.7,
      batchSize: payload.batchSize || 100,
    });

    const { supabase } = initializeServices();

    try {
      // Get entities from database
      let query = supabase
        .from("entities")
        .select("*")
        .gte("confidence", payload.confidenceThreshold || 0.7);

      if (payload.entityTypes) {
        query = query.in("type", payload.entityTypes);
      }

      const { data: entities, error } = await query.order("created_at", { ascending: true });

      if (error) throw error;

      ctx.logger.info(`📊 Found ${entities.length} entities for knowledge graph construction`);

      // Group entities by language (extract from properties or metadata)
      const entitiesByLanguage: Record<string, any[]> = {};
      const processedEntities = [];

      for (const entity of entities) {
        // Extract language from entity properties or metadata
        const language = entity.properties?.language || 
                        entity.metadata?.language || 
                        "en"; // Default to English

        if (payload.languages && !payload.languages.includes(language)) {
          continue;
        }

        if (!entitiesByLanguage[language]) {
          entitiesByLanguage[language] = [];
        }

        entitiesByLanguage[language].push({
          id: entity.id,
          text: entity.name,
          language,
          type: entity.type,
          confidence: entity.confidence,
          context: entity.properties?.context,
        });

        processedEntities.push({
          id: entity.id,
          text: entity.name,
          language,
          type: entity.type,
          confidence: entity.confidence,
          context: entity.properties?.context,
        });
      }

      ctx.logger.info("🌐 Language distribution", {
        languages: Object.keys(entitiesByLanguage),
        counts: Object.fromEntries(
          Object.entries(entitiesByLanguage).map(([lang, ents]) => [lang, ents.length])
        ),
      });

      // Process entities in batches
      const results = [];
      const batchSize = payload.batchSize || 100;

      for (let i = 0; i < processedEntities.length; i += batchSize) {
        const batch = processedEntities.slice(i, i + batchSize);
        
        ctx.logger.info(
          `🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(processedEntities.length / batchSize)}`
        );

        try {
          const batchResult = await ctx.waitFor("link-entities-across-languages", {
            entities: batch,
            linkingOptions: {
              useSemanticSimilarity: true,
              useLexicalMatching: true,
              useTranslationMatching: true,
              confidenceThreshold: payload.confidenceThreshold || 0.7,
              maxCandidates: 5,
            },
          });

          results.push(batchResult);
        } catch (error: any) {
          ctx.logger.error(`❌ Batch processing failed`, {
            batchIndex: Math.floor(i / batchSize) + 1,
            error: error.message,
          });
        }

        // Add delay between batches
        if (i + batchSize < processedEntities.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Aggregate results
      const totalLinkedEntities = results.reduce((sum, r) => sum + r.statistics.linkedEntities, 0);
      const totalKnowledgeGraphNodes = results.reduce((sum, r) => sum + r.knowledgeGraphNodes.length, 0);
      const averageConfidence = results.reduce((sum, r) => sum + r.statistics.averageConfidence, 0) / results.length;

      ctx.logger.info("✅ Multilingual knowledge graph construction completed", {
        totalEntities: processedEntities.length,
        totalLinkedEntities,
        totalKnowledgeGraphNodes,
        averageConfidence,
        languagesProcessed: Object.keys(entitiesByLanguage).length,
        batchesProcessed: results.length,
      });

      return {
        success: true,
        totalEntities: processedEntities.length,
        totalLinkedEntities,
        totalKnowledgeGraphNodes,
        averageConfidence,
        languagesProcessed: Object.keys(entitiesByLanguage).length,
        languageDistribution: Object.fromEntries(
          Object.entries(entitiesByLanguage).map(([lang, ents]) => [lang, ents.length])
        ),
        results,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Multilingual knowledge graph construction failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Task: Update Cross-Language Links
 *
 * Updates existing cross-language entity links with improved algorithms.
 */
export const updateCrossLanguageLinks = task({
  id: "update-cross-language-links",
  name: "Update Cross-Language Links",
  version: "1.0.0",
  machine: "medium-2x",
  maxDuration: 1800, // 30 minutes
  run: async (
    payload: {
      linkIds?: string[];
      confidenceThreshold?: number;
      improvementThreshold?: number;
    },
    { ctx }
  ) => {
    ctx.logger.info("🔄 Starting cross-language link updates", {
      linkIds: payload.linkIds?.length,
      confidenceThreshold: payload.confidenceThreshold || 0.7,
      improvementThreshold: payload.improvementThreshold || 0.1,
    });

    const { supabase, entityLinking } = initializeServices();

    try {
      // Get existing links to update
      let query = supabase
        .from("cross_language_entity_links")
        .select("*");

      if (payload.linkIds) {
        query = query.in("id", payload.linkIds);
      } else {
        // Update links with low confidence
        query = query.lt("confidence", payload.confidenceThreshold || 0.7);
      }

      const { data: existingLinks, error } = await query.order("created_at", { ascending: true });

      if (error) throw error;

      ctx.logger.info(`📊 Found ${existingLinks.length} links to update`);

      let updatedLinks = 0;
      let improvedLinks = 0;

      for (const link of existingLinks) {
        try {
          // Re-evaluate the link with current algorithms
          const sourceEntity = {
            id: link.source_entity_id,
            text: link.metadata?.sourceText || "",
            language: link.source_language,
            type: link.metadata?.sourceType || "unknown",
            confidence: 1.0,
          };

          const targetEntity = {
            id: link.target_entity_id,
            text: link.metadata?.targetText || "",
            language: link.target_language,
            type: link.metadata?.targetType || "unknown",
            confidence: 1.0,
          };

          // Re-link with current algorithms
          const newLinkingResults = await entityLinking.linkEntitiesAcrossLanguages({
            entities: [sourceEntity, targetEntity],
            linkingOptions: {
              useSemanticSimilarity: true,
              useLexicalMatching: true,
              useTranslationMatching: true,
              confidenceThreshold: 0.5, // Lower threshold for re-evaluation
              maxCandidates: 1,
            },
          });

          if (newLinkingResults.length > 0 && newLinkingResults[0].linkedEntities.length > 0) {
            const newLink = newLinkingResults[0].linkedEntities[0];
            const confidenceImprovement = newLink.confidence - link.confidence;

            if (confidenceImprovement >= (payload.improvementThreshold || 0.1)) {
              // Update the link with improved confidence
              await supabase
                .from("cross_language_entity_links")
                .update({
                  confidence: newLink.confidence,
                  similarity: newLink.similarity,
                  linking_method: newLink.linkingMethod,
                  translations: newLink.translations,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", link.id);

              improvedLinks++;
              ctx.logger.info(`✅ Improved link confidence`, {
                linkId: link.id,
                oldConfidence: link.confidence,
                newConfidence: newLink.confidence,
                improvement: confidenceImprovement,
              });
            }

            updatedLinks++;
          }
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to update link ${link.id}`, {
            error: error.message,
          });
        }
      }

      ctx.logger.info("✅ Cross-language link updates completed", {
        totalLinks: existingLinks.length,
        updatedLinks,
        improvedLinks,
        improvementRate: existingLinks.length > 0 ? improvedLinks / existingLinks.length : 0,
      });

      return {
        success: true,
        totalLinks: existingLinks.length,
        updatedLinks,
        improvedLinks,
        improvementRate: existingLinks.length > 0 ? improvedLinks / existingLinks.length : 0,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Cross-language link updates failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Scheduled Task: Weekly Knowledge Graph Maintenance
 *
 * Performs weekly maintenance of the multilingual knowledge graph.
 */
export const weeklyKnowledgeGraphMaintenance = schedules.task({
  id: "weekly-knowledge-graph-maintenance",
  name: "Weekly Knowledge Graph Maintenance",
  version: "1.0.0",
  cron: "0 4 * * 0", // Weekly on Sunday at 4 AM UTC
  timezone: "UTC",
  machine: "large-2x",
  maxDuration: 10800, // 3 hours
  run: async (payload, { ctx }) => {
    ctx.logger.info("🔧 Starting weekly knowledge graph maintenance");

    try {
      // Step 1: Update low-confidence cross-language links
      ctx.logger.info("🔄 Updating low-confidence links");
      const linkUpdateResult = await ctx.waitFor("update-cross-language-links", {
        confidenceThreshold: 0.7,
        improvementThreshold: 0.1,
      });

      // Step 2: Build knowledge graph for new entities
      ctx.logger.info("🏗️ Building knowledge graph for new entities");
      const kgBuildResult = await ctx.waitFor("build-multilingual-knowledge-graph", {
        confidenceThreshold: 0.8,
        batchSize: 50,
      });

      // Step 3: Clean up orphaned links
      ctx.logger.info("🧹 Cleaning up orphaned links");
      const { supabase } = initializeServices();
      
      const { data: orphanedLinks } = await supabase
        .from("cross_language_entity_links")
        .select("id")
        .is("source_entity_id", null)
        .or("target_entity_id.is.null");

      if (orphanedLinks && orphanedLinks.length > 0) {
        await supabase
          .from("cross_language_entity_links")
          .delete()
          .in("id", orphanedLinks.map(l => l.id));

        ctx.logger.info(`🗑️ Cleaned up ${orphanedLinks.length} orphaned links`);
      }

      ctx.logger.info("✅ Weekly knowledge graph maintenance completed", {
        linkUpdates: {
          totalLinks: linkUpdateResult.totalLinks,
          improvedLinks: linkUpdateResult.improvedLinks,
        },
        knowledgeGraph: {
          totalEntities: kgBuildResult.totalEntities,
          linkedEntities: kgBuildResult.totalLinkedEntities,
          languagesProcessed: kgBuildResult.languagesProcessed,
        },
        cleanup: {
          orphanedLinksRemoved: orphanedLinks?.length || 0,
        },
      });

      return {
        success: true,
        linkUpdateResult,
        kgBuildResult,
        orphanedLinksRemoved: orphanedLinks?.length || 0,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Weekly knowledge graph maintenance failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const crossLanguageEntityLinkingTasks = {
  linkEntitiesAcrossLanguages,
  buildMultilingualKnowledgeGraph,
  updateCrossLanguageLinks,
  weeklyKnowledgeGraphMaintenance,
};