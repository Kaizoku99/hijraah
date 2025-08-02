# Implementation Plan

- [x] 1. Source Control and Branch Management Setup

  - Create dedicated release branch and establish proper Git workflow
  - Set up branch protection and review processes for safe release management
  - _Requirements: 6.1, 6.2_
  - _Status: Git workflow already established with proper branching strategy_

- [x] 1.1 Install missing package dependencies










  - Run `pnpm install` to ensure all workspace packages have their dependencies
  - Fix TypeScript binary missing errors in packages (currently failing in @hijraah/utils, @hijraah/database, @hijraah/ui, @hijraah/mas, @hijraah/ai)
  - Verify all package.json files have correct dependency declarations
  - Ensure workspace dependencies are properly linked
  - _Requirements: 1.1_

- [-] 1.2 Set up Git hooks and automation




  - Configure pre-commit hooks for code quality checks (Husky already configured)
  - Set up automated testing on branch pushes
  - Configure commit message standards and validation
  - Set up automated dependency vulnerability scanning
  - _Requirements: 1.5, 6.1_

- [ ] 2. Code Quality Foundation Setup

  - Set up automated code quality checks and resolve immediate issues
  - Configure linting, formatting, and type checking for consistent code standards
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2.1 Fix dependency installation and TypeScript compilation

  - Install missing TypeScript dependencies in workspace packages
  - Run TypeScript compiler and resolve any compilation errors
  - Update type definitions for missing or incorrect types
  - Fix import/export issues and module resolution problems
  - _Requirements: 1.1_

- [ ] 2.2 Resolve ESLint critical errors

  - Run ESLint with current configuration and fix all critical errors
  - Update ESLint rules for production readiness
  - Fix unused variables, imports, and dead code
  - _Requirements: 1.2, 1.4_

- [ ] 2.3 Apply consistent code formatting

  - Run Prettier/Biome on entire codebase to ensure consistent formatting
  - Configure formatting rules for production standards
  - Verify pre-commit hooks for automatic formatting are working
  - _Requirements: 1.3_

- [ ] 2.4 Audit and fix security vulnerabilities

  - Fix 9 security vulnerabilities found by npm audit (7 moderate, 2 critical)
  - Update vulnerable packages: esbuild, form-data, highlight.js
  - Update dependencies to latest stable versions compatible with Next.js 15
  - Remove unused dependencies from package.json and workspace packages
  - Verify all package overrides and comments are still necessary
  - _Requirements: 1.5_

- [ ] 3. Resolve TODO Items and Technical Debt

  - Address critical TODO items that affect production readiness
  - Complete incomplete implementations and fix temporary stubs
  - _Requirements: 1.1, 1.4_

- [ ] 3.1 Complete cache implementation

  - Replace cache utility stub in `apps/web/src/lib/cache.ts` with Redis-based caching
  - Integrate with existing Upstash Redis configuration
  - Add cache invalidation and TTL management
  - Test caching functionality with existing cache usage patterns
  - _Requirements: 1.1_

- [x] 3.2 DocumentChunks table implementation


  - ~~Create database migration for documentChunks table~~
  - ~~Update schema files to include documentChunks table definition~~
  - ~~Enable document chunking functionality in firecrawl service~~
  - _Requirements: 1.1_
  - _Status: Already implemented as `documentChunksEnhanced` table in schema_

- [ ] 3.3 Fix AI SDK middleware exports

  - Uncomment and fix AI SDK v5 middleware export issues in `packages/hijraah-ai/src/index.ts`
  - Update middleware imports and exports for compatibility
  - Test AI provider integrations after fixes
  - _Requirements: 1.1_

- [ ] 3.4 Complete authentication middleware

  - Review and enhance existing authentication middleware for API routes
  - Add authentication checks to protected endpoints
  - Update API routes to use authentication middleware consistently
  - _Requirements: 1.1, 4.4_

- [ ] 3.5 Implement Stripe webhook signature verification

  - Add signature verification for Stripe webhooks in subscription routes
  - Implement proper webhook event handling and validation
  - Test webhook security and functionality
  - _Requirements: 1.1, 4.4_

- [ ] 4. Testing Infrastructure and Coverage

  - Ensure all existing tests pass and add missing test coverage
  - Validate critical user workflows through automated testing
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 4.1 Fix failing tests and update test configuration

  - Run all test suites and fix any failing tests
  - Update Jest configuration for current project structure
  - Ensure test mocks and setup files are working correctly
  - _Requirements: 2.1_

- [ ] 4.2 Add API endpoint tests

  - Create comprehensive tests for critical API endpoints
  - Test authentication, authorization, and data validation
  - Add tests for error handling and edge cases
  - _Requirements: 2.2_

- [ ] 4.3 Implement authentication flow tests

  - Create tests for login, registration, and session management
  - Test password reset and email verification flows
  - Validate user profile creation and updates
  - _Requirements: 2.3_

- [ ] 4.4 Add database operation tests

  - Test CRUD operations for all major entities
  - Validate database constraints and relationships
  - Test migration scripts and data integrity
  - _Requirements: 2.4_

- [ ] 5. Performance Optimization and Monitoring

  - Optimize application performance for production workloads
  - Implement monitoring and caching strategies
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 5.1 Optimize bundle size and loading performance

  - Analyze webpack bundle using Next.js bundle analyzer
  - Configure `productionBrowserSourceMaps: false` for production builds
  - Implement code splitting and lazy loading for large components
  - Configure `removeConsole: true` in Next.js compiler for production
  - Optimize images and static assets for faster loading
  - Set up proper `assetPrefix` configuration for CDN if needed
  - _Requirements: 3.1, 3.2_

- [ ] 5.2 Implement database query optimization

  - Review and optimize slow database queries
  - Add proper indexes for frequently queried columns
  - Implement query result caching where appropriate
  - _Requirements: 3.4_

