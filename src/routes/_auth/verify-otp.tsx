import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { VerifyOTPComponent } from "@/entrypoints/verify-otp/component";
import { VerifyOTPErrorComponent } from "@/entrypoints/verify-otp/error-component";
import { z } from "@/lib/zod";

const verifyOTPSearchSchema = z.object({
  email: z.email(),
  redirect: z.string().optional(),
  tariffSlug: z.string().optional(),
  trialTariffSlug: z.string().optional(),
  isMarketingAccepted: z.boolean().optional(),
});

export type VerifyOTPSearch = z.infer<typeof verifyOTPSearchSchema>;

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: zodValidator(verifyOTPSearchSchema),
  component: VerifyOTPComponent,
  errorComponent: VerifyOTPErrorComponent,
});
