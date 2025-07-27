import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { Redis } from "@upstash/redis";
import EventEmitter from "events";

// Context7 Pattern: Type-safe monitoring definitions
export interface MonitoringMetric {
  id: string;
  name: string;
  type: "counter" | "gauge" | "histogram" | "summary";
  description: string;
  labels: Record<string, string>;
  value: number;
  timestamp: string;
  source: string;
  unit?: string;
}

export interface PerformanceTrace {
  id: string;
  operationName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  spans: TraceSpan[];
  status: "running" | "completed" | "failed" | "timeout";
  metadata: Record<string, any>;
  error?: TraceError;
}

export interface TraceSpan {
  id: string;
  parentId?: string;
  operationName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  tags: Record<string, any>;
  logs: TraceLog[];
  status: "running" | "completed" | "failed";
}

export interface TraceLog {
  timestamp: string;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  fields?: Record<string, any>;
}

export interface TraceError {
  message: string;
  stack?: string;
  type: string;
  metadata?: Record<string, any>;
}

export interface Alert {
  id: string;
  name: string;
  description: string;
  condition: AlertCondition;
  status: "firing" | "resolved" | "pending" | "silenced";
  severity: "low" | "medium" | "high" | "critical";
  notifications: AlertNotification[];
  metadata: AlertMetadata;
  createdAt: string;
  firedAt?: string;
  resolvedAt?: string;
}

export interface AlertCondition {
  metric: string;
  operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
  threshold: number;
  duration: string; // e.g., "5m", "1h"
  aggregation: "avg" | "sum" | "min" | "max" | "count" | "rate";
  filters?: Record<string, string>;
}

export interface AlertNotification {
  type: "email" | "slack" | "webhook" | "sms";
  destination: string;
  template?: string;
  enabled: boolean;
}

export interface AlertMetadata {
  tags: string[];
  runbook?: string;
  escalation: string[];
  acknowledged?: {
    by: string;
    at: string;
    reason?: string;
  };
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "down" | "maintenance";
  services: ServiceHealth[];
  dependencies: DependencyHealth[];
  overallScore: number;
  checks: HealthCheck[];
  lastUpdated: string;
}

export interface ServiceHealth {
  name: string;
  status: "healthy" | "degraded" | "down";
  responseTime: number;
  errorRate: number;
  throughput: number;
  availability: number;
  version: string;
  checks: HealthCheck[];
}

export interface DependencyHealth {
  name: string;
  type: "database" | "cache" | "api" | "storage" | "queue";
  status: "healthy" | "degraded" | "down";
  responseTime: number;
  lastChecked: string;
  error?: string;
}

export interface HealthCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  duration: number;
  output?: string;
  error?: string;
  timestamp: string;
}

export interface PerformanceDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  filters: DashboardFilter[];
  timeRange: TimeRange;
  autoRefresh: boolean;
  refreshInterval: number;
}

export interface DashboardWidget {
  id: string;
  type: "chart" | "table" | "stat" | "gauge" | "heatmap" | "text";
  title: string;
  query: MetricQuery;
  config: WidgetConfig;
  position: { x: number; y: number; width: number; height: number };
}

export interface MetricQuery {
  metric: string;
  aggregation: "avg" | "sum" | "min" | "max" | "count" | "rate" | "percentile";
  groupBy?: string[];
  filters?: Record<string, string>;
  timeRange: TimeRange;
  interval?: string;
}

export interface WidgetConfig {
  visualization: string;
  colors?: string[];
  thresholds?: Array<{ value: number; color: string }>;
  unit?: string;
  decimals?: number;
  legend?: boolean;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  padding: number;
}

export interface DashboardFilter {
  name: string;
  type: "select" | "multiselect" | "text" | "date";
  options?: string[];
  defaultValue?: any;
}

export interface TimeRange {
  from: string;
  to: string;
  relative?: string; // e.g., "1h", "24h", "7d"
}

