import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import { handle } from "hono/vercel";

// Import route handlers
// These will be created progressively as needed
import { languageDetectionMiddleware } from "@/app/api/middleware/language";
import { redisCacheMiddleware, redisApiCacheMiddleware } from "@/lib/redis";
import {
  subscriptionRateLimit,
  ResourceType,
} from "@/app/api/middleware/subscription-rate-limit";
import { setupAdminRoutes } from "@/app/api/routes/admin";
import { setupAuthRoutes } from "@/app/api/routes/auth";
import { setupCaseRoutes } from "@/app/api/routes/cases";
import { setupDocumentRoutes } from "@/app/api/routes/documents";
import { setupImmigrationRoutes } from "@/app/api/routes/immigration";
import { setupProfileRoutes } from "@/app/api/routes/profile";
import { setupSubscriptionRoutes } from "@/app/api/routes/subscription";
import { setupUserRoutes } from "@/app/api/routes/users";

// Import application services (placeholder paths - adjust if needed)
// import { ChatService as DomainChatService } from "@/_core/chat/services/chat-service";
import type { Locale } from "@/i18n";
// import { repositoryFactory } from "@/_infrastructure/repositories";

// Import language middleware

// Import advanced middleware from our new implementations
import { verifyUserIsAdmin } from "@/lib/actions/admin"; // Import the server action
import {
  createEdgeClient,
  TypedSSRSupabaseClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/client";
// import { ChatApplicationService } from "@/services/chat-service-consolidated";

// New import for the active Sentry middleware
import { sentryErrorLoggerMiddleware } from "../hono/middleware/sentry-error-logger";

import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";

// --- Define App Environment (Bindings & Variables) ---
export type AppEnv = {
  Bindings: {
    OPENAI_API_KEY: string;
    // Add other env vars if needed
  };
  Variables: {
    user: User | null;
    // chatService: ChatApplicationService;
    locale: Locale;
    translations: Record<string, any>;
    db: TypedSSRSupabaseClient;
    // Add other context variables (e.g., dbClient, services)
  };
};

// Create Hono app with typed environment
const app = new Hono<AppEnv>();

// SIMPLE TEST ROUTE
app.get("/ping", (c) => {
  console.log("[HONO /api/ping] Received request");
  return c.json({
    message: "pong from /api/ping",
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------
// Initialize Advanced Services - Sentry init removed
// -----------------------------
// // Initialize Sentry for error tracking - REMOVED
// initializeSentry();

// // Add shutdown handler for graceful exit - REMOVED
// process.on("SIGTERM", async () => {
//   console.log("SIGTERM received, closing connections");
//   await closeSentry();
//   process.exit(0);
// });

// -----------------------------
// Instantiate Services
// -----------------------------
// const repositoryFactory = new RepositoryFactory(supabase); // Example if needed
// const domainChatService = new DomainChatService();
const openaiApiKey = process.env.OPENAI_API_KEY || "";
if (!openaiApiKey) {
  console.warn("OPENAI_API_KEY is not set!");
  // Potentially throw error or handle gracefully
}
// const chatServiceInstance = new ChatApplicationService(
//   repositoryFactory,
//   domainChatService,
//   openaiApiKey
// );

// -----------------------------
// Middleware
// -----------------------------
// Apply Sentry error logging first to capture errors in all other middleware
app.use("*", sentryErrorLoggerMiddleware({ component: "api" }));

// Standard middleware
app.use("*", logger());
app.use("*", timing());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Request-Id"],
    maxAge: 600,
    credentials: true,
  }),
);

// Apply Language Detection early in the pipeline
app.use(
  "*",
  languageDetectionMiddleware({
    // Add options if needed, e.g., cookieName: 'MY_APP_LOCALE'
  }),
);

// Add middleware to set services in context
// app.use("*", async (c, next) => {
//   c.set("chatService", chatServiceInstance); // Set the instantiated service
//   await next();
// });

// Add middleware to set Supabase client in context
app.use("*", async (c, next) => {
  try {
    const dbClient = createEdgeClient(c.req.raw);
    c.set("db", dbClient);
  } catch (error) {
    console.error("Failed to create Supabase client for context:", error);
    // Depending on strictness, you might throw or set db to null/undefined
    // For now, let's proceed, but requests needing db might fail if it's not set.
    // Consider throwing an HTTPException if db is critical for all subsequent routes.
  }
  await next();
});

// -----------------------------
// Advanced Caching Strategy
// -----------------------------
// Use Redis-backed caching for GET requests with user-specific keys
// Initialize Redis caching
app.use(
  "*",
  redisApiCacheMiddleware({
    ttl: 300, // 5 minutes cache time
    varyByAuth: true, // Create different cache entries based on user
  }),
);

// Fallback to standard caching for better performance
/* // Commented out Hono's standard cache
app.use(
  "*",
  cache({
    cacheName: "api-cache",
    cacheControl: "max-age=300, stale-while-revalidate=60",
    wait: true, // Ensure cache is set before responding
  })
);
*/

// -----------------------------
// Error handling middleware
// -----------------------------
app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.url}:`, err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          status: err.status,
        },
      },
      err.status,
    );
  }

  return c.json(
    {
      success: false,
      error: {
        message:
          process.env.NODE_ENV === "development"
            ? err.message || "Internal Server Error"
            : "Internal Server Error",
        status: 500,
      },
    },
    500,
  );
});

// -----------------------------
// Health check & public routes
// -----------------------------
app.get("/", (c) => {
  return c.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  });
});

// -----------------------------
// Auth middleware (updated to use typed context and set user)
// -----------------------------
const auth = async (c: Context<AppEnv>, next: () => Promise<any>) => {
  try {
    const authHeader = c.req.header("Authorization");
    console.log(
      `[HONO AUTH] Processing auth for: ${c.req.url}, Auth header present: ${!!authHeader}`,
    );

    if (!authHeader?.startsWith("Bearer ")) {
      c.set("user", null); // Ensure user is null if auth fails early
      console.log(
        `[HONO AUTH] Missing or invalid Bearer token format: ${authHeader?.substring(0, 15) || "undefined"}`,
      );
      throw new HTTPException(401, {
        message: "Unauthorized: Missing Bearer token",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log(
      `[HONO AUTH] Attempting to validate token with Service Client: ${token.substring(0, 10)}...`,
    );

    // Use the Service Role Client for validating the Bearer token
    const serviceClient = createSupabaseServiceClient();
    const {
      data: { user },
      error,
    } = await serviceClient.auth.getUser(token);

    if (error || !user) {
      c.set("user", null); // Set user to null on error
      console.error("[HONO AUTH] Supabase auth error:", error);
      throw new HTTPException(401, { message: "Invalid token" });
    }

    // Add user to context
    console.log(
      `[HONO AUTH] Authentication successful for user: ${user.id.substring(0, 8)}...`,
    );
    c.set("user", user);
    await next(); // Call next *after* setting user
  } catch (error) {
    c.set("user", null); // Ensure user is null if any auth error occurs
    if (error instanceof HTTPException) throw error; // Re-throw known HTTP exceptions
    console.error("[HONO AUTH] Unhandled auth middleware error:", error);
    throw new HTTPException(401, { message: "Authentication failed" });
  }
};

// -----------------------------
// Admin-only middleware for protected routes
// -----------------------------
const adminOnly = async (c: Context<AppEnv>, next: () => Promise<any>) => {
  try {
    const user = c.get("user");
    // Ensure user was authenticated
    if (!user || !user.id) {
      // Check for user and user.id
      throw new HTTPException(401, {
        message: "Authentication required, user not found or ID missing",
      });
    }

    // Call the authoritative server action to check admin status
    const isActuallyAdmin = await verifyUserIsAdmin(user.id);

    if (!isActuallyAdmin) {
      throw new HTTPException(403, {
        message: "Forbidden: Admin access required",
      });
    }

    await next();
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    console.error("Admin middleware error:", error);
    // Ensure user.id is available for logging if user exists
    const userIdForLog = c.get("user")?.id || "unknown_user";
    console.error(`Admin middleware error for user: ${userIdForLog}`, error);
    throw new HTTPException(500, {
      // Changed to 500 for unexpected errors
      message: "Admin access verification failed due to an internal error",
    });
  }
};

// -----------------------------
// Apply route-specific rate limiting
// -----------------------------
// Rate limit documents endpoints
app.use(
  "/documents/*",
  subscriptionRateLimit({
    resourceType: ResourceType.API,
    errorMessage: "You have exceeded your documents API request limit.",
  }),
);

// Apply special rate limits to scraping features
app.use(
  "/scrape/*",
  subscriptionRateLimit({
    resourceType: ResourceType.SCRAPING,
    errorMessage: "You have exceeded your web scraping request limit.",
  }),
);

// Apply special rate limits to vector operations (embeddings, etc.)
app.use(
  "/vectors/*",
  subscriptionRateLimit({
    resourceType: ResourceType.VECTOR,
    errorMessage: "You have exceeded your vector operations request limit.",
  }),
);

// Apply special rate limits to research and AI features
app.use(
  "/research/*",
  subscriptionRateLimit({
    resourceType: ResourceType.RESEARCH,
    errorMessage: "You have exceeded your research and AI request limit.",
  }),
);

// Chat API also consumes research tokens
app.use(
  "/chat/*",
  subscriptionRateLimit({
    resourceType: ResourceType.RESEARCH,
    errorMessage: "You have exceeded your chat API request limit.",
  }),
);

// -----------------------------
// Protected API routes
// -----------------------------
// Add protected routes that require authentication
app.use("/auth/*", auth);
app.use("/documents/*", auth);
app.use("/profile/*", auth);
app.use("/immigration/*", auth);
app.use("/cases/*", auth);
app.use("/chat/*", auth);
app.use("/subscription/*", auth);

// Add admin-only routes
app.use("/admin/*", auth, adminOnly);

// -----------------------------
// Set up all route handlers
// -----------------------------

// Cast app to any to bypass the type checking for route setup functions
// The route setup functions expect a different environment type
setupAdminRoutes(app as any);
setupAuthRoutes(app as any);
setupCaseRoutes(app as any);
setupDocumentRoutes(app as any);
setupImmigrationRoutes(app as any);
setupProfileRoutes(app as any);
setupSubscriptionRoutes(app as any);

// Mount the new User routes
// The app.route('/api/users', setupUserRoutes(app)) pattern is common
// or app.route('/users', userRoutesInstance)
// Given setupUserRoutes takes app and returns a Hono instance,
// we can use app.route directly if setupUserRoutes is modified to return the router,
// or mount it if setupUserRoutes directly adds routes to the passed app instance.
// My created setupUserRoutes returns a Hono instance, so we use app.route.
const userRoutes = setupUserRoutes(app); // This passes the main app for context types, but returns a new Hono sub-router
app.route("/users", userRoutes);

// Export the Vercel-compatible handler
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);
