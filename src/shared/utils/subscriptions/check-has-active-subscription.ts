import { isFuture, isPast } from "date-fns";
import { isNull } from "es-toolkit";

import type { SubscriptionExtendedSchema } from "@/codegen/api/product";

export function checkHasActiveSubscription(
  subscriptions: SubscriptionExtendedSchema[],
) {
  const activeSubscriptions = subscriptions.filter((subscription) => {
    const isActive = ["active", "cancelled", "overdue"].includes(
      subscription.status,
    );

    const isStarted =
      isNull(subscription.startsAt) || isPast(subscription.startsAt);

    const isNotEnded =
      isNull(subscription.endsAt) || isFuture(subscription.endsAt);

    return isActive && isStarted && isNotEnded;
  });

  return activeSubscriptions.length > 0;
}
