import { useGetProfileChannelPlatforms } from "@/actions/profiles/hooks/use-get-profile-channel-platforms";

export function useProfilesImportPlatformsFan() {
  const { profileChannelPlatformsData, isProfileChannelPlatformsLoading } =
    useGetProfileChannelPlatforms();

  return {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
  };
}
