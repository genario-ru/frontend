import { useMount } from "@siberiacancode/reactuse";
import { useNavigate } from "@tanstack/react-router";
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
  paymentMethodId,
  paymentId,
}: UsePaymentRedirectParams) {
  const navigate = useNavigate();

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
            paymentMethodId,
          },
        },
        {
          onSuccess: ({ data: { id, paymentLink } }) => {
            // Оплата сохраненным способом проходит без редиректа в ЮКассу:
            // переходим к отслеживанию статуса платежа. creditsPackageSlug и
            // paymentMethodId оставляем в search, чтобы при ошибке платежа
            // работала повторная инициация оплаты.
            if (paymentMethodId) {
              setPaymentRedirectStatus("initiate-payment-success");
              navigate({
                to: "/payment-redirect",
                search: { paymentId: id, creditsPackageSlug, paymentMethodId },
                replace: true,
              });

              return;
            }

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
    paymentMethodId,
    tariffSlug,
    trialTariffSlug,
    redirectUrl,
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
    const isPaymentSucceeded = paymentData?.data.status === "succeeded";
    const isPaymentPending = paymentData?.data.status === "pending";
    const isPaymentCanceled = paymentData?.data.status === "canceled";
    const isPaymentFailed = paymentData?.data.status === "failed";

    const isPaymentSubscriptionPending =
      paymentData?.data.subscription?.status === "pending";

    const isPaymentEntityActive =
      paymentData?.data.subscription?.status === "active" ||
      paymentData?.data.creditsBatch?.status === "active";

    if (isPaymentLoading) {
      setPaymentRedirectStatus("payment-loading");
    } else if (isPaymentError || isPaymentCanceled || isPaymentFailed) {
      setPaymentRedirectStatus("payment-error");
    } else if (isPaymentPending || isPaymentSubscriptionPending) {
      setPaymentRedirectStatus("payment-pending");
    } else if (isPaymentSucceeded && isPaymentEntityActive) {
      setPaymentRedirectStatus("payment-success");
      navigate({
        to: "/home",
        replace: true,
        reloadDocument: true,
      });
    }
  }, [paymentData, isPaymentLoading, isPaymentError, navigate]);

  useMount(handleMount);

  return {
    paymentRedirectStatus,
    hasPaymentLink: Boolean(paymentData?.data.paymentLink),
    handleRedirectToPayment,
    handleInitiatePayment,
  };
}
