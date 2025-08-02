import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  DocumentInput, 
  DocumentClassificationResult, 
  DocumentClassificationResultSchema,
  AgentConfig,
  AgentConfigSchema
} from './types'
import { withAgentErrorHandling, logAgentStep } from '../../utils'

/**
 * Document Classification Agent using AI SDK v5 vision models
 * Classifies documents using ImagePart and FilePart message types
 */
export class DocumentClassificationAgent {
  private config: AgentConfig

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config)
  }

  /**
   * Classify a document using vision models
   */
  async classifyDocument(
    documentInput: DocumentInput
  ): Promise<DocumentClassificationResult> {
    const classifyDoc = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting document classification for ${documentInput.id}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Prepare the message content based on document type
      const messageContent = await this.prepareMessageContent(documentInput)

      const { object: classification } = await generateObject({
        model: openai(this.config.model),
        schema: DocumentClassificationResultSchema,
        temperature: this.config.temperature,
        maxSteps: this.config.maxSteps,
        messages: [
          {
            role: 'system',
            content: `You are an expert document classification agent specializing in immigration documents.
            
            Your task is to analyze documents and classify them accurately based on:
            1. Document category and subcategory
            2. Visual features (photos, signatures, seals, watermarks)
            3. Document quality assessment
            4. Language detection
            5. Format identification
            
            Provide detailed analysis with high confidence scores and actionable processing recommendations.`
          },
          {
            role: 'user',
            content: messageContent
          }
        ],
        onStepFinish: this.config.enableLogging ? ({ text, toolCalls, toolResults, finishReason, usage }) => {
          logAgentStep({
            stepNumber: 2,
            text: text || 'Document classification step completed',
            toolCalls: toolCalls || [],
            toolResults: toolResults || [],
            finishReason: finishReason || 'completed',
            usage: usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
        } : undefined
      })

      // Ensure the result includes the document ID and timestamp
      const result: DocumentClassificationResult = {
        ...classification,
        documentId: documentInput.id,
        timestamp: new Date().toISOString()
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `Document classification completed for ${documentInput.id} - Category: ${result.classification.category}, Confidence: ${result.classification.confidence}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return result
    })

    return await classifyDoc()
  }

  /**
   * Batch classify multiple documents
   */
  async classifyDocuments(
    documents: DocumentInput[]
  ): Promise<DocumentClassificationResult[]> {
    const batchClassify = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch classification for ${documents.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Process documents in parallel for better performance
      const results = await Promise.all(
        documents.map(doc => this.classifyDocument(doc))
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch classification completed for ${documents.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return results
    })

    return await batchClassify()
  }

  /**
   * Prepare message content based on document input type
   */
  private async prepareMessageContent(documentInput: DocumentInput) {
    const basePrompt = `Analyze this immigration document and provide detailed classification:

Document ID: ${documentInput.id}
Document Type: ${documentInput.type}
${documentInput.metadata?.filename ? `Filename: ${documentInput.metadata.filename}` : ''}
${documentInput.metadata?.mimeType ? `MIME Type: ${documentInput.metadata.mimeType}` : ''}

Please classify this document with high accuracy, focusing on:
1. Primary category (passport, visa, certificate, etc.)
2. Subcategory if applicable
3. Visual features present
4. Document quality assessment
5. Language identification
6. Processing recommendations`

    // Handle different input types
    switch (documentInput.type) {
      case 'image':
        if (typeof documentInput.source === 'string') {
          // Handle base64 or URL
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
        throw new Error(`Unsupported document type: ${documentInput.type}`)
    }

    // Fallback to text-only if we can't handle the input type
    return [{ type: 'text', text: basePrompt + '\n\nNote: Document content could not be directly analyzed due to format limitations.' }]
  }

  /**
   * Get classification confidence threshold recommendations
   */
  getConfidenceThresholds(): Record<string, number> {
    return {
      high_confidence: 0.9,
      medium_confidence: 0.7,
      low_confidence: 0.5,
      manual_review_required: 0.3
    }
  }

  /**
   * Validate classification result
   */
  validateClassification(result: DocumentClassificationResult): boolean {
    const thresholds = this.getConfidenceThresholds()
    
    return (
      result.classification.confidence >= thresholds.low_confidence &&
      result.classification.category !== undefined &&
      result.visualFeatures !== undefined
    )
  }
}