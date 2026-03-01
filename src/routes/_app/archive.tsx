import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { getApiV1ArchiveItemsMyQueryParamsSchema } from "@/codegen/api/product";
import { ArchiveComponent } from "@/entrypoints/archive/component";
import { z } from "@/lib/zod";

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
  component: ArchiveComponent,
});
