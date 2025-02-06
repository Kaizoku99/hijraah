import { type Message } from 'ai';
import { createClient } from './supabase/server';
import { logger } from './logger';
import { monitoring } from './monitoring';

export type ChatMessage = Message & {
  metadata?: {
    documentRefs?: string[];
    confidence?: number;
    processingTime?: number;
    error?: string;
  };
};

export type ChatError = {
  code: string;
  message: string;
  details?: string;
};

export async function saveChatMessage(message: ChatMessage, sessionId: string): Promise<void> {
  const startTime = performance.now();
  const supabase = createClient();
  
  // Validate role is one of the allowed values
  if (message.role !== 'user' && message.role !== 'assistant' && message.role !== 'system') {
    throw new Error('Invalid message role');
  }
  
  try {
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        user_id: 'system', // Since this is a server-side function, we'll use system as the user
        role: message.role,
        content: message.content,
        metadata: message.metadata || null,
      });

    if (error) throw error;

    const duration = performance.now() - startTime;
    monitoring.recordAPIPerformance('saveChatMessage', duration, 200);

    logger.info('Chat message saved successfully', {
      sessionId,
      messageId: message.id,
      duration,
    });
  } catch (error) {
    const duration = performance.now() - startTime;
    monitoring.recordAPIPerformance('saveChatMessage', duration, 500);
    
    monitoring.recordError({
      error: error as Error,
      context: { 
        sessionId, 
        messageId: message.id,
        operation: 'saveChatMessage' 
      },
      severity: 'medium',
    });

    logger.error('Failed to save chat message', {
      error,
      sessionId,
      messageId: message.id,
    });

    throw new Error('Failed to save chat message');
  }
}

export async function getChatHistory(sessionId: string): Promise<ChatMessage[]> {
  const startTime = performance.now();
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const duration = performance.now() - startTime;
    monitoring.recordAPIPerformance('getChatHistory', duration, 200);

    return data.map((msg: any) => ({
      id: msg.id,
      role: msg.role as Message['role'],
      content: msg.content,
      metadata: msg.metadata,
    }));
  } catch (error) {
    const duration = performance.now() - startTime;
    monitoring.recordAPIPerformance('getChatHistory', duration, 500);

    monitoring.recordError({
      error: error as Error,
      context: { 
        sessionId,
        operation: 'getChatHistory' 
      },
      severity: 'medium',
    });

    logger.error('Failed to fetch chat history', {
      error,
      sessionId,
    });

    throw new Error('Failed to fetch chat history');
  }
}

export function createStreamingResponse(
  stream: ReadableStream,
  data?: Record<string, unknown>
): Response {
  return new Response(stream, {
    headers: data ? { 'Content-Type': 'text/event-stream', 'x-metadata': JSON.stringify(data) } : { 'Content-Type': 'text/event-stream' }
  });
}

export function validateMessage(message: Partial<ChatMessage>): ChatError | null {
  try {
    if (!message.content?.trim()) {
      return {
        code: 'INVALID_MESSAGE',
        message: 'Message content cannot be empty',
      };
    }

    if (!message.role || !['user', 'assistant', 'system'].includes(message.role)) {
      return {
        code: 'INVALID_ROLE',
        message: 'Invalid message role',
      };
    }

    return null;
  } catch (error) {
    monitoring.recordError({
      error: error as Error,
      context: { 
        message,
        operation: 'validateMessage' 
      },
      severity: 'low',
    });

    return {
      code: 'VALIDATION_ERROR',
      message: 'Message validation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function generateToolSuggestion(message: string): string | null {
  try {
    const lowerMessage = message.toLowerCase();
    
    // Check for eligibility assessment related queries
    if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify') || lowerMessage.includes('assessment')) {
      return 'Based on your question, you might find our Eligibility Assessment tool helpful. Would you like to take a quick assessment?';
    }
    
    // Check for points calculator related queries
    if (lowerMessage.includes('points') || lowerMessage.includes('score') || lowerMessage.includes('calculate')) {
      return 'You can use our Points Calculator to determine your immigration points score. Would you like to try it?';
    }
    
    // Check for document related queries
    if (lowerMessage.includes('document') || lowerMessage.includes('checklist') || lowerMessage.includes('requirements')) {
      return 'I can help you generate a personalized document checklist using our Document Checklist Generator. Would you like to try it?';
    }
    
    return null;
  } catch (error) {
    monitoring.recordError({
      error: error as Error,
      context: { 
        message,
        operation: 'generateToolSuggestion' 
      },
      severity: 'low',
    });
    return null;
  }
}

export function getToolLink(message: string): string | null {
  try {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify') || lowerMessage.includes('assessment')) {
      return '/tools/eligibility';
    }
    
    if (lowerMessage.includes('points') || lowerMessage.includes('score') || lowerMessage.includes('calculate')) {
      return '/tools/points-calculator';
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('checklist') || lowerMessage.includes('requirements')) {
      return '/tools/document-checklist';
    }
    
    return null;
  } catch (error) {
    monitoring.recordError({
      error: error as Error,
      context: { 
        message,
        operation: 'getToolLink' 
      },
      severity: 'low',
    });
    return null;
  }
}