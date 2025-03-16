# Supabase Migrations

This directory contains all database migrations for the Hijraah immigration platform.

## Migration Structure

Migrations follow a structured naming pattern:

```
YYYYMMDD_Major.Minor.Patch_description.sql
```

Where:

- **YYYYMMDD**: Date of migration creation
- **Major**: Breaking schema changes
- **Minor**: Non-breaking feature additions/changes
- **Patch**: Bug fixes and minor adjustments
- **description**: Brief description of the migration

## Migration Versioning System

The project uses a structured migration versioning system that:

1. Tracks all migrations in a `migration_meta.versions` table
2. Uses semantic versioning for schema changes
3. Provides functions to register migrations
4. Maintains a history of migrations

## Consolidated Migration Structure

Following a comprehensive consolidation effort, the migrations have been reorganized into three main files:

1. **20240901_1.0.0_core_system_setup.sql**: Core infrastructure and migration tools

   - Migration versioning system
   - Rollback capability
   - Common utility functions

2. **20240902_1.1.0_primary_schema.sql**: Primary database schema

   - Core data tables (profiles, sessions, cases, documents)
   - Chat system tables
   - Notifications
   - Row-level security policies
   - Indexes and performance optimizations

3. **20240903_1.2.0_extensions_and_features.sql**: Extensions and advanced features
   - Vector search capabilities (pgvector)
   - OCR data processing
   - Subscription system
   - Scheduled jobs
   - Admin functionality

Any future migrations should build on top of these consolidated files.

## Guidelines for New Migrations

When creating new migrations:

1. **Use the correct naming pattern**: Follow the `YYYYMMDD_Major.Minor.Patch_description.sql` format
2. **Register the migration**: Use `migration_meta.register_migration()` at the beginning of your file
3. **Include rollback script**: Register a rollback script using `migration_meta.register_rollback_script()`
4. **Use idempotent statements**: Prefer `CREATE IF NOT EXISTS` and similar patterns
5. **Add comments**: Document the purpose of tables, functions, and complex operations
6. **Create indexes**: Remember to create appropriate indexes for performance
7. **Set up RLS policies**: Implement row-level security when applicable

## Execution Order

When applying these migrations to a new environment, ensure the following order:

1. **Core System Setup** (1.0.0): Sets up versioning and infrastructure
2. **Primary Schema** (1.1.0): Establishes the core tables and functions
3. **Extensions and Features** (1.2.0): Adds advanced capabilities
4. **Subsequent Migrations**: Any migrations added after the consolidation

The migration system automatically tracks which migrations have been applied to prevent duplicate execution.

## Consolidation History

The original migrations have been consolidated to improve maintainability and performance. This consolidation:

1. Reduced the number of migration files from 30+ to 7 core files
2. Reorganized the migration structure for better clarity
3. Ensured all tables have appropriate indexes and RLS policies
4. Standardized naming and function definitions

Original migrations are archived in the `consolidated_backups` directory for reference.

## Updated Migration Structure

Following a comprehensive consolidation effort, the migrations have been reorganized into a structured sequence of files:

1. **20240901_1.0.0_core_system_setup.sql**: Core infrastructure and migration tools

   - Migration versioning system
   - Rollback capability
   - Common utility functions

2. **20240902_1.1.0_primary_schema.sql**: Primary database schema

   - Core data tables (profiles, sessions, cases, documents)
   - Chat system tables
   - Notifications
   - Row-level security policies
   - Indexes and performance optimizations

3. **20240903_1.2.0_extensions_and_features.sql**: Extensions and advanced features

   - Vector search capabilities (pgvector)
   - OCR data processing
   - Subscription system
   - Scheduled jobs
   - Admin functionality

4. **20240920_1.3.0_core_content_tables.sql**: Content management system

   - Artifacts storage system
   - Document versioning and collaboration
   - Vector embeddings for semantic search

5. **20240921_1.4.0_research_system.sql**: Research functionality

   - Research sessions, sources, and findings
   - Report generation and analysis
   - Topic identification and gap analysis

6. **20240922_1.5.0_user_experience.sql**: User experience features

   - User onboarding system
   - Preference management
   - Personalization infrastructure

7. **20240923_1.6.0_performance_infrastructure.sql**: Performance optimization

   - Analysis caching system
   - General key-value caching layer
   - Materialized views for common queries

8. **20240924_1.7.0_operational_features.sql**: Operational infrastructure

   - Data retention policies and archiving
   - Database sharding for horizontal scaling
   - Entity-based routing for multi-database setups

