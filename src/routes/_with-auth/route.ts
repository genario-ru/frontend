import { createFileRoute, redirect } from "@tanstack/react-router";

import { getApiV1AuthSessionQueryOptions } from "@/codegen/api/product";
import { WithAuthPendingComponent } from "@/entrypoints/with-auth/pending-component";

export const Route = createFileRoute("/_with-auth")({
  beforeLoad: async ({ context, location }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      getApiV1AuthSessionQueryOptions(),
    );

    if (!sessionData) {
      throw redirect({
        replace: true,
        reloadDocument: true,
        to: "/sign-in",
        search: {
          redirect: location.pathname,
        },
      });
    }

    return {
      ...context,
      sessionData,
    };
  },
  pendingComponent: WithAuthPendingComponent,
});
