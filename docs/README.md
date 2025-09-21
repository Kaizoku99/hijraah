# Hijraah Immigration Platform

Modern immigration processing and management platform built with Next.js, Supabase, and Shadcn UI.

## Key Features

- **User Authentication**: Secure login/registration using Supabase Auth
- **Profile Management**: Complete user profile management for immigration applications
- **Document Management**: Secure document upload, storage, and verification
- **Case Tracking**: Real-time tracking of immigration applications and statuses
- **AI Assistance**: AI-powered guidance and support throughout the immigration process
- **Onboarding Experience**: Guided user onboarding with customized steps

## Onboarding System

The platform includes a comprehensive onboarding system designed to guide new users through the following steps:

1. **Welcome**: Introduction to the platform
2. **Profile Setup**: Collecting essential user information and immigration preferences
3. **Feature Tour**: Showcasing key platform features
4. **First Task**: Guiding users to create their first immigration case or upload documents
5. **Resources**: Providing access to helpful immigration resources and guides

### Onboarding Architecture

- **Database Trigger**: Automatically creates onboarding records for new users upon signup
- **API Endpoints**: Manages onboarding state and user progress
- **React Components**: Renders appropriate onboarding UI based on user state
- **Authentication Integration**: Initializes onboarding when users sign in

## Technical Architecture

- **Frontend**: Next.js 15 with TypeScript, React Server Components
- **UI**: Shadcn UI components with Tailwind CSS
- **Backend**: Supabase with PostgreSQL
- **Authentication**: Supabase Auth
- **API**: Next.js API routes with Supabase client
- **Storage**: Supabase Storage for documents and files
- **AI**: Integration with OpenAI and custom models

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npx supabase migration up`
5. Start the development server: `npm run dev`

## Database Setup

The platform requires the following tables:

- `auth.users`: Provided by Supabase Auth
- `user_profiles`: User profile information
- `user_onboarding`: Tracks onboarding progress
- `cases`: Immigration cases
- `documents`: User documents
- `admin_users`: Administrative user access

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting pull requests.

## Advanced Platform Features

This platform implements several enterprise-grade features:

### 1. Distributed Caching with Upstash Redis

The API uses Upstash Redis for serverless-optimized distributed caching, enabling consistent cache across multiple serverless instances:

- **Key Features**:
  - Upstash Redis for REST-based serverless caching
  - Optimized for edge functions and serverless environments
  - Configurable TTLs for different endpoints
  - Cache invalidation by pattern matching
  - Cache statistics and monitoring
  - Support for personalized (user-specific) caching

### 2. Centralized Error Logging with Sentry

All errors are captured, structured, and sent to Sentry for centralized tracking and analysis:

- **Key Features**:
  - Structured error logging
  - Request ID tracking across the system
  - Performance transaction tracking
  - Environment-aware error details (detailed in dev, sanitized in prod)
  - Integration with front-end for consistent error reporting

### 3. Auto-Scaling Based on Performance Metrics

The platform implements automatic scaling based on various performance metrics:

- **Key Features**:
  - Real-time performance monitoring
  - Configurable scaling thresholds
  - Support for different cloud providers (AWS, Azure, GCP, Vercel)
  - Cooldown periods to prevent scaling thrashing
  - Adaptive scaling based on multiple metrics (response time, request rate, memory usage)

### 4. Subscription-Based Rate Limiting

Implements a subscription tier system with different rate limits per tier, powered by Upstash Ratelimit:

- **Key Features**:
  - Multiple subscription tiers (Free, Basic, Professional, Enterprise)
  - Resource-specific rate limits (API, Scraping, Vector Search, Research)
  - Multiple time window limits (minute, hour, day)
  - Upstash Redis-based serverless-optimized rate limiting
  - Usage tracking and reporting

## Architecture

The platform is built with:

- **Frontend**: Next.js 15 with React and TypeScript
- **UI**: Tailwind CSS and Shadcn UI components
- **API**: Hono.js for high-performance API endpoints
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Caching**: Upstash Redis (serverless, REST-based)
- **Rate Limiting**: Upstash Ratelimit
- **Vector Search**: pgvector for semantic search
- **Web Scraping**: Custom scraper based on Firecrawl
- **Deployment**: Vercel for frontend, Supabase Functions for serverless

## Setup Instructions

### Prerequisites

- Node.js 18+
- Upstash Redis account
- Supabase account
- Sentry account (optional for error logging)

### Development Environment Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/hijraah.git
   cd hijraah
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env.local` and fill in the required values:

   ```bash
   cp .env.example .env.local
   ```

