import { useMemo } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";

import type { PaymentMethodDisplay } from "../types/payment-method-display-types";
import { getPaymentMethodDisplay } from "../utils/get-payment-method-display";

export function usePaymentMethodDisplay(
  paymentMethod: PaymentMethodSchema,
): PaymentMethodDisplay {
  return useMemo(() => getPaymentMethodDisplay(paymentMethod), [paymentMethod]);
}
