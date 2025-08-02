# Technology Stack & Build System

## Core Technologies

- **Framework**: Next.js 15 with React 18 and TypeScript
  - App Router with Server Components and Server Actions
  - Async params/searchParams (Promise-based in v15)
  - Streaming with React Suspense
  - Enhanced caching strategies with `fetch()` API
- **Build System**: Turbo (Turborepo) monorepo with pnpm package manager
  - Task orchestration with intelligent caching
  - Parallel execution with dependency management
  - Remote caching for team collaboration
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
  - Server-side rendering with `@supabase/ssr`
  - Cookie-based session management
  - Real-time subscriptions and presence
- **Authentication**: Supabase Auth
  - Middleware-based session refresh
  - Server Actions for login/signup
  - Row Level Security (RLS) policies
- **UI Framework**: Shadcn UI components with Tailwind CSS v4
  - CSS-first configuration with `@theme` directive
  - Modern CSS features (cascade layers, color-mix, @property)
  - Built-in import support and PostCSS integration
- **State Management**: Zustand for client state, React Query for server state

## Architecture Pattern

- **Domain-Driven Design (DDD)**: Organized into core domains (auth, chat, documents, immigration)
- **Monorepo Structure**: Apps and packages separation with shared libraries
- **Clean Architecture**: Infrastructure, application, and domain layers

## Key Libraries & Services

### AI & Machine Learning

- **AI Providers**: OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude-3.5-Sonnet, Claude-3-Haiku), Google AI (Gemini-1.5-Pro/Flash), Mistral, DeepSeek, Fireworks
- **AI Orchestration**: Vercel AI SDK v5 for unified LLM interactions and multi-agent systems
- **Model Management**: Custom ModelMultiplexer with failover and rate limiting
- **Multi-Agent System**: AI SDK v5 with orchestrator-worker, parallel processing, and evaluator-optimizer patterns
- **Agent Monitoring**: Built-in step tracking and performance monitoring with Sentry integration

### Data & Search

- **Vector Search**: Pinecone with pgvector for semantic search
- **Knowledge Graph**: Custom graph construction with entity extraction
- **Document Processing**: PDF parsing, OCR with Tesseract.js, multimodal analysis
- **Web Scraping**: Firecrawl for data acquisition and policy monitoring

### Infrastructure & Performance

- **Caching**: Upstash Redis for distributed caching
- **Model Multiplexing**: @upstash/model-multiplexer for AI provider failover
- **Rate Limiting**: Upstash Ratelimit with subscription-based tiers
- **Task Orchestration**: Trigger.dev v4 for background jobs and workflows
- **Monitoring**: Sentry for error tracking and performance monitoring
- **Real-time**: Supabase Realtime for live updates and presence

### Development & Deployment

- **Internationalization**: next-intl with support for en, ar, fr, es
- **Email**: React Email components with Resend
- **Analytics**: Vercel Analytics and Speed Insights
- **Payments**: Stripe integration for subscriptions

## Development Commands

### Primary Commands

```bash
# Development
pnpm dev                    # Start development server (uses Turborepo)
pnpm dev:local             # Start with local environment
pnpm dev:debug             # Start with Node.js debugging
turbo dev                   # Run dev tasks across all packages
turbo watch dev lint        # Watch mode for continuous development

# Building & Testing
pnpm build                 # Build all packages (Turborepo orchestrated)
pnpm build:analyze         # Build with bundle analysis
turbo build                 # Parallel builds with caching
turbo build --filter=web    # Build specific package
pnpm test                  # Run all tests
pnpm test:coverage         # Run tests with coverage
turbo test                  # Parallel test execution

# Code Quality
pnpm lint                  # Lint all packages
pnpm lint:fix              # Auto-fix linting issues
turbo lint                  # Parallel linting with caching
pnpm type-check            # TypeScript type checking
turbo type-check           # Parallel type checking

# Database Operations
pnpm db:push               # Push schema changes
pnpm db:migrate            # Run migrations
pnpm db:studio             # Open database studio

# Supabase Operations
pnpm supabase:start        # Start local Supabase
pnpm supabase:stop         # Stop local Supabase
pnpm supabase:types        # Generate TypeScript types

# Turborepo Specific
turbo prune <app>          # Create pruned workspace for Docker
turbo link                 # Connect to remote cache
turbo clean                # Clean build artifacts
```

### Specialized Commands

