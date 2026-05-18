import { useGetApiV1AuthSession } from "@/codegen/api/product";

export function useGetSession() {
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
    refetch: refetchSession,
  } = useGetApiV1AuthSession();

  return { sessionData, isSessionLoading, isSessionError, refetchSession };
}
