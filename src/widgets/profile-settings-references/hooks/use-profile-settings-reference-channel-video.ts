import { useCallback, useState } from "react";

import { useDeleteProfileChannelVideo } from "@/actions/profiles/hooks/use-delete-profile-channel-video";
import { isOptimisticProfileReferenceId } from "@/actions/profiles/utils/create-optimistic-profile-reference-id";
import type { ProfileChannelVideoSchema } from "@/codegen/api/product";

import { getProfileSettingsReferenceChannelVideoDeleteTexts } from "../constants/profile-settings-reference-delete-texts";

type UseProfileSettingsReferenceChannelVideoParams = {
  profileId: string;
  channelVideo: ProfileChannelVideoSchema;
};

export function useProfileSettingsReferenceChannelVideo({
  profileId,
  channelVideo,
}: UseProfileSettingsReferenceChannelVideoParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    handleDeleteProfileChannelVideo,
    isDeleteProfileChannelVideoPending,
  } = useDeleteProfileChannelVideo({ profileId });

  const handleDeleteDialogOpenChange = useCallback((isOpen: boolean) => {
    setIsDeleteDialogOpen(isOpen);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    handleDeleteProfileChannelVideo(channelVideo);
    setIsDeleteDialogOpen(false);
  }, [channelVideo, handleDeleteProfileChannelVideo]);

  const isPending = isOptimisticProfileReferenceId(channelVideo.id);
  const itemName = channelVideo.name ?? channelVideo.url ?? "Видео";
  const deleteTexts =
    getProfileSettingsReferenceChannelVideoDeleteTexts(itemName);

  return {
    deleteDescription: deleteTexts.description,
    deleteTitle: deleteTexts.title,
    handleConfirmDelete,
    handleDeleteDialogOpenChange,
    handleRemove: handleDeleteButtonClick,
    isDeleteDialogOpen,
    isPending,
    isRemoveDisabled: isDeleteProfileChannelVideoPending,
  };
}
