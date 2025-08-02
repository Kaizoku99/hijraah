/**
 * Conflict Resolution System
 * 
 * AI-assisted conflict detection and resolution with Firecrawl cross-referencing
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createClient } from "@supabase/supabase-js";
import type {
  ConflictDetectionResult,
  ExpertReviewRequest,
  ExpertReviewResponse,
  QualityRecommendation,
} from "./types.js";

// Initialize services
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Conflict detection schema for AI analysis
const conflictDetectionSchema = z.object({
  hasConflict: z.boolean().describe("Whether a conflict exists between the data sources"),
  conflictType: z.enum(["value", "format", "source", "temporal", "logical"]).describe("Type of conflict detected"),
  severity: z.enum(["low", "medium", "high", "critical"]).describe("Severity of the conflict"),
  description: z.string().describe("Detailed description of the conflict"),
  conflictingValues: z.array(z.object({
    sourceId: z.string(),
    value: z.any(),
    confidence: z.number().min(0).max(1),
    reasoning: z.string(),
  })).describe("List of conflicting values with their sources"),
  suggestedResolution: z.enum(["manual_review", "auto_resolve", "expert_review", "community_vote"]).describe("Suggested resolution approach"),
  confidence: z.number().min(0).max(1).describe("Confidence in conflict detection"),
  resolutionStrategy: z.object({
    preferredValue: z.any().optional(),
    preferredSourceId: z.string().optional(),
    reasoning: z.string(),
    requiredActions: z.array(z.string()),
  }).describe("Suggested resolution strategy"),
});

// Expert review analysis schema
const expertReviewAnalysisSchema = z.object({
  recommendation: z.enum(["accept", "reject", "modify", "escalate"]).describe("Expert recommendation"),
  correctValue: z.any().optional().describe("The correct value if determined"),
  correctSourceId: z.string().optional().describe("The most reliable source ID"),
  confidence: z.number().min(0).max(1).describe("Confidence in the recommendation"),
  reasoning: z.string().describe("Detailed reasoning for the recommendation"),
  additionalEvidence: z.array(z.object({
    type: z.enum(["source_verification", "cross_reference", "historical_data", "expert_knowledge"]),
    description: z.string(),
    supportingData: z.any().optional(),
  })).describe("Additional evidence supporting the recommendation"),
  qualityImprovements: z.array(z.object({
    type: z.enum(["source_reliability", "validation_rules", "monitoring", "process_improvement"]),
    description: z.string(),
    priority: z.enum(["low", "medium", "high", "critical"]),
    estimatedImpact: z.number().min(0).max(1),
  })).describe("Suggested quality improvements"),
});

/**
 * Task 9.2: Conflict Detection System
 * 
 * Detects conflicts between data from multiple sources using AI reasoning
 */
