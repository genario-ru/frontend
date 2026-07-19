import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesByProfileIdChannelVideosQueryKey,
  type GetProfileChannelVideosResponseSchema,
  usePostApiV1ProfilesByProfileIdChannelVideos,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

import { createOptimisticProfileChannelVideo } from "../utils/create-optimistic-profile-channel-video";
import { createOptimisticProfileReferenceId } from "../utils/create-optimistic-profile-reference-id";
import {
  appendProfileReferencesListItem,
  cancelProfileReferencesQuery,
  invalidateProfileReferencesQueryIfNoPendingItems,
  removeProfileReferencesListItemById,
  replaceProfileReferencesListItemById,
} from "../utils/profile-references-query-cache";

type CreateProfileChannelVideoContext = {
  optimisticId: string;
};

type UseCreateProfileChannelVideoMutationOptions = NonNullable<
  NonNullable<
    Parameters<
      typeof usePostApiV1ProfilesByProfileIdChannelVideos<CreateProfileChannelVideoContext>
    >[0]
  >["mutation"]
>;

type UseCreateProfileChannelVideoParams = {
  profileId: string;
  mutationOptions?: UseCreateProfileChannelVideoMutationOptions;
};

export function useCreateProfileChannelVideo({
  profileId,
  mutationOptions,
}: UseCreateProfileChannelVideoParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();
  const channelVideosQueryKey =
    getApiV1ProfilesByProfileIdChannelVideosQueryKey({
      profileId,
    });

  const {
    mutate: createProfileChannelVideo,
    isPending: isCreateProfileChannelVideoPending,
  } =
    usePostApiV1ProfilesByProfileIdChannelVideos<CreateProfileChannelVideoContext>(
      {
        mutation: {
          ...mutationOptions,
          onMutate: async (variables) => {
            await cancelProfileReferencesQuery(
              queryClient,
              channelVideosQueryKey,
            );

            const optimisticId = createOptimisticProfileReferenceId();
            const optimisticChannelVideo = createOptimisticProfileChannelVideo({
              profileId: variables.profileId,
              optimisticId,
              url: variables.data.url,
            });

            appendProfileReferencesListItem(
              queryClient,
              channelVideosQueryKey,
              optimisticChannelVideo,
            );

            return { optimisticId };
          },
          onSuccess: (response, variables, onMutateResult, context) => {
            if (onMutateResult) {
              replaceProfileReferencesListItemById(
                queryClient,
                channelVideosQueryKey,
                onMutateResult.optimisticId,
                response.data,
              );
            }

            mutationOptions?.onSuccess?.(
              response,
              variables,
              onMutateResult,
              context,
            );
          },
          onError: (error, variables, onMutateResult, context) => {
            if (onMutateResult?.optimisticId) {
              removeProfileReferencesListItemById<
                GetProfileChannelVideosResponseSchema["data"][number]
              >(
                queryClient,
                channelVideosQueryKey,
                onMutateResult.optimisticId,
              );
            }

            showErrorToast({
              description:
                "Произошла ошибка при добавлении ссылки. Попробуйте еще раз немного позже",
            });

            mutationOptions?.onError?.(
              error,
              variables,
              onMutateResult,
              context,
            );
          },
          onSettled: (data, error, variables, onMutateResult, context) => {
            invalidateProfileReferencesQueryIfNoPendingItems(
              queryClient,
              channelVideosQueryKey,
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
      },
    );

  return {
    createProfileChannelVideo,
    isCreateProfileChannelVideoPending,
  };
}
