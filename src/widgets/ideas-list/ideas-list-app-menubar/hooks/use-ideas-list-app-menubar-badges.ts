import { useMemo } from "react";

import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";

type UseIdeasListAppMenubarBadgesParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
};

export function useIdeasListAppMenubarBadges({
  ideasListData,
}: UseIdeasListAppMenubarBadgesParams) {
  const badges: string[] = useMemo(() => {
    const badges: string[] = [];

    if (ideasListData?.data.videoTypes) {
      badges.push(
        ...ideasListData.data.videoTypes.map((videoType) => videoType.name),
      );
    }

    if (ideasListData?.data.tones) {
      badges.push(...ideasListData.data.tones.map((tone) => tone.name));
    }

    return badges;
  }, [ideasListData]);

  return {
    badges,
  };
}
