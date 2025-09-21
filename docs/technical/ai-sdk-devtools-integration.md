# AI SDK DevTools Integration - Context7 Implementation

This document provides comprehensive guidance on the AI SDK DevTools integration implemented in the Hijraah application, following Context7 architectural principles and best practices.

## Overview

AI SDK DevTools provides powerful debugging and monitoring capabilities for AI applications built with the Vercel AI SDK. Our implementation extends the basic DevTools with Context7-specific enhancements, providing:

- **Automatic Event Capture**: Seamlessly captures all AI SDK events from your chat components
- **Enhanced Debugging**: Context7-specific event filtering and analysis
- **Performance Monitoring**: Real-time insights into streaming performance and tool usage
- **Development-Only Integration**: Zero impact on production builds

## Installation Status

✅ **Package Installed**: `ai-sdk-devtools` is already included in the project dependencies via catalog configuration.

## Components Overview

### 1. AIDevtoolsWrapper (`/components/ai/ai-devtools-wrapper.tsx`)

The main wrapper component that initializes and configures the AI SDK DevTools:

```tsx
import { AIDevtoolsWrapper } from "@/components/ai/ai-devtools-wrapper";

// Basic usage (auto-detects development environment)
<AIDevtoolsWrapper />

// Advanced configuration
<AIDevtoolsWrapper 
  position="bottom"
  height={400}
  maxEvents={1000}
  modelId="gpt-4o"
  streamEndpoint="/api/chat"
  debug={true}
/>
```

**Key Features:**
- Environment-based rendering (development only)
- Configurable positioning and sizing
- Stream capture configuration
- Performance throttling for high-frequency events
- Global debug flag management

### 2. Enhanced DevTools Hook

The `useAIDevtoolsEnhanced` hook extends the basic DevTools functionality:

```tsx
import { useAIDevtoolsEnhanced } from "@/components/ai/ai-devtools-wrapper";

function MyComponent() {
  const devtools = useAIDevtoolsEnhanced();
  
  // Get chat-specific events
  const chatEvents = devtools.getChatEvents();
  
  // Get streaming performance stats
  const stats = devtools.getChatStats();
  
  // Filter events by type
  const errors = devtools.getErrorEvents();
  
  return (
    <div>
      <p>Total Events: {devtools.events.length}</p>
      <p>Chat Events: {chatEvents.length}</p>
      <p>Streaming Rate: {stats.averageStreamingRate} events/sec</p>
    </div>
  );
}
```

**Enhanced Methods:**
- `getChatEvents()`: Returns chat-specific events (text-delta, tool-calls, etc.)
- `getStreamingEvents()`: Returns streaming-related events only
- `getErrorEvents()`: Returns error events with enhanced context
- `getChatStats()`: Returns chat-optimized performance statistics

### 3. DevTools Dashboard (`/components/ai/ai-devtools-dashboard.tsx`)

A comprehensive dashboard for development monitoring:

```tsx
import { AIDevtoolsDashboard } from "@/components/ai/ai-devtools-dashboard";

// Add to your development layout or specific pages
<AIDevtoolsDashboard />
```

**Features:**
- Real-time event monitoring
- Performance metrics display
- Tool usage tracking
- Event history viewer
- Interactive controls (clear events, toggle capture)

### 4. Event Monitor Component

Lightweight monitoring for specific components:

```tsx
import { DevToolsEventMonitor } from "@/components/ai/ai-devtools-dashboard";

function UnifiedChatContainer() {
  return (
    <div>
      <DevToolsEventMonitor componentName="UnifiedChatContainer" />
      {/* Your chat component */}
    </div>
  );
}
```

## Integration Points

### Layout Integration

The DevTools are integrated into the main application layout (`apps/web/src/app/[locale]/layout.tsx`):

```tsx
import { AIDevtoolsWrapper } from "@/components/ai/ai-devtools-wrapper";

export default function LocaleLayout({ children, params }) {
  return (
    <div>
      {children}
      {/* AI SDK DevTools - Context7 Integration */}
      <AIDevtoolsWrapper 
        position="bottom"
        height={400}
        maxEvents={1000}
        modelId="gpt-4o"
        streamEndpoint="/api/chat"
        debug={process.env.NODE_ENV === "development"}
      />
    </div>
  );
}
```

### Component Integration

Key components have been enhanced with DevTools integration:

1. **UnifiedChatContainer**: Primary chat interface with comprehensive DevTools integration
2. **Chat Component**: Standard chat component with basic DevTools monitoring
3. **useResumableChat Hook**: Resumable streaming hook with DevTools support

## Event Types Captured

The DevTools automatically capture the following AI SDK events:

### Chat Events
- `text-delta`: Streaming text tokens
- `text-done`: Completed text generation
- `tool-call-start`: Tool execution begins
- `tool-call-result`: Tool execution result
- `tool-call-done`: Tool execution complete
- `finish`: Generation completion
- `error`: Error events

### Streaming Events
- `text-delta`: Text streaming tokens
- `tool-call-delta`: Tool streaming updates
- `data-stream-part`: Data stream components

### Performance Events
- Event timing and frequency
- Tool usage statistics
- Error rates and types

## Configuration Options

### DevTools Wrapper Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `auto-detect` | Enable/disable DevTools |
| `maxEvents` | `number` | `1000` | Maximum events to store |
| `modelId` | `string` | `"gpt-4o"` | Model ID for context insights |
| `position` | `string` | `"bottom"` | Panel position (bottom/right/overlay) |
| `height` | `number` | `400` | Panel height in pixels |
| `debug` | `boolean` | `false` | Enable debug logging |
| `streamEndpoint` | `string` | `"/api/chat"` | Stream capture endpoint |

