import { z } from "@/lib/zod";

export const profileSettingsGeneralFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название профиля")
    .max(256, "Название профиля должно быть не более 256 символов"),
  typeId: z.string().uuid("Выберите тип профиля"),
  platformIds: z.array(z.string().uuid()).default([]),
  positioning: z
    .string()
    .max(8192, "Позиционирование должно быть не более 8192 символов"),
  targetAudience: z
    .string()
    .max(1024, "Описание целевой аудитории должно быть не более 1024 символов"),
  additionalInfo: z
    .string()
    .max(8192, "Дополнительная информация должна быть не более 8192 символов"),
});

export type ProfileSettingsGeneralFormValues = z.infer<
  typeof profileSettingsGeneralFormSchema
>;
