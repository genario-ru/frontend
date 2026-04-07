import { RotateCwIcon } from "lucide-react";

import { CreditsBatchProgressRow } from "@/features/credits/credits-my-balance/components/credits-batch-progress-row";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsMyBalanceList } from "../hooks/use-credits-my-balance-list";

export function CreditsMyBalanceList() {
  const { rows, isMyCreditsBatchesLoading, isMyCreditsBatchesError } =
    useCreditsMyBalanceList();

  if (isMyCreditsBatchesLoading) {
    return <CreditsMyBalanceListSkeleton />;
  }

  if (isMyCreditsBatchesError) {
    return <CreditsMyBalanceListError />;
  }

  if (rows.length === 0) {
    return <CreditsMyBalanceListEmpty />;
  }

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <CreditsBatchProgressRow
          key={row.id}
          label={row.label}
          remaining={row.remaining}
          total={row.total}
          rightCaption={row.rightCaption}
        />
      ))}
    </div>
  );
}

export function CreditsMyBalanceListSkeleton() {
  return (
    <ItemsList
      count={3}
      gap={8}
      item={<Skeleton className="h-[88px] w-full rounded-2xl" />}
    />
  );
}

export function CreditsMyBalanceListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить баланс"
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

export function CreditsMyBalanceListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет активных батчей кредитов"
      description="Кредиты появятся после оформления подписки или покупки пакета"
      className="m-auto py-8"
    />
  );
}
