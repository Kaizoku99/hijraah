/**
 * Multilingual Content Extraction Service
 *
 * Service for extracting content from multilingual sources using Firecrawl
 * and processing it with language detection and translation.
 */

import { z } from "zod";
import {
  MultilingualContentExtractionSchema,
  MultilingualContentResultSchema,
  type SupportedLanguage,
} from "../schemas/multi-language";
import { LanguageDetectionService } from "./LanguageDetectionService";
import { TranslationService } from "./TranslationService";

// Mock Firecrawl client - replace with actual implementation
interface FirecrawlClient {
  scrapeUrl(url: string, options: any): Promise<{
    success: boolean;
    data: {
      content: string;
      metadata: any;
    };
  }>;
}

export class MultilingualContentExtractionService {
  private languageDetection: LanguageDetectionService;
  private translation: TranslationService;
  private firecrawl: FirecrawlClient;

  constructor(firecrawlApiKey: string) {
    this.languageDetection = new LanguageDetectionService();
    this.translation = new TranslationService();
    
    // Initialize Firecrawl client (mock implementation)
    this.firecrawl = {
      async scrapeUrl(url: string, options: any) {
        // Mock implementation - replace with actual Firecrawl client
        return {
          success: true,
          data: {
            content: "Mock content from " + url,
            metadata: { title: "Mock Title", description: "Mock Description" },
          },
        };
      },
    };
  }

  /**
   * Extract multilingual content from URL
   */
  async extractMultilingualContent(
    request: z.infer<typeof MultilingualContentExtractionSchema>
  ): Promise<z.infer<typeof MultilingualContentResultSchema>> {
    const startTime = Date.now();

    try {
      // Step 1: Extract content using Firecrawl
      const firecrawlResult = await this.firecrawl.scrapeUrl(request.url, {
        formats: request.firecrawlOptions.formats,
        onlyMainContent: request.firecrawlOptions.onlyMainContent,
        includeTags: request.firecrawlOptions.includeTags,
        excludeTags: request.firecrawlOptions.excludeTags,
        waitFor: request.firecrawlOptions.waitFor,
      });

      if (!firecrawlResult.success) {
        throw new Error("Failed to extract content from URL");
      }

      const originalContent = firecrawlResult.data.content;

      // Step 2: Detect language if requested
      let detectedLanguage;
      if (request.extractionOptions.detectLanguage) {
        detectedLanguage = await this.languageDetection.detectLanguage(originalContent);
      } else {
        // Default to English if detection is disabled
        detectedLanguage = {
          language: "en" as SupportedLanguage,
          confidence: 1.0,
          alternativeLanguages: [],
          isReliable: true,
        };
      }

      // Step 3: Translate content if requested
      const translations = [];
      if (request.extractionOptions.translateContent) {
        for (const targetLanguage of request.targetLanguages) {
          // Skip translation if target language is same as detected language
          if (targetLanguage === detectedLanguage.language) {
            continue;
          }

          try {
            const translationResult = await this.translation.translateText({
              text: originalContent,
              sourceLanguage: detectedLanguage.language,
              targetLanguage,
              preserveLegalTerminology: true,
              context: "immigration_policy",
            });

            translations.push({
              language: targetLanguage,
              content: translationResult.translatedText,
              confidence: translationResult.confidence,
              qualityScore: translationResult.qualityScore,
            });
          } catch (error) {
            console.error(`Translation failed for ${targetLanguage}:`, error);
            // Add failed translation placeholder
            translations.push({
              language: targetLanguage,
              content: "",
              confidence: 0,
              qualityScore: 0,
            });
          }
        }
      }

      // Step 4: Extract structured data if requested
      let structuredData;
      if (request.extractionOptions.extractStructuredData) {
        structuredData = await this.extractStructuredData(
          originalContent,
          detectedLanguage.language
        );
      }

      const processingTime = Date.now() - startTime;

      return {
        url: request.url,
        detectedLanguage,
        originalContent,
        translations,
        structuredData,
        metadata: {
          extractedAt: new Date().toISOString(),
          processingTime,
          contentLength: originalContent.length,
          translationCount: translations.length,
        },
      };
    } catch (error) {
      console.error("Multilingual content extraction failed:", error);
      throw error;
    }
  }

