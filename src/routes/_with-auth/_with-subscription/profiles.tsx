import { createFileRoute } from "@tanstack/react-router";

import { ProfilesComponent } from "@/entrypoints/profiles/component";

export const Route = createFileRoute("/_with-auth/_with-subscription/profiles")(
  {
    component: ProfilesComponent,
  },
);
