# Update Existing Widget

Arguments: `$ARGUMENTS` - widget path or domain plus requested change.

Read `AGENTS.md` first.

## Why

Widgets concentrate UI composition, local state, dialogs/drawers, and action
hook usage. A small requested change should not turn into a broad refactor or
move business logic into UI.

## Step 1: Read Existing Structure

Before editing, read:

1. main widget component under `src/widgets/<domain>/<widget>/components/`;
2. local hooks under `src/widgets/<domain>/<widget>/hooks/`, if present;
3. colocated schemas/types/utils/constants;
4. imported action hooks from `src/actions/<domain>/hooks/`;
5. sibling widgets if the pattern is unclear.

If the local pattern is unclear, ask the user instead of inventing a new
composition. Ask before adding a custom abstraction or moving responsibilities
between layers.

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
- Keep `withForm` subcomponents and form helpers in the owning widget.
- Use `z` from `@/lib/zod`.
- Use action hooks for generated network behavior.
- Do not add i18n keys for ordinary new UI text by default. Use locale files
  only in existing i18n-backed areas, explicit i18n tasks, or
  pluralization/inflection cases.
- Do not add routine request `try/catch`; use Query flags and mutation
  callbacks.
- Use `useMemo` for dynamic body/layout/slot content and `useCallback` for
  handlers. Keep non-trivial logic in hooks.
- Prefer flat props/params and one object parameter.

## Finish

```bash
pnpm i18n:resources   # if locale JSON changed intentionally
pnpm router:generate  # if route files changed
pnpm lint:fix
pnpm lint:typescript
```

Report changed files, references inspected, and validation results.

## Reference Examples

- Widget component:
  `src/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar.tsx`.
- Widget hook:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
- Mutation callback hook:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar-save.ts`.
- Widget form: `src/widgets/profile-settings-general/**`.
