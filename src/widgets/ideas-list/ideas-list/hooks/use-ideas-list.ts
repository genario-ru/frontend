import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";
import { SAVED_TAB } from "@/shared/constants/tab-names";

type UseIdeasListParams = {
  ideasListId: string;
  tab: string | undefined;
};

export function useIdeasList({ ideasListId, tab }: UseIdeasListParams) {
  const {
    ideasListData,
    isIdeasListLoading,
    isIdeasListRefetching,
    isIdeasListError,
  } = useGetIdeasList({
    ideasListId,
    saved: tab ? tab === SAVED_TAB : undefined,
  });

  return {
    ideasListData,
    isLoading: isIdeasListLoading || isIdeasListRefetching,
    isError: isIdeasListError,
  };
}
