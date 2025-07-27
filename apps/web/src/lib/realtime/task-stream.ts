import { EventEmitter } from "events";

// Context7 Pattern: Event-driven architecture with type safety
export interface TaskStreamEvent {
  id: string;
  type:
    | "task.status"
    | "task.progress"
    | "task.output"
    | "task.error"
    | "task.triggered"
    | "task.completed";
  taskId: string;
  timestamp: string;
  data: {
    status?: string;
    progress?: number;
    output?: any;
    error?: string;
    metadata?: Record<string, any>;
    duration?: number;
    attempts?: number;
  };
}

export interface TaskStreamOptions {
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  bufferSize?: number;
  enableHeartbeat?: boolean;
  heartbeatInterval?: number;
}

// Context7 Pattern: Resource Pooling and Connection Management
export class TaskStreamService extends EventEmitter {
  private static instance: TaskStreamService;
  private eventSource: EventSource | null = null;
  private subscribers = new Map<
    string,
    Set<(event: TaskStreamEvent) => void>
  >();
  private connectionState:
    | "disconnected"
    | "connecting"
    | "connected"
    | "reconnecting" = "disconnected";
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private eventBuffer: TaskStreamEvent[] = [];
  private lastEventId: string | null = null;

  private readonly options: Required<TaskStreamOptions> = {
    reconnectInterval: 3000,
    maxReconnectAttempts: 10,
    bufferSize: 100,
    enableHeartbeat: true,
    heartbeatInterval: 30000,
  };

  constructor(options?: TaskStreamOptions) {
    super();
    this.options = { ...this.options, ...options };
    this.setupHeartbeat();
  }

  static getInstance(options?: TaskStreamOptions): TaskStreamService {
    if (!TaskStreamService.instance) {
      TaskStreamService.instance = new TaskStreamService(options);
    }
    return TaskStreamService.instance;
  }

  // Context7 Pattern: Circuit Breaker for connection management
  async connect(chatId?: string): Promise<void> {
    if (
      this.connectionState === "connected" ||
      this.connectionState === "connecting"
    ) {
      return;
    }

    this.connectionState = "connecting";
    this.emit("connectionState", "connecting");

    try {
      const url = new URL("/api/realtime/tasks", window.location.origin);
      if (chatId) url.searchParams.set("chatId", chatId);
      if (this.lastEventId)
        url.searchParams.set("lastEventId", this.lastEventId);

      this.eventSource = new EventSource(url.toString());

      this.eventSource.onopen = () => {
        this.connectionState = "connected";
        this.reconnectAttempts = 0;
        this.emit("connectionState", "connected");
        this.emit("connected");
        console.log("[TaskStream] Connected to real-time task updates");
      };

      this.eventSource.onmessage = (event) => {
        try {
          const taskEvent: TaskStreamEvent = JSON.parse(event.data);
          this.handleTaskEvent(taskEvent);
          this.lastEventId = taskEvent.id;
        } catch (error) {
          console.error("[TaskStream] Failed to parse event:", error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error("[TaskStream] Connection error:", error);
        this.handleConnectionError();
      };

      // Custom event handlers for different task events
      this.eventSource.addEventListener("task.status", (event) => {
        this.handleCustomEvent("task.status", event);
      });

      this.eventSource.addEventListener("task.progress", (event) => {
        this.handleCustomEvent("task.progress", event);
      });

      this.eventSource.addEventListener("task.completed", (event) => {
        this.handleCustomEvent("task.completed", event);
      });
    } catch (error) {
      console.error("[TaskStream] Failed to connect:", error);
      this.handleConnectionError();
      throw error;
    }
  }

  // Context7 Pattern: Subscription management with cleanup
  subscribe(
    taskId: string,
    callback: (event: TaskStreamEvent) => void,
  ): () => void {
    if (!this.subscribers.has(taskId)) {
      this.subscribers.set(taskId, new Set());
    }
    this.subscribers.get(taskId)!.add(callback);

    // Auto-connect if not already connected
    if (this.connectionState === "disconnected") {
      this.connect().catch(console.error);
    }

    // Send buffered events for this task
    this.eventBuffer
      .filter((event) => event.taskId === taskId || taskId === "*")
      .forEach(callback);

    return () => {
      const taskSubscribers = this.subscribers.get(taskId);
      if (taskSubscribers) {
        taskSubscribers.delete(callback);
        if (taskSubscribers.size === 0) {
          this.subscribers.delete(taskId);
        }
      }

      // Disconnect if no more subscribers
      if (this.subscribers.size === 0 && this.connectionState === "connected") {
        this.disconnect();
      }
    };
  }

  // Context7 Pattern: Graceful cleanup
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    this.connectionState = "disconnected";
    this.reconnectAttempts = 0;
    this.emit("connectionState", "disconnected");
    this.emit("disconnected");
  }

  // Context7 Pattern: Health monitoring
  getConnectionState(): string {
    return this.connectionState;
  }

  getSubscriberCount(): number {
    return Array.from(this.subscribers.values()).reduce(
      (total, set) => total + set.size,
      0,
    );
  }

  getBufferedEvents(): TaskStreamEvent[] {
    return [...this.eventBuffer];
  }

  // Private methods
  private handleTaskEvent(event: TaskStreamEvent): void {
    // Add to buffer with size limit
    this.eventBuffer.push(event);
    if (this.eventBuffer.length > this.options.bufferSize) {
      this.eventBuffer.shift();
    }

    // Notify specific task subscribers
    const taskSubscribers = this.subscribers.get(event.taskId);
    if (taskSubscribers) {
      taskSubscribers.forEach((callback) => callback(event));
    }

    // Notify global subscribers
    const globalSubscribers = this.subscribers.get("*");
    if (globalSubscribers) {
      globalSubscribers.forEach((callback) => callback(event));
    }

    // Emit general event
    this.emit("taskEvent", event);
  }

  private handleCustomEvent(eventType: string, event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      const taskEvent: TaskStreamEvent = {
        id: event.lastEventId || Date.now().toString(),
        type: eventType as TaskStreamEvent["type"],
        taskId: data.taskId,
        timestamp: new Date().toISOString(),
        data: data.data || data,
      };
      this.handleTaskEvent(taskEvent);
    } catch (error) {
      console.error(`[TaskStream] Failed to parse ${eventType} event:`, error);
    }
  }

