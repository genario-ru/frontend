---
name: add-domain-feature
description: Add or expand Genario frontend domain functionality across actions, features, widgets, or entrypoints. Use when creating domain hooks, presentational domain UI, composite widgets, forms, or page-level composition in this FSD React app.
---

# Add Domain Feature

Use this skill for domain work that changes app behavior or UI. Read
`AGENTS.md` and `src/README.md` first.

## Why This Workflow Exists

Generated API names are noisy and can change after schema regeneration. Route
files should not accumulate product logic. Shared/lib should stay reusable. This
workflow keeps generated contracts behind action hooks, keeps page composition
in entrypoints, and keeps domain UI in features/widgets where future agents can
find it.

## Step 1: Classify The Change

Choose the narrowest correct layer:

| Change                                                                       | Location                                      |
| ---------------------------------------------------------------------------- | --------------------------------------------- |
| API/query/mutation orchestration, cache invalidation, mutation callbacks     | `src/actions/<domain>/hooks/use-<name>.ts`    |
| Reusable domain UI with data passed by props                                 | `src/features/<domain>/<feature>/components/` |
| Complex domain block with local state, action hooks, dialogs, drawers, lists | `src/widgets/<domain>/<widget>/`              |
| Page-level layout that wires widgets/features together                       | `src/entrypoints/<page>/component.tsx`        |
| URL, search params, guards, redirects, route preloading                      | `src/routes/**`                               |

Do not create a new layer folder just because a task mentions a domain. First
check whether an existing widget, feature, or action hook should be extended.

## Step 2: Inspect Local References

Before writing files, inspect at least 3 similar files in the target layer.
Prefer same-domain examples.

Examples:

- new profile action hook: inspect `src/actions/profiles/hooks/**`;
- new scenario widget subform: inspect nearby `src/widgets/scenario-settings/**`;
- new billing display component: inspect `src/features/billing/**` and
  `src/widgets/billing/**`;
- new page composition: inspect 3 files in `src/entrypoints/**`.

Use the references to copy naming, return shapes, hook/component splits, and
import style. Mention the inspected paths in the final response.

## Step 3: Use Generated API Contracts Correctly

Look in `src/codegen/api/product/**` for existing contracts.

Use generated network hooks inside action hooks:

```typescript
import { useGetApiV1Templates } from "@/codegen/api/product";

export function useGetTemplates() {
  const {
    data: templatesData,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
  } = useGetApiV1Templates();

  return { templatesData, isTemplatesLoading, isTemplatesError };
}
```

Generated types, enums, schemas, query keys, and route query options may be used
outside actions when they are API contract data. Avoid new direct generated
network hook calls in widgets/features.

## Step 4: Implement With Local Primitives

- Conditional classes: `cn()` from `@/shared/utils/cn`.
- Forms: `useAppForm` from `@/lib/tanstack-form`.
- Validation: `z` from `@/lib/zod`.
- UI primitives: check `src/shared/components/ui/**` before creating new ones.
- Text: do not add i18n keys by default. Use locale JSON only in existing
  i18n-backed areas, explicit i18n tasks, or when pluralization/inflection needs
  i18next.

Keep feature components presentational unless local precedent shows otherwise.
Put local interaction state in widget hooks when it makes the component easier
to read.

## Step 5: Verify

- Locale JSON changed intentionally: run `pnpm i18n:resources`.
- Route files changed: run `pnpm router:generate`.
- TypeScript/React changed: run `pnpm lint:fix` and `pnpm lint:typescript`.
- Build-impacting infrastructure changed: consider `pnpm build`.

Never edit `src/codegen/**` manually.
