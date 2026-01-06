import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { profileDialogFormSchema } from "../schemas/profile-dialog-form-schema";
import type { ProfileDialogFormValues } from "../types";

export const profileDialogFormValidateFn =
  createFormValidateFn<ProfileDialogFormValues>(profileDialogFormSchema);

export const profileDialogFormMatchValidateFn =
  createFormMatchValidateFn<ProfileDialogFormValues>(profileDialogFormSchema);
