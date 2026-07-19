import { useCallback, useState } from "react";

import { useDeleteProfileAttachment } from "@/actions/profiles/hooks/use-delete-profile-attachment";
import { isOptimisticProfileReferenceId } from "@/actions/profiles/utils/create-optimistic-profile-reference-id";
import type { ProfileAttachmentExtendedSchema } from "@/codegen/api/product";

import { getProfileSettingsReferenceAttachmentDeleteTexts } from "../constants/profile-settings-reference-delete-texts";

type UseProfileSettingsReferenceAttachmentParams = {
  profileId: string;
  attachment: ProfileAttachmentExtendedSchema;
};

export function useProfileSettingsReferenceAttachment({
  profileId,
  attachment,
}: UseProfileSettingsReferenceAttachmentParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { handleDeleteProfileAttachment, isDeleteProfileAttachmentPending } =
    useDeleteProfileAttachment({ profileId });

  const handleDeleteDialogOpenChange = useCallback((isOpen: boolean) => {
    setIsDeleteDialogOpen(isOpen);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    handleDeleteProfileAttachment(attachment);
    setIsDeleteDialogOpen(false);
  }, [attachment, handleDeleteProfileAttachment]);

  const isPending = isOptimisticProfileReferenceId(attachment.id);
  const itemName = attachment.attachment.fileName;
  const deleteTexts =
    getProfileSettingsReferenceAttachmentDeleteTexts(itemName);

  return {
    deleteDescription: deleteTexts.description,
    deleteTitle: deleteTexts.title,
    handleConfirmDelete,
    handleDeleteDialogOpenChange,
    handleRemove: handleDeleteButtonClick,
    isDeleteDialogOpen,
    isPending,
    isRemoveDisabled: isDeleteProfileAttachmentPending,
  };
}
