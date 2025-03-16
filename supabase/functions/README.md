# Hijraah Edge Functions

This directory contains Supabase Edge Functions for the Hijraah immigration platform. These functions are designed to run on Supabase's Edge Functions infrastructure, which allows for executing server-side code close to your users.

## Functions Overview

### Core Services

- **eligibility-checker**: Analyzes user data against immigration program requirements to determine eligibility and suggest suitable immigration pathways.

  - Input: User profile data, destination country, visa/immigration type
  - Output: Eligibility assessment, score, and recommended pathways

- **document-processor**: Processes, validates, and extracts information from immigration documents.

  - Input: Document files (PDF, images)
  - Output: Processed data, validation results, extracted information

- **immigration-updates-webhook**: Listens for external immigration policy updates and integrates them into the platform.

  - Input: Webhook payload with immigration policy changes
  - Output: Confirmation of update processing, notification triggers

- **query-router**: Intelligently routes user queries to the appropriate service based on content analysis.
  - Input: User query text
  - Output: Routing decision, forwarded query response

### AI and Analysis

- **analyze**: Provides deep analysis of user data, documents, and immigration scenarios.

  - Input: User data, case information, specific analysis request
  - Output: Detailed analysis, insights, recommendations

- **generate-queries**: Translates natural language requests into structured database queries.

  - Input: Natural language query description
  - Output: Generated SQL query, query results

- **synthesize**: Combines information from multiple sources to answer complex immigration questions.
  - Input: Question, relevant context sources
  - Output: Comprehensive answer with source citations

### User Management

- **custom-email**: Sends personalized email notifications for various immigration events.

  - Input: Email type, recipient, custom data
  - Output: Email delivery status

- **subscription**: Manages user subscription plans, billing, and access controls.

  - Input: User ID, subscription action (create, update, cancel)
  - Output: Updated subscription status

- **chat-rate-limiter**: Controls API request rates to prevent abuse and manage resource allocation.
  - Input: User ID, request type
  - Output: Allow/deny decision, rate limit information

## Shared Utilities

Common utilities and types are stored in the `_shared` directory:

- **types.ts**: Contains TypeScript interfaces used across functions

  - User types
  - Document types
  - Response types
  - Configuration types

- **utils.ts**: Contains utility functions for:
  - Supabase client initialization
  - Authentication helpers
  - Rate limiting
  - Error handling
  - Logging

## Development

### Prerequisites

- Node.js 18+
- Supabase CLI
- Deno runtime (for local development)

### Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up environment variables:
   ```
   supabase secrets set --env-file .env
   ```

### Local Development

To serve functions locally:

```
supabase functions serve
```

To test a specific function:

```
supabase functions serve <function-name>
```

### Deployment

To deploy a single function:

```
supabase functions deploy <function-name>
```

To deploy all functions:

```
supabase functions deploy
```

## Best Practices

- **Architecture**:

  - Use Express for routing within functions
  - Keep functions small and focused on a single responsibility
  - Share common code through the `_shared` directory

- **Error Handling**:

  - Implement proper error handling and logging
  - Return standardized error responses
  - Use try/catch blocks around critical operations

- **Performance**:

  - Implement caching where appropriate
  - Minimize database calls
  - Use connection pooling
  - Optimize large data operations

- **Security**:
  - Validate all inputs
  - Use Supabase RLS policies for database access
  - Implement proper rate limiting
  - Never expose sensitive information in logs

## Environment Variables

The following environment variables are automatically available:

- `SUPABASE_URL`: The URL of your Supabase project
- `SUPABASE_ANON_KEY`: Anonymous API key for the Supabase client
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin access
- `SUPABASE_DB_URL`: Direct database connection URL

Additional environment variables can be set using:

```
supabase secrets set NAME=VALUE
```

## Testing

To run tests for a function:

```
cd <function-name>
deno test
```
