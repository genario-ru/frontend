import { z } from "@/lib/zod";

import { accountSettingsChangeNameFormSchema } from "../schemas/account-settings-change-name-form-schema";

export type AccountSettingsChangeNameFormSchema = z.infer<
  typeof accountSettingsChangeNameFormSchema
>;
