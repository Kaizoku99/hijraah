import { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

/**
 * Custom Error for Avatar Upload failures
 */
export class AvatarUploadError extends Error {
  constructor(
    message: string,
    public originalError?: any,
  ) {
    super(message);
    this.name = "AvatarUploadError";
    if (originalError && originalError.stack) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Custom Error for Profile Update failures
 */
export class ProfileUpdateError extends Error {
  constructor(
    message: string,
    public originalError?: any,
  ) {
    super(message);
    this.name = "ProfileUpdateError";
    if (originalError && originalError.stack) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Utility functions for avatar management
 */

const AVATAR_BUCKET = "avatars";
const DEFAULT_AVATARS = [
  "/avatars/default-1.png",
  "/avatars/default-2.png",
  "/avatars/default-3.png",
  "/avatars/default-4.png",
  "/avatars/default-5.png",
];

// Default avatar path
const defaultAvatarPath = "/avatars/default.png";

// Cache for avatar URLs
const avatarCache = new Map<string, string>();

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
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use the hash to pick an avatar
  const index = Math.abs(hash) % DEFAULT_AVATARS.length;
  return DEFAULT_AVATARS[index];
}

/**
 * Upload an avatar image to Supabase storage
 */
export async function uploadAvatar(
  supabase: SupabaseClient<Database>,
  file: File,
  userId: string,
): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw new AvatarUploadError(
        "Failed to upload avatar to storage.",
        uploadError,
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

    if (!publicUrl) {
      throw new AvatarUploadError(
        "Failed to get public URL for avatar after upload.",
      );
    }

    return publicUrl;
  } catch (error) {
    if (error instanceof AvatarUploadError) {
      throw error;
    }
    console.error("Error uploading avatar:", error);
    throw new AvatarUploadError(
      "An unexpected error occurred during avatar upload.",
      error,
    );
  }
}

/**
 * Update a user's avatar_url in the profile
 */
export async function updateUserAvatar(
  supabase: SupabaseClient<Database>,
  userId: string,
  avatarUrl: string,
): Promise<void> {
  try {
    // First, check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      throw new ProfileUpdateError(
        "Error checking for existing profile before avatar update.",
        profileError,
      );
    }

    if (profile) {
      // Update existing profile
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq("id", userId);

      if (error) {
        throw new ProfileUpdateError(
          "Failed to update profile with new avatar URL.",
          error,
        );
      }
    } else {
      // Create new profile
      const { error } = await supabase.from("profiles").insert({
        id: userId,
        avatar_url: avatarUrl,
        // first_name and last_name could be fetched or passed if needed here
        // For now, relying on the handle_new_user trigger for defaults on new auth users,
        // but this direct insert might need more fields if it's a common path.
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw new ProfileUpdateError(
          "Failed to create new profile with avatar URL.",
          error,
        );
      }
    }
  } catch (error) {
    if (error instanceof ProfileUpdateError) {
      throw error;
    }
    console.error("Error updating user avatar:", error);
    throw new ProfileUpdateError(
      "An unexpected error occurred while updating user avatar.",
      error,
    );
  }
}

/**
 * Generates a deterministic Identicon URL based on the user ID.
 * @param userId The user's unique ID.
 * @returns A URL to the Identicon image.
 */
export const getIdenticonUrl = (userId: string): string => {
  // Simple hashing function (replace with a more robust one if needed)
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  const identiconId = Math.abs(hash % 1000); // Generate a number between 0-999
  return `https://api.dicebear.com/8.x/identicon/svg?seed=${identiconId}`;
};

/**
 * Retrieves the user's avatar URL.
 * Fetches from Supabase storage, falls back to Identicon, uses cache.
 * @param supabase The Supabase client instance.
 * @param userId The user's unique ID.
 * @returns A promise that resolves to the avatar URL string.
 */
export async function getUserAvatar(
  supabase: SupabaseClient<Database>, // Accept client as argument
  userId: string,
): Promise<string> {
  if (!userId) {
    console.warn("getUserAvatar called with no userId, returning default.");
    return defaultAvatarPath;
  }

  // Check cache first
  if (avatarCache.has(userId)) {
    return avatarCache.get(userId)!;
  }

  // Ensure supabase client is provided
  if (!supabase) {
    console.error("getUserAvatar requires a valid Supabase client instance.");
    return getIdenticonUrl(userId); // Fallback to identicon if client missing
  }

  try {
    // 1. Check 'profiles' table for an 'avatar_url' column
    const { data: profileData, error: profileError } = await supabase
      .from("profiles") // Ensure 'profiles' table exists
      .select("avatar_url") // Ensure 'avatar_url' column exists
      .eq("id", userId)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      // Ignore 'PGRST116' (No rows found)
      console.error(
        "Error fetching profile avatar_url (raw):",
        profileError,
        "Error fetching profile avatar_url (JSON):",
        JSON.stringify(profileError, Object.getOwnPropertyNames(profileError)),
      );
    }

    if (profileData?.avatar_url) {
      avatarCache.set(userId, profileData.avatar_url);
      return profileData.avatar_url;
    }

    // 2. If no avatar_url in profile, check Supabase Storage (e.g., 'avatars' bucket)
    const avatarFilePath = `public/${userId}.png`; // Adjust path convention as needed
    const { data: storageData } = await supabase.storage
      .from("avatars") // Ensure 'avatars' bucket exists
      .getPublicUrl(avatarFilePath);

    // Check for specific storage errors (like file not found)
    if (storageData?.publicUrl) {
      // Verify the URL is accessible before caching (optional but recommended)
      // Could involve a quick HEAD request, but adds latency.
      // For simplicity, we assume the URL is valid if returned without critical error.

      // Check if the URL ends with the expected file path to avoid potential default bucket URLs
      if (storageData.publicUrl.endsWith(avatarFilePath)) {
        avatarCache.set(userId, storageData.publicUrl);
        return storageData.publicUrl;
      } else {
        console.warn(
          `Storage URL ${storageData.publicUrl} does not match expected path ${avatarFilePath}. Falling back.`,
        );
      }
    }

    // 3. Fallback to Identicon if no profile URL and no storage URL found/valid
    const identiconUrl = getIdenticonUrl(userId);
    avatarCache.set(userId, identiconUrl);
    return identiconUrl;
  } catch (error) {
    console.error(
      "Error getting user avatar (raw):",
      error,
      "Error getting user avatar (JSON):",
      JSON.stringify(error, Object.getOwnPropertyNames(error)),
    );
    // Final fallback in case of any unexpected error
    const identiconUrl = getIdenticonUrl(userId);
    avatarCache.set(userId, identiconUrl); // Cache fallback
    return identiconUrl;
  }
}

/**
 * Clears the avatar cache for a specific user.
 * @param userId The user ID to clear from the cache.
 */
export function clearAvatarCache(userId: string): void {
  avatarCache.delete(userId);
}

/**
 * Clears the entire avatar cache.
 */
export function clearAllAvatarCache(): void {
  avatarCache.clear();
}
