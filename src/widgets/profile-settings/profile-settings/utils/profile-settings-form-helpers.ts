import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import {
  profileSettingsFormSchema,
  type ProfileSettingsFormValues,
} from "../schemas/profile-settings-form-schema";

export const profileSettingsFormValidateFn =
  createFormValidateFn<ProfileSettingsFormValues>(profileSettingsFormSchema);

export const profileSettingsFormMatchValidateFn =
  createFormMatchValidateFn<ProfileSettingsFormValues>(
    profileSettingsFormSchema,
  );
