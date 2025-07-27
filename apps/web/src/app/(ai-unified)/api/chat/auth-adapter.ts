import { NextRequest } from "next/server";
import {
  getAuthenticatedUser,
  createSupabaseServiceClient,
} from "@/lib/auth-config";
import { getGuestSessionFromCookies, UserWithGuest } from "@/lib/auth/guest";
import { logger } from "@/lib/logger";
import {
  authTracing,
  createTracedOperation,
  generateCorrelationId,
} from "@/lib/observability/tracing";

// Context7 - Provider Isolation: Authentication result interface
export interface AuthResult {
  user: UserWithGuest;
  token?: string;
  isGuest: boolean;
  permissions: string[];
  correlationId: string; // Context7 - Tracing: Request correlation
}

// Context7 - Provider Isolation: Authentication error types
export class AuthenticationError extends Error {
  public correlationId: string;

  constructor(
    message: string,
    public statusCode: number = 401,
    correlationId?: string
  ) {
    super(message);
    this.name = "AuthenticationError";
    this.correlationId = correlationId || generateCorrelationId();
  }
}

/**
 * Unified authentication adapter for (ai-unified) chat API
 * Context7 - Modularity: Clean adapter pattern with distributed tracing
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<AuthResult> {
  const correlationId = generateCorrelationId();

  return createTracedOperation(
    {
      name: "auth.authenticate_request",
      attributes: {
        "auth.correlation_id": correlationId,
        "http.user_agent": request.headers.get("user-agent") || "",
        "http.client_ip":
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "",
      },
    },
    async (span) => {
      try {
        // Method 1: Bearer token authentication (existing API clients)
        const authHeader = request.headers.get("Authorization");
        if (authHeader?.startsWith("Bearer ")) {
          span.setAttributes({ "auth.method": "bearer_token" });
          return await authenticateWithBearerToken(authHeader, correlationId);
        }

        // Method 2: Cookie-based authentication (web app)
        const cookieAuth = await authenticateWithCookies(
          request,
          correlationId
        );
        if (cookieAuth) {
          span.setAttributes({ "auth.method": "cookies" });
          return cookieAuth;
        }

        // Method 3: Guest session authentication
        const guestAuth = await authenticateGuestSession(
          request,
          correlationId
        );
        if (guestAuth) {
          span.setAttributes({ "auth.method": "guest_session" });
          return guestAuth;
        }

        throw new AuthenticationError(
          "No valid authentication method found",
          401,
          correlationId
        );
      } catch (error) {
        // Context7 - Observability: Enhanced error logging with tracing
        logger.error("Authentication failed", {
          error: error instanceof Error ? error.message : String(error),
          correlationId,
          userAgent: request.headers.get("user-agent"),
          ip:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip"),
          traceId: span.spanContext().traceId,
        });

        if (error instanceof AuthenticationError) {
          throw error;
        }

        throw new AuthenticationError(
          "Authentication service error",
          500,
          correlationId
        );
      }
    }
  );
}

/**
 * Authenticate using Bearer token (for API clients)
 * Context7 - Provider Isolation with tracing
 */
async function authenticateWithBearerToken(
  authHeader: string,
  correlationId: string
): Promise<AuthResult> {
  return createTracedOperation(
    {
      name: "auth.bearer_token",
      attributes: {
        "auth.correlation_id": correlationId,
      },
    },
    async (span) => {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new AuthenticationError(
          "Invalid bearer token format",
          401,
          correlationId
        );
      }

      // Context7 - Tracing: External service call
      return createTracedOperation(
        {
          name: "auth.supabase.get_user",
          attributes: {
            "external.service": "supabase",
            "external.operation": "get_user",
          },
        },
        async (supabaseSpan) => {
          const supabase = createSupabaseServiceClient();

          const {
            data: { user },
            error,
          } = await supabase.auth.getUser(token);

          if (error || !user) {
            throw new AuthenticationError(
              "Invalid or expired token",
              401,
              correlationId
            );
          }

          // Convert to UserWithGuest format
          const userWithGuest: UserWithGuest = {
            ...user,
            fullName:
              user.user_metadata?.full_name ||
              user.email?.split("@")[0] ||
              "User",
            avatarUrl: user.user_metadata?.avatar_url || "",
            role: user.user_metadata?.role || "client",
            userType: "regular",
            isGuest: false,
          };

          // Context7 - Tracing: User context
          span.setAttributes({
            "user.id": user.id,
            "user.role": userWithGuest.role,
            "user.is_guest": false,
          });

          // Context7 - Observability: Track successful auth
          await authTracing.traceAuthAttempt("bearer_token", user.id, false);

          return {
            user: userWithGuest,
            token,
            isGuest: false,
            permissions: getUserPermissions(userWithGuest),
            correlationId,
          };
        }
      );
    }
  );
}

/**
 * Authenticate using cookies (for web app)
 * Context7 - Unified authentication flow with tracing
 */
