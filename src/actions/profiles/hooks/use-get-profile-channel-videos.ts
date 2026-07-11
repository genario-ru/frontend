import { useGetApiV1ProfilesByProfileIdChannelVideos } from "@/codegen/api/product";

type UseGetProfileChannelVideosParams = {
  profileId: string;
};

export function useGetProfileChannelVideos({
  profileId,
}: UseGetProfileChannelVideosParams) {
  const {
    data: profileChannelVideosData,
    isLoading: isProfileChannelVideosLoading,
    isError: isProfileChannelVideosError,
  } = useGetApiV1ProfilesByProfileIdChannelVideos({ profileId });

  return {
    profileChannelVideosData,
    isProfileChannelVideosLoading,
    isProfileChannelVideosError,
  };
}
