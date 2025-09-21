# Resumable Streaming Implementation Guide

This document explains the complete implementation of resumable streaming for AI chatbots using the Vercel AI SDK v5 with Context7 principles.

## Overview

Resumable streaming allows AI conversations to be interrupted and resumed without losing progress. This is particularly useful for:

- Long-running AI responses that may be interrupted by network issues
- Users who navigate away and return to a conversation
- Maintaining conversation continuity across browser sessions
- Providing better user experience with error recovery

## Architecture

### Backend Implementation (`/api/chat/route.ts`)

#### Key Components

1. **Resumable Stream Context**
```typescript
import { createResumableStreamContext } from "resumable-stream";

const streamContext = createResumableStreamContext({
  waitUntil: after,
});
```

2. **Stream ID Management**
```typescript
// Store stream ID for resumption
await appendStreamId({ chatId, streamId });

// Retrieve stream IDs for a chat
const streamIds = await loadStreams(chatId);
```

3. **POST Handler - Creating Resumable Streams**
```typescript
// Create resumable stream
const resumableStream = await streamContext.resumableStream(
  streamId,
  () => {
    const uiStream = result.toUIMessageStream();
    return uiStream.pipeThrough(new JsonToSseTransformStream());
  }
);

// Return with proper response handling
return resumableStream.toUIMessageStreamResponse({
  originalMessages: allMessages,
  onFinish: ({ messages }) => {
    saveChat({ chatId, messages });
  },
});
```

4. **GET Handler - Resuming Streams**
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");
  
  if (chatId) {
    const streamIds = await loadStreams(chatId);
    const recentStreamId = streamIds[streamIds.length - 1];
    
    const emptyDataStream = createUIMessageStream({
      execute: () => {},
    });

    const resumedStream = await streamContext.resumableStream(
      recentStreamId,
      () => emptyDataStream.pipeThrough(new JsonToSseTransformStream()),
    );

    return new Response(resumedStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }
}
```

### Frontend Implementation

#### 1. Enhanced useChat Hook

```typescript
const {
  messages,
  sendMessage,
  stop,
  error,
  isLoading,
  resumeStream, // Key function for resuming
} = useChat({
  id: chatId,
  transport: new DefaultChatTransport({
    api: "/api/chat",
    credentials: "include",
  }),
  // Enable resumable streaming
  resume: true,
  onFinish: (message) => {
    // Handle successful completion
    setHasStreamError(false);
  },
  onError: (error) => {
    // Handle stream errors
    setHasStreamError(true);
    setStreamErrorMessage(error.message);
  },
});
```

#### 2. Auto-Resume on Mount

```typescript
useEffect(() => {
  if (currentChatId && resumeStream && !isLoading) {
    try {
      resumeStream();
    } catch (error) {
      console.warn("No stream to resume (expected for new chats)");
    }
  }
}, [currentChatId, resumeStream, isLoading]);
```

#### 3. Manual Resume Functionality

```typescript
const handleManualResume = useCallback(async () => {
  if (!resumeStream) return;

  setIsResuming(true);
  try {
    await resumeStream();
    toast({
      title: "Stream resumed",
      description: "Successfully resumed the interrupted response.",
    });
  } catch (error) {
    setHasStreamError(true);
    toast({
      title: "Resume failed",
      description: "Could not resume the stream.",
      variant: "destructive",
    });
  } finally {
    setIsResuming(false);
  }
}, [resumeStream, toast]);
```

#### 4. Stream Status Component

```typescript
<StreamStatus
  isStreaming={isLoading}
  isResuming={isResuming}
  hasError={hasStreamError}
  errorMessage={streamErrorMessage}
  onResume={handleManualResume}
  onRetry={handleRetry}
/>
```

## Database Schema

### Chat Sessions Table
```sql
-- Stream IDs stored in context field
context JSONB DEFAULT '{}' -- { "streamIds": ["uuid1", "uuid2"] }
```

### Repository Methods
```typescript
// Store stream ID
async storeStreamId(chatId: string, streamId: string): Promise<void>

