import type { SubscriptionExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const subscriptionStatusColor: Record<
  SubscriptionExtendedSchemaStatusEnumKey,
  "positive" | "negative" | "warning" | "neutral"
> = {
  active: "positive",
  pending: "neutral",
  cancelled: "negative",
  overdue: "warning",
  terminated: "neutral",
};
