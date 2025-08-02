/**
 * Multi-Language Data Processing Schemas
 *
 * Zod schemas for multi-language data processing, translation,
 * and cross-language entity linking.
 */

import { z } from "zod";

// Supported languages
export const SupportedLanguageSchema = z.enum([
  "en", // English
  "ar", // Arabic
  "fr", // French
  "es", // Spanish
  "de", // German
  "it", // Italian
  "pt", // Portuguese
  "ru", // Russian
  "zh", // Chinese
  "ja", // Japanese
  "ko", // Korean
  "hi", // Hindi
  "ur", // Urdu
  "fa", // Persian/Farsi
  "tr", // Turkish
  "nl", // Dutch
  "sv", // Swedish
  "no", // Norwegian
  "da", // Danish
  "fi", // Finnish
  "pl", // Polish
  "cs", // Czech
  "hu", // Hungarian
  "ro", // Romanian
  "bg", // Bulgarian
  "hr", // Croatian
  "sr", // Serbian
  "sk", // Slovak
  "sl", // Slovenian
  "et", // Estonian
  "lv", // Latvian
  "lt", // Lithuanian
  "mt", // Maltese
  "el", // Greek
  "cy", // Welsh
  "ga", // Irish
  "is", // Icelandic
  "mk", // Macedonian
  "sq", // Albanian
  "bs", // Bosnian
  "me", // Montenegrin
]);

export type SupportedLanguage = z.infer<typeof SupportedLanguageSchema>;

// Language detection result
export const LanguageDetectionResultSchema = z.object({
  language: SupportedLanguageSchema,
  confidence: z.number().min(0).max(1),
  alternativeLanguages: z.array(
    z.object({
      language: SupportedLanguageSchema,
      confidence: z.number().min(0).max(1),
    }),
  ),
  isReliable: z.boolean(),
  textSample: z.string().optional(),
});

// Translation request
export const TranslationRequestSchema = z.object({
  text: z.string().min(1),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguage: SupportedLanguageSchema,
  preserveLegalTerminology: z.boolean().default(true),
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
});

// Translation result
export const TranslationResultSchema = z.object({
  originalText: z.string(),
  translatedText: z.string(),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguage: SupportedLanguageSchema,
  confidence: z.number().min(0).max(1),
  preservedTerms: z.array(z.string()).optional(),
  alternativeTranslations: z.array(z.string()).optional(),
  qualityScore: z.number().min(0).max(1),
  translationMethod: z.enum(["ai_translation", "hybrid", "human_verified"]),
  metadata: z.object({
    model: z.string().optional(),
    processingTime: z.number().optional(),
    tokenCount: z.number().optional(),
    warnings: z.array(z.string()).optional(),
  }),
});

// Multilingual content extraction
export const MultilingualContentExtractionSchema = z.object({
  url: z.string().url(),
  targetLanguages: z.array(SupportedLanguageSchema),
  extractionOptions: z.object({
    detectLanguage: z.boolean().default(true),
    translateContent: z.boolean().default(true),
    preserveOriginal: z.boolean().default(true),
    extractStructuredData: z.boolean().default(true),
    followLinks: z.boolean().default(false),
    maxDepth: z.number().int().min(1).max(3).default(1),
  }),
  firecrawlOptions: z.object({
    formats: z.array(z.enum(["markdown", "html", "rawHtml"])).default(["markdown"]),
    onlyMainContent: z.boolean().default(true),
    includeTags: z.array(z.string()).optional(),
    excludeTags: z.array(z.string()).optional(),
    waitFor: z.number().optional(),
  }),
});

// Multilingual content result
export const MultilingualContentResultSchema = z.object({
  url: z.string().url(),
  detectedLanguage: LanguageDetectionResultSchema,
  originalContent: z.string(),
  translations: z.array(
    z.object({
      language: SupportedLanguageSchema,
      content: z.string(),
      confidence: z.number().min(0).max(1),
      qualityScore: z.number().min(0).max(1),
    }),
  ),
  structuredData: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    entities: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    dates: z.array(z.string()).optional(),
    amounts: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.object({
    extractedAt: z.string(),
    processingTime: z.number(),
    contentLength: z.number(),
    translationCount: z.number(),
  }),
});

// Cross-language entity linking
export const CrossLanguageEntityLinkingSchema = z.object({
  entities: z.array(
    z.object({
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
    }),
  ),
  linkingOptions: z.object({
    useSemanticSimilarity: z.boolean().default(true),
    useLexicalMatching: z.boolean().default(true),
    useTranslationMatching: z.boolean().default(true),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
    maxCandidates: z.number().int().min(1).max(10).default(5),
  }),
});

