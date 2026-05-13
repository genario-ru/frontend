import { RotateCwIcon } from "lucide-react";

import { BillingMyRecentOperationCard } from "@/features/billing/billing-my-recent-operations/components/billing-my-recent-operation-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useBillingMyRecentOperationsList } from "../hooks/use-billing-my-recent-operations-list";

export function BillingMyRecentOperationsList() {
  const { operations, isMyPaymentsLoading, isMyPaymentsError } =
    useBillingMyRecentOperationsList();

  if (isMyPaymentsLoading) {
    return <BillingMyRecentOperationsListSkeleton />;
  }

  if (isMyPaymentsError) {
    return <BillingMyRecentOperationsListError />;
  }

  if (operations.length === 0) {
    return <BillingMyRecentOperationsListEmpty />;
  }

  return (
    <div className="flex flex-col gap-2">
      {operations.map((operation) => (
        <BillingMyRecentOperationCard
          key={operation.id}
          title={operation.title}
          status={operation.status}
          tariffName={operation.tariffName}
          formattedAmount={operation.formattedAmount}
          formattedDate={operation.formattedDate}
        />
      ))}
    </div>
  );
}

export function BillingMyRecentOperationsListSkeleton() {
  return (
    <ItemsList
      count={3}
      gap={8}
      item={<Skeleton className="h-[72px] w-full rounded-2xl" />}
    />
  );
}

export function BillingMyRecentOperationsListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить операции"
      description="Произошла ошибка при загрузке истории платежей"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
      className="m-auto"
    />
  );
}

export function BillingMyRecentOperationsListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Операций пока нет"
      description="История платежей будет отображаться здесь"
      className="m-auto py-8"
    />
  );
}
