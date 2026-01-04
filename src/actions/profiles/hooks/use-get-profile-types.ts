import { useQuery } from "@tanstack/react-query";

import { getApiV1ProfilesTypesOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetProfileTypes() {
  const {
    data: profileTypesData,
    isLoading: isProfileTypesLoading,
    isError: isProfileTypesError,
  } = useQuery({
    ...getApiV1ProfilesTypesOptions(),
    select: (data) => data.data,
  });

  return {
    profileTypesData,
    isProfileTypesLoading,
    isProfileTypesError,
  };
}
