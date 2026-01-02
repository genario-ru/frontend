import { createFileRoute } from "@tanstack/react-router";

import { AuthComponent } from "@/entrypoints/auth/component";

export const Route = createFileRoute("/_auth")({
  component: AuthComponent,
});
