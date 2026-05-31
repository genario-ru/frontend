# Scaffold New Domain

Arguments: `$ARGUMENTS` - domain name in kebab-case.

Read `AGENTS.md` first.

## Workflow

1. Pick 2 similar existing domains and inspect their structure.
2. Create only folders/files that are needed for the current task. Avoid empty
   scaffolding unless the next implementation step requires it.
3. Use:
   - `src/actions/<domain>/hooks/` for business hooks
   - `src/features/<domain>/` for reusable domain UI
   - `src/widgets/<domain>/` for composite blocks
   - `src/entrypoints/<page>/` only when there is a page
4. Add the new domain to `AGENTS.md` and `.cursor/rules/01-architecture-fsd.mdc`
   only after real code exists there.

## Verify

```bash
pnpm lint:fix
pnpm lint:typescript
```
