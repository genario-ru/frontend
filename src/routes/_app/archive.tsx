import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { isEmpty } from "es-toolkit/compat";
import * as z from "zod";

import {
  getApiV1ArchiveFiltersQueryOptions,
  getApiV1ArchiveItemsMyInfiniteQueryOptions,
  getApiV1ArchiveItemsMyQueryParamsSchema,
} from "@/codegen/api/product";
import { ArchiveComponent } from "@/entrypoints/archive/component";
import { removeUndefinedFields } from "@/shared/utils/remove-undefined-fields";

const archiveSearchSchema = getApiV1ArchiveItemsMyQueryParamsSchema
  .unwrap()
  .omit({
    page: true,
    perPage: true,
  });

export type ArchiveSearch = z.infer<typeof archiveSearchSchema>;

export const Route = createFileRoute("/_app/archive")({
  validateSearch: zodValidator(archiveSearchSchema),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps: { search } }) => {
    context.queryClient.ensureQueryData({
      ...getApiV1ArchiveFiltersQueryOptions(),
    });

    const cleanedSearch = removeUndefinedFields(search);
    const params = isEmpty(cleanedSearch) ? undefined : cleanedSearch;

    context.queryClient.ensureInfiniteQueryData({
      ...getApiV1ArchiveItemsMyInfiniteQueryOptions({
        params,
      }),
      initialPageParam: 1,
    });
  },
  component: ArchiveComponent,
});
