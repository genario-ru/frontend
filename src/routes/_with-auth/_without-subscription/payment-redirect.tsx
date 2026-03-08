import {
  createFileRoute,
  redirect as tanstackRedirect,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { PaymentRedirectComponent } from "@/entrypoints/payment-redirect/component";
import { PaymentRedirectPendingComponent } from "@/entrypoints/payment-redirect/pending-component";
import { z } from "@/lib/zod";

const paymentRedirectSearchSchema = z.object({
  redirect: z.string().optional(),
  tariffSlug: z.string().optional(),
  trialTariffSlug: z.string().optional(),
});

export type PaymentRedirectSearch = z.infer<typeof paymentRedirectSearchSchema>;

export const Route = createFileRoute(
  "/_with-auth/_without-subscription/payment-redirect",
)({
  validateSearch: zodValidator(paymentRedirectSearchSchema),
  beforeLoad: ({
    context,
    search: { redirect, tariffSlug, trialTariffSlug },
  }) => {
    const { sessionData } = context;

    if (!sessionData) {
      throw tanstackRedirect({
        to: "/sign-in",
        search: {
          redirect,
          tariffSlug,
          trialTariffSlug,
        },
        replace: true,
      });
    }
  },
  component: PaymentRedirectComponent,
  pendingComponent: PaymentRedirectPendingComponent,
});
