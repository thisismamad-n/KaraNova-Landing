# Project Structure

## Directory Organization

```
/app                          # Next.js App Router
  /landing                    # Landing page module
    /_components              # Landing-specific components
      HeroStroke.tsx          # Animated SVG path hero section
      SnapScrollSection.tsx   # Snap-scroll number animations
      AIAgents.tsx            # AI agents showcase
      FeatureGrid.tsx         # Feature grid with scroll reveals
      Testimonials.tsx        # Social proof section
      Pricing.tsx             # Pricing tiers
      InteractiveDemo.tsx     # Interactive demo
      FAQ.tsx                 # FAQ accordion
      FinalCTA.tsx            # Final call-to-action
    page.tsx                  # Landing page composition
  /_components                # Shared app components
    Squares.tsx               # Animated background grid
    StickyHeader.tsx          # Navigation header
  layout.tsx                  # Root layout with metadata
  page.tsx                    # Home page (redirects to landing)
  globals.css                 # Global styles
  card-nav.css                # Card navigation styles

/components                   # Reusable components
  /blocks                     # Complex component blocks
  /ui                         # UI primitives and demos

/lib                          # Utilities and helpers
  utils.ts                    # cn() utility for class merging

/public                       # Static assets
  logo.svg, logo.png          # Brand assets
  favicon.ico                 # Site favicon

/Docs                         # Project documentation
  Main Vision.md              # Complete design vision
  product.md                  # Product overview
  tech.md                     # Tech stack details
  structure.md                # Project structure
  [other design docs]         # Additional references
```

## File Naming Conventions

- Components: PascalCase (e.g., `HeroStroke.tsx`, `SnapScrollSection.tsx`)
- Utilities: kebab-case (e.g., `utils.ts`)
- Pages: lowercase Next.js conventions (`page.tsx`, `layout.tsx`)
- CSS files: kebab-case (e.g., `card-nav.css`)

## Component Patterns

- **Client Components**: Mark with `"use client"` directive at top of file
- **Server Components**: Default (no directive needed)
- **Animations**: Use Framer Motion hooks (`useScroll`, `useTransform`, `useSpring`, `useInView`)
- **Refs**: Use `useRef` for DOM element references and scroll tracking
- **State**: Use `useState` for component-specific state

## Animation Patterns

- Scroll-triggered animations using `useScroll` with offset configuration
- Smooth easing with `useSpring` for natural motion
- Viewport detection with `useInView` from `react-intersection-observer`
- SVG path animations using `pathLength` and `strokeDashoffset`
- Number animations with `@number-flow/react` and Framer Motion's `animate()`

## Styling Patterns

- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Tailwind utility classes for all styling
- CSS variables for theme colors (e.g., `var(--landing-primary)`)
- Backdrop blur for glass morphism: `backdrop-blur-md`, `backdrop-blur-xl`
- Glow effects: `shadow-[0_0_20px_rgba(...)]` and `drop-shadow-[...]`
- Gradients: `bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-300`

## Bilingual Support

- Language state managed at page level: `useState<"en" | "fa">("en")`
- Pass language prop to child components
- Use `dir="rtl"` for Persian content
- Yekan font automatically applied for Persian text
- All copy should support both English and Persian

## Performance Considerations

- Lazy load sections below the fold
- Use `isInView` to conditionally render expensive animations
- Optimize SVG paths and reduce complexity where possible
- Use `will-change` CSS property for animated elements
- Preload critical fonts and assets
