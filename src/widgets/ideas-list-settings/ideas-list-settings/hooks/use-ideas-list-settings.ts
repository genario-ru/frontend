import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";

type UseIdeasListSettingsParams = {
  ideasListId: string | undefined;
};

export function useIdeasListSettings({
  ideasListId,
}: UseIdeasListSettingsParams) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({ ideasListId });

  return {
    ideasListData,
    isIdeasListLoading,
    isIdeasListError,
  };
}
