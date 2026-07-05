# Regenerate API And Adapt

Arguments: `$ARGUMENTS` - why regeneration is needed.

Read `AGENTS.md` and `kubb.config.ts` first.

## Why

`src/codegen/api/product/**` is generated from OpenAPI. Manual edits there will
be overwritten and usually hide the real schema or config problem.

## Step 1: Refresh Schema If Needed

```bash
pnpm api:download
```

Run this only when the backend schema must be fetched. Skip it when
`deps/api/product.json` is already current.

## Step 2: Generate

```bash
pnpm api:generate
```

Generated output:

```text
src/codegen/api/product/
  clients/
  models/
  tanstack/
  zod/
```

## Step 3: Review Contract Changes

Look for:

- renamed hooks/types/schemas/query keys;
- changed required params;
- changed request/response fields;
- removed endpoints;
- new endpoints that replace local workarounds.

## Step 4: Adapt Handwritten Code

Order matters:

1. `src/actions/**` first.
2. `src/routes/**` query options and guards next.
3. `src/widgets/**` and `src/features/**` after action contracts are stable.
4. `src/entrypoints/**` only if public component contracts changed.

If generated output is wrong, fix `kubb.config.ts` or `deps/api/product.json`
and regenerate.

Keep generated network hooks behind action hooks while adapting. Use TanStack
Query state for GET errors and mutation callbacks for side effects. Do not move
generated hooks directly into widgets/features or replace callback flows with
routine `try/catch`.

## Finish

```bash
pnpm lint:fix
pnpm lint:typescript
```

Do not silence type errors with broad casts.

## Reference Examples

- Kubb configuration: `kubb.config.ts`.
- GET action wrapper: `src/actions/templates/hooks/use-get-templates.ts`.
- Mutation action wrapper:
  `src/actions/ideas-lists/hooks/use-create-ideas-list.ts`.
- Widget consumer:
  `src/widgets/scenario/scenario-app-menubar/hooks/use-scenario-app-menubar.ts`.
