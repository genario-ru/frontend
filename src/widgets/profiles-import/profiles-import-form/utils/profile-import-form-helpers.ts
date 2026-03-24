import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import {
  profilesImportFormSchema,
  type ProfilesImportFormValues,
} from "../schemas/profiles-import-form-schema";

export const profilesImportFormValidateFn =
  createFormValidateFn<ProfilesImportFormValues>(profilesImportFormSchema);
