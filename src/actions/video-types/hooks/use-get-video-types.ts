import { useQuery } from "@tanstack/react-query";

import { getApiV1VideoTypesOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetVideoTypes() {
  const {
    data: videoTypesData,
    isLoading: isVideoTypesLoading,
    isError: isVideoTypesError,
  } = useQuery({
    ...getApiV1VideoTypesOptions(),
  });

  return {
    videoTypesData,
    isVideoTypesLoading,
    isVideoTypesError,
  };
}
