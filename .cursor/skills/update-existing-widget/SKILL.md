---
name: update-existing-widget
description: Applies focused updates to an existing widget while preserving FSD boundaries.
---

# Update Existing Widget

Use this skill for focused changes under `src/widgets/**`. Read `AGENTS.md`
first.

## Why

Widgets combine UI, local behavior, dialogs/drawers, lists, and action hooks.
Keep changes focused so business behavior does not drift into UI and unrelated
structure stays stable.

## Step 1: Understand The Widget

Before editing, read:

1. main widget component under `src/widgets/<domain>/<widget>/components/`;
2. local hooks under `hooks/`, if present;
3. colocated schemas/types/utils/constants;
4. action hooks imported from `src/actions/<domain>/hooks/`;
5. sibling widgets if the local pattern is unclear.

## Step 2: Choose The Correct File

| Change                                            | Location                 |
| ------------------------------------------------- | ------------------------ |
| Markup, layout, class names                       | Widget component         |
| Local interaction state, handlers, derived values | Widget hook              |
| API call, mutation callback, cache invalidation   | Action hook              |
| Reusable domain display piece                     | `src/features/<domain>/` |
| Generic UI/helper                                 | `src/shared/**`          |

Ask the user before introducing a new custom abstraction, composition pattern,
or significant layer move.

## Step 3: Preserve Conventions

- Keep the diff focused.
- Use `cn()` for conditional class names.
- Use `useAppForm` for forms.
- Keep `withForm` children and form helpers in the owning widget.
- Use `z` from `@/lib/zod`.
- Use action hooks for generated network behavior.
- Do not add i18n keys for ordinary new UI text by default. Use locale files
  only in existing i18n-backed areas, explicit i18n tasks, or
  pluralization/inflection cases.

Generated types, schemas, and query keys may be imported where contract data is
needed. Avoid adding direct generated network hook calls inside widget UI.

Do not add routine request `try/catch`. Use Query flags for GETs and mutation
callbacks for side effects. Keep handlers in `useCallback`, dynamic body/slots
in `useMemo`, and non-trivial logic in colocated hooks.

When touching loading states, skeletons, mobile row actions, delete flows, or
cross-page navigation, match local precedent:

- compose child skeleton exports; use `ItemsList` for repeated skeleton items;
- extract named boolean variables for complex conditions;
- use `SwipeActions` with `hideActions` on touch; confirm delete via
  `Dialog`/`Drawer`;
- use `AppMenubar` tabs for related pages;
- for edit forms, use `createFormMatchValidateFn`, `form.SubmitButton`, and
  `formApi.reset(value)` after save.

## Verification

```bash
pnpm i18n:resources   # if locale JSON changed intentionally
pnpm router:generate  # if route files changed
pnpm lint:fix
pnpm lint:typescript
```

## Reference Examples

- Widget component:
  `src/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar.tsx`.
- Widget hook:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
- Mutation callback hook:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar-save.ts`.
- Widget form: `src/widgets/profile-settings-general/**`.
