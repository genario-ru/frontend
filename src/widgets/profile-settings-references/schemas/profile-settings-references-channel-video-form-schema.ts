import { z } from "@/lib/zod";

export const profileSettingsReferencesChannelVideoFormSchema = z.object({
  url: z.string().trim().min(1, "Введите ссылку на видео"),
});

export type ProfileSettingsReferencesChannelVideoFormValues = z.infer<
  typeof profileSettingsReferencesChannelVideoFormSchema
>;
