import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import { useGetMySubscriptions } from "@/actions/subscriptions/hooks/use-get-my-subscriptions";
import { useUpgradeSubscription } from "@/actions/subscriptions/hooks/use-upgrade-subscription";
import { useGetTariffs } from "@/actions/tariffs/hooks/use-get-tariffs";
import { getApiV1SubscriptionsMyQueryKey } from "@/codegen/api/product";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { useToast } from "@/shared/hooks/use-toast";

export function useBillingMySubscriptionsActions() {
  const queryClient = useQueryClient();
  const { isMobile } = useBreakpoints();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isChangeTariffDialogOpen, setIsChangeTariffDialogOpen] =
    useState(false);

  const { upgradeSubscription, isUpgradeSubscriptionPending } =
    useUpgradeSubscription();

  const {
    mySubscriptionsData,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
  } = useGetMySubscriptions();

  const { tariffsData, isTariffsLoading, isTariffsError } = useGetTariffs();

  const handleUpgradeSubscription = useCallback(
    (tariffId: string) => {
      upgradeSubscription(
        { data: { newTariffId: tariffId } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getApiV1SubscriptionsMyQueryKey(),
            });

            setIsChangeTariffDialogOpen(false);

            showSuccessToast({
              title: "Тариф изменён",
              description: "Ваша подписка переведена на новый тариф",
            });
          },
          onError: () => {
            showErrorToast({
              description: "Не удалось изменить тариф. Попробуйте ещё раз",
            });
          },
        },
      );
    },
    [
      queryClient,
      setIsChangeTariffDialogOpen,
      upgradeSubscription,
      showErrorToast,
      showSuccessToast,
    ],
  );

  const availableTariffs = useMemo(() => {
    const activeSubscriptions = mySubscriptionsData?.data.filter(
      (subscription) => ["active", "pending"].includes(subscription.status),
    );

    if (!activeSubscriptions) return tariffsData?.data;

    return tariffsData?.data.filter(
      (tariff) =>
        !activeSubscriptions.some(
          (subscription) => subscription.tariff.id === tariff.id,
        ),
    );
  }, [tariffsData, mySubscriptionsData]);

  return {
    isMobile,
    availableTariffs,
    isChangeTariffDialogOpen,
    isLoading: isMySubscriptionsLoading || isTariffsLoading,
    isError: isMySubscriptionsError || isTariffsError,
    isUpgradeSubscriptionPending,
    handleUpgradeSubscription,
    setIsChangeTariffDialogOpen,
  };
}
