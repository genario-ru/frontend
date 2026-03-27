import { useGetApiV1ProfilesChannelsPlatforms } from "@/codegen/api/product";

export function useGetProfileChannelPlatforms() {
  const {
    data: profileChannelPlatformsData,
    isLoading: isProfileChannelPlatformsLoading,
    isError: isProfileChannelPlatformsError,
  } = useGetApiV1ProfilesChannelsPlatforms();

  return {
    profileChannelPlatformsData,
    isProfileChannelPlatformsLoading,
    isProfileChannelPlatformsError,
  };
}
