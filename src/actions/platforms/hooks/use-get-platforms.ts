import { useGetApiV1Platforms } from "@/codegen/api/product";

export function useGetPlatforms() {
  const {
    data: platformsData,
    isLoading: isPlatformsLoading,
    isError: isPlatformsError,
  } = useGetApiV1Platforms();

  return {
    platformsData,
    isPlatformsLoading,
    isPlatformsError,
  };
}
