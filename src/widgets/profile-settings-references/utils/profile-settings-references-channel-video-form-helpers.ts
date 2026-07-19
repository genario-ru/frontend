import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { profileSettingsReferencesChannelVideoFormSchema } from "../schemas/profile-settings-references-channel-video-form-schema";

export const profileSettingsReferencesChannelVideoFormValidateFn =
  createFormValidateFn(profileSettingsReferencesChannelVideoFormSchema);
