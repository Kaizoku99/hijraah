import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeDocument, validateAgainstTemplate } from '@/lib/ai/document-analyzer';
import { DocumentAnalysisRequestSchema } from '@/types/documents';
import { saveDocumentAnalysisResult } from '@/lib/document/analysis-storage';
import { nanoid } from 'nanoid';

// For API optimization
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Set max duration to 60 seconds

// Response Schema
const DocumentAnalysisResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

/**
 * API route for analyzing documents using AI
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { documentType, fileUrl, userId, targetCountry, languageOverride } = 
      DocumentAnalysisRequestSchema.parse(body);

    // Analyze the document
    const analysisResult = await analyzeDocument(
      fileUrl,
      documentType,
      targetCountry,
      languageOverride
    );

    // Generate a document ID if not provided
    const documentId = body.documentId || nanoid();
    
    // Save analysis result to database if userId is provided
    if (userId) {
      await saveDocumentAnalysisResult(
        documentId,
        userId,
        documentType,
        analysisResult,
        fileUrl
      );
    }

    // Log the analysis request (in a real app this would go to a database)
    console.info(`Document analysis performed: ${documentType} for user ${userId || 'anonymous'}`);

    return NextResponse.json({
      success: true,
      data: analysisResult,
      documentId
    });
  } catch (error) {
    console.error('Document analysis API error:', error);
    
    // Determine the appropriate error status code
    let status = 500;
    if (error instanceof z.ZodError) {
      status = 400; // Bad request for validation errors
    } else if (error instanceof Error && error.message.includes('not found')) {
      status = 404; // Not found errors
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status });
  }
}

/**
 * API route for validating document data against templates
 */
export async function PUT(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validationSchema = z.object({
      documentType: z.string(),
      extractedData: z.record(z.any()),
      targetCountry: z.string().optional(),
    });
    
    const { documentType, extractedData, targetCountry } = validationSchema.parse(body);

    // Validate the data against the template
    const validationResult = await validateAgainstTemplate(
      documentType,
      extractedData,
      targetCountry
    );

    return NextResponse.json({
      success: true,
      data: validationResult,
    });
  } catch (error) {
    console.error('Document validation API error:', error);
    
    // Determine the appropriate error status code
    let status = 500;
    if (error instanceof z.ZodError) {
      status = 400; // Bad request for validation errors
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status });
  }
} 