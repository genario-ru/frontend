import type { SubscriptionExtendedSchema } from "@/codegen/api/product";

export function isVisibleSubscription(
  subscription: SubscriptionExtendedSchema,
): boolean {
  if (subscription.status === "active" || subscription.status === "pending") {
    return true;
  }

  if (subscription.status === "cancelled" && subscription.endsAt) {
    return new Date(subscription.endsAt) > new Date();
  }

  return false;
}
