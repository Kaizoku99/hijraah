# Deduplication Process - Final Status

This document records the final status of the deduplication efforts performed as part of the Hijraah project restructuring to Next.js 15.

## Completed Deduplication

### Types

- ✅ Consolidated all type definitions in `src/_shared/types`
- ✅ Created barrel exports for all shared types with `src/_shared/types/index.ts`
- ✅ Removed the original `src/types` directory

### Infrastructure

- ✅ Consolidated `middleware.ts` and `middleware-i18n.ts` to `src/_infrastructure/middleware`
- ✅ Added re-exporting middleware files in the root for compatibility
- ✅ Moved instrumentation to `src/_infrastructure/monitoring`
- ✅ Created barrel exports for all middleware components

### i18n

- ✅ Moved i18n configuration to `src/_shared/i18n`
- ✅ Consolidated and organized localization files
- ✅ Moved i18n middleware to `src/_infrastructure/middleware`

### Stylesheets

- ✅ Moved global CSS to `src/_shared/styles/globals.css`
- ✅ Consolidated style files to `src/_shared/styles`
- ✅ Removed the original `src/styles` directory

### Configuration

- ✅ Moved environment configuration to `src/_shared/config/env.mjs`
- ✅ Centralized configuration files in the shared layer

### Domain Features

- ✅ Moved research feature from `src/features/research` to `src/_core/research`
- ✅ Restructured research components and libraries
- ✅ Removed the original `src/features` directory

### Email Templates

- ✅ Consolidated email templates in `src/_shared/emails`
- ✅ Removed the original `src/emails` directory

### Documentation

- ✅ Moved documentation files to `src/_docs` directory
- ✅ Organized and consolidated all project documentation

## Directory Structure

The project now follows a clean, layered architecture with the following main directories:

1. `src/_core` - Core domain entities, repositories, and business logic
2. `src/_application` - Application services and use cases
3. `src/_infrastructure` - Infrastructure concerns (API, middleware, monitoring)
4. `src/_shared` - Shared utilities, types, constants, and components
5. `src/_docs` - Project documentation
6. `src/_root` - Root-level files for compatibility
7. `src/app` - Next.js app directory with route components

## Benefits of Deduplication

1. **Reduced Code Duplication**: Eliminated duplicate code across the codebase
2. **Clear Dependencies**: Established clear dependency direction (core → application → infrastructure → presentation)
3. **Organized Imports**: Standardized import paths following a consistent pattern
4. **Improved Maintainability**: Reduced complexity by centralizing shared functionality
5. **Better Scalability**: Domain-focused organization allowing for easier feature expansion
6. **Developer Experience**: Easier to locate and update related code

## Import Path Patterns

Use these standardized import patterns in the codebase:

- Core domain: `import { Entity } from '@/_core/domain-name/entities/entity'`
- Application services: `import { Service } from '@/_application/services/service-name'`
- Infrastructure: `import { Component } from '@/_infrastructure/component-path'`
- Shared utilities: `import { utility } from '@/_shared/utils/utility'`
- Shared types: `import { Type } from '@/_shared/types/type-file'`
- Shared components: `import { Component } from '@/_shared/components/component-path'`

## Next Steps

1. Update import paths in all files to reference the new consolidated locations
2. Add automated tests to ensure the restructured files work correctly
3. Implement runtime data deduplication (documents, user profiles, case data)
4. Document the new architecture for onboarding new developers
5. Set up linting rules to enforce the new import patterns
