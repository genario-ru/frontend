import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasListsIdeasListIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";
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
  } = useQuery({
    ...getApiV1IdeasListsIdeasListIdOptions({
      path: {
        ideasListId: ideasListId as string,
      },
      query: {
        saved,
      },
    }),
    refetchInterval: (query) => {
      if (checkIsGenerationStatus(query.state.data?.data.status)) {
        return REFRESH_INTERVAL;
      }

      return false;
    },
    enabled: Boolean(ideasListId),
  });

  return {
    ideasListData,
    isIdeasListLoading,
    isIdeasListError,
  };
}
