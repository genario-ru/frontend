import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";

import { accountSettingsChangeEmailFormSchema } from "../schemas/account-settings-change-email-form-schema";
import type { AccountSettingsChangeEmailFormSchema } from "../types/account-settings-change-email-types";

export const changeEmailFormMatchFieldValidateFn =
  createFormMatchValidateFn<AccountSettingsChangeEmailFormSchema>(
    accountSettingsChangeEmailFormSchema,
  );
