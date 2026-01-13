import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { IdeasListComponent } from "@/entrypoints/ideas-list/component";

export const Route = createFileRoute("/_app/ideas-lists/$ideasListId")({
  validateSearch: zodValidator(
    z.object({
      tab: z.optional(z.string()),
    }),
  ),
  component: IdeasListComponent,
});
