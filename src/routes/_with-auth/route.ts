import { createFileRoute } from "@tanstack/react-router";

import { getGetSessionQueryOptions } from "@/codegen/api/auth";
import { signOutUser } from "@/lib/auth/utils/logout-user";

export const Route = createFileRoute("/_with-auth")({
  beforeLoad: async ({ context, location }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      getGetSessionQueryOptions(),
    );

    if (!sessionData) {
      signOutUser({ redirect: location.pathname });
    }

    return {
      ...context,
      sessionData,
    };
  },
});
