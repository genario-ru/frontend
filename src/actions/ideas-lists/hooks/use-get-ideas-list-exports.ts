import { useGetApiV1IdeasListsByIdeasListIdExports } from "@/codegen/api/product";

type UseGetIdeasListExportsProps = {
  ideasListId: string;
  refetchInterval?: number;
};

export function useGetIdeasListExports({
  ideasListId,
  refetchInterval,
}: UseGetIdeasListExportsProps) {
  const {
    data: ideasListExportsData,
    isLoading: isGetIdeasListExportsLoading,
  } = useGetApiV1IdeasListsByIdeasListIdExports(
    { ideasListId },
    {
      query: {
        refetchInterval,
      },
    },
  );

  return {
    ideasListExportsData,
    isGetIdeasListExportsLoading,
  };
}
