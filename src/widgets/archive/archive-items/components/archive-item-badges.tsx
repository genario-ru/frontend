import { useMemo } from "react";

import type { GetApiV1ArchiveItemsMyResponse } from "@/codegen/api/product/types.gen";
import { Badge } from "@/shared/components/ui/badge";

type ArchiveItemBadgesProps = {
  archiveItem: GetApiV1ArchiveItemsMyResponse["data"][number];
};

export function ArchiveItemBadges({ archiveItem }: ArchiveItemBadgesProps) {
  const body = useMemo(() => {
    if (archiveItem.entity === "ideasList") {
      return <></>;
    }

    return <Badge>Scenario</Badge>;
  }, [archiveItem]);

  return (
    <footer className="flex flex-wrap items-center gap-2">
      {/* {archiveItem.data.} */}
      {body}
    </footer>
  );
}
