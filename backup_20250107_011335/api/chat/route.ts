import { Message } from 'ai';
import { createRagChain, openAIChat, deepseekChat } from '@/app/lib/rag-config';
import { NextResponse } from 'next/server';
import { StreamingTextResponse } from '@vercel/ai';
import { LangChainStream } from '@langchain/core/streams';

export const runtime = 'edge';

// Custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

interface ChatRequest {
  messages: Message[];
  provider?: 'openai' | 'deepseek';
}

export async function POST(req: Request) {
  try {
    const { messages, provider = 'openai' } = (await req.json()) as ChatRequest;
    
    // Validate request
    if (!messages?.length) {
      throw new ValidationError('Messages array is required');
    }

    // Get message history context
    const messageHistory = messages
      .slice(0, -1)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');
    
    // Get the last message
    const lastMessage = messages[messages.length - 1];
    
    // Select the model based on provider
    const model = provider === 'deepseek' ? deepseekChat : openAIChat;
    
    // Create RAG chain with selected model
    const chain = createRagChain(model);
    
    // Create a stream
    const { stream, handlers } = LangChainStream();

    // Start the chain in the background
    chain.invoke(
      {
        question: lastMessage.content,
      },
      {
        callbacks: [handlers],
      },
    );

    // Return streaming response
    return new StreamingTextResponse(stream);
    
  } catch (error) {
    console.error('Error in chat route:', error);
    
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}