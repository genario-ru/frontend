import * as z from "zod";

import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormStepValidationFn } from "@/lib/tanstack-form/utils/create-form-step-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { createIdeasListSchema } from "../schemas/create-ideas-list-schema";

export enum IdeasListDialogFormSteps {
  TemplateSelection = "templateSelection",
  PrimaryInfo = "primaryInfo",
  ParamsConfiguration = "paramsConfiguration",
}

// Форма разделена на 3 этапа:

// 1. Выбор шаблона
export const ideasListDialogTemplateSelectionSubformSchema =
  createIdeasListSchema.pick({
    templateId: true,
  });

export type IdeasListDialogTemplateSelectionSubformSchema = z.infer<
  typeof ideasListDialogTemplateSelectionSubformSchema
>;

// 2. Основная информация
export const ideasListDialogPrimaryInfoSubformSchema =
  createIdeasListSchema.pick({
    name: true,
    description: true,
  });

export type IdeasListDialogPrimaryInfoSubformSchema = z.infer<
  typeof ideasListDialogPrimaryInfoSubformSchema
>;

// 3. Настройка параметров
export const ideasListDialogParamsConfigurationSubformSchema =
  createIdeasListSchema.pick({
    profileId: true,
    targetAudience: true,
    toneIds: true,
    videoTypeIds: true,
  });

export type IdeasListDialogParamsConfigurationSubformSchema = z.infer<
  typeof ideasListDialogParamsConfigurationSubformSchema
>;

// Форма
export const ideasListDialogFormSchema = z.object({
  currentStep: z.enum(IdeasListDialogFormSteps),
  [IdeasListDialogFormSteps.PrimaryInfo]:
    ideasListDialogPrimaryInfoSubformSchema,
  [IdeasListDialogFormSteps.TemplateSelection]:
    ideasListDialogTemplateSelectionSubformSchema,
  [IdeasListDialogFormSteps.ParamsConfiguration]:
    ideasListDialogParamsConfigurationSubformSchema,
});

export type IdeasListDialogFormSchema = z.infer<
  typeof ideasListDialogFormSchema
>;

// Валидаторы формы

export const ideasListDialogFormStepValidateFn =
  createFormStepValidationFn<IdeasListDialogFormSchema>(
    {
      [IdeasListDialogFormSteps.TemplateSelection]:
        ideasListDialogTemplateSelectionSubformSchema,
      [IdeasListDialogFormSteps.PrimaryInfo]:
        ideasListDialogPrimaryInfoSubformSchema,
      [IdeasListDialogFormSteps.ParamsConfiguration]:
        ideasListDialogParamsConfigurationSubformSchema,
    },
    "currentStep",
  );

// Валидаторы для всей формы

export const ideasListDialogFormValidateFn =
  createFormValidateFn<IdeasListDialogFormSchema>(ideasListDialogFormSchema);

export const ideasListDialogFormMatchValidateFn =
  createFormMatchValidateFn<IdeasListDialogFormSchema>(
    ideasListDialogFormSchema,
  );
