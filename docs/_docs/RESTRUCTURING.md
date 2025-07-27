# Next.js 15 Restructuring Plan

This document outlines the restructuring of the Hijraah project according to Next.js 15 best practices while maintaining the Domain-Driven Design architecture.

## New Directory Structure

```
src/
├── app/                   # Next.js App Router (routes, layouts, pages)
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (authenticated)/   # Protected routes
│   ├── [locale]/          # Localized routes
│   ├── api/               # API routes
│   ├── _components/       # Page-specific components
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Provider components
│   └── ...                # Other route files
│
├── _core/                 # Core business domain (DDD core)
│   ├── auth/              # Authentication domain
│   │   ├── entities/      # Domain entities
│   │   ├── repositories/  # Data access
│   │   ├── services/      # Domain services
│   │   └── types/         # Domain-specific types
│   ├── chat/              # Chat domain
│   ├── documents/         # Document domain
│   └── immigration/       # Immigration domain
│
├── _application/          # Application services layer
│   ├── stores/            # State management (Zustand)
│   ├── services/          # Application services
│   ├── commands/          # Command handlers
│   └── queries/           # Query handlers
│
├── _infrastructure/       # External integrations
│   ├── api/               # API clients
│   ├── supabase/          # Supabase integration
│   ├── ai/                # AI service integrations
│   ├── i18n/              # Internationalization
│   └── storage/           # Storage solutions
│
├── _shared/               # Shared utilities and components
│   ├── ui/                # UI component library
│   │   ├── atoms/         # Basic UI elements
│   │   ├── molecules/     # Combinations of atoms
│   │   ├── organisms/     # Complex UI sections
│   │   └── templates/     # Page layouts
│   ├── lib/               # Libraries and wrappers
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── api/               # API utilities
│   ├── config/            # Configuration
│   └── types/             # Shared TypeScript types
│
└── globals.css            # Global styles
```

## Migration Strategy

1. Move files systematically by domain rather than all at once
2. Update imports as files are moved
3. Test functionality after each major move
4. Update documentation to reflect the new structure

## Benefits of This Structure

1. Follows Next.js 15 best practices for App Router
2. Maintains Domain-Driven Design principles
3. Improves separation of concerns
4. Enhances developer experience and code navigation
5. Better supports internationalization
6. More maintainable and scalable architecture

## Migration Progress

- [x] Create directory structure
- [ ] Move domain entities
- [ ] Move application services
- [ ] Move infrastructure components
- [ ] Move UI components
- [ ] Update imports and references
- [ ] Test functionality
- [ ] Update documentation
