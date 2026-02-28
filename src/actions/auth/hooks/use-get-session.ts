import { useGetGetSession } from "@/codegen/api/auth";

export function useGetSession() {
  const {
    data: sessionData,
    isLoading: isSessionLoading,
    isError: isSessionError,
    refetch: refetchSession,
  } = useGetGetSession();

  return { sessionData, isSessionLoading, isSessionError, refetchSession };
}
