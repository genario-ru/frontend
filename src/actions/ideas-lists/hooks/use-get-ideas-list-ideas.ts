import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasListsIdeasListIdIdeasOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetIdeasListIdeasParams = {
  ideasListId: string;
};

export function useGetIdeasListIdeas({
  ideasListId,
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
    }),
  });

  return {
    ideasListIdeasData,
    isIdeasListIdeasLoading,
    isIdeasListIdeasError,
  };
}
