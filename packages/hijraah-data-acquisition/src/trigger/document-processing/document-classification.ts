/**
 * Document Classification Task
 * 
 * Task 7.1: Classify documents using Mistral's generateObject() with structured Zod schemas for immigration document categorization
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { mistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import { z } from "zod";
import { DocumentClassificationSchema, type DocumentClassification } from "./types.js";

// Input schema for document classification
const ClassificationInputSchema = z.object({
  documentId: z.string(),
  content: z.string(),
  fileName: z.string().optional(),
  fileBuffer: z.string().optional(), // Base64 encoded for visual analysis
  metadata: z.record(z.any()).optional(),
});

type ClassificationInput = z.infer<typeof ClassificationInputSchema>;

// Enhanced classification schema with additional immigration-specific fields
const EnhancedDocumentClassificationSchema = DocumentClassificationSchema.extend({
  subCategory: z.string().optional().describe("More specific document subcategory"),
  urgencyLevel: z.enum(["low", "medium", "high", "critical"]).describe("Processing urgency based on document type"),
  expiryDate: z.string().optional().describe("Document expiry date if applicable"),
  issuingAuthority: z.string().optional().describe("Authority that issued the document"),
  countryOfOrigin: z.string().optional().describe("Country where document was issued"),
  processingComplexity: z.enum(["simple", "moderate", "complex"]).describe("Expected processing complexity"),
  requiredActions: z.array(z.string()).optional().describe("Actions required based on document type"),
});

type EnhancedDocumentClassification = z.infer<typeof EnhancedDocumentClassificationSchema>;

/**
 * Classify documents using Mistral's structured output capabilities
 * Specialized for immigration document categorization
 */
export const classifyDocumentTask = task({
  id: "classify-document",
  maxDuration: 120, // 2 minutes
  retry: {
    maxAttempts: 3,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 15000,
  },
  run: async (payload: ClassificationInput): Promise<EnhancedDocumentClassification> => {
    const startTime = Date.now();
    logger.info("Starting document classification", { 
      documentId: payload.documentId,
      fileName: payload.fileName,
      contentLength: payload.content.length 
    });

    try {
      // Validate input
      const validatedInput = ClassificationInputSchema.parse(payload);
      
      // Prepare classification prompt
      const classificationPrompt = buildClassificationPrompt(
        validatedInput.content,
        validatedInput.fileName,
        validatedInput.metadata
      );
      
      // Perform classification using Mistral's structured output
      const { object, usage } = await generateObject({
        model: mistral('mistral-large-latest'),
        schema: EnhancedDocumentClassificationSchema,
        messages: [
          {
            role: "system",
            content: `You are an expert immigration document classifier with deep knowledge of:
            - Immigration document types and formats
            - Government document structures
            - Legal document requirements
            - International document standards
            
            Analyze the provided document content and classify it accurately according to the schema.
            Pay special attention to document headers, official seals, formatting patterns, and content structure.`
          },
          {
            role: "user",
            content: classificationPrompt
          }
        ],
        temperature: 0, // Deterministic classification
      });

      // Validate and enhance the classification result
      const enhancedResult = await enhanceClassificationResult(object, validatedInput);
      
      const processingTime = Date.now() - startTime;
      
      logger.info("Document classification completed", {
        documentId: validatedInput.documentId,
        primaryCategory: enhancedResult.primaryCategory,
        confidence: enhancedResult.confidence,
        isImmigrationRelated: enhancedResult.isImmigrationRelated,
        urgencyLevel: enhancedResult.urgencyLevel,
        processingTimeMs: processingTime
      });

      return {
        ...enhancedResult,
        metadata: {
          ...enhancedResult.metadata,
          processingTimeMs: processingTime,
          tokenUsage: usage?.totalTokens,
          modelVersion: "mistral-large-latest",
          classificationMethod: "structured_output"
        }
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error("Document classification failed", {
        documentId: payload.documentId,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTimeMs: processingTime
      });
      
      // Return fallback classification
      return {
        primaryCategory: "other",
        confidence: 0.3,
        language: "en",
        documentType: "personal",
        isImmigrationRelated: false,
        urgencyLevel: "medium",
        processingComplexity: "moderate",
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error",
          processingTimeMs: processingTime,
          fallbackClassification: true
        }
      };
    }
  },
});

