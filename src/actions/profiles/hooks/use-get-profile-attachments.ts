import { useGetApiV1ProfilesByProfileIdAttachments } from "@/codegen/api/product";

type UseGetProfileAttachmentsParams = {
  profileId: string;
};

export function useGetProfileAttachments({
  profileId,
}: UseGetProfileAttachmentsParams) {
  const {
    data: profileAttachmentsData,
    isLoading: isProfileAttachmentsLoading,
    isError: isProfileAttachmentsError,
  } = useGetApiV1ProfilesByProfileIdAttachments({ profileId });

  return {
    profileAttachmentsData,
    isProfileAttachmentsLoading,
    isProfileAttachmentsError,
  };
}
