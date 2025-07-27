# Migration Guide to DDD Architecture

## Overview

This guide outlines how to move from the current architecture to the new Domain-Driven Design (DDD) architecture with clear separation of concerns through infrastructure, domain, and presentation layers.

## Architecture Structure

The new architecture follows this structure:

```
src/
├── domain/           # Domain layer with business logic and entities
├── infrastructure/   # Infrastructure layer connecting to external services
│   ├── api/          # API implementation (Hono)
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── validators/
│   ├── supabase/     # Supabase client implementations
│   └── repositories/ # Repository implementations for data access
├── presentation/     # Presentation layer with UI components
│   ├── components/   # UI components following Atomic Design
│   │   └── ui/
│   │       ├── atoms/
│   │       ├── molecules/
│   │       └── organisms/
│   └── templates/    # Page templates and layouts
└── application/      # Application layer connecting domain and presentation
```

## Migration Strategy

### 1. Component Migration

UI components are being migrated to the Atomic Design methodology in the presentation layer. Use the migration script:

```bash
node scripts/migrate-component.js --component=ComponentName --type=[atom|molecule|organism]
```

### 2. Infrastructure Layer Migration

#### Supabase Integration

The Supabase implementation has moved to the infrastructure layer:

- Old: `src/lib/supabase/*`
- New: `src/infrastructure/supabase/*`

**Usage Example:**

```typescript
// ❌ Old way
import { createClient } from "@/lib/supabase/client";

// ✅ New way
import { createClient } from "@/infrastructure/supabase/client";
```

#### Hono API Implementation

Hono API implementations have been moved to the infrastructure layer:

- Old: `src/api/hono/*`
- New: `src/infrastructure/api/*`

**Usage Example:**

```typescript
// ❌ Old way
import { supabaseMiddleware } from "@/api/hono/middleware/supabase";

// ✅ New way
import { supabaseMiddleware } from "@/infrastructure/api/middleware/supabase";
```

### 3. Repository Pattern

The repository pattern has been implemented for data access:

**Usage Example:**

```typescript
// ❌ Old way
const { data, error } = await supabase.from("users").select("*");

// ✅ New way
import { UserRepository } from "@/infrastructure/repositories/user-repository";
const userRepository = new UserRepository();
const users = await userRepository.getAll();
```

## Repository Pattern Usage

The repository pattern is now implemented throughout the codebase. Here's how to use it:

### Base Repository

The `BaseRepository` class provides a generic implementation for CRUD operations:

```typescript
import { BaseRepository } from "@/infrastructure/repositories/base-repository";

// Create a custom repository
class CustomRepository extends BaseRepository<CustomEntity> {
  constructor() {
    super("table_name");
  }

  // Add custom methods here
}
```

### Available Repositories

We have implemented the following repositories:

1. **UserProfileRepository**

   - Location: `@/infrastructure/repositories/user-profile-repository`
   - Purpose: Manage user profile data
   - Example:

     ```typescript
     import { UserProfileRepository } from "@/infrastructure/repositories/user-profile-repository";

     const profileRepo = new UserProfileRepository();
     const profile = await profileRepo.getByUserId("user-id");
     ```

2. **DocumentRepository**

   - Location: `@/infrastructure/repositories/document-repository`
   - Purpose: Manage document operations
   - Example:

     ```typescript
     import { DocumentRepository } from "@/infrastructure/repositories/document-repository";

     const documentRepo = new DocumentRepository();
     const documents = await documentRepo.getByUserId("user-id");
     ```

3. **CaseRepository**

   - Location: `@/infrastructure/repositories/case-repository`
   - Purpose: Manage case operations with related entities
   - Features:
     - Manages case assignments and timelines
     - Handles complex access control logic
     - Advanced filtering capabilities
   - Example:

     ```typescript
     import { CaseRepository } from "@/infrastructure/repositories/case-repository";

     const caseRepo = new CaseRepository();

     // Get all cases for a user including ones they're assigned to
     const cases = await caseRepo.getByUserId("user-id", {
       includeAssigned: true,
       status: ["active", "in_progress"],
     });

     // Get case with all related data
     const caseWithDetails = await caseRepo.getWithDetails("case-id");

     // Add a user to a case
     await caseRepo.assignUser("case-id", "user-id", "member");

     // Check if user has access to a case
     const hasAccess = await caseRepo.userHasAccess("case-id", "user-id", [
       "owner",
       "member",
     ]);
     ```

