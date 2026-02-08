import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";
import { useGetIdeasListIdeas } from "@/actions/ideas-lists/hooks/use-get-ideas-list-ideas";
import { SAVED_TAB } from "@/shared/constants/tab-names";

type UseIdeasListParams = {
  ideasListId: string;
  tab: string | undefined;
};

export function useIdeasList({ ideasListId, tab }: UseIdeasListParams) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({ ideasListId });

  const { ideasListIdeasData, isIdeasListIdeasLoading, isIdeasListIdeasError } =
    useGetIdeasListIdeas({
      ideasListId,
      saved: tab ? tab === SAVED_TAB : undefined,
    });

  return {
    ideasListData,
    ideasListIdeasData,
    isLoading: isIdeasListLoading || isIdeasListIdeasLoading,
    isError: isIdeasListError || isIdeasListIdeasError,
  };
}
