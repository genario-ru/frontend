import { useGetMyProfiles } from "@/actions/profiles/hooks/use-get-my-profiles";
import { useGetTones } from "@/actions/tones/hooks/use-get-tones";
import { useGetVideoTypes } from "@/actions/video-types/hooks/use-get-video-types";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function useIdeasListSettingsParamsConfigurationData() {
  const { isMobile } = useBreakpoints();

  const { myProfilesData, isMyProfilesLoading, isMyProfilesError } =
    useGetMyProfiles();

  const { videoTypesData, isVideoTypesLoading, isVideoTypesError } =
    useGetVideoTypes();

  const { tonesData, isTonesLoading, isTonesError } = useGetTones();

  return {
    myProfilesData,
    videoTypesData,
    tonesData,
    isMobile,
    isLoading: isMyProfilesLoading || isVideoTypesLoading || isTonesLoading,
    isError: isMyProfilesError || isVideoTypesError || isTonesError,
  };
}
