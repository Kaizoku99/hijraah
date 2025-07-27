import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { Redis } from "@upstash/redis";
import EventEmitter from "events";

// Context7 Pattern: Type-safe analytics definitions
export interface RAGMetrics {
  totalQueries: number;
  avgResponseTime: number;
  successRate: number;
  uniqueUsers: number;
  topSources: Array<{ url: string; hits: number; confidence: number }>;
  queryTypes: Array<{ category: string; count: number; percentage: number }>;
  performanceMetrics: {
    cachehitRate: number;
    avgRetrievalTime: number;
    avgGenerationTime: number;
    errorRate: number;
  };
  userEngagement: {
    avgQueriesPerUser: number;
    avgSessionDuration: number;
    returnUserRate: number;
    feedbackScore: number;
  };
}

export interface UsageTimeSeries {
  timestamp: string;
  queries: number;
  users: number;
  responseTime: number;
  successRate: number;
  cacheHitRate: number;
}

export interface UserAnalytics {
  userId: string;
  totalQueries: number;
  avgResponseTime: number;
  favoriteTopics: string[];
  engagementScore: number;
  lastActivity: string;
  feedbackGiven: number;
  successfulQueries: number;
}

export interface DocumentAnalytics {
  documentId: string;
  title: string;
  retrievalCount: number;
  avgRelevanceScore: number;
  lastAccessed: string;
  topQueries: string[];
  userFeedback: number;
  processingTime: number;
}

// Context7 Pattern: Event-driven analytics with typed events
export interface AnalyticsEvents {
  "metrics:updated": (metrics: RAGMetrics) => void;
  "query:executed": (queryData: QueryEvent) => void;
  "user:active": (userId: string) => void;
  "document:accessed": (documentId: string) => void;
  "performance:alert": (alert: PerformanceAlert) => void;
  "cache:stats": (stats: CacheStats) => void;
}

export interface QueryEvent {
  id: string;
  userId: string;
  query: string;
  responseTime: number;
  success: boolean;
  documentsRetrieved: number;
  cacheHit: boolean;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface PerformanceAlert {
  type:
    | "slow_query"
    | "high_error_rate"
    | "cache_miss_spike"
    | "resource_exhaustion";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  metric: string;
  value: number;
  threshold: number;
  timestamp: string;
}

export interface CacheStats {
  hitRate: number;
  missRate: number;
  totalRequests: number;
  avgResponseTime: number;
  memoryUsage: number;
}

// Context7 Pattern: Resource pooling and connection management
export class AnalyticsService extends EventEmitter {
  private static instance: AnalyticsService;
  private supabase = createSupabaseClient("service");
  private redis?: Redis;
  private metricsCache = new Map<string, any>();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes
  private performanceThresholds = {
    responseTime: 2000, // 2 seconds
    errorRate: 0.05, // 5%
    cacheHitRate: 0.8, // 80%
  };

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  constructor() {
    super();
    this.setupRedis();
    this.startPerformanceMonitoring();
  }