export const detectDataConflictsTask = task({
  id: "detect-data-conflicts",
  description: "Detect conflicts between data from multiple sources",
  run: async (payload: {
    dataIds: string[];
    conflictTypes?: string[];
    priority?: "low" | "medium" | "high" | "critical";
  }) => {
    const startTime = Date.now();
    
    try {
      // Step 1: Retrieve data from multiple sources
      const { data: dataItems } = await supabase
        .from('scraped_data')
        .select(`
          *,
          data_sources (
            id,
            name,
            type,
            credibility_score,
            url
          )
        `)
        .in('id', payload.dataIds);

      if (!dataItems || dataItems.length < 2) {
        return {
          message: "Need at least 2 data items to detect conflicts",
          conflictsDetected: 0,
          conflicts: [],
        };
      }

      // Step 2: Group data by entity/topic for comparison
      const dataGroups = groupDataByEntity(dataItems);
      const conflicts: ConflictDetectionResult[] = [];

      for (const [entityKey, groupData] of Object.entries(dataGroups)) {
        if (groupData.length < 2) continue;

        // Step 3: Firecrawl cross-referencing for source verification
        const sourceVerifications = await Promise.all(
          groupData.map(async (item) => {
            if (item.data_sources?.url) {
              try {
                const scrapeResult = await firecrawl.scrapeUrl(item.data_sources.url, {
                  formats: ["markdown"],
                  onlyMainContent: true,
                  timeout: 15000,
                });

                return {
                  dataId: item.id,
                  sourceId: item.source_id,
                  isAccessible: scrapeResult.success,
                  currentContent: scrapeResult.markdown,
                  lastModified: scrapeResult.metadata?.lastModified,
                  confidence: scrapeResult.success ? 0.9 : 0.3,
                };
              } catch (error) {
                return {
                  dataId: item.id,
                  sourceId: item.source_id,
                  isAccessible: false,
                  error: error instanceof Error ? error.message : "Unknown error",
                  confidence: 0.1,
                };
              }
            }
            return {
              dataId: item.id,
              sourceId: item.source_id,
              isAccessible: true,
              confidence: 0.7,
            };
          })
        );

        // Step 4: AI-powered conflict detection
        const { object: conflictAnalysis } = await generateObject({
          model: openai("gpt-4o"),
          schema: conflictDetectionSchema,
          system: `You are a data quality expert specializing in conflict detection for immigration data.
          
          Analyze the provided data items for conflicts considering:
          1. Value conflicts - Different values for the same field
          2. Format conflicts - Different formats for the same type of data
          3. Source conflicts - Contradictory information from different sources
          4. Temporal conflicts - Inconsistent timestamps or version conflicts
          5. Logical conflicts - Data that doesn't make logical sense together
          
          Consider source credibility, recency, and verification status when assessing conflicts.
          Provide detailed analysis with specific recommendations for resolution.`,
          prompt: `Analyze these data items for conflicts:
          
          Entity: ${entityKey}
          
          Data Items:
          ${groupData.map((item, index) => `
          Item ${index + 1}:
          - ID: ${item.id}
          - Source: ${item.data_sources?.name} (${item.data_sources?.type})
          - Credibility: ${item.data_sources?.credibility_score || 'unknown'}
          - Data: ${JSON.stringify(item.data, null, 2)}
          - Created: ${item.created_at}
          - Updated: ${item.updated_at}
          `).join('\n')}
          
          Source Verifications:
          ${sourceVerifications.map((sv, index) => `
          Source ${index + 1}:
          - Accessible: ${sv.isAccessible}
          - Confidence: ${sv.confidence}
          - Last Modified: ${sv.lastModified || 'unknown'}
          ${sv.error ? `- Error: ${sv.error}` : ''}
          `).join('\n')}`,
        });

        // Step 5: Create conflict record if detected
        if (conflictAnalysis.hasConflict) {
          const conflictId = `conflict-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          const conflict: ConflictDetectionResult = {
            conflictId,
            dataIds: groupData.map(item => item.id),
            conflictType: conflictAnalysis.conflictType,
            severity: conflictAnalysis.severity,
            description: conflictAnalysis.description,
            conflictingValues: conflictAnalysis.conflictingValues.map(cv => ({
              dataId: groupData.find(item => item.source_id === cv.sourceId)?.id || '',
              sourceId: cv.sourceId,
              value: cv.value,
              confidence: cv.confidence,
              timestamp: new Date(),
            })),
            suggestedResolution: conflictAnalysis.suggestedResolution,
            confidence: conflictAnalysis.confidence,
            detectedAt: new Date(),
            metadata: {
              entityKey,
              sourceVerifications,
              aiAnalysis: conflictAnalysis,
              processingTime: Date.now() - startTime,
            },
          };

          // Store conflict in database
          await supabase.from('data_conflicts').insert({
            id: conflictId,
            data_ids: conflict.dataIds,
            conflict_type: conflict.conflictType,
            severity: conflict.severity,
            description: conflict.description,
            conflicting_values: conflict.conflictingValues,
            suggested_resolution: conflict.suggestedResolution,
            confidence: conflict.confidence,
            detected_at: conflict.detectedAt,
            status: 'detected',
            metadata: conflict.metadata,
          });

          conflicts.push(conflict);

          // Step 6: Trigger expert review if needed
          if (conflict.severity === 'critical' || conflict.suggestedResolution === 'expert_review') {
            await triggerExpertReview(conflict);
          }
        }
      }

      return {
        entitiesAnalyzed: Object.keys(dataGroups).length,
        conflictsDetected: conflicts.length,
        conflicts,
        processingTime: Date.now() - startTime,
      };

    } catch (error) {
      console.error("Conflict detection failed:", error);
      throw error;
    }
  },
});

/**
 * Expert Review Orchestration Task
 * 
 * Manages the expert review workflow with AI assistance
 */
export const orchestrateExpertReviewTask = task({
  id: "orchestrate-expert-review",
  description: "Orchestrate expert review workflow for data conflicts",
  run: async (payload: ExpertReviewRequest) => {
    const startTime = Date.now();
    
    try {
      // Step 1: Gather additional context and evidence
      const additionalEvidence = await gatherAdditionalEvidence(
        payload.context.dataIds,
        payload.context.conflictDetails
      );

      // Step 2: AI-powered pre-analysis for expert guidance
      const { object: aiGuidance } = await generateObject({
        model: openai("gpt-4o"),
        schema: expertReviewAnalysisSchema,
        system: `You are an AI assistant helping immigration data experts resolve conflicts.
        
        Provide preliminary analysis and recommendations to guide expert review:
        1. Analyze all available evidence
        2. Cross-reference with authoritative sources
        3. Consider source reliability and recency
        4. Provide clear reasoning for recommendations
        5. Suggest additional verification steps if needed
        
        Your analysis will be reviewed by human experts who will make the final decision.`,
        prompt: `Analyze this data conflict for expert review:
        
        Conflict Details:
        ${JSON.stringify(payload.context.conflictDetails, null, 2)}
        
        Additional Evidence:
        ${JSON.stringify(additionalEvidence, null, 2)}
        
        Community Feedback:
        ${payload.context.communityFeedback ? JSON.stringify(payload.context.communityFeedback, null, 2) : 'None available'}
        
        Provide detailed analysis and recommendations for expert review.`,
      });

      // Step 3: Create expert review record
      const reviewId = `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const reviewRecord = {
        id: reviewId,
        conflict_id: payload.conflictId,
        review_type: payload.reviewType,
        priority: payload.priority,
        description: payload.description,
        context: payload.context,
        ai_guidance: aiGuidance,
        additional_evidence: additionalEvidence,
        assigned_to: payload.assignedTo,
        deadline: payload.deadline,
        status: 'pending',
        created_at: new Date(),
        metadata: payload.metadata,
      };

      await supabase.from('expert_reviews').insert(reviewRecord);

      // Step 4: Notify assigned expert or expert pool
      if (payload.assignedTo) {
        await notifyExpert(payload.assignedTo, reviewRecord);
      } else {
        await notifyExpertPool(reviewRecord);
      }

      // Step 5: Set up automated follow-up
      if (payload.deadline) {
        await scheduleReviewReminder(reviewId, payload.deadline);
      }

      return {
        reviewId,
        status: 'initiated',
        aiGuidance,
        additionalEvidence,
        processingTime: Date.now() - startTime,
      };

    } catch (error) {
      console.error("Expert review orchestration failed:", error);
      throw error;
    }
  },
});

/**
 * Process Expert Review Response Task
 * 
 * Processes expert decisions and implements resolutions
 */
export const processExpertReviewTask = task({
  id: "process-expert-review",
  description: "Process expert review decisions and implement resolutions",
  run: async (payload: ExpertReviewResponse) => {
    const startTime = Date.now();
    
    try {
      // Step 1: Validate expert review
      const { data: reviewRecord } = await supabase
        .from('expert_reviews')
        .select('*')
        .eq('id', payload.reviewId)
        .single();

      if (!reviewRecord) {
        throw new Error(`Expert review ${payload.reviewId} not found`);
      }

      // Step 2: Update review record
      await supabase
        .from('expert_reviews')
        .update({
          decision: payload.decision,
          resolution: payload.resolution,
          recommendations: payload.recommendations,
          reviewed_by: payload.reviewedBy,
          reviewed_at: payload.reviewedAt,
          status: 'completed',
          metadata: { ...reviewRecord.metadata, ...payload.metadata },
        })
        .eq('id', payload.reviewId);

      // Step 3: Implement resolution based on expert decision
      let resolutionResult;
      
      switch (payload.decision) {
        case 'accept':
          resolutionResult = await implementAcceptResolution(payload);
          break;
        case 'reject':
          resolutionResult = await implementRejectResolution(payload);
          break;
        case 'modify':
          resolutionResult = await implementModifyResolution(payload);
          break;
        case 'escalate':
          resolutionResult = await implementEscalateResolution(payload);
          break;
        default:
          throw new Error(`Unknown decision: ${payload.decision}`);
      }

      // Step 4: Update conflict status
      await supabase
        .from('data_conflicts')
        .update({
          status: 'resolved',
          resolution: payload.resolution,
          resolved_at: new Date(),
          resolved_by: payload.reviewedBy,
        })
        .eq('id', payload.conflictId);

      // Step 5: Update source reliability scores
      await updateSourceReliabilityScores(payload);

      // Step 6: Create quality improvement feedback loop
      await createQualityFeedbackLoop(payload);

      return {
        reviewId: payload.reviewId,
        conflictId: payload.conflictId,
        decision: payload.decision,
        resolutionResult,
        processingTime: Date.now() - startTime,
      };

    } catch (error) {
      console.error("Expert review processing failed:", error);
      throw error;
    }
  },
});

/**
 * Quality Improvement Feedback Loop Task
 * 
 * Learns from resolution patterns to improve future quality
 */
export const qualityFeedbackLoopTask = task({
  id: "quality-feedback-loop",
  description: "Learn from resolution patterns to improve data quality",
  run: async (payload: { 
    reviewIds?: string[];
    analysisType?: "pattern_analysis" | "source_reliability" | "rule_improvement";
  }) => {
    try {
      // Step 1: Gather resolved reviews for analysis
      let query = supabase
        .from('expert_reviews')
        .select(`
          *,
          data_conflicts (*)
        `)
        .eq('status', 'completed');

      if (payload.reviewIds && payload.reviewIds.length > 0) {
        query = query.in('id', payload.reviewIds);
      }

      const { data: reviews } = await query.limit(100);

      if (!reviews || reviews.length === 0) {
        return { message: "No completed reviews found for analysis" };
      }

      // Step 2: AI-powered pattern analysis
      const { object: patternAnalysis } = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          commonPatterns: z.array(z.object({
            pattern: z.string(),
            frequency: z.number(),
            impact: z.enum(["low", "medium", "high"]),
            suggestedImprovement: z.string(),
          })),
          sourceReliabilityInsights: z.array(z.object({
            sourceId: z.string(),
            reliabilityTrend: z.enum(["improving", "stable", "declining"]),
            commonIssues: z.array(z.string()),
            suggestedActions: z.array(z.string()),
          })),
          validationRuleImprovements: z.array(z.object({
            ruleType: z.string(),
            currentGap: z.string(),
            proposedRule: z.string(),
            expectedImpact: z.number().min(0).max(1),
          })),
          processImprovements: z.array(z.object({
            area: z.enum(["detection", "resolution", "prevention", "monitoring"]),
            improvement: z.string(),
            priority: z.enum(["low", "medium", "high", "critical"]),
            estimatedEffort: z.enum(["low", "medium", "high"]),
          })),
        }),
        system: `You are a data quality improvement analyst. Analyze expert review patterns to identify:
        1. Common conflict patterns and their root causes
        2. Source reliability trends and issues
        3. Gaps in current validation rules
        4. Process improvements for better quality assurance
        
        Focus on actionable insights that can prevent future conflicts and improve data quality.`,
        prompt: `Analyze these expert reviews for quality improvement insights:
        
        Reviews: ${JSON.stringify(reviews, null, 2)}
        
        Identify patterns, trends, and improvement opportunities.`,
      });

      // Step 3: Implement automatic improvements
      const implementedImprovements = [];

      // Update source reliability scores
      for (const insight of patternAnalysis.sourceReliabilityInsights) {
        try {
          const reliabilityAdjustment = insight.reliabilityTrend === 'declining' ? -0.1 : 
                                       insight.reliabilityTrend === 'improving' ? 0.1 : 0;

          if (reliabilityAdjustment !== 0) {
            await supabase.rpc('adjust_source_reliability', {
              source_id: insight.sourceId,
              adjustment: reliabilityAdjustment,
            });

            implementedImprovements.push({
              type: 'source_reliability',
              sourceId: insight.sourceId,
              adjustment: reliabilityAdjustment,
            });
          }
        } catch (error) {
          console.warn(`Failed to update reliability for source ${insight.sourceId}:`, error);
        }
      }

      // Create new validation rules
      for (const ruleImprovement of patternAnalysis.validationRuleImprovements) {
        if (ruleImprovement.expectedImpact > 0.7) {
          try {
            await supabase.from('validation_rules').insert({
              rule_type: ruleImprovement.ruleType,
              description: ruleImprovement.currentGap,
              rule_definition: ruleImprovement.proposedRule,
              expected_impact: ruleImprovement.expectedImpact,
              status: 'pending_approval',
              created_from: 'feedback_loop',
            });

            implementedImprovements.push({
              type: 'validation_rule',
              ruleType: ruleImprovement.ruleType,
              rule: ruleImprovement.proposedRule,
            });
          } catch (error) {
            console.warn(`Failed to create validation rule:`, error);
          }
        }
      }

      // Step 4: Store analysis results
      await supabase.from('quality_analysis_results').insert({
        analysis_type: payload.analysisType || 'pattern_analysis',
        reviews_analyzed: reviews.length,
        patterns_identified: patternAnalysis.commonPatterns.length,
        improvements_implemented: implementedImprovements.length,
        analysis_results: patternAnalysis,
        implemented_improvements: implementedImprovements,
        created_at: new Date(),
      });

      return {
        reviewsAnalyzed: reviews.length,
        patternsIdentified: patternAnalysis.commonPatterns.length,
        improvementsImplemented: implementedImprovements.length,
        patternAnalysis,
        implementedImprovements,
      };

    } catch (error) {
      console.error("Quality feedback loop failed:", error);
      throw error;
    }
  },
});

