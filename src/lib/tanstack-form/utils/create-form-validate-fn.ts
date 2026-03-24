import type { FormValidateFn } from "@tanstack/react-form";
import type { ZodSchema } from "zod";

export type CreateFormValidateFnReturn = {
  form?: string;
  fields?: Record<string, string>;
};

export const createFormValidateFn = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
): FormValidateFn<T> => {
  return ({ value }) => {
    const zodResult = schema.safeParse(value);

    if (!zodResult.success) {
      const { formErrors } = zodResult.error.flatten();
      const fields: Record<string, string> = {};

      zodResult.error.issues.forEach((issue) => {
        let fieldPath = "";

        issue.path.forEach((path, index) => {
          if (index === 0) {
            fieldPath = path.toString();
          } else if (typeof path === "number") {
            fieldPath += `[${path}]`;
          } else {
            fieldPath += `.${path.toString()}`;
          }
        });

        console.log({
          fieldPath,
          issue,
        });

        fields[fieldPath] = issue.message;
      });

      return { form: formErrors[0], fields } as CreateFormValidateFnReturn;
    }
  };
};
