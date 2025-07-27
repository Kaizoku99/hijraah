import { useState, useEffect, useCallback, useRef } from "react";
import {
  TaskStreamService,
  TaskStreamEvent,
  TaskStreamOptions,
} from "@/lib/realtime/task-stream";
import { Task, TaskStatus } from "@/components/ui/trigger/task-monitor";
import { useToast } from "@/components/ui/use-toast";

interface UseTaskRealtimeOptions extends TaskStreamOptions {
  chatId?: string;
  autoConnect?: boolean;
  notifyOnComplete?: boolean;
  notifyOnError?: boolean;
}

interface TaskRealtimeState {
  connectionState: "disconnected" | "connecting" | "connected" | "reconnecting";
  isConnected: boolean;
  subscriberCount: number;
  lastEvent: TaskStreamEvent | null;
  events: TaskStreamEvent[];
  error: string | null;
}

// Context7 Pattern: Composable hook with state management
export function useTaskRealtime(
  tasks: Task[] = [],
  options: UseTaskRealtimeOptions = {},
) {
  const { toast } = useToast();
  const {
    chatId,
    autoConnect = true,
    notifyOnComplete = true,
    notifyOnError = true,
    ...streamOptions
  } = options;

  const streamServiceRef = useRef<TaskStreamService | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const [state, setState] = useState<TaskRealtimeState>({
    connectionState: "disconnected",
    isConnected: false,
    subscriberCount: 0,
    lastEvent: null,
    events: [],
    error: null,
  });

  const [updatedTasks, setUpdatedTasks] = useState<Task[]>(tasks);

  // Initialize stream service
  useEffect(() => {
    if (!streamServiceRef.current) {
      streamServiceRef.current = TaskStreamService.getInstance(streamOptions);
    }
  }, [streamOptions]);

  // Context7 Pattern: Event handler with side effects
  const handleTaskEvent = useCallback(
    (event: TaskStreamEvent) => {
      console.log("[useTaskRealtime] Received event:", event);

      setState((prev) => ({
        ...prev,
        lastEvent: event,
        events: [event, ...prev.events.slice(0, 49)], // Keep last 50 events
      }));

      // Update task state based on event
      setUpdatedTasks((currentTasks) => {
        return currentTasks.map((task) => {
          if (task.id === event.taskId) {
            const updatedTask = { ...task };

            // Update last run based on event type
            if (updatedTask.lastRun) {
              const updatedRun = { ...updatedTask.lastRun };

              switch (event.type) {
                case "task.status":
                  updatedRun.status = event.data.status as TaskStatus;
                  if (event.data.attempts !== undefined) {
                    updatedRun.attempts = event.data.attempts;
                  }
                  break;

                case "task.progress":
                  updatedRun.progress = event.data.progress;
                  if (event.data.status) {
                    updatedRun.status = event.data.status as TaskStatus;
                  }
                  break;

                case "task.output":
                  updatedRun.output = event.data.output;
                  updatedRun.status = "completed";
                  updatedRun.progress = 100;
                  updatedRun.completedAt = event.timestamp;
                  if (event.data.duration) {
                    updatedRun.duration = event.data.duration;
                  }
                  break;

                case "task.error":
                  updatedRun.status = "failed";
                  updatedRun.error = event.data.error;
                  updatedRun.completedAt = event.timestamp;
                  if (event.data.duration) {
                    updatedRun.duration = event.data.duration;
                  }
                  break;

                case "task.triggered":
                  updatedRun.status = "pending";
                  updatedRun.createdAt = event.timestamp;
                  updatedRun.attempts = 1;
                  updatedRun.progress = 0;
                  updatedRun.error = undefined;
                  updatedRun.output = undefined;
                  break;

                case "task.completed":
                  updatedRun.status = "completed";
                  updatedRun.progress = 100;
                  updatedRun.completedAt = event.timestamp;
                  if (event.data.output) {
                    updatedRun.output = event.data.output;
                  }
                  if (event.data.duration) {
                    updatedRun.duration = event.data.duration;
                  }
                  break;
              }

              updatedTask.lastRun = updatedRun;
            }

            return updatedTask;
          }
          return task;
        });
      });

      // Context7 Pattern: User notifications based on events
      if (notifyOnComplete && event.type === "task.completed") {
        const taskName =
          tasks.find((t) => t.id === event.taskId)?.name || event.taskId;
        toast({
          title: "Task Completed",
          description: `${taskName} has finished successfully`,
        });
      }

      if (notifyOnError && event.type === "task.error") {
        const taskName =
          tasks.find((t) => t.id === event.taskId)?.name || event.taskId;
        toast({
          title: "Task Failed",
          description: `${taskName} encountered an error: ${event.data.error}`,
          variant: "destructive",
        });
      }
    },
    [tasks, toast, notifyOnComplete, notifyOnError],
  );

  // Context7 Pattern: Connection state management
  const handleConnectionStateChange = useCallback((connectionState: string) => {
    setState((prev) => ({
      ...prev,
      connectionState: connectionState as TaskRealtimeState["connectionState"],
      isConnected: connectionState === "connected",
    }));
  }, []);

  // Connect and subscribe to events
  const connect = useCallback(async () => {
    if (!streamServiceRef.current) return;

    try {
      setState((prev) => ({ ...prev, error: null }));

      // Subscribe to all task events
      unsubscribeRef.current = streamServiceRef.current.subscribe(
        "*",
        handleTaskEvent,
      );

      // Listen to connection state changes
      streamServiceRef.current.on(
        "connectionState",
        handleConnectionStateChange,
      );
      streamServiceRef.current.on("maxReconnectAttemptsReached", () => {
        setState((prev) => ({
          ...prev,
          error:
            "Failed to maintain real-time connection. Please refresh the page.",
        }));
      });

      // Connect to the stream
      await streamServiceRef.current.connect(chatId);

      // Update subscriber count
      setState((prev) => ({
        ...prev,
        subscriberCount: streamServiceRef.current?.getSubscriberCount() || 0,
      }));
    } catch (error) {
      console.error("[useTaskRealtime] Connection failed:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Connection failed",
      }));
    }
  }, [chatId, handleTaskEvent, handleConnectionStateChange]);

  // Disconnect from stream
  const disconnect = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (streamServiceRef.current) {
      streamServiceRef.current.off(
        "connectionState",
        handleConnectionStateChange,
      );
      streamServiceRef.current.disconnect();
    }

    setState((prev) => ({
      ...prev,
      connectionState: "disconnected",
      isConnected: false,
      subscriberCount: 0,
    }));
  }, [handleConnectionStateChange]);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Update tasks when prop changes
  useEffect(() => {
    setUpdatedTasks(tasks);
  }, [tasks]);

  // Context7 Pattern: Imperative actions
  const actions = {
    connect,
    disconnect,
    clearEvents: () => setState((prev) => ({ ...prev, events: [] })),
    getBufferedEvents: () =>
      streamServiceRef.current?.getBufferedEvents() || [],
    retryConnection: () => {
      disconnect();
      setTimeout(connect, 1000);
    },
  };

  return {
    // State
    ...state,
    tasks: updatedTasks,

    // Actions
    ...actions,

    // Computed values
    hasActiveConnections: state.subscriberCount > 0,
    recentEvents: state.events.slice(0, 10),

    // Context7 Pattern: Health check
    healthCheck: {
      isHealthy: state.isConnected && state.error === null,
      lastEventAge: state.lastEvent
        ? Date.now() - new Date(state.lastEvent.timestamp).getTime()
        : null,
      connectionUptime: state.isConnected
        ? Date.now() -
          (streamServiceRef.current?.getBufferedEvents()[0]
            ? new Date(
                streamServiceRef.current.getBufferedEvents()[0].timestamp,
              ).getTime()
            : Date.now())
        : 0,
    },
  };
}

