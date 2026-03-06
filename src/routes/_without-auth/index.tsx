import { createFileRoute } from "@tanstack/react-router";

import { LandingComponent } from "@/entrypoints/landing/component";

export const Route = createFileRoute("/_without-auth/")({
  component: LandingComponent,
});
