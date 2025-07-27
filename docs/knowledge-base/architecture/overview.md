# Hijraah Architecture Overview

This document provides a comprehensive overview of the Hijraah immigration platform architecture.

## System Architecture

Hijraah is built as a modern web application with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       Client (Browser)                      │
│                    Next.js + React + RSC                    │
│                                                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                           │                                 │
│    ┌─────────────────┐    │    ┌───────────────────────┐    │
│    │  React Server   │    │    │    Client-side        │    │
│    │  Components     │◄───┼───►│    Components         │    │
│    └─────────────────┘    │    └───────────────────────┘    │
│                           │                                 │
│    ┌─────────────────┐    │    ┌───────────────────────┐    │
│    │  Server Actions │    │    │    Client Hooks       │    │
│    └─────────────────┘    │    └───────────────────────┘    │
│                           │                                 │
│                       Next.js App Router                    │
│                                                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                           │                                 │
│    ┌─────────────────┐    │    ┌───────────────────────┐    │
│    │  Next.js API    │    │    │    Hono.js API        │    │
│    │  Routes         │◄───┼───►│    Routes             │    │
│    └─────────────────┘    │    └───────────────────────┘    │
│                           │                                 │
│                       API Layer                             │
│                                                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                           │                                 │
│    ┌─────────────────┐    │    ┌───────────────────────┐    │
│    │  Supabase       │    │    │    External APIs      │    │
│    │  Database       │◄───┼───►│    & Services         │    │
│    └─────────────────┘    │    └───────────────────────┘    │
│                           │                                 │
│    ┌─────────────────┐    │    ┌───────────────────────┐    │
│    │  Upstash Redis  │    │    │    Vector Database    │    │
│    │  Cache          │◄───┼───►│    (pgvector)         │    │
│    └─────────────────┘    │    └───────────────────────┘    │
│                           │                                 │
│                      Data Layer                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with TypeScript
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 4.0 with Shadcn UI
- **State Management**: Zustand for global state, React Query for server state
- **Form Management**: React Hook Form with Zod validation
- **Internationalization**: next-intl for multiple language support
- **Charts & Visualization**: Recharts for data visualization

### Backend

- **API Framework**: Hono.js for high-performance API routes
- **Server-side**: Next.js Server Components and API Routes
- **Authentication**: Supabase Auth with JWT tokens
- **Database**: PostgreSQL (via Supabase)
- **Cache**: Upstash Redis for distributed caching
- **Rate Limiting**: Upstash Ratelimit for subscription-based limits
- **File Storage**: Supabase Storage

### AI & Data Processing

- **AI Models**: Vercel AI SDK with OpenAI and Anthropic integration
- **Vector Database**: pgvector for semantic search
- **Document Processing**: PDF-lib and tesseract.js for OCR
- **Web Scraping**: Custom implementation based on Firecrawl with Puppeteer

### DevOps & Infrastructure

- **Deployment**: Vercel for frontend, Supabase for backend services
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry for error tracking
- **Analytics**: Vercel Analytics
- **Performance**: Vercel Speed Insights

## Core Application Components

### 1. Authentication System

- Supabase Auth with email/password, social login, and MFA
- Custom session management with JWT tokens
- Role-based access control for different user types

### 2. Document Management

- Secure document upload and storage
- Automatic document classification
- OCR processing for text extraction
- Version control for document updates

### 3. Immigration Research

- AI-powered research assistant
- Semantic search for immigration topics
- Language translation for multilingual support
- Citation management for information sources

### 4. Process Tracking

- Application status tracking
- Timeline visualization
- Notification system for status updates
- Calendar integration for deadlines

### 5. Community Features

- Forum for community questions
- Expert verification system
- Knowledge sharing platform
- Reputation system

### 6. API & Integration

- RESTful API with Hono.js
- GraphQL API with Yoga
- Webhook support for external integrations
- Service connectors for immigration systems

## Data Flow Architecture

1. **User Requests**: Client-side requests are handled by Next.js App Router
2. **Authentication**: Requests are authenticated via Supabase Auth
3. **Server Processing**: Server Components handle data fetching and processing
4. **API Layer**: Complex operations are delegated to Hono API routes
5. **Database Operations**: Data is stored and retrieved from Supabase
6. **Caching Layer**: Frequently accessed data is cached in Upstash Redis
7. **Response**: Data is returned to client in the most optimized format

## Security Architecture

- **Authentication**: JWT-based with short expiration and refresh tokens
- **Authorization**: Row-level security policies in Supabase
- **Data Encryption**: Encryption at rest for sensitive data
- **Input Validation**: Strict validation with Zod schemas
- **Output Sanitization**: Prevention of XSS and injection attacks
- **Rate Limiting**: IP-based and user-based rate limiting
- **Audit Logging**: Comprehensive logging of security events
- **Compliance**: GDPR compliance with data minimization

## Scalability Considerations

- Serverless architecture for automatic scaling
- Edge functions for global performance
- Distributed caching for reduced database load
- Database connection pooling
- Query optimization with proper indexing
- Content delivery network for static assets
- Incremental Static Regeneration for frequently accessed pages
- Horizontal scaling with stateless components

## Performance Optimization

- React Server Components for reduced client bundle
- Edge caching for API responses
- Image optimization with Next.js Image
- CSS optimization with Tailwind
- Code splitting and lazy loading
- Prefetching for anticipated user actions
- Database query optimization
- Resource compression and minification

## Monitoring & Observability

- Error tracking with Sentry
- Performance monitoring with Vercel Speed Insights
- Custom logging infrastructure
- User behavior analytics
- API usage metrics
- System health checks
- Real-time alerting

## Disaster Recovery & Backup

- Regular database backups
- Point-in-time recovery
- Multi-region redundancy
- Failover mechanisms
- Data export capabilities
- Backup validation procedures
- Recovery testing protocols

## Development Workflow

- Feature branch workflow
- Pull request reviews
- Automated testing
- Code quality checks
- Dependency management
- Documentation generation
- Semantic versioning
- Deployment automation

## Reference Architecture Diagram

For a detailed view of the system interactions, refer to `docs/architecture-diagrams/detailed-system.png`.
