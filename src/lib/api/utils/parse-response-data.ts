import { APIError } from "../classes/api-error";
import { documentTypes } from "../constants/document-types";
import type { ResponseType } from "./client";

export async function parseResponseData<TData>(
  response: Response,
  responseType: ResponseType,
) {
  switch (responseType) {
    case "arraybuffer":
      return (await response.arrayBuffer()) as TData;

    case "blob":
      return (await response.blob()) as TData;

    case "text":
    case "document":
    case "stream":
      return (await response.text()) as TData;

    default: {
      const contentType = response.headers.get("Content-Type");

      if (!contentType?.includes(documentTypes.json)) {
        throw new APIError("Non-JSON response is not supported", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
      }

      return (await response.json()) as TData;
    }
  }
}
