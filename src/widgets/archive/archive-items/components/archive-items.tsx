import { useMemo } from "react";

import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";
import { ArchiveItem } from "@/features/archive/archive-card/components/archive-item";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { ArchiveItemActions } from "./archive-item-actions";

export const ArchiveItems = () => {
  const {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    fetchNextArchiveItemsPage,
  } = useGetMyArchiveItems();

  console.log(archiveItemsData);

  const body = useMemo(() => {
    if (isLoadingArchiveItems) {
      return <div>Loading...</div>;
    }

    if (isErrorArchiveItems) {
      return <div>Error</div>;
    }

    if (!archiveItemsData.length) {
      return <div>No items</div>;
    }

    return (
      <>
        {archiveItemsData.map((item) => (
          <ArchiveItem
            key={item.data.id}
            id={item.data.id}
            entity={item.entity}
            createdAt={item.data.createdAt}
            title={item.data.name}
            description={item.data.description}
            profileName={item.data.profile?.name}
            profileId={item.data.profile?.id}
            actions={
              <ArchiveItemActions id={item.data.id} entity={item.entity} />
            }
            badges={<div>Badges</div>}
          />
        ))}
      </>
    );
  }, [archiveItemsData, isLoadingArchiveItems, isErrorArchiveItems]);

  return (
    <ContentLayout>
      <Island className="grid auto-rows-fr grid-cols-4">{body}</Island>
    </ContentLayout>
  );
};
