import { useGetApiV1ProfilesProfileId } from "@/codegen/api/product";

type UseGetProfileParams = {
  profileId: string | undefined;
};

export function useGetProfile({ profileId }: UseGetProfileParams) {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetApiV1ProfilesProfileId(
    {
      profileId: profileId as string,
    },
    {
      query: {
        enabled: Boolean(profileId),
      },
    },
  );

  return {
    profileData,
    isProfileLoading,
    isProfileError,
  };
}
