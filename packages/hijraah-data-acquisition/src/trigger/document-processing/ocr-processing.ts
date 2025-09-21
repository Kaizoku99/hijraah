/**
 * OCR Processing Task
 * 
 * Task 7.1: Perform OCR using Mistral's vision model through AI SDK for 95%+ accuracy on immigration documents
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { mistral } from "@ai-sdk/mistral";
import { generateText } from "ai";
import { z } from "zod";
import { OCRResultSchema, type OCRResult } from "./types.js";

// Input schema for OCR processing
const OCRInputSchema = z.object({
  documentId: z.string(),
  fileBuffer: z.string(), // Base64 encoded file content
  fileName: z.string().optional(),
  language: z.string().default("en"),
  documentType: z.enum(["passport", "visa", "certificate", "form", "other"]).optional(),
  enhanceAccuracy: z.boolean().default(true),
});

type OCRInput = z.infer<typeof OCRInputSchema>;

/**
 * Perform OCR on uploaded documents using Mistral's vision model
 * Optimized for immigration documents with 95%+ accuracy target
 */
export const performOCRTask = task({
  id: "perform-ocr",
  maxDuration: 180, // 3 minutes for OCR processing
  retry: {
    maxAttempts: 2,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: OCRInput): Promise<OCRResult> => {
    const startTime = Date.now();
    logger.info("Starting OCR processing", { 
      documentId: payload.documentId,
      fileName: payload.fileName,
      documentType: payload.documentType 
    });

    try {
      // Validate input
      const validatedInput = OCRInputSchema.parse(payload);
      
      // Convert base64 to buffer for processing
      const fileBuffer = Buffer.from(validatedInput.fileBuffer, 'base64');
      
      // Prepare OCR prompt based on document type
      const ocrPrompt = buildOCRPrompt(validatedInput.documentType, validatedInput.language);
      
      // Perform OCR using Mistral's vision model
      const { text, usage } = await generateText({
        model: mistral('pixtral-large-latest'), // Best vision model for accuracy
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: ocrPrompt
              },
              {
                type: "image",
                image: fileBuffer,
              }
            ]
          }
        ],
        temperature: 0, // Deterministic for OCR accuracy
        maxTokens: 4000, // Allow for long documents
      });

      // Calculate confidence score based on text characteristics
      const confidence = calculateOCRConfidence(text, validatedInput.documentType);
      
      // Detect language if not specified
      const detectedLanguage = validatedInput.language || (await detectLanguage(text));
      
      const processingTime = Date.now() - startTime;
      
      const result: OCRResult = {
        extractedText: text,
        confidence,
        language: detectedLanguage,
        processingMethod: "mistral_vision",
        metadata: {
          fileName: validatedInput.fileName,
          fileSize: fileBuffer.length,
          processingTimeMs: processingTime,
          tokenUsage: usage?.totalTokens,
          modelVersion: "pixtral-large-latest",
          documentType: validatedInput.documentType,
          processedAt: new Date().toISOString()
        }
      };

      logger.info("OCR processing completed", {
        documentId: validatedInput.documentId,
        textLength: text.length,
        confidence,
        processingTimeMs: processingTime
      });

      return result;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error("OCR processing failed", {
        documentId: payload.documentId,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTimeMs: processingTime
      });
      
      throw error;
    }
  },
});

/**
 * Build OCR prompt optimized for specific document types
 */
function buildOCRPrompt(documentType?: string, language: string = "en"): string {
  const basePrompt = `Extract all text content from this document with maximum accuracy. Preserve the original structure, formatting, and layout as much as possible.`;
  
  const typeSpecificInstructions: Record<string, string> = {
    passport: `This is a passport document. Pay special attention to:
    - Personal information (full name, date of birth, place of birth, nationality)
    - Passport number and issuing authority
    - Issue and expiry dates
    - Any visa stamps or entry/exit stamps
    - Machine-readable zone (MRZ) at the bottom`,
    
    visa: `This is a visa document. Focus on:
    - Visa type and category
    - Validity dates and duration of stay
    - Passport information
    - Issuing embassy or consulate
    - Any conditions or restrictions
    - Control numbers and reference codes`,
    
    certificate: `This is an official certificate. Extract:
    - Certificate type and title
    - Personal details (names, dates, places)
    - Issuing authority and official seals
    - Certificate number and date of issue
    - Any signatures or official stamps`,
    
    form: `This is an official form. Capture:
    - All form fields and their values
    - Form number and version
    - Dates and signatures
    - Any handwritten or typed entries
    - Official stamps or markings`
  };

  const typeInstruction = documentType ? typeSpecificInstructions[documentType] || "" : "";
  
  const languageInstruction = language !== "en" 
    ? `\n\nThe document may contain text in ${language}. Extract all text regardless of language.`
    : "";

  return `${basePrompt}\n\n${typeInstruction}${languageInstruction}\n\nProvide the extracted text in a clear, structured format that maintains the document's logical flow.`;
}

/**
 * Calculate OCR confidence score based on text characteristics
 */
