import * as z from "zod";

import { accountSettingsChangeFormSchema } from "../schemas/account-settings-change-form-schema";

export type AccountSettingsChangeFormSchema = z.infer<
  typeof accountSettingsChangeFormSchema
>;
