import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasListsIdeasListIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

const REFRESH_INTERVAL = 3000;

type UseGetIdeasListParams = {
  ideasListId: string | undefined;
  saved?: boolean;
};

export function useGetIdeasList({ ideasListId, saved }: UseGetIdeasListParams) {
  const {
    data: ideasListData,
    isLoading: isIdeasListLoading,
    isRefetching: isIdeasListRefetching,
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
      if (query.state.data?.data.status === "generation") {
        return REFRESH_INTERVAL;
      }

      return false;
    },
    enabled: Boolean(ideasListId),
  });

  return {
    ideasListData,
    isIdeasListLoading,
    isIdeasListRefetching,
    isIdeasListError,
  };
}
