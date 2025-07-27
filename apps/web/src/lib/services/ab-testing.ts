import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { Redis } from "@upstash/redis";
import EventEmitter from "events";

// Context7 Pattern: Type-safe A/B testing definitions
export interface ABTest {
  id: string;
  name: string;
  description: string;
  type: "prompt" | "model" | "retrieval" | "generation" | "hybrid";
  status: "draft" | "running" | "paused" | "completed" | "archived";
  variants: ABTestVariant[];
  configuration: ABTestConfiguration;
  results: ABTestResults;
  metadata: ABTestMetadata;
  createdAt: string;
  createdBy: string;
  startedAt?: string;
  endedAt?: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  config: VariantConfiguration;
  allocation: number; // Percentage of traffic (0-100)
  isControl: boolean;
  status: "active" | "paused" | "disabled";
  metrics: VariantMetrics;
}

export interface VariantConfiguration {
  prompts?: {
    system?: string;
    user?: string;
    assistant?: string;
    retrieval?: string;
    generation?: string;
  };
  model?: {
    name: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
  retrieval?: {
    chunkSize: number;
    overlap: number;
    topK: number;
    threshold: number;
    strategy: "semantic" | "hybrid" | "keyword" | "rerank";
  };
  generation?: {
    strategy: "standard" | "cot" | "self_consistency" | "react";
    maxIterations: number;
    confidence_threshold: number;
  };
}

export interface ABTestConfiguration {
  targetMetrics: string[];
  successCriteria: SuccessCriteria;
  sampleSize: {
    minimum: number;
    maximum: number;
    confidenceLevel: number;
    power: number;
  };
  duration: {
    minDays: number;
    maxDays: number;
    endConditions: string[];
  };
  trafficSplit: {
    strategy: "equal" | "weighted" | "adaptive" | "thompson_sampling";
    allocation: Record<string, number>;
  };
  segmentation: {
    userTypes?: string[];
    geographies?: string[];
    timeWindows?: string[];
    queryTypes?: string[];
  };
}

export interface SuccessCriteria {
  primaryMetric: string;
  secondaryMetrics: string[];
  minimumEffect: number;
  significanceLevel: number;
  practicalSignificance: number;
  winConditions: WinCondition[];
}

export interface WinCondition {
  metric: string;
  operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
  value: number;
  confidence: number;
}

export interface ABTestResults {
  status: "collecting" | "analyzing" | "conclusive" | "inconclusive";
  summary: ResultSummary;
  variants: Record<string, VariantResults>;
  statistics: StatisticalAnalysis;
  recommendations: Recommendation[];
  timeline: TimelineEvent[];
}

export interface ResultSummary {
  totalSessions: number;
  totalQueries: number;
  duration: number;
  winnerVariant?: string;
  confidence: number;
  effect_size: number;
  statistical_significance: boolean;
  practical_significance: boolean;
}

export interface VariantResults {
  sessions: number;
  queries: number;
  conversionRate: number;
  avgResponseTime: number;
  userSatisfaction: number;
  taskCompletion: number;
  errorRate: number;
  bounceRate: number;
  customMetrics: Record<string, number>;
}

export interface VariantMetrics {
  impressions: number;
  conversions: number;
  conversionRate: number;
  avgResponseTime: number;
  satisfaction: number;
  errors: number;
  bounces: number;
  revenue?: number;
}

export interface StatisticalAnalysis {
  pValue: number;
  confidence_interval: [number, number];
  effect_size: number;
  power: number;
  bayesian_probability: number;
  credible_interval: [number, number];
  sample_ratio_mismatch: boolean;
}

export interface Recommendation {
  type: "winner" | "continue" | "stop" | "modify";
  variant?: string;
  confidence: number;
  reasoning: string;
  next_actions: string[];
  risk_assessment: RiskAssessment;
}

export interface RiskAssessment {
  level: "low" | "medium" | "high" | "critical";
  factors: string[];
  mitigation: string[];
  estimated_impact: number;
}

export interface TimelineEvent {
  timestamp: string;
  type:
    | "started"
    | "variant_added"
    | "traffic_changed"
    | "milestone"
    | "ended"
    | "issue";
  description: string;
  data?: Record<string, any>;
}

export interface ABTestMetadata {
  tags: string[];
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  stakeholders: string[];
  hypothesis: string;
  learnings: string[];
  follow_up_tests: string[];
}

// Context7 Pattern: Event-driven A/B testing with typed events
export interface ABTestingEvents {
  "test:started": (test: ABTest) => void;
  "test:ended": (test: ABTest, results: ABTestResults) => void;
  "variant:assigned": (
    userId: string,
    testId: string,
    variantId: string
  ) => void;
  "metric:recorded": (
    testId: string,
    variantId: string,
    metric: string,
    value: number
  ) => void;
  "milestone:reached": (testId: string, milestone: string) => void;
  "significance:achieved": (
    testId: string,
    metric: string,
    confidence: number
  ) => void;
  "issue:detected": (testId: string, issue: string) => void;
}

// Context7 Pattern: Resource pooling and connection management
export class ABTestingService extends EventEmitter {
  private static instance: ABTestingService;
  private supabase = createSupabaseClient("service");
  private redis?: Redis;
  private testCache = new Map<string, ABTest>();
  private assignmentCache = new Map<string, string>(); // userId -> variantId
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes

