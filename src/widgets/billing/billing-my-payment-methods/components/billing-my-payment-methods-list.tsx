import { RotateCwIcon } from "lucide-react";

import { BillingMyPaymentMethodCard } from "@/features/billing/billing-my-payment-methods/components/billing-my-payment-method-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useBillingMyPaymentMethodsList } from "../hooks/use-billing-my-payment-methods-list";

export function BillingMyPaymentMethodsList() {
  const {
    paymentMethods,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
    isDeletePaymentMethodPending,
    deletePaymentMethod,
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
        <BillingMyPaymentMethodCard
          key={paymentMethod.id}
          paymentMethod={paymentMethod}
          isDeletePending={isDeletePaymentMethodPending}
          onDelete={() =>
            deletePaymentMethod({
              paymentMethodId: paymentMethod.paymentMethodId,
            })
          }
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
      description="Привяжите карту для автоматической оплаты подписки"
      className="flex-1 py-8"
    />
  );
}
