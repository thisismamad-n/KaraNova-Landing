# Technology Stack

## Framework & Runtime

- **Next.js 16.0.10** with App Router and React 19
- **TypeScript 5.6+** with strict mode enabled
- **React Compiler** enabled for optimization (`reactCompiler: true`)
- **Node.js** ≥20.9.0

## Package Manager

- **Bun** - All dependency management uses Bun exclusively (latest version)

## Core Libraries

### UI & Styling
- **Tailwind CSS** - Utility-first styling with custom theme
- **clsx** + **tailwind-merge** - Conditional class management via `cn()` utility from `lib/utils.ts`
- **Radix UI** - Accessible component primitives (Label, Switch, Tooltip)
- **class-variance-authority** - Component variant management

### Animations
- **Framer Motion** - Scroll-triggered animations, parallax effects, transitions
- **GSAP** - Advanced animation sequences
- **@number-flow/react** - Animated number transitions
- **react-intersection-observer** - Scroll-based viewport detection

### Content & Media
- **Lucide React** - Primary icon library
- **React Icons** - Additional icon set
- **react-markdown** - Markdown rendering
- **rehype-highlight** + **highlight.js** - Code syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown support

### 3D & Effects
- **Three.js** - 3D graphics and animations
- **canvas-confetti** - Celebration effects

### Validation
- **Zod** - Schema validation

## Common Commands

```bash
# Development
bun dev              # Start dev server (localhost:3000)

# Building
bun build            # Production build
bun start            # Start production server

# Linting
bun lint             # Run ESLint (next/core-web-vitals + security plugins)

# Dependency Management
bun install          # Install dependencies
bun add <package>    # Add a package
bun remove <package> # Remove a package
bun update           # Update dependencies
```

## Configuration

- **ESLint**: Extends `next/core-web-vitals` with security and accessibility plugins
- **PostCSS**: Autoprefixer for CSS processing
- **Path Aliases**: `@/*` maps to workspace root
- **Image Optimization**: Remote patterns configured for Unsplash

## Styling Conventions

- Custom CSS variables for theming (e.g., `var(--landing-primary)`)
- Brand colors: Teal (`hsl(177, 70%, 40%)`), Cyan (`hsl(185, 85%, 45%)`)
- Vazirmatn font for Persian text (loaded via Google Fonts)
- Inter font for English text
- RTL support via `dir="rtl"` attribute
- Glass morphism effects with `backdrop-blur`
- Glow effects using `box-shadow` and `drop-shadow` filters
- WCAG AA compliant color contrast ratios

## Performance Optimizations

- React Compiler enabled for automatic optimization
- Lazy loading with `React.lazy()` and `Suspense`
- Image optimization via Next.js Image component
- Conditional rendering based on viewport visibility (`useInView`)
