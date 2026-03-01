import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";

import { accountSettingsChangeNameFormSchema } from "../schemas/account-settings-change-name-form-schema";
import type { AccountSettingsChangeNameFormSchema } from "../types/account-settings-change-form-types";

export const changeNameFormMatchValidateFn =
  createFormMatchValidateFn<AccountSettingsChangeNameFormSchema>(
    accountSettingsChangeNameFormSchema,
  );
