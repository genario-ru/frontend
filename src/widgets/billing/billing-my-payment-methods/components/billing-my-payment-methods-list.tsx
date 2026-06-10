import { RotateCwIcon } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useBillingMyPaymentMethodsList } from "../hooks/use-billing-my-payment-methods-list";
import { BillingMyPaymentMethodsListItem } from "./billing-my-payment-methods-list-item";

export function BillingMyPaymentMethodsList() {
  const {
    isMobile,
    paymentMethods,
    showSwipeActions,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  } = useBillingMyPaymentMethodsList();

  if (isMyPaymentMethodsLoading) {
    return <BillingMyPaymentMethodsListSkeleton />;
  }

  if (isMyPaymentMethodsError) {
    return <BillingMyPaymentMethodsListError />;
  }

  if (paymentMethods.length === 0) {
    return <BillingMyPaymentMethodsListEmpty />;
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      {paymentMethods.map((paymentMethod) => (
        <BillingMyPaymentMethodsListItem
          key={paymentMethod.id}
          paymentMethod={paymentMethod}
          isMobile={isMobile}
          showSwipeActions={showSwipeActions}
        />
      ))}
    </div>
  );
}

export function BillingMyPaymentMethodsListSkeleton() {
  return (
    <ItemsList
      count={2}
      gap={8}
      item={<Skeleton className="h-[52px] w-full rounded-2xl" />}
      className="flex-1"
    />
  );
}

export function BillingMyPaymentMethodsListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить способы оплаты"
      description="Произошла ошибка при загрузке данных"
      className="flex-1"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
    />
  );
}

export function BillingMyPaymentMethodsListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет привязанных способов оплаты"
      description="Привяжите карту, чтобы подписка продлевалась автоматически, а пакеты кредитов можно было оплачивать без повторного ввода данных"
      className="flex-1 py-8"
    />
  );
}
