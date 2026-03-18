# AGENTS Guide (frontend)

This file defines the baseline workflow for coding agents in this repository.

## Source of truth files

- Architecture: `src/README.md`
- Routing constraints: `src/routes/README.md`
- Project scripts and checks: `package.json`
- Cursor rules and skills: `.cursor/rules/**`, `.cursor/skills/**`

## Non-negotiable boundaries

- Follow FSD placement by layer (`actions`, `features`, `widgets`, `shared`, `lib`, `entrypoints`, `routes`).
- Keep route files in `src/routes/**` focused on `Route` declaration via `createFileRoute`.
- Never manually edit generated files in `src/codegen/**`.

## File placement

- Business orchestration hooks -> `src/actions/<domain>`
- Complex composed domain blocks -> `src/widgets/<domain>`
- Reusable domain UI components -> `src/features/<domain>`
- Cross-domain reusable code -> `src/shared/**`
- Technical infrastructure -> `src/lib/**`
- Page-level composition -> `src/entrypoints/**`

## Required completion checklist

1. Ensure all changes are in the proper layer.
2. If routes changed, run `pnpm router:generate`.
3. Run quality checks:
   - `pnpm lint:fix`
   - `pnpm lint:typescript`
4. Report changed files and verification steps.

## Codegen workflow

- Download schemas when required: `pnpm api:download`
- Regenerate clients/types: `pnpm api:generate` (or `pnpm api:generate:hey-api` when explicitly requested)
- Adapt only hand-written code outside generated folders.

## Style defaults

- Prefer `@/*` imports for `src`.
- Keep imports sorted and formatting aligned with ESLint/Prettier config.
