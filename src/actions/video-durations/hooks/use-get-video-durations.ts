import { useQuery } from "@tanstack/react-query";

import { getApiV1VideoDurationsOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetVideoDurations() {
  const {
    data: videoDurationsData,
    isLoading: isVideoDurationsLoading,
    isError: isVideoDurationsError,
  } = useQuery({
    ...getApiV1VideoDurationsOptions(),
  });

  return {
    videoDurationsData,
    isVideoDurationsLoading,
    isVideoDurationsError,
  };
}