### Stream Capture Configuration

```tsx
streamCapture: {
  enabled: true,           // Enable stream capture
  endpoint: "/api/chat",   // Your chat API endpoint
  autoConnect: true        // Auto-connect to streams
}
```

### Throttling Configuration

```tsx
throttle: {
  enabled: true,                    // Enable throttling
  interval: 100,                    // Throttle interval (ms)
  includeTypes: ["text-delta"]      // Events to throttle
}
```

## Development Workflow

### 1. Starting Development

When you run `pnpm dev`, the DevTools will automatically:
- Initialize in development mode
- Begin capturing AI SDK events
- Display the DevTools panel at the bottom of the screen

### 2. Monitoring Chat Interactions

As you interact with chat components:
- Events appear in real-time in the DevTools panel
- Performance metrics are calculated automatically
- Tool calls and their results are tracked

### 3. Debugging Issues

Use the DevTools to:
- **View Event History**: See all AI SDK events in chronological order
- **Filter by Type**: Focus on specific event types (errors, tool calls, etc.)
- **Monitor Performance**: Track streaming rates and response times
- **Analyze Tool Usage**: See which tools are being called and their success rates

### 4. Using the Enhanced Hook

In your components, use the enhanced hook for programmatic access:

```tsx
const devtools = useAIDevtoolsEnhanced();

// Log performance metrics
useEffect(() => {
  const stats = devtools.getChatStats();
  console.log('Chat Performance:', stats);
}, [devtools]);

// Handle errors
useEffect(() => {
  const errors = devtools.getErrorEvents();
  if (errors.length > 0) {
    console.error('Recent AI Errors:', errors.slice(-5));
  }
}, [devtools]);
```

## Best Practices

### 1. Environment Management
- DevTools only render in development mode by default
- Use the `enabled` prop to override for specific testing scenarios
- Ensure production builds exclude DevTools completely

### 2. Performance Optimization
- Use event throttling for high-frequency events like `text-delta`
- Limit `maxEvents` to prevent memory issues during long sessions
- Clear events periodically during extended development sessions

### 3. Debugging Workflow
- Start with the main DevTools panel for overview
- Use component-specific monitors for targeted debugging
- Enable debug logging for detailed event information
- Use the dashboard for comprehensive monitoring

### 4. Integration Patterns
- Add DevTools hooks to components that use AI SDK features
- Use event filtering to focus on specific aspects of your AI implementation
- Leverage performance metrics for optimization insights

## Troubleshooting

### DevTools Not Appearing
1. Ensure you're in development mode (`NODE_ENV=development`)
2. Check that the DevTools wrapper is properly imported and rendered
3. Verify there are no console errors during initialization

### No Events Captured
1. Confirm your components are using AI SDK hooks (`useChat`, etc.)
2. Check that stream capture is enabled and pointing to the correct endpoint
3. Verify your API endpoints are compatible with AI SDK patterns

### Performance Issues
1. Reduce `maxEvents` if memory usage is high
2. Enable throttling for high-frequency events
3. Clear events regularly during development

### Component Integration Issues
1. Ensure the enhanced hook is properly imported
2. Check that components are rendered in the correct environment
3. Verify hook usage follows React patterns (no conditional calls)

## Production Considerations

### Automatic Exclusion
The DevTools integration is designed to:
- Automatically detect production environments
- Exclude all DevTools code from production builds
- Have zero impact on production performance

### Manual Control
For additional safety, you can explicitly control DevTools:

```tsx
<AIDevtoolsWrapper 
  enabled={process.env.NODE_ENV === "development" && process.env.ENABLE_DEVTOOLS !== "false"}
/>
```

### Bundle Size
DevTools are tree-shakeable and won't be included in production bundles when properly configured.

## API Reference

### AIDevtoolsWrapper Props

```typescript
interface AIDevtoolsWrapperProps {
  enabled?: boolean;
  maxEvents?: number;
  modelId?: string;
  position?: "bottom" | "right" | "overlay";
  height?: number;
  debug?: boolean;
  streamEndpoint?: string;
}
```

### useAIDevtoolsEnhanced Return Value

```typescript
interface EnhancedDevTools {
  // Basic DevTools API
  events: Event[];
  clearEvents: () => void;
  toggleCapturing: () => void;
  filterEvents: (types?: string[], query?: string) => Event[];
  getUniqueToolNames: () => string[];
  getEventStats: () => EventStats;
  
  // Context7 Enhanced API
  getEventsByType: (types: string[]) => Event[];
  getChatEvents: () => Event[];
  getStreamingEvents: () => Event[];
  getErrorEvents: () => Event[];
  getChatStats: () => ChatStats;
}
```

## Context7 Integration Notes

This implementation follows Context7 architectural principles:

1. **Modular Design**: DevTools are implemented as reusable, composable components
2. **Environment Awareness**: Automatic development/production mode detection
3. **Performance Focus**: Optimized for chat and streaming use cases
4. **Type Safety**: Full TypeScript integration with proper typing
5. **Documentation First**: Comprehensive documentation and examples

The integration seamlessly extends the AI SDK DevTools while maintaining compatibility with your existing Context7 architecture and patterns.

## Support

For issues specific to the AI SDK DevTools integration:
1. Check the troubleshooting section above
2. Review the component implementations in `/components/ai/`
3. Consult the AI SDK DevTools documentation: https://ai-sdk-tools.dev/docs/devtools
4. Review Context7 architectural patterns in your project documentation