import { useGetPlatforms } from "@/actions/platforms/hooks/use-get-platforms";
import { useGetMyProfiles } from "@/actions/profiles/hooks/use-get-my-profiles";
import { useGetTones } from "@/actions/tones/hooks/use-get-tones";
import { useGetVideoDurations } from "@/actions/video-durations/hooks/use-get-video-durations";
import { useGetVideoTypes } from "@/actions/video-types/hooks/use-get-video-types";

export function useScenarioSettingsParamsConfigurationData() {
  const { videoTypesData, isVideoTypesLoading, isVideoTypesError } =
    useGetVideoTypes();

  const { videoDurationsData, isVideoDurationsLoading, isVideoDurationsError } =
    useGetVideoDurations();

  const { platformsData, isPlatformsLoading, isPlatformsError } =
    useGetPlatforms();

  const { tonesData, isTonesLoading, isTonesError } = useGetTones();

  const { myProfilesData, isMyProfilesLoading, isMyProfilesError } =
    useGetMyProfiles();

  return {
    videoTypesData,
    videoDurationsData,
    platformsData,
    myProfilesData,
    tonesData,
    isLoading:
      isMyProfilesLoading ||
      isVideoTypesLoading ||
      isVideoDurationsLoading ||
      isPlatformsLoading ||
      isTonesLoading,
    isError:
      isMyProfilesError ||
      isVideoTypesError ||
      isVideoDurationsError ||
      isPlatformsError ||
      isTonesError,
  };
}
