import { z } from "@/lib/zod";

export const settingsChangeEmailFormSchema = z.object({
  newEmail: z.email("Введите корректный email"),
});
