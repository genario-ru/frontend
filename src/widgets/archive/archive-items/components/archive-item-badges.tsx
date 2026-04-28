import { useMemo } from "react";

import type { GetApiV1ArchiveItemsMyQueryResponse } from "@/codegen/api/product";
import { BadgesList } from "@/features/badges/badges-list/components/badges-list";

type ArchiveItemBadgesProps = {
  archiveItem: GetApiV1ArchiveItemsMyQueryResponse["data"][number];
};

export function ArchiveItemBadges({ archiveItem }: ArchiveItemBadgesProps) {
  const body = useMemo(() => {
    if (archiveItem.entity === "ideasList") {
      return (
        <BadgesList
          badgesData={[archiveItem.data.template, archiveItem.data.videoTypes]}
          badgeProps={{ size: "sm", variant: "tertiary" }}
        />
      );
    }

    return (
      <BadgesList
        badgesData={[
          archiveItem.data.template,
          archiveItem.data.videoType,
          archiveItem.data.videoDuration,
          archiveItem.data.platforms,
        ]}
        badgeProps={{ size: "sm", variant: "tertiary" }}
      />
    );
  }, [archiveItem]);

  return <footer className="flex flex-wrap items-center gap-1">{body}</footer>;
}
