import { createFileRoute } from "@tanstack/react-router";

import { IdeasListComponent } from "@/entrypoints/ideas-list/component";

export const Route = createFileRoute("/_app/ideas-lists/$ideasListId")({
  component: IdeasListComponent,
});
