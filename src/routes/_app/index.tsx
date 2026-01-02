import { createFileRoute } from "@tanstack/react-router";

import { HomeComponent } from "@/entrypoints/home/component";

export const Route = createFileRoute("/_app/")({
  component: HomeComponent,
});
