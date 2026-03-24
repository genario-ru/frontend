import type { APIErrorCause } from "../schemas/api-error-cause";

export class APIError<TError = unknown> extends Error {
  constructor(
    message: string,
    public cause: APIErrorCause<TError>,
  ) {
    super(message);
    this.name = "APIError";
  }
}
