# Hijraah Development Guide

This guide provides comprehensive instructions for setting up and developing for the Hijraah immigration platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Git**: For version control
- **VS Code** (recommended): With the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Error Translator

## Initial Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/hijraah.git
cd hijraah
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```
# Base
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Upstash Redis (for caching and rate limiting)
UPSTASH_REDIS_REST_URL=your-upstash-redis-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-rest-token

# AI Providers (optional for AI features)
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

4. **Set up Supabase locally** (optional but recommended)

```bash
npm run supabase:install-deps
npm run supabase:init
npm run supabase:start
npm run supabase:setup
```

5. **Start the development server**

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Project Structure

```
/
├── app/                  # Next.js App Router structure
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes 
│   ├── api/              # API routes
│   └── [...]/            # Other routes
├── components/           # Shared UI components
│   ├── ui/               # Base UI components
│   └── [...]/            # Feature-specific components
├── lib/                  # Shared utilities and services
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── supabase/             # Supabase configuration
│   ├── migrations/       # Database migrations
│   └── functions/        # Edge functions
├── public/               # Static assets
└── scripts/              # Development and build scripts
```

## Code Conventions

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces and types for component props
- Avoid using `any` type - use `unknown` when type is uncertain
- Use explicit return types for functions

### React & Next.js

- Use React Server Components by default
- Add `'use client'` directive only for components that need client-side interactivity
- Use Next.js App Router patterns for routing
- Implement proper error and loading states using Next.js conventions

### Styling

- Use Tailwind CSS for styling
- Follow the design system defined in `tailwind.config.ts`
- Use the `cn()` utility from `@/lib/utils` for conditional class names
- Use Shadcn UI components and follow their patterns

### API Development

- Use Hono.js for complex API routes
- Implement proper validation with Zod
- Follow RESTful principles for API endpoints
- Use proper error handling and return appropriate status codes

## Working with Supabase

### Database

- Run migrations to set up the database schema:

```bash
npm run supabase:db:push
```

- Generate TypeScript types from the database schema:

```bash
npm run supabase:types
```

### Authentication

The project uses Supabase Auth for authentication. Key hooks and utilities:

- `useUser()`: Hook to access the current user
- `@/lib/auth`: Utilities for authentication operations

### Data Access

- Use the Supabase client from `@/lib/supabase` for database operations
- Implement proper Row Level Security (RLS) policies for data access

## Internationalization (i18n)

The project supports multiple languages using next-intl:

- Translation files are stored in `/messages` directory
- Use the `useTranslations` hook for accessing translations
- Follow the i18n configuration in `next-intl.config.ts`

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run API tests
npm run test:api

# Run with watch mode
npm run test:watch
```

### Writing Tests

- Place test files adjacent to the components/functions they test
- Use Jest for unit and integration tests
- Follow the test utilities in `@/lib/test-utils`

## Development Workflow

1. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Implement your changes with TDD approach**

3. **Run linting and tests**

```bash
npm run lint
npm run test
```

4. **Commit your changes**

Follow conventional commit format:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update build scripts
```

5. **Submit a pull request**

## AI Integration

For AI features:

- Use the Vercel AI SDK for integrating AI capabilities
- Follow the patterns in `@/lib/ai` for creating AI-powered features
- Use proper prompt engineering as defined in AI guidelines

## Deployment

### Staging Deployment

Changes to the `develop` branch are automatically deployed to the staging environment.

### Production Deployment

Changes to the `main` branch are automatically deployed to production after review.

## Common Issues & Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

```bash
npm run supabase:db:reset
```

### Type Errors

Update TypeScript types from Supabase:

```bash
npm run supabase:types
```

### Environment Variables

If features aren't working properly, verify that all required environment variables are set correctly in your `.env.local` file.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Hono.js Documentation](https://hono.dev)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Getting Help

If you encounter issues not covered in this guide:

1. Check the existing issues in the repository
2. Ask in the developer Slack channel
3. Create a new issue with detailed information about your problem

Welcome to the Hijraah development team! 