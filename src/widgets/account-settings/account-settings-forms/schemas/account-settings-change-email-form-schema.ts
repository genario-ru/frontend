import { z } from "@/lib/zod";

export const accountSettingsChangeEmailFormSchema = z.object({
  newEmail: z.email("Введите корректный email"),
});
