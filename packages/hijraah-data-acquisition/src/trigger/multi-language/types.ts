/**
 * Multi-Language Processing Types
 *
 * Type definitions for multi-language data processing tasks.
 */

import { z } from "zod";
import {
  SupportedLanguageSchema,
  LanguageDetectionResultSchema,
  TranslationResultSchema,
  MultilingualContentResultSchema,
  CrossLanguageEntityLinkResultSchema,
} from "../../schemas/multi-language";

// Task payload schemas
export const MultiLanguageScrapingPayloadSchema = z.object({
  urls: z.array(z.string().url()),
  targetLanguages: z.array(SupportedLanguageSchema),
  extractionOptions: z.object({
    detectLanguage: z.boolean().default(true),
    translateContent: z.boolean().default(true),
    preserveOriginal: z.boolean().default(true),
    extractStructuredData: z.boolean().default(true),
    followLinks: z.boolean().default(false),
    maxDepth: z.number().int().min(1).max(3).default(1),
  }),
  qualityThreshold: z.number().min(0).max(1).default(0.8),
  batchSize: z.number().int().min(1).max(10).default(5),
});

export const TranslationPipelinePayloadSchema = z.object({
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  contentItems: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      context: z.enum([
        "immigration_policy",
        "legal_document",
        "government_form",
        "user_content",
        "technical_documentation",
        "general",
      ]).default("general"),
      domain: z.enum([
        "visa",
        "residency",
        "citizenship",
        "work_permit",
        "student_visa",
        "family_reunification",
        "asylum",
        "general_immigration",
      ]).optional(),
    })
  ),
  preserveLegalTerminology: z.boolean().default(true),
  qualityThreshold: z.number().min(0).max(1).default(0.8),
  requireHumanReview: z.boolean().default(false),
});

export const CrossLanguageEntityLinkingPayloadSchema = z.object({
  entities: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      language: SupportedLanguageSchema,
      type: z.enum([
        "country",
        "visa_type",
        "document_type",
        "requirement",
        "timeline",
        "fee",
        "organization",
        "location",
        "person",
        "date",
        "amount",
      ]),
      confidence: z.number().min(0).max(1),
      context: z.string().optional(),
    })
  ),
  linkingOptions: z.object({
    useSemanticSimilarity: z.boolean().default(true),
    useLexicalMatching: z.boolean().default(true),
    useTranslationMatching: z.boolean().default(true),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
    maxCandidates: z.number().int().min(1).max(10).default(5),
  }),
});

export const LocalizationAutomationPayloadSchema = z.object({
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  contentSources: z.array(
    z.object({
      url: z.string().url(),
      type: z.enum([
        "policy_documents",
        "forms",
        "guidance",
        "announcements",
        "requirements",
        "procedures",
      ]),
      priority: z.enum(["high", "medium", "low"]).default("medium"),
    })
  ),
  automationLevel: z.enum([
    "fully_automated",
    "human_in_loop",
    "expert_review_required",
  ]).default("human_in_loop"),
  qualityGates: z.object({
    minimumConfidence: z.number().min(0).max(1).default(0.8),
    requireHumanReview: z.boolean().default(true),
    expertReviewThreshold: z.number().min(0).max(1).default(0.9),
  }),
  deliveryChannels: z.array(z.enum([
    "database",
    "api",
    "webhook",
    "file_export",
  ])),
});

// Task result schemas
export const MultiLanguageScrapingResultSchema = z.object({
  success: z.boolean(),
  results: z.array(MultilingualContentResultSchema),
  statistics: z.object({
    totalUrls: z.number(),
    successfulExtractions: z.number(),
    languageDistribution: z.record(z.string(), z.number()),
    averageProcessingTime: z.number(),
    averageContentLength: z.number(),
    translationSuccessRate: z.number(),
  }),
  errors: z.array(
    z.object({
      url: z.string(),
      error: z.string(),
      timestamp: z.string(),
    })
  ),
  processingTime: z.number(),
  timestamp: z.string(),
});

export const TranslationPipelineResultSchema = z.object({
  success: z.boolean(),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  results: z.array(
    z.object({
      contentId: z.string(),
      translations: z.array(TranslationResultSchema),
      qualityAssessments: z.array(z.any()).optional(),
    })
  ),
  statistics: z.object({
    totalItems: z.number(),
    successfulTranslations: z.number(),
    averageQualityScore: z.number(),
    averageConfidence: z.number(),
    requiresReview: z.number(),
  }),
  errors: z.array(
    z.object({
      contentId: z.string(),
      error: z.string(),
      timestamp: z.string(),
    })
  ),
  processingTime: z.number(),
  timestamp: z.string(),
});

export const CrossLanguageEntityLinkingResultSchema = z.object({
  success: z.boolean(),
  results: z.array(CrossLanguageEntityLinkResultSchema),
  statistics: z.object({
    totalEntities: z.number(),
    linkedEntities: z.number(),
    averageConfidence: z.number(),
    languageCoverage: z.number(),
    linkingMethods: z.array(z.string()),
  }),
  knowledgeGraphNodes: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      primaryLanguage: SupportedLanguageSchema,
      labels: z.record(SupportedLanguageSchema, z.string()),
      confidence: z.number(),
    })
  ),
  errors: z.array(
    z.object({
      entityId: z.string(),
      error: z.string(),
      timestamp: z.string(),
    })
  ),
  processingTime: z.number(),
  timestamp: z.string(),
});

export const LocalizationAutomationResultSchema = z.object({
  success: z.boolean(),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  contentProcessed: z.number(),
  translationsGenerated: z.number(),
  qualityChecks: z.object({
    passed: z.number(),
    failed: z.number(),
    requiresReview: z.number(),
  }),
  deliveryResults: z.array(
    z.object({
      channel: z.string(),
      success: z.boolean(),
      itemsDelivered: z.number(),
      errors: z.array(z.string()),
    })
  ),
  errors: z.array(
    z.object({
      source: z.string(),
      error: z.string(),
      timestamp: z.string(),
    })
  ),
  processingTime: z.number(),
  timestamp: z.string(),
});

// Export type definitions
export type MultiLanguageScrapingPayload = z.infer<typeof MultiLanguageScrapingPayloadSchema>;
export type TranslationPipelinePayload = z.infer<typeof TranslationPipelinePayloadSchema>;
export type CrossLanguageEntityLinkingPayload = z.infer<typeof CrossLanguageEntityLinkingPayloadSchema>;
export type LocalizationAutomationPayload = z.infer<typeof LocalizationAutomationPayloadSchema>;

export type MultiLanguageScrapingResult = z.infer<typeof MultiLanguageScrapingResultSchema>;
export type TranslationPipelineResult = z.infer<typeof TranslationPipelineResultSchema>;
export type CrossLanguageEntityLinkingResult = z.infer<typeof CrossLanguageEntityLinkingResultSchema>;
export type LocalizationAutomationResult = z.infer<typeof LocalizationAutomationResultSchema>;