import { useMount } from "@siberiacancode/reactuse";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { useGetPayment } from "@/actions/billing/hooks/use-get-payment";
import { useInitiateSubscriptionPayment } from "@/actions/billing/hooks/use-initiate-subscription-payment";
import { useInitiateCreditsPackagePayment } from "@/actions/credits/hooks/use-initiate-credits-package-payment";
import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { useToast } from "@/shared/hooks/use-toast";

const DEFAULT_ERROR_DESCRIPTION =
  "Не удалось создать платёж, деньги не были списаны. Попробуйте ещё раз чуть позже";

type UsePaymentRedirectParams = PaymentRedirectSearch;

type PaymentRedirectStatus =
  | "initiate-payment-pending"
  | "initiate-payment-error"
  | "payment-loading"
  | "payment-pending"
  | "payment-error"
  | "payment-success";

export function usePaymentRedirect({
  redirect = "/home",
  tariffSlug,
  trialTariffSlug,
  creditsPackageSlug,
  paymentMethodId,
  paymentId,
}: UsePaymentRedirectParams) {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const { initiateSubscriptionPayment } = useInitiateSubscriptionPayment();
  const { initiateCreditsPackagePayment } = useInitiateCreditsPackagePayment();

  const [paymentRedirectStatus, setPaymentRedirectStatus] =
    useState<PaymentRedirectStatus | null>(null);

  const { paymentData, isPaymentLoading, isPaymentError } = useGetPayment({
    paymentId,
    refetchOnPending: true,
  });

  const handleRedirectToPayment = useCallback(() => {
    if (paymentData?.data.paymentLink) {
      window.location.href = paymentData.data.paymentLink;
    }
  }, [paymentData]);

  const handleInitiatePayment = useCallback(() => {
    if (tariffSlug) {
      setPaymentRedirectStatus("initiate-payment-pending");
      initiateSubscriptionPayment(
        {
          data: {
            tariffSlug,
            trialTariffSlug,
          },
        },
        {
          onSuccess: ({ data: { id, paymentLink } }) => {
            if (!paymentLink) {
              setPaymentRedirectStatus("initiate-payment-error");
              showErrorToast({ description: DEFAULT_ERROR_DESCRIPTION });
              return;
            }

            setPaymentRedirectStatus("payment-loading");
            navigate({
              to: "/payment-redirect",
              search: (previousSearch) => ({
                ...previousSearch,
                paymentId: id,
              }),
              replace: true,
            });

            window.location.href = paymentLink;
          },
          onError: () => {
            setPaymentRedirectStatus("initiate-payment-error");
            showErrorToast({ description: DEFAULT_ERROR_DESCRIPTION });
          },
        },
      );
    } else if (creditsPackageSlug) {
      setPaymentRedirectStatus("initiate-payment-pending");
      initiateCreditsPackagePayment(
        {
          data: {
            creditsPackageSlug,
            paymentMethodId,
          },
        },
        {
          onSuccess: ({ data: { id, paymentLink } }) => {
            // Платеж без сохраненного способа оплаты обязан содержать ссылку
            // на подтверждение в ЮКассе. При оплате сохраненным способом
            // ссылки нет: сразу переходим к отслеживанию статуса платежа.
            if (!paymentMethodId && !paymentLink) {
              setPaymentRedirectStatus("initiate-payment-error");
              showErrorToast({ description: DEFAULT_ERROR_DESCRIPTION });
              return;
            }

            setPaymentRedirectStatus("payment-loading");
            navigate({
              to: "/payment-redirect",
              search: (previousSearch) => ({
                ...previousSearch,
                paymentId: id,
              }),
              replace: true,
            });

            if (paymentLink) {
              window.location.href = paymentLink;
            }
          },
          onError: () => {
            setPaymentRedirectStatus("initiate-payment-error");
            showErrorToast({ description: DEFAULT_ERROR_DESCRIPTION });
          },
        },
      );
    } else {
      setPaymentRedirectStatus("initiate-payment-error");
      showErrorToast({ description: DEFAULT_ERROR_DESCRIPTION });
    }
  }, [
    creditsPackageSlug,
    paymentMethodId,
    tariffSlug,
    trialTariffSlug,
    navigate,
    showErrorToast,
    initiateCreditsPackagePayment,
    initiateSubscriptionPayment,
  ]);

  const handleMount = useCallback(() => {
    if (!paymentId) {
      handleInitiatePayment();
    }
  }, [paymentId, handleInitiatePayment]);

  useEffect(() => {
    const paymentStatus = paymentData?.data.status;
    const paymentSubscriptionsStatus = paymentData?.data.subscription?.status;
    const paymentCreditsBatchStatus = paymentData?.data.creditsBatch?.status;

    const isPaymentSucceeded = paymentStatus === "succeeded";
    const isPaymentPending = paymentStatus === "pending";
    const isPaymentCanceled = paymentStatus === "canceled";
    const isPaymentFailed = paymentStatus === "failed";

    const isPaymentSubscriptionPending =
      paymentSubscriptionsStatus === "pending";

    const isPaymentEntityActive =
      paymentSubscriptionsStatus === "active" ||
      paymentCreditsBatchStatus === "active";

    if (isPaymentLoading) {
      setPaymentRedirectStatus("payment-loading");
    } else if (isPaymentError || isPaymentCanceled || isPaymentFailed) {
      setPaymentRedirectStatus("payment-error");
    } else if (isPaymentPending || isPaymentSubscriptionPending) {
      setPaymentRedirectStatus("payment-pending");
    } else if (isPaymentSucceeded && isPaymentEntityActive) {
      setPaymentRedirectStatus("payment-success");
      navigate({
        to: redirect,
        replace: true,
        reloadDocument: true,
      });
    }
  }, [redirect, paymentData, isPaymentLoading, isPaymentError, navigate]);

  useMount(handleMount);

  return {
    paymentRedirectStatus,
    hasPaymentLink: Boolean(paymentData?.data.paymentLink),
    handleRedirectToPayment,
    handleInitiatePayment,
  };
}