```bash
# Internationalization
pnpm i18n:extract          # Extract translation keys
pnpm i18n:sync             # Sync translations
pnpm i18n:translate        # Auto-translate missing keys
pnpm i18n:stats            # Translation statistics

# Code Generation
pnpm codegen               # Generate GraphQL types
pnpm supabase:types        # Generate Supabase types

# AI SDK v5 Development
pnpm ai:test               # Test AI agent workflows
pnpm ai:debug              # Debug agent execution with detailed logging
pnpm ai:monitor            # Monitor agent performance and token usage

# Maintenance
pnpm clean                 # Clean build artifacts
pnpm clean-install         # Fresh install
pnpm update-deps           # Update dependencies
```

## Package Structure

- **apps/web**: Main Next.js application
- **packages/hijraah-ai**: AI/ML functionality and model management
- **packages/hijraah-chat**: Chat system components and real-time messaging
- **packages/hijraah-data-acquisition**: Web scraping and data collection with Trigger.dev
- **packages/hijraah-documents**: Document processing and OCR capabilities
- **packages/hijraah-mas**: Multi-Agent System (TypeScript) with AI SDK v5 framework
- **packages/hijraah-rag**: Retrieval-Augmented Generation system
- **packages/hijraah-ui**: Shared UI components and design system
- **packages/hijraah-utils**: Utility functions and helpers
- **packages/hijraah-workflows**: Business process workflows
- **packages/database**: Database schemas and migrations with Drizzle
- **packages/types**: Shared TypeScript type definitions

## Environment Configuration

- **Development**: `.env.local` for local development
- **Production**: Environment variables via Vercel/deployment platform
- **Required**: Supabase, OpenAI, Upstash Redis, Sentry configurations

### Key Environment Variables

```bash
# AI Providers
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_API_KEY=
MISTRAL_API_KEY=
DEEPSEEK_API_KEY=
FIREWORKS_API_KEY=

# Infrastructure
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TRIGGER_SECRET_KEY=

# AI SDK v5 Configuration
AI_SDK_TELEMETRY_DISABLED=false
AI_SDK_LOG_LEVEL=info

# Database & Auth
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```

## Code Quality Tools

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Jest**: Unit and integration testing
- **TypeScript**: Strict type checking enabled

## Development Tools & MCP Servers

### Shadcn-UI MCP Server (MANDATORY for UI Development)

**General Rule**: When a task requires building or modifying a user interface, you MUST use the tools available in the shadcn-ui MCP server.

**Planning Rule**: When planning a UI build using shadcn:

1. **Discover Assets**: First, use `list_components()` and `list_blocks()` to see all available assets in the MCP server
2. **Map Request to Assets**: Analyze the user's request and map the required UI elements to the available components and blocks
3. **Prioritize Blocks**: You should prioritize using blocks (`get_block`) wherever possible for common, complex UI patterns (e.g., login pages, calendars, dashboards). Blocks provide more structure and accelerate development. Use individual components (`get_component`) for smaller, more specific needs.

**Implementation Rule**: When implementing the UI:

1. **Get a Demo First**: Before using a component, you MUST call the `get_component_demo(component_name)` tool. This is critical for understanding how the component is used, its required props, and its structure.
2. **Retrieve the Code**:
   - For a single component, call `get_component(component_name)`
   - For a composite block, call `get_block(block_name)`
3. **Implement Correctly**: Integrate the retrieved code into the application, customizing it with the necessary props and logic to fulfill the user's request.

### Context7 Documentation Server (MANDATORY for Latest Documentation)

**General Rule**: When you need the latest documentation for any technology in the stack, you MUST use Context7 to get up-to-date information.

**Usage Pattern**:

1. **Resolve Library**: Use `resolve-library-id` to find the correct Context7-compatible library ID
2. **Get Documentation**: Use `get-library-docs` with specific topics to retrieve focused, current documentation
3. **Apply Latest Patterns**: Always prioritize Context7 documentation over potentially outdated knowledge

**Supported Technologies**: Next.js, Supabase, Tailwind CSS, Turborepo, React, TypeScript, and many more in the stack.

## Latest Framework Features & Best Practices

### Next.js 15 Key Updates

- **Async Params**: `params` and `searchParams` are now Promises - always use `await`
- **Server Components**: Prefer server components for data fetching and static content
- **Server Actions**: Use for form handling and mutations
- **Middleware**: Essential for Supabase session management
- **Caching**: Leverage `fetch()` with `cache: 'no-store'` or `next: { revalidate: 10 }`

