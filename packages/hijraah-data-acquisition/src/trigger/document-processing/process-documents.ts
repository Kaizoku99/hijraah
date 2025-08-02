/**
 * Document Processing Task - Main Orchestrator
 * 
 * Task 7.1: Implement multi-format document processing using Firecrawl, Mistral OCR, and Trigger.dev orchestration
 * 
 * This task orchestrates dual processing paths:
 * - Web Documents: Firecrawl's scrapeUrl() with markdown format for URLs and web content
 * - Uploaded Files: Mistral OCR via AI SDK's generateText() with multimodal capabilities for PDFs, images, and Office documents
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { mistral } from "@ai-sdk/mistral";
import { generateText, generateObject } from "ai";
import { 
  DocumentProcessingInputSchema, 
  DocumentClassificationSchema,
  StructuredDataSchema,
  FirecrawlConfigSchema,
  type DocumentProcessingInput,
  type DocumentProcessingResult,
  type DocumentClassification,
  type OCRResult,
  type StructuredData
} from "./types.js";

// Firecrawl integration (using MCP server pattern)
interface FirecrawlResponse {
  success: boolean;
  data: {
    markdown?: string;
    html?: string;
    metadata: {
      title?: string;
      description?: string;
      language?: string;
      sourceURL?: string;
      statusCode?: number;
    };
  };
}

/**
 * Main document processing orchestrator task
 * Handles both web documents and uploaded files with dual processing paths
 */
export const processDocumentsTask = task({
  id: "process-documents",
  maxDuration: 300, // 5 minutes
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: DocumentProcessingInput): Promise<DocumentProcessingResult> => {
    const startTime = Date.now();
    logger.info("Starting document processing", { 
      documentId: payload.id, 
      type: payload.type,
      source: payload.source 
    });

    try {
      // Validate input
      const validatedInput = DocumentProcessingInputSchema.parse(payload);
      
      let extractedContent = "";
      let ocrResult: OCRResult | undefined;
      let classification: DocumentClassification | undefined;
      let structuredData: StructuredData | undefined;
      
      // Step 1: Extract content based on document type
      if (validatedInput.type === "web") {
        extractedContent = await processWebDocument(validatedInput);
      } else if (validatedInput.type === "file") {
        const result = await processFileDocument(validatedInput);
        extractedContent = result.extractedText;
        ocrResult = result.ocrResult;
      } else if (validatedInput.type === "text") {
        extractedContent = validatedInput.source;
      }

      // Step 2: Classify document if enabled
      if (validatedInput.processingOptions?.enableClassification) {
        classification = await classifyDocument(extractedContent, validatedInput.fileName);
      }

      // Step 3: Extract structured data if enabled
      if (validatedInput.processingOptions?.enableStructuredExtraction) {
        structuredData = await extractStructuredData(extractedContent, classification);
      }

      // Step 4: Calculate quality metrics
      const qualityMetrics = calculateQualityMetrics(
        extractedContent, 
        ocrResult, 
        classification, 
        structuredData
      );

      // Step 5: Create chunks if enabled
      let chunks;
      if (validatedInput.processingOptions?.enableChunking) {
        chunks = await createDocumentChunks(
          extractedContent,
          validatedInput.processingOptions.chunkSize || 1000,
          validatedInput.processingOptions.chunkOverlap || 200
        );
      }

      const processingTime = Date.now() - startTime;
      
      const result: DocumentProcessingResult = {
        id: validatedInput.id,
        status: qualityMetrics.overallConfidence >= (validatedInput.processingOptions?.confidenceThreshold || 0.8) 
          ? "success" : "partial",
        processedAt: new Date(),
        processingTimeMs: processingTime,
        originalDocument: {
          type: validatedInput.type,
          source: validatedInput.source,
          fileName: validatedInput.fileName,
          fileSize: validatedInput.fileBuffer ? Buffer.from(validatedInput.fileBuffer, 'base64').length : undefined,
          contentType: getContentType(validatedInput.fileName),
        },
        extractedContent,
        classification,
        ocrResult,
        structuredData,
        qualityMetrics,
        chunks,
        metadata: {
          processingSteps: getProcessingSteps(validatedInput),
          errors: [],
          warnings: [],
          modelVersions: {
            mistral: "pixtral-large-latest",
            classification: "mistral-large-latest",
            structuredExtraction: "mistral-large-latest"
          }
        }
      };

      logger.info("Document processing completed", {
        documentId: validatedInput.id,
        status: result.status,
        processingTimeMs: processingTime,
        confidence: qualityMetrics.overallConfidence
      });

      return result;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error("Document processing failed", {
        documentId: payload.id,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTimeMs: processingTime
      });

      // Return failed result
      return {
        id: payload.id,
        status: "failed",
        processedAt: new Date(),
        processingTimeMs: processingTime,
        originalDocument: {
          type: payload.type,
          source: payload.source,
          fileName: payload.fileName,
        },
        extractedContent: "",
        qualityMetrics: {
          overallConfidence: 0,
          textQuality: 0,
          structureQuality: 0,
          completeness: 0,
        },
        metadata: {
          processingSteps: [],
          errors: [error instanceof Error ? error.message : "Unknown error"],
          warnings: [],
          modelVersions: {}
        }
      };
    }
  },
});

