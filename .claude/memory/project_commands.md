---
name: Frontend project commands and workflows
description: Important CLI commands and multi-step workflows
type: reference
---

Canonical guide: `AGENTS.md`.

## Daily commands

```bash
pnpm dev
pnpm build
pnpm lint:fix
pnpm lint:typescript
```

There is no standardized `pnpm test` script currently.

## Generated code commands

```bash
pnpm router:generate
pnpm router:watch
pnpm api:download
pnpm api:generate
pnpm api:generate:hey-api
pnpm i18n:resources
```

## Workflows

New route:

1. Add/update `src/routes/**`.
2. Add/update `src/entrypoints/<page>/component.tsx`.
3. Run `pnpm router:generate`.
4. Run `pnpm lint:fix` and `pnpm lint:typescript`.

API update:

1. Run `pnpm api:download` only if the backend schema must be refreshed.
2. Run `pnpm api:generate`.
3. Adapt handwritten code outside `src/codegen/**`.
4. Run `pnpm lint:typescript`.

During API adaptation, keep generated network hooks behind action hooks and use
TanStack Query/mutation callbacks for error and success handling. Do not add
routine request `try/catch` in UI/action hooks.

i18n / pluralization update:

1. Use only for existing locale-backed text, explicit i18n tasks, or
   pluralization/inflection.
2. Update both locale JSON files when locale resources change.
3. Run `pnpm i18n:resources`.
4. Run `pnpm lint:typescript`.
