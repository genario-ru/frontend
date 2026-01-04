import { useQuery } from "@tanstack/react-query";

import { getApiV1ProfilesProfileIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetProfileParams = {
  profileId: string | undefined;
};

export function useGetProfile({ profileId }: UseGetProfileParams) {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    ...getApiV1ProfilesProfileIdOptions({
      path: { profileId: profileId as string },
    }),
    select: (data) => data.data,
    enabled: Boolean(profileId),
  });

  return {
    profileData,
    isProfileLoading,
    isProfileError,
  };
}
