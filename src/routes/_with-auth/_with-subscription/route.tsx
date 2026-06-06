import { createFileRoute, redirect } from "@tanstack/react-router";

import { getApiV1SubscriptionsMyQueryOptions } from "@/codegen/api/product";
import { WithSubscriptionComponent } from "@/entrypoints/with-subscription/component";
import { checkHasActiveSubscription } from "@/shared/utils/subscriptions/check-has-active-subscription";

export const Route = createFileRoute("/_with-auth/_with-subscription")({
  beforeLoad: async ({ context }) => {
    const subscriptions = await context.queryClient.ensureQueryData({
      ...getApiV1SubscriptionsMyQueryOptions(),
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
