import { notFound } from "next/navigation";

import { UnifiedChatContainer } from "@/components/ui/unified-chat/UnifiedChatContainer";
import { ChatRepository } from "@/_infrastructure/repositories/chat-repository";
import { createServerClient } from "@/lib/supabase/server";

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const chatRepository = new ChatRepository();
  const chat = await chatRepository.getById(params.id);

  if (!chat) {
    notFound();
  }

  const isReadonly = chat.userId !== user?.id;

  return (
    <div className="flex h-screen flex-col">
      <UnifiedChatContainer id={params.id} isReadonly={isReadonly} />
    </div>
  );
}
