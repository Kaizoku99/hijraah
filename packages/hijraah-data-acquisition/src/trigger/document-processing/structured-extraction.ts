/**
 * Structured Data Extraction Task
 * 
 * Task 7.1: Extract structured data using Firecrawl's schema extraction and AI SDK's tool calling for structured data
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { mistral } from "@ai-sdk/mistral";
import { generateObject, tool } from "ai";
import { z } from "zod";
import { StructuredDataSchema, type StructuredData, type DocumentClassification } from "./types.js";

// Input schema for structured data extraction
const ExtractionInputSchema = z.object({
  documentId: z.string(),
  content: z.string(),
  classification: z.object({
    primaryCategory: z.string(),
    documentType: z.string(),
    isImmigrationRelated: z.boolean(),
    language: z.string().optional(),
  }).optional(),
  fileName: z.string().optional(),
  extractionOptions: z.object({
    includePersonalInfo: z.boolean().default(true),
    includeDocumentInfo: z.boolean().default(true),
    includeContactInfo: z.boolean().default(true),
    includeImmigrationInfo: z.boolean().default(true),
    includeCustomFields: z.boolean().default(false),
    customFieldsSchema: z.record(z.any()).optional(),
  }).optional(),
});

type ExtractionInput = z.infer<typeof ExtractionInputSchema>;

// Enhanced structured data schema with validation
const EnhancedStructuredDataSchema = StructuredDataSchema.extend({
  extractionMetadata: z.object({
    extractedFields: z.array(z.string()),
    confidence: z.number().min(0).max(1),
    missingFields: z.array(z.string()).optional(),
    validationErrors: z.array(z.string()).optional(),
    extractionMethod: z.string(),
  }).optional(),
});

type EnhancedStructuredData = z.infer<typeof EnhancedStructuredDataSchema>;

/**
 * Extract structured data from documents using AI SDK's tool calling capabilities
 */
