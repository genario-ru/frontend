import type { SubscriptionExtendedSchemaStatusEnumKey } from "@/codegen/api/product";

export const subscriptionStatusVariant: Record<
  SubscriptionExtendedSchemaStatusEnumKey,
  "secondary" | "tertiary"
> = {
  active: "secondary",
  pending: "tertiary",
  cancelled: "secondary",
  overdue: "secondary",
  terminated: "secondary",
};
