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

## Legacy Migrations

For historical reference, all previous migrations have been backed up to the `_legacy` directory. This allows us to reference them if needed, but they are no longer part of the active migration path.

## Applying Migrations

To apply the consolidated migration:

### Local Development

```bash
# Run the migration script for local development
./apply-migrations.ps1 local
```

### Remote Deployment

```bash
# Apply migration to a remote Supabase project
./apply-migrations.ps1 remote
```

## Future Migrations

For future schema changes, continue creating new migration files with timestamps after the consolidated migration:

```
20250718000000_add_new_feature.sql
20250719000000_another_feature.sql
```

## Migration Versioning

The database includes a `migration_meta` schema that tracks all applied migrations with proper versioning. This allows for better tracking of the database schema state and provides a foundation for potential rollback capabilities in the future.

## Database Reset

If you need to completely reset the database during development:

```bash
# Stop Supabase instance
supabase stop

# Reset the database (WARNING: This clears all data)
supabase db reset

# Start Supabase again
supabase start

# Apply the consolidated migration
./apply-migrations.ps1 local
```
