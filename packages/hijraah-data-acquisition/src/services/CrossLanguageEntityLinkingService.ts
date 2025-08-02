/**
 * Cross-Language Entity Linking Service
 *
 * Service for linking entities across different languages using semantic similarity,
 * lexical matching, and translation-based approaches.
 */

import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  CrossLanguageEntityLinkingSchema,
  CrossLanguageEntityLinkResultSchema,
  type SupportedLanguage,
} from "../schemas/multi-language";
import { TranslationService } from "./TranslationService";

export class CrossLanguageEntityLinkingService {
  private translation: TranslationService;
  private readonly model = openai("gpt-4o");

  constructor() {
    this.translation = new TranslationService();
  }

  /**
   * Link entities across languages
   */
  async linkEntitiesAcrossLanguages(
    request: z.infer<typeof CrossLanguageEntityLinkingSchema>
  ): Promise<z.infer<typeof CrossLanguageEntityLinkResultSchema>[]> {
    const results: z.infer<typeof CrossLanguageEntityLinkResultSchema>[] = [];

    // Group entities by language for efficient processing
    const entitiesByLanguage = this.groupEntitiesByLanguage(request.entities);

    // Process each entity for cross-language linking
    for (const entity of request.entities) {
      const linkedEntities = await this.findLinkedEntities(
        entity,
        request.entities.filter(e => e.language !== entity.language),
        request.linkingOptions
      );

      if (linkedEntities.length > 0) {
        results.push({
          sourceEntity: {
            text: entity.text,
            language: entity.language,
            type: entity.type,
          },
          linkedEntities,
          metadata: {
            totalCandidates: linkedEntities.length,
            processingTime: 0, // Will be updated
            linkingMethods: this.getUsedLinkingMethods(linkedEntities),
          },
        });
      }
    }

    return results;
  }

  /**
   * Find linked entities for a source entity
   */
  private async findLinkedEntities(
    sourceEntity: any,
    candidateEntities: any[],
    options: any
  ): Promise<any[]> {
    const linkedEntities = [];

    // Method 1: Semantic similarity using embeddings
    if (options.useSemanticSimilarity) {
      const semanticMatches = await this.findSemanticMatches(
        sourceEntity,
        candidateEntities,
        options.confidenceThreshold
      );
      linkedEntities.push(...semanticMatches);
    }

    // Method 2: Lexical matching for similar terms
    if (options.useLexicalMatching) {
      const lexicalMatches = await this.findLexicalMatches(
        sourceEntity,
        candidateEntities,
        options.confidenceThreshold
      );
      linkedEntities.push(...lexicalMatches);
    }

    // Method 3: Translation-based matching
    if (options.useTranslationMatching) {
      const translationMatches = await this.findTranslationMatches(
        sourceEntity,
        candidateEntities,
        options.confidenceThreshold
      );
      linkedEntities.push(...translationMatches);
    }

    // Remove duplicates and sort by confidence
    const uniqueEntities = this.deduplicateAndRank(linkedEntities);

    // Return top candidates
    return uniqueEntities.slice(0, options.maxCandidates);
  }

