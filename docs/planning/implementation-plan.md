# Implementation Plan for DDD Architecture

## Current Implementation Analysis

We've discovered that the project already has structured implementations for:

1. **Supabase Integration**:

   - Client implementation in `src/lib/supabase/client.ts`
   - Server implementation in `src/lib/supabase/server.ts`
   - Additional utilities for storage, realtime, etc.

2. **Hono API**:

   - Main setup in `src/api/hono/index.ts`
   - Routes in `src/api/hono/routes/`
   - Middleware in `src/api/hono/middleware/`

3. **Component Structure**:
   - Partly migrated to Atomic Design in `src/presentation/components/ui/`
   - Legacy components in `src/components/ui/`

## Migration Strategy

Rather than creating new implementations, we'll move existing code to fit our DDD architecture.

### Phase 1: Supabase Integration (Week 1)

1. **Move Supabase Client to Infrastructure Layer**:

   - Create `src/infrastructure/supabase/client.ts` (move from `src/lib/supabase/client.ts`)
   - Create `src/infrastructure/supabase/server.ts` (move from `src/lib/supabase/server.ts`)
   - Update imports throughout the codebase

2. **Create Repository Implementations**:
   - Move existing data access patterns to repositories
   - Focus on one domain at a time (e.g., user, document)

### Phase 2: API Integration (Week 2)

1. **Move Hono API Implementation**:

   - Create `src/infrastructure/api/hono.ts` (core setup from `src/api/hono/index.ts`)
   - Move middleware to `src/infrastructure/api/middleware/`
   - Organize routes by domain in `src/infrastructure/api/routes/`

2. **Apply Domain-Driven Structure to Routes**:
   - Group routes by domain (user, document, etc.)
   - Ensure consistent error handling

### Phase 3: Application Layer (Week 3)

1. **Create Application Services**:

   - Move business logic from scattered locations to domain services
   - Implement use cases for each domain

2. **Complete UI Component Migration**:
   - Continue migrating UI components using the migration script
   - Update component documentation

## Migration Plan for Specific Components

### Supabase Migration Plan

| File        | Source                       | Destination                             | Action            |
| ----------- | ---------------------------- | --------------------------------------- | ----------------- |
| client.ts   | src/lib/supabase/client.ts   | src/infrastructure/supabase/client.ts   | Copy with updates |
| server.ts   | src/lib/supabase/server.ts   | src/infrastructure/supabase/server.ts   | Copy with updates |
| storage.ts  | src/lib/supabase/storage.ts  | src/infrastructure/supabase/storage.ts  | Copy with updates |
| realtime.ts | src/lib/supabase/realtime.ts | src/infrastructure/supabase/realtime.ts | Copy with updates |

### Hono API Migration Plan

| File          | Source                                | Destination                                     | Action            |
| ------------- | ------------------------------------- | ----------------------------------------------- | ----------------- |
| index.ts      | src/api/hono/index.ts                 | src/infrastructure/api/hono.ts                  | Refactor          |
| auth.ts       | src/api/hono/middleware/auth.ts       | src/infrastructure/api/middleware/auth.ts       | Copy with updates |
| rate-limit.ts | src/api/hono/middleware/rate-limit.ts | src/infrastructure/api/middleware/rate-limit.ts | Copy with updates |

## Implementation Steps

1. **Create directory structure** (Completed)
2. **Move Supabase client implementation** (Next)
3. **Move Hono API implementation**
4. **Create domain-specific repositories**
5. **Update imports throughout the codebase**
6. **Test each migrated component**
7. **Document the new architecture**

## Testing Strategy

1. **Unit Tests**: Test each repository and service in isolation
2. **Integration Tests**: Test API endpoints with real Supabase connection
3. **End-to-End Tests**: Test full user flows through the application

## Documentation Updates

1. **Update Architecture Documentation**
2. **Create Domain Model Documentation**
3. **Update API Documentation**
