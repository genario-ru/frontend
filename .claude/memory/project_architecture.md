---
name: Frontend project architecture
description: FSD layers, tech stack, existing domains, and key structural rules for the frontend project
type: project
---

React 19 + TypeScript 5.7 SPA with strict **Feature-Sliced Design (FSD)** architecture.

**Why:** Enforced via `.cursor/rules/` and `CLAUDE.md`. Deviations break the layer contract.

**How to apply:** Always check the layer before placing a file. See placement decision table below.

## FSD layers (src/)

| Layer       | Path                     | Purpose                                           |
| ----------- | ------------------------ | ------------------------------------------------- |
| routes      | `src/routes/`            | `createFileRoute()` declarations only             |
| entrypoints | `src/entrypoints/`       | Page-level composition                            |
| widgets     | `src/widgets/<domain>/`  | Composite domain blocks                           |
| features    | `src/features/<domain>/` | Presentational domain UI                          |
| actions     | `src/actions/<domain>/`  | Business orchestration hooks                      |
| shared      | `src/shared/`            | Cross-domain: ui, utils, hooks, types             |
| lib         | `src/lib/`               | Infrastructure: api, auth, i18n, tanstack-\*, zod |
| codegen     | `src/codegen/`           | Generated — **never edit manually**               |

**Dependency direction**: `routes → entrypoints → widgets → features/actions → shared/lib`

## Tech stack

- **TanStack Router 1.x** — file-based routing, search params via Zod, `beforeLoad` loaders
- **TanStack Query 5** — server state; `ensureQueryData` in route loaders
- **TanStack Form 1.x** — `useAppForm` from `@/lib/tanstack-form`
- **Tailwind CSS 4** — utility classes; `cn()` from `@/shared/utils/cn`
- **Zod 4** — always import from `@/lib/zod` (has custom error messages)
- **Kubb 4** — OpenAPI → `src/codegen/api/{auth,product}/` (models, zod, tanstack, client)
- **i18next** — locales at `public/locales/{en,ru}/translation.json`

## Existing domains

`archive`, `auth`, `billing`, `credits`, `ideas`, `ideas-lists`, `navigation`,
`platforms`, `profiles`, `scenario`, `subscriptions`, `tariffs`, `templates`,
`tones`, `video-durations`, `video-types`

## Route layout groups

- `_with-auth/_with-subscription/` — main app
- `_with-auth/_without-subscription/` — auth but no plan
- `_auth/` — unauthenticated (sign-in, OTP)
- `_without-auth/` — redirects if logged in

## Hard rules

- `src/routes/**` — only `Route` export, no logic
- `src/codegen/**` — read-only, regenerate via `pnpm api:generate` / `pnpm router:generate`
- `src/shared` / `src/lib` — no domain-specific logic
