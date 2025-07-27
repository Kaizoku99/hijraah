# Hijraah Architecture Documentation

## Authentication (Supabase)

- Supabase Auth is used for authentication and user management
- Authentication is configured in `lib/supabase/client.ts`
- The middleware in `middleware.ts` handles protected routes and authentication checks
- Supabase client is initialized in `lib/client.ts`
- User sessions and authentication state are managed through Supabase hooks

### Key Authentication Files

- `middleware.ts`: Handles route protection and authentication middleware
- `lib/supabase/client.ts`: Configures Supabase client with authentication
- `components/Navigation.tsx`: Manages auth state in the UI
- `lib/client.ts`: Sets up Supabase client initialization

## Database (Supabase)

- Supabase PostgreSQL database is used for data storage
- Database schema and types are managed through Prisma
- Database operations are handled through the Supabase client
- Real-time subscriptions are available for live updates

### Key Database Files

- `prisma/schema.prisma`: Defines database schema
- `lib/prisma.ts`: Configures Prisma client
- `lib/supabase.ts`: Sets up Supabase database connection

## AI Integration

- Multiple AI providers are supported through a unified interface
- AI agents are implemented in `lib/immigration-agents.ts`
- Chat functionality is handled in `components/Chat.tsx`
- Rate limiting is implemented in `lib/rate-limiter.ts`

### Key AI Files

- `lib/immigration-agents.ts`: Defines AI agent types and behaviors
- `lib/chat-tools.ts`: Implements chat-related tools and utilities
- `lib/agent-controller.ts`: Manages AI agent orchestration
- `lib/rag.ts`: Implements retrieval-augmented generation

## Application Structure

- Next.js 14 app directory structure
- Server and client components are clearly separated
- TypeScript is used throughout the application
- Error boundaries handle component-level errors

### Important Files

- `app/layout.tsx`: Root layout with providers and metadata
- `app/page.tsx`: Main landing page
- `components/Chat.tsx`: Main chat interface
- `components/Navigation.tsx`: Site navigation
- `lib/utils.ts`: Shared utility functions

## Frontend Architecture

- React with Next.js 14
- Tailwind CSS for styling
- shadcn/ui components
- NextUI components
- Responsive design implementation

### UI Components

- Reusable components in `components/ui/`
- Layout components for page structure
- Form components for user input
- Chat interface components

## Backend Architecture

- Next.js API routes
- Supabase Functions for serverless operations
- Rate limiting implementation
- Error handling middleware

### API Structure

- RESTful endpoints
- WebSocket support for real-time features
- Rate limiting on sensitive endpoints
- Error handling and logging

## Security Features

- Authentication middleware
- CORS configuration
- Rate limiting
- Security headers
- Input validation

### Security Implementation

- Protected routes in middleware
- Content Security Policy
- XSS protection
- CSRF protection
- API rate limiting

## Error Handling

- Global error boundary
- Structured error responses
- Logging system
- Toast notifications

### Error Management Files

- `components/ErrorBoundary.tsx`: Global error boundary
- `lib/chat-error-handler.ts`: Chat-specific error handling
- `lib/logger.ts`: Logging implementation

## Performance Optimization

- Image optimization
- Code splitting
- Dynamic imports
- Caching strategies

### Performance Features

- Next.js image optimization
- Dynamic component loading
- Cache-Control headers
- Service Worker implementation

## Environment Configuration

- Environment variables management
- Development/production configurations
- API keys and secrets handling

### Configuration Files

- `.env.example`: Example environment variables
- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind configuration
- `tsconfig.json`: TypeScript configuration

## Monitoring and Analytics

- Vercel Analytics integration
- Error tracking
- Performance monitoring
- User analytics

### Analytics Implementation

- Vercel Analytics setup
- Custom event tracking
- Performance metrics
- Error reporting

## Deployment

- Vercel deployment configuration
- Environment variable setup
- Build optimization
- CI/CD pipeline

### Deployment Configuration

- Production environment setup
- Build process optimization
- Deployment scripts
- Monitoring setup

## Key Patterns and Best Practices

1. Server Components: Used for static and data-fetching components
2. Client Components: Used for interactive features
3. Type Safety: TypeScript throughout the application
4. Error Boundaries: Graceful error handling
5. Progressive Enhancement: Core functionality without JavaScript
6. Responsive Design: Mobile-first approach
7. Accessibility: WCAG compliance
8. SEO: Meta tags and structured data

## Testing Strategy

- Unit testing setup
- Integration testing
- E2E testing configuration
- Test utilities and helpers

## Documentation

- Code documentation
- API documentation
- Component documentation
- Development guides
