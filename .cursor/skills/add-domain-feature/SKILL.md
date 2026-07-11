---
name: add-domain-feature
description: Implements or expands a frontend domain feature using the local FSD structure.
---

# Add Domain Feature

Use this skill for domain work that changes app behavior or UI. Read
`AGENTS.md` and `src/README.md` first.

## Why

Generated API contracts change over time, while domain code should stay stable
and discoverable. Keep generated network hooks behind action hooks, keep page
composition in entrypoints, and keep reusable domain UI in features.

## Step 1: Classify The Change

| Change                                                                       | Location                                      |
| ---------------------------------------------------------------------------- | --------------------------------------------- |
| API/query/mutation orchestration, cache invalidation, mutation callbacks     | `src/actions/<domain>/hooks/use-<name>.ts`    |
| Reusable domain UI with data passed by props                                 | `src/features/<domain>/<feature>/components/` |
| Complex domain block with local state, action hooks, dialogs, drawers, lists | `src/widgets/<domain>/<widget>/`              |
| Page-level layout that wires widgets/features together                       | `src/entrypoints/<page>/component.tsx`        |
| URL, search params, guards, redirects, route preloading                      | `src/routes/**`                               |

Update existing files when the local structure already exists. Do not scaffold
empty folders unless the next implementation step needs them.

## Step 2: Inspect Local References

Read at least 3 similar files in the target layer before editing. Prefer the
same domain. Use those references for naming, hook return shapes, component
structure, and import style.

If references conflict, the composition is ambiguous, or the task requires a new
custom pattern, ask the user before coding.

## Step 3: Use Generated API Correctly

- Look in `src/codegen/api/product/**`.
- Wrap generated network hooks in `src/actions/**`.
- Generated types, enums, schemas, query keys, and route query options may be
  imported where contract data is needed.
- Handle GET errors through TanStack Query state and mutation side effects
  through `onSuccess`/`onError` callbacks. Do not add routine request
  `try/catch`.
- Never edit `src/codegen/**`.

## Step 4: Use Project Primitives

- `cn()` from `@/shared/utils/cn`.
- `useAppForm` and `withForm` from `@/lib/tanstack-form`; keep form pieces in
  widgets, not features.
- `z` from `@/lib/zod`.
- Existing UI primitives from `src/shared/components/ui/**`.
- Do not add i18n keys for ordinary new UI text by default. Use locale JSON only
  in existing i18n-backed areas, explicit i18n tasks, or pluralization/inflection
  cases.
- Keep widget logic in colocated hooks, component callbacks in `useCallback`,
  and dynamic body/layout/slot content in `useMemo`.
- Prefer flat props/params and a single object parameter for functions, hooks,
  and components.

## UI Patterns To Match Local Precedent

- Skeletons: page/widget composes child skeleton exports; repeated items use
  `ItemsList`.
- Conditions: extract named boolean variables for multi-check logic.
- Mobile rows: `SwipeActions` + `hideActions`; delete confirms via
  `Dialog`/`Drawer`.
- Cross-page navigation: `AppMenubar` tabs, not `NavigationSteps` in body.
- Edit forms: `createFormMatchValidateFn`, `form.SubmitButton`, `reset` after
  save.
- Parallel mutations: shared lifecycle handlers in action hook `useMutation`,
  not only inline `mutate(..., callbacks)`.
- Do not use TypeScript `satisfies`; prefer explicit type annotations.

## Verification

```bash
pnpm i18n:resources   # if locale JSON changed intentionally
pnpm router:generate  # if route files changed
pnpm lint:fix
pnpm lint:typescript
```

## Reference Examples

- GET action hook: `src/actions/templates/hooks/use-get-templates.ts`.
- Mutation callback hook:
  `src/actions/ideas-lists/hooks/use-create-ideas-list.ts`.
- Widget hook/component:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
- Widget form: `src/widgets/profile-settings-general/**`.
- Feature UI: `src/features/profiles/profile-card/components/profile-card.tsx`.
