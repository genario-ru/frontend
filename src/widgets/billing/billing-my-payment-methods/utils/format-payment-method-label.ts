import type { PaymentMethodSchema } from "@/codegen/api/product";

const TYPE_LABEL_MAP: Record<string, string> = {
  bank_card: "Карта",
  sbp: "СБП",
  sber_pay: "СберПей",
  yoo_money: "ЮMoney",
};

export function formatPaymentMethodLabel(
  paymentMethod: PaymentMethodSchema,
): string {
  if (paymentMethod.title) {
    return paymentMethod.title;
  }

  const typeLabel = TYPE_LABEL_MAP[paymentMethod.type] ?? paymentMethod.type;
  return typeLabel;
}
