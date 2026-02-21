
# Project Structure

## Directory Organization

```
/app                          # Next.js App Router
  /landing                    # Landing page module
    /_components              # Landing-specific components
      HeroStroke.tsx          # Animated SVG path hero section
      SnapScrollSection.tsx   # Snap-scroll number animations
      FourAdvisorsSection.tsx # AI agents showcase
      WhyChooseUs.tsx         # Feature highlights
      Testimonials.tsx        # Social proof section
      FinalCTA.tsx            # Final call-to-action
    page.tsx                  # Landing page composition
  
  /products                   # Product pages
    /biq, /inova, /taskease   # Individual product pages
  
  /resources                  # Resources section
    /blog                     # Blog with dynamic routes
    /documentation            # Documentation with categories
    /api                      # API documentation
  
  /careers                    # Careers section with job listings
  /contact                    # Contact page
  /support                    # Support center
  /pricing                    # Pricing page
  /legal                      # Legal pages (privacy, terms, compliance)
  
  /_components                # Shared app components
    /shared                   # Reusable shared components
      ContentSection.tsx      # Standard content sections
      PageHero.tsx            # Page hero component
      ErrorBoundary.tsx       # Error handling
      LoadingSkeleton.tsx     # Loading states
      StructuredData.tsx      # SEO structured data
    Squares.tsx               # Animated background grid
    StickyHeader.tsx          # Navigation header
    CardNav.tsx               # Card navigation component
  
  layout.tsx                  # Root layout with metadata
  page.tsx                    # Home page
  globals.css                 # Global styles
  card-nav.css                # Card navigation styles
  error.tsx                   # Error page
  not-found.tsx               # 404 page
  robots.ts                   # Robots.txt generation
  sitemap.ts                  # Sitemap generation

/components                   # Reusable components
  /blocks                     # Complex component blocks
  /ui                         # UI primitives and demos

/lib                          # Utilities and helpers
  /contexts                   # React contexts (LanguageContext)
  /hooks                      # Custom hooks (useFetchWithRetry)
  /seo                        # SEO utilities (metadata)
  /translations               # Translation utilities
  /utils                      # Utility functions (formSubmission)
  utils.ts                    # cn() utility for class merging

/hooks                        # Additional hooks
  use-media-query.ts          # Media query hook

/public                       # Static assets
  logo.svg, logo.png          # Brand assets
  favicon.ico                 # Site favicon
  llm.txt, llms.txt           # LLM-readable site info

/Docs                         # Project documentation
  Main Vision.md              # Complete design vision
  product.md                  # Product overview
  tech.md                     # Tech stack details
  structure.md                # Project structure
  [other design docs]         # Additional references

/.kiro                        # Kiro configuration
  /specs                      # Feature specifications
  /steering                   # Steering rules
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroStroke.tsx`, `SnapScrollSection.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `formSubmission.ts`)
- **Pages**: lowercase Next.js conventions (`page.tsx`, `layout.tsx`)
- **CSS files**: kebab-case (e.g., `card-nav.css`, `globals.css`)
- **Data files**: camelCase with `.ts` extension (e.g., `jobs.ts`, `blogs.ts`)

## Component Patterns

### Client vs Server Components
- **Client Components**: Mark with `"use client"` directive at top of file
  - Use for: interactivity, animations, hooks, browser APIs
- **Server Components**: Default (no directive needed)
  - Use for: static content, data fetching, SEO

### Component Structure
```typescript
"use client"; // Only if needed

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComponentProps {
  language?: "en" | "fa";
  className?: string;
}

export default function Component({ language = "fa", className }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  const ref = useRef<HTMLDivElement>(null);
  
  // Animation setup
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <div ref={ref} className={cn("base-classes", className)}>
      {/* Content */}
    </div>
  );
}
```

## Animation Patterns

- **Scroll-triggered**: Use `useScroll` with offset configuration
- **Smooth easing**: Use `useSpring` for natural motion
- **Viewport detection**: Use `useInView` from `react-intersection-observer`
- **SVG animations**: Use `pathLength` and `strokeDashoffset`
- **Number animations**: Use `@number-flow/react` or Framer Motion's `animate()`

## Styling Patterns

- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Tailwind utility classes for all styling
- CSS variables for theme colors (e.g., `var(--landing-primary)`)
- Glass morphism: `backdrop-blur-md`, `backdrop-blur-xl`
- Glow effects: `shadow-[0_0_20px_rgba(...)]` and `drop-shadow-[...]`
- Gradients: `bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-300`

## Bilingual Support

- Language state managed at page level: `useState<"en" | "fa">("fa")`
- Pass language prop to child components
- Use `dir="rtl"` for Persian content
- Vazirmatn font automatically applied for Persian text via `[dir="rtl"]` selector
- All user-facing content should support both English and Persian

## Data Management

- Static data stored in `_data` folders within feature directories
- Type definitions in separate `.ts` files or co-located with components
- Use TypeScript interfaces for all data structures

## Performance Considerations

- Lazy load sections below the fold with `React.lazy()` and `Suspense`
- Use `useInView` to conditionally render expensive animations
- Optimize SVG paths and reduce complexity where possible
- Use `will-change` CSS property for animated elements
- Preload critical fonts and assets

## Accessibility

- Skip to main content link in root layout
- WCAG AA compliant color contrast ratios
- Focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support

