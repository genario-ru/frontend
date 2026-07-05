# Add Route With Entrypoint

Arguments: `$ARGUMENTS` - route path and layout group.

Read `AGENTS.md` and `src/routes/README.md` first.

## Why

Route files are part of TanStack Router's generated route tree. If they contain
page JSX or domain logic, routing changes become coupled to UI behavior and
route generation becomes harder to review.

## Step 1: Inspect Local Pattern

Read 2-3 nearby route files in the same layout group and their entrypoints.
Check search schemas, redirects, preloading, and component naming.

If a new guard, loader, or layout composition pattern is needed and there is no
local precedent, ask the user before coding.

## Step 2: Choose Layout Group

| Scenario                                    | Folder                                         |
| ------------------------------------------- | ---------------------------------------------- |
| Requires session and active subscription    | `src/routes/_with-auth/_with-subscription/`    |
| Requires session but no active subscription | `src/routes/_with-auth/_without-subscription/` |
| Sign-in or OTP                              | `src/routes/_auth/`                            |
| Public page                                 | `src/routes/_without-auth/`                    |

## Step 3: Entrypoint First For UI

Create or update `src/entrypoints/<page>/component.tsx` for page composition.
Import widgets/features there. Do not define page UI inside the route file.

## Step 4: Route File Contents

Allowed:

- `createFileRoute(...)`;
- route-local search schema and exported search type;
- `beforeLoad` guards, redirects, and query preloading;
- imported entrypoint component reference.

Not allowed:

- page JSX;
- widget/feature component definitions;
- business hooks;
- manual edits to `src/codegen/router/route-tree.gen.ts`.

## Finish

```bash
pnpm router:generate
pnpm lint:fix
pnpm lint:typescript
```

Report route files, entrypoint files, and generated route tree changes.

## Reference Examples

- Route with search params:
  `src/routes/_with-auth/_with-subscription/scenarios/$scenarioId.tsx`.
- Settings route:
  `src/routes/_with-auth/_with-subscription/ideas-lists/settings.tsx`.
- Entrypoint with memoized layout: `src/entrypoints/scenario/component.tsx`.
