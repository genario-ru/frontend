import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesByProfileIdAttachmentsQueryKey,
  type GetProfileAttachmentsResponseSchema,
  usePostApiV1ProfilesByProfileIdAttachments,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

import { createOptimisticProfileAttachment } from "../utils/create-optimistic-profile-attachment";
import { createOptimisticProfileReferenceId } from "../utils/create-optimistic-profile-reference-id";
import {
  appendProfileReferencesListItem,
  cancelProfileReferencesQuery,
  invalidateProfileReferencesQuery,
  removeProfileReferencesListItemById,
  replaceProfileReferencesListItemById,
} from "../utils/profile-references-query-cache";
import { revokeProfileAttachmentPreviewUrl } from "../utils/revoke-profile-attachment-preview-url";

type UseCreateProfileAttachmentParams = {
  profileId: string;
};

type CreateProfileAttachmentContext = {
  optimisticId: string;
  previewObjectUrl?: string;
};

export function useCreateProfileAttachment({
  profileId,
}: UseCreateProfileAttachmentParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();
  const attachmentsQueryKey = getApiV1ProfilesByProfileIdAttachmentsQueryKey({
    profileId,
  });

  const {
    mutate: createProfileAttachment,
    isPending: isCreateProfileAttachmentPending,
  } =
    usePostApiV1ProfilesByProfileIdAttachments<CreateProfileAttachmentContext>({
      mutation: {
        onMutate: async (variables) => {
          await cancelProfileReferencesQuery(queryClient, attachmentsQueryKey);

          const optimisticId = createOptimisticProfileReferenceId();

          const fileName =
            variables.data.file instanceof File
              ? variables.data.file.name
              : "file";

          const { attachment, previewObjectUrl } =
            createOptimisticProfileAttachment({
              profileId: variables.profileId,
              optimisticId,
              file: variables.data.file,
              fileName,
              type: variables.data.type,
            });

          appendProfileReferencesListItem(
            queryClient,
            attachmentsQueryKey,
            attachment,
          );

          return { optimisticId, previewObjectUrl };
        },
        onSuccess: (response, _variables, context) => {
          if (!context) {
            return;
          }

          replaceProfileReferencesListItemById(
            queryClient,
            attachmentsQueryKey,
            context.optimisticId,
            response.data,
          );

          revokeProfileAttachmentPreviewUrl(context.previewObjectUrl);
        },
        onError: (_error, _variables, context) => {
          revokeProfileAttachmentPreviewUrl(context?.previewObjectUrl);

          if (!context?.optimisticId) {
            return;
          }

          removeProfileReferencesListItemById<
            GetProfileAttachmentsResponseSchema["data"][number]
          >(queryClient, attachmentsQueryKey, context.optimisticId);

          showErrorToast({
            description:
              "Произошла ошибка при загрузке файла. Попробуйте еще раз немного позже",
          });
        },
        onSettled: () => {
          invalidateProfileReferencesQuery(queryClient, attachmentsQueryKey);
        },
      },
    });

  return {
    createProfileAttachment,
    isCreateProfileAttachmentPending,
  };
}
