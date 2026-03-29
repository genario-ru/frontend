import { BookImageIcon, LightbulbIcon, RotateCwIcon } from "lucide-react";
import { useMemo } from "react";

import { ArchiveItem } from "@/features/archive/archive-item/components/archive-item";
import { ArchiveItemSkeleton } from "@/features/archive/archive-item/components/archive-item-skeleton";
import { InfiniteScroll } from "@/shared/components/common/infinite-scroll";
import { ItemsList } from "@/shared/components/common/items-list";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { CRLF } from "@/shared/constants/unicode";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

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
      return <ArchiveItemsSkeleton />;
    }

    if (isErrorArchiveItems) {
      return <ArchiveItemsError />;
    }

    if (!archiveItemsData.length) {
      return <ArchiveItemsEmpty />;
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
    <ContentLayout className="flex-1">
      <Island grow className="gap-0">
        {body}
      </Island>
    </ContentLayout>
  );
};

export function ArchiveItemsSkeleton() {
  return (
    <ItemsList
      count={12}
      item={<ArchiveItemSkeleton />}
      className="grid w-full grid-cols-3 gap-4"
    />
  );
}

export function ArchiveItemsError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      size="lg"
      variant="negative"
      title="Ошибка загрузки"
      description={`Произошла ошибка при загрузке архива.${CRLF}Попробуйте обновить страницу`}
      actions={
        <Button
          size="lg"
          icon={<RotateCwIcon />}
          onClick={reloadPage}
          className="mt-3"
        >
          Обновить страницу
        </Button>
      }
      className="m-auto"
    />
  );
}

export function ArchiveItemsEmpty() {
  return (
    <Plug
      size="lg"
      variant="neutral"
      title="Архив пуст"
      description="Создайте свой первый список идей или сценарий"
      actions={
        <div className="mt-3 flex items-center gap-2">
          <ButtonLink
            size="lg"
            to="/ideas-lists/settings"
            icon={<LightbulbIcon />}
          >
            Новые идеи
          </ButtonLink>
          <ButtonLink size="lg" to="/scenarios/settings" icon={<BookImageIcon />}>
            Новый сценарий
          </ButtonLink>
        </div>
      }
      className="m-auto"
    />
  );
}
