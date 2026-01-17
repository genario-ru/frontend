import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { IdeasListSettingsComponent } from "@/entrypoints/ideas-list-settings/component";

export const Route = createFileRoute("/_app/ideas-lists/settings")({
  validateSearch: zodValidator(
    z.object({
      ideasListId: z.optional(z.string()),
    }),
  ),
  component: IdeasListSettingsComponent,
});
