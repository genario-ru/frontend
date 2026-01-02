import type { DeepKeys, FieldValidateFn } from "@tanstack/react-form";
import type { ZodSchema } from "zod";

export const createFieldValidateFn = <
  TFormSchema,
  TFieldName extends DeepKeys<TFormSchema>,
>(
  schema: ZodSchema,
): FieldValidateFn<TFormSchema, TFieldName> => {
  return ({ value }) => {
    const zodResult = schema.safeParse(value);

    if (!zodResult.success) {
      return zodResult.error.issues[0].message;
    }
  };
};
