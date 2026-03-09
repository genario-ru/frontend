import { useGetApiV1IdeasByIdeaId } from "@/codegen/api/product";

type UseGetIdeaParams = {
  ideaId: string | undefined;
};

export function useGetIdea({ ideaId }: UseGetIdeaParams) {
  const {
    data: ideaData,
    isLoading: isIdeaLoading,
    isError: isIdeaError,
  } = useGetApiV1IdeasByIdeaId(
    { ideaId: ideaId as string },
    {
      query: {
        enabled: Boolean(ideaId),
      },
    },
  );

  return {
    ideaData,
    isIdeaLoading,
    isIdeaError,
  };
}
