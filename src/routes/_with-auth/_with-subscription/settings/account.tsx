import { createFileRoute } from "@tanstack/react-router";

import { AccountSettingsComponent } from "@/entrypoints/account-settings/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/settings/account",
)({
  component: AccountSettingsComponent,
});
