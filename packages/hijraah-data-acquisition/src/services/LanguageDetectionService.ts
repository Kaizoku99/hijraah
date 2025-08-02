/**
 * Language Detection Service
 *
 * Service for detecting languages in text content using AI models
 * and maintaining language detection accuracy.
 */

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  LanguageDetectionResultSchema,
  SupportedLanguageSchema,
  type SupportedLanguage,
} from "../schemas/multi-language";

export class LanguageDetectionService {
  private readonly model = openai("gpt-4o-mini");

  /**
   * Detect language of text content
   */
  async detectLanguage(text: string): Promise<z.infer<typeof LanguageDetectionResultSchema>> {
    // Use AI to detect language with high accuracy
    const { object: detection } = await generateObject({
      model: this.model,
      schema: z.object({
        primaryLanguage: SupportedLanguageSchema,
        confidence: z.number().min(0).max(1),
        alternativeLanguages: z.array(
          z.object({
            language: SupportedLanguageSchema,
            confidence: z.number().min(0).max(1),
          }),
        ),
        isReliable: z.boolean(),
        reasoning: z.string(),
      }),
      system: `You are a language detection expert. Analyze the given text and determine:
1. The primary language (use ISO 639-1 codes)
2. Confidence level (0-1)
3. Alternative possible languages with their confidence levels
4. Whether the detection is reliable
5. Brief reasoning for your decision

Focus on immigration and legal terminology patterns. Consider:
- Official government language patterns
- Legal document structures
- Immigration-specific terminology
- Regional language variations`,
      prompt: `Detect the language of this text:

${text.substring(0, 2000)}${text.length > 2000 ? "..." : ""}`,
    });

    return {
      language: detection.primaryLanguage,
      confidence: detection.confidence,
      alternativeLanguages: detection.alternativeLanguages,
      isReliable: detection.isReliable,
      textSample: text.substring(0, 200),
    };
  }

  /**
   * Detect languages in multiple text samples
   */
  async detectLanguagesBatch(texts: string[]): Promise<z.infer<typeof LanguageDetectionResultSchema>[]> {
    const results = await Promise.all(
      texts.map(async (text) => {
        try {
          return await this.detectLanguage(text);
        } catch (error) {
          console.error("Language detection failed for text:", error);
          return {
            language: "en" as SupportedLanguage,
            confidence: 0.1,
            alternativeLanguages: [],
            isReliable: false,
            textSample: text.substring(0, 200),
          };
        }
      }),
    );

    return results;
  }

  /**
   * Validate language detection result
   */
  validateDetection(detection: z.infer<typeof LanguageDetectionResultSchema>): boolean {
    return (
      detection.confidence >= 0.7 &&
      detection.isReliable &&
      SupportedLanguageSchema.safeParse(detection.language).success
    );
  }

  /**
   * Get language confidence threshold for different content types
   */
  getConfidenceThreshold(contentType: string): number {
    const thresholds = {
      immigration_policy: 0.9,
      legal_document: 0.85,
      government_form: 0.8,
      user_content: 0.7,
      technical_documentation: 0.75,
      general: 0.7,
    };

    return thresholds[contentType as keyof typeof thresholds] || 0.7;
  }

  /**
   * Analyze language distribution in content
   */
  async analyzeLanguageDistribution(
    texts: string[],
  ): Promise<{
    primaryLanguage: SupportedLanguage;
    distribution: Record<SupportedLanguage, number>;
    mixedLanguageContent: boolean;
    recommendations: string[];
  }> {
    const detections = await this.detectLanguagesBatch(texts);
    const distribution: Record<string, number> = {};
    let totalConfidence = 0;

    // Calculate language distribution
    for (const detection of detections) {
      if (!distribution[detection.language]) {
        distribution[detection.language] = 0;
      }
      distribution[detection.language] += detection.confidence;
      totalConfidence += detection.confidence;
    }

    // Normalize distribution
    const normalizedDistribution: Record<SupportedLanguage, number> = {};
    for (const [lang, count] of Object.entries(distribution)) {
      normalizedDistribution[lang as SupportedLanguage] = count / totalConfidence;
    }

    // Find primary language
    const primaryLanguage = Object.entries(normalizedDistribution).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    )[0] as SupportedLanguage;

    // Check for mixed language content
    const languageCount = Object.keys(normalizedDistribution).length;
    const mixedLanguageContent = languageCount > 1 && normalizedDistribution[primaryLanguage] < 0.8;

    // Generate recommendations
    const recommendations: string[] = [];
    if (mixedLanguageContent) {
      recommendations.push("Content contains multiple languages - consider separate processing");
    }
    if (normalizedDistribution[primaryLanguage] < 0.6) {
      recommendations.push("Low confidence in primary language detection - manual review recommended");
    }
    if (languageCount > 3) {
      recommendations.push("High language diversity detected - consider specialized processing");
    }

    return {
      primaryLanguage,
      distribution: normalizedDistribution,
      mixedLanguageContent,
      recommendations,
    };
  }
}