  private setupRedis(): void {
    if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });
    }
  }

  // Context7 Pattern: Health monitoring with circuit breaker
  private startPerformanceMonitoring(): void {
    setInterval(async () => {
      try {
        await this.checkPerformanceAlerts();
      } catch (error) {
        console.error("Performance monitoring error:", error);
      }
    }, 60000); // Check every minute
  }

  // Context7 Pattern: Factory method for analytics aggregation
  async getRAGMetrics(
    timeRange: "1h" | "24h" | "7d" | "30d" = "24h",
  ): Promise<RAGMetrics> {
    const cacheKey = `rag_metrics_${timeRange}`;
    const cached = this.metricsCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const timeFilter = this.getTimeFilter(timeRange);

      // Parallel queries for better performance
      const [
        queryStats,
        userStats,
        sourceStats,
        performanceStats,
        engagementStats,
      ] = await Promise.all([
        this.getQueryStatistics(timeFilter),
        this.getUserStatistics(timeFilter),
        this.getSourceStatistics(timeFilter),
        this.getPerformanceStatistics(timeFilter),
        this.getEngagementStatistics(timeFilter),
      ]);

      const metrics: RAGMetrics = {
        totalQueries: queryStats.total,
        avgResponseTime: queryStats.avgResponseTime,
        successRate: queryStats.successRate,
        uniqueUsers: userStats.uniqueUsers,
        topSources: sourceStats.topSources,
        queryTypes: queryStats.categories,
        performanceMetrics: performanceStats,
        userEngagement: engagementStats,
      };

      // Cache the result
      this.metricsCache.set(cacheKey, {
        data: metrics,
        timestamp: Date.now(),
      });

      this.emit("metrics:updated", metrics);
      return metrics;
    } catch (error) {
      console.error("Failed to get RAG metrics:", error);
      throw error;
    }
  }

  // Context7 Pattern: Time series data with aggregation
  async getUsageTimeSeries(
    timeRange: "1h" | "24h" | "7d" | "30d" = "24h",
    granularity: "minute" | "hour" | "day" = "hour",
  ): Promise<UsageTimeSeries[]> {
    const cacheKey = `usage_timeseries_${timeRange}_${granularity}`;

    try {
      const timeFilter = this.getTimeFilter(timeRange);
      const { data, error } = await this.supabase.rpc("get_usage_timeseries", {
        p_start_time: timeFilter.start,
        p_end_time: timeFilter.end,
        p_granularity: granularity,
      });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Failed to get usage time series:", error);
      return [];
    }
  }

  // Context7 Pattern: User analytics with personalization
  async getUserAnalytics(
    userId?: string,
    limit = 100,
  ): Promise<UserAnalytics[]> {
    try {
      let query = this.supabase
        .from("user_query_history")
        .select(
          `
          user_id,
          query_text,
          created_at,
          feedback_score,
          query_metadata,
          response
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit * 10); // Get more data for aggregation

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Aggregate user analytics
      const userMap = new Map<string, any>();

      data?.forEach((record) => {
        const user = userMap.get(record.user_id) || {
          userId: record.user_id,
          totalQueries: 0,
          avgResponseTime: 0,
          favoriteTopics: [],
          engagementScore: 0,
          lastActivity: record.created_at,
          feedbackGiven: 0,
          successfulQueries: 0,
          responseTimes: [],
        };

        user.totalQueries++;
        user.lastActivity = record.created_at;

        if (record.feedback_score) {
          user.feedbackGiven++;
          user.engagementScore += record.feedback_score;
        }

        if (record.response) {
          user.successfulQueries++;
        }

        // Extract topics from query metadata
        if (record.query_metadata?.category) {
          user.favoriteTopics.push(record.query_metadata.category);
        }

        userMap.set(record.user_id, user);
      });

      // Calculate final metrics
      return Array.from(userMap.values())
        .map((user) => ({
          ...user,
          avgResponseTime:
            user.responseTimes.length > 0
              ? user.responseTimes.reduce((a: number, b: number) => a + b, 0) /
                user.responseTimes.length
              : 0,
          engagementScore:
            user.feedbackGiven > 0
              ? user.engagementScore / user.feedbackGiven
              : 0,
          favoriteTopics: this.getTopItems(user.favoriteTopics, 5),
        }))
        .slice(0, limit);
    } catch (error) {
      console.error("Failed to get user analytics:", error);
      return [];
    }
  }

  // Context7 Pattern: Document performance analytics
  async getDocumentAnalytics(limit = 50): Promise<DocumentAnalytics[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        "get_document_analytics",
        {
          p_limit: limit,
        },
      );

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to get document analytics:", error);
      return [];
    }
  }

  // Context7 Pattern: Real-time event tracking
  async trackQueryEvent(
    event: Omit<QueryEvent, "id" | "timestamp">,
  ): Promise<void> {
    const queryEvent: QueryEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    try {
      // Store in database
      await this.supabase.from("rag_query_logs").insert({
        id: queryEvent.id,
        user_id: queryEvent.userId,
        query_text: queryEvent.query,
        response_time_ms: queryEvent.responseTime,
        success: queryEvent.success,
        documents_retrieved: queryEvent.documentsRetrieved,
        cache_hit: queryEvent.cacheHit,
        metadata: queryEvent.metadata,
        created_at: queryEvent.timestamp,
      });

      // Cache in Redis for real-time analytics
      if (this.redis) {
        await this.redis.lpush("recent_queries", JSON.stringify(queryEvent));
        await this.redis.ltrim("recent_queries", 0, 999); // Keep last 1000
      }

      // Check for performance alerts
      await this.checkQueryPerformance(queryEvent);

      this.emit("query:executed", queryEvent);
    } catch (error) {
      console.error("Failed to track query event:", error);
    }
  }

  // Context7 Pattern: Performance alerting system
  private async checkPerformanceAlerts(): Promise<void> {
    const recentMetrics = await this.getRecentPerformanceMetrics();

    // Check response time threshold
    if (
      recentMetrics.avgResponseTime > this.performanceThresholds.responseTime
    ) {
      this.emit("performance:alert", {
        type: "slow_query",
        severity: "high",
        message: `Average response time (${recentMetrics.avgResponseTime}ms) exceeds threshold`,
        metric: "response_time",
        value: recentMetrics.avgResponseTime,
        threshold: this.performanceThresholds.responseTime,
        timestamp: new Date().toISOString(),
      });
    }

    // Check error rate threshold
    if (recentMetrics.errorRate > this.performanceThresholds.errorRate) {
      this.emit("performance:alert", {
        type: "high_error_rate",
        severity: "critical",
        message: `Error rate (${(recentMetrics.errorRate * 100).toFixed(1)}%) exceeds threshold`,
        metric: "error_rate",
        value: recentMetrics.errorRate,
        threshold: this.performanceThresholds.errorRate,
        timestamp: new Date().toISOString(),
      });
    }

    // Check cache hit rate threshold
    if (recentMetrics.cacheHitRate < this.performanceThresholds.cacheHitRate) {
      this.emit("performance:alert", {
        type: "cache_miss_spike",
        severity: "medium",
        message: `Cache hit rate (${(recentMetrics.cacheHitRate * 100).toFixed(1)}%) below threshold`,
        metric: "cache_hit_rate",
        value: recentMetrics.cacheHitRate,
        threshold: this.performanceThresholds.cacheHitRate,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private async checkQueryPerformance(event: QueryEvent): Promise<void> {
    if (event.responseTime > this.performanceThresholds.responseTime) {
      this.emit("performance:alert", {
        type: "slow_query",
        severity: "medium",
        message: `Query took ${event.responseTime}ms to execute`,
        metric: "single_query_time",
        value: event.responseTime,
        threshold: this.performanceThresholds.responseTime,
        timestamp: event.timestamp,
      });
    }
  }

  // Context7 Pattern: Helper methods for data aggregation
  private async getQueryStatistics(timeFilter: { start: string; end: string }) {
    const { data, error } = await this.supabase.rpc("get_query_statistics", {
      p_start_time: timeFilter.start,
      p_end_time: timeFilter.end,
    });

    if (error) throw error;

    return {
      total: data?.total_queries || 0,
      avgResponseTime: data?.avg_response_time || 0,
      successRate: data?.success_rate || 0,
      categories: data?.query_categories || [],
    };
  }

  private async getUserStatistics(timeFilter: { start: string; end: string }) {
    const { data, error } = await this.supabase.rpc("get_user_statistics", {
      p_start_time: timeFilter.start,
      p_end_time: timeFilter.end,
    });

    if (error) throw error;

    return {
      uniqueUsers: data?.unique_users || 0,
      newUsers: data?.new_users || 0,
      returningUsers: data?.returning_users || 0,
    };
  }

  private async getSourceStatistics(timeFilter: {
    start: string;
    end: string;
  }) {
    const { data, error } = await this.supabase.rpc("get_source_statistics", {
      p_start_time: timeFilter.start,
      p_end_time: timeFilter.end,
    });

    if (error) throw error;

    return {
      topSources: data?.top_sources || [],
    };
  }

  private async getPerformanceStatistics(timeFilter: {
    start: string;
    end: string;
  }) {
    const { data, error } = await this.supabase.rpc(
      "get_performance_statistics",
      {
        p_start_time: timeFilter.start,
        p_end_time: timeFilter.end,
      },
    );

    if (error) throw error;

    return {
      cachehitRate: data?.cache_hit_rate || 0,
      avgRetrievalTime: data?.avg_retrieval_time || 0,
      avgGenerationTime: data?.avg_generation_time || 0,
      errorRate: data?.error_rate || 0,
    };
  }

  private async getEngagementStatistics(timeFilter: {
    start: string;
    end: string;
  }) {
    const { data, error } = await this.supabase.rpc(
      "get_engagement_statistics",
      {
        p_start_time: timeFilter.start,
        p_end_time: timeFilter.end,
      },
    );

    if (error) throw error;

    return {
      avgQueriesPerUser: data?.avg_queries_per_user || 0,
      avgSessionDuration: data?.avg_session_duration || 0,
      returnUserRate: data?.return_user_rate || 0,
      feedbackScore: data?.avg_feedback_score || 0,
    };
  }

  private async getRecentPerformanceMetrics() {
    const timeFilter = this.getTimeFilter("1h");
    return this.getPerformanceStatistics(timeFilter);
  }

  private getTimeFilter(timeRange: string): { start: string; end: string } {
    const end = new Date();
    let start = new Date();

    switch (timeRange) {
      case "1h":
        start.setHours(start.getHours() - 1);
        break;
      case "24h":
        start.setDate(start.getDate() - 1);
        break;
      case "7d":
        start.setDate(start.getDate() - 7);
        break;
      case "30d":
        start.setDate(start.getDate() - 30);
        break;
    }

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }

  private getTopItems<T>(items: T[], limit: number): T[] {
    const counts = new Map<T, number>();
    items.forEach((item) => {
      counts.set(item, (counts.get(item) || 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([item]) => item);
  }

  // Context7 Pattern: Export functionality
  async exportAnalyticsData(
    format: "json" | "csv" = "json",
    timeRange = "30d",
  ) {
    const metrics = await this.getRAGMetrics(timeRange);
    const timeSeries = await this.getUsageTimeSeries(timeRange);
    const userAnalytics = await this.getUserAnalytics();
    const documentAnalytics = await this.getDocumentAnalytics();

    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        timeRange,
        format,
      },
      metrics,
      timeSeries,
      userAnalytics,
      documentAnalytics,
    };

    if (format === "json") {
      return JSON.stringify(exportData, null, 2);
    }

    // Convert to CSV (simplified)
    return this.convertToCSV(exportData);
  }

  private convertToCSV(data: any): string {
    // Simplified CSV conversion - in production, use proper CSV library
    const headers = Object.keys(data.metrics);
    const rows = [headers.join(",")];
    // Add data rows...
    return rows.join("\n");
  }

  // Context7 Pattern: Resource cleanup
  cleanup(): void {
    this.metricsCache.clear();
    this.removeAllListeners();
  }
}
