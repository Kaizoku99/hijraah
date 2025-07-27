import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { ZodError } from "zod";
import { z } from "zod";

// ===== ENHANCED TYPE DEFINITIONS (Context7 Best Practice) =====
export interface ExtendedUser extends User {
  id: string;
  role: "admin" | "user" | "pro" | "enterprise";
  subscriptionTier: "free" | "pro" | "enterprise";
  preferences?: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: boolean;
    aiModel?: string;
  };
  metadata?: {
    onboardingCompleted: boolean;
    lastLogin: Date;
    loginCount: number;
    features: string[];
  };
}

export interface ExtendedSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: "admin" | "user" | "pro" | "enterprise";
    subscriptionTier: "free" | "pro" | "enterprise";
    preferences?: ExtendedUser["preferences"];
    metadata?: ExtendedUser["metadata"];
  };
  accessToken?: string;
  refreshToken?: string;
  error?: "RefreshTokenError";
}

export interface ExtendedJWT extends JWT {
  id: string;
  role: "admin" | "user" | "pro" | "enterprise";
  subscriptionTier: "free" | "pro" | "enterprise";
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  error?: "RefreshTokenError";
  preferences?: ExtendedUser["preferences"];
  metadata?: ExtendedUser["metadata"];
}

// ===== VALIDATION SCHEMAS =====
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms"),
});

// ===== ROLE-BASED ACCESS CONTROL =====
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  PRO: "pro",
  ENTERPRISE: "enterprise",
} as const;

export const PERMISSIONS = {
  // Chat permissions
  CREATE_CHAT: ["admin", "user", "pro", "enterprise"],
  DELETE_CHAT: ["admin", "user", "pro", "enterprise"],
  SHARE_CHAT: ["admin", "pro", "enterprise"],

  // Document permissions
  UPLOAD_DOCUMENTS: ["admin", "user", "pro", "enterprise"],
  PROCESS_DOCUMENTS: ["admin", "pro", "enterprise"],
  BULK_UPLOAD: ["admin", "enterprise"],

  // AI permissions
  USE_BASIC_AI: ["admin", "user", "pro", "enterprise"],
  USE_ADVANCED_AI: ["admin", "pro", "enterprise"],
  USE_PREMIUM_MODELS: ["admin", "enterprise"],

  // Admin permissions
  MANAGE_USERS: ["admin"],
  VIEW_ANALYTICS: ["admin", "enterprise"],
  MANAGE_SUBSCRIPTIONS: ["admin"],

  // Feature permissions
  CREATE_ARTIFACTS: ["admin", "pro", "enterprise"],
  EXPORT_DATA: ["admin", "pro", "enterprise"],
  API_ACCESS: ["admin", "enterprise"],
} as const;

export function hasPermission(
  userRole: string,
  permission: keyof typeof PERMISSIONS
): boolean {
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles.includes(userRole as any);
}

export function requirePermission(
  userRole: string,
  permission: keyof typeof PERMISSIONS
): void {
  if (!hasPermission(userRole, permission)) {
    throw new Error(
      `Permission denied: ${permission} requires one of [${PERMISSIONS[permission].join(", ")}]`
    );
  }
}

