import { usePostApiV1SubscriptionsUpgrade } from "@/codegen/api/product";

export function useUpgradeSubscription() {
  const {
    mutate: upgradeSubscription,
    isPending: isUpgradeSubscriptionPending,
    isError: isUpgradeSubscriptionError,
    isSuccess: isUpgradeSubscriptionSuccess,
  } = usePostApiV1SubscriptionsUpgrade();

  return {
    upgradeSubscription,
    isUpgradeSubscriptionPending,
    isUpgradeSubscriptionError,
    isUpgradeSubscriptionSuccess,
  };
}