- [ ] 5.3 Configure Redis caching strategy

  - Set up Redis caching for frequently accessed data
  - Implement cache invalidation strategies
  - Add cache warming for critical data
  - _Requirements: 3.5_

- [ ] 5.4 Add performance monitoring and deployment tracking

  - Configure Sentry performance monitoring with production settings
  - Set up Vercel analytics and speed insights for production deployment
  - Implement custom performance metrics tracking and alerting
  - Set up Vercel deployment monitoring with automated log analysis
  - Configure deployment status tracking and error alerting system
  - _Requirements: 3.4_

- [ ] 6. Security Hardening and Validation

  - Implement comprehensive security measures for production
  - Validate authentication, authorization, and data protection
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 6.1 Implement HTTPS and security headers

  - Configure Content Security Policy (CSP) headers in next.config.js
  - Set up HTTPS redirects and secure cookie settings
  - Add security headers for XSS and clickjacking protection
  - Configure Vercel deployment protection for preview and production environments
  - Implement proper x-robots-tag handling for SEO protection
  - _Requirements: 4.1_

- [ ] 6.2 Validate authentication and session security

  - Review Supabase Auth configuration for production
  - Implement secure session management and token handling
  - Add session timeout and refresh token logic
  - _Requirements: 4.2_

- [ ] 6.3 Implement file upload security

  - Add file type validation and size restrictions
  - Implement virus scanning for uploaded files
  - Set up secure file storage with proper access controls
  - _Requirements: 4.3_

- [ ] 6.4 Add API authorization and rate limiting

  - Implement proper authorization checks for all API endpoints
  - Set up rate limiting using Upstash Redis
  - Add request validation and sanitization
  - _Requirements: 4.4_

- [ ] 7. User Experience Polish and Accessibility

  - Enhance user interface consistency and accessibility
  - Improve error handling and user feedback
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 7.1 Standardize form validation and error messages

  - Create consistent form validation patterns across the application
  - Implement user-friendly error messages with clear guidance
  - Add proper form field validation and real-time feedback
  - _Requirements: 5.1_

- [ ] 7.2 Implement consistent loading states

  - Add loading indicators for all async operations
  - Create skeleton screens for data loading states
  - Implement smooth transitions between loading and loaded states
  - _Requirements: 5.3_

- [ ] 7.3 Enhance error handling and user feedback

  - Implement global error boundary for React components
  - Create user-friendly error pages for different error types
  - Add toast notifications for success and error states
  - _Requirements: 5.2_

- [ ] 7.4 Validate responsive design and mobile compatibility

  - Test application on various screen sizes and devices
  - Fix responsive design issues and mobile navigation
  - Optimize touch interactions and mobile user experience
  - _Requirements: 5.4_

- [ ] 7.5 Implement accessibility compliance

  - Add proper ARIA labels and semantic HTML structure
  - Ensure keyboard navigation works for all interactive elements
  - Test with screen readers and fix accessibility issues
  - _Requirements: 5.5_

- [ ] 8. Internationalization Completion

  - Complete multi-language support and translation validation
  - Ensure proper locale handling and RTL support
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8.1 Validate and complete translations

  - Run translation validation scripts to identify missing translations
  - Complete missing translations for all supported languages
  - Test language switching functionality across the application
  - _Requirements: 7.1, 7.2_

- [ ] 8.2 Implement RTL language support

  - Configure proper RTL layout for Arabic language support
  - Test RTL text direction and layout adjustments
  - Fix any RTL-specific styling and component issues
  - _Requirements: 7.4_

- [ ] 8.3 Add locale-specific formatting

  - Implement proper date and number formatting for different locales
  - Configure currency and time zone handling
  - Test locale-specific formatting across all components
  - _Requirements: 7.3_

- [ ] 9. Documentation and Deployment Preparation

  - Complete production documentation and deployment procedures
  - Set up monitoring and backup systems
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9.1 Generate API documentation

  - Create comprehensive API documentation using OpenAPI/Swagger
  - Document all endpoints with request/response schemas
  - Add authentication and authorization documentation
  - _Requirements: 6.2_

- [ ] 9.2 Configure production environment and deployment pipeline

  - Set up production environment variables and configuration
  - Configure database connections and external service integrations
  - Set up Vercel production deployment with proper domain configuration
  - Configure Supabase production environment and edge functions deployment
  - Implement deployment promotion workflow and rollback procedures
  - Test production environment setup and connectivity
  - _Requirements: 6.1_

- [ ] 9.3 Prepare database migrations for production

  - Validate all database migrations work correctly
  - Create rollback procedures for each migration
  - Test migration process on production-like environment
  - _Requirements: 6.3_

- [ ] 9.4 Set up monitoring and error tracking

  - Configure Sentry for production error tracking
  - Set up Upstash Redis monitoring and alerts
  - Implement health check endpoints for monitoring
  - _Requirements: 6.4_

- [ ] 9.5 Create backup and recovery procedures

  - Set up automated database backups
  - Create data recovery procedures and test them
  - Document backup retention and restoration processes
  - _Requirements: 6.5_

- [ ] 10. Data Migration and Integrity Validation

  - Ensure all existing data is properly migrated and accessible
  - Validate data integrity and user access
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 10.1 Validate database schema and constraints

  - Run database schema validation to ensure all constraints are properly defined
  - Test foreign key relationships and data integrity rules
  - Verify indexes are properly created for performance
  - _Requirements: 8.2_

- [ ] 10.2 Test user data accessibility

  - Verify all existing user profiles are accessible and complete
  - Test user authentication and profile data retrieval
  - Validate user permissions and role assignments
  - _Requirements: 8.3_

- [ ] 10.3 Validate document storage and retrieval

  - Test document upload and download functionality
  - Verify all existing documents are accessible
  - Test document security and access controls
  - _Requirements: 8.4_

