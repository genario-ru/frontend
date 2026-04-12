---
name: Frontend code conventions and patterns
description: Key code patterns, naming rules, and conventions used throughout the project
type: project
---

Conventions enforced by ESLint/Prettier config + `.cursor/rules/`. Must follow to pass `pnpm lint:typescript`.

**Why:** Project has automated lint checks; deviations cause CI failures.

**How to apply:** Use these patterns as default for all new code in this project.

## Naming

- Domain folders: `kebab-case`
- Hook files: `use-<name>.ts` prefix
- Component files: `<component-name>.tsx` (kebab-case)
- Named exports only (no default exports for components)

## Imports

- Always use `@/*` path alias for `src/` imports
- Import order sorted automatically (simple-import-sort ESLint plugin)
- Zod: `import { z } from "@/lib/zod"` — never from `"zod"` directly
- Classnames: `import { cn } from "@/shared/utils/cn"`
- Forms: `import { useAppForm } from "@/lib/tanstack-form"`

## Component structure

```typescript
type MyComponentProps = { ... };

export function MyComponent({ prop }: MyComponentProps) {
  return (...);
}
```

## Action hook structure

Wraps codegen hook, returns clean object:

```typescript
export function useGetSomething() {
  const { data, isLoading, isError } = useGetSomethingFromCodegen();
  return { data, isLoading, isError };
}
```

## Form pattern

```typescript
import { useAppForm } from "@/lib/tanstack-form";
import { z } from "@/lib/zod";

const form = useAppForm({
  defaultValues: { name: "" },
  validators: { onSubmit: z.object({ name: z.string().min(1) }) },
  onSubmit: async ({ value }) => {
    /* mutation call */
  },
});
```

## Pre-coding rule for new domain files

Before creating any new file in `actions/`, `features/`, `widgets/`, `entrypoints/`:
find and read at least **3 similar existing implementations** in the same layer to match local patterns.

## Completion checklist

1. Correct FSD layer
2. No edits to `src/codegen/**`
3. Routes changed? → `pnpm router:generate`
4. Locale JSON changed? → `pnpm i18n:resources`
5. `pnpm lint:fix` → `pnpm lint:typescript`
