import { useMemo } from "react";

import type { ProfileChannelVideoSchema } from "@/codegen/api/product";
import { ProfileSettingsReferenceCard } from "@/features/profile-settings-references/profile-settings-reference-card/components/profile-settings-reference-card";
import { SwipeActions } from "@/shared/components/ui/swipe-actions";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

import { useProfileSettingsReferenceChannelVideo } from "../hooks/use-profile-settings-reference-channel-video";
import { ProfileSettingsReferenceCardSwipeActions } from "./profile-settings-reference-card-swipe-actions";
import { ProfileSettingsReferenceDeleteConfirmation } from "./profile-settings-reference-delete-confirmation";

type ProfileSettingsReferenceChannelVideoProps = {
  profileId: string;
  channelVideo: ProfileChannelVideoSchema;
};

export function ProfileSettingsReferenceChannelVideo({
  profileId,
  channelVideo,
}: ProfileSettingsReferenceChannelVideoProps) {
  const { isDesktop, isMobile } = useBreakpoints();
  const showSwipeActions = !isDesktop && checkTouchScreen();

  const {
    deleteDescription,
    deleteTitle,
    handleConfirmDelete,
    handleDeleteDialogOpenChange,
    handleRemove,
    isDeleteDialogOpen,
    isPending,
    isRemoveDisabled,
  } = useProfileSettingsReferenceChannelVideo({
    profileId,
    channelVideo,
  });

  const card = useMemo(
    () => (
      <ProfileSettingsReferenceCard
        fileName={channelVideo.name ?? channelVideo.url}
        previewUrl={channelVideo.thumbnailUrl}
        externalUrl={channelVideo.url}
        hideActions={showSwipeActions}
        isPending={isPending}
        isRemoveDisabled={isRemoveDisabled}
        onRemove={handleRemove}
      />
    ),
    [
      channelVideo.name,
      channelVideo.thumbnailUrl,
      channelVideo.url,
      handleRemove,
      isPending,
      isRemoveDisabled,
      showSwipeActions,
    ],
  );

  const body = useMemo(() => {
    if (showSwipeActions) {
      return (
        <SwipeActions
          beforeInset={8}
          afterInset={8}
          className="rounded-4 h-full"
          actions={
            <ProfileSettingsReferenceCardSwipeActions
              externalUrl={channelVideo.url}
              isRemoveDisabled={isRemoveDisabled}
              onRemove={handleRemove}
            />
          }
        >
          {card}
        </SwipeActions>
      );
    }

    return card;
  }, [
    card,
    channelVideo.url,
    handleRemove,
    isRemoveDisabled,
    showSwipeActions,
  ]);

  const deleteConfirmation = useMemo(
    () => (
      <ProfileSettingsReferenceDeleteConfirmation
        isMobile={isMobile}
        title={deleteTitle}
        description={deleteDescription}
        isOpen={isDeleteDialogOpen}
        isPending={isRemoveDisabled}
        setIsOpen={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
      />
    ),
    [
      deleteDescription,
      deleteTitle,
      handleConfirmDelete,
      handleDeleteDialogOpenChange,
      isDeleteDialogOpen,
      isMobile,
      isRemoveDisabled,
    ],
  );

  return (
    <>
      {body}
      {deleteConfirmation}
    </>
  );
}
