# Shared Infrastructure Documentation

This document describes the shared infrastructure and components created for the Karanova standalone pages.

## Overview

The shared infrastructure provides:
- **Language Context**: Bilingual support (English/Persian) with persistent language preference
- **Translation System**: Centralized translation management with nested key support
- **Shared Components**: Reusable page components (PageHero, ContentSection, PageCTA)
- **SEO Utilities**: Metadata generation and structured data helpers

## Directory Structure

```
lib/
├── contexts/
│   └── LanguageContext.tsx       # Language state management
├── translations/
│   └── index.ts                  # Translation definitions and utilities
└── seo/
    └── metadata.ts               # SEO metadata utilities

app/
└── _components/
    └── shared/
        ├── PageHero.tsx          # Hero section component
        ├── ContentSection.tsx    # Content wrapper component
        ├── PageCTA.tsx           # Call-to-action component
        ├── index.ts              # Exports
        └── README.md             # Component documentation
```

## Language Context

### Setup

The `LanguageProvider` is already integrated into the root layout (`app/layout.tsx`).

### Usage

```tsx
import { useLanguage } from "@/lib/contexts/LanguageContext";

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div dir={language === "fa" ? "rtl" : "ltr"}>
      <h1>{t("common.title")}</h1>
      <button onClick={() => setLanguage(language === "en" ? "fa" : "en")}>
        Switch Language
      </button>
    </div>
  );
}
```

### Features

- **Persistent Storage**: Language preference is saved to localStorage
- **Automatic Loading**: Preference is restored on page load
- **Translation Function**: `t(key)` function for accessing translations
- **Type Safety**: TypeScript support for language values

## Translation System

### Structure

Translations are organized hierarchically:

```typescript
translations = {
  en: {
    common: { ... },
    nav: { ... },
    footer: { ... }
  },
  fa: { ... }
}
```

### Adding Translations

Edit `lib/translations/index.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  en: {
    about: {
      title: "About Karanova",
      mission: "Our Mission",
      // ...
    }
  },
  fa: {
    about: {
      title: "درباره کارانوا",
      mission: "ماموریت ما",
      // ...
    }
  }
};
```

### Accessing Translations

```typescript
// Using the hook
const { t } = useLanguage();
t("common.readMore"); // Returns "Read More" or "بیشتر بخوانید"

// Direct access
import { getTranslation } from "@/lib/translations";
getTranslation("en", "common.readMore"); // Returns "Read More"
```

## Shared Components

### PageHero

Hero section for page headers with animations and optional CTA.

**Props:**
- `title` (required): Main heading text
- `subtitle` (optional): Subheading text
- `breadcrumbs` (optional): Navigation breadcrumbs
- `showCTA` (optional): Show call-to-action button
- `ctaText` (optional): CTA button text
- `ctaHref` (optional): CTA button link
- `backgroundVariant` (optional): "default" | "gradient" | "animated"

**Example:**
```tsx
<PageHero
  title="About Karanova"
  subtitle="Learn about our mission and vision"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" }
  ]}
  backgroundVariant="gradient"
/>
```

### ContentSection

Wrapper for content sections with consistent spacing and animations.

**Props:**
- `children` (required): Section content
- `variant` (optional): "default" | "glass" | "bordered"
- `maxWidth` (optional): "sm" | "md" | "lg" | "xl" | "full"
- `animate` (optional): Enable scroll animations (default: true)
- `className` (optional): Additional CSS classes

**Example:**
```tsx
<ContentSection variant="glass" maxWidth="lg">
  <h2>Section Title</h2>
  <p>Section content...</p>
</ContentSection>
```

### PageCTA

Call-to-action section for conversions.

**Props:**
- `title` (required): CTA heading
- `description` (required): CTA description
- `primaryButton` (required): Primary button config
- `secondaryButton` (optional): Secondary button config
- `variant` (optional): "default" | "minimal" | "full-width"

**Example:**
```tsx
<PageCTA
  title="Ready to Get Started?"
  description="Join thousands of businesses using Karanova"
  primaryButton={{
    text: "Start Free Trial",
    href: "/signup"
  }}
  secondaryButton={{
    text: "Contact Sales",
    href: "/contact"
  }}
/>
```

## SEO Utilities

### Page Metadata

Generate comprehensive metadata for any page:

```tsx
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "About Us",
  description: "Learn about Karanova's mission and vision",
  keywords: ["about", "company", "mission"],
  canonical: "https://karanova.io/about",
  language: "en"
});
```

### Blog Metadata

Generate metadata for blog posts:

```tsx
import { generateBlogMetadata } from "@/lib/seo/metadata";

export const metadata = generateBlogMetadata({
  title: "How to Improve Project Management",
  description: "Learn best practices for project management",
  author: "John Doe",
  publishedDate: new Date("2024-01-15"),
  tags: ["project management", "productivity"],
  featuredImage: "/blog/project-management.jpg"
});
```

### Structured Data

Generate JSON-LD structured data:

```tsx
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from "@/lib/seo/metadata";

// Organization schema
const orgSchema = generateOrganizationSchema();

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://karanova.io" },
  { name: "About", url: "https://karanova.io/about" }
]);

// FAQ schema
const faqSchema = generateFAQSchema([
  { question: "What is Karanova?", answer: "..." }
]);
```

## Testing

A test page is available at `/test-shared` to verify all components work correctly.

Visit `http://localhost:3000/test-shared` during development to see:
- PageHero with breadcrumbs and CTA
- ContentSection variants (default, glass, bordered)
- Translation system in action
- Language switching functionality
- PageCTA component

## Best Practices

### Language Support

1. Always wrap content in a div with `dir` attribute:
   ```tsx
   <div dir={language === "fa" ? "rtl" : "ltr"}>
     {content}
   </div>
   ```

2. Use the translation function for all user-facing text:
   ```tsx
   {t("common.readMore")}
   ```

3. Add translations for both languages when adding new content

### Component Usage

1. Use `PageHero` at the top of every standalone page
2. Wrap content in `ContentSection` for consistent spacing
3. Add `PageCTA` at the bottom of pages for conversions
4. Use appropriate `maxWidth` values for readability

### SEO

1. Generate metadata for every page using `generatePageMetadata`
2. Include relevant keywords for each page
3. Add structured data where applicable (breadcrumbs, FAQs, etc.)
4. Set canonical URLs to avoid duplicate content issues

## Requirements Validation

This implementation satisfies the following requirements:

- **Requirement 1.4**: Bilingual content support with language switching
- **Requirement 12.5**: Language preference persistence across navigation
- **Requirement 15.1**: Semantic HTML structure with proper ARIA labels

## Next Steps

When implementing standalone pages:

1. Import shared components from `@/app/_components/shared`
2. Use `useLanguage()` hook for language-aware content
3. Generate metadata using SEO utilities
4. Follow the component patterns demonstrated in `/test-shared`
5. Add page-specific translations to `lib/translations/index.ts`
