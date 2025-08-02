/**
 * Translation Service
 *
 * Service for translating content using AI models with legal terminology preservation
 * and quality assessment.
 */

import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  TranslationRequestSchema,
  TranslationResultSchema,
  TranslationQualityAssessmentSchema,
  BatchTranslationRequestSchema,
  type SupportedLanguage,
} from "../schemas/multi-language";

export class TranslationService {
  private readonly translationModel = openai("gpt-4o");
  private readonly qualityModel = openai("gpt-4o-mini");

  // Legal terminology dictionary for preservation
  private readonly legalTerminologies = {
    immigration: [
      "visa", "passport", "green card", "citizenship", "naturalization",
      "asylum", "refugee", "deportation", "removal", "adjustment of status",
      "permanent resident", "temporary resident", "work permit", "EAD",
      "I-94", "I-20", "DS-160", "petition", "application", "beneficiary",
      "petitioner", "sponsor", "affidavit of support", "priority date",
      "consular processing", "adjustment of status", "inadmissible",
      "removable", "waiver", "appeal", "motion to reopen", "motion to reconsider"
    ],
    legal: [
      "plaintiff", "defendant", "jurisdiction", "statute", "regulation",
      "ordinance", "precedent", "jurisprudence", "due process", "habeas corpus",
      "pro se", "pro bono", "amicus curiae", "res judicata", "stare decisis",
      "voir dire", "subpoena", "deposition", "discovery", "pleading"
    ]
  };

  /**
   * Translate text with legal terminology preservation
   */
  async translateText(
    request: z.infer<typeof TranslationRequestSchema>
  ): Promise<z.infer<typeof TranslationResultSchema>> {
    const startTime = Date.now();

    // Extract legal terms to preserve
    const preservedTerms = this.extractLegalTerms(request.text, request.context);

    // Perform translation with AI
    const { object: translation } = await generateObject({
      model: this.translationModel,
      schema: z.object({
        translatedText: z.string(),
        confidence: z.number().min(0).max(1),
        alternativeTranslations: z.array(z.string()),
        preservedTerms: z.array(z.string()),
        qualityIndicators: z.object({
          fluency: z.number().min(0).max(1),
          accuracy: z.number().min(0).max(1),
          terminology: z.number().min(0).max(1),
          completeness: z.number().min(0).max(1),
        }),
        warnings: z.array(z.string()),
      }),
      system: this.getTranslationSystemPrompt(request),
      prompt: this.getTranslationPrompt(request, preservedTerms),
    });

    const processingTime = Date.now() - startTime;

    // Calculate overall quality score
    const qualityScore = this.calculateQualityScore(translation.qualityIndicators);

    return {
      originalText: request.text,
      translatedText: translation.translatedText,
      sourceLanguage: request.sourceLanguage,
      targetLanguage: request.targetLanguage,
      confidence: translation.confidence,
      preservedTerms: translation.preservedTerms,
      alternativeTranslations: translation.alternativeTranslations,
      qualityScore,
      translationMethod: "ai_translation",
      metadata: {
        model: "gpt-4o",
        processingTime,
        tokenCount: Math.ceil(request.text.length / 4), // Rough estimate
        warnings: translation.warnings,
      },
    };
  }

  /**
   * Batch translate multiple texts
   */
  async translateBatch(
    request: z.infer<typeof BatchTranslationRequestSchema>
  ): Promise<z.infer<typeof TranslationResultSchema>[]> {
    const results: z.infer<typeof TranslationResultSchema>[] = [];
    
    // Process in batches to avoid rate limits
    for (let i = 0; i < request.texts.length; i += request.batchSize) {
      const batch = request.texts.slice(i, i + request.batchSize);
      
      const batchPromises = batch.map(async (text) => {
        const translationRequest = {
          text,
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguages[0], // Process first target language
          preserveLegalTerminology: request.preserveLegalTerminology,
          context: request.context,
        };

        return await this.translateText(translationRequest);
      });

      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === "fulfilled") {
          results.push(result.value);
        } else {
          console.error("Translation failed:", result.reason);
          // Add failed translation placeholder
          results.push({
            originalText: "",
            translatedText: "",
            sourceLanguage: request.sourceLanguage,
            targetLanguage: request.targetLanguages[0],
            confidence: 0,
            qualityScore: 0,
            translationMethod: "ai_translation",
            metadata: {
              warnings: ["Translation failed"],
            },
          });
        }
      }

