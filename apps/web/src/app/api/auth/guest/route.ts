import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, authConfig } from "@/lib/auth-config";
import {
  createGuestSession,
  setGuestSessionCookies,
  clearGuestSessionCookies,
  convertGuestToRegular,
  UserWithGuest,
} from "@/lib/auth/guest";
// Context7 - Observability: Request tracking
interface GuestAuthRequest {
  action: "create" | "convert" | "clear";
  email?: string;
  password?: string;
  fullName?: string;
  guestUserId?: string;
}

// Context7 - Data validation
function validateGuestAuthRequest(data: any): GuestAuthRequest {
  const { action, email, password, fullName, guestUserId } = data;

  if (!action || !["create", "convert", "clear"].includes(action)) {
    throw new Error("Invalid action. Must be 'create', 'convert', or 'clear'");
  }

  if (action === "convert") {
    if (!email || !password || !guestUserId) {
      throw new Error(
        "Email, password, and guestUserId required for conversion"
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Basic password validation
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  }

  return { action, email, password, fullName, guestUserId };
}

/**
 * POST /api/auth/guest
 * Create guest session
 * Context7 - Provider Isolation: Dedicated guest auth endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Context7 - Observability: Request metadata
    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const realIp = request.headers.get("x-real-ip") || "";
    const ipAddress = forwardedFor.split(",")[0] || realIp || "unknown";

    // Check if guest authentication is enabled
    if (!authConfig.guestSessionEnabled) {
      return NextResponse.json(
        { error: "Guest authentication is disabled" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedRequest = validateGuestAuthRequest(body);

    // Context7 - Observability: Log request
    console.log("Guest auth request:", {
      action: validatedRequest.action,
      ip: ipAddress,
      userAgent: userAgent.substring(0, 100), // Truncate for logs
    });

    switch (validatedRequest.action) {
      case "create": {
        // Create new guest session
        const guestUser = await createGuestSession({
          userAgent,
          ipAddress,
        });

        // Set session cookies
        const response = NextResponse.json({
          success: true,
          user: {
            id: guestUser.id,
            email: guestUser.email,
            fullName: guestUser.fullName,
            isGuest: true,
            sessionId: guestUser.guestSessionId,
          },
        });

        // Set cookies on the response
        const cookieStore = {
          set: (name: string, value: string, options: any) => {
            response.cookies.set(name, value, options);
          },
        };

        setGuestSessionCookies(guestUser, cookieStore);

        return response;
      }

      case "convert": {
        if (
          !validatedRequest.email ||
          !validatedRequest.password ||
          !validatedRequest.guestUserId
        ) {
          return NextResponse.json(
            { error: "Missing required fields for conversion" },
            { status: 400 }
          );
        }

        // Convert guest to regular user
        const regularUser = await convertGuestToRegular(
          validatedRequest.guestUserId,
          validatedRequest.email,
          validatedRequest.password,
          validatedRequest.fullName
        );

        // Clear guest session cookies
        const response = NextResponse.json({
          success: true,
          user: {
            id: regularUser.id,
            email: regularUser.email,
            fullName: regularUser.fullName,
            isGuest: false,
          },
          message: "Successfully converted to regular account",
        });

        const cookieStore = {
          set: (name: string, value: string, options: any) => {
            response.cookies.set(name, value, options);
          },
        };

        clearGuestSessionCookies(cookieStore);

        return response;
      }

      case "clear": {
        // Clear guest session
        const response = NextResponse.json({
          success: true,
          message: "Guest session cleared",
        });

        const cookieStore = {
          set: (name: string, value: string, options: any) => {
            response.cookies.set(name, value, options);
          },
        };

        clearGuestSessionCookies(cookieStore);

        return response;
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Guest auth error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Guest authentication failed",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/guest
 * Check guest session status
 * Context7 - Observability: Session status endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // Check if guest authentication is enabled
    if (!authConfig.guestSessionEnabled) {
      return NextResponse.json(
        { isGuest: false, isAuthenticated: false },
        { status: 200 }
      );
    }

    // Create a simple cookie store interface
    const cookieStore = {
      get: (name: string) => request.cookies.get(name),
    };

    // Check for guest session
    const isGuest = cookieStore.get("is_guest_user")?.value === "true";
    const guestData = cookieStore.get("guest_data")?.value;

    if (isGuest && guestData) {
      try {
        const parsedGuestData = JSON.parse(guestData);
        return NextResponse.json({
          isGuest: true,
          isAuthenticated: true,
          user: {
            id: parsedGuestData.id,
            email: parsedGuestData.email,
            fullName: parsedGuestData.fullName,
            sessionId: parsedGuestData.sessionId,
          },
        });
      } catch (parseError) {
        console.error("Failed to parse guest data:", parseError);
      }
    }

    // Check regular Supabase authentication
    const supabase = createSupabaseServerClient(cookieStore);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      return NextResponse.json({
        isGuest: false,
        isAuthenticated: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.user_metadata?.full_name || "User",
        },
      });
    }

    // No authentication found
    return NextResponse.json({
      isGuest: false,
      isAuthenticated: false,
    });
  } catch (error) {
    console.error("Guest auth status check error:", error);

    return NextResponse.json(
      {
        error: "Failed to check authentication status",
        isGuest: false,
        isAuthenticated: false,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/auth/guest
 * CORS preflight
 * Context7 - Provider Isolation: CORS handling
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
