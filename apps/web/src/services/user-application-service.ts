import { User, UserSettings } from '@/core/user';
import { UserService } from '@/core/user-service';
import { userProfileRepository } from '@/infrastructure/repositories';
import { UserProfileRepository, UserProfile } from '@/infrastructure/repositories/user-profile-repository';

/**
 * User Application Service
 * 
 * Orchestrates domain and infrastructure layers for user operations.
 * This service acts as a facade for the application layer.
 */
export class UserApplicationService {
  private userRepository: UserProfileRepository;
  private userService: UserService;
  
  constructor() {
    // Use the singleton instance from the repository factory
    this.userRepository = userProfileRepository;
    this.userService = new UserService();
  }
  
  /**
   * Get a user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    const profile = await this.userRepository.getByUserId(userId);
    
    if (!profile) {
      return null;
    }
    
    return User.fromProfile(profile);
  }
  
  /**
   * Create or update a user profile
   */
  async createOrUpdateUser(userId: string, data: {
    avatarUrl?: string;
    settings?: Partial<UserSettings>;
  }): Promise<User> {
    // Get existing user or create new one
    const existingProfile = await this.userRepository.getByUserId(userId);
    
    // Process avatar URL if provided
    let sanitizedAvatarUrl: string | undefined;
    if (data.avatarUrl) {
      sanitizedAvatarUrl = this.userService.sanitizeAvatarUrl(data.avatarUrl);
    }
    
    // Process settings if provided
    let validatedSettings: Partial<Record<string, any>> = {};
    if (data.settings) {
      validatedSettings = this.userService.validateUserSettings(data.settings);
    }
    
    // Map domain settings to database columns
    const dbSettings: Partial<UserProfile> = {
      user_id: userId,
      ...(sanitizedAvatarUrl && { avatar_url: sanitizedAvatarUrl }),
      ...(validatedSettings.theme && { settings_theme: validatedSettings.theme }),
      ...(validatedSettings.language && { settings_language: validatedSettings.language }),
      ...(validatedSettings.emailNotifications !== undefined && { 
        settings_emailNotifications: validatedSettings.emailNotifications 
      }),
      ...(validatedSettings.documentReminders !== undefined && { 
        settings_documentReminders: validatedSettings.documentReminders 
      }),
      ...(validatedSettings.applicationUpdates !== undefined && { 
        settings_applicationUpdates: validatedSettings.applicationUpdates 
      }),
      ...(validatedSettings.twoFactorAuth !== undefined && { 
        settings_twoFactorAuth: validatedSettings.twoFactorAuth 
      })
    };
    
    // Create or update the profile
    const savedProfile = existingProfile 
      ? await this.userRepository.update(existingProfile.id, dbSettings)
      : await this.userRepository.upsert({ ...dbSettings, user_id: userId });
    
    // Map back to domain entity
    return User.fromProfile(savedProfile);
  }
  
  /**
   * Update user settings
   */
  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<User> {
    // Validate settings using domain service
    const validatedSettings = this.userService.validateUserSettings(settings);
    
    // Get existing user
    const existingUser = await this.getUserById(userId);
    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Update settings using domain entity method
    const updatedUser = existingUser.updateSettings(validatedSettings);
    
    // Map to database structure and save
    const dbSettings: Partial<UserProfile> = {
      ...(validatedSettings.theme && { settings_theme: validatedSettings.theme }),
      ...(validatedSettings.language && { settings_language: validatedSettings.language }),
      ...(validatedSettings.emailNotifications !== undefined && { 
        settings_emailNotifications: validatedSettings.emailNotifications 
      }),
      ...(validatedSettings.documentReminders !== undefined && { 
        settings_documentReminders: validatedSettings.documentReminders 
      }),
      ...(validatedSettings.applicationUpdates !== undefined && { 
        settings_applicationUpdates: validatedSettings.applicationUpdates 
      }),
      ...(validatedSettings.twoFactorAuth !== undefined && { 
        settings_twoFactorAuth: validatedSettings.twoFactorAuth 
      })
    };
    
    const savedProfile = await this.userRepository.update(existingUser.id, dbSettings);
    
    // Return updated domain entity
    return User.fromProfile(savedProfile);
  }
  
  /**
   * Update user avatar
   */
  async updateAvatar(userId: string, avatarUrl: string): Promise<User> {
    // Sanitize avatar URL using domain service
    const sanitizedUrl = this.userService.sanitizeAvatarUrl(avatarUrl);
    
    // Get existing user
    const existingUser = await this.getUserById(userId);
    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Update avatar using domain entity method
    const updatedUser = existingUser.updateAvatar(sanitizedUrl);
    
    // Map to database structure and save
    const savedProfile = await this.userRepository.updateAvatar(userId, sanitizedUrl);
    
    // Return updated domain entity
    return User.fromProfile(savedProfile);
  }
  
  /**
   * Apply default settings to a user
   */
  async applyDefaultSettings(userId: string): Promise<User> {
    // Get existing user
    const existingUser = await this.getUserById(userId);
    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Apply default settings using domain service
    const userWithDefaults = this.userService.applyDefaultSettings(existingUser);
    
    // Map to database structure and save
    const dbSettings: Partial<UserProfile> = {
      settings_theme: userWithDefaults.settings.theme,
      settings_language: userWithDefaults.settings.language,
      settings_emailNotifications: userWithDefaults.settings.emailNotifications,
      settings_documentReminders: userWithDefaults.settings.documentReminders,
      settings_applicationUpdates: userWithDefaults.settings.applicationUpdates,
      settings_twoFactorAuth: userWithDefaults.settings.twoFactorAuth
    };
    
    const savedProfile = await this.userRepository.update(existingUser.id, dbSettings);
    
    // Return updated domain entity
    return User.fromProfile(savedProfile);
  }
} 