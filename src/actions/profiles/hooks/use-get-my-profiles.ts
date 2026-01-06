import { useQuery } from "@tanstack/react-query";

import { getApiV1ProfilesMyOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

export function useGetMyProfiles() {
  const {
    data: myProfilesData,
    isLoading: isMyProfilesLoading,
    isError: isMyProfilesError,
  } = useQuery({
    ...getApiV1ProfilesMyOptions(),
  });

  return {
    myProfilesData,
    isMyProfilesLoading,
    isMyProfilesError,
  };
}
