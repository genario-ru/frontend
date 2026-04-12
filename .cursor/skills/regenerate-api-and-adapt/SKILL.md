---
name: regenerate-api-and-adapt
description: Regenerates API clients/types from OpenAPI sources and adapts handwritten code safely outside generated folders. Use when backend schema changed or API hooks/types are outdated.
---

# Regenerate API And Adapt

## Goal

Update API codegen and safely adapt handwritten code to the new generated output.

## Steps

1. **Download fresh schemas** (only if backend schema changed):

   ```bash
   pnpm api:download
   # Downloads to deps/api/auth.json and deps/api/product.json
   ```

2. **Generate API clients/types:**

   ```bash
   pnpm api:generate
   # Runs Kubb: generates src/codegen/api/auth/** and src/codegen/api/product/**
   ```

   Use `pnpm api:generate:hey-api` only if explicitly requested for hey-api output.

3. **Review generated output** in `src/codegen/api/**`:
   - `models/` — TypeScript types
   - `zod/` — Zod schemas
   - `tanstack/` — TanStack Query hooks
   - Treat this as read-only; note what changed (new hooks, renamed types, removed fields).

4. **Adapt handwritten code** only outside `src/codegen/**`:
   - Update imports of renamed types/hooks.
   - Update call sites for changed hook signatures.
   - Handle new required fields or removed ones in action hooks.
   - Check widgets and features using the affected domain hooks.

5. **Verify:**
   ```bash
   pnpm lint:fix
   pnpm lint:typescript
   ```

## Constraints

- Never manually edit `src/codegen/**`.
- When generated output doesn't match expectations, fix `kubb.config.ts` or schema files (`deps/api/*.json`), then regenerate — never patch the output directly.

## What Kubb generates per domain

```
src/codegen/api/<domain>/
├── models/    # TypeScript interfaces and types
├── zod/       # Zod validation schemas (uses @/lib/zod)
├── tanstack/  # use*, *QueryOptions, *MutationOptions, *Infinite hooks
└── client/    # Raw fetch functions (rarely used directly)
```
