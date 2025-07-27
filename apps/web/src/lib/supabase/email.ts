import { createClient } from "@supabase/supabase-js";

import { Locale } from "@/shared/emails/i18n/translations";

// Type definitions for email functions
export type EmailType =
  | "signup"
  | "invite"
  | "magiclink"
  | "recovery"
  | "email_change";

// Base interface for all email parameters
interface BaseEmailParams {
  email: string;
  locale?: Locale;
}

// Password reset email parameters
export interface PasswordResetEmailParams extends BaseEmailParams {
  redirectTo?: string;
}

// Email confirmation parameters
export interface EmailConfirmationParams extends BaseEmailParams {
  redirectTo?: string;
}

// Magic link login parameters
export interface MagicLinkEmailParams extends BaseEmailParams {
  redirectTo?: string;
}

// Email change parameters
export interface EmailChangeParams extends BaseEmailParams {
  newEmail: string;
}

// User invitation parameters
export interface UserInvitationParams extends BaseEmailParams {
  inviterEmail: string;
  inviterName?: string;
  organizationId?: string;
  organizationName?: string;
  redirectTo?: string;
}

/**
 * Send an email using Supabase Auth API
 * This function handles the appropriate Supabase Auth method based on the email type
 */
export async function sendEmail(
  type: EmailType,
  params:
    | BaseEmailParams
    | PasswordResetEmailParams
    | EmailConfirmationParams
    | MagicLinkEmailParams
    | EmailChangeParams
    | UserInvitationParams,
  options: { captchaToken?: string } = {},
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL or service role key is not defined");
  }

  // Create a Supabase client with the service role key to access admin functions
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Add locale to user metadata if provided
  const locale = params.locale || "en";

  try {
    switch (type) {
      case "recovery":
        const { email, redirectTo } = params as PasswordResetEmailParams;
        return await supabase.auth.resetPasswordForEmail(email, {
          redirectTo,
          captchaToken: options.captchaToken,
        });

      case "signup":
        const signupParams = params as EmailConfirmationParams;
        // For signups, you would typically create the user first
        // This is just a placeholder - you would need to implement actual user creation
        throw new Error(
          "Signup email sending should be handled during user creation",
        );

      case "magiclink":
        const magiclinkParams = params as MagicLinkEmailParams;
        return await supabase.auth.signInWithOtp({
          email: magiclinkParams.email,
          options: {
            emailRedirectTo: magiclinkParams.redirectTo,
            captchaToken: options.captchaToken,
            data: {
              preferred_locale: locale,
            },
          },
        });

      case "email_change":
        // This would typically be handled by updating the user's email
        // This is just a placeholder - you would need to implement the actual email change
        throw new Error("Email change should be handled through user update");

      case "invite":
        // User invitations would typically be handled through your own API
        // This is just a placeholder - you would need to implement the actual invitation process
        throw new Error(
          "User invitations should be handled through custom API",
        );

      default:
        throw new Error(`Unsupported email type: ${type}`);
    }
  } catch (error) {
    console.error(`Failed to send ${type} email:`, error);
    throw error;
  }
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(
  params: PasswordResetEmailParams,
  captchaToken?: string,
) {
  return sendEmail("recovery", params, { captchaToken });
}

/**
 * Send a magic link email for passwordless login
 */
export async function sendMagicLinkEmail(
  params: MagicLinkEmailParams,
  captchaToken?: string,
) {
  return sendEmail("magiclink", params, { captchaToken });
}
