import { useDeletePaymentMethod } from "@/actions/billing/hooks/use-delete-payment-method";
import { useGetMyPaymentMethods } from "@/actions/billing/hooks/use-get-my-payment-methods";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

export function useBillingMyPaymentMethodsList() {
  const { isDesktop } = useBreakpoints();

  const {
    myPaymentMethodsData,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  } = useGetMyPaymentMethods();

  const { deletePaymentMethod, isDeletePaymentMethodPending } =
    useDeletePaymentMethod();

  const paymentMethods = myPaymentMethodsData?.data ?? [];
  const showSwipeActions = !isDesktop && checkTouchScreen();

  return {
    paymentMethods,
    showSwipeActions,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
    deletePaymentMethod,
    isDeletePaymentMethodPending,
  };
}