async function authenticateWithCookies(
  request: NextRequest,
  correlationId: string
): Promise<AuthResult | null> {
  return createTracedOperation(
    {
      name: "auth.cookies",
      attributes: {
        "auth.correlation_id": correlationId,
      },
    },
    async (span) => {
      try {
        const auth = await getAuthenticatedUser(request);

        if (!auth.isAuthenticated || !auth.user) {
          return null;
        }

        // Context7 - Tracing: User context
        span.setAttributes({
          "user.id": auth.user.id,
          "user.role": auth.user.role,
          "user.is_guest": auth.isGuest,
        });

        // Context7 - Observability: Track successful auth
        await authTracing.traceAuthAttempt(
          "cookies",
          auth.user.id,
          auth.isGuest
        );

        return {
          user: auth.user,
          isGuest: auth.isGuest,
          permissions: auth.permissions,
          correlationId,
        };
      } catch (error) {
        // Context7 - Observability: Log but don't throw for cookie auth failures
        logger.warn("Cookie authentication failed", {
          error,
          correlationId,
          traceId: span.spanContext().traceId,
        });
        return null;
      }
    }
  );
}

/**
 * Authenticate guest session
 * Context7 - Guest user support with tracing
 */
async function authenticateGuestSession(
  request: NextRequest,
  correlationId: string
): Promise<AuthResult | null> {
  return createTracedOperation(
    {
      name: "auth.guest_session",
      attributes: {
        "auth.correlation_id": correlationId,
      },
    },
    async (span) => {
      try {
        const cookieStore = {
          get: (name: string) => request.cookies.get(name),
        };

        const guestUser = getGuestSessionFromCookies(cookieStore);

        if (!guestUser) {
          return null;
        }

        // Context7 - Tracing: Guest user context
        span.setAttributes({
          "user.id": guestUser.id,
          "user.is_guest": true,
          "user.session_id": guestUser.guestSessionId || "",
        });

        // Context7 - Observability: Track guest session
        await authTracing.traceAuthAttempt("guest_session", guestUser.id, true);

        return {
          user: guestUser,
          isGuest: true,
          permissions: getUserPermissions(guestUser),
          correlationId,
        };
      } catch (error) {
        logger.warn("Guest authentication failed", {
          error,
          correlationId,
          traceId: span.spanContext().traceId,
        });
        return null;
      }
    }
  );
}

/**
 * Get user permissions based on role and guest status
 * Context7 - Data-as-Code: Permission resolution with tracing
 */
function getUserPermissions(user: UserWithGuest): string[] {
  if (user.isGuest) {
    return [
      "chat:create",
      "chat:read:own",
      "artifacts:create",
      "artifacts:read:own",
      "session:temporary",
    ];
  }

  const role = user.role as string;

  switch (role) {
    case "admin":
      return [
        "chat:read:all",
        "chat:update:all",
        "chat:delete:all",
        "artifacts:read:all",
        "artifacts:update:all",
        "artifacts:delete:all",
        "users:read:all",
        "users:update:all",
        "system:admin",
      ];
    case "moderator":
      return [
        "chat:read:all",
        "chat:moderate",
        "artifacts:read:all",
        "artifacts:moderate",
        "users:read",
        "reports:create",
      ];
    default: // client
      return [
        "chat:create",
        "chat:read",
        "chat:update:own",
        "chat:delete:own",
        "artifacts:create",
        "artifacts:read",
        "artifacts:update:own",
        "artifacts:delete:own",
        "profile:read:own",
        "profile:update:own",
      ];
  }
}

/**
 * Check if user has specific permission
 * Context7 - Authorization helper with tracing
 */
export function hasPermission(auth: AuthResult, permission: string): boolean {
  const hasAccess = auth.permissions.includes(permission);

  // Context7 - Tracing: Permission check
  authTracing.tracePermissionCheck(permission, auth.user.id, hasAccess);

  return hasAccess;
}

/**
 * Require specific permission for operation
 * Context7 - Authorization guard with enhanced error context
 */
export function requirePermission(auth: AuthResult, permission: string): void {
  if (!hasPermission(auth, permission)) {
    throw new AuthenticationError(
      `Permission required: ${permission}`,
      403,
      auth.correlationId
    );
  }
}

/**
 * Create response for authentication errors
 * Context7 - Standardized error responses with tracing context
 */
export function createAuthErrorResponse(error: AuthenticationError): Response {
  return new Response(
    JSON.stringify({
      error: error.message,
      code: error.statusCode,
      correlationId: error.correlationId,
      timestamp: new Date().toISOString(),
    }),
    {
      status: error.statusCode,
      headers: {
        "Content-Type": "application/json",
        "X-Correlation-ID": error.correlationId,
      },
    }
  );
}

// Context7 - Modular exports with enhanced tracing
export const authAdapter = {
  authenticateRequest,
  hasPermission,
  requirePermission,
  createAuthErrorResponse,
  AuthenticationError,
};