9. **20240925_1.8.0_additional_features.sql**: Additional features including:
   - Agents System for autonomous functionality
   - Fine-tuning System for AI model improvement
   - Security Enhancements including audit logging
   - Rate Limiting for API protection
   - Observability for logging and performance monitoring
   - Personalization for user-specific content

## Execution Order

When applying these migrations to a new environment, ensure the following order:

1. **Core System Setup** (1.0.0): Sets up versioning and infrastructure
2. **Primary Schema** (1.1.0): Establishes the core tables and functions
3. **Extensions and Features** (1.2.0): Adds advanced capabilities
4. **Content Tables** (1.3.0): Provides content management functionality
5. **Research System** (1.4.0): Adds research capabilities
6. **User Experience** (1.5.0): Implements onboarding and preferences
7. **Performance Infrastructure** (1.6.0): Adds caching and optimization
8. **Operational Features** (1.7.0): Provides scaling and retention features
9. **Additional Features** (1.8.0): Adds additional capabilities
10. **Latest Migrations**: Any migrations added after the consolidation

The migration system automatically tracks which migrations have been applied to prevent duplicate execution.

## Migration Consolidation

The migrations have been consolidated on 2025-03-11 to improve maintainability:

1. **20240901_1.0.0_core_system_setup.sql**: Core migration infrastructure and versioning system
2. **20240902_1.1.0_primary_schema.sql**: Primary database schema with core tables
3. **20240903_1.2.0_extensions_and_features.sql**: Extensions and advanced features

Original migrations have been archived in the consolidated_backups directory.

## Migration Files

Our migration structure is organized into the following files:

1. **20240901_1.0.0_base_schema.sql** - Initial schema setup with core tables and functions
2. **20240910_1.1.0_auth_and_profiles.sql** - Authentication system and user profiles
3. **20240915_1.2.0_documents_and_cases.sql** - Document management and case handling system
4. **20240920_1.3.0_core_content_tables.sql** - Artifacts system and vector embeddings
5. **20240921_1.4.0_research_system.sql** - Research tables and utility functions
6. **20240922_1.5.0_user_experience.sql** - Onboarding system and user preferences
7. **20240923_1.6.0_performance_infrastructure.sql** - Analysis cache and materialized views
8. **20240924_1.7.0_operational_features.sql** - Data retention and database sharding
9. **20240925_1.8.0_additional_features.sql** - Additional features including:
   - Agents System for autonomous functionality
   - Fine-tuning System for AI model improvement
   - Security Enhancements including audit logging
   - Rate Limiting for API protection
   - Observability for logging and performance monitoring
   - Personalization for user-specific content
10. **20240930_1.9.0_migration_verification.sql** - Formal verification system for migrations
11. **20240931_1.10.0_rollback_system.sql** - Comprehensive rollback system for migrations
12. **20240932_1.11.0_environment_config.sql** - Environment-specific configuration system
13. **20240933_1.12.0_storage_policies_fix.sql** - Fix for storage policies and bucket setup
14. **20240934_1.13.0_policy_syntax_fix.sql** - Fix for policy creation syntax in migrations
15. **20240935_1.14.0_fix_admin_column_references.sql** - Fix for is_admin column references in policies
16. **20240936_1.15.0_fix_fine_tuning_policy.sql** - Fix for fine-tuning policies referencing wrong columns
17. **20240940_1.20.0_migration_fixes.sql** - Various fixes and improvements to earlier migrations
18. **20240941_1.21.0_fix_startup_issues.sql** - Fixes for database startup issues and compatibility
19. **20240950_1.22.0_consolidated_fixes.sql** - Consolidated fixes from previous fix migrations

## Backup Files

The backup files in the `supabase/migrations/backup` directory are previous versions of migration files that have been fixed or updated in newer migrations. These files are kept for historical reference and contain the original implementation before issues were fixed.

Key backup files include:

1. **20240930_1.9.0_migration_verification.sql.bak** - Original implementation of the migration verification system
2. **20240931_1.10.0_rollback_system.sql.bak** - Original implementation of the rollback system
3. **20240932_1.11.0_environment_config.sql.bak** - Original environment configuration system
4. **20240933_1.12.0_storage_policies_fix.sql.bak** - Original storage policy fixes
5. **20240934_1.13.0_policy_syntax_fix.sql.bak** - Original policy syntax fixes
6. **20240935_1.14.0_fix_admin_column_references.sql.bak** - Original fixes for admin column references
7. **20240936_1.15.0_fix_fine_tuning_policy.sql.bak** - Original fix for fine-tuning policies

