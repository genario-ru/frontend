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
  invalidateProfileReferencesQueryIfNoPendingItems,
  removeProfileReferencesListItemById,
  replaceProfileReferencesListItemById,
} from "../utils/profile-references-query-cache";
import { revokeProfileAttachmentPreviewUrl } from "../utils/revoke-profile-attachment-preview-url";

type CreateProfileAttachmentContext = {
  optimisticId: string;
  previewObjectUrl?: string;
};

type UseCreateProfileAttachmentMutationOptions = NonNullable<
  NonNullable<
    Parameters<
      typeof usePostApiV1ProfilesByProfileIdAttachments<CreateProfileAttachmentContext>
    >[0]
  >["mutation"]
>;

type UseCreateProfileAttachmentParams = {
  profileId: string;
  mutationOptions?: UseCreateProfileAttachmentMutationOptions;
};

export function useCreateProfileAttachment({
  profileId,
  mutationOptions,
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
        ...mutationOptions,
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
        onSuccess: (response, variables, onMutateResult, context) => {
          if (onMutateResult) {
            replaceProfileReferencesListItemById(
              queryClient,
              attachmentsQueryKey,
              onMutateResult.optimisticId,
              response.data,
            );
            revokeProfileAttachmentPreviewUrl(onMutateResult.previewObjectUrl);
          }

          mutationOptions?.onSuccess?.(
            response,
            variables,
            onMutateResult,
            context,
          );
        },
        onError: (error, variables, onMutateResult, context) => {
          revokeProfileAttachmentPreviewUrl(onMutateResult?.previewObjectUrl);

          if (onMutateResult?.optimisticId) {
            removeProfileReferencesListItemById<
              GetProfileAttachmentsResponseSchema["data"][number]
            >(queryClient, attachmentsQueryKey, onMutateResult.optimisticId);
          }

          showErrorToast({
            description:
              "Произошла ошибка при загрузке файла. Попробуйте еще раз немного позже",
          });

          mutationOptions?.onError?.(error, variables, onMutateResult, context);
        },
        onSettled: (data, error, variables, onMutateResult, context) => {
          invalidateProfileReferencesQueryIfNoPendingItems(
            queryClient,
            attachmentsQueryKey,
          );

          mutationOptions?.onSettled?.(
            data,
            error,
            variables,
            onMutateResult,
            context,
          );
        },
      },
    });

  return {
    createProfileAttachment,
    isCreateProfileAttachmentPending,
  };
}
