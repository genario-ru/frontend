import { useGetApiV1SubscriptonsMy } from "@/codegen/api/product";

export function useGetMySubscriptions() {
  const {
    data: mySubscriptionsData,
    isLoading: isMySubscriptionsLoading,
    isError: isMySubscriptionsError,
  } = useGetApiV1SubscriptonsMy();

  return {
    mySubscriptionsData,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
  };
}
