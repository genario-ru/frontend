import { z } from "@/lib/zod";

export const creditsPackagePaymentMethodFormSchema = z.object({
  paymentMethodId: z.string().min(1, "Выберите способ оплаты"),
});
