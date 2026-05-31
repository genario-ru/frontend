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

Generated types, schemas, enums, query keys, and route query options may be used
where API contract data is needed.

## Report

For each violation, include file, line, violation type, and recommended fix.

After fixes:

```bash
pnpm lint:fix
pnpm lint:typescript
```
