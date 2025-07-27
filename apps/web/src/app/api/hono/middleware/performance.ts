import { Context, Next } from 'hono';

/**
 * Simple in-memory store for performance metrics
 */
const performanceMetrics = {
  endpointStats: new Map<string, {
    count: number;
    totalTime: number;
    min: number;
    max: number;
    last10: number[];
  }>(),
};

/**
 * Middleware to track API performance
 * Adds timing information to responses
 */
export function performanceMiddleware() {
  return async (c: Context, next: Next) => {
    // Record start time
    const start = performance.now();
    c.set('startTime' as any, start);
    
    // Add a unique request ID if not already set
    if (!c.get('requestId' as any)) {
      const requestId = Date.now().toString(36) + Math.random().toString(36).substring(2, 12);
      c.set('requestId' as any, requestId);
    }
    
    // Continue to the next middleware
    await next();
    
    // Calculate execution time
    const end = performance.now();
    const executionTime = end - start;
    
    // Track endpoint performance
    const path = c.req.path;
    trackEndpointPerformance(path, executionTime);
    
    // Add performance headers
    c.header('X-Response-Time', `${executionTime.toFixed(2)}ms`);
    
    // If JSON response, try to add performance data
    try {
      if (c.res.headers.get('Content-Type')?.includes('application/json')) {
        // Try to modify the JSON response to include timing info
        const originalBody = await c.res.json();
        
        if (typeof originalBody === 'object' && originalBody !== null) {
          const newBody = {
            ...originalBody,
            _meta: {
              ...(originalBody._meta || {}),
              executionTime: parseFloat(executionTime.toFixed(2)),
              requestId: c.get('requestId' as any),
            }
          };
          
          // Create a new response with the modified body
          const statusCode = c.res.status as any;
          return c.json(newBody, statusCode);
        }
      }
    } catch (e) {
      // If we can't modify the response, just continue
      console.error('Failed to add performance data to response', e);
    }
  };
}

/**
 * Track endpoint performance metrics
 */
function trackEndpointPerformance(path: string, executionTime: number) {
  // Get or create stats for this endpoint
  let stats = performanceMetrics.endpointStats.get(path);
  
  if (!stats) {
    stats = {
      count: 0,
      totalTime: 0,
      min: Number.MAX_VALUE,
      max: 0,
      last10: [],
    };
    performanceMetrics.endpointStats.set(path, stats);
  }
  
  // Update stats
  stats.count += 1;
  stats.totalTime += executionTime;
  stats.min = Math.min(stats.min, executionTime);
  stats.max = Math.max(stats.max, executionTime);
  
  // Keep track of last 10 execution times
  stats.last10.push(executionTime);
  if (stats.last10.length > 10) {
    stats.last10.shift();
  }
}

/**
 * Get performance metrics for all endpoints
 */
export function getPerformanceMetrics() {
  const metrics: Record<string, any> = {};
  
  performanceMetrics.endpointStats.forEach((stats, path) => {
    metrics[path] = {
      count: stats.count,
      avgTime: stats.totalTime / stats.count,
      minTime: stats.min,
      maxTime: stats.max,
      recent: stats.last10,
    };
  });
  
  return metrics;
}

/**
 * Reset performance metrics
 */
export function resetPerformanceMetrics() {
  performanceMetrics.endpointStats.clear();
} 