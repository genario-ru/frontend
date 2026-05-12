import { RotateCwIcon } from "lucide-react";

import { BillingMySubscriptionCancelDialog } from "@/features/billing/billing-my-subscriptions/components/billing-my-subscription-cancel-dialog";
import { BillingMySubscriptionCancelDialogDrawer } from "@/features/billing/billing-my-subscriptions/components/billing-my-subscription-cancel-drawer";
import { BillingMySubscriptionCard } from "@/features/billing/billing-my-subscriptions/components/billing-my-subscription-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { SwipeActions } from "@/shared/components/ui/swipe-actions";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { subscriptionCancellableStatuses } from "../constants/subscription-cancellable-statuses";
import { useBillingMySubscriptionsList } from "../hooks/use-billing-my-subscriptions-list";
import { BillingMySubscriptionSwipeActions } from "./billing-my-subscription-swipe-actions";

export function BillingMySubscriptionsList() {
  const {
    visibleSubscriptions,
    isMobile,
    selectedSubscription,
    showCancelDialog,
    showSwipeActions,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
    isCancelSubscriptionPending,
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    handleOpenCancelDialog,
    handleCancelSubscription,
  } = useBillingMySubscriptionsList();

  if (isMySubscriptionsLoading) {
    return <BillingMySubscriptionsListSkeleton />;
  }

  if (isMySubscriptionsError) {
    return <BillingMySubscriptionsListError />;
  }

  if (visibleSubscriptions.length === 0) {
    return <BillingMySubscriptionsListEmpty />;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {visibleSubscriptions.map((subscription) => {
          const onCancelButtonClick = () =>
            handleOpenCancelDialog(subscription.id);

          const isCancellable = subscriptionCancellableStatuses.includes(
            subscription.status,
          );

          const card = (
            <BillingMySubscriptionCard
              key={subscription.id}
              name={subscription.name}
              price={subscription.price}
              billingPeriod={subscription.billingPeriod}
              status={subscription.status}
              credits={subscription.credits}
              durationDays={subscription.durationDays}
              dateRange={subscription.dateRange}
              isCancellable={isCancellable}
              hideCancelAction={showSwipeActions}
              onCancelButtonClick={onCancelButtonClick}
            />
          );

          if (showSwipeActions && isCancellable) {
            return (
              <SwipeActions
                key={subscription.id}
                beforeInset={8}
                actions={
                  <BillingMySubscriptionSwipeActions
                    onCancelButtonClick={onCancelButtonClick}
                  />
                }
                className="rounded-2xl"
              >
                {card}
              </SwipeActions>
            );
          }

          return card;
        })}
      </div>
      {showCancelDialog && selectedSubscription && (
        <>
          {isMobile ? (
            <BillingMySubscriptionCancelDialogDrawer
              subscriptionName={selectedSubscription.tariff.name}
              isOpen={isCancelDialogOpen}
              isPending={isCancelSubscriptionPending}
              setIsOpen={setIsCancelDialogOpen}
              onConfirm={handleCancelSubscription}
            />
          ) : (
            <BillingMySubscriptionCancelDialog
              subscriptionName={selectedSubscription.tariff.name}
              isOpen={isCancelDialogOpen}
              isPending={isCancelSubscriptionPending}
              setIsOpen={setIsCancelDialogOpen}
              onConfirm={handleCancelSubscription}
            />
          )}
        </>
      )}
    </>
  );
}

export function BillingMySubscriptionsListSkeleton() {
  return (
    <ItemsList
      count={3}
      gap={8}
      item={<Skeleton className="h-[72px] w-full rounded-2xl" />}
    />
  );
}

export function BillingMySubscriptionsListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить подписки"
      description="Произошла ошибка при загрузке данных"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
    />
  );
}

export function BillingMySubscriptionsListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет активных подписок"
      description="Выберите подходящий тариф для начала работы"
    />
  );
}
