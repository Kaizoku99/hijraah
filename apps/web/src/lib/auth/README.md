# Hijraah Authentication System

This module provides a comprehensive authentication solution for the Hijraah platform using Supabase Auth.

## Key Features

- 🔐 **Server/Client Authentication** - Unified API for both server and client components
- 🔄 **Token Refreshing** - Automatic token refresh in middleware
- 👤 **User Profiles** - Extended user objects with profile data
- 🚧 **Route Protection** - Easy-to-use route guards for both client & server components

## Usage

### Client Components

```tsx
"use client";

import { useAuth, useUser, useIsAuthenticated } from "@/lib/auth/hooks";

// Access full auth context
export function ProfileButton() {
  const { user, signOut } = useAuth();

  return <button onClick={signOut}>Logout {user?.fullName}</button>;
}

// Check authentication status
export function ConditionalContent() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <p>Please log in to view this content</p>;
  }

  return <p>Welcome back!</p>;
}

// Only render when authenticated
export function ProtectedComponent() {
  const user = useUser();

  if (!user) return null;

  return <div>Hello {user.fullName}</div>;
}
```

### Server Components

```tsx
// src/app/profile/page.tsx
import { protectRoute } from "@/lib/auth/server";

export default async function ProfilePage() {
  // This will redirect to /login if not authenticated
  const user = await protectRoute();

  return (
    <div>
      <h1>Welcome, {user.fullName}!</h1>
      {/* Profile content */}
    </div>
  );
}

// src/app/admin/settings/page.tsx
import { protectAdminRoute } from "@/lib/auth/server";

export default async function AdminSettingsPage() {
  // This will redirect to /unauthorized if not an admin
  const adminUser = await protectAdminRoute();

  return (
    <div>
      <h1>Admin Settings</h1>
      {/* Admin-only content */}
    </div>
  );
}
```

### Route Handler API

```tsx
// src/app/api/user-data/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch user-specific data
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return NextResponse.json({ profile: data });
}
```

## Core Files

- `hooks.tsx` - Client-side hooks for auth state
- `types.ts` - TypeScript definitions for auth entities
- `actions.ts` - Server actions for auth operations
- `server.ts` - Server component helpers
- `middleware.ts` - Session refresh middleware
- `errors.ts` - Auth-specific error types

## Implementation Notes

- Uses `@supabase/ssr` for optimized Next.js App Router support
- Middleware refreshes tokens before they expire
- Extends Supabase User with profile metadata
- Supports OAuth providers via `signIn('google')` etc.

## Future Improvements

- Add support for more third-party oauth providers
- Enhance role-based access controls
- Add support for fine-grained permissions
- Implement invite and account sharing