// Context7 Pattern: Specialized hook for single task monitoring
export function useTaskRealtimeForTask(
  taskId: string,
  options: UseTaskRealtimeOptions = {},
) {
  const streamServiceRef = useRef<TaskStreamService | null>(null);
  const [taskEvents, setTaskEvents] = useState<TaskStreamEvent[]>([]);
  const [connectionState, setConnectionState] = useState<
    "disconnected" | "connecting" | "connected" | "reconnecting"
  >("disconnected");

  useEffect(() => {
    if (!streamServiceRef.current) {
      streamServiceRef.current = TaskStreamService.getInstance(options);
    }

    const unsubscribe = streamServiceRef.current.subscribe(taskId, (event) => {
      setTaskEvents((prev) => [event, ...prev.slice(0, 19)]); // Keep last 20 events
    });

    const handleConnectionState = (state: string) => {
      setConnectionState(state as any);
    };

    streamServiceRef.current.on("connectionState", handleConnectionState);

    // Auto-connect
    if (options.autoConnect !== false) {
      streamServiceRef.current.connect(options.chatId);
    }

    return () => {
      unsubscribe();
      streamServiceRef.current?.off("connectionState", handleConnectionState);
    };
  }, [taskId, options]);

  return {
    events: taskEvents,
    connectionState,
    isConnected: connectionState === "connected",
    clearEvents: () => setTaskEvents([]),
  };
}
