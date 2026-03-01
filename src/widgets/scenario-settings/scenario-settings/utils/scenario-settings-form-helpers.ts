import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormStepValidationFn } from "@/lib/tanstack-form/utils/create-form-step-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";
import { z } from "@/lib/zod";

import { createScenarioSchema } from "../schemas/create-scenario-schema";

export enum ScenarioSettingsFormSteps {
  TemplateSelection = "templateSelection",
  PrimaryInfo = "primaryInfo",
  ParamsConfiguration = "paramsConfiguration",
}

// Форма разделена на 3 этапа:

// 1. Выбор шаблона
export const scenarioSettingsTemplateSelectionSubformSchema =
  createScenarioSchema.pick({
    templateId: true,
  });

export type ScenarioSettingsTemplateSelectionSubformSchema = z.infer<
  typeof scenarioSettingsTemplateSelectionSubformSchema
>;

// 2. Основная информация
export const scenarioSettingsPrimaryInfoSubformSchema =
  createScenarioSchema.pick({
    name: true,
    description: true,
  });

export type ScenarioSettingsPrimaryInfoSubformSchema = z.infer<
  typeof scenarioSettingsPrimaryInfoSubformSchema
>;

// 3. Настройка параметров
export const scenarioSettingsParamsConfigurationSubformSchema =
  createScenarioSchema.pick({
    videoTypeId: true,
    videoDurationId: true,
    platformId: true,
    profileId: true,
    targetAudience: true,
    toneIds: true,
  });

export type ScenarioSettingsParamsConfigurationSubformSchema = z.infer<
  typeof scenarioSettingsParamsConfigurationSubformSchema
>;

// Форма
export const scenarioSettingsFormSchema = z.object({
  currentStep: z.enum(ScenarioSettingsFormSteps),
  [ScenarioSettingsFormSteps.PrimaryInfo]:
    scenarioSettingsPrimaryInfoSubformSchema,
  [ScenarioSettingsFormSteps.TemplateSelection]:
    scenarioSettingsTemplateSelectionSubformSchema,
  [ScenarioSettingsFormSteps.ParamsConfiguration]:
    scenarioSettingsParamsConfigurationSubformSchema,
});

export type ScenarioSettingsFormSchema = z.infer<
  typeof scenarioSettingsFormSchema
>;

// Валидаторы формы

export const scenarioSettingsFormStepValidateFn =
  createFormStepValidationFn<ScenarioSettingsFormSchema>(
    {
      [ScenarioSettingsFormSteps.TemplateSelection]:
        scenarioSettingsTemplateSelectionSubformSchema,
      [ScenarioSettingsFormSteps.PrimaryInfo]:
        scenarioSettingsPrimaryInfoSubformSchema,
      [ScenarioSettingsFormSteps.ParamsConfiguration]:
        scenarioSettingsParamsConfigurationSubformSchema,
    },
    "currentStep",
  );

// Валидаторы для всей формы

export const scenarioSettingsFormValidateFn =
  createFormValidateFn<ScenarioSettingsFormSchema>(scenarioSettingsFormSchema);

export const scenarioSettingsFormMatchValidateFn =
  createFormMatchValidateFn<ScenarioSettingsFormSchema>(
    scenarioSettingsFormSchema,
  );
