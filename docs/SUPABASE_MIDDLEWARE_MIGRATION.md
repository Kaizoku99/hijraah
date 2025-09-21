# Supabase Middleware Migration Guide

## Overview

This guide documents the migration of all middleware files to use the latest Supabase SSR patterns and best practices as of December 2024.

## Key Changes Made

### 1. **Cookie Handling Pattern Update**

**Before (Problematic in Next.js 15):**
```typescript
setAll(cookiesToSet) {
  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });
}
```

**After (Latest Pattern):**
```typescript
setAll(cookiesToSet) {
  // Step 1: Set on request for immediate availability
  cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
  
  // Step 2: Create new response
  supabaseResponse = NextResponse.next()
  
  // Step 3: Set on response for client transmission
  cookiesToSet.forEach(({ name, value, options }) =>
    supabaseResponse.cookies.set(name, value, options)
  )
}
```

### 2. **Enhanced Error Handling**

- Added proper try-catch blocks around auth operations
- Enhanced logging with error codes and status
- Graceful degradation when auth fails

### 3. **Performance Optimizations**

- Added user context headers for API routes to prevent re-authentication
- Optimized cookie copying between responses
- Added session metadata for better debugging

### 4. **Type Safety Improvements**

- Better TypeScript types for middleware configurations
- Enhanced error type handling
- Proper return type definitions

## Files Updated

### Primary Middleware Files:
1. `/apps/web/src/middleware.ts` - Main Next.js middleware
2. `/apps/web/src/utils/supabase/middleware.ts` - Supabase session management
3. `/apps/web/src/lib/auth/middleware.ts` - Authentication utilities
4. `/apps/web/src/_infrastructure/middleware/middleware.ts` - Alternative middleware

### New Files Created:
5. `/apps/web/src/lib/middleware/supabase-middleware-v2.ts` - Latest patterns implementation

## Breaking Changes

### 1. **Cookie Setting Pattern**
The way cookies are set in middleware has changed to accommodate Next.js 15 requirements.

### 2. **Error Handling**
Enhanced error handling may catch issues that were previously silent.

### 3. **API Headers**
New user context headers are now automatically added to API routes.

## Migration Checklist

- [x] Update main middleware.ts
- [x] Update utils/supabase/middleware.ts  
- [x] Update lib/auth/middleware.ts
- [x] Update infrastructure middleware
- [x] Create new v2 middleware patterns
- [x] Update package versions
- [x] Test cookie handling
- [x] Verify authentication flows
- [x] Check API route headers
- [x] Test error scenarios

## Package Version Updates

- `@supabase/ssr`: Updated to latest version
- `@supabase/supabase-js`: Updated to v2.56.1

## Best Practices Implemented

### 1. **Proper Cookie Handling for Next.js 15**
- Avoid passing NextRequest to NextResponse.next()
- Follow the step-by-step cookie setting pattern
- Handle cookie errors gracefully

### 2. **Authentication Flow**
- Always use `auth.getUser()` instead of `auth.getSession()` for validation
- Avoid logic between `createServerClient` and `auth.getUser()`
- Implement proper error boundaries

### 3. **Performance Optimization**
- Inject user context headers for API routes
- Use singleton pattern for browser clients
- Optimize cookie operations

### 4. **Security**
- Validate environment variables
- Implement proper route protection
- Add CSRF protection headers
- Use secure cookie options

## Testing Requirements

After migration, test these scenarios:

1. **Authentication Flow**
   - Login/logout functionality
   - Session persistence across page reloads
   - Authentication in different environments (dev/prod)

2. **Route Protection**
   - Protected routes redirect correctly
   - Public routes remain accessible
   - API routes receive proper headers

3. **Cookie Handling**
   - Cookies are set correctly
   - Session data persists
   - No cookie-related errors in console

4. **Error Scenarios**
   - Missing environment variables
   - Invalid tokens
   - Network failures
   - Session expiration

## Monitoring and Debugging

### Development Logging
Enhanced logging is now available in development mode:

```typescript
console.log('[Supabase Middleware]', {
  path: request.nextUrl.pathname,
  hasUser: !!user,
  userId: user?.id,
  error: authError?.message,
})
```

### Headers for API Routes
API routes now receive these headers automatically:
- `x-supabase-user-id`
- `x-supabase-user-email` 
- `x-supabase-user-role`
- `x-supabase-authenticated`
- `x-supabase-aud`
- `x-supabase-provider`

## Rollback Plan

If issues arise, you can rollback by:

1. Reverting the middleware files to previous patterns
2. Downgrading Supabase packages if needed
3. Disabling new header injection
4. Using the backup middleware implementations

## Support and Resources

- [Supabase SSR Documentation](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js 15 Middleware Guide](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase Migration Guide](https://supabase.com/docs/guides/auth/auth-helpers)

## Next Steps

1. Monitor application in staging/production
2. Review performance metrics
3. Consider implementing additional middleware enhancements
4. Update team documentation and training materials

---

Last Updated: December 31, 2024
Migration Version: v2.0
