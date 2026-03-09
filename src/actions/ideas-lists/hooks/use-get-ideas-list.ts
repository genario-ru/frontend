import { useGetApiV1IdeasListsByIdeasListId } from "@/codegen/api/product";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

const REFRESH_INTERVAL = 3000;

type UseGetIdeasListParams = {
  ideasListId: string | undefined;
  saved?: boolean;
};

export function useGetIdeasList({ ideasListId, saved }: UseGetIdeasListParams) {
  const {
    data: ideasListData,
    isLoading: isIdeasListLoading,
    isError: isIdeasListError,
  } = useGetApiV1IdeasListsByIdeasListId(
    {
      ideasListId: ideasListId as string,
      params: {
        saved,
      },
    },
    {
      query: {
        refetchInterval: (query) => {
          if (checkIsGenerationStatus(query.state.data?.data.status)) {
            return REFRESH_INTERVAL;
          }

          return false;
        },
        enabled: Boolean(ideasListId),
      },
    },
  );

  return {
    ideasListData,
    isIdeasListLoading,
    isIdeasListError,
  };
}