  /**
   * Find semantic matches using AI-based similarity
   */
  private async findSemanticMatches(
    sourceEntity: any,
    candidateEntities: any[],
    threshold: number
  ): Promise<any[]> {
    const matches = [];

    // Use AI to find semantic similarities
    const { object: semanticAnalysis } = await generateObject({
      model: this.model,
      schema: z.object({
        matches: z.array(
          z.object({
            candidateIndex: z.number(),
            similarity: z.number().min(0).max(1),
            confidence: z.number().min(0).max(1),
            reasoning: z.string(),
          })
        ),
      }),
      system: `You are an expert in cross-language entity linking for immigration and legal content.
Analyze semantic similarity between entities across languages.

Consider:
- Conceptual equivalence (same meaning, different languages)
- Immigration/legal domain knowledge
- Cultural and jurisdictional variations
- Entity type consistency

Provide similarity scores (0-1) and confidence levels.`,
      prompt: `Find semantic matches for this entity:

Source Entity:
- Text: "${sourceEntity.text}"
- Language: ${sourceEntity.language}
- Type: ${sourceEntity.type}
- Context: ${sourceEntity.context || "N/A"}

Candidate Entities:
${candidateEntities.map((e, i) => 
  `${i}. Text: "${e.text}" | Language: ${e.language} | Type: ${e.type}`
).join("\n")}

Find entities that represent the same concept across languages.`,
    });

    for (const match of semanticAnalysis.matches) {
      if (match.confidence >= threshold) {
        const candidate = candidateEntities[match.candidateIndex];
        matches.push({
          text: candidate.text,
          language: candidate.language,
          type: candidate.type,
          confidence: match.confidence,
          linkingMethod: "semantic_similarity",
          similarity: match.similarity,
        });
      }
    }

    return matches;
  }

  /**
   * Find lexical matches using string similarity
   */
  private async findLexicalMatches(
    sourceEntity: any,
    candidateEntities: any[],
    threshold: number
  ): Promise<any[]> {
    const matches = [];

    for (const candidate of candidateEntities) {
      // Calculate lexical similarity
      const similarity = this.calculateLexicalSimilarity(
        sourceEntity.text,
        candidate.text
      );

      if (similarity >= threshold) {
        matches.push({
          text: candidate.text,
          language: candidate.language,
          type: candidate.type,
          confidence: similarity,
          linkingMethod: "lexical_matching",
          similarity,
        });
      }
    }

    return matches;
  }

