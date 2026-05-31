---
name: Frontend project architecture
description: FSD layers, tech stack, domains, and structural rules for the Genario frontend
type: project
---

Canonical guide: `AGENTS.md`.

React 19 + TypeScript SPA with a pragmatic Feature-Sliced Design layout.

## Layers

| Layer       | Path                     | Purpose                                                                       |
| ----------- | ------------------------ | ----------------------------------------------------------------------------- |
| routes      | `src/routes/`            | TanStack route declarations, guards, redirects, search validation, preloaders |
| entrypoints | `src/entrypoints/`       | Page-level composition                                                        |
| widgets     | `src/widgets/<domain>/`  | Complex domain blocks                                                         |
| features    | `src/features/<domain>/` | Reusable domain UI and small helpers                                          |
| actions     | `src/actions/<domain>/`  | Business hooks wrapping API/query/mutation behavior                           |
| shared      | `src/shared/`            | Cross-domain UI, hooks, utils, constants, types                               |
| lib         | `src/lib/`               | Technical infrastructure                                                      |
| codegen     | `src/codegen/`           | Generated API/router files, read-only                                         |

Default dependency direction:

```text
routes -> entrypoints -> widgets -> features/actions -> shared/lib
```

## Stack

- TanStack Router 1.x
- TanStack Query 5
- TanStack Form through `@/lib/tanstack-form`
- Tailwind CSS 4 with `cn()` from `@/shared/utils/cn`
- Zod 4 through `@/lib/zod`
- Kubb 4 from `deps/api/product.json` to `src/codegen/api/product/**`
- i18next locale resources in `public/locales/{en,ru}/translation.json`; not the
  default translation layer for all UI text

## Hard rules

- Do not manually edit `src/codegen/**`.
- Keep route files focused on route behavior and entrypoint references.
- Keep page composition in `src/entrypoints/**`.
- Keep domain-specific business logic out of `src/shared/**` and `src/lib/**`.
