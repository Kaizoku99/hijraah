import { redirect } from "next/navigation";

import { ExtendedUser, UserSettings, createExtendedUser } from "@/types/auth";

/**
 * Base URL for the application
 */
export const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Safe server-side redirect that handles edge cases
 */
export function safeServerRedirect(url: string = "/") {
  // Ensure the URL starts with a slash or has http(s)
  if (!url.startsWith("/") && !url.startsWith("http")) {
    url = `/${url}`;
  }

  // If URL is a relative path, make sure it doesn't start with multiple slashes
  if (url.startsWith("//") && !url.startsWith("//www.")) {
    url = url.replace(/^\/+/, "/");
  }

  // For security, only allow redirects to same domain or known safe domains
  // if external URL (starts with http)
  if (url.startsWith("http") && !url.startsWith(BASE_URL)) {
    const isSafeDomain = [
      // Add your list of trusted domains here
      "supabase.com",
      "vercel.app",
      "github.com",
    ].some((domain) => url.includes(domain));

    if (!isSafeDomain) {
      console.warn(`Unsafe redirect prevented to: ${url}`);
      url = "/";
    }
  }

  redirect(url);
}

/**
 * Parse JWT token without library
 */
export function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

/**
 * Get remaining time of a JWT token in seconds
 */
export function getTokenRemainingTime(token: string): number {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return 0;

    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const remainingTime = Math.max(0, expiryTime - currentTime);

    return Math.floor(remainingTime / 1000); // Convert to seconds
  } catch (error) {
    console.error("Failed to get token remaining time:", error);
    return 0;
  }
}

/**
 * Get user's preferred locale from browser or storage
 */
export function getUserLocale(): string {
  if (typeof navigator === "undefined") return "en";

  return navigator.languages?.[0] || navigator.language || "en";
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random string for CSRF protection
 */
export function generateRandomString(length: number = 16): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Validate user settings before applying them
 * Returns validated settings or throws an error if invalid
 */
export function validateUserSettings(
  settings: Partial<UserSettings>
): Partial<UserSettings> {
  const validatedSettings: Partial<UserSettings> = {};

  // Validate theme
  if (settings.theme !== undefined) {
    const validThemes = ["light", "dark", "system"];
    if (!validThemes.includes(settings.theme)) {
      throw new Error(
        `Invalid theme: ${settings.theme}. Valid values are: ${validThemes.join(", ")}`
      );
    }
    validatedSettings.theme = settings.theme;
  }

  // Validate language
  if (settings.language !== undefined) {
    const validLanguages = ["en", "es", "fr", "de", "ar"];
    if (!validLanguages.includes(settings.language)) {
      throw new Error(
        `Invalid language: ${settings.language}. Valid values are: ${validLanguages.join(", ")}`
      );
    }
    validatedSettings.language = settings.language;
  }

  // Pass through boolean settings
  const booleanSettings: (keyof Pick<
    UserSettings,
    | "emailNotifications"
    | "documentReminders"
    | "applicationUpdates"
    | "twoFactorAuth"
  >)[] = [
    "emailNotifications",
    "documentReminders",
    "applicationUpdates",
    "twoFactorAuth",
  ];

  for (const setting of booleanSettings) {
    if (settings[setting] !== undefined) {
      validatedSettings[setting] = settings[setting];
    }
  }

  return validatedSettings;
}

/**
 * Check if user can enable two-factor authentication
 * In a real application, this might check for prerequisites
 */
export function canEnableTwoFactorAuth(user: ExtendedUser): boolean {
  // Check if user has an email (required for 2FA)
  if (!user.email) {
    return false;
  }

  return true;
}

/**
 * Apply default settings to a user
 */
export function applyDefaultSettings(user: ExtendedUser): ExtendedUser | null {
  // Default settings based on business rules
  const defaultSettings: UserSettings = {
    theme: "system",
    language: "en",
    emailNotifications: true,
    documentReminders: true,
    applicationUpdates: true,
    twoFactorAuth: false,
  };

  if (user.updateSettings) {
    return user.updateSettings(defaultSettings);
  }

  // If user doesn't have the updateSettings method (shouldn't happen)
  return createExtendedUser({
    ...user,
    user_metadata: {
      ...user.user_metadata,
      settings_theme: defaultSettings.theme,
      settings_language: defaultSettings.language,
      settings_emailNotifications: defaultSettings.emailNotifications,
      settings_documentReminders: defaultSettings.documentReminders,
      settings_applicationUpdates: defaultSettings.applicationUpdates,
      settings_twoFactorAuth: defaultSettings.twoFactorAuth,
    },
  });
}

/**
 * Sanitize user avatar URL
 * This ensures the URL points to a trusted source
 */
export function sanitizeAvatarUrl(url: string): string {
  if (!url) return "/avatars/default-1.png";

  // Validate and sanitize URL
  try {
    const parsedUrl = new URL(url);

    // Only allow certain domains for security
    const allowedDomains = [
      "storage.googleapis.com",
      "githubusercontent.com",
      "gravatar.com",
      "yourapp.com",
      "supabase.co",
      "supabase.in",
      "api.dicebear.com", // Allow DiceBear for identicons
    ];

    if (!allowedDomains.some((domain) => parsedUrl.hostname.includes(domain))) {
      // Return a default avatar if domain is not allowed
      return "/avatars/default-1.png";
    }

    // Ensure HTTPS
    if (parsedUrl.protocol !== "https:") {
      parsedUrl.protocol = "https:";
    }

    return parsedUrl.toString();
  } catch (e) {
    // If URL is invalid, return a default avatar
    return "/avatars/default-1.png";
  }
}
