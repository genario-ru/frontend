import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  getApiV1ProfilesByProfileIdAttachmentsQueryKey,
  type GetProfileAttachmentsResponseSchema,
  type ProfileAttachmentExtendedSchema,
  useDeleteApiV1ProfilesAttachmentsByAttachmentId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

import { handleDeleteProfileReferenceItem } from "../utils/handle-delete-profile-reference-item";
import {
  cancelProfileReferencesQuery,
  getProfileReferencesQuerySnapshot,
  invalidateProfileReferencesQueryIfNoPendingItems,
  removeProfileAttachmentListItemByAttachmentId,
  removeProfileReferencesListItemById,
  restoreProfileReferencesQuerySnapshot,
} from "../utils/profile-references-query-cache";

type UseDeleteProfileAttachmentParams = {
  profileId: string;
};

type DeleteProfileAttachmentContext = {
  previousAttachments?: GetProfileAttachmentsResponseSchema;
};

export function useDeleteProfileAttachment({
  profileId,
}: UseDeleteProfileAttachmentParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();
  const attachmentsQueryKey = getApiV1ProfilesByProfileIdAttachmentsQueryKey({
    profileId,
  });

  const {
    mutate: deleteProfileAttachment,
    isPending: isDeleteProfileAttachmentPending,
  } =
    useDeleteApiV1ProfilesAttachmentsByAttachmentId<DeleteProfileAttachmentContext>(
      {
        mutation: {
          onMutate: async ({ attachmentId }) => {
            await cancelProfileReferencesQuery(
              queryClient,
              attachmentsQueryKey,
            );

            const previousAttachments =
              getProfileReferencesQuerySnapshot<GetProfileAttachmentsResponseSchema>(
                queryClient,
                attachmentsQueryKey,
              );

            removeProfileAttachmentListItemByAttachmentId(
              queryClient,
              attachmentsQueryKey,
              attachmentId,
            );

            return { previousAttachments };
          },
          onError: (_error, _variables, context) => {
            restoreProfileReferencesQuerySnapshot(
              queryClient,
              attachmentsQueryKey,
              context?.previousAttachments,
            );

            showErrorToast({
              description:
                "Произошла ошибка при удалении файла. Попробуйте еще раз немного позже",
            });
          },
          onSettled: () => {
            invalidateProfileReferencesQueryIfNoPendingItems(
              queryClient,
              attachmentsQueryKey,
            );
          },
        },
      },
    );

  const handleDeleteProfileAttachment = useCallback(
    (attachment: ProfileAttachmentExtendedSchema) => {
      handleDeleteProfileReferenceItem({
        item: attachment,
        onOptimisticDelete: (optimisticAttachment) => {
          removeProfileReferencesListItemById(
            queryClient,
            attachmentsQueryKey,
            optimisticAttachment.id,
          );
        },
        onServerDelete: () => {
          deleteProfileAttachment({ attachmentId: attachment.attachmentId });
        },
      });
    },
    [attachmentsQueryKey, deleteProfileAttachment, queryClient],
  );

  return {
    handleDeleteProfileAttachment,
    isDeleteProfileAttachmentPending,
  };
}