      // Add delay between batches
      if (i + request.batchSize < request.texts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  /**
   * Assess translation quality
   */
  async assessTranslationQuality(
    translation: z.infer<typeof TranslationResultSchema>
  ): Promise<z.infer<typeof TranslationQualityAssessmentSchema>> {
    const { object: assessment } = await generateObject({
      model: this.qualityModel,
      schema: z.object({
        assessmentCriteria: z.object({
          accuracy: z.number().min(0).max(1),
          fluency: z.number().min(0).max(1),
          terminology: z.number().min(0).max(1),
          completeness: z.number().min(0).max(1),
          consistency: z.number().min(0).max(1),
        }),
        overallScore: z.number().min(0).max(1),
        issues: z.array(
          z.object({
            type: z.enum([
              "terminology_error",
              "grammar_error",
              "missing_content",
              "cultural_adaptation",
              "legal_accuracy",
            ]),
            severity: z.enum(["low", "medium", "high", "critical"]),
            description: z.string(),
            suggestion: z.string().optional(),
          })
        ),
        recommendations: z.array(z.string()),
      }),
      system: `You are a translation quality assessor specializing in legal and immigration content.
Evaluate the translation quality based on:
1. Accuracy - How well the meaning is preserved
2. Fluency - How natural the translation reads
3. Terminology - Correct use of legal/immigration terms
4. Completeness - No missing information
5. Consistency - Consistent terminology and style

Identify specific issues and provide actionable recommendations.`,
      prompt: `Assess this translation quality:

Original (${translation.sourceLanguage}): ${translation.originalText}

Translation (${translation.targetLanguage}): ${translation.translatedText}

Context: Legal/Immigration document
Preserved terms: ${translation.preservedTerms?.join(", ") || "None"}`,
    });

    return {
      originalText: translation.originalText,
      translatedText: translation.translatedText,
      sourceLanguage: translation.sourceLanguage,
      targetLanguage: translation.targetLanguage,
      assessmentCriteria: assessment.assessmentCriteria,
      overallScore: assessment.overallScore,
      issues: assessment.issues,
      recommendations: assessment.recommendations,
    };
  }

  /**
   * Extract legal terms that should be preserved
   */
  private extractLegalTerms(text: string, context: string): string[] {
    const lowerText = text.toLowerCase();
    const relevantTerms = [
      ...this.legalTerminologies.immigration,
      ...this.legalTerminologies.legal,
    ];

    return relevantTerms.filter(term => 
      lowerText.includes(term.toLowerCase())
    );
  }

  /**
   * Get system prompt for translation
   */
  private getTranslationSystemPrompt(request: z.infer<typeof TranslationRequestSchema>): string {
    return `You are a professional translator specializing in legal and immigration documents.

Your task is to translate from ${request.sourceLanguage} to ${request.targetLanguage} while:

1. PRESERVING legal terminology accuracy
2. MAINTAINING the formal tone and structure
3. ENSURING cultural appropriateness
4. KEEPING technical terms consistent
5. PROVIDING high-quality, professional translation

Context: ${request.context}
Domain: ${request.domain || "general immigration"}

${request.preserveLegalTerminology ? 
  "CRITICAL: Preserve legal terminology accuracy. When in doubt, keep original legal terms with explanations." : 
  "Focus on natural, fluent translation while maintaining accuracy."
}

Provide confidence scores and alternative translations where appropriate.
Flag any terms or phrases that may need expert review.`;
  }

  /**
   * Get translation prompt
   */
  private getTranslationPrompt(
    request: z.infer<typeof TranslationRequestSchema>,
    preservedTerms: string[]
  ): string {
    return `Translate the following text:

${request.text}

${preservedTerms.length > 0 ? 
  `\nLegal terms to preserve: ${preservedTerms.join(", ")}` : 
  ""
}

Provide:
1. High-quality translation
2. Confidence level (0-1)
3. Alternative translations if applicable
4. List of preserved legal terms
5. Quality indicators for fluency, accuracy, terminology, completeness
6. Any warnings or concerns`;
  }

  /**
   * Calculate overall quality score
   */
  private calculateQualityScore(indicators: {
    fluency: number;
    accuracy: number;
    terminology: number;
    completeness: number;
  }): number {
    // Weighted average with emphasis on accuracy and terminology for legal content
    return (
      indicators.accuracy * 0.35 +
      indicators.terminology * 0.3 +
      indicators.fluency * 0.2 +
      indicators.completeness * 0.15
    );
  }

  /**
   * Check if translation meets quality threshold
   */
  meetsQualityThreshold(
    translation: z.infer<typeof TranslationResultSchema>,
    threshold: number = 0.8
  ): boolean {
    return translation.confidence >= threshold && translation.qualityScore >= threshold;
  }

  /**
   * Get supported language pairs
   */
  getSupportedLanguagePairs(): Array<{
    source: SupportedLanguage;
    targets: SupportedLanguage[];
  }> {
    // Define supported translation pairs
    return [
      {
        source: "en",
        targets: ["ar", "fr", "es", "de", "it", "pt", "ru", "zh", "ja", "ko", "hi", "ur", "fa", "tr"],
      },
      {
        source: "ar",
        targets: ["en", "fr", "es"],
      },
      {
        source: "fr",
        targets: ["en", "ar", "es", "de", "it"],
      },
      {
        source: "es",
        targets: ["en", "fr", "pt"],
      },
      // Add more language pairs as needed
    ];
  }
}