  static getInstance(): ABTestingService {
    if (!ABTestingService.instance) {
      ABTestingService.instance = new ABTestingService();
    }
    return ABTestingService.instance;
  }

  constructor() {
    super();
    this.setupRedis();
    this.startStatisticalAnalysis();
  }

  private setupRedis(): void {
    if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });
    }
  }

  // Context7 Pattern: Background statistical analysis
  private startStatisticalAnalysis(): void {
    setInterval(async () => {
      try {
        await this.runStatisticalAnalysis();
      } catch (error) {
        console.error("Statistical analysis error:", error);
      }
    }, 60000); // Every minute
  }

  // Context7 Pattern: Factory method for test creation
  async createTest(
    testConfig: Omit<ABTest, "id" | "status" | "results" | "createdAt">,
    userId: string
  ): Promise<ABTest> {
    try {
      const test: ABTest = {
        ...testConfig,
        id: crypto.randomUUID(),
        status: "draft",
        results: {
          status: "collecting",
          summary: {
            totalSessions: 0,
            totalQueries: 0,
            duration: 0,
            confidence: 0,
            effect_size: 0,
            statistical_significance: false,
            practical_significance: false,
          },
          variants: {},
          statistics: {
            pValue: 1,
            confidence_interval: [0, 0],
            effect_size: 0,
            power: 0,
            bayesian_probability: 0.5,
            credible_interval: [0, 0],
            sample_ratio_mismatch: false,
          },
          recommendations: [],
          timeline: [],
        },
        createdAt: new Date().toISOString(),
        createdBy: userId,
      };

      // Validate test configuration
      this.validateTestConfiguration(test);

      // Store in database
      const { data, error } = await this.supabase
        .from("ab_tests")
        .insert({
          id: test.id,
          name: test.name,
          description: test.description,
          type: test.type,
          status: test.status,
          variants: test.variants,
          configuration: test.configuration,
          results: test.results,
          metadata: test.metadata,
          created_by: test.createdBy,
        })
        .select()
        .single();

      if (error) throw error;

      // Cache the test
      this.testCache.set(test.id, test);

      return test;
    } catch (error) {
      console.error("Failed to create A/B test:", error);
      throw error;
    }
  }

  // Context7 Pattern: Test variant assignment with distribution
  async assignVariant(
    testId: string,
    userId: string,
    sessionId: string,
    context?: Record<string, any>
  ): Promise<ABTestVariant | null> {
    try {
      // Check cache first
      const cacheKey = `${testId}:${userId}`;
      const cachedAssignment = this.assignmentCache.get(cacheKey);

      if (cachedAssignment) {
        const test = await this.getTest(testId);
        const variant = test?.variants.find((v) => v.id === cachedAssignment);
        return variant || null;
      }

      const test = await this.getTest(testId);
      if (!test || test.status !== "running") {
        return null;
      }

      // Check if user is already assigned
      const { data: existingAssignment } = await this.supabase
        .from("ab_test_assignments")
        .select("variant_id")
        .eq("test_id", testId)
        .eq("user_id", userId)
        .single();

      if (existingAssignment) {
        const variant = test.variants.find(
          (v) => v.id === existingAssignment.variant_id
        );
        if (variant) {
          this.assignmentCache.set(cacheKey, variant.id);
          return variant;
        }
      }

      // Assign new variant based on traffic allocation
      const assignedVariant = this.selectVariant(test, userId, context);

      if (assignedVariant) {
        // Store assignment
        await this.supabase.from("ab_test_assignments").insert({
          test_id: testId,
          variant_id: assignedVariant.id,
          user_id: userId,
          session_id: sessionId,
          context: context || {},
          assigned_at: new Date().toISOString(),
        });

        // Cache assignment
        this.assignmentCache.set(cacheKey, assignedVariant.id);

        this.emit("variant:assigned", userId, testId, assignedVariant.id);
        return assignedVariant;
      }

      return null;
    } catch (error) {
      console.error("Failed to assign variant:", error);
      return null;
    }
  }

  // Context7 Pattern: Metric tracking with aggregation
  async recordMetric(
    testId: string,
    variantId: string,
    userId: string,
    metric: string,
    value: number,
    context?: Record<string, any>
  ): Promise<void> {
    try {
      // Store metric event
      await this.supabase.from("ab_test_metrics").insert({
        test_id: testId,
        variant_id: variantId,
        user_id: userId,
        metric_name: metric,
        metric_value: value,
        context: context || {},
        recorded_at: new Date().toISOString(),
      });

      // Update Redis counters for real-time analytics
      if (this.redis) {
        const key = `metrics:${testId}:${variantId}:${metric}`;
        await this.redis.hincrby(key, "count", 1);
        await this.redis.hincrby(key, "sum", value);
        await this.redis.expire(key, 24 * 60 * 60); // 24 hours
      }

      this.emit("metric:recorded", testId, variantId, metric, value);
    } catch (error) {
      console.error("Failed to record metric:", error);
    }
  }

  // Context7 Pattern: Statistical analysis with Bayesian and Frequentist methods
  async getTestResults(testId: string): Promise<ABTestResults | null> {
    try {
      const test = await this.getTest(testId);
      if (!test) return null;

      // Get aggregated metrics for all variants
      const variantResults: Record<string, VariantResults> = {};

      for (const variant of test.variants) {
        const metrics = await this.getVariantMetrics(testId, variant.id);
        variantResults[variant.id] = metrics;
      }

      // Run statistical analysis
      const statistics = await this.calculateStatistics(test, variantResults);

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        test,
        variantResults,
        statistics
      );

      // Update results summary
      const summary = this.calculateSummary(test, variantResults, statistics);

      const results: ABTestResults = {
        status: this.determineResultStatus(statistics, test.configuration),
        summary,
        variants: variantResults,
        statistics,
        recommendations,
        timeline: test.results.timeline,
      };

      // Update test in database
      await this.supabase.from("ab_tests").update({ results }).eq("id", testId);

      return results;
    } catch (error) {
      console.error("Failed to get test results:", error);
      return null;
    }
  }

  // Context7 Pattern: Adaptive traffic allocation
  async updateTrafficAllocation(
    testId: string,
    allocation: Record<string, number>,
    strategy:
      | "equal"
      | "weighted"
      | "adaptive"
      | "thompson_sampling" = "weighted"
  ): Promise<void> {
    try {
      const test = await this.getTest(testId);
      if (!test) throw new Error("Test not found");

      // Validate allocation sums to 100
      const totalAllocation = Object.values(allocation).reduce(
        (sum, val) => sum + val,
        0
      );
      if (Math.abs(totalAllocation - 100) > 0.01) {
        throw new Error("Traffic allocation must sum to 100%");
      }

      // Update variant allocations
      const updatedVariants = test.variants.map((variant) => ({
        ...variant,
        allocation: allocation[variant.id] || 0,
      }));

      const updatedConfiguration = {
        ...test.configuration,
        trafficSplit: {
          strategy,
          allocation,
        },
      };

      // Update in database
      await this.supabase
        .from("ab_tests")
        .update({
          variants: updatedVariants,
          configuration: updatedConfiguration,
        })
        .eq("id", testId);

      // Update cache
      const updatedTest = {
        ...test,
        variants: updatedVariants,
        configuration: updatedConfiguration,
      };
      this.testCache.set(testId, updatedTest);

      // Record timeline event
      await this.recordTimelineEvent(
        testId,
        "traffic_changed",
        "Traffic allocation updated",
        { allocation }
      );
    } catch (error) {
      console.error("Failed to update traffic allocation:", error);
      throw error;
    }
  }

  // Context7 Pattern: Test lifecycle management
  async startTest(testId: string): Promise<void> {
    try {
      const test = await this.getTest(testId);
      if (!test) throw new Error("Test not found");

      if (test.status !== "draft") {
        throw new Error("Only draft tests can be started");
      }

      // Final validation
      this.validateTestConfiguration(test);

      // Update status
      await this.supabase
        .from("ab_tests")
        .update({
          status: "running",
          started_at: new Date().toISOString(),
        })
        .eq("id", testId);

      // Update cache
      const updatedTest = {
        ...test,
        status: "running" as const,
        startedAt: new Date().toISOString(),
      };
      this.testCache.set(testId, updatedTest);

      // Record timeline event
      await this.recordTimelineEvent(testId, "started", "Test started");

      this.emit("test:started", updatedTest);
    } catch (error) {
      console.error("Failed to start test:", error);
      throw error;
    }
  }

  async stopTest(testId: string, reason?: string): Promise<void> {
    try {
      const test = await this.getTest(testId);
      if (!test) throw new Error("Test not found");

      // Get final results
      const finalResults = await this.getTestResults(testId);

      // Update status
      await this.supabase
        .from("ab_tests")
        .update({
          status: "completed",
          ended_at: new Date().toISOString(),
          results: finalResults,
        })
        .eq("id", testId);

      // Update cache
      const updatedTest = {
        ...test,
        status: "completed" as const,
        endedAt: new Date().toISOString(),
        results: finalResults || test.results,
      };
      this.testCache.set(testId, updatedTest);

      // Record timeline event
      await this.recordTimelineEvent(
        testId,
        "ended",
        reason || "Test manually stopped"
      );

      this.emit("test:ended", updatedTest, finalResults || test.results);
    } catch (error) {
      console.error("Failed to stop test:", error);
      throw error;
    }
  }

  // Context7 Pattern: Variant selection with multiple strategies
  private selectVariant(
    test: ABTest,
    userId: string,
    context?: Record<string, any>
  ): ABTestVariant | null {
    const activeVariants = test.variants.filter((v) => v.status === "active");
    if (activeVariants.length === 0) return null;

    switch (test.configuration.trafficSplit.strategy) {
      case "equal":
        return this.selectEqualVariant(activeVariants, userId);
      case "weighted":
        return this.selectWeightedVariant(activeVariants, userId);
      case "adaptive":
        return this.selectAdaptiveVariant(activeVariants, userId, test);
      case "thompson_sampling":
        return this.selectThompsonSamplingVariant(activeVariants, userId, test);
      default:
        return this.selectEqualVariant(activeVariants, userId);
    }
  }

  private selectEqualVariant(
    variants: ABTestVariant[],
    userId: string
  ): ABTestVariant {
    const hash = this.hashUserId(userId);
    const index = hash % variants.length;
    return variants[index];
  }

  private selectWeightedVariant(
    variants: ABTestVariant[],
    userId: string
  ): ABTestVariant {
    const hash = this.hashUserId(userId);
    const random = (hash % 10000) / 10000; // 0 to 1

    let cumulative = 0;
    for (const variant of variants) {
      cumulative += variant.allocation / 100;
      if (random <= cumulative) {
        return variant;
      }
    }

    return variants[variants.length - 1]; // Fallback
  }

  private selectAdaptiveVariant(
    variants: ABTestVariant[],
    userId: string,
    test: ABTest
  ): ABTestVariant {
    // Simplified adaptive selection - in production, would use more sophisticated algorithms
    const bestPerforming = variants.reduce((best, current) =>
      current.metrics.conversionRate > best.metrics.conversionRate
        ? current
        : best
    );

    // 70% to best performing, 30% equal among others
    const hash = this.hashUserId(userId);
    const random = (hash % 100) / 100;

    if (random < 0.7) {
      return bestPerforming;
    } else {
      return (
        this.selectEqualVariant(
          variants.filter((v) => v.id !== bestPerforming.id),
          userId
        ) || bestPerforming
      );
    }
  }

  private selectThompsonSamplingVariant(
    variants: ABTestVariant[],
    userId: string,
    test: ABTest
  ): ABTestVariant {
    // Simplified Thompson Sampling - would implement proper Beta distribution sampling
    const samples = variants.map((variant) => {
      const alpha = variant.metrics.conversions + 1;
      const beta =
        variant.metrics.impressions - variant.metrics.conversions + 1;
      // Simplified sampling - use mean of beta distribution
      return { variant, sample: alpha / (alpha + beta) };
    });

    const bestSample = samples.reduce((best, current) =>
      current.sample > best.sample ? current : best
    );

    return bestSample.variant;
  }

  // Context7 Pattern: Helper methods
  private async getTest(testId: string): Promise<ABTest | null> {
    const cached = this.testCache.get(testId);
    if (cached) return cached;

    const { data, error } = await this.supabase
      .from("ab_tests")
      .select("*")
      .eq("id", testId)
      .single();

    if (error) return null;

    const test: ABTest = {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      status: data.status,
      variants: data.variants,
      configuration: data.configuration,
      results: data.results,
      metadata: data.metadata,
      createdAt: data.created_at,
      createdBy: data.created_by,
      startedAt: data.started_at,
      endedAt: data.ended_at,
    };

    this.testCache.set(testId, test);
    return test;
  }

  private async getVariantMetrics(
    testId: string,
    variantId: string
  ): Promise<VariantResults> {
    const { data } = await this.supabase.rpc("get_variant_metrics", {
      p_test_id: testId,
      p_variant_id: variantId,
    });

    return (
      data || {
        sessions: 0,
        queries: 0,
        conversionRate: 0,
        avgResponseTime: 0,
        userSatisfaction: 0,
        taskCompletion: 0,
        errorRate: 0,
        bounceRate: 0,
        customMetrics: {},
      }
    );
  }

  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private validateTestConfiguration(test: ABTest): void {
    if (test.variants.length < 2) {
      throw new Error("Test must have at least 2 variants");
    }

    const totalAllocation = test.variants.reduce(
      (sum, v) => sum + v.allocation,
      0
    );
    if (Math.abs(totalAllocation - 100) > 0.01) {
      throw new Error("Variant allocations must sum to 100%");
    }

    const controlVariants = test.variants.filter((v) => v.isControl);
    if (controlVariants.length !== 1) {
      throw new Error("Test must have exactly one control variant");
    }
  }

  private async calculateStatistics(
    test: ABTest,
    variantResults: Record<string, VariantResults>
  ): Promise<StatisticalAnalysis> {
    // Simplified statistical analysis - would implement proper statistical tests
    const control = test.variants.find((v) => v.isControl);
    if (!control) throw new Error("No control variant found");

    const controlResults = variantResults[control.id];
    const testVariants = test.variants.filter((v) => !v.isControl);

    // Calculate t-test for primary metric (conversion rate)
    let maxEffectSize = 0;
    let minPValue = 1;

    testVariants.forEach((variant) => {
      const variantResults_ = variantResults[variant.id];
      const effectSize =
        variantResults_.conversionRate - controlResults.conversionRate;
      maxEffectSize = Math.max(maxEffectSize, Math.abs(effectSize));

      // Simplified p-value calculation
      const pooledRate =
        (controlResults.conversions + variantResults_.conversions) /
        (controlResults.sessions + variantResults_.sessions);
      const se = Math.sqrt(
        pooledRate *
          (1 - pooledRate) *
          (1 / controlResults.sessions + 1 / variantResults_.sessions)
      );
      const zScore = effectSize / se;
      const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));

      minPValue = Math.min(minPValue, pValue);
    });

    return {
      pValue: minPValue,
      confidence_interval: [maxEffectSize - 0.05, maxEffectSize + 0.05], // Simplified
      effect_size: maxEffectSize,
      power: 0.8, // Simplified
      bayesian_probability: minPValue < 0.05 ? 0.95 : 0.5, // Simplified
      credible_interval: [maxEffectSize - 0.05, maxEffectSize + 0.05], // Simplified
      sample_ratio_mismatch: false, // Would implement SRM detection
    };
  }

  private normalCDF(x: number): number {
    // Simplified normal CDF approximation
    return (
      0.5 * (1 + Math.sign(x) * Math.sqrt(1 - Math.exp((-2 * x * x) / Math.PI)))
    );
  }

  private generateRecommendations(
    test: ABTest,
    variantResults: Record<string, VariantResults>,
    statistics: StatisticalAnalysis
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (
      statistics.pValue < test.configuration.successCriteria.significanceLevel
    ) {
      const bestVariant = Object.entries(variantResults).reduce(
        (best, [id, results]) =>
          results.conversionRate > best[1].conversionRate ? [id, results] : best
      );

      recommendations.push({
        type: "winner",
        variant: bestVariant[0],
        confidence: 1 - statistics.pValue,
        reasoning: `Variant ${bestVariant[0]} shows statistically significant improvement`,
        next_actions: [
          "Deploy winning variant",
          "Monitor performance",
          "Document learnings",
        ],
        risk_assessment: {
          level: "low",
          factors: ["Statistical significance achieved"],
          mitigation: ["Gradual rollout", "Monitoring"],
          estimated_impact: statistics.effect_size,
        },
      });
    } else if (statistics.pValue < 0.2) {
      recommendations.push({
        type: "continue",
        confidence: 0.7,
        reasoning: "Test shows promise but needs more data",
        next_actions: [
          "Continue test",
          "Monitor sample size",
          "Check for external factors",
        ],
        risk_assessment: {
          level: "medium",
          factors: ["Insufficient sample size"],
          mitigation: ["Extended test duration"],
          estimated_impact: statistics.effect_size,
        },
      });
    } else {
      recommendations.push({
        type: "stop",
        confidence: 0.8,
        reasoning: "No significant difference detected",
        next_actions: [
          "Stop test",
          "Analyze learnings",
          "Design new hypothesis",
        ],
        risk_assessment: {
          level: "low",
          factors: ["No clear winner"],
          mitigation: ["Keep current implementation"],
          estimated_impact: 0,
        },
      });
    }

    return recommendations;
  }

  private calculateSummary(
    test: ABTest,
    variantResults: Record<string, VariantResults>,
    statistics: StatisticalAnalysis
  ): ResultSummary {
    const totalSessions = Object.values(variantResults).reduce(
      (sum, r) => sum + r.sessions,
      0
    );
    const totalQueries = Object.values(variantResults).reduce(
      (sum, r) => sum + r.queries,
      0
    );

    const bestVariant = Object.entries(variantResults).reduce(
      (best, [id, results]) =>
        results.conversionRate > best[1].conversionRate ? [id, results] : best
    );

    return {
      totalSessions,
      totalQueries,
      duration: test.startedAt
        ? Date.now() - new Date(test.startedAt).getTime()
        : 0,
      winnerVariant:
        statistics.pValue < test.configuration.successCriteria.significanceLevel
          ? bestVariant[0]
          : undefined,
      confidence: 1 - statistics.pValue,
      effect_size: statistics.effect_size,
      statistical_significance:
        statistics.pValue <
        test.configuration.successCriteria.significanceLevel,
      practical_significance:
        statistics.effect_size >
        test.configuration.successCriteria.practicalSignificance,
    };
  }

  private determineResultStatus(
    statistics: StatisticalAnalysis,
    config: ABTestConfiguration
  ): ABTestResults["status"] {
    if (statistics.pValue < config.successCriteria.significanceLevel) {
      return "conclusive";
    } else if (statistics.pValue < 0.2) {
      return "analyzing";
    } else {
      return "inconclusive";
    }
  }

  private async recordTimelineEvent(
    testId: string,
    type: TimelineEvent["type"],
    description: string,
    data?: Record<string, any>
  ): Promise<void> {
    const event: TimelineEvent = {
      timestamp: new Date().toISOString(),
      type,
      description,
      data,
    };

    await this.supabase.from("ab_test_timeline").insert({
      test_id: testId,
      event_type: type,
      description,
      event_data: data || {},
      timestamp: event.timestamp,
    });
  }

  private async runStatisticalAnalysis(): Promise<void> {
    try {
      const { data: runningTests } = await this.supabase
        .from("ab_tests")
        .select("id")
        .eq("status", "running");

      if (!runningTests) return;

      for (const test of runningTests) {
        const results = await this.getTestResults(test.id);

        if (results?.statistics.pValue && results.statistics.pValue < 0.05) {
          this.emit(
            "significance:achieved",
            test.id,
            "conversion_rate",
            1 - results.statistics.pValue
          );
        }
      }
    } catch (error) {
      console.error("Statistical analysis error:", error);
    }
  }

  // Context7 Pattern: Resource cleanup
  cleanup(): void {
    this.testCache.clear();
    this.assignmentCache.clear();
    this.removeAllListeners();
  }
}
