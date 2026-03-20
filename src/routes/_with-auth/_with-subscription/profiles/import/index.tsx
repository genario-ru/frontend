import { createFileRoute } from "@tanstack/react-router";

import { ProfilesImportComponent } from "@/entrypoints/profiles-import/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/import/",
)({
  component: ProfilesImportComponent,
});
