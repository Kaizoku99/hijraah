import { getSupabaseClient } from './supabase/client';

/**
 * Utility functions for avatar management
 */

const AVATAR_BUCKET = 'avatars';
const DEFAULT_AVATARS = [
  '/avatars/default-1.png',
  '/avatars/default-2.png',
  '/avatars/default-3.png',
  '/avatars/default-4.png',
  '/avatars/default-5.png',
];

/**
 * Get a random default avatar URL
 */
export function getRandomDefaultAvatar(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_AVATARS.length);
  return DEFAULT_AVATARS[randomIndex];
}

/**
 * Generate an avatar URL based on user ID
 */
export function generateAvatarUrl(userId: string): string {
  // Hash userId to get a consistent avatar for a user
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to pick an avatar
  const index = Math.abs(hash) % DEFAULT_AVATARS.length;
  return DEFAULT_AVATARS[index];
}

/**
 * Upload an avatar image to Supabase storage
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  try {
    const supabase = getSupabaseClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

/**
 * Update a user's avatar_url in the profile
 */
export async function updateUserAvatar(userId: string, avatarUrl: string): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    
    // First, check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    
    if (profileError) throw profileError;
    
    if (profile) {
      // Update existing profile
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq('id', userId);
      
      if (error) throw error;
    } else {
      // Create new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          avatar_url: avatarUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error updating user avatar:', error);
    throw error;
  }
}

/**
 * Get a user's avatar URL from their profile
 */
export async function getUserAvatar(userId: string): Promise<string> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    
    if (data?.avatar_url) {
      return data.avatar_url;
    }
    
    // If no avatar set, generate one
    const defaultAvatar = generateAvatarUrl(userId);
    
    // Save the generated avatar to the profile for future use
    await updateUserAvatar(userId, defaultAvatar);
    
    return defaultAvatar;
  } catch (error) {
    console.error('Error getting user avatar:', error);
    // In case of error, return a random default avatar
    return getRandomDefaultAvatar();
  }
} 