The functionality from these backup files has been incorporated into:

- The consolidated `0_schema.sql` file
- The new consolidated fixes migration `20240950_1.22.0_consolidated_fixes.sql`
- The individual fix migrations in the main directory

These backup files are maintained for reference but should not be executed directly as their functionality has been superseded by newer migrations.

## Enhanced Migration Framework

### 1. Formal Verification System

The project now includes a comprehensive migration verification system that:

- Tracks all applied migrations in a dedicated schema (`migration_meta`)
- Records success/failure status of each migration
- Stores detailed execution logs and timing information
- Provides functions to verify migrations have been applied correctly

**Usage Example:**

```sql
-- Register a migration
SELECT migration_meta.register_migration(
    '1.12.0',
    'my_new_feature',
    'Add new feature X to the system'
);

-- Verify migrations are applied
SELECT * FROM migration_meta.verify_migrations(
    ARRAY['1.0.0', '1.1.0', '1.2.0']
);
```

### 2. Idempotent Migration Patterns

All new migrations should follow idempotent patterns to ensure they can be safely re-applied:

- Use `CREATE TABLE IF NOT EXISTS` instead of just `CREATE TABLE`
- Check for existence before creating indexes, constraints, or other objects
- Wrap migration code in transaction blocks for atomicity
- Use the idempotent migration template as a starting point

**Template Location:**

```
supabase/migrations/templates/idempotent_migration_template.sql
```

### 3. Explicit Rollback Support

Each migration should now include explicit rollback scripts to support reverting changes:

- Register rollback SQL with `migration_meta.register_rollback()`
- Rollback to specific versions with `migration_meta.rollback_to_version()`
- Rollback specific migrations with `migration_meta.rollback_migration()`

**Rollback Example:**

```sql
-- Register a rollback script
SELECT migration_meta.register_rollback(
    '1.12.0',
    'my_new_feature',
    $ROLLBACK$
    DROP TABLE IF EXISTS my_new_feature_table;
    DROP FUNCTION IF EXISTS my_new_feature_function();
    $ROLLBACK$
);

-- Rollback a specific migration
SELECT migration_meta.rollback_migration('1.12.0', 'my_new_feature');

-- Rollback to a specific version (rolls back all newer migrations)
SELECT * FROM migration_meta.rollback_to_version('1.11.0');
```

**Template Location:**

```
supabase/migrations/templates/rollback_template.sql
```

### 4. Environment-Specific Configurations

Migrations can now adapt to different environments (development, testing, staging, production):

- Use the `env_config.get_environment()` function to detect current environment
- Store configuration using `env_config.set_setting()`
- Retrieve configuration using `env_config.get_setting()`
- Implement environment-specific code paths for different behaviors

**Environment-Specific Example:**

```sql
DO $$
DECLARE
    current_env TEXT;
BEGIN
    current_env := env_config.get_environment();

    CASE current_env
        WHEN 'development' THEN
            -- Development-specific code
        WHEN 'production' THEN
            -- Production-specific code
    END CASE;
END $$;
```

**Template Location:**

```
supabase/migrations/templates/environment_config_template.sql
```

## Migration Best Practices

1. **Start from templates**: Use provided templates for consistent structure
2. **Register every migration**: Call `migration_meta.register_migration()` in each file
3. **Include rollback scripts**: Always provide a way to undo changes
4. **Use idempotent patterns**: Make migrations rerunnable without errors
5. **Consider environments**: Use environment-specific code when needed
6. **Test thoroughly**: Verify migrations work in all target environments
7. **Keep migrations focused**: Each migration should have a single purpose
8. **Document thoroughly**: Include clear comments explaining complex logic

## Migration Workflow

1. Create a new migration file with the correct version number:

   ```bash
   supabase migration new 1.12.0_my_new_feature
   ```

2. Use the templates to structure your migration with proper:

   - Idempotent patterns
   - Rollback scripts
   - Environment-specific code (if needed)

3. Test the migration locally:

   ```bash
   supabase db reset
   ```

4. Apply to staging/production:
   ```bash
   supabase db push
   ```

## Templates Directory

A `templates` directory is provided with starter templates for different migration scenarios:

- `idempotent_migration_template.sql` - Base template with idempotent patterns
- `rollback_template.sql` - Template with explicit rollback support
- `environment_config_template.sql` - Template for environment-specific code
