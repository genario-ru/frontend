import type { output, ZodType } from "zod";

import { APIError } from "../classes/api-error";

/**
 * Проверяет `APIError` и валидирует `error.cause.data` переданной Zod-схемой.
 * После успешной проверки `error` сужается до `APIError<z.output<typeof schema>>`.
 */
export function isAPIError<TSchema extends ZodType>(
  error: unknown,
  schema: TSchema,
): error is APIError<output<TSchema>> {
  const instanceOfAPIError = error instanceof APIError;

  if (!instanceOfAPIError) {
    return false;
  }

  return schema.safeParse(error.cause.data).success;
}
