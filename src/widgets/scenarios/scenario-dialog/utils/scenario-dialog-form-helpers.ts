import * as z from "zod";

import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormStepValidationFn } from "@/lib/tanstack-form/utils/create-form-step-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { createScenarioSchema } from "../schemas/create-scenario-schema";

export enum ScenarioDialogFormSteps {
  TemplateSelection = "templateSelection",
  PrimaryInfo = "primaryInfo",
  ParamsConfiguration = "paramsConfiguration",
}

// Форма разделена на 3 этапа:

// 1. Выбор шаблона
export const scenarioDialogTemplateSelectionSubformSchema =
  createScenarioSchema.pick({
    templateId: true,
  });

export type ScenarioDialogTemplateSelectionSubformSchema = z.infer<
  typeof scenarioDialogTemplateSelectionSubformSchema
>;

// 2. Основная информация
export const scenarioDialogPrimaryInfoSubformSchema = createScenarioSchema.pick(
  {
    name: true,
    description: true,
  },
);

export type ScenarioDialogPrimaryInfoSubformSchema = z.infer<
  typeof scenarioDialogPrimaryInfoSubformSchema
>;

// 3. Настройка параметров
export const scenarioDialogParamsConfigurationSubformSchema =
  createScenarioSchema.pick({
    videoTypeId: true,
    videoDurationId: true,
    platformId: true,
    profileId: true,
    targetAudience: true,
    toneIds: true,
  });

export type ScenarioDialogParamsConfigurationSubformSchema = z.infer<
  typeof scenarioDialogParamsConfigurationSubformSchema
>;

// Форма
export const scenarioDialogFormSchema = z.object({
  currentStep: z.enum(ScenarioDialogFormSteps),
  [ScenarioDialogFormSteps.PrimaryInfo]: scenarioDialogPrimaryInfoSubformSchema,
  [ScenarioDialogFormSteps.TemplateSelection]:
    scenarioDialogTemplateSelectionSubformSchema,
  [ScenarioDialogFormSteps.ParamsConfiguration]:
    scenarioDialogParamsConfigurationSubformSchema,
});

export type ScenarioDialogFormSchema = z.infer<typeof scenarioDialogFormSchema>;

// Валидаторы формы

export const scenarioDialogFormStepValidateFn =
  createFormStepValidationFn<ScenarioDialogFormSchema>(
    {
      [ScenarioDialogFormSteps.TemplateSelection]:
        scenarioDialogTemplateSelectionSubformSchema,
      [ScenarioDialogFormSteps.PrimaryInfo]:
        scenarioDialogPrimaryInfoSubformSchema,
      [ScenarioDialogFormSteps.ParamsConfiguration]:
        scenarioDialogParamsConfigurationSubformSchema,
    },
    "currentStep",
  );

// Валидаторы для всей формы

export const scenarioDialogFormValidateFn =
  createFormValidateFn<ScenarioDialogFormSchema>(scenarioDialogFormSchema);

export const scenarioDialogFormMatchValidateFn =
  createFormMatchValidateFn<ScenarioDialogFormSchema>(scenarioDialogFormSchema);
