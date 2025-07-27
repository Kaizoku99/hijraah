# Hijraah Internationalization (i18n) Guide

This document provides guidelines for working with internationalization in the Hijraah platform.

## Overview

Hijraah uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization, providing a complete solution for handling translations, date/time formatting, number formatting, and pluralization.

### Supported Languages

Currently, the platform supports the following languages:

- English (en) - Default
- Arabic (ar) - Right-to-left
- French (fr)
- Spanish (es)

## File Structure

Translation files are organized in a structured way:

```
src/
├── translations/  # Main translation files (merged from all sources)
│   ├── en.json
│   ├── ar.json
│   ├── fr.json
│   └── es.json
├── messages/      # Component-specific translations
│   ├── en.json    # Complete English translations
│   ├── ar.json
│   ├── fr.json
│   └── es.json
└── locales/       # API and backend translations
    ├── en.json
    ├── ar.json
    └── ...
```

## Usage in Components

### Basic Translation

```tsx
"use client";
import { useTranslations } from "@/hooks/use-translations";

export function MyComponent() {
  const { t } = useTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

### With Variables

```tsx
"use client";
import { useTranslations } from "@/hooks/use-translations";

export function Greeting({ name }: { name: string }) {
  const { t } = useTranslations("greetings");

  return <p>{t("welcome", { name })}</p>;
}
```

### Formatting

```tsx
"use client";
import { useTranslations } from "@/hooks/use-translations";

export function ProductPrice({ price }: { price: number }) {
  const { formatCurrency } = useTranslations();

  return <p>{formatCurrency(price, "USD")}</p>;
}
```

### Date Formatting

```tsx
"use client";
import { useTranslations } from "@/hooks/use-translations";

export function EventDate({ date }: { date: Date }) {
  const { formatDate } = useTranslations();

  return <p>{formatDate(date, { dateStyle: "full" })}</p>;
}
```

## Adding New Translations

1. Always add new translations to the English (`en.json`) file first
2. Use a structured, nested organization for translations
3. Group translations by feature or module
4. Use consistent naming conventions
5. Run the merge script to combine translations: `npm run i18n:merge`
6. Export missing translations: `npm run i18n:export-all`

## Translation Format

```json
{
  "common": {
    "welcome": "Welcome to Hijraah",
    "tagline": "Local Dreams, Global Horizons"
  },
  "auth": {
    "login": {
      "title": "Welcome back",
      "submitButton": "Sign in",
      "forgotPassword": "Forgot password?"
    }
  }
}
```

## Variable Substitution

Use `{{variableName}}` syntax for variables:

```json
{
  "greeting": "Hello, {{name}}!",
  "balance": "Your balance is {{amount}}"
}
```

## Pluralization

```json
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}
```

## Available Scripts

- `npm run i18n:check` - Validate translations for completeness
- `npm run i18n:export-all` - Export missing translations for all languages
- `npm run i18n:extract` - Extract translations from source code
- `npm run i18n:merge` - Merge translations from all sources
- `npm run i18n:build` - Merge and verify translations
- `npm run i18n:sync` - Sync translations with Languine
- `npm run i18n:translate` - Auto-translate missing keys

## RTL Support

Arabic is a right-to-left (RTL) language. The application handles RTL automatically based on the locale:

- `dir` attribute is set on the `<html>` element
- CSS logical properties are used for layout
- UI layouts are mirrored for RTL languages

## Debugging

If translations are not working correctly:

1. Check that the translation key exists in the JSON file
2. Ensure you're using the correct namespace
3. Verify that variables are correctly passed
4. Run `npm run i18n:check` to see missing translations
5. Check the browser console for warnings about missing translations

## Best Practices

1. Never hardcode strings in components
2. Always use the translation hook
3. Keep translations organized by feature
4. Use namespaces for better organization
5. Avoid string concatenation for translations
6. Test UI with different languages
7. Test RTL layout with Arabic
8. Be mindful of text length in different languages
9. Use variables for all dynamic content
10. Document new translation namespaces
