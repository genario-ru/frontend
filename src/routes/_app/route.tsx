import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getUserOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context, location }) => {
    try {
      const userData =
        await context.queryClient.ensureQueryData(getUserOptions());

      return {
        ...context,
        userData,
      };
    } catch {
      // logoutUser({ queryClient: context.queryClient });

      throw redirect({
        replace: true,
        reloadDocument: true,
        to: "/sign-in",
        search: {
          redirect: location.pathname,
        },
        mask: {
          to: "/sign-in",
        },
      });
    }
  },
  component: Outlet,
  // pendingComponent: AuthenticatedPendingComponent,
});
