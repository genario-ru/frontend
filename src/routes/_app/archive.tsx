import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { zGetApiV1ArchiveItemsMyData } from "@/codegen/api/product/zod.gen";
import { ArchiveComponent } from "@/entrypoints/archive/component";

const archiveSearchSchema = zGetApiV1ArchiveItemsMyData.shape.query
  .unwrap()
  .omit({
    page: true,
    perPage: true,
  });

export type ArchiveSearch = z.infer<typeof archiveSearchSchema>;

export const Route = createFileRoute("/_app/archive")({
  validateSearch: zodValidator(archiveSearchSchema),
  component: ArchiveComponent,
});
