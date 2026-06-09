import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { PaymentRedirectComponent } from "@/entrypoints/payment-redirect/component";
import { z } from "@/lib/zod";

const paymentRedirectSearchSchema = z
  .object({
    redirect: z.string().optional(),
    tariffSlug: z.string().optional(),
    trialTariffSlug: z.string().optional(),
    creditsPackageSlug: z.string().optional(),
    paymentMethodId: z.string().optional(),
    paymentId: z.string().optional(),
  })
  .refine(
    (data) => data.tariffSlug || data.creditsPackageSlug || data.paymentId,
    {
      path: ["tariffSlug", "creditsPackageSlug", "paymentId"],
      message: "В ссылке отсутствуют обязательные параметры",
    },
  );

export type PaymentRedirectSearch = z.infer<typeof paymentRedirectSearchSchema>;

export const Route = createFileRoute(
  "/_with-auth/_without-subscription/payment-redirect",
)({
  validateSearch: zodValidator(paymentRedirectSearchSchema),
  component: PaymentRedirectComponent,
});
