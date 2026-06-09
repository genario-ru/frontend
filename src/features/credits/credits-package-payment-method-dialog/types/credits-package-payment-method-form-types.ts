import { z } from "@/lib/zod";

import type { creditsPackagePaymentMethodFormSchema } from "../schemas/credits-package-payment-method-form-schema";

export type CreditsPackagePaymentMethodFormSchema = z.infer<
  typeof creditsPackagePaymentMethodFormSchema
>;
