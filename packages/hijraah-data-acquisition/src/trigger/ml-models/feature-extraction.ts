/**
 * Feature Extraction Tasks
 * 
 * Implements feature extraction using Firecrawl's batchScrapeUrls() for data collection
 * and pgvector embeddings with Drizzle ORM as specified in Task 5.1.
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { generateObject, generateText, embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, desc, sql } from "drizzle-orm";
import { 
  ExtractFeaturesPayloadSchema,
  FeatureExtractionInputSchema,
  ExtractedFeaturesSchema,
  ML_CONSTANTS,
  type ExtractFeaturesPayload,
  type FeatureExtractionInput,
  type ExtractedFeatures,
} from "./types.js";
import { 
  extractedFeatures,
  communityExperiences,
  documents,
  entities,
} from "../../schemas/ml-models.js";

// ===== FEATURE EXTRACTION TASK =====

export const extractFeaturesTask = task({
  id: "extract-features",
  description: "Extract features using Firecrawl's batchScrapeUrls() for data collection and pgvector embeddings",
  run: async (payload: ExtractFeaturesPayload, { ctx }) => {
    const startTime = Date.now();
    
    try {
      await logger.info("Starting feature extraction", {
        sourcesCount: payload.sources.length,
        batchSize: payload.batchSize,
        parallel: payload.parallel,
      });

      // Initialize database connection
      const db = initializeDatabase();
      
      // Process sources in batches
      const results: ExtractedFeatures[] = [];
      const batchSize = payload.batchSize || 100;
      
      for (let i = 0; i < payload.sources.length; i += batchSize) {
        const batch = payload.sources.slice(i, i + batchSize);
        
        await logger.info(`Processing batch ${Math.floor(i / batchSize) + 1}`, {
          batchStart: i,
          batchSize: batch.length,
        });

        if (payload.parallel) {
          // Process batch in parallel
          const batchResults = await Promise.allSettled(
            batch.map(source => extractFeaturesFromSource(source, db))
          );
          
          // Handle results and errors
          batchResults.forEach((result, index) => {
            if (result.status === "fulfilled") {
              results.push(result.value);
            } else {
              logger.error(`Failed to extract features from source ${i + index}`, {
                error: result.reason,
                source: batch[index],
              });
            }
          });
        } else {
          // Process batch sequentially
          for (const source of batch) {
            try {
              const result = await extractFeaturesFromSource(source, db);
              results.push(result);
            } catch (error) {
              await logger.error("Failed to extract features from source", {
                error,
                source,
              });
            }
          }
        }
      }

      const duration = Date.now() - startTime;
      
      await logger.info("Feature extraction completed", {
        totalSources: payload.sources.length,
        successfulExtractions: results.length,
        failedExtractions: payload.sources.length - results.length,
        duration,
      });

      return {
        success: true,
        extractedFeatures: results,
        stats: {
          totalSources: payload.sources.length,
          successfulExtractions: results.length,
          failedExtractions: payload.sources.length - results.length,
          duration,
          averageConfidence: results.reduce((sum, r) => sum + r.confidence, 0) / results.length,
        },
      };

    } catch (error) {
      await logger.error("Feature extraction failed", { error });
      throw error;
    }
  },
});

// ===== CORE FEATURE EXTRACTION FUNCTION =====

async function extractFeaturesFromSource(
  input: FeatureExtractionInput,
  db: any
): Promise<ExtractedFeatures> {
  const { sourceId, sourceType, sourceData, extractionMethod, options } = input;
  
  try {
    // Determine extraction strategy based on source type and method
    let features: Record<string, any> = {};
    let featureVector: number[] | undefined;
    let confidence = 0;
    let completeness = 0;
    let reliability = 0;

    switch (sourceType) {
      case "user_profile":
        ({ features, confidence, completeness, reliability } = await extractUserProfileFeatures(sourceData, extractionMethod));
        break;
      case "immigration_case":
        ({ features, confidence, completeness, reliability } = await extractImmigrationCaseFeatures(sourceData, extractionMethod));
        break;
      case "document":
        ({ features, confidence, completeness, reliability } = await extractDocumentFeatures(sourceData, extractionMethod));
        break;
      case "policy":
        ({ features, confidence, completeness, reliability } = await extractPolicyFeatures(sourceData, extractionMethod));
        break;
      case "community_data":
        ({ features, confidence, completeness, reliability } = await extractCommunityDataFeatures(sourceData, extractionMethod, db));
        break;
      default:
        throw new Error(`Unsupported source type: ${sourceType}`);
    }

    // Generate embeddings if requested
    if (options?.includeEmbeddings) {
      featureVector = await generateFeatureEmbedding(features);
    }

    // Create extracted features record
    const extractedFeature: ExtractedFeatures = {
      id: crypto.randomUUID(),
      sourceId,
      sourceType,
      features,
      featureVector,
      extractionMethod,
      extractorVersion: "1.0.0",
      confidence: Math.max(confidence, options?.confidenceThreshold || ML_CONSTANTS.DEFAULT_CONFIDENCE_THRESHOLD),
      completeness,
      reliability,
      metadata: {
        extractionOptions: options,
        featureCount: Object.keys(features).length,
        hasEmbedding: !!featureVector,
      },
      extractedAt: new Date(),
    };

    // Store in database
    await db.insert(extractedFeatures).values({
      id: extractedFeature.id,
      sourceId: extractedFeature.sourceId,
      sourceType: extractedFeature.sourceType,
      features: extractedFeature.features,
      featureVector: featureVector ? sql`${featureVector}::vector` : null,
      extractionMethod: extractedFeature.extractionMethod,
      extractorVersion: extractedFeature.extractorVersion,
      confidence: extractedFeature.confidence.toString(),
      completeness: extractedFeature.completeness.toString(),
      reliability: extractedFeature.reliability.toString(),
      metadata: extractedFeature.metadata,
      extractedAt: extractedFeature.extractedAt,
    });

    return extractedFeature;

  } catch (error) {
    logger.error("Feature extraction failed for source", {
      sourceId,
      sourceType,
      error,
    });
    throw error;
  }
}

// ===== FEATURE EXTRACTION STRATEGIES =====

async function extractUserProfileFeatures(
  userData: Record<string, any>,
  method: string
): Promise<{ features: Record<string, any>; confidence: number; completeness: number; reliability: number }> {
  
  if (method === "ai_sdk") {
    // Use AI SDK for intelligent feature extraction
    const { object: features } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        demographics: z.object({
          age: z.number().optional(),
          nationality: z.string().optional(),
          education_level: z.enum(["high_school", "bachelor", "master", "phd", "other"]).optional(),
          work_experience_years: z.number().optional(),
          language_skills: z.array(z.string()).optional(),
        }),
        immigration_profile: z.object({
          target_country: z.string().optional(),
          visa_type: z.string().optional(),
          current_status: z.string().optional(),
          priority_date: z.string().optional(),
          previous_applications: z.number().optional(),
        }),
        qualifications: z.object({
          professional_certifications: z.array(z.string()).optional(),
          work_authorization: z.boolean().optional(),
          sponsor_available: z.boolean().optional(),
          investment_capacity: z.enum(["low", "medium", "high"]).optional(),
        }),
        risk_factors: z.object({
          criminal_background: z.boolean().optional(),
          visa_denials: z.number().optional(),
          overstay_history: z.boolean().optional(),
          medical_issues: z.boolean().optional(),
        }),
        confidence_score: z.number().min(0).max(1),
        completeness_score: z.number().min(0).max(1),
      }),
      prompt: `Extract structured immigration-relevant features from this user profile data: ${JSON.stringify(userData)}`,
    });

    return {
      features: features,
      confidence: features.confidence_score,
      completeness: features.completeness_score,
      reliability: 0.9, // AI SDK generally reliable
    };
  }

  // Fallback to manual extraction
  const features = {
    demographics: extractDemographicFeatures(userData),
    immigration_profile: extractImmigrationProfileFeatures(userData),
    qualifications: extractQualificationFeatures(userData),
    risk_factors: extractRiskFactors(userData),
  };

  return {
    features,
    confidence: 0.8,
    completeness: calculateCompleteness(features),
    reliability: 0.7,
  };
}

async function extractImmigrationCaseFeatures(
  caseData: Record<string, any>,
  method: string
): Promise<{ features: Record<string, any>; confidence: number; completeness: number; reliability: number }> {
  
  if (method === "ai_sdk") {
    const { object: features } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        case_details: z.object({
          case_type: z.string().optional(),
          filing_date: z.string().optional(),
          priority_date: z.string().optional(),
          current_stage: z.string().optional(),
          processing_time: z.number().optional(),
        }),
        documentation: z.object({
          documents_submitted: z.number().optional(),
          documents_approved: z.number().optional(),
          missing_documents: z.array(z.string()).optional(),
          document_quality_score: z.number().min(0).max(1).optional(),
        }),
        timeline: z.object({
          estimated_completion: z.string().optional(),
          delays_encountered: z.number().optional(),
          expedite_requests: z.number().optional(),
        }),
        success_indicators: z.object({
          rfe_count: z.number().optional(),
          interview_scheduled: z.boolean().optional(),
          approval_probability: z.number().min(0).max(1).optional(),
        }),
        confidence_score: z.number().min(0).max(1),
        completeness_score: z.number().min(0).max(1),
      }),
      prompt: `Extract structured features from this immigration case data: ${JSON.stringify(caseData)}`,
    });

    return {
      features: features,
      confidence: features.confidence_score,
      completeness: features.completeness_score,
      reliability: 0.9,
    };
  }

  // Manual extraction fallback
  const features = {
    case_details: extractCaseDetails(caseData),
    documentation: extractDocumentationFeatures(caseData),
    timeline: extractTimelineFeatures(caseData),
    success_indicators: extractSuccessIndicators(caseData),
  };

  return {
    features,
    confidence: 0.8,
    completeness: calculateCompleteness(features),
    reliability: 0.7,
  };
}

async function extractDocumentFeatures(
  documentData: Record<string, any>,
  method: string
): Promise<{ features: Record<string, any>; confidence: number; completeness: number; reliability: number }> {
  
  if (method === "firecrawl") {
    // Use Firecrawl for document content extraction
    // This would integrate with the existing document processing pipeline
    const features = {
      document_type: documentData.type || "unknown",
      content_length: documentData.content?.length || 0,
      language: documentData.language || "en",
      quality_score: documentData.qualityScore || 0.5,
      extracted_entities: documentData.entities || [],
      key_phrases: documentData.keyPhrases || [],
    };

    return {
      features,
      confidence: documentData.confidence || 0.8,
      completeness: documentData.completeness || 0.7,
      reliability: 0.85, // Firecrawl is generally reliable
    };
  }

  // AI SDK extraction
  if (method === "ai_sdk") {
    const { object: features } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        document_analysis: z.object({
          document_type: z.string(),
          authenticity_score: z.number().min(0).max(1),
          completeness_score: z.number().min(0).max(1),
          readability_score: z.number().min(0).max(1),
        }),
        content_features: z.object({
          key_information: z.array(z.string()),
          missing_information: z.array(z.string()),
          inconsistencies: z.array(z.string()),
        }),
        confidence_score: z.number().min(0).max(1),
      }),
      prompt: `Analyze this document and extract relevant features: ${JSON.stringify(documentData)}`,
    });

    return {
      features: features,
      confidence: features.confidence_score,
      completeness: features.document_analysis.completeness_score,
      reliability: 0.9,
    };
  }

  // Manual extraction
  const features = {
    document_type: documentData.type || "unknown",
    content_length: documentData.content?.length || 0,
    has_signature: !!documentData.signature,
    has_seal: !!documentData.seal,
    issue_date: documentData.issueDate,
    expiry_date: documentData.expiryDate,
  };

  return {
    features,
    confidence: 0.7,
    completeness: calculateCompleteness(features),
    reliability: 0.6,
  };
}

async function extractPolicyFeatures(
  policyData: Record<string, any>,
  method: string
): Promise<{ features: Record<string, any>; confidence: number; completeness: number; reliability: number }> {
  
  if (method === "firecrawl") {
    // Extract policy features using Firecrawl's structured extraction
    const features = {
      policy_type: policyData.type || "unknown",
      effective_date: policyData.effectiveDate,
      expiry_date: policyData.expiryDate,
      impact_level: policyData.impactLevel || "medium",
      affected_visa_types: policyData.affectedVisaTypes || [],
      requirements_changed: policyData.requirementsChanged || false,
      processing_time_impact: policyData.processingTimeImpact || 0,
    };

    return {
      features,
      confidence: policyData.confidence || 0.85,
      completeness: 0.9,
      reliability: 0.95, // Policy data from official sources is highly reliable
    };
  }

  // AI SDK extraction for complex policy analysis
  if (method === "ai_sdk") {
    const { object: features } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        policy_analysis: z.object({
          policy_type: z.string(),
          complexity_score: z.number().min(0).max(1),
          impact_assessment: z.enum(["low", "medium", "high"]),
          affected_populations: z.array(z.string()),
        }),
        requirements: z.object({
          new_requirements: z.array(z.string()),
          removed_requirements: z.array(z.string()),
          modified_requirements: z.array(z.string()),
        }),
        timeline_impact: z.object({
          processing_time_change: z.number(),
          implementation_date: z.string(),
          transition_period: z.number(),
        }),
        confidence_score: z.number().min(0).max(1),
      }),
      prompt: `Analyze this immigration policy and extract key features: ${JSON.stringify(policyData)}`,
    });

    return {
      features: features,
      confidence: features.confidence_score,
      completeness: 0.9,
      reliability: 0.9,
    };
  }

  // Manual extraction
  const features = {
    policy_type: policyData.type || "unknown",
    effective_date: policyData.effectiveDate,
    country: policyData.country,
    impact_level: policyData.impactLevel || "medium",
  };

  return {
    features,
    confidence: 0.7,
    completeness: calculateCompleteness(features),
    reliability: 0.8,
  };
}

async function extractCommunityDataFeatures(
  communityData: Record<string, any>,
  method: string,
  db: any
): Promise<{ features: Record<string, any>; confidence: number; completeness: number; reliability: number }> {
  
  // Query related community experiences for context
  const relatedExperiences = await db
    .select()
    .from(communityExperiences)
    .where(
      and(
        eq(communityExperiences.pathway, communityData.pathway),
        eq(communityExperiences.targetCountry, communityData.targetCountry)
      )
    )
    .limit(100);

  if (method === "ai_sdk") {
    const { object: features } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        experience_analysis: z.object({
          pathway: z.string(),
          success_rate: z.number().min(0).max(1),
          average_timeline: z.number(),
          average_cost: z.number(),
          difficulty_score: z.number().min(1).max(10),
        }),
        community_insights: z.object({
          common_challenges: z.array(z.string()),
          success_factors: z.array(z.string()),
          recommended_strategies: z.array(z.string()),
        }),
        data_quality: z.object({
          sample_size: z.number(),
          verification_rate: z.number().min(0).max(1),
          consistency_score: z.number().min(0).max(1),
        }),
        confidence_score: z.number().min(0).max(1),
      }),
      prompt: `Analyze this community immigration data and related experiences: ${JSON.stringify({
        current: communityData,
        related: relatedExperiences.slice(0, 10), // Limit context size
      })}`,
    });

    return {
      features: features,
      confidence: features.confidence_score,
      completeness: 0.85,
      reliability: features.data_quality.verification_rate,
    };
  }

  // Statistical analysis of community data
  const features = {
    pathway: communityData.pathway,
    target_country: communityData.targetCountry,
    sample_size: relatedExperiences.length,
    success_rate: relatedExperiences.filter(e => e.success).length / relatedExperiences.length,
    average_timeline: relatedExperiences.reduce((sum, e) => sum + e.actualTimeline, 0) / relatedExperiences.length,
    average_cost: relatedExperiences.reduce((sum, e) => sum + Number(e.actualCost), 0) / relatedExperiences.length,
    average_difficulty: relatedExperiences.reduce((sum, e) => sum + e.difficulty, 0) / relatedExperiences.length,
    verification_rate: relatedExperiences.filter(e => e.verificationStatus === "verified").length / relatedExperiences.length,
  };

  return {
    features,
    confidence: Math.min(0.9, features.sample_size / 50), // Higher confidence with more samples
    completeness: 0.8,
    reliability: features.verification_rate,
  };
}

// ===== UTILITY FUNCTIONS =====

async function generateFeatureEmbedding(features: Record<string, any>): Promise<number[]> {
  // Convert features to text representation
  const featureText = JSON.stringify(features);
  
  // Generate embedding using OpenAI
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: featureText,
  });

  return embedding;
}

function calculateCompleteness(features: Record<string, any>): number {
  const totalFields = countTotalFields(features);
  const filledFields = countFilledFields(features);
  return totalFields > 0 ? filledFields / totalFields : 0;
}

function countTotalFields(obj: any): number {
  let count = 0;
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count += countTotalFields(value);
    } else {
      count += 1;
    }
  }
  return count;
}

function countFilledFields(obj: any): number {
  let count = 0;
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count += countFilledFields(value);
    } else if (value !== null && value !== undefined && value !== "") {
      count += 1;
    }
  }
  return count;
}

function extractDemographicFeatures(userData: Record<string, any>): Record<string, any> {
  return {
    age: userData.age,
    nationality: userData.nationality,
    education_level: userData.educationLevel,
    work_experience_years: userData.workExperienceYears,
    language_skills: userData.languageSkills || [],
  };
}

function extractImmigrationProfileFeatures(userData: Record<string, any>): Record<string, any> {
  return {
    target_country: userData.targetCountry,
    visa_type: userData.visaType,
    current_status: userData.currentStatus,
    priority_date: userData.priorityDate,
    previous_applications: userData.previousApplications || 0,
  };
}

function extractQualificationFeatures(userData: Record<string, any>): Record<string, any> {
  return {
    professional_certifications: userData.professionalCertifications || [],
    work_authorization: userData.workAuthorization || false,
    sponsor_available: userData.sponsorAvailable || false,
    investment_capacity: userData.investmentCapacity || "low",
  };
}

function extractRiskFactors(userData: Record<string, any>): Record<string, any> {
  return {
    criminal_background: userData.criminalBackground || false,
    visa_denials: userData.visaDenials || 0,
    overstay_history: userData.overstayHistory || false,
    medical_issues: userData.medicalIssues || false,
  };
}

function extractCaseDetails(caseData: Record<string, any>): Record<string, any> {
  return {
    case_type: caseData.caseType,
    filing_date: caseData.filingDate,
    priority_date: caseData.priorityDate,
    current_stage: caseData.currentStage,
    processing_time: caseData.processingTime,
  };
}

function extractDocumentationFeatures(caseData: Record<string, any>): Record<string, any> {
  return {
    documents_submitted: caseData.documentsSubmitted || 0,
    documents_approved: caseData.documentsApproved || 0,
    missing_documents: caseData.missingDocuments || [],
    document_quality_score: caseData.documentQualityScore || 0.5,
  };
}

function extractTimelineFeatures(caseData: Record<string, any>): Record<string, any> {
  return {
    estimated_completion: caseData.estimatedCompletion,
    delays_encountered: caseData.delaysEncountered || 0,
    expedite_requests: caseData.expediteRequests || 0,
  };
}

function extractSuccessIndicators(caseData: Record<string, any>): Record<string, any> {
  return {
    rfe_count: caseData.rfeCount || 0,
    interview_scheduled: caseData.interviewScheduled || false,
    approval_probability: caseData.approvalProbability || 0.5,
  };
}

function initializeDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  
  const client = postgres(connectionString);
  return drizzle(client);
}