// ===== AUTH CONFIGURATION =====
export const authConfig = {
  providers: [
    // Google OAuth with enhanced scopes
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: "user", // Default role
          subscriptionTier: "free", // Default tier
        };
      },
    }),

    // GitHub OAuth
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          role: "user",
          subscriptionTier: "free",
        };
      },
    }),

    // Enhanced Credentials Provider (Context7 Pattern)
    ...(process.env.NODE_ENV === "development"
      ? [
          Credentials({
            id: "credentials",
            name: "Email & Password",
            credentials: {
              email: {
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
              },
              password: {
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
              },
            },
            async authorize(credentials) {
              try {
                if (!credentials?.email || !credentials?.password) {
                  throw new Error("Email and password required");
                }

                // Validate with Zod
                const { email, password } =
                  await signInSchema.parseAsync(credentials);

                // In development, allow test user
                if (
                  email === "test@hijraah.dev" &&
                  password === "password123"
                ) {
                  return {
                    id: "dev-user-1",
                    email: "test@hijraah.dev",
                    name: "Test User",
                    image:
                      "https://avatars.githubusercontent.com/u/67470890?s=200&v=4",
                    role: "admin",
                    subscriptionTier: "enterprise",
                    preferences: {
                      theme: "dark",
                      language: "en",
                      notifications: true,
                      aiModel: "gpt-4",
                    },
                    metadata: {
                      onboardingCompleted: true,
                      lastLogin: new Date(),
                      loginCount: 42,
                      features: ["chat", "documents", "artifacts", "api"],
                    },
                  } as ExtendedUser;
                }

                // Here you would normally validate against your database
                // const user = await validateUser(email, password);

                throw new Error("Invalid credentials");
              } catch (error) {
                if (error instanceof ZodError) {
                  throw new Error("Invalid email or password format");
                }
                throw error;
              }
            },
          }),
        ]
      : []),
  ],

  // Enhanced Callbacks (Context7 Best Practice)
  callbacks: {
    // JWT Callback - Handle token refresh and custom claims
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (account && user) {
        const extendedUser = user as ExtendedUser;

        return {
          ...token,
          id: extendedUser.id,
          role: extendedUser.role || "user",
          subscriptionTier: extendedUser.subscriptionTier || "free",
          preferences: extendedUser.preferences,
          metadata: extendedUser.metadata,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        } as ExtendedJWT;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        return {
          ...token,
          ...session,
        };
      }

      // Token refresh logic for OAuth providers
      if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token;
      }

      // Token expired, try to refresh
      if (token.refresh_token) {
        try {
          const refreshedToken = await refreshAccessToken(token as ExtendedJWT);
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token:", error);
          return {
            ...token,
            error: "RefreshTokenError",
          };
        }
      }

      return token;
    },

    // Session Callback - Shape the session object
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;

      return {
        ...session,
        user: {
          ...session.user,
          id: extendedToken.id,
          role: extendedToken.role,
          subscriptionTier: extendedToken.subscriptionTier,
          preferences: extendedToken.preferences,
          metadata: extendedToken.metadata,
        },
        accessToken: extendedToken.access_token,
        error: extendedToken.error,
      } as ExtendedSession;
    },

    // SignIn Callback - Control who can sign in
    async signIn({ user, account, profile, email, credentials }) {
      // Allow OAuth providers
      if (account?.provider === "google" || account?.provider === "github") {
        return true;
      }

      // Allow credentials in development
      if (
        account?.provider === "credentials" &&
        process.env.NODE_ENV === "development"
      ) {
        return true;
      }

      // Add custom sign-in logic here
      return true;
    },

    // Redirect Callback - Control where users go after auth
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },

  // Session Configuration
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT Configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Pages Configuration
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/onboarding", // Redirect new users to onboarding
  },

  // Events
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`);

      // Track sign-in events
      if (isNewUser) {
        console.log(`New user registered: ${user.email}`);
        // Initialize user preferences, etc.
      }
    },

    async signOut({ token, session }) {
      console.log(`User signed out: ${session?.user?.email}`);
    },
  },

  // Debug mode in development
  debug: process.env.NODE_ENV === "development",
};

// ===== TOKEN REFRESH UTILITY =====
async function refreshAccessToken(token: ExtendedJWT): Promise<ExtendedJWT> {
  try {
    if (!token.refresh_token) {
      throw new Error("No refresh token available");
    }

    // Google OAuth token refresh
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
    });

    const tokensOrError = await response.json();

    if (!response.ok) {
      throw tokensOrError;
    }

    const newTokens = tokensOrError as {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
    };

    return {
      ...token,
      access_token: newTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      refresh_token: newTokens.refresh_token ?? token.refresh_token,
      error: undefined,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

// ===== UTILITY FUNCTIONS =====
export function isAuthenticated(
  session: ExtendedSession | null
): session is ExtendedSession {
  return session !== null && session.user !== undefined;
}

export function isAdmin(session: ExtendedSession | null): boolean {
  return isAuthenticated(session) && session.user.role === "admin";
}

export function isPro(session: ExtendedSession | null): boolean {
  return (
    isAuthenticated(session) &&
    ["pro", "enterprise", "admin"].includes(session.user.role)
  );
}

export function canAccessFeature(
  session: ExtendedSession | null,
  feature: keyof typeof PERMISSIONS
): boolean {
  if (!isAuthenticated(session)) return false;
  return hasPermission(session.user.role, feature);
}

// ===== NEXTAUTH INSTANCE =====
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// ===== TYPE DECLARATIONS =====
declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session extends ExtendedSession {}
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {}
}

export default auth;
