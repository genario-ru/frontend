import { usePostApiV1SubscriptionsUpgrade } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useUpgradeSubscription() {
  const reachGoal = useReachGoal();

  const {
    mutate: upgradeSubscription,
    isPending: isUpgradeSubscriptionPending,
    isError: isUpgradeSubscriptionError,
    isSuccess: isUpgradeSubscriptionSuccess,
  } = usePostApiV1SubscriptionsUpgrade({
    mutation: {
      onSuccess: () => reachGoal("subscription-upgrade"),
    },
  });

  return {
    upgradeSubscription,
    isUpgradeSubscriptionPending,
    isUpgradeSubscriptionError,
    isUpgradeSubscriptionSuccess,
  };
}
