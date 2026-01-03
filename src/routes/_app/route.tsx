import { createFileRoute, Outlet } from "@tanstack/react-router";

import { getGetSessionOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";
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
  component: Outlet,
  // pendingComponent: AuthenticatedPendingComponent,
});
