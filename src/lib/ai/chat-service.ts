import { OpenAI } from 'openai';
import { Message } from 'ai';
import { cache } from '../cache';
import { withCircuitBreaker } from '../circuit-breaker';
import { trackError, startPerformanceTracking } from '../monitoring';

type OpenAIRole = 'system' | 'user' | 'assistant';

interface ChatOptions {
  messages: Message[];
  maxRetries?: number;
  temperature?: number;
  cacheKey?: string;
  cacheTTL?: number;
  signal?: AbortSignal;
}

interface StreamCallbacks {
  onStart?: () => void;
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export class AIChatService {
  private openai: OpenAI;
  private readonly DEFAULT_MAX_RETRIES = 3;
  private readonly DEFAULT_CACHE_TTL = 3600; // 1 hour
  private readonly DEFAULT_TEMPERATURE = 0.7;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  private async getCachedResponse(key: string): Promise<string | null> {
    try {
      return await cache.get(key);
    } catch (error) {
      console.error('Error getting cached response:', error);
      return null;
    }
  }

  private async setCachedResponse(key: string, value: string, ttl?: number): Promise<void> {
    try {
      await cache.set(key, value, ttl || this.DEFAULT_CACHE_TTL);
    } catch (error) {
      console.error('Error setting cached response:', error);
    }
  }

  private createReadableStream(
    response: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>,
    callbacks: StreamCallbacks
  ): ReadableStream {
    return new ReadableStream({
      async start(controller) {
        callbacks.onStart?.();
        let fullResponse = '';

        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
              fullResponse += text;
              callbacks.onToken?.(text);
            }
          }

          callbacks.onComplete?.(fullResponse);
          controller.close();
        } catch (error) {
          console.error('Error in stream:', error);
          callbacks.onError?.(error as Error);
          controller.error(error);
        }
      },
      cancel() {
        // Handle stream cancellation
        callbacks.onError?.(new Error('Stream cancelled'));
      },
    });
  }

  private async retryWithExponentialBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxRetries) break;

        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError || new Error('Operation failed after retries');
  }

  async streamChat(
    options: ChatOptions,
    callbacks: StreamCallbacks = {}
  ): Promise<Response> {
    const endPerformanceTracking = startPerformanceTracking('ai_chat_stream');
    const { 
      messages,
      maxRetries = this.DEFAULT_MAX_RETRIES,
      temperature = this.DEFAULT_TEMPERATURE,
      cacheKey,
      cacheTTL,
      signal,
    } = options;

    try {
      // Check cache first if cacheKey is provided
      if (cacheKey) {
        const cached = await this.getCachedResponse(cacheKey);
        if (cached) {
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(cached));
              controller.close();
            },
          });
          return new Response(stream);
        }
      }

      // Use circuit breaker pattern for OpenAI calls
      const response = await withCircuitBreaker(
        'openai',
        () => this.retryWithExponentialBackoff(
          async () => {
            const completion = await this.openai.chat.completions.create({
              model: 'gpt-4-turbo-preview',
              messages: messages.map(m => {
                const role = m.role === 'data' ? 'system' : m.role;
                return {
                  role: role as OpenAIRole,
                  content: m.content,
                } as const;
              }),
              temperature,
              stream: true,
              max_tokens: 1000,
            });

            let fullResponse = '';
            const stream = this.createReadableStream(
              completion,
              {
                ...callbacks,
                onToken: (token) => {
                  fullResponse += token;
                  callbacks.onToken?.(token);
                },
                onComplete: async (response) => {
                  if (cacheKey) {
                    await this.setCachedResponse(cacheKey, response, cacheTTL);
                  }
                  callbacks.onComplete?.(response);
                },
              }
            );

            return new Response(stream, {
              headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
              },
            });
          },
          maxRetries
        ),
        async () => {
          // Fallback to a simple response if circuit breaker is open
          const fallbackResponse = 'I apologize, but I\'m temporarily unable to process your request. Please try again in a moment.';
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(fallbackResponse));
              controller.close();
            },
          });
          return new Response(stream);
        }
      );

      endPerformanceTracking();
      return response;
    } catch (error) {
      endPerformanceTracking();
      trackError(error as Error);
      
      // Create error stream
      const errorStream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              'An error occurred while processing your request. Please try again.'
            )
          );
          controller.close();
        },
      });

      return new Response(errorStream, { status: 500 });
    }
  }

  async generateTitle(messages: Message[]): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system' as const,
            content: 'Generate a short, concise title (max 6 words) for this conversation based on the main topic or question being discussed.',
          },
          ...messages.map(m => {
            const role = m.role === 'data' ? 'system' : m.role;
            return {
              role: role as OpenAIRole,
              content: m.content,
            } as const;
          }),
        ],
        temperature: 0.5,
        max_tokens: 20,
      });

      return response.choices[0]?.message?.content?.trim() || 'New Conversation';
    } catch (error) {
      console.error('Error generating title:', error);
      return 'New Conversation';
    }
  }
} 