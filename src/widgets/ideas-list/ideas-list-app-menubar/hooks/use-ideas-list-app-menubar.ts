import { useMemo } from "react";

import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

type UseIdeasListAppMenubarParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubar({
  ideasListId,
}: UseIdeasListAppMenubarParams) {
  const { isMobile } = useBreakpoints();

  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({ ideasListId });

  const isGenerating = checkIsGenerationStatus(ideasListData?.data.status);

  const ideasListTitle = useMemo(() => {
    if (!ideasListData) {
      return undefined;
    }

    return ideasListData.data.name;
  }, [ideasListData]);

  const ideasListDescription = useMemo(() => {
    if (!ideasListData) {
      return undefined;
    }

    return ideasListData.data.description ?? undefined;
  }, [ideasListData]);

  return {
    ideasListData,
    ideasListTitle,
    ideasListDescription,
    isMobile,
    isIdeasListLoading,
    isGenerating,
    isIdeasListError,
  };
}
