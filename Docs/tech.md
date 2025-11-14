# Technology Stack

## Framework & Runtime

- **Next.js 16** (App Router with React 19)
- **Node.js** ≥20.9.0
- **TypeScript** 5.5+ with strict mode
- **React Compiler** enabled for optimization

## Core Libraries

- **Supabase** - PostgreSQL database, authentication, real-time subscriptions
- **@supabase/ssr** - Server-side rendering with cookie-based auth
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling with custom theme
- **shadcn/ui** - Component library built on Radix + Tailwind
- **Framer Motion** - Animations
- **Zod** - Schema validation
- **React Hook Form** - Form management

## AI Integration

- **Google Gemini API** (@google/generative-ai) - All AI agents use Gemini models
- Default model: `gemini-2.0-flash` (configurable per agent)
- System prompts stored in `.Prompts/` directory

## UI Components

- **@dnd-kit** - Drag and drop (Kanban boards)
- **Recharts** - Data visualization
- **React Big Calendar** - Calendar views
- **React Calendar Timeline** - Gantt-style timelines
- **Lucide React** - Icon library
- **date-fns-jalali** - Persian calendar support

## Development Tools

- **pnpm** - Package manager
- **ESLint 9** with security plugin
- **Vitest** - Testing framework
- **PostHog** - Analytics and feature flags
- **Vercel Analytics & Speed Insights**

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)

# Building
pnpm build            # Production build
pnpm start            # Start production server

# Testing
pnpm test             # Run tests once
pnpm test:watch       # Run tests in watch mode

# Validation
pnpm lint             # Run ESLint
pnpm validate:next16  # Validate Next.js 16 compatibility
pnpm smoke-test       # Run smoke tests
pnpm verify:oauth     # Verify OAuth setup

# Supabase (requires supabase CLI)
supabase start        # Start local Supabase
supabase db reset     # Reset local database
supabase migration new <name>  # Create new migration
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

## Build Configuration

- CSP headers configured for security (stricter in production)
- Image optimization disabled (`unoptimized: true`)
- PostHog proxy via rewrites for `/ingest/*`
- React Compiler enabled
- Experimental stale times: dynamic 30s, static 180s
