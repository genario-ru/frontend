import { useGetMyPaymentMethods } from "@/actions/billing/hooks/use-get-my-payment-methods";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

export function useBillingMyPaymentMethodsList() {
  const { isDesktop, isMobile } = useBreakpoints();

  const {
    myPaymentMethodsData,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  } = useGetMyPaymentMethods();

  const paymentMethods = myPaymentMethodsData?.data ?? [];
  const showSwipeActions = !isDesktop && checkTouchScreen();

  return {
    isMobile,
    paymentMethods,
    showSwipeActions,
    isMyPaymentMethodsLoading,
    isMyPaymentMethodsError,
  };
}
