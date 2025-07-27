"use client";

import { Chat } from "@/components/ui/chat";
import { DataStreamHandler } from "@/components/ui/data-stream-handler";
// Removed Skeleton as it was not used in the direct logic of ChatClientPage

// Client Component
const ChatClientPage = ({
  session,
  id,
  initialChatModel,
}: {
  session: any;
  id: string;
  initialChatModel: string;
}) => {
  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={initialChatModel}
        initialVisibility="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
};

export default ChatClientPage;
