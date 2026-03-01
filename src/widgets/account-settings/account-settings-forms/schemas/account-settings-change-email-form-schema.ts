import * as z from "zod";

export const accountSettingsChangeEmailFormSchema = z.object({
  newEmail: z.email("Введите корректный email"),
});
