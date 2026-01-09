import { useMemo } from "react";

import { ArchiveItem } from "@/features/archive/archive-item/components/archive-item";
import { ArchiveItemSkeleton } from "@/features/archive/archive-item/components/archive-item-skeleton";
import { InfiniteScroll } from "@/shared/components/common/infinite-scroll";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";

import { useArchiveItems } from "../hooks/use-archive-items";
import { ArchiveItemActions } from "./archive-item-actions";
import { ArchiveItemBadges } from "./archive-item-badges";

export const ArchiveItems = () => {
  const {
    archiveItemsData,
    hasNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    isFetchingNextArchiveItemsPage,
    fetchNextArchiveItemsPage,
  } = useArchiveItems();

  const body = useMemo(() => {
    if (isLoadingArchiveItems) {
      return (
        <ItemsList
          count={12}
          item={<ArchiveItemSkeleton />}
          className="grid w-full grid-cols-3 gap-4"
        />
      );
    }

    if (isErrorArchiveItems) {
      return <div>Error</div>;
    }

    if (!archiveItemsData.length) {
      return <div>No items</div>;
    }

    return (
      <>
        <div className="grid w-full grid-cols-3 gap-4">
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
              badges={<ArchiveItemBadges archiveItem={item} />}
              className="row-span-1"
            />
          ))}
          {isFetchingNextArchiveItemsPage && (
            <ItemsList
              noParent={true}
              count={6}
              item={<ArchiveItemSkeleton />}
            />
          )}
        </div>
        <InfiniteScroll
          signature={archiveItemsData.length}
          isLoading={isLoadingArchiveItems}
          hasNextPage={hasNextArchiveItemsPage}
          fetchNextPage={fetchNextArchiveItemsPage}
          className="col-span-3"
        />
      </>
    );
  }, [
    archiveItemsData,
    hasNextArchiveItemsPage,
    isFetchingNextArchiveItemsPage,
    isLoadingArchiveItems,
    isErrorArchiveItems,
    fetchNextArchiveItemsPage,
  ]);

  return (
    <ContentLayout>
      <Island className="gap-0">{body}</Island>
    </ContentLayout>
  );
};
