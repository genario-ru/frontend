import { createFileRoute } from "@tanstack/react-router";

import { TariffsComponent } from "@/entrypoints/tariffs/component";

export const Route = createFileRoute("/_without-auth/tariffs")({
  component: TariffsComponent,
});
