import { auth } from "@/lib/auth";
import {
  getChatSessionById,
  getVotesForMessagesInSession,
  voteMessage,
  getMessageById,
} from "@/supabase/queries";
import type { ExtendedUser } from "@/types/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response("sessionId is required", { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chatSession = await getChatSessionById({ id: chatId });

  if (!chatSession) {
    return new Response("Chat session not found", { status: 404 });
  }

  if (chatSession.userId !== session.user.id) {
    return new Response("Unauthorized: You do not own this chat session", {
      status: 401,
    });
  }

  const votes = await getVotesForMessagesInSession({ sessionId: chatId });

  return Response.json(votes, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    messageId,
    type,
    chatId,
  }: { messageId: string; type: "up" | "down"; chatId?: string } =
    await request.json();

  if (!messageId || !type) {
    return new Response("messageId and type (up/down) are required", {
      status: 400,
    });
  }

  const authSession = await auth();
  const user = authSession?.user as ExtendedUser | undefined;

  if (!user || !user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const message = await getMessageById({ id: messageId });
  if (!message) {
    return new Response("Message not found", { status: 404 });
  }

  const currentChatSession = await getChatSessionById({
    id: message.sessionId,
  });
  if (!currentChatSession) {
    return new Response("Chat session not found for the message", {
      status: 404,
    });
  }

  if (currentChatSession.userId !== user.id) {
    return new Response(
      "Unauthorized: You do not own the chat this message belongs to",
      { status: 401 },
    );
  }

  await voteMessage({
    messageId,
    userId: user.id,
    isUpvoted: type === "up",
  });

  return new Response("Message vote updated", { status: 200 });
}
