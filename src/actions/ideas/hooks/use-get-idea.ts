import { useQuery } from "@tanstack/react-query";

import { getApiV1IdeasIdeaIdOptions } from "@/codegen/api/product/@tanstack/react-query.gen";

type UseGetIdeaParams = {
  ideaId: string | undefined;
};

export function useGetIdea({ ideaId }: UseGetIdeaParams) {
  const {
    data: ideaData,
    isLoading: isIdeaLoading,
    isError: isIdeaError,
  } = useQuery({
    ...getApiV1IdeasIdeaIdOptions({
      path: { ideaId: ideaId as string },
    }),
    enabled: Boolean(ideaId),
  });

  return {
    ideaData,
    isIdeaLoading,
    isIdeaError,
  };
}