### Supabase SSR Best Practices

- **Always use `@supabase/ssr`** - not `auth-helpers-nextjs`
- **Server Client**: Use `createClient()` from `utils/supabase/server.ts`
- **Browser Client**: Use `createClient()` from `utils/supabase/client.ts`
- **Middleware**: Implement session refresh with `updateSession()`
- **Server Actions**: Handle auth with proper error handling and redirects

### Tailwind CSS v4 Features

- **CSS-First Config**: Use `@theme` directive in CSS instead of `tailwind.config.js`
- **Modern CSS**: Leverages cascade layers, color-mix(), and CSS custom properties
- **Built-in PostCSS**: No need for separate postcss-import or autoprefixer
- **Performance**: Faster builds with new Rust-based engine

### Turborepo Optimization

- **Task Dependencies**: Use `dependsOn: ["^build"]` for proper build order
- **Caching**: Define `outputs` for all build tasks
- **Parallel Execution**: Avoid unnecessary sequential dependencies
- **Remote Cache**: Enable team-wide build acceleration

### Multi-Agent System (MAS) Architecture

- **Framework**: Vercel AI SDK v5 for coordinated multi-agent workflows
- **Language**: TypeScript with native Next.js integration
- **Monitoring**: Built-in step tracking, performance monitoring, and Sentry integration
- **Specialized Teams**: Immigration, Document Processing, Policy Monitoring
- **Agent Tools**: Custom Supabase, vector search, and Hijraah-specific integrations
- **Orchestration**: Trigger.dev v4 for background agent task coordination

### AI Model Management

- **Model Multiplexer**: Custom failover system with @upstash/model-multiplexer
- **Provider Support**: OpenAI, Anthropic, Google AI, Mistral, DeepSeek, Fireworks
- **Rate Limiting**: Redis-based rate limiting per provider
- **Fallback Strategy**: Primary models → Fallback models → Error handling
- **Cost Optimization**: Intelligent routing based on request complexity

## Common Patterns & Anti-Patterns

### ✅ Recommended Patterns

```typescript
// Next.js 15 - Always await params
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // ...
}

// Supabase Server Component
import { createClient } from '@/utils/supabase/server'
export default async function ServerComponent() {
  const supabase = await createClient()
  const { data } = await supabase.from('table').select('*')
  // ...
}

// Turborepo task configuration
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}

// Model Multiplexer usage
import { ModelMultiplexer } from '@/lib/ai/model-multiplexer'
const multiplexer = new ModelMultiplexer()
const response = await multiplexer.createChatCompletion({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello" }]
})

// AI SDK v5 Multi-Agent System
import { generateObject, generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const orchestrator = new ImmigrationOrchestrator()
const result = await orchestrator.processCase(caseData)

// Shadcn-UI MCP Server workflow
// 1. First, discover available components
list_components()
list_blocks()

// 2. Get demo for understanding usage
get_component_demo("button")

// 3. Retrieve component code
get_component("button")

// 4. For complex UI patterns, prioritize blocks
get_block("login-01")  // Instead of building login from scratch

// Context7 Documentation workflow
// 1. Resolve library ID
resolve_library_id("Next.js")

// 2. Get focused documentation
get_library_docs("/vercel/next.js", {
  topic: "App Router, Server Components",
  tokens: 5000
})
```

### ❌ Anti-Patterns to Avoid

```typescript
// DON'T: Synchronous params access in Next.js 15
export default function Page({ params }) {
  const { id } = params // This will error
}

// DON'T: Use auth-helpers-nextjs (deprecated)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// DON'T: Missing task outputs in Turborepo
{
  "tasks": {
    "build": {} // No outputs defined - poor caching
  }
}

// DON'T: Tailwind config.js in v4 (use CSS @theme instead)
module.exports = {
  theme: {
    colors: { ... } // Use @theme directive in CSS
  }
}

// DON'T: Build UI components from scratch without checking shadcn-ui MCP
function CustomButton() {
  return <button className="...">Click me</button>
  // Should use get_component("button") first
}

// DON'T: Use outdated documentation or assume patterns
// Always use Context7 for latest docs
const outdatedPattern = "old Next.js patterns"

// DON'T: Skip component demos when using shadcn-ui
get_component("accordion") // Missing get_component_demo("accordion") first

// DON'T: Use deprecated multi-agent frameworks
// Use AI SDK v5 instead of Agno or other frameworks
const deprecatedAgentFramework = "agno or langgraph"
```
