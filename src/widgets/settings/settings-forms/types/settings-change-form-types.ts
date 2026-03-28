import { z } from "@/lib/zod";

import { settingsChangeNameFormSchema } from "../schemas/settings-change-name-form-schema";

export type SettingsChangeNameFormSchema = z.infer<
  typeof settingsChangeNameFormSchema
>;
