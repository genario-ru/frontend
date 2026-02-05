import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { IdeasListSettingsComponent } from "@/entrypoints/ideas-list-settings/component";

const ideasListSettingsSearchSchema = z.object({
  templateId: z.string().optional(),
  ideasListId: z.string().optional(),
});

export type IdeasListSettingsSearch = z.infer<
  typeof ideasListSettingsSearchSchema
>;

export const Route = createFileRoute("/_app/ideas-lists/settings")({
  validateSearch: zodValidator(ideasListSettingsSearchSchema),
  component: IdeasListSettingsComponent,
});
