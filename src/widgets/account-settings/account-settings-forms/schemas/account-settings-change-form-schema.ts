import { z } from "zod";

export const accountSettingsChangeFormSchema = z.object({
  name: z
    .string()
    .min(2, "Введите не менее 2 символов")
    .max(256, "Введите не более 256 символов"),
});
