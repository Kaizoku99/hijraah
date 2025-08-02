/**
 * Document Processing Tasks Index
 * 
 * Task 7.1: Multi-format document processing using Firecrawl, Mistral OCR, and Trigger.dev orchestration
 * 
 * This module exports all document processing tasks and utilities.
 */

// Main orchestrator task
export { processDocumentsTask } from "./process-documents.js";

// Individual processing tasks
export { performOCRTask, performEnhancedOCRTask } from "./ocr-processing.js";
export { classifyDocumentTask, batchClassifyDocumentsTask } from "./document-classification.js";
export { extractStructuredDataTask, batchExtractStructuredDataTask } from "./structured-extraction.js";

// Intelligent extraction tasks (Task 7.2)
export { 
  extractFieldDataTask, 
  validateExtractionTask, 
  scoreAccuracyTask, 
  reviewManuallyTask 
} from "./intelligent-extraction.js";

// Quality monitoring tasks (Task 7.2)
export { 
  monitorExtractionQualityTask, 
  automatedQualityAssuranceTask, 
  ragQualityIntegrationTask 
} from "./quality-monitoring.js";

// Types and schemas
export * from "./types.js";

// Task metadata for documentation
export const documentProcessingTasks = {
  // Main orchestrator
  processDocuments: "process-documents",
  
  // Individual tasks (Task 7.1)
  performOCR: "perform-ocr",
  performEnhancedOCR: "perform-enhanced-ocr",
  classifyDocument: "classify-document",
  batchClassifyDocuments: "batch-classify-documents",
  extractStructuredData: "extract-structured-data",
  batchExtractStructuredData: "batch-extract-structured-data",
  
  // Intelligent extraction tasks (Task 7.2)
  extractFieldData: "extract-field-data",
  validateExtraction: "validate-extraction",
  scoreAccuracy: "score-accuracy",
  reviewManually: "review-manually",
  
  // Quality monitoring tasks (Task 7.2)
  monitorExtractionQuality: "monitor-extraction-quality",
  automatedQualityAssurance: "automated-quality-assurance",
  ragQualityIntegration: "rag-quality-integration",
} as const;

export const documentProcessingMetadata = {
  totalTasks: 13,
  categories: {
    orchestration: 1,
    ocr: 2,
    classification: 2,
    extraction: 2,
    intelligentExtraction: 4, // Task 7.2
    qualityMonitoring: 3, // Task 7.2
  },
  capabilities: [
    "Web document processing with Firecrawl",
    "File OCR with Mistral vision models",
    "Document classification with structured output",
    "Structured data extraction with AI SDK tools",
    "Batch processing support",
    "Quality metrics and validation",
    "Immigration document specialization",
    // Task 7.2 capabilities
    "Intelligent field extraction with Firecrawl batch processing",
    "AI-powered extraction validation with confidence scoring",
    "Accuracy scoring with OpenAI embeddings and pgvector similarity",
    "Human-in-the-loop manual review workflows",
    "RAG integration with quality-enhanced document indexing",
    "Automated quality assurance and monitoring",
    "Real-time quality alerts and anomaly detection",
  ],
  supportedFormats: [
    "PDF documents",
    "Image files (JPG, PNG, GIF)",
    "Office documents (DOC, DOCX)",
    "Web pages and URLs",
    "Plain text content",
  ],
  status: "Task 7.2 - Intelligent data extraction with validation workflows - IMPLEMENTED",
} as const;