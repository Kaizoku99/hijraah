# Next.js 15 App Directory Restructuring Plan

This document outlines the specific restructuring needed for the app directory to follow Next.js 15 best practices.

## Key Changes

1. **Private Folders**

   - `_components` - Page-specific components not meant to be routable
   - `_hooks` - Custom hooks specific to the app
   - `_lib` - Utility functions specific to the app

2. **Route Groups**

   - `(auth)` - Authentication-related pages (login, signup, etc.)
   - `(authenticated)` - Protected routes requiring authentication
   - `(marketing)` - Public marketing pages

3. **Locale Handling**

   - `[locale]` - Dynamic route segment for internationalization

4. **API Routes**
   - `api` - API endpoints using the App Router pattern

## Import Updates

After restructuring, imports will need to be updated to use the new paths:

```typescript
// OLD
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

// NEW
import { Button } from "@/src/_shared/ui/atoms/button";
import { useUser } from "@/src/_core/auth/hooks/useUser";
```

## Layout and Provider Updates

The `layout.tsx` and `providers.tsx` files need to be updated to use components from the new structure:

1. Update imports in `layout.tsx`
2. Update imports in `providers.tsx`
3. Test to ensure proper rendering

## Deployment Considerations

- When deploying, ensure environment variables are updated
- Check that the Supabase configuration uses port 54800 instead of 54320 to avoid Windows port conflicts

## Testing Plan

1. Test authentication flow
2. Test protected routes
3. Test internationalization
4. Test API endpoints
5. Test UI components in various contexts
