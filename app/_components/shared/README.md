# Shared Components

This directory contains reusable components for all standalone pages.

## Components

### PageHero

A hero section component for page headers with breadcrumbs, title, subtitle, and optional CTA.

**Usage:**
```tsx
import { PageHero } from "@/app/_components/shared";

<PageHero
  title="About Karanova"
  subtitle="Learn about our mission and vision"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" }
  ]}
  showCTA
  ctaText="Get Started"
  ctaHref="/contact"
  backgroundVariant="gradient"
/>
```

### ContentSection

A wrapper component for content sections with consistent spacing, animations, and optional glass morphism styling.

**Usage:**
```tsx
import { ContentSection } from "@/app/_components/shared";

<ContentSection variant="glass" maxWidth="lg" animate>
  <h2>Section Title</h2>
  <p>Section content...</p>
</ContentSection>
```

### PageCTA

A call-to-action section for page conversions with primary and optional secondary buttons.

**Usage:**
```tsx
import { PageCTA } from "@/app/_components/shared";

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
  variant="default"
/>
```

## Language Context

Use the `LanguageProvider` and `useLanguage` hook for bilingual support:

```tsx
import { useLanguage } from "@/lib/contexts/LanguageContext";

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div dir={language === "fa" ? "rtl" : "ltr"}>
      <h1>{t("common.title")}</h1>
      <button onClick={() => setLanguage(language === "en" ? "fa" : "en")}>
        {language === "en" ? "فارسی" : "English"}
      </button>
    </div>
  );
}
```

## SEO Utilities

Use the metadata utilities for consistent SEO across pages:

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
