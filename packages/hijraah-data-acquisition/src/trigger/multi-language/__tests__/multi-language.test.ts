/**
 * Multi-Language Processing Tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { LanguageDetectionService } from "../../../services/LanguageDetectionService";
import { TranslationService } from "../../../services/TranslationService";
import { MultilingualContentExtractionService } from "../../../services/MultilingualContentExtractionService";
import { CrossLanguageEntityLinkingService } from "../../../services/CrossLanguageEntityLinkingService";
import type { SupportedLanguage } from "../../../schemas/multi-language";

// Mock AI SDK
vi.mock("ai", () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
}));

// Mock OpenAI SDK
vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn(() => "mocked-model"),
}));

describe("Multi-Language Processing", () => {
  describe("LanguageDetectionService", () => {
    let service: LanguageDetectionService;

    beforeEach(() => {
      service = new LanguageDetectionService();
      vi.clearAllMocks();
    });

    it("should detect language with high confidence", async () => {
      const { generateObject } = await import("ai");
      (generateObject as any).mockResolvedValue({
        object: {
          primaryLanguage: "en",
          confidence: 0.95,
          alternativeLanguages: [{ language: "fr", confidence: 0.3 }],
          isReliable: true,
          reasoning: "Clear English patterns detected",
        },
      });

      const result = await service.detectLanguage("This is a test document in English.");

      expect(result.language).toBe("en");
      expect(result.confidence).toBe(0.95);
      expect(result.isReliable).toBe(true);
      expect(result.alternativeLanguages).toHaveLength(1);
    });
  });

  describe("TranslationService", () => {
    let service: TranslationService;

    beforeEach(() => {
      service = new TranslationService();
      vi.clearAllMocks();
    });

    it("should translate text with legal terminology preservation", async () => {
      const { generateObject } = await import("ai");
      (generateObject as any).mockResolvedValue({
        object: {
          translatedText: "Demande de visa",
          confidence: 0.92,
          alternativeTranslations: ["Application de visa"],
          preservedTerms: ["visa"],
          qualityIndicators: {
            fluency: 0.9,
            accuracy: 0.95,
            terminology: 0.9,
            completeness: 0.95,
          },
          warnings: [],
        },
      });

      const request = {
        text: "Visa application",
        sourceLanguage: "en" as SupportedLanguage,
        targetLanguage: "fr" as SupportedLanguage,
        preserveLegalTerminology: true,
        context: "immigration_policy" as const,
      };

      const result = await service.translateText(request);

      expect(result.translatedText).toBe("Demande de visa");
      expect(result.confidence).toBe(0.92);
      expect(result.preservedTerms).toContain("visa");
      expect(result.qualityScore).toBeGreaterThan(0.9);
    });
  });

  describe("MultilingualContentExtractionService", () => {
    let service: MultilingualContentExtractionService;

    beforeEach(() => {
      service = new MultilingualContentExtractionService("test-api-key");
      vi.clearAllMocks();
    });

    it("should validate extraction quality", () => {
      const goodResult = {
        url: "https://example.com",
        detectedLanguage: {
          language: "en" as SupportedLanguage,
          confidence: 0.9,
          alternativeLanguages: [],
          isReliable: true,
        },
        originalContent: "This is a good length content that should pass validation checks.",
        translations: [
          {
            language: "es" as SupportedLanguage,
            content: "Este es un contenido de buena longitud.",
            confidence: 0.85,
            qualityScore: 0.88,
          },
        ],
        metadata: {
          extractedAt: new Date().toISOString(),
          processingTime: 1000,
          contentLength: 100,
          translationCount: 1,
        },
      };

      const validation = service.validateExtractionQuality(goodResult, 0.8);

      expect(validation.isValid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });
  });

  describe("CrossLanguageEntityLinkingService", () => {
    let service: CrossLanguageEntityLinkingService;

    beforeEach(() => {
      service = new CrossLanguageEntityLinkingService();
      vi.clearAllMocks();
    });

    it("should validate linking results", () => {
      const results = [
        {
          sourceEntity: {
            text: "visa",
            language: "en" as SupportedLanguage,
            type: "document_type",
          },
          linkedEntities: [
            {
              text: "visa",
              language: "es" as SupportedLanguage,
              type: "document_type",
              confidence: 0.85,
              linkingMethod: "semantic_similarity" as const,
              similarity: 0.9,
            },
          ],
          metadata: {
            totalCandidates: 1,
            processingTime: 1000,
            linkingMethods: ["semantic_similarity"],
          },
        },
      ];

      const validation = service.validateLinkingResults(results, 0.7);

      expect(validation.isValid).toBe(true);
      expect(validation.statistics.totalLinks).toBe(1);
      expect(validation.statistics.highQualityLinks).toBe(1);
      expect(validation.statistics.averageConfidence).toBe(0.85);
    });
  });
});