---
name: add-domain-feature
description: Implements a new domain feature in this frontend using the local FSD structure (actions/features/widgets/entrypoints) and project workflows. Use when adding or expanding business functionality in a domain module.
---

# Add Domain Feature

## Goal

Add or expand domain functionality without breaking FSD boundaries.

## Pre-coding step (required)

Find at least 3 similar implementations in the target layer:

- New action hook → read 3+ hooks in `src/actions/<domain>/hooks/`
- New feature component → read 3+ in `src/features/<domain>/`
- New widget → read 3+ in `src/widgets/<domain>/` or related domains

List the reference paths before writing any code.

## Steps

1. **Identify the domain and layer:**
   - Business orchestration → `src/actions/<domain>/hooks/use-<name>.ts`
   - Presentational UI → `src/features/<domain>/<feature-name>/components/`
   - Composite block → `src/widgets/<domain>/<widget-name>/`
   - Page composition → `src/entrypoints/<name>/component.tsx`

2. **Check codegen for existing API hooks:**
   - `src/codegen/api/auth/tanstack/` — auth endpoints
   - `src/codegen/api/product/tanstack/` — product endpoints
   - If hooks are missing, run `pnpm api:generate` (after `pnpm api:download` if schema is stale).

3. **Implement minimally:**
   - Action hooks wrap codegen hooks and expose clean return values.
   - Feature components are presentational; receive data via props.
   - Widgets use action hooks and feature components.
   - Use `cn()` from `@/shared/utils/cn` for conditional classnames.
   - Use `useAppForm` from `@/lib/tanstack-form` for forms.
   - Use `z` from `@/lib/zod` (not directly from `"zod"`).

4. **i18n:** Add user-facing strings as keys to both locale files, then run `pnpm i18n:resources`.

5. **Verify:**
   - `pnpm lint:fix`
   - `pnpm lint:typescript`

## Constraints

- Never edit `src/codegen/**` manually.
- `shared/` and `lib/` must not receive domain-specific logic.
- Keep action hooks decoupled from UI (no JSX in actions).
