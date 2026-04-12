# Lint and Type-check

Run the full validation suite for the current state of the codebase.

## Steps

Run in order (each step must pass before the next):

```bash
pnpm lint:fix
```

Runs ESLint + Prettier auto-fix. Fixes auto-fixable issues in place.

```bash
pnpm lint:typescript
```

Runs `tsc --noEmit`. Must complete with zero errors.

## If routes were changed

```bash
pnpm router:generate
```

Regenerates `src/codegen/router/route-tree.gen.ts`. Required after adding, removing, or renaming any file in `src/routes/`.

## If locale files were changed

```bash
pnpm i18n:resources
```

Regenerates `src/globals/i18next-resources.d.ts`. Required after editing `public/locales/en/translation.json` or `public/locales/ru/translation.json`.

## Common issues

- **Import path wrong layer** → move to correct FSD layer
- **Zod imported from "zod"** → change to `import { z } from "@/lib/zod"`
- **Codegen types changed** → run `pnpm api:generate` and adapt (see `/project:regenerate-api`)
- **Missing translation types** → run `pnpm i18n:resources`
