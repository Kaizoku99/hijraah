import { User } from '@supabase/supabase-js';

import { getSupabaseClient } from '@/lib/supabase/client';
import { ChatMessage } from '@/types/chat';

// The maximum number of past messages to include for context
const MAX_HISTORY_MESSAGES = 20;

// Definition of a user interest
export interface UserInterest {
  category: string;
  score: number;
  lastUpdated: string;
}

// User profile for personalization
export interface UserPersonalizationProfile {
  userId: string;
  interests: UserInterest[];
  recentQueries: string[];
  preferences: Record<string, any>;
  lastInteracted: string;
}

/**
 * Get the personalization profile for a user
 */
export async function getUserPersonalizationProfile(userId: string): Promise<UserPersonalizationProfile | null> {
  if (!userId) return null;

  const supabase = getSupabaseClient();
  
  // Get user profile from database
  const { data, error } = await supabase
    .from('user_personalization')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found, create a new one
      return createDefaultPersonalizationProfile(userId);
    }
    
    console.error('Error fetching personalization profile:', error);
    return null;
  }
  
  return {
    userId: data.user_id,
    interests: data.interests || [],
    recentQueries: data.recent_queries || [],
    preferences: data.preferences || {},
    lastInteracted: data.last_interacted,
  };
}

/**
 * Create a default personalization profile for a new user
 */
async function createDefaultPersonalizationProfile(userId: string): Promise<UserPersonalizationProfile> {
  const supabase = getSupabaseClient();
  
  const defaultProfile = {
    user_id: userId,
    interests: [],
    recent_queries: [],
    preferences: {},
    last_interacted: new Date().toISOString(),
  };
  
  // Insert the default profile
  const { error } = await supabase
    .from('user_personalization')
    .insert(defaultProfile);
  
  if (error) {
    console.error('Error creating default profile:', error);
  }
  
  return {
    userId,
    interests: [],
    recentQueries: [],
    preferences: {},
    lastInteracted: new Date().toISOString(),
  };
}

/**
 * Update the user's interests based on their interactions
 */
export async function updateUserInterests(
  userId: string, 
  category: string, 
  increment: number = 1
): Promise<void> {
  if (!userId) return;

  const profile = await getUserPersonalizationProfile(userId);
  if (!profile) return;
  
  // Update or add the interest
  const existingInterestIndex = profile.interests.findIndex(
    (interest) => interest.category === category
  );
  
  if (existingInterestIndex >= 0) {
    // Update existing interest
    profile.interests[existingInterestIndex].score += increment;
    profile.interests[existingInterestIndex].lastUpdated = new Date().toISOString();
  } else {
    // Add new interest
    profile.interests.push({
      category,
      score: increment,
      lastUpdated: new Date().toISOString(),
    });
  }
  
  // Sort interests by score (descending)
  profile.interests.sort((a, b) => b.score - a.score);
  
  // Update the profile in the database
  const supabase = getSupabaseClient();
  await supabase
    .from('user_personalization')
    .update({
      interests: profile.interests,
      last_interacted: new Date().toISOString(),
    })
    .eq('user_id', userId);
}

/**
 * Add a recent query to the user's profile
 */
export async function addRecentQuery(
  userId: string,
  query: string
): Promise<void> {
  if (!userId || !query) return;

  const profile = await getUserPersonalizationProfile(userId);
  if (!profile) return;
  
  // Add the query to the front of the list
  profile.recentQueries = [
    query,
    ...profile.recentQueries.filter((q) => q !== query).slice(0, 9),
  ];
  
  // Update the profile in the database
  const supabase = getSupabaseClient();
  await supabase
    .from('user_personalization')
    .update({
      recent_queries: profile.recentQueries,
      last_interacted: new Date().toISOString(),
    })
    .eq('user_id', userId);
}

/**
 * Get recent chat messages for the user
 */
export async function getRecentChatHistory(userId: string, limit: number = MAX_HISTORY_MESSAGES): Promise<ChatMessage[]> {
  if (!userId) return [];

  const supabase = getSupabaseClient();
  
  // Get recent chat history from database
  const { data, error } = await supabase
    .from('chat_history')
    .select('messages')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
  
  // Flatten and limit the messages
  const allMessages = (data || []).flatMap((record: any) => record.messages || []);
  return allMessages.slice(0, limit);
}

/**
 * Generate a personalization context for the user
 * This creates a system message with personalized context based on user history
 */
export async function generatePersonalizationContext(userId: string): Promise<string> {
  if (!userId) return '';

  // Get user profile
  const profile = await getUserPersonalizationProfile(userId);
  if (!profile) return '';
  
  // Generate context based on interests
  const topInterests = profile.interests
    .slice(0, 5)
    .map((interest) => interest.category);
  
  // Generate context based on recent queries
  const recentQueries = profile.recentQueries.slice(0, 5);
  
  // Create the context string
  let context = 'User personalization context:\n';
  
  if (topInterests.length > 0) {
    context += `- User has shown interest in: ${topInterests.join(', ')}\n`;
  }
  
  if (recentQueries.length > 0) {
    context += `- User's recent queries: ${recentQueries.join(', ')}\n`;
  }
  
  // Add any user preferences
  if (Object.keys(profile.preferences).length > 0) {
    context += '- User preferences:\n';
    for (const [key, value] of Object.entries(profile.preferences)) {
      context += `  - ${key}: ${value}\n`;
    }
  }
  
  return context;
} 