import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { cache } from '@/lib/cache';
import { streamText } from 'ai';
import { HTTPException } from 'hono/http-exception';

const CACHE_TTL = 3600; // 1 hour
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface Document {
  title: string;
  country: string;
  category: string;
  content: string;
}

export class ImmigrationAIProcessor {
  private supabase: ReturnType<typeof createClient<Database>>;
  private openai: OpenAI;

  constructor(
    private openaiApiKey: string,
    supabaseUrl: string,
    supabaseKey: string
  ) {
    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
    this.openai = new OpenAI({ 
      apiKey: openaiApiKey,
      maxRetries: MAX_RETRIES,
    });
  }

  private async getRelevantContent(query: string, filters: {
    country?: string;
    category?: string;
    language?: string;
  } = {}): Promise<Document[]> {
    try {
      const cacheKey = `content:${JSON.stringify({ query, filters })}`;
      const cached = await cache.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const { data: documents, error } = await this.supabase.rpc('match_documents', {
        query_embedding: await this.generateEmbedding(query),
        match_threshold: 0.5,
        match_count: 5,
        filter_country: filters.country,
        filter_category: filters.category,
        filter_language: filters.language
      });

      if (error) throw new Error(`Failed to fetch documents: ${error.message}`);
      if (!documents?.length) {
        throw new Error('No relevant documents found');
      }
      
      await cache.set(cacheKey, JSON.stringify(documents), CACHE_TTL);
      return documents;
    } catch (error) {
      console.error('Error fetching relevant content:', error);
      throw new HTTPException(500, { message: 'Failed to fetch relevant content' });
    }
  }

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
      throw new HTTPException(500, { message: 'Failed to generate embedding' });
    }
  }

  private createReadableStream(response: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>): ReadableStream {
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Error in stream:', error);
          controller.error(error);
        }
      },
    });
  }

  async processQuery(query: string, filters: {
    country?: string;
    category?: string;
    language?: string;
  } = {}): Promise<Response> {
    try {
      const relevantDocs = await this.getRelevantContent(query, filters);
      
      const context = relevantDocs.map((doc: Document) => `
Title: ${doc.title}
Country: ${doc.country}
Category: ${doc.category}
Content: ${doc.content}
---
`).join('\n');

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert immigration assistant. Your role is to provide accurate, up-to-date information about immigration processes, requirements, and regulations for different countries.

Instructions:
1. Always base your responses on the provided context
2. If you're unsure about something, say so explicitly
3. Provide specific references when possible
4. Keep responses clear and concise
5. Focus on factual information over opinions
6. Consider cultural and legal nuances
7. Highlight important deadlines or requirements
8. Include relevant links or resources when available

Current context:
${context}

Remember to:
- Stay neutral and objective
- Respect privacy and confidentiality
- Avoid making assumptions
- Clarify ambiguities
- Highlight recent changes or updates`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true
      });

      const stream = this.createReadableStream(response);
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (error) {
      console.error('Error processing query:', error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: 'Failed to process query' });
    }
  }

  async generateSummary(country: string, category?: string): Promise<Response> {
    try {
      const { data: documents } = await this.supabase
        .from('immigration_data')
        .select('*')
        .eq('country', country)
        .eq('category', category || 'visa')
        .limit(3);

      if (!documents?.length) {
        throw new Error('No information available.');
      }

      const context = documents.map(doc => `
Title: ${doc.title}
Content: ${doc.content}
`).join('\n');

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate a concise summary of the immigration requirements and process based on the provided information.'
          },
          {
            role: 'user',
            content: `Please summarize the following immigration information for ${country}:\n${context}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1000,
        stream: true
      });

      const stream = this.createReadableStream(response);
      return new Response(stream);
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }

  async compareCountries(countries: string[], category: string): Promise<string> {
    try {
      const cacheKey = `comparison:${JSON.stringify({ countries, category })}`;
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const relevantDocs = await Promise.all(
        countries.map(country => 
          this.getRelevantContent('', { country, category })
        )
      );

      const context = countries.map((country, i) => `
Information for ${country}:
${relevantDocs[i].map((doc: Document) => doc.content).join('\n')}
---
`).join('\n');

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert immigration comparison system. Compare the immigration policies and requirements between different countries based on the provided context.

Instructions:
1. Structure the comparison in a clear, tabular format
2. Focus on key differences and similarities
3. Highlight advantages and disadvantages
4. Include specific requirements and timelines
5. Note any special conditions or exceptions
6. Consider cost implications
7. Mention processing times when available
8. Include visa/permit validity periods

Current context:
${context}

Format the comparison as a structured markdown table with relevant sections.`
          },
          {
            role: 'user',
            content: `Compare ${countries.join(', ')} for the category: ${category}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const comparison = response.choices[0].message.content;
      if (!comparison) throw new Error('Failed to generate comparison');
      
      await cache.set(cacheKey, comparison, CACHE_TTL);
      return comparison;
    } catch (error) {
      console.error('Error comparing countries:', error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: 'Failed to compare countries' });
    }
  }
} 