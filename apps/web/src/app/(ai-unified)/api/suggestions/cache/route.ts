/**
 * Cache Management API Route
 * 
 * Provides endpoints for monitoring and managing the suggestions cache.
 * Includes statistics, invalidation, and cleanup operations.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { logger } from "@/lib/logger";
import {
  getSuggestionsCacheStats,
  invalidateUserSuggestionsCache,
  cleanupExpiredSuggestionsCache,
} from "@/lib/suggestions-cache";
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
} from "../../chat/auth-adapter";

// Request schemas
const invalidateRequestSchema = z.object({
  userId: z.string().optional(),
  action: z.enum(["invalidate", "cleanup", "stats"]),
});

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    try {
      await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }

    // Get cache statistics
    const stats = await getSuggestionsCacheStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Cache stats retrieval failed", 
      error instanceof Error ? error : new Error(String(error))
    );

    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to retrieve cache statistics" 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    let authResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }

    const { user } = authResult;
    const body = await request.json();
    const { action, userId } = invalidateRequestSchema.parse(body);

    let result: any = { success: true };

    switch (action) {
      case "stats":
        result.data = await getSuggestionsCacheStats();
        break;

      case "cleanup":
        await cleanupExpiredSuggestionsCache();
        result.message = "Cache cleanup completed";
        logger.info("Manual cache cleanup executed", { 
          executedBy: user.id 
        });
        break;

      case "invalidate":
        if (!userId) {
          return NextResponse.json(
            { 
              success: false, 
              error: "userId is required for invalidation" 
            },
            { status: 400 }
          );
        }
        
        const deletedCount = await invalidateUserSuggestionsCache(userId);
        result.data = { deletedCount };
        result.message = `Invalidated ${deletedCount} cache entries for user ${userId}`;
        
        logger.info("Manual cache invalidation executed", {
          executedBy: user.id,
          targetUserId: userId,
          deletedCount,
        });
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: "Invalid action" 
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid request format", 
          details: error.issues 
        },
        { status: 400 }
      );
    }

    logger.error("Cache management operation failed", 
      error instanceof Error ? error : new Error(String(error))
    );

    return NextResponse.json(
      { 
        success: false, 
        error: "Cache management operation failed" 
      },
      { status: 500 }
    );
  }
}
