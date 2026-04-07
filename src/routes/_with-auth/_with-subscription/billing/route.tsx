import { createFileRoute } from "@tanstack/react-router";

import { BillingLayoutComponent } from "@/entrypoints/billing-layout/component";

export const Route = createFileRoute("/_with-auth/_with-subscription/billing")({
  component: BillingLayoutComponent,
});
