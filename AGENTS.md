# AGENTS.md - Genario Frontend

This is the canonical working guide for coding agents in `genario-frontend`.
Tool-specific files may add workflow detail, but they must not contradict this
file.

## Project Snapshot

- React 19 + TypeScript SPA built with Vite.
- Package manager: `pnpm` with `pnpm-lock.yaml`.
- Routing: TanStack Router file routes in `src/routes`.
- Server state: TanStack Query, mostly through Kubb-generated product API hooks.
- Forms: TanStack Form through `useAppForm` from `@/lib/tanstack-form`.
- Styling: Tailwind CSS 4, `cn()` from `@/shared/utils/cn`.
- Validation: Zod via `@/lib/zod`, not direct `zod` imports.
- i18next exists, but it is not the default translation layer at this stage.
  Use locale resources only where the code already uses them or when i18next
  pluralization/inflection is needed.
- API codegen: one OpenAPI schema at `deps/api/product.json`, generated to
  `src/codegen/api/product/**`.

There is no standardized `pnpm test` script. Vitest is installed, but do not
claim test coverage exists unless `package.json` adds a real test command.

## Source Of Truth

Read these before making non-trivial changes:

- `package.json` for exact scripts and dependencies.
- `src/README.md` for architecture and placement.
- `src/routes/README.md` for route file boundaries.
- `kubb.config.ts` for API generation behavior.
- `vite.config.ts` for router generation, PWA, aliases, and plugins.
- `.cursor/rules/**`, `.agents/skills/**`, and `.claude/**` for scoped agent
  workflows.

If documentation disagrees with code/config, trust code/config first, then
update the documentation in the same change.

## Architecture Model

`src/` uses a pragmatic Feature-Sliced Design layout. The point is to keep
change impact predictable:

- routes decide navigation, validation, redirects, and route-level preloading;
- entrypoints compose pages;
- widgets own complex domain UI and local interaction behavior;
- features provide reusable domain UI and small domain helpers;
- actions hide generated API/query/mutation details behind project-level hooks;
- shared/lib stay cross-domain and infrastructure-focused.

| Path                    | Purpose                                                             |
| ----------------------- | ------------------------------------------------------------------- |
| `src/routes`            | TanStack route declarations, guards, search validation, preloaders  |
| `src/entrypoints`       | Page-level composition and layout wiring                            |
| `src/widgets/<domain>`  | Complex domain blocks combining UI and behavior                     |
| `src/features/<domain>` | Reusable domain UI and small domain helpers                         |
| `src/actions/<domain>`  | Business hooks wrapping API/query/mutation behavior                 |
| `src/shared`            | Cross-domain UI, hooks, utils, constants, types                     |
| `src/lib`               | Technical infrastructure: API client, auth, i18n, router, form, zod |
| `src/codegen`           | Generated files, read-only                                          |
| `src/globals`           | Global `.d.ts` declarations                                         |

Default dependency direction:

```text
routes -> entrypoints -> widgets -> features/actions -> shared/lib
```

This is a dependency direction, not a ban on all lateral reuse. The practical
rule is: lower-level or generic code must not depend on higher-level product
composition. If a helper becomes useful across domains, move it down into
`shared` or `lib` only after removing domain assumptions from it.

## Layer Placement

Use this placement logic before creating files:

1. Is this only a URL/guard/search/preload concern? Put it in `src/routes`.
2. Is this page composition with existing widgets/features? Put it in
   `src/entrypoints`.
3. Does it combine API behavior, local state, and UI for one domain block? Put
   it in `src/widgets/<domain>`.
4. Is it reusable domain UI or a small display helper? Put it in
   `src/features/<domain>`.
5. Is it business orchestration around generated API/query/mutation behavior?
   Put it in `src/actions/<domain>/hooks`.
6. Is it generic UI, a cross-domain hook, or a utility? Put it in `src/shared`.
7. Is it an adapter/configuration around infrastructure or a third-party
   library? Put it in `src/lib`.

When unsure, inspect 3 similar local examples before writing code. Prefer the
same domain; otherwise use nearby domains with the same shape.