// Helper functions

function groupDataByEntity(dataItems: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  
  for (const item of dataItems) {
    // Simple grouping by data type and key fields
    // In production, this would be more sophisticated
    const entityKey = `${item.data_type || 'unknown'}-${item.data?.country || 'global'}`;
    
    if (!groups[entityKey]) {
      groups[entityKey] = [];
    }
    groups[entityKey].push(item);
  }
  
  return groups;
}

async function gatherAdditionalEvidence(dataIds: string[], conflictDetails: ConflictDetectionResult) {
  try {
    // Gather historical data
    const { data: historicalData } = await supabase
      .from('scraped_data')
      .select('*')
      .in('source_id', conflictDetails.conflictingValues.map(cv => cv.sourceId))
      .order('created_at', { ascending: false })
      .limit(10);

    // Gather community feedback
    const { data: communityFeedback } = await supabase
      .from('quality_feedback')
      .select('*')
      .in('data_id', dataIds);

    // Cross-reference with authoritative sources if available
    const authoritativeSources = await Promise.all(
      conflictDetails.conflictingValues.map(async (cv) => {
        try {
          const { data: source } = await supabase
            .from('data_sources')
            .select('*')
            .eq('id', cv.sourceId)
            .single();

          if (source?.url && source.type === 'government') {
            const scrapeResult = await firecrawl.scrapeUrl(source.url, {
              formats: ["markdown"],
              onlyMainContent: true,
            });

            return {
              sourceId: cv.sourceId,
              isAuthoritative: source.type === 'government',
              currentContent: scrapeResult.markdown,
              accessible: scrapeResult.success,
            };
          }
        } catch (error) {
          console.warn(`Failed to verify source ${cv.sourceId}:`, error);
        }
        return null;
      })
    );

    return {
      historicalData: historicalData || [],
      communityFeedback: communityFeedback || [],
      authoritativeSources: authoritativeSources.filter(Boolean),
    };
  } catch (error) {
    console.warn("Failed to gather additional evidence:", error);
    return {
      historicalData: [],
      communityFeedback: [],
      authoritativeSources: [],
    };
  }
}

