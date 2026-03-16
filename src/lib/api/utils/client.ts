import { envs } from "@/shared/constants/envs";

import { APIError } from "../classes/api-error";
import type { APIErrorInfo } from "../types";
import { parseErrorResponseData } from "./parse-error-response-data";
import { parseResponseData } from "./parse-response-data";
import { prepareQueryString } from "./prepare-query-string";
import { prepareRequestBody } from "./prepare-request-body";

type Method = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export type RequestConfig<TData = unknown> = {
  url?: string;
  method: Method;
  params?: object;
  data?: TData | FormData;
  responseType?: ResponseType;
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export type Client = <TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
) => Promise<ResponseConfig<TData>>;

export type ResponseErrorConfig<TError = unknown> = TError;

export default async function client<
  TData,
  _TError = APIErrorInfo,
  TVariables = unknown,
>({
  url = "",
  method,
  params,
  data: body,
  responseType = "json",
  signal,
  headers: initialHeaders,
}: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> {
  const headers = new Headers(initialHeaders);
  const requestBody = prepareRequestBody(body, headers);

  const queryString = prepareQueryString({
    queryParams: params,
    includeQuestionmark: true,
  });

  const urlWithBase = `${envs.VITE_BASE_API_URL}${url}`;
  const fullUrl = `${urlWithBase}${queryString}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      body: requestBody,
      signal,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await parseErrorResponseData(response);

      throw new APIError(`HTTP Error ${response.status}`, {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
    }

    const data = await parseResponseData<TData>(response, responseType);

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.log("error", error);

    if (error instanceof APIError) {
      throw error;
    }

    // Process network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new APIError("Network error", {
        status: 0,
        statusText: "Network request failed",
        url: fullUrl,
        data: error.cause,
      });
    }

    // Process unknown errors
    throw new APIError("Unknown error", {
      status: 0,
      statusText: "Unknown error occurred",
      url: fullUrl,
      data: error instanceof Error ? error.cause : error,
    });
  }
}
