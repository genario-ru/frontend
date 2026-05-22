import { createFileRoute } from "@tanstack/react-router";

import { CreditsPackagesComponent } from "@/entrypoints/credits-packages/component";

export const Route = createFileRoute("/_without-auth/credits-packages")({
  component: CreditsPackagesComponent,
});
