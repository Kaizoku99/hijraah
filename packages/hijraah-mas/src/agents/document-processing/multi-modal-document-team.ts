import { 
  DocumentInput,
  MultiModalProcessingResult,
  MultiModalProcessingResultSchema,
  AgentConfig,
  AgentConfigSchema
} from './types'
import { DocumentClassificationAgent } from './document-classification-agent'
import { OCRProcessingAgent } from './ocr-processing-agent'
import { ContentExtractionAgent } from './content-extraction-agent'
import { QualityValidationAgent } from './quality-validation-agent'
import { TranslationAgent } from './translation-agent'
import { withAgentErrorHandling, logAgentStep } from '../../utils'

/**
 * Multi-Modal Document Processing Team
 * Orchestrates all document processing agents for comprehensive document analysis
 */
export class MultiModalDocumentTeam {
  private classificationAgent: DocumentClassificationAgent
  private ocrAgent: OCRProcessingAgent
  private extractionAgent: ContentExtractionAgent
  private qualityAgent: QualityValidationAgent
  private translationAgent: TranslationAgent
  private config: AgentConfig

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config)
    
    // Initialize all agents with shared config
    this.classificationAgent = new DocumentClassificationAgent(config)
    this.ocrAgent = new OCRProcessingAgent(config)
    this.extractionAgent = new ContentExtractionAgent(config)
    this.qualityAgent = new QualityValidationAgent(config)
    this.translationAgent = new TranslationAgent(config)
  }

  /**
   * Process document through complete multi-modal pipeline
   */
  async processDocument(
    documentInput: DocumentInput,
    processingOptions: {
      extractionFields?: string[]
      documentType?: string
      targetLanguage?: string
      qualityThresholds?: {
        minTextClarity?: number
        minImageQuality?: number
        minCompleteness?: number
        minAuthenticity?: number
        minOverallScore?: number
      }
      translationOptions?: {
        preserveLegalTerms?: boolean
        preserveFormatting?: boolean
        includeFieldTranslation?: boolean
        qualityThreshold?: number
      }
    } = {}
  ): Promise<MultiModalProcessingResult> {
    const processDoc = withAgentErrorHandling(async () => {
      const startTime = Date.now()

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting multi-modal document processing for ${documentInput.id}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Step 1: Document Classification
      const classification = await this.classificationAgent.classifyDocument(documentInput)
      
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Document classified as ${classification.classification.category} with ${classification.classification.confidence} confidence`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Step 2: OCR Processing
      const ocrResult = await this.ocrAgent.processOCRWithValidation(documentInput, {
        includeStructuredData: true,
        targetFields: processingOptions.extractionFields,
        includeBoundingBoxes: true,
        useMultiModelValidation: true
      })

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `OCR processing completed with ${ocrResult.extractedText.confidence} confidence`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Step 3: Content Extraction
      const extractionResult = await this.extractionAgent.extractContent(ocrResult, {
        targetFields: processingOptions.extractionFields || this.getDefaultFieldsForDocumentType(
          processingOptions.documentType || classification.classification.category
        ),
        documentType: processingOptions.documentType || classification.classification.category,
        validationRules: this.getValidationRulesForDocumentType(
          processingOptions.documentType || classification.classification.category
        )
      })

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 4,
          text: `Content extraction completed - ${Object.keys(extractionResult.extractedFields).length} fields extracted`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Step 4: Quality Validation
      const qualityResult = await this.qualityAgent.validateQuality(
        documentInput,
        ocrResult,
        extractionResult,
        processingOptions.qualityThresholds
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 5,
          text: `Quality validation completed - Score: ${qualityResult.qualityScore}, Passed: ${qualityResult.passed}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Step 5: Translation (if requested)
      let translationResult
      if (processingOptions.targetLanguage && 
          processingOptions.targetLanguage !== ocrResult.extractedText.language) {
        translationResult = await this.translationAgent.translateDocument(
          ocrResult,
          extractionResult,
          processingOptions.targetLanguage,
          processingOptions.translationOptions
        )

        if (this.config.enableLogging) {
          logAgentStep({
            stepNumber: 6,
            text: `Translation completed to ${processingOptions.targetLanguage} with quality score ${translationResult.qualityScore}`,
            toolCalls: [],
            toolResults: [],
            finishReason: 'completed',
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
        }
      }

      const processingTime = Date.now() - startTime

      // Calculate overall score
      const overallScore = this.calculateOverallScore(
        classification,
        ocrResult,
        extractionResult,
        qualityResult,
        translationResult
      )

      // Generate recommendations
      const recommendations = this.generateProcessingRecommendations(
        classification,
        ocrResult,
        extractionResult,
        qualityResult,
        translationResult
      )

      const result: MultiModalProcessingResult = {
        documentId: documentInput.id,
        classification,
        ocr: ocrResult,
        extraction: extractionResult,
        quality: qualityResult,
        translation: translationResult,
        overallScore,
        processingTime,
        recommendations,
        timestamp: new Date().toISOString()
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: translationResult ? 7 : 6,
          text: `Multi-modal processing completed for ${documentInput.id} - Overall Score: ${overallScore}, Processing Time: ${processingTime}ms`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return result
    })

    return await processDoc()
  }

  /**
   * Process multiple documents in batch
   */
  async batchProcessDocuments(
    documents: Array<{
      documentInput: DocumentInput
      processingOptions?: {
        extractionFields?: string[]
        documentType?: string
        targetLanguage?: string
        qualityThresholds?: any
        translationOptions?: any
      }
    }>
  ): Promise<MultiModalProcessingResult[]> {
    const batchProcess = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch multi-modal processing for ${documents.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Process documents in parallel for better performance
      const results = await Promise.all(
        documents.map(({ documentInput, processingOptions = {} }) =>
          this.processDocument(documentInput, processingOptions)
        )
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch multi-modal processing completed for ${documents.length} documents`,
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
   * Process document with specialized workflow based on document type
   */
  async processDocumentWithSpecializedWorkflow(
    documentInput: DocumentInput,
    documentType: string
  ): Promise<MultiModalProcessingResult> {
    const workflows = {
      passport: this.processPassportDocument.bind(this),
      visa: this.processVisaDocument.bind(this),
      certificate: this.processCertificateDocument.bind(this),
      form: this.processFormDocument.bind(this),
      supporting_document: this.processSupportingDocument.bind(this)
    }

    const workflow = workflows[documentType as keyof typeof workflows]
    if (!workflow) {
      throw new Error(`No specialized workflow available for document type: ${documentType}`)
    }

    return await workflow(documentInput)
  }

  /**
   * Specialized passport document processing
   */
  private async processPassportDocument(documentInput: DocumentInput): Promise<MultiModalProcessingResult> {
    return await this.processDocument(documentInput, {
      extractionFields: [
        'passport_number', 'given_names', 'surname', 'nationality', 
        'date_of_birth', 'place_of_birth', 'sex', 'date_of_issue', 
        'date_of_expiry', 'issuing_authority', 'type'
      ],
      documentType: 'passport',
      qualityThresholds: {
        minTextClarity: 85,
        minImageQuality: 80,
        minCompleteness: 90,
        minAuthenticity: 90,
        minOverallScore: 85
      }
    })
  }

  /**
   * Specialized visa document processing
   */
  private async processVisaDocument(documentInput: DocumentInput): Promise<MultiModalProcessingResult> {
    return await this.processDocument(documentInput, {
      extractionFields: [
        'visa_number', 'visa_type', 'full_name', 'nationality', 
        'passport_number', 'date_of_issue', 'date_of_expiry', 
        'entries', 'duration_of_stay', 'issuing_post'
      ],
      documentType: 'visa',
      qualityThresholds: {
        minTextClarity: 80,
        minImageQuality: 75,
        minCompleteness: 85,
        minAuthenticity: 85,
        minOverallScore: 80
      }
    })
  }

  /**
   * Specialized certificate document processing
   */
  private async processCertificateDocument(documentInput: DocumentInput): Promise<MultiModalProcessingResult> {
    return await this.processDocument(documentInput, {
      extractionFields: [
        'certificate_type', 'full_name', 'date_of_birth', 
        'place_of_birth', 'date_of_issue', 'issuing_authority', 
        'registration_number', 'seal_or_stamp'
      ],
      documentType: 'certificate',
      qualityThresholds: {
        minTextClarity: 75,
        minImageQuality: 70,
        minCompleteness: 80,
        minAuthenticity: 85,
        minOverallScore: 75
      }
    })
  }

  /**
   * Specialized form document processing
   */
  private async processFormDocument(documentInput: DocumentInput): Promise<MultiModalProcessingResult> {
    return await this.processDocument(documentInput, {
      extractionFields: [
        'form_number', 'form_title', 'applicant_name', 
        'date_completed', 'signature_present', 'all_fields_completed'
      ],
      documentType: 'form',
      qualityThresholds: {
        minTextClarity: 70,
        minImageQuality: 65,
        minCompleteness: 75,
        minAuthenticity: 70,
        minOverallScore: 70
      }
    })
  }

  /**
   * Specialized supporting document processing
   */
  private async processSupportingDocument(documentInput: DocumentInput): Promise<MultiModalProcessingResult> {
    return await this.processDocument(documentInput, {
      extractionFields: [
        'document_title', 'document_type', 'relevant_names', 
        'relevant_dates', 'issuing_organization', 'key_information'
      ],
      documentType: 'supporting_document',
      qualityThresholds: {
        minTextClarity: 65,
        minImageQuality: 60,
        minCompleteness: 70,
        minAuthenticity: 75,
        minOverallScore: 65
      }
    })
  }

  /**
   * Get default fields for document type
   */
  private getDefaultFieldsForDocumentType(documentType: string): string[] {
    const fieldMappings = {
      passport: ['passport_number', 'given_names', 'surname', 'nationality', 'date_of_birth', 'date_of_expiry'],
      visa: ['visa_number', 'visa_type', 'full_name', 'nationality', 'date_of_issue', 'date_of_expiry'],
      certificate: ['certificate_type', 'full_name', 'date_of_birth', 'issuing_authority'],
      form: ['form_number', 'applicant_name', 'date_completed'],
      supporting_document: ['document_title', 'document_type', 'relevant_information']
    }

    return fieldMappings[documentType as keyof typeof fieldMappings] || ['general_information']
  }

  /**
   * Get validation rules for document type
   */
  private getValidationRulesForDocumentType(documentType: string): Record<string, any> {
    const ruleMappings = {
      passport: {
        passport_number: { required: true, minLength: 6, maxLength: 15 },
        given_names: { required: true, minLength: 1 },
        surname: { required: true, minLength: 1 },
        date_of_expiry: { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ }
      },
      visa: {
        visa_number: { required: true, minLength: 5 },
        visa_type: { required: true },
        full_name: { required: true, minLength: 2 }
      },
      certificate: {
        certificate_type: { required: true },
        full_name: { required: true, minLength: 2 },
        issuing_authority: { required: true }
      }
    }

    return ruleMappings[documentType as keyof typeof ruleMappings] || {}
  }

  /**
   * Calculate overall processing score
   */
  private calculateOverallScore(
    classification: any,
    ocrResult: any,
    extractionResult: any,
    qualityResult: any,
    translationResult?: any
  ): number {
    const weights = {
      classification: 0.15,
      ocr: 0.25,
      extraction: 0.25,
      quality: 0.35
    }

    let score = 0
    score += classification.classification.confidence * 100 * weights.classification
    score += ocrResult.extractedText.confidence * 100 * weights.ocr
    score += (extractionResult.validationResults.isValid ? 100 : 50) * weights.extraction
    score += qualityResult.qualityScore * weights.quality

    // Adjust for translation if present
    if (translationResult) {
      score = score * 0.9 + translationResult.qualityScore * 0.1
    }

    return Math.round(score)
  }

  /**
   * Generate processing recommendations
   */
  private generateProcessingRecommendations(
    classification: any,
    ocrResult: any,
    extractionResult: any,
    qualityResult: any,
    translationResult?: any
  ): string[] {
    const recommendations: string[] = []

    // Classification recommendations
    if (classification.classification.confidence < 0.8) {
      recommendations.push('Document classification confidence is low - consider manual review')
    }

    // OCR recommendations
    if (ocrResult.extractedText.confidence < 0.8) {
      recommendations.push('OCR confidence is low - consider document quality improvement')
    }

    // Extraction recommendations
    if (extractionResult.missingFields.length > 0) {
      recommendations.push(`${extractionResult.missingFields.length} fields are missing - review document completeness`)
    }

    // Quality recommendations
    if (!qualityResult.passed) {
      recommendations.push('Document failed quality validation - manual review required')
    }

    // Translation recommendations
    if (translationResult && translationResult.qualityScore < 80) {
      recommendations.push('Translation quality is below threshold - consider professional review')
    }

    return recommendations
  }

  /**
   * Get processing statistics
   */
  getProcessingStatistics(results: MultiModalProcessingResult[]): {
    totalDocuments: number
    averageScore: number
    averageProcessingTime: number
    successRate: number
    documentTypeDistribution: Record<string, number>
    qualityDistribution: Record<string, number>
  } {
    const totalDocuments = results.length
    const averageScore = results.reduce((sum, r) => sum + r.overallScore, 0) / totalDocuments
    const averageProcessingTime = results.reduce((sum, r) => sum + r.processingTime, 0) / totalDocuments
    const successRate = results.filter(r => r.quality.passed).length / totalDocuments

    const documentTypeDistribution: Record<string, number> = {}
    const qualityDistribution: Record<string, number> = {}

    results.forEach(result => {
      const docType = result.classification.classification.category
      documentTypeDistribution[docType] = (documentTypeDistribution[docType] || 0) + 1

      const qualityBand = result.overallScore >= 80 ? 'high' : 
                         result.overallScore >= 60 ? 'medium' : 'low'
      qualityDistribution[qualityBand] = (qualityDistribution[qualityBand] || 0) + 1
    })

    return {
      totalDocuments,
      averageScore: Math.round(averageScore),
      averageProcessingTime: Math.round(averageProcessingTime),
      successRate: Math.round(successRate * 100) / 100,
      documentTypeDistribution,
      qualityDistribution
    }
  }
}