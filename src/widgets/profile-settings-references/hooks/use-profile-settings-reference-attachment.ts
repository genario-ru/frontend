import { useCallback } from "react";

import { useDeleteProfileAttachment } from "@/actions/profiles/hooks/use-delete-profile-attachment";
import { isOptimisticProfileReferenceId } from "@/actions/profiles/utils/create-optimistic-profile-reference-id";
import type { ProfileAttachmentExtendedSchema } from "@/codegen/api/product";

type UseProfileSettingsReferenceAttachmentParams = {
  profileId: string;
  attachment: ProfileAttachmentExtendedSchema;
};

export function useProfileSettingsReferenceAttachment({
  profileId,
  attachment,
}: UseProfileSettingsReferenceAttachmentParams) {
  const { handleDeleteProfileAttachment, isDeleteProfileAttachmentPending } =
    useDeleteProfileAttachment({ profileId });

  const handleRemove = useCallback(() => {
    handleDeleteProfileAttachment(attachment);
  }, [attachment, handleDeleteProfileAttachment]);

  const isPending = isOptimisticProfileReferenceId(attachment.id);

  return {
    handleRemove,
    isPending,
    isRemoveDisabled: isDeleteProfileAttachmentPending,
  };
}
