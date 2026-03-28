import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";

import { settingsChangeEmailFormSchema } from "../schemas/settings-change-email-form-schema";
import type { SettingsChangeEmailFormSchema } from "../types/settings-change-email-types";

export const changeEmailFormMatchValidateFn =
  createFormMatchValidateFn<SettingsChangeEmailFormSchema>(
    settingsChangeEmailFormSchema,
  );
