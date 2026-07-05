# Routes

Routes are TanStack Router file routes. Keep them focused on route declaration
and route-only behavior.

## Route Files May Contain

- `createFileRoute(...)` / root route declaration.
- Route-local search schemas and exported search types.
- `beforeLoad` guards, redirects, and query preloading.
- `loader` logic when the data is truly route-level.
- `component`, `pendingComponent`, and error component references imported from
  `src/entrypoints/**` or shared route infrastructure.

## Route Files Should Not Contain

- JSX page layouts or domain components.
- Business orchestration hooks.
- Widget/feature implementation details.
- Manual edits to `src/codegen/router/route-tree.gen.ts`.

## Layout Groups

```text
src/routes/
  __root.tsx
  _auth/                         # sign-in and verify-otp
  _with-auth/                    # requires a session
    _with-subscription/          # main subscribed app area
    _without-subscription/       # authenticated, no active subscription
  _without-auth/                 # public and landing/legal/tariff pages
```

## Workflow

After adding, removing, renaming, or moving route files, run:

```bash
pnpm router:generate
pnpm lint:typescript
```

Run `pnpm lint:fix` as well when imports or formatting changed.

## Reference Examples

- Authenticated app route with search params:
  `src/routes/_with-auth/_with-subscription/scenarios/$scenarioId.tsx`.
- Authenticated settings route with search validation:
  `src/routes/_with-auth/_with-subscription/ideas-lists/settings.tsx`.
- Route entrypoints:
  `src/entrypoints/scenario/component.tsx` and
  `src/entrypoints/ideas-list-settings/component.tsx`.

Keep new route files structurally close to these examples. If route behavior
requires a new guard/composition pattern that is not present in this project,
ask the user before implementing it.
