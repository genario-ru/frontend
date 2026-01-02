import type { APIErrorInfo } from "../types";

export class APIError extends Error {
  constructor(
    message: string,
    public cause: APIErrorInfo,
  ) {
    super(message);
    this.name = "FetchFnError";
  }
}
