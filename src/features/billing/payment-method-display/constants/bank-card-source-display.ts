import ApplePayIcon from "@/assets/svgs/payment-methods/apple-pay.svg";
import GooglePayIcon from "@/assets/svgs/payment-methods/google-pay.svg";
import MirPayIcon from "@/assets/svgs/payment-methods/mir-pay.svg";
import type { CardSourceEnumKey } from "@/codegen/api/product";

import type { PaymentMethodDisplay } from "../types/payment-method-display-types";

export const bankCardSourceDisplay: Record<
  CardSourceEnumKey,
  PaymentMethodDisplay
> = {
  apple_pay: { title: "Apple Pay", icon: ApplePayIcon },
  google_pay: { title: "Google Pay", icon: GooglePayIcon },
  mir_pay: { title: "Mir Pay", icon: MirPayIcon },
};
