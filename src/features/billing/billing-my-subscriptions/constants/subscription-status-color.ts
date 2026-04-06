import type { SubscriptionExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const subscriptionStatusColor: Record<
  SubscriptionExtendedSchemaStatusEnumKey,
  "positive" | "negative" | "neutral"
> = {
  active: "positive",
  pending: "neutral",
  cancelled: "negative",
  overdue: "negative",
  terminated: "neutral",
};