/**
 * Build comprehensive classification prompt
 */
function buildClassificationPrompt(
  content: string,
  fileName?: string,
  metadata?: Record<string, any>
): string {
  const contentPreview = content.length > 3000 ? content.substring(0, 3000) + "..." : content;
  
  return `Please classify this document based on the following information:

FILENAME: ${fileName || "Unknown"}

DOCUMENT CONTENT:
${contentPreview}

${metadata ? `ADDITIONAL METADATA: ${JSON.stringify(metadata, null, 2)}` : ""}

Analyze the document structure, content patterns, official formatting, and terminology to determine:
1. The primary document category
2. Whether it's immigration-related
3. The document type (official, personal, commercial, legal, medical)
4. The language used
5. Processing urgency and complexity
6. Any specific requirements or actions needed

Consider these immigration document indicators:
- Passport numbers, visa stamps, entry/exit records
- Immigration forms (I-94, DS-160, etc.)
- Birth certificates, marriage certificates for family-based immigration
- Employment authorization documents
- Medical examination reports for immigration
- Police clearance certificates
- Educational credentials for skilled worker visas
- Bank statements for financial proof
- Sponsor documentation and affidavits of support`;
}

/**
 * Enhance classification result with additional processing logic
 */
async function enhanceClassificationResult(
  baseResult: EnhancedDocumentClassification,
  input: ClassificationInput
): Promise<EnhancedDocumentClassification> {
  
  // Determine urgency level based on document type
  const urgencyMapping: Record<string, "low" | "medium" | "high" | "critical"> = {
    "passport": "high",
    "visa": "critical",
    "immigration_form": "high",
    "medical_report": "high",
    "police_clearance": "medium",
    "birth_certificate": "medium",
    "marriage_certificate": "medium",
    "employment_letter": "medium",
    "bank_statement": "low",
    "education_certificate": "medium",
    "other": "low"
  };

  // Determine processing complexity
  const complexityMapping: Record<string, "simple" | "moderate" | "complex"> = {
    "passport": "moderate",
    "visa": "complex",
    "immigration_form": "complex",
    "medical_report": "moderate",
    "police_clearance": "simple",
    "birth_certificate": "simple",
    "marriage_certificate": "simple",
    "employment_letter": "simple",
    "bank_statement": "simple",
    "education_certificate": "moderate",
    "other": "moderate"
  };

  // Generate required actions based on document type
  const requiredActions = generateRequiredActions(baseResult.primaryCategory, input.content);

  return {
    ...baseResult,
    urgencyLevel: baseResult.urgencyLevel || urgencyMapping[baseResult.primaryCategory] || "medium",
    processingComplexity: baseResult.processingComplexity || complexityMapping[baseResult.primaryCategory] || "moderate",
    requiredActions: baseResult.requiredActions || requiredActions,
  };
}

/**
 * Generate required actions based on document type and content
 */
