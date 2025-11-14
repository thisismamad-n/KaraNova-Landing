# Project Structure

## Directory Organization

```
/app                    # Next.js App Router pages
  /(chat)              # Chat interface routes
  /api                 # API route handlers
  /auth                # Authentication pages
  /biq                 # BIQ Dashboard module
  /inova               # Inova AI agents module
  /taskease            # TaskEase project management
    /[orgId]           # Organization-scoped routes
      /teams/[teamId]  # Team-scoped routes
        /projects/[projectId]  # Project-scoped routes

/components            # React components
  /agents             # AI agent UI components
  /auth               # Authentication components
  /chat               # Chat interface components
  /dashboard          # Dashboard widgets
  /inova              # Inova-specific components
  /organizations      # Organization management
  /taskease           # TaskEase components
  /teams              # Team management
  /ui                 # Shared UI primitives (shadcn)

/lib                   # Core utilities and services
  /analytics          # Analytics integration
  /i18n               # Internationalization
  /logging            # Logging utilities
  /performance        # Performance monitoring
  /roadmap            # Roadmap utilities
  /security           # Security utilities
  /validation         # Validation schemas

/services              # Business logic layer
  ai-provider.ts      # AI service abstraction
  bhc.ts              # Business Health Check
  chat-storage.ts     # Chat persistence
  knowledge-base.ts   # RAG/document processing
  kpi.ts              # KPI calculations

/context               # React Context providers
  auth-provider.tsx   # Authentication state
  chat-provider.tsx   # Chat state management
  language-context.tsx # i18n state
  notifications-provider.tsx

/hooks                 # Custom React hooks
  use-permission.ts   # Permission checking
  use-user.ts         # User data
  use-chatbot.ts      # Chatbot integration

/types                 # TypeScript type definitions
  supabase.ts         # Generated DB types
  dashboard.ts        # Dashboard types
  inova.ts            # Inova types
  chatbot.ts          # Chat types

/constants             # Application constants
  permissions.ts      # Permission keys
  system-prompt.ts    # AI system prompts
  llmPlans.ts         # LLM pricing/plans

/supabase              # Supabase configuration
  /migrations         # Database migrations
  /functions          # Edge functions
  /sql                # SQL scripts

/telegram-bot          # Telegram bot (separate Cloudflare Worker)

/.contexxt             # Context files (schemas, function definitions)
/.Prompts              # AI agent system prompts
/.Ref                  # Reference documentation
```

## Key Conventions

### File Naming
- Components: PascalCase (e.g., `TaskCard.tsx`)
- Utilities/services: kebab-case (e.g., `supabase-server.ts`)
- Pages: lowercase with Next.js conventions (`page.tsx`, `layout.tsx`)
- Types: kebab-case (e.g., `data-table.ts`)

### Component Patterns
- Server Components by default (no "use client" unless needed)
- Client Components marked with `"use client"` directive
- Async Server Components for data fetching
- Cookie-based auth via `createServerClientFromCookies()`

### Data Fetching
- Server Components: Direct Supabase queries
- Client Components: Use `createClient()` from `@/lib/supabase`
- API routes: Use `createServerClientFromCookies()` with `allowSetCookie: true`
- Avoid mutations in read-only contexts (streaming responses)

### Styling
- Tailwind utility classes
- CSS variables for theming (`hsl(var(--primary))`)
- RTL support via `dir="rtl"` on `<html>`
- Custom theme colors: `theme-bg-*`, `theme-text-*`, `theme-accent-*`
- Persian font: Yekan (loaded via `localFont`)

### Authentication
- Supabase Auth with cookie-based sessions
- Row Level Security (RLS) enforced on all tables
- Permission checks via `use-permission.ts` hook
- Organization-scoped data isolation

### AI Integration
- Agent configs in `lib/ai-agents.ts`
- System prompts in `.Prompts/` directory
- Streaming responses via `eventsource-parser`
- Cost tracking in `ai_calls` table

### Database
- PostgreSQL via Supabase
- UUID primary keys
- Foreign key constraints with cascading deletes
- Timestamps: `created_at`, `updated_at`
- Soft deletes where applicable
- RLS policies for multi-tenancy

### State Management
- React Context for global state (auth, chat, language)
- Local state with `useState` for component-specific data
- Server state via Supabase real-time subscriptions
- Form state via React Hook Form + Zod validation
