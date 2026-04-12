# CLAUDE.md — Frontend Project Guide

This file is loaded automatically by Claude Code at session start.

## Project overview

React 19 + TypeScript 5.7 SPA with **Feature-Sliced Design (FSD)** architecture.
Two services: auth API and product API — both consumed via Kubb-generated TanStack Query hooks.

---

## Architecture: FSD layers

```
src/
├── routes/         # createFileRoute() only — NO logic, NO components
├── entrypoints/    # Page-level composition (layouts + widget wiring)
├── widgets/        # Composite domain blocks
├── features/       # Presentational domain UI
├── actions/        # Business orchestration hooks (wrap codegen hooks)
├── shared/         # Cross-domain: components/ui, utils, hooks, types
├── lib/            # Infrastructure: api, auth, i18n, tanstack-*, zod
├── codegen/        # GENERATED — read-only, never edit manually
│   ├── api/auth/   # Auth API (models/, zod/, tanstack/, client/)
│   ├── api/product/# Product API (same structure)
│   └── router/     # route-tree.gen.ts
└── globals/        # .d.ts type declarations
```

**Dependency rule**: `routes → entrypoints → widgets → features/actions → shared/lib`

### Hard rules

- `src/routes/**` — only `Route` export via `createFileRoute`
- `src/codegen/**` — never edit manually; regenerate via commands
- `src/shared` / `src/lib` — no domain-specific logic

---

## Tech stack

| Tool                | Usage                                                       |
| ------------------- | ----------------------------------------------------------- |
| TanStack Router 1.x | File-based routing, loaders, search params                  |
| TanStack Query 5    | Server state, preloading in `beforeLoad`                    |
| TanStack Form 1.x   | Forms via `useAppForm` from `@/lib/tanstack-form`           |
| Tailwind CSS 4      | Utility classes; `cn()` from `@/shared/utils/cn`            |
| Zod 4               | Validation; import from `@/lib/zod` (not `"zod"`)           |
| i18next             | Translations from `public/locales/{en,ru}/translation.json` |
| Kubb 4              | OpenAPI → TS types + Zod + TanStack Query hooks             |
| Radix UI / Base UI  | Unstyled primitives, wrapped in `src/shared/components/ui/` |

---

## Key patterns

### Action hook (wraps codegen hook)

```typescript
// src/actions/<domain>/hooks/use-get-something.ts
import { useGetSomething } from "@/codegen/api/product";

export function useGetSomething() {
  const { data, isLoading, isError } = useGetSomething();
  return { data, isLoading, isError };
}
```

### Classnames

```typescript
import { cn } from "@/shared/utils/cn";
className={cn("base", condition && "extra", props.className)}
```

### Zod (always from @/lib/zod)

```typescript
import { z } from "@/lib/zod"; // has project-wide custom error messages
```

### Forms

```typescript
import { useAppForm } from "@/lib/tanstack-form";
const form = useAppForm({
  defaultValues: { name: "" },
  validators: { onSubmit: z.object({ name: z.string().min(1) }) },
  onSubmit: async ({ value }) => {
    /* mutation */
  },
});
```

### Route file (minimal)

```typescript
export const Route = createFileRoute("/_with-auth/_with-subscription/page")({
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(getSomethingQueryOptions());
  },
  component: PageComponent, // from src/entrypoints/<name>/component.tsx
});
```

### Route layout groups

- `_with-auth/_with-subscription/` — main app (requires session + subscription)
- `_with-auth/_without-subscription/` — logged in but no subscription
- `_auth/` — unauthenticated pages (sign-in, verify-otp)
- `_without-auth/` — redirects away if logged in

---

## Existing domains

`archive`, `auth`, `billing`, `credits`, `ideas`, `ideas-lists`, `navigation`,
`platforms`, `profiles`, `scenario`, `subscriptions`, `tariffs`, `templates`,
`tones`, `video-durations`, `video-types`

---

## Commands

```bash
pnpm dev                  # Dev server
pnpm build                # TypeScript check + Vite build
pnpm lint:fix             # ESLint + Prettier auto-fix
pnpm lint:typescript      # Type check only
pnpm router:generate      # Regenerate TanStack Router route tree
pnpm api:download         # Download OpenAPI schemas to deps/api/
pnpm api:generate         # Regenerate src/codegen/api/** (Kubb)
pnpm i18n:resources       # Regenerate i18n TypeScript resources
```

---

## Completion checklist (every task)

1. Changes in correct FSD layer.
2. No manual edits to `src/codegen/**`.
3. Routes changed? → `pnpm router:generate`
4. Locale JSONs changed? → `pnpm i18n:resources`
5. `pnpm lint:fix` → `pnpm lint:typescript`

---

## Pre-coding rule (new domain files)

Before creating any new file in `actions/`, `features/`, `widgets/`, or `entrypoints/`:
find and read at least **3 similar implementations** in the same layer to match local conventions.
