import { useMemo } from "react";

import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";

type UseIdeasListAppMenubarParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubar({
  ideasListId,
}: UseIdeasListAppMenubarParams) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({
      ideasListId,
    });

  const ideasListTitle = useMemo(() => {
    return ideasListData?.data.name || "Без названия";
  }, [ideasListData]);

  const ideasListDescription = useMemo(() => {
    return ideasListData?.data.description;
  }, [ideasListData]);

  return {
    ideasListData,
    ideasListTitle,
    ideasListDescription,
    isIdeasListLoading,
    isIdeasListError,
  };
}
