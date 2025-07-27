# Internationalization (i18n) Structure

This document describes the internationalization (i18n) structure in the Hijraah project after the restructuring and deduplication process.

## Directory Structure

The i18n system is organized as follows:

```
src/
├── i18n/                  # Root-level required by next-intl
│   ├── index.ts           # Barrel exports for easy imports
│   ├── navigation.ts      # Next.js navigation utilities for i18n
│   └── request.ts         # Request config for next-intl server
│
├── _shared/
│   ├── i18n/              # Shared i18n components and utilities
│   │   ├── i18n.ts        # Core i18n configuration (locales, etc.)
│   │   ├── i18n.config.ts # General i18n configuration
│   │   └── locale.ts      # Locale-specific utilities
│   │
│   └── hooks/
│       ├── use-locale.ts  # Hook for accessing current locale
│       └── use-translations.ts # Enhanced translation hook
│
├── _infrastructure/
│   └── middleware/
│       └── middleware-i18n.ts # i18n middleware for locale detection
│
├── messages/              # Translation message files
│   ├── en.json
│   ├── ar.json
│   ├── fr.json
│   └── es.json
│
└── translations/          # Additional translations (optional)
    ├── en.json
    └── ... other locales
```

## File Responsibilities

- **src/i18n/request.ts**: The entry point for next-intl server, responsible for loading translations and providing date/number formatting configuration.
- **src/i18n/navigation.ts**: Provides navigation utilities (Link, useRouter, etc.) with i18n support.
- **src/\_shared/i18n/i18n.ts**: Core i18n configuration, defining supported locales and their properties.
- **src/\_infrastructure/middleware/middleware-i18n.ts**: Middleware for detecting and handling user locale preferences.

## Usage in Components

```tsx
// Import from shared hooks
import { useTranslations } from "@/_shared/hooks/use-translations";
import { useLocale } from "@/_shared/hooks/use-locale";

// In components
const MyComponent = () => {
  const t = useTranslations("namespace");
  const locale = useLocale();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description", { count: 5 })}</p>
      <span>Current locale: {locale}</span>
    </div>
  );
};
```

## Navigation with i18n

```tsx
// Import Link and router from i18n navigation
import { Link, useRouter } from "@/i18n/navigation";

// In components
const MyComponent = () => {
  const router = useRouter();

  return (
    <div>
      <Link href="/dashboard">Go to dashboard</Link>
      <button onClick={() => router.push("/profile")}>Go to profile</button>
    </div>
  );
};
```

## Adding New Languages

1. Add the new locale to the `locales` array in `src/_shared/i18n/i18n.ts`
2. Add locale configuration to the `localeConfigs` object
3. Create a new translation file in `messages/{locale}.json`
4. Update any middleware configuration if needed

## Technical Design

The i18n system follows a hybrid approach:

- Core translations and configuration are in the shared layer (`_shared/i18n`)
- Next-intl required files are in the root-level `i18n` directory
- Navigation utilities provide typesafe i18n route handling
- Middleware automatically detects and redirects based on user locale preferences

This structure allows for:

1. Clean separation of concerns
2. Compatibility with Next.js best practices
3. Type-safe i18n with IDE support
4. Performance optimizations through code splitting
