import { z } from "zod";

// Document input types for multi-modal processing
export const DocumentInputSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "pdf", "document_url", "file_buffer"]),
  source: z.union([
    z.string(), // URL or base64 string
    z.instanceof(Buffer), // File buffer
    z.instanceof(ArrayBuffer), // Array buffer
  ]),
  metadata: z
    .object({
      filename: z.string().optional(),
      mimeType: z.string().optional(),
      size: z.number().optional(),
      pages: z.array(z.number()).optional(),
    })
    .optional(),
});

export type DocumentInput = z.infer<typeof DocumentInputSchema>;

// Document classification result
export const DocumentClassificationResultSchema = z.object({
  documentId: z.string(),
  classification: z.object({
    category: z.enum([
      "passport",
      "visa",
      "certificate",
      "form",
      "supporting_document",
      "identification",
      "financial",
      "medical",
      "educational",
      "employment",
    ]),
    subCategory: z.string().optional(),
    confidence: z.number().min(0).max(1),
    language: z.string(),
    documentFormat: z.enum(["pdf", "image", "scan", "digital"]),
  }),
  visualFeatures: z.object({
    hasPhotos: z.boolean(),
    hasSignatures: z.boolean(),
    hasSeals: z.boolean(),
    hasWatermarks: z.boolean(),
    quality: z.enum(["excellent", "good", "fair", "poor"]),
  }),
  processingRecommendations: z.array(z.string()),
  timestamp: z.string(),
});

export type DocumentClassificationResult = z.infer<
  typeof DocumentClassificationResultSchema
>;

// OCR processing result
export const OCRProcessingResultSchema = z.object({
  documentId: z.string(),
  extractedText: z.object({
    fullText: z.string(),
    structuredData: z.record(z.string(), z.any()),
    confidence: z.number().min(0).max(1),
    language: z.string(),
  }),
  pages: z.array(
    z.object({
      pageNumber: z.number(),
      text: z.string(),
      confidence: z.number().min(0).max(1),
      boundingBoxes: z
        .array(
          z.object({
            text: z.string(),
            x: z.number(),
            y: z.number(),
            width: z.number(),
            height: z.number(),
            confidence: z.number(),
          })
        )
        .optional(),
    })
  ),
  metadata: z.object({
    processingTime: z.number(),
    ocrEngine: z.string(),
    totalPages: z.number(),
    averageConfidence: z.number(),
  }),
  timestamp: z.string(),
});

export type OCRProcessingResult = z.infer<typeof OCRProcessingResultSchema>;

// Content extraction result
export const ContentExtractionResultSchema = z.object({
  documentId: z.string(),
  extractedFields: z.record(z.string(), z.any()),
  fieldConfidence: z.record(z.string(), z.number()),
  missingFields: z.array(z.string()),
  validationResults: z.object({
    isValid: z.boolean(),
    errors: z.array(z.string()),
    warnings: z.array(z.string()),
  }),
  normalizedData: z.record(z.string(), z.any()),
  timestamp: z.string(),
});

export type ContentExtractionResult = z.infer<
  typeof ContentExtractionResultSchema
>;

// Quality validation result
export const QualityValidationResultSchema = z.object({
  documentId: z.string(),
  qualityScore: z.number().min(0).max(100),
  qualityMetrics: z.object({
    textClarity: z.number().min(0).max(100),
    imageQuality: z.number().min(0).max(100),
    completeness: z.number().min(0).max(100),
    authenticity: z.number().min(0).max(100),
  }),
  issues: z.array(
    z.object({
      type: z.enum(["critical", "major", "minor", "warning"]),
      description: z.string(),
      location: z.string().optional(),
      recommendation: z.string(),
    })
  ),
  passed: z.boolean(),
  recommendations: z.array(z.string()),
  timestamp: z.string(),
});

export type QualityValidationResult = z.infer<
  typeof QualityValidationResultSchema
>;

// Translation result
export const TranslationResultSchema = z.object({
  documentId: z.string(),
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  translatedText: z.string(),
  translatedFields: z.record(z.string(), z.string()),
  confidence: z.number().min(0).max(1),
  qualityScore: z.number().min(0).max(100),
  preservedFormatting: z.boolean(),
  legalTermsPreserved: z.array(z.string()),
  timestamp: z.string(),
});

export type TranslationResult = z.infer<typeof TranslationResultSchema>;

// Multi-modal processing result
export const MultiModalProcessingResultSchema = z.object({
  documentId: z.string(),
  classification: DocumentClassificationResultSchema,
  ocr: OCRProcessingResultSchema,
  extraction: ContentExtractionResultSchema,
  quality: QualityValidationResultSchema,
  translation: TranslationResultSchema.optional(),
  overallScore: z.number().min(0).max(100),
  processingTime: z.number(),
  recommendations: z.array(z.string()),
  timestamp: z.string(),
});

export type MultiModalProcessingResult = z.infer<
  typeof MultiModalProcessingResultSchema
>;

// Agent configuration
export const AgentConfigSchema = z.object({
  model: z.string().default("gpt-4o"),
  maxSteps: z.number().default(5),
  temperature: z.number().min(0).max(2).default(0.1),
  enableLogging: z.boolean().default(true),
  timeout: z.number().default(30000), // 30 seconds
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;
