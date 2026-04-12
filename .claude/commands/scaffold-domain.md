# Scaffold New Domain

Create the full folder structure for a new FSD domain across all relevant layers.

## Arguments

`$ARGUMENTS` — domain name in kebab-case (e.g. "notifications" or "video-scripts").

## Pre-coding step

Pick 2 existing domains of similar complexity and review their full structure:

```
src/actions/<similar-domain>/
src/features/<similar-domain>/
src/widgets/<similar-domain>/
```

List the reference domains before scaffolding.

## Folder structure to create

```
src/
├── actions/<domain>/
│   └── hooks/
│       └── .gitkeep           # placeholder — add hooks as needed
├── features/<domain>/
│   └── .gitkeep               # placeholder — add feature components as needed
└── widgets/<domain>/
    └── .gitkeep               # placeholder — add widgets as needed
```

Only create the entrypoint when you know the page name:

```
src/entrypoints/<page-name>/
└── component.tsx
```

## Conventions

- Domain folder names: `kebab-case` (e.g. `video-scripts`, not `videoScripts`)
- Action hook filenames: `use-<verb>-<noun>.ts` (e.g. `use-get-notifications.ts`)
- Feature folder names: `<feature-name>/components/`
- Widget folder names: `<widget-name>/components/` + `<widget-name>/hooks/` (if local state needed)

## After scaffolding

1. Add the new domain name to the domains list in `CLAUDE.md` and `.cursor/rules/01-architecture-fsd.mdc`.
2. Create the first action hook using the `/project:add-domain-feature` workflow.
3. If a route is needed, use `/project:add-route`.

## Verify

```bash
pnpm lint:fix && pnpm lint:typescript
```
