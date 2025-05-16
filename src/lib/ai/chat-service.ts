import { OpenAI } from 'openai';
import { Message } from 'ai';
import { cache } from '../cache';
import { withCircuitBreaker } from '../circuit-breaker';
import { trackError, startPerformanceTracking } from '../monitoring';
import { getSupabaseClient } from '../supabase/client';

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

  /**
   * Streams a chat response that leverages all available data sources including:
   * - Vector database of immigration documents
   * - Scraped content from official sources
   * - Community experiences and discussions
   * - Latest policy updates and news
   */
  async streamChatWithScrapedData(
    options: ChatOptions & {
      useSearch?: boolean;
      useScrape?: boolean;
      useExtract?: boolean;
      useDeepResearch?: boolean;
      maxRelevantDocs?: number;
      relevanceThreshold?: number;
    },
    callbacks: StreamCallbacks = {}
  ): Promise<Response> {
    const endPerformanceTracking = startPerformanceTracking('ai_chat_with_scraped_data');
    const { 
      messages,
      maxRetries = this.DEFAULT_MAX_RETRIES,
      temperature = this.DEFAULT_TEMPERATURE,
      cacheKey,
      cacheTTL,
      signal,
      useSearch = true,
      useScrape = true,
      useExtract = true,
      useDeepResearch = false,
      maxRelevantDocs = 5,
      relevanceThreshold = 0.7
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

      // Get the last user message to use for searching relevant data
      const lastUserMessage = messages.findLast(m => m.role === 'user')?.content || '';
      if (!lastUserMessage) {
        throw new Error('No user message found in the conversation');
      }

      // Step 1: Collect context from all data sources
      const contextData: string[] = [];
      
      // Track what sources have been included
      const includedUrls = new Set<string>();

      // Step 1.1: Get vector search results from database
      try {
        const supabase = getSupabaseClient();
        const { data: vectorResults } = await supabase.rpc('match_documents', {
          query_embedding: await this.generateEmbedding(lastUserMessage),
          match_threshold: relevanceThreshold,
          match_count: maxRelevantDocs
        });

        if (vectorResults?.length) {
          contextData.push(
            '### Official Immigration Data\n' +
            vectorResults.map((doc: any) => 
              `Title: ${doc.title}\nCountry: ${doc.country}\nCategory: ${doc.category}\nContent: ${doc.content}\nSource: ${doc.source || 'Official database'}`
            ).join('\n\n')
          );
          vectorResults.forEach((doc: any) => {
            if (doc.url) includedUrls.add(doc.url);
          });
        }
      } catch (error) {
        console.warn('Error fetching vector search results:', error);
        // Continue with other sources even if vector search fails
      }

      // Step 1.2: Use search API if enabled
      if (useSearch && lastUserMessage.length > 0) {
        try {
          const searchResponse = await fetch('/api/ai/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              query: lastUserMessage,
              maxResults: maxRelevantDocs
            }),
          });
          
          if (searchResponse.ok) {
            const searchResults = await searchResponse.json();
            if (searchResults.success && searchResults.data?.length) {
              const newResults = searchResults.data.filter((result: any) => 
                !includedUrls.has(result.url)
              );
              
              if (newResults.length) {
                contextData.push(
                  '### Search Results\n' +
                  newResults.map((result: any) => 
                    `Title: ${result.title}\nURL: ${result.url}\nExcerpt: ${result.snippet}`
                  ).join('\n\n')
                );
                newResults.forEach((result: any) => includedUrls.add(result.url));
              }
            }
          }
        } catch (error) {
          console.warn('Error using search API:', error);
          // Continue with other sources
        }
      }

      // Step 1.3: Use scrape API for the most relevant URLs if enabled
      if (useScrape && includedUrls.size > 0) {
        const urlsToScrape = Array.from(includedUrls).slice(0, 2); // Limit to prevent overload
        
        try {
          const scrapePromises = urlsToScrape.map(async (url) => {
            const scrapeResponse = await fetch('/api/ai/scrape', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url }),
            });
            
            if (scrapeResponse.ok) {
              const scrapeResult = await scrapeResponse.json();
              if (scrapeResult.success && (scrapeResult.markdown || scrapeResult.data)) {
                return {
                  url,
                  content: scrapeResult.markdown || JSON.stringify(scrapeResult.data)
                };
              }
            }
            return null;
          });
          
          const scrapeResults = (await Promise.all(scrapePromises)).filter(Boolean);
          if (scrapeResults.length) {
            contextData.push(
              '### Scraped Content\n' +
              scrapeResults.map((result: any) => 
                `Source: ${result.url}\n${result.content.substring(0, 1500)}...`
              ).join('\n\n')
            );
          }
        } catch (error) {
          console.warn('Error scraping content:', error);
          // Continue with other sources
        }
      }

      // Step 1.4: Use extract API if enabled and we have search results
      if (useExtract && includedUrls.size > 0) {
        try {
          const extractResponse = await fetch('/api/ai/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              urls: Array.from(includedUrls).slice(0, 3), // Limit to top 3
              prompt: `Extract information relevant to: ${lastUserMessage}`
            }),
          });
          
          if (extractResponse.ok) {
            const extractResult = await extractResponse.json();
            if (extractResult.success && extractResult.data) {
              contextData.push(
                '### Extracted Information\n' + extractResult.data
              );
            }
          }
        } catch (error) {
          console.warn('Error extracting content:', error);
          // Continue with other sources
        }
      }

      // Step 1.5: Get community experiences if available
      try {
        const supabase = getSupabaseClient();
        const { data: communityData } = await supabase
          .from('community_experiences')
          .select('content, author_name, country, visa_type, credibility_score, topics')
          .textSearch('content', lastUserMessage)
          .order('credibility_score', { ascending: false })
          .limit(3);

        if (communityData?.length) {
          contextData.push(
            '### Community Experiences\n' +
            communityData.map((exp: any) => 
              `Author: ${exp.author_name}\nCountry: ${exp.country}\nVisa Type: ${exp.visa_type}\nTopics: ${exp.topics?.join(', ') || 'N/A'}\nCredibility Score: ${exp.credibility_score}\nContent: ${exp.content}`
            ).join('\n\n')
          );
        }
      } catch (error) {
        console.warn('Error fetching community data:', error);
        // Continue with other sources
      }

      // Step 1.6: Deep research if enabled and we don't have enough context
      if (useDeepResearch && contextData.length < 2) {
        try {
          const researchResponse = await fetch('/api/ai/research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: lastUserMessage }),
          });
          
          if (researchResponse.ok) {
            const researchResult = await researchResponse.json();
            if (researchResult.success && researchResult.data) {
              contextData.push(
                '### In-depth Research\n' + 
                `Summary: ${researchResult.data.summary}\n\n` +
                researchResult.data.findings.map((finding: any) => 
                  `Source: ${finding.url}\nContent: ${finding.data}`
                ).join('\n\n')
              );
            }
          }
        } catch (error) {
          console.warn('Error performing deep research:', error);
          // Continue without this source
        }
      }

      // Create system message with the combined context
      const contextMessage = contextData.length > 0 
        ? `I'll help answer your question using the following information: \n\n${contextData.join('\n\n')}`
        : "I'll help answer your question based on my general knowledge about immigration.";

      // Use circuit breaker pattern for OpenAI calls
      const response = await withCircuitBreaker(
        'openai',
        () => this.retryWithExponentialBackoff(
          async () => {
            const chatMessages = [
              {
                role: 'system' as const,
                content: `You are an expert immigration assistant for the Hijraah platform. Your role is to provide accurate, helpful information about immigration processes, requirements, and regulations.

Instructions:
1. Base your responses primarily on the provided context
2. If the context doesn't contain the answer, clearly state this and provide your best general knowledge
3. Be factual, accurate, and up-to-date
4. Provide specific references and sources when available
5. Format responses in a clear, structured manner using markdown
6. Consider cultural and legal nuances of different countries
7. Highlight important deadlines or requirements
8. If you're unsure, acknowledge the limitations of your knowledge

Here's the context I've gathered from various sources:

${contextMessage}

Remember:
- Stay neutral and objective
- Always prioritize accuracy over comprehensiveness
- Highlight the source of information when possible
- Be explicit about what information comes from the context vs. your general knowledge`
              },
              ...messages.map(m => {
                const role = m.role === 'data' ? 'system' : m.role;
                return {
                  role: role as OpenAIRole,
                  content: m.content,
                } as const;
              }),
            ];

            const completion = await this.openai.chat.completions.create({
              model: 'gpt-4-turbo-preview',
              messages: chatMessages,
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
                  
                  // Log the successful response with its data sources
                  try {
                    const supabase = getSupabaseClient();
                    await supabase.from('ai_responses').insert({
                      query: lastUserMessage,
                      response: response.substring(0, 1000), // First 1000 chars
                      data_sources: {
                        vector_search: contextData[0]?.includes('Official Immigration Data') || false,
                        search_api: contextData.some(c => c.includes('Search Results')),
                        scraped_content: contextData.some(c => c.includes('Scraped Content')),
                        extracted_info: contextData.some(c => c.includes('Extracted Information')),
                        community_data: contextData.some(c => c.includes('Community Experiences')),
                        deep_research: contextData.some(c => c.includes('In-depth Research'))
                      },
                      timestamp: new Date().toISOString(),
                    });
                  } catch (logError) {
                    console.error('Failed to log AI response:', logError);
                  }
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
          const fallbackResponse = 'I apologize, but I\'m temporarily unable to process your request with all available data sources. Please try again in a moment.';
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
              'An error occurred while processing your request with data sources. Please try again.'
            )
          );
          controller.close();
        },
      });

      return new Response(errorStream, { status: 500 });
    }
  }

  /**
   * Generates an embedding for the given text
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const cacheKey = `embedding:${text}`;
      const cached = await cache.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const response = await this.openai.embeddings.create({
        input: text,
        model: 'text-embedding-3-small'
      });

      const embedding = response.data[0].embedding;
      await cache.set(cacheKey, JSON.stringify(embedding), CACHE_TTL);
      return embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding');
    }
  }
} 