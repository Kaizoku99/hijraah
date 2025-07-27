import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Context7 Pattern: Type-safe API schema
const TaskQuerySchema = z.object({
  category: z
    .enum(["ai", "processing", "maintenance", "communication"])
    .optional(),
  status: z
    .enum([
      "pending",
      "running",
      "completed",
      "failed",
      "cancelled",
      "retrying",
    ])
    .optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
});

// Context7 Pattern: API response types
interface TaskRunResponse {
  id: string;
  taskId: string;
  status: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  attempts: number;
  maxAttempts: number;
  output?: any;
  error?: string;
  progress?: number;
  metadata?: Record<string, any>;
}

interface TaskResponse {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  lastRun?: TaskRunResponse;
  totalRuns: number;
  successRate: number;
  avgDuration: number;
  isScheduled?: boolean;
  schedule?: string;
  category: string;
}

interface TasksApiResponse {
  tasks: TaskResponse[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = TaskQuerySchema.parse({
      category: searchParams.get("category"),
      status: searchParams.get("status"),
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    });

    // TODO: Replace with actual Trigger.dev API integration
    // For now, return mock data that matches the real API structure

    const mockTasks: TaskResponse[] = [
      {
        id: "document-processing",
        name: "Document Processing",
        description:
          "Process uploaded documents with AI analysis using @hijraah/documents",
        enabled: true,
        category: "processing",
        totalRuns: 145,
        successRate: 94.5,
        avgDuration: 12000,
        lastRun: {
          id: "run-doc-1",
          taskId: "document-processing",
          status: "completed",
          createdAt: new Date(Date.now() - 300000).toISOString(),
          startedAt: new Date(Date.now() - 280000).toISOString(),
          completedAt: new Date(Date.now() - 260000).toISOString(),
          duration: 20000,
          attempts: 1,
          maxAttempts: 3,
          progress: 100,
          output: {
            documentsProcessed: 5,
            entitiesExtracted: 23,
            aiProvider: "openai",
            hijraahPackages: ["@hijraah/documents", "@hijraah/ai"],
          },
        },
      },
      {
        id: "ai-analysis",
        name: "AI Analysis",
        description: "Multi-provider AI analysis using @hijraah/ai multiplexer",
        enabled: true,
        category: "ai",
        totalRuns: 89,
        successRate: 98.9,
        avgDuration: 8500,
        lastRun: {
          id: "run-ai-1",
          taskId: "ai-analysis",
          status: "running",
          createdAt: new Date(Date.now() - 120000).toISOString(),
          startedAt: new Date(Date.now() - 100000).toISOString(),
          attempts: 1,
          maxAttempts: 2,
          progress: 65,
          metadata: {
            currentProvider: "anthropic",
            fallbackReady: true,
            hijraahMultiplexer: "@hijraah/ai",
          },
        },
      },
      {
        id: "web-scraping",
        name: "Web Scraping",
        description: "Extract immigration content using Firecrawl integration",
        enabled: true,
        category: "processing",
        totalRuns: 67,
        successRate: 91.0,
        avgDuration: 15000,
        lastRun: {
          id: "run-scrape-1",
          taskId: "web-scraping",
          status: "failed",
          createdAt: new Date(Date.now() - 600000).toISOString(),
          startedAt: new Date(Date.now() - 580000).toISOString(),
          completedAt: new Date(Date.now() - 560000).toISOString(),
          duration: 20000,
          attempts: 3,
          maxAttempts: 3,
          error: "Circuit breaker open: Immigration.gov rate limit exceeded",
        },
      },
      {
        id: "email-notification",
        name: "Email Notifications",
        description: "Send user notifications using @hijraah/workflows",
        enabled: true,
        category: "communication",
        totalRuns: 234,
        successRate: 99.1,
        avgDuration: 2500,
        lastRun: {
          id: "run-email-1",
          taskId: "email-notification",
          status: "completed",
          createdAt: new Date(Date.now() - 900000).toISOString(),
          startedAt: new Date(Date.now() - 895000).toISOString(),
          completedAt: new Date(Date.now() - 892500).toISOString(),
          duration: 2500,
          attempts: 1,
          maxAttempts: 3,
          progress: 100,
          output: {
            emailsSent: 12,
            workflowPackage: "@hijraah/workflows",
          },
        },
      },
      {
        id: "daily-reports",
        name: "Daily Reports",
        description:
          "Generate analytics using @hijraah/workflows scheduled tasks",
        enabled: true,
        category: "communication",
        totalRuns: 30,
        successRate: 100,
        avgDuration: 5000,
        isScheduled: true,
        schedule: "0 8 * * *",
        lastRun: {
          id: "run-report-1",
          taskId: "daily-reports",
          status: "completed",
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          startedAt: new Date(Date.now() - 14390000).toISOString(),
          completedAt: new Date(Date.now() - 14385000).toISOString(),
          duration: 5000,
          attempts: 1,
          maxAttempts: 5,
          progress: 100,
          output: {
            reportsSent: 3,
            metricsGenerated: 15,
            hijraahWorkflows: "@hijraah/workflows",
          },
        },
      },
      {
        id: "index-maintenance",
        name: "Search Index Maintenance",
        description: "Maintain search indexes using @hijraah/rag",
        enabled: true,
        category: "maintenance",
        totalRuns: 56,
        successRate: 96.4,
        avgDuration: 18000,
        isScheduled: true,
        schedule: "0 2 * * *",
        lastRun: {
          id: "run-index-1",
          taskId: "index-maintenance",
          status: "pending",
          createdAt: new Date(Date.now() - 60000).toISOString(),
          attempts: 1,
          maxAttempts: 3,
          progress: 0,
          metadata: {
            ragPackage: "@hijraah/rag",
            scheduledFor: "02:00 UTC",
          },
        },
      },
    ];

    // Apply filters
    let filteredTasks = mockTasks;

    if (query.category) {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === query.category,
      );
    }

    if (query.status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.lastRun?.status === query.status,
      );
    }

    // Apply pagination
    const total = filteredTasks.length;
    const paginatedTasks = filteredTasks.slice(
      query.offset,
      query.offset + query.limit,
    );

    const response: TasksApiResponse = {
      tasks: paginatedTasks,
      total,
      limit: query.limit,
      offset: query.offset,
      hasMore: query.offset + query.limit < total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Context7 Pattern: Health check endpoint
export async function HEAD() {
  return new Response(null, { status: 200 });
}