export const extractStructuredDataTask = task({
  id: "extract-structured-data",
  maxDuration: 180, // 3 minutes
  retry: {
    maxAttempts: 3,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 20000,
  },
  run: async (payload: ExtractionInput): Promise<EnhancedStructuredData> => {
    const startTime = Date.now();
    logger.info("Starting structured data extraction", { 
      documentId: payload.documentId,
      contentLength: payload.content.length,
      documentType: payload.classification?.primaryCategory 
    });

    try {
      // Validate input
      const validatedInput = ExtractionInputSchema.parse(payload);
      
      // Build extraction schema based on document type and options
      const extractionSchema = buildExtractionSchema(
        validatedInput.classification,
        validatedInput.extractionOptions
      );
      
      // Prepare extraction prompt
      const extractionPrompt = buildExtractionPrompt(
        validatedInput.content,
        validatedInput.classification,
        validatedInput.fileName
      );
      
      // Define extraction tools for AI SDK
      const extractionTools = createExtractionTools();
      
      // Perform structured extraction using Mistral
      const { object, usage } = await generateObject({
        model: mistral('mistral-large-latest'),
        schema: extractionSchema,
        messages: [
          {
            role: "system",
            content: `You are an expert data extraction specialist for immigration documents. 
            Extract structured information with high accuracy and attention to detail.
            Only extract information that is clearly present in the document.
            Use null or undefined for missing fields rather than guessing.`
          },
          {
            role: "user",
            content: extractionPrompt
          }
        ],
        temperature: 0, // Deterministic extraction
        tools: extractionTools,
      });

      // Validate and enhance the extracted data
      const enhancedResult = await validateAndEnhanceExtraction(
        object as StructuredData,
        validatedInput
      );
      
      const processingTime = Date.now() - startTime;
      
      logger.info("Structured data extraction completed", {
        documentId: validatedInput.documentId,
        extractedFields: enhancedResult.extractionMetadata?.extractedFields?.length || 0,
        confidence: enhancedResult.extractionMetadata?.confidence,
        processingTimeMs: processingTime
      });

      return {
        ...enhancedResult,
        extractionMetadata: {
          ...enhancedResult.extractionMetadata,
          processingTimeMs: processingTime,
          tokenUsage: usage?.totalTokens,
          modelVersion: "mistral-large-latest",
        }
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error("Structured data extraction failed", {
        documentId: payload.documentId,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTimeMs: processingTime
      });
      
      // Return empty result with error metadata
      return {
        extractionMetadata: {
          extractedFields: [],
          confidence: 0,
          validationErrors: [error instanceof Error ? error.message : "Unknown error"],
          extractionMethod: "failed",
          processingTimeMs: processingTime
        }
      };
    }
  },
});

/**
 * Build extraction schema based on document type and options
 */
function buildExtractionSchema(
  classification?: { primaryCategory: string; documentType: string; isImmigrationRelated: boolean },
  options?: ExtractionInput['extractionOptions']
): z.ZodSchema {
  
  let schema = z.object({});
  
  // Add personal info if enabled
  if (options?.includePersonalInfo !== false) {
    schema = schema.extend({
      personalInfo: z.object({
        fullName: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
        dateOfBirth: z.string().optional(),
        placeOfBirth: z.string().optional(),
        nationality: z.string().optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        maritalStatus: z.enum(["single", "married", "divorced", "widowed", "separated"]).optional(),
      }).optional(),
    });
  }
  
  // Add document info if enabled
  if (options?.includeDocumentInfo !== false) {
    schema = schema.extend({
      documentInfo: z.object({
        documentNumber: z.string().optional(),
        documentType: z.string().optional(),
        issueDate: z.string().optional(),
        expiryDate: z.string().optional(),
        issuingAuthority: z.string().optional(),
        issuingCountry: z.string().optional(),
        documentVersion: z.string().optional(),
      }).optional(),
    });
  }
  
  // Add contact info if enabled
  if (options?.includeContactInfo !== false) {
    schema = schema.extend({
      contactInfo: z.object({
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        postalCode: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        emergencyContact: z.string().optional(),
      }).optional(),
    });
  }
  
  // Add immigration-specific info if enabled and relevant
  if (options?.includeImmigrationInfo !== false && classification?.isImmigrationRelated) {
    schema = schema.extend({
      immigrationInfo: z.object({
        visaType: z.string().optional(),
        visaCategory: z.string().optional(),
        applicationNumber: z.string().optional(),
        caseNumber: z.string().optional(),
        sponsorInfo: z.string().optional(),
        petitionerInfo: z.string().optional(),
        purposeOfTravel: z.string().optional(),
        intendedStayDuration: z.string().optional(),
        portOfEntry: z.string().optional(),
        admissionDate: z.string().optional(),
        statusExpiryDate: z.string().optional(),
      }).optional(),
    });
  }
  
  // Add custom fields if specified
  if (options?.includeCustomFields && options.customFieldsSchema) {
    schema = schema.extend({
      customFields: z.object(options.customFieldsSchema).optional(),
    });
  }
  
  return schema;
}

/**
 * Build extraction prompt based on document type and content
 */
function buildExtractionPrompt(
  content: string,
  classification?: { primaryCategory: string; documentType: string; language?: string },
  fileName?: string
): string {
  const contentPreview = content.length > 4000 ? content.substring(0, 4000) + "..." : content;
  
  const documentTypeInstructions = getDocumentTypeInstructions(classification?.primaryCategory);
  
  return `Extract structured information from this ${classification?.primaryCategory || "document"}:

FILENAME: ${fileName || "Unknown"}
DOCUMENT TYPE: ${classification?.primaryCategory || "Unknown"}
LANGUAGE: ${classification?.language || "Unknown"}

DOCUMENT CONTENT:
${contentPreview}

${documentTypeInstructions}

EXTRACTION GUIDELINES:
1. Only extract information that is explicitly stated in the document
2. Use the exact format and spelling as it appears in the document
3. For dates, preserve the original format when possible
4. For names, extract the full name as it appears
5. If information is unclear or ambiguous, use null rather than guessing
6. Pay attention to official seals, stamps, and signatures
7. Note any handwritten vs. typed information
8. Extract all relevant numbers (document numbers, case numbers, etc.)`;
}

/**
 * Get document type-specific extraction instructions
 */
function getDocumentTypeInstructions(documentType?: string): string {
  const instructions: Record<string, string> = {
    passport: `
    PASSPORT-SPECIFIC INSTRUCTIONS:
    - Extract passport number from the document number field
    - Look for machine-readable zone (MRZ) data at the bottom
    - Note any visa stamps or entry/exit stamps
    - Extract issuing authority and country code
    - Pay attention to validity dates`,
    
    visa: `
    VISA-SPECIFIC INSTRUCTIONS:
    - Extract visa type, category, and classification
    - Look for validity period and number of entries allowed
    - Note any conditions or restrictions
    - Extract control numbers and foil numbers
    - Identify issuing embassy or consulate`,
    
    birth_certificate: `
    BIRTH CERTIFICATE INSTRUCTIONS:
    - Extract full name as recorded at birth
    - Note parents' names and information
    - Extract place of birth (hospital, city, state, country)
    - Look for certificate number and registration details
    - Note any amendments or corrections`,
    
    marriage_certificate: `
    MARRIAGE CERTIFICATE INSTRUCTIONS:
    - Extract both spouses' full names
    - Note date and place of marriage
    - Extract officiant information
    - Look for certificate number and registration details
    - Note witnesses if listed`,
    
    immigration_form: `
    IMMIGRATION FORM INSTRUCTIONS:
    - Extract all form fields and their values
    - Note form number and version
    - Look for USCIS receipt numbers or case numbers
    - Extract petitioner and beneficiary information
    - Note any supporting evidence mentioned`,
    
    medical_report: `
    MEDICAL REPORT INSTRUCTIONS:
    - Extract examining physician information
    - Note medical examination date
    - Look for vaccination records
    - Extract any medical findings or conditions
    - Note civil surgeon designation if applicable`,
  };
  
  return documentType ? instructions[documentType] || "" : "";
}

/**
 * Create extraction tools for AI SDK
 */
function createExtractionTools() {
  return {
    validateDate: tool({
      description: "Validate and format a date string",
      parameters: z.object({
        dateString: z.string(),
        expectedFormat: z.string().optional(),
      }),
      execute: async ({ dateString, expectedFormat }) => {
        // Simple date validation logic
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return { valid: false, formatted: null, error: "Invalid date format" };
        }
        return { 
          valid: true, 
          formatted: date.toISOString().split('T')[0], // YYYY-MM-DD format
          originalFormat: dateString 
        };
      },
    }),
    
    validateDocumentNumber: tool({
      description: "Validate document number format",
      parameters: z.object({
        documentNumber: z.string(),
        documentType: z.string(),
      }),
      execute: async ({ documentNumber, documentType }) => {
        // Basic validation patterns for common document types
        const patterns: Record<string, RegExp> = {
          passport: /^[A-Z0-9]{6,9}$/,
          visa: /^[A-Z0-9]{8,12}$/,
          ssn: /^\d{3}-\d{2}-\d{4}$/,
        };
        
        const pattern = patterns[documentType.toLowerCase()];
        const isValid = pattern ? pattern.test(documentNumber) : true; // Default to valid if no pattern
        
        return {
          valid: isValid,
          documentNumber,
          documentType,
          pattern: pattern?.source || "No specific pattern"
        };
      },
    }),
    
    extractPhoneNumber: tool({
      description: "Extract and format phone numbers",
      parameters: z.object({
        text: z.string(),
      }),
      execute: async ({ text }) => {
        // Simple phone number extraction
        const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
        const matches = text.match(phoneRegex);
        
        return {
          phoneNumbers: matches || [],
          count: matches?.length || 0
        };
      },
    }),
  };
}

