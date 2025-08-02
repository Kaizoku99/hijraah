import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  DocumentClassificationAgent,
  OCRProcessingAgent,
  ContentExtractionAgent,
  QualityValidationAgent,
  TranslationAgent,
  MultiModalDocumentTeam
} from '../index'
import { DocumentInput, AgentConfig } from '../types'

// Mock the AI SDK functions
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn()
}))

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => 'gpt-4o')
}))

vi.mock('@ai-sdk/mistral', () => ({
  mistral: vi.fn(() => 'pixtral-12b-2409')
}))

vi.mock('../../../utils', () => ({
  withAgentErrorHandling: vi.fn((fn) => fn),
  logAgentStep: vi.fn()
}))

describe('Multi-Modal Document Processing Agents', () => {
  let mockDocumentInput: DocumentInput
  let agentConfig: AgentConfig

  beforeEach(() => {
    mockDocumentInput = {
      id: 'test-doc-001',
      type: 'image',
      source: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
      metadata: {
        filename: 'passport.jpg',
        mimeType: 'image/jpeg',
        size: 1024000
      }
    }

    agentConfig = {
      model: 'gpt-4o',
      maxSteps: 5,
      temperature: 0.1,
      enableLogging: false,
      timeout: 30000
    }

    vi.clearAllMocks()
  })

  describe('DocumentClassificationAgent', () => {
    let agent: DocumentClassificationAgent

    beforeEach(() => {
      agent = new DocumentClassificationAgent(agentConfig)
    })

    it('should classify a document correctly', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          documentId: 'test-doc-001',
          classification: {
            category: 'passport',
            subCategory: 'biometric_passport',
            confidence: 0.95,
            language: 'en',
            documentFormat: 'image'
          },
          visualFeatures: {
            hasPhotos: true,
            hasSignatures: true,
            hasSeals: true,
            hasWatermarks: true,
            quality: 'excellent'
          },
          processingRecommendations: ['High quality document, proceed with OCR'],
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      })

      const result = await agent.classifyDocument(mockDocumentInput)

      expect(result.documentId).toBe('test-doc-001')
      expect(result.classification.category).toBe('passport')
      expect(result.classification.confidence).toBe(0.95)
      expect(result.visualFeatures.hasPhotos).toBe(true)
      expect(generateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4o',
          schema: expect.any(Object),
          messages: expect.arrayContaining([
            expect.objectContaining({ role: 'system' }),
            expect.objectContaining({ role: 'user' })
          ])
        })
      )
    })

    it('should batch classify multiple documents', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          documentId: 'test-doc-001',
          classification: {
            category: 'passport',
            confidence: 0.95,
            language: 'en',
            documentFormat: 'image'
          },
          visualFeatures: {
            hasPhotos: true,
            hasSignatures: true,
            hasSeals: true,
            hasWatermarks: true,
            quality: 'excellent'
          },
          processingRecommendations: [],
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      })

      const documents = [mockDocumentInput, { ...mockDocumentInput, id: 'test-doc-002' }]
      const results = await agent.classifyDocuments(documents)

      expect(results).toHaveLength(2)
      expect(results[0].documentId).toBe('test-doc-001')
      expect(generateObject).toHaveBeenCalledTimes(2)
    })

    it('should validate classification results', () => {
      const validResult = {
        documentId: 'test-doc-001',
        classification: {
          category: 'passport' as const,
          confidence: 0.8,
          language: 'en',
          documentFormat: 'image' as const
        },
        visualFeatures: {
          hasPhotos: true,
          hasSignatures: true,
          hasSeals: true,
          hasWatermarks: true,
          quality: 'excellent' as const
        },
        processingRecommendations: [],
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const isValid = agent.validateClassification(validResult)
      expect(isValid).toBe(true)
    })
  })

  describe('OCRProcessingAgent', () => {
    let agent: OCRProcessingAgent

    beforeEach(() => {
      agent = new OCRProcessingAgent(agentConfig)
    })

    it('should process OCR correctly', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          documentId: 'test-doc-001',
          extractedText: {
            fullText: 'PASSPORT\nUnited States of America\nJohn Doe\n...',
            structuredData: {
              name: 'John Doe',
              passport_number: 'A12345678',
              nationality: 'USA'
            },
            confidence: 0.92,
            language: 'en'
          },
          pages: [{
            pageNumber: 1,
            text: 'PASSPORT\nUnited States of America\nJohn Doe\n...',
            confidence: 0.92
          }],
          metadata: {
            processingTime: 2500,
            ocrEngine: 'mistral-pixtral-12b-2409',
            totalPages: 1,
            averageConfidence: 0.92
          },
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      })

      const result = await agent.processOCR(mockDocumentInput)

      expect(result.documentId).toBe('test-doc-001')
      expect(result.extractedText.confidence).toBe(0.92)
      expect(result.extractedText.structuredData.name).toBe('John Doe')
      expect(result.metadata.ocrEngine).toBe('mistral-pixtral-12b-2409')
    })

    it('should calculate quality metrics', () => {
      const mockOCRResult = {
        documentId: 'test-doc-001',
        extractedText: {
          fullText: 'Sample text content',
          structuredData: { name: 'John Doe' },
          confidence: 0.9,
          language: 'en'
        },
        pages: [
          { pageNumber: 1, text: 'Sample text', confidence: 0.9 },
          { pageNumber: 2, text: 'More text', confidence: 0.85 }
        ],
        metadata: {
          processingTime: 3000,
          ocrEngine: 'mistral-pixtral-12b-2409',
          totalPages: 2,
          averageConfidence: 0.875
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const metrics = agent.getQualityMetrics(mockOCRResult)

      expect(metrics.overall_confidence).toBe(0.9)
      expect(metrics.average_page_confidence).toBe(0.875)
      expect(metrics.text_length).toBe(19)
      expect(metrics.structured_fields_count).toBe(1)
      expect(metrics.processing_speed).toBe(3)
    })
  })

  describe('ContentExtractionAgent', () => {
    let agent: ContentExtractionAgent

    beforeEach(() => {
      agent = new ContentExtractionAgent(agentConfig)
    })

    it('should extract content from OCR results', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          extractedFields: {
            passport_number: 'A12345678',
            given_names: 'John',
            surname: 'Doe',
            nationality: 'USA',
            date_of_birth: '1990-01-01'
          },
          fieldConfidence: {
            passport_number: 0.95,
            given_names: 0.92,
            surname: 0.94,
            nationality: 0.98,
            date_of_birth: 0.88
          },
          missingFields: ['place_of_birth'],
          validationResults: {
            isValid: true,
            errors: [],
            warnings: ['Date format should be verified']
          },
          normalizedData: {
            passport_number: 'A12345678',
            given_names: 'John',
            surname: 'Doe',
            nationality: 'USA',
            date_of_birth: '1990-01-01'
          }
        }
      })

      const mockOCRResult = {
        documentId: 'test-doc-001',
        extractedText: {
          fullText: 'PASSPORT A12345678 John Doe USA 01/01/1990',
          structuredData: {},
          confidence: 0.9,
          language: 'en'
        },
        pages: [],
        metadata: {
          processingTime: 2000,
          ocrEngine: 'mistral',
          totalPages: 1,
          averageConfidence: 0.9
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const result = await agent.extractContent(mockOCRResult, {
        targetFields: ['passport_number', 'given_names', 'surname', 'nationality', 'date_of_birth'],
        documentType: 'passport'
      })

      expect(result.documentId).toBe('test-doc-001')
      expect(result.extractedFields.passport_number).toBe('A12345678')
      expect(result.fieldConfidence.passport_number).toBe(0.95)
      expect(result.missingFields).toContain('place_of_birth')
      expect(result.validationResults.isValid).toBe(true)
    })

    it('should validate extracted content', () => {
      const mockResult = {
        documentId: 'test-doc-001',
        extractedFields: {
          passport_number: 'A12345678',
          given_names: 'John'
        },
        fieldConfidence: {
          passport_number: 0.95,
          given_names: 0.8
        },
        missingFields: [],
        validationResults: {
          isValid: true,
          errors: [],
          warnings: []
        },
        normalizedData: {},
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const validationRules = {
        passport_number: { required: true, minLength: 6, minConfidence: 0.9 },
        given_names: { required: true, minLength: 1, minConfidence: 0.7 }
      }

      const validation = agent.validateExtractedContent(mockResult, validationRules)

      expect(validation.isValid).toBe(true)
      expect(validation.errors).toHaveLength(0)
    })
  })

  describe('QualityValidationAgent', () => {
    let agent: QualityValidationAgent

    beforeEach(() => {
      agent = new QualityValidationAgent(agentConfig)
    })

    it('should validate document processing quality', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          documentId: 'test-doc-001',
          qualityScore: 85,
          qualityMetrics: {
            textClarity: 88,
            imageQuality: 82,
            completeness: 90,
            authenticity: 85
          },
          issues: [{
            type: 'minor',
            description: 'Slight blur in bottom section',
            recommendation: 'Acceptable for processing'
          }],
          passed: true,
          recommendations: ['Document quality is acceptable'],
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      })

      const mockOCRResult = {
        documentId: 'test-doc-001',
        extractedText: { fullText: 'Sample text', structuredData: {}, confidence: 0.9, language: 'en' },
        pages: [],
        metadata: { processingTime: 2000, ocrEngine: 'mistral', totalPages: 1, averageConfidence: 0.9 },
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const mockExtractionResult = {
        documentId: 'test-doc-001',
        extractedFields: { name: 'John Doe' },
        fieldConfidence: { name: 0.9 },
        missingFields: [],
        validationResults: { isValid: true, errors: [], warnings: [] },
        normalizedData: {},
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const result = await agent.validateQuality(
        mockDocumentInput,
        mockOCRResult,
        mockExtractionResult
      )

      expect(result.documentId).toBe('test-doc-001')
      expect(result.qualityScore).toBe(85)
      expect(result.passed).toBe(true)
      expect(result.qualityMetrics.textClarity).toBe(88)
    })

    it('should generate improvement recommendations', () => {
      const mockValidationResult = {
        documentId: 'test-doc-001',
        qualityScore: 65,
        qualityMetrics: {
          textClarity: 60,
          imageQuality: 65,
          completeness: 70,
          authenticity: 75
        },
        issues: [],
        passed: false,
        recommendations: [],
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const recommendations = agent.generateImprovementRecommendations(mockValidationResult)

      expect(recommendations.length).toBeGreaterThan(0)
      expect(recommendations[0].priority).toBe('high')
      expect(recommendations[0].category).toBe('Text Clarity')
    })
  })

  describe('TranslationAgent', () => {
    let agent: TranslationAgent

    beforeEach(() => {
      agent = new TranslationAgent(agentConfig)
    })

    it('should translate document content', async () => {
      const { generateObject, generateText } = await import('ai')
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          legalTerms: ['passport', 'visa', 'immigration']
        }
      }).mockResolvedValueOnce({
        object: {
          documentId: 'test-doc-001',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          translatedText: 'PASAPORTE Estados Unidos de América Juan Pérez...',
          translatedFields: {
            given_names: 'Juan',
            surname: 'Pérez',
            nationality: 'Estados Unidos'
          },
          confidence: 0.92,
          qualityScore: 88,
          preservedFormatting: true,
          legalTermsPreserved: ['passport', 'visa'],
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      }).mockResolvedValueOnce({
        object: {
          qualityScore: 88
        }
      })
      
      vi.mocked(generateText).mockResolvedValue({
        text: 'Sample validation text'
      })

      const mockOCRResult = {
        documentId: 'test-doc-001',
        extractedText: {
          fullText: 'PASSPORT United States of America John Doe...',
          structuredData: {},
          confidence: 0.9,
          language: 'en'
        },
        pages: [],
        metadata: { processingTime: 2000, ocrEngine: 'mistral', totalPages: 1, averageConfidence: 0.9 },
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const mockExtractionResult = {
        documentId: 'test-doc-001',
        extractedFields: { given_names: 'John', surname: 'Doe', nationality: 'USA' },
        fieldConfidence: {},
        missingFields: [],
        validationResults: { isValid: true, errors: [], warnings: [] },
        normalizedData: {},
        timestamp: '2024-01-01T00:00:00.000Z'
      }

      const result = await agent.translateDocument(
        mockOCRResult,
        mockExtractionResult,
        'es'
      )

      expect(result.documentId).toBe('test-doc-001')
      expect(result.sourceLanguage).toBe('en')
      expect(result.targetLanguage).toBe('es')
      expect(result.translatedText).toContain('PASAPORTE')
      expect(result.translatedFields.given_names).toBe('Juan')
    })

    it('should detect document language', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          language: 'en',
          confidence: 0.95,
          alternativeLanguages: [
            { language: 'es', confidence: 0.03 },
            { language: 'fr', confidence: 0.02 }
          ]
        }
      })

      const result = await agent.detectLanguage('This is an English document')

      expect(result.language).toBe('en')
      expect(result.confidence).toBe(0.95)
      expect(result.alternativeLanguages).toHaveLength(2)
    })

    it('should get supported languages', () => {
      const languages = agent.getSupportedLanguages()

      expect(languages).toHaveLength(14)
      expect(languages[0]).toEqual({
        code: 'en',
        name: 'English',
        nativeName: 'English'
      })
    })
  })

  describe('MultiModalDocumentTeam', () => {
    let team: MultiModalDocumentTeam

    beforeEach(() => {
      team = new MultiModalDocumentTeam(agentConfig)
    })

    it('should process document through complete pipeline', async () => {
      const { generateObject, generateText } = await import('ai')
      
      vi.mocked(generateText).mockResolvedValue({
        text: 'Sample validation text'
      })
      
      // Mock all agent responses
      vi.mocked(generateObject)
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            classification: {
              category: 'passport',
              confidence: 0.95,
              language: 'en',
              documentFormat: 'image'
            },
            visualFeatures: {
              hasPhotos: true,
              hasSignatures: true,
              hasSeals: true,
              hasWatermarks: true,
              quality: 'excellent'
            },
            processingRecommendations: [],
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            extractedText: {
              fullText: 'PASSPORT John Doe A12345678',
              structuredData: {},
              confidence: 0.9,
              language: 'en'
            },
            pages: [],
            metadata: {
              processingTime: 2000,
              ocrEngine: 'mistral-pixtral-12b-2409',
              totalPages: 1,
              averageConfidence: 0.9
            },
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })
        .mockResolvedValueOnce({
          object: {
            extractedFields: { passport_number: 'A12345678', given_names: 'John', surname: 'Doe' },
            fieldConfidence: { passport_number: 0.95, given_names: 0.9, surname: 0.92 },
            missingFields: [],
            validationResults: { isValid: true, errors: [], warnings: [] },
            normalizedData: {}
          }
        })
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            qualityScore: 88,
            qualityMetrics: {
              textClarity: 90,
              imageQuality: 85,
              completeness: 90,
              authenticity: 88
            },
            issues: [],
            passed: true,
            recommendations: [],
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })

      const result = await team.processDocument(mockDocumentInput, {
        extractionFields: ['passport_number', 'given_names', 'surname'],
        documentType: 'passport'
      })

      expect(result.documentId).toBe('test-doc-001')
      expect(result.classification.classification.category).toBe('passport')
      expect(result.ocr.extractedText.confidence).toBeGreaterThan(0)
      expect(result.extraction.extractedFields.passport_number).toBe('A12345678')
      expect(result.quality.passed).toBe(true)
      expect(result.overallScore).toBeGreaterThan(0)
      expect(result.processingTime).toBeGreaterThan(0)
    })

    it('should process specialized passport document', async () => {
      const { generateObject, generateText } = await import('ai')
      
      vi.mocked(generateText).mockResolvedValue({
        text: 'Sample validation text'
      })
      
      // Mock responses for passport processing
      vi.mocked(generateObject)
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            classification: { category: 'passport', confidence: 0.95, language: 'en', documentFormat: 'image' },
            visualFeatures: { hasPhotos: true, hasSignatures: true, hasSeals: true, hasWatermarks: true, quality: 'excellent' },
            processingRecommendations: [],
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            extractedText: { fullText: 'PASSPORT', structuredData: {}, confidence: 0.9, language: 'en' },
            pages: [],
            metadata: { processingTime: 2000, ocrEngine: 'mistral', totalPages: 1, averageConfidence: 0.9 },
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })
        .mockResolvedValueOnce({
          object: {
            extractedFields: {},
            fieldConfidence: {},
            missingFields: [],
            validationResults: { isValid: true, errors: [], warnings: [] },
            normalizedData: {}
          }
        })
        .mockResolvedValueOnce({
          object: {
            documentId: 'test-doc-001',
            qualityScore: 88,
            qualityMetrics: { textClarity: 90, imageQuality: 85, completeness: 90, authenticity: 88 },
            issues: [],
            passed: true,
            recommendations: [],
            timestamp: '2024-01-01T00:00:00.000Z'
          }
        })

      const result = await team.processDocumentWithSpecializedWorkflow(mockDocumentInput, 'passport')

      expect(result.documentId).toBe('test-doc-001')
      expect(result.classification.classification.category).toBe('passport')
    })

    it('should calculate processing statistics', () => {
      const mockResults = [
        {
          documentId: 'doc-1',
          classification: { classification: { category: 'passport' } },
          ocr: {},
          extraction: {},
          quality: { passed: true },
          overallScore: 85,
          processingTime: 3000,
          recommendations: [],
          timestamp: '2024-01-01T00:00:00.000Z'
        },
        {
          documentId: 'doc-2',
          classification: { classification: { category: 'visa' } },
          ocr: {},
          extraction: {},
          quality: { passed: false },
          overallScore: 65,
          processingTime: 2500,
          recommendations: [],
          timestamp: '2024-01-01T00:00:00.000Z'
        }
      ] as any

      const stats = team.getProcessingStatistics(mockResults)

      expect(stats.totalDocuments).toBe(2)
      expect(stats.averageScore).toBe(75)
      expect(stats.averageProcessingTime).toBe(2750)
      expect(stats.successRate).toBe(0.5)
      expect(stats.documentTypeDistribution.passport).toBe(1)
      expect(stats.documentTypeDistribution.visa).toBe(1)
      expect(stats.qualityDistribution.high).toBe(1)
      expect(stats.qualityDistribution.medium).toBe(1)
    })
  })
})