4. **Create Upstash Redis instance**:

   - Create an account at [upstash.com](https://upstash.com)
   - Create a new Redis database
   - Copy the REST URL and REST token to your environment variables

5. **Start the development server**:
   ```bash
   npm run dev
   ```

### Required Environment Variables

```
# Base
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-upstash-redis-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-rest-token

# Sentry
SENTRY_DSN=your-sentry-dsn
SENTRY_RELEASE=dev

# Auto-scaling
AUTO_SCALING_ENABLED=false
AUTO_SCALING_PROVIDER=vercel
```

## API Documentation

The API documentation is available at `/api-docs` when running the server.

## Middleware Documentation

### Upstash Redis Cache Middleware

```typescript
import { redisCacheMiddleware } from "../middleware/redis-cache";

// Basic usage with default TTL (5 minutes)
app.get("/api/data", redisCacheMiddleware(), handler);

// With custom TTL
app.get(
  "/api/frequently-updated",
  redisCacheMiddleware({ ttl: 60 }), // 1 minute cache
  handler,
);

// With custom key generation
app.get(
  "/api/user-data",
  redisCacheMiddleware({
    key: (c) => `user-data:${c.get("user")?.id}`,
  }),
  handler,
);
```

### Upstash Subscription Rate Limit Middleware

```typescript
import {
  subscriptionRateLimit,
  ResourceType,
} from "../middleware/subscription-rate-limit";

// Basic usage with default resource type (API)
app.get("/api/data", subscriptionRateLimit(), handler);

// With specific resource type
app.get(
  "/api/research/sessions",
  subscriptionRateLimit({ resourceType: ResourceType.RESEARCH }),
  handler,
);
```

### Sentry Error Logger Middleware

```typescript
import { sentryErrorLoggerMiddleware } from "../middleware/sentry-error-logger";

// Basic usage
app.use("*", sentryErrorLoggerMiddleware());

// With component tagging
app.use(
  "/api/research/*",
  sentryErrorLoggerMiddleware({ component: "research" }),
);
```

## User-Facing Components

### Subscription Plans Component

The `SubscriptionPlans` component displays available subscription tiers and allows users to upgrade/downgrade:

```tsx
import { SubscriptionPlans } from "@/components/SubscriptionPlans";

export default function SettingsPage() {
  return (
    <div>
      <h1>Account Settings</h1>
      <SubscriptionPlans />
    </div>
  );
}
```

### API Usage Component

The `CurrentUsage` component displays the user's current API usage against their limits:

```tsx
import { CurrentUsage } from "@/components/SubscriptionPlans";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <CurrentUsage />
    </div>
  );
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Architecture

This project is being migrated to a Domain-Driven Design (DDD) architecture for better maintainability and scalability. See [ARCHITECTURE.md](src/ARCHITECTURE.md) for details on the new structure.

### Migration Status

We are currently in the process of migrating components and features to the new architecture. See [MIGRATION-STRATEGY.md](src/MIGRATION-STRATEGY.md) for the approach we're taking.

### Component Migration

Components are being organized following the Atomic Design methodology:

- **Atoms**: Basic UI elements (Button, Input, etc.)
- **Molecules**: Combinations of atoms (Form fields, etc.)
- **Organisms**: Complex UI sections (Navigation bars, etc.)
- **Templates**: Page layouts and structures

To help with component migration, use the provided script:

```bash
node scripts/migrate-component.js --component=ComponentName --type=atom
```

### New Development

For new development:

1. Place components in the appropriate atomic design category
2. Follow the domain boundaries defined in the architecture
3. Implement proper testing and documentation
