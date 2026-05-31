---
name: add-route-with-entrypoint
description: Adds a TanStack file route with proper entrypoint composition.
---

# Add Route With Entrypoint

Use this skill for route additions or route behavior changes. Read `AGENTS.md`
and `src/routes/README.md` first.

## Why

Routes are generated into the TanStack route tree. Keep them focused on
navigation concerns so page UI and business logic remain in entrypoints,
widgets, features, and actions.

## Step 1: Inspect Existing Routes

Read 2-3 route files in the same layout group and their entrypoints. Check path
naming, search schemas, redirects, preloading, and component naming.

## Step 2: Choose Layout Group

| Scenario                                    | Folder                                         |
| ------------------------------------------- | ---------------------------------------------- |
| Requires session and active subscription    | `src/routes/_with-auth/_with-subscription/`    |
| Requires session but no active subscription | `src/routes/_with-auth/_without-subscription/` |
| Sign-in or OTP flow                         | `src/routes/_auth/`                            |
| Public page                                 | `src/routes/_without-auth/`                    |

## Step 3: Entrypoint For UI

Create or update `src/entrypoints/<page>/component.tsx` for page composition.
Import widgets/features there. Do not define page UI in the route file.

## Step 4: Route File Contents

Allowed:

- `createFileRoute(...)`;
- route-local search schemas and exported search types;
- `beforeLoad` guards, redirects, and query preloading;
- route-level loader logic when truly route-specific;
- imported entrypoint component reference.

Not allowed:

- page JSX;
- widget/feature implementations;
- business hooks;
- manual edits to `src/codegen/router/route-tree.gen.ts`.

## Verification

```bash
pnpm router:generate
pnpm lint:fix
pnpm lint:typescript
```