async function triggerExpertReview(conflict: ConflictDetectionResult) {
  const reviewRequest: ExpertReviewRequest = {
    conflictId: conflict.conflictId,
    reviewType: 'conflict_resolution',
    priority: conflict.severity === 'critical' ? 'critical' : 'high',
    description: `Data conflict detected: ${conflict.description}`,
    context: {
      dataIds: conflict.dataIds,
      conflictDetails: conflict,
      aiAnalysis: `AI detected ${conflict.conflictType} conflict with ${conflict.confidence} confidence`,
    },
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };

  await orchestrateExpertReviewTask.trigger(reviewRequest);
}

async function notifyExpert(expertId: string, reviewRecord: any) {
  // Implementation would send notification to specific expert
  console.log(`Notifying expert ${expertId} about review ${reviewRecord.id}`);
}

async function notifyExpertPool(reviewRecord: any) {
  // Implementation would notify available experts in the pool
  console.log(`Notifying expert pool about review ${reviewRecord.id}`);
}

async function scheduleReviewReminder(reviewId: string, deadline: Date) {
  // Implementation would schedule reminder notifications
  console.log(`Scheduling reminder for review ${reviewId} at ${deadline}`);
}

async function implementAcceptResolution(payload: ExpertReviewResponse) {
  // Accept the preferred value and update data
  if (payload.resolution.correctValue && payload.resolution.correctSourceId) {
    await supabase
      .from('scraped_data')
      .update({
        data: payload.resolution.correctValue,
        confidence_score: 0.95,
        expert_verified: true,
        updated_at: new Date(),
      })
      .eq('source_id', payload.resolution.correctSourceId);
  }
  
  return { action: 'accepted', updated: true };
}