  /**
   * Find translation-based matches
   */
  private async findTranslationMatches(
    sourceEntity: any,
    candidateEntities: any[],
    threshold: number
  ): Promise<any[]> {
    const matches = [];

    // Group candidates by language for efficient translation
    const candidatesByLanguage = this.groupEntitiesByLanguage(candidateEntities);

    for (const [targetLanguage, entities] of Object.entries(candidatesByLanguage)) {
      try {
        // Translate source entity to target language
        const translationResult = await this.translation.translateText({
          text: sourceEntity.text,
          sourceLanguage: sourceEntity.language,
          targetLanguage: targetLanguage as SupportedLanguage,
          preserveLegalTerminology: true,
          context: "immigration_policy",
        });

        // Compare translation with candidate entities
        for (const candidate of entities) {
          const similarity = this.calculateLexicalSimilarity(
            translationResult.translatedText.toLowerCase(),
            candidate.text.toLowerCase()
          );

          // Adjust confidence based on translation quality
          const adjustedConfidence = similarity * translationResult.confidence;

          if (adjustedConfidence >= threshold) {
            matches.push({
              text: candidate.text,
              language: candidate.language,
              type: candidate.type,
              confidence: adjustedConfidence,
              linkingMethod: "translation_matching",
              similarity,
              translations: [
                {
                  language: targetLanguage as SupportedLanguage,
                  text: translationResult.translatedText,
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error(`Translation matching failed for ${targetLanguage}:`, error);
      }
    }

    return matches;
  }

  /**
   * Calculate lexical similarity between two strings
   */
  private calculateLexicalSimilarity(str1: string, str2: string): number {
    // Normalize strings
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    // Exact match
    if (s1 === s2) return 1.0;

    // Jaccard similarity for word-level comparison
    const words1 = new Set(s1.split(/\s+/));
    const words2 = new Set(s2.split(/\s+/));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    const jaccardSimilarity = intersection.size / union.size;

    // Levenshtein distance for character-level comparison
    const levenshteinSimilarity = 1 - (this.levenshteinDistance(s1, s2) / Math.max(s1.length, s2.length));

    // Combined similarity (weighted average)
    return (jaccardSimilarity * 0.6) + (levenshteinSimilarity * 0.4);
  }

  /**
   * Calculate Levenshtein distance
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Group entities by language
   */
  private groupEntitiesByLanguage(entities: any[]): Record<string, any[]> {
    const grouped: Record<string, any[]> = {};

    for (const entity of entities) {
      if (!grouped[entity.language]) {
        grouped[entity.language] = [];
      }
      grouped[entity.language].push(entity);
    }

    return grouped;
  }

  /**
   * Remove duplicates and rank by confidence
   */
  private deduplicateAndRank(entities: any[]): any[] {
    // Remove duplicates based on text and language
    const unique = entities.filter((entity, index, self) =>
      index === self.findIndex(e => 
        e.text === entity.text && e.language === entity.language
      )
    );

    // Sort by confidence (descending)
    return unique.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Get used linking methods from results
   */
  private getUsedLinkingMethods(linkedEntities: any[]): string[] {
    const methods = new Set(linkedEntities.map(e => e.linkingMethod));
    return Array.from(methods);
  }

  /**
   * Create multilingual knowledge graph nodes
   */
  async createMultilingualKnowledgeGraphNode(
    linkedEntities: z.infer<typeof CrossLanguageEntityLinkResultSchema>
  ): Promise<{
    id: string;
    type: string;
    primaryLanguage: SupportedLanguage;
    labels: Record<SupportedLanguage, string>;
    descriptions: Record<SupportedLanguage, string>;
    confidence: number;
  }> {
    const sourceEntity = linkedEntities.sourceEntity;
    const allEntities = [sourceEntity, ...linkedEntities.linkedEntities];

    // Create labels mapping
    const labels: Record<SupportedLanguage, string> = {};
    const descriptions: Record<SupportedLanguage, string> = {};

    for (const entity of allEntities) {
      labels[entity.language] = entity.text;
      descriptions[entity.language] = `${entity.type} entity: ${entity.text}`;
    }

    // Calculate overall confidence
    const confidenceScores = linkedEntities.linkedEntities.map(e => e.confidence);
    const averageConfidence = confidenceScores.length > 0 
      ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length 
      : 1.0;

    return {
      id: `multilingual_${sourceEntity.type}_${Date.now()}`,
      type: sourceEntity.type,
      primaryLanguage: sourceEntity.language,
      labels,
      descriptions,
      confidence: averageConfidence,
    };
  }

  /**
   * Validate entity linking results
   */
  validateLinkingResults(
    results: z.infer<typeof CrossLanguageEntityLinkResultSchema>[],
    qualityThreshold: number = 0.7
  ): {
    isValid: boolean;
    issues: string[];
    statistics: {
      totalLinks: number;
      highQualityLinks: number;
      averageConfidence: number;
      languageCoverage: number;
    };
  } {
    const issues: string[] = [];
    let totalLinks = 0;
    let highQualityLinks = 0;
    let totalConfidence = 0;
    const languages = new Set<string>();

    for (const result of results) {
      totalLinks += result.linkedEntities.length;
      languages.add(result.sourceEntity.language);

      for (const linkedEntity of result.linkedEntities) {
        languages.add(linkedEntity.language);
        totalConfidence += linkedEntity.confidence;

        if (linkedEntity.confidence >= qualityThreshold) {
          highQualityLinks++;
        }
      }
    }

    const averageConfidence = totalLinks > 0 ? totalConfidence / totalLinks : 0;

    // Quality checks
    if (averageConfidence < qualityThreshold) {
      issues.push("Average linking confidence below threshold");
    }

    if (highQualityLinks / totalLinks < 0.5) {
      issues.push("Less than 50% of links meet quality threshold");
    }

    if (languages.size < 2) {
      issues.push("Insufficient language diversity in linking results");
    }

    return {
      isValid: issues.length === 0,
      issues,
      statistics: {
        totalLinks,
        highQualityLinks,
        averageConfidence,
        languageCoverage: languages.size,
      },
    };
  }
}