# NMT Arena

Gamified Ukrainian NMT/ZNO preparation with a Next.js website, Supabase backend, and Chrome extension for `zno.osvita.ua`.

## Quick Start

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` for the web app and configure Supabase before using authenticated flows.

## Apps

- `apps/web`: Next.js 14 App Router website.
- `apps/extension`: Chrome Manifest V3 extension built with Vite.

## Packages

- `packages/shared`: Ukrainian copy, constants, Zod schemas, XP/rank/session utilities.
- `packages/supabase`: typed Supabase clients and database types.
