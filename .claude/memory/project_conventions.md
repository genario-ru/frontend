---
name: Frontend code conventions and patterns
description: Naming, imports, component structure, and completion checklist
type: project
---

Canonical guide: `AGENTS.md`.

## Naming

- Domain folders: `kebab-case`.
- Hook files: `use-<name>.ts`.
- Component files: kebab-case `.tsx`.
- Prefer named exports.

## Imports

- Prefer `@/*` for `src/` imports.
- Import order is handled by `simple-import-sort`.
- Zod: `import { z } from "@/lib/zod"`.
- Classnames: `import { cn } from "@/shared/utils/cn"`.
- Forms: `import { useAppForm } from "@/lib/tanstack-form"`.

## Pre-coding rule

Before creating new files in `actions`, `features`, `widgets`, or `entrypoints`,
read at least 3 similar local implementations in the same layer.

## Generated code

- Generated network hooks come from `@/codegen/api/product`.
- Prefer wrapping generated network hooks in `src/actions/**`.
- Generated types, schemas, enums, query keys, and route query options may be
  imported where API contract data is needed.
- Never manually edit `src/codegen/**`.

## Completion checklist

1. Correct FSD layer.
2. Reference files inspected for local patterns.
3. No manual edits to generated files.
4. Do not add i18n keys for ordinary new UI text by default.
5. Route changes -> `pnpm router:generate`.
6. Locale resource changes -> `pnpm i18n:resources`.
7. Code changes -> `pnpm lint:fix` and `pnpm lint:typescript`.
