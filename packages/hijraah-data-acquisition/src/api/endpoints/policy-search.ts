/**
 * Policy Search API Endpoints
 * 
 * RESTful endpoints for searching immigration policies with AI-enhanced
 * semantic search, filtering, and analysis capabilities.
 */

import type { 
  ApiEndpoint, 
  RequestContext, 
  ApiResponse,
  PolicySearchRequest,
  PolicySearchResponse
} from "../types.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export function createPolicySearchEndpoints(
  supabase: SupabaseClient
): ApiEndpoint[] {
  return [
    // Search policies
    {
      path: "/api/v1/policies/search",
      method: "POST",
      permissions: ["read:policies"],
      rateLimit: {
        requestsPerMinute: 30,
        requestsPerHour: 500,
      },
      validation: {
        body: z.object({
          query: z.string().min(1).max(500),
          filters: z.object({
            countries: z.array(z.string().length(2)).optional(),
            policyTypes: z.array(z.string()).optional(),
            impactLevels: z.array(z.enum(["critical", "high", "medium", "low"])).optional(),
            dateRange: z.object({
              from: z.string().datetime(),
              to: z.string().datetime(),
            }).optional(),
          }).optional(),
          options: z.object({
            limit: z.number().min(1).max(100).default(20),
            offset: z.number().min(0).default(0),
            includeAnalysis: z.boolean().default(false),
            sortBy: z.enum(["relevance", "date", "impact"]).default("relevance"),
          }).optional(),
        }),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { query, filters = {}, options = {} } = params.body;

          // Build search query
          let dbQuery = supabase
            .from("policy_changes")
            .select(`
              id,
              title,
              description,
              country,
              change_type,
              impact_level,
              effective_date,
              source_url,
              confidence,
              detected_at
            `);

          // Apply text search
          if (query) {
            dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
          }

          // Apply filters
          if (filters.countries?.length) {
            dbQuery = dbQuery.in("country", filters.countries);
          }

          if (filters.policyTypes?.length) {
            dbQuery = dbQuery.in("change_type", filters.policyTypes);
          }

          if (filters.impactLevels?.length) {
            dbQuery = dbQuery.in("impact_level", filters.impactLevels);
          }

          if (filters.dateRange) {
            dbQuery = dbQuery
              .gte("effective_date", filters.dateRange.from)
              .lte("effective_date", filters.dateRange.to);
          }

          // Apply sorting
          switch (options.sortBy) {
            case "date":
              dbQuery = dbQuery.order("effective_date", { ascending: false });
              break;
            case "impact":
              dbQuery = dbQuery.order("impact_level", { ascending: false });
              break;
            case "relevance":
            default:
              dbQuery = dbQuery.order("confidence", { ascending: false });
              break;
          }

          // Apply pagination
          dbQuery = dbQuery
            .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1);

          // Execute query
          const { data: policies, error, count } = await dbQuery;

          if (error) {
            throw new Error(`Database query failed: ${error.message}`);
          }

          // Calculate relevance scores using AI
          const resultsWithRelevance = await Promise.all(
            (policies || []).map(async (policy) => {
              const relevanceScore = await calculateRelevanceScore(query, policy);
              
              let analysis;
              if (options.includeAnalysis) {
                analysis = await generatePolicyAnalysis(policy, context);
              }

              return {
                id: policy.id,
                title: policy.title,
                description: policy.description,
                country: policy.country,
                policyType: policy.change_type,
                impactLevel: policy.impact_level,
                effectiveDate: policy.effective_date,
                sourceUrl: policy.source_url,
                confidence: policy.confidence,
                relevanceScore,
                analysis,
              };
            })
          );

          // Sort by relevance if requested
          if (options.sortBy === "relevance") {
            resultsWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore);
          }

          // Get total count for pagination
          const { count: totalCount } = await supabase
            .from("policy_changes")
            .select("*", { count: "exact", head: true });

          const response: PolicySearchResponse = {
            results: resultsWithRelevance,
            pagination: {
              total: totalCount || 0,
              limit: options.limit || 20,
              offset: options.offset || 0,
              hasMore: (options.offset || 0) + (options.limit || 20) < (totalCount || 0),
            },
          };

          return {
            success: true,
            data: response,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Policy search error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Policy search failed",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Get policy by ID
    {
      path: "/api/v1/policies/:id",
      method: "GET",
      permissions: ["read:policies"],
      validation: {
        params: z.object({
          id: z.string().uuid(),
        }),
        query: z.object({
          includeAnalysis: z.coerce.boolean().default(false),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { id } = params.params;
          const { includeAnalysis = false } = params.query || {};

          // Get policy
          const { data: policy, error } = await supabase
            .from("policy_changes")
            .select("*")
            .eq("id", id)
            .single();

          if (error || !policy) {
            return {
              success: false,
              error: "Policy not found",
              metadata: {
                timestamp: context.timestamp.toISOString(),
                requestId: context.requestId,
                version: "1.0.0",
                processingTime: Date.now() - context.timestamp.getTime(),
              },
            };
          }

          let analysis;
          if (includeAnalysis) {
            analysis = await generatePolicyAnalysis(policy, context);
          }

          const result = {
            id: policy.id,
            title: policy.title,
            description: policy.description,
            country: policy.country,
            policyType: policy.change_type,
            impactLevel: policy.impact_level,
            effectiveDate: policy.effective_date,
            sourceUrl: policy.source_url,
            confidence: policy.confidence,
            relevanceScore: 1.0, // Full relevance for direct access
            analysis,
          };

          return {
            success: true,
            data: result,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Policy get error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get policy",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Get policy changes by country
    {
      path: "/api/v1/policies/changes/:country",
      method: "GET",
      permissions: ["read:policies"],
      validation: {
        params: z.object({
          country: z.string().length(2),
        }),
        query: z.object({
          since: z.string().datetime().optional(),
          limit: z.coerce.number().min(1).max(100).default(20),
          offset: z.coerce.number().min(0).default(0),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { country } = params.params;
          const { since, limit = 20, offset = 0 } = params.query || {};

          let query = supabase
            .from("policy_changes")
            .select("*")
            .eq("country", country.toUpperCase())
            .order("detected_at", { ascending: false });

          if (since) {
            query = query.gte("detected_at", since);
          }

          query = query.range(offset, offset + limit - 1);

          const { data: changes, error } = await query;

          if (error) {
            throw new Error(`Database query failed: ${error.message}`);
          }

          const results = (changes || []).map(change => ({
            id: change.id,
            title: change.title,
            description: change.description,
            country: change.country,
            policyType: change.change_type,
            impactLevel: change.impact_level,
            effectiveDate: change.effective_date,
            sourceUrl: change.source_url,
            confidence: change.confidence,
            relevanceScore: 1.0,
            detectedAt: change.detected_at,
          }));

          return {
            success: true,
            data: {
              country,
              changes: results,
              total: results.length,
            },
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Policy changes error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get policy changes",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },

    // Get policy statistics
    {
      path: "/api/v1/policies/stats",
      method: "GET",
      permissions: ["read:policies"],
      validation: {
        query: z.object({
          timeRange: z.enum(["7d", "30d", "90d", "1y"]).default("30d"),
          countries: z.array(z.string().length(2)).optional(),
        }).optional(),
      },
      handler: async (context: RequestContext, params: any): Promise<ApiResponse> => {
        try {
          const { timeRange = "30d", countries } = params.query || {};

          // Calculate date range
          const now = new Date();
          const daysBack = {
            "7d": 7,
            "30d": 30,
            "90d": 90,
            "1y": 365,
          }[timeRange];

          const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

          let query = supabase
            .from("policy_changes")
            .select("country, change_type, impact_level, detected_at")
            .gte("detected_at", startDate.toISOString());

          if (countries?.length) {
            query = query.in("country", countries);
          }

          const { data: changes, error } = await query;

          if (error) {
            throw new Error(`Database query failed: ${error.message}`);
          }

          // Calculate statistics
          const stats = {
            totalChanges: changes?.length || 0,
            byCountry: {} as Record<string, number>,
            byType: {} as Record<string, number>,
            byImpact: {} as Record<string, number>,
            timeline: [] as Array<{ date: string; count: number }>,
          };

          changes?.forEach(change => {
            // By country
            stats.byCountry[change.country] = (stats.byCountry[change.country] || 0) + 1;
            
            // By type
            stats.byType[change.change_type] = (stats.byType[change.change_type] || 0) + 1;
            
            // By impact
            stats.byImpact[change.impact_level] = (stats.byImpact[change.impact_level] || 0) + 1;
          });

          return {
            success: true,
            data: stats,
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        } catch (error) {
          console.error("Policy stats error:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get policy statistics",
            metadata: {
              timestamp: context.timestamp.toISOString(),
              requestId: context.requestId,
              version: "1.0.0",
              processingTime: Date.now() - context.timestamp.getTime(),
            },
          };
        }
      },
    },
  ];
}

// Helper function to calculate relevance score
async function calculateRelevanceScore(query: string, policy: any): Promise<number> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: "Calculate the relevance score between a search query and a policy document. Return a score between 0 and 1.",
      prompt: `
Query: "${query}"

Policy:
Title: ${policy.title}
Description: ${policy.description}
Type: ${policy.change_type}
Impact: ${policy.impact_level}

Calculate relevance score (0-1):
      `,
      schema: z.object({
        score: z.number().min(0).max(1),
        reasoning: z.string(),
      }),
    });

    return object.score;
  } catch (error) {
    console.error("Relevance calculation error:", error);
    return 0.5; // Default relevance
  }
}

// Helper function to generate policy analysis
async function generatePolicyAnalysis(policy: any, context: RequestContext): Promise<any> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: "Analyze an immigration policy change and provide structured insights.",
      prompt: `
Analyze this immigration policy change:

Title: ${policy.title}
Description: ${policy.description}
Country: ${policy.country}
Type: ${policy.change_type}
Impact Level: ${policy.impact_level}
Effective Date: ${policy.effective_date}

Provide analysis:
      `,
      schema: z.object({
        summary: z.string(),
        keyChanges: z.array(z.string()),
        affectedCategories: z.array(z.string()),
        recommendations: z.array(z.string()),
        potentialImpact: z.object({
          positive: z.array(z.string()),
          negative: z.array(z.string()),
          neutral: z.array(z.string()),
        }),
        timeline: z.string().optional(),
        relatedPolicies: z.array(z.string()).optional(),
      }),
    });

    // Record AI usage
    await recordAiUsage(context, "policy_analysis", 1500);

    return object;
  } catch (error) {
    console.error("Policy analysis error:", error);
    return {
      summary: "Analysis unavailable",
      keyChanges: [],
      affectedCategories: [],
      recommendations: [],
    };
  }
}

// Helper function to record AI usage
async function recordAiUsage(
  context: RequestContext,
  operation: string,
  tokensUsed: number
): Promise<void> {
  // This would be implemented to track AI usage
  // For now, it's a placeholder
  console.log(`AI usage: ${operation} - ${tokensUsed} tokens`);
}