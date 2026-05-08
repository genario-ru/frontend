import { createFileRoute } from "@tanstack/react-router";

import { BillingComponent } from "@/entrypoints/billing/component";

export const Route = createFileRoute("/_with-auth/_with-subscription/billing/")(
  { component: BillingComponent },
);
