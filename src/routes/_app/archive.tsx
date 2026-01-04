import { createFileRoute } from "@tanstack/react-router";

import { ArchiveComponent } from "@/entrypoints/archive/component";

export const Route = createFileRoute("/_app/archive")({
  component: ArchiveComponent,
});
