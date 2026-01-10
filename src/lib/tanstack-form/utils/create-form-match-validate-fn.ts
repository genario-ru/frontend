import type { FormValidateFn } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";
import type { ZodSchema } from "zod";

import { createFormValidateFn } from "./create-form-validate-fn";

const matchErrorMessage = "Для сохранения формы, обновите ее содержимое";

export const createFormMatchValidateFn = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
): FormValidateFn<T> => {
  return ({ value, formApi }) => {
    console.log({
      value,
    });

    // 1. Сначала выполняем Zod валидацию
    const basicValidateFn = createFormValidateFn(schema);
    const result = basicValidateFn({ value, formApi });

    if (result) return result;

    const initialValues = formApi.options.defaultValues;

    if (!initialValues) return;

    // 2. Если Zod валидация прошла успешно, проверяем совпадение с initialValues
    if (isEqual(value, initialValues)) {
      return {
        form: matchErrorMessage,
        fields: {},
      };
    }
  };
};
