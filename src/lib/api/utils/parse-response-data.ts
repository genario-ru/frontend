import { documentTypes } from "../constants/document-types";

export async function parseResponseData<T>(
  response: Response,
  contentType: string | null,
) {
  if (!contentType) {
    throw new Error("Content type is required");
  }

  switch (contentType) {
    case documentTypes.json:
      return (await response.json()) as T;

    case documentTypes.text:
    case documentTypes.html:
    case documentTypes.document:
      return (await response.text()) as T;

    case documentTypes.octetStream:
      return (await response.arrayBuffer()) as T;

    default: {
      throw new Error("Unsupported response type");
    }
  }
}
