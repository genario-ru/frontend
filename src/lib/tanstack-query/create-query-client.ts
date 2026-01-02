import { QueryClient } from "@tanstack/react-query";
import { millisecondsInMinute, secondsInMinute } from "date-fns/constants";

import { APIError } from "../api/classes/api-error";

const MAX_RETRY_COUNT = 3;
const RETRY_STATUS_CODES = [408, 429, 500, 502, 503, 504];

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * secondsInMinute * millisecondsInMinute,
        refetchOnReconnect: true,
        retry(failureCount, error) {
          if (error instanceof APIError) {
            return (
              RETRY_STATUS_CODES.includes(error.cause.status) &&
              failureCount < MAX_RETRY_COUNT
            );
          }

          return failureCount < MAX_RETRY_COUNT;
        },
      },
    },
  });

  return queryClient;
}
