import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { 
  Document, 
  DocumentGroup, 
  CaseContext,
  DocumentSchema,
  DocumentGroupSchema,
  CaseContextSchema
} from '../types'
import { 
  withAgentErrorHandling,
  logAgentStep,
  getModelForTask
} from '../utils'
import { 
  textExtractionTool,
  authenticationTool,
  complianceTool
} from '../tools'

// Document classification schema
const DocumentClassificationSchema = z.object({
  documentGroups: z.array(DocumentGroupSchema),
  processingOrder: z.array(z.string()),
  estimatedTime: z.number(), // in minutes
  specialRequirements: z.array(z.string())
})

// Document processing result schema
const DocumentProcessingSchema = z.object({
  extractedData: z.record(z.any()),
  authenticity: z.object({
    score: z.number().min(0).max(100),
    verified: z.boolean(),
    concerns: z.array(z.string())
  }),
  compliance: z.object({
    compliant: z.boolean(),
    violations: z.array(z.string()),
    recommendations: z.array(z.string())
  }),
  quality: z.object({
    score: z.number().min(0).max(100),
    issues: z.array(z.string()),
    improvements: z.array(z.string())
  })
})

// Quality assurance result schema
const QualityAssuranceSchema = z.object({
  overallScore: z.number().min(0).max(100),
  passed: z.boolean(),
  issues: z.array(z.object({
    type: z.enum(['critical', 'major', 'minor']),
    description: z.string(),
    recommendation: z.string()
  })),
  recommendations: z.array(z.string())
})

export class DocumentProcessingTeam {
  /**
   * Main entry point for document processing
   */
  async processDocuments(
    documents: Document[], 
    caseContext: CaseContext
  ) {
    const processDocuments = withAgentErrorHandling(async () => {
      // Step 1: Classify documents
      const classification = await this.classifyDocuments(documents)
      
      logAgentStep({
        stepNumber: 1,
        text: `Classified ${documents.length} documents into ${classification.documentGroups.length} groups`,
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      })

      // Step 2: Process each document group in parallel
      const processingResults = await Promise.all(
        classification.documentGroups.map(async (group, index) => {
          logAgentStep({
            stepNumber: 2 + index,
            text: `Processing ${group.type} document group with ${group.documents.length} documents`,
            toolCalls: [],
            toolResults: [],
            finishReason: 'in_progress',
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
          })
          
          return this.processDocumentGroup(group, caseContext)
        })
      )

      // Step 3: Quality assurance
      const qaResult = await this.performQualityAssurance(processingResults)

      logAgentStep({
        stepNumber: 2 + classification.documentGroups.length + 1,
        text: `Quality assurance completed with score: ${qaResult.overallScore}`,
        toolCalls: [],
        toolResults: [],
        finishReason: 'completed',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      })

      return { 
        classification, 
        processingResults, 
        qaResult 
      }
    })

    return await processDocuments()
  }

  /**
   * Classify documents into processing groups
   */
  private async classifyDocuments(documents: Document[]) {
    const { object: classification } = await generateObject({
      model: openai(getModelForTask('document_analysis')),
      schema: DocumentClassificationSchema,
      system: `You are an immigration document classifier. Group documents by type and processing requirements.
      
      Consider:
      - Document types and their relationships
      - Processing complexity and dependencies
      - Priority based on immigration requirements
      - Special handling requirements`,
      prompt: `Classify these immigration documents for optimal processing:
      
      ${documents.map(doc => `- ${doc.type}: ${doc.id} ${doc.metadata ? JSON.stringify(doc.metadata) : ''}`).join('\n')}
      
      Group them logically for efficient processing and determine the optimal order.`
    })

    return classification
  }

