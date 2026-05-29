# NMT Arena

> Gamified Ukrainian NMT/ZNO prep: real tests, live XP, streaks, badges, quests, and leaderboards.

NMT Arena is a monorepo for a two-part product:

- A **Next.js website** for profiles, leaderboards, groups, daily challenges, quests, badges, and share cards.
- A **Chrome Manifest V3 extension** that runs on `zno.osvita.ua`, detects finished test results, shows a live HUD, and submits validated sessions to the website.

The goal is simple: students keep practicing on real NMT/ZNO tests, while NMT Arena turns progress into visible momentum.

## Product Loop

1. Install the Chrome extension.
2. Log in with Google or Discord through the website.
3. Take real tests on `zno.osvita.ua`.
4. The extension detects the result, calculates a secure session hash, and submits the score.
5. The platform awards XP, updates streaks, grants badges, advances quests, and refreshes leaderboards.

## Tech Stack

| Layer | Tech |
| --- | --- |
| Monorepo | pnpm workspaces + Turborepo |
| Website | Next.js 14 App Router + React + TypeScript |
| Styling | Tailwind CSS, Material You inspired green theme |
| Auth + DB | Supabase Auth, Postgres, RLS, Realtime-ready tables |
| Extension | Chrome MV3 + Vite + React popup |
| Validation | Zod schemas in `packages/shared` |
| OG Images | `@vercel/og` |

## Repository Layout

```txt
nmt-arena/
├─ apps/
│  ├─ web/                 # Next.js website
│  └─ extension/           # Chrome MV3 extension
├─ packages/
│  ├─ shared/              # constants, schemas, XP, anti-cheat helpers
│  └─ supabase/            # typed Supabase clients + DB types
├─ supabase/
│  ├─ migrations/          # SQL schema, RLS, views, functions
│  └─ seed.sql             # subjects, badges, quests, daily challenge seed
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ .env.example
```

## Features

### Website

- Ukrainian landing page with product loop, rank ladder, badges, and daily challenge teaser.
- Auth pages for Supabase OAuth.
- Global and subject leaderboard routes.
- Public profile pages with XP, ranks, badges, recent sessions, and subject breakdown sections.
- Personal profile route.
- Challenges and quests page.
- Groups pages.
- Session ingestion API for extension submissions.
- Leaderboard API with filter support.
- Dynamic OG images for profiles and score sharing.
- Dark mode, responsive Tailwind design, accessible buttons and focus states.

### Chrome Extension

- Manifest V3 extension shell.
- React popup with connected/disconnected states.
- Background auth bridge for website login.
- Content script for `zno.osvita.ua`.
- Shadow DOM HUD with timer, XP, messages, and draggable panel.
- Result detector with Ukrainian text parsing.
- Fingerprint tracker for timing, interactions, viewport, and visibility changes.
- Secure session hash generation before API submission.

### Backend/Supabase

- Tables for profiles, subjects, test sessions, XP events, badges, daily challenges, quests, friends, groups, and group members.
- Row Level Security policies.
- Global and subject leaderboard views.
- `award_xp` RPC with daily XP cap.
- `update_streak` RPC.
- Seed data for NMT subjects, 15 badge definitions, quest templates, and a daily challenge.

## Quick Start

```bash
pnpm install
pnpm dev
```

Copy the environment template before running authenticated flows:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Extension connects to this
NEXT_PUBLIC_API_URL=https://nmt-arena.fun

# Optional transactional email
RESEND_API_KEY=

# Extension build
VITE_API_URL=https://nmt-arena.fun
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Scripts

```bash
pnpm dev              # run all dev servers through Turbo
pnpm build            # build all apps/packages
pnpm build:web        # build only the website
pnpm build:extension  # build only the Chrome extension
pnpm lint             # run lint/type-style checks
pnpm typecheck        # TypeScript checks
pnpm test             # unit tests
pnpm db:migrate       # push Supabase migrations
pnpm db:seed          # seed Supabase data
```

## Supabase Setup

1. Create a Supabase project.
2. Enable Google and Discord auth providers.
3. Fill `.env.local` with Supabase URL, anon key, and service role key.
4. Apply migrations:

```bash
pnpm db:migrate
```

5. Seed base data:

```bash
pnpm db:seed
```

The schema is in `supabase/migrations/202605290001_initial_schema.sql`.

## Extension Setup

Build the extension:

```bash
pnpm build:extension
```

Then load it in Chrome:

1. Open `chrome://extensions`.
2. Enable Developer Mode.
3. Click **Load unpacked**.
4. Select `apps/extension/dist`.
5. Open the extension popup and connect your NMT Arena account.

## XP Rules

XP calculation lives in `packages/shared/src/xp.ts` and is shared by the web app and extension-facing API.

- Base XP: `correct answers * 10`
- Speed bonus: `+5 XP per correct answer` when average time is under 30 seconds per question
- Streak multiplier: `1.5x` at 5+ streak, `2x` at 10+ streak
- Per-session cap before award: `800 XP`
- Daily test XP cap in the database RPC: `2000 XP`

## Ranks

| XP | Rank |
| ---: | --- |
| 0 | 🎒 Школяр |
| 500 | 📖 Абітурієнт |
| 2,000 | ☕ Зубрила |
| 6,000 | 🧠 НМТшник |
| 15,000 | 🔥 Топ Предмет |
| 30,000 | 👑 200 з Усього |

## Development Notes

- This repo is an early full-stack scaffold, not a deployed production instance yet.
- The extension detector is intentionally resilient, but `zno.osvita.ua` markup can change; add fixtures as the detector matures.
- Local dependency installation previously hit a pnpm + Windows + Node 24 rename issue. Node 20 LTS is recommended for the next validation pass.
- `git diff --check` and static manifest parsing passed during scaffold creation.

## Roadmap

- Add real fixture coverage for multiple `zno.osvita.ua` result page variants.
- Finish end-to-end Supabase integration tests.
- Add CI for typecheck, tests, web build, and extension build.
- Add generated extension icons and Chrome Web Store packaging.
- Add richer profile editing, group creation, friend flows, and quest completion UI.

## License

MIT. See `LICENSE`.
