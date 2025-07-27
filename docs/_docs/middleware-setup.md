# Next.js Middleware Setup

This document explains how middleware is set up in the Hijraah project after refactoring.

## Middleware Architecture

The project follows a layered architecture approach with middleware logic organized as follows:

```
src/
├── middleware.ts                   # Entry point required by Next.js
├── _infrastructure/
│   └── middleware/
│       ├── middleware.ts           # Full middleware implementation
│       ├── middleware-i18n.ts      # i18n specific middleware
│       └── index.ts                # Barrel exports
└── _root/
    └── middleware.ts               # Original re-export middleware
```

## Special Handling for Next.js

Next.js has specific requirements for middleware:

1. The middleware file must be located either:

   - At the root level as `middleware.ts`
   - In the src directory as `src/middleware.ts` (if using the src directory pattern)

2. The middleware file must export either:

   - A named `middleware` function
   - A default function

3. The location cannot be customized or placed in subdirectories, even with proper imports/exports

## Our Solution

To maintain our layered architecture while satisfying Next.js requirements, we use a specialized approach:

1. The actual middleware implementation lives in the infrastructure layer (`src/_infrastructure/middleware/middleware.ts`), containing the full logic for:

   - Authentication
   - Internationalization
   - API request handling
   - Caching
   - Etc.

2. We created a minimalist version in `src/middleware.ts` that focuses only on internationalization, which is the most critical aspect for initial page loading.

3. This approach allows:
   - Maintaining our architectural principles
   - Satisfying Next.js framework requirements
   - Ensuring proper functionality without complex re-export patterns that might break

## Alternative Solutions Attempted

We tried several approaches before settling on the current solution:

1. **Re-export pattern**:

   ```typescript
   // src/middleware.ts
   export { middleware, config } from "@/_infrastructure/middleware/middleware";
   ```

   This approach is clean but can sometimes fail due to Next.js' special handling of middleware files.

2. **Function delegation pattern**:

   ```typescript
   // src/middleware.ts
   import { middleware as infrastructureMiddleware } from "@/_infrastructure/middleware/middleware";

   export function middleware(request: NextRequest) {
     return infrastructureMiddleware(request);
   }
   ```

   This works but still requires importing from custom paths, which can occasionally cause issues.

## Recommendations

When working with middleware in this project:

1. Make core changes in `src/_infrastructure/middleware/middleware.ts`

2. If those changes are critical for initial page loading (especially i18n), mirror the essential logic in `src/middleware.ts`

3. Test thoroughly to ensure both implementations work consistently

4. In case of issues, consider simplifying `src/middleware.ts` to focus solely on the most critical aspects