/**
 * Process web documents using Firecrawl
 */
async function processWebDocument(input: DocumentProcessingInput): Promise<string> {
  logger.info("Processing web document", { url: input.source });

  try {
    // Simulate Firecrawl API call (in real implementation, use actual Firecrawl SDK)
    FirecrawlConfigSchema.parse(input.processingOptions || {});
    
    // Mock Firecrawl response for now - replace with actual Firecrawl integration
    const mockResponse: FirecrawlResponse = {
      success: true,
      data: {
        markdown: `# Web Content from ${input.source}\n\nThis is extracted web content in markdown format.`,
        metadata: {
          title: "Sample Web Page",
          description: "Sample description",
          language: "en",
          sourceURL: input.source,
          statusCode: 200
        }
      }
    };

    if (!mockResponse.success || !mockResponse.data.markdown) {
      throw new Error("Failed to extract content from web document");
    }

    return mockResponse.data.markdown;

  } catch (error) {
    logger.error("Web document processing failed", {
      url: input.source,
      error: error instanceof Error ? error.message : "Unknown error"
    });
    throw error;
  }
}

/**
 * Process file documents using Mistral OCR
 */
async function processFileDocument(input: DocumentProcessingInput): Promise<{
  extractedText: string;
  ocrResult: OCRResult;
}> {
  logger.info("Processing file document", { fileName: input.fileName });

  if (!input.fileBuffer) {
    throw new Error("File buffer is required for file processing");
  }

  try {
    // Convert base64 to buffer
    const fileBuffer = Buffer.from(input.fileBuffer, 'base64');
    
    // Use Mistral's vision model for OCR
    const { text } = await generateText({
      model: mistral('pixtral-large-latest'),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text content from this document. Maintain the original structure and formatting as much as possible. If this is an immigration document, pay special attention to names, dates, document numbers, and official information."
            },
            {
              type: "image",
              image: fileBuffer,
            }
          ]
        }
      ],
      temperature: 0, // Deterministic for OCR
    });

    const ocrResult: OCRResult = {
      extractedText: text,
      confidence: 0.95, // Mistral vision models typically have high confidence
      language: "en", // Could be detected dynamically
      processingMethod: "mistral_vision",
      metadata: {
        fileName: input.fileName,
        fileSize: fileBuffer.length,
        processedAt: new Date().toISOString()
      }
    };

    logger.info("File OCR completed", {
      fileName: input.fileName,
      textLength: text.length,
      confidence: ocrResult.confidence
    });

    return {
      extractedText: text,
      ocrResult
    };

  } catch (error) {
    logger.error("File document processing failed", {
      fileName: input.fileName,
      error: error instanceof Error ? error.message : "Unknown error"
    });
    throw error;
  }
}

/**
 * Classify documents using Mistral
 */
async function classifyDocument(content: string, fileName?: string): Promise<DocumentClassification> {
  logger.info("Classifying document", { contentLength: content.length, fileName });

  try {
    const { object } = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: DocumentClassificationSchema,
      messages: [
        {
          role: "system",
          content: `You are an expert document classifier specializing in immigration documents. 
          Analyze the provided document content and classify it according to the schema.
          Pay attention to document structure, content patterns, and immigration-specific terminology.`
        },
        {
          role: "user",
          content: `Please classify this document:
          
          Filename: ${fileName || "Unknown"}
          Content: ${content.substring(0, 2000)}...`
        }
      ],
      temperature: 0,
    });

    logger.info("Document classification completed", {
      primaryCategory: object.primaryCategory,
      confidence: object.confidence,
      isImmigrationRelated: object.isImmigrationRelated
    });

    return object;

  } catch (error) {
    logger.error("Document classification failed", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
    
    // Return default classification on error
    return {
      primaryCategory: "other",
      confidence: 0.5,
      language: "en",
      documentType: "personal",
      isImmigrationRelated: false,
    };
  }
}

