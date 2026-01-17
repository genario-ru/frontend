import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasListsIdeasListIdIdeasOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetIdeasListIdeasParams = {
  ideasListId: string;
  saved?: boolean;
};

export function useGetIdeasListIdeas({
  ideasListId,
  saved,
}: UseGetIdeasListIdeasParams) {
  const {
    data: ideasListIdeasData,
    isLoading: isIdeasListIdeasLoading,
    isError: isIdeasListIdeasError,
  } = useQuery({
    ...getApiV1IdeasListsIdeasListIdIdeasOptions({
      path: {
        ideasListId,
      },
      query: {
        saved,
      },
    }),
  });

  return {
    ideasListIdeasData,
    isIdeasListIdeasLoading,
    isIdeasListIdeasError,
  };
}
