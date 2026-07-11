import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { ProfileSettingsReferencesComponent } from "@/entrypoints/profile-settings-references/component";
import { z } from "@/lib/zod";

const profileSettingsReferencesSearchSchema = z.object({
  profileId: z.string(),
});

export type ProfileSettingsReferencesSearch = z.infer<
  typeof profileSettingsReferencesSearchSchema
>;

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/settings/references",
)({
  validateSearch: zodValidator(profileSettingsReferencesSearchSchema),
  beforeLoad: ({ search }) => {
    if (!search.profileId) {
      throw redirect({
        to: "/profiles/settings",
        replace: true,
      });
    }
  },
  component: ProfileSettingsReferencesComponent,
});