async function implementRejectResolution(payload: ExpertReviewResponse) {
  // Mark conflicting data as rejected
  await supabase
    .from('scraped_data')
    .update({
      status: 'rejected',
      rejection_reason: payload.resolution.reasoning,
      updated_at: new Date(),
    })
    .eq('id', payload.conflictId);
  
  return { action: 'rejected', marked: true };
}

async function implementModifyResolution(payload: ExpertReviewResponse) {
  // Update data with expert modifications
  if (payload.resolution.correctValue) {
    await supabase
      .from('scraped_data')
      .update({
        data: payload.resolution.correctValue,
        confidence_score: payload.resolution.confidence,
        expert_modified: true,
        modification_reason: payload.resolution.reasoning,
        updated_at: new Date(),
      })
      .eq('id', payload.conflictId);
  }
  
  return { action: 'modified', updated: true };
}

async function implementEscalateResolution(payload: ExpertReviewResponse) {
  // Escalate to senior expert or committee
  await supabase.from('expert_reviews').insert({
    conflict_id: payload.conflictId,
    review_type: 'escalated_review',
    priority: 'critical',
    description: `Escalated from review ${payload.reviewId}: ${payload.resolution.reasoning}`,
    context: { originalReview: payload },
    status: 'pending',
  });
  
  return { action: 'escalated', newReviewCreated: true };
}