  /**
   * Process a group of related documents
   */
  private async processDocumentGroup(
    group: DocumentGroup, 
    context: CaseContext
  ) {
    const { object: result } = await generateObject({
      model: openai(getModelForTask('document_analysis')),
      schema: DocumentProcessingSchema,
      tools: {
        extractText: textExtractionTool,
        verifyAuthenticity: authenticationTool,
        checkCompliance: complianceTool,
      },
      maxSteps: 5,
      system: `You are a specialist in processing ${group.type} documents for immigration cases.
      
      Your tasks:
      1. Extract structured data from documents
      2. Verify document authenticity
      3. Check compliance with immigration requirements
      4. Assess document quality
      
      Use the available tools to perform thorough analysis.`,
      prompt: `Process this group of ${group.type} documents:
      
      Documents: ${JSON.stringify(group.documents)}
      Case Context: ${JSON.stringify(context)}
      Priority: ${group.priority}
      
      Perform comprehensive analysis and extraction.`
    })

    return {
      group: group.type,
      ...result
    }
  }

  /**
   * Perform quality assurance on processing results
   */
  private async performQualityAssurance(
    processingResults: any[]
  ) {
    const { object: qaResult } = await generateObject({
      model: openai(getModelForTask('data_validation')),
      schema: QualityAssuranceSchema,
      system: `You are a quality assurance specialist for immigration document processing.
      
      Review processing results for:
      - Completeness of data extraction
      - Consistency across documents
      - Compliance with standards
      - Potential errors or omissions
      - Overall processing quality`,
      prompt: `Review these document processing results for quality assurance:
      
      ${JSON.stringify(processingResults, null, 2)}
      
      Identify any issues and provide recommendations for improvement.`
    })

    return qaResult
  }

  /**
   * Extract specific data from documents
   */
  async extractSpecificData(
    documents: Document[],
    dataFields: string[]
  ) {
    const extractData = withAgentErrorHandling(async () => {
      const { object: extractedData } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          extractedFields: z.record(z.any()),
          confidence: z.number().min(0).max(100),
          missingFields: z.array(z.string()),
          notes: z.array(z.string())
        }),
        tools: {
          extractText: textExtractionTool
        },
        maxSteps: 3,
        system: 'You are a data extraction specialist. Extract specific fields from immigration documents accurately.',
        prompt: `Extract these specific data fields from the documents:
        
        Fields to extract: ${dataFields.join(', ')}
        Documents: ${JSON.stringify(documents)}
        
        Use the text extraction tool to get document content, then extract the requested fields.`
      })

      return extractedData
    })

    return await extractData()
  }

  /**
   * Validate document authenticity
   */
  async validateAuthenticity(documents: Document[]) {
    const validateAuth = withAgentErrorHandling(async () => {
      const results = await Promise.all(
        documents.map(async (doc) => {
          const { object: validation } = await generateObject({
            model: openai('gpt-4o'),
            schema: z.object({
              documentId: z.string(),
              authentic: z.boolean(),
              confidence: z.number().min(0).max(100),
              concerns: z.array(z.string()),
              verificationSteps: z.array(z.string())
            }),
            tools: {
              verifyAuthenticity: authenticationTool
            },
            maxSteps: 3,
            system: 'You are a document authenticity verification specialist.',
            prompt: `Verify the authenticity of this immigration document:
            
            Document: ${JSON.stringify(doc)}
            
            Check for signs of tampering, forgery, or other authenticity issues.`
          })

          return validation
        })
      )

      return results
    })

    return await validateAuth()
  }

  /**
   * Check document compliance with requirements
   */
  async checkDocumentCompliance(
    documents: Document[],
    requirements: string[]
  ) {
    const checkCompliance = withAgentErrorHandling(async () => {
      const { object: compliance } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          overallCompliant: z.boolean(),
          documentCompliance: z.array(z.object({
            documentId: z.string(),
            compliant: z.boolean(),
            violations: z.array(z.string()),
            recommendations: z.array(z.string())
          })),
          missingRequirements: z.array(z.string()),
          recommendations: z.array(z.string())
        }),
        tools: {
          checkCompliance: complianceTool
        },
        maxSteps: 5,
        system: 'You are an immigration compliance specialist. Check documents against requirements.',
        prompt: `Check these documents for compliance with immigration requirements:
        
        Documents: ${JSON.stringify(documents)}
        Requirements: ${requirements.join(', ')}
        
        Identify any compliance issues and provide recommendations.`
      })

      return compliance
    })

    return await checkCompliance()
  }
}