/**
 * Validate and enhance extracted data
 */
async function validateAndEnhanceExtraction(
  extractedData: StructuredData,
  input: ExtractionInput
): Promise<EnhancedStructuredData> {
  
  const extractedFields: string[] = [];
  const validationErrors: string[] = [];
  const missingFields: string[] = [];
  
  // Count extracted fields
  if (extractedData.personalInfo) {
    Object.entries(extractedData.personalInfo).forEach(([key, value]) => {
      if (value) extractedFields.push(`personalInfo.${key}`);
    });
  }
  
  if (extractedData.documentInfo) {
    Object.entries(extractedData.documentInfo).forEach(([key, value]) => {
      if (value) extractedFields.push(`documentInfo.${key}`);
    });
  }
  
  if (extractedData.contactInfo) {
    Object.entries(extractedData.contactInfo).forEach(([key, value]) => {
      if (value) extractedFields.push(`contactInfo.${key}`);
    });
  }
  
  if (extractedData.immigrationInfo) {
    Object.entries(extractedData.immigrationInfo).forEach(([key, value]) => {
      if (value) extractedFields.push(`immigrationInfo.${key}`);
    });
  }
  
  // Validate critical fields based on document type
  const criticalFields = getCriticalFields(input.classification?.primaryCategory);
  criticalFields.forEach(field => {
    if (!extractedFields.includes(field)) {
      missingFields.push(field);
    }
  });
  
  // Calculate confidence based on extraction completeness
  const expectedFields = getExpectedFields(input.classification?.primaryCategory);
  const confidence = expectedFields.length > 0 
    ? extractedFields.length / expectedFields.length 
    : 0.5;
  
  return {
    ...extractedData,
    extractionMetadata: {
      extractedFields,
      confidence: Math.min(confidence, 1.0),
      missingFields: missingFields.length > 0 ? missingFields : undefined,
      validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
      extractionMethod: "ai_structured_output",
    }
  };
}

/**
 * Get critical fields for document type
 */
