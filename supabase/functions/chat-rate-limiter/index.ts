import { randomUUID } from "crypto";

import express, { Request, Response } from "npm:express@4.18.2";

import { ApiError } from "../_shared/types";
import {
  supabase,
  getRateLimit,
  addToQueue,
  getEnvVariable,
  logEvent,
  recordMetric,
  measurePerformance,
} from "../_shared/utils";

// Initialize Express app
const app = express();
app.use(express.json());

// Add request ID middleware
app.use((req: Request, res: Response, next) => {
  req.headers["x-request-id"] = req.headers["x-request-id"] || randomUUID();
  next();
});

// Define routes
app.post("/chat-rate-limiter", async (req: Request, res: Response) => {
  const requestId = req.headers["x-request-id"] as string;
  const startTime = performance.now();

  // Initialize session data to capture for error logging
  let userId: string | undefined;

  try {
    // Record metric for incoming request
    recordMetric("chat_requests_total", 1, {
      method: "POST",
      path: "/chat-rate-limiter",
    });

    // First, verify the user with the server
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    userId = user?.id;

    if (userError || !user) {
      if (userError) {
        logEvent("error", "Supabase getUser error", "chat-rate-limiter", {
          error: userError.message,
          requestId,
        });
      }
      // Log unauthorized attempt
      logEvent("warn", "Unauthorized chat request", "chat-rate-limiter", {
        requestId,
      });

      recordMetric("unauthorized_requests", 1, {
        service: "chat-rate-limiter",
      });

      return res.status(401).json({ error: "Unauthorized" });
    }

    // Ensure userId is defined before proceeding (should always be true after the check above)
    if (!userId) {
      logEvent(
        "error",
        "Internal error: userId undefined after auth check",
        "chat-rate-limiter",
        { requestId }
      );
      recordMetric("internal_errors", 1, {
        service: "chat-rate-limiter",
        error_type: "userId_undefined",
      });
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Log user request
    logEvent(
      "info",
      "Chat request received",
      "chat-rate-limiter",
      {
        requestId,
      },
      undefined,
      userId
    );

    // Check rate limits for chat resources
    const rateLimit = await getRateLimit(userId, "chat");

    if (!rateLimit.allowed) {
      // Log rate limit exceeded
      logEvent(
        "warn",
        "Rate limit exceeded for chat",
        "chat-rate-limiter",
        {
          limit: rateLimit.limit,
          current: rateLimit.current,
          maximum: rateLimit.maximum,
          resetAfter: rateLimit.resetAfter,
          requestId,
        },
        undefined,
        userId
      );

      recordMetric("rate_limit_exceeded", 1, {
        resource: "chat",
        user_id: userId,
      });

      return res.status(429).json({
        error: "Rate limit exceeded",
        limit: rateLimit.limit,
        current: rateLimit.current,
        maximum: rateLimit.maximum,
        resetAfter: rateLimit.resetAfter,
      });
    }

    // Get user's subscription tier for priority
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("tier")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    // Calculate priority based on subscription tier
    let priority = 1; // Default priority
    if (subscription) {
      switch (subscription.tier) {
        case "business":
          priority = 4;
          break;
        case "premium":
          priority = 3;
          break;
        case "basic":
          priority = 2;
          break;
      }
    }

    // Queue management
    const queuePosition = await addToQueue(userId, priority);
    if (queuePosition > 0) {
      // Log queued request
      logEvent(
        "info",
        "Chat request queued",
        "chat-rate-limiter",
        {
          queuePosition,
          priority,
          requestId,
        },
        undefined,
        userId
      );

      recordMetric("queued_requests", 1, {
        service: "chat",
        position: queuePosition,
        priority,
      });

      return res.status(202).json({
        queuePosition,
        estimatedWaitTime: queuePosition * 2, // Rough estimate in seconds
        priority,
      });
    }

    // Forward the request to the chat service using our performance measurement utility
    const response = await measurePerformance(
      "chat_service_request",
      "chat",
      async () => {
        const fetchResponse = await fetch(
          getEnvVariable("CHAT_SERVICE_URL") || "",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.authorization || "",
              "X-Request-ID": requestId,
            },
            body: JSON.stringify(req.body),
          }
        );

        const data = await fetchResponse.json();
        return { status: fetchResponse.status, data };
      },
      { requestId },
      userId
    );

    // Log successful response
    logEvent(
      "info",
      "Chat request processed successfully",
      "chat-rate-limiter",
      {
        status: response.status,
        requestId,
      },
      undefined,
      userId
    );

    recordMetric("successful_requests", 1, {
      service: "chat",
    });

    return res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };

    // Log error
    logEvent(
      "error",
      "Error processing chat request",
      "chat-rate-limiter",
      {
        error: apiError.message,
        requestId,
      },
      undefined,
      userId
    );

    recordMetric("error_requests", 1, {
      service: "chat",
      error_type: error instanceof Error ? error.constructor.name : "unknown",
    });

    return res.status(500).json({ error: apiError.message });
  } finally {
    // Record overall request duration
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    recordMetric("request_duration_ms", duration, {
      service: "chat-rate-limiter",
      path: "/chat-rate-limiter",
      method: "POST",
    });
  }
});

// Default route
app.all("*", (_req: Request, res: Response) => {
  return res.status(404).json({ error: "Not Found" });
});

export default app;
