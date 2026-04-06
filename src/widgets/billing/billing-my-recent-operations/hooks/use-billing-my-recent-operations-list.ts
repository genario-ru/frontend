import { useMemo } from "react";

import { useGetMyPayments } from "@/actions/billing/hooks/use-get-my-payments";

import { formatPaymentOperation } from "../utils/format-payment-operation";

export function useBillingMyRecentOperationsList() {
  const { myPaymentsData, isMyPaymentsLoading, isMyPaymentsError } =
    useGetMyPayments();

  const operations = useMemo(() => {
    if (!myPaymentsData?.data) return [];
    return myPaymentsData.data.map(formatPaymentOperation);
  }, [myPaymentsData]);

  return {
    operations,
    isMyPaymentsLoading,
    isMyPaymentsError,
  };
}
