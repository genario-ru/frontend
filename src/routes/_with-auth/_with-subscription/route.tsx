import { createFileRoute, redirect } from "@tanstack/react-router";

import { getGetSessionQueryOptions } from "@/codegen/api/auth";
import { getApiV1SubscriptonsMyQueryOptions } from "@/codegen/api/product";
import { AppComponent } from "@/entrypoints/app/component";
import { AppErrorComponent } from "@/entrypoints/app/error-component";
import { AppPendingComponent } from "@/entrypoints/app/pending-component";
import { signOutUser } from "@/lib/auth/utils/logout-user";

export const Route = createFileRoute("/_with-auth/_with-subscription")({
  beforeLoad: async ({ context, location }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      getGetSessionQueryOptions(),
    );

    if (!sessionData) {
      signOutUser({ redirect: location.pathname });
    }

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

    return {
      ...context,
      sessionData,
    };
  },
  component: AppComponent,
  errorComponent: AppErrorComponent,
  pendingComponent: AppPendingComponent,
});
