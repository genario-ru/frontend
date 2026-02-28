import { createFileRoute } from "@tanstack/react-router";

import { getGetSessionOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";
import { AppComponent } from "@/entrypoints/app/component";
import { signOutUser } from "@/lib/auth/utils/logout-user";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context, location }) => {
    try {
      const sessionData = await context.queryClient.ensureQueryData(
        getGetSessionOptions(),
      );

      if (!sessionData) {
        signOutUser({ redirect: location.pathname });
      }

      return {
        ...context,
        sessionData,
      };
    } catch {
      signOutUser({ redirect: location.pathname });
    }
  },
  component: AppComponent,
  // pendingComponent: AuthenticatedPendingComponent,
});
