# Supabase Migrations

This directory contains the schema migrations for the Hijraah application.

## Migration Consolidation

All previous migrations have been consolidated into a single baseline schema file:

- `20250717000000_initial_schema.sql`

The consolidated schema file includes:

- Core Schema setup and extensions
- Migration versioning system
- User profile and auth system
- Unified chat architecture
- Document processing pipeline
- Research system
- Web scraping functionality
- Feedback and notifications system

## TypeScript Types

All TypeScript types have been updated to match the consolidated schema:

- The `src/types/supabase.ts` file contains the Database type definition
- Type-safe enums are available from `src/types/index.ts`
- You can use these type-safe enums throughout the codebase:

  ```typescript
  import { UserRole, CaseStatus } from "@/types";

  // Type-safe enum values
  const role: UserRole = "admin";
  const status: CaseStatus = "approved";
  ```

## Legacy Migrations

For historical reference, all previous migrations have been backed up to the `_legacy` directory. This allows us to reference them if needed, but they are no longer part of the active migration path.

## Applying Migrations

To apply the consolidated migration:

### Local Development

```bash
npx supabase db reset
```

### Production Deployment

For production deployment, use the provided script:

```bash
./apply-migrations.ps1 remote
```

## Adding New Migrations

When adding new features that require database changes:

1. Create a new migration file with a timestamp later than `20250717000000`
2. Apply only the incremental changes needed for your feature
3. Update TypeScript types to match your schema changes
4. Test locally before deploying

Example:

```sql
-- Migration: 20250717123456_add_user_preferences.sql
BEGIN;

-- Add preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT NOT NULL DEFAULT 'light',
    notifications_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own preferences
CREATE POLICY "Users can view own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

COMMIT;
```
