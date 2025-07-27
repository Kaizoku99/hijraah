import { render, screen } from "@testing-library/react";

import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatMessage as ChatMessageType } from "@/types/chat";

describe("ChatMessage", () => {
  const mockMessage: ChatMessageType = {
    id: "1",
    session_id: "session-1",
    user_id: "user-1",
    role: "user",
    content: "Hello, world!",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    metadata: {
      user_name: "John Doe",
      status: "sent",
    },
  };

  it("renders user message correctly", () => {
    render(<ChatMessage message={mockMessage} userAvatar="/avatar.png" />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("renders AI message correctly", () => {
    const aiMessage = {
      ...mockMessage,
      role: "assistant" as const,
      user_id: "ai",
    };

    render(<ChatMessage message={aiMessage} />);

    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<ChatMessage message={mockMessage} isLoading />);

    expect(screen.getByTestId("message-skeleton")).toBeInTheDocument();
  });

  it("shows error state with retry button", () => {
    const onRetry = jest.fn();
    const error = new Error("Failed to send message");

    render(
      <ChatMessage message={mockMessage} error={error} onRetry={onRetry} />
    );

    expect(screen.getByText("Failed to send message")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();

    screen.getByText("Retry").click();
    expect(onRetry).toHaveBeenCalled();
  });

  it("renders attachments when present", () => {
    const messageWithAttachments = {
      ...mockMessage,
      metadata: {
        ...mockMessage.metadata,
        attachments: [
          { id: "1", name: "document.pdf", type: "pdf", url: "/doc.pdf" },
        ],
      },
    };

    render(<ChatMessage message={messageWithAttachments} />);

    expect(screen.getByText("document.pdf")).toBeInTheDocument();
  });

  it("handles missing metadata gracefully", () => {
    const messageWithoutMetadata = {
      ...mockMessage,
      metadata: undefined,
    };

    render(<ChatMessage message={messageWithoutMetadata} />);

    expect(screen.getByText("You")).toBeInTheDocument();
  });
});
