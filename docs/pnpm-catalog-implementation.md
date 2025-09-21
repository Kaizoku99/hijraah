# pnpm Catalog Implementation for Hijraah Monorepo

## Overview

This document describes the implementation of pnpm catalog feature in the Hijraah monorepo to optimize versioning and enforce a single version policy across all packages.

## What is pnpm Catalog?

pnpm catalog is a feature that allows you to define a centralized list of dependency versions that can be referenced across all packages in a monorepo. This ensures:

- **Single version policy**: All packages use the same version of shared dependencies
- **Centralized management**: Version updates are made in one place
- **Consistency**: Eliminates version conflicts and drift
- **Strict enforcement**: Prevents accidental version mismatches

## Implementation

### 1. Catalog Configuration

The catalog is defined in `pnpm-workspace.yaml`:

```yaml
# Catalog for monorepo dependency version management
catalog:
  # AI SDK packages - consistent across all packages
  "ai": "5.0.37"
  "@ai-sdk/anthropic": "^2.0.8"
  "@ai-sdk/deepseek": "^1.0.10"
  "@ai-sdk/fireworks": "^1.0.10"
  "@ai-sdk/google": "^2.0.11"
  "@ai-sdk/mistral": "^2.0.12"
  "@ai-sdk/openai": "^2.0.22"
  "@ai-sdk/react": "^2.0.26"
  "@ai-sdk/gateway": "^1.0.15"

  # Database and ORM
  "drizzle-orm": "^0.34.0"
  "drizzle-kit": "^0.25.0"
  "postgres": "^3.4.4"
  "@supabase/supabase-js": "^2.47.10"

  # Core utilities
  "zod": "^4.1.4"
  "typescript": "^5.8.3"
  "openai": "^5.16.0"
  "uuid": "^11.1.0"

  # Build tools
  "tsup": "^8.0.0"
  "eslint": "^8.57.0"
  "@typescript-eslint/eslint-plugin": "^6.14.0"
  "@typescript-eslint/parser": "^6.14.0"

  # Testing
  "vitest": "^1.0.0"
  "@vitest/coverage-v8": "^1.0.0"

  # Node types
  "@types/node": "^22.8.6"
  "@types/uuid": "^10.0.0"

  # Framework specific
  "next": "15.5.2"
  "react": "^19.0.0"
  "react-dom": "^19.0.0"
  "@types/react": "^19.0.0"
  "@types/react-dom": "^19.0.0"

  # Trigger.dev
  "@trigger.dev/sdk": "^4.0.1"

  # Redis and caching
  "@upstash/redis": "^1.34.9"
  "@upstash/vector": "^1.2.2"

  # Utilities
  "cheerio": "^1.0.0-rc.12"
  "turndown": "^7.2.0"
  "node-cache": "^5.1.2"
  "firecrawl": "^3.3.0"
  "langchain": "^0.3.29"

# Enforce strict catalog mode
catalogMode: strict
```

### 2. Strict Mode Enforcement

The `catalogMode: strict` setting ensures that:

- Only dependencies listed in the catalog can be added
- All catalog references must resolve to valid versions
- Version consistency is enforced across the monorepo

### 3. Package.json Updates

All package.json files have been updated to use catalog references:

```json
{
  "dependencies": {
    "ai": "catalog:",
    "@ai-sdk/openai": "catalog:",
    "zod": "catalog:",
    "typescript": "catalog:"
  }
}
```

## Benefits Achieved

### 1. Version Consistency

- All packages now use identical versions of shared dependencies
- Eliminates version conflicts and peer dependency warnings
- Ensures compatibility across the entire monorepo

### 2. Centralized Management

- Version updates are made in one place (`pnpm-workspace.yaml`)
- Reduces maintenance overhead
- Prevents accidental version drift

### 3. Strict Enforcement

- `catalogMode: strict` prevents adding dependencies not in the catalog
- Ensures all packages follow the same versioning policy
- Catches version mismatches early in development

### 4. Improved Developer Experience

- Clear visibility into all shared dependencies
- Simplified dependency management
- Reduced lockfile conflicts

## Packages Updated

The following packages have been migrated to use catalog references:

- `@hijraah/web` (main web application)
- `@hijraah/mas` (Multi-Agent System)
- `@hijraah/rag` (RAG pipeline)
- `@hijraah/ai` (AI utilities)
- `@hijraah/database` (Database layer)
- `@hijraah/utils` (Shared utilities)
- `@hijraah/types` (TypeScript types)
- `@hijraah/documents` (Document processing)
- `@hijraah/workflows` (Background jobs)
- `@hijraah/data-acquisition` (Data acquisition system)

## Common Dependencies Cataloged

The catalog includes the most frequently used dependencies across packages:

- **AI SDK packages**: All AI-related packages for consistency
- **Database**: Drizzle ORM, Postgres, Supabase client
- **Build tools**: TypeScript, TSup, ESLint
- **Testing**: Vitest and coverage tools
- **Framework**: Next.js, React
- **Utilities**: Zod, UUID, date-fns
- **External services**: Trigger.dev, Upstash, Firecrawl

## Usage Guidelines

### Adding New Dependencies

1. **Check the catalog first**: If the dependency is already cataloged, use `catalog:` reference
2. **Add to catalog**: For new shared dependencies, add them to the catalog in `pnpm-workspace.yaml`
3. **Use specific versions**: For package-specific dependencies, use regular version specifiers

### Updating Dependencies

1. **Update catalog**: Change the version in `pnpm-workspace.yaml`
2. **Run install**: Execute `pnpm install` to update all packages
3. **Test thoroughly**: Ensure all packages work with the new version

### Example: Adding a New Cataloged Dependency

```yaml
# In pnpm-workspace.yaml
catalog:
  "lodash": "^4.17.21" # Add new dependency
```

```json
// In package.json
{
  "dependencies": {
    "lodash": "catalog:" // Reference catalog version
  }
}
```

## Validation

The catalog implementation has been validated:

✅ All packages install successfully  
✅ Catalog references resolve correctly  
✅ Strict mode enforces consistency  
✅ Version conflicts eliminated  
✅ Lockfile updated successfully

## Future Considerations

1. **Named Catalogs**: Consider using named catalogs for different dependency groups if needed
2. **Version Ranges**: Monitor if stricter version pinning is needed
3. **Automation**: Consider automating catalog updates with dependabot or similar tools
4. **Documentation**: Keep this document updated as the catalog evolves

## Troubleshooting

### Common Issues

1. **Catalog reference not found**: Ensure the dependency is added to the catalog
2. **Version conflicts**: Check if the cataloged version is compatible with all packages
3. **Lockfile issues**: Run `pnpm install` to update the lockfile after catalog changes

### Commands

```bash
# Install dependencies with catalog
pnpm install

# Check for outdated dependencies
pnpm outdated

# Update all dependencies (respecting catalog)
pnpm update
```

## Conclusion

The pnpm catalog implementation successfully establishes a single version policy across the Hijraah monorepo, providing better consistency, easier maintenance, and improved developer experience. The strict enforcement ensures that version discipline is maintained as the project grows.
