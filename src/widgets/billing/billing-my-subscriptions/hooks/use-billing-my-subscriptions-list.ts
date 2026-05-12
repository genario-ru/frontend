import { useCallback, useMemo, useState } from "react";

import { useCancelSubscription } from "@/actions/subscriptions/hooks/use-cancel-subscription";
import { useGetMySubscriptions } from "@/actions/subscriptions/hooks/use-get-my-subscriptions";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

import { subscriptionCancellableStatuses } from "../constants/subscription-cancellable-statuses";
import { formatSubscriptionRow } from "../utils/format-subscription-row";
import { isVisibleSubscription } from "../utils/is-visible-subscription";

export function useBillingMySubscriptionsList() {
  const { isDesktop, isMobile } = useBreakpoints();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);

  const {
    mySubscriptionsData,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
  } = useGetMySubscriptions();

  const { cancelSubscription, isCancelSubscriptionPending } =
    useCancelSubscription();

  const showSwipeActions = !isDesktop && checkTouchScreen();

  const visibleSubscriptions = useMemo(() => {
    if (!mySubscriptionsData?.data) return [];

    return mySubscriptionsData.data
      .filter(isVisibleSubscription)
      .map(formatSubscriptionRow);
  }, [mySubscriptionsData]);

  const selectedSubscription = useMemo(() => {
    return mySubscriptionsData?.data?.find(
      (subscription) => subscription.id === selectedSubscriptionId,
    );
  }, [selectedSubscriptionId, mySubscriptionsData]);

  const showCancelDialog = useMemo(() => {
    if (!selectedSubscriptionId) return false;

    const subscription = mySubscriptionsData?.data?.find(
      (subscription) => subscription.id === selectedSubscriptionId,
    );

    if (!subscription) return false;

    const isCancellable = subscriptionCancellableStatuses.includes(
      subscription.status,
    );

    return isCancellable;
  }, [selectedSubscriptionId, mySubscriptionsData]);

  const handleOpenCancelDialog = useCallback((subscriptionId: string) => {
    setSelectedSubscriptionId(subscriptionId);
    setIsCancelDialogOpen(true);
  }, []);

  const handleCloseCancelDialog = useCallback(() => {
    setIsCancelDialogOpen(false);
    setSelectedSubscriptionId(null);
  }, []);

  const handleCancelSubscription = useCallback(() => {
    if (!selectedSubscriptionId) return;

    cancelSubscription(
      { subscriptionId: selectedSubscriptionId },
      {
        onSuccess: () => {
          handleCloseCancelDialog();
        },
      },
    );
  }, [selectedSubscriptionId, cancelSubscription, handleCloseCancelDialog]);

  return {
    isMobile,
    visibleSubscriptions,
    selectedSubscription,
    showCancelDialog,
    showSwipeActions,
    isMySubscriptionsLoading,
    isMySubscriptionsError,
    isCancelSubscriptionPending,
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    handleOpenCancelDialog,
    handleCancelSubscription,
  };
}
