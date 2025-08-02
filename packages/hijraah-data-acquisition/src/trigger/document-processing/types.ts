/**
 * Document Processing Types and Schemas
 * 
 * Task 7.1: Multi-format document processing using Firecrawl, Mistral OCR, and Trigger.dev orchestration
 * 
 * This module defines the types and schemas for document processing tasks including:
 * - Web document processing with Firecrawl
 * - File processing with Mistral OCR
 * - Document classification and structured data extraction
 */

import { z } from "zod";

// Document processing input types
export const DocumentProcessingInputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["web", "file", "text"]),
  source: z.string(), // URL for web, file path for files, or direct text content
  fileName: z.string().optional(),
  fileBuffer: z.string().optional(), // Base64 encoded file content
  metadata: z.record(z.any()).optional(),
  processingOptions: z.object({
    enableOCR: z.boolean().default(true),
    enableClassification: z.boolean().default(true),
    enableStructuredExtraction: z.boolean().default(true),
    enableChunking: z.boolean().default(true),
    chunkSize: z.number().min(100).max(8000).default(1000),
    chunkOverlap: z.number().min(0).max(500).default(200),
    confidenceThreshold: z.number().min(0).max(1).default(0.8),
  }).optional(),
});

export type DocumentProcessingInput = z.infer<typeof DocumentProcessingInputSchema>;

// Document classification schema
export const DocumentClassificationSchema = z.object({
  primaryCategory: z.enum([
    "passport",
    "visa",
    "birth_certificate",
    "marriage_certificate",
    "education_certificate",
    "employment_letter",
    "bank_statement",
    "medical_report",
    "police_clearance",
    "immigration_form",
    "legal_document",
    "other"
  ]),
  secondaryCategories: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1),
  language: z.string().default("en"),
  documentType: z.enum(["official", "personal", "commercial", "legal", "medical"]),
  isImmigrationRelated: z.boolean(),
  requiredFields: z.array(z.string()).optional(),
  detectedFields: z.array(z.string()).optional(),
});

export type DocumentClassification = z.infer<typeof DocumentClassificationSchema>;

// OCR result schema
export const OCRResultSchema = z.object({
  extractedText: z.string(),
  confidence: z.number().min(0).max(1),
  language: z.string(),
  pageCount: z.number().optional(),
  processingMethod: z.enum(["mistral_vision", "tesseract", "azure_ocr", "aws_textract"]),
  boundingBoxes: z.array(z.object({
    text: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    confidence: z.number(),
  })).optional(),
  metadata: z.record(z.any()).optional(),
});

export type OCRResult = z.infer<typeof OCRResultSchema>;

// Structured data extraction schema
export const StructuredDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z.string().optional(),
    placeOfBirth: z.string().optional(),
    nationality: z.string().optional(),
    passportNumber: z.string().optional(),
    visaNumber: z.string().optional(),
  }).optional(),
  documentInfo: z.object({
    documentNumber: z.string().optional(),
    issueDate: z.string().optional(),
    expiryDate: z.string().optional(),
    issuingAuthority: z.string().optional(),
    documentType: z.string().optional(),
  }).optional(),
  contactInfo: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }).optional(),
  immigrationInfo: z.object({
    visaType: z.string().optional(),
    applicationNumber: z.string().optional(),
    sponsorInfo: z.string().optional(),
    purposeOfTravel: z.string().optional(),
    intendedStayDuration: z.string().optional(),
  }).optional(),
  customFields: z.record(z.any()).optional(),
});

export type StructuredData = z.infer<typeof StructuredDataSchema>;

