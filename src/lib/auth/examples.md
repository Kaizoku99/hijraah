# Unified Auth Helper - Usage Examples

This document provides examples of how to use the Unified Auth Helper in different contexts.

## Client-Side Usage

### Basic Auth Provider Setup in your app

```tsx
// src/app/providers.tsx
"use client";

import { AuthProvider } from "@/lib/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

### Using Auth Hooks in Components

```tsx
// src/components/ProfileButton.tsx
"use client";

import { useAuth, useUser, useIsAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export function ProfileButton() {
  const { user, signOut } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return (
      <Button asChild>
        <a href="/auth/signin">Sign In</a>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar src={user?.avatarUrl} alt={user?.fullName || "User"} />
      <div className="flex flex-col">
        <span className="font-medium">{user?.fullName}</span>
        <span className="text-xs text-muted-foreground">{user?.role}</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
}
```

### Role-Based Access Control

```tsx
// src/components/AdminPanel.tsx
"use client";

import { useIsAdmin } from "@/lib/auth";
import { Unauthorized } from "@/components/Unauthorized";

export function AdminPanel() {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <Unauthorized message="Admin access required" />;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      {/* Admin-only content */}
    </div>
  );
}
```

## Server-Side Usage

### Protecting Routes

```tsx
// src/app/dashboard/page.tsx
import { protect } from "@/lib/auth";

export default async function DashboardPage() {
  // Redirect to sign-in if not authenticated
  await protect();

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### Getting Current User in Server Components

```tsx
// src/app/profile/page.tsx
import { getCurrentUser, protect } from "@/lib/auth";
import { ProfileForm } from "@/components/ProfileForm";

export default async function ProfilePage() {
  await protect();

  const user = await getCurrentUser();

  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm
        initialData={{
          name: user?.fullName || "",
          email: user?.email || "",
        }}
      />
    </div>
  );
}
```

### Role-Based Protection

```tsx
// src/app/admin/page.tsx
import { protectAdmin } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminPage() {
  // This will automatically redirect if not an admin
  await protectAdmin();

  return <AdminDashboard />;
}
```

## Hono API Routes

```tsx
// src/app/api/[[...route]]/route.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authMiddleware, requireAuth, requireAdmin } from "@/lib/auth";

// Create a new Hono app
const app = new Hono().basePath("/api");

// Apply auth middleware globally
app.use("*", authMiddleware());

// Public route
app.get("/", (c) => {
  return c.json({ status: "ok" });
});

// Protected route - requires authentication
app.get("/me", requireAuth(), async (c) => {
  const { user } = c.get("auth");
  return c.json({ user });
});

// Admin-only route
app.get("/admin", requireAdmin(), async (c) => {
  return c.json({ message: "Admin access granted" });
});

// Export Vercel handler
export const GET = handle(app);
export const POST = handle(app);
```

## Advanced Usage

### Using Supabase Client Directly

```tsx
"use client";

import { useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { getBrowserSupabaseClient } from "@/lib/auth/supabase";

export function DataFetcher() {
  const { isAuthenticated } = useAuth();
  const supabase = getBrowserSupabaseClient();

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;

    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    console.log("Data:", data);
  }, [isAuthenticated, supabase]);

  return <button onClick={fetchData}>Fetch Data</button>;
}
```

### Server Action with Supabase

```tsx
"use server";

import { getServerSupabaseClient, protect } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(formData: FormData) {
  await protect();

  const supabase = getServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  const { error } = await supabase.from("profiles").upsert({
    id: session.user.id,
    name,
    bio,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error("Failed to update profile");
  }

  revalidatePath("/profile");

  return { success: true };
}
```
