# Import Path Updates for Next.js Restructuring

This guide shows how imports should be updated for compatibility with the new project structure.

## UI Components 

```typescript
// OLD
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// NEW
import { Button } from '@/src/_shared/ui/atoms/button'
import { Card } from '@/src/_shared/ui/atoms/card'
import { Input } from '@/src/_shared/ui/atoms/input'

// ALTERNATIVE (using index exports)
import { Button, Card, Input } from '@/src/_shared/ui'
```

## Domain Entities and Services

```typescript
// OLD
import { User } from '@/domain/entities/user'
import { UserService } from '@/domain/services/user-service'

// NEW
import { User } from '@/src/_core/auth/entities/user'
import { UserService } from '@/src/_core/auth/services/user-service'
```

## Application Services

```typescript
// OLD
import { UserApplicationService } from '@/application/user-application-service'
import { ChatService } from '@/application/services/chat-service'

// NEW
import { UserApplicationService } from '@/src/_application/services/user-application-service'
import { ChatService } from '@/src/_application/services/chat-service'
```

## Infrastructure Components

```typescript
// OLD
import { createClient } from '@/infrastructure/supabase/client'
import { rateLimitConfig } from '@/infrastructure/rate-limit/config'

// NEW
import { createClient } from '@/src/_infrastructure/supabase/client'
import { rateLimitConfig } from '@/src/_infrastructure/rate-limit/config'
```

## Hooks

```typescript
// OLD
import { useUser } from '@/hooks/useUser'
import { useChat } from '@/hooks/useChat'
import { useDebounce } from '@/hooks/use-debounce'

// NEW
import { useUser } from '@/src/_core/auth/hooks/useUser'
import { useChat } from '@/src/_core/chat/hooks/useChat'
import { useDebounce } from '@/src/_shared/hooks/use-debounce'
```

## Special Note on Supabase Configuration

When updating the Supabase infrastructure components, remember to maintain the shadow_port configuration change from 54320 to 54800 in config.toml to prevent Windows port conflicts.
