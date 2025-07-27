import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { getUserChats } from "@/services/chat-service-consolidated";

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's chats
    const chats = await getUserChats(session.user.id);

    return Response.json({ chats });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    return Response.json(
      { error: "Failed to load chat history" },
      { status: 500 }
    );
  }
}
