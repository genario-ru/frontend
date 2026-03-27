import { useGetProfileChannelPlatforms } from "@/actions/profiles/hooks/use-get-profile-channel-platforms";

export function useProfilesImportPlatformsList() {
  const { profileChannelPlatformsData, isProfileChannelPlatformsLoading } =
    useGetProfileChannelPlatforms();

  return {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
  };
}
