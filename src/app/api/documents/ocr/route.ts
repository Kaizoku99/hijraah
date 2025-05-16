import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { Mistral } from '@mistralai/mistralai'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Define custom interfaces for Mistral OCR API responses
interface MistralOCRResponse {
  content: Array<{
    type: 'text' | 'image';
    text?: string;
    image_data?: string;
    page_number?: number;
  }>;
  meta?: {
    pages: number;
    filename?: string;
    filesize?: number;
  };
}

// Initialize clients
const mistralClient = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || ''
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// Create a Hono app
const app = new Hono()

// Add CORS middleware
app.use('*', cors())

// Define schema for the OCR request body
const ocrRequestSchema = z.object({
  fileId: z.string(),
  chatId: z.string(),
  userId: z.string().optional(),
  fileName: z.string(),
  fileType: z.string(),
  fileUrl: z.string().url().optional(),
  fileContent: z.string().optional()
})

// Define schema for OCR result
const ocrResultSchema = z.object({
  text: z.string(),
  metadata: z.object({
    pageCount: z.number().optional(),
    language: z.string().optional(),
    confidence: z.number().optional(),
    processTime: z.number().optional()
  }).optional()
})

// Process a document with OCR using Mistral API
app.post('/documents/ocr', async (c) => {
  try {
    // Parse and validate request body
    const body = await c.req.json()
    const validatedData = ocrRequestSchema.parse(body)
    
    // Check if result is already cached in Supabase
    const { data: cachedResult } = await supabase
      .from('document_ocr_results')
      .select('result')
      .eq('file_id', validatedData.fileId)
      .maybeSingle()
    
    if (cachedResult) {
      return c.json(cachedResult.result)
    }
    
    let fileContent = validatedData.fileContent
    let fileUrl = validatedData.fileUrl
    
    // If no file content or URL provided, try to fetch from storage
    if (!fileContent && !fileUrl) {
      const { data: fileData, error: fileError } = await supabase
        .storage
        .from('chat-attachments')
        .download(`${validatedData.chatId}/${validatedData.fileId}`)
      
      if (fileError) {
        console.error('Error fetching file from storage:', fileError)
        return c.json({ error: 'Failed to fetch file from storage' }, 500)
      }
      
      // Convert file data to base64
      fileContent = await fileData.arrayBuffer()
        .then(buffer => Buffer.from(buffer).toString('base64'))
    }
    
    // Prepare document for Mistral OCR API
    let document: any = {}
    
    if (fileUrl) {
      document = {
        type: "document_url",
        document_url: fileUrl
      }
    } else if (fileContent) {
      // For image data
      if (validatedData.fileType.startsWith('image/')) {
        document = {
          type: "image_url",
          image_url: `data:${validatedData.fileType};base64,${fileContent}`
        }
      } else {
        // For PDFs and other documents
        document = {
          type: "base64",
          data: fileContent,
          mime_type: validatedData.fileType
        }
      }
    } else {
      return c.json({ error: 'No file content or URL provided' }, 400)
    }

    // Call Mistral OCR API using the SDK
    try {
      const ocrResponse = await mistralClient.ocr.process({
        model: "mistral-ocr-latest",
        document: document,
        includeImageBase64: false
      }) as unknown as MistralOCRResponse
      
      // Process the OCR result
      const extractedText = ocrResponse.content
        ?.filter(item => item.type === 'text' && item.text)
        ?.map(item => item.text)
        ?.join('\n') || ''
      
      // Create our standardized OCR result
      const ocrResult = {
        text: extractedText || 'No text extracted',
        metadata: {
          confidence: 0.9,
          processTime: Date.now(),
          language: 'en',
          pageCount: ocrResponse.meta?.pages || 1,
          rawResponse: ocrResponse
        }
      }
      
      // Cache the result in Supabase
      await supabase
        .from('document_ocr_results')
        .upsert({
          file_id: validatedData.fileId,
          chat_id: validatedData.chatId,
          user_id: validatedData.userId,
          file_name: validatedData.fileName,
          file_type: validatedData.fileType,
          result: ocrResult,
          created_at: new Date().toISOString()
        })
      
      return c.json(ocrResult)
    } catch (mistralError) {
      console.error('Mistral OCR API error:', mistralError)
      return c.json(
        { error: (mistralError as Error).message || 'Failed to process document with Mistral OCR' },
        400
      )
    }
  } catch (error) {
    console.error('OCR API error:', error)
    return c.json({ error: error instanceof Error ? error.message : 'Internal server error' }, 500)
  }
})

// Answer a question about a document using Mistral AI
app.post('/documents/ocr/question', async (c) => {
  try {
    const body = await c.req.json()
    const { fileId, question, chatId, userId } = body
    
    // Fetch OCR result from Supabase
    const { data: ocrData, error: ocrError } = await supabase
      .from('document_ocr_results')
      .select('result')
      .eq('file_id', fileId)
      .single()
    
    if (ocrError) {
      console.error('Error fetching OCR result:', ocrError)
      return c.json({ error: 'Failed to fetch OCR result' }, 500)
    }
    
    // Generate an answer using Mistral AI SDK
    try {
      const chatResponse = await mistralClient.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: 'You are a document analysis assistant. Answer questions about the document content provided accurately and concisely.'
          },
          {
            role: 'user',
            content: `Document content:\n\n${ocrData.result.text}\n\nQuestion: ${question}`
          }
        ],
        maxTokens: 1024
      })
      
      const answer = chatResponse?.choices?.[0]?.message?.content || 'Unable to answer this question'
      
      // Store the Q&A history in Supabase
      await supabase
        .from('document_qa_history')
        .insert({
          file_id: fileId,
          chat_id: chatId,
          user_id: userId,
          question,
          answer,
          created_at: new Date().toISOString()
        })
      
      return c.json({ answer })
    } catch (mistralError) {
      console.error('Mistral chat API error:', mistralError)
      return c.json(
        { error: (mistralError as Error).message || 'Failed to process question with Mistral AI' },
        400
      )
    }
  } catch (error) {
    console.error('Document Q&A API error:', error)
    return c.json({ error: error instanceof Error ? error.message : 'Internal server error' }, 500)
  }
})

// Get document question history
app.get('/documents/ocr/:fileId/history', async (c) => {
  try {
    const fileId = c.req.param('fileId')
    
    // Fetch question history from Supabase
    const { data, error } = await supabase
      .from('document_qa_history')
      .select('question, answer, created_at')
      .eq('file_id', fileId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching question history:', error)
      return c.json({ error: 'Failed to fetch question history' }, 500)
    }
    
    return c.json(data || [])
  } catch (error) {
    console.error('Document history API error:', error)
    return c.json({ error: error instanceof Error ? error.message : 'Internal server error' }, 500)
  }
})

// Export Hono app using Vercel adapter
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app) 