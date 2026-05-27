import { createFileRoute, redirect } from "@tanstack/react-router";

import { getApiV1AuthSessionQueryOptions } from "@/codegen/api/product";
import { WithAuthComponent } from "@/entrypoints/with-auth/component";
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
          redirect: `${location.pathname}${location.searchStr}`,
        },
      });
    }

    return {
      ...context,
      sessionData,
    };
  },
  component: WithAuthComponent,
  pendingComponent: WithAuthPendingComponent,
});
