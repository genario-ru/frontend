---
name: Frontend code conventions and patterns
description: Naming, imports, component structure, and completion checklist
type: project
---

Canonical guide: `AGENTS.md`.

## Naming

- Domain folders: `kebab-case`.
- Hook files: `use-<name>.ts`.
- Component files: kebab-case `.tsx`.
- Prefer named exports.

## Imports

- Prefer `@/*` for `src/` imports.
- Import order is handled by `simple-import-sort`.
- Zod: `import { z } from "@/lib/zod"`.
- Classnames: `import { cn } from "@/shared/utils/cn"`.
- Forms: `import { useAppForm } from "@/lib/tanstack-form"`.

## Pre-coding rule

Before creating new files in `actions`, `features`, `widgets`, or `entrypoints`,
read at least 3 similar local implementations in the same layer.

If references conflict, implementation is ambiguous, or a new custom pattern is
needed, ask the user before coding.

## Generated code

- Generated network hooks come from `@/codegen/api/product`.
- Prefer wrapping generated network hooks in `src/actions/**`.
- Generated types, schemas, enums, query keys, and route query options may be
  imported where API contract data is needed.
- Never manually edit `src/codegen/**`.

## React and data-flow rules

- GET requests use TanStack Query state (`data`, loading/error flags, `error`,
  `refetch`), not local `try/catch`.
- Mutation side effects use `onSuccess`, `onError`, and `onSettled` callbacks in
  action hooks or per-call `mutate` options.
- For consecutive or parallel mutations where every completion must run the
  same lifecycle handlers, declare those handlers in the action hook's
  `useMutation` options instead of relying only on inline `mutate(...,
  callbacks)`.
- Keep component handlers in `useCallback` and dynamic body/layout/slot content
  or derived collections in `useMemo`.
- Avoid `useEffect` when an action can run in an event handler, form submit,
  mutation callback, or router callback.
- Prefer flat props/params and a single object parameter for functions, hooks,
  and components.
- `try/catch` belongs only in infrastructure/util boundaries such as
  `src/lib/api/client/index.ts` or parsing/browser API helpers.
- Do not use TypeScript `satisfies`. Prefer explicit type annotations.
- When a condition combines multiple boolean checks, extract named variables
  instead of nesting parentheses in `if` statements or JSX.
- Page/widget skeletons compose exported child skeletons; use `ItemsList` for
  repeated skeleton items.
- On touch devices, use `SwipeActions` with `hideActions`; destructive actions
  use `Dialog`/`Drawer` confirmation.
- For related pages, prefer `AppMenubar` tabs over `NavigationSteps` in body.
- Edit forms: `createFormMatchValidateFn`, `form.SubmitButton`, `reset` after
  save.

## Completion checklist

1. Correct FSD layer.
2. Reference files inspected for local patterns.
3. No manual edits to generated files.
4. Do not add i18n keys for ordinary new UI text by default.
5. Route changes -> `pnpm router:generate`.
6. Locale resource changes -> `pnpm i18n:resources`.
7. Code changes -> `pnpm lint:fix` and `pnpm lint:typescript`.

## Reference examples

- GET action hook: `src/actions/templates/hooks/use-get-templates.ts`.
- Mutation action hook:
  `src/actions/ideas-lists/hooks/use-create-ideas-list.ts`.
- Memoized widget component:
  `src/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar.tsx`.
- Widget form: `src/widgets/profile-settings-general/**`.