// Document processing result
export const DocumentProcessingResultSchema = z.object({
  id: z.string(),
  status: z.enum(["success", "partial", "failed"]),
  processedAt: z.date(),
  processingTimeMs: z.number(),
  
  // Original document info
  originalDocument: z.object({
    type: z.enum(["web", "file", "text"]),
    source: z.string(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
    contentType: z.string().optional(),
  }),
  
  // Processing results
  extractedContent: z.string(),
  classification: DocumentClassificationSchema.optional(),
  ocrResult: OCRResultSchema.optional(),
  structuredData: StructuredDataSchema.optional(),
  
  // Quality metrics
  qualityMetrics: z.object({
    overallConfidence: z.number().min(0).max(1),
    textQuality: z.number().min(0).max(1),
    structureQuality: z.number().min(0).max(1),
    completeness: z.number().min(0).max(1),
  }),
  
  // Chunks if enabled
  chunks: z.array(z.object({
    id: z.string(),
    content: z.string(),
    chunkIndex: z.number(),
    tokenCount: z.number().optional(),
    embedding: z.array(z.number()).optional(),
    metadata: z.record(z.any()).optional(),
  })).optional(),
  
  // Processing metadata
  metadata: z.object({
    processingSteps: z.array(z.string()),
    errors: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional(),
    modelVersions: z.record(z.string()).optional(),
  }),
});

export type DocumentProcessingResult = z.infer<typeof DocumentProcessingResultSchema>;

// Firecrawl web scraping configuration
export const FirecrawlConfigSchema = z.object({
  formats: z.array(z.enum(["markdown", "html", "rawHtml", "screenshot"])).default(["markdown"]),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).default(["nav", "footer", "aside", "script", "style"]),
  waitFor: z.number().default(1000),
  timeout: z.number().default(30000),
  onlyMainContent: z.boolean().default(true),
  removeBase64Images: z.boolean().default(true),
});

export type FirecrawlConfig = z.infer<typeof FirecrawlConfigSchema>;

// Batch processing configuration for multiple documents
export const BatchDocumentProcessingSchema = z.object({
  documents: z.array(DocumentProcessingInputSchema),
  batchId: z.string(),
  userId: z.string(),
  processingOptions: z.object({
    maxConcurrency: z.number().min(1).max(10).default(3),
    retryAttempts: z.number().min(0).max(5).default(2),
    timeoutMs: z.number().min(10000).max(300000).default(60000),
    enableQualityValidation: z.boolean().default(true),
    qualityThreshold: z.number().min(0).max(1).default(0.7),
  }).optional(),
});

export type BatchDocumentProcessing = z.infer<typeof BatchDocumentProcessingSchema>;

// Quality validation result
export const QualityValidationSchema = z.object({
  documentId: z.string(),
  isValid: z.boolean(),
  qualityScore: z.number().min(0).max(1),
  issues: z.array(z.object({
    type: z.enum(["low_confidence", "missing_data", "format_error", "content_mismatch"]),
    severity: z.enum(["low", "medium", "high", "critical"]),
    description: z.string(),
    field: z.string().optional(),
  })),
  recommendations: z.array(z.string()),
  requiresManualReview: z.boolean(),
});

export type QualityValidation = z.infer<typeof QualityValidationSchema>;

// Manual review workflow
export const ManualReviewRequestSchema = z.object({
  documentId: z.string(),
  userId: z.string(),
  reviewType: z.enum(["quality_check", "data_validation", "classification_review", "extraction_review"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assignedTo: z.string().optional(),
  issues: z.array(z.string()),
  originalResult: DocumentProcessingResultSchema,
  requestedAt: z.date(),
  dueDate: z.date().optional(),
  metadata: z.record(z.any()).optional(),
});

export type ManualReviewRequest = z.infer<typeof ManualReviewRequestSchema>;

// Export all schemas for validation
export const DocumentProcessingSchemas = {
  DocumentProcessingInput: DocumentProcessingInputSchema,
  DocumentClassification: DocumentClassificationSchema,
  OCRResult: OCRResultSchema,
  StructuredData: StructuredDataSchema,
  DocumentProcessingResult: DocumentProcessingResultSchema,
  FirecrawlConfig: FirecrawlConfigSchema,
  BatchDocumentProcessing: BatchDocumentProcessingSchema,
  QualityValidation: QualityValidationSchema,
  ManualReviewRequest: ManualReviewRequestSchema,
} as const;