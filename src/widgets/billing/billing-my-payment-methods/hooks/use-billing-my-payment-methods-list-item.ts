import { useCallback, useState } from "react";

import { useDeletePaymentMethod } from "@/actions/billing/hooks/use-delete-payment-method";

type UseBillingMyPaymentMethodsListItemParams = {
  paymentMethodId: string;
};

export function useBillingMyPaymentMethodsListItem({
  paymentMethodId,
}: UseBillingMyPaymentMethodsListItemParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { deletePaymentMethod, isDeletePaymentMethodPending } =
    useDeletePaymentMethod();

  const handleDeleteDialogOpenChange = useCallback((isOpen: boolean) => {
    setIsDeleteDialogOpen(isOpen);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeletePaymentMethod = useCallback(() => {
    deletePaymentMethod(
      { paymentMethodId },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      },
    );
  }, [deletePaymentMethod, paymentMethodId]);

  return {
    isDeleteDialogOpen,
    isDeletePaymentMethodPending,
    handleDeleteDialogOpenChange,
    handleDeleteButtonClick,
    handleDeletePaymentMethod,
  };
}
