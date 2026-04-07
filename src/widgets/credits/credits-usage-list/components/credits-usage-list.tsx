import { RotateCwIcon } from "lucide-react";

import { CreditsUsageRow } from "@/features/credits/credits-usage-row/components/credits-usage-row";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsUsageList } from "../hooks/use-credits-usage-list";
import { CreditsUsageEntityIcon } from "../utils/credits-usage-entity-icon";

export function CreditsUsageList() {
  const {
    rows,
    hasNextCreditsUsagePage,
    isCreditsUsageLoading,
    isCreditsUsageError,
    isFetchingNextCreditsUsagePage,
    fetchNextCreditsUsagePage,
  } = useCreditsUsageList();

  if (isCreditsUsageLoading) {
    return <CreditsUsageListSkeleton />;
  }

  if (isCreditsUsageError) {
    return <CreditsUsageListError />;
  }

  if (rows.length === 0) {
    return <CreditsUsageListEmpty />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex max-h-[min(70vh,640px)] flex-col gap-2 overflow-y-auto pr-1">
        {rows.map((row) => (
          <CreditsUsageRow
            key={row.id}
            icon={<CreditsUsageEntityIcon entity={row.entity} />}
            title={row.title}
            subtitle={row.subtitle}
            creditsAmount={row.creditsAmount}
            footerLeft={row.footerLeft}
            formattedDate={row.formattedDate}
          />
        ))}
      </div>
      {hasNextCreditsUsagePage && (
        <Button
          variant="neutral"
          priority="secondary"
          size="sm"
          className="w-full"
          state={isFetchingNextCreditsUsagePage ? "loading" : "default"}
          onClick={() => fetchNextCreditsUsagePage()}
        >
          Показать ещё
        </Button>
      )}
    </div>
  );
}

export function CreditsUsageListSkeleton() {
  return (
    <ItemsList
      count={4}
      gap={8}
      item={<Skeleton className="h-[100px] w-full rounded-2xl" />}
    />
  );
}

export function CreditsUsageListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить расход"
      description="Произошла ошибка при загрузке данных"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
      className="m-auto py-8"
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
