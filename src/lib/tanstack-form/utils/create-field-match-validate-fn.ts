import type { DeepKeys, FieldValidateFn } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";
import type { ZodSchema } from "zod";

const matchErrorMessage = "Новое значение не может совпадать с предыдущим";

export const createFieldMatchValidateFn = <
  TFormSchema extends Record<string, unknown>,
  TFieldName extends DeepKeys<TFormSchema>,
>(
  schema: ZodSchema,
): FieldValidateFn<TFormSchema, TFieldName> => {
  return ({ value, fieldApi }) => {
    const zodResult = schema.safeParse(value);

    if (!zodResult.success) {
      return zodResult.error.issues[0].message;
    }

    const defaultValues = fieldApi.form.options.defaultValues;
    const defaultValue = defaultValues?.[fieldApi.name];

    if (!defaultValue) return;

    if (isEqual(value, defaultValue)) {
      return matchErrorMessage;
    }
  };
};
