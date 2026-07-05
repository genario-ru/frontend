@AGENTS.md

# Claude Code Notes

Use `AGENTS.md` as the shared project contract, but do not stop at reading it.
For any non-trivial code task, inspect the relevant local files before editing.

## Default Task Flow

1. Identify the requested behavior and likely FSD layer.
2. Read the nearest docs:
   - `src/README.md` for placement;
   - `src/routes/README.md` for route work;
   - `kubb.config.ts` for API generation work.
3. Inspect at least 3 similar local implementations before creating new domain
   files.
4. Ask the user before coding if references conflict, several compositions are
   viable, or the task requires a new custom abstraction/pattern/library.
5. Make the smallest change that satisfies the request.
6. Run generators when needed:
   - route files changed -> `pnpm router:generate`;
   - locale JSON changed -> `pnpm i18n:resources`;
   - API schema changed -> `pnpm api:generate`.
7. Run validation for code changes:
   - `pnpm lint:fix`;
   - `pnpm lint:typescript`.

## Frontend-Specific Rules

- Do not use routine request `try/catch` in components, widgets, features, or
  action hooks. GET errors come from TanStack Query state; mutation side effects
  use `onSuccess`/`onError` callbacks.
- Keep non-trivial widget logic in colocated hooks. Components should mostly
  render loading/error/empty/success states.
- Use `useMemo` for dynamic body/layout/slot content and derived collections.
- Use `useCallback` for handlers.
- Keep forms, `useAppForm`, `withForm` subcomponents, schemas, types, and form
  helpers in the owning widget.
- Keep features presentational and reusable. Do not move `withForm` children or
  widget orchestration into features.
- Prefer flat props/params and a single object parameter for functions, hooks,
  and components.

## Claude-Specific Guidance

- Prefer the project commands in `.claude/commands/**` for repeatable workflows.
- Use `.claude/agents/**` for focused review or diagnosis when a task spans
  planning, FSD review, codegen adaptation, i18n, or TypeScript repair.
- Do not add personal machine permissions or local preferences to committed
  project files. Use local settings for that.
- If a Claude memory file disagrees with `AGENTS.md`, update the memory file
  rather than following stale memory.