async function updateSourceReliabilityScores(payload: ExpertReviewResponse) {
  // Update source reliability based on expert decisions
  if (payload.resolution.correctSourceId) {
    await supabase.rpc('adjust_source_reliability', {
      source_id: payload.resolution.correctSourceId,
      adjustment: 0.05, // Increase reliability for correct source
    });
  }
}

async function createQualityFeedbackLoop(payload: ExpertReviewResponse) {
  // Create feedback for quality improvement
  await supabase.from('quality_feedback').insert({
    data_id: payload.conflictId,
    source_id: payload.resolution.correctSourceId || 'unknown',
    feedback_type: 'expert_resolution',
    rating: payload.resolution.confidence > 0.8 ? 5 : 4,
    comment: payload.resolution.reasoning,
    reported_by: payload.reviewedBy,
    reported_at: payload.reviewedAt,
    status: 'implemented',
  });
}

/**
 * Enhanced Firecrawl Cross-Referencing Task
 * 
 * Performs comprehensive source verification using Firecrawl
 */
export const crossReferenceSourcesTask = task({
  id: "cross-reference-sources",
  description: "Cross-reference data sources using Firecrawl for verification",
  run: async (payload: {
    sourceIds: string[];
    verificationDepth?: "basic" | "comprehensive";
    includeHistorical?: boolean;
  }) => {
    const startTime = Date.now();
    
    try {
      // Get source information
      const { data: sources } = await supabase
        .from('data_sources')
        .select('*')
        .in('id', payload.sourceIds);

      if (!sources || sources.length === 0) {
        return { message: "No sources found for cross-referencing" };
      }

      const verificationResults = [];

      for (const source of sources) {
        if (!source.url) {
          verificationResults.push({
            sourceId: source.id,
            status: 'skipped',
            reason: 'No URL available',
          });
          continue;
        }

        try {
          // Basic verification - scrape current content
          const scrapeResult = await firecrawl.scrapeUrl(source.url, {
            formats: ["markdown", "html"],
            onlyMainContent: true,
            timeout: 20000,
            waitFor: 2000,
          });

          let verificationResult = {
            sourceId: source.id,
            sourceName: source.name,
            url: source.url,
            status: scrapeResult.success ? 'accessible' : 'inaccessible',
            lastModified: scrapeResult.metadata?.lastModified,
            contentLength: scrapeResult.markdown?.length || 0,
            title: scrapeResult.metadata?.title,
            description: scrapeResult.metadata?.description,
            statusCode: scrapeResult.metadata?.statusCode,
            confidence: scrapeResult.success ? 0.9 : 0.1,
            error: scrapeResult.success ? null : 'Failed to scrape',
            verifiedAt: new Date(),
          };

          // Comprehensive verification - additional checks
          if (payload.verificationDepth === 'comprehensive' && scrapeResult.success) {
            // Check for policy-specific content
            const { object: contentAnalysis } = await generateObject({
              model: openai("gpt-4o-mini"),
              schema: z.object({
                hasImmigrationContent: z.boolean(),
                contentRelevance: z.number().min(0).max(1),
                lastUpdateIndicators: z.array(z.string()),
                authorityIndicators: z.array(z.string()),
                reliabilityScore: z.number().min(0).max(1),
                contentSummary: z.string(),
              }),
              system: "Analyze web content for immigration policy relevance and reliability indicators.",
              prompt: `Analyze this content for immigration policy relevance:
              
              URL: ${source.url}
              Title: ${scrapeResult.metadata?.title || 'Unknown'}
              Content: ${scrapeResult.markdown?.substring(0, 2000)}...
              
              Assess the content's relevance to immigration policies and reliability indicators.`,
            });

            verificationResult = {
              ...verificationResult,
              contentAnalysis,
              confidence: contentAnalysis.reliabilityScore,
            };
          }

          // Historical verification if requested
          if (payload.includeHistorical) {
            const { data: historicalData } = await supabase
              .from('scraped_data')
              .select('created_at, updated_at, confidence_score')
              .eq('source_id', source.id)
              .order('created_at', { ascending: false })
              .limit(10);

            verificationResult = {
              ...verificationResult,
              historicalReliability: {
                totalRecords: historicalData?.length || 0,
                averageConfidence: historicalData?.reduce((sum, item) => sum + (item.confidence_score || 0), 0) / (historicalData?.length || 1),
                lastDataUpdate: historicalData?.[0]?.updated_at,
              },
            };
          }

          verificationResults.push(verificationResult);

          // Update source reliability based on verification
          const reliabilityAdjustment = verificationResult.confidence > 0.8 ? 0.02 : -0.02;
          await supabase
            .from('data_sources')
            .update({
              credibility_score: Math.max(0, Math.min(1, source.credibility_score + reliabilityAdjustment)),
              last_updated: new Date(),
            })
            .eq('id', source.id);

        } catch (error) {
          verificationResults.push({
            sourceId: source.id,
            sourceName: source.name,
            url: source.url,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
            confidence: 0.1,
            verifiedAt: new Date(),
          });
        }
      }

      // Store verification results
      await supabase.from('source_reliability_assessments').insert(
        verificationResults.map(result => ({
          url: result.url,
          country: 'unknown', // Would be extracted from source metadata
          agency: result.sourceName || 'unknown',
          is_reliable: result.confidence > 0.7,
          success_rate: result.confidence,
          total_attempts: 1,
          reason: result.error || 'Verification completed',
          assessed_at: result.verifiedAt,
        }))
      );

      return {
        sourcesVerified: verificationResults.length,
        accessibleSources: verificationResults.filter(r => r.status === 'accessible').length,
        inaccessibleSources: verificationResults.filter(r => r.status === 'inaccessible').length,
        errorSources: verificationResults.filter(r => r.status === 'error').length,
        averageConfidence: verificationResults.reduce((sum, r) => sum + r.confidence, 0) / verificationResults.length,
        verificationResults,
        processingTime: Date.now() - startTime,
      };

    } catch (error) {
      console.error("Cross-reference sources failed:", error);
      throw error;
    }
  },
});

