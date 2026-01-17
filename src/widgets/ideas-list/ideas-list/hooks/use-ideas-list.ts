import { useGetIdeasListIdeas } from "@/actions/ideas-lists/hooks/use-get-ideas-list-ideas";

type UseIdeasListParams = {
  ideasListId: string;
};

export function useIdeasList({ ideasListId }: UseIdeasListParams) {
  const { ideasListIdeasData, isIdeasListIdeasLoading } = useGetIdeasListIdeas({
    ideasListId,
  });

  return {
    ideasListIdeasData,
    isIdeasListIdeasLoading,
  };
}
