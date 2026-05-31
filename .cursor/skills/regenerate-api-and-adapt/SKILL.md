---
name: regenerate-api-and-adapt
description: Regenerates Kubb API output from the product OpenAPI schema and adapts handwritten code.
---

# Regenerate API And Adapt

Use this skill when product API generated code must change. Read `AGENTS.md`
and `kubb.config.ts` first.

## Why

`src/codegen/api/product/**` is generated output. Manual edits are overwritten
and hide the real schema or configuration issue.

## Step 1: Refresh Schema Only When Needed

```bash
pnpm api:download
```

Run only when the backend schema must be fetched. Skip if
`deps/api/product.json` is already current.

## Step 2: Regenerate

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

Look for renamed hooks/types/schemas/query keys, changed params, changed request
or response shapes, removed endpoints, and new endpoints.

## Step 4: Adapt Handwritten Code

1. `src/actions/**`.
2. `src/routes/**`.
3. `src/widgets/**` and `src/features/**`.
4. `src/entrypoints/**` only if component contracts changed.

If generated output is wrong, fix `kubb.config.ts` or
`deps/api/product.json`, then regenerate.

## Verification

```bash
pnpm lint:fix
pnpm lint:typescript
```
