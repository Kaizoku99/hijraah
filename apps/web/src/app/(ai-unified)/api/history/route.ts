import { NextRequest } from "next/server";

import { getUserChats } from "@/services/chat-service-consolidated";
import type { Database } from "@/types/database.types";
import {
  authenticateRequest,
  createAuthErrorResponse,
  AuthenticationError,
} from "../chat/auth-adapter";

/**
 * GET /api/history - Fetch user's chat history
 * 
 * Context7 - Updated to use consolidated middleware authentication
 * Uses auth-adapter to leverage middleware headers for better performance
 */
export async function GET(request: NextRequest) {
  try {
    // Use the consolidated auth adapter instead of direct Supabase calls
    // This leverages middleware headers for optimal performance
    const authResult = await authenticateRequest(request as any);
    
    console.log("API /history - Auth result:", {
      hasUser: !!authResult.user,
      userId: authResult.user?.id?.substring(0, 8) + "..." || null,
      isGuest: authResult.isGuest,
      method: "consolidated_auth_adapter"
    });

    // Get user's chats using the authenticated user ID
    const chats = await getUserChats(authResult.user.id);

    console.log("Chat history fetched successfully", {
      userId: authResult.user.id.substring(0, 8) + "...", // Log partial ID for debugging
      chatCount: chats.length,
      method: "consolidated_auth_adapter",
      isGuest: authResult.isGuest
    });

    // Return an array for simpler client consumption
    return Response.json(chats);
  } catch (error) {
    // Handle authentication errors specifically
    if (error instanceof AuthenticationError) {
      console.warn("Chat history: Authentication failed", {
        error: error.message,
        statusCode: error.statusCode,
        correlationId: error.correlationId,
        path: request.nextUrl.pathname
      });
      return createAuthErrorResponse(error);
    }

    console.error("Failed to get chat history:", error);
    return Response.json(
      { error: "Failed to load chat history" },
      { status: 500 },
    );
  }
}
