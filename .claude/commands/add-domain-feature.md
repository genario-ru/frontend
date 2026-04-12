# Add Domain Feature

Add or expand domain functionality in the correct FSD layer without violating architecture boundaries.

## Arguments

`$ARGUMENTS` — description of the feature to add (e.g. "use-get-templates action hook" or "templates filter feature component").

## Pre-coding step (mandatory)

Before writing any code, do a reference study:

- New action hook → read 3+ hooks in `src/actions/<domain>/hooks/`
- New feature component → read 3+ in `src/features/<domain>/`
- New widget → read 3+ in `src/widgets/` (same or related domains)
- New entrypoint → read 3+ in `src/entrypoints/`

List the reference paths before writing code.

## Layer placement

| What you're building               | Where it goes                              |
| ---------------------------------- | ------------------------------------------ |
| API orchestration / business logic | `src/actions/<domain>/hooks/use-<name>.ts` |
| Presentational UI component        | `src/features/<domain>/<name>/components/` |
| Composite block (features + hooks) | `src/widgets/<domain>/<name>/`             |
| Page-level layout wiring           | `src/entrypoints/<name>/component.tsx`     |

## Implementation rules

1. **Check codegen first** — look in `src/codegen/api/auth/tanstack/` and `src/codegen/api/product/tanstack/` for existing hooks. If missing, run `pnpm api:generate`.

2. **Action hooks** wrap codegen hooks and expose clean return values:

   ```typescript
   // src/actions/<domain>/hooks/use-get-<name>.ts
   import { useGetApiV1Something } from "@/codegen/api/product";

   export function useGetSomething() {
     const { data, isLoading, isError } = useGetApiV1Something();
     return { data, isLoading, isError };
   }
   ```

3. **Feature components** are presentational — receive data via props, no API calls.

4. **Widget components** use action hooks + feature components. Never call codegen hooks directly.

5. **Classnames**: use `cn()` from `@/shared/utils/cn`.

6. **Forms**: use `useAppForm` from `@/lib/tanstack-form`.

7. **Validation**: use `z` from `@/lib/zod` (not from `"zod"` directly).

8. **User-facing text**: add to both `public/locales/en/translation.json` and `public/locales/ru/translation.json`.

## Finish checklist

- [ ] Code in correct FSD layer
- [ ] No direct codegen hook usage in widgets/features
- [ ] No domain logic in `shared/` or `lib/`
- [ ] Locale keys added to both files (if any new text)
- Run: `pnpm i18n:resources` (if locale changed)
- Run: `pnpm lint:fix && pnpm lint:typescript`