## Generated API Usage

`src/codegen/api/product/**` is generated. Never edit it manually.

Prefer this flow for network behavior:

```text
codegen hook -> action hook -> widget/feature/entrypoint usage
```

Allowed imports from generated API outside `actions`:

- types and enums;
- API-derived Zod schemas;
- query keys for invalidation;
- query options in route guards/loaders/preloaders.

Avoid introducing new generated network hook calls directly in widgets or
feature UI. The action layer exists so generated naming, signatures, cache
details, and mutation behavior do not leak through the app.

## Route Rules

Route files may contain:

- `createFileRoute(...)` and `Route` export;
- route-local search schemas and exported search types;
- guards, redirects, and route-level preloading in `beforeLoad`;
- `loader` logic when the data is truly route-level;
- references to entrypoint components.

Route files must not contain page JSX, domain component implementations, widget
logic, or ad hoc business hooks. Page composition belongs in `src/entrypoints`.

After route file changes, run `pnpm router:generate`.

## Forms, Validation, Styling, And i18n

- Use `useAppForm` from `@/lib/tanstack-form`, not bare `useForm`.
- Use `z` from `@/lib/zod`, not direct imports from `"zod"`.
- Use `cn()` from `@/shared/utils/cn` for conditional class names.
- Prefer `src/shared/components/ui/**` primitives before creating new UI.
- Do not convert ordinary new UI text to i18n keys by default.
- Use i18n only when working in an already-i18n area, when the task explicitly
  asks for locale resources, or when i18next pluralization/inflection is useful
  for correct Russian/English word forms.
- Never manually edit `src/globals/i18next-resources.d.ts`; run
  `pnpm i18n:resources` after locale JSON changes.

These rules exist because this project has app-level wrappers for validation
messages, form fields, class merging, and typed locale resources. Bypassing the
wrappers creates inconsistent UI and type drift; overusing i18n creates needless
translation churn.

## Common Workflows

### New or changed route

1. Read 2-3 nearby route files in the same layout group.
2. Add/update the route under `src/routes/**`.
3. Put page composition under `src/entrypoints/<page>/component.tsx`.
4. Put domain UI/behavior in widgets/features/actions, not in the route file.
5. Run `pnpm router:generate`.
6. Run `pnpm lint:fix` and `pnpm lint:typescript`.

### Domain feature

1. Identify the target layer using the placement logic above.
2. Read at least 3 similar files in that layer.
3. Check `src/codegen/api/product/**` for existing contracts.
4. Create or update action hooks before wiring generated network behavior into
   UI.
5. Add i18n keys only if the touched area already uses i18n, the task asks for
   locale resources, or pluralization/inflection requires i18next.
6. Run the relevant generators and validation commands.

### API schema update

1. Run `pnpm api:download` only when the backend schema must be refreshed.
2. Run `pnpm api:generate`.
3. Review generated changes without editing `src/codegen/**`.
4. Adapt handwritten code in this order:
   - `src/actions/**`;
   - `src/routes/**`;
   - `src/widgets/**` and `src/features/**`.
5. Run `pnpm lint:typescript`; run `pnpm lint:fix` if imports/formatting
   changed.

### i18n / pluralization update

1. Use this workflow only for existing locale-backed text, explicit i18n tasks,
   or pluralization/inflection work.
2. Update both `public/locales/en/translation.json` and
   `public/locales/ru/translation.json` when locale resources are changed.
3. Keep nesting identical across locales.
4. Run `pnpm i18n:resources`.
5. Run `pnpm lint:typescript`.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint:fix
pnpm lint:typescript
pnpm router:generate
pnpm api:download
pnpm api:generate
pnpm api:generate:hey-api
pnpm i18n:resources
```

## Completion Checklist

Before finishing a code task, report:

- files changed;
- local reference files inspected;
- generators run, if any;
- validation commands run and their result;
- validation skipped, if any, with the reason.

Do not report completion if generated files are stale, locale resource types are
stale, or TypeScript validation failed for changes you made.