### Migrating from Direct Supabase Queries

**Old approach:**

```typescript
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("user_id", userId)
  .single();

if (error) throw error;
return data;
```

**New approach:**

```typescript
import { UserProfileRepository } from "@/infrastructure/repositories/user-profile-repository";

const profileRepo = new UserProfileRepository();
const profile = await profileRepo.getByUserId(userId);
return profile;
```

### Benefits of Repository Pattern

1. **Abstraction** - Hide the implementation details of data access
2. **Testability** - Easier to mock for unit tests
3. **Consistency** - Standard way to handle database operations
4. **Error Handling** - Centralized error handling
5. **Type Safety** - Better TypeScript integration

## Compatibility Layers

To ensure a smooth transition, compatibility layers have been set up at the old locations. These re-export from the new locations but are marked as deprecated.

Example of a compatibility layer:

```typescript
/**
 * @deprecated This module is deprecated. Please import from '@/infrastructure/supabase/client' instead.
 */
export * from "@/infrastructure/supabase/client";
```

## Best Practices

1. **Always use the new imports** - Update your imports to use the new infrastructure layer when making changes to files
2. **Follow the Repository Pattern** - Use repositories for data access instead of direct Supabase calls
3. **Keep Separation of Concerns** - Ensure business logic stays in the domain layer
4. **Follow Component Migration Guidelines** - Use the Atomic Design methodology for UI components

## Timeline

- Ongoing migration (see `docs/migration-progress.md` for current status)
- Deprecation notice for old imports (current phase)
- Complete removal of compatibility layers (future)

### Using the Repository Factory

For convenience, we've created a repository factory that makes it easy to access repositories throughout the application:

```typescript
import repositoryFactory from "@/infrastructure/repositories";

// Get repositories using specific methods
const profileRepo = repositoryFactory.getUserProfileRepository();
const documentRepo = repositoryFactory.getDocumentRepository();
const caseRepo = repositoryFactory.getCaseRepository();

// Or get repositories by name
const profileRepo = repositoryFactory.getRepository("userProfile");
```

You can also directly import the singleton repository instances:

```typescript
import {
  userProfileRepository,
  documentRepository,
  caseRepository,
} from "@/infrastructure/repositories";

// Use the repositories directly
const profile = await userProfileRepository.getByUserId("user-id");
```

### Creating Custom Repositories

To create a custom repository for your entity:

1. Create a new file in `src/infrastructure/repositories` for your repository
2. Extend the `BaseRepository` class
3. Register your repository with the factory if needed

Example:

```typescript
// src/infrastructure/repositories/my-entity-repository.ts
import { BaseRepository } from "@/infrastructure/repositories/base-repository";
import { Database } from "@/types/database";

export type MyEntity = Database["public"]["Tables"]["my_entities"]["Row"];

export class MyEntityRepository extends BaseRepository<MyEntity> {
  constructor() {
    super("my_entities");
  }

  // Add custom methods here
}

// src/pages/api/my-page.ts
import repositoryFactory from "@/infrastructure/repositories";
import { MyEntityRepository } from "@/infrastructure/repositories/my-entity-repository";

// Register the repository (do this on app initialization)
const myRepo = new MyEntityRepository();
repositoryFactory.registerRepository("myEntity", myRepo);

// Later, use it
const myRepo = repositoryFactory.getRepository<MyEntityRepository>("myEntity");
const entities = await myRepo.getAll();
```

## Domain Layer Implementation

The domain layer has been implemented with the following components:

### Domain Entities

Domain entities represent the core business objects of your application:

```typescript
// Example from src/domain/entities/user.ts
export class User {
  readonly id: string;
  readonly userId: string;
  // ...

  updateSettings(settings: Partial<UserSettings>): User {
    // Domain logic
  }

  // Factory method
  static fromProfile(profile: any): User {
    // Mapping logic
  }
}
```

### Domain Services

Domain services handle business logic that doesn't naturally fit within a single entity:

```typescript
// Example from src/domain/services/user-service.ts
export class UserService {
  validateUserSettings(settings: Partial<UserSettings>): Partial<UserSettings> {
    // Validation logic
  }

  sanitizeAvatarUrl(url: string): string {
    // Security logic
  }
}
```

## Application Layer Implementation

The application layer connects domain logic with infrastructure:

### Application Services

Application services coordinate operations between domain and infrastructure layers:

