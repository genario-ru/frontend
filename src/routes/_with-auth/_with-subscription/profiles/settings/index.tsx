import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { ProfileSettingsGeneralComponent } from "@/entrypoints/profile-settings-general/component";
import { z } from "@/lib/zod";

const profileSettingsGeneralSearchSchema = z.object({
  profileId: z.string().optional(),
});

export type ProfileSettingsGeneralSearch = z.infer<
  typeof profileSettingsGeneralSearchSchema
>;

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/settings/",
)({
  validateSearch: zodValidator(profileSettingsGeneralSearchSchema),
  component: ProfileSettingsGeneralComponent,
});
