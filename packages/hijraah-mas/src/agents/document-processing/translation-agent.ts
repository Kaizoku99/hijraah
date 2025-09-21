import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  OCRProcessingResult,
  ContentExtractionResult,
  TranslationResult,
  TranslationResultSchema,
  AgentConfig,
  AgentConfigSchema,
} from "./types";
import { withAgentErrorHandling, logAgentStep } from "../../utils";

/**
 * Translation Agent using AI SDK v5 language processing
 * Handles multi-language document translation with localization schemas and quality validation
 */
export class TranslationAgent {
  private config: AgentConfig;
  private supportedLanguages: string[];

  constructor(config: Partial<AgentConfig> = {}) {
    this.config = AgentConfigSchema.parse(config);
    this.supportedLanguages = [
      "en",
      "es",
      "fr",
      "ar",
      "de",
      "it",
      "pt",
      "ru",
      "zh",
      "ja",
      "ko",
      "hi",
      "ur",
      "fa",
    ];
  }

  /**
   * Translate document content to target language
   */
  async translateDocument(
    ocrResult: OCRProcessingResult,
    extractionResult: ContentExtractionResult,
    targetLanguage: string,
    translationOptions: {
      preserveLegalTerms?: boolean;
      preserveFormatting?: boolean;
      includeFieldTranslation?: boolean;
      qualityThreshold?: number;
    } = {}
  ): Promise<TranslationResult> {
    const translateDoc = withAgentErrorHandling(async () => {
      if (!this.supportedLanguages.includes(targetLanguage)) {
        throw new Error(`Unsupported target language: ${targetLanguage}`);
      }

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting translation for ${ocrResult.documentId} from ${ocrResult.extractedText.language} to ${targetLanguage}`,
          toolCalls: [],
          toolResults: [],
          finishReason: "in_progress",
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        });
      }

      // Set default options
      const options = {
        preserveLegalTerms: true,
        preserveFormatting: true,
        includeFieldTranslation: true,
        qualityThreshold: 0.8,
        ...translationOptions,
      };

      // Get legal terms to preserve
      const legalTerms = await this.identifyLegalTerms(
        ocrResult.extractedText.fullText
      );

      const { object: translation } = await generateObject({
        model: openai(this.config.model),
        schema: TranslationResultSchema,
        temperature: this.config.temperature,

        system: `You are an expert translation agent specializing in immigration and legal documents.
        
        Your task is to translate documents with high accuracy while:
        1. Preserving legal terminology and official terms
        2. Maintaining document structure and formatting
        3. Ensuring cultural and legal context appropriateness
        4. Providing accurate field-level translations
        5. Maintaining high quality standards
        
        Source Language: ${ocrResult.extractedText.language}
        Target Language: ${targetLanguage}
        
        Legal Terms to Preserve: ${legalTerms.join(", ")}
        
        Translation Options:
        - Preserve Legal Terms: ${options.preserveLegalTerms}
        - Preserve Formatting: ${options.preserveFormatting}
        - Include Field Translation: ${options.includeFieldTranslation}
        - Quality Threshold: ${options.qualityThreshold}
        
        Be extremely careful with legal terminology and official document language.`,
        prompt: `Translate this immigration document content:
        
        Document ID: ${ocrResult.documentId}
        Source Language: ${ocrResult.extractedText.language}
        Target Language: ${targetLanguage}
        
        Full Text to Translate:
        ${ocrResult.extractedText.fullText}
        
        ${
          options.includeFieldTranslation
            ? `
        Extracted Fields to Translate:
        ${JSON.stringify(extractionResult.extractedFields, null, 2)}
        `
            : ""
        }
        
        Legal Terms to Preserve (do not translate these):
        ${legalTerms.join(", ")}
        
        Provide high-quality translation while preserving legal accuracy and document integrity.`,
      });

      // Validate translation quality
      const qualityScore = await this.validateTranslationQuality(
        ocrResult.extractedText.fullText,
        translation.translatedText,
        ocrResult.extractedText.language,
        targetLanguage
      );

      const result: TranslationResult = {
        ...translation,
        documentId: ocrResult.documentId,
        sourceLanguage: ocrResult.extractedText.language,
        targetLanguage,
        qualityScore,
        legalTermsPreserved: legalTerms,
        timestamp: new Date().toISOString(),
      };

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 3,
          text: `Translation completed for ${ocrResult.documentId} - Quality Score: ${qualityScore}, Confidence: ${result.confidence}`,
          toolCalls: [],
          toolResults: [],
          finishReason: "completed",
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        });
      }

      return result;
    });

    return await translateDoc();
  }

  /**
   * Translate multiple documents in batch
   */
  async batchTranslateDocuments(
    inputs: Array<{
      ocrResult: OCRProcessingResult;
      extractionResult: ContentExtractionResult;
      targetLanguage: string;
    }>,
    translationOptions: {
      preserveLegalTerms?: boolean;
      preserveFormatting?: boolean;
      includeFieldTranslation?: boolean;
      qualityThreshold?: number;
    } = {}
  ): Promise<TranslationResult[]> {
    const batchTranslate = withAgentErrorHandling(async () => {
      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 1,
          text: `Starting batch translation for ${inputs.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: "in_progress",
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        });
      }

      // Process translations in parallel
      const results = await Promise.all(
        inputs.map(({ ocrResult, extractionResult, targetLanguage }) =>
          this.translateDocument(
            ocrResult,
            extractionResult,
            targetLanguage,
            translationOptions
          )
        )
      );

      if (this.config.enableLogging) {
        logAgentStep({
          stepNumber: 2,
          text: `Batch translation completed for ${inputs.length} documents`,
          toolCalls: [],
          toolResults: [],
          finishReason: "completed",
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        });
      }

      return results;
    });

    return await batchTranslate();
  }

  /**
   * Translate specific fields only
   */
  async translateFields(
    extractionResult: ContentExtractionResult,
    targetLanguage: string,
    fieldsToTranslate: string[]
  ): Promise<{
    documentId: string;
    translatedFields: Record<string, string>;
    fieldConfidence: Record<string, number>;
    qualityScore: number;
  }> {
    const translateFields = withAgentErrorHandling(async () => {
      const fieldsToProcess = fieldsToTranslate.filter(
        (field) => extractionResult.extractedFields[field] !== undefined
      );

      const { object: fieldTranslation } = await generateObject({
        model: openai(this.config.model),
        schema: z.object({
          translatedFields: z.record(z.string(), z.string()),
          fieldConfidence: z.record(z.string(), z.number().min(0).max(1)),
          qualityScore: z.number().min(0).max(100),
        }),
        system: `You are a specialized field translation agent for immigration documents.
        
        Translate specific fields while maintaining:
        1. Legal accuracy and terminology
        2. Cultural appropriateness
        3. Field-specific formatting
        4. High confidence scores
        
        Target Language: ${targetLanguage}`,
        prompt: `Translate these specific fields from the immigration document:
        
        Fields to Translate: ${fieldsToProcess.join(", ")}
        
        Field Values:
        ${fieldsToProcess
          .map(
            (field) => `${field}: ${extractionResult.extractedFields[field]}`
          )
          .join("\n")}
        
        Provide accurate translations with confidence scores for each field.`,
      });

      return {
        documentId: extractionResult.documentId,
        translatedFields: fieldTranslation.translatedFields as Record<string, string>,
        fieldConfidence: fieldTranslation.fieldConfidence as Record<string, number>,
        qualityScore: fieldTranslation.qualityScore,
      };
    });

    return await translateFields();
  }

  /**
   * Detect document language
   */
  async detectLanguage(text: string): Promise<{
    language: string;
    confidence: number;
    alternativeLanguages: Array<{ language: string; confidence: number }>;
  }> {
    const detectLang = withAgentErrorHandling(async () => {
      const { object: detection } = await generateObject({
        model: openai("gpt-4o-mini"), // Use smaller model for language detection
        schema: z.object({
          language: z.string(),
          confidence: z.number().min(0).max(1),
          alternativeLanguages: z.array(
            z.object({
              language: z.string(),
              confidence: z.number().min(0).max(1),
            })
          ),
        }),
        system:
          "You are a language detection specialist. Identify the primary language of the given text.",
        prompt: `Detect the language of this text:
        
        ${text.substring(0, 1000)}...
        
        Provide the primary language and alternative possibilities with confidence scores.`,
      });

      return detection;
    });

    return await detectLang();
  }

  /**
   * Identify legal terms that should be preserved during translation
   */
  private async identifyLegalTerms(text: string): Promise<string[]> {
    const { object: terms } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        legalTerms: z.array(z.string()),
      }),
      system: `You are a legal terminology expert. Identify legal terms, official titles, and technical terms that should be preserved during translation of immigration documents.`,
      prompt: `Identify legal and official terms in this text that should NOT be translated:
      
      ${text.substring(0, 1500)}...
      
      Focus on:
      - Legal terminology
      - Official titles and positions
      - Technical immigration terms
      - Proper nouns (places, organizations)
      - Document reference numbers
      - Official codes and classifications`,
    });

    return terms.legalTerms;
  }

  /**
   * Validate translation quality
   */
  private async validateTranslationQuality(
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<number> {
    const { object: validation } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        qualityScore: z.number().min(0).max(100),
        accuracyScore: z.number().min(0).max(100),
        fluencyScore: z.number().min(0).max(100),
        completenessScore: z.number().min(0).max(100),
        issues: z.array(z.string()),
      }),
      system: `You are a translation quality assessor. Evaluate the quality of translations for immigration documents.
      
      Assess:
      1. Accuracy: Correctness of translation
      2. Fluency: Natural language flow
      3. Completeness: All content translated
      4. Legal terminology preservation
      
      Source Language: ${sourceLanguage}
      Target Language: ${targetLanguage}`,
      prompt: `Evaluate this translation quality:
      
      Source Text (${sourceLanguage}):
      ${sourceText.substring(0, 1000)}...
      
      Translated Text (${targetLanguage}):
      ${translatedText.substring(0, 1000)}...
      
      Provide detailed quality assessment with scores and identify any issues.`,
    });

    return validation.qualityScore;
  }

  /**
   * Get translation confidence thresholds
   */
  getConfidenceThresholds(): Record<string, number> {
    return {
      excellent: 0.95,
      good: 0.85,
      acceptable: 0.75,
      needs_review: 0.65,
      poor: 0.5,
    };
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): Array<{
    code: string;
    name: string;
    nativeName: string;
  }> {
    return [
      { code: "en", name: "English", nativeName: "English" },
      { code: "es", name: "Spanish", nativeName: "Español" },
      { code: "fr", name: "French", nativeName: "Français" },
      { code: "ar", name: "Arabic", nativeName: "العربية" },
      { code: "de", name: "German", nativeName: "Deutsch" },
      { code: "it", name: "Italian", nativeName: "Italiano" },
      { code: "pt", name: "Portuguese", nativeName: "Português" },
      { code: "ru", name: "Russian", nativeName: "Русский" },
      { code: "zh", name: "Chinese", nativeName: "中文" },
      { code: "ja", name: "Japanese", nativeName: "日本語" },
      { code: "ko", name: "Korean", nativeName: "한국어" },
      { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
      { code: "ur", name: "Urdu", nativeName: "اردو" },
      { code: "fa", name: "Persian", nativeName: "فارسی" },
    ];
  }

  /**
   * Validate translation result
   */
  validateTranslation(
    result: TranslationResult,
    minQualityScore: number = 75
  ): boolean {
    return (
      result.confidence >= 0.7 &&
      result.qualityScore >= minQualityScore &&
      result.translatedText.length > 0 &&
      result.sourceLanguage !== result.targetLanguage
    );
  }

  /**
   * Generate localization recommendations
   */
  generateLocalizationRecommendations(
    result: TranslationResult,
    targetRegion?: string
  ): Array<{
    category: string;
    recommendation: string;
    priority: "high" | "medium" | "low";
  }> {
    const recommendations: Array<{
      category: string;
      recommendation: string;
      priority: "high" | "medium" | "low";
    }> = [];

    // Quality-based recommendations
    if (result.qualityScore < 80) {
      recommendations.push({
        category: "Quality",
        recommendation:
          "Consider professional human review for critical sections",
        priority: "high",
      });
    }

    if (result.confidence < 0.8) {
      recommendations.push({
        category: "Confidence",
        recommendation: "Review low-confidence translations manually",
        priority: "medium",
      });
    }

    // Legal terms recommendations
    if (result.legalTermsPreserved.length > 0) {
      recommendations.push({
        category: "Legal Terms",
        recommendation: `Verify preservation of ${result.legalTermsPreserved.length} legal terms`,
        priority: "high",
      });
    }

    // Formatting recommendations
    if (!result.preservedFormatting) {
      recommendations.push({
        category: "Formatting",
        recommendation: "Review document formatting and structure",
        priority: "medium",
      });
    }

    // Region-specific recommendations
    if (targetRegion) {
      recommendations.push({
        category: "Localization",
        recommendation: `Adapt content for ${targetRegion} regional requirements`,
        priority: "medium",
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}
