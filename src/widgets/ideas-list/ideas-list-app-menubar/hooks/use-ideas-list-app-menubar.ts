import { useMemo } from "react";

import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type UseIdeasListAppMenubarParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubar({
  ideasListId,
}: UseIdeasListAppMenubarParams) {
  const { isMobile } = useBreakpoints();

  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({ ideasListId });

  const ideasListTitle = useMemo(() => {
    if (!ideasListData) {
      return undefined;
    }

    return ideasListData.data.name || "Без названия";
  }, [ideasListData]);

  const ideasListDescription = useMemo(() => {
    if (!ideasListData) {
      return undefined;
    }

    return ideasListData.data.description;
  }, [ideasListData]);

  return {
    ideasListData,
    ideasListTitle,
    ideasListDescription,
    isMobile,
    isIdeasListLoading,
    isIdeasListError,
  };
}
