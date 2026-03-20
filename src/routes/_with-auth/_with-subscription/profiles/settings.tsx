import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { ProfileSettingsComponent } from "@/entrypoints/profile-settings/component";
import { z } from "@/lib/zod";

const profileSettingsSearchSchema = z.object({
  profileId: z.string().optional(),
});

export type ProfileSettingsSearch = z.infer<typeof profileSettingsSearchSchema>;

export const Route = createFileRoute(
  "/_with-auth/_with-subscription/profiles/settings",
)({
  validateSearch: zodValidator(profileSettingsSearchSchema),
  component: ProfileSettingsComponent,
});
