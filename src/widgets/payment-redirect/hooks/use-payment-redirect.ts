import { useMount } from "@siberiacancode/reactuse";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetPayment } from "@/actions/billing/hooks/use-get-payment";
import { useInitiateSubscriptionPayment } from "@/actions/billing/hooks/use-initiate-subscription-payment";
import { useInitiateCreditsPackagePayment } from "@/actions/credits/hooks/use-initiate-credits-package-payment";
import type { PaymentRedirectSearch } from "@/routes/_with-auth/_without-subscription/payment-redirect";
import { useToast } from "@/shared/hooks/use-toast";

type UsePaymentRedirectParams = PaymentRedirectSearch;

type PaymentRedirectStatus =
  | "initiate-payment-pending"
  | "initiate-payment-error"
  | "initiate-payment-success"
  | "payment-loading"
  | "payment-pending"
  | "payment-error"
  | "payment-success";

export function usePaymentRedirect({
  redirect,
  tariffSlug,
  trialTariffSlug,
  creditsPackageSlug,
  paymentId,
}: UsePaymentRedirectParams) {
  const [paymentRedirectStatus, setPaymentRedirectStatus] =
    useState<PaymentRedirectStatus | null>(null);

  const { showErrorToast } = useToast();
  const { initiateSubscriptionPayment } = useInitiateSubscriptionPayment();
  const { initiateCreditsPackagePayment } = useInitiateCreditsPackagePayment();

  const { paymentData, isPaymentLoading, isPaymentError } = useGetPayment({
    paymentId,
    refetchOnPending: true,
  });

  const redirectUrl = useMemo(() => {
    if (redirect) {
      return `${window.location.origin}${redirect}`;
    }
  }, [redirect]);

  const handleInitiatePayment = useCallback(() => {
    if (tariffSlug) {
      setPaymentRedirectStatus("initiate-payment-pending");
      initiateSubscriptionPayment(
        {
          data: {
            tariffSlug,
            trialTariffSlug,
            redirect: redirectUrl,
          },
        },
        {
          onSuccess: ({ data: { paymentLink } }) => {
            if (!paymentLink) {
              setPaymentRedirectStatus("initiate-payment-error");
              showErrorToast({
                description:
                  "Не удалось инициировать оплату. Попробуйте ещё раз или повторите попытку позднее",
              });

              return;
            }

            setPaymentRedirectStatus("initiate-payment-success");
            window.location.href = paymentLink;
          },
          onError: () => {
            setPaymentRedirectStatus("initiate-payment-error");
            showErrorToast({
              description:
                "Не удалось инициировать оплату. Попробуйте ещё раз чуть позже",
            });
          },
        },
      );
    } else if (creditsPackageSlug) {
      setPaymentRedirectStatus("initiate-payment-pending");
      initiateCreditsPackagePayment(
        {
          data: {
            creditsPackageSlug,
          },
        },
        {
          onSuccess: ({ data: { paymentLink } }) => {
            if (!paymentLink) {
              setPaymentRedirectStatus("initiate-payment-error");
              showErrorToast({
                description:
                  "Не удалось инициировать оплату. Попробуйте ещё раз или повторите попытку позднее",
              });

              return;
            }

            setPaymentRedirectStatus("initiate-payment-success");
            window.location.href = paymentLink;
          },
          onError: () => {
            setPaymentRedirectStatus("initiate-payment-error");
            showErrorToast({
              description:
                "Не удалось инициировать оплату. Попробуйте ещё раз чуть позже",
            });
          },
        },
      );
    } else {
      setPaymentRedirectStatus("initiate-payment-error");
      showErrorToast({
        description:
          "Не удалось инициировать оплату. Попробуйте ещё раз или повторите попытку позднее",
      });
    }
  }, [
    creditsPackageSlug,
    tariffSlug,
    trialTariffSlug,
    redirectUrl,
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
    const isPaymentSucceeded = paymentData?.data.status === "succeeded";
    const isPaymentPending = paymentData?.data.status === "pending";
    const isPaymentCanceled = paymentData?.data.status === "canceled";
    const isPaymentFailed = paymentData?.data.status === "failed";

    const isPaymentSubscriptionPending =
      paymentData?.data.subscription?.status === "pending";

    const isPaymentSubscriptionActive =
      paymentData?.data.subscription?.status === "active";

    if (isPaymentLoading) {
      setPaymentRedirectStatus("payment-loading");
    } else if (isPaymentError || isPaymentCanceled || isPaymentFailed) {
      setPaymentRedirectStatus("payment-error");
    } else if (isPaymentPending || isPaymentSubscriptionPending) {
      setPaymentRedirectStatus("payment-pending");
    } else if (isPaymentSucceeded && isPaymentSubscriptionActive) {
      setPaymentRedirectStatus("payment-success");
    }
  }, [paymentData, isPaymentLoading, isPaymentError]);

  useMount(handleMount);

  return {
    paymentRedirectStatus,
    handleInitiatePayment,
  };
}
