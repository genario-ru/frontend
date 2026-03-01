import { createFileRoute } from "@tanstack/react-router";

import { getGetSessionQueryOptions } from "@/codegen/api/auth";
import { AppComponent } from "@/entrypoints/app/component";
import { AppErrorComponent } from "@/entrypoints/app/error-component";
import { AppPendingComponent } from "@/entrypoints/app/pending-component";
import { signOutUser } from "@/lib/auth/utils/logout-user";

export const Route = createFileRoute("/_app")({
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
  component: AppComponent,
  errorComponent: AppErrorComponent,
  pendingComponent: AppPendingComponent,
});
