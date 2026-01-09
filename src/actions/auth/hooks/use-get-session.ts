import { useQuery } from "@tanstack/react-query";

import { getGetSessionOptions } from "@/codegen/api/auth/@tanstack/react-query.gen";

export function useGetSession() {
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
    refetch: refetchSession,
  } = useQuery({
    ...getGetSessionOptions(),
  });

  return { sessionData, isSessionLoading, isSessionError, refetchSession };
}