// Cross-language entity link result
export const CrossLanguageEntityLinkResultSchema = z.object({
  sourceEntity: z.object({
    text: z.string(),
    language: SupportedLanguageSchema,
    type: z.string(),
  }),
  linkedEntities: z.array(
    z.object({
      text: z.string(),
      language: SupportedLanguageSchema,
      type: z.string(),
      confidence: z.number().min(0).max(1),
      linkingMethod: z.enum([
        "semantic_similarity",
        "lexical_matching",
        "translation_matching",
        "hybrid",
      ]),
      similarity: z.number().min(0).max(1),
      translations: z.array(
        z.object({
          language: SupportedLanguageSchema,
          text: z.string(),
        }),
      ).optional(),
    }),
  ),
  metadata: z.object({
    totalCandidates: z.number(),
    processingTime: z.number(),
    linkingMethods: z.array(z.string()),
  }),
});

// Language-specific data source
export const LanguageSpecificDataSourceSchema = z.object({
  url: z.string().url(),
  language: SupportedLanguageSchema,
  country: z.string(),
  agency: z.string(),
  documentType: z.enum([
    "policy",
    "form",
    "guidance",
    "legislation",
    "announcement",
    "statistics",
    "faq",
    "other",
  ]),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  updateFrequency: z.string(), // cron expression
  translationTargets: z.array(SupportedLanguageSchema),
  qualityThreshold: z.number().min(0).max(1).default(0.8),
});

// Multilingual knowledge graph node
export const MultilingualKnowledgeGraphNodeSchema = z.object({
  id: z.string(),
  type: z.enum([
    "country",
    "visa_type",
    "document_type",
    "requirement",
    "timeline",
    "fee",
    "organization",
    "policy",
    "procedure",
  ]),
  primaryLanguage: SupportedLanguageSchema,
  labels: z.record(SupportedLanguageSchema, z.string()), // language -> label
  descriptions: z.record(SupportedLanguageSchema, z.string()), // language -> description
  properties: z.record(z.string(), z.any()),
  embeddings: z.record(SupportedLanguageSchema, z.array(z.number())), // language -> embedding
  confidence: z.number().min(0).max(1),
  sources: z.array(
    z.object({
      url: z.string().url(),
      language: SupportedLanguageSchema,
      extractedAt: z.string(),
    }),
  ),
});

// Translation quality assessment
export const TranslationQualityAssessmentSchema = z.object({
  originalText: z.string(),
  translatedText: z.string(),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguage: SupportedLanguageSchema,
  assessmentCriteria: z.object({
    accuracy: z.number().min(0).max(1),
    fluency: z.number().min(0).max(1),
    terminology: z.number().min(0).max(1),
    completeness: z.number().min(0).max(1),
    consistency: z.number().min(0).max(1),
  }),
  overallScore: z.number().min(0).max(1),
  issues: z.array(
    z.object({
      type: z.enum([
        "terminology_error",
        "grammar_error",
        "missing_content",
        "cultural_adaptation",
        "legal_accuracy",
      ]),
      severity: z.enum(["low", "medium", "high", "critical"]),
      description: z.string(),
      suggestion: z.string().optional(),
    }),
  ),
  recommendations: z.array(z.string()),
});

// Batch translation request
export const BatchTranslationRequestSchema = z.object({
  texts: z.array(z.string()),
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  context: z.enum([
    "immigration_policy",
    "legal_document",
    "government_form",
    "user_content",
    "technical_documentation",
    "general",
  ]).default("general"),
  preserveLegalTerminology: z.boolean().default(true),
  qualityThreshold: z.number().min(0).max(1).default(0.8),
  batchSize: z.number().int().min(1).max(100).default(10),
});

// Localization pipeline configuration
export const LocalizationPipelineConfigSchema = z.object({
  sourceLanguage: SupportedLanguageSchema,
  targetLanguages: z.array(SupportedLanguageSchema),
  contentTypes: z.array(z.enum([
    "policy_documents",
    "forms",
    "guidance",
    "announcements",
    "requirements",
    "procedures",
  ])),
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

// Export all schemas
export const MultiLanguageSchemas = {
  SupportedLanguageSchema,
  LanguageDetectionResultSchema,
  TranslationRequestSchema,
  TranslationResultSchema,
  MultilingualContentExtractionSchema,
  MultilingualContentResultSchema,
  CrossLanguageEntityLinkingSchema,
  CrossLanguageEntityLinkResultSchema,
  LanguageSpecificDataSourceSchema,
  MultilingualKnowledgeGraphNodeSchema,
  TranslationQualityAssessmentSchema,
  BatchTranslationRequestSchema,
  LocalizationPipelineConfigSchema,
};