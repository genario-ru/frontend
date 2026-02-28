import { useGetApiV1Tones } from "@/codegen/api/product";

export function useGetTones() {
  const {
    data: tonesData,
    isLoading: isTonesLoading,
    isError: isTonesError,
  } = useGetApiV1Tones();

  return {
    tonesData,
    isTonesLoading,
    isTonesError,
  };
}
