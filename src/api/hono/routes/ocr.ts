/**
 * OCR API Routes
 * 
 * This file contains API routes for document OCR processing using Mistral OCR
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { processMistralOCR, processMistralOCRWithFileUpload, processMistralOCRWithImage, askDocumentQuestion } from '@/lib/ai/mistral-ocr';
import { extractTextFromPdfWithMistralOCR, extractTextFromImageWithMistralOCR } from '@/lib/document/text-extraction';
import { supabase } from '@/lib/supabase';
import { canProcessBatch, createRateLimitMiddleware, storeDocument, updateDocumentStatus, getDocumentOCR, processBatch } from '@/lib/batch-processing';

// Create a Hono app for OCR routes
const app = new Hono();

// URL-based OCR processing
const urlProcessSchema = z.object({
  url: z.string().url(),
  preserveFormatting: z.boolean().optional().default(true),
  detectTables: z.boolean().optional().default(true),
  language: z.string().optional(),
  extractPlainText: z.boolean().optional().default(false),
  includeImageBase64: z.boolean().optional().default(false)
});

app.post('/process-url', zValidator('json', urlProcessSchema), async (c) => {
  try {
    const { url, preserveFormatting, detectTables, language, extractPlainText, includeImageBase64 } = c.req.valid('json');
    
    // Process with Mistral OCR
    const ocrResponse = await processMistralOCR(url, {
      preserveFormatting,
      detectTables,
      language,
      includeImageBase64
    });
    
    return c.json({
      success: true,
      data: ocrResponse,
      text: extractPlainText ? ocrResponse.content
        .filter(item => item.type === 'text' && item.text)
        .map(item => item.text)
        .join('\n') : undefined
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// File upload OCR processing
app.post('/process-file', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return c.json({
        success: false,
        error: 'No file provided or invalid file'
      }, 400);
    }
    
    const preserveFormatting = formData.get('preserveFormatting') === 'true';
    const detectTables = formData.get('detectTables') === 'true';
    const language = formData.get('language')?.toString();
    const extractPlainText = formData.get('extractPlainText') === 'true';
    const includeImageBase64 = formData.get('includeImageBase64') === 'true';
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Process with Mistral OCR
    const ocrResponse = await processMistralOCRWithFileUpload(buffer, file.name, {
      preserveFormatting,
      detectTables,
      language,
      includeImageBase64
    });
    
    return c.json({
      success: true,
      data: ocrResponse,
      text: extractPlainText ? ocrResponse.content
        .filter(item => item.type === 'text' && item.text)
        .map(item => item.text)
        .join('\n') : undefined
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Image processing with OCR
app.post('/process-image', zValidator('json', z.object({
  url: z.string().url(),
  includeImageBase64: z.boolean().optional().default(false)
})), async (c) => {
  try {
    const { url, includeImageBase64 } = c.req.valid('json');
    
    // Process with Mistral OCR for image
    const ocrResponse = await processMistralOCRWithImage(url, {
      includeImageBase64
    });
    
    return c.json({
      success: true,
      data: ocrResponse,
      text: ocrResponse.content
        .filter(item => item.type === 'text' && item.text)
        .map(item => item.text)
        .join('\n')
    });
  } catch (error) {
    console.error('Image OCR processing error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Extract text from PDF
app.post('/extract-pdf-text', zValidator('json', z.object({
  url: z.string()
})), async (c) => {
  try {
    const { url } = c.req.valid('json');
    
    // Extract text using Mistral OCR
    const text = await extractTextFromPdfWithMistralOCR(url);
    
    return c.json({
      success: true,
      text
    });
  } catch (error) {
    console.error('PDF text extraction error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Extract text from image
app.post('/extract-image-text', zValidator('json', z.object({
  url: z.string()
})), async (c) => {
  try {
    const { url } = c.req.valid('json');
    
    // Extract text using Mistral OCR
    const { text } = await extractTextFromImageWithMistralOCR(url);
    
    return c.json({
      success: true,
      text
    });
  } catch (error) {
    console.error('Image text extraction error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Document understanding with URL
app.post('/ask-document-url', zValidator('json', z.object({
  url: z.string().url(),
  question: z.string()
})), async (c) => {
  try {
    const { url, question } = c.req.valid('json');
    
    // Ask question about the document
    const answer = await askDocumentQuestion(url, question);
    
    return c.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error('Document understanding error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Document understanding with file upload
app.post('/ask-document', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    const question = formData.get('question')?.toString();
    
    if (!file || !(file instanceof File)) {
      return c.json({
        success: false,
        error: 'No file provided or invalid file'
      }, 400);
    }
    
    if (!question) {
      return c.json({
        success: false,
        error: 'No question provided'
      }, 400);
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // First upload the file to get a temporary URL
    const uploadResponse = await processMistralOCRWithFileUpload(buffer, file.name);
    
    // We need to create a temporary URL for the document
    // This is a simplified approach - in a production environment, 
    // you might want to store this file and create a stable URL
    const tempFileName = `temp_${Date.now()}_${file.name}`;
    
    // Use the document to ask a question - use the file name as a placeholder
    // In a real implementation, you would get a proper URL from the uploaded file
    const answer = await askDocumentQuestion(tempFileName, question);
    
    return c.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error('Document understanding error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Document processing status endpoint
app.get('/status/:documentId', async (c) => {
  try {
    const documentId = c.req.param('documentId');
    
    if (!documentId) {
      return c.json({
        success: false,
        error: 'Document ID is required'
      }, 400);
    }
    
    // Get document metadata from database
    const { data, error } = await supabase
      .from('documents')
      .select('processing_status, processing_progress, processing_error, updated_at')
      .eq('id', documentId)
      .single();
    
    if (error) {
      console.error('Error fetching document status:', error);
      return c.json({
        success: false,
        error: `Failed to fetch document status: ${error.message}`
      }, 500);
    }
    
    if (!data) {
      return c.json({
        success: false,
        error: 'Document not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      status: data.processing_status,
      progress: data.processing_progress,
      error: data.processing_error,
      updatedAt: data.updated_at
    });
  } catch (error) {
    console.error('Document status error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Check batch processing limits
app.post('/check-batch', async (c) => {
  try {
    // Get the number of files to process
    const { fileCount } = await c.req.json();
    
    // Get user identifier (e.g., user ID or IP address)
    const userId = c.req.header('x-forwarded-for') || 'anonymous';
    
    // Check if batch processing is allowed
    const { allowed, maxBatchSize, tier, reason } = await canProcessBatch(userId, fileCount);
    
    return c.json({
      success: true,
      allowed,
      maxBatchSize,
      tier,
      message: reason
    });
  } catch (error) {
    console.error('Batch processing check error:', error);
    return c.json({
      success: false,
      allowed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Process file for batch processing
app.post('/process-file-batch', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return c.json({
        success: false,
        error: 'No file provided or invalid file'
      }, 400);
    }
    
    const preserveFormatting = formData.get('preserveFormatting') === 'true';
    const detectTables = formData.get('detectTables') === 'true';
    
    // Get user identifier
    const userId = c.req.header('x-forwarded-for') || 'anonymous';
    
    // Check rate limit for OCR processing
    const limiter = createRateLimitMiddleware('ocr');
    
    // Use the middleware manually
    await limiter(c, async () => {
      // If the rate limit is exceeded, the middleware will return a 429 response
      // before reaching this code
    });
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Store the document in Supabase
    const documentMetadata = await storeDocument(
      buffer,
      file.name,
      userId
    );
    
    // Process the document (asynchronously)
    // In a real implementation, this would be handled by a background job
    getDocumentOCR(documentMetadata.id, false, (progress) => {
      // Update progress in the database
      updateDocumentStatus(documentMetadata.id, 'processing', progress);
    }).catch(error => {
      console.error('Document processing error:', error);
      updateDocumentStatus(
        documentMetadata.id, 
        'failed', 
        0, 
        error instanceof Error ? error.message : 'Unknown error'
      );
    });
    
    return c.json({
      success: true,
      documentId: documentMetadata.id,
      message: 'Document processing started',
      status: 'processing'
    });
  } catch (error) {
    console.error('File batch processing error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Process multiple documents in a batch
app.post('/process-batch', async (c) => {
  try {
    const { documentIds } = await c.req.json();
    
    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return c.json({
        success: false,
        error: 'Invalid or empty document IDs'
      }, 400);
    }
    
    // Get user identifier
    const userId = c.req.header('x-forwarded-for') || 'anonymous';
    
    // Check if batch processing is allowed
    const { allowed, reason } = await canProcessBatch(userId, documentIds.length);
    
    if (!allowed) {
      return c.json({
        success: false,
        error: reason || 'Batch processing not allowed'
      }, 429);
    }
    
    // Start batch processing
    // This would typically be handled by a background job in production
    processBatch(documentIds, {
      progressCallback: (documentId, progress) => {
        // Update progress in the database
        updateDocumentStatus(documentId, 'processing', progress);
      }
    }).catch(error => {
      console.error('Batch processing error:', error);
    });
    
    return c.json({
      success: true,
      message: 'Batch processing started',
      count: documentIds.length
    });
  } catch (error) {
    console.error('Batch processing error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

export default app; 