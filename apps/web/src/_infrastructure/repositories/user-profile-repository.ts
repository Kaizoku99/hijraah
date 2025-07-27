import { Database } from "@/types/database.types";
import {
  DomainMapper,
  DBUserProfileRow,
  UserProfileDomain,
} from "@/types/domain-mappings";

import { BaseRepository } from "./base-repository";

/**
 * Type definitions for UserProfile
 */
export type UserProfile = DBUserProfileRow; // Use domain mapping type
export type UserProfileInsert =
  Database["public"]["Tables"]["profiles"]["Insert"];
export type UserProfileUpdate =
  Database["public"]["Tables"]["profiles"]["Update"];

/**
 * Type definitions for UserPreferences
 */
export type UserPreferences =
  Database["public"]["Tables"]["user_preferences"]["Row"];
export type UserPreferencesInsert =
  Database["public"]["Tables"]["user_preferences"]["Insert"];
export type UserPreferencesUpdate =
  Database["public"]["Tables"]["user_preferences"]["Update"];

/**
 * Repository for user profile operations
 */
export class UserProfileRepository extends BaseRepository<UserProfile> {
  constructor() {
    super("profiles");
  }

  // Implement the abstract method from BaseRepository
  toDomainEntity(record: UserProfile): UserProfile {
    // Assuming the database record is already in the shape of the domain entity
    return record;
  }

  /**
   * Convert database record to domain mapping format
   */
  toUserProfileDomain(record: UserProfile): UserProfileDomain {
    return DomainMapper.toUserProfileDomain(record);
  }

  /**
   * Prepare user profile domain entity for database storage
   */
  fromUserProfileDomain(domain: UserProfileDomain): Partial<UserProfile> {
    return DomainMapper.fromUserProfileDomain(domain);
  }

  /**
   * Get a profile by user ID
   */
  async getByUserId(userId: string): Promise<UserProfile | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Record not found
      throw error;
    }
    return data as UserProfile;
  }

  /**
   * Create or update a user profile
   */
  async upsert(profile: UserProfileInsert): Promise<UserProfile> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .upsert(profile)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Get user preferences by user ID
   */
  async getPreferences(userId: string): Promise<UserPreferences | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Record not found
      throw error;
    }
    return data as UserPreferences;
  }

  /**
   * Update user theme preference
   */
  async updateTheme(userId: string, theme: string): Promise<UserPreferences> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("user_preferences")
      .update({ theme })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserPreferences;
  }

  /**
   * Update user language/timezone preferences
   */
  async updateLanguage(userId: string, language: string): Promise<UserProfile> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .update({ language })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }

  /**
   * Update notification settings
   */
  async updateNotificationSettings(
    userId: string,
    settings: {
      emailNotifications?: boolean;
    },
  ): Promise<UserPreferences> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("user_preferences")
      .update({
        notifications_enabled: settings.emailNotifications,
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserPreferences;
  }

  /**
   * Update all user preferences at once
   */
  async updatePreferences(
    userId: string,
    preferences: Partial<UserPreferencesUpdate>,
  ): Promise<UserPreferences> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("user_preferences")
      .update(preferences)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserPreferences;
  }

  /**
   * Update user avatar URL
   */
  async updateAvatar(userId: string, avatarUrl: string): Promise<UserProfile> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .update({ avatar_url: avatarUrl })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  }
}
