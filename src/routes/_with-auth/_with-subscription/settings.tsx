import { createFileRoute } from "@tanstack/react-router";

import { SettingsComponent } from "@/entrypoints/settings/component";

export const Route = createFileRoute("/_with-auth/_with-subscription/settings")(
  {
    component: SettingsComponent,
  },
);
