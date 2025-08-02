# Project Structure & Organization

## Monorepo Architecture
The project follows a Turborepo monorepo structure with clear separation between applications and packages.

## Root Level Structure
```
├── apps/                    # Applications
│   └── web/                # Main Next.js application
├── packages/               # Shared packages
│   ├── hijraah-*/         # Domain-specific packages
│   ├── database/          # Database schemas and migrations
│   └── types/             # Shared TypeScript types
├── supabase/              # Database migrations and functions
├── docs/                  # Documentation
├── scripts/               # Build and utility scripts
└── __tests__/             # Global test files
```

## Main Application Structure (apps/web/src)
```
├── _core/                 # Domain layer (DDD)
│   ├── auth/             # Authentication domain
│   ├── chat/             # Chat/messaging domain
│   ├── documents/        # Document management domain
│   ├── immigration/      # Immigration process domain
│   ├── onboarding/       # User onboarding domain
│   └── research/         # Research and analysis domain
├── _infrastructure/       # Infrastructure layer
│   ├── middleware/       # API middleware
│   ├── monitoring/       # Observability and monitoring
│   ├── repositories/     # Data access layer
│   └── services/         # External service integrations
├── _shared/              # Shared utilities and components
│   ├── config/           # Configuration files
│   ├── constants/        # Application constants
│   ├── emails/           # Email templates
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication routes
│   ├── (authenticated)/  # Protected routes
│   ├── (admin)/          # Admin-only routes
│   ├── api/              # API routes
│   └── [locale]/         # Internationalized routes
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   └── presentation/     # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries and configurations
├── services/             # Business logic services
└── types/                # TypeScript type definitions
```

## Package Organization (packages/)
```
├── hijraah-ai/           # AI/ML functionality
├── hijraah-chat/         # Chat system components
├── hijraah-data-acquisition/ # Web scraping and data collection
├── hijraah-documents/    # Document processing
├── hijraah-mas/          # Multi-agent system (Python)
├── hijraah-rag/          # Retrieval-Augmented Generation
├── hijraah-ui/           # Shared UI components
├── hijraah-utils/        # Utility functions
├── hijraah-workflows/    # Business process workflows
├── database/             # Database schemas and migrations
└── types/                # Shared TypeScript types
```

## Key Directories

### Configuration Files
- **Root**: `package.json`, `turbo.json`, `pnpm-workspace.yaml`
- **Next.js**: `next.config.mjs`, `tailwind.config.ts`
- **Database**: `drizzle.config.ts`, `supabase/config.toml`
- **TypeScript**: `tsconfig.json` with path aliases

### Database & Migrations
- **supabase/migrations/**: SQL migration files
- **supabase/functions/**: Edge functions
- **packages/database/**: Drizzle schemas and configurations

### Internationalization
- **apps/web/src/i18n/**: i18n configuration and utilities
- **apps/web/src/i18n/locales/**: Translation files (en, ar, fr, es)

### Testing
- **__tests__/**: Global test files and configurations
- **apps/web/__tests__/**: Application-specific tests
- **jest.config.cjs**: Jest configuration

## Naming Conventions

### Files & Directories
- **kebab-case**: For file and directory names
- **PascalCase**: For React components
- **camelCase**: For functions and variables
- **UPPER_CASE**: For constants and environment variables

### Import Aliases
```typescript
@/*                    # apps/web/src/*
@/core/*              # apps/web/src/_core/*
@/infrastructure/*    # apps/web/src/_infrastructure/*
@/shared/*            # apps/web/src/_shared/*
@/ui/*                # apps/web/src/components/ui/*
@/hooks/*             # apps/web/src/hooks/*
@/lib/*               # apps/web/src/lib/*
@/types/*             # apps/web/src/types/*
```

## Domain Boundaries
Following DDD principles, domains are clearly separated:

- **Authentication**: User management, sessions, permissions
- **Immigration**: Cases, applications, status tracking
- **Documents**: Upload, processing, verification
- **Chat**: Messaging, AI assistance, real-time communication
- **Research**: Data analysis, web scraping, knowledge extraction

## Component Organization
Components follow Atomic Design methodology:
- **Atoms**: Basic UI elements (Button, Input)
- **Molecules**: Component combinations (FormField, SearchBox)
- **Organisms**: Complex sections (Navigation, DataTable)
- **Templates**: Page layouts and structures

## Migration Strategy
The project is actively migrating to DDD architecture:
- Legacy components in `components/` being moved to domain-specific locations
- New development should follow the `_core/`, `_infrastructure/`, `_shared/` structure
- Use migration scripts in `scripts/` directory for component reorganization

## Modern Development Patterns

### Next.js 15 App Router Patterns
- **Server Components**: Default for data fetching and static content
- **Client Components**: Use `'use client'` directive only when needed
- **Async Components**: Always await `params` and `searchParams`
- **Streaming**: Implement with `<Suspense>` for better UX
- **Server Actions**: Handle forms and mutations server-side

### Supabase Integration Patterns
- **Server-Side Auth**: Use middleware for session management
- **Client-Side Auth**: Minimal client auth for interactive features
- **Database Access**: Leverage RLS policies for security
- **Real-time**: Implement subscriptions for live updates

### Turborepo Monorepo Structure
- **Task Configuration**: Define in `turbo.json` with proper dependencies
- **Package Isolation**: Each package has its own build configuration
- **Shared Dependencies**: Use workspace protocol for internal packages
- **Caching Strategy**: Optimize with proper `inputs` and `outputs`

### Tailwind CSS v4 Organization
- **Theme Configuration**: Use `@theme` directive in main CSS file
- **Component Styles**: Leverage `@utility` for custom utilities
- **Design Tokens**: Define CSS custom properties for consistency
- **Performance**: Utilize built-in optimizations and tree-shaking