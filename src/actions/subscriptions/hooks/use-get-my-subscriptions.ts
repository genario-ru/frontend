import { useGetApiV1SubscriptionsMy } from "@/codegen/api/product";

export function useGetMySubscriptions() {
  const {
    data: mySubscriptionsData,
    isLoading: isMySubscriptionsLoading,
    isError: isMySubscriptionsError,
  } = useGetApiV1SubscriptionsMy();

  return {
    mySubscriptionsData,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
  };
}
