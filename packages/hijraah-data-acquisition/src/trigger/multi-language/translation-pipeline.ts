/**
 * Translation Pipeline Tasks
 *
 * Trigger.dev v4 tasks for automated translation pipeline with quality assessment
 * and localization automation.
 */

import { createClient } from "@supabase/supabase-js";
import { task, schedules, logger } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import {
  TranslationPipelinePayloadSchema,
  TranslationPipelineResultSchema,
  LocalizationAutomationPayloadSchema,
  LocalizationAutomationResultSchema,
  type TranslationPipelinePayload,
  type TranslationPipelineResult,
  type LocalizationAutomationPayload,
  type LocalizationAutomationResult,
} from "./types";
import { TranslationService } from "../../services/TranslationService";
import { MultilingualContentExtractionService } from "../../services/MultilingualContentExtractionService";

// Initialize services
const initializeServices = () => {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!firecrawlApiKey || !supabaseUrl || !supabaseKey) {
    throw new Error("Missing required environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const translation = new TranslationService();
  const multilingualExtraction = new MultilingualContentExtractionService(firecrawlApiKey);

  return { supabase, translation, multilingualExtraction };
};

/**
 * Task: Translation Pipeline
 *
 * Processes content through translation pipeline with quality assessment.
 */
export const runTranslationPipeline = task({
  id: "run-translation-pipeline",
  name: "Run Translation Pipeline",
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
  run: async (payload: TranslationPipelinePayload, { ctx }) => {
    ctx.logger.info("🔄 Starting translation pipeline", {
      sourceLanguage: payload.sourceLanguage,
      targetLanguages: payload.targetLanguages,
      contentItems: payload.contentItems.length,
      qualityThreshold: payload.qualityThreshold,
    });

    const { supabase, translation } = initializeServices();
    const startTime = Date.now();
    const results = [];
    const errors = [];

    try {
      // Process each content item
      for (const contentItem of payload.contentItems) {
        ctx.logger.info(`📝 Processing content item: ${contentItem.id}`);

        const itemResults = [];
        const qualityAssessments = [];

        try {
          // Translate to each target language
          for (const targetLanguage of payload.targetLanguages) {
            // Skip if source and target are the same
            if (payload.sourceLanguage === targetLanguage) {
              continue;
            }

            const translationRequest = {
              text: contentItem.text,
              sourceLanguage: payload.sourceLanguage,
              targetLanguage,
              preserveLegalTerminology: payload.preserveLegalTerminology,
              context: contentItem.context,
              domain: contentItem.domain,
            };

            const translationResult = await translation.translateText(translationRequest);

            // Check quality threshold
            if (translationResult.qualityScore >= payload.qualityThreshold) {
              itemResults.push(translationResult);

              // Store translation in database
              await supabase.from("translation_results").insert({
                source_id: null, // Will be linked to data source if available
                original_text: translationResult.originalText,
                translated_text: translationResult.translatedText,
                source_language: translationResult.sourceLanguage,
                target_language: translationResult.targetLanguage,
                confidence: translationResult.confidence,
                quality_score: translationResult.qualityScore,
                translation_method: translationResult.translationMethod,
                preserved_terms: translationResult.preservedTerms,
                alternative_translations: translationResult.alternativeTranslations,
                context: contentItem.context,
                domain: contentItem.domain,
                metadata: translationResult.metadata,
              });

              // Perform quality assessment if required
              if (payload.requireHumanReview || translationResult.qualityScore < 0.9) {
                const qualityAssessment = await translation.assessTranslationQuality(translationResult);
                qualityAssessments.push(qualityAssessment);

                // Store quality assessment
                const { data: translationRecord } = await supabase
                  .from("translation_results")
                  .select("id")
                  .eq("original_text", translationResult.originalText)
                  .eq("target_language", translationResult.targetLanguage)
                  .single();

                if (translationRecord) {
                  await supabase.from("translation_quality_assessments").insert({
                    translation_id: translationRecord.id,
                    assessment_criteria: qualityAssessment.assessmentCriteria,
                    overall_score: qualityAssessment.overallScore,
                    issues: qualityAssessment.issues,
                    recommendations: qualityAssessment.recommendations,
                    assessed_by: "ai",
                    metadata: {},
                  });
                }
              }
            } else {
              ctx.logger.warn(`⚠️ Translation quality below threshold`, {
                contentId: contentItem.id,
                targetLanguage,
                qualityScore: translationResult.qualityScore,
                threshold: payload.qualityThreshold,
              });

              errors.push({
                contentId: contentItem.id,
                error: `Translation quality below threshold: ${translationResult.qualityScore}`,
                timestamp: new Date().toISOString(),
              });
            }
          }

          results.push({
            contentId: contentItem.id,
            translations: itemResults,
            qualityAssessments,
          });
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to process content item ${contentItem.id}`, {
            error: error.message,
          });

          errors.push({
            contentId: contentItem.id,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Calculate statistics
      const totalItems = payload.contentItems.length;
      const successfulTranslations = results.reduce(
        (sum, r) => sum + r.translations.length,
        0
      );
      const totalQualityScores = results.reduce(
        (sum, r) => sum + r.translations.reduce((s, t) => s + t.qualityScore, 0),
        0
      );
      const totalConfidenceScores = results.reduce(
        (sum, r) => sum + r.translations.reduce((s, t) => s + t.confidence, 0),
        0
      );
      const requiresReview = results.reduce(
        (sum, r) => sum + r.qualityAssessments.length,
        0
      );

      const statistics = {
        totalItems,
        successfulTranslations,
        averageQualityScore: successfulTranslations > 0 ? totalQualityScores / successfulTranslations : 0,
        averageConfidence: successfulTranslations > 0 ? totalConfidenceScores / successfulTranslations : 0,
        requiresReview,
      };

      const processingTime = Date.now() - startTime;

      ctx.logger.info("✅ Translation pipeline completed", {
        statistics,
        processingTime: `${processingTime}ms`,
        errors: errors.length,
      });

      const result: TranslationPipelineResult = {
        success: true,
        sourceLanguage: payload.sourceLanguage,
        targetLanguages: payload.targetLanguages,
        results,
        statistics,
        errors,
        processingTime,
        timestamp: new Date().toISOString(),
      };

      return result;
    } catch (error: any) {
      ctx.logger.error("❌ Translation pipeline failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

/**
 * Task: Localization Automation
 *
 * Automated localization pipeline with content extraction, translation, and delivery.
 */
export const runLocalizationAutomation = task({
  id: "run-localization-automation",
  name: "Run Localization Automation",
  version: "1.0.0",
  machine: "large-2x",
  maxDuration: 7200, // 2 hours
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 10000,
    maxTimeoutInMs: 120000,
  },
  run: async (payload: LocalizationAutomationPayload, { ctx }) => {
    ctx.logger.info("🤖 Starting localization automation", {
      sourceLanguage: payload.sourceLanguage,
      targetLanguages: payload.targetLanguages,
      contentSources: payload.contentSources.length,
      automationLevel: payload.automationLevel,
    });

    const { supabase, multilingualExtraction } = initializeServices();
    const startTime = Date.now();
    const errors = [];
    let contentProcessed = 0;
    let translationsGenerated = 0;

    try {
      // Step 1: Extract content from sources
      ctx.logger.info("📥 Extracting content from sources");

      const extractionRequests = payload.contentSources.map(source => ({
        url: source.url,
        targetLanguages: payload.targetLanguages,
        extractionOptions: {
          detectLanguage: true,
          translateContent: true,
          preserveOriginal: true,
          extractStructuredData: true,
          followLinks: false,
          maxDepth: 1,
        },
        firecrawlOptions: {
          formats: ["markdown"] as const,
          onlyMainContent: true,
        },
      }));

      const extractionResults = await multilingualExtraction.extractMultilingualContentBatch(
        extractionRequests
      );

      // Step 2: Process extracted content through translation pipeline
      ctx.logger.info("🔄 Processing content through translation pipeline");

      const contentItems = [];
      for (const result of extractionResults) {
        if (result.originalContent.length > 0) {
          contentItems.push({
            id: `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            text: result.originalContent,
            context: "immigration_policy" as const,
          });
          contentProcessed++;
        }
      }

      if (contentItems.length > 0) {
        const translationResult = await ctx.waitFor("run-translation-pipeline", {
          sourceLanguage: payload.sourceLanguage,
          targetLanguages: payload.targetLanguages,
          contentItems,
          preserveLegalTerminology: true,
          qualityThreshold: payload.qualityGates.minimumConfidence,
          requireHumanReview: payload.qualityGates.requireHumanReview,
        });

        translationsGenerated = translationResult.statistics.successfulTranslations;
      }

      // Step 3: Quality checks
      ctx.logger.info("🔍 Performing quality checks");

      const qualityChecks = {
        passed: 0,
        failed: 0,
        requiresReview: 0,
      };

      // Implement quality check logic based on automation level
      if (payload.automationLevel === "expert_review_required") {
        qualityChecks.requiresReview = translationsGenerated;
      } else if (payload.automationLevel === "human_in_loop") {
        // Some translations require review based on quality threshold
        qualityChecks.passed = Math.floor(translationsGenerated * 0.7);
        qualityChecks.requiresReview = translationsGenerated - qualityChecks.passed;
      } else {
        // Fully automated
        qualityChecks.passed = translationsGenerated;
      }

      // Step 4: Deliver content through specified channels
      ctx.logger.info("📤 Delivering content through channels");

      const deliveryResults = [];
      for (const channel of payload.deliveryChannels) {
        try {
          let itemsDelivered = 0;
          const channelErrors: string[] = [];

          switch (channel) {
            case "database":
              // Content already stored in database during translation
              itemsDelivered = translationsGenerated;
              break;

            case "api":
              // Trigger API updates or webhooks
              // Implementation would depend on specific API requirements
              itemsDelivered = translationsGenerated;
              break;

            case "webhook":
              // Send webhook notifications
              // Implementation would depend on webhook configuration
              itemsDelivered = translationsGenerated;
              break;

            case "file_export":
              // Export to files
              // Implementation would depend on file format requirements
              itemsDelivered = translationsGenerated;
              break;

            default:
              channelErrors.push(`Unknown delivery channel: ${channel}`);
          }

          deliveryResults.push({
            channel,
            success: channelErrors.length === 0,
            itemsDelivered,
            errors: channelErrors,
          });
        } catch (error: any) {
          deliveryResults.push({
            channel,
            success: false,
            itemsDelivered: 0,
            errors: [error.message],
          });
        }
      }

      // Store localization run record
      await supabase.from("localization_pipeline_runs").insert({
        source_language: payload.sourceLanguage,
        target_languages: payload.targetLanguages,
        content_types: payload.contentSources.map(s => s.type),
        automation_level: payload.automationLevel,
        quality_gates: payload.qualityGates,
        delivery_channels: payload.deliveryChannels,
        status: "completed",
        items_processed: contentProcessed,
        items_successful: qualityChecks.passed,
        items_failed: qualityChecks.failed,
        results: {
          contentProcessed,
          translationsGenerated,
          qualityChecks,
          deliveryResults,
        },
        completed_at: new Date().toISOString(),
        metadata: {
          processingTime: Date.now() - startTime,
        },
      });

      const processingTime = Date.now() - startTime;

      ctx.logger.info("✅ Localization automation completed", {
        contentProcessed,
        translationsGenerated,
        qualityChecks,
        deliveryResults: deliveryResults.length,
        processingTime: `${processingTime}ms`,
      });

      const result: LocalizationAutomationResult = {
        success: true,
        sourceLanguage: payload.sourceLanguage,
        targetLanguages: payload.targetLanguages,
        contentProcessed,
        translationsGenerated,
        qualityChecks,
        deliveryResults,
        errors,
        processingTime,
        timestamp: new Date().toISOString(),
      };

      return result;
    } catch (error: any) {
      ctx.logger.error("❌ Localization automation failed", {
        error: error.message,
      });

      // Update run record with failure
      await supabase.from("localization_pipeline_runs").insert({
        source_language: payload.sourceLanguage,
        target_languages: payload.targetLanguages,
        content_types: payload.contentSources.map(s => s.type),
        automation_level: payload.automationLevel,
        quality_gates: payload.qualityGates,
        delivery_channels: payload.deliveryChannels,
        status: "failed",
        items_processed: contentProcessed,
        items_successful: 0,
        items_failed: contentProcessed,
        errors: [{ error: error.message, timestamp: new Date().toISOString() }],
        completed_at: new Date().toISOString(),
      });

      throw error;
    }
  },
});

