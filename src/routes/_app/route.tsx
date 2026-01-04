import { createFileRoute } from "@tanstack/react-router";

import { getGetSessionOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";
import { AppComponent } from "@/entrypoints/app/component";
import { logoutUser } from "@/lib/auth/utils/logout-user";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context, location }) => {
    try {
      const sessionData = await context.queryClient.ensureQueryData(
        getGetSessionOptions(),
      );

      if (!sessionData) {
        logoutUser({ redirectTo: location.pathname });
      }

      return {
        ...context,
        sessionData,
      };
    } catch {
      logoutUser({ redirectTo: location.pathname });
    }
  },
  component: AppComponent,
  // pendingComponent: AuthenticatedPendingComponent,
});
