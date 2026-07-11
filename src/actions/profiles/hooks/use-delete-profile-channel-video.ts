import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  getApiV1ProfilesByProfileIdChannelVideosQueryKey,
  type GetProfileChannelVideosResponseSchema,
  type ProfileChannelVideoSchema,
  useDeleteApiV1ProfilesChannelVideosByProfileChannelVideoId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

import { handleDeleteProfileReferenceItem } from "../utils/handle-delete-profile-reference-item";
import {
  cancelProfileReferencesQuery,
  getProfileReferencesQuerySnapshot,
  invalidateProfileReferencesQuery,
  removeProfileReferencesListItemById,
  restoreProfileReferencesQuerySnapshot,
} from "../utils/profile-references-query-cache";

type UseDeleteProfileChannelVideoParams = {
  profileId: string;
};

type DeleteProfileChannelVideoContext = {
  previousChannelVideos?: GetProfileChannelVideosResponseSchema;
};

export function useDeleteProfileChannelVideo({
  profileId,
}: UseDeleteProfileChannelVideoParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const channelVideosQueryKey =
    getApiV1ProfilesByProfileIdChannelVideosQueryKey({ profileId });

  const {
    mutate: deleteProfileChannelVideo,
    isPending: isDeleteProfileChannelVideoPending,
  } =
    useDeleteApiV1ProfilesChannelVideosByProfileChannelVideoId<DeleteProfileChannelVideoContext>(
      {
        mutation: {
          onMutate: async ({ profileChannelVideoId }) => {
            await cancelProfileReferencesQuery(
              queryClient,
              channelVideosQueryKey,
            );

            const previousChannelVideos =
              getProfileReferencesQuerySnapshot<GetProfileChannelVideosResponseSchema>(
                queryClient,
                channelVideosQueryKey,
              );

            removeProfileReferencesListItemById(
              queryClient,
              channelVideosQueryKey,
              profileChannelVideoId,
            );

            return { previousChannelVideos };
          },
          onError: (_error, _variables, context) => {
            restoreProfileReferencesQuerySnapshot(
              queryClient,
              channelVideosQueryKey,
              context?.previousChannelVideos,
            );

            showErrorToast({
              description:
                "Произошла ошибка при удалении ссылки. Попробуйте еще раз немного позже",
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

  const handleDeleteProfileChannelVideo = useCallback(
    (channelVideo: ProfileChannelVideoSchema) => {
      handleDeleteProfileReferenceItem({
        item: channelVideo,
        onOptimisticDelete: (optimisticChannelVideo) => {
          removeProfileReferencesListItemById(
            queryClient,
            channelVideosQueryKey,
            optimisticChannelVideo.id,
          );
        },
        onServerDelete: () => {
          deleteProfileChannelVideo({
            profileChannelVideoId: channelVideo.id,
          });
        },
      });
    },
    [channelVideosQueryKey, deleteProfileChannelVideo, queryClient],
  );

  return {
    handleDeleteProfileChannelVideo,
    isDeleteProfileChannelVideoPending,
  };
}
