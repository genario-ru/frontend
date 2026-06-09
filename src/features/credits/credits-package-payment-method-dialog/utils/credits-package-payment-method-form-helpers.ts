import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { creditsPackagePaymentMethodFormSchema } from "../schemas/credits-package-payment-method-form-schema";
import type { CreditsPackagePaymentMethodFormSchema } from "../types/credits-package-payment-method-form-types";

export const creditsPackagePaymentMethodFormValidateFn =
  createFormValidateFn<CreditsPackagePaymentMethodFormSchema>(
    creditsPackagePaymentMethodFormSchema,
  );