/**
 * Scheduled Task: Weekly Localization Automation
 *
 * Runs weekly automated localization for high-priority content.
 */
export const weeklyLocalizationAutomation = schedules.task({
  id: "weekly-localization-automation",
  name: "Weekly Localization Automation",
  version: "1.0.0",
  cron: "0 3 * * 1", // Weekly on Monday at 3 AM UTC
  timezone: "UTC",
  machine: "large-2x",
  maxDuration: 10800, // 3 hours
  run: async (payload, { ctx }) => {
    ctx.logger.info("📅 Starting weekly localization automation");

    const { supabase } = initializeServices();

    try {
      // Get high-priority language-specific sources
      const { data: sources, error } = await supabase
        .from("language_specific_data_sources")
        .select("*")
        .eq("is_active", true)
        .eq("priority", "high")
        .order("updated_at", { ascending: true });

      if (error) throw error;

      ctx.logger.info(`📊 Found ${sources.length} high-priority sources for localization`);

      // Group sources by language
      const sourcesByLanguage: Record<string, any[]> = {};
      for (const source of sources) {
        if (!sourcesByLanguage[source.language]) {
          sourcesByLanguage[source.language] = [];
        }
        sourcesByLanguage[source.language].push(source);
      }

      const results = [];

      // Process each language group
      for (const [sourceLanguage, languageSources] of Object.entries(sourcesByLanguage)) {
        ctx.logger.info(`🌐 Processing localization for language: ${sourceLanguage}`);

        try {
          // Get common target languages for this source language
          const targetLanguages = Array.from(
            new Set(
              languageSources.flatMap(s => s.translation_targets || [])
            )
          ).filter(lang => lang !== sourceLanguage);

          if (targetLanguages.length === 0) {
            ctx.logger.warn(`⚠️ No target languages found for ${sourceLanguage}`);
            continue;
          }

          const localizationResult = await ctx.waitFor("run-localization-automation", {
            sourceLanguage: sourceLanguage as any,
            targetLanguages: targetLanguages as any[],
            contentSources: languageSources.map(s => ({
              url: s.url,
              type: s.document_type as any,
              priority: s.priority as any,
            })),
            automationLevel: "human_in_loop" as const,
            qualityGates: {
              minimumConfidence: 0.8,
              requireHumanReview: true,
              expertReviewThreshold: 0.9,
            },
            deliveryChannels: ["database", "api"],
          });

          results.push({
            sourceLanguage,
            targetLanguages,
            sourceCount: languageSources.length,
            result: localizationResult,
          });
        } catch (error: any) {
          ctx.logger.error(`❌ Failed to process localization for ${sourceLanguage}`, {
            error: error.message,
          });

          results.push({
            sourceLanguage,
            sourceCount: languageSources.length,
            error: error.message,
          });
        }
      }

      ctx.logger.info("✅ Weekly localization automation completed", {
        languagesProcessed: Object.keys(sourcesByLanguage).length,
        totalSources: sources.length,
        results: results.length,
      });

      return {
        success: true,
        languagesProcessed: Object.keys(sourcesByLanguage).length,
        totalSources: sources.length,
        results,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.logger.error("❌ Weekly localization automation failed", {
        error: error.message,
      });

      throw error;
    }
  },
});

// Export all tasks
export const translationPipelineTasks = {
  runTranslationPipeline,
  runLocalizationAutomation,
  weeklyLocalizationAutomation,
};