- [ ] 10.4 Create data backup and test recovery

  - Create full database backup before production deployment
  - Test data recovery procedures with backup data
  - Validate backup integrity and completeness
  - _Requirements: 8.1, 8.5_

- [ ] 11. Final Production Readiness Validation

  - Perform comprehensive pre-release testing and validation
  - Execute final deployment checklist and go-live procedures
  - _Requirements: All requirements_

- [ ] 11.1 Execute comprehensive integration testing

  - Run full end-to-end tests covering all major user workflows
  - Test integration between all system components
  - Validate external service integrations (Supabase, Stripe, etc.)
  - _Requirements: 2.5_

- [ ] 11.2 Perform security audit and penetration testing

  - Run automated security scans on the application
  - Test for common vulnerabilities (OWASP Top 10)
  - Validate authentication and authorization security
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 11.3 Validate performance benchmarks

  - Run performance tests to ensure all targets are met
  - Test application under expected production load
  - Validate caching and optimization effectiveness
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 11.4 Execute final deployment checklist and production validation
  - Verify all environment configurations are correct for production
  - Test Vercel deployment pipeline with staging and production promotion
  - Validate Supabase edge functions deployment and secrets management
  - Test deployment rollback procedures and domain switching
  - Validate monitoring and alerting systems with real deployment events
  - Perform final production deployment with `vercel --prod` command
  - Verify all production domains and SSL certificates are properly configured
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
- [ ] 11
      . Next.js Production Optimization

  - Configure Next.js for optimal production performance and security
  - Implement production-specific build optimizations
  - _Requirements: 3.1, 3.2, 4.1_

- [ ] 12. Next.js Production Optimization

  - Configure Next.js for optimal production performance and security
  - Implement production-specific build optimizations
  - _Requirements: 3.1, 3.2, 4.1_

- [ ] 12.1 Configure Next.js production build settings

  - Set up `output: 'standalone'` for containerized deployments if needed
  - Configure `generateBuildId` for consistent builds across environments
  - Disable TypeScript build errors in production with `ignoreBuildErrors: true` if external type checking is used
  - Set up proper `compress: true` and `poweredByHeader: false` settings
  - _Requirements: 3.1, 4.1_

- [ ] 12.2 Implement production security configurations

  - Configure `reactStrictMode: true` for better error detection
  - Set up proper `crossOrigin` settings for script tags
  - Configure `generateEtags: true` for better caching
  - Implement proper `trailingSlash` configuration for SEO
  - _Requirements: 4.1, 4.2_

- [ ] 12.3 Set up production monitoring and logging

  - Configure Next.js logging settings for production
  - Set up proper error boundaries and error reporting
  - Implement Web Vitals tracking with `webVitalsAttribution`
  - Configure instrumentation hooks for performance monitoring
  - _Requirements: 3.4, 6.4_

- [ ] 13. Supabase Production Deployment

  - Deploy and configure Supabase components for production
  - Set up proper security and monitoring for Supabase services
  - _Requirements: 4.2, 4.4, 6.1, 8.1_

- [ ] 13.1 Deploy Supabase database migrations

  - Run `supabase db push` to deploy all migrations to production
  - Validate all database constraints and indexes are properly created
  - Test Row Level Security (RLS) policies in production environment
  - Run `supabase db lint` to check for production readiness issues
  - _Requirements: 8.1, 8.2_

- [ ] 13.2 Deploy Supabase Edge Functions

  - Deploy all Edge Functions using `supabase functions deploy`
  - Set up production secrets using `supabase secrets set --env-file`
  - Configure proper JWT verification settings for production functions
  - Test all Edge Function endpoints in production environment
  - _Requirements: 4.4, 6.1_

- [ ] 13.3 Configure Supabase production security

  - Set up proper SSL enforcement and network restrictions
  - Configure production authentication settings and providers
  - Implement proper backup and recovery procedures
  - Set up monitoring and alerting for Supabase services
  - _Requirements: 4.2, 4.5, 6.5_- [ ] 14. Re
    lease Branch Management and Deployment
  - Finalize release branch and deploy to production
  - Manage post-release activities and monitoring
  - _Requirements: 6.1, 6.2, All requirements_

- [ ] 14.1 Prepare release branch for merge

  - Ensure all tasks are completed and tested on release branch
  - Create comprehensive release notes and changelog
  - Tag release version with semantic versioning
  - Perform final code review and approval process
  - _Requirements: 6.1, 6.2_

- [ ] 14.2 Deploy to production and merge release

  - Deploy release branch to production environment
  - Verify production deployment is successful and stable
  - Merge release branch to main branch with proper merge commit
  - Deploy main branch to ensure consistency
  - _Requirements: 6.1, All requirements_

- [ ] 14.3 Post-release monitoring and cleanup
  - Monitor production deployment for first 24 hours
  - Verify all monitoring and alerting systems are functioning
  - Clean up temporary release artifacts and branches
  - Document lessons learned and process improvements
  - _Requirements: 6.4, 6.5_

## CRITICAL: MAS Frontend Integration Tasks (High Priority)

**Context**: The Multi-Agent System (MAS) backend infrastructure is complete with sophisticated AI capabilities including:
- ✅ **Document Processing Agents**: Classification, OCR, extraction, quality validation, translation
- ✅ **Predictive Analytics Agents**: Timeline, success probability, risk assessment, cost estimation, recommendations  
- ✅ **Policy Change Detection Agents**: Monitoring, impact assessment, notifications, trend analysis, cross-jurisdiction
- ✅ **Community Validation Agents**: Peer review, reputation scoring, moderation, gamification, consensus
- ✅ **API Integration**: MAS-enhanced endpoints with agent processing capabilities
- ✅ **Webhook System**: Intelligent routing and payload enrichment with agent insights

**Gap**: Frontend integration is required to deliver the intelligent user experience outlined in the updated user flow map.