  /**
   * Extract structured data from content
   */
  private async extractStructuredData(
    content: string,
    language: SupportedLanguage
  ): Promise<{
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
    requirements?: string[];
    dates?: string[];
    amounts?: string[];
  }> {
    // Use AI to extract structured data
    const { generateObject } = await import("ai");
    const { openai } = await import("@ai-sdk/openai");

    try {
      const { object: structuredData } = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          keywords: z.array(z.string()).optional(),
          entities: z.array(z.string()).optional(),
          requirements: z.array(z.string()).optional(),
          dates: z.array(z.string()).optional(),
          amounts: z.array(z.string()).optional(),
        }),
        system: `Extract structured information from immigration/legal content.
Focus on:
- Title and description
- Key immigration terms and entities
- Requirements and procedures
- Important dates and deadlines
- Fees and amounts
- Keywords for search and categorization`,
        prompt: `Extract structured data from this content (language: ${language}):

${content.substring(0, 3000)}${content.length > 3000 ? "..." : ""}`,
      });

      return structuredData;
    } catch (error) {
      console.error("Structured data extraction failed:", error);
      return {};
    }
  }

  /**
   * Extract content from multiple URLs in batch
   */
  async extractMultilingualContentBatch(
    requests: z.infer<typeof MultilingualContentExtractionSchema>[]
  ): Promise<z.infer<typeof MultilingualContentResultSchema>[]> {
    const results = [];

    // Process in smaller batches to avoid rate limits
    const batchSize = 3;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);

      const batchPromises = batch.map(async (request) => {
        try {
          return await this.extractMultilingualContent(request);
        } catch (error) {
          console.error(`Content extraction failed for ${request.url}:`, error);
          // Return error placeholder
          return {
            url: request.url,
            detectedLanguage: {
              language: "en" as SupportedLanguage,
              confidence: 0,
              alternativeLanguages: [],
              isReliable: false,
            },
            originalContent: "",
            translations: [],
            metadata: {
              extractedAt: new Date().toISOString(),
              processingTime: 0,
              contentLength: 0,
              translationCount: 0,
            },
          };
        }
      });

      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === "fulfilled") {
          results.push(result.value);
        }
      }

      // Add delay between batches
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return results;
  }

  /**
   * Validate extraction result quality
   */
  validateExtractionQuality(
    result: z.infer<typeof MultilingualContentResultSchema>,
    qualityThreshold: number = 0.8
  ): {
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check language detection quality
    if (result.detectedLanguage.confidence < qualityThreshold) {
      issues.push("Low confidence in language detection");
      recommendations.push("Manual language verification recommended");
    }

    if (!result.detectedLanguage.isReliable) {
      issues.push("Language detection marked as unreliable");
      recommendations.push("Consider alternative language detection methods");
    }

    // Check content quality
    if (result.originalContent.length < 100) {
      issues.push("Very short content extracted");
      recommendations.push("Verify content extraction completeness");
    }

    // Check translation quality
    const lowQualityTranslations = result.translations.filter(
      t => t.confidence < qualityThreshold || t.qualityScore < qualityThreshold
    );

    if (lowQualityTranslations.length > 0) {
      issues.push(`${lowQualityTranslations.length} translations below quality threshold`);
      recommendations.push("Review and improve low-quality translations");
    }

    // Check for failed translations
    const failedTranslations = result.translations.filter(t => t.confidence === 0);
    if (failedTranslations.length > 0) {
      issues.push(`${failedTranslations.length} translations failed completely`);
      recommendations.push("Retry failed translations or use alternative methods");
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
    };
  }

  /**
   * Get extraction statistics
   */
  getExtractionStatistics(
    results: z.infer<typeof MultilingualContentResultSchema>[]
  ): {
    totalUrls: number;
    successfulExtractions: number;
    languageDistribution: Record<string, number>;
    averageProcessingTime: number;
    averageContentLength: number;
    translationSuccessRate: number;
  } {
    const totalUrls = results.length;
    const successfulExtractions = results.filter(r => r.originalContent.length > 0).length;
    
    const languageDistribution: Record<string, number> = {};
    let totalProcessingTime = 0;
    let totalContentLength = 0;
    let totalTranslations = 0;
    let successfulTranslations = 0;

    for (const result of results) {
      // Language distribution
      const lang = result.detectedLanguage.language;
      languageDistribution[lang] = (languageDistribution[lang] || 0) + 1;

      // Processing metrics
      totalProcessingTime += result.metadata.processingTime;
      totalContentLength += result.metadata.contentLength;

      // Translation metrics
      totalTranslations += result.translations.length;
      successfulTranslations += result.translations.filter(t => t.confidence > 0).length;
    }

    return {
      totalUrls,
      successfulExtractions,
      languageDistribution,
      averageProcessingTime: totalProcessingTime / totalUrls,
      averageContentLength: totalContentLength / totalUrls,
      translationSuccessRate: totalTranslations > 0 ? successfulTranslations / totalTranslations : 0,
    };
  }
}