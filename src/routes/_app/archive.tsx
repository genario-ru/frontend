import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { zGetApiV1ArchiveItemsMyData } from "@/codegen/api/product/zod.gen";
import { ArchiveComponent } from "@/entrypoints/archive/component";

export const Route = createFileRoute("/_app/archive")({
  validateSearch: zodValidator(
    zGetApiV1ArchiveItemsMyData.shape.query.unwrap(),
  ),
  component: ArchiveComponent,
});
