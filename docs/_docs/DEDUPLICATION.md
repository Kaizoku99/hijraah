# Deduplication Process

This document records the deduplication efforts performed as part of the Hijraah project restructuring to Next.js 15.

## Completed Deduplication

The following duplicate files were identified and removed to consolidate the codebase:

### Application Services

- ✅ Removed `src/application/case-application-service.ts` (duplicate of `src/_application/services/case-application-service.ts`)
- ✅ Removed `src/_application/case-application-service.ts` (duplicate of `src/_application/services/case-application-service.ts`)
- ✅ Removed `src/application/user-application-service.ts` (duplicate of `src/_application/services/user-application-service.ts`)
- ✅ Removed `src/_application/user-application-service.ts` (duplicate of `src/_application/services/user-application-service.ts`)
- ✅ Removed `src/application/services/document-service.ts` (duplicate of `src/_application/services/document-service.ts`)
- ✅ Moved `src/services/chat.ts` to `src/_application/services/chat-legacy-service.ts`

All application services are now consolidated in the `src/_application/services/` directory.

### Infrastructure Layer

- ✅ Removed `src/infrastructure/repositories/base-repository.ts` (duplicate of `src/_infrastructure/repositories/base-repository.ts`)
- ✅ Consolidated API-related directories to `src/_infrastructure/api`
- ✅ Moved server actions from `src/actions` to `src/_infrastructure/actions`

All infrastructure components are now consolidated in the `src/_infrastructure/` directory.

### Domain Layer

#### Domain Entities

- ✅ Removed `src/domain/entities/user.ts` (moved to `src/_core/auth/entities/user.ts`)
- ✅ Removed `src/_core/entities/user.ts` (moved to `src/_core/auth/entities/user.ts`)
- ✅ Removed `src/domain/entities/document.ts` (moved to `src/_core/documents/entities/document.ts`)
- ✅ Removed `src/_core/entities/document.ts` (moved to `src/_core/documents/entities/document.ts`)
- ✅ Removed `src/domain/entities/case.ts` (moved to `src/_core/immigration/entities/case.ts`)
- ✅ Removed `src/_core/entities/case.ts` (moved to `src/_core/immigration/entities/case.ts`)
- ✅ Removed `src/domain/entities/chat.ts` (moved to `src/_core/chat/entities/chat.ts`)
- ✅ Removed `src/_core/entities/chat.ts` (moved to `src/_core/chat/entities/chat.ts`)
- ✅ Removed `src/domain/entities/roadmap.ts` (moved to appropriate domain-specific folder)
- ✅ Removed `src/_core/entities/roadmap.ts` (moved to appropriate domain-specific folder)

#### Domain Services

- ✅ Removed `src/domain/services/document-service.ts` (moved to `src/_core/documents/services/document-service.ts`)
- ✅ Removed `src/_core/services/document-service.ts` (moved to `src/_core/documents/services/document-service.ts`)
- ✅ Removed `src/domain/services/user-service.ts` (moved to `src/_core/auth/services/user-service.ts`)
- ✅ Removed `src/domain/services/case-service.ts` (moved to `src/_core/immigration/services/case-service.ts`)
- ✅ Removed `src/domain/services/chat-service.ts` (moved to `src/_core/chat/services/chat-service.ts`)
- ✅ Removed `src/domain/services/roadmap-service.ts` (moved to appropriate domain-specific folder)

All domain entities and services are now consolidated in domain-specific folders under `src/_core/` directory.

### Shared Utilities & Hooks

- ✅ Removed duplicate hooks from `src/hooks` (consolidated in `src/_shared/hooks`)
- ✅ Removed duplicate utilities from `src/utils` (consolidated in `src/_shared/utils`)
- ✅ Removed duplicate components (consolidated in `src/_shared/ui`)
- ✅ Migrated `src/lib` to `src/_shared/lib` (consolidated utilities, helpers, and services)
- ✅ Moved UI components from `src/components` to `src/_shared/components`
- ✅ Moved stores from `src/stores` to `src/_shared/stores`
- ✅ Moved messages from `src/messages` to `src/_shared/messages`

### Contexts, i18n, and Constants

- ✅ Consolidated contexts from `src/contexts` to `src/_shared/contexts`:
  - Moved `auth.tsx` to `src/_shared/contexts/auth-context.tsx`
  - Moved `artifact-context.tsx` to `src/_shared/contexts/artifact-context.tsx`
  - Moved `chat-context.tsx` to `src/_shared/contexts/chat-context.tsx`
- ✅ Consolidated i18n files from `src/i18n` to `src/_shared/i18n`:
  - Moved `request.ts` to `src/_shared/i18n/locale.ts`
  - Moved localization files from `src/locales` to `src/_shared/i18n/locales`
