import { useGetApiV1VideoDurations } from "@/codegen/api/product";

export function useGetVideoDurations() {
  const {
    data: videoDurationsData,
    isLoading: isVideoDurationsLoading,
    isError: isVideoDurationsError,
  } = useGetApiV1VideoDurations();

  return {
    videoDurationsData,
    isVideoDurationsLoading,
    isVideoDurationsError,
  };
}
