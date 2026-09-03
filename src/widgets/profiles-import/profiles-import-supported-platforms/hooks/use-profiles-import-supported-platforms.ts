import { useGetProfileChannelPlatforms } from "@/actions/profiles/hooks/use-get-profile-channel-platforms";

export function useProfilesImportSupportedPlatforms() {
  const {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
    isProfileChannelPlatformsError,
  } = useGetProfileChannelPlatforms();

  return {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
    isProfileChannelPlatformsError,
  };
}
