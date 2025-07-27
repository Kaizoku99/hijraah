# Hijraah Immigration Platform Database

This directory contains database migrations, seed data, and utilities for the Hijraah Immigration Platform.

## Migration Structure

Migrations are organized sequentially, with each migration building on the previous ones:

1. `20240101000000_initial_schema.sql` - Initial schema setup
2. `20250408145000_core_system_setup.sql` - Core system setup with migration versioning
3. `20250408145100_extensions_setup.sql` - Extensions setup (pgvector, pgcrypto, etc.)
4. `20250408145200_primary_schema.sql` - Primary schema with core tables and enums
5. `20250408145300_document_categories.sql` - Document categories table and policies
6. `20250408145400_content_and_artifacts.sql` - Content and artifact system for user-generated content

## Local Development

To set up the local database with all migrations:

```bash
supabase db reset
```

This will apply all migrations and seed data from `seed.sql`.

## Adding New Migrations

To create a new migration:

```bash
supabase migration new <migration_name>
```

This will create a new migration file in `supabase/migrations/` with a timestamp prefix.

## Applying Migrations

To apply migrations to a remote Supabase project:

1. Login to Supabase CLI:

   ```bash
   supabase login
   ```

2. Link to your project:

   ```bash
   supabase link
   ```

3. Push migrations:
   ```bash
   supabase db push
   ```

## Database Schema

### Core Tables

- `profiles` - User profiles linked to auth.users
- `sessions` - Chat, research, and case sessions
- `chat_sessions` - Chat-specific session details
- `chat_messages` - Messages within chat sessions
- `document_categories` - Categories for immigration documents
- `artifacts` - User-generated content artifacts

### Schema Management

- `migration_meta.versions` - Tracks applied migrations
- `migration_meta.history` - Detailed migration history
- `migration_meta.rollback_scripts` - Stores rollback SQL

## Helper Functions

- `update_updated_at_column()` - Auto-updates timestamps
- `handle_new_user()` - Creates profiles for new users
- `match_artifacts()` - Similarity search for artifacts
