import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { IdeasListComponent } from "@/entrypoints/ideas-list/component";
import { z } from "@/lib/zod";

const ideasListSearchSchema = z.object({
  tab: z.string().optional(),
});

export type IdeasListSearch = z.infer<typeof ideasListSearchSchema>;

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/ideas-lists/$ideasListId",
)({
  validateSearch: zodValidator(ideasListSearchSchema),
  component: IdeasListComponent,
});
