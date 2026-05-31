# Source Architecture

`src/` follows a pragmatic Feature-Sliced Design layout. The goal is predictable
file placement and dependency direction, not ceremony.

## Layers

| Layer       | Path                       | Use for                                                                       |
| ----------- | -------------------------- | ----------------------------------------------------------------------------- |
| routes      | `src/routes/**`            | TanStack route declarations, guards, redirects, search validation, preloaders |
| entrypoints | `src/entrypoints/**`       | Page-level composition: layouts plus widgets/features                         |
| widgets     | `src/widgets/<domain>/**`  | Complex domain blocks with local behavior and composed UI                     |
| features    | `src/features/<domain>/**` | Reusable domain UI, small domain helpers, display constants                   |
| actions     | `src/actions/<domain>/**`  | Business hooks wrapping API/query/mutation behavior                           |
| shared      | `src/shared/**`            | Cross-domain components, hooks, utils, constants, types                       |
| lib         | `src/lib/**`               | Technical infrastructure: API client, auth, i18n, form, router, zod           |
| codegen     | `src/codegen/**`           | Generated API and router files, read-only                                     |
| globals     | `src/globals/**`           | Global `.d.ts` declarations                                                   |
| assets      | `src/assets/**`            | Static assets imported by the app                                             |
| styles      | `src/styles/**`            | Global styles and theme CSS                                                   |

Default dependency direction:

```text
routes -> entrypoints -> widgets -> features/actions -> shared/lib
```

`actions` may import generated API hooks and query helpers. Widgets and features
should prefer action hooks for network behavior, but may import generated types,
schemas, enums, and query keys when they need API contract data.

## Placement Shortcuts

- New page route: `src/routes/**` plus `src/entrypoints/<page>/component.tsx`.
- Page layout/wiring: `src/entrypoints/**`.
- Domain block that fetches/mutates and renders UI: `src/widgets/<domain>/**`.
- Reusable domain component: `src/features/<domain>/**`.
- Business hook around generated API behavior: `src/actions/<domain>/hooks/**`.
- Reusable UI primitive or cross-domain helper: `src/shared/**`.
- App infrastructure or wrappers around external libraries: `src/lib/**`.

## Current Domain Folders

Action domains:

```text
archive, auth, billing, credits, ideas, ideas-lists, platforms,
production-statuses, profiles, scenario, subscriptions, tariffs, templates,
tones, video-durations, video-types
```

Feature/widget/entrypoint domains are broader and include UI-only areas such as
`landing`, `navigation`, `settings`, `legal`, `home`, and `profiles-import`.

## Generated Files

Do not edit:

- `src/codegen/api/product/**`
- `src/codegen/router/route-tree.gen.ts`
- `src/globals/i18next-resources.d.ts`

Use:

```bash
pnpm api:generate
pnpm router:generate
pnpm i18n:resources
```

## Before Creating New Domain Files

Read at least 3 similar files in the target layer and copy the local structure,
naming, import style, and hook/component split. Prefer same-domain examples; if
they do not exist, use the closest related domains.
