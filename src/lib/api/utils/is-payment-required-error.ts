import type { APIError } from "../classes/api-error";

export function isPaymentRequiredError(error: APIError): boolean {
  return error.cause.status === 402;
}
