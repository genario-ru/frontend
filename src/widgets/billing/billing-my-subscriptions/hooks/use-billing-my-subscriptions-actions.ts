import { useMemo } from "react";

import { useGetMySubscriptions } from "@/actions/subscriptions/hooks/use-get-my-subscriptions";
import { TARIFF_SLUGS } from "@/shared/constants/tariff-slugs";

export function useBillingMySubscriptionsActions() {
  const { mySubscriptionsData, isMySubscriptionsLoading } =
    useGetMySubscriptions();

  const showUpgradeButton = useMemo(() => {
    if (!mySubscriptionsData?.data) return false;

    const activeSubscription = mySubscriptionsData.data.find(
      (subscription) => subscription.status === "active",
    );

    if (!activeSubscription) return true;

    return activeSubscription.tariff.slug !== TARIFF_SLUGS.ADVANCED;
  }, [mySubscriptionsData]);

  return {
    showUpgradeButton,
    isMySubscriptionsLoading,
  };
}
