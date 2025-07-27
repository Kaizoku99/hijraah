/**
 * Text Summarization Utility
 * 
 * Uses OpenAI's API to generate concise summaries of immigration-related content.
 * Implements multiple strategies for handling different text lengths.
 */

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Different summarization methods
export type SummaryMethod = 'stuff' | 'map-reduce' | 'refine';

// Summary options
export interface SummaryOptions {
  /** Maximum length of summary in tokens */
  maxTokens?: number;
  /** Temperature for OpenAI API (0-1, lower means more focused) */
  temperature?: number;
  /** Method to use for summarization */
  method?: SummaryMethod;
  /** Category of content (immigration, legal, news, etc.) */
  category?: string;
}

/**
 * Summarize text using the "stuff" method - best for shorter texts
 * that fit within OpenAI's context window
 */
async function summarizeStuff(text: string, options: SummaryOptions = {}): Promise<string> {
  const { maxTokens = 300, temperature = 0.3, category = 'immigration' } = options;
  
  const systemPrompt = `You are an expert immigration specialist. Summarize the following ${category}-related content. 
  Focus on key facts, requirements, deadlines, and policy information. 
  Be factual, accurate, and concise.`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Please summarize the following content:\n\n${text}` }
    ],
    max_tokens: maxTokens,
    temperature: temperature,
  });

  return response.choices[0].message.content || '';
}

/**
 * Summarize text using the "map-reduce" method - for longer texts
 * Split into chunks, summarize each, then combine summaries
 */
async function summarizeMapReduce(text: string, options: SummaryOptions = {}): Promise<string> {
  const { maxTokens = 300, temperature = 0.3, category = 'immigration' } = options;
  
  // Split text into chunks of roughly 4000 chars (about 1000 tokens)
  const chunks = splitTextIntoChunks(text, 4000);
  
  // Summarize each chunk
  const chunkSummaries = await Promise.all(
    chunks.map(async (chunk) => {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert immigration specialist. Extract key information from this ${category}-related content.` 
          },
          { role: 'user', content: `Extract the key information from this content:\n\n${chunk}` }
        ],
        max_tokens: 300,
        temperature: temperature,
      });
      
      return response.choices[0].message.content || '';
    })
  );
  
  // Combine chunk summaries into a final summary
  const combinedSummary = chunkSummaries.join('\n\n');
  
  // Create final summary
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { 
        role: 'system', 
        content: `You are an expert immigration specialist. Create a cohesive summary from these extracted points about ${category}.` 
      },
      { role: 'user', content: `Create a cohesive summary from these extracted points:\n\n${combinedSummary}` }
    ],
    max_tokens: maxTokens,
    temperature: temperature,
  });
  
  return response.choices[0].message.content || '';
}

/**
 * Split text into roughly equal chunks
 */
function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    // Try to find a natural break point (paragraph, sentence)
    let breakPoint = i + chunkSize;
    if (breakPoint < text.length) {
      // Look for paragraph break
      const paragraphBreak = text.lastIndexOf('\n\n', breakPoint);
      if (paragraphBreak > i && paragraphBreak > i + chunkSize / 2) {
        breakPoint = paragraphBreak;
      } else {
        // Look for sentence break
        const sentenceBreak = text.lastIndexOf('. ', breakPoint);
        if (sentenceBreak > i && sentenceBreak > i + chunkSize / 2) {
          breakPoint = sentenceBreak + 1; // Include the period
        }
      }
    } else {
      breakPoint = text.length;
    }
    
    chunks.push(text.substring(i, breakPoint).trim());
    i = breakPoint;
  }
  
  return chunks;
}

/**
 * Main summarization function that chooses the appropriate method
 * based on text length and options
 */
export async function summarizeText(text: string, options: SummaryOptions = {}): Promise<string> {
  const { method = 'auto' } = options;
  
  // Estimate token count (rough approximation: 4 chars = 1 token)
  const estimatedTokens = Math.ceil(text.length / 4);
  
  // Choose method based on text length if set to auto
  if (method === 'auto') {
    if (estimatedTokens < 2500) {
      return summarizeStuff(text, options);
    } else {
      return summarizeMapReduce(text, options);
    }
  }
  
  // Use specified method
  if (method === 'map-reduce') {
    return summarizeMapReduce(text, options);
  }
  
  // Default to stuff method
  return summarizeStuff(text, options);
}

/**
 * Categorize text content to help with better summarization
 */
export async function categorizeContent(text: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { 
        role: 'system', 
        content: 'You are a content classifier. Categorize this immigration-related content into one of the following categories: visa_policy, immigration_procedures, legal_requirements, country_specific_info, news, personal_experiences. Return only the category name, nothing else.' 
      },
      { role: 'user', content: text.substring(0, 1000) } // Just use the first 1000 chars for efficiency
    ],
    max_tokens: 20,
    temperature: 0.3,
  });
  
  return response.choices[0].message.content?.trim() || 'immigration';
} 