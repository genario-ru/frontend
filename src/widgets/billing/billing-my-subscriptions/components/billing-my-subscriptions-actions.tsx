import { partition } from "es-toolkit";
import { ArrowUpRightIcon } from "lucide-react";
import { useMemo } from "react";

import {
  TariffMiniCard,
  TariffMiniCardSkeleton,
} from "@/features/tariffs/tariff-card/components/tariff-mini-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Plug } from "@/shared/components/ui/plug";
import { cn } from "@/shared/utils/cn";

import { useBillingMySubscriptionsActions } from "../hooks/use-billing-my-subscriptions-actions";

export function BillingMySubscriptionsActions() {
  const {
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

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <Dialog
        open={isChangeTariffDialogOpen}
        onOpenChange={setIsChangeTariffDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            icon={<ArrowUpRightIcon />}
            variant="neutral"
            priority="secondary"
          >
            Изменить тариф
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit max-w-6xl">
          <DialogPredefinedHeader
            title="Изменить тариф"
            description="Выберите новый тариф для вашей подписки"
          />
          <DialogBody className="flex-row gap-2">{body}</DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
