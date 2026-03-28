import { z } from "@/lib/zod";

import type { settingsChangeEmailFormSchema } from "../schemas/settings-change-email-form-schema";

export type SettingsChangeEmailFormSchema = z.infer<
  typeof settingsChangeEmailFormSchema
>;
