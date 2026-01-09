import { createFieldMatchValidateFn } from "@/lib/tanstack-form/utils/create-field-match-validate-fn";

import { accountSettingsChangeFormSchema } from "../schemas/account-settings-change-form-schema";
import type { AccountSettingsChangeFormSchema } from "../types/account-settings-change-form-types";

export const changeNameFieldValidateFn = createFieldMatchValidateFn<
  AccountSettingsChangeFormSchema,
  "name"
>(accountSettingsChangeFormSchema.shape.name);