```typescript
// Example from src/application/user-application-service.ts
export class UserApplicationService {
  private userRepository: UserProfileRepository;
  private userService: UserService;

  async updateUserSettings(
    userId: string,
    settings: Partial<UserSettings>,
  ): Promise<User> {
    // 1. Use domain service for validation
    const validatedSettings = this.userService.validateUserSettings(settings);

    // 2. Get the domain entity
    const existingUser = await this.getUserById(userId);

    // 3. Apply domain logic
    const updatedUser = existingUser.updateSettings(validatedSettings);

    // 4. Persist through repository
    const savedProfile = await this.userRepository.update(
      existingUser.id,
      dbSettings,
    );

    // 5. Return domain entity
    return User.fromProfile(savedProfile);
  }
}
```

## API Implementation

The API layer has been reorganized using Hono:

### Validators

We now use Zod for request validation:

```typescript
// Example from src/infrastructure/api/validators/index.ts
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  type: ValidationType = "body",
) {
  return async (c: Context, next: Next) => {
    // Validation logic
  };
}
```

### Routes

API routes use the application services:

```typescript
// Example from src/infrastructure/api/routes/user-routes.ts
userRouter.patch(
  "/settings",
  zValidator("json", updateSettingsSchema),
  async (c) => {
    const user = c.get("user");
    // API controller logic
    const updatedUser = await userAppService.updateUserSettings(
      user.id,
      settings,
    );
  },
);
```

## Case Management Implementation

The migration to a DDD architecture has been extended to include case management capabilities, providing a comprehensive system for handling immigration cases.

### Domain Layer

**Case Entity**

The `Case` domain entity encapsulates all business logic related to immigration cases:

```typescript
// src/domain/entities/case.ts
export class Case {
  // Properties
  id: string;
  caseNumber: string;
  title: string;
  description: string | null;
  status: CaseStatus;
  caseType: CaseType;
  clientId: string;
  timeline: TimelineEvent[];
  assignments: CaseAssignment[];
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: Date | null;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  getUserRole(userId: string): string | null {
    /* ... */
  }
  changeStatus(newStatus: CaseStatus, userId: string, reason?: string): Case {
    /* ... */
  }
  assignUser(userId: string, role: string, assignedBy: string): Case {
    /* ... */
  }
  removeAssignment(userId: string, removedBy: string, reason?: string): Case {
    /* ... */
  }
  addTimelineEvent(event: TimelineEvent): Case {
    /* ... */
  }
  update(data: Partial<Case>, updatedBy: string): Case {
    /* ... */
  }
  toObject(): object {
    /* ... */
  }

  // Static methods for creation
  static fromDatabase(data: any): Case {
    /* ... */
  }
}
```

**Case Service**

The `CaseService` provides domain-specific operations and validations:

```typescript
// src/domain/services/case-service.ts
export class CaseService {
  generateCaseNumber(caseType: CaseType): string {
    /* ... */
  }
  isValidStatusTransition(
    currentStatus: CaseStatus,
    newStatus: CaseStatus,
  ): boolean {
    /* ... */
  }
  canPerformAction(userRole: string | null, action: string): boolean {
    /* ... */
  }
  getRequiredDocuments(caseType: CaseType): string[] {
    /* ... */
  }
  calculateCompletionPercentage(
    caseInstance: Case,
    uploadedDocuments: string[],
  ): number {
    /* ... */
  }
  createDocumentEvent(
    documentId: string,
    documentName: string,
    uploadedBy: string,
  ): TimelineEvent {
    /* ... */
  }
  estimateProcessingTime(caseType: CaseType): {
    minDays: number;
    maxDays: number;
    averageDays: number;
  } {
    /* ... */
  }
}
```

### Infrastructure Layer

**Case Repository**

The repository handles data persistence operations:

```typescript
// src/infrastructure/repositories/case-repository.ts
export class CaseRepository extends BaseRepository<Case, CaseRecord> {
  getByUserId(userId: string, options?: object): Promise<CaseRecord[]> {
    /* ... */
  }
  getWithDetails(
    caseId: string,
  ): Promise<{ case: CaseRecord; documents: any[]; messages: any[] } | null> {
    /* ... */
  }
  addDocument(caseId: string, documentId: string): Promise<void> {
    /* ... */
  }
  updateTimeline(caseId: string, timeline: any[]): Promise<void> {
    /* ... */
  }
  assignUser(caseId: string, userId: string, role: string): Promise<void> {
    /* ... */
  }
  removeAssignment(caseId: string, userId: string): Promise<void> {
    /* ... */
  }
  userHasAccess(caseId: string, userId: string): Promise<boolean> {
    /* ... */
  }
  toDomainEntity(record: CaseRecord): Case {
    /* ... */
  }
}
```

