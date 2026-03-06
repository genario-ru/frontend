import { createFileRoute } from "@tanstack/react-router";

import { BillingSettingsComponent } from "@/entrypoints/billing-settings/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/settings/billing",
)({
  component: BillingSettingsComponent,
});
