import { createFileRoute } from "@tanstack/react-router";

import { ProfilesComponent } from "@/entrypoints/profiles/component";

export const Route = createFileRoute("/_app/profiles")({
  component: ProfilesComponent,
});
