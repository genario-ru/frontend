import { useGetIdeasListIdeas } from "@/actions/ideas-lists/hooks/use-get-ideas-list-ideas";
import { SAVED_TAB } from "@/shared/constants/tab-names";

type UseIdeasListParams = {
  ideasListId: string;
  tab: string | undefined;
};

export function useIdeasList({ ideasListId, tab }: UseIdeasListParams) {
  const { ideasListIdeasData, isIdeasListIdeasLoading } = useGetIdeasListIdeas({
    ideasListId,
    saved: tab ? tab === SAVED_TAB : undefined,
  });

  return {
    ideasListIdeasData,
    isIdeasListIdeasLoading,
  };
}