**Priority**: These tasks are CRITICAL for release as they transform the platform from traditional immigration management to intelligent, AI-powered guidance system.

- [ ] 15. MAS Frontend Components Implementation (Task 18.8)

  - Enhance existing dashboard with MAS agent integration using AI SDK v5 React integration
  - Add MAS Intelligence Hub tab to existing dashboard tabs (Cases, Documents, Analytics)
  - _Requirements: MAS user experience, intelligent automation_

- [ ] 15.1 Enhance existing dashboard with MAS Intelligence Hub tab

  - **MANDATORY**: Use shadcn-ui MCP server for all UI components
  - Add **MAS Intelligence Hub** as fourth tab in existing dashboard (`apps/web/src/app/(authenticated)/dashboard/page.tsx`)
  - Extend existing `TabsList` to include MAS tab: `<TabsTrigger value="mas-hub">MAS Intelligence</TabsTrigger>`
  - Create `TabsContent` for MAS hub using existing dashboard patterns and shadcn-ui components
  - Integrate with existing `AppSidebar` component to add MAS navigation items
  - _Requirements: Seamless integration with existing dashboard_

- [ ] 15.2 Create MAS agent status components using shadcn-ui

  - **MANDATORY**: Use `get_component_demo()` and `get_component()` from shadcn-ui MCP server
  - Build **Agent Status Cards** using shadcn-ui `Card`, `Badge`, and `Progress` components
  - Create **Confidence Meters** using shadcn-ui `Progress` component with custom styling for confidence levels
  - Implement **Agent Attribution Badges** using shadcn-ui `Badge` component with agent team colors
  - Add **Processing Status Indicators** using shadcn-ui `Skeleton` and `Spinner` components
  - Create **Real-time Updates** using existing dashboard patterns with shadcn-ui components
  - _Requirements: Consistent UI with existing dashboard, real-time feedback_

- [ ] 15.3 Develop MAS integration hooks extending existing patterns

  - Create `useMASAgents` hook following existing `use-cases.ts` pattern in `apps/web/src/hooks/`
  - Build `useMASStatus` hook for real-time agent status updates using existing `use-realtime.ts` pattern
  - Implement `useMASResults` hook for agent result management following existing dashboard data patterns
  - Add error handling using existing `use-toast.tsx` and error boundary patterns
  - Create caching strategies using existing API patterns in `apps/web/src/lib/services/`
  - _Requirements: Consistency with existing codebase, performance optimization_

- [ ] 16. Enhance Existing Case Management with MAS Integration (Task 19.1)

  - Enhance existing case management components in `apps/web/src/components/ui/dashboard/CasesList.tsx`
  - Add MAS predictive analytics to existing case creation and management workflows
  - _Requirements: Predictive insights, smart actions, case intelligence_

- [ ] 16.1 Enhance existing case creation with MAS predictive analytics

  - **MANDATORY**: Use shadcn-ui MCP server for all new UI components
  - Extend existing `TemporaryCaseForm.tsx` with MAS predictive analytics integration
  - Add **Timeline Prediction Cards** using shadcn-ui `Card` components with MAS timeline prediction agents
  - Implement **Success Probability Indicators** using shadcn-ui `Progress` and `Badge` components
  - Create **Risk Assessment Alerts** using shadcn-ui `Alert` components with MAS risk assessment agents
  - Add **Cost Estimation Display** using existing dashboard card patterns with MAS cost estimation agents
  - _Requirements: Enhance existing forms, not replace them_

- [ ] 16.2 Enhance existing case details with MAS insights

  - Extend existing case details views in `CasesList.tsx` with MAS agent insights
  - Add **MAS Insights Panel** to existing case detail modals using shadcn-ui `Tabs` component
  - Implement **Smart Recommendations** using shadcn-ui `Card` and `Badge` components
  - Create **Policy Impact Alerts** using existing notification patterns with MAS policy agents
  - Add **Progress Predictions** using shadcn-ui `Progress` component with MAS timeline agents
  - Integrate with existing case chat functionality for MAS agent responses
  - _Requirements: Enhance existing case management, maintain current UX_

- [ ] 16.3 Add MAS-powered action suggestions to existing case interface

  - Extend existing `DashboardActions.tsx` with MAS-powered suggestions
  - Add **Smart Action Recommendations** using shadcn-ui `Button` and `Popover` components
  - Implement **Priority Task Indicators** using shadcn-ui `Badge` components with urgency colors
  - Create **Next Steps Suggestions** using existing dashboard patterns with MAS recommendation agents
  - Add **Document Requirements Alerts** using shadcn-ui `Alert` components with MAS document agents
  - _Requirements: Enhance existing actions, maintain familiar interface_

- [ ] 17. Enhance Existing Document Management with MAS Integration (Task 19.2)

  - Enhance existing document components in `apps/web/src/components/ui/dashboard/DocumentsList.tsx`
  - Add MAS multi-modal document processing to existing upload and management workflows
  - _Requirements: Real-time processing, quality validation, multi-language support_

- [ ] 17.1 Enhance existing document upload with MAS classification

  - **MANDATORY**: Use shadcn-ui MCP server for all new UI components
  - Extend existing `TemporaryDocumentForm.tsx` with MAS document classification agents
  - Add **Real-time Classification Badges** using shadcn-ui `Badge` components during upload
  - Implement **Quality Assessment Progress** using shadcn-ui `Progress` component with MAS quality agents
  - Create **Document Type Detection** using existing upload patterns with MAS classification agents
  - Add **Smart Case Linking** using shadcn-ui `Select` component with MAS matching suggestions
  - _Requirements: Enhance existing upload, maintain current UX_

