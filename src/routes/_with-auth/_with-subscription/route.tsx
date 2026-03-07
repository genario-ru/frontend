import { createFileRoute, redirect } from "@tanstack/react-router";

import { getApiV1SubscriptonsMyQueryOptions } from "@/codegen/api/product";
import { AppComponent } from "@/entrypoints/app/component";
import { AppErrorComponent } from "@/entrypoints/app/error-component";
import { AppPendingComponent } from "@/entrypoints/app/pending-component";

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
  component: AppComponent,
  errorComponent: AppErrorComponent,
  pendingComponent: AppPendingComponent,
});
