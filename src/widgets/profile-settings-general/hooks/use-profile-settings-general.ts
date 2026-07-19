import { useGetPlatforms } from "@/actions/platforms/hooks/use-get-platforms";
import { useGetProfile } from "@/actions/profiles/hooks/use-get-profile";
import { useGetProfileTypes } from "@/actions/profiles/hooks/use-get-profile-types";

type UseProfileSettingsParams = {
  profileId: string | undefined;
};

export function useProfileSettings({ profileId }: UseProfileSettingsParams) {
  const { profileData, isProfileLoading, isProfileError } = useGetProfile({
    profileId,
  });

  const { profileTypesData, isProfileTypesLoading, isProfileTypesError } =
    useGetProfileTypes();

  const { platformsData, isPlatformsLoading, isPlatformsError } =
    useGetPlatforms();

  return {
    profileData,
    profileTypesData,
    platformsData,
    isLoading: isProfileLoading || isProfileTypesLoading || isPlatformsLoading,
    isError: isProfileError || isProfileTypesError || isPlatformsError,
  };
}
