import type { FormValidateFn } from "@tanstack/react-form";
import type { ZodSchema } from "zod";

export type CreateFormStepValidateFnReturn = {
  form?: string;
  fields?: Record<string, string>;
};

export const createFormStepValidationFn = <T extends Record<string, unknown>>(
  stepSchemas: Record<string, ZodSchema<any>>,
  currentStepField: string,
): FormValidateFn<T> => {
  return ({ value }) => {
    const currentStep = value[currentStepField] as string;
    const stepSchema = stepSchemas[currentStep];

    if (!stepSchema) return;

    // Валидируем только текущий шаг
    const stepData = value[currentStep];
    const result = stepSchema.safeParse(stepData);

    if (!result.success) {
      const { formErrors } = result.error.flatten();
      const fields: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldPath = issue.path.join(".");
        fields[`${currentStep}.${fieldPath}`] = issue.message;
      });

      return { form: formErrors[0], fields } as CreateFormStepValidateFnReturn;
    }
  };
};
