# Hijraah Architecture

This application follows a Domain-Driven Design (DDD) architecture with clear separation of concerns.

## Directory Structure

```
src/
  domain/             # Core business logic and entities
    auth/             # Authentication domain
    chat/             # Chat/messaging domain
    documents/        # Document management domain
    immigration/      # Immigration-specific domain

  application/        # Application services and orchestration
    stores/           # State management (Zustand stores)
    services/         # Application services
    commands/         # Command handlers
    queries/          # Query handlers

  infrastructure/     # Technical implementations and external services
    api/              # API clients and endpoints
    supabase/         # Supabase integration
    ai/               # AI service integrations
    i18n/             # Internationalization
    storage/          # Storage solutions

  presentation/       # UI components and hooks
    components/       # React components
      ui/             # UI component library
        atoms/        # Basic UI elements
        molecules/    # Combinations of atoms
        organisms/    # Complex UI sections
        templates/    # Page layouts
    hooks/            # React hooks
    pages/            # Next.js pages (if not using app directory)
    layouts/          # Layout components

  shared/             # Shared utilities and configuration
    utils/            # Utility functions
    lib/              # Libraries and wrappers
    config/           # Configuration
    types/            # TypeScript type definitions
```

## Layer Responsibilities

### Domain Layer

- Contains pure business logic
- Defines entities, value objects, and domain services
- Has no dependencies on other layers
- Expresses the ubiquitous language of the business

### Application Layer

- Orchestrates the execution of business logic
- Manages state of the application
- Coordinates interactions between different domains
- Implements application-specific use cases

### Infrastructure Layer

- Provides technical capabilities to support the application
- Integrates with external services (Supabase, AI services, etc.)
- Implements persistence, messaging, and other technical concerns
- Adapts external interfaces to domain interfaces

### Presentation Layer

- Renders the user interface
- Handles user interactions
- Consumes application services
- Implements UI-specific logic without business rules

### Shared Layer

- Contains utilities and configuration used across all layers
- Defines cross-cutting concerns
- Provides technical helpers not tied to specific domains

## Design Principles

1. **Dependency Rule**: Dependencies always point inward. Domain doesn't depend on any layer, application depends on domain, infrastructure and presentation depend on application and domain.

2. **Separation of Concerns**: Each layer has its own responsibility and doesn't interfere with others.

3. **Domain-Centricity**: The domain layer is the heart of the application, containing the core business logic.

4. **Component Isolation**: UI components follow atomic design principles for better reusability and composition.

5. **Type Safety**: Comprehensive TypeScript types ensure correctness across the application.
