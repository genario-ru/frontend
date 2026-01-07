import { useMemo } from "react";

import type { GetApiV1ArchiveItemsMyResponse } from "@/codegen/api/product/types.gen";
import { ArchiveItemBadge } from "@/features/archive/archive-item/components/archive-item-badge";
import { TemplateBadge } from "@/features/templates/template-badge/components/template-badge";

type ArchiveItemBadgesProps = {
  archiveItem: GetApiV1ArchiveItemsMyResponse["data"][number];
};

export function ArchiveItemBadges({ archiveItem }: ArchiveItemBadgesProps) {
  const body = useMemo(() => {
    if (archiveItem.entity === "ideasList") {
      return (
        <>
          {archiveItem.data.videoTypes.map((videoType) => (
            <ArchiveItemBadge
              key={videoType.id}
              name={videoType.name}
              icon={videoType.icon}
            />
          ))}
        </>
      );
    }

    return (
      <>
        {archiveItem.data.videoType && (
          <ArchiveItemBadge
            name={archiveItem.data.videoType.name}
            icon={archiveItem.data.videoType.icon}
          />
        )}
        {archiveItem.data.videoDuration && (
          <ArchiveItemBadge name={archiveItem.data.videoDuration.name} />
        )}
        {archiveItem.data.platform && (
          <ArchiveItemBadge name={archiveItem.data.platform.name} />
        )}
      </>
    );
  }, [archiveItem]);

  return (
    <footer className="flex flex-wrap items-center gap-2">
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
