/**
 * Document Analysis Service
 * 
 * Uses Vercel AI SDK to analyze immigration documents, extracting information,
 * validating content, detecting languages, and identifying errors.
 */

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';

import { getDocumentTemplate } from '@/lib/document/templates';
import { extractTextFromPdf, extractTextFromImage } from '@/lib/document/text-extraction';
import { getSupabaseClient } from '@/lib/supabase/client';
import { DocumentAnalysis, DocumentType, ValidationResult } from '@/types/documents';

// Internal schema for AI response validation
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

// Internal type for the AI response
type DocumentAnalysisOutput = z.infer<typeof documentAnalysisOutputSchema>;

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
    
    // Analyze document text or image using AI
    let responseText = '';
    
    if (imageBuffer) {
      // For image-based documents, use vision model with multimodal input
      const response = await streamText({
        model: openai('gpt-4-vision-preview'),
        maxTokens: 4000,
        temperature: 0.1, // Low temperature for factual analysis
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { 
                type: 'image', 
                image: imageBuffer 
              }
            ]
          }
        ]
      });
      
      // Collect the full response text
      for await (const chunk of response.textStream) {
        responseText += chunk;
      }
    } else {
      // For text-based documents
      const response = await streamText({
        model: openai('gpt-4'),
        maxTokens: 4000,
        temperature: 0.1,
        prompt: `${prompt}\n\nDocument text: ${extractedText.substring(0, 12000)}`,
      });
      
      // Collect the full response text
      for await (const chunk of response.textStream) {
        responseText += chunk;
      }
    }
    
    // Parse the JSON response
    try {
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('Invalid JSON response from AI');
      }
      
      const jsonResponse = responseText.substring(jsonStart, jsonEnd);
      const parsedResponse = JSON.parse(jsonResponse);
      
      // Validate response against schema
      const analysisOutput = documentAnalysisOutputSchema.parse(parsedResponse);
      
      // Log the analysis for tracking
      await logDocumentAnalysis(documentType, analysisOutput);
      
      // Map the AI output to DocumentAnalysis
      return {
        id: Date.now().toString(),
        userId: 'system', // Default user
        documentType: documentType as DocumentType,
        fileName: documentUrl.split('/').pop() || 'unknown',
        fileUrl: documentUrl,
        extractedData: analysisOutput.extractedData,
        analysisDate: new Date(),
        status: analysisOutput.isValid ? 'completed' : 'failed',
        errorMessage: analysisOutput.formatErrors.length > 0 ? analysisOutput.formatErrors[0].message : undefined,
        confidence: analysisOutput.completeness,
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse document analysis results');
    }
  } catch (error) {
    console.error('Document analysis error:', error);
    
    // Return a fallback analysis with error information
    return {
      id: Date.now().toString(),
      userId: 'system',
      documentType: documentType as DocumentType,
      fileName: documentUrl.split('/').pop() || 'unknown',
      fileUrl: documentUrl,
      extractedData: {},
      analysisDate: new Date(),
      status: 'failed',
      errorMessage: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      confidence: 0,
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
  "isValid": boolean,
  "missingFields": ["field1", "field2"],
  "invalidFields": { "field1": "reason", "field2": "reason" },
  "confidence": number from 0 to 1,
  "warnings": ["warning1", "warning2"]
}`;

    // Call the AI
    const response = await streamText({
      model: openai('gpt-4'),
      maxTokens: 2000,
      temperature: 0.1,
      prompt,
    });
    
    // Collect the full response text
    let responseText = '';
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    
    // Parse the response
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonResponse = responseText.substring(jsonStart, jsonEnd);
    const result = JSON.parse(jsonResponse);
    
    // Return the validation result conforming to the interface
    return {
      isValid: result.isValid,
      missingFields: result.missingFields || [],
      invalidFields: result.invalidFields || {},
      confidence: result.confidence || 0,
      warnings: result.warnings || [],
    };
  } catch (error) {
    console.error('Validation error:', error);
    return {
      isValid: false,
      missingFields: ['general'],
      invalidFields: { 
        general: `Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      confidence: 0,
      warnings: [],
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
async function logDocumentAnalysis(documentType: string, analysis: DocumentAnalysisOutput): Promise<void> {
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