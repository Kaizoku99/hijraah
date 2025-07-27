import OpenAI from 'openai';

// Initialize the OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate an embedding for a given text
 * @param text - The text to generate an embedding for
 * @returns A vector of floating point numbers
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Clean and prepare the text
    const input = text.replace(/\n/g, ' ').trim();
    
    // Generate embedding with text-embedding-3-small model
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input,
      dimensions: 1536,
    });

    // Return the embedding vector
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate text embedding');
  }
}

/**
 * Extract content from an artifact for embedding purposes
 * @param artifact - The document artifact 
 * @returns Processed text suitable for embedding
 */
export function getTextForEmbedding(artifact: any): string {
  const content = artifact.content?.text || '';
  const title = artifact.title || '';
  const description = artifact.description || '';
  
  // Combine the title, description, and content for a comprehensive embedding
  return `Title: ${title}\nDescription: ${description}\nContent: ${content}`;
} 