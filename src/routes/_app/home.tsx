import { createFileRoute } from "@tanstack/react-router";

import {
  getApiV1ArchiveItemsMyInfiniteQueryOptions,
  getApiV1TemplatesQueryOptions,
} from "@/codegen/api/product";
import { HomeComponent } from "@/entrypoints/home/component";

export const Route = createFileRoute("/_app/home")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      ...getApiV1TemplatesQueryOptions(),
    });

    context.queryClient.ensureInfiniteQueryData({
      ...getApiV1ArchiveItemsMyInfiniteQueryOptions(),
      initialPageParam: 1,
    });
  },
  component: HomeComponent,
});