  private handleConnectionError(): void {
    this.connectionState = "disconnected";
    this.emit("connectionState", "disconnected");

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    // Implement exponential backoff for reconnection
    if (this.reconnectAttempts < this.options.maxReconnectAttempts) {
      this.connectionState = "reconnecting";
      this.emit("connectionState", "reconnecting");

      const delay = Math.min(
        this.options.reconnectInterval * Math.pow(2, this.reconnectAttempts),
        30000, // Max 30 seconds
      );

      this.reconnectTimer = setTimeout(() => {
        this.reconnectAttempts++;
        this.connect().catch(() => {
          // Reconnection failed, will try again
        });
      }, delay);

      console.log(
        `[TaskStream] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1}/${this.options.maxReconnectAttempts})`,
      );
    } else {
      console.error("[TaskStream] Max reconnection attempts reached");
      this.emit("maxReconnectAttemptsReached");
    }
  }

  private setupHeartbeat(): void {
    if (!this.options.enableHeartbeat) return;

    this.heartbeatTimer = setInterval(() => {
      if (this.connectionState === "connected" && this.eventSource) {
        // Send heartbeat to keep connection alive
        fetch("/api/realtime/heartbeat", { method: "POST" }).catch(() => {
          // Heartbeat failed, trigger reconnection
          this.handleConnectionError();
        });
      }
    }, this.options.heartbeatInterval);
  }
}

// Context7 Pattern: Factory function with singleton management
export function createTaskStream(
  options?: TaskStreamOptions,
): TaskStreamService {
  return TaskStreamService.getInstance(options);
}

// Context7 Pattern: Hook for React integration
export function useTaskStream(
  taskId: string | "*" = "*",
  options?: TaskStreamOptions,
) {
  const streamService = TaskStreamService.getInstance(options);

  return {
    subscribe: (callback: (event: TaskStreamEvent) => void) =>
      streamService.subscribe(taskId, callback),
    connect: (chatId?: string) => streamService.connect(chatId),
    disconnect: () => streamService.disconnect(),
    getConnectionState: () => streamService.getConnectionState(),
    getSubscriberCount: () => streamService.getSubscriberCount(),
    getBufferedEvents: () => streamService.getBufferedEvents(),
  };
}

export default TaskStreamService;
