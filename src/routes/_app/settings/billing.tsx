import { createFileRoute } from "@tanstack/react-router";

import { BillingSettingsComponent } from "@/entrypoints/billing-settings/component";

export const Route = createFileRoute("/_app/settings/billing")({
  component: BillingSettingsComponent,
});
