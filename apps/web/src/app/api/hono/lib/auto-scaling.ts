import { captureMessage } from "@/lib/sentry";

import { getPerformanceMetrics } from "../middleware/performance";

// Auto-scaling configuration
interface ScalingRule {
  metric:
    | "avgResponseTime"
    | "requestRate"
    | "errorRate"
    | "memoryUsage"
    | "cpuUsage";
  threshold: number;
  scaleDirection: "up" | "down";
  cooldownPeriod: number; // in milliseconds
  minInstances: number;
  maxInstances: number;
}

interface ScalingConfig {
  enabled: boolean;
  provider: "aws" | "azure" | "gcp" | "vercel";
  rules: ScalingRule[];
  checkInterval: number; // in milliseconds
}

// Default scaling configuration
const DEFAULT_SCALING_CONFIG: ScalingConfig = {
  enabled: process.env.AUTO_SCALING_ENABLED === "true",
  provider: (process.env.AUTO_SCALING_PROVIDER as any) || "vercel",
  rules: [
    {
      metric: "avgResponseTime",
      threshold: 200, // ms
      scaleDirection: "up",
      cooldownPeriod: 300000, // 5 minutes
      minInstances: 1,
      maxInstances: 10,
    },
    {
      metric: "avgResponseTime",
      threshold: 50, // ms
      scaleDirection: "down",
      cooldownPeriod: 600000, // 10 minutes
      minInstances: 1,
      maxInstances: 10,
    },
    {
      metric: "requestRate",
      threshold: 100, // requests per minute
      scaleDirection: "up",
      cooldownPeriod: 300000, // 5 minutes
      minInstances: 1,
      maxInstances: 10,
    },
  ],
  checkInterval: 60000, // 1 minute
};

// Scaling state
interface ScalingState {
  lastScalingAction: {
    timestamp: number;
    direction: "up" | "down" | null;
    reason: string;
  };
  currentInstances: number;
  metrics: {
    avgResponseTime: number;
    requestRate: number;
    errorRate: number;
    memoryUsage: number;
    cpuUsage: number;
  };
}

// Initialize scaling state
let scalingState: ScalingState = {
  lastScalingAction: {
    timestamp: 0,
    direction: null,
    reason: "Initialized",
  },
  currentInstances: 1,
  metrics: {
    avgResponseTime: 0,
    requestRate: 0,
    errorRate: 0,
    memoryUsage: 0,
    cpuUsage: 0,
  },
};

let scalingInterval: NodeJS.Timeout | null = null;

/**
 * Initialize auto-scaling
 * @param config Optional custom scaling configuration
 */
export function initializeAutoScaling(config?: Partial<ScalingConfig>): void {
  // Merge custom config with defaults
  const scalingConfig: ScalingConfig = {
    ...DEFAULT_SCALING_CONFIG,
    ...config,
    rules: [...(config?.rules || []), ...DEFAULT_SCALING_CONFIG.rules],
  };

  // If scaling is disabled, don't proceed
  if (!scalingConfig.enabled) {
    console.log("Auto-scaling is disabled");
    return;
  }

  console.log(`Initializing auto-scaling for ${scalingConfig.provider}`);

  // Start periodic scaling check
  if (scalingInterval) {
    clearInterval(scalingInterval);
  }

  scalingInterval = setInterval(() => {
    checkScalingRules(scalingConfig);
  }, scalingConfig.checkInterval);

  // Initial check
  checkScalingRules(scalingConfig);
}

/**
 * Check scaling rules and trigger scaling if needed
 */
async function checkScalingRules(config: ScalingConfig): Promise<void> {
  try {
    // Update metrics
    await updateMetrics();

    // Check each rule
    for (const rule of config.rules) {
      // Skip if in cooldown period
      const now = Date.now();
      if (
        now - scalingState.lastScalingAction.timestamp <
        rule.cooldownPeriod
      ) {
        continue;
      }

      // Get current metric value
      const metricValue = scalingState.metrics[rule.metric];

      // Check threshold for scaling
      if (
        (rule.scaleDirection === "up" && metricValue > rule.threshold) ||
        (rule.scaleDirection === "down" && metricValue < rule.threshold)
      ) {
        // Check min/max instances
        if (
          (rule.scaleDirection === "up" &&
            scalingState.currentInstances < rule.maxInstances) ||
          (rule.scaleDirection === "down" &&
            scalingState.currentInstances > rule.minInstances)
        ) {
          // Trigger scaling
          await triggerScaling(
            config.provider,
            rule.scaleDirection,
            `${rule.metric} (${metricValue}) ${
              rule.scaleDirection === "up" ? "exceeded" : "fell below"
            } threshold (${rule.threshold})`,
          );

          // Update state
          scalingState.lastScalingAction = {
            timestamp: now,
            direction: rule.scaleDirection,
            reason: `${rule.metric} ${
              rule.scaleDirection === "up" ? "high" : "low"
            }`,
          };

          // Update instance count
          if (rule.scaleDirection === "up") {
            scalingState.currentInstances++;
          } else {
            scalingState.currentInstances--;
          }

          // Only apply one rule at a time
          break;
        }
      }
    }
  } catch (error) {
    console.error("Error checking scaling rules:", error);
  }
}

