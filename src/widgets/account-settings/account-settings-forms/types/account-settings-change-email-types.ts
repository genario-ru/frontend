import { z } from "@/lib/zod";

import type { accountSettingsChangeEmailFormSchema } from "../schemas/account-settings-change-email-form-schema";

export type AccountSettingsChangeEmailFormSchema = z.infer<
  typeof accountSettingsChangeEmailFormSchema
>;
