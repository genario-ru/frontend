# Add Domain Feature

Arguments: `$ARGUMENTS` - description of the feature to add.

Read `AGENTS.md` and `src/README.md` first, then follow this workflow.

## Why

Domain changes should land in the layer where future agents will look for them.
Generated API hooks should not leak directly into widgets/features because
generated names and signatures change when the OpenAPI schema changes.

## Step 1: Reference Study

Before writing code, list at least 3 similar files in the target layer.

- Action hook: inspect `src/actions/<domain>/hooks/**`.
- Feature UI: inspect `src/features/<domain>/**`.
- Widget: inspect `src/widgets/<domain>/**` or related widgets.
- Entrypoint: inspect `src/entrypoints/**`.

Use these references for file names, export style, hook return shape, and
component structure.

If references conflict, several compositions are viable, or the implementation
needs a custom abstraction/pattern not already used here, ask the user before
coding.

## Step 2: Choose Placement

| Work                                     | Place                                      |
| ---------------------------------------- | ------------------------------------------ |
| API/query/mutation orchestration         | `src/actions/<domain>/hooks/use-<name>.ts` |
| Reusable presentational domain UI        | `src/features/<domain>/<name>/components/` |
| Complex UI with action hooks/local state | `src/widgets/<domain>/<name>/`             |
| Page-level wiring                        | `src/entrypoints/<name>/component.tsx`     |
| Route/search/guard/preload               | `src/routes/**`                            |

If the task fits an existing file, update it instead of scaffolding new folders.

## Step 3: API And Data Flow

Check `src/codegen/api/product/**` for existing generated contracts.

- Wrap generated network hooks in action hooks.
- Use generated types, enums, schemas, and query keys where contract data is
  needed.
- Handle GET errors through TanStack Query state. Handle mutation side effects
  through action-hook or per-call `mutate` callbacks.
- Do not add routine request `try/catch` or `mutateAsync`/`try-catch` flows.
- Do not manually edit `src/codegen/**`.

## Step 4: Project Primitives

- `cn()` from `@/shared/utils/cn`.
- `useAppForm` and `withForm` from `@/lib/tanstack-form`; keep form pieces in
  widgets.
- `z` from `@/lib/zod`.
- Existing UI primitives from `src/shared/components/ui/**`.
- Do not add i18n keys for ordinary new UI text by default. Use locale JSON only
  in existing i18n-backed areas, explicit i18n tasks, or pluralization/inflection
  cases.
- Widget logic belongs in colocated hooks. Use `useMemo` for dynamic body/slot
  content and `useCallback` for handlers.
- Prefer flat props/params and one object parameter.

## Finish

```bash
pnpm i18n:resources   # if locale JSON changed intentionally
pnpm router:generate  # if route files changed
pnpm lint:fix
pnpm lint:typescript
```

Report changed files, reference files inspected, generators run, and validation
results.

## Reference Examples

- GET action hook: `src/actions/templates/hooks/use-get-templates.ts`.
- Mutation action hook:
  `src/actions/ideas-lists/hooks/use-create-ideas-list.ts`.
- Widget hook/component:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
- Widget form: `src/widgets/profile-settings/profile-settings/**`.
- Presentational feature:
  `src/features/profiles/profile-card/components/profile-card.tsx`.
