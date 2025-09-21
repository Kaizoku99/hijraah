import { notFound } from "next/navigation";

import { UnifiedChatContainer } from "@/components/ui/unified-chat/UnifiedChatContainer";
import { ChatRepository } from "@/_infrastructure/repositories/chat-repository";
import { createClient } from "@/lib/supabase/server";

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  // Next.js 15: params is now a Promise that needs to be awaited
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const chatRepository = new ChatRepository();
  const chat = await chatRepository.getChatById(id);

  if (!chat) {
    notFound();
  }

  const isReadonly = chat.userId !== user?.id;

  return (
    <div className="flex h-screen flex-col">
      <UnifiedChatContainer id={id} isReadonly={isReadonly} />
    </div>
  );
}