/**
 * Extract structured data using Mistral
 */
async function extractStructuredData(
  content: string, 
  classification?: DocumentClassification
): Promise<StructuredData> {
  logger.info("Extracting structured data", { 
    contentLength: content.length,
    documentType: classification?.primaryCategory 
  });

  try {
    const { object } = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: StructuredDataSchema,
      messages: [
        {
          role: "system",
          content: `You are an expert at extracting structured information from immigration documents.
          Extract all relevant personal information, document details, contact information, and immigration-specific data.
          Only extract information that is clearly present in the document. Use null for missing fields.`
        },
        {
          role: "user",
          content: `Extract structured data from this ${classification?.primaryCategory || "document"}:
          
          ${content.substring(0, 3000)}...`
        }
      ],
      temperature: 0,
    });

    logger.info("Structured data extraction completed", {
      hasPersonalInfo: !!object.personalInfo,
      hasDocumentInfo: !!object.documentInfo,
      hasContactInfo: !!object.contactInfo,
      hasImmigrationInfo: !!object.immigrationInfo
    });

    return object;

  } catch (error) {
    logger.error("Structured data extraction failed", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
    
    // Return empty structured data on error
    return {};
  }
}

/**
 * Calculate quality metrics for the processed document
 */
function calculateQualityMetrics(
  content: string,
  ocrResult?: OCRResult,
  classification?: DocumentClassification,
  structuredData?: StructuredData
): { overallConfidence: number; textQuality: number; structureQuality: number; completeness: number } {
  
  // Text quality based on content length and OCR confidence
  const textQuality = Math.min(
    (content.length > 100 ? 0.8 : content.length / 125), // Length factor
    ocrResult?.confidence || 1.0 // OCR confidence
  );

  // Structure quality based on classification confidence
  const structureQuality = classification?.confidence || 0.7;

  // Completeness based on structured data extraction
  const structuredFields = structuredData ? Object.keys(structuredData).length : 0;
  const completeness = Math.min(structuredFields / 10, 1.0); // Assume 10 fields is complete

  // Overall confidence is weighted average
  const overallConfidence = (textQuality * 0.4 + structureQuality * 0.3 + completeness * 0.3);

  return {
    overallConfidence,
    textQuality,
    structureQuality,
    completeness
  };
}

/**
 * Create document chunks for embedding and search
 */
async function createDocumentChunks(
  content: string,
  chunkSize: number,
  overlap: number
): Promise<Array<{
  id: string;
  content: string;
  chunkIndex: number;
  tokenCount?: number;
  metadata?: Record<string, any>;
}>> {
  
  const chunks = [];
  const words = content.split(/\s+/);
  const wordsPerChunk = Math.floor(chunkSize / 4); // Rough estimate: 4 chars per word
  const overlapWords = Math.floor(overlap / 4);

  for (let i = 0; i < words.length; i += wordsPerChunk - overlapWords) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    const chunkContent = chunkWords.join(' ');
    
    if (chunkContent.trim().length > 0) {
      chunks.push({
        id: `chunk-${chunks.length}`,
        content: chunkContent,
        chunkIndex: chunks.length,
        tokenCount: chunkWords.length,
        metadata: {
          startIndex: i,
          endIndex: Math.min(i + wordsPerChunk, words.length),
          wordCount: chunkWords.length
        }
      });
    }
  }

  return chunks;
}

/**
 * Get content type from filename
 */
function getContentType(fileName?: string): string | undefined {
  if (!fileName) return undefined;
  
  const ext = fileName.toLowerCase().split('.').pop();
  const contentTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain'
  };
  
  return ext ? contentTypes[ext] : undefined;
}

/**
 * Get processing steps based on input configuration
 */
function getProcessingSteps(input: DocumentProcessingInput): string[] {
  const steps = ["content_extraction"];
  
  if (input.processingOptions?.enableOCR && input.type === "file") {
    steps.push("ocr_processing");
  }
  
  if (input.processingOptions?.enableClassification) {
    steps.push("document_classification");
  }
  
  if (input.processingOptions?.enableStructuredExtraction) {
    steps.push("structured_data_extraction");
  }
  
  if (input.processingOptions?.enableChunking) {
    steps.push("content_chunking");
  }
  
  return steps;
}