- ✅ Consolidated constants from `src/constants` to `src/_shared/constants`:
  - Moved `onboardingSteps.ts` to `src/_shared/constants/onboarding-steps.ts`
- ✅ Consolidated configuration files from `src/config` to `src/_shared/config`:
  - Moved `ai-models.ts` to `src/_shared/config/ai-models.ts`

### Old Directories Removed

The following empty or obsolete directories have been removed:

- ✅ Removed `src/domain` (consolidated to `src/_core`)
- ✅ Removed `src/application` (consolidated to `src/_application`)
- ✅ Removed `src/infrastructure` (consolidated to `src/_infrastructure`)
- ✅ Removed `src/presentation` (consolidated to `src/_shared` and `src/app`)
- ✅ Removed `src/shared` (consolidated to `src/_shared`)
- ✅ Removed `src/utils` (consolidated to `src/_shared/utils`)
- ✅ Removed `src/hooks` (consolidated to `src/_shared/hooks`)
- ✅ Removed `src/contexts` (consolidated to `src/_shared/contexts`)
- ✅ Removed `src/i18n` (consolidated to `src/_shared/i18n`)
- ✅ Removed `src/constants` (consolidated to `src/_shared/constants`)
- ✅ Removed `src/config` (consolidated to `src/_shared/config`)
- ✅ Removed `src/locales` (consolidated to `src/_shared/i18n/locales`)
- ✅ Removed `src/services` (consolidated to `src/_application/services`)
- ✅ Removed `src/components` (consolidated to `src/_shared/components`)
- ✅ Removed `src/messages` (consolidated to `src/_shared/messages`)
- ✅ Removed `src/stores` (consolidated to `src/_shared/stores`)
- ✅ Removed `src/actions` (consolidated to `src/_infrastructure/actions`)
- ✅ Removed `src/api` (consolidated to `src/_infrastructure/api`)
- ✅ Removed `src/lib` (consolidated to `src/_shared/lib`)

## Areas that May Need Further Deduplication

Ongoing monitoring is needed for potential duplication in these areas:

1. **Repository Implementations**: Verify all repository implementations are using the correct base-repository
2. **Shared Utilities**: Check for duplicated utility functions across directories
3. **Components**: Monitor for duplicate UI components across directories
4. **i18n files**: Ensure localization files aren't duplicated
5. **Services**: Verify all services are properly consolidated and not duplicated in multiple directories
6. **Library Functions**: Review `lib` directory for potential duplication with other utility functions

## Import Path Updates

After deduplication, the following import path patterns should be used:

- Application services: `import { ServiceName } from '@/_application/services/service-name'`
- Infrastructure components: `import { Component } from '@/_infrastructure/component-path'`
- Domain entities: `import { Entity } from '@/_core/domain-name/entities/entity'`
- Domain services: `import { Service } from '@/_core/domain-name/services/service'`
- Shared components: `import { Component } from '@/_shared/components/component-path'`
- UI elements: `import { Component } from '@/_shared/ui/component-path'`
- Hooks: `import { useHook } from '@/_shared/hooks/use-hook'`
- Utilities: `import { utility } from '@/_shared/utils/utility'`
- Contexts: `import { useContext } from '@/_shared/contexts/context-name'`
- Constants: `import { CONSTANT } from '@/_shared/constants/constant-file'`
- i18n: `import { locales } from '@/_shared/i18n/locale'`
- Library functions: `import { function } from '@/_shared/lib/path'`
- Messages: `import { messages } from '@/_shared/messages'`
- Stores: `import { useStore } from '@/_shared/stores/store'`
- Actions: `import { action } from '@/_infrastructure/actions/action'`
- API clients: `import { api } from '@/_infrastructure/api/client'`

## Data Deduplication

Beyond code duplication, the application should also implement proper data deduplication:

1. **Document Deduplication**: Prevent uploading identical documents
2. **User Profile Deduplication**: Prevent creation of duplicate user accounts
3. **Case Deduplication**: Add logic to identify and flag potentially duplicate immigration cases
4. **Form Submission Deduplication**: Prevent duplicate form submissions

## Next Steps

1. Run a full codebase scan to identify any remaining duplicates
2. Update import paths that reference old file locations
3. Implement runtime data deduplication in service layers
4. Verify all imports are correctly pointing to the consolidated files
5. Add automated tests to ensure the consolidated files work correctly
6. Implement Component-level deduplication for UI components that appear to be duplicated
7. Remove original files from old locations after verifying correct implementation
8. Update component imports to use the new consolidated locations
9. Implement tools like [rdfind](https://github.com/pauldreik/rdfind) or [fdupes](https://github.com/adrianlopezroche/fdupes) to scan for remaining duplicate files by content
