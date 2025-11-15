# Technology Stack

## Framework & Runtime

- **Next.js 16** with App Router and React 19
- **TypeScript** 5.6+ with strict mode enabled
- **React Compiler** enabled for optimization
- **Node.js** ≥20.9.0

## Package Manager

- **pnpm** - All dependency management uses pnpm

## Core Libraries

- **Tailwind CSS** - Utility-first styling with custom theme
- **Framer Motion** - Scroll-triggered animations, parallax effects, and transitions
- **@number-flow/react** - Animated number transitions
- **GSAP** - Advanced animation sequences
- **Lucide React** - Icon library
- **React Icons** - Additional icon set
- **react-intersection-observer** - Scroll-based viewport detection
- **clsx** + **tailwind-merge** - Conditional class management via `cn()` utility

## Styling Conventions

- Custom CSS variables for theming (e.g., `var(--landing-primary)`)
- Brand colors: Teal (`hsl(177, 100%, 35%)`), Cyan (`hsl(190, 95%, 42%)`)
- Yekan font for Persian text (loaded via `localFont`)
- RTL support via `dir="rtl"` attribute
- Glass morphism effects with backdrop-blur
- Glow effects using box-shadow and drop-shadow filters

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)

# Building
pnpm build            # Production build
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint (next/core-web-vitals)
```

## Environment

- Development server runs on `http://localhost:3000`
- ESLint config extends `next/core-web-vitals`
- PostCSS with Autoprefixer for CSS processing
