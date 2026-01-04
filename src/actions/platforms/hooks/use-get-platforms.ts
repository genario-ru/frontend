import { useQuery } from "@tanstack/react-query";

import { getApiV1PlatformsOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetPlatforms() {
  const {
    data: platformsData,
    isLoading: isPlatformsLoading,
    isError: isPlatformsError,
  } = useQuery({
    ...getApiV1PlatformsOptions(),
    select: (data) => data.data,
  });

  return {
    platformsData,
    isPlatformsLoading,
    isPlatformsError,
  };
}
