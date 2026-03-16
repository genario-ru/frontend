import { useGetApiV1IdeasListsByIdeasListIdExports } from "@/codegen/api/product";

type UseGetExportsProps = {
  ideasListId: string;
  refetchInterval?: number;
};

export function useGetExports({
  ideasListId,
  refetchInterval,
}: UseGetExportsProps) {
  const { data: exportsData, isLoading: isGetExportsLoading } =
    useGetApiV1IdeasListsByIdeasListIdExports(
      { ideasListId },
      {
        query: {
          refetchInterval,
        },
      },
    );

  return {
    exportsData,
    isGetExportsLoading,
  };
}
