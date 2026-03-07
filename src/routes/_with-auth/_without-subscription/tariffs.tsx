import { createFileRoute } from "@tanstack/react-router";

import { TariffsComponent } from "@/entrypoints/tariffs/component";

export const Route = createFileRoute(
  "/_with-auth/_without-subscription/tariffs",
)({
  component: TariffsComponent,
});