### Application Layer

**Case Application Service**

The application service coordinates between domain and infrastructure layers:

```typescript
// src/application/case-application-service.ts
export class CaseApplicationService {
  private caseService: CaseService;

  // Case retrieval methods
  async getCaseById(caseId: string, userId?: string): Promise<Case | null> {
    /* ... */
  }
  async getCasesByUser(userId: string, options?: object): Promise<Case[]> {
    /* ... */
  }
  async getCaseWithDetails(
    caseId: string,
    userId?: string,
  ): Promise<{ case: Case; documents: Document[]; messages: any[] }> {
    /* ... */
  }

  // Case management methods
  async createCase(data: object): Promise<Case> {
    /* ... */
  }
  async updateCase(
    caseId: string,
    userId: string,
    data: object,
  ): Promise<Case> {
    /* ... */
  }
  async changeStatus(
    caseId: string,
    userId: string,
    newStatus: CaseStatus,
    reason?: string,
  ): Promise<Case> {
    /* ... */
  }

  // User assignment methods
  async assignUser(
    caseId: string,
    assignedUserId: string,
    role: string,
    assignedByUserId: string,
  ): Promise<Case> {
    /* ... */
  }
  async removeAssignment(
    caseId: string,
    targetUserId: string,
    removedByUserId: string,
    reason?: string,
  ): Promise<Case> {
    /* ... */
  }

  // Document management methods
  async addDocument(
    caseId: string,
    documentId: string,
    userId: string,
  ): Promise<Case> {
    /* ... */
  }

  // Case analytics methods
  async calculateCompletionPercentage(caseId: string): Promise<number> {
    /* ... */
  }
  getRequiredDocuments(caseType: CaseType): string[] {
    /* ... */
  }
  estimateProcessingTime(caseType: CaseType): {
    minDays: number;
    maxDays: number;
    averageDays: number;
  } {
    /* ... */
  }
}
```

### API Layer

The API routes for case management provide a RESTful interface:

```typescript
// src/infrastructure/api/routes/case-routes.ts
export const caseRouter = new Hono();

// Apply middleware
caseRouter.use("*", authMiddleware());
caseRouter.use("*", requireAuth());

// Routes
caseRouter.get("/", async (c) => {
  /* List cases for a user */
});
caseRouter.get("/:id", async (c) => {
  /* Get a case by ID */
});
caseRouter.get("/:id/details", async (c) => {
  /* Get case with related details */
});
caseRouter.post("/", zValidator("json", createCaseSchema), async (c) => {
  /* Create a new case */
});
caseRouter.patch("/:id", zValidator("json", updateCaseSchema), async (c) => {
  /* Update case details */
});
caseRouter.patch(
  "/:id/status",
  zValidator("json", statusChangeSchema),
  async (c) => {
    /* Change case status */
  },
);
caseRouter.post(
  "/:id/assign",
  zValidator("json", assignUserSchema),
  async (c) => {
    /* Assign a user to a case */
  },
);
caseRouter.delete("/:id/assign/:userId", async (c) => {
  /* Remove a user assignment */
});
caseRouter.post("/:id/documents/:documentId", async (c) => {
  /* Add a document to a case */
});
caseRouter.get("/:id/completion", async (c) => {
  /* Get case completion percentage */
});
caseRouter.get("/case-types/:caseType/required-documents", async (c) => {
  /* Get required documents for a case type */
});
caseRouter.get("/case-types/:caseType/processing-time", async (c) => {
  /* Get processing time estimates */
});
```

## Subscription Rate Limiting

The DDD architecture includes enhanced subscription rate limiting for case management and document operations. We've extended the existing rate limiting system to support fine-grained control over different types of operations based on user subscription tiers.

### Rate Limit Configuration

The system defines rate limits for different resource types and subscription tiers:

```typescript
// Resource types that have separate rate limits
export enum ResourceType {
  API = "api", // General API requests
  SCRAPING = "scraping", // Web scraping requests
  VECTOR = "vector", // Vector search and embedding
  RESEARCH = "research", // Research session management
  CASE_MANAGEMENT = "case_management", // Case management operations
  DOCUMENT_UPLOAD = "document_upload", // Document upload operations
}

// Subscription tiers
export enum SubscriptionTier {
  FREE = "free",
  BASIC = "basic",
  PROFESSIONAL = "professional",
  ENTERPRISE = "enterprise",
}
```

