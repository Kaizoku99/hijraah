import { NextRequest } from "next/server";

// Context7 Pattern: Type-safe event definitions
interface TaskStreamEvent {
  id: string;
  type:
    | "task.triggered"
    | "task.status"
    | "task.progress"
    | "task.output"
    | "task.error"
    | "task.completed";
  taskId: string;
  timestamp: string;
  data: {
    status?: string;
    progress?: number;
    output?: any;
    error?: string;
    attempts?: number;
    duration?: number;
    metadata?: Record<string, any>;
  };
}

// Context7 Pattern: In-memory event store with TTL
class TaskEventStore {
  private static instance: TaskEventStore;
  private events: Map<string, TaskStreamEvent[]> = new Map();
  private subscribers: Map<string, Set<WritableStreamDefaultWriter>> =
    new Map();
  private eventHistory: TaskStreamEvent[] = [];
  private readonly maxHistorySize = 1000;
  private readonly maxEventsPerTask = 50;

  static getInstance(): TaskEventStore {
    if (!TaskEventStore.instance) {
      TaskEventStore.instance = new TaskEventStore();
    }
    return TaskEventStore.instance;
  }

  // Context7 Pattern: Event publishing with fanout
  async publishEvent(event: TaskStreamEvent): Promise<void> {
    // Store in history
    this.eventHistory.unshift(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory = this.eventHistory.slice(0, this.maxHistorySize);
    }

    // Store per-task events
    if (!this.events.has(event.taskId)) {
      this.events.set(event.taskId, []);
    }
    const taskEvents = this.events.get(event.taskId)!;
    taskEvents.unshift(event);
    if (taskEvents.length > this.maxEventsPerTask) {
      taskEvents.splice(this.maxEventsPerTask);
    }

    // Notify subscribers
    const wildcardSubscribers = this.subscribers.get("*") || new Set();
    const taskSubscribers = this.subscribers.get(event.taskId) || new Set();
    const allSubscribers = new Set([
      ...Array.from(wildcardSubscribers),
      ...Array.from(taskSubscribers),
    ]);

    const eventData = `data: ${JSON.stringify(event)}\n\n`;

    for (const writer of Array.from(allSubscribers)) {
      try {
        await writer.write(new TextEncoder().encode(eventData));
      } catch (error) {
        console.error("Failed to write to subscriber:", error);
        // Remove failed subscribers
        wildcardSubscribers.delete(writer);
        taskSubscribers.delete(writer);
      }
    }
  }

  subscribe(taskId: string, writer: WritableStreamDefaultWriter): () => void {
    if (!this.subscribers.has(taskId)) {
      this.subscribers.set(taskId, new Set());
    }
    this.subscribers.get(taskId)!.add(writer);

    // Send recent events as history
    const recentEvents =
      taskId === "*"
        ? this.eventHistory.slice(0, 10)
        : this.events.get(taskId)?.slice(0, 10) || [];

    recentEvents.reverse().forEach(async (event) => {
      try {
        await writer.write(
          new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)
        );
      } catch (error) {
        console.error("Failed to send history:", error);
      }
    });

    return () => {
      this.subscribers.get(taskId)?.delete(writer);
      if (this.subscribers.get(taskId)?.size === 0) {
        this.subscribers.delete(taskId);
      }
    };
  }

  getSubscriberCount(taskId?: string): number {
    if (taskId) {
      return this.subscribers.get(taskId)?.size || 0;
    }
    return Array.from(this.subscribers.values()).reduce(
      (total, set) => total + set.size,
      0
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId") || "*";
  const chatId = searchParams.get("chatId");

  const eventStore = TaskEventStore.getInstance();

  // Create ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      const writer = controller;

      // Send initial connection event
      const connectEvent = {
        id: `connect-${Date.now()}`,
        type: "connection.established" as any,
        taskId: "system",
        timestamp: new Date().toISOString(),
        data: {
          subscriberCount: eventStore.getSubscriberCount(),
          chatId,
          taskId,
        },
      };

      writer.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify(connectEvent)}\n\n`)
      );

      // Subscribe to events
      const unsubscribe = eventStore.subscribe(taskId, writer as any);

      // Setup heartbeat
      const heartbeat = setInterval(() => {
        try {
          writer.enqueue(
            new TextEncoder().encode(
              `data: {"type":"heartbeat","timestamp":"${new Date().toISOString()}"}\n\n`
            )
          );
        } catch (error) {
          console.error("Heartbeat failed:", error);
          clearInterval(heartbeat);
        }
      }, 30000); // 30 second heartbeat

      // Cleanup on stream close
      const cleanup = () => {
        clearInterval(heartbeat);
        unsubscribe();
      };

      // Handle client disconnect
      request.signal.addEventListener("abort", cleanup);

      return cleanup;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  });
}

// Context7 Pattern: Webhook endpoint for receiving task events
export async function POST(request: NextRequest) {
  try {
    const eventStore = TaskEventStore.getInstance();
    const payload = await request.json();

    // Validate webhook payload (this would come from Trigger.dev)
    const event: TaskStreamEvent = {
      id: payload.id || `event-${Date.now()}`,
      type: payload.type,
      taskId: payload.taskId,
      timestamp: payload.timestamp || new Date().toISOString(),
      data: payload.data || {},
    };

    await eventStore.publishEvent(event);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to process webhook:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Mock event generation for testing (remove in production)
if (process.env.NODE_ENV === "development") {
  const eventStore = TaskEventStore.getInstance();

  // Generate mock events periodically
  setInterval(
    () => {
      const taskIds = [
        "document-processing",
        "ai-analysis",
        "web-scraping",
        "email-notification",
      ];
      const taskId = taskIds[Math.floor(Math.random() * taskIds.length)];
      const eventTypes: TaskStreamEvent["type"][] = [
        "task.progress",
        "task.status",
      ];
      const eventType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const mockEvent: TaskStreamEvent = {
        id: `mock-${Date.now()}`,
        type: eventType,
        taskId,
        timestamp: new Date().toISOString(),
        data: {
          progress:
            eventType === "task.progress"
              ? Math.floor(Math.random() * 100)
              : undefined,
          status:
            eventType === "task.status"
              ? Math.random() > 0.8
                ? "completed"
                : "running"
              : undefined,
        },
      };

      eventStore.publishEvent(mockEvent);
    },
    5000 + Math.random() * 10000
  ); // Random interval between 5-15 seconds
}
