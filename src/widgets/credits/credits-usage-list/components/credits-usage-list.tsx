import { RotateCwIcon } from "lucide-react";
import { useMemo } from "react";

import {
  CreditsUsageRow,
  CreditsUsageRowSkeleton,
} from "@/features/credits/credits-usage-row/components/credits-usage-row";
import { InfiniteScroll } from "@/shared/components/common/infinite-scroll";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsUsageList } from "../hooks/use-credits-usage-list";

export function CreditsUsageList() {
  const {
    rows,
    hasNextCreditsUsagePage,
    isFetchingNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    fetchNextCreditsUsagePage,
  } = useCreditsUsageList();

  const body = useMemo(() => {
    if (isCreditsUsageLoading) {
      return <CreditsUsageListSkeleton />;
    }

    if (isCreditsUsageError) {
      return <CreditsUsageListError />;
    }

    if (!rows.length) {
      return <CreditsUsageListEmpty />;
    }

    return (
      <>
        {rows.map((row) => (
          <CreditsUsageRow
            key={row.id}
            icon={row.icon}
            title={row.title}
            creditsAmount={row.creditsAmount}
            footerLeft={row.footerLeft}
            formattedDate={row.formattedDate}
          />
        ))}
        {isFetchingNextCreditsUsagePage && <CreditsUsageListSkeleton />}
        <InfiniteScroll
          signature={rows.length}
          isLoading={isFetchingNextCreditsUsagePage}
          hasNextPage={hasNextCreditsUsagePage}
          fetchNextPage={fetchNextCreditsUsagePage}
        />
      </>
    );
  }, [
    rows,
    isCreditsUsageLoading,
    isCreditsUsageError,
    isFetchingNextCreditsUsagePage,
    hasNextCreditsUsagePage,
    fetchNextCreditsUsagePage,
  ]);

  return (
    <Island
      grow
      roundedBottom={false}
      roundedTop={false}
      className="gap-2 pt-0"
    >
      {body}
    </Island>
  );
}

export function CreditsUsageListSkeleton() {
  return <ItemsList noParent count={4} item={<CreditsUsageRowSkeleton />} />;
}

export function CreditsUsageListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить расход"
      description="Произошла ошибка при загрузке данных"
      actions={
        <Button icon={<RotateCwIcon />} onClick={reloadPage} className="mt-2">
          Обновить
        </Button>
      }
      className="m-auto"
    />
  );
}

export function CreditsUsageListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Расходов пока нет"
      description="Здесь появятся операции списания кредитов"
      className="m-auto py-8"
    />
  );
}
