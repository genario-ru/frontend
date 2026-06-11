import { partition } from "es-toolkit";
import { ArrowUpRightIcon } from "lucide-react";
import { useMemo } from "react";

import {
  TariffMiniCard,
  TariffMiniCardSkeleton,
} from "@/features/tariffs/tariff-card/components/tariff-mini-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { cn } from "@/shared/utils/cn";

import { useBillingMySubscriptionsActions } from "../hooks/use-billing-my-subscriptions-actions";
import { BillingMySubscriptionsChangeTariffDialog } from "./billing-my-subscriptions-change-tariff-dialog";
import { BillingMySubscriptionsChangeTariffDrawer } from "./billing-my-subscriptions-change-tariff-drawer";

export function BillingMySubscriptionsActions() {
  const {
    isMobile,
    availableTariffs,
    isChangeTariffDialogOpen,
    isLoading,
    isError,
    isUpgradeSubscriptionPending,
    handleUpgradeSubscription,
    setIsChangeTariffDialogOpen,
  } = useBillingMySubscriptionsActions();

  const body = useMemo(() => {
    if (isLoading) {
      return <ItemsList noParent count={2} item={<TariffMiniCardSkeleton />} />;
    }

    if (isError) {
      return (
        <Plug
          variant="negative"
          title="Ошибка"
          description="Произошла ошибка при загрузке тарифов"
        />
      );
    }

    return (
      <>
        {availableTariffs?.map((tariff) => {
          const [features, limitations] = partition(
            tariff.features,
            (feature) => feature.included,
          );

          return (
            <TariffMiniCard
              key={tariff.id}
              name={tariff.name}
              price={tariff.price}
              oldPrice={tariff.oldPrice}
              features={features.map((feature) => feature.text)}
              limitations={limitations.map((limitation) => limitation.text)}
              action={
                <Button
                  size="lg"
                  priority={tariff.isPreferred ? "primary" : "secondary"}
                  state={isUpgradeSubscriptionPending ? "loading" : "default"}
                  className={cn("mt-auto w-full", {
                    "bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-4":
                      !tariff.isPreferred,
                  })}
                  onClick={() => handleUpgradeSubscription(tariff.id)}
                >
                  Выбрать
                </Button>
              }
              className="flex-1"
            />
          );
        })}
      </>
    );
  }, [
    availableTariffs,
    isLoading,
    isError,
    isUpgradeSubscriptionPending,
    handleUpgradeSubscription,
  ]);

  const trigger = useMemo(
    () => (
      <Button
        icon={<ArrowUpRightIcon />}
        variant="neutral"
        priority="secondary"
      >
        Изменить тариф
      </Button>
    ),
    [],
  );

  const changeTariffDialog = useMemo(() => {
    if (isMobile) {
      return (
        <BillingMySubscriptionsChangeTariffDrawer
          trigger={trigger}
          isOpen={isChangeTariffDialogOpen}
          setIsOpen={setIsChangeTariffDialogOpen}
          body={body}
        />
      );
    }

    return (
      <BillingMySubscriptionsChangeTariffDialog
        trigger={trigger}
        isOpen={isChangeTariffDialogOpen}
        setIsOpen={setIsChangeTariffDialogOpen}
        body={body}
      />
    );
  }, [
    isMobile,
    trigger,
    body,
    isChangeTariffDialogOpen,
    setIsChangeTariffDialogOpen,
  ]);

  return (
    <div className="flex w-full items-center justify-end gap-2">
      {changeTariffDialog}
    </div>
  );
}
