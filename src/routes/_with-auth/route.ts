import { createFileRoute, redirect } from "@tanstack/react-router";

import { getGetSessionQueryOptions } from "@/codegen/api/auth";

export const Route = createFileRoute("/_with-auth")({
  beforeLoad: async ({ context, location }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      getGetSessionQueryOptions(),
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
});
