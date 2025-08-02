import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  OCRProcessingResult,
  ContentExtractionResult, 
  ContentExtractionResultSchema,
  AgentConfig,
  AgentConfigSchema
} from './types'
import { withAgentErrorHandling, logAgentStep } from '../../utils'

/**
 * Content Extraction Agent using AI SDK v5 structured output with Zod schemas
 * Extracts and normalizes specific fields from OCR results
 */
export class ContentExtractionAgent {
  private config: AgentConfig

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config)
  }

  /**
   * Extract structured content from OCR results
   */
  async extractContent(
    ocrResult: OCRProcessingResult,
    extractionSchema: {
      targetFields: string[]
      documentType: string
      validationRules?: Record<string, any>
    }
  ): Promise<ContentExtractionResult> {
    const extractContent = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting content extraction for ${ocrResult.documentId} - Document type: ${extractionSchema.documentType}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Create dynamic schema based on document type and target fields
      const dynamicExtractionSchema = this.createExtractionSchema(extractionSchema)

      const { object: extraction } = await generateObject({
        model: openai(this.config.model),
        schema: dynamicExtractionSchema,
        temperature: this.config.temperature,
        maxSteps: this.config.maxSteps,
        system: `You are an expert content extraction agent specializing in immigration documents.
        
        Your task is to extract specific fields from OCR text with high accuracy:
        1. Identify and extract target fields based on document type
        2. Normalize data formats (dates, names, numbers)
        3. Validate extracted data against rules
        4. Provide confidence scores for each field
        5. Flag missing or unclear fields
        
        Document Type: ${extractionSchema.documentType}
        Target Fields: ${extractionSchema.targetFields.join(', ')}
        
        Be precise and conservative with confidence scores. Flag any ambiguous content.`,
        prompt: `Extract structured content from this OCR result:
        
        Document ID: ${ocrResult.documentId}
        Full Text: ${ocrResult.extractedText.fullText}
        
        Existing Structured Data: ${JSON.stringify(ocrResult.extractedText.structuredData, null, 2)}
        
        Extract the following fields with high accuracy:
        ${extractionSchema.targetFields.map(field => `- ${field}`).join('\n')}
        
        ${extractionSchema.validationRules ? `Apply these validation rules: ${JSON.stringify(extractionSchema.validationRules, null, 2)}` : ''}
        
        Provide confidence scores and flag any missing or unclear fields.`,
        onStepFinish: this.config.enableLogging ? ({ text, toolCalls, toolResults, finishReason, usage }) => {
          logAgentStep({
            stepNumber: 2,
            text: text || 'Content extraction step completed',
            toolCalls: toolCalls || [],
            toolResults: toolResults || [],
            finishReason: finishReason || 'completed',
            usage: usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
        } : undefined
      })

      // Process and normalize the extracted data
      const normalizedData = await this.normalizeExtractedData(
        extraction.extractedFields,
        extractionSchema.documentType
      )

      const result: ContentExtractionResult = {
        documentId: ocrResult.documentId,
        extractedFields: extraction.extractedFields,
        fieldConfidence: extraction.fieldConfidence,
        missingFields: extraction.missingFields,
        validationResults: extraction.validationResults,
        normalizedData,
        timestamp: new Date().toISOString()
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `Content extraction completed for ${ocrResult.documentId} - Extracted ${Object.keys(result.extractedFields).length} fields`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return result
    })

    return await extractContent()
  }

  /**
   * Extract content from multiple OCR results
   */
  async batchExtractContent(
    ocrResults: OCRProcessingResult[],
    extractionSchemas: Array<{
      targetFields: string[]
      documentType: string
      validationRules?: Record<string, any>
    }>
  ): Promise<ContentExtractionResult[]> {
    const batchExtract = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch content extraction for ${ocrResults.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Process documents in parallel
      const results = await Promise.all(
        ocrResults.map((ocrResult, index) => {
          const schema = extractionSchemas[index] || extractionSchemas[0] // Use first schema as fallback
          return this.extractContent(ocrResult, schema)
        })
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch content extraction completed for ${ocrResults.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return results
    })

    return await batchExtract()
  }

  /**
   * Extract specific field types with specialized processing
   */
  async extractSpecializedFields(
    ocrResult: OCRProcessingResult,
    fieldTypes: {
      dates?: string[]
      names?: string[]
      numbers?: string[]
      addresses?: string[]
      custom?: Array<{ name: string; pattern: string; validation: string }>
    }
  ): Promise<ContentExtractionResult> {
    const extractSpecialized = withAgentErrorHandling(async () => {
      const specializedSchema = this.createSpecializedExtractionSchema(fieldTypes)

      const { object: extraction } = await generateObject({
        model: openai(this.config.model),
        schema: specializedSchema,
        temperature: this.config.temperature,
        system: `You are a specialized field extraction agent with expertise in different data types.
        
        Your task is to extract and validate specific field types:
        1. Dates: Extract and normalize to ISO format, validate ranges
        2. Names: Extract full names, handle multiple formats
        3. Numbers: Extract identification numbers, validate formats
        4. Addresses: Extract complete addresses, normalize format
        5. Custom fields: Apply specific patterns and validation
        
        Be extremely accurate with data normalization and validation.`,
        prompt: `Extract specialized fields from this OCR result:
        
        Document ID: ${ocrResult.documentId}
        Full Text: ${ocrResult.extractedText.fullText}
        
        Field Types to Extract:
        ${fieldTypes.dates ? `Dates: ${fieldTypes.dates.join(', ')}` : ''}
        ${fieldTypes.names ? `Names: ${fieldTypes.names.join(', ')}` : ''}
        ${fieldTypes.numbers ? `Numbers: ${fieldTypes.numbers.join(', ')}` : ''}
        ${fieldTypes.addresses ? `Addresses: ${fieldTypes.addresses.join(', ')}` : ''}
        ${fieldTypes.custom ? `Custom: ${fieldTypes.custom.map(c => c.name).join(', ')}` : ''}
        
        Apply appropriate validation and normalization for each field type.`
      })

      return {
        documentId: ocrResult.documentId,
        extractedFields: extraction.extractedFields,
        fieldConfidence: extraction.fieldConfidence,
        missingFields: extraction.missingFields,
        validationResults: extraction.validationResults,
        normalizedData: extraction.normalizedData,
        timestamp: new Date().toISOString()
      }
    })

    return await extractSpecialized()
  }

  /**
   * Create dynamic extraction schema based on document type and fields
   */
  private createExtractionSchema(extractionSchema: {
    targetFields: string[]
    documentType: string
    validationRules?: Record<string, any>
  }) {
    return z.object({
      extractedFields: z.record(z.any()),
      fieldConfidence: z.record(z.number().min(0).max(1)),
      missingFields: z.array(z.string()),
      validationResults: z.object({
        isValid: z.boolean(),
        errors: z.array(z.string()),
        warnings: z.array(z.string())
      }),
      normalizedData: z.record(z.any())
    })
  }

  /**
   * Create specialized extraction schema for different field types
   */
  private createSpecializedExtractionSchema(fieldTypes: any) {
    return z.object({
      extractedFields: z.record(z.any()),
      fieldConfidence: z.record(z.number().min(0).max(1)),
      missingFields: z.array(z.string()),
      validationResults: z.object({
        isValid: z.boolean(),
        errors: z.array(z.string()),
        warnings: z.array(z.string())
      }),
      normalizedData: z.record(z.any())
    })
  }

  /**
   * Normalize extracted data based on document type
   */
  private async normalizeExtractedData(
    extractedFields: Record<string, any>,
    documentType: string
  ): Promise<Record<string, any>> {
    const normalized: Record<string, any> = {}

    for (const [field, value] of Object.entries(extractedFields)) {
      if (value === null || value === undefined) {
        normalized[field] = null
        continue
      }

      // Apply normalization based on field patterns
      if (this.isDateField(field)) {
        normalized[field] = this.normalizeDate(value)
      } else if (this.isNameField(field)) {
        normalized[field] = this.normalizeName(value)
      } else if (this.isNumberField(field)) {
        normalized[field] = this.normalizeNumber(value)
      } else if (this.isAddressField(field)) {
        normalized[field] = this.normalizeAddress(value)
      } else {
        normalized[field] = this.normalizeGeneric(value)
      }
    }

    return normalized
  }

  /**
   * Field type detection helpers
   */
  private isDateField(field: string): boolean {
    const datePatterns = ['date', 'birth', 'expiry', 'issued', 'valid', 'expire']
    return datePatterns.some(pattern => field.toLowerCase().includes(pattern))
  }

  private isNameField(field: string): boolean {
    const namePatterns = ['name', 'surname', 'given', 'family', 'first', 'last']
    return namePatterns.some(pattern => field.toLowerCase().includes(pattern))
  }

  private isNumberField(field: string): boolean {
    const numberPatterns = ['number', 'id', 'passport', 'visa', 'reference', 'code']
    return numberPatterns.some(pattern => field.toLowerCase().includes(pattern))
  }

  private isAddressField(field: string): boolean {
    const addressPatterns = ['address', 'street', 'city', 'country', 'postal', 'zip']
    return addressPatterns.some(pattern => field.toLowerCase().includes(pattern))
  }

  /**
   * Data normalization methods
   */
  private normalizeDate(value: any): string | null {
    if (typeof value !== 'string') return null
    
    // Try to parse various date formats
    const datePatterns = [
      /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,
      /(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/,
      /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i
    ]

    for (const pattern of datePatterns) {
      const match = value.match(pattern)
      if (match) {
        try {
          const date = new Date(value)
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0] // Return YYYY-MM-DD format
          }
        } catch {
          continue
        }
      }
    }

    return value // Return original if can't normalize
  }

  private normalizeName(value: any): string | null {
    if (typeof value !== 'string') return null
    
    return value
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s\-']/g, '') // Remove special characters except hyphens and apostrophes
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  private normalizeNumber(value: any): string | null {
    if (typeof value !== 'string') return null
    
    return value
      .replace(/[^\w]/g, '') // Remove non-alphanumeric characters
      .toUpperCase()
  }

  private normalizeAddress(value: any): string | null {
    if (typeof value !== 'string') return null
    
    return value
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\n/g, ', ') // Replace newlines with commas
  }

  private normalizeGeneric(value: any): any {
    if (typeof value === 'string') {
      return value.trim().replace(/\s+/g, ' ')
    }
    return value
  }

  /**
   * Validate extracted content against rules
   */
  validateExtractedContent(
    result: ContentExtractionResult,
    validationRules: Record<string, any>
  ): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = []
    const warnings: string[] = []

    for (const [field, rules] of Object.entries(validationRules)) {
      const value = result.extractedFields[field]
      const confidence = result.fieldConfidence[field]

      // Check if required field is missing
      if (rules.required && (value === null || value === undefined)) {
        errors.push(`Required field '${field}' is missing`)
        continue
      }

      // Check confidence threshold
      if (confidence < (rules.minConfidence || 0.7)) {
        warnings.push(`Field '${field}' has low confidence: ${confidence}`)
      }

      // Apply field-specific validation
      if (rules.pattern && value) {
        const regex = new RegExp(rules.pattern)
        if (!regex.test(value)) {
          errors.push(`Field '${field}' does not match required pattern`)
        }
      }

      if (rules.minLength && value && value.length < rules.minLength) {
        errors.push(`Field '${field}' is too short (minimum ${rules.minLength} characters)`)
      }

      if (rules.maxLength && value && value.length > rules.maxLength) {
        warnings.push(`Field '${field}' is very long (maximum ${rules.maxLength} characters recommended)`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }
}