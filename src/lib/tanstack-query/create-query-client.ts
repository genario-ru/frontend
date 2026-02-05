import { QueryClient } from "@tanstack/react-query";
import { millisecondsInMinute, secondsInMinute } from "date-fns/constants";

const MAX_RETRY_COUNT = 3;

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * secondsInMinute * millisecondsInMinute,
        refetchOnReconnect: true,
        retry: (failureCount) => failureCount < MAX_RETRY_COUNT,
      },
    },
  });

  return queryClient;
}