function calculateOCRConfidence(text: string, documentType?: string): number {
  let confidence = 0.9; // Base confidence for Mistral vision model
  
  // Adjust based on text length (very short or very long texts may be less reliable)
  if (text.length < 50) {
    confidence -= 0.1;
  } else if (text.length > 5000) {
    confidence -= 0.05;
  }
  
  // Check for common OCR artifacts that might indicate lower quality
  const ocrArtifacts = [
    /[^\w\s\-.,;:!?()[\]{}'"@#$%^&*+=<>\/\\|`~]/g, // Unusual characters
    /\s{3,}/g, // Multiple consecutive spaces
    /[A-Z]{10,}/g, // Very long uppercase sequences (might be OCR errors)
  ];
  
  let artifactCount = 0;
  ocrArtifacts.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      artifactCount += matches.length;
    }
  });
  
  // Reduce confidence based on artifacts
  confidence -= Math.min(artifactCount * 0.02, 0.2);
  
  // Document type specific adjustments
  if (documentType === "passport" || documentType === "visa") {
    // These typically have structured formats, so we can be more confident
    if (text.includes("PASSPORT") || text.includes("VISA")) {
      confidence += 0.05;
    }
  }
  
  return Math.max(0.5, Math.min(1.0, confidence));
}

/**
 * Simple language detection based on text patterns
 */
async function detectLanguage(text: string): Promise<string> {
  // Simple heuristic-based language detection
  // In a production system, you might use a proper language detection library
  
  const sampleText = text.substring(0, 500).toLowerCase();
  
  // Common patterns for different languages
  const languagePatterns: Record<string, RegExp[]> = {
    "es": [/\b(el|la|de|en|con|por|para|que|una?|los?|las?)\b/g],
    "fr": [/\b(le|la|de|du|des|et|avec|pour|que|une?|les)\b/g],
    "ar": [/[\u0600-\u06FF]/g], // Arabic script
    "zh": [/[\u4e00-\u9fff]/g], // Chinese characters
  };
  
  let bestMatch = "en";
  let maxScore = 0;
  
  for (const [lang, patterns] of Object.entries(languagePatterns)) {
    let score = 0;
    patterns.forEach(pattern => {
      const matches = sampleText.match(pattern);
      if (matches) {
        score += matches.length;
      }
    });
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = lang;
    }
  }
  
  return bestMatch;
}

/**
 * Enhanced OCR task for high-accuracy processing of critical documents
 */
export const performEnhancedOCRTask = task({
  id: "perform-enhanced-ocr",
  maxDuration: 300, // 5 minutes for enhanced processing
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 20000,
  },
  run: async (payload: OCRInput & { criticalFields?: string[] }): Promise<OCRResult> => {
    logger.info("Starting enhanced OCR processing", { 
      documentId: payload.documentId,
      criticalFields: payload.criticalFields 
    });

    try {
      // First pass: Standard OCR
      const standardResult = await performOCRTask.triggerAndWait(payload);
      
      if (!standardResult.ok) {
        throw new Error("Standard OCR failed");
      }
      
      const firstPassResult = standardResult.output;
      
      // If confidence is already high, return the result
      if (firstPassResult.confidence >= 0.95) {
        logger.info("High confidence achieved in first pass", {
          confidence: firstPassResult.confidence
        });
        return firstPassResult;
      }
      
      // Second pass: Enhanced processing for critical fields
      if (payload.criticalFields && payload.criticalFields.length > 0) {
        const enhancedText = await enhanceOCRForCriticalFields(
          payload.fileBuffer,
          firstPassResult.extractedText,
          payload.criticalFields
        );
        
        return {
          ...firstPassResult,
          extractedText: enhancedText,
          confidence: Math.min(firstPassResult.confidence + 0.1, 1.0),
          metadata: {
            ...firstPassResult.metadata,
            enhancedProcessing: true,
            criticalFieldsProcessed: payload.criticalFields
          }
        };
      }
      
      return firstPassResult;
      
    } catch (error) {
      logger.error("Enhanced OCR processing failed", {
        documentId: payload.documentId,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  },
});

/**
 * Enhance OCR results for critical fields using targeted prompts
 */
async function enhanceOCRForCriticalFields(
  fileBuffer: string,
  initialText: string,
  criticalFields: string[]
): Promise<string> {
  
  const buffer = Buffer.from(fileBuffer, 'base64');
  
  const enhancementPrompt = `
  I have already extracted this text from the document:
  
  ${initialText}
  
  Please focus specifically on these critical fields and provide any corrections or additional details:
  ${criticalFields.map(field => `- ${field}`).join('\n')}
  
  Look carefully at the image and provide the most accurate reading of these specific fields.
  If any of these fields appear to be incorrectly transcribed in the initial text, please provide the correct version.
  `;

  const { text } = await generateText({
    model: mistral('pixtral-large-latest'),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: enhancementPrompt
          },
          {
            type: "image",
            image: buffer,
          }
        ]
      }
    ],
    temperature: 0,
    maxTokens: 2000,
  });

  // Merge the enhanced results with the original text
  // This is a simplified merge - in production, you might want more sophisticated merging logic
  return `${initialText}\n\n--- Enhanced Critical Fields ---\n${text}`;
}