- [ ] 17.2 Enhance existing document processing with MAS real-time updates

  - Extend existing document processing views in `DocumentsList.tsx` with MAS agent status
  - Add **Processing Status Cards** using shadcn-ui `Card` components with real-time MAS updates
  - Implement **OCR Progress Indicators** using shadcn-ui `Progress` and `Skeleton` components
  - Create **Content Extraction Preview** using existing document preview patterns with MAS extraction agents
  - Add **Quality Validation Alerts** using shadcn-ui `Alert` components with MAS quality agents
  - Integrate with existing document storage and retrieval systems
  - _Requirements: Enhance existing processing, real-time feedback_

- [ ] 17.3 Add MAS analysis results to existing document interface

  - Extend existing document detail views with MAS analysis insights
  - Add **Analysis Results Panel** using shadcn-ui `Tabs` component in existing document modals
  - Implement **Confidence Score Displays** using shadcn-ui `Progress` and `Badge` components
  - Create **Improvement Suggestions** using shadcn-ui `Card` components with MAS recommendations
  - Add **Translation Options** using existing patterns with MAS translation agents
  - Build **Document History** using existing versioning patterns with MAS change analysis
  - _Requirements: Enhance existing document views, comprehensive analysis_

- [ ] 18. Add MAS Policy Monitoring to Existing Dashboard (Task 19.3)

  - Add MAS policy monitoring features to existing dashboard and notification systems
  - Enhance existing analytics tab with policy intelligence and impact analysis
  - _Requirements: Real-time monitoring, personalized alerts, trend analysis_

- [ ] 18.1 Add MAS policy monitoring to existing analytics tab

  - **MANDATORY**: Use shadcn-ui MCP server for all new UI components
  - Enhance existing analytics tab in dashboard with MAS policy monitoring section
  - Add **Policy Updates Feed** using shadcn-ui `Card` and `ScrollArea` components
  - Implement **Impact Analysis Cards** using existing dashboard card patterns with MAS impact agents
  - Create **Policy Alert Badges** using shadcn-ui `Badge` components with urgency indicators
  - Add **Cross-jurisdiction Comparison** using shadcn-ui `Tabs` component with MAS cross-jurisdiction agents
  - _Requirements: Enhance existing analytics, maintain dashboard consistency_

- [ ] 18.2 Enhance existing notification system with MAS policy alerts

  - Extend existing notification system with MAS policy change detection
  - Add **Policy Trend Charts** using existing chart patterns with MAS trend analysis agents
  - Implement **Predictive Alerts** using shadcn-ui `Alert` components with MAS prediction agents
  - Create **Policy Timeline** using shadcn-ui `Timeline` component with historical data
  - Add **Research Insights** using existing research patterns with MAS policy research agents
  - Integrate with existing `notification-button.tsx` component for policy alerts
  - _Requirements: Enhance existing notifications, predictive intelligence_

- [ ] 18.3 Add MAS policy preferences to existing settings

  - Extend existing user settings with MAS policy monitoring preferences
  - Add **Policy Monitoring Settings** to existing settings pages using shadcn-ui `Form` components
  - Implement **Notification Preferences** using shadcn-ui `Switch` and `Select` components
  - Create **Policy Categories** using shadcn-ui `Checkbox` components with relevance scoring
  - Add **Alert Frequency Controls** using existing settings patterns with intelligent batching
  - Integrate with existing user profile and preferences system
  - _Requirements: Enhance existing settings, user control, personalization_

- [ ] 19. Add MAS Community Features to Existing Platform (Task 19.4)

  - Add MAS community validation features to existing community and help sections
  - Enhance existing user profile and analytics with community validation metrics
  - _Requirements: Peer review, reputation scoring, consensus building_

- [ ] 19.1 Add MAS peer review to existing community features

  - **MANDATORY**: Use shadcn-ui MCP server for all new UI components
  - Enhance existing community pages with MAS peer review functionality
  - Add **Review Queue Cards** using shadcn-ui `Card` components with MAS validation agents
  - Implement **Consensus Indicators** using shadcn-ui `Progress` and `Badge` components
  - Create **Validation History** using existing patterns with MAS validation tracking
  - Add **Expert Escalation** using shadcn-ui `Alert` components with handoff workflows
  - Integrate with existing community navigation and user systems
  - _Requirements: Enhance existing community, collaborative validation_

- [ ] 19.2 Add MAS reputation system to existing user profiles

  - Extend existing user profile system with MAS reputation scoring
  - Add **Reputation Badges** using shadcn-ui `Badge` components in user profiles
  - Implement **Achievement Display** using existing profile patterns with MAS gamification agents
  - Create **Contribution Metrics** using shadcn-ui `Card` components with impact measurement
  - Add **Leaderboard Section** using existing analytics patterns with community recognition
  - Integrate with existing user authentication and profile management
  - _Requirements: Enhance existing profiles, community engagement_

- [ ] 19.3 Add MAS content moderation to existing admin features

  - Extend existing admin dashboard with MAS content moderation capabilities
  - Add **Moderation Queue** using existing admin patterns with MAS moderation agents
  - Implement **Quality Metrics** using shadcn-ui `Progress` and `Chart` components
  - Create **Dispute Resolution** using existing admin tools with MAS conflict resolution
  - Add **Content Quality Tracking** using existing analytics with MAS quality agents
  - Integrate with existing admin authentication and role-based access
  - _Requirements: Enhance existing admin tools, automated moderation_

- [ ] 20. Complete MAS Intelligence Hub Tab Implementation

  - Complete the MAS Intelligence Hub tab added in Task 15.1
  - Integrate all MAS agent teams into unified dashboard experience within existing dashboard
  - _Requirements: Unified intelligence, cross-agent coordination, comprehensive insights_

