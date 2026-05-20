import { createFileRoute, redirect } from "@tanstack/react-router";

import { getApiV1SubscriptonsMyQueryOptions } from "@/codegen/api/product";
import { WithSubscriptionComponent } from "@/entrypoints/with-subscription/component";

export const Route = createFileRoute("/_with-auth/_with-subscription")({
  beforeLoad: async ({ context }) => {
    const subscriptions = await context.queryClient.ensureQueryData({
      ...getApiV1SubscriptonsMyQueryOptions(),
    });

    const hasActiveSubscription = subscriptions.data.some(
      (subscription) => subscription.status === "active",
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
