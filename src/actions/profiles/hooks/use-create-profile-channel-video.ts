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
  invalidateProfileReferencesQuery,
  removeProfileReferencesListItemById,
  replaceProfileReferencesListItemById,
} from "../utils/profile-references-query-cache";

type UseCreateProfileChannelVideoParams = {
  profileId: string;
};

type CreateProfileChannelVideoContext = {
  optimisticId: string;
};

export function useCreateProfileChannelVideo({
  profileId,
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
          onSuccess: (response, _variables, context) => {
            if (!context) {
              return;
            }

            replaceProfileReferencesListItemById(
              queryClient,
              channelVideosQueryKey,
              context.optimisticId,
              response.data,
            );
          },
          onError: (_error, _variables, context) => {
            if (!context?.optimisticId) {
              return;
            }

            removeProfileReferencesListItemById<
              GetProfileChannelVideosResponseSchema["data"][number]
            >(queryClient, channelVideosQueryKey, context.optimisticId);

            showErrorToast({
              description:
                "Произошла ошибка при добавлении ссылки. Попробуйте еще раз немного позже",
            });
          },
          onSettled: () => {
            invalidateProfileReferencesQuery(
              queryClient,
              channelVideosQueryKey,
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
