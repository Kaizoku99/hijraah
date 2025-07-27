export type Severity = "low" | "medium" | "high" | "critical";

export interface MonitoringConfig {
  sentryDsn?: string;
  datadogAppId?: string;
  environment: string;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  severity: Severity;
  userId?: string;
  timestamp: string;
}

export interface PerformanceReport {
  name: string;
  duration: number;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface UserActionReport {
  action: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface Transaction {
  name: string;
  startTime: number;
  endTime?: number;
  metadata?: Record<string, unknown>;
}
