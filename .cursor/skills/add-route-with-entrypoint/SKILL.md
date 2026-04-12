---
name: add-route-with-entrypoint
description: Adds a new TanStack file route with proper entrypoint composition while keeping route files minimal. Use when creating a new page route or extending navigation structure.
---

# Add Route With Entrypoint

## Goal

Add a new route without violating the `Route-only` rule in `src/routes/**`.

## Pre-coding step

Read 2–3 existing route files in the same layout group and their corresponding entrypoints to understand the patterns.

## Steps

1. **Choose the correct layout group:**
   - Requires auth + subscription → `src/routes/_with-auth/_with-subscription/`
   - Requires auth only → `src/routes/_with-auth/_without-subscription/`
   - Unauthenticated page → `src/routes/_auth/` or `src/routes/_without-auth/`

2. **Create the entrypoint** at `src/entrypoints/<name>/component.tsx`:
   - Page-level composition only — layout, widgets, and sections.
   - Import domain widgets and features, not raw codegen hooks.

3. **Create the route file** in the appropriate `src/routes/` folder:

   ```typescript
   import { createFileRoute } from "@tanstack/react-router";
   import { zodValidator } from "@tanstack/zod-adapter";
   import { z } from "@/lib/zod";
   import { MyPageComponent } from "@/entrypoints/my-page/component";

   const searchSchema = z.object({ q: z.string().optional() });

   export const Route = createFileRoute(
     "/_with-auth/_with-subscription/my-page",
   )({
     validateSearch: zodValidator(searchSchema),
     beforeLoad: async ({ context }) => {
       // preload data if needed
     },
     component: MyPageComponent,
   });
   ```

4. **Domain blocks** (if needed) → add to `widgets/features/actions`, not to the route file.

5. **Regenerate route tree:**

   ```bash
   pnpm router:generate
   ```

6. **Verify:**
   ```bash
   pnpm lint:fix
   pnpm lint:typescript
   ```

## Constraints

- Never edit `src/codegen/router/route-tree.gen.ts` manually.
- No business logic in `src/routes/**` — only `Route` declaration.
- Route component must point to an entrypoint, not an inline component.
