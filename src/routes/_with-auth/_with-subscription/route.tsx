import { createFileRoute, redirect } from "@tanstack/react-router";
import { isFuture, isPast } from "date-fns";
import { isNull } from "es-toolkit";

import {
  getApiV1SubscriptonsMyQueryOptions,
  type SubscriptionExtendedSchema,
} from "@/codegen/api/product";
import { WithSubscriptionComponent } from "@/entrypoints/with-subscription/component";

export const Route = createFileRoute("/_with-auth/_with-subscription")({
  beforeLoad: async ({ context }) => {
    const subscriptions = await context.queryClient.ensureQueryData({
      ...getApiV1SubscriptonsMyQueryOptions(),
    });

    const hasActiveSubscription = checkHasActiveSubscription(
      subscriptions.data,
    );

    if (!hasActiveSubscription) {
      throw redirect({
        replace: true,
        to: "/tariffs",
      });
    }

    return context;
  },
  component: WithSubscriptionComponent,
});

function checkHasActiveSubscription(
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
