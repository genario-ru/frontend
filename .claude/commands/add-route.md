# Add Route With Entrypoint

Create a new TanStack file-based route with proper entrypoint composition. Route files stay minimal; all logic belongs in entrypoints and below.

## Arguments

`$ARGUMENTS` — route path and layout group (e.g. "/\_with-auth/\_with-subscription/templates" or "\_auth/verify-otp").

## Pre-coding step

Read 2–3 existing route files in the same layout group and their corresponding entrypoints:

- `src/routes/_with-auth/_with-subscription/`
- `src/entrypoints/` (pick nearest pages)

## Step 1 — Choose layout group

| Scenario                              | Folder                                         |
| ------------------------------------- | ---------------------------------------------- |
| Requires login + active subscription  | `src/routes/_with-auth/_with-subscription/`    |
| Requires login only (no subscription) | `src/routes/_with-auth/_without-subscription/` |
| Unauthenticated page (sign-in, OTP)   | `src/routes/_auth/`                            |
| Redirect away if already logged in    | `src/routes/_without-auth/`                    |

## Step 2 — Create entrypoint

File: `src/entrypoints/<page-name>/component.tsx`

- Page-level composition only: layout, widgets, section wiring.
- Import domain widgets from `src/widgets/`, never raw codegen hooks.
- Export a named component (e.g. `export function TemplatesPage()`).

## Step 3 — Create route file

```typescript
// src/routes/_with-auth/_with-subscription/templates.tsx
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "@/lib/zod";
import { TemplatesPage } from "@/entrypoints/templates/component";
import { getGetApiV1TemplatesQueryOptions } from "@/codegen/api/product";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/templates",
)({
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getGetApiV1TemplatesQueryOptions(),
    );
  },
  component: TemplatesPage,
});
```

**Route file rules:**

- Only `Route` is exported.
- No business logic, no JSX components defined inline.
- `component` must point to an entrypoint.

## Step 4 — Regenerate route tree

```bash
pnpm router:generate
```

This updates `src/codegen/router/route-tree.gen.ts` — never edit it manually.

## Step 5 — Verify

```bash
pnpm lint:fix && pnpm lint:typescript
```