/**
 * Update metrics for scaling decisions
 */
async function updateMetrics(): Promise<void> {
  try {
    // Get performance metrics
    const performanceMetrics = getPerformanceMetrics();

    // Calculate average response time across all endpoints
    let totalTime = 0;
    let totalRequests = 0;

    Object.values(performanceMetrics).forEach((metric) => {
      totalTime += metric.avgTime * metric.count;
      totalRequests += metric.count;
    });

    const avgResponseTime = totalRequests ? totalTime / totalRequests : 0;

    // Calculate request rate (requests per minute)
    // This is approximate based on the last interval
    const requestRate = totalRequests;

    // Get memory usage
    const memUsage = process.memoryUsage();
    const memoryUsage = (memUsage.heapUsed / memUsage.heapTotal) * 100;

    // CPU usage is not directly available in Node.js without external modules
    // For now, we'll use a placeholder - in production you would use a proper monitoring agent
    const cpuUsage = 0;

    // Update scaling state
    scalingState.metrics = {
      avgResponseTime,
      requestRate,
      errorRate: 0, // Placeholder - would need to track errors over time
      memoryUsage,
      cpuUsage,
    };
  } catch (error) {
    console.error("Error updating metrics:", error);
  }
}

/**
 * Trigger scaling action with the appropriate provider
 */
async function triggerScaling(
  provider: string,
  direction: "up" | "down",
  reason: string,
): Promise<void> {
  console.log(`Scaling ${direction} due to: ${reason}`);

  // Log to monitoring system
  captureMessage(`Auto-scaling triggered: ${direction}`, "info", {
    reason,
    provider,
    currentInstances: scalingState.currentInstances,
    newInstances:
      direction === "up"
        ? scalingState.currentInstances + 1
        : scalingState.currentInstances - 1,
    metrics: scalingState.metrics,
  });

  try {
    switch (provider) {
      case "aws":
        await scaleAWS(direction);
        break;
      case "azure":
        await scaleAzure(direction);
        break;
      case "gcp":
        await scaleGCP(direction);
        break;
      case "vercel":
        await scaleVercel(direction);
        break;
      default:
        console.warn(`Unknown provider: ${provider}`);
        break;
    }
  } catch (error) {
    console.error(`Error scaling ${provider}:`, error);
  }
}

/**
 * Scale AWS instances
 * Placeholder implementation - would need AWS SDK
 */
async function scaleAWS(direction: "up" | "down"): Promise<void> {
  // Placeholder - in production, implement with AWS SDK
  console.log(`AWS scaling ${direction} - placeholder implementation`);

  /*
  // Example AWS implementation:
  import { AutoScalingClient, SetDesiredCapacityCommand } from "@aws-sdk/client-auto-scaling";
  
  const client = new AutoScalingClient({ region: "us-west-2" });
  const command = new SetDesiredCapacityCommand({
    AutoScalingGroupName: "my-app-asg",
    DesiredCapacity: direction === 'up' 
      ? scalingState.currentInstances + 1 
      : scalingState.currentInstances - 1,
  });
  
  await client.send(command);
  */
}

/**
 * Scale Azure instances
 * Placeholder implementation - would need Azure SDK
 */
async function scaleAzure(direction: "up" | "down"): Promise<void> {
  // Placeholder - in production, implement with Azure SDK
  console.log(`Azure scaling ${direction} - placeholder implementation`);
}

/**
 * Scale GCP instances
 * Placeholder implementation - would need GCP SDK
 */
async function scaleGCP(direction: "up" | "down"): Promise<void> {
  // Placeholder - in production, implement with GCP SDK
  console.log(`GCP scaling ${direction} - placeholder implementation`);
}

/**
 * Scale Vercel instances
 * Placeholder implementation - would need Vercel API
 */
async function scaleVercel(direction: "up" | "down"): Promise<void> {
  // Placeholder - in production, implement with Vercel API
  console.log(`Vercel scaling ${direction} - placeholder implementation`);

  /*
  // Example Vercel implementation using fetch:
  const response = await fetch(
    `https://api.vercel.com/v1/projects/${process.env.VERCEL_PROJECT_ID}/deployments/${process.env.VERCEL_DEPLOYMENT_ID}/scale`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        min: direction === 'up' ? scalingState.currentInstances + 1 : scalingState.currentInstances - 1,
        max: direction === 'up' ? scalingState.currentInstances + 5 : scalingState.currentInstances + 2,
      }),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Vercel API error: ${response.statusText}`);
  }
  */
}

/**
 * Get current scaling state
 */
export function getScalingState(): ScalingState {
  return { ...scalingState };
}

/**
 * Clean up auto-scaling resources
 */
export function shutdownAutoScaling(): void {
  if (scalingInterval) {
    clearInterval(scalingInterval);
    scalingInterval = null;
  }
}