function generateRequiredActions(category: string, content: string): string[] {
  const actions: string[] = [];
  
  switch (category) {
    case "passport":
      actions.push("Verify passport validity");
      actions.push("Check visa stamps");
      actions.push("Validate personal information");
      if (content.toLowerCase().includes("expired")) {
        actions.push("Flag expired passport");
      }
      break;
      
    case "visa":
      actions.push("Verify visa type and category");
      actions.push("Check validity dates");
      actions.push("Validate conditions and restrictions");
      actions.push("Cross-reference with passport");
      break;
      
    case "immigration_form":
      actions.push("Validate form completion");
      actions.push("Check required signatures");
      actions.push("Verify supporting documentation");
      actions.push("Review for consistency");
      break;
      
    case "medical_report":
      actions.push("Verify authorized physician");
      actions.push("Check vaccination records");
      actions.push("Validate medical examination date");
      actions.push("Review for disqualifying conditions");
      break;
      
    case "police_clearance":
      actions.push("Verify issuing authority");
      actions.push("Check validity period");
      actions.push("Validate apostille/authentication");
      break;
      
    case "birth_certificate":
    case "marriage_certificate":
      actions.push("Verify official seal and signatures");
      actions.push("Check translation requirements");
      actions.push("Validate apostille/authentication");
      break;
      
    case "employment_letter":
      actions.push("Verify employer information");
      actions.push("Check job details and salary");
      actions.push("Validate employment dates");
      break;
      
    case "bank_statement":
      actions.push("Verify financial institution");
      actions.push("Check statement period");
      actions.push("Validate account holder information");
      actions.push("Review transaction history");
      break;
      
    default:
      actions.push("Manual review required");
      actions.push("Determine specific requirements");
  }
  
  return actions;
}

/**
 * Batch classification task for processing multiple documents
 */
export const batchClassifyDocumentsTask = task({
  id: "batch-classify-documents",
  maxDuration: 600, // 10 minutes for batch processing
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: {
    documents: ClassificationInput[];
    batchId: string;
  }): Promise<{
    batchId: string;
    results: (EnhancedDocumentClassification & { documentId: string })[];
    summary: {
      totalDocuments: number;
      successfulClassifications: number;
      failedClassifications: number;
      immigrationDocuments: number;
      urgentDocuments: number;
    };
  }> => {
    logger.info("Starting batch document classification", {
      batchId: payload.batchId,
      documentCount: payload.documents.length
    });

    const results: (EnhancedDocumentClassification & { documentId: string })[] = [];
    let successCount = 0;
    let failedCount = 0;
    let immigrationCount = 0;
    let urgentCount = 0;

    // Process documents in parallel with concurrency limit
    const concurrencyLimit = 3;
    const chunks = [];
    
    for (let i = 0; i < payload.documents.length; i += concurrencyLimit) {
      chunks.push(payload.documents.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      const chunkPromises = chunk.map(async (doc) => {
        try {
          const result = await classifyDocumentTask.triggerAndWait(doc);
          
          if (result.ok) {
            const classification = result.output;
            successCount++;
            
            if (classification.isImmigrationRelated) {
              immigrationCount++;
            }
            
            if (classification.urgencyLevel === "high" || classification.urgencyLevel === "critical") {
              urgentCount++;
            }
            
            return {
              ...classification,
              documentId: doc.documentId
            };
          } else {
            failedCount++;
            logger.error("Document classification failed in batch", {
              documentId: doc.documentId,
              error: result.error
            });
            
            return {
              documentId: doc.documentId,
              primaryCategory: "other" as const,
              confidence: 0,
              language: "en",
              documentType: "personal" as const,
              isImmigrationRelated: false,
              urgencyLevel: "medium" as const,
              processingComplexity: "moderate" as const,
              metadata: {
                batchProcessingError: result.error
              }
            };
          }
        } catch (error) {
          failedCount++;
          logger.error("Unexpected error in batch classification", {
            documentId: doc.documentId,
            error: error instanceof Error ? error.message : "Unknown error"
          });
          
          return {
            documentId: doc.documentId,
            primaryCategory: "other" as const,
            confidence: 0,
            language: "en",
            documentType: "personal" as const,
            isImmigrationRelated: false,
            urgencyLevel: "medium" as const,
            processingComplexity: "moderate" as const,
            metadata: {
              batchProcessingError: error instanceof Error ? error.message : "Unknown error"
            }
          };
        }
      });

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    const summary = {
      totalDocuments: payload.documents.length,
      successfulClassifications: successCount,
      failedClassifications: failedCount,
      immigrationDocuments: immigrationCount,
      urgentDocuments: urgentCount,
    };

    logger.info("Batch document classification completed", {
      batchId: payload.batchId,
      summary
    });

    return {
      batchId: payload.batchId,
      results,
      summary
    };
  },
});