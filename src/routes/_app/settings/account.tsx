import { createFileRoute } from "@tanstack/react-router";

import { AccountSettingsComponent } from "@/entrypoints/account-settings/component";

export const Route = createFileRoute("/_app/settings/account")({
  component: AccountSettingsComponent,
});
