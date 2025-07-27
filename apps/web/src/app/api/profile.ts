/**
 * @deprecated This module is deprecated and will be removed in a future version.
 * Please import from '@/infrastructure/repositories/user-profile-repository' instead.
 */

import { UserProfileRepository, UserProfile, UserProfileInsert, UserProfileUpdate } from '@/infrastructure/repositories/user-profile-repository';

// Re-export types for compatibility
export type { UserProfile, UserProfileInsert, UserProfileUpdate };

// Create a singleton instance for compatibility
const profileRepository = new UserProfileRepository();

/**
 * @deprecated Use UserProfileRepository.getByUserId instead
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  console.warn('getUserProfile is deprecated. Use UserProfileRepository.getByUserId instead.');
  return profileRepository.getByUserId(userId);
}

/**
 * @deprecated Use UserProfileRepository.upsert instead
 */
export async function createOrUpdateProfile(profile: UserProfileInsert): Promise<UserProfile> {
  console.warn('createOrUpdateProfile is deprecated. Use UserProfileRepository.upsert instead.');
  return profileRepository.upsert(profile);
}

/**
 * @deprecated Use UserProfileRepository.updateTheme instead
 */
export async function updateUserTheme(userId: string, theme: string): Promise<UserProfile> {
  console.warn('updateUserTheme is deprecated. Use UserProfileRepository.updateTheme instead.');
  return profileRepository.updateTheme(userId, theme);
}

/**
 * @deprecated Use UserProfileRepository.updateLanguage instead
 */
export async function updateUserLanguage(userId: string, language: string): Promise<UserProfile> {
  console.warn('updateUserLanguage is deprecated. Use UserProfileRepository.updateLanguage instead.');
  return profileRepository.updateLanguage(userId, language);
}

/**
 * @deprecated Use UserProfileRepository.updateNotificationSettings instead
 */
export async function updateNotificationSettings(
  userId: string,
  settings: {
    emailNotifications?: boolean;
    documentReminders?: boolean;
    applicationUpdates?: boolean;
  }
): Promise<UserProfile> {
  console.warn('updateNotificationSettings is deprecated. Use UserProfileRepository.updateNotificationSettings instead.');
  return profileRepository.updateNotificationSettings(userId, settings);
}

/**
 * @deprecated Use UserProfileRepository.updateAvatar instead
 */
export async function updateUserAvatar(userId: string, avatarUrl: string): Promise<UserProfile> {
  console.warn('updateUserAvatar is deprecated. Use UserProfileRepository.updateAvatar instead.');
  return profileRepository.updateAvatar(userId, avatarUrl);
} 