- [ ] 20.1 Complete MAS Intelligence Hub dashboard content

  - **MANDATORY**: Use shadcn-ui MCP server for all UI components
  - Complete the MAS Intelligence Hub `TabsContent` created in Task 15.1
  - Add **Agent Performance Overview** using shadcn-ui `Card` and `Chart` components
  - Implement **Cross-Agent Status Grid** using existing dashboard grid patterns with MAS agent status
  - Build **Intelligence Summary Cards** using shadcn-ui `Card` components with key insights
  - Add **System Health Indicators** using shadcn-ui `Badge` and `Progress` components
  - Create **Usage Analytics Section** using existing analytics patterns with MAS metrics
  - _Requirements: Complete hub implementation, unified monitoring_

- [ ] 20.2 Add MAS agent coordination features to Intelligence Hub

  - Add **Agent Workflow Status** using shadcn-ui `Table` component with task distribution
  - Implement **Cross-Agent Communication Log** using shadcn-ui `ScrollArea` component
  - Create **Agent Performance Comparison** using existing chart patterns with coordination metrics
  - Add **Workflow Optimization Suggestions** using shadcn-ui `Alert` components
  - Build **Agent Learning Progress** using shadcn-ui `Progress` components with feedback tracking
  - Integrate with existing dashboard real-time updates and notification systems
  - _Requirements: Agent coordination within existing dashboard, workflow optimization_

- [ ] 21. Complete MAS Integration and Testing

  - Complete integration of all MAS components with existing user flows
  - Ensure seamless user experience with intelligent AI assistance throughout existing platform
  - _Requirements: Seamless integration, user experience, comprehensive testing_

- [ ] 21.1 Complete MAS integration with existing user flows

  - **MANDATORY**: Use existing patterns and components, enhance don't replace
  - Enhance existing **Onboarding Components** in `apps/web/src/components/ui/onboarding/` with MAS profile analysis
  - Add MAS-powered suggestions to existing **Dashboard Quick Actions** in `DashboardActions.tsx`
  - Integrate MAS agent responses with existing **Chat Interface** in `apps/web/src/components/ui/chat/`
  - Add MAS preferences to existing **Settings Pages** in `apps/web/src/app/(authenticated)/settings/`
  - Ensure all MAS features work with existing **Mobile Navigation** and responsive design
  - _Requirements: Enhance existing flows, maintain current UX patterns_

- [ ] 21.2 Implement comprehensive MAS testing

  - Extend existing test suites in `__tests__/` with MAS component coverage
  - Add **MAS Agent Integration Tests** using existing testing patterns and frameworks
  - Implement **User Experience Tests** for MAS-enhanced workflows using existing E2E tests
  - Create **Performance Tests** for MAS agent response times using existing performance monitoring
  - Add **Accessibility Tests** for MAS components using existing accessibility testing framework
  - Test **Cross-browser Compatibility** for all MAS enhancements using existing testing infrastructure
  - _Requirements: Comprehensive testing, maintain existing test quality standards_

- [ ] 21.3 Optimize MAS performance within existing infrastructure

  - Implement **MAS Response Caching** using existing Redis caching patterns in `apps/web/src/lib/cache.ts`
  - Add **Progressive Loading** for MAS results using existing skeleton patterns and loading states
  - Create **Error Handling** using existing error boundary and toast notification patterns
  - Implement **Performance Monitoring** using existing Sentry and analytics integration
  - Add **User Feedback** using existing feedback systems and user preference management
  - _Requirements: Use existing infrastructure, maintain performance standards_

## CRITICAL: Comprehensive Hijraah Platform E2E Testing (Following User Flow Map)

**Context**: Comprehensive E2E testing following the complete user flows from HIJRAAH_USER_FLOW_MAP.md to ensure all platform features work correctly in real user scenarios.

**Approach**: Extend existing Playwright E2E test infrastructure with comprehensive platform testing.

- [ ] 22. Complete Hijraah User Journey E2E Tests

  - Create comprehensive E2E tests following the complete user flow map
  - Test all core platform features and user workflows
  - _Requirements: Complete user journey validation, platform functionality verification_

- [ ] 22.1 New User Journey E2E Tests

  - **File**: `__tests__/e2e/new-user-journey.spec.ts`
  - **Approach**: Follow existing E2E patterns in `__tests__/e2e/auth.setup.ts`
  - Test **Discovery & Landing Page** with hero section, features, and CTA buttons
  - Test **Registration Process** with email/password and Google OAuth flows
  - Test **Email Verification** workflow and account activation
  - Test **Onboarding Experience** with welcome, profile setup, feature tour, first task, and resources
  - Verify **Profile Creation** with personal info and immigration goals
  - Test **Dashboard Redirect** after successful onboarding completion
  - _Requirements: Complete new user onboarding and account creation_

- [ ] 22.2 Authentication and Session Management E2E Tests

  - **File**: `__tests__/e2e/authentication.spec.ts`
  - **Approach**: Extend existing auth tests with comprehensive scenarios
  - Test **Login Process** with email/password and Google OAuth
  - Test **Session Validation** via middleware and automatic redirects
  - Test **Password Reset** workflow with email verification
  - Test **Session Timeout** and automatic logout functionality
  - Test **Remember Me** functionality and persistent sessions
  - Test **Multi-device Login** and session management
  - Verify **Security Headers** and HTTPS redirects
  - _Requirements: Secure authentication and session management_

- [ ] 22.3 Dashboard Navigation and Core Features E2E Tests

  - **File**: `__tests__/e2e/dashboard-navigation.spec.ts`
  - **Approach**: Test complete dashboard functionality
  - Test **Dashboard Tabs** navigation (Cases, Documents, Analytics)
  - Test **Sidebar Navigation** with all menu items and quick actions
  - Test **Breadcrumb Navigation** and clear path indication
  - Test **Search Integration** and global content discovery
  - Test **Quick Actions** and cross-feature shortcuts
  - Test **Dashboard Stats** and metrics display
  - Verify **Responsive Design** on mobile and tablet devices
  - _Requirements: Complete dashboard navigation and core functionality_

