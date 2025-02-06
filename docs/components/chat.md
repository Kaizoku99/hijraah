# Chat Components Documentation

## Overview

The chat system consists of several components that work together to provide a real-time chat experience with AI assistance. The system uses Supabase for data storage and real-time updates, and integrates with various AI models for responses.

## Components

### ChatMessage

A component that renders individual chat messages with support for user and AI messages, loading states, and error handling.

```tsx
import { ChatMessage } from '@/components/chat/ChatMessage';

// Example usage
<ChatMessage
  message={message}
  userAvatar="/avatar.png"
  isLoading={false}
  error={null}
  onRetry={() => {}}
/>
```

#### Props

- `message`: ChatMessage - The message object to display
- `userAvatar`: string (optional) - URL of the user's avatar
- `isLoading`: boolean (optional) - Whether the message is in a loading state
- `error`: Error | null (optional) - Error object if message failed to send
- `onRetry`: () => void (optional) - Callback function for retry button

### ChatInput

A component for sending messages with support for attachments and auto-resizing.

```tsx
import { ChatInput } from '@/components/chat/ChatInput';

// Example usage
<ChatInput
  onSubmit={handleSubmit}
  isLoading={false}
  placeholder="Type your message..."
  maxLength={4000}
  showAttachments={true}
/>
```

#### Props

- `onSubmit`: (message: string, attachments?: ChatDocument[]) => Promise<void>
- `isLoading`: boolean (optional)
- `placeholder`: string (optional)
- `maxLength`: number (optional)
- `showAttachments`: boolean (optional)

## Context

### ChatProvider

A context provider that manages chat state and provides chat functionality to child components.

```tsx
import { ChatProvider, useChat } from '@/contexts/chat';

// Wrap your app
function App() {
  return (
    <ChatProvider>
      <YourComponents />
    </ChatProvider>
  );
}

// Use in components
function ChatComponent() {
  const {
    messages,
    session,
    isLoading,
    error,
    sendMessage,
    startNewSession,
    loadSession,
    clearSession,
  } = useChat();

  // Use chat functionality
}
```

#### Features

- Real-time message updates
- Session management
- Error handling
- Loading states
- Message persistence
- Attachment support

## Analytics

The chat system includes built-in analytics tracking for:

- Message metrics
- Session analytics
- Error tracking
- User satisfaction
- Performance metrics

```tsx
import { analytics } from '@/lib/services/analytics';

// Track events
await analytics.trackEvent({
  type: 'message.created',
  payload: message,
  timestamp: new Date().toISOString(),
});

// Get analytics
const stats = await analytics.getChatAnalytics(userId);
```

## Error Handling

The system includes comprehensive error handling with:

- Error boundaries for component-level errors
- Error states for messages
- Retry functionality
- Error tracking and reporting

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Wrap components
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Handle error
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## Loading States

The system provides consistent loading states across components:

```tsx
import { Loading, LoadingOverlay, LoadingButtonContent } from '@/components/ui/loading';

// Simple loading spinner
<Loading size="md" variant="spinner" text="Loading..." />

// Full-screen overlay
<LoadingOverlay blur text="Processing..." />

// Button loading state
<Button>
  <LoadingButtonContent loading loadingText="Sending...">
    Send Message
  </LoadingButtonContent>
</Button>
```

## Best Practices

1. **Error Handling**
   - Always wrap chat components with ErrorBoundary
   - Provide retry functionality for failed operations
   - Track and report errors for debugging

2. **Performance**
   - Use optimistic updates for better UX
   - Implement proper loading states
   - Cache messages and sessions appropriately

3. **Security**
   - Validate all user input
   - Implement proper access control
   - Sanitize message content before display

4. **Accessibility**
   - Provide proper ARIA labels
   - Ensure keyboard navigation
   - Support screen readers

## Testing

The system includes comprehensive tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test ChatMessage.test.tsx
```

See the test files for examples of:
- Component testing
- Context testing
- Integration testing
- Error handling testing 