import { useMemo } from "react";

import type { GetApiV1ArchiveItemsMyResponse } from "@/codegen/api/product/types.gen";
import { BadgesList } from "@/features/badges/badges-list/badges-list";
import { TemplateBadge } from "@/features/templates/template-badge/components/template-badge";

type ArchiveItemBadgesProps = {
  archiveItem: GetApiV1ArchiveItemsMyResponse["data"][number];
};

export function ArchiveItemBadges({ archiveItem }: ArchiveItemBadgesProps) {
  const body = useMemo(() => {
    if (archiveItem.entity === "ideasList") {
      return (
        <BadgesList
          badgesData={archiveItem.data.videoTypes}
          badgeProps={{ size: "sm", variant: "tertiary" }}
        />
      );
    }

    return (
      <BadgesList
        badgesData={[
          archiveItem.data.videoType,
          archiveItem.data.videoDuration,
          archiveItem.data.platform,
        ]}
        badgeProps={{ size: "sm", variant: "tertiary" }}
      />
    );
  }, [archiveItem]);

  return (
    <footer className="flex flex-wrap items-center gap-1">
      {archiveItem.data.template && (
        <TemplateBadge
          name={archiveItem.data.template.name}
          icon={archiveItem.data.template.icon}
          color={archiveItem.data.template.color}
        />
      )}
      {body}
    </footer>
  );
}
