import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";

import { settingsChangeNameFormSchema } from "../schemas/settings-change-name-form-schema";
import type { SettingsChangeNameFormSchema } from "../types/settings-change-form-types";

export const changeNameFormMatchValidateFn =
  createFormMatchValidateFn<SettingsChangeNameFormSchema>(
    settingsChangeNameFormSchema,
  );
