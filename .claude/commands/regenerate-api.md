# Regenerate API and Adapt

Update Kubb-generated API clients from OpenAPI sources and safely adapt handwritten code to the new output.

## Arguments

`$ARGUMENTS` — context for why regeneration is needed (e.g. "backend added pagination to /ideas endpoint" or "auth token field renamed").

## Step 1 — Download schemas (only if backend changed)

```bash
pnpm api:download
# Downloads to: deps/api/auth.json and deps/api/product.json
```

Skip this step if the schemas are already up to date.

## Step 2 — Generate API clients

```bash
pnpm api:generate
```

This regenerates all of `src/codegen/api/**`:

```
src/codegen/api/<domain>/
├── models/    # TypeScript interfaces and types
├── zod/       # Zod validation schemas
├── tanstack/  # use*, *QueryOptions, *MutationOptions, *Infinite hooks
└── client/    # Raw fetch functions (rarely used directly)
```

**Never edit files in `src/codegen/` manually.** If the output is wrong, fix `kubb.config.ts` or `deps/api/*.json` and regenerate.

## Step 3 — Review what changed

After generation, check the diff in `src/codegen/api/**`:

- Renamed types or hooks
- New required fields or removed fields
- Changed hook signatures or query option shapes
- New endpoints available

## Step 4 — Adapt handwritten code

Update all files **outside** `src/codegen/`:

- `src/actions/<domain>/hooks/` — update imports of renamed hooks/types; handle new required params
- `src/widgets/` and `src/features/` — update any action hooks that changed signatures
- `src/routes/` — update `beforeLoad` query option calls if option names changed

Search for affected imports:

```bash
# Find all files importing from the regenerated domain
grep -r "from \"@/codegen/api/<domain>" src/ --include="*.ts" --include="*.tsx"
```

## Step 5 — Verify

```bash
pnpm lint:fix && pnpm lint:typescript
```

Fix all TypeScript errors introduced by the changed codegen before considering this done.
