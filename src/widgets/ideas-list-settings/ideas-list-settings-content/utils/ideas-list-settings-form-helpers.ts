import * as z from "zod";

import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormStepValidationFn } from "@/lib/tanstack-form/utils/create-form-step-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { createIdeasListSchema } from "../schemas/create-ideas-list-schema";

export enum IdeasListSettingsFormSteps {
  TemplateSelection = "templateSelection",
  PrimaryInfo = "primaryInfo",
  ParamsConfiguration = "paramsConfiguration",
}

// Форма разделена на 3 этапа:

// 1. Выбор шаблона
export const ideasListSettingsTemplateSelectionSubformSchema =
  createIdeasListSchema.pick({
    templateId: true,
  });

export type IdeasListSettingsTemplateSelectionSubformSchema = z.infer<
  typeof ideasListSettingsTemplateSelectionSubformSchema
>;

// 2. Основная информация
export const ideasListSettingsPrimaryInfoSubformSchema =
  createIdeasListSchema.pick({
    name: true,
    description: true,
  });

export type IdeasListSettingsPrimaryInfoSubformSchema = z.infer<
  typeof ideasListSettingsPrimaryInfoSubformSchema
>;

// 3. Настройка параметров
export const ideasListSettingsParamsConfigurationSubformSchema =
  createIdeasListSchema.pick({
    profileId: true,
    targetAudience: true,
    toneIds: true,
    videoTypeIds: true,
  });

export type IdeasListSettingsParamsConfigurationSubformSchema = z.infer<
  typeof ideasListSettingsParamsConfigurationSubformSchema
>;

// Форма
export const ideasListSettingsFormSchema = z.object({
  currentStep: z.enum(IdeasListSettingsFormSteps),
  [IdeasListSettingsFormSteps.PrimaryInfo]:
    ideasListSettingsPrimaryInfoSubformSchema,
  [IdeasListSettingsFormSteps.TemplateSelection]:
    ideasListSettingsTemplateSelectionSubformSchema,
  [IdeasListSettingsFormSteps.ParamsConfiguration]:
    ideasListSettingsParamsConfigurationSubformSchema,
});

export type IdeasListSettingsFormSchema = z.infer<
  typeof ideasListSettingsFormSchema
>;

// Валидаторы формы

export const ideasListSettingsFormStepValidateFn =
  createFormStepValidationFn<IdeasListSettingsFormSchema>(
    {
      [IdeasListSettingsFormSteps.TemplateSelection]:
        ideasListSettingsTemplateSelectionSubformSchema,
      [IdeasListSettingsFormSteps.PrimaryInfo]:
        ideasListSettingsPrimaryInfoSubformSchema,
      [IdeasListSettingsFormSteps.ParamsConfiguration]:
        ideasListSettingsParamsConfigurationSubformSchema,
    },
    "currentStep",
  );

// Валидаторы для всей формы

export const ideasListSettingsFormValidateFn =
  createFormValidateFn<IdeasListSettingsFormSchema>(
    ideasListSettingsFormSchema,
  );

export const ideasListSettingsFormMatchValidateFn =
  createFormMatchValidateFn<IdeasListSettingsFormSchema>(
    ideasListSettingsFormSchema,
  );
