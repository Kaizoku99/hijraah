# AI Gateway Integration Guide

## Overview

This guide demonstrates how to use the new Vercel AI Gateway integration with AI SDK v5 and Context7 principles in the Hijraah platform.

## Key Features

### 🚀 **Multi-Provider Support**
- Seamless access to OpenAI, Anthropic, and other models through a single interface
- Automatic failover and load balancing
- Real-time provider health monitoring

### 🧠 **Intelligent Model Selection**
- Task-based model routing (chat, reasoning, creative, analysis)
- Priority-based selection (speed, quality, cost)
- Capability-aware matching (vision, reasoning, streaming)

### 📊 **Enhanced Observability**
- Comprehensive usage tracking and analytics
- Performance metrics and cost monitoring
- Health checks and provider status

### 🔄 **Backward Compatibility**
- Maintains compatibility with existing ChatModelType enums
- Legacy API support for smooth migration

## Usage Examples

### Basic Chat Integration

```typescript
import { AIConfig, selectModelForTask, getModelInstance } from '@/lib/ai/config';

// Intelligent model selection
const modelId = selectModelForTask('chat', { 
  priority: 'quality', 
  requiresVision: true 
});

const model = getModelInstance(modelId);

// Use with streamText
const result = await streamText({
  model,
  messages: [...],
  // AI Gateway handles provider selection automatically
});
```

### Advanced Reasoning Tasks

```typescript
// For complex reasoning tasks
const reasoningModel = selectModelForTask('reasoning', {
  priority: 'quality',
  requiresReasoning: true,
  maxTokens: 8000
});

const model = getModelInstance(reasoningModel);

const result = await streamText({
  model,
  messages: [...],
  // Automatically uses Claude with thinking capabilities
  providerOptions: {
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 8000 }
    }
  }
});
```

### Registry-Based Model Access

```typescript
import { aiRegistry } from '@/lib/ai/providers';

// Direct registry access
const model = aiRegistry.languageModel('gateway:reasoning-claude');

// With provider fallback
const fallbackModel = aiRegistry.languageModel('openai:gpt-4o');
```

### Performance Monitoring

```typescript
import { AIConfig } from '@/lib/ai/config';

// Get provider health status
const healthCheck = await AIConfig.providers.health();
console.log('Providers available:', healthCheck.providers);

// Get performance metrics
const metrics = await AIConfig.getMetrics();
console.log('Model performance:', metrics);

// Track usage
AIConfig.trackUsage('chat-balanced', {
  inputTokens: 100,
  outputTokens: 200,
  totalTokens: 300,
  processingTime: 1500,
  success: true
});
```

## Configuration

### Environment Variables

```bash
# Primary AI Gateway API Key
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here

# Fallback provider keys
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Configuration
AI_DEFAULT_MODEL=gateway:chat-balanced
AI_ENABLE_TELEMETRY=true
```

### Model Registry

The system includes pre-configured models optimized for different tasks:

- **`reasoning-large`**: GPT-4o with reasoning capabilities
- **`chat-balanced`**: GPT-4o Mini for general chat
- **`chat-fast`**: GPT-3.5 Turbo for quick responses
- **`reasoning-claude`**: Claude 3.5 Sonnet with thinking

## Migration Guide

### From Legacy Providers

```typescript
// Old way
import { myProvider } from '@/lib/ai/providers';
const model = myProvider.languageModel('gpt-4');

// New way - automatic upgrade
import { getModelInstance } from '@/lib/ai/config';
const model = getModelInstance('gpt-4'); // Routes to gateway:openai/gpt-4o
```

### ChatModelType Enum Support

```typescript
// Existing code continues to work
import { ChatModelType } from '@/_core/chat/entities/chat';
import { myProvider } from '@/lib/ai/providers';

const model = myProvider.languageModel(ChatModelType.GPT_4);
// Automatically routes through AI Gateway
```

## Error Handling

The system provides graceful degradation:

```typescript
try {
  const model = getModelInstance('preferred-model');
  // ... use model
} catch (error) {
  // Automatically falls back to cost-effective model
  const fallback = getOptimalModel('chat', 'cost');
  // ... continue with fallback
}
```

## Best Practices

### 1. Use Task-Based Selection
```typescript
// Instead of hardcoding models
const modelId = selectModelForTask('reasoning', { 
  priority: 'quality' 
});
```

### 2. Monitor Performance
```typescript
// Regular health checks
setInterval(async () => {
  const health = await checkProviderHealth();
  if (!health.healthy) {
    console.warn('Provider issues detected:', health.details);
  }
}, 60000);
```

### 3. Cost Optimization
```typescript
// Use cost priority for non-critical tasks
const model = selectModelForTask('chat', { 
  priority: 'cost' 
});
```

### 4. Capability Matching
```typescript
// Ensure model supports required features
const model = selectModelForTask('analysis', {
  requiresReasoning: true,
  requiresVision: false
});
```

## Troubleshooting

### Common Issues

1. **Gateway API Key Missing**
   ```
   Set AI_GATEWAY_API_KEY or VERCEL_AI_GATEWAY_API_KEY in environment
   ```

2. **Provider Health Check Failures**
   ```typescript
   const health = await checkProviderHealth();
   console.log('Available providers:', health.providers);
   ```

3. **Model Not Found**
   ```typescript
   // Check available models
   console.log('Available models:', Object.keys(ModelRegistry));
   ```

## Advanced Features

### Custom Provider Configuration

```typescript
import { createGateway } from '@ai-sdk/gateway';

const customGateway = createGateway({
  apiKey: process.env.CUSTOM_GATEWAY_KEY,
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### Model Middleware

```typescript
import { wrapLanguageModel, defaultSettingsMiddleware } from 'ai';

const enhancedModel = wrapLanguageModel({
  model: aiGateway('openai/gpt-4o'),
  middleware: [
    defaultSettingsMiddleware({
      settings: {
        temperature: 0.7,
        maxOutputTokens: 4000
      }
    })
  ]
});
```

This integration provides a powerful, flexible, and observable AI infrastructure that scales with your application needs while maintaining simplicity for common use cases.
