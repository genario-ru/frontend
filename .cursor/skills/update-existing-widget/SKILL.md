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

## Step 3: Preserve Conventions

- Keep the diff focused.
- Use `cn()` for conditional class names.
- Use `useAppForm` for forms.
- Use `z` from `@/lib/zod`.
- Use action hooks for generated network behavior.
- Do not add i18n keys for ordinary new UI text by default. Use locale files
  only in existing i18n-backed areas, explicit i18n tasks, or
  pluralization/inflection cases.

Generated types, schemas, and query keys may be imported where contract data is
needed. Avoid adding direct generated network hook calls inside widget UI.

## Verification

```bash
pnpm i18n:resources   # if locale JSON changed intentionally
pnpm router:generate  # if route files changed
pnpm lint:fix
pnpm lint:typescript
```