/**
 * Real-time Conflict Monitoring Task
 * 
 * Monitors for conflicts in real-time as new data arrives
 */
export const monitorConflictsTask = task({
  id: "monitor-conflicts",
  description: "Monitor for data conflicts in real-time",
  run: async (payload: {
    newDataId: string;
    checkSimilarData?: boolean;
    autoResolve?: boolean;
  }) => {
    try {
      // Get the new data item
      const { data: newDataItem } = await supabase
        .from('scraped_data')
        .select(`
          *,
          data_sources (*)
        `)
        .eq('id', payload.newDataId)
        .single();

      if (!newDataItem) {
        return { message: "Data item not found" };
      }

      // Find similar data items for comparison
      const { data: similarItems } = await supabase
        .from('scraped_data')
        .select(`
          *,
          data_sources (*)
        `)
        .eq('data_type', newDataItem.data_type)
        .neq('id', newDataItem.id)
        .limit(10);

      if (!similarItems || similarItems.length === 0) {
        return { message: "No similar data found for comparison" };
      }

      // Check for conflicts with similar items
      const conflictCheckResult = await detectDataConflictsTask.trigger({
        dataIds: [newDataItem.id, ...similarItems.map(item => item.id)],
        priority: 'medium',
      });

      // Auto-resolve simple conflicts if enabled
      if (payload.autoResolve && conflictCheckResult.conflicts) {
        const autoResolvableConflicts = conflictCheckResult.conflicts.filter(
          conflict => conflict.suggestedResolution === 'auto_resolve' && conflict.confidence > 0.9
        );

        for (const conflict of autoResolvableConflicts) {
          // Implement auto-resolution logic
          const preferredSource = conflict.conflictingValues.reduce((prev, current) => 
            prev.confidence > current.confidence ? prev : current
          );

          await supabase
            .from('data_conflicts')
            .update({
              status: 'resolved',
              resolution: {
                method: 'auto_resolve',
                preferredValue: preferredSource.value,
                preferredSourceId: preferredSource.sourceId,
                reasoning: 'Auto-resolved based on highest confidence source',
                resolvedAt: new Date(),
              },
            })
            .eq('id', conflict.conflictId);
        }
      }

      return {
        newDataId: payload.newDataId,
        similarItemsChecked: similarItems.length,
        conflictsDetected: conflictCheckResult.conflictsDetected || 0,
        autoResolvedConflicts: payload.autoResolve ? 
          conflictCheckResult.conflicts?.filter(c => c.suggestedResolution === 'auto_resolve').length || 0 : 0,
      };

    } catch (error) {
      console.error("Conflict monitoring failed:", error);
      throw error;
    }
  },
});