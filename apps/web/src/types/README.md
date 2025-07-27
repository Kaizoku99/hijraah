# Types System

This directory serves as the **single source of truth** for all types in the Hijraah application.

## Organization

- `index.ts` - The main barrel file that exports all types
- `api.ts` - API related types including Hono context types
- `artifact.ts` - Types related to artifacts (documents, code, etc.)
- `auth.ts` - Authentication and authorization types
- `cases.ts` - Case management types
- `chat.ts` - Chat and messaging types
- `components.ts` - UI component types
- `monitoring.ts` - Monitoring and logging types
- `research.ts` - Research and data analysis types
- `supabase.ts` - Generated Supabase database types
- `domain/` - Domain-specific types organized by subdomain

## Usage Guidelines

1. **Always import types from this directory**:

   ```typescript
   import { UserRole, ChatMessage, Artifact } from "@/types";
   ```

2. **Avoid creating new type files outside this directory**:
   If you need new types, add them to the appropriate file here.

3. **Maintain backward compatibility**:
   When moving types from component files, add re-exports in the original location with deprecated comments.

4. **Naming conventions**:

   - Use PascalCase for interfaces and type aliases
   - Use camelCase for type properties
   - Use PascalCase for enums and UPPER_CASE for enum values
   - Use descriptive names that reflect the domain

5. **Documentation**:
   - Add JSDoc comments to all types
   - Include example usage for complex types
   - Document constraints and relationships

## Adding New Types

When adding new types:

1. Place the type in the appropriate file (e.g., chat-related types go in `chat.ts`)
2. Export the type from `index.ts`
3. Use descriptive names and add documentation
4. Consider relationships with existing types

## Legacy Types

Some components may still define their own types locally. These should be gradually migrated to this central location. When migrating:

1. Move the type definition to the appropriate file here
2. Add a re-export in the original location with a `@deprecated` comment
3. Update imports in other files to point to `@/types`

## Stream Data Types

The application uses two related types for handling streaming data:

1. **DataStreamDelta** - The standardized type used in the centralized type system. It has a strictly typed `type` field and is preferred for new code.

2. **StreamDataPoint** - A legacy type used in some UI components. It's more permissive with a string `type` field.

### Adapter Pattern

When integrating these two types, we use an adapter pattern to convert between them. For example, in `UnifiedChatContainer.tsx`, we use the `adaptStreamPointToDelta` function to convert UI-specific event types to the standardized format.

```typescript
function adaptStreamPointToDelta(point: StreamDataPoint): DataStreamDelta {
  const typeMap = {
    artifact_kind: "kind",
    artifact_id: "id",
    // ...
  };

  return {
    type: typeMap[point.type] || "text-delta",
    content: point.content,
  };
}
```

This maintains backward compatibility while allowing us to move toward a more type-safe system.

### Migration Plan

Long term, the `StreamDataPoint` type will be deprecated in favor of `DataStreamDelta`. New code should use `DataStreamDelta` exclusively.
