import { useMemo } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { BillingMyPaymentMethodCard } from "@/features/billing/billing-my-payment-methods/components/billing-my-payment-method-card";
import { BillingMyPaymentMethodDeleteDialog } from "@/features/billing/billing-my-payment-methods/components/billing-my-payment-method-delete-dialog";
import { BillingMyPaymentMethodDeleteDrawer } from "@/features/billing/billing-my-payment-methods/components/billing-my-payment-method-delete-drawer";
import { usePaymentMethodDisplay } from "@/features/billing/payment-method-display/hooks/use-payment-method-display";
import { SwipeActions } from "@/shared/components/ui/swipe-actions";

import { useBillingMyPaymentMethodsListItem } from "../hooks/use-billing-my-payment-methods-list-item";
import { BillingMyPaymentMethodSwipeActions } from "./billing-my-payment-method-swipe-actions";

type BillingMyPaymentMethodsListItemProps = {
  paymentMethod: PaymentMethodSchema;
  isMobile: boolean;
  showSwipeActions: boolean;
};

export function BillingMyPaymentMethodsListItem({
  paymentMethod,
  isMobile,
  showSwipeActions,
}: BillingMyPaymentMethodsListItemProps) {
  const {
    isDeleteDialogOpen,
    isDeletePaymentMethodPending,
    handleDeleteDialogOpenChange,
    handleDeleteButtonClick,
    handleDeletePaymentMethod,
    handleSelectDefaultPaymentMethod,
  } = useBillingMyPaymentMethodsListItem({ paymentMethod });

  const { title: paymentMethodTitle } = usePaymentMethodDisplay(paymentMethod);

  const card = useMemo(
    () => (
      <BillingMyPaymentMethodCard
        paymentMethod={paymentMethod}
        hideActions={showSwipeActions}
        onDelete={handleDeleteButtonClick}
        onMakeDefault={handleSelectDefaultPaymentMethod}
      />
    ),
    [
      paymentMethod,
      showSwipeActions,
      handleDeleteButtonClick,
      handleSelectDefaultPaymentMethod,
    ],
  );

  const body = useMemo(() => {
    if (showSwipeActions) {
      return (
        <SwipeActions
          beforeInset={8}
          actions={
            <BillingMyPaymentMethodSwipeActions
              isDefault={paymentMethod.default}
              onDelete={handleDeleteButtonClick}
              onMakeDefault={handleSelectDefaultPaymentMethod}
            />
          }
          className="rounded-2xl"
        >
          {card}
        </SwipeActions>
      );
    }

    return card;
  }, [
    card,
    showSwipeActions,
    paymentMethod,
    handleDeleteButtonClick,
    handleSelectDefaultPaymentMethod,
  ]);

  const dialog = useMemo(() => {
    if (isMobile) {
      return (
        <BillingMyPaymentMethodDeleteDrawer
          paymentMethodName={paymentMethodTitle}
          isOpen={isDeleteDialogOpen}
          isPending={isDeletePaymentMethodPending}
          setIsOpen={handleDeleteDialogOpenChange}
          onConfirm={handleDeletePaymentMethod}
        />
      );
    }

    return (
      <BillingMyPaymentMethodDeleteDialog
        paymentMethodName={paymentMethodTitle}
        isOpen={isDeleteDialogOpen}
        isPending={isDeletePaymentMethodPending}
        setIsOpen={handleDeleteDialogOpenChange}
        onConfirm={handleDeletePaymentMethod}
      />
    );
  }, [
    isMobile,
    paymentMethodTitle,
    isDeleteDialogOpen,
    isDeletePaymentMethodPending,
    handleDeleteDialogOpenChange,
    handleDeletePaymentMethod,
  ]);

  return (
    <>
      {body}
      {dialog}
    </>
  );
}
