import { createFileRoute } from "@tanstack/react-router";

import { ProfileSettingsComponent } from "@/entrypoints/profile-settings/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/settings",
)({
  component: ProfileSettingsComponent,
});
