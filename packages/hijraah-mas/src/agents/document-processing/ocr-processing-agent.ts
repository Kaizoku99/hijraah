import { generateText, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { mistral } from '@ai-sdk/mistral'
import { z } from 'zod'
import { 
  DocumentInput, 
  OCRProcessingResult, 
  OCRProcessingResultSchema,
  AgentConfig,
  AgentConfigSchema
} from './types'
import { withAgentErrorHandling, logAgentStep } from '../../utils'

/**
 * OCR Processing Agent using AI SDK v5 multimodal input with Mistral vision integration
 * Performs text extraction with structured output schemas
 */
export class OCRProcessingAgent {
  private config: AgentConfig

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config)
  }

  /**
   * Process document OCR using Mistral vision model
   */
  async processOCR(
    documentInput: DocumentInput,
    extractionOptions: {
      includeStructuredData?: boolean
      targetFields?: string[]
      includeBoundingBoxes?: boolean
    } = {}
  ): Promise<OCRProcessingResult> {
    const processOCR = withAgentErrorHandling(async () => {
      const startTime = Date.now()

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting OCR processing for ${documentInput.id} using Mistral vision model`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Prepare the message content for Mistral vision model
      const messageContent = await this.prepareOCRMessageContent(documentInput, extractionOptions)

      // Use Mistral for OCR processing with structured output
      const { object: ocrResult } = await generateObject({
        model: mistral('pixtral-12b-2409'), // Mistral's vision model
        schema: OCRProcessingResultSchema,
        temperature: this.config.temperature,
        maxSteps: this.config.maxSteps,
        messages: [
          {
            role: 'system',
            content: `You are an expert OCR processing agent using Mistral's advanced vision capabilities.
            
            Your task is to extract text from documents with high accuracy:
            1. Extract all visible text while preserving structure
            2. Identify and extract structured data fields
            3. Provide confidence scores for extracted content
            4. Detect document language
            5. Generate bounding box information if requested
            
            Focus on immigration documents and maintain 95%+ accuracy for critical fields.
            Preserve formatting, special characters, and document structure.`
          },
          {
            role: 'user',
            content: messageContent
          }
        ],
        onStepFinish: this.config.enableLogging ? ({ text, toolCalls, toolResults, finishReason, usage }) => {
          logAgentStep({
            stepNumber: 2,
            text: text || 'OCR processing step completed',
            toolCalls: toolCalls || [],
            toolResults: toolResults || [],
            finishReason: finishReason || 'completed',
            usage: usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
        } : undefined
      })

      const processingTime = Date.now() - startTime

      // Ensure the result includes required metadata
      const result: OCRProcessingResult = {
        ...ocrResult,
        documentId: documentInput.id,
        metadata: {
          ...ocrResult.metadata,
          processingTime,
          ocrEngine: 'mistral-pixtral-12b-2409'
        },
        timestamp: new Date().toISOString()
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `OCR processing completed for ${documentInput.id} - Confidence: ${result.extractedText.confidence}, Processing time: ${processingTime}ms`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return result
    })

    return await processOCR()
  }

  /**
   * Process OCR with enhanced accuracy using multiple models
   */
  async processOCRWithValidation(
    documentInput: DocumentInput,
    extractionOptions: {
      includeStructuredData?: boolean
      targetFields?: string[]
      includeBoundingBoxes?: boolean
      useMultiModelValidation?: boolean
    } = {}
  ): Promise<OCRProcessingResult> {
    const processWithValidation = withAgentErrorHandling(async () => {
      // Primary OCR with Mistral
      const primaryResult = await this.processOCR(documentInput, extractionOptions)

      // If multi-model validation is requested, use OpenAI for cross-validation
      if (extractionOptions.useMultiModelValidation) {
        const validationResult = await this.validateOCRWithOpenAI(documentInput, primaryResult)
        
        // Merge results and update confidence based on validation
        return this.mergeOCRResults(primaryResult, validationResult)
      }

      return primaryResult
    })

    return await processWithValidation()
  }

  /**
   * Batch process multiple documents
   */
  async batchProcessOCR(
    documents: DocumentInput[],
    extractionOptions: {
      includeStructuredData?: boolean
      targetFields?: string[]
      includeBoundingBoxes?: boolean
    } = {}
  ): Promise<OCRProcessingResult[]> {
    const batchProcess = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch OCR processing for ${documents.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Process documents in parallel for better performance
      const results = await Promise.all(
        documents.map(doc => this.processOCR(doc, extractionOptions))
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch OCR processing completed for ${documents.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return results
    })

    return await batchProcess()
  }

  /**
   * Prepare message content for OCR processing
   */
  private async prepareOCRMessageContent(
    documentInput: DocumentInput,
    extractionOptions: any
  ) {
    const basePrompt = `Extract all text from this immigration document with high accuracy:

Document ID: ${documentInput.id}
Document Type: ${documentInput.type}
${documentInput.metadata?.filename ? `Filename: ${documentInput.metadata.filename}` : ''}

Extraction Requirements:
- Extract ALL visible text while preserving structure and formatting
- Identify document language
- Provide confidence scores for extracted content
- ${extractionOptions.includeStructuredData ? 'Extract structured data fields (names, dates, numbers, etc.)' : ''}
- ${extractionOptions.targetFields ? `Focus on these specific fields: ${extractionOptions.targetFields.join(', ')}` : ''}
- ${extractionOptions.includeBoundingBoxes ? 'Include bounding box coordinates for text elements' : ''}

Pay special attention to:
- Names, dates, and identification numbers
- Official stamps, seals, and signatures
- Document numbers and reference codes
- Expiration dates and validity periods
- Any handwritten annotations`

    // Handle different input types for Mistral vision model
    switch (documentInput.type) {
      case 'image':
        if (typeof documentInput.source === 'string') {
          if (documentInput.source.startsWith('data:')) {
            return [
              { type: 'text', text: basePrompt },
              { type: 'image', image: documentInput.source }
            ]
          } else {
            return [
              { type: 'text', text: basePrompt },
              { type: 'image', image: new URL(documentInput.source) }
            ]
          }
        }
        break

      case 'pdf':
      case 'document_url':
        if (typeof documentInput.source === 'string') {
          return [
            { type: 'text', text: basePrompt },
            { type: 'file', data: documentInput.source, mediaType: 'application/pdf' }
          ]
        }
        break

      case 'file_buffer':
        if (documentInput.source instanceof Buffer || documentInput.source instanceof ArrayBuffer) {
          const buffer = documentInput.source instanceof Buffer 
            ? documentInput.source 
            : Buffer.from(documentInput.source)
          
          return [
            { type: 'text', text: basePrompt },
            { 
              type: 'file', 
              data: buffer, 
              mediaType: documentInput.metadata?.mimeType || 'application/octet-stream' 
            }
          ]
        }
        break

      default:
        throw new Error(`Unsupported document type for OCR: ${documentInput.type}`)
    }

    return [{ type: 'text', text: basePrompt + '\n\nNote: Document content could not be directly processed due to format limitations.' }]
  }

  /**
   * Validate OCR results using OpenAI for cross-validation
   */
  private async validateOCRWithOpenAI(
    documentInput: DocumentInput,
    primaryResult: OCRProcessingResult
  ): Promise<Partial<OCRProcessingResult>> {
    const messageContent = await this.prepareOCRMessageContent(documentInput, { includeStructuredData: true })

    const { text: validationText } = await generateText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: 'You are validating OCR results. Extract text and compare with the provided results for accuracy.'
        },
        {
          role: 'user',
          content: messageContent
        }
      ]
    })

    // Return partial result for comparison
    return {
      extractedText: {
        fullText: validationText,
        structuredData: {},
        confidence: 0.8, // Default validation confidence
        language: primaryResult.extractedText.language
      }
    }
  }

  /**
   * Merge OCR results from multiple models
   */
  private mergeOCRResults(
    primaryResult: OCRProcessingResult,
    validationResult: Partial<OCRProcessingResult>
  ): OCRProcessingResult {
    // Simple merge logic - in production, this would be more sophisticated
    const textSimilarity = this.calculateTextSimilarity(
      primaryResult.extractedText.fullText,
      validationResult.extractedText?.fullText || ''
    )

    // Adjust confidence based on validation
    const adjustedConfidence = primaryResult.extractedText.confidence * (0.5 + textSimilarity * 0.5)

    return {
      ...primaryResult,
      extractedText: {
        ...primaryResult.extractedText,
        confidence: adjustedConfidence
      },
      metadata: {
        ...primaryResult.metadata,
        averageConfidence: adjustedConfidence,
        ocrEngine: 'mistral-pixtral-12b-2409-validated'
      }
    }
  }

  /**
   * Calculate text similarity between two strings
   */
  private calculateTextSimilarity(text1: string, text2: string): number {
    // Simple Jaccard similarity - in production, use more sophisticated algorithms
    const set1 = new Set(text1.toLowerCase().split(/\s+/))
    const set2 = new Set(text2.toLowerCase().split(/\s+/))
    
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    const union = new Set([...set1, ...set2])
    
    return intersection.size / union.size
  }

  /**
   * Get OCR quality metrics
   */
  getQualityMetrics(result: OCRProcessingResult): Record<string, number> {
    return {
      overall_confidence: result.extractedText.confidence,
      average_page_confidence: result.metadata.averageConfidence,
      text_length: result.extractedText.fullText.length,
      structured_fields_count: Object.keys(result.extractedText.structuredData).length,
      processing_speed: result.metadata.processingTime / 1000 // seconds
    }
  }
}