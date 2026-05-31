# Lint And Type-check

Run validation for the current codebase state.

## Steps

```bash
pnpm lint:fix
pnpm lint:typescript
```

If route files changed:

```bash
pnpm router:generate
```

If locale JSON files changed:

```bash
pnpm i18n:resources
```

## Common issues

- Wrong FSD layer -> move code to the correct layer.
- Zod imported from `"zod"` -> import from `@/lib/zod`.
- Generated API contracts changed -> run `pnpm api:generate` and adapt
  handwritten code.
- Missing i18n resource types -> run `pnpm i18n:resources`.
