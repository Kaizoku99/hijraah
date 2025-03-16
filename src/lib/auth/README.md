# Unified Auth Helper for Hijraah 🚀

This module provides a comprehensive authentication solution for the Hijraah platform, combining Supabase Auth with advanced features for both client and server components in Next.js 15.

## Features

- 🔐 **Unified Auth API** - A consistent API for client and server authentication
- 🔄 **Advanced Token Management** - Automatic refresh of tokens before they expire
- 📦 **Configurable Storage** - Multiple storage options (memory, localStorage, sessionStorage, cookies)
- 🛡️ **Role-Based Access Control** - Fine-grained permissions management
- 🧪 **Testing Utilities** - Comprehensive tools for testing authenticated components
- 🚨 **Error Handling** - Standardized error types and handling

## Quick Start

### Initialize Authentication

```typescript
// src/lib/auth-config.ts
import { initializeAuth } from "@/lib/auth";

export const auth = initializeAuth({
  // Optional custom configuration
  storageType: "local", // 'local', 'session', 'memory', or 'cookie'
  logoutRedirectUrl: "/login",
  loginRedirectUrl: "/dashboard",
  rbacOptions: {
    roles: {
      admin: {
        name: "admin",
        description: "Administrator with full access",
        permissions: ["*"],
      },
      user: {
        name: "user",
        description: "Regular user",
        permissions: ["profile:read", "profile:update"],
      },
    },
    superAdminRole: "admin",
  },
});
```

### Server Components Usage

```typescript
// src/app/dashboard/page.tsx
import { getAuthUserOrRedirect, requirePermission } from "@/lib/auth";

export default async function DashboardPage() {
  // Get authenticated user or redirect to login
  const { user, session } = await getAuthUserOrRedirect();

  // Or require specific permission
  const { user } = await requirePermission("dashboard:access");

  return (
    <div>
      <h1>Welcome, {user.fullName}!</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### API Route Usage

```typescript
// src/app/api/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient, UnauthorizedError } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Your protected API logic here
    return NextResponse.json({ message: "Success", user: data.session.user });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof UnauthorizedError
            ? "Unauthorized"
            : "Internal Server Error",
      },
      { status: error instanceof UnauthorizedError ? 401 : 500 }
    );
  }
}
```

### Client-Side Components

```tsx
// src/components/auth/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/lib/auth/hooks";

export function LoginForm() {
  const { signIn, isLoading, error } = useAuth();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    await signIn({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="error">{error.message}</div>}
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
```

## Advanced Features

### Token Management

The token manager automatically refreshes authentication tokens before they expire, ensuring a seamless user experience:

```typescript
import { getTokenManager } from "@/lib/auth";

// Get the token manager instance
const tokenManager = getTokenManager();

// Manually refresh token when needed
await tokenManager.refreshSession();

// Get session with automatic refresh if needed
const session = await tokenManager.getSession();
```

### Role-Based Access Control

The RBAC system enables fine-grained access control:

```typescript
import { getRBACManager, createPermission } from "@/lib/auth";

// Get the RBAC manager
const rbac = getRBACManager();

// Define roles and permissions
rbac.defineRoles({
  editor: {
    name: "editor",
    description: "Content editor",
    permissions: ["content:read", "content:create", "content:update"],
    inherits: ["user"], // Inherit permissions from user role
  },
});

// Check permissions
if (rbac.hasPermission(user, "content:update")) {
  // User has permission to update content
}

// Create permission dynamically
const permission = createPermission("documents", "delete");
```

### Custom Storage Options

Choose how auth state is stored:

```typescript
import {
  getStorageManager,
  MemoryStorageProvider,
  LocalStorageProvider,
  SessionStorageProvider,
  CookieStorageProvider,
} from "@/lib/auth";

// Get the default storage manager
const storage = getStorageManager();

// Or initialize with custom provider
const cookieStorage = new CookieStorageProvider({
  domain: "example.com",
  secure: true,
  sameSite: "strict",
});
```

### Testing Authentication

Use the testing utilities for clean, reliable tests:

```typescript
import {
  createMockUser,
  createMockSession,
  setupAuthComponentTest,
  createMockSupabaseClient,
} from "@/lib/auth/testing";

describe("AuthenticatedComponent", () => {
  it("renders user information when authenticated", () => {
    // Set up an authenticated test environment
    const { mockAuth, cleanup } = setupAuthComponentTest({
      user: createMockUser({ email: "test@example.com" }),
      isAuthenticated: true,
    });

    // Render and test your component
    render(<UserProfileComponent />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();

    // Clean up after test
    cleanup();
  });
});
```

## Error Handling

The module provides standardized error handling:

```typescript
import {
  AuthError,
  UnauthorizedError,
  ForbiddenError,
  InvalidCredentialsError,
  handleSupabaseError,
} from "@/lib/auth";

try {
  // Authentication code
} catch (error) {
  if (error instanceof UnauthorizedError) {
    // Handle unauthorized access
  } else if (error instanceof ForbiddenError) {
    // Handle forbidden access (authenticated but not authorized)
  } else if (error instanceof InvalidCredentialsError) {
    // Handle invalid credentials
  } else {
    // Generic error handling
    console.error("Authentication error:", error);
  }
}
```

## Contributing

When enhancing the auth helper:

1. Maintain backward compatibility
2. Add comprehensive tests
3. Update documentation
4. Follow the established patterns for error handling and configuration

## License

Copyright © Hijraah. All rights reserved.
