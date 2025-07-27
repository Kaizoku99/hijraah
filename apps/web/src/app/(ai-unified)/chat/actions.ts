"use server";

import { generateText, Message } from "ai";
import { cookies } from "next/headers";

// TODO: Verify these imports point to valid DB query/utility functions
import { VisibilityType } from "@/components/ui/visibility-selector";
import { myProvider } from "@/lib/ai/providers"; // Assuming this path is correct
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from "@/supabase/queries";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel("title-model"),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  // TODO: Ensure getMessageById exists and returns expected structure
  const [message] = await getMessageById({ id });

  // TODO: Ensure deleteMessagesByChatIdAfterTimestamp exists and works
  if (message) {
    // Add check if message exists
    await deleteMessagesByChatIdAfterTimestamp({
      chatId: message.chatId,
      timestamp: message.createdAt,
    });
  } else {
    console.error(`Message with id ${id} not found for deletion.`);
    // Handle error appropriately
  }
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  // TODO: Ensure updateChatVisiblityById exists and works
  await updateChatVisiblityById({ chatId, visibility });
}
