/**
 * Document Analysis Service
 * 
 * Uses Vercel AI SDK to analyze immigration documents, extracting information,
 * validating content, detecting languages, and identifying errors.
 */

import { createAI } from '@vercel/ai';
import { z } from 'zod';
import { DocumentAnalysis, DocumentType, ValidationResult } from '@/types/documents';
import { getSupabaseClient } from '@/lib/supabase/client';
import { extractTextFromPdf, extractTextFromImage } from '@/lib/document/text-extraction';
import { getDocumentTemplate } from '@/lib/document/templates';

// Create an AI instance for document analysis
const documentAI = createAI({
  mode: 'completion',
  model: 'openai:gpt-4-vision-preview',
  temperature: 0.1, // Low temperature for factual analysis
  maxTokens: 4000,
  generateMetadata: true,
  retry: {
    attempts: 2, 
    initialDelay: 500,
  },
});

// Document analysis output schema for validation
const documentAnalysisOutputSchema = z.object({
  isValid: z.boolean(),
  extractedData: z.record(z.any()),
  formatErrors: z.array(z.object({
    type: z.enum(['critical', 'warning']),
    message: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }).optional(),
    suggestion: z.string().optional(),
  })),
  contentErrors: z.array(z.object({
    type: z.enum(['critical', 'warning']),
    message: z.string(),
    section: z.string(),
    suggestion: z.string().optional(),
  })),
  completeness: z.number().min(0).max(1),
  languageDetection: z.object({
    primary: z.string(),
    confidence: z.number().min(0).max(1),
    secondary: z.string().optional(),
  }),
});

/**
 * Main document analyzer function
 */
export async function analyzeDocument(
  documentUrl: string,
  documentType: string,
  targetCountry?: string,
  languageOverride?: string,
): Promise<DocumentAnalysis> {
  try {
    // Log analysis start for monitoring
    console.log(`Starting document analysis for type: ${documentType}`);
    
    // Extract text from document based on file type
    let extractedText = '';
    let imageBuffer: Buffer | null = null;
    
    if (documentUrl.endsWith('.pdf')) {
      extractedText = await extractTextFromPdf(documentUrl);
    } else if (/\.(jpg|jpeg|png|tiff|webp)$/i.test(documentUrl)) {
      const result = await extractTextFromImage(documentUrl);
      extractedText = result.text;
      imageBuffer = result.buffer;
    } else {
      throw new Error('Unsupported document format');
    }
    
    // Get the template for this document type
    const template = await getDocumentTemplate(documentType as DocumentType, targetCountry);
    
    // Build the prompt for the AI based on document type
    const prompt = buildAnalysisPrompt({
      documentType,
      extractedText,
      targetCountry,
      template,
      languageOverride,
    });
    
    // For image-based documents, use vision model
    let response;
    if (imageBuffer) {
      response = await documentAI.complete({
        prompt,
        maxTokens: 3000,
        temperature: 0.1,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { 
                type: 'image_url', 
                image_url: {
                  url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
                }
              }
            ]
          }
        ]
      });
    } else {
      // For text-based documents
      response = await documentAI.complete({
        prompt: `${prompt}\n\nDocument text: ${extractedText.substring(0, 12000)}`,
        maxTokens: 3000,
        temperature: 0.1,
      });
    }
    
    // Parse the JSON response
    try {
      const responseText = await response.text();
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('Invalid JSON response from AI');
      }
      
      const jsonResponse = responseText.substring(jsonStart, jsonEnd);
      const parsedResponse = JSON.parse(jsonResponse);
      
      // Validate response against schema
      const validatedResponse = documentAnalysisOutputSchema.parse(parsedResponse);
      
      // Log the analysis for tracking
      await logDocumentAnalysis(documentType, validatedResponse);
      
      return validatedResponse;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse document analysis results');
    }
  } catch (error) {
    console.error('Document analysis error:', error);
    
    // Return a fallback analysis with error information
    return {
      isValid: false,
      extractedData: {},
      formatErrors: [{
        type: 'critical',
        message: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }],
      contentErrors: [],
      completeness: 0,
      languageDetection: {
        primary: languageOverride || 'en',
        confidence: 0.5,
      }
    };
  }
}

