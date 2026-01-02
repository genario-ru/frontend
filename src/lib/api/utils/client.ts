import cookies from "js-cookie";
import ky, { type SearchParamsOption } from "ky";

import { ACCOUNT_RELATED_COOKIES } from "@/shared/constants/account-related-cookies";
import { envs } from "@/shared/constants/envs";

import { APIError } from "../classes/api-error";
import { documentTypes } from "../constants/document-types";
import type { APIErrorInfo } from "../types";
import { prepareAuthHeaderValue } from "./prepare-header-value";

type Method = "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS" | "HEAD";

type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export type RequestConfig<TData = unknown> = {
  url: string;
  baseUrl?: string;
  method: Method;
  params?: unknown;
  data?: TData | FormData;
  // TODO: Process response types
  responseType?: ResponseType;
  signal?: AbortSignal;
  headers?: HeadersInit;
  authToken?: string;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export type ResponseErrorConfig<TError = unknown> = TError;

export default async function client<
  TData,
  _TError = APIErrorInfo,
  TVariables = unknown,
>({
  url,
  baseUrl,
  method,
  params,
  data: body,
  signal,
  headers: initialHeaders,
  authToken,
}: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...initialHeaders,
  });

  const accessToken = cookies.get(ACCOUNT_RELATED_COOKIES.accessToken);
  const refreshToken = cookies.get(ACCOUNT_RELATED_COOKIES.refreshToken);

  if (authToken) {
    headers.set("Authorization", prepareAuthHeaderValue(authToken));
  } else if (accessToken) {
    headers.set("Authorization", prepareAuthHeaderValue(accessToken));
  } else if (refreshToken) {
    headers.set("Authorization", prepareAuthHeaderValue(refreshToken));

    // TODO: Implement tokens referesh after API is ready
  }

  const fullUrl = `${baseUrl ?? envs.VITE_BASE_API_URL}${url}`;

  try {
    const response = await ky(fullUrl, {
      method,
      body: JSON.stringify(body),
      searchParams: params as SearchParamsOption,
      signal,
      headers,
    });

    const contentType = response.headers.get("Content-Type");

    if (!contentType?.includes(documentTypes.json)) {
      console.warn("Non-JSON response is not supported");

      return {
        data: {} as TData,
        status: response.status,
        statusText: response.statusText,
      };
    }

    const data = await response.json<TData>();

    if (!response.ok) {
      throw new APIError(`HTTP Error ${response.status}`, {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        data,
      });
    }

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
