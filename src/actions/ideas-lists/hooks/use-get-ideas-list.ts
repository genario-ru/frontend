import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasListsIdeasListIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetIdeasListParams = {
  ideasListId: string | undefined;
};

export function useGetIdeasList({ ideasListId }: UseGetIdeasListParams) {
  const {
    data: ideasListData,
    isLoading: isIdeasListLoading,
    isError: isIdeasListError,
  } = useQuery({
    ...getApiV1IdeasListsIdeasListIdOptions({
      path: {
        ideasListId: ideasListId as string,
      },
    }),
    enabled: Boolean(ideasListId),
  });

  return {
    ideasListData,
    isIdeasListLoading,
    isIdeasListError,
  };
}