// Context7 Pattern: Event-driven monitoring with typed events
export interface MonitoringEvents {
  "metric:recorded": (metric: MonitoringMetric) => void;
  "trace:started": (trace: PerformanceTrace) => void;
  "trace:completed": (trace: PerformanceTrace) => void;
  "alert:fired": (alert: Alert) => void;
  "alert:resolved": (alert: Alert) => void;
  "health:degraded": (service: string, status: ServiceHealth) => void;
  "performance:anomaly": (
    metric: string,
    value: number,
    expected: number,
  ) => void;
  "error:spike": (service: string, errorRate: number) => void;
}

// Context7 Pattern: Resource pooling and connection management
export class AdvancedMonitoringService extends EventEmitter {
  private static instance: AdvancedMonitoringService;
  private supabase = createSupabaseClient("service");
  private redis?: Redis;
  private metricsBuffer: MonitoringMetric[] = [];
  private activeTraces = new Map<string, PerformanceTrace>();
  private alerts = new Map<string, Alert>();
  private readonly bufferSize = 100;
  private readonly flushInterval = 5000; // 5 seconds

  static getInstance(): AdvancedMonitoringService {
    if (!AdvancedMonitoringService.instance) {
      AdvancedMonitoringService.instance = new AdvancedMonitoringService();
    }
    return AdvancedMonitoringService.instance;
  }

  constructor() {
    super();
    this.setupRedis();
    this.startMetricsCollection();
    this.startHealthChecks();
    this.startAlertEvaluation();
  }

