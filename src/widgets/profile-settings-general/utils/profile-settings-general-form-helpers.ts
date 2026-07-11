import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import {
  profileSettingsGeneralFormSchema,
  type ProfileSettingsGeneralFormValues,
} from "../schemas/profile-settings-general-form-schema";

export const profileSettingsGeneralFormValidateFn =
  createFormValidateFn<ProfileSettingsGeneralFormValues>(
    profileSettingsGeneralFormSchema,
  );

export const profileSettingsGeneralFormMatchValidateFn =
  createFormMatchValidateFn<ProfileSettingsGeneralFormValues>(
    profileSettingsGeneralFormSchema,
  );

export const profileSettingsGeneralFormOnChangeValidateFn = (
  data: Parameters<typeof profileSettingsGeneralFormValidateFn>[0],
) => {
  if (data.formApi.state.submissionAttempts > 0) {
    return profileSettingsGeneralFormValidateFn(data);
  }
};

export function normalizeProfileSettingsOptionalStringForCreate(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

export function normalizeProfileSettingsOptionalStringForUpdate(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}
