import type { SubscriptionExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const subscriptionStatusLabel: Record<
  SubscriptionExtendedSchemaStatusEnumKey,
  string
> = {
  active: "Активный",
  pending: "Предстоящий",
  cancelled: "Отменённый",
  overdue: "Просроченный",
  terminated: "Завершённый",
};
