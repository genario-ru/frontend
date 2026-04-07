import { createFileRoute } from "@tanstack/react-router";

import { BillingCreditsComponent } from "@/entrypoints/billing-credits/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/billing/credits",
)({
  component: BillingCreditsComponent,
});
