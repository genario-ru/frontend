import type { GetApiV1IdeasListsIdeasListIdResponse } from "@/codegen/api/product/types.gen";
import { Badge } from "@/shared/components/ui/badge";

import { useIdeasListAppMenubarBadges } from "../hooks/use-ideas-list-app-menubar-badges";

type IdeasListAppMenubarBadgesParams = {
  ideasListData: GetApiV1IdeasListsIdeasListIdResponse | undefined;
};

export function IdeasListAppMenubarBadges({
  ideasListData,
}: IdeasListAppMenubarBadgesParams) {
  const { badges } = useIdeasListAppMenubarBadges({ ideasListData });

  return (
    <div className="flex items-center gap-1">
      {badges.map((badgeText) => (
        <Badge key={`ideas-list-app-menubar-badge-${badgeText}`}>
          {badgeText}
        </Badge>
      ))}
    </div>
  );
}
