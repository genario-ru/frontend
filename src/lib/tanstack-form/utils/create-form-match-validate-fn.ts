import type { FormValidateFn } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";
import type { ZodSchema } from "zod";

import { createFormValidateFn } from "./create-form-validate-fn";

const MATCH_FORM_ERROR_MESSAGE = "Для сохранения формы, обновите ее содержимое";
const MATCH_FIELD_ERROR_MESSAGE =
  "Новое значение не может совпадать с предыдущим";

export const createFormMatchValidateFn = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
): FormValidateFn<T> => {
  return ({ value, formApi }) => {
    // 1. Сначала выполняем Zod валидацию
    const basicValidateFn = createFormValidateFn(schema);
    const result = basicValidateFn({ value, formApi });

    if (result) return result;

    const initialValues = formApi.options.defaultValues;

    if (!initialValues) return;

    // 2. Если Zod валидация прошла успешно, проверяем совпадение с initialValues
    if (isEqual(value, initialValues)) {
      const fieldNames = Object.keys(value);

      if (fieldNames.length === 1) {
        const [singleFieldName] = fieldNames;

        return {
          fields: {
            [singleFieldName]: MATCH_FIELD_ERROR_MESSAGE,
          },
        };
      }

      return {
        form: MATCH_FORM_ERROR_MESSAGE,
        fields: {},
      };
    }
  };
};