/**
 * Validate document data against a template
 */
export async function validateAgainstTemplate(
  documentType: string,
  extractedData: Record<string, any>,
  targetCountry?: string
): Promise<ValidationResult> {
  try {
    // Get template for validation
    const template = await getDocumentTemplate(documentType as DocumentType, targetCountry);
    
    // Build prompt for validation
    const prompt = `You are a document validation expert specializing in immigration documents.
    
Validate the following extracted data against the expected template for a ${documentType} document${targetCountry ? ` for ${targetCountry}` : ''}.

Expected template fields:
${JSON.stringify(template.fields)}

Extracted data:
${JSON.stringify(extractedData)}

Analyze for:
1. Missing required fields
2. Invalid data formats
3. Inconsistent information
4. Suspicious or concerning data

Respond with a JSON object following this structure:
{
  "valid": boolean,
  "errors": [
    {
      "field": "fieldName",
      "message": "Error description",
      "type": "critical" or "warning"
    }
  ],
  "suggestions": [
    {
      "field": "fieldName",
      "suggestion": "How to fix the issue"
    }
  ],
  "completenessScore": number from 0 to 1
}`;

    // Call the AI
    const response = await documentAI.complete({
      prompt,
      maxTokens: 2000,
      temperature: 0.1,
    });
    
    // Parse the response
    const responseText = await response.text();
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonResponse = responseText.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonResponse);
  } catch (error) {
    console.error('Validation error:', error);
    return {
      valid: false,
      errors: [{
        field: 'general',
        message: `Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'critical',
      }],
      suggestions: [],
      completenessScore: 0,
    };
  }
}

/**
 * Build the prompt for document analysis
 */
function buildAnalysisPrompt({
  documentType,
  extractedText,
  targetCountry,
  template,
  languageOverride,
}: {
  documentType: string;
  extractedText: string;
  targetCountry?: string;
  template: any;
  languageOverride?: string;
}): string {
  return `You are an expert document analyzer specializing in immigration documents.

Document Type: ${documentType}
${targetCountry ? `Target Country: ${targetCountry}` : ''}
${languageOverride ? `Document Language: ${languageOverride}` : ''}

Your task is to analyze this ${documentType} document and extract key information, validate its format, identify any errors, and detect the language.

${template ? `Expected fields for this document:\n${JSON.stringify(template.fields, null, 2)}` : ''}

Provide a comprehensive analysis as a JSON object with the following structure:
{
  "isValid": boolean,
  "extractedData": {
    // All extracted fields and values from the document
  },
  "formatErrors": [
    {
      "type": "critical" or "warning",
      "message": "Description of the format error",
      "position": { "x": number, "y": number } (if applicable),
      "suggestion": "How to fix the error" (if applicable)
    }
  ],
  "contentErrors": [
    {
      "type": "critical" or "warning",
      "message": "Description of the content error",
      "section": "Which part of the document has the error",
      "suggestion": "How to fix the error" (if applicable)
    }
  ],
  "completeness": number from 0 to 1,
  "languageDetection": {
    "primary": "ISO language code",
    "confidence": number from 0 to 1,
    "secondary": "Secondary language ISO code" (if applicable)
  }
}

IMPORTANT: Respond ONLY with the JSON object, no other text.`;
}

/**
 * Log document analysis for tracking
 */
async function logDocumentAnalysis(documentType: string, analysis: DocumentAnalysis): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    
    await supabase.from('document_analysis_logs').insert({
      document_type: documentType,
      is_valid: analysis.isValid,
      completeness_score: analysis.completeness,
      format_error_count: analysis.formatErrors.length,
      content_error_count: analysis.contentErrors.length,
      primary_language: analysis.languageDetection.primary,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    // Just log the error but don't fail the analysis
    console.error('Failed to log document analysis:', error);
  }
} 