  private setupRedis(): void {
    if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });
    }
  }

  // Context7 Pattern: Background metrics collection and buffering
  private startMetricsCollection(): void {
    setInterval(async () => {
      if (this.metricsBuffer.length > 0) {
        await this.flushMetrics();
      }
    }, this.flushInterval);
  }

  private startHealthChecks(): void {
    setInterval(async () => {
      try {
        await this.performHealthChecks();
      } catch (error) {
        console.error("Health check error:", error);
      }
    }, 30000); // Every 30 seconds
  }

  private startAlertEvaluation(): void {
    setInterval(async () => {
      try {
        await this.evaluateAlerts();
      } catch (error) {
        console.error("Alert evaluation error:", error);
      }
    }, 60000); // Every minute
  }

  // Context7 Pattern: Metric recording with buffering
  recordMetric(
    name: string,
    value: number,
    type: MonitoringMetric["type"] = "gauge",
    labels: Record<string, string> = {},
    unit?: string,
  ): void {
    const metric: MonitoringMetric = {
      id: crypto.randomUUID(),
      name,
      type,
      description: "",
      labels,
      value,
      timestamp: new Date().toISOString(),
      source: "application",
      unit,
    };

    this.metricsBuffer.push(metric);
    this.emit("metric:recorded", metric);

    // Flush if buffer is full
    if (this.metricsBuffer.length >= this.bufferSize) {
      this.flushMetrics();
    }
  }

  // Context7 Pattern: Distributed tracing with span management
  startTrace(
    operationName: string,
    metadata: Record<string, any> = {},
  ): string {
    const trace: PerformanceTrace = {
      id: crypto.randomUUID(),
      operationName,
      startTime: new Date().toISOString(),
      spans: [],
      status: "running",
      metadata,
    };

    this.activeTraces.set(trace.id, trace);
    this.emit("trace:started", trace);
    return trace.id;
  }

  addSpan(
    traceId: string,
    spanName: string,
    parentSpanId?: string,
    tags: Record<string, any> = {},
  ): string {
    const trace = this.activeTraces.get(traceId);
    if (!trace) {
      throw new Error(`Trace ${traceId} not found`);
    }

    const span: TraceSpan = {
      id: crypto.randomUUID(),
      parentId: parentSpanId,
      operationName: spanName,
      startTime: new Date().toISOString(),
      tags,
      logs: [],
      status: "running",
    };

    trace.spans.push(span);
    return span.id;
  }

  finishSpan(traceId: string, spanId: string, error?: TraceError): void {
    const trace = this.activeTraces.get(traceId);
    if (!trace) return;

    const span = trace.spans.find((s) => s.id === spanId);
    if (!span) return;

    span.endTime = new Date().toISOString();
    span.duration =
      new Date(span.endTime).getTime() - new Date(span.startTime).getTime();
    span.status = error ? "failed" : "completed";

    if (error) {
      span.logs.push({
        timestamp: new Date().toISOString(),
        level: "error",
        message: error.message,
        fields: { error: error.type, stack: error.stack },
      });
    }
  }

  finishTrace(traceId: string, error?: TraceError): void {
    const trace = this.activeTraces.get(traceId);
    if (!trace) return;

    trace.endTime = new Date().toISOString();
    trace.duration =
      new Date(trace.endTime).getTime() - new Date(trace.startTime).getTime();
    trace.status = error ? "failed" : "completed";
    trace.error = error;

    this.activeTraces.delete(traceId);
    this.emit("trace:completed", trace);

    // Store trace
    this.storeTrace(trace);
  }

  addLog(
    traceId: string,
    spanId: string,
    level: TraceLog["level"],
    message: string,
    fields?: Record<string, any>,
  ): void {
    const trace = this.activeTraces.get(traceId);
    if (!trace) return;

    const span = trace.spans.find((s) => s.id === spanId);
    if (!span) return;

    span.logs.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      fields,
    });
  }

  // Context7 Pattern: Alert management with conditions
  async createAlert(
    alertConfig: Omit<Alert, "id" | "status" | "createdAt">,
  ): Promise<string> {
    const alert: Alert = {
      ...alertConfig,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Store alert
    await this.supabase.from("monitoring_alerts").insert({
      id: alert.id,
      name: alert.name,
      description: alert.description,
      condition: alert.condition,
      status: alert.status,
      severity: alert.severity,
      notifications: alert.notifications,
      metadata: alert.metadata,
    });

    this.alerts.set(alert.id, alert);
    return alert.id;
  }

  async acknowledgeAlert(
    alertId: string,
    userId: string,
    reason?: string,
  ): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (!alert) return;

    alert.metadata.acknowledged = {
      by: userId,
      at: new Date().toISOString(),
      reason,
    };

    await this.supabase
      .from("monitoring_alerts")
      .update({ metadata: alert.metadata })
      .eq("id", alertId);
  }

  // Context7 Pattern: System health monitoring
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      const services = await this.checkServicesHealth();
      const dependencies = await this.checkDependenciesHealth();
      const checks = await this.performSystemChecks();

      const overallScore = this.calculateHealthScore(
        services,
        dependencies,
        checks,
      );
      const status = this.determineSystemStatus(overallScore);

      return {
        status,
        services,
        dependencies,
        overallScore,
        checks,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Failed to get system health:", error);
      return {
        status: "down",
        services: [],
        dependencies: [],
        overallScore: 0,
        checks: [],
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  // Context7 Pattern: Performance dashboard management
  async createDashboard(
    dashboard: Omit<PerformanceDashboard, "id">,
  ): Promise<string> {
    const dashboardId = crypto.randomUUID();
    const fullDashboard: PerformanceDashboard = {
      ...dashboard,
      id: dashboardId,
    };

    await this.supabase.from("monitoring_dashboards").insert({
      id: dashboardId,
      name: dashboard.name,
      description: dashboard.description,
      widgets: dashboard.widgets,
      layout: dashboard.layout,
      filters: dashboard.filters,
      time_range: dashboard.timeRange,
      auto_refresh: dashboard.autoRefresh,
      refresh_interval: dashboard.refreshInterval,
    });

    return dashboardId;
  }

  async queryMetrics(query: MetricQuery): Promise<any[]> {
    try {
      // Build time series query
      const { data, error } = await this.supabase.rpc("query_metrics", {
        p_metric: query.metric,
        p_aggregation: query.aggregation,
        p_group_by: query.groupBy || [],
        p_filters: query.filters || {},
        p_from: query.timeRange.from,
        p_to: query.timeRange.to,
        p_interval: query.interval || "1m",
      });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to query metrics:", error);
      return [];
    }
  }

  // Context7 Pattern: Anomaly detection
  async detectAnomalies(metric: string, timeRange: TimeRange): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc("detect_anomalies", {
        p_metric: metric,
        p_from: timeRange.from,
        p_to: timeRange.to,
      });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to detect anomalies:", error);
      return [];
    }
  }

  // Context7 Pattern: Private helper methods
  private async flushMetrics(): Promise<void> {
    if (this.metricsBuffer.length === 0) return;

    try {
      const metrics = [...this.metricsBuffer];
      this.metricsBuffer = [];

      // Store in database
      await this.supabase.from("monitoring_metrics").insert(
        metrics.map((m) => ({
          id: m.id,
          name: m.name,
          type: m.type,
          description: m.description,
          labels: m.labels,
          value: m.value,
          timestamp: m.timestamp,
          source: m.source,
          unit: m.unit,
        })),
      );

      // Store in Redis for real-time queries
      if (this.redis) {
        const pipeline = this.redis.pipeline();
        metrics.forEach((m) => {
          const key = `metric:${m.name}:${JSON.stringify(m.labels)}`;
          pipeline.zadd(key, Date.now(), JSON.stringify(m));
          pipeline.expire(key, 24 * 60 * 60); // 24 hours
        });
        await pipeline.exec();
      }
    } catch (error) {
      console.error("Failed to flush metrics:", error);
      // Re-add metrics to buffer for retry
      this.metricsBuffer = [...this.metricsBuffer, ...this.metricsBuffer];
    }
  }

  private async storeTrace(trace: PerformanceTrace): Promise<void> {
    try {
      await this.supabase.from("monitoring_traces").insert({
        id: trace.id,
        operation_name: trace.operationName,
        start_time: trace.startTime,
        end_time: trace.endTime,
        duration: trace.duration,
        spans: trace.spans,
        status: trace.status,
        metadata: trace.metadata,
        error: trace.error,
      });
    } catch (error) {
      console.error("Failed to store trace:", error);
    }
  }

  private async performHealthChecks(): Promise<void> {
    try {
      const systemHealth = await this.getSystemHealth();

      // Check for degraded services
      systemHealth.services.forEach((service) => {
        if (service.status === "degraded" || service.status === "down") {
          this.emit("health:degraded", service.name, service);
        }
      });

      // Check for error spikes
      systemHealth.services.forEach((service) => {
        if (service.errorRate > 0.05) {
          // 5% error rate threshold
          this.emit("error:spike", service.name, service.errorRate);
        }
      });
    } catch (error) {
      console.error("Health check failed:", error);
    }
  }

  private async evaluateAlerts(): Promise<void> {
    try {
      for (const [alertId, alert] of this.alerts) {
        const shouldFire = await this.evaluateAlertCondition(alert.condition);

        if (shouldFire && alert.status !== "firing") {
          alert.status = "firing";
          alert.firedAt = new Date().toISOString();
          await this.sendAlertNotifications(alert);
          this.emit("alert:fired", alert);
        } else if (!shouldFire && alert.status === "firing") {
          alert.status = "resolved";
          alert.resolvedAt = new Date().toISOString();
          await this.sendAlertNotifications(alert);
          this.emit("alert:resolved", alert);
        }
      }
    } catch (error) {
      console.error("Alert evaluation failed:", error);
    }
  }

  private async evaluateAlertCondition(
    condition: AlertCondition,
  ): Promise<boolean> {
    try {
      const { data } = await this.supabase.rpc("evaluate_alert_condition", {
        p_metric: condition.metric,
        p_operator: condition.operator,
        p_threshold: condition.threshold,
        p_duration: condition.duration,
        p_aggregation: condition.aggregation,
        p_filters: condition.filters || {},
      });

      return data || false;
    } catch (error) {
      console.error("Failed to evaluate alert condition:", error);
      return false;
    }
  }

  private async sendAlertNotifications(alert: Alert): Promise<void> {
    try {
      for (const notification of alert.notifications) {
        if (!notification.enabled) continue;

        await this.supabase.from("alert_notifications").insert({
          alert_id: alert.id,
          type: notification.type,
          destination: notification.destination,
          sent_at: new Date().toISOString(),
          status: "pending",
        });
      }
    } catch (error) {
      console.error("Failed to send alert notifications:", error);
    }
  }

  private async checkServicesHealth(): Promise<ServiceHealth[]> {
    // Implementation would check various services
    // This is a simplified version
    return [
      {
        name: "rag-api",
        status: "healthy",
        responseTime: 150,
        errorRate: 0.01,
        throughput: 1000,
        availability: 99.9,
        version: "1.0.0",
        checks: [],
      },
      {
        name: "chat-service",
        status: "healthy",
        responseTime: 200,
        errorRate: 0.005,
        throughput: 500,
        availability: 99.95,
        version: "1.2.1",
        checks: [],
      },
    ];
  }

  private async checkDependenciesHealth(): Promise<DependencyHealth[]> {
    const dependencies: DependencyHealth[] = [];

    // Check Supabase
    try {
      const start = Date.now();
      await this.supabase.from("monitoring_metrics").select("id").limit(1);
      dependencies.push({
        name: "supabase",
        type: "database",
        status: "healthy",
        responseTime: Date.now() - start,
        lastChecked: new Date().toISOString(),
      });
    } catch (error) {
      dependencies.push({
        name: "supabase",
        type: "database",
        status: "down",
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Check Redis
    if (this.redis) {
      try {
        const start = Date.now();
        await this.redis.ping();
        dependencies.push({
          name: "redis",
          type: "cache",
          status: "healthy",
          responseTime: Date.now() - start,
          lastChecked: new Date().toISOString(),
        });
      } catch (error) {
        dependencies.push({
          name: "redis",
          type: "cache",
          status: "down",
          responseTime: 0,
          lastChecked: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return dependencies;
  }

  private async performSystemChecks(): Promise<HealthCheck[]> {
    const checks: HealthCheck[] = [];

    // Memory usage check
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = memoryUsage.heapUsed / 1024 / 1024;
    checks.push({
      name: "memory_usage",
      status: memoryUsageMB > 1000 ? "warn" : "pass",
      duration: 0,
      output: `Memory usage: ${memoryUsageMB.toFixed(2)} MB`,
      timestamp: new Date().toISOString(),
    });

    // Event loop lag check
    const start = process.hrtime.bigint();
    setTimeout(() => {
      const lag = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      checks.push({
        name: "event_loop_lag",
        status: lag > 100 ? "warn" : "pass",
        duration: lag,
        output: `Event loop lag: ${lag.toFixed(2)}ms`,
        timestamp: new Date().toISOString(),
      });
    }, 0);

    return checks;
  }

  private calculateHealthScore(
    services: ServiceHealth[],
    dependencies: DependencyHealth[],
    checks: HealthCheck[],
  ): number {
    const serviceScore =
      services.reduce((sum, s) => {
        switch (s.status) {
          case "healthy":
            return sum + 1;
          case "degraded":
            return sum + 0.5;
          default:
            return sum;
        }
      }, 0) / services.length;

    const dependencyScore =
      dependencies.reduce((sum, d) => {
        switch (d.status) {
          case "healthy":
            return sum + 1;
          case "degraded":
            return sum + 0.5;
          default:
            return sum;
        }
      }, 0) / dependencies.length;

    const checkScore =
      checks.reduce((sum, c) => {
        switch (c.status) {
          case "pass":
            return sum + 1;
          case "warn":
            return sum + 0.5;
          default:
            return sum;
        }
      }, 0) / checks.length;

    return (serviceScore + dependencyScore + checkScore) / 3;
  }

  private determineSystemStatus(score: number): SystemHealth["status"] {
    if (score >= 0.9) return "healthy";
    if (score >= 0.7) return "degraded";
    return "down";
  }

  // Context7 Pattern: Resource cleanup
  cleanup(): void {
    this.metricsBuffer = [];
    this.activeTraces.clear();
    this.alerts.clear();
    this.removeAllListeners();
  }
}
