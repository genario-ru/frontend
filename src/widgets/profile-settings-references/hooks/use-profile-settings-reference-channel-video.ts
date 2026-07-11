import { useCallback } from "react";

import { useDeleteProfileChannelVideo } from "@/actions/profiles/hooks/use-delete-profile-channel-video";
import { isOptimisticProfileReferenceId } from "@/actions/profiles/utils/create-optimistic-profile-reference-id";
import type { ProfileChannelVideoSchema } from "@/codegen/api/product";

type UseProfileSettingsReferenceChannelVideoParams = {
  profileId: string;
  channelVideo: ProfileChannelVideoSchema;
};

export function useProfileSettingsReferenceChannelVideo({
  profileId,
  channelVideo,
}: UseProfileSettingsReferenceChannelVideoParams) {
  const {
    handleDeleteProfileChannelVideo,
    isDeleteProfileChannelVideoPending,
  } = useDeleteProfileChannelVideo({ profileId });

  const handleRemove = useCallback(() => {
    handleDeleteProfileChannelVideo(channelVideo);
  }, [channelVideo, handleDeleteProfileChannelVideo]);

  const isPending = isOptimisticProfileReferenceId(channelVideo.id);

  return {
    handleRemove,
    isPending,
    isRemoveDisabled: isDeleteProfileChannelVideoPending,
  };
}
