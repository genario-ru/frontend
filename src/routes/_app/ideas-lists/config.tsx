import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { IdeasListConfigComponent } from "@/entrypoints/ideas-list-config/component";

export const Route = createFileRoute("/_app/ideas-lists/config")({
  validateSearch: zodValidator(
    z.object({
      ideasListId: z.optional(z.string()),
    }),
  ),
  component: IdeasListConfigComponent,
});
