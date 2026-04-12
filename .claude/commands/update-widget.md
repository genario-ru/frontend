# Update Existing Widget

Apply a focused, minimal change to an existing widget. Preserve FSD boundaries and existing structure — do not refactor what isn't part of the task.

## Arguments

`$ARGUMENTS` — widget path or domain + description of the change (e.g. "widgets/ideas/ideas-list — add empty state" or "scenario chapter navigation — highlight active item").

## Pre-coding step

Before changing anything, read:

1. The widget's main component at `src/widgets/<domain>/<widget-name>/components/`
2. The widget's local hooks at `src/widgets/<domain>/<widget-name>/hooks/` (if any)
3. The action hooks it uses from `src/actions/<domain>/hooks/`

## Where the change belongs

| Type of change                            | Location                                                |
| ----------------------------------------- | ------------------------------------------------------- |
| Visual / layout tweak                     | Widget component file                                   |
| Reusable local state or interaction logic | Widget hook (`hooks/use-<widget-name>.ts`)              |
| New API call or business rule             | `src/actions/<domain>/hooks/use-<name>.ts`              |
| Shared UI across widgets                  | `src/features/<domain>/` or `src/shared/components/ui/` |

## Rules

- **Minimal diff**: change only what the task requires. Don't reorganize unrelated code.
- **Classnames**: `cn()` from `@/shared/utils/cn` — never build class strings manually.
- **API data**: always go through action hooks in `src/actions/`. No direct codegen hook imports in widget components.
- **Forms**: `useAppForm` from `@/lib/tanstack-form`.
- **New user-facing strings**: add to both locale files, run `pnpm i18n:resources`.

## Finish checklist

- [ ] Only the targeted widget is changed
- [ ] No FSD boundaries violated
- [ ] No manual edits to `src/codegen/**`
- [ ] No unrelated files modified
- Run: `pnpm lint:fix && pnpm lint:typescript`