// Get stream IDs for chat
async getStreamIdsForChat(chatId: string): Promise<string[]>

// Clean up old stream IDs
async deleteStreamIdsForChat(chatId: string): Promise<void>
```

## Usage Examples

### Basic Implementation

```typescript
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

function ResumableChat({ chatId }) {
  const { messages, sendMessage, resumeStream } = useChat({
    id: chatId,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    resume: true, // Enable resumable streaming
  });

  // Auto-resume on mount
  useEffect(() => {
    if (resumeStream) {
      resumeStream();
    }
  }, [resumeStream]);

  return (
    <div>
      {/* Chat messages */}
      {messages.map(message => (
        <div key={message.id}>{message.content}</div>
      ))}
      
      {/* Manual resume button */}
      <button onClick={resumeStream}>Resume Stream</button>
    </div>
  );
}
```

### Advanced Implementation with Error Handling

```typescript
function AdvancedResumableChat() {
  const [isResuming, setIsResuming] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { messages, sendMessage, resumeStream, error } = useChat({
    id: chatId,
    resume: true,
    onError: (err) => setHasError(true),
    onFinish: () => setHasError(false),
  });

  const handleResume = async () => {
    setIsResuming(true);
    try {
      await resumeStream();
    } catch (err) {
      console.error("Resume failed:", err);
    } finally {
      setIsResuming(false);
    }
  };

  return (
    <div>
      {hasError && (
        <div className="error-banner">
          Stream interrupted
          <button onClick={handleResume} disabled={isResuming}>
            {isResuming ? "Resuming..." : "Resume"}
          </button>
        </div>
      )}
      
      {/* Rest of chat UI */}
    </div>
  );
}
```

## Configuration Requirements

### Environment Variables

```bash
# Redis configuration for resumable-stream
REDIS_URL="redis://localhost:6379"
# OR
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### Dependencies

```json
{
  "dependencies": {
    "@ai-sdk/react": "^2.0.26",
    "ai": "^5.0.26",
    "resumable-stream": "^2.2.3"
  }
}
```

## Best Practices

### 1. Error Handling

- Always provide fallback UI for failed resumes
- Implement retry mechanisms for network failures
- Show clear status indicators to users

### 2. Performance

- Limit the number of stored stream IDs per chat (default: 5)
- Clean up expired streams regularly
- Use proper caching headers for stream responses

### 3. User Experience

- Auto-resume streams on page load when appropriate
- Provide manual resume controls for user control
- Show clear indicators for streaming status

### 4. Testing

- Test stream interruption and resumption
- Verify behavior across browser sessions
- Test error recovery scenarios

## Troubleshooting

### Common Issues

1. **"Stream context not available"**
   - Check Redis configuration
   - Verify `resumable-stream` is properly installed

2. **"No streams found"**
   - Normal for new chats
   - Check if stream IDs are being stored correctly

3. **Resume fails silently**
   - Check network connectivity
   - Verify stream hasn't expired in Redis

### Debug Logging

```typescript
// Enable debug logging
console.log("Stream IDs for chat:", await loadStreams(chatId));
console.log("Resuming stream:", streamId);
```

## Migration Guide

### From Non-Resumable to Resumable

1. Update API route to use `createResumableStreamContext`
2. Add `resume: true` to `useChat` configuration
3. Implement stream ID storage in database
4. Add error handling and recovery UI
5. Test thoroughly with interrupted streams

### Breaking Changes

- Requires Redis for stream persistence
- Changes response format for resumable streams
- May need database schema updates for stream ID storage

## Security Considerations

- Stream IDs should be UUIDs to prevent enumeration
- Validate chat ownership before resuming streams
- Implement rate limiting for resume requests
- Clean up expired streams to prevent memory leaks

## Performance Impact

- Minimal overhead for non-interrupted streams
- Redis memory usage for stream persistence
- Slightly larger response headers for stream metadata

This implementation provides a robust, production-ready solution for resumable streaming that enhances user experience while maintaining reliability and performance.
