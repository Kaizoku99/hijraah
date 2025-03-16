import { getSupabaseClient } from '@/lib/supabase/client';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { ChatMessage } from '@/types/chat';

// Schema for validation
export const FeedbackSchema = z.object({
  sessionId: z.string(),
  rating: z.number().min(1).max(5),
  feedback: z.string().optional(),
  isHelpful: z.boolean(),
  category: z.enum(['visa', 'requirements', 'document', 'process', 'eligibility', 'other']),
});

export type FeedbackData = z.infer<typeof FeedbackSchema>;

/**
 * Save user feedback for AI responses to use for fine-tuning
 */
export async function saveResponseFeedback(
  userId: string,
  messages: ChatMessage[],
  feedback: FeedbackData
) {
  const supabase = getSupabaseClient();
  const feedbackId = nanoid();

  // Extract user query and AI response pairs for fine-tuning
  const trainingPairs = extractTrainingPairs(messages);

  const { error } = await supabase
    .from('ai_feedback')
    .insert({
      id: feedbackId,
      user_id: userId,
      session_id: feedback.sessionId,
      messages,
      rating: feedback.rating,
      feedback: feedback.feedback || '',
      is_helpful: feedback.isHelpful,
      category: feedback.category,
      training_pairs: trainingPairs,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }

  return feedbackId;
}

/**
 * Extract training pairs from a conversation for fine-tuning
 */
function extractTrainingPairs(messages: ChatMessage[]) {
  const pairs = [];
  
  // Skip the first message if it's from the system
  let startIdx = messages[0]?.role === 'system' ? 1 : 0;
  
  for (let i = startIdx; i < messages.length - 1; i++) {
    if (messages[i].role === 'user' && messages[i + 1].role === 'assistant') {
      pairs.push({
        input: messages[i].content,
        output: messages[i + 1].content,
      });
    }
  }
  
  return pairs;
}

/**
 * Get high-quality training pairs for fine-tuning
 */
export async function getTrainingDataForFineTuning(
  category?: string,
  minRating = 4,
  limit = 1000
) {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('ai_feedback')
    .select('*')
    .gte('rating', minRating)
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error getting training data:', error);
    throw error;
  }
  
  // Flatten all training pairs
  const trainingData = data.flatMap(item => item.training_pairs || []);
  
  return trainingData;
}

/**
 * Export training data in JSONL format for OpenAI fine-tuning
 */
export async function exportTrainingDataForOpenAI(category?: string) {
  const trainingData = await getTrainingDataForFineTuning(category);
  
  // Format for OpenAI fine-tuning
  const jsonlData = trainingData.map(pair => {
    return JSON.stringify({
      messages: [
        { role: "system", content: "You are a helpful immigration assistant that provides accurate, helpful information about immigration processes, requirements, and deadlines." },
        { role: "user", content: pair.input },
        { role: "assistant", content: pair.output }
      ]
    });
  }).join('\n');
  
  return jsonlData;
}

/**
 * Get curated examples for few-shot learning
 */
export async function getCuratedExamples(category: string, limit = 5) {
  const data = await getTrainingDataForFineTuning(category, 5, limit);
  return data;
} 