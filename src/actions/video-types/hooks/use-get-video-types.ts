import { useGetApiV1VideoTypes } from "@/codegen/api/product";

export function useGetVideoTypes() {
  const {
    data: videoTypesData,
    isLoading: isVideoTypesLoading,
    isError: isVideoTypesError,
  } = useGetApiV1VideoTypes();

  return {
    videoTypesData,
    isVideoTypesLoading,
    isVideoTypesError,
  };
}