- [ ] 22.4 Case Management E2E Tests

  - **File**: `__tests__/e2e/case-management.spec.ts`
  - **Approach**: Test complete case management workflow
  - Test **Case Creation** with title, description, and metadata
  - Test **Case List View** with status, dates, and actions
  - Test **Case Details** with full information and linked documents
  - Test **Case Updates** including status changes and notes
  - Test **Case Deletion** with confirmation and cleanup
  - Test **Case Search and Filtering** functionality
  - Test **Case-Document Linking** and relationship management
  - Verify **Case Chat Integration** for case-specific discussions
  - _Requirements: Complete case management functionality_

- [ ] 22.5 Document Management E2E Tests

  - **File**: `__tests__/e2e/document-management.spec.ts`
  - **Approach**: Test complete document management workflow
  - Test **Document Upload** with file selection, metadata, and validation
  - Test **Document Processing** including OCR and classification
  - Test **Document Preview** and content viewing
  - Test **Document Organization** with categorization and search
  - Test **Document Versioning** and history tracking
  - Test **Document Security** with access controls and permissions
  - Test **Document-Case Linking** and automatic suggestions
  - Verify **File Type Validation** and size restrictions
  - _Requirements: Complete document management functionality_

- [ ] 22.6 AI Chat and Research E2E Tests

  - **File**: `__tests__/e2e/ai-chat-research.spec.ts`
  - **Approach**: Test AI chat and research functionality
  - Test **Chat Session Creation** with immigration topic selection
  - Test **AI Conversation** with immigration guidance and responses
  - Test **Context Awareness** with case and document integration
  - Test **Chat History** and session management
  - Test **Research Tools** and information discovery
  - Test **Deep Research** functionality with comprehensive analysis
  - Test **Follow-up Actions** including case creation and document uploads
  - Verify **Multi-language Support** for chat interactions
  - _Requirements: Complete AI chat and research functionality_

- [ ] 22.7 User Profile and Settings E2E Tests

  - **File**: `__tests__/e2e/user-profile-settings.spec.ts`
  - **Approach**: Test user profile and settings management
  - Test **Personal Information** updates and validation
  - Test **Immigration Preferences** configuration
  - Test **Account Settings** including password changes
  - Test **Subscription Management** and billing information
  - Test **Notification Preferences** and communication settings
  - Test **Language Selection** and internationalization
  - Test **Privacy Settings** and data management
  - Verify **Profile Picture Upload** and avatar management
  - _Requirements: Complete user profile and settings management_

- [ ] 23. Platform Performance and Reliability E2E Tests

  - Test platform performance, reliability, and error handling in real user scenarios
  - Verify system behavior under various conditions and edge cases
  - _Requirements: Platform reliability and performance validation_

- [ ] 23.1 Performance and Load E2E Tests

  - **File**: `__tests__/e2e/performance.spec.ts`
  - **Approach**: Follow existing performance testing patterns
  - Test **Page Load Times** for all major pages and features
  - Test **API Response Times** for critical endpoints
  - Test **Document Upload Performance** with various file sizes
  - Test **Search Performance** with large datasets
  - Test **Real-time Updates** performance with WebSocket connections
  - Test **Concurrent User Scenarios** with multiple simultaneous users
  - Verify **Caching Effectiveness** and performance optimization
  - _Requirements: Platform performance meets SLA requirements_

- [ ] 23.2 Error Handling and Recovery E2E Tests

  - **File**: `__tests__/e2e/error-handling.spec.ts`
  - **Approach**: Follow existing error handling patterns
  - Test **Network Interruption Handling** during critical operations
  - Test **Server Error Recovery** with graceful degradation
  - Test **Invalid Input Handling** with proper error messages
  - Test **File Upload Errors** with clear user feedback
  - Test **Authentication Errors** and recovery workflows
  - Test **Database Connection Issues** and fallback mechanisms
  - Verify **Error Boundary Functionality** and user-friendly error pages
  - _Requirements: Robust error handling and recovery for entire platform_

- [ ] 23.3 Cross-Browser and Device Compatibility E2E Tests

  - **File**: `__tests__/e2e/cross-platform.spec.ts`
  - **Approach**: Use existing cross-browser testing configuration
  - Test **Desktop Browsers** (Chrome, Firefox, Safari, Edge) compatibility
  - Test **Mobile Devices** (iOS Safari, Android Chrome) functionality
  - Test **Tablet Experience** with touch interactions and responsive design
  - Test **Keyboard Navigation** and accessibility features
  - Test **Screen Reader Compatibility** for visually impaired users
  - Test **High Contrast Mode** and accessibility compliance
  - Verify **RTL Language Support** for Arabic interface
  - _Requirements: Platform works consistently across all platforms and devices_

- [ ] 24. Complete Platform Integration E2E Tests

  - Test complete platform workflows from start to finish
  - Verify integration between all platform features and external services
  - _Requirements: End-to-end platform workflow validation_

- [ ] 24.1 Complete Immigration Workflow E2E Test

  - **File**: `__tests__/e2e/complete-immigration-workflow.spec.ts`
  - **Approach**: Test complete user journey from registration to goal completion
  - Test **Complete New User Journey** from landing page to successful case completion
  - Test **Case Creation and Management** throughout the immigration process
  - Test **Document Upload and Processing** with OCR and validation
  - Test **AI Chat Integration** for guidance throughout the process
  - Test **Progress Tracking** and milestone achievements
  - Test **Notification System** for updates and reminders
  - Verify **Data Persistence** and consistency across all features
  - _Requirements: Complete immigration workflow with all platform features_

- [ ] 24.2 Multi-User Collaboration E2E Test

  - **File**: `__tests__/e2e/multi-user-collaboration.spec.ts`
  - **Approach**: Test collaboration features and multi-user scenarios
  - Test **Shared Case Access** with multiple users and permissions
  - Test **Real-time Updates** when multiple users work on same case
  - Test **Comment and Communication** features between users
  - Test **Document Sharing** and collaborative review processes
  - Test **Admin User Management** and oversight capabilities
  - Test **Expert Consultation** workflows and handoff processes
  - Verify **Conflict Resolution** when multiple users make simultaneous changes
  - _Requirements: Multi-user collaboration and real-time features work correctly_

