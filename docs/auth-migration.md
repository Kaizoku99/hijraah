# Authentication Migration Plan

## Current Authentication Implementations

The codebase currently has multiple authentication implementations:

1. **Contexts-based Authentication** (`src/contexts/auth.tsx`):

   - Provider: `AuthProvider`
   - Hook: `useAuth()`
   - Used in many components and pages (25+ imports)

2. **Next Auth Implementation** (`src/lib/auth.ts`):

   - Exports: `auth()`, `authOptions`, etc.
   - Used mainly in API routes and server components

3. **Session Management** (`src/components/session-provider.tsx`):

   - Provider: `SessionProvider`
   - Hook: `useSession()`
   - Used in `session-manager.tsx` and `providers.tsx`

4. **Protected Route Components** (`src/components/auth/protected-route.tsx`):

   - Uses the context-based auth system

5. **Auth Forms** (`src/components/auth/*.tsx`):
   - Login, Register, Reset Password forms using existing auth implementations

## New Unified Auth Helper

Our new implementation (`src/lib/auth/`) provides:

- Comprehensive type-safe authentication
- Advanced token management
- Configurable storage options
- Role-based access control
- Testing utilities
- Error handling with standardized errors

## Migration Strategy

### Phase 1: Configuration and Setup

1. Add the new auth configuration to `src/app/providers.tsx` alongside existing providers
2. Create auth instance initialization in a new file `src/lib/auth-config.ts`

### Phase 2: Component Migration (Client-Side)

1. Create adapter hooks in `src/hooks/auth-migration.ts` to support transitioning from old hooks to new ones:

   ```tsx
   // Temporary compatibility layer
   export const useAuthCompat = () => {
     const oldAuth = useAuth(); // from contexts/auth
     const newAuth = useAuthFromNewLib(); // from lib/auth

     // Return an object with the same shape as the old useAuth
     return {
       user: newAuth.user,
       session: newAuth.session,
       signIn: newAuth.signIn,
       signUp: newAuth.signUp,
       signOut: newAuth.signOut,
       resetPassword: newAuth.resetPassword,
       updatePassword: newAuth.updatePassword,
     };
   };
   ```

2. Update auth forms to use the new auth helper
3. Update protected route component to use the new auth helper

### Phase 3: Server-Side Migration

1. Update API routes to use the new auth helper
2. Update server components to use the new auth helper

### Phase 4: Update Import References

1. Create a script to update all import references to point to the new auth helper
2. Run the script to update all imports

### Phase 5: Testing

1. Test all auth flows with the new implementation
2. Ensure all components and pages function correctly

### Phase 6: Cleanup

1. Remove redundant authentication implementations:
   - `src/contexts/auth.tsx`
   - `src/lib/auth.ts`
   - `src/components/session-provider.tsx`
   - Remove compatibility layer if added in Phase 2

## Timeline

- Phase 1-2: Day 1
- Phase 3-4: Day 2
- Phase 5: Day 3
- Phase 6: Day 4

## Rollback Plan

If issues arise:

1. Keep the compatibility layer in place
2. Roll back to the previous implementation where necessary
3. Address issues in the new implementation
4. Try migration again after fixing issues
