import { useCallback, useRef, useState } from "react";

import { useGetPlatforms } from "@/actions/platforms/hooks/use-get-platforms";
import { useGetProfile } from "@/actions/profiles/hooks/use-get-profile";
import { useGetProfileTypes } from "@/actions/profiles/hooks/use-get-profile-types";
import { useGetTones } from "@/actions/tones/hooks/use-get-tones";

type UseProfileDialogParams = {
  profileId: string | undefined;
};

export function useProfileDialog({ profileId }: UseProfileDialogParams) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { profileData, isProfileLoading, isProfileError } = useGetProfile({
    profileId,
  });

  const { profileTypesData, isProfileTypesLoading, isProfileTypesError } =
    useGetProfileTypes();

  const { tonesData, isTonesLoading, isTonesError } = useGetTones();

  const { platformsData, isPlatformsLoading, isPlatformsError } =
    useGetPlatforms();

  const onDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    overlayRef,
    isDialogOpen,
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
    setIsDialogOpen,
    onDialogClose,
  };
}
