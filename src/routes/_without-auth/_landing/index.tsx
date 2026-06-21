import { createFileRoute } from "@tanstack/react-router";

import { WaitlistLandingComponent } from "@/entrypoints/waitlist-landing/component";

export const Route = createFileRoute("/_without-auth/_landing/")({
  component: WaitlistLandingComponent,
});