Each combination of resource type and subscription tier has specific rate limits:

```typescript
const limits =
  SUBSCRIPTION_RATE_LIMITS[SubscriptionTier.PROFESSIONAL][
    ResourceType.CASE_MANAGEMENT
  ];
// {
//   requestsPerMinute: 200,
//   requestsPerHour: 2000,
//   requestsPerDay: 5000,
//   burstLimit: 50
// }
```

### Applying Rate Limits

Rate limits are applied at both the global and route-specific levels:

```typescript
// Global API rate limiting
api.use(
  "*",
  rateLimitMiddleware({
    ...RATE_LIMITS.DEFAULT,
    includeHeaders: true,
    errorMessage: "Global rate limit exceeded. Please try again later.",
  }),
);

// Case-specific rate limiting
caseRouter.use(
  "*",
  subscriptionRateLimit({
    resourceType: ResourceType.CASE_MANAGEMENT,
    includeHeaders: true,
    errorMessage: "Rate limit exceeded for case management operations.",
  }),
);

// Document upload-specific rate limiting
caseRouter.use(
  "/:id/documents/:documentId",
  subscriptionRateLimit({
    resourceType: ResourceType.DOCUMENT_UPLOAD,
    includeHeaders: true,
    errorMessage: "Rate limit exceeded for document uploads.",
  }),
);
```

### Rate Limit Implementation

The subscription rate limit middleware checks limits across multiple time windows:

```typescript
// Check each time window
const windows: Array<"burst" | "minute" | "hour" | "day"> = [
  "burst",
  "minute",
  "hour",
  "day",
];

// Check limits for all windows
for (const window of windows) {
  const limiter = getRatelimiter(redis, tier, resourceType, window);
  const key = `${userId}:${resourceType}:${window}`;

  // Check if limit is exceeded
  const { success, limit, reset, remaining } = await limiter.limit(key);

  // If limit exceeded, return error
  if (!success) {
    // Return appropriate error response
  }
}
```

### Backward Compatibility

To ensure backward compatibility, a compatibility layer re-exports from the new location:

```typescript
/**
 * @deprecated This module is deprecated.
 * Please import from '@/infrastructure/api/middleware/subscription-rate-limit' instead.
 */
import {
  subscriptionRateLimit,
  SUBSCRIPTION_RATE_LIMITS,
  ResourceType,
  SubscriptionTier,
} from "@/infrastructure/api/middleware/subscription-rate-limit";

// Re-export all
export {
  subscriptionRateLimit,
  SUBSCRIPTION_RATE_LIMITS,
  ResourceType,
  SubscriptionTier,
};
```

## Migration Patterns and Best Practices

From the implementations above, we can observe several patterns and best practices for migrating to DDD:

1. **Clear Layer Separation**: Each layer has distinct responsibilities:

   - Domain Layer: Core business logic and rules
   - Infrastructure Layer: Technical capabilities and persistence
   - Application Layer: Orchestration between layers
   - API Layer: Interface for external systems

2. **Domain-Centric Design**: Business rules and validation logic stay in the domain layer, keeping the core clean and focused on business needs.

3. **Rich Domain Models**: Domain entities encapsulate behavior, not just data, making the code more intuitive and aligned with business concepts.

4. **Repository Pattern**: Data access is abstracted through repositories, decoupling the domain from data storage mechanics.

5. **Application Services as Use Case Handlers**: Application services coordinate complex operations, handling the transactional and security aspects.

6. **Input Validation at the API Layer**: API routes use validation schemas to ensure data integrity before passing to application services.

7. **Permission Checking**: Authorization happens early in the process, ensuring security throughout the flow.

8. **Exception Handling**: Errors are caught and transformed into appropriate HTTP responses at the API layer, with different status codes for different error types.

## Migration Checklist

When migrating existing functionality to the new architecture, follow these steps:

1. ✅ Create or identify the domain entity
2. ✅ Implement domain services for business logic
3. ✅ Create repositories in the infrastructure layer
4. ✅ Implement application services to connect domain and infrastructure
5. ✅ Create API routes using the application services
6. ✅ Add validation schemas using Zod
7. ✅ Create compatibility layers to maintain backward compatibility
