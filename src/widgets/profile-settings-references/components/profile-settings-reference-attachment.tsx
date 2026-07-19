import { useMemo } from "react";

import type { ProfileAttachmentExtendedSchema } from "@/codegen/api/product";
import { ProfileSettingsReferenceCard } from "@/features/profile-settings-references/profile-settings-reference-card/components/profile-settings-reference-card";
import { SwipeActions } from "@/shared/components/ui/swipe-actions";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

import { useProfileSettingsReferenceAttachment } from "../hooks/use-profile-settings-reference-attachment";
import { ProfileSettingsReferenceCardSwipeActions } from "./profile-settings-reference-card-swipe-actions";
import { ProfileSettingsReferenceDeleteConfirmation } from "./profile-settings-reference-delete-confirmation";

type ProfileSettingsReferenceAttachmentProps = {
  profileId: string;
  attachment: ProfileAttachmentExtendedSchema;
};

export function ProfileSettingsReferenceAttachment({
  profileId,
  attachment,
}: ProfileSettingsReferenceAttachmentProps) {
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
  } = useProfileSettingsReferenceAttachment({
    profileId,
    attachment,
  });

  const card = useMemo(
    () => (
      <ProfileSettingsReferenceCard
        fileName={attachment.attachment.fileName}
        mimeType={attachment.attachment.mimeType}
        previewUrl={attachment.attachment.url}
        hideActions={showSwipeActions}
        isPending={isPending}
        isRemoveDisabled={isRemoveDisabled}
        onRemove={handleRemove}
      />
    ),
    [
      attachment.attachment.fileName,
      attachment.attachment.mimeType,
      attachment.attachment.url,
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
  }, [card, handleRemove, isRemoveDisabled, showSwipeActions]);

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
