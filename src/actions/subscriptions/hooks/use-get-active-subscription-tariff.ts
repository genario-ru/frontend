import { useMemo } from "react";

import { useGetMySubscriptions } from "./use-get-my-subscriptions";

export function useGetActiveSubscriptionTariff() {
  const {
    mySubscriptionsData,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
  } = useGetMySubscriptions();

  const activeSubscriptionTariff = useMemo(() => {
    return mySubscriptionsData?.data.find(
      (subscription) => subscription.status === "active",
    )?.tariff;
  }, [mySubscriptionsData]);

  return {
    activeSubscriptionTariff,
    isActiveSubscriptionTariffLoading: isMySubscriptionsLoading,
    isActiveSubscriptionTariffError: isMySubscriptionsError,
  };
}
