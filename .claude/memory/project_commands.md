---
name: Frontend project commands and workflows
description: All important CLI commands and multi-step workflows for the frontend project
type: reference
---

## Daily commands

```bash
pnpm dev                  # Dev server (Vite)
pnpm build                # TypeScript check + production build
pnpm lint:fix             # ESLint + Prettier auto-fix
pnpm lint:typescript      # Type check only (no emit)
```

## Code generation commands

```bash
pnpm router:generate      # Regenerate src/codegen/router/route-tree.gen.ts
pnpm router:watch         # Watch mode for route tree during active route dev
pnpm api:download         # Download OpenAPI schemas to deps/api/{auth,product}.json
pnpm api:generate         # Regenerate src/codegen/api/** via Kubb
pnpm api:generate:hey-api # Alternative generation (only when explicitly requested)
pnpm i18n:resources       # Regenerate src/globals/i18next-resources.d.ts
```

## Workflows

### Add a new route

1. Create file in `src/routes/<layout-group>/`
2. Create entrypoint at `src/entrypoints/<name>/component.tsx`
3. `pnpm router:generate`
4. `pnpm lint:fix && pnpm lint:typescript`

### Update API after schema change

1. `pnpm api:download` (if schema files changed)
2. `pnpm api:generate`
3. Adapt hand-written code outside `src/codegen/**`
4. `pnpm lint:typescript`

### Add i18n translations

1. Add key to both `public/locales/en/translation.json` and `ru/translation.json`
2. `pnpm i18n:resources`
3. `pnpm lint:typescript`
