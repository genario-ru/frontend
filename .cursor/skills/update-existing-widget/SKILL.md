---
name: update-existing-widget
description: Applies focused updates to an existing widget with minimal side effects, preserving FSD boundaries and local hooks/components structure. Use when user asks to change behavior or UI in current widgets.
---

# Update Existing Widget

## Goal

Make targeted changes to an existing widget without unnecessary refactoring or layer violations.

## Pre-coding step

1. Read the widget's entry component at `src/widgets/<domain>/<widget-name>/components/`.
2. Read the widget's local hooks (if any) at `src/widgets/<domain>/<widget-name>/hooks/`.
3. Identify which action hooks from `src/actions/<domain>/` it uses.

## Determine where logic belongs

| Change type                        | Location                                                |
| ---------------------------------- | ------------------------------------------------------- |
| Pure UI/visual change              | Widget component file                                   |
| Reusable local state/interaction   | Widget hook (`hooks/use-<widget-name>.ts`)              |
| Business orchestration or API call | `src/actions/<domain>/hooks/`                           |
| Cross-widget shared UI             | `src/features/<domain>/` or `src/shared/components/ui/` |

## Steps

1. **Minimal diff:** change only what is needed for the task — don't reorganize unrelated code or move code between layers unnecessarily.

2. **Classnames:** use `cn()` from `@/shared/utils/cn` for conditional Tailwind classes.

3. **API data:** use hooks from `@/codegen/api/*` via action wrappers in `src/actions/`. Don't call codegen hooks directly in widget components.

4. **Forms (if applicable):** use `useAppForm` from `@/lib/tanstack-form`.

5. **Translations:** add new UI strings to both locale files, run `pnpm i18n:resources`.

6. **Verify:**
   ```bash
   pnpm lint:fix
   pnpm lint:typescript
   ```

## Output checklist

- [ ] Widget behavior matches the task requirements.
- [ ] No FSD layer boundaries violated.
- [ ] No manual edits to `src/codegen/**`.
- [ ] No unrelated files changed.
