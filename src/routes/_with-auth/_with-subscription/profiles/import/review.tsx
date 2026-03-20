import { createFileRoute } from "@tanstack/react-router";

import { ProfilesImportReviewComponent } from "@/entrypoints/profiles-import-review/component";

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/import/review",
)({
  component: ProfilesImportReviewComponent,
});