- [ ] 24.3 External Service Integration E2E Test

  - **File**: `__tests__/e2e/external-integrations.spec.ts`
  - **Approach**: Test integration with all external services and APIs
  - Test **Supabase Integration** for authentication, database, and real-time features
  - Test **Stripe Integration** for subscription and payment processing
  - Test **Email Service Integration** for notifications and communications
  - Test **File Storage Integration** for document upload and retrieval
  - Test **AI Service Integration** for chat and document processing
  - Test **Analytics Integration** for usage tracking and insights
  - Verify **API Rate Limiting** and error handling for external services
  - _Requirements: All external service integrations work reliably_

## MAS Integration Implementation Roadmap

### Phase 1: Dashboard Enhancement (Tasks 15.1-15.3) - IMMEDIATE PRIORITY
**Timeline**: 1-2 weeks
**Dependencies**: None (can start immediately)
**Approach**: Enhance existing dashboard, don't replace
**Deliverables**: 
- MAS Intelligence Hub tab added to existing dashboard
- MAS agent status components using shadcn-ui
- Integration hooks following existing patterns

### Phase 2: Core Feature Enhancement (Tasks 16-17) - HIGH PRIORITY  
**Timeline**: 2-3 weeks
**Dependencies**: Phase 1 completion
**Approach**: Enhance existing case and document management
**Deliverables**:
- MAS-enhanced case management within existing CasesList.tsx
- MAS-enhanced document processing within existing DocumentsList.tsx
- Real-time agent insights integrated with existing workflows

### Phase 3: Platform-wide Enhancement (Tasks 18-19) - HIGH PRIORITY
**Timeline**: 2-3 weeks  
**Dependencies**: Phase 1 completion (can run parallel with Phase 2)
**Approach**: Enhance existing analytics, community, and admin features
**Deliverables**:
- Policy monitoring added to existing analytics tab
- Community validation added to existing community features
- MAS features integrated throughout existing platform

### Phase 4: Completion & Optimization (Tasks 20-21) - MEDIUM PRIORITY
**Timeline**: 1-2 weeks
**Dependencies**: Phases 1-3 completion
**Approach**: Complete MAS Intelligence Hub and optimize performance
**Deliverables**:
- Complete MAS Intelligence Hub implementation
- Comprehensive testing using existing test infrastructure
- Performance optimization using existing caching and monitoring

### Phase 5: Comprehensive Platform E2E Testing (Tasks 22-24) - HIGH PRIORITY
**Timeline**: 2-3 weeks
**Dependencies**: Phases 1-4 completion
**Approach**: Comprehensive E2E testing following complete Hijraah user flow map
**Deliverables**:
- Complete platform user journey E2E tests (Tasks 22.1-22.7)
- Platform performance and reliability tests (Tasks 23.1-23.3)
- End-to-end workflow integration tests (Tasks 24.1-24.3)
- Cross-browser and device compatibility validation
- Performance benchmarking and external service integration verification

### Success Metrics for MAS Integration
- **User Engagement**: 40%+ increase in feature adoption with MAS-enhanced interfaces
- **Processing Efficiency**: 60%+ reduction in document processing time
- **Prediction Accuracy**: 85%+ accuracy in timeline and success probability predictions
- **User Satisfaction**: 90%+ satisfaction with AI-powered guidance and insights
- **Proactive Value**: 70%+ success rate of proactive agent alerts and suggestions

### E2E Testing Success Metrics
- **Test Coverage**: 95%+ coverage of all platform user flows and features
- **Cross-Browser Compatibility**: 100% functionality across Chrome, Firefox, Safari, Edge
- **Mobile Compatibility**: 100% functionality on iOS and Android devices
- **Performance Standards**: All page loads under 3 seconds, API responses under 1 second
- **Error Recovery**: 100% graceful degradation and user-friendly error handling
- **Accessibility Compliance**: WCAG 2.1 AA compliance for entire platform
- **Multi-language Support**: 100% functionality in English, Arabic, French, Spanish
- **External Service Integration**: 99.9% reliability for all third-party service integrations

### Risk Mitigation
- **Fallback Mechanisms**: All MAS features have graceful degradation to non-AI functionality
- **Performance Monitoring**: Real-time monitoring of agent response times and reliability
- **User Control**: Users can disable or customize MAS features based on preferences
- **Transparency**: Clear indicators of AI involvement and confidence levels
- **Human Escalation**: Seamless handoff to human experts when agent confidence is low

### Technical Dependencies
- **AI SDK v5**: Latest version with React integration and streaming capabilities
- **Supabase Real-time**: For live agent status updates and collaborative features  
- **Redis Caching**: For agent result caching and performance optimization
- **Trigger.dev**: For background agent orchestration and task management
- **Sentry Monitoring**: For agent performance tracking and error monitoring

### E2E Testing Dependencies
- **Playwright**: Existing E2E testing framework with cross-browser support
- **@faker-js/faker**: Test data generation for realistic E2E scenarios
- **@types/node**: Node.js type definitions for test utilities
- **Test Infrastructure**: Existing auth setup, global setup/teardown, and test utilities
- **CI/CD Integration**: GitHub Actions for automated E2E test execution
- **Visual Regression**: Screenshot comparison for UI consistency across updates
- **Test Data Management**: Database seeding and cleanup for consistent test environments
- **Performance Monitoring**: Integration with existing performance monitoring tools

This comprehensive MAS integration transforms Hijraah from a traditional immigration platform into an intelligent, AI-powered system that provides proactive guidance, real-time insights, and collaborative intelligence throughout the entire immigration journey.
