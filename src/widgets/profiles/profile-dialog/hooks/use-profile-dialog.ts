import { useGetPlatforms } from "@/actions/platforms/hooks/use-get-platforms";
import { useGetProfile } from "@/actions/profiles/hooks/use-get-profile";
import { useGetProfileTypes } from "@/actions/profiles/hooks/use-get-profile-types";
import { useGetTones } from "@/actions/tones/hooks/use-get-tones";

type UseProfileDialogParams = {
  profileId: string | undefined;
};

export function useProfileDialog({ profileId }: UseProfileDialogParams) {
  const { profileData, isProfileLoading, isProfileError } = useGetProfile({
    profileId,
  });

  const { profileTypesData, isProfileTypesLoading, isProfileTypesError } =
    useGetProfileTypes();

  const { tonesData, isTonesLoading, isTonesError } = useGetTones();

  const { platformsData, isPlatformsLoading, isPlatformsError } =
    useGetPlatforms();

  return {
    profileData,
    profileTypesData,
    tonesData,
    platformsData,
    isProfileDialogFormDataLoading:
      isProfileTypesLoading ||
      isTonesLoading ||
      isPlatformsLoading ||
      isProfileLoading,
    isProfileDialogFormDataError:
      isProfileTypesError || isTonesError || isPlatformsError || isProfileError,
  };
}
