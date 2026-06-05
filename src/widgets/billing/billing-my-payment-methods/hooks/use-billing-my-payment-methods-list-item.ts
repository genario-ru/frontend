import { useCallback, useState } from "react";

import { useDeletePaymentMethod } from "@/actions/billing/hooks/use-delete-payment-method";
import { useSelectDefaultPaymentMethod } from "@/actions/billing/hooks/use-select-default-payment-method";
import type { PaymentMethodSchema } from "@/codegen/api/product";

type UseBillingMyPaymentMethodsListItemParams = {
  paymentMethod: PaymentMethodSchema;
};

export function useBillingMyPaymentMethodsListItem({
  paymentMethod,
}: UseBillingMyPaymentMethodsListItemParams) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { deletePaymentMethod, isDeletePaymentMethodPending } =
    useDeletePaymentMethod();

  const { selectDefaultPaymentMethod, isSelectDefaultPaymentMethodPending } =
    useSelectDefaultPaymentMethod();

  const handleDeleteDialogOpenChange = useCallback((isOpen: boolean) => {
    setIsDeleteDialogOpen(isOpen);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeletePaymentMethod = useCallback(() => {
    deletePaymentMethod(
      { paymentMethodId: paymentMethod.id },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      },
    );
  }, [deletePaymentMethod, paymentMethod.id]);

  const handleSelectDefaultPaymentMethod = useCallback(() => {
    if (isSelectDefaultPaymentMethodPending) return;
    if (paymentMethod.default) return;

    selectDefaultPaymentMethod({ paymentMethodId: paymentMethod.id });
  }, [
    paymentMethod,
    isSelectDefaultPaymentMethodPending,
    selectDefaultPaymentMethod,
  ]);

  return {
    isDeleteDialogOpen,
    isDeletePaymentMethodPending,
    handleDeleteDialogOpenChange,
    handleDeleteButtonClick,
    handleDeletePaymentMethod,
    handleSelectDefaultPaymentMethod,
  };
}
