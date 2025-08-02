import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  DocumentInput,
  OCRProcessingResult,
  ContentExtractionResult,
  QualityValidationResult, 
  QualityValidationResultSchema,
  AgentConfig,
  AgentConfigSchema
} from './types'
import { withAgentErrorHandling, logAgentStep } from '../../utils'

/**
 * Quality Validation Agent using AI SDK v5 evaluation patterns
 * Performs confidence scoring, accuracy assessment, and error detection
 */
export class QualityValidationAgent {
  private config: AgentConfig

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config)
  }

  /**
   * Validate document processing quality
   */
  async validateQuality(
    documentInput: DocumentInput,
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult,
    qualityThresholds: {
      minTextClarity?: number
      minImageQuality?: number
      minCompleteness?: number
      minAuthenticity?: number
      minOverallScore?: number
    } = {}
  ): Promise<QualityValidationResult> {
    const validateQuality = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting quality validation for ${documentInput.id}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Set default thresholds
      const thresholds = {
        minTextClarity: 70,
        minImageQuality: 70,
        minCompleteness: 80,
        minAuthenticity: 85,
        minOverallScore: 75,
        ...qualityThresholds
      }

      const { object: validation } = await generateObject({
        model: openai(this.config.model),
        schema: QualityValidationResultSchema,
        temperature: this.config.temperature,
        maxSteps: this.config.maxSteps,
        system: `You are an expert quality validation agent for immigration document processing.
        
        Your task is to assess the quality of document processing results:
        1. Text Clarity: Evaluate OCR accuracy and text readability
        2. Image Quality: Assess visual quality and document condition
        3. Completeness: Check if all required fields were extracted
        4. Authenticity: Evaluate document authenticity indicators
        5. Overall Assessment: Provide comprehensive quality score
        
        Quality Thresholds:
        - Text Clarity: ${thresholds.minTextClarity}%
        - Image Quality: ${thresholds.minImageQuality}%
        - Completeness: ${thresholds.minCompleteness}%
        - Authenticity: ${thresholds.minAuthenticity}%
        - Overall Score: ${thresholds.minOverallScore}%
        
        Be thorough and identify specific issues with actionable recommendations.`,
        prompt: `Validate the quality of this document processing:
        
        Document Input:
        - ID: ${documentInput.id}
        - Type: ${documentInput.type}
        - Metadata: ${JSON.stringify(documentInput.metadata, null, 2)}
        
        OCR Results:
        - Text Confidence: ${ocrResult.extractedText.confidence}
        - Language: ${ocrResult.extractedText.language}
        - Pages Processed: ${ocrResult.pages.length}
        - Processing Time: ${ocrResult.metadata.processingTime}ms
        - Average Confidence: ${ocrResult.metadata.averageConfidence}
        
        Content Extraction Results:
        - Fields Extracted: ${Object.keys(extractionResult.extractedFields).length}
        - Missing Fields: ${extractionResult.missingFields.length}
        - Validation Status: ${extractionResult.validationResults.isValid}
        - Errors: ${extractionResult.validationResults.errors.length}
        - Warnings: ${extractionResult.validationResults.warnings.length}
        
        Sample Extracted Text (first 500 chars):
        ${ocrResult.extractedText.fullText.substring(0, 500)}...
        
        Extracted Fields:
        ${JSON.stringify(extractionResult.extractedFields, null, 2)}
        
        Assess quality across all dimensions and provide specific recommendations for improvement.`,
        onStepFinish: this.config.enableLogging ? ({ text, toolCalls, toolResults, finishReason, usage }) => {
          logAgentStep({
            stepNumber: 2,
            text: text || 'Quality validation step completed',
            toolCalls: toolCalls || [],
            toolResults: toolResults || [],
            finishReason: finishReason || 'completed',
            usage: usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
        } : undefined
      })

      // Ensure the result includes required metadata
      const result: QualityValidationResult = {
        ...validation,
        documentId: documentInput.id,
        passed: validation.qualityScore >= thresholds.minOverallScore,
        timestamp: new Date().toISOString()
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `Quality validation completed for ${documentInput.id} - Score: ${result.qualityScore}, Passed: ${result.passed}`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return result
    })

    return await validateQuality()
  }

  /**
   * Validate quality for multiple documents
   */
  async batchValidateQuality(
    inputs: Array<{
      documentInput: DocumentInput
      ocrResult: OCRProcessingResult
      extractionResult: ContentExtractionResult
    }>,
    qualityThresholds: {
      minTextClarity?: number
      minImageQuality?: number
      minCompleteness?: number
      minAuthenticity?: number
      minOverallScore?: number
    } = {}
  ): Promise<QualityValidationResult[]> {
    const batchValidate = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch quality validation for ${inputs.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'in_progress',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      // Process validations in parallel
      const results = await Promise.all(
        inputs.map(({ documentInput, ocrResult, extractionResult }) =>
          this.validateQuality(documentInput, ocrResult, extractionResult, qualityThresholds)
        )
      )

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch quality validation completed for ${inputs.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: 'completed',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        })
      }

      return results
    })

    return await batchValidate()
  }

  /**
   * Perform deep quality analysis with detailed metrics
   */
  async performDeepQualityAnalysis(
    documentInput: DocumentInput,
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult
  ): Promise<QualityValidationResult & { detailedMetrics: Record<string, any> }> {
    const deepAnalysis = withAgentErrorHandling(async () => {
      // Perform standard quality validation
      const standardValidation = await this.validateQuality(documentInput, ocrResult, extractionResult)

      // Calculate detailed metrics
      const detailedMetrics = {
        ocrMetrics: this.calculateOCRMetrics(ocrResult),
        extractionMetrics: this.calculateExtractionMetrics(extractionResult),
        consistencyMetrics: this.calculateConsistencyMetrics(ocrResult, extractionResult),
        performanceMetrics: this.calculatePerformanceMetrics(ocrResult, extractionResult)
      }

      return {
        ...standardValidation,
        detailedMetrics
      }
    })

    return await deepAnalysis()
  }

  /**
   * Validate document authenticity indicators
   */
  async validateAuthenticity(
    documentInput: DocumentInput,
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult
  ): Promise<{
    authenticityScore: number
    indicators: Array<{
      type: string
      present: boolean
      confidence: number
      description: string
    }>
    riskFactors: string[]
    recommendations: string[]
  }> {
    const validateAuth = withAgentErrorHandling(async () => {
      const { object: authenticity } = await generateObject({
        model: openai(this.config.model),
        schema: z.object({
          authenticityScore: z.number().min(0).max(100),
          indicators: z.array(z.object({
            type: z.string(),
            present: z.boolean(),
            confidence: z.number().min(0).max(1),
            description: z.string()
          })),
          riskFactors: z.array(z.string()),
          recommendations: z.array(z.string())
        }),
        system: `You are an expert document authenticity validator specializing in immigration documents.
        
        Analyze the document for authenticity indicators:
        1. Security features (watermarks, holograms, special inks)
        2. Official seals and stamps
        3. Document structure and formatting
        4. Text consistency and quality
        5. Digital signatures or codes
        
        Identify potential risk factors and provide recommendations.`,
        prompt: `Validate the authenticity of this immigration document:
        
        Document Type: ${documentInput.type}
        OCR Text: ${ocrResult.extractedText.fullText.substring(0, 1000)}...
        Extracted Fields: ${JSON.stringify(extractionResult.extractedFields, null, 2)}
        
        Look for authenticity indicators and assess the overall authenticity score.`
      })

      return authenticity
    })

    return await validateAuth()
  }

  /**
   * Calculate OCR-specific quality metrics
   */
  private calculateOCRMetrics(ocrResult: OCRProcessingResult): Record<string, number> {
    return {
      averageConfidence: ocrResult.metadata.averageConfidence,
      textLength: ocrResult.extractedText.fullText.length,
      pageCount: ocrResult.pages.length,
      processingSpeed: ocrResult.metadata.processingTime / 1000, // seconds
      confidenceVariance: this.calculateConfidenceVariance(ocrResult.pages),
      textDensity: ocrResult.extractedText.fullText.length / ocrResult.pages.length
    }
  }

  /**
   * Calculate extraction-specific quality metrics
   */
  private calculateExtractionMetrics(extractionResult: ContentExtractionResult): Record<string, number> {
    const fieldCount = Object.keys(extractionResult.extractedFields).length
    const missingCount = extractionResult.missingFields.length
    const errorCount = extractionResult.validationResults.errors.length
    const warningCount = extractionResult.validationResults.warnings.length

    return {
      fieldsExtracted: fieldCount,
      fieldsMissing: missingCount,
      completenessRatio: fieldCount / (fieldCount + missingCount),
      errorCount,
      warningCount,
      validationScore: extractionResult.validationResults.isValid ? 100 : 0,
      averageFieldConfidence: this.calculateAverageFieldConfidence(extractionResult.fieldConfidence)
    }
  }

  /**
   * Calculate consistency metrics between OCR and extraction
   */
  private calculateConsistencyMetrics(
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult
  ): Record<string, number> {
    // Check consistency between OCR structured data and extracted fields
    const ocrFields = Object.keys(ocrResult.extractedText.structuredData)
    const extractedFields = Object.keys(extractionResult.extractedFields)
    
    const commonFields = ocrFields.filter(field => extractedFields.includes(field))
    const consistencyScore = commonFields.length / Math.max(ocrFields.length, extractedFields.length, 1)

    return {
      fieldConsistency: consistencyScore,
      commonFieldCount: commonFields.length,
      ocrFieldCount: ocrFields.length,
      extractedFieldCount: extractedFields.length
    }
  }

  /**
   * Calculate performance metrics
   */
  private calculatePerformanceMetrics(
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult
  ): Record<string, number> {
    return {
      ocrProcessingTime: ocrResult.metadata.processingTime,
      totalProcessingTime: ocrResult.metadata.processingTime, // Would include extraction time in real implementation
      throughput: ocrResult.extractedText.fullText.length / (ocrResult.metadata.processingTime / 1000), // chars per second
      efficiency: Object.keys(extractionResult.extractedFields).length / (ocrResult.metadata.processingTime / 1000) // fields per second
    }
  }

  /**
   * Calculate confidence variance across pages
   */
  private calculateConfidenceVariance(pages: Array<{ confidence: number }>): number {
    if (pages.length === 0) return 0

    const confidences = pages.map(p => p.confidence)
    const mean = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length
    const variance = confidences.reduce((sum, conf) => sum + Math.pow(conf - mean, 2), 0) / confidences.length
    
    return Math.sqrt(variance) // Return standard deviation
  }

  /**
   * Calculate average field confidence
   */
  private calculateAverageFieldConfidence(fieldConfidence: Record<string, number>): number {
    const confidences = Object.values(fieldConfidence)
    if (confidences.length === 0) return 0
    
    return confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length
  }

  /**
   * Generate quality improvement recommendations
   */
  generateImprovementRecommendations(
    validationResult: QualityValidationResult
  ): Array<{
    category: string
    priority: 'high' | 'medium' | 'low'
    recommendation: string
    expectedImprovement: number
  }> {
    const recommendations: Array<{
      category: string
      priority: 'high' | 'medium' | 'low'
      recommendation: string
      expectedImprovement: number
    }> = []

    // Text clarity recommendations
    if (validationResult.qualityMetrics.textClarity < 80) {
      recommendations.push({
        category: 'Text Clarity',
        priority: 'high',
        recommendation: 'Improve document scan quality or use higher resolution images',
        expectedImprovement: 15
      })
    }

    // Image quality recommendations
    if (validationResult.qualityMetrics.imageQuality < 70) {
      recommendations.push({
        category: 'Image Quality',
        priority: 'high',
        recommendation: 'Rescan document with better lighting and focus',
        expectedImprovement: 20
      })
    }

    // Completeness recommendations
    if (validationResult.qualityMetrics.completeness < 90) {
      recommendations.push({
        category: 'Completeness',
        priority: 'medium',
        recommendation: 'Review missing fields and consider manual data entry',
        expectedImprovement: 10
      })
    }

    // Authenticity recommendations
    if (validationResult.qualityMetrics.authenticity < 85) {
      recommendations.push({
        category: 'Authenticity',
        priority: 'high',
        recommendation: 'Manual review required for authenticity verification',
        expectedImprovement: 0 // Manual process
      })
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }
}