function getCriticalFields(documentType?: string): string[] {
  const criticalFieldsMap: Record<string, string[]> = {
    passport: [
      "personalInfo.fullName",
      "personalInfo.dateOfBirth",
      "documentInfo.documentNumber",
      "documentInfo.expiryDate"
    ],
    visa: [
      "personalInfo.fullName",
      "documentInfo.documentNumber",
      "immigrationInfo.visaType",
      "documentInfo.expiryDate"
    ],
    birth_certificate: [
      "personalInfo.fullName",
      "personalInfo.dateOfBirth",
      "personalInfo.placeOfBirth"
    ],
    marriage_certificate: [
      "personalInfo.fullName",
      "documentInfo.issueDate"
    ],
    immigration_form: [
      "personalInfo.fullName",
      "immigrationInfo.applicationNumber"
    ],
  };
  
  return documentType ? criticalFieldsMap[documentType] || [] : [];
}

/**
 * Get expected fields for document type
 */
function getExpectedFields(documentType?: string): string[] {
  const expectedFieldsMap: Record<string, string[]> = {
    passport: [
      "personalInfo.fullName", "personalInfo.dateOfBirth", "personalInfo.placeOfBirth",
      "personalInfo.nationality", "documentInfo.documentNumber", "documentInfo.issueDate",
      "documentInfo.expiryDate", "documentInfo.issuingAuthority"
    ],
    visa: [
      "personalInfo.fullName", "documentInfo.documentNumber", "immigrationInfo.visaType",
      "immigrationInfo.visaCategory", "documentInfo.issueDate", "documentInfo.expiryDate",
      "immigrationInfo.purposeOfTravel"
    ],
    birth_certificate: [
      "personalInfo.fullName", "personalInfo.dateOfBirth", "personalInfo.placeOfBirth",
      "personalInfo.gender", "documentInfo.documentNumber", "documentInfo.issueDate"
    ],
    marriage_certificate: [
      "personalInfo.fullName", "documentInfo.issueDate", "documentInfo.documentNumber"
    ],
    immigration_form: [
      "personalInfo.fullName", "personalInfo.dateOfBirth", "immigrationInfo.applicationNumber",
      "immigrationInfo.caseNumber", "contactInfo.address"
    ],
  };
  
  return documentType ? expectedFieldsMap[documentType] || [] : [];
}

/**
 * Batch structured data extraction task
 */
export const batchExtractStructuredDataTask = task({
  id: "batch-extract-structured-data",
  maxDuration: 900, // 15 minutes for batch processing
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 60000,
  },
  run: async (payload: {
    documents: ExtractionInput[];
    batchId: string;
  }): Promise<{
    batchId: string;
    results: (EnhancedStructuredData & { documentId: string })[];
    summary: {
      totalDocuments: number;
      successfulExtractions: number;
      failedExtractions: number;
      averageConfidence: number;
      totalFieldsExtracted: number;
    };
  }> => {
    logger.info("Starting batch structured data extraction", {
      batchId: payload.batchId,
      documentCount: payload.documents.length
    });

    const results: (EnhancedStructuredData & { documentId: string })[] = [];
    let successCount = 0;
    let failedCount = 0;
    let totalConfidence = 0;
    let totalFields = 0;

    // Process documents with concurrency limit
    const concurrencyLimit = 2; // Lower limit for complex extraction
    const chunks = [];
    
    for (let i = 0; i < payload.documents.length; i += concurrencyLimit) {
      chunks.push(payload.documents.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      const chunkPromises = chunk.map(async (doc) => {
        try {
          const result = await extractStructuredDataTask.triggerAndWait(doc);
          
          if (result.ok) {
            const extraction = result.output;
            successCount++;
            totalConfidence += extraction.extractionMetadata?.confidence || 0;
            totalFields += extraction.extractionMetadata?.extractedFields?.length || 0;
            
            return {
              ...extraction,
              documentId: doc.documentId
            };
          } else {
            failedCount++;
            logger.error("Structured data extraction failed in batch", {
              documentId: doc.documentId,
              error: result.error
            });
            
            return {
              documentId: doc.documentId,
              extractionMetadata: {
                extractedFields: [],
                confidence: 0,
                validationErrors: [result.error],
                extractionMethod: "failed",
              }
            };
          }
        } catch (error) {
          failedCount++;
          logger.error("Unexpected error in batch extraction", {
            documentId: doc.documentId,
            error: error instanceof Error ? error.message : "Unknown error"
          });
          
          return {
            documentId: doc.documentId,
            extractionMetadata: {
              extractedFields: [],
              confidence: 0,
              validationErrors: [error instanceof Error ? error.message : "Unknown error"],
              extractionMethod: "failed",
            }
          };
        }
      });

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    const summary = {
      totalDocuments: payload.documents.length,
      successfulExtractions: successCount,
      failedExtractions: failedCount,
      averageConfidence: successCount > 0 ? totalConfidence / successCount : 0,
      totalFieldsExtracted: totalFields,
    };

    logger.info("Batch structured data extraction completed", {
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