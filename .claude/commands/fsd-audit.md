# FSD Architecture Audit

Scan the codebase for FSD layer violations, bad import directions, and misplaced logic.

## Arguments

`$ARGUMENTS` — optional scope (e.g. "scenario domain" or "widgets only"). Defaults to full audit.

## What to check

### 1. Import direction violations

The dependency rule: `routes → entrypoints → widgets → features → actions → shared/lib → codegen`

Find reverse imports (higher layer imported by lower layer):

- `shared/` or `lib/` importing from `actions/`, `features/`, `widgets/`, `entrypoints/`
- `actions/` importing from `features/` or `widgets/`
- `features/` importing from `widgets/`

```bash
# Check shared for domain imports
grep -r "from \"@/actions\|from \"@/features\|from \"@/widgets" src/shared/ --include="*.ts" --include="*.tsx"
grep -r "from \"@/actions\|from \"@/features\|from \"@/widgets" src/lib/ --include="*.ts" --include="*.tsx"
```

### 2. Codegen used directly in widgets/features

Widgets and features must go through action hooks, not call codegen hooks directly:

```bash
grep -r "from \"@/codegen" src/widgets/ src/features/ --include="*.tsx" --include="*.ts"
```

### 3. Business logic in route files

Route files must only export `Route` via `createFileRoute`:

```bash
grep -rn "useState\|useEffect\|useMutation\|fetch(" src/routes/ --include="*.tsx"
```

### 4. Domain logic in shared/lib

```bash
# Domain-specific nouns in shared imports
grep -rn "scenario\|ideas\|billing\|tariff\|template" src/shared/ src/lib/ --include="*.ts" --include="*.tsx"
```

### 5. Zod imported directly (not from @/lib/zod)

```bash
grep -rn "from \"zod\"" src/ --include="*.ts" --include="*.tsx" | grep -v codegen | grep -v "lib/zod"
```

### 6. Manual edits to codegen

Check git status and diff for any changes in `src/codegen/`:

```bash
git diff HEAD -- src/codegen/
git status src/codegen/
```

## Report format

For each violation found:

- File path and line number
- Type of violation
- Recommended fix

## Fix violations

After identifying issues, fix them in order of severity:

1. Codegen edits (revert immediately)
2. Import direction violations
3. Direct codegen imports in widgets
4. Business logic in routes

Run after fixes:

```bash
pnpm lint:fix && pnpm lint:typescript
```
