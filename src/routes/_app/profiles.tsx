import { createFileRoute } from "@tanstack/react-router";

import { getApiV1ProfilesMyQueryOptions } from "@/codegen/api/product";
import { ProfilesComponent } from "@/entrypoints/profiles/component";

export const Route = createFileRoute("/_app/profiles")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      ...getApiV1ProfilesMyQueryOptions(),
    });
  },
  component: ProfilesComponent,
});
