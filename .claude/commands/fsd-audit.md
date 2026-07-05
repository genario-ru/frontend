# FSD Architecture Audit

Arguments: `$ARGUMENTS` - optional scope. Defaults to full audit.

Read `AGENTS.md` first.

## Check

1. Import direction follows:

```text
routes -> entrypoints -> widgets -> features/actions -> shared/lib
```

2. `shared` and `lib` do not import domain layers.
3. `actions` do not import widgets or feature components.
4. `features` do not import widgets.
5. Route files do not define page JSX or domain implementations.
6. New widget/feature code does not call generated network hooks directly.
7. Zod imports come from `@/lib/zod`.
8. `src/codegen/**` is not manually edited.
9. `withForm` subcomponents and form helpers stay in widgets, not features.
10. Widgets keep non-trivial logic in hooks; component files are not cluttered
    with unrelated child components, constants, broad utils, or many shared
    types.
11. Routine backend request handling does not use `try/catch` in components,
    widgets, features, or action hooks.
12. Props/params are flat where possible and functions/hooks/components receive
    a single object parameter, not positional arguments.

Generated types, schemas, enums, query keys, and route query options may be used
where API contract data is needed.

## Report

For each violation, include file, line, violation type, and recommended fix.

After fixes:

```bash
pnpm lint:fix
pnpm lint:typescript
```

## Reference Examples

- Widget/component split:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
- Widget form: `src/widgets/profile-settings/profile-settings/**`.
- Presentational feature:
  `src/features/profiles/profile-card/components/profile-card.tsx`.
- Infrastructure-only `try/catch`: `src/lib